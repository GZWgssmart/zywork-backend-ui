<template>
  <div id="users">
    <div class="page-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>所有用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="toolbar">
      <el-form :inline="true" class="demo-form-inline">
        <div class="toolbar-input">
          <el-form-item>
            <el-input v-model="query.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.address" placeholder="地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker v-model="query.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-button type="text" @click="toggleMoreSearch">{{ moreSearchText }}</el-button>
          <div v-show="moreSearch">
            <el-form-item>
              <el-select v-model="query.status" placeholder="选择状态">
                <el-option label="激活" value="1"></el-option>
                <el-option label="冻结" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <city-picker v-model="query.city" placeholder="请选择城市" @change="chooseCity" change-on-select></city-picker>
            </el-form-item>
          </div>
        </div>
        <div class="toolbar-button">
          <el-button type="primary" icon="fa fa-search" @click="search">查询</el-button>
          <el-button type="primary" icon="fa fa-search" @click="search">查询所有</el-button>
          <el-button type="primary" icon="fa fa-plus" @click="showAdd">添加</el-button>
        </div>
        <p style="clear: both;"></p>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        type="index"
        label="编号"
        width="50">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        label="生日"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="状态"
        width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">
            激活
          </el-tag>
          <el-tag v-else type="danger">
            冻结
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="123">
        <template slot-scope="scope">
          <el-tooltip content="编辑" placement="top" effect="dark">
            <el-button size="mini" icon="fa fa-pencil-square-o" @click="showEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip v-if="scope.row.status" content="冻结" placement="top" effect="dark">
            <el-button size="mini" icon="fa fa-times" @click="activeStatus(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip v-else content="激活" placement="top" effect="dark">
            <el-button size="mini" icon="fa fa-check" @click="activeStatus(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="20"
        layout="total, sizes, prev, pager, next, jumper"
        :total="200">
      </el-pagination>
    </div>

    <!-- 添加dialog -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible">
      <el-form>
        <el-form-item>
          <el-input v-model="userData.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="userData.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userData.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="doAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑dialog -->
    <el-dialog title="编辑用户" :visible.sync="editDialogVisible">
      <el-form>
        <el-form-item>
          <el-input v-model="userData.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="userData.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userData.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="doEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import CityPicker from '@/components/CityPicker/CityPicker'
  export default {
    components: {
      CityPicker
    },
    name: 'users',
    data () {
      return {
        moreSearch: false,
        moreSearchText: '高级搜索',
        query: {
          name: '',
          date: '',
          address: '',
          status: '',
          city: ['江西省', '赣州市', '章贡区']
        },
        userData: {
          name: '',
          date: '',
          address: '',
          status: ''
        },
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 0
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 0
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          status: 1
        }],
        multipleSelection: [],
        currentPage: 1,
        addDialogVisible: false,
        editDialogVisible: false
      }
    },
    methods: {
      showAdd () {
        this.addDialogVisible = true
      },
      doAdd () {
        console.log('do add')
        this.addDialogVisible = false
      },
      cancelAdd () {
        this.addDialogVisible = false
        this.userData = {
          name: '',
          date: '',
          address: '',
          status: ''
        }
      },
      showEdit (row) {
        this.editDialogVisible = true
        this.userData = row
      },
      doEdit () {
        console.log('do edit')
        this.editDialogVisible = false
      },
      cancelEdit () {
        this.editDialogVisible = false
        this.userData = {
          name: '',
          date: '',
          address: '',
          status: ''
        }
      },
      activeStatus (row) {
        if (row.status === 1) {
          console.log('to inactive')
          row.status = 0
        } else {
          console.log('to active')
          row.status = 1
        }
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
        console.log(this.multipleSelection)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleClick (row) {
        console.log(row)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      toggleMoreSearch () {
        this.moreSearch = !this.moreSearch
        this.moreSearch ? this.moreSearchText = '取消高级搜索' : this.moreSearchText = '高级搜索'
      },
      search () {
        console.log('开始搜索')
      },
      chooseCity (value) {
        this.query.city = value
      }
    }
  }
</script>

<style scoped>
</style>
