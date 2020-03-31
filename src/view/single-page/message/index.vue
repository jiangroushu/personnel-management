<template>
    <Card shadow>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100" style="width:400px">
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
            <FormItem prop="againPassword" label="确认新密码">
                <i-input type="password" password v-model="formInline.againPassword" placeholder="请输入确认新密码……">
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
                oldPassword: '',
                newPassword: '',
                againPassword: ''
            },
            ruleInline: {
                oldPassword: [
                    {
                        required: true,
                        type: 'string',
                        trigger: 'blur',
                        asyncValidator: (rule, value) => {
                            return new Promise(async (resolve, reject) => {
                                if (value) {
                                    if (value.length >= 6) {
                                        let res = await User.login({ userName: this.$store.state.user.userName, password: this.formInline.oldPassword })
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
                ],
                againPassword: [
                    {
                        required: true,
                        trigger: 'blur',
                        type: 'string',
                        validator: (rule, value, callback) => {
                            const errors = []
                            if (value) {
                                value == this.formInline.newPassword ? '' : errors.push('两次输入的密码不一致')
                            } else {
                                errors.push('确认密码不能为空')
                            }
                            callback(errors)
                        }
                    }
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
                    let res = await User.updatePassword({ user_id: userId, ...{ updateInfo: { user_pwd: this.formInline.againPassword } } })
                    if (res.data.code === 1) {
                        this.$Message.success('修改密码成功!')
                        Cookies.set('token', '')
                        setTimeout(() => {
                            this.$router.push({ name: 'login' })
                        }, 1000)
                    } else {
                        this.$Message.error('修改失败!')
                    }
                    this.$refs[name].resetFields()
                } else {
                    this.$Message.error('请输入正确的信息!')
                }
            })
        }
    }
}
</script>

<style lang="less"></style>
