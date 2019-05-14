let AuthUtil = {
    /**
     * 验证本地token是否有效
     * @param token token
     */
    validateToken: function () {
        $.ajax({
            type: "post",
            data: JSON.stringify({"token":localStorage.getItem("token")}),
            contentType: "application/json;charset=utf-8",
            url: Constants.SERVER_URL + "/sysUser/validateToken",
            success: function (response) {
                let {resultCode} = response;
                if (resultCode === Constants.RESPONSE_TOKEN_TIME_OUT_CODE) {
                    window.location.href = Constants.LOGIN_HTML_URL;
                }else{
                    let nickName = localStorage.getItem("nickName");
                    $(".nickName").html(nickName);
                }
            }
        });
    }
};
