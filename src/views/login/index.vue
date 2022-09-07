<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登陆" class="nav-bar"/>
    <!-- 表单
    :rules对象 表单校验规则，required必填项，message不通过表单校验的提示信息
    -->
    <van-form @submit="onSubmit" class="form" ref="form">
        <van-field v-model="mobile" name="mobile" placeholder="请输入手机号" :rules="mobileRules" >
            <template #label>
                <span class="toutiao toutiao-shouji"></span>
            </template>
        </van-field>
        <van-field v-model="code"  name="code" placeholder="请输入验证码" :rules="codeRules" >
            <template #label>
                <span class="toutiao toutiao-yanzhengma"></span >
            </template>
            <template #button>
              <van-button class="btn" block type="default" native-type="button" size="small" round v-if="islShowBtn" @click="sendCode">获取验证码</van-button>
              <!-- time 倒计时秒数 -->
              <van-count-down v-else :time="10 *1000" format="ss秒" @finish='islShowBtn = true'/>
            </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button  block type="info" native-type="submit">登陆</van-button>
        </div>
</van-form>
  </div>
</template>

<script>
// 封装
import { mobileRules, codeRules } from '@/views/login/rule.js'
// 引入API
import { login, sendAPI } from '@/api/index'
// 引入
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      islShowBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    // loading
    // message:提示文案
    // forbiClick:禁止点击
    // duration 展示时长，为0会一直展示，登陆状态和此项互斥，显示其一
    async onSubmit() {
      // 登陆前提示
      // this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      //   duration: 0
      // })
      this.loading()
      // 登陆
      try {
        const { data } = await login(this.mobile, this.code)
        // token存进vuex
        this.SET_TOKEN(data.data)
        this.$router.push({
          path: '/profile'
        })
        this.$toast.success('登陆成功')
      } catch (error) {
        // 如果登陆失败，提示用户
        // 如果是手机号验证码错误，用户知悉
        // error: js的错 axios封装的error对象

        // axios封装的error对象
        //  -error.response.data 后端返回的数据
        //  -error.response.status 后端返回的状态码
        // this.$toast.fail('登陆失败')
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // js导致的错  507
          console.dir(error)
          this.$toast.clear()
          // throw error
        }
      }
    },
    async sendCode() {
      // 1.发送请求 验证用户是否输入有效的手机号 利用$refs.ref.validate('需要验证项')
      await this.$refs.form.validate('mobile')
      // console.log('发送请求')
      // 1.发送请求
      this.loading()
      try {
        await sendAPI(this.mobile)
        this.islShowBtn = false
        this.$toast.success('发送验证码成功')
      } catch (error) {
        // this.$toast.fail('发送验证码失败')
        if (error.response && (error.response.status === 429 || error.response.status === 404)) {
          // axios的错误
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
      // 2.显示倒计时组件
      this.islShowBtn = false
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    }
  }
}
</script>

<style scoped lang='less'>
.nav-bar {
    // scoped 样式作用于当前的组件
    //vue-cli 提供语法：deep() 深度选择器
    background-color:#3296fa ;
    :deep(.van-nav-bar__title) {
        color: #fff;
    }
}
:deep(.form ){
    .van-cell__title{
        flex: 1;
    }
   .van-cell__value {
        flex:20;
    }
    .toutiao {
        font-size: 40px;
    }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
