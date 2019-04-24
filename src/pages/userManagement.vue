<template>
  <div class="user_list_wrapper">
    <ul class="user_list_title">
      <li>序号</li>
      <li>用户名称</li>
      <li>是否管理员</li>
      <li>是否停用</li>
      <li>信息修改</li>
    </ul>
    <userList
      :userList="usersList"
      @updateUserStop="changeUserStop"
      @updateUserAdmin="changeUserAdmin"
      @updatePsw="resetPsw"
    ></userList>
    <pagination
      v-if="isShowPagination"
      :pageSize="pageSize"
      :totalPage="totalPage"
      :pageSizes="pageSizes"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import userList from "@/components/userList";
import pagination from "@/common/pagination";
import {
  getAllUser,
  changeUserStop,
  changeUserAdmin,
  resetPsw,
  assignOption
} from "@/assets/js/connect";
export default {
  name: "userConfig",
  components: {
    userList,
    pagination
  },
  mounted() {
    let param = {
      pageNum: this.currentPage,
      pageSize: this.pageSize
    };
    this._getAllUser(param);
  },
  computed: {
    ...mapGetters(["getAjaxParam"])
  },
  data() {
    return {
      usersList: [],
      pageSize: 10,
      currentPage: 1,
      totalPage: 0,
      pageSizes: [10, 20, 30, 50],
      isShowPagination: false
    };
  },
  methods: {
    _getAllUser(param) {
      let self = this;
      let options = self.getAjaxParam;
      getAllUser(assignOption(param,options)).then(res => {
        if (res.data.status == 0) {
          console.log(res.data.data);
          self.usersList = res.data.data;
          self.totalPage = res.data.totalPage;
          self.isShowPagination =
            self.totalPage > 0 && self.totalPage > self.pageSize ? true : false;
        }
      });
    },
    handleSizeChange(param) {
      console.log(param);
      this.pageSize = param.pageSize;
      this.currentPage = param.pageNum;
      this._getAllUser(param);
    },
    handleCurrentChange(param) {
      this.pageSize = param.pageSize;
      this.currentPage = param.pageNum;
      this._getAllUser(param);
    },
    changeUserStop(param) {
      let self = this;
      let options = self.getAjaxParam;
      changeUserStop(assignOption(param, options)).then(res => {
        if (res.data.status == 0) {
          self.$message({
            message: res.data.message,
            type: "success"
          });
          let param = {
            pageNum: self.currentPage,
            pageSize: self.pageSize
          };
          self._getAllUser(param);
        }
      });
    },
    changeUserAdmin(param) {
      let self = this;
      let options = self.getAjaxParam;
      changeUserAdmin(assignOption(param, options)).then(res => {
        if (res.data.status == 0) {
          self.$message({
            message: res.data.message,
            type: "success"
          });
          let param = {
            pageNum: self.currentPage,
            pageSize: self.pageSize
          };
          self._getAllUser(param);
        }
      });
    },
    resetPsw(id) {
      let self = this;
      let options = self.getAjaxParam;
      this.$prompt("请输入新密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[0-9]/,
        inputErrorMessage: "密码格式不正确"
      }).then(({ value }) => {
        resetPsw(assignOption({ userId: id,newPassword:value}, options)).then(res => {
          if (res.data.status == 0) {
            self.$message({
              type: "success",
              message: res.data.message
            });
          } else {
            self.$message({
              type: "error",
              message: res.data.message
            });
          }
        });
      }).catch(() => {
           console.log('cancel')
        });
    }
  }
};
</script>
<style scoped>
.user_list_title {
  display: flex;
}
.user_list_title > li {
  width: 20%;
  text-align: center;
}
</style>

