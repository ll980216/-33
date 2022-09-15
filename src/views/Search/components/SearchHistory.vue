<template>
  <div>
    <!-- 搜索历史标题 -->
    <van-cell title="搜索历史">
      <template #extra>
        <!-- 切换垃圾状态 -->
        <van-icon name="delete-o" v-if="!isEdit" @click="isEdit = true" />
        <div v-else>
          <span @click="$store.commit('SET_HISTORIES',[])">全部删除</span>&nbsp;
          <span @click="isEdit = false">完成</span>
        </div>
      </template>
    </van-cell>
    <!-- 搜索历史 -->
    <van-cell v-for="item in histories" :key="item" :title="item" @click="!isEdit && $emit('change-keywords',item)">
      <template #extra>
        <!-- item为传进去的每一项，i是当前histories遍历的当前项，当Item不等于i为真，去除相同项 -->
        <van-icon name="close" v-show="isEdit" @click="$store.commit('SET_HISTORIES',histories.filter(i => item !== i))"/>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 是否是编辑状态
      isEdit: false
    }
  },
  computed: {
    ...mapState(['histories'])
  }
}
</script>

<style></style>
