<template>
  <div>
    <div id="themes">
      <el-dropdown>
        <span class="el-dropdown-link">主题<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="color-blue"><span @click="changeTheme(colorBlue)">默认</span></el-dropdown-item>
          <el-dropdown-item class="color-green"><span @click="changeTheme(colorGreen)">绿色</span></el-dropdown-item>
          <el-dropdown-item class="color-red"><span @click="changeTheme(colorRed)">红色</span></el-dropdown-item>
          <el-dropdown-item class="color-dark"><span @click="changeTheme(colorDark)">黑色</span></el-dropdown-item>
          <el-dropdown-item class="color-orange"><span @click="changeTheme(colorOrange)">橙色</span></el-dropdown-item>
          <el-dropdown-item divided><span @click="showChooseColor">自定义</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 颜色选择对话框 -->
    <el-dialog title="选择主题颜色" :visible.sync="chooseColorVisible" width="300px" center>
      <div style="text-align: center;">
        <el-color-picker v-model="choosedColor"></el-color-picker><br/><br/>
        <el-button @click="cancelChooseColor">取 消</el-button>
        <el-button type="primary" @click="chooseColor()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import generateColors from '../utils/color'
  export default {
    name: 'ThemePicker',
    data () {
      return {
        elementStyle: '',
        zyworkStyle: '',
        currColor: '409EFF',
        colorBlue: '409EFF',
        colorDark: '353635',
        colorRed: 'CC3399',
        colorGreen: '00CC99',
        colorOrange: 'FFCC00',
        newColor: '',
        chooseColorVisible: false,
        choosedColor: ''
      }
    },
    methods: {
      getStyles () {
        this.elementStyle = document.querySelectorAll('style')[0].innerText
        this.zyworkStyle = document.querySelectorAll('style')[1].innerText
      },
      writeNewStyle (currColor, newColor) {
        const currColors = generateColors(currColor)
        const newColors = generateColors(newColor)
        currColors.forEach((oColor, index) => {
          this.elementStyle = this.elementStyle.replace(new RegExp(oColor, 'ig'), newColors[index])
        })
        this.zyworkStyle = this.zyworkStyle.replace(new RegExp(currColor, 'ig'), newColor)
        document.querySelectorAll('style')[0].innerText = this.elementStyle
        document.querySelectorAll('style')[1].innerText = this.zyworkStyle
      },
      changeTheme (hexColor) {
        this.newColor = hexColor
        if (this.currColor !== this.newColor) {
          this.writeNewStyle(this.currColor, this.newColor)
          this.currColor = this.newColor
        }
      },
      showChooseColor () {
        this.chooseColorVisible = true
        this.choosedColor = '#' + this.currColor
      },
      chooseColor () {
        this.changeTheme(this.choosedColor.substr(1, this.choosedColor.length - 1))
        this.chooseColorVisible = false
      },
      cancelChooseColor () {
        this.chooseColorVisible = false
      }
    },
    created () {
      this.getStyles()
    },
    mounted () {
      this.$nextTick(() => {
        this.originalStylesheetCount = document.styleSheets.length
      })
    }
  }
</script>
<style scoped>
  #themes {
    cursor: pointer;
    margin-right: 20px;
  }

  #themes span {
    color: #fff;
  }

  .color-blue {
    background-color: #409EFF;
    color: #fff;
  }

  .color-dark {
    background-color: #353635;
    color: #fff;
  }

  .color-green {
    background-color: #00CC99;
    color: #fff;
  }

  .color-orange {
    background-color: #FFCC00;
    color: #fff;
  }

  .color-red {
    background-color: #CC3399;
    color: #fff;
  }
</style>
