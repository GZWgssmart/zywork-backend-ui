<template>
  <div class="app-sider">
    <el-menu class="el-menu-vertical-demo" text-color="#000"
    @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-menu-item index="1" @click="$router.push('/index')">
        <i class="fa fa-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/users')">
        <i class="fa fa-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="fa fa-user-secret"></i>
        <span slot="title">权限管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="fa fa-bell"></i>
        <span slot="title">消息管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="fa fa-book"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-submenu index="6">
        <template slot="title">
          <i class="fa fa-bar-chart"></i>
          <span slot="title">报表管理</span>
        </template>
        <el-menu-item-group>
          <span slot="title">Excel</span>
          <el-menu-item index="6-1">选项1</el-menu-item>
          <el-menu-item index="6-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="PDF报表">
          <el-menu-item index="6-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="6-4">
          <span slot="title">选项4</span>
          <el-menu-item index="6-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="7">
        <i class="fa fa-suitcase"></i>
        <span slot="title">流程管理</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="fa fa-calendar"></i>
        <span slot="title">作业管理</span>
      </el-menu-item>
      <el-menu-item index="9">
        <i class="fa fa-credit-card"></i>
        <span slot="title">支付管理</span>
      </el-menu-item>
      <el-menu-item index="10">
        <i class="fa fa-file"></i>
        <span slot="title">日志管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'AppSider',
    props: ['menuCollapsed'],
    computed: {
      collapsed () {
        return this.menuCollapsed
      },
      isCollapse () {
        return this.menuCollapsed
      }
    },
    methods: {
      handleOpen (key, keyPath) {
      },
      handleClose (key, keyPath) {
      }
    }
  }
</script>

<style scoped>
</style>
