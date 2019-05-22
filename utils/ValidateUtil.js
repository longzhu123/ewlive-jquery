let ValidateUtil = {
    /**
     * 通用的校验表单方法
     * @param ele    DOM元素
     */
   commonValidate:function (ele) {
        $(ele).bootstrapValidator('validate');
        let isVali = $(ele).data('bootstrapValidator').isValid();
        return isVali;
   },
    /**
     * 通用的校验文件类型表单方法
     * @param formEle       所属表单的DOM节点
     * @param formFields    表单里面的fields name 属性的名称集合
     */
    commonFileValidate:function (formEle,formFields) {
        for (let field of formFields) {
            $(formEle).bootstrapValidator('revalidateField', field);
        }
    },
};