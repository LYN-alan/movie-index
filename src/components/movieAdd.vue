<template>
  <el-dialog title="新增电影" :visible.sync="dialogVisible" :show-close="hideClose">
    <el-form ref="form" :model="form" :rules="rules" label-position="left">
      <el-form-item label="电影名称" :label-width="formLabelWidth" required prop="movieName">
        <el-input v-model="form.movieName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电影海报" :label-width="formLabelWidth" required prop="movieImg">
        <el-input v-model="form.movieImg" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电影下载地址" :label-width="formLabelWidth" required prop="movieDownload">
        <el-input v-model="form.movieDownload" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否主页推荐" :label-width="formLabelWidth" required>
        <el-radio v-model="form.movieMainPage" :label="false">否</el-radio>
        <el-radio v-model="form.movieMainPage" :label="true">是</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { movieAdd,movieUpdate} from "@/assets/js/connect";
export default {
  props: ["dialogVisible", "form", "updateMovieId"],
  data() {
    return {
      hideClose: false,
      rules: {
        movieName: [
          { required: true, message: "请输入电影名称", triggr: "blur" }
        ],
        movieImg: [
          { required: true, message: "请输入电影海报图片地址", triggr: "blur" }
        ],
        movieDownload: [
          { required: true, message: "请输入电影下载地址", triggr: "blur" }
        ]
      },
      formLabelWidth: "120px"
    };
  },
  mounted() {
    console.log();
  },
  methods: {
    submitForm(formName) {
      let self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          if (self.updateMovieId == '') {
            movieAdd(self.form).then(res => {
              if (res.data.status == 0) {
                self.hideDialog();
                self.$message({
                  message: res.data.message,
                  type: "success"
                });
                self.$emit("success");
              } else {
                self.$message({
                  message: res.data.message,
                  type: "error"
                });
              }
            });
          } else {
            movieUpdate({movieId:self.updateMovieId,movieInfo:Object.assign(self.form,{movieTime:Date.now()})}).then(res=>{
              if(res.data.status == 0){
                self.$message({
                  message: res.data.message,
                  type: "success"
                });
                self.hideDialog();
                self.$emit("success");
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    hideDialog() {
      let hideFlag = false;
      this.$refs["form"].resetFields();
      this.$emit("hideDialog", hideFlag);
    }
  }
};
</script>

