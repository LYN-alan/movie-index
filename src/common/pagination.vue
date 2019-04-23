<template>
        <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="totalPage"
      class="pagination"
    ></el-pagination>
</template>
<script>
export default {
    name:'pagination',
    props: ['pageSize','totalPage','pageSizes'],
    data(){
        return {
            currentPage:1,
        }
    },
    methods: {
        handleSizeChange(val){
            let param = {
                pageNum:this.currentPage,
                pageSize:val
            }
            this.$emit('handleSizeChange',param)
        },
        handleCurrentChange(val){
            let param = {
                pageNum : this.currentPage,
                pageSize:this.pageSize
            }
            this.$emit('handleCurrentChange',param)
        }
    },
}
</script>
<style scoped>
.pagination {
  text-align: center;
  padding-top: 30px;
}
</style>


