<template>
  <div id="city-picker">
    <el-cascader v-model="currentValue" :options="addresses" @active-item-change="handleItemChange"
                 @change="handleChange" :props="props" v-bind="$props" ref="cityPicker"></el-cascader>
  </div>
</template>

<script>
  import CityData from '../../utils/CityData'
  export default {
    name: 'CityPicker',
    props: [
      'value',
      'placeholder',
      'change-on-select'
    ],
    data () {
      return {
        addresses: [],
        props: {
          value: 'label',
          label: 'label',
          children: 'subitems'
        },
        currProvinceIndex: -1,
        currProvinceCode: '',
        currCityIndex: -1,
        currCityCode: ''
      }
    },
    created () {
      this.showProvinces()
      this.showCityWhenCreated(this.currentValue)
      this.showDistrictWhenCreated(this.currentValue)
    },
    computed: {
      currentValue: {
        get: function () {
          return this.value
        },
        set: function (newValue) {
          this.$emit('change', newValue)
        }
      }
    },
    methods: {
      /** 从CityData.js中去获取所有的省并显示到级联组件的第一层级 */
      showProvinces () {
        let provinces = CityData._86
        for (let key in provinces) {
          this.addresses.push({
            code: key,
            label: provinces[key],
            subitems: []
          })
        }
      },
      /** 从CityData中根据选中的省的code来获取省下所有的市并显示到第二层级 */
      showCities (provinceName) {
        this.getProvinceInfo(provinceName)
        let cities = CityData[this.currProvinceCode]
        let provinceCities = this.addresses[this.currProvinceIndex].subitems
        if (provinceCities.length <= 0) {
          for (let key in cities) {
            provinceCities.push({
              code: key,
              label: cities[key],
              subitems: []
            })
          }
        }
      },
      /** 从CityData中根据选中的市的code来获取市下所有的区并显示到第三层级 */
      showDistricts (cityName) {
        this.getCityInfo(cityName)
        let districts = CityData[this.currCityCode]
        let cityDistricts = this.addresses[this.currProvinceIndex].subitems[this.currCityIndex].subitems
        if (cityDistricts.length <= 0) {
          for (let key in districts) {
            cityDistricts.push({
              code: key,
              label: districts[key]
            })
          }
        }
      },
      showCityWhenCreated (val) {
        let provinceName = val[0]
        if (provinceName !== undefined) {
          this.showCities(provinceName)
        }
      },
      showDistrictWhenCreated (val) {
        let cityName = val[1]
        if (cityName !== undefined) {
          this.showDistricts(cityName)
        }
      },
      /** 根据省名称获取vue绑定的addresses数据中被选中省的信息 */
      getProvinceInfo (provinceName) {
        let self = this
        this.addresses.forEach(function (data, index) {
          if (data.label === provinceName) {
            self.currProvinceIndex = index
            self.currProvinceCode = data.code
          }
        })
      },
      /** 根据市名称获取vue绑定的addresses数据中被选中的市的信息 */
      getCityInfo (cityName) {
        let self = this
        this.addresses[this.currProvinceIndex].subitems.forEach(function (data, index) {
          if (data.label === cityName) {
            self.currCityIndex = index
            self.currCityCode = data.code
          }
        })
      },
      handleItemChange (val) {
        let provinceName = val[0]
        let cityName = val[1]
        if (provinceName !== undefined && cityName === undefined) {
          this.showCities(provinceName)
        } else if (cityName !== undefined) {
          this.showDistricts(cityName)
        }
      },
      handleChange (val) {
        if (this.$refs.cityPicker.changeOnSelect) {
          this.handleItemChange(val)
        }
        this.$emit('changed', val)
      }
    }
  }
</script>
<style scoped>
  #city-picker {
    display: inline-block;
  }
</style>
