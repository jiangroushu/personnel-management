<template>
    <div class="container">
        <h1>招聘管理</h1>
        <div class="button-wrap">
            适合岗位:
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
                <FormItem label="适合岗位" prop="position">
                    <i-input v-model="userFormValidate.position" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <i-input v-model="userFormValidate.name" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="员工性别" prop="gender">
                    <Select style="width:240px" placeholder="请选择……" v-model="userFormValidate.gender">
                        <Option :value="1">男</Option>
                        <Option :value="0">女</Option>
                    </Select>
                </FormItem>
                <FormItem label="年龄" prop="age">
                    <InputNumber v-model="userFormValidate.age" style="width:240px" placeholder="请输入……"></InputNumber>
                </FormItem>
                <FormItem label="学历" prop="education">
                    <Select style="width:240px" placeholder="请选择……" v-model="userFormValidate.education">
                        <Option value="大学专科">大学专科</Option>
                        <Option value="大学本科">大学本科</Option>
                        <Option value="硕士研究生">硕士研究生</Option>
                        <Option value="博士研究生">博士研究生</Option>
                    </Select>
                </FormItem>
                <FormItem label="联系电话" prop="phone">
                    <i-input v-model="userFormValidate.phone" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <i-input v-model="userFormValidate.email" style="width:240px" placeholder="请输入……"></i-input>
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
            total: 0,
            query: {},
            loading: false,
            modal1: false,
            title: '',
            userFormValidate: {},
            userRuleValidate: {
                position: [{ required: true, type: 'string', message: '适合职位不能为空', trigger: 'blur' }],
                name: [{ required: true, type: 'string', message: '姓名不能为空', trigger: 'blur' }],
                gender: [{ required: true, type: 'number', message: '性别不能为空', trigger: 'change' }],
                age: [{ required: true, type: 'number', message: '年龄不能为空', trigger: 'blur' }],
                education: [{ required: true, type: 'string', message: '学历不能为空', trigger: 'change' }],
                phone: [{ required: true, type: 'string', message: '联系电话不能为空', trigger: 'blur' }],
                email: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }]
            }
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
                        title: '编号',
                        type: 'index',
                        align: 'center'
                    },
                    {
                        title: '适合岗位',
                        key: 'position',
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('div', row.gender ? '男' : '女')
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        align: 'center'
                    },
                    {
                        title: '学历',
                        key: 'education',
                        align: 'center'
                    },
                    {
                        title: '联系电话',
                        key: 'phone',
                        align: 'center'
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                        align: 'center',
                        width: 170
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
                ]
            }
        }
    },
    methods: {
        async initData() {
            this.loading = true
            try {
                let res = await User.getRecruitList({ ...this.pagination, ...this.query })
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
        async addRecruitList() {
            try {
                let res = await User.addRecruitList({ addInfo: this.userFormValidate })
                if (res.data.code === 1) {
                    this.$Message.success('添加招聘人员信息成功！')
                    this.modal1 = false
                    this.initData()
                }
            } catch (error) {
                console.log(error)
                this.$Message.error('添加招聘人员信息失败！')
            }
        },
        async updateRecruitList(id) {
            try {
                let res = await User.updateRecruitList({ ...{ recruit_id: id }, ...{ updateInfo: this.userFormValidate } })
                if (res.data.code === 1) {
                    this.$Message.success('修改招聘人员信息成功！')
                    this.modal1 = false
                    this.initData()
                }
            } catch (error) {
                console.log(error)
                this.$Message.error('修改招聘人员信息失败！')
            }
        },
        clickAdd() {
            this.modal1 = true
            this.title = '添加招聘人员信息'
            this.$refs['userFormValidate'].resetFields()
            this.userFormValidate = {}
        },
        clickModify(row) {
            this.modal1 = true
            this.title = '修改招聘人员信息'
            this.userFormValidate = JSON.parse(JSON.stringify(row))
            this.userId = row.recruit_id
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    if (this.title === '添加招聘人员信息') {
                        this.addRecruitList()
                    } else {
                        this.updateRecruitList(this.userId)
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
                this.query = { query: { position: this.search_model } }
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
