let AlertUtil = {
    error: function (options) {
        layui.use('layer', function () {
            let layer = layui.layer;
            if (!options) {
                options = {};
            }
            layer.open({
                icon: 2,
                title: (options.title || '操作'),
                content: (options.content || '操作失败')
            });
        });
    },
    success: function (options) {
        layui.use('layer', function () {
            if (!options) {
                options = {};
            }
            layer.open({
                icon: 1,
                title: (options.title || '操作'),
                content: (options.content || '操作成功')
            });
        });

    },
    confirm: function (options) {
        layui.use('layer', function () {
            options = options || {};
            layer.open({
                icon: 0,
                content: options.content || '确认删除当前数据吗？',
                btn: ['确认', '取消'],
                yes: function (index, layero) {
                    if (options.yes) {
                        options.yes();
                    }
                    layer.close(index);
                },
                btn2: function (index, layero) {
                    if (options.cancel) {
                        options.cancel();
                    }
                    layer.close(index);
                }
            });
        });
    }
};
