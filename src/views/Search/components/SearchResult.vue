<template>
  <div class="results">
      <!-- 获取第一页和下一页数据并渲染 -->
    <van-list @load="getResults" v-model="loading" :finished="finished"
  finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击加载更多">
      <van-cell v-for="item in results" :key="item.art_id" :title="item.title" @click="$router.push({
        path: '/detail',
        query: { articleId: item.art_id }
      })"></van-cell>
    </van-list>
    <!-- 获取第一页和下一页数据并渲染 -->
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
// import { finished } from 'stream'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    // 获取第一页和下一页数据并渲染
    async getResults() {
      try {
        // if (Math.random() < 0.8) {
        //   throw new Error()
        // }
        // 发送请求 keywords是自己设置的搜索关键词
        const { data } = await getResultsAPI(this.page++, this.perPage, this.keywords)
        const results = data.data.results
        if (results.length === 0) {
          this.finished = true
        }
        // 类似于Push 把之前的results拆分解构
        this.results = [...this.results, ...results]
      } catch (error) {
        this.error = true
      } finally {
        // 关闭loading
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.results {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
