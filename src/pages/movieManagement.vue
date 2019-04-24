<template>
  <div class="movie">
    <el-button type="primary" @click="addMovie">新增电影</el-button>
    <ul class="movies_list_title">
      <li>序号</li>
      <li>电影名称</li>
      <li>电影海报</li>
      <li>更新时间</li>
      <li>点赞</li>
      <li>下载</li>
      <li>是否推荐</li>
      <li>更新</li>
      <li>删除</li>
    </ul>
    <MoviesList :moviesList="moviesList" @updateMovie="updateMovie" @removeMovie="removeMovie"></MoviesList>
    <pagination
      :pageSize="pageSize"
      :totalPage="totalPage"
      :pageSizes="pageSizes"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
    <MovieAdd
      @success="success"
      :dialogVisible="dialogFormVisible"
      @hideDialog="hideDialog"
      :updateMovieId="updateMovieId"
      :form="form"
    ></MovieAdd>
  </div>
</template>
<script>
import {
  getMovies,
  getMovieDetail,
  movieDel,
  assignOption
} from "@/assets/js/connect";
import MoviesList from "@/components/moviesList";
import MovieAdd from "@/components/movieAdd";
import pagination from "@/common/pagination";
import {mapGetters} from "vuex";
export default {
  name: "movieManagement",
  components: {
    MoviesList,
    MovieAdd,
    pagination
  },
  data() {
    return {
      moviesList: [],
      dialogFormVisible: false,
      updateMovieId: "",
      totalPage: 0,
      pageSize: 6,
      currentPage: 1,
      pageSizes: [6, 12, 18, 24],
      form: {
        movieName: "",
        movieImg: "",
        movieDownload: "",
        movieMainPage: false
      }
    };
  },
  computed: {
    ...mapGetters(["getAjaxParam"])
  },
  mounted() {
    let param = {
      pageNum: this.currentPage,
      pageSize: this.pageSize
    };
    this._getMovies(param);
  },
  methods: {
    _getMovies(param) {
      let self = this;
      getMovies(param).then(res => {
        let dat = res.data;
        if (dat.status == 0) {
          self.moviesList = dat.data;
          self.totalPage = dat.totalPage;
        }
      });
    },
    addMovie() {
      this.dialogFormVisible = true;
      this.form = {
        movieName: "",
        movieImg: "",
        movieDownload: "",
        movieMainPage: false
      };
    },
    hideDialog(data) {
      this.dialogFormVisible = data;
    },
    updateMovie(id) {
      //更新操作
      this.updateMovieId = id;
      let param = {
        movieId: id
      };
      this._getMovieDetail(param);
    },
    removeMovie(id) {
      //删除操作
      let self = this;
      let options = self.getAjaxParam;
      movieDel(assignOption({ movieId: id },options)).then(res => {
        if (res.data.status == 0) {
          self.$message({
            message: res.data.message,
            type: "success"
          });
          this._getMovies();
        } else {
          self.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    success() {
      let param = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      };
      this._getMovies(param);
    },
    _getMovieDetail(id) {
      let self = this;
      let options = self.getAjaxParam;
      getMovieDetail(assignOption(id,options)).then(res => {
        if (res.data.status == 0) {
          self.updateMovieDetail = res.data.data[0];
          self.form = Object.assign(self.form, res.data.data[0]);
          self.dialogFormVisible = true;
        }
      });
    },
    handleSizeChange(param) {
      console.log(param);
      this.pageSize = param.pageSize;
      this._getMovies(param);
    },
    handleCurrentChange(param) {
      this._getMovies(param);
    }
  }
};
</script>
<style scoped>
.movies_list_title {
  display: flex;
}
.movies_list_title > li {
  width: 10%;
  text-align: center;
  line-height: 40px;
}
.movies_list_title > li:nth-of-type(2) {
  width: 15%;
}
.movies_list_title > li:nth-of-type(3) {
  width: 15%;
}
</style>

