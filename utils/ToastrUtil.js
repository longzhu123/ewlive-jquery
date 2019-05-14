toastr.options = {
    "closeButton": true,
    "debug": false,
    "progressBar": true,
    "preventDuplicates": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "400",
    "hideDuration": "1000",
    "timeOut": "7000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


//通知弹框Util
let ToastrUtil = {
    warning: function(title, msg) {
        toastr.warning(msg, title);
    },
    info: function(title, msg) {
        toastr.info(msg, title);
    },
    success:function (title, msg) {
        toastr.success(msg, title);
    },
    error:function (title, msg) {
        toastr.error(msg, title);
    },
    clean:function () {
        toastr.clean();
    }
};