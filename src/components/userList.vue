<template>
  <ul class="userList">
    <li v-for="(user,index) in userList" :key="user._id">
      <span>{{index + 1}}</span>
      <span>{{user.username}}</span>
      <span>
        <el-radio-group v-model="user.userAdmin">
          <el-radio @change="updateUserAdmin({userId:user._id,userAdmin:1})" label="1">是</el-radio>
          <el-radio @change="updateUserAdmin({userId:user._id,userAdmin:0})" label="0">否</el-radio>
        </el-radio-group>
      </span>
      <span>
        <el-radio-group v-model="user.userStop">
          <el-radio @change="updateUserStop({userId:user._id,userStop:true})" :label="true">是</el-radio>
          <el-radio @change="updateUserStop({userId:user._id,userStop:false})" :label="false">否</el-radio>
        </el-radio-group>
      </span>
      <span>
        <el-button type="primary" @click="updatePsw(user._id)">重置密码</el-button>
      </span>
    </li>
  </ul>
</template>
<script>
export default {
  name: "userList",
  props: ["userList"],
  methods: {
    updatePsw(id) {
      this.$emit("updatePsw", id);
    },
    updateUserAdmin(param) {
      this.$emit("updateUserAdmin", param);
    },
    updateUserStop(param) {
      this.$emit("updateUserStop", param);
    }
  }
};
</script>
<style scoped>
.userList > li {
  display: flex;
  margin: 15px 0;
  align-items: center;
}
.userList > li span {
  width: 20%;
  display: inline-block;
  text-align: center;
}
</style>



