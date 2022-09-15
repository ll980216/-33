<template>
     <div>
     <!-- 搜索框 -->
     <form action="/">
      <!-- @focus="isShowSeachResult=false"，把搜索入口关闭，有值进建议，没值进历史 -->
     <van-search class="search" v-model="keywords" background="#3296fa" placeholder="请输入搜索关键词" show-action @search='onSearch' @focus="isShowSeachResult=false" @cancel="$router.push('/')" />
    </form>
     <!-- 搜索历史/建议/搜索结果 -->
     <!-- <SearchHistory></SearchHistory>
     <SearchSuggestion></SearchSuggestion>
     <SearchResult></SearchResult> -->
     <component :is="componentName" :keywords='keywords' @change-keywords="onSearch"></component>
     </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import SearchHistory from '@/views/Search/components/SearchHistory.vue'
import SearchSuggestion from '@/views/Search/components/SearchSuggestion.vue'
import SearchResult from '@/views/Search/components/SearchResult.vue'
export default {
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      isShowSeachResult: false
    }
  },
  computed: {
    ...mapState(['histories']),
    componentName () {
    // this.keywords获取搜索框的值
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      // 触发了搜索条件 isShowSeachResult改变成ture,此时展示
      if (this.isShowSeachResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    // 声明一个变量 触发搜索，就把isShowSeachResult改成true展示
    onSearch(keywords) {
      // this.keywrods是输入框的数，keyword是搜索历史 数组去重
      const distinctHistories = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinctHistories)
      this.keywords = keywords
      this.isShowSeachResult = true
    }
  }
}
</script>

<style lang="less" scoped>
.search{
    [role="button"] {
     color:#fff
}
}
</style>
