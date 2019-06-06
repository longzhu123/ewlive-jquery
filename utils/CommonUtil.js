let CommonUtil = {
    //判断字符串是否为空
    isEmpty: function (str) {
        if (str === '' || $.trim(str).length === 0) {
            return true;
        }
        return false;
    },
    /**
     * 公用的Ajax
     * @param option
     *        options.url:请求Url
     *        options.data:请求数据
     * @param callback:回调方法
     */
    commonAjax: function (option, callback) {
        option.data.token = localStorage.getItem("token");
        $.ajax({
            type: 'post',
            url: option.url,
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(option.data),
            success: function (response) {
                let {resultCode, resultMsg} = response;
                if (resultCode === Constants.REPONSE_ERROR_CODE) {
                    AlertUtil.error({
                        title: '错误提示',
                        content: resultMsg
                    })
                } else if (resultCode === Constants.RESPONSE_SUCCESS_CODE) {
                    callback(response.data);
                }
            },
            error: function () {
                ToastrUtil.error("网络异常", "错误提示");
            }
        })
    },
    /**
     * 公用的保存Ajax
     * @param option
     *        options.url:请求Url
     *        options.data:请求数据
     * @param ele       隐藏模态框的DOM
     * @param tableEle  刷新表格的DOM
     */
    commonSaveAjax: function (option, ele, tableEle) {
        this.commonAjax(option, function (response) {
            AlertUtil.success({
                title: '操作提示',
                content: '保存成功'
            });
            if (ele) {
                $(ele).modal('hide');
            }
            if (tableEle) {
                $(tableEle).bootstrapTable('refresh');
            }
        });
    },
    /**
     * 通用的删除文件
     * @param id  id编号
     */
    commonDelFile: function (ids) {
        let options = {
            url: Constants.SERVER_URL + "/sysFileInfo/deleteBatchSysFileInfoByIds",
            data: {"ids": ids}
        };
        this.commonAjax(options, function () {
            AlertUtil.success({
                title: '操作提示',
                content: '删除成功'
            });
        })
    },
    //序列化表单对象为json
    serializeObject: function (ele) {
        let o = {};
        let a = $(ele).serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },
    /**
     * 附件下载
     * @param fileobj
     */
    downloadHandler: function (fileobj,id) {
        if (!fileobj) {
            fileobj = $(this.options.showContainer);
        }
        let objs = $(fileobj).data('fileinput').$preview.find(".kv-preview-thumb .kv-file-down");
        objs.unbind("click");
        objs.on("click", function () {
            let option = {
                url: Constants.SERVER_URL + "/sysFileInfo/downloadFile",
                data: {"id":id,"token":localStorage.getItem("token")}
            };
            AuthUtil.validateToken();
            window.location.href = `${option.url}?id=${option.data.id}&token=${option.data.token}`;
        });
    }
};
