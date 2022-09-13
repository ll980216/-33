<template>
  <div class="article">
    <van-pull-refresh v-model="isrefresh" @refresh="onLoad">
      <van-list @load="onLoad" offset="100" :immediate-check='false' v-model='loading' :finished="finished" finished-text="没有更多了" :error.sync='error' error-text="请求失败，点击重新刷新">
        <ArticleItem v-for="item in articles" :key="item.art_id " :article="item"></ArticleItem>
    </van-list>
    </van-pull-refresh>
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
      articles: [],
      pretimestamp: [],
      loading: false,
      finished: false,
      error: false,
      isrefresh: false
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
        // 在当前时间戳获取下一页
        this.pretimestamp = data.data.pre_timestamp
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
    },
    // 下滑加载
    async onLoad() {
      // console.log(1)
      // 在当前时间戳获取下一页
      try {
        const { data } = await getArticle(this.id, this.pretimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 判断是下拉刷新还是下滑加载
        if (this.isrefresh) {
          this.articles.unshift(...data.data.results)
        } else {
          // 添加每一项到articles
          this.articles.push(...data.data.results)
        }

        // 拿到articles 取出.pre_timestamp获取下一页时间戳
        this.pretimestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // 把loading改成false 把放在最外面 不管是对错都执行
        this.loading = false
        this.isrefresh = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article {
height: calc(100vh - 92px - 82px - 100px);
overflow: auto;
}
// // 如何给盒子拥有自己的滚动条
// // - 1.定高 2.overflow:auto/scroll/overlay
// .article {
//   height: calc(100vh - 92px - 83px - 100px);
//   overflow: auto;

//   // &: 代表当前元素他爹
//   // ::-webkit-scrollbar : 滚动槽
//   // ::-webkit-scrollbar-thumb: 滚动的滑块
//   &::-webkit-scrollbar {
//     width: 10px;
//     background-color: transparent;
//   }
//   &::-webkit-scrollbar-thumb {
//     background-color: #3296fa;
//     border-radius: 10px;
//   }
// }
</style>
