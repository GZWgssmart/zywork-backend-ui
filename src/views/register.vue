<template>
  <div id="register">
      <el-row>
        <el-col :lg="{span: 8, offset: 8}" :sm="24">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="手机号">
              <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="form.conPwd" type="password" placeholder="请输入确认密码"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.gender">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="居住区域">
              <el-select v-model="form.address" placeholder="请选择居住区域">
                <el-option label="章贡区" value="zg"></el-option>
                <el-option label="南康区" value="nk"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="送货时间">
              <el-col :span="11">
                <el-date-picker id="startDate" type="date" placeholder="请选择送货日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker id="endDate" type="fixed-time" placeholder="请选择送货时间" v-model="form.endDate" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="节假日配送">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="感兴趣内容">
              <el-checkbox-group v-model="form.hobby">
                <el-checkbox-button label="书籍" name="type"></el-checkbox-button>
                <el-checkbox-button label="手机" name="type"></el-checkbox-button>
                <el-checkbox-button label="家电" name="type"></el-checkbox-button>
                <el-checkbox-button label="家居" name="type"></el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="个人说明">
              <el-input type="textarea" v-model="form.desc" placeholder="请输入个人说明"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        form: {
          name: '',
          pwd: '',
          conPwd: '',
          gender: '男',
          address: '',
          startDate: '',
          endDate: '',
          delivery: true,
          hobby: ['家居'],
          desc: ''
        }
      }
    },
    methods: {
      register: function () {
        console.log('register')
      }
    }
  }
</script>

<style scoped>

</style>
