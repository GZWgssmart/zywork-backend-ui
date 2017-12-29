<template>
  <div id="login">
      <el-row>
        <el-col :lg="{span: 8, offset: 8}" :sm="24">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="手机号">
              <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login">登录</el-button>
              <router-link to="/register">我要注册</router-link>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
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

</style>
