<template>
  <section>
    <div class="container">
      <b-row>
        <b-col md="12">
          <div class="admin-content-header">
            <h1>Новая акция</h1>
          </div>
          <div class="">
            <div class="form-group">
              <b-row>
                <b-col md="2">
                  <input type="checkbox" v-model="promo.no_terms" />
                  <label for="title">Бессрочная</label>
                </b-col>
              </b-row>
            </div>
          </div>
          <div
            class="card"
            :class="{ 'disable-block': promo.no_terms === true }"
          >
            <div class="form-group">
              <b-row>
                <b-col md="2">
                  <label for="title">Дата начала</label>
                  <client-only>
                    <date-picker
                      placeholder="MM/DD/YYYY"
                      format="MM/dd/yyyy"
                      v-model="promo.date_start"
                    />
                  </client-only>
                </b-col>
                <b-col md="2">
                  <label for="title">Дата окончания</label>
                  <client-only>
                    <date-picker
                      placeholder="MM/DD/YYYY"
                      format="MM/dd/yyyy"
                      v-model="promo.date_end"
                    />
                  </client-only>
                </b-col>
              </b-row>
            </div>
          </div>
          <div class="card">
            <div class="form-group">
              <label for="description">Изображение акции</label>
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
                  </file-upload>

                  <span class="file-notice"><span>Types:</span> jpg, png.</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="form-group">
              <label for="title">Заголовок</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                v-model.trim="promo.title"
              />
            </div>

            <div class="form-group">
              <label for="subtitle">Описание</label>
              <vue-editor
                :editorToolbar="customToolbar"
                v-model="promo.description"
              ></vue-editor>
            </div>

            <div class="form-group">
              <label for="title">Проекты:</label>
              <span
                class="project-checkbox"
                v-for="project in projects"
                :key="project.id"
              >
                <input
                  type="checkbox"
                  :id="project.id"
                  :value="project.id"
                  v-model="checkedProjects"
                />
                <label for="jack">{{ project.title }}</label>
              </span>
              <span class="project-checkbox">
                <button class="admin-sec-btn" @click="selectAllProject()">
                  Выбрать все
                </button>
                <!-- <span class="project-select-all" >Выбрать все</span> -->
              </span>
            </div>

            <div class="form-group">
              <label for="title">Показывать на странице аренда:</label>
              <span
                class="project-checkbox"
                v-for="(rent, index) in checkedRentOptions"
                :key="rent.id"
              >
                <input
                  type="checkbox"
                  :id="rent.id"
                  :value="rent.id"
                  v-model="checkedRent"
                />
                <label for="jack">{{ rent.title }}</label>
              </span>
              <span class="project-checkbox">
                <button class="admin-sec-btn" @click="selectAllRent()">
                  Выбрать все
                </button>
                <!-- <span class="project-select-all" >Выбрать все</span> -->
              </span>
            </div>

            <div class="form-group">
              <label for="title">Cсылка</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                v-model.trim="promo.link"
              />
            </div>
          </div>
          <br />
          <div class="form-group">
            <button
              type="submit"
              class="mr-10 admin-main-btn"
              name="addPromo"
              id="addPromo"
              @click="addPromo()"
            >
              Сохранить
            </button>
            <!-- <button class="admin-sec-btn mr-10" type="button" @click="showDeletePostModal()">Удалить</button>  -->
          </div>

          <div class="form-group">
            <div class="promo-save-error" v-html="promo.errorWithSave"></div>
          </div>
        </b-col>
      </b-row>
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
      showModal: false,
      isShow: true,
      promo: {
        title: "",
        description: "",
        date_start: undefined,
        date_end: undefined,
        promo: false,
        link: "",
        checkedProjects: [],
      },
      projects: [],
      checkedProjects: [],
      checkedRent: [],
      checkedRentOptions: [
        { id: "rent-offices", title: "Офисы" },
        { id: "rent-warehouses", title: "Склады" },
        { id: "rent-retail", title: "Торговые" },
        { id: "rent-psn", title: "ПСН" },
      ],
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
      this.promo.features.push("");
    },
    isActiveTab(lang) {
      return this.activeLang === lang;
    },
    async addPromo() {
      this.checkedProjects.map((project) => {
        this.promo.checkedProjects.push(project);
      });

      if (this.promo.no_terms) {
        this.promo.date_start = undefined;
        this.promo.date_end = undefined;
      }

      console.log("promo ", this.promo);
      const response = await this.$axios.$post("/add-promo/", this.promo);

      if (response.success) {
        this.submitFiles(response.promoID);
      } else {
        alert(response.message);
      }
    },
    async submitFiles(promoID) {
      let formData = new FormData();

      if (this.file1[0].state) {
        this.file1 = [];
      }

      var allPostImages = this.files.concat(this.file1);
      console.log("allPostImages: ", allPostImages);

      for (var i = 0; i < allPostImages.length; i++) {
        let file = allPostImages[i].file;
        formData.append("files", file);
        formData.append("id", promoID);
      }

      const response = await this.$axios.$post(
        "/files-promo-upload/" + promoID,
        formData
      );
      console.log("response: " + JSON.stringify(response));
      if (response.success) {
        this.$router.push("/admin/promo/");
      } else {
        alert(response.message);
      }
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
        var filenameHandled = newFile.file.name.replace(/['" #]+/g, "_");
        this.promo.cover = filenameHandled;
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
    async deletePost() {
      await this.$axios.$delete("/delete-promo/" + this.promo._id);
      this.$router.push({
        name: "admin-promos",
      });
    },
    async getProjects() {
      const response = await this.$axios.$get("/projects/");

      response.projects.sort(function (a, b) {
        return parseFloat(a.order) - parseFloat(b.order);
      });

      this.projects = response.projects;
    },
    selectAllProject() {
      this.checkedProjects = [];

      this.projects.map((project) => {
        this.checkedProjects.push(project.id);
      });
      console.log("this.checkedProjects ", this.checkedProjects);
    },
    selectAllRent() {
      this.checkedRent = [];

      this.checkedRentOptions.map((rent) => {
        this.checkedRent.push(rent.id);
      });
      console.log("this.checkedProjects ", this.checkedProjects);
    },
  },
  beforeCreate() {},
  created() {
    //console.log('created')
    //this.getPost();
  },
  destroyed() {},
  mounted() {
    this.getProjects();
    //console.log('mounted')
    // setTimeout(function () {
    //     this.isShow = true;
    //  }.bind(this), 400)
  },
  computed: {},
};
</script>

<style lang="scss">
.disable-block {
  opacity: 0.5;
  pointer-events: none;
}

.project-checkbox {
  margin-right: 5px;
  display: flex;
  align-items: baseline;

  input {
    margin-right: 5px;
  }

  .project-select-all {
  }
}

.promo-orders-block {
  margin-top: -20px;
}

.promo-orders-block .card p {
  margin-bottom: 0px;
  font-size: 16px;
}

.promo-tabs {
  display: flex;
  padding: 0rem 0 2rem;
}

.promo-tabs div {
  margin-right: 2rem;
  font-size: 18px;
  cursor: pointer;
  color: #999;
}

.promo-tabs div.active {
  color: #111;
}

#add-new-promo .table th,
#add-new-promo .table td {
  width: 30%;
  border: none;
  padding-right: 20px;
}
</style>
