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
    },
    initViewDetail: function (ele, json) {
        let form = $(ele);
        $.each(json, function (key, value) {
            let formField = form.find("[name='" + key + "']");
            if ($.type(formField[0]) !== "undefined") {
                formField.html(value);
            }
        });
    },
    /**
     * 初始化下拉框
     * @param ele      对应的DOM元素
     * @param json     数据
     * @param options
     *        options.value:下拉框的值
     *        options.text:下拉框的显示文本
     *        options.change:下拉框的change事件
     */
    initDropSelect:function (ele, json,options) {
        let html = `<option value=""></option>`;
        for (let item of json) {
            let temp = `<option value=${item[options.value]}>${item[options.text]}</option>`;
            html+=temp;
        }
        $(ele).html(html);
        $(ele).chosen({no_results_text: "未找到匹配项"});
        if(options.change){
            $('ele').on('change', options.change);
        }
    }
};