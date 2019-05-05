<template>
<ul class="article_list_content">
  <li v-for="(article,index) in articleList" :key="article._id">
    <span>{{index + 1}}</span>
    <span :title="article.articleTitle">{{article.articleTitle}}</span>
    <span :title="timeFormat(article.articleTime)">{{timeFormat(article.articleTime)}}</span>
    <span>
        <el-button type="primary" class="editor_btn" @click="editor(article._id)">编辑</el-button>
        <el-button type="primary" class="delete_btn" @click="deleteArticle(article._id)">删除</el-button>
    </span>
  </li>
</ul>
</template>
<script>
import { timeFormat } from '@/assets/js/common'
export default {
  name: 'articlelist',
  props: ['articleList'],
  methods: {
    timeFormat (str) {
      return timeFormat(str)
    },
    editor (id) {
      this.$emit('editor', id)
    },
    deleteArticle (id) {
      this.$emit('deleteArticle', id)
    }
  }
}
</script>
<style scoped>
.article_list_content>li{
    display: flex;
    align-items: center;
    padding: 6px;
    border-bottom: 1px solid #ddd;
}
.article_list_content>li>span{
    display: inline-block;
    width: 25%;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
