<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
        <!-- 未登录状态结构 -->
        <div class="login banner" v-if="islogin" >
          <van-row></van-row>
          <van-row>
            <van-col span='12'>
              <van-row type='flex' justify='space-around' align='center' style="height:100%" >
                <van-image  round width="1.5rem" height="1.5rem" :src="userInfo.photo" />
                <span class="mobile">{{userInfo.name}}</span>
              </van-row>
            </van-col>

            <van-col span='7'></van-col>

            <van-col span='5'>
             <van-row type='flex' justify='center' align='center' style="height:100%" >
               <van-button size="mini" round>
                编辑按钮
              </van-button>
             </van-row>
            </van-col>
          </van-row>
          <van-row>

          <van-grid class="grid" :border='false'>
          <van-grid-item text="头条" > <template #icon>{{userInfo.art_count}}</template></van-grid-item>
          <van-grid-item text="粉丝" > <template #icon>{{userInfo.fans_count
}}</template></van-grid-item>
          <van-grid-item text="关注" > <template #icon>{{userInfo.follow_count
}}</template></van-grid-item>
          <van-grid-item text="获赞" > <template #icon>{{userInfo.like_count
}}</template></van-grid-item>
          </van-grid>
          </van-row>
        </div>
        <!-- 登录状态结构 -->
        <div class="logout banner" v-else  @click="$router.push('/login')">
          <van-image width="1.76rem" height="1.76rem" :src="mobileSrc"></van-image>
          <span class="text">登陆 / 注册</span>
        </div>
    </header>

    <!-- 主体 -->
    <main>
      <van-grid column-num="2" clickable>

          <van-grid-item text="收藏" >
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>

          <van-grid-item text="历史">
              <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>

      </van-grid>
      <div class="link">
              <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 底部 -->
    <footer>
        <van-button block v-if="islogin" @click="logout">退出</van-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '@/assets/images/mobile.png'
// 引入API
import { getUserInfoAPI } from '@/api/index'
export default {
  name: 'My',
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  methods: {
    async logout() {
      // this.$dialog.confirm
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否退出该账号'
      })
      // TOKEN设置为空对象
      this.$store.commit('SET_TOKEN', {})
    },
    // 获取用户信息
    async getUser() {
      try {
        // 如果用户登陆的时候调用 如果用户没有登陆就不用获取信息
        if (!this.islogin) return
        const { data } = await getUserInfoAPI()
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        // error 1.js 2.axios(4xx客户端 5xx服务端)
        // error有response代表是axios的错误
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登陆')
        } else {
          throw error
        }
      }
    }
  },
  computed: {
    ...mapGetters(['islogin'])
  },
  created() {
    this.getUser()
  }
}
</script>

<style scoped>
.profile {
  background-color:#f6f7f9 ;
  height: 100vh;
}

.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('/src/assets/images/banner.png') no-repeat 0 0 / cover ;
}
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

 .logout .text {
  font-size: 30px;
  color: #fff;
  margin-top: 10px;
}
.login {
  display: flex;
  flex-direction: column;
}

.login > .van-row {
  flex:1
}
.mobile {
    font-size: 30px;
  color: #fff
}
.van-col {
  height: 100%;
}
.edit-btn {
  width: 1.6rem;
  height: 0.42667rem;
  color: #666;
}
:deep(.grid) {
  color: #fff;
}
:deep(.grid .van-grid-item__content ){
  font-size: 30px;
  background-color: inherit;
}
:deep(.grid .van-grid-item__text) {
  color: #fff;
}
.link {
  margin: 10px 0;
}
:deep( .toutiao) {
  font-size: 40px ;
}
:deep(.toutiao-shoucang) {
  color: red;
}
:deep( .toutiao-lishi) {
  color: orange;
}
</style>
