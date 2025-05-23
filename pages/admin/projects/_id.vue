<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <div>
              <h1>{{ project.title }}</h1>
              <p v-if="project.type">{{ project.type }}</p>
            </div>
            <div>
              <nuxt-link :to="'/admin/lots'" class="admin-sec-btn"
                >К проектам</nuxt-link
              >
            </div>
          </div>

          <AdminFileUploadForm
            :title="'Главное изображение'"
            :files="fileCover"
            :uploadRef="'fileCover'"
            :uploadType="'fileCover'"
            :isMultiple="false"
            :accept="'image/png,image/jpeg'"
            :extensions="'jpg,png'"
            @filesChanged="filesChanged"
            @filesRemoved="filesRemoved"
          ></AdminFileUploadForm>

          <AdminFileUploadForm
            :title="'Для слайдера на главной'"
            :files="indexCover"
            :uploadRef="'indexCover'"
            :uploadType="'indexCover'"
            :isMultiple="false"
            :accept="'image/png,image/jpeg'"
            :extensions="'jpg,png'"
            @filesChanged="filesChanged"
            @filesRemoved="filesRemoved"
          ></AdminFileUploadForm>

          <AdminFileUploadForm
            :title="'Галерея'"
            :files="gallery"
            :uploadRef="'gallery'"
            :uploadType="'gallery'"
            :isMultiple="true"
            :accept="'image/png,image/jpeg'"
            :extensions="'jpg,png'"
            @filesChanged="filesChanged"
            @filesRemoved="filesRemoved"
            @filesDragged="filesDragged"
          ></AdminFileUploadForm>

          <!-- Параметры -->

          <div class="form-group" v-bind:class="{ 'has-error': hasErrorTitle }">
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

          <AdminFileUploadForm
            :title="'Иконка на карте'"
            :files="filePin"
            :uploadRef="'filePin'"
            :uploadType="'filePin'"
            :isMultiple="false"
            :accept="'image/png,image/jpeg,image/svg+xml'"
            :extensions="'jpg,png,svg'"
            @filesChanged="filesChanged"
            @filesRemoved="filesRemoved"
          ></AdminFileUploadForm>

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
            <div v-for="(feature, i) in project.features" :key="i" class="mb-2">
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
          <div class="form-group">
            <label for="title">Условия сделки</label>
            <div v-for="(option, i) in project.options" :key="i" class="mb-2">
              <b-row>
                <b-col>
                  <textarea
                    rows="1"
                    class="form-control"
                    type="text"
                    v-model="option[0]"
                  />
                </b-col>
                <b-col>
                  <textarea
                    rows="1"
                    class="form-control"
                    type="text"
                    v-model="option[1]"
                  />
                </b-col>
              </b-row>
              
            </div>
            <button class="admin-sec-btn" @click="addOptionn()">
              Добавить
            </button>
          </div>

          <AdminFileUploadForm
            :title="'Презентация (.pdf)'"
            :files="filePDF"
            :uploadRef="'filePDF'"
            :uploadType="'filePDF'"
            :isMultiple="false"
            :accept="'application/pdf'"
            :extensions="'pdf'"
            @filesChanged="filesChanged"
            @filesRemoved="filesRemoved"
          ></AdminFileUploadForm>
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
              name="editProject"
              id="editProject"
              @click="editProject()"
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
  </section>
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
      project: {},
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
      gallery: [],
      fileCover: [],
      indexCover: [],
      filePin: [],
      filePDF: [],
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
    addOption() {
      this.project.option.push(["", ""]);
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
    async getProject() {
      const response = await this.$axios.$get(
        "/get-project-one/" + this.$route.params.id
      );
      this.mapCoordsLat = response.project.mapCoords.lat;
      this.mapCoordsLng = response.project.mapCoords.lng;
      response.project.freeSpaces.map((space) => {
        var index = this.freeSpaces.findIndex((el) => el.type == space.type);
        if (index > -1) {
          this.freeSpaces[index].data = space.data;
        }
      });

      this.project = response.project;
      if (response.project.pdf === undefined) {
        this.project.pdf = [];
      }

      if (
        response.project.featuresIndex.length === 0 ||
        response.project.featuresIndex == undefined
      ) {
        this.project.featuresIndex = ["", "", "", "", ""];
      }

      if (
        response.project.options.length === 0 ||
        response.project.options == undefined
      ) {
        this.project.options = [["", ""]];
      }

      const fileCover = {
        name: response.project.cover,
        thumb:
          "/uploads/projects/" +
          response.project.id +
          "/" +
          response.project.cover,
      };
      this.fileCover = [];
      this.fileCover.push(fileCover);

      const indexCover = {
        name: response.project.indexCover,
        size: 0,
        thumb:
          "/uploads/projects/" +
          response.project.id +
          "/" +
          response.project.indexCover,
      };
      this.indexCover = [];
      this.indexCover.push(indexCover);

      const filePin = {
        name: response.project.indexCover,
        size: 0,
        thumb:
          "/uploads/projects/" +
          response.project.id +
          "/" +
          response.project.pin,
      };
      this.filePin = [];
      this.filePin.push(filePin);

      let galleryItem;
      const gallery = response.project.gallery;

      this.gallery = [];
      for (let i = 0; i < gallery.length; i++) {
        if (gallery[i] != undefined) {
          galleryItem = {
            name: gallery[i],
            thumb:
              "/uploads/projects/" + response.project.id + "/" + gallery[i],
          };

          this.gallery.push(galleryItem);
        } else {
          const image_gallery = gallery[i];

          this.project.gallery[i] = "";
          this.project.gallery[i] = image_gallery;
          this.project.gallery[i].alt = "";

          galleryItem = {
            name: image_gallery,
            thumb:
              "/uploads/projects/" + response.project.id + "/" + image_gallery,
          };
          this.gallery.push(galleryItem);
        }
      }

      const docs = {
        name: response.project.pdf[0],
        thumb: undefined,
      };
      this.filePDF = [];
      this.filePDF.push(docs);

      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
    async editProject() {
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

        this.project.options = this.project.options.filter(function (el) {
          return el[0] !== "" && el[1] !== "";
        });

        console.log("editProject ", this.project);
        const response = await this.$axios.$put(
          "/project/" + this.$route.params.id,
          this.project
        );
        console.log("response after edit: " + JSON.stringify(response));

        this.submitFiles();
      }
    },
    async submitFiles() {
      const formData = new FormData();
      const allFiles = this.gallery
        .concat(this.fileCover)
        .concat(this.indexCover)
        .concat(this.filePin);

      for (let i = 0; i < allFiles.length; i++) {
        let file = allFiles[i].file;
        if (file) {
          formData.append("files", file);
          formData.append("id", this.project.id);
        }
      }

      const response = await this.$axios.$post(
        "/files-project-upload/" + this.project.id,
        formData
      );
      console.log("response: " + JSON.stringify(response));
      this.submitDocs();
    },
    async submitDocs() {
      const formData = new FormData();
      const filePDF = this.filePDF;
      for (let i = 0; i < filePDF.length; i++) {
        const file = filePDF[i].file;
        formData.append("files", file);
        formData.append("id", this.project.id);
      }
      const response = await this.$axios.$post(
        "/files-project-upload/" + this.project.id,
        formData
      );
      console.log("response: " + JSON.stringify(response));
      this.getProject();
    },
    formatDate(date) {
      var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
      var MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
      var yyyy = date.getFullYear();
      return dd + "." + MM + "." + yyyy;
    },
    async deletePost() {
      await this.$axios.$delete("/delete-project/" + this.project._id);
      this.$router.push({
        name: "admin-projects",
      });
    },
    showDeletePostModal(data) {
      this.$modal.show(
        adminDeleteModal,
        {
          type: "project",
          project: this.project,
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
    filesChanged(data) {
      console.log("filesChanged ", data);

      if (data.uploadType === "fileCover") {
        this.fileCover = [...data.files];
        this.project.cover = data.filenameFinal;
        this.project.preview = data.filenameFinalSm;
      } else if (data.uploadType === "indexCover") {
        this.indexCover = [...data.files];
        this.project.indexCover = data.filenameFinal;
      } else if (data.uploadType === "gallery") {
        this.gallery = [...data.files];
        this.project.gallery.push(data.filenameFinal);
      } else if (data.uploadType === "filePin") {
        this.filePin = [...data.files];
        this.project.pin = data.filenameFinal;
      } else if (data.uploadType === "filePDF") {
        this.filePDF = [...data.files];
        this.project.pdf[0] = data.filenameFinal;
      }
    },
    filesRemoved(data) {
      if (data.type === "gallery") {
        this.project.gallery.splice(data.index, 1);
      } else if ((data.type = "fileCover")) {
        this.project.cover = undefined;
      } else if ((data.type = "indexCover")) {
        this.project.indexCover = undefined;
      } else if (data.uploadType === "filePin") {
        this.project.pin = undefined;
      } else if (data.uploadType === "filePDF") {
        this.project.pdf[0] = undefined;
      }
    },
    filesDragged(data) {
      console.log("dragEnd ", data);
      this.project.gallery = [];
      data.forEach((file) => {
        this.project.gallery.push(file.name);
      });
      this.editProject();
    },
  },
  beforeCreate() {},
  created() {
    this.getProject();
  },
  destroyed() {},
  mounted() {},
  computed: {},
};
</script>

<style>
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
</style>
