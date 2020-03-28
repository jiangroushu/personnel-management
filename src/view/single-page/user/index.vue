<template>
    <div class="container">
        <h1>员工信息管理</h1>
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
            :page-size="pagination.limit"
            :current.sync="pagination.page"
            show-sizer
            show-total
            @on-change="initData"
            @on-page-size-change="changePageSize"
        />
        <Modal v-model="modal1" :title="title">
            <Form ref="userFormValidate" :model="userFormValidate" :label-width="140" :rules="userRuleValidate">
                <FormItem label="姓名" prop="user_nickname">
                    <i-input v-model="userFormValidate.user_nickname" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="员工性别" prop="user_sex">
                    <Select style="width:240px" placeholder="请选择……" v-model="userFormValidate.user_sex">
                        <Option :value="1">男</Option>
                        <Option :value="0">女</Option>
                    </Select>
                </FormItem>
                <FormItem label="出生日期" prop="user_birth">
                    <DatePicker style="width:240px" :options="options" type="date" placeholder="请选择……" v-model="userFormValidate.user_birth"></DatePicker>
                </FormItem>
                <FormItem label="学历" prop="user_education">
                    <Select style="width:240px" placeholder="请选择……" v-model="userFormValidate.user_education">
                        <Option value="大学专科">大学专科</Option>
                        <Option value="大学本科">大学本科</Option>
                        <Option value="硕士研究生">硕士研究生</Option>
                        <Option value="博士研究生">博士研究生</Option>
                    </Select>
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
                <FormItem label="职位" prop="user_position">
                    <i-input v-model="userFormValidate.user_position" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="住址" prop="user_address">
                    <i-input v-model="userFormValidate.user_address" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="联系电话" prop="user_phone">
                    <i-input v-model="userFormValidate.user_phone" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="邮箱" prop="user_email">
                    <i-input v-model="userFormValidate.user_email" style="width:240px" placeholder="请输入……"></i-input>
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
                page: 1,
                pageNum: 10
            },
            title: '',
            total: 0,
            query: {},
            loading: false,
            modal1: false,
            userId: null,
            columns1: [
                {
                    title: '员工编号',
                    key: 'user_info_id',
                    width: 85,
                    align: 'center',
                    render: (h, { row }) => {
                        return h('div', `${10000 + row.user_info_id}`)
                    }
                },
                {
                    title: '员工姓名',
                    key: 'user_nickname',
                    align: 'center'
                },
                {
                    title: '性别',
                    key: 'user_sex',
                    align: 'center',
                    render: (h, { row }) => {
                        return h('div', row.user_sex ? '男' : '女')
                    }
                },
                {
                    title: '出生日期',
                    key: 'user_birth',
                    width: 100,
                    align: 'center',
                    render: (h, { row }) => {
                        return h('div', this.$dayjs(row.user_birth).format('YYYY-MM-DD'))
                    }
                },
                {
                    title: '学历',
                    key: 'user_education',
                    align: 'center'
                },
                {
                    title: '部门',
                    key: 'department_name',
                    align: 'center'
                },
                {
                    title: '职位',
                    key: 'user_position',
                    align: 'center'
                },
                {
                    title: '住址',
                    key: 'user_address',
                    align: 'center'
                },
                {
                    title: '联系电话',
                    key: 'user_phone',
                    width: 110,
                    align: 'center'
                },
                {
                    title: '邮箱',
                    key: 'user_email',
                    width: 150,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'created_time',
                    width: 120,
                    align: 'center',
                    render: (h, { row }) => {
                        return h(
                            'div',
                            {
                                style: {
                                    color: '#348FE4',
                                    fontSize: '14px',
                                    cursor: 'pointer'
                                }
                            },
                            [
                                h(
                                    'span',
                                    {
                                        style: {
                                            margin: '0 10px',
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => this.clickModify(row)
                                        }
                                    },
                                    '修改'
                                ),
                                h(
                                    'span',
                                    {
                                        style: {
                                            cursor: 'pointer'
                                        },
                                        on: {
                                            click: () => this.clickDelete(row)
                                        }
                                    },
                                    '删除'
                                )
                            ]
                        )
                    }
                }
            ],
            options: {
                disabledDate(date) {
                    return date && date.valueOf() > Date.now()
                }
            },
            userFormValidate: {},
            userRuleValidate: {
                user_nickname: [{ required: true, type: 'string', message: '员工姓名不能为空', trigger: 'blur' }],
                user_sex: [{ required: true, type: 'number', message: '性别不能为空', trigger: 'change' }],
                user_birth: [{ required: true, type: 'date', message: '出生年月日不能为空', trigger: 'blur' }],
                user_education: [{ required: true, type: 'string', message: '学历不能为空', trigger: 'change' }],
                department_name: [{ required: true, type: 'string', message: '部门不能为空', trigger: 'change' }],
                user_position: [{ required: true, type: 'string', message: '职位不能为空', trigger: 'blur' }],
                user_address: [{ required: true, type: 'string', message: '住址不能为空', trigger: 'blur' }],
                user_phone: [{ required: true, type: 'string', message: '联系电话不能为空', trigger: 'blur' }],
                user_email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }]
            }
        }
    },
    created() {
        this.initData()
    },
    methods: {
        async initData() {
            this.loading = true
            try {
                let res = await User.getUserList({ ...this.pagination, ...this.query })
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
        async addUser() {
            try {
                let res = await User.addUser({ addInfo: this.userFormValidate })
                if (res.data.code === 1) {
                    this.$Message.success('添加员工信息成功！')
                    this.modal1 = false
                    this.initData()
                }
            } catch (error) {
                console.log(error)
                this.$Message.error('添加员工信息失败！')
            }
        },
        async updateUser(id) {
            try {
                let res = await User.updateUser({ ...{ user_info_id: id }, ...{ updateInfo: this.userFormValidate } })
                if (res.data.code === 1) {
                    this.$Message.success('修改员工信息成功！')
                    this.modal1 = false
                    this.initData()
                }
            } catch (error) {
                console.log(error)
                this.$Message.error('修改员工信息失败！')
            }
        },
        changePageSize(pageSize) {
            this.pagination.limit = pageSize
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
        },
        clickAdd() {
            this.modal1 = true
            this.title = '添加员工信息'
            this.$refs['userFormValidate'].resetFields()
            this.userFormValidate = {}
        },
        clickModify(row) {
            this.modal1 = true
            this.title = '修改员工信息'
            this.userFormValidate = JSON.parse(JSON.stringify(row))
            this.userId = row.user_info_id
        },
        clickDelete(row) {
            this.$Modal.confirm({
                title: '温馨提示',
                content: `确定要删除${row.user_nickname}的个人信息吗？`,
                onOk: async () => {
                    try {
                        let res = await User.updateUser({ ...{ user_info_id: row.user_info_id }, ...{ updateInfo: { is_del: 1 } } })
                        if (res.data.code === 1) {
                            this.$Message.success('删除成功！')
                            this.initData()
                        }
                    } catch (error) {
                        console.log(error)
                        this.$Message.error('删除失败')
                    }
                },
                onCancel: () => {
                    this.$Message.info('已取消！')
                }
            })
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.title === '添加员工信息') {
                        this.addUser()
                    } else {
                        this.updateUser(this.userId)
                    }
                }
            })
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
