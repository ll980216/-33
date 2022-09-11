<template>
  <div>
    <ArticleItem v-for="item in articles" :key="item.art_id " :article="item"></ArticleItem>
  </div>
</template>

<script>
// 发送请求 拿到当前文章数据
import { getArticle } from '@/api'
import ArticleItem from '@/views/home/components/ArticleItem.vue'
export default {
  name: 'articles',
  props: {
    id: [String, Number]
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.getFristPageArticles()
  },
  methods: {
    async getFristPageArticles() {
    // 获取第一页时间戳
      try {
        const { data } = await getArticle(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
      } catch (error) {
        const status = error.re.status
        // !error.response 取反是js错误
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
