<template>
    <div class="container">
        <h1>培训管理</h1>
        <div class="button-wrap">
            活动名称:
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
import User from '@/api/user'

export default {
    data() {
        return {
            data1: [],
            search_model: '',
            pagination: {
                page: 1,
                pageNum: 10
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
                        title: '活动名称',
                        key: 'activity_name',
                        align: 'center'
                    },
                    {
                        title: '参加部门',
                        key: 'activity_department',
                        align: 'center'
                    },
                    {
                        title: '活动开始时间',
                        key: 'activity_start_time',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('div', this.$dayjs(row.activity_start_time).format('YYYY-MM-DD HH:mm:ss'))
                        }
                    },
                    {
                        title: '活动结束时间',
                        key: 'activity_end_time',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('div', this.$dayjs(row.activity_end_time).format('YYYY-MM-DD HH:mm:ss'))
                        }
                    },
                    {
                        title: '备注',
                        key: 'activity_log',
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
                                '查看详情'
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
                let res = await User.getActivityList({ ...this.pagination, ...this.query })
                if (res.data.code === 1) {
                    this.data1 = res.data.data.list.data
                    this.total = res.data.data.list.total
                }
                this.loading = false
            } catch (error) {
                this.loading = false
                console.log(error)
                this.$Message.error('数据获取失败！')
            }
        },
        changePageSize(pageSize) {
            this.pagination.pageNum = pageSize
            this.initData()
        },
        search() {
            if (this.search_model !== '') {
                this.query = { query: { activity_name: this.search_model } }
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
