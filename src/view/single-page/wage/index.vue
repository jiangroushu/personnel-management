<template>
    <div class="container">
        <h1>工资管理</h1>
        <div class="button-wrap">
            姓名:
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
                        title: '员工编号',
                        key: 'user_info_id',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('div', `${10000 + row.user_info_id}`)
                        }
                    },
                    {
                        title: '姓名',
                        key: 'user_nickname',
                        align: 'center'
                    },
                    {
                        title: '部门',
                        key: 'department_name',
                        align: 'center'
                    },
                    {
                        title: '基本工资',
                        key: 'bath_pay',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('div', `¥${parseFloat(row.bath_pay).toFixed(2)}`)
                        }
                    },
                    {
                        title: '公司补贴',
                        key: 'subsidy_pay',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('div', `¥${parseFloat(row.subsidy_pay).toFixed(2)}`)
                        }
                    },
                    {
                        title: '加班费',
                        key: 'overtime_pay',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('div', `¥${parseFloat(row.overtime_pay).toFixed(2)}`)
                        }
                    },
                    {
                        title: '奖励金',
                        key: 'reward_pay',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('div', `¥${parseFloat(row.reward_pay).toFixed(2)}`)
                        }
                    },
                    {
                        title: '扣除金额',
                        key: 'fine_pay',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('div', `¥${parseFloat(row.fine_pay).toFixed(2)}`)
                        }
                    },
                    {
                        title: '总工资',
                        key: 'total_pay',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('div', `¥${parseFloat(row.total_pay).toFixed(2)}`)
                        }
                    },
                    {
                        title: '备注',
                        key: 'wages_log',
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
                let res = await User.getUserWagesList({ ...this.pagination, ...this.query })
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
                this.query = { query: { user_nickname: this.search_model } }
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
