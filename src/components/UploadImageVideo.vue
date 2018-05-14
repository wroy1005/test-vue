<template>
  <div id="root">
    <el-dialog :visible="true"
      :before-close="closeDialog"
      title="UploadImageAndVideo">
      <div slot="title">
          <el-radio v-model="radio"
            @change="changeType"
            :label="1">仅上传封面图片</el-radio>
          <el-radio v-model="radio"
            @change="changeType"
            :label="2">上传封面图片和视频</el-radio>
        <p>选择本地视频上传，注意：视频大小不能超过10M，务必传正方形比例1:1，否则会按头图尺寸裁剪，分辨率不低于400*400</p>
      </div>
      <!-- only image -->
      <section>
        <div class="imgbox">

        </div>
      </section>

      <!-- video image -->
      <section>
        <div class="btn-wrapper">
          <input style="display:none;"
            ref="file"
            type="file"
            @change="fileChangeHandler"
            name=""
            id="">
          <el-button @click="selectVideo">上传视频</el-button>
        </div>

        <div>
          <el-row>
            <el-col :span="24">
              <el-progress :text-inside="true"
                :stroke-width="18"
                :percentage="percent"></el-progress>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div>
                <video controls
                  :src="videoSrc"></video>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <img :src="imageSrc"
                  alt="">
              </div>
            </el-col>
          </el-row>

        </div>
      </section>

    </el-dialog>
  </div>
</template>
<script>

import * as qiniu from 'qiniu-js'

const ONLY_IMAGE = 1;
const VIDEOIMAGE = 2;

export default {
  name: 'UploadImageVideo',
  props: ['show'],
  data() {
    return {
      isShow: this.show,
      radio: ONLY_IMAGE,
      videoSrc: '',
      imageSrc: '',
      percent: 0,
    }
  },
  methods: {
    closeDialog( done ) {
      this.$confirm( '确定关闭？' )
      .then( () => this.$emit( 'close' ) )
    },
    changeType( type ) { },

    selectVideo() {
      this.$refs.file.click();
    },

    fileChangeHandler( e ) {
      const file = e.target.files[0]
      if ( file ) {
        this.uploadVideo( file );

        return;

        const fileReader = new FileReader()
        fileReader.onload = e => {
          this.videoSrc = e.target.result
        }
        fileReader.readAsDataURL( file )
      }
    },

    closeVideo() {

    },

    // 通过canvas获取视频封面截图

    uploadVideo( file ) {
      const token = 'pVr_5htSMpghDwBmtFNiei121ul5fbiD2CTDloIn:yOAQZk998kdRt78hbni1U8rMJ6c=:eyJwZXJzaXN0ZW50T3BzIjoiYXZ0aHVtYlwvbXA0XC92Y29kZWNcL2xpYngyNjRcL3dtSW1hZ2VcL2FIUjBjRG92TDI5a1puRm1NMm8yZHk1aWEzUXVZMnh2ZFdSa2JpNWpiMjB2ZG1sa1pXOWZkMkYwWlhKdFlYSnJNaTV3Ym1jPVwvd21HcmF2aXR5XC9Ob3J0aEVhc3RcL3dtT2Zmc2V0WFwvLTE1XC93bU9mZnNldFlcLzE1fHNhdmVhc1wvYzNrdGRtbGtaVzg2TVdZNU1qTmpZemRrTkdVNFpEUTFZbVF4TkRKbE9EVTJNMlZtT1RRMFptUT0iLCJwZXJzaXN0ZW50UGlwZWxpbmUiOiJzb3lvdW5nX2ZpZm8iLCJyZXR1cm5Cb2R5Ijoie1wibmFtZVwiOiQoa2V5KSxcImhhc2hcIjokKGV0YWcpLFwicGlkXCI6JChwZXJzaXN0ZW50SWQpfSIsInNjb3BlIjoic3ktdmlkZW8iLCJkZWFkbGluZSI6MTUyNjI4NTM3NX0=';
      const key = null; // 设置为null，可以使用默认的hash值替代。
      const next = res => {
        this.percent = Math.round( res.total.percent )
      }
      const error = error => {
        console.log( error, 'error' )
        alert( error.message )
      }
      const complete = res => {
        const vlink = '//videosy.soyoung.com/' + res.name
        this.videoSrc = vlink
        this.imageSrc = vlink + '?vframe/jpg/offset/0'
      }

      const observable = qiniu.upload( file, key, token )
      const subscription = observable.subscribe( { next, error, complete } /* observer */ );
      // subscription.unsubscribe() // 上传取消
    }


    // 789
  }
}
</script>

<style lang='less' scoped>
video,
img {
  max-width: 300px;
  max-height: 300px;
}
</style>
