<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>Главный слайдер</h1>
          </div>

          <div class="card">
            <div class="form-group">
              <label for="description">Image</label>
              <div class="files-upload">
                <table class="table">
                  <tbody>
                    <tr v-for="(file, index) in file1" :key="index">
                      <td>
                        <img
                          v-if="file.thumb"
                          v-lazy="file.thumb"
                          width="300"
                          height="auto"
                        />
                        <span v-else>No Image</span>
                      </td>
                      <td>
                        <div class="filename">
                          {{ file.name }}
                        </div>
                      </td>
                      <td>
                        <div class="remove">
                          <a
                            v-if="file.state != 'old-file'"
                            class="btn file-remove"
                            href="#"
                            @click.prevent="$refs.upload1.remove(file)"
                            >Удалить</a
                          >
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="choose-file-btn">
                  <file-upload
                    input-id="file1"
                    class="btn"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png,image/gif,image/jpeg,image/webp"
                    :multiple="false"
                    :size="1024 * 1024 * 10"
                    v-model="file1"
                    @input-filter="inputFilter"
                    @input-file="inputFile1"
                    ref="upload1"
                  >
                    <i class="fa fa-plus"></i>
                    Choose file
                  </file-upload>

                  <span class="file-notice"><span>Types:</span> jpg, png.</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="form-group">
              <label for="title">Главная фраза</label>
              <vue-editor
                :editorToolbar="customToolbar"
                v-model="slider.mainPhrase"
              ></vue-editor>
            </div>
            <div class="form-group">
              <label for="title">Преимущества</label>
              <div v-for="phrase in slider.phrases" :key="phrase.id">
                <vue-editor
                  :editorToolbar="customToolbar"
                  v-model="phrase.text"
                ></vue-editor>
              </div>
            </div>
          </div>
          <br />
          <div class="form-group d-flex">
            <button
              type="submit"
              class="mr-10 admin-main-btn"
              name="editPost"
              id="editPost"
              @click="editSlider()"
            >
              Сохранить
            </button>
            <button
              class="admin-sec-btn mr-10"
              type="button"
              @click="showDeletePostModal()"
            >
              Удалить
            </button>
          </div>

          <div class="form-group">
            <div class="slider-save-error" v-html="slider.errorWithSave"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FileUpload from "vue-upload-component/dist/vue-upload-component.part.js";

export default {
  components: {
    FileUpload,
  },
  layout: "admin",
  data() {
    return {
      activeLang: "ru",
      showModal: false,
      activetab: 1,
      isShow: false,
      slider: {},
      mapCoordsLat: null,
      mapCoordsLng: null,
      features: [],
      files: [],
      file1: [],
      file2: [],
      file3: [],
      file4: [],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
    };
  },
  methods: {
    addFeature() {
      this.slider.features.push("");
    },
    isActiveTab(lang) {
      return this.activeLang === lang;
    },
    async getSlider() {
      const response = await this.$axios.$get("/slider-data/");
      this.slider = response.slider;

      var file1 = {
        state: "old-file",
        size: 0,
        thumb: "/uploads/slider/" + response.slider.imageBackground,
      };
      this.file1.push(file1);

      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
    async editSlider() {
      console.log("editPost ", this.slider);
      const response = await this.$axios.$put(
        "/slider/" + this.slider._id,
        this.slider
      );
      // console.log("response after edit: " + JSON.stringify(response));

      this.submitFiles();
    },
    async submitFiles() {
      let formData = new FormData();

      var allPostImages = this.files.concat(this.file1);
      // console.log('allPostImages: ',allPostImages);
      // console.log('postNum: ',this.postNum);

      for (var i = 0; i < allPostImages.length; i++) {
        let file = allPostImages[i].file;
        formData.append("files", file);
        formData.append("id", this.slider._id);
      }

      const response = await this.$axios.$post(
        "/slider-image-upload/" + this.slider._id,
        formData
      );
      // console.log("response: " + JSON.stringify(response));
      this.file1 = [];
      this.getSlider();
      //this.$router.push('/admin/all-posts')
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
        // Automatic compression
        // 自动压缩
        if (
          newFile.file &&
          newFile.type.substr(0, 6) === "image/" &&
          this.autoCompress > 0 &&
          this.autoCompress < newFile.size
        ) {
          newFile.error = "compressing";
          const imageCompressor = new ImageCompressor(null, {
            convertSize: Infinity,
            maxWidth: 512,
            maxHeight: 512,
          });
          imageCompressor
            .compress(newFile.file)
            .then((file) => {
              this.$refs.upload.update(newFile, {
                error: "",
                file,
                size: file.size,
                type: file.type,
              });
            })
            .catch((err) => {
              this.$refs.upload.update(newFile, {
                error: err.message || "compress",
              });
            });
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // Create a blob field
        // 创建 blob 字段
        newFile.blob = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file);
        }
        // Thumbnails
        // 缩略图
        newFile.thumb = "";
        if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
          newFile.thumb = newFile.blob;
        }
      }
    },
    inputFile1(newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        var filenameHandled = newFile.file.name.replace(/['" #]+/g, "_");
        this.slider.imageBackground = filenameHandled;
      }
      if (newFile && oldFile) {
        // update
        // console.log('update', newFile)
      }
      if (!newFile && oldFile) {
        // remove
        //console.log('remove', oldFile)
      }
    },
    async deleteContact() {
      await this.$axios.$delete("/delete-slider/" + this.slider._id);
      this.$router.push({
        name: "admin-sliders",
      });
    },
  },
  beforeCreate() {},
  created() {
    //console.log('created')
    this.getSlider();
  },
  destroyed() {},
  mounted() {
    //console.log('mounted')
    // setTimeout(function () {
    //     this.isShow = true;
    //  }.bind(this), 400)
  },
  computed: {},
};
</script>

<style>
.slider-orders-block {
  margin-top: -20px;
}

.slider-orders-block .card p {
  margin-bottom: 0px;
  font-size: 16px;
}

.slider-tabs {
  display: flex;
  padding: 0rem 0 2rem;
}

.slider-tabs div {
  margin-right: 2rem;
  font-size: 18px;
  cursor: pointer;
  color: #999;
}

.slider-tabs div.active {
  color: #111;
}

#add-new-slider .table th,
#add-new-slider .table td {
  width: 30%;
  border: none;
  padding-right: 20px;
}

#add-new-slider .ql-editor {
  min-height: 100px !important;
  font-size: 16px;
}
</style>
