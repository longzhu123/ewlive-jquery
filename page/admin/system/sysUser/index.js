$(function () {
    ComponentUtil.loadSystemCommonHtml();
    initDataTable();
    addModalInit();
    batchDeleteInit();
    bindOperateClickEvent();
    bindFormValidate();
    bindModalEvent();
});


/**
 * 初始化表格数据
 */
function initDataTable() {

    //操作列按钮事件bind
    window.operateEvents = {
        'click .viewBtn': function (e, value, row, index) {
            $("#viewModal").modal();
        },
        'click .updateBtn': function (e, value, row, index) {
            $("#updateModal").modal();
        }
    };

    $('#dataTable').bootstrapTable({
        url: Constants.SERVER_URL + '/sysUser/likeSearchSysUserByPage',
        method: 'post',
        width: 'auto',
        pagination: true,
        sidePagination: "server",
        height: 499,
        pageNumber: 1,
        pageSize: 10,
        pageList: [10, 20, 30, 50],
        contentType: "application/json;charset=utf-8",
        columns: [
            {
                checkbox: true,
            },
            {
                field: 'email',
                title: '邮箱',
                align: 'center'
            },
            {
                field: 'nickName',
                title: '昵称',
                align: 'center'
            },
            {
                field: 'ewCoin',
                title: '优币',
                align: 'center'
            },
            {
                title: '操作',
                align: 'center',
                formatter: operateFormatter,
                events: operateEvents
            }
        ],
        formatLoadingMessage: function () {
            return "请稍等，正在加载中";
        },
        queryParams: function (params) {
            let searchParams = {
                size: params.limit,
                current: params.offset / params.limit + 1,
                token: localStorage.getItem('token')
            };
            return JSON.stringify(searchParams);
        },
        //返回数据格式处理
        responseHandler: function (res) {
            AuthUtil.validateToken();
            let {total, records} = res.data;
            return {
                "total": total,
                "rows": records
            };
        }
    });
}


//格式化操作列
function operateFormatter(value, row, index) {
    return [
        `<button type="button" class="btn btn-xs btn-outline btn-primary viewBtn">查看</button>`,
        `<button type="button" class="btn btn-xs btn-outline btn-primary updateBtn">修改</button>`
    ];
}


//添加模态框初始化
function addModalInit() {
    $("#addBtn").click(function () {
        $("#addModal").modal();
    });
}

//批量删除初始化
function batchDeleteInit() {
    $("#batchDelete").click(function () {
        AlertUtil.confirm({
            yes: function (index, layer) {
                alert("批量删除成功")
            }
        });
    });
}

//绑定业务操作按钮click事件
function bindOperateClickEvent() {

    //添加保存click
    $(".add-save-btn").click(function () {
        let isValidator = ValidateUtil.commonValidate(".add-form");
        if(isValidator){
            let json = CommonUtil.serializeObject(".add-form");
            let option = {
                url:Constants.SERVER_URL+"/sysUser/addSysUser",
                data:json,
            };
            CommonUtil.commonSaveAjax(option,"#addModal","#dataTable");

        }
    })
}

//初始化表单验证
function bindFormValidate() {

    //添加表单
    $(".add-form").bootstrapValidator({
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: '请输入邮箱！'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码！'
                    }
                }
            },
            nickName: {
                validators: {
                    notEmpty: {
                        message: '请输入昵称！'
                    }
                }
            },
            ewCoin: {
                validators: {
                    notEmpty: {
                        message: '请输入优币！'
                    }
                }
            }

        }
    });
}


//绑定所有的模态框event
function bindModalEvent() {
    $("#addModal").on('hide.bs.modal', function () {
        $(".add-form")[0].reset();
        $(".add-form").data('bootstrapValidator').resetForm();
    })
}