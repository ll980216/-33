<template>
  <div>
    <!-- @click="$emit('change-keywords',suggestion[index])自定义事件 把当前点击的keywords赋给keywords -->
    <van-cell icon="search" v-for="(item,index) in highLightSuggestions" :key="index" @click="$emit('change-keywords',suggestion[index])">
        <template #title>
        <span v-html="item"></span>
    </template></van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { getSuggestionAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestion: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  computed: {
    highLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestion.map((str) => {
        return str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      })
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionAPI(this.keywords)
        // console.log(data)
        // filter可以把所有假值过滤
        this.suggestion = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('获取搜索建议失败')
        } else {
          throw error
        }
      }
    }, 3000)
  }
}
</script>

<style>

</style>
