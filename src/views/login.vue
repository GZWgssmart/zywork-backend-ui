<template>
  <div id="login">
    <el-row>
      <el-col :lg="{span: 8, offset: 8}" :sm="24">
        <div class="loginForm">
          <h3 class="title">{{ loginTitle }}</h3>
          <el-form ref="form" :model="form">
            <el-form-item>
              <el-input v-model="form.phone" placeholder="请输入手机号/邮箱/账户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item :lg="8" :sm="24">
              <el-button type="primary" @click="login" style="width: 100%;">登录</el-button>
            </el-form-item>
          </el-form>
          <span class="copyright">Copyright &copy; <a href="http://zywork.top">zywork.top</a>  2017</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        loginTitle: 'zywork系统登录',
        form: {
          name: '',
          pwd: ''
        }
      }
    },
    methods: {
      login () {
        console.log('login')
        this.$router.push('/home')
      }
    }
  }
</script>

<style scoped>
  #login {
    background-color: #E9EEF3;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
  }

  .loginForm {
    padding: 52px 30px 30px 30px;
    background-color: #fff;
    box-shadow: 10px 10px 5px #888888;
    text-align: center;
  }

  .title {
    color: #505458;
    margin: auto auto 20px auto;
  }

  .copyright {
    color: #c0c4cc;
    text-align: center;
    font-size: 10px;
  }

  .copyright a:link, a:visited, a:active {
    color: #c0c4cc;
  }
</style>
