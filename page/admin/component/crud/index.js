//当前表格操作的row对象
let currentOperRowObj = null;
$(function () {
    ComponentUtil.loadSystemCommonHtml();
    initDataTable();
    addModalEvent();
    batchDeleteInit();
    bindOperateClickEvent();
    bindFormValidate();
    bindModalEvent();
    bindSearchEvent();
    initSearchSelectDrop();
    initAddSelectDrop();
    initUpdateSelectDrop();
});


/**
 * 初始化表格数据
 */
function initDataTable() {

    //操作列按钮事件bind
    window.operateEvents = {
        'click .viewBtn': function (e, value, row, index) {
            currentOperRowObj = row;
            $("#viewModal").modal();
        },
        'click .updateBtn': function (e, value, row, index) {
            currentOperRowObj = row;
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
        '<button type="button" class="btn btn-xs btn-outline btn-primary viewBtn">查看</button>',
        '<button type="button" class="btn btn-xs btn-outline btn-primary updateBtn">修改</button>'
    ].join("&nbsp;");
}


//添加模态框Event
function addModalEvent() {
    $("#addBtn").click(function () {
        $("#addModal").modal();
    });
}

//批量删除初始化
function batchDeleteInit() {
    $("#batchDelete").click(function () {

        // 获取当前ids
        let ids = $.map($("#dataTable").bootstrapTable('getSelections'), function (row) {
            return row.id;
        });
        if (!ids.length) {
            AlertUtil.error({
                title: '错误提示',
                content: '请选择需要删除的记录'
            });
            return;
        }
        AlertUtil.confirm({
            yes: function (index, layer) {
                let option = {
                    url: Constants.SERVER_URL + "/sysUser/deleteBatchSysUserByIds",
                    data: {'ids': ids}
                };
                CommonUtil.commonSaveAjax(option, undefined, "#dataTable");
            }
        });
    });
}

//绑定业务操作按钮click事件
function bindOperateClickEvent() {

    //添加保存click
    $(".add-save-btn").click(function () {
        let isValidator = ValidateUtil.commonValidate(".add-form");
        if (isValidator) {
            let json = CommonUtil.serializeObject(".add-form");
            let option = {
                url: Constants.SERVER_URL + "/sysUser/addSysUser",
                data: json,
            };
            CommonUtil.commonSaveAjax(option, "#addModal", "#dataTable");

        }
    });

    //修改保存click
    $(".update-save-btn").click(function () {
        debugger;
        let isValidator = ValidateUtil.commonValidate(".update-form");
        if (isValidator) {
            let json = CommonUtil.serializeObject(".update-form");
            json.id = currentOperRowObj.id;
            let option = {
                url: Constants.SERVER_URL + "/sysUser/updateSysUserById",
                data: json,
            };
            CommonUtil.commonSaveAjax(option, "#updateModal", "#dataTable");
        }
    })
}

//初始化表单验证
function bindFormValidate() {

    //添加表单
    $(".add-form").bootstrapValidator({
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: '请输入姓名！'
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
            playState: {
                validators: {
                    notEmpty: {
                        message: '请输入开播状态！'
                    }
                }
            },
            playTime: {
                validators: {
                    notEmpty: {
                        message: '请输入开播时间！'
                    }
                }
            },
            aboutFile: {
                validators: {
                    notEmpty: {
                        message: '请输入相关附件！'
                    }
                }
            }

        }
    });

    //修改表单
    $(".update-form").bootstrapValidator({
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

    //添加模态框open事件
    $("#addModal").on('show.bs.modal', function () {
        addModalInit();
    });


    //添加模态框close事件
    $("#addModal").on('hide.bs.modal', function () {
        $(".add-form")[0].reset();
        $(".add-play-state").val("").trigger("chosen:updated");
        $(".add-form").data('bootstrapValidator').resetForm();
    });

    //修改模态框open事件
    $("#updateModal").on('show.bs.modal', function () {
        let option = {
            url: Constants.SERVER_URL + "/sysUser/getSysUserById",
            data: {id: currentOperRowObj.id},
        };
        CommonUtil.commonAjax(option, function (response) {
            let {data} = response;
            FormUtil.initForm('.update-form', data)
        });
    });

    //修改模态框open事件
    $("#updateModal").on('hide.bs.modal', function () {
        $(".update-form").data('bootstrapValidator').resetForm();
    });

    //查看详情模态框open事件
    $("#viewModal").on('show.bs.modal', function () {
        let option = {
            url: Constants.SERVER_URL + "/sysUser/getSysUserById",
            data: {id: currentOperRowObj.id},
        };
        CommonUtil.commonAjax(option, function (response) {
            let {data} = response;
            FormUtil.initViewDetail('.view-form', data)
        });
    });
}

//绑定搜索表单对应的事件
function bindSearchEvent() {

    layui.use('laydate', function() {
        let laydate = layui.laydate;
        laydate.render({
            elem: '#searchPlayTime',
            value:new Date()
        });
    });


    //搜索button的click
    $("#searchBtn").click(function () {
        $('#dataTable').bootstrapTable("refreshOptions", {
            queryParams : function(params) {
                let searchJson = CommonUtil.serializeObject(".searchForm");
                let searchParams = Object.assign({
                    size: params.limit,
                    current: params.offset / params.limit + 1,
                    token: localStorage.getItem('token')
                },searchJson);
                return JSON.stringify(searchParams);
            }
        });
    });


    //重置搜索表单的click
    $("#resetBtn").click(function () {
        $(".searchForm")[0].reset();
        $(".search-play-state").val("").trigger("chosen:updated");
        $("#dataTable").bootstrapTable('refresh');
    });
}

//初始化搜索表单下拉
function initSearchSelectDrop() {
    let options ={
        url:Constants.SERVER_URL+"/sysDicItem/getSysDicItemByParams",
        data:{dicId:"4783fd16d2bc4015be3f35e60f970c87"}
    };
    CommonUtil.commonAjax(options,function (response) {
        FormUtil.initDropSelect('.search-play-state',response,{value:'dicItemCode',text:'dicItemName'});
    });
}

//初始化添加表单下拉
function initAddSelectDrop() {
    let options ={
        url:Constants.SERVER_URL+"/sysDicItem/getSysDicItemByParams",
        data:{dicId:"4783fd16d2bc4015be3f35e60f970c87"}
    };
    CommonUtil.commonAjax(options,function (response) {
        FormUtil.initDropSelect('.search-play-state',response,{value:'dicItemCode',text:'dicItemName'});
    });
}

//初始化修改表单下拉
function initUpdateSelectDrop(){
    let options ={
        url:Constants.SERVER_URL+"/sysDicItem/getSysDicItemByParams",
        data:{dicId:"4783fd16d2bc4015be3f35e60f970c87"}
    };
    CommonUtil.commonAjax(options,function (response) {
        FormUtil.initDropSelect('.search-play-state',response,{value:'dicItemCode',text:'dicItemName'});
    });
}

//添加模态框初始化Event
function addModalInit() {

    //初始化开播状态下拉框
    let options ={
        url:Constants.SERVER_URL+"/sysDicItem/getSysDicItemByParams",
        data:{dicId:"4783fd16d2bc4015be3f35e60f970c87"}
    };
    CommonUtil.commonAjax(options,function (response) {
        FormUtil.initDropSelect('.add-play-state',response,{value:'dicItemCode',text:'dicItemName'});
    });


    //初始化开播时间日期控件
    layui.use('laydate', function() {
        let laydate = layui.laydate;
        laydate.render({
            elem: '#addPlayTime',
            value:new Date()
        });
    });
}