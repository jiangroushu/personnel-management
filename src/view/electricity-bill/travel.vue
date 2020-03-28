<template>
    <div class="container">
        <h1>出差登记</h1>
        <div class="button-wrap">
            员工姓名:
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
            <Form ref="userFormValidate" :model="userFormValidate" :label-width="140" :rules="userRuleValidate">
                <FormItem label="员工姓名" prop="user_nickname">
                    <i-input v-model="userFormValidate.user_nickname" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="部门" prop="department_name">
                    <Select style="width:240px" placeholder="请选择……" v-model="userFormValidate.department_name">
                        <Option value="管理部">管理部</Option>
                        <Option value="运营部">运营部</Option>
                        <Option value="技术部">技术部</Option>
                        <Option value="人事部">人事部</Option>
                        <Option value="财务部">财务部</Option>
                    </Select>
                </FormItem>
                <FormItem label="出差日期" prop="start_time">
                    <DatePicker style="width:240px" type="date" placeholder="请选择……" v-model="userFormValidate.start_time"></DatePicker>
                </FormItem>
                <FormItem label="出差时长(h)" prop="total_time">
                    <InputNumber :min="1" v-model="userFormValidate.total_time" style="width:240px" placeholder="请输入……"></InputNumber>
                </FormItem>
                <FormItem label="备注" prop="work_attendance_special_log">
                    <i-input v-model="userFormValidate.work_attendance_special_log" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="modal1 = false">取消</Button>
                <Button @click="handleSubmit('userFormValidate')" type="primary">确定</Button>
            </div>
        </Modal>
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
            userId: null,
            total: 0,
            query: { query: { status: '出差' } },
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
                    title: '出差日期',
                    key: 'start_time',
                    align: 'center',
                    render: (h, { row }) => {
                        return h('div', this.$dayjs(row.start_time).format('YYYY-MM-DD'))
                    }
                },
                {
                    title: '加班时长(h)',
                    key: 'total_time',
                    align: 'center'
                },
                {
                    title: '备注',
                    key: 'work_attendance_special_log',
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
            modal1: false,
            title: '',
            userFormValidate: {},
            userRuleValidate: {
                user_nickname: [{ required: true, type: 'string', message: '员工姓名不能为空', trigger: 'blur' }],
                department_name: [{ required: true, type: 'string', message: '部门不能为空', trigger: 'change' }],
                start_time: [{ required: true, type: 'date', message: '出差日期不能为空', trigger: 'blur' }],
                total_time: [{ required: true, type: 'number', message: '出差时长不能为空', trigger: 'change' }]
            }
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
                let res = await User.getSpecialUserWorkAttendanceList({ ...this.pagination, ...this.query })
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
        async addSpecialist() {
            try {
                this.userFormValidate.status = '出差'
                let res = await User.addSpecialist({ addInfo: this.userFormValidate })
                if (res.data.code === 1) {
                    this.$Message.success('添加员工出差信息成功！')
                    this.modal1 = false
                    this.initData()
                }
            } catch (error) {
                console.log(error)
                this.$Message.error('添加员工出差信息失败！')
            }
        },
        async updateSpecialist(id) {
            try {
                let res = await User.updateSpecialist({ ...{ special_user_work_attendance_id: id }, ...{ updateInfo: this.userFormValidate } })
                if (res.data.code === 1) {
                    this.$Message.success('修改员工出差信息成功！')
                    this.modal1 = false
                    this.initData()
                }
            } catch (error) {
                console.log(error)
                this.$Message.error('修改员工出差信息失败！')
            }
        },
        clickAdd() {
            this.modal1 = true
            this.title = '新增员工出差信息'
            this.$refs['userFormValidate'].resetFields()
            this.userFormValidate = {}
        },
        clickModify(row) {
            this.modal1 = true
            this.title = '修改员工出差信息'
            this.userFormValidate = JSON.parse(JSON.stringify(row))
            this.userId = row.special_user_work_attendance_id
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.title === '新增员工出差信息') {
                        this.addSpecialist()
                    } else {
                        this.updateSpecialist(this.userId)
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
                this.query = { query: { user_nickname: this.search_model, status: '出差' } }
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
