<template>
  <div class="form-group">
    <label for="description">{{ title }} </label>
    <div class="files-upload">
      <table class="table" v-if="filesLocal.length">
          <draggable v-model="filesLocal" :element="'tbody'" @end="filesDragged()">
            <tr v-for="(file, index) in filesLocal" :key="index" class="files-row">
              <td width="20%">
                <img v-if="file.thumb" v-lazy="file.thumb" width="300" height="auto" />
                <span v-else>No Image</span>
              </td>
              <td width="70%">
                <div class="filename">
                  {{ file.name }}
                </div>
              </td>
              <td width="10%">
                <div class="remove">
                  <a class="admin-sm-btn" href="#"
                    @click.prevent="filesRemoved(uploadType, index)">Удалить</a>
                </div>
              </td>
            </tr>
          </draggable>
      </table>

      <div class="choose-file-btn">
        <file-upload 
          :input-id="uploadRef"
          class="btn" 
          :extensions="extensions"
          :accept="accept" 
          :multiple="isMultiple" 
          :size="1024 * 1024 * 10" 
          v-model="filesLocal"
          @input-filter="inputFilter" 
          @input-file="inputFile" 
          :ref="uploadRef">
          <i class="fa fa-plus"></i>
          Choose file
        </file-upload>
        <span class="file-notice"><span>Types:</span> {{ extensions }}.</span>
      </div>
    </div>
  </div>
</template>      

<script>

import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'

export default {
  props: ['title', 'files', 'uploadRef', 'uploadType', 'isMultiple', 'accept', 'extensions'],
  name: 'FileUploadForm',
  components: {
    FileUpload
  },
  data() {
    return {
      filesOutput: []
    }
  },
  methods: {
    inputFilter(newFile, oldFile, prevent) {
      console.log('inputFilter ', newFile, oldFile, prevent)
      if (newFile && !oldFile) {
        // Before adding a file
        // Filter system files or hide files
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
        // Automatic compression
        if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
          newFile.error = 'compressing'
          const imageCompressor = new ImageCompressor(null, {
            convertSize: Infinity,
            maxWidth: 512,
            maxHeight: 512,
          })
          imageCompressor.compress(newFile.file)
            .then((file) => {
              console.log('imageCompressor ', file)
              this.$refs.upload.update(newFile, { error: '', file, size: file.size, type: file.type })
            })
            .catch((err) => {
              this.$refs.upload.update(newFile, { error: err.message || 'compress' })
            })
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        console.log('newFile.file ', newFile.file)
        newFile.blob = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file)
        }
        // Thumbnails
        newFile.thumb = ''
        if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
          newFile.thumb = newFile.blob
        }
        console.log('newFile.blob ', newFile.blob)
      }
    },
    inputFile(newFile, oldFile, type) {
      if (newFile && !oldFile) {
        // add
        if (newFile.file) {

          const filenameFinal = newFile.file.name.replace(/['" #]+/g, '_');
          const fileExtension = newFile.file.name.split('.').pop();
          const filenameFinalSm = filenameFinal.split('.').slice(0, -1).join('.') + '-sm.' + fileExtension

          this.$emit('filesChanged', { 
            uploadType: this.uploadType, 
            filenameFinal: filenameFinal, 
            filenameFinalSm: filenameFinalSm, 
            files: this.filesOutput
          })

        }

      }
      if (newFile && oldFile) {
        // update
        ///console.log('inputFile1 update', newFile)
      }
      if (!newFile && oldFile) {
        // remove
        //console.log('remove', oldFile)
      }
    },
    filesRemoved(type, index) {
      this.filesLocal.splice(index, 1)
      this.$emit('filesRemoved', {type: type, index: index} )
    },
    filesDragged() {
      // console.log('dragEnd filesOutput ', this.filesOutput)
      // console.log('dragEnd filesLocal', this.filesLocal)
      if (this.filesOutput.length !== this.filesLocal.length) return;
      this.$emit('filesDragged', this.filesOutput)
    }

  },


  mounted() {
  },
  created() {
  },
  computed: {
    filesLocal: {
      get: function() {
        return this.files
      },
      set: function(value) {
        console.log('fileschanged ', value)
        this.filesOutput = value
      }
    }

  },
  watch: {

  }


}
</script>


<style lang="scss">


.files-row {
  cursor: move;
}


</style>