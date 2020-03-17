<template>
    <div class="container">
        <h1>Dashboard</h1>
        <!-- <Card style="display:flex;justify-content: space-around;">
            <Button type="primary">Resiter</Button>
            <Button type="primary">User</Button>
            <Button type="primary">Electric Meter</Button>
            <Button type="primary">Water Meter</Button>
            <Button type="primary">Top-up</Button>
            <Button type="primary">Refund</Button>
        </Card> -->
        <Row :gutter="20">
            <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 64px;padding-bottom: 10px;cursor: pointer;">
                <infor-card :color="infor.color" :icon="infor.icon" :icon-size="24" :to-url="infor.to">
                    <p>{{ infor.title }}</p>
                </infor-card>
            </i-col>
        </Row>
        <Row :gutter="20" style="margin-top: 10px;">
            <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
                <Card>
                    <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
                </Card>
            </i-col>
            <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
                <Card>
                    <chart-bar style="height: 300px;" :value="barData" text="每周用户活跃量" />
                </Card>
            </i-col>
        </Row>
        <Row>
            <Card>
                <example style="height: 310px;" />
            </Card>
        </Row>
    </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from '../home/example.vue'
export default {
    name: 'home',
    components: {
        InforCard,
        CountTo,
        ChartPie,
        ChartBar,
        Example
    },
    data() {
        return {
            inforCardData: [
                { title: 'Register', icon: 'md-person-add', color: '#3498db', to: '/user/home?isAdd=true' },
                { title: 'Search User', icon: 'md-locate', color: '#2ecc71', to: '/user/home' },
                { title: 'Search Electric Meter', icon: 'ios-flash', color: '#f1c40f', to: '/electricity_bill/meter_setting' },
                { title: 'Search Water Meter', icon: 'ios-water', color: '#e74c3c', to: 'water_bill/meter_setting' },
                { title: 'Top-up', icon: 'logo-bitcoin', color: '#9b59b6', to: '/user/home' },
                { title: 'Refund', icon: 'ios-redo', color: '#1abc9c', to: '/user/home' }
            ],
            pieData: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
            ],
            barData: {
                Mon: 13253,
                Tue: 34235,
                Wed: 26321,
                Thu: 12340,
                Fri: 24643,
                Sat: 1322,
                Sun: 1324
            }
        }
    },
    mounted() {
        //
    }
}
</script>

<style lang="less">
.count-style {
    font-size: 50px;
}
</style>
