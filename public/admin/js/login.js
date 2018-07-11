$(function(){

    // console.log("哈哈");
    //bookstrapValidator是一个插件,会在表单提交的时候进行校验
    $("form").bootstrapValidator({

        //fields 配置校验的规则,根据name属性
        fields: {
            //校验name
            username: {
                //校验
                validators: {
                    // notEmpty是一个规则
                    notEmpty: {
                        message:'用户名不能为空'
                    },
                    stringLength: {
                        min:3,
                        max:8,
                        message:'用户名长度必须是3-8位数'
                    },
                    callback: {
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators: {
                    notEmpty: {
                        message:'密码不能为空'
                    },
                    stringLength: {
                        // 'default': '请输入符合长度限制的值',
                        min:4,
                        max:8,
                        message:'密码长度为4-8位数'
                    },
                    callback: {
                        message:'密码输入错误'
                    }
                }
            }
            
        },
        
        //配置小图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
    })

    //当表单注册成功时会触发success.form.bv事件,插件自带事件
    $("form").on('success.form.bv',function(e){
        //阻止浏览器的默认行为  因为要先发ajax请求确认数据正确,以减少请求次数
        e.preventDefault();

        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data:$('form').serialize(),
            success:function(info){
                // console.log(info);
                //获取表单校验实例
                // var validator = $('form').data('bootstrapValidator');
                //判断表单校验实例
                if(info.error === 1000){
                    //判断表单校验实例
                    // updateStatus 更新字段的状态
                    $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }
                if(info.error === 1001){
                    $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }
                if(info.success){
                    location.href = 'index.html';
                }
            }
        })
    })

})