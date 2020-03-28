<template>
    <div class="container">
        <h1>工资管理</h1>
        <div class="button-wrap">
            姓名:
            <Input placeholder="请输入……" clearable style="width: 200px" @keyup.enter.native="search" v-model="search_model" />
            <Button type="primary" style="margin-left:40px;" @click="search">搜索</Button>
            <Button style="margin-left:20px;" @click="reset">重置</Button>
            <Button type="primary" icon="md-add" style="float: right;" @click="clickAdd">添加</Button>
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
        <Modal v-model="modal1" :title="title">
            <Form ref="wageFormValidate" :model="wageFormValidate" :label-width="140" :rules="wageRuleValidate">
                <FormItem label="员工姓名" prop="user_nickname">
                    <i-input v-model="wageFormValidate.user_nickname" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="部门" prop="department_name">
                    <Select style="width:240px" placeholder="请选择……" v-model="wageFormValidate.department_name">
                        <Option value="管理部">管理部</Option>
                        <Option value="运营部">运营部</Option>
                        <Option value="技术部">技术部</Option>
                        <Option value="人事部">人事部</Option>
                        <Option value="财务部">财务部</Option>
                    </Select>
                </FormItem>
                <FormItem label="基本工资" prop="bath_pay">
                    <i-input v-model="wageFormValidate.bath_pay" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="公司补贴" prop="subsidy_pay">
                    <i-input v-model="wageFormValidate.subsidy_pay" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="加班费" prop="overtime_pay">
                    <i-input v-model="wageFormValidate.overtime_pay" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="奖励金" prop="reward_pay">
                    <i-input v-model="wageFormValidate.reward_pay" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="税款" prop="fine_pay">
                    <i-input v-model="fine_pay" style="width:240px" readonly></i-input>
                </FormItem>
                <FormItem label="总工资" prop="total_pay">
                    <i-input v-model="total_pay" style="width:240px" readonly></i-input>
                </FormItem>
                <FormItem label="备注" prop="wages_log">
                    <i-input v-model="wageFormValidate.wages_log" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="modal1 = false">取消</Button>
                <Button @click="handleSubmit('wageFormValidate')" type="primary">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import User from '@/api/user'

export default {
    data() {
        return {
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
                    title: '税款',
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
                        return h(
                            'div',
                            `¥${(
                                parseFloat(row.bath_pay) +
                                parseFloat(row.subsidy_pay) +
                                parseFloat(row.overtime_pay) +
                                parseFloat(row.reward_pay) -
                                parseFloat(row.fine_pay)
                            ).toFixed(2)}`
                        )
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
                    render: (h, { row }) => {
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
                                        this.clickModify(row)
                                    }
                                }
                            },
                            '修改'
                        )
                    }
                }
            ],
            data1: [],
            search_model: '',
            pagination: {
                page: 1,
                pageNum: 10
            },
            total: 0,
            query: {},
            loading: false,
            modal1: false,
            title: '',
            wageFormValidate: {},
            wageRuleValidate: {
                user_nickname: [{ required: true, type: 'string', message: '员工姓名不能为空', trigger: 'blur' }],
                department_name: [{ required: true, type: 'string', message: '部门不能为空', trigger: 'change' }],
                bath_pay: [{ required: true, type: 'string', message: '基本工资不能为空', trigger: 'blur' }],
                subsidy_pay: [{ required: true, type: 'string', message: '公司补贴不能为空', trigger: 'blur' }],
                overtime_pay: [{ required: true, type: 'string', message: '加班费不能为空', trigger: 'blur' }],
                reward_pay: [{ required: true, type: 'string', message: '奖励金不能为空', trigger: 'blur' }]
            }
        }
    },
    created() {
        this.initData()
    },
    computed: {
        total_pay() {
            return (
                parseFloat(this.wageFormValidate.bath_pay || 0) +
                parseFloat(this.wageFormValidate.subsidy_pay || 0) +
                parseFloat(this.wageFormValidate.overtime_pay || 0) +
                parseFloat(this.wageFormValidate.reward_pay || 0) -
                parseFloat(this.fine_pay || 0)
            ).toFixed(2)
        },
        fine_pay() {
            let total =
                parseFloat(this.wageFormValidate.bath_pay || 0) +
                parseFloat(this.wageFormValidate.subsidy_pay || 0) +
                parseFloat(this.wageFormValidate.overtime_pay || 0) +
                parseFloat(this.wageFormValidate.reward_pay || 0)
            let pay = 0
            if (total <= 5000) {
                pay = 0
            } else if (total > 5000 && total < 8001) {
                pay = (total - 5000) * 0.03
            } else if (total > 8000 && total < 17001) {
                pay = 90 + (total - 8000) * 0.1
            } else {
                pay = 990 + (total - 17000) * 0.2
            }
            return pay.toFixed(2)
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
        async addWage() {
            try {
                let res = await User.addWage({ addInfo: this.wageFormValidate })
                if (res.data.code === 1) {
                    this.$Message.success('添加员工工资信息成功！')
                    this.modal1 = false
                    this.initData()
                }
            } catch (error) {
                console.log(error)
                this.$Message.error('添加员工工资信息失败！')
            }
        },
        async updateWage(id) {
            console.log(1)
            try {
                let res = await User.updateWage({ ...{ user_wages_id: id }, ...{ updateInfo: this.wageFormValidate } })
                if (res.data.code === 1) {
                    this.$Message.success('修改员工工资信息成功！')
                    this.modal1 = false
                    this.initData()
                }
            } catch (error) {
                console.log(error)
                this.$Message.error('修改员工工资信息失败！')
            }
        },
        clickAdd() {
            this.modal1 = true
            this.title = '添加员工工资信息'
            this.$refs['wageFormValidate'].resetFields()
            this.wageFormValidate = { bath_pay: 0, subsidy_pay: 0, overtime_pay: 0, reward_pay: 0, fine_pay: 0 }
        },
        clickModify(row) {
            this.modal1 = true
            this.title = '修改员工工资信息'
            this.wageFormValidate = JSON.parse(JSON.stringify(row))
            this.userWageId = row.user_wages_id
        },
        handleSubmit(name) {
            this.wageFormValidate.fine_pay = this.fine_pay
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.title === '添加员工工资信息') {
                        this.addWage()
                    } else {
                        console.log(this.title)
                        this.updateWage(this.userWageId)
                    }
                }
            })
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
