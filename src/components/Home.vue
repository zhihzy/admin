<template>
  <div>
      <el-button @click="signOut" type="info">signOut</el-button>
  </div>
</template>

<script>
export default {
    methods:{
        signOut(){
            sessionStorage.clear('openId')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>