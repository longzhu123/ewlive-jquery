$(function () {

    $(document).keyup(function (event) {
        if (event.keyCode == 13) {
            login();
        }
    });

    $('#login-btn').click(function () {
        login();
    });
});


//登录
function login() {
    //登录校验
    let username = $('#username').val();
    let password = $('#password').val();

    if (CommonUtil.isEmpty(username)) {
        ToastrUtil.error("用户名不能为空", "错误提示");
        return;
    }
    if (CommonUtil.isEmpty(password)) {
        ToastrUtil.error("密码不能为空", "错误提示");
        return;
    }

    //拼接登录的数据,开始登录
    let loginData = {
        'email': username,
        'password': password
    };

    $.ajax({
        type: 'post',
        url: Constants.SERVER_URL + "/sysUser/authLogin",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(loginData),
        success: function (response) {
            let {resultCode, resultMsg,data} = response;
            if (resultCode === Constants.REPONSE_ERROR_CODE) {
                toastr.error(resultMsg, '错误提示');
            } else if (resultCode === Constants.RESPONSE_SUCCESS_CODE) {
                let {nickName,token} = data;
                localStorage.setItem("nickName",nickName);
                localStorage.setItem("token",token);
                window.location.href = "../admin/dashboard/index/index.html";
            }
        },
        error: function () {
            ToastrUtil.error("网络异常", "错误提示");
        }
    })
}

