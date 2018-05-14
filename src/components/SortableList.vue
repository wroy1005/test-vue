<template>
  <div id="root">
    <section id="task1">
      <ul class="list-group"
        v-sortable="{animation: 200, onEnd:endHandler}">
        <li class="list-group-item1">0</li>
        <li class="list-group-item2">1</li>
        <li class="list-group-item3">2</li>
      </ul>
    </section>

    <section id="task2">
      <div class="sy-video">
        <input type="file"
          @change="fileChangeHandler">
        <video :src="videoSrc"
          controls></video>
      </div>
    </section>

    <section id="task3">
      <el-button @click="dialogVisible=true">打开</el-button>
      <el-dialog title="选择"
        :visible.sync="dialogVisible">
        
      </el-dialog>
    </section>

  </div>
</template>

<script>
export default {

  name: 'Test',
  data() {
    return {
      videoSrc: '',
      // task3
      dialogVisible: false,
    }
  },
  methods: {

    endHandler(e) {
      console.log('from ' + e.oldIndex + ' to ' + e.newIndex)
    },

    fileChangeHandler(e) {
      var file = e.target.files[0]

      if (file) {

        if (file.size > 10 * 1024 * 1024) {
          alert('超出大小')
          return;
        }

        let fileReader = new FileReader()

        fileReader.onload = e => {
          this.videoSrc = e.target.result
        }

        fileReader.readAsDataURL(file)
      }
    },

    /**
     * task3
     */
    open() {
      this.openVideoDialog
    }
  }
}
</script>

<style lang='less' scoped>
#root > section {
  border: 2px solid lightblue;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}
#task1 {
  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding-left: 0;
    border: 1px solid gray;
    width: 470px;
    background: white;
  }
  li {
    width: 150px;
    height: 150px;
    line-height: 150px;
    border-radius: 10px;
    font-size: 50px;
    &.list-group-item1 {
      background-color: pink;
    }
    &.list-group-item2 {
      background-color: olive;
    }
    &.list-group-item3 {
      background-color: skyblue;
    }
  }
}
#task2 {
  video {
    border: 1px solid lightblue;
    max-width: 300px;
    max-height: 500px;
  }
}
</style>
