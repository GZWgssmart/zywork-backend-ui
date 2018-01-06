<template>
  <div>
    <div id="logo" :class="collapsed ? 'nav-menu-collapse' : 'nav-menu-extend'" v-html="systemLogo">
    </div>
    <i class="fa fa-navicon collapse-menu" @click="collapseMenu"></i>
    <div id="options">
      <div id="systems">
        <el-dropdown>
            <span class="el-dropdown-link">
              <i class="fa fa-diamond"></i>&nbsp;
              选择系统<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="system in systems" :key="system.name" @click.native="$router.push(system.path)">
              {{ system.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <theme-picker style="float: left;"></theme-picker>
      <div id="user-info">
        <el-dropdown>
            <span class="el-dropdown-link user-info-inner">
              <img src='../../static/images/user.jpg'/>
              <span>zywork.top</span>
            </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="fa fa-info-circle"></i>&nbsp;我的信息</el-dropdown-item>
            <el-dropdown-item><i class="fa fa-cog"></i>&nbsp;设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="$router.push('/login')"><i class="fa fa-sign-out"></i>&nbsp;安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
  import ThemePicker from '@/components/ThemePicker'
  export default {
    components: {
      ThemePicker
    },
    name: 'AppHeader',
    props: ['menuCollapsed'],
    data () {
      return {
        systemLogo: 'zywork',
        systems: [
          {
            name: '用户中心',
            path: '/users'
          },
          {
            name: '权限管理',
            path: '/users'
          },
          {
            name: '内容管理',
            path: '/users'
          },
          {
            name: '消息管理',
            path: '/users'
          },
          {
            name: '报表管理',
            path: '/users'
          },
          {
            name: '作业管理',
            path: '/users'
          },
          {
            name: '流程管理',
            path: '/users'
          },
          {
            name: '支付管理',
            path: '/users'
          },
          {
            name: '日志管理',
            path: '/users'
          },
          {
            name: '系统管理',
            path: '/users'
          }
        ]
      }
    },
    computed: {
      collapsed () {
        return this.menuCollapsed
      }
    },
    methods: {
      collapseMenu () {
        if (this.collapsed) {
          this.systemLogo = 'zywork'
        } else {
          this.systemLogo = '&nbsp;'
        }
        this.$emit('collapseChange')
      }
    }
  }
</script>
<style scoped>
  #logo {
    float: left;
    border-right: 1px solid #E9EEF3;
    padding-left: 20px;
    font-weight: bold;
    font-size: 20px;
  }

  #options {
    float: right;
    margin-right: 20px;
  }

  #systems {
    float: left;
    margin-right: 20px;
    cursor: pointer;
  }

  #systems span {
    color: #fff;
  }

  #user-info {
    float: left;
    cursor: pointer;
  }

  .user-info-inner {
    display: block;
    height: 60px;
    line-height: 60px;
    color: #fff;
  }

  .user-info-inner img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 10px;
    margin-top: 10px;
    float: left;
  }

  .collapse-menu {
    font-size: 20px;
    margin-left: 15px;
    cursor: pointer;
  }
</style>
