<template>
    <div class="container">
        <h1>培训管理</h1>
        <div class="button-wrap">
            活动名称:
            <Input placeholder="请输入……" clearable style="width: 200px" @keyup.enter.native="search" v-model="search_model" />
            <Button type="primary" style="margin-left:40px;" @click="search">搜索</Button>
            <Button style="margin-left:20px;" @click="reset">重置</Button>
            <Button type="primary" icon="md-add" style="float: right;" @click="clickAdd">添加</Button>
        </div>
        <Table :columns="columns1" :loading="loading1" :data="data1"></Table>
        <Page
            :total="total1"
            style="float:right;margin-top:20px;"
            :page-size="pagination.pageNum"
            :current.sync="pagination.page"
            show-sizer
            show-total
            @on-change="initData"
            @on-page-size-change="changePageSize"
        />
        <Modal v-model="modal1" title="添加培训活动信息">
            <Form ref="activeFormValidate" :model="activeFormValidate" :label-width="140" :rules="activeRuleValidate">
                <FormItem label="活动名称" prop="activity_name">
                    <i-input v-model="activeFormValidate.activity_name" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
                <FormItem label="部门" prop="activity_department">
                    <Select style="width:240px" placeholder="请选择……" v-model="activeFormValidate.activity_department">
                        <Option value="管理部">管理部</Option>
                        <Option value="运营部">运营部</Option>
                        <Option value="技术部">技术部</Option>
                        <Option value="人事部">人事部</Option>
                        <Option value="财务部">财务部</Option>
                    </Select>
                </FormItem>
                <FormItem label="活动开始时间" prop="activity_start_time">
                    <DatePicker
                        style="width:240px"
                        :options="options"
                        format="yyyy-MM-dd HH:mm:ss"
                        type="date"
                        placeholder="请选择……"
                        v-model="activeFormValidate.activity_start_time"
                    ></DatePicker>
                </FormItem>
                <FormItem label="活动结束时间" prop="activity_end_time">
                    <DatePicker
                        style="width:240px"
                        :options="options"
                        format="yyyy-MM-dd HH:mm:ss"
                        type="date"
                        placeholder="请选择……"
                        v-model="activeFormValidate.activity_end_time"
                    ></DatePicker>
                </FormItem>
                <FormItem label="备注" prop="activity_log">
                    <i-input v-model="activeFormValidate.activity_log" style="width:240px" placeholder="请输入……"></i-input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="modal1 = false">取消</Button>
                <Button @click="handleSubmit('activeFormValidate')" type="primary">确定</Button>
            </div>
        </Modal>
        <Modal v-model="modal2" title="活动具体参加人员">
            <Table :columns="columns2" :loading="loading2" :data="data2"></Table>

            <Page
                :total="total2"
                style="float:right;margin-top:20px;"
                :page-size="pagination1.pageNum"
                :current.sync="pagination1.page"
                show-sizer
                show-total
                @on-change="initData1"
                @on-page-size-change="changePageSize1"
            />
            <div slot="footer" style="height:25px"></div>
        </Modal>
    </div>
</template>

<script>
import User from '@/api/user'

export default {
    data() {
        return {
            data1: [],
            data2: [],
            search_model: '',
            pagination: {
                page: 1,
                pageNum: 10
            },
            pagination1: {
                page: 1,
                pageNum: 10
            },
            total1: 0,
            total2: 0,
            query: {},
            loading1: false,
            loading2: false,
            modal1: false,
            modal2: false,
            options: {
                disabledDate(date) {
                    return date && date.valueOf() < Date.now() - 86400000
                }
            },
            activeFormValidate: {},
            activeRuleValidate: {
                activity_name: [{ required: true, type: 'string', message: '活动名称不能为空', trigger: 'blur' }],
                activity_department: [{ required: true, type: 'string', message: '部门不能为空', trigger: 'change' }],
                activity_start_time: [{ required: true, type: 'date', message: '活动开始时间不能为空', trigger: 'blur' }],
                activity_end_time: [{ required: true, type: 'date', message: '活动结束时间不能为空', trigger: 'blur' }]
            },
            columns1: [
                {
                    title: '编号',
                    type: 'index',
                    align: 'center'
                },
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
                                        this.detail(row)
                                    }
                                }
                            },
                            '查看详情'
                        )
                    }
                }
            ],
            columns2: [
                {
                    title: '编号',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '员工姓名',
                    key: 'user_nickname',
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
            this.loading1 = true
            try {
                let res = await User.getActivityList({ ...this.pagination, ...this.query })
                if (res.data.code === 1) {
                    this.data1 = res.data.data.list.data
                    this.total1 = res.data.data.list.total
                }
                this.loading1 = false
            } catch (error) {
                this.loading1 = false
                console.log(error)
                this.$Message.error('数据获取失败！')
            }
        },
        async initData1(department) {
            this.loading2 = true
            try {
                let res = await User.getUserList({ ...this.pagination, ...{ query: { department_name: department } } })
                if (res.data.code === 1) {
                    this.data2 = res.data.data.list.data
                    this.total2 = res.data.data.list.total
                }
                this.loading2 = false
            } catch (error) {
                this.loading2 = false
                console.log(error)
                this.$Message.error('数据获取失败！')
            }
        },
        async addActive() {
            try {
                let res = await User.addActive({ addInfo: this.activeFormValidate })
                if (res.data.code === 1) {
                    this.$Message.success('添加培训活动信息成功！')
                    this.modal1 = false
                    this.initData()
                }
            } catch (error) {
                console.log(error)
                this.$Message.error('添加培训活动信息失败！')
            }
        },
        changePageSize(pageSize) {
            this.pagination.pageNum = pageSize
            this.initData()
        },
        changePageSize1(pageSize) {
            this.pagination1.pageNum = pageSize
        },
        clickAdd() {
            this.modal1 = true
            this.$refs['activeFormValidate'].resetFields()
            this.activeFormValidate = {}
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.addActive()
                }
            })
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
        },
        detail(row) {
            this.modal2 = true
            this.initData1(row.activity_department)
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
