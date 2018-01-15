<template>
  <div class="user-home">
    <el-container>
      <el-header>
      <app-header :menuCollapsed="menuCollapsed" @collapseChange="changeCollapsed"/>
      </el-header>
      <el-container class="contentContainer">
        <app-sider :menuCollapsed="menuCollapsed"/>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
      <el-footer>
        <app-footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import contentRouter from '../router'
  import AppHeader from '@/components/AppHeader/AppHeader'
  import AppSider from '@/components/AppSider/AppSider'
  import AppFooter from '@/components/AppFooter/AppFooter'

  export default {
    name: 'userhome',
    data () {
      return {
        menuCollapsed: false,
        asideStyle: ''
      }
    },
    created () {
      this.$router.push('/index')
    },
    components: {
      AppHeader,
      AppSider,
      AppFooter
    },
    methods: {
      changeCollapsed () {
        this.menuCollapsed = !this.menuCollapsed
        this.menuCollapsed ? this.asideStyle = 'flex: 0 1 60px' : this.asideStyle = 'flex: 0 1 200px'
      }
    },
    router: contentRouter
  }
</script>

<style scoped>

  .user-home {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .contentContainer {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
</style>
