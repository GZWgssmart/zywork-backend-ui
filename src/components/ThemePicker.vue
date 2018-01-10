<template>
  <div>
    <div id="themes">
      <el-dropdown>
        <span class="el-dropdown-link">主题<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="background-color: #409EFF; color: #fff;" @click.native="changeTheme(colorBlue)">蓝色</el-dropdown-item>
          <el-dropdown-item style="background-color: #00CC99; color: #fff;" @click.native="changeTheme(colorGreen)">绿色</el-dropdown-item>
          <el-dropdown-item style="background-color: #CC3399; color: #fff;" @click.native="changeTheme(colorRed)">红色</el-dropdown-item>
          <el-dropdown-item style="background-color: #353635; color: #fff;" @click.native="changeTheme(colorDark)">黑色</el-dropdown-item>
          <el-dropdown-item style="background-color: #FFCC00; color: #fff;" @click.native="changeTheme(colorOrange)">橙色</el-dropdown-item>
          <el-dropdown-item divided @click.native="showChooseColor">自定义</el-dropdown-item>
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
  import generateColors from '../utils/Color'
  import getFile from '../utils/File'
  export default {
    name: 'ThemePicker',
    data () {
      return {
        elementStyle: '',
        zyworkStyle: '',
        linkStyle: '',
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
        let styles = document.querySelectorAll('style')
        if (styles && styles.length >= 2) {
          this.elementStyle = styles[0].innerText
          this.zyworkStyle = styles[1].innerText
        } else {
          getFile(document.querySelectorAll('link')[0].href).then(({ data }) => {
            this.linkStyle = data
          })
        }
      },
      modifyStyles (currColor, newColor, currColors, newColors) {
        currColors.forEach((currColor, index) => {
          this.elementStyle = this.elementStyle.replace(new RegExp(currColor, 'ig'), newColors[index])
        })
        this.zyworkStyle = this.zyworkStyle.replace(new RegExp(currColor, 'ig'), newColor)
        document.querySelectorAll('style')[0].innerText = this.elementStyle
        document.querySelectorAll('style')[1].innerText = this.zyworkStyle
      },
      addStyleFromLink (currColors, newColors) {
        currColors.forEach((currColor, index) => {
          this.linkStyle = this.linkStyle.replace(new RegExp(currColor, 'ig'), newColors[index])
        })
        let styles = document.querySelectorAll('style')
        if (styles && styles.length >= 1) {
          document.head.lastChild.innerText = this.linkStyle
        } else {
          const style = document.createElement('style')
          style.innerText = this.linkStyle
          document.head.appendChild(style)
        }
      },
      writeNewStyle (currColor, newColor) {
        const currColors = generateColors(currColor)
        const newColors = generateColors(newColor)
        if (this.elementStyle !== '') {
          this.modifyStyles(currColor, newColor, currColors, newColors)
        } else if (this.linkStyle !== '') {
          this.addStyleFromLink(currColors, newColors)
        }
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
</style>
