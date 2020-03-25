<style lang="less">
@import './login.less';
</style>

<template>
    <div class="login">
        <vue-canvas-nest :config="{ color: '0, 0, 0, 0.45' }"> </vue-canvas-nest>
        <div class="login-top">
            <img src="../../assets/images/logo-min.png" alt="" />
            企业人事管理系统
        </div>
        <!-- <div class="login-desc">Dipole helps energy providers to unlock marketpalce.</div> -->
        <div class="login-desc"></div>
        <login-form @on-success-valid="handleSubmit" :loading="loading"></login-form>
        <div class="login-bottom">
            <div style="cursor: pointer;">Terms of Service</div>
            <div>
                Copyright © 2019 Dipole Tech
            </div>
        </div>
    </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import vueCanvasNest from 'vue-canvas-nest'
export default {
    data() {
        return {
            loading: false
        }
    },
    components: {
        LoginForm,
        vueCanvasNest
    },
    methods: {
        ...mapActions(['handleLogin', 'getUserInfo']),
        async handleSubmit({ userName, password }) {
            this.loading = true
            try {
                await this.handleLogin({ userName, password })
                this.$router.push({
                    name: this.$config.homeName
                })
                this.loading = false
            } catch (error) {
                this.loading = false
            }
        }
    }
}
</script>

<style></style>
