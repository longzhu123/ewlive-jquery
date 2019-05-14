let ValidateUtil = {
    /**
     * 通用的校验表单方法
     * @param ele    DOM元素
     */
   commonValidate:function (ele) {
        $(ele).bootstrapValidator('validate');
        let isVali = $(ele).data('bootstrapValidator').isValid();
        return isVali;
   }
};