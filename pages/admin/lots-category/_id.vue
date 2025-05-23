<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>{{ category.title }}</h1>
          </div>

          <AdminFileUploadForm
            :title="'Главное изображение'"
            :files="files"
            :uploadRef="'files'"
            :uploadType="'files'"
            :isMultiple="false"
            :accept="'image/png,image/jpeg'"
            :extensions="'jpg,png'"
            @filesChanged="filesChanged"
            @filesRemoved="filesRemoved"
          ></AdminFileUploadForm>

          <div class="form-group">
            <label for="title">ID</label>
            <input
              class="form-control"
              type="text"
              v-model.trim="category.id"
            />
          </div>
          <div class="form-group">
            <label for="title">Заголовок</label>
            <input
              class="form-control"
              type="text"
              placeholder=""
              v-model.trim="category.title"
            />
          </div>
          <div class="form-group">
            <label for="title">Подзаголовок</label>
            <input
              class="form-control"
              type="text"
              v-model.trim="category.subtitle"
            />
          </div>

          <div class="form-group">
            <label for="title">Подкатегории</label>
            <div
              v-for="(feature, i) in category.subcategories"
              :key="i"
              class="mb-2"
            >
              <input
                class="form-control"
                type="text"
                v-model="category.subcategories[i]"
              />
            </div>
            <button class="admin-sec-btn" @click="addFeature()">
              Добавить
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="page-actions">
      <div class="container">
        <div class="row">
          <div
            class="col-md-10 d-flex align-items-center justify-content-start"
          >
            <button
              type="submit"
              class="mr-10 admin-main-btn"
              @click="editSection()"
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
          <div class="col-md-2 d-flex align-items-center">
            <div class="errors" v-if="errors.length">
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from "vue-upload-component/dist/vue-upload-component.part.js";
import adminDeleteModal from "~/components/admin/DeleteModal.vue";

export default {
  components: {
    FileUpload,
    adminDeleteModal,
  },
  layout: "admin",
  data() {
    return {
      activeLang: "ru",
      showModal: false,
      activetab: 1,
      isShow: false,
      category: {},
      mapCoordsLat: null,
      mapCoordsLng: null,
      features: [],
      files: [],
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
    filesChanged(data) {
      console.log("filesChanged ", data);
      this.files = [...data.files];
      this.category.image = data.filenameFinal;
    },
    filesRemoved(data) {
      this.category.image = undefined;
    },
    addFeature() {
      this.category.subcategories.push("");
    },
    isActiveTab(lang) {
      return this.activeLang === lang;
    },
    async getSection() {
      const response = await this.$axios.$get(
        "/admin-get-category/" + this.$route.params.id
      );
      const file = {
        state: "old-file",
        size: 0,
        thumb: "/uploads/" + response.category.image,
      };
      this.files = [];
      this.files.push(file);
      this.category = response.category;
    },
    async editSection() {
      this.category.subcategories = this.category.subcategories.filter(
        function (el) {
          return el != "";
        }
      );
      const response = await this.$axios.$put(
        "/category/" + this.$route.params.id,
        this.category
      );
      this.submitFiles();
    },

    async submitFiles() {
      let formData = new FormData();
      if (this.files[0].state) {
        this.files = [];
      }
      for (var i = 0; i < this.files.length; i++) {
        const file = this.files[i].file;
        formData.append("files", file);
        formData.append("id", this.category._id);
      }

      const response = await this.$axios.$post(
        "/category-image-upload/" + this.category._id,
        formData
      );
      console.log("response: " + JSON.stringify(response));
      this.getSection();
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
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
        newFile.blob = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.blob = URL.createObjectURL(newFile.file);
        }
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
          this.category.image = filenameHandled;
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

    async deleteContact() {
      await this.$axios.$delete("/delete-category/" + this.category._id);
      this.$router.push({
        name: "admin-contacts",
      });
    },
    showDeletePostModal(data) {
      this.$modal.show(
        adminDeleteModal,
        {
          type: "category",
          category: this.category,
        },
        {
          draggable: false,
          width: 400,
          height: 200,
        },
        {
          //'before-open': this.beforeOpen(data),
          // 'before-close': this.beforeClose
        }
      );
    },
  },
  beforeCreate() {},
  created() {
    //console.log('created')
    this.getSection();
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
.category-orders-block {
  margin-top: -20px;
}

.category-orders-block .card p {
  margin-bottom: 0px;
  font-size: 16px;
}

.category-tabs {
  display: flex;
  padding: 0rem 0 2rem;
}

.category-tabs div {
  margin-right: 2rem;
  font-size: 18px;
  cursor: pointer;
  color: #999;
}

.category-tabs div.active {
  color: #111;
}

#add-new-category .table th,
#add-new-category .table td {
  width: 30%;
  border: none;
  padding-right: 20px;
}
</style>
