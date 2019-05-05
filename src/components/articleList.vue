<template>
  <div>
    <ul class="article_list_title">
      <li>序号</li>
      <li>文章标题</li>
      <li>创建时间</li>
      <li>操作</li>
    </ul>
    <articleListView :articleList="articles" @editor="articleEditor" @deleteArticle="deleteArticle"></articleListView>
    <pagination
      :pageSize="pageSize"
      :totalPage="totalPage"
      :pageSizes="pageSizes"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
  </div>
</template>
<script>
import articleListView from '@/common/articleListView'
import pagination from '@/common/pagination'
import { getArticle, articleDelete, assignOption } from '@/assets/js/connect'
import { mapGetters } from 'vuex'
export default {
  name: 'articleList',
  components: {
    articleListView,
    pagination
  },
  data () {
    return {
      articles: [],
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20, 30],
      totalPage: 0
    }
  },
  mounted () {
    let param = {
      pageNum: this.currentPage,
      pageSize: this.pageSize
    }
    this._getArticles(param)
  },
  computed: {
    ...mapGetters(['getAjaxParam'])
  },
  methods: {
    _getArticles (param) {
      let options = this.getAjaxParam
      getArticle(assignOption(param, options)).then(res => {
        if (res.data.status == 0) {
          this.articles = res.data.articleList
          this.totalPage = res.data.totalPage
          if (this.totalPage == 0) {
            this.$message('暂无任何评论信息')
          }
        }
      })
    },
    articleEditor (id) {
      console.log(id)
      this.$router.push({
        path: '/admin/article/articleEditor',
        query: {
          id: id
        }
      })
    },
    deleteArticle (id) {
      console.log(id)
      let options = this.getAjaxParam
      let param = {
        articleId: id
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          articleDelete(assignOption(param, options)).then(res => {
            if (res.data.status == 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              let param = {
                pageNum: this.currentPage,
                pageSize: this.pageSize
              }
              this._getArticles(param)
            }
          })
        })
        .catch(() => {
          console.log('cancel')
        })
    },
    handleSizeChange (param) {
      this.commonFun(param)
    },
    handleCurrentChange (param) {
      this.commonFun(param)
    },
    commonFun (param) {
      this.currentPage = param.pageNum
      this.pageSize = param.pageSize
      this._getArticles(param)
    }
  }
}
</script>
<style scoped>
.article_list_title {
  display: flex;
  border-bottom: 1px solid #ddd;
}

.article_list_title > li {
  width: 25%;
  text-align: center;
  line-height: 40px;
}
</style>


