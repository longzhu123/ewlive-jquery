let CommonUtil = {
    //判断字符串是否为空
    isEmpty: function (str) {
        if (str === '' || $.trim(str).length === 0) {
            return true;
        }
        return false;
    },
    //
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
                        title:'错误提示',
                        content:resultMsg
                    })
                } else if (resultCode === Constants.RESPONSE_SUCCESS_CODE) {
                    callback(response);
                }
            },
            error: function () {
                ToastrUtil.error("网络异常", "错误提示");
            }
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
    }
};
