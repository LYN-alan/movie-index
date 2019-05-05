<template>
  <div class="article_editor_wrapper">
    <p>文章标题:</p>
    <el-input v-model="articleTitle" placeholder="请输入文章标题"></el-input>
    <p>文章内容:</p>
    <quill-editor
      class="qill-editor"
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <el-upload
      ref="upload"
      :action="qnLocation()"
      :before-upload="beforeUpload"
      :data="uploadData"
      :on-success="upScuccess"
      style="display:none;"
    >
      <el-button
        size="small"
        type="primary"
        id="imgInput"
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-text="插入中,请稍候"
      >点击上传</el-button>
    </el-upload>
    <div class="publish_btn_wrapper">
      <el-button type="primary" class="publish_btn" @click="publish">发布</el-button>
    </div>
  </div>
</template>
<script>
import * as qiniu from 'qiniu-js'
import quill from 'quill'
import {
  getUploadToken,
  assignOption,
  addArticle,
  getArticleDetail,
  articleUpdate
} from '@/assets/js/connect'
import { mapGetters } from 'vuex'
const STATICDOMAIN = 'http://pqi5eodyz.bkt.clouddn.com/'
export default {
  name: 'articleEditor',
  data () {
    return {
      articleTitle: '',
      content: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ['link', 'image']
          ]
        },
        placeholder: '编辑内容...'
      },
      addRange: new Array(),
      uploadData: {},
      photoUrl: '', // 上传图片地址
      uploadType: '', // 上传的文件类型（图片、视频）
      fullscreenLoading: false,
      articleId: ''
    }
  },
  created () {
    this.articleId = this.$route.query.id
    if (this.articleId != '') {
      this.getArticleDetail()
    }
  },
  mounted () {
    // 为图片ICON绑定事件  getModule 为编辑器的内部属性
    this.$refs.myQuillEditor.quill
      .getModule('toolbar')
      .addHandler('image', this.imgHandler)
  },
  computed: {
    ...mapGetters(['getAjaxParam'])
  },
  methods: {
    onEditorBlur (editor) {},
    onEditorFocus (ev) {},
    onEditorChange (ev) {},
    getArticleDetail () {
      let param = {
        articleId: this.articleId
      }
      let options = this.getAjaxParam
      getArticleDetail(assignOption(param, options)).then(res => {
        if (res.data.status == 0) {
          console.log(res.data.data)
          let articleInfo = res.data.data
          this.articleTitle = articleInfo.articleTitle
          this.content = articleInfo.articleContext
        }
      })
    },
    publish () {
      if (this.articleTitle == '' || this.content == '') {
        this.$message.error('请完善文章信息')
        return
      }
      let options = this.getAjaxParam
      let param = {
        articleTitle: this.articleTitle,
        articleContext: this.content
      }
      if (this.aticleId == '') {
        this.addArticle(param)
      } else {
        this.updateArticle(param)
      }
    },
    updateArticle (param) {
      param.articleTime = Date.now()
      let articleUpInfo = { articleInfo: param, articleId: this.articleId }
      let options = this.getAjaxParam
      articleUpdate(assignOption(articleUpInfo, options)).then(res => {
        if (res.data.status == 0) {
          this.articleTitle = ''
          this.content = ''
          this.$message({
            type: 'success',
            message: res.data.message
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    addArticle (param) {
      addArticle(assignOption(param, options)).then(res => {
        if (res.data.status == 0) {
          this.articleTitle = ''
          this.content = ''
          this.$message({
            type: 'success',
            message: res.data.message
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    imgHandler (state) {
      console.log('img')
      this.addRange = this.$refs.myQuillEditor.quill.getSelection()
      if (state) {
        let fileInput = document.getElementById('imgInput')
        fileInput.click() // 加一个触发事件
      }
      this.uploadType = 'image'
    },
    qnLocation () {
      if (location.protocol === 'http:') {
        return 'http://up.qiniup.com'
      }
      return 'https://up.qiniup.com'
    },
    qnUpload (file) {
      this.fullscreenLoading = true
      const suffix = file.name.split('.')
      const ext = suffix.splice(suffix.length - 1, 1)[0]
      console.log(this.uploadType)
      let options = this.getAjaxParam
      console.log(options)
      return getUploadToken(options).then(res => {
        this.uploadData = {
          key: `image/${suffix.join('.')}_${new Date().getTime()}.${ext}`,
          token: res.data.token
        }
      })
    },
    beforeUpload (file) {
      return this.qnUpload(file)
    },
    upScuccess (e, file, fileList) {
      this.fullscreenLoading = false
      let vm = this
      let url = STATICDOMAIN + e.key
      console.log(e.key)
      if (url != null && url.length > 0) {
        // 将文件上传后的URL地址插入到编辑器文本中
        let value = url
        vm.addRange = vm.$refs.myQuillEditor.quill.getSelection()
        value = value.indexOf('http') !== -1 ? value : 'http:' + value
        vm.$refs.myQuillEditor.quill.insertEmbed(
          vm.addRange !== null ? vm.addRange.index : 0,
          vm.uploadType,
          value,
          quill.sources.USER
        ) // 调用编辑器的 insertEmbed 方法，插入URL
        vm.$refs.myQuillEditor.quill.getSelection(vm.addRange.index + 1)
      }
      this.$refs['upload'].clearFiles() // 插入成功后清除input的内容
    }
  }
}
</script>
<style>
.article_editor_wrapper {
  padding: 12px;
}
.publish_btn_wrapper {
  text-align: center;
  padding: 10px;
}
</style>
