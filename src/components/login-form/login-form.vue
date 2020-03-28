<template>
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit" style="width:342px">
        <FormItem prop="userName">
            <i-input v-model="form.userName" prefix="md-person" placeholder="请输入用户名" size="large"> </i-input>
        </FormItem>
        <FormItem prop="password">
            <i-input type="password" v-model="form.password" prefix="md-lock" placeholder="请输入密码" size="large"> </i-input>
        </FormItem>
        <FormItem>
            <Button @click="handleSubmit" :loading="loading" type="primary" size="large" long>登录</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
    name: 'LoginForm',
    props: {
        userNameRules: {
            type: Array,
            default: () => {
                return [{ required: true, message: '账号不能为空', trigger: 'blur' }]
            }
        },
        passwordRules: {
            type: Array,
            default: () => {
                return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            }
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: {
                userName: 'gaojunhua98',
                password: 'gjh141038'
            }
        }
    },
    computed: {
        rules() {
            return {
                userName: this.userNameRules,
                password: this.passwordRules
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.$emit('on-success-valid', {
                        userName: this.form.userName,
                        password: this.form.password
                    })
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.ivu-form-item {
    margin-bottom: 38px !important;
}
</style>
