<template>
    <Card shadow>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80" style="width:400px">
            <FormItem prop="user" label="账号">
                <i-input type="text" v-model="formInline.user" placeholder="请输入账号……">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem prop="oldPassword" label="旧密码">
                <i-input type="password" password v-model="formInline.oldPassword" placeholder="请输入旧密码……">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem prop="newPassword" label="新密码">
                <i-input type="password" password v-model="formInline.newPassword" placeholder="请输入新密码……">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">确定修改</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import User from '@/api/user'
import Cookies from 'js-cookie'
export default {
    name: 'message_page',
    data() {
        return {
            formInline: {
                user: '',
                oldPassword: '',
                newPassword: ''
            },
            ruleInline: {
                user: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
                oldPassword: [
                    {
                        required: true,
                        type: 'string',
                        asyncValidator: (rule, value) => {
                            return new Promise(async (resolve, reject) => {
                                if (value) {
                                    if (value.length >= 6) {
                                        let res = await User.login({ userName: this.formInline.user, password: this.formInline.oldPassword })
                                        res.data.code < 0 ? reject('账号或密码错误') : resolve()
                                    } else {
                                        reject('密码长度不能少于6位')
                                    }
                                } else {
                                    reject('旧密码不能为空')
                                }
                            })
                        }
                    }
                ],
                newPassword: [
                    { required: true, message: '新密码不能为空', trigger: 'blur', type: 'string' },
                    { type: 'string', min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
                ]
            }
        }
    },
    created() {},
    computed: {},
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(async valid => {
                if (valid) {
                    let userId = JSON.parse(Cookies.get('token')).token
                    let res = await User.updatePassword({ user_id: userId, ...{ updateInfo: { user_pwd: this.formInline.newPassword } } })
                    if (res.data.code === 1) {
                        this.$Message.success('修改密码成功!')
                        Cookies.set('token', '')
                        this.$router.push({ name: 'login' })
                    } else {
                        this.$Message.error('修改失败!')
                    }
                    this.$refs[name].resetFields()
                } else {
                    this.$Message.error('Fail!')
                }
            })
        }
    }
}
</script>

<style lang="less"></style>
