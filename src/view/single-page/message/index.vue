<template>
    <Card shadow>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80" style="width:400px">
            <FormItem prop="user" label="账号">
                <i-input type="text" v-model="formInline.user" placeholder="请输入账号……">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem prop="password" label="旧密码">
                <i-input type="password" password v-model="formInline.password" placeholder="请输入旧密码……">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem prop="password" label="新密码">
                <i-input type="password" password v-model="formInline.password" placeholder="请输入新密码……">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </i-input>
            </FormItem>
            <FormItem>
                <Button type="primary">确定修改</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
export default {
    name: 'message_page',
    data() {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [{ required: true, message: 'Please fill in the user name', trigger: 'blur' }],
                password: [
                    { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {},
    methods: {}
}
</script>

<style lang="less"></style>
