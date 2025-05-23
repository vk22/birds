<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>{{ promo.title }}</h1>
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

          <AdminFileUploadForm
            :title="'Главное изображение'"
            :files="files"
            :uploadRef="'fileCover'"
            :uploadType="'fileCover'"
            :isMultiple="false"
            :accept="'image/png,image/jpeg'"
            :extensions="'jpg,png'"
            @filesChanged="filesChanged"
            @filesRemoved="filesRemoved"
          ></AdminFileUploadForm>

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
        <div class="page-actions">
          <div class="container">
            <div class="row">
              <div
                class="col-md-10 d-flex align-items-center justify-content-start"
              >
                <button
                  type="submit"
                  class="mr-10 admin-main-btn"
                  @click="editPost()"
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

        <div class="form-group">
          <div class="promo-save-error" v-html="promo.errorWithSave"></div>
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
      promo: {},
      mapCoordsLat: null,
      mapCoordsLng: null,
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
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
      errors: [],
    };
  },
  methods: {
    addFeature() {
      this.promo.features.push("");
    },
    isActiveTab(lang) {
      return this.activeLang === lang;
    },
    async getPromo() {
      const response = await this.$axios.$get(
        "/admin-get-promo/" + this.$route.params.id
      );
      this.promo = response.promo;
      this.checkedProjects = [...this.promo.checkedProjects];
      this.checkedRent = [...this.promo.checkedRent];

      this.files = [];

      var files = {
        state: "old-file",
        name: response.promo.cover,
        size: 0,
        thumb:
          "/uploads/promo/" + response.promo.id + "/" + response.promo.cover,
      };
      this.files.push(files);

      setTimeout(() => {
        this.isShow = true;
      }, 500);
    },
    async editPost() {
      if (this.promo.no_terms) {
        this.promo.date_start = undefined;
        this.promo.date_end = undefined;
      }
      this.promo.checkedProjects = [];

      this.checkedProjects.map((project) => {
        this.promo.checkedProjects.push(project);
      });

      this.promo.checkedRent = [];

      this.checkedRent.map((rent) => {
        this.promo.checkedRent.push(rent);
      });
      // console.log('checkedProjects ', this.checkedProjects)
      console.log("editPost ", this.promo);
      const response = await this.$axios.$put(
        "/promo/" + this.$route.params.id,
        this.promo
      );
      console.log("response after edit: " + JSON.stringify(response));

      this.submitFiles();
    },
    async submitFiles() {
      let formData = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        const newFile = this.files[i].file;
        /// if new file
        if (newFile) {
          formData.append("files", newFile);
          formData.append("id", this.promo.id);
        }
      }

      console.log("formData: ", formData);
      const response = await this.$axios.$post(
        "/files-promo-upload/" + this.promo.id,
        formData
      );
      console.log("response: " + JSON.stringify(response));
      this.getPromo();
      //this.$router.push('/admin/all-posts')
    },
    formatDate(date) {
      var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
      var MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
      var yyyy = date.getFullYear();
      return dd + "." + MM + "." + yyyy;
    },
    async deletePost() {
      await this.$axios.$delete("/delete-promo/" + this.promo._id);
      this.$router.push({
        name: "admin-promos",
      });
    },
    showDeletePostModal(data) {
      this.$modal.show(
        adminDeleteModal,
        {
          type: "promo",
          promo: this.promo,
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
    filesChanged(data) {
      console.log("filesChanged ", data);

      this.files = [...data.files];
      this.promo.cover = data.filenameFinal;
      this.promo.preview = data.filenameFinalSm;
    },
    filesRemoved(data) {
      this.project.cover = undefined;
    },
    filesDragged(data) {
      console.log("dragEnd ", data);
      // this.project.gallery = []
      // data.forEach(file => {
      //   this.project.gallery.push(file.name)
      // })
    },
  },
  beforeCreate() {},
  created() {
    //console.log('created')
    this.getPromo();
    this.getProjects();
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
