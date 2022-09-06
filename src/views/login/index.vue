<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登陆" class="nav-bar"/>
    <!-- 表单
    :rules对象 表单校验规则，required必填项，message不通过表单校验的提示信息
    -->
    <van-form @submit="onSubmit" class="form">
        <van-field v-model="mobile" name="请输入手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请填写手机号' },{pattern:/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,message:'手机格式错误'}]" >
            <template #label>
                <span class="toutiao toutiao-shouji"></span>
            </template>
        </van-field>
        <van-field v-model="code"  placeholder="请输入验证码" :rules="[{ required: true, message: '请输入验证码' },{pattern:/[0-9]{6}/,message:'验证码格式错误'}]" >
            <template #label>
                <span class="toutiao toutiao-yanzhengma"></span >
            </template>
        </van-field>
        <div style="margin: 16px;">
            <van-button  block type="info" native-type="submit">提交</van-button>
        </div>
</van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
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
</style>
