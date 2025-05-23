<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>Новый проект</h1>
          </div>
          <div class="card">
            <div class="form-group">
              <label for="description">Главное изображение</label>
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

            <div class="form-group">
              <label for="description">Для слайдера на главной</label>
              <div class="files-upload">
                <table class="table">
                  <tbody>
                    <tr v-for="(file, index) in file2" :key="index">
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
                            @click.prevent="$refs.upload2.remove(file)"
                            >Удалить</a
                          >
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="choose-file-btn">
                  <file-upload
                    input-id="file2"
                    class="btn"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png,image/gif,image/jpeg,image/webp"
                    :multiple="false"
                    :size="1024 * 1024 * 10"
                    v-model="file2"
                    @input-filter="inputFilter"
                    @input-file="inputFile2"
                    ref="upload2"
                  >
                    <i class="fa fa-plus"></i>
                    Choose file
                  </file-upload>

                  <span class="file-notice"><span>Types:</span> jpg, png.</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="description">Галерея</label>
              <div class="files-upload">
                <table class="table">
                  <tbody>
                    <tr v-for="(file, index) in files" :key="index">
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
                            class="btn file-remove"
                            href="#"
                            @click.prevent="removeFromGallery(files, index)"
                            >Удалить</a
                          >
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div class="choose-file-btn">
                  <file-upload
                    input-id="files-gallery"
                    class="btn"
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png,image/gif,image/jpeg,image/webp"
                    :multiple="true"
                    :size="1024 * 1024 * 10"
                    v-model="files"
                    @input-filter="inputFilter"
                    @input-file="inputFileGallery"
                    ref="upload-gallery"
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
            <div
              class="form-group"
              v-bind:class="{ 'has-error': hasErrorTitle }"
            >
              <label for="title">Название</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                v-model.trim="project.title"
              />
            </div>
            <div class="form-group" v-bind:class="{ 'has-error': hasErrorUrl }">
              <label for="title">Url</label>
              <input
                class="form-control"
                type="text"
                v-model.trim="project.url"
              />
            </div>
            <div class="form-group">
              <label for="title">Тип объекта</label>
              <input
                class="form-control"
                type="text"
                v-model.trim="project.type"
              />
            </div>
            <div class="form-group">
              <label for="title">Класс</label>
              <input
                class="form-control"
                type="text"
                v-model.trim="project.class"
              />
            </div>
            <div class="form-group">
              <label for="title">Город</label>
              <input
                class="form-control"
                type="text"
                v-model.trim="project.city"
              />
            </div>
            <div class="form-group">
              <label for="title">Метро</label>
              <input
                class="form-control"
                type="text"
                v-model.trim="project.metro"
              />
            </div>
            <div class="form-group">
              <label for="title">Адрес</label>
              <input
                class="form-control"
                type="text"
                v-model.trim="project.address"
              />
            </div>
            <div class="form-group">
              <label for="title">Координаты</label>
              <div class="row">
                <div class="col-6">
                  <input
                    class="form-control"
                    type="text"
                    v-model.trim="mapCoordsLat"
                  />
                </div>
                <div class="col-6">
                  <input
                    class="form-control"
                    type="text"
                    v-model.trim="mapCoordsLng"
                  />
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="title">Площадь</label>
              <input
                class="form-control"
                type="number"
                v-model.trim="project.square"
              />
            </div>
            <div class="form-group">
              <label for="title">Кол-во этажей</label>
              <input
                class="form-control"
                type="text"
                v-model.trim="project.floors"
              />
            </div>
            <div class="form-group">
              <label for="title">Парковка</label>
              <input
                class="form-control"
                type="number"
                v-model.trim="project.parking"
              />
            </div>
            <div class="form-group">
              <label for="title">Свободные площади</label>
              <div class="row">
                <div class="col-3">
                  <div class="mb-2">{{ freeSpaces[0].type }}</div>
                  <input
                    class="form-control"
                    type="text"
                    v-model.trim="freeSpaces[0].data"
                  />
                </div>
                <div class="col-3">
                  <div class="mb-2">{{ freeSpaces[1].type }}</div>
                  <input
                    class="form-control"
                    type="text"
                    v-model.trim="freeSpaces[1].data"
                  />
                </div>
                <div class="col-3">
                  <div class="mb-2">{{ freeSpaces[2].type }}</div>
                  <input
                    class="form-control"
                    type="text"
                    v-model.trim="freeSpaces[2].data"
                  />
                </div>
                <div class="col-3">
                  <div class="mb-2">{{ freeSpaces[3].type }}</div>
                  <input
                    class="form-control"
                    type="text"
                    v-model.trim="freeSpaces[3].data"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="subtitle">Описание</label>
              <vue-editor
                :editorToolbar="customToolbar"
                v-model="project.about"
              ></vue-editor>
            </div>
            <div class="form-group">
              <label for="title">Преимущества</label>
              <div
                v-for="(feature, i) in project.features"
                :key="i"
                class="mb-2"
              >
                <textarea
                  class="form-control"
                  type="text"
                  v-model="project.features[i]"
                />
              </div>
              <button class="admin-sec-btn" @click="addFeature()">
                Добавить
              </button>
            </div>
            <div class="form-group">
              <label for="title">Преимущества на главную</label>
              <div
                v-for="(feature, i) in project.featuresIndex"
                :key="i"
                class="mb-2"
              >
                <textarea
                  class="form-control"
                  type="text"
                  v-model="project.featuresIndex[i]"
                />
              </div>
              <button class="admin-sec-btn" @click="addFeatureIndex()">
                Добавить
              </button>
            </div>
          </div>
          <br />
          <div class="form-group">
            <button
              type="submit"
              class="mr-10 admin-main-btn"
              name="addproject"
              id="addproject"
              @click="addproject()"
            >
              Сохранить
            </button>
            <!-- <button class="admin-sec-btn mr-10" type="button" @click="showDeletePostModal()">Удалить</button>  -->
          </div>

          <div class="form-group">
            <!-- <div class="project-save-error" v-html="project.errorWithSave"></div> -->
            <div class="errors" v-if="errors.length">
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </div>
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
      project: {
        features: [""],
        featuresIndex: [""],
      },
      mapCoordsLat: null,
      mapCoordsLng: null,
      features: [],
      freeSpaces: [
        {
          type: "Офисы",
          data: "",
        },
        {
          type: "Склады",
          data: "",
        },
        {
          type: "Торговые помещения",
          data: "",
        },
        {
          type: "ПСН",
          data: "",
        },
      ],
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
      errors: [],
      hasErrorTitle: false,
      hasErrorUrl: false,
    };
  },
  methods: {
    addFeature() {
      this.project.features.push("");
    },
    addFeatureIndex() {
      this.project.featuresIndex.push("");
    },
    addFreeSpaces() {
      this.project.freeSpaces.push({
        type: "",
        data: "",
      });
    },
    isActiveTab(lang) {
      return this.activeLang === lang;
    },

    async addproject() {
      this.errors = [];
      this.hasErrorTitle = false;
      this.hasErrorUrl = false;

      if (this.project.title == "" || this.project.title == undefined) {
        this.errors.push("Укажите название проекта");
        this.hasErrorTitle = true;
      }

      if (this.project.url == "" || this.project.url == undefined) {
        this.errors.push("Укажите URL проекта");
        this.hasErrorUrl = true;
      }

      if (!this.errors.length) {
        this.project.mapCoords = {
          lat: this.mapCoordsLat,
          lng: this.mapCoordsLng,
        };

        this.project.freeSpaces = this.freeSpaces;

        this.project.features = this.project.features.filter(function (el) {
          return el != "";
        });

        this.project.featuresIndex = this.project.featuresIndex.filter(
          function (el) {
            return el != "";
          }
        );

        console.log("addproject ", this.project);
        const response = await this.$axios.$post("/add-project/", this.project);
        console.log("response after edit: " + JSON.stringify(response));
        this.projectID = response.projectID;
        this.hasErrorTitle = false;
        this.hasErrorUrl = false;
        this.submitFiles();
      }
    },
    removeFromGallery(gal, index) {
      if ((gal = "files")) {
        this.files.splice(index, 1);
        this.project.gallery.splice(index, 1);
      } else if ((gal = "file1")) {
        this.file1.splice(index, 1);
        this.project.cover.splice(index, 1);
      } else if ((gal = "file2")) {
        this.file2.splice(index, 1);
        this.project.indexCover.splice(index, 1);
      }

      // this.editTourAfterRemoveFromGallery();
    },
    async submitFiles() {
      let formDataCover = new FormData();
      let formData = new FormData();

      if (this.file1[0].state) {
        this.file1 = [];
      }
      // console.log('this.file1: ', this.file1);

      //// есть есть cover
      // if (this.file1[0].file) {
      //   for( var i = 0; i < this.file1.length; i++ ){
      //     let file = this.file1[i].file;
      //     console.log('file: ',file);
      //     if (file) {
      //       formDataCover.append('files', file);
      //       formDataCover.append('id', this.project.id);
      //     }
      //   }

      //   const response = await this.$axios.$post( '/files-project-upload/'+this.project.id, formDataCover)
      //   console.log('response: '+JSON.stringify(response))
      // }

      var allPostImages = this.files.concat(this.file1).concat(this.file2);
      console.log("allPostImages: ", allPostImages);
      // console.log('postNum: ',this.postNum);

      for (var i = 0; i < allPostImages.length; i++) {
        let file = allPostImages[i].file;
        console.log("file: ", file);
        if (file) {
          formData.append("files", file);
          formData.append("id", this.project.id);
        }
      }

      console.log("formData: ", formData);

      const response = await this.$axios.$post(
        "/files-project-upload/" + this.projectID,
        formData
      );
      console.log("response: " + JSON.stringify(response));
      //this.getPost()
      this.$router.push({
        name: "admin-projects",
      });
    },
    formatDate(date) {
      var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
      var MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
      var yyyy = date.getFullYear();
      return dd + "." + MM + "." + yyyy;
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
        if (newFile.file) {
          var filenameHandled = newFile.file.name.replace(/['" #]+/g, "_");
          var fileExtension = newFile.file.name.split(".").pop();
          this.project.cover = filenameHandled;
          const filenameSm =
            filenameHandled.split(".").slice(0, -1).join(".") +
            "-sm." +
            fileExtension;
          this.project.preview = filenameSm;
          console.log("filenameSm ", filenameSm);
        }
      }
      if (newFile && oldFile) {
        // update
        console.log("inputFile1 update", newFile);
      }
      if (!newFile && oldFile) {
        // remove
        //console.log('remove', oldFile)
      }
    },
    inputFile2(newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        if (newFile.file) {
          var filenameHandled = newFile.file.name.replace(/['" #]+/g, "_");
          this.project.indexCover = filenameHandled;
        }
      }
      if (newFile && oldFile) {
        // update
        console.log("update", newFile);
      }
      if (!newFile && oldFile) {
        // remove
        //console.log('remove', oldFile)
      }
    },
    inputFileGallery(newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        const filenameHandled = newFile.file.name.replace(/['" #]+/g, "_");
        this.project.gallery.push(filenameHandled);
      }
      if (newFile && oldFile) {
        // update
        console.log("update", newFile);
      }
      if (!newFile && oldFile) {
        // remove
        // console.log('remove', oldFile)
      }
    },
    async deletePost() {
      await this.$axios.$delete("/delete-project/" + this.project._id);
      this.$router.push({
        name: "admin-projects",
      });
    },
  },
  beforeCreate() {},
  created() {
    //console.log('created')
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

<style lang="scss">
.project-orders-block {
  margin-top: -20px;
}

.project-orders-block .card p {
  margin-bottom: 0px;
  font-size: 16px;
}

.project-tabs {
  display: flex;
  padding: 0rem 0 2rem;
}

.project-tabs div {
  margin-right: 2rem;
  font-size: 18px;
  cursor: pointer;
  color: #999;
}

.project-tabs div.active {
  color: #111;
}

/* #add-new-project .table th, #add-new-project .table td {
    width: 25%;
    border: none;
    padding-right: 20px;
} */

#add-new-project {
  .form-group.has-error label,
  .form-group.has-error a {
    color: #dc3545 !important;
  }

  .form-group.has-error input {
    border: 1px solid #dc3545 !important;
  }

  .form-group .error {
    display: none;
    color: #dc3545 !important;
  }
}
</style>
