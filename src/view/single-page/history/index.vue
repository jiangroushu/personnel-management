<template>
    <div class="container">
        <h1>招聘管理</h1>
        <div class="button-wrap">
            适合岗位:
            <Input placeholder="请输入……" clearable style="width: 200px" @keyup.enter.native="search" v-model="search_model" />
            <Button type="primary" style="margin-left:40px;" @click="search">搜索</Button>
            <Button style="margin-left:20px;" @click="reset">重置</Button>
            <Button type="primary" icon="md-add" style="float: right;">添加</Button>
        </div>
        <Table :columns="columns1" :loading="loading" :data="data1"></Table>
        <Page
            :total="total"
            style="float:right;margin-top:20px;"
            :page-size="pagination.pageNum"
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
                pageNum: 10,
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
                        title: '适合岗位',
                        key: 'uid',
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'uname',
                        align: 'center'
                    },
                    {
                        title: '性别',
                        key: 'uid',
                        align: 'center'
                    },
                    {
                        title: '年龄',
                        key: 'uid',
                        align: 'center'
                    },
                    {
                        title: '学历',
                        key: 'uid',
                        align: 'center'
                    },
                    {
                        title: '电话',
                        key: 'uid',
                        align: 'center'
                    },
                    {
                        title: '邮箱',
                        key: 'uid',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'created_time',
                        align: 'center',
                        render: (h, row) => {
                            return h(
                                'div',
                                {
                                    style: {
                                        color: '#348FE4',
                                        fontSize: '14px',
                                        cursor: 'pointer'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(row)
                                        }
                                    }
                                },
                                '修改'
                            )
                        }
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
            this.pagination.pageNum = pageSize
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
    /deep/ .ivu-table:after {
        width: 0;
    }
    /deep/ .ivu-table-wrapper {
        border: 0;
    }
}
</style>
