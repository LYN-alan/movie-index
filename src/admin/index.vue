<template>
  <div class="admin-index">
    <el-container class="admin-home">
      <el-header class="header">
        <AdminHeader :userInfo="getUserInfo"></AdminHeader>
      </el-header>
      <el-container>
        <el-aside width="10vw" class="aside-wrapper">
          <Aside></Aside>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import AdminHeader from "@/components/adminHeader";
import Aside from '@/components/adminAside';
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {},
  components: {
    AdminHeader,
    Aside
  },
  computed: {
    ...mapGetters(["getUserInfo"])
  }
};
</script>
<style scoped>
.header {
  background-color: #409EFF;
}
.main{
  padding: 10px;
}
.admin-index,.admin-home{
  width: 100%;
  height: 100%;
}
.aside-wrapper{
  border-right: 2px solid #409EFF;
}
</style>


