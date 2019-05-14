let FormUtil = {
    /**
     * 初始化Form
     * @param ele   初始化Form的Dom
     * @param json  json数据
     */
    initForm: function (ele, json) {
        let form = $(ele);
        $.each(json, function (key, value) {
            let formField = form.find("[name='" + key + "']");
            if ($.type(formField[0]) !== "undefined") {
                let fieldTagName = formField[0].tagName.toLowerCase();
                if (fieldTagName == "input") {
                    if (formField.attr("type") == "radio") {
                        $("input:radio[name='" + key + "'][value='" + value + "']").prop("checked", "checked");
                    } else {
                        formField.val(value);
                    }
                } else if (fieldTagName == "select") {
                    formField.val(value);
                } else if (fieldTagName == "textarea") {
                    formField.val(value);
                } else {
                    formField.val(value);
                }
            }
        });
    }
};