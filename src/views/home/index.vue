<template>
  <div>
    <!-- 搜索导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button icon='search' size='small' round block>搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 频道及频道展示 -->
    <van-tabs v-model="active" swipeable >
  <van-tab :title="item.name" v-for="item in channels" :key="item.id">
    <ArtcleList :id="item.id"></ArtcleList>
  </van-tab>
  <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
</van-tabs>
<!-- close-icon-position="top-left"关闭的icon位置左上方 -->
<van-popup v-model="isShow" position="bottom" :style="{height: '100%'}" closeable close-icon-position="top-left">
  <ChennlEdit :myChannels="channels" @chang-active='[(isShow = false),(active = $event)]'></ChennlEdit>
</van-popup>
  </div>
</template>

<script>
// ? 空值合并运算符： ?? ===>相当于 || 常用于语句
// ? 可选链操作符：   ?  ===>前面是undefined,那么不会往后取值

import { getChannelAPI } from '@/api'
import ArtcleList from '@/views/home/components/ArtcleList.vue'
import ChennlEdit from '@/views/home/components/ChennlEdit.vue'
export default {
  components: {
    ArtcleList,
    ChennlEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  created() {
    this.getChannel()
  },
  methods: {
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        // console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        // 如果没有respone就是js错误
        if (!error.respone) {
          throw error
        } else {
          // axios错误
          const status = error.respone.status
          // status === 507 && this.$toast.fail('服务器异常，请刷新')
          status === 507 && this.$toast.fail('服务器异常，请刷新')
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>
.navbar {
background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
