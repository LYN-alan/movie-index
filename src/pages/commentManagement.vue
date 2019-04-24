<template>
  <div class="comment_management">
    <ul class="com_mag_title">
      <li>序号</li>
      <li>用户姓名</li>
      <li>评论内容</li>
      <li>审核状态</li>
      <li>审核</li>
      <li>删除</li>
    </ul>
    <commentsList
      :commentsList="commentsList"
      @checkComment="checkComment"
      @deleteComment="deleteComment"
    ></commentsList>
    <pagination
      v-show="isShowPagination"
      :pageSize="pageSize"
      :totalPage="totalPage"
      :pageSizes="pageSizes"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
  </div>
</template>
<script>
import commentsList from "@/components/commentsList";
import pagination from "@/common/pagination";
import {mapGetters} from "vuex";
import {
  getAllComment,
  checkComment,
  delComment,
  assignOption
} from "@/assets/js/connect";
export default {
  name: "commentManagement",
  components: {
    commentsList,
    pagination
  },
  data() {
    return {
      commentsList: [],
      currentPage: 1,
      pageSizes: [10, 15, 20, 30],
      pageSize: 10,
      totalPage: 0,
      isShowPagination: false
    };
  },
  mounted() {
    let param = {
      pageNum: this.currentPage,
      pageSize: this.pageSize
    };
    this._getAllcomment(param);
  },
  computed: {
    ...mapGetters(["getAjaxParam"])
  },
  methods: {
    _getAllcomment(param) {
      let self = this;
      getAllComment(param).then(res => {
        if (res.data.status == 0) {
          self.commentsList = res.data.data;
          self.totalPage = res.data.totalPage;
          self.isShowPagination =
            self.totalPage > 0 && self.totalPage > self.pageSize ? true : false;
          if (self.totalPage == 0) {
            self.$message("暂无任何评论信息");
          }
        }
      });
    },
    checkComment(data) {
      let param = {
        commentId: data
      };
      let self = this;
      let options = self.getAjaxParam
      checkComment(assignOption(param,options)).then(res => {
        if (res.data.status == 0) {
          this.$message({
            type: "success",
            message: res.data.message
          });
          let param = {
            pageNum: self.currentPage,
            pageSize: self.pageSize
          };
          self._getAllcomment(param);
        }
      });
    },
    deleteComment(val) {
      let commentId = val;
      let self = this;
      let options = self.getAjaxParam
      self
        .$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          delComment(
            assignOption({ commentId: commentId},options)
          ).then(res => {
            if (res.data.status == 0) {
              self.$message({
                type: "success",
                message: "删除成功!"
              });
              let param = {
                pageNum: self.currentPage,
                pageSize: self.pageSize
              };
              self._getAllcomment(param);
            }
          });
        })
        .catch(() => {
          self.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(param) {
      this.pageSize = param.pageSize;
      this._getAllcomment(param);
    },
    handleCurrentChange(param) {
      this._getAllcomment(param);
    }
  }
};
</script>
<style scoped>
.com_mag_title {
  display: flex;
  line-height: 40px;
  font-size: 1em;
}
.com_mag_title > li {
  width: 10%;
  text-align: center;
}
.com_mag_title > li:nth-of-type(3) {
  width: 50%;
}
</style>

