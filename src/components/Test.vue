<template>
  <div id="test">
    <el-button @click="showUploadDialog=true">打开</el-button>
    <UploadImageVideo v-if="showUploadDialog" 
      @close="showUploadDialog=false"></UploadImageVideo>
  </div>
</template>

<script>
import UploadImageVideo from './UploadImageVideo'

export default {
  name: 'Test',
  data() {
    return {
      showUploadDialog: true
    }
  },
  components: {UploadImageVideo}
}
</script>

<style lang='less' scoped>

</style>
