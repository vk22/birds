<template>
  <section>
    <div id="add-new-project">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="admin-content-header">
              <h1>Новый лот</h1>
            </div>

            <b-form-group
              id="lot-status"
              label="Статус:"
              label-for="lot-status"
            >
              <b-form-select
                id="lot-status"
                v-model="lot.status"
                :options="statuses"
                required
              ></b-form-select>
            </b-form-group>
            
            <AdminFileUploadForm
              :title="'Галерея'"
              :files="files"
              :uploadRef="'gallery'"
              :uploadType="'gallery'"
              :isMultiple="true"
              :accept="'image/png,image/jpeg'"
              :extensions="'jpg,png'"
              @filesChanged="filesChanged"
              @filesRemoved="filesRemoved"
              @filesDragged="filesDragged"
            ></AdminFileUploadForm>

            <b-form-group
              id="lot-project_guid"
              label="Проект:"
              label-for="lot-project_guid"
              :class="{ 'has-error': hasErrors.project_guid }"
            >
              <b-form-select
                id="lot-project_guid"
                v-model="lot.project_guid"
                :options="projectsGUIDs"
                @change="projectChangeHandle()"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              id="lot-type"
              label="Тип:"
              label-for="lot-type"
              :class="{ 'has-error': hasErrors.type }"
            >
              <b-form-select
                id="lot-type"
                v-model="lot.type"
                :options="allLotsTypes"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-group id="lot-number" label="Номер:" label-for="lot-number">
              <b-form-input
                id="lot-number"
                v-model="lot.number"
                type="text"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="lot-section_number"
              label="Номер секции:"
              label-for="lot-section_number"
            >
              <b-form-input
                id="lot-section_number"
                v-model="lot.section_number"
                type="text"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="lot-floor_number"
              label="Этаж:"
              label-for="lot-floor_number"
            >
              <b-form-input
                id="lot-floor_number"
                v-model="lot.floor_number"
                type="text"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="lot-square"
              label="Площадь, м2:"
              label-for="lot-square"
            >
              <b-form-input
                id="lot-square"
                v-model="lot.square"
                type="number"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="lot-price"
              label="Стоимость, руб./мес.:"
              label-for="lot-price"
            >
              <b-form-input
                id="lot-price"
                v-model="lot.price"
                type="number"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="lot-about"
              label="Описание:"
              label-for="lot-about"
            >
              <vue-editor
                :editorToolbar="customToolbar"
                v-model="lot.about"
              ></vue-editor>
            </b-form-group>

            <b-form-group id="lot-own_entrance" label-for="lot-own_entrance">
              <b-form-checkbox
                id="checkbox-1"
                v-model="lot.own_entrance"
                name="checkbox-1"
                value="true"
                unchecked-value="false"
              >
                Отдельный вход
              </b-form-checkbox>
            </b-form-group>

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
              name="addlot"
              id="addlot"
              @click="addlot()"
            >
              Сохранить
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
      lot: {
        project: {
          guid: undefined,
          title: undefined,
        },
        type: undefined,
        number: undefined,
        section_number: undefined,
        floor_number: undefined,
        price: undefined,
        square: undefined,
        own_entrance: false,
        status: "free",
        gallery: [],
        about: undefined,
      },
      statuses: [
        { value: "free", text: "Свободен" },
        { value: "secured", text: "Забронирован" },
      ],
      files: [],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
      ],
      errors: [],
      hasErrors: {
        project_guid: false,
        type: false,
      },
    };
  },
  methods: {
    addFeature() {
      this.lot.features.push("");
    },
    addFeatureIndex() {
      this.lot.featuresIndex.push("");
    },
    addFreeSpaces() {
      this.lot.freeSpaces.push({
        type: "",
        data: "",
      });
    },
    isActiveTab(lang) {
      return this.activeLang === lang;
    },

    async addlot() {
      this.errors = [];
      this.hasErrors = {
        project_guid: false,
        type: false,
      };

      if (this.lot.project_guid == "" || this.lot.project_guid == undefined) {
        this.errors.push("Укажите проект");
        this.hasErrors.project_guid = true;
      }

      if (this.lot.type == "" || this.lot.type == undefined) {
        this.errors.push("Укажите тип проекта");
        this.hasErrors.type = true;
      }

      if (!this.errors.length) {
        console.log("addlot ", this.lot);
        const response = await this.$axios.$post("/add-lot/", this.lot);
        console.log("response after edit: " + JSON.stringify(response));
        this.lotGUID = response.lotGUID;
        this.hasErrors = {
          project_guid: false,
          type: false,
        };
        this.submitFiles();
      }
    },

    async submitFiles() {
      let formData = new FormData();
      const allPostImages = this.files;
      console.log("allPostImages: ", allPostImages);
      // console.log('postNum: ',this.postNum);

      for (var i = 0; i < this.files.length; i++) {
        let file = allPostImages[i].file;
        console.log("file: ", file);
        if (file) {
          formData.append("files", file);
          formData.append("id", this.lotGUID);
        }
      }

      console.log("formData: ", formData);

      const response = await this.$axios.$post(
        "/files-lot-upload/" + this.lotGUID,
        formData
      );
      console.log("response: " + JSON.stringify(response));
      //this.getPost()
      this.$router.push({
        name: "admin-lots",
      });
    },
    formatDate(date) {
      var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();
      var MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);
      var yyyy = date.getFullYear();
      return dd + "." + MM + "." + yyyy;
    },
    async deletePost() {
      await this.$axios.$delete("/delete-lot/" + this.lot._id);
      this.$router.push({
        name: "admin-lots",
      });
    },
    projectChangeHandle() {
      const project = this.projectsGUIDs.find((project) => {
        return project.value == this.lot.project_guid;
      });
      this.lot.project_title = project.text;
      console.log("projectChangeHandle ", this.lot);
    },
    filesChanged(data) {
      console.log("filesChanged ", data);
      if (data.uploadType === "gallery") {
        this.files = [...data.files];
        this.lot.gallery.push(data.filenameFinal);
      }
    },
    filesRemoved(data) {
      if (data.type === "gallery") {
        this.lot.gallery.splice(data.index, 1);
      }
    },
    filesDragged(data) {
      console.log("dragEnd ", data);
      this.files = [];
      this.files = [...data];
      this.lot.gallery = [];
      data.forEach((file) => {
        this.lot.gallery.push(file.name);
      });
    },
  },
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {
    //console.log('mounted')
    // setTimeout(function () {
    //     this.isShow = true;
    //  }.bind(this), 400)
  },
  computed: {
    projectsGUIDs() {
      const projects = this.$store.getters["getProjects"]("All");
      const projectsGUIDs = projects.map((project) => {
        return { value: project.guid, text: project.title };
      });
      console.log("projectsGUIDs ", projectsGUIDs);
      return projectsGUIDs;
    },
    allLotsTypes() {
      return this.$store.getters.getAllLotsTypes;
    },
  },
};
</script>

<style lang="scss">
.lot-orders-block {
  margin-top: -20px;
}

.lot-orders-block .card p {
  margin-bottom: 0px;
  font-size: 16px;
}

.lot-tabs {
  display: flex;
  padding: 0rem 0 2rem;
}

.lot-tabs div {
  margin-right: 2rem;
  font-size: 18px;
  cursor: pointer;
  color: #999;
}

.lot-tabs div.active {
  color: #111;
}

/* #add-new-lot .table th, #add-new-lot .table td {
    width: 25%;
    border: none;
    padding-right: 20px;
} */

#add-new-lot {
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
