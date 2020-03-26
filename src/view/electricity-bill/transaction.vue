<template>
    <div class="container">
        <h1>加班登记</h1>
        <div class="button-wrap">
            员工编号:
            <Input placeholder="请输入……" clearable style="width: 200px" @keyup.enter.native="search" v-model="search_model" />
            <Button type="primary" style="margin-left:40px;" @click="search">搜索</Button>
            <Button style="margin-left:20px;" @click="reset">重置</Button>
        </div>
        <Table :columns="columns1" :loading="loading" :data="data1"></Table>
        <Page
            :total="total"
            style="float:right;margin-top:20px;"
            :page-size="pagination.limit"
            :current.sync="pagination.page"
            show-sizer
            show-total
            @on-change="initData"
            @on-page-size-change="changePageSize"
        />
    </div>
</template>

<script>
// import Wattime from '@/api/wattime'

export default {
    data() {
        return {
            data1: [],
            search_model: '',
            pagination: {
                limit: 10,
                page: 1
            },
            total: 0,
            query: {},
            loading: false
        }
    },
    created() {
        this.initData()
    },
    computed: {
        columns1: {
            get() {
                return [
                    {
                        title: '员工编号',
                        key: 'uid',
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'uname',
                        align: 'center'
                    },
                    {
                        title: '部门',
                        key: 'uid',
                        align: 'center'
                    },
                    {
                        title: '加班日期',
                        key: 'uid',
                        align: 'center'
                    },
                    {
                        title: '加班时长',
                        key: 'uid',
                        align: 'center'
                    },
                    {
                        title: '备注',
                        key: 'uid',
                        align: 'center'
                    }
                ]
            }
        }
    },
    methods: {
        async initData() {
            this.loading = true
            try {
                // let res = await Wattime.getUserSetting({ ...this.pagination, ...this.query })
                // if (res.message === 'OK') {
                //     this.data1 = res.data.list
                //     this.total = res.data.total
                // }
                this.loading = false
            } catch (error) {
                this.$Message.error(this.$t('data_acquisition_failed'))
            }
        },
        changePageSize(pageSize) {
            this.pagination.limit = pageSize
            this.initData()
        },
        search() {
            if (this.search_model !== '') {
                this.query = { query: { uid: this.search_model } }
            }
            this.initData()
            this.query = {}
        },
        reset() {
            this.search_model = ''
            this.initData()
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    .button-wrap {
        margin-bottom: 20px;
    }
}
</style>
