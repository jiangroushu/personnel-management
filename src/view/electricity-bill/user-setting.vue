<template>
    <div class="container">
        <h1>下班登记</h1>
        <div class="button-wrap">
            员工姓名:
            <Input placeholder="请输入……" clearable style="width: 200px" @keyup.enter.native="search" v-model="search_model" />
            <Button type="primary" style="margin-left:40px;" @click="search">搜索</Button>
            <Button style="margin-left:20px;" @click="reset">重置</Button>
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
                pageNum: 10,
                page: 1
            },
            total: 0,
            query: { query: { clock_in_type: 2 } },
            loading: false,
            columns1: [
                {
                    title: '编号',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '员工姓名',
                    key: 'user_nickname',
                    align: 'center'
                },
                {
                    title: '部门',
                    key: 'department_name',
                    align: 'center'
                },
                {
                    title: '下班时间',
                    key: 'create_time',
                    align: 'center',
                    render: (h, { row }) => {
                        return h('div', this.$dayjs(row.create_time).format('YYYY-MM-DD HH:mm:ss'))
                    }
                },
                {
                    title: '备注',
                    key: 'work_attendance_log',
                    align: 'center'
                }
            ]
        }
    },
    created() {
        this.initData()
    },
    computed: {},
    methods: {
        async initData() {
            this.loading = true
            try {
                let res = await User.getUserWorkAttendanceList({ ...this.pagination, ...this.query })
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
                this.query = { query: { user_nickname: this.search_model, clock_in_type: 2 } }
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
