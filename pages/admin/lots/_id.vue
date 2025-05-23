<template>
  <section>
    <div class="loading" v-show="loading">
      <b-spinner variant="secondary" label="Loading..."></b-spinner>
    </div>
    <div id="lot-page" v-if="lot.type">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="admin-content-header">
              <div>
                <h1>{{ lot.type }}</h1>
                <p v-if="lot.project_title">{{ lot.project_title }}</p>
              </div>
              <div>
                <div>
                  <nuxt-link :to="'/admin/lots'" class="admin-sec-btn">К списку лотов</nuxt-link>
                </div>
              </div>
            </div>


              <b-form-group id="lot-status" label="Статус:" label-for="lot-status">
                <b-form-select id="lot-status" v-model="lot.status" :options="statuses" required></b-form-select>
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
                @filesDragged="filesDragged">
              </AdminFileUploadForm>


              <b-form-group id="lot-project_guid" label="Проект:" label-for="lot-project_guid"
                :class="{ 'has-error': hasErrors.project_guid }">
                <b-form-select id="lot-project_guid" v-model="project_guid" :options="projectsGUIDs"
                  @change="projectChangeHandle()" required></b-form-select>
              </b-form-group>
              <b-form-group id="lot-type" label="Тип:" label-for="lot-type" :class="{ 'has-error': hasErrors.type }">
                <b-form-select id="lot-type" v-model="lot.type" :options="allLotsTypes" required></b-form-select>
              </b-form-group>
              <b-form-group id="lot-number" label="Номер:" label-for="lot-number">
                <b-form-input id="lot-number" v-model="lot.number" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group id="lot-section_number" label="Номер секции:" label-for="lot-section_number">
                <b-form-input id="lot-section_number" v-model="lot.section_number" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group id="lot-floor_number" label="Этаж:" label-for="lot-floor_number">
                <b-form-input id="lot-floor_number" v-model="lot.floor_number" type="text" required>
                </b-form-input>
              </b-form-group>
              <b-form-group id="lot-square" label="Площадь, м2:" label-for="lot-square">
                <b-form-input id="lot-square" v-model="lot.square" type="number" required>
                </b-form-input>
              </b-form-group>
              <b-form-group id="lot-price" label="Стоимость, руб./мес.:" label-for="lot-price">
                <b-form-input id="lot-price" v-model="lot.price" type="number" required>
                </b-form-input>
              </b-form-group>
              <b-form-group id="lot-about" label="Описание:" label-for="lot-about">
                <vue-editor :editorToolbar="customToolbar" v-model="lot.about"></vue-editor>
              </b-form-group>
              <b-form-group id="lot-own_entrance" label-for="lot-own_entrance">
                <b-form-checkbox id="checkbox-1" v-model="lot.own_entrance" name="checkbox-1" value=true
                  unchecked-value=false>
                  Отдельный вход
                </b-form-checkbox>
              </b-form-group>
              <b-form-group id="lot-options" label="Условия сделки:" label-for="lot-options">
                <div v-for="(option, i) in lot.options" :key="i" class="mb-2">
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
              </b-form-group>
              <b-form-group id="lot-guid" label="guid:" label-for="lot-guid">
                <b-form-input id="lot-guid" v-model="lot.guid" type="text" disabled>
                </b-form-input>
              </b-form-group>


          </div>
        </div>
      </div>

      <div class="page-actions">
        <div class="container">
          <div class="row">
            <div class="col-md-10 d-flex align-items-center justify-content-start">
              <button type="submit" class="mr-10 admin-main-btn"
                @click="editLot()">Сохранить</button>
              <button class="admin-sec-btn mr-10" type="button" @click="showDeletePostModal()">Удалить</button>
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
    <div id="lot-page" v-if="lotUnvailable">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="admin-content-header">
              <div>
                <h1>Нет такого лота</h1>
              </div>
              <div>
                <div>
                  <nuxt-link :to="'/admin/lots'" class="admin-sec-btn">К списку лотов</nuxt-link>
                </div>
              </div>
            </div>
            <br>
          </div>
        </div>
      </div>

      <div class="page-actions fixed active">
        <div class="container">
          <div class="row">
            <div class="col-md-10 d-flex align-items-center justify-content-start">
              <button type="submit" class="mr-10 admin-main-btn" name="editPost" id="editPost"
                @click="editLot()">Сохранить</button>
              <button class="admin-sec-btn mr-10" type="button" @click="showDeletePostModal()">Удалить</button>
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
  </section>
</template>

<script>
import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js'
import adminDeleteModal from '~/components/admin/DeleteModal.vue'

export default {
  components: {
    FileUpload,
    adminDeleteModal
  },
  layout: 'admin',
  data() {
    return {
      lotUnvailable: false,
      activeLang: 'ru',
      showModal: false,
      activetab: 1,
      isShow: false,
      own_entrance: false,
      project_guid: undefined,
      lot: {},
      statuses: [
        { value: 'free', text: 'Свободен' },
        { value: 'secured', text: 'Забронирован' },
      ],
      files: [],
      filesOriginal: [],
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"]
      ],
      errors: [],
      hasErrors: {
        project_guid: false,
        type: false,
      },
      status: false,
      loading: false

    }
  },
  methods: {
    async getLot() {
      const response = await this.$axios.$get('/admin-get-one-lot/' + this.$route.params.id)
      console.log('response ', response)
      if (response.success) {
        this.lot = response.lot;
        this.project_guid = response.lot.project_guid
        let galleryItem
        const gallery = response.lot.gallery
        this.files = []
        for (let i = 0; i < gallery.length; i++) {
          if (gallery[i] != undefined) {
            galleryItem = {
              state: 'old-file',
              name: gallery[i],
              size: 0,
              thumb: '/uploads/lots/' + response.lot.guid + '/' + gallery[i]
            }
            this.files.push(galleryItem)
          } else {
            const image_gallery = gallery[i]
            this.lot.gallery[i] = ''
            this.lot.gallery[i] = image_gallery
            this.lot.gallery[i].alt = ''
            galleryItem = {
              state: 'old-file',
              name: image_gallery,
              size: 0,
              thumb: '/uploads/lots/' + response.lot.guid + '/' + image_gallery
            }
            this.files.push(galleryItem)
          }
        }
        this.filesOriginal = this.files.slice(0);
        if (
          response.lot.options.length === 0 ||
          response.lot.options == undefined
        ) {
          this.lot.options = [["", ""]];
        }
      } else {
        this.lotUnvailable = true
      }


    },
    async editLot() {
      this.loading = true
      this.errors = []
      this.hasErrors = {
        project_guid: false,
        type: false
      }

      this.lot.options = this.lot.options.filter(function (el) {
          return el[0] !== "" && el[1] !== "";
      });

      if (this.lot.project_guid == '' || this.lot.project_guid == undefined) {
        this.errors.push('Укажите проект')
        this.hasErrors.project_guid = true
      }

      if (this.lot.type == '' || this.lot.type == undefined) {
        this.errors.push('Укажите тип проекта')
        this.hasErrors.type = true
      }
      console.log('this.lot ', this.lot)
      console.log('this.errors ', this.errors)

      if (!this.errors.length) {
        const response = await this.$axios.$put('/lot/' + this.$route.params.id, this.lot)
        console.log('response after edit: ' + JSON.stringify(response))
        this.submitFiles();
      }
    },
    getDifference(array1, array2) {
      return array1.filter(object1 => {
        return !array2.some(object2 => {
          return object1.name === object2.name;
        });
      });
    },
    async submitFiles() {
      const filesForRemove = this.getDifference(this.filesOriginal, this.files)
      console.log('this.files 1', this.files)
      console.log('filesForRemove ', filesForRemove)
      if (filesForRemove.length) {
        await this.$axios.$post('/delete-lot-files/', { lotFolder: this.lot.guid, files: filesForRemove })
      }

      console.log('this.files 2', this.files)

      const formData = new FormData();
      const oldFilesArr = []

      for (var i = 0; i < this.files.length; i++) {
        const newFile = this.files[i].file;
        const oldFile = this.files[i].state
        const name = this.files[i].name
        /// if new file
        if (newFile) {
          formData.append('files', newFile);
          formData.append('id', this.lot.id);
        }
        if (oldFile == 'old-file') {
          oldFilesArr.push(name)
        }
      }
      const response = await this.$axios.$post('/files-lot-upload/' + this.lot.guid, formData)
      console.log('response: ' + JSON.stringify(response))
      this.filesOriginal = this.files.slice(0);
      //this.$router.push('/admin/all-posts')
      this.loading = false
      

    },
    async deletePost() {
      await this.$axios.$delete('/delete-lot/' + this.lot._id)
      this.$router.push({
        name: 'admin-lots'
      })
    },
    showDeletePostModal(data) {
      this.$modal.show(adminDeleteModal, {
        type: 'lot',
        lot: this.lot._id,
      }, {
        draggable: false,
        width: 400,
        height: 200,

      }, {
        //'before-open': this.beforeOpen(data),
        // 'before-close': this.beforeClose
      })
    },
    projectChangeHandle() {
      const project = this.projectsGUIDs.find(project => {
        return project.value == this.project_guid
      })
      this.lot.project_title = project.text
      this.lot.project_guid = project.value
    },
    filesChanged(data) {
      console.log('filesChanged ', data)
      if (data.uploadType === 'gallery') {
        this.files = [...data.files]
        this.lot.gallery.push(data.filenameFinal)
      }
    },
    filesRemoved(data) {
      console.log('filesRemoved ', data)
      console.log('this.files ', this.files)
      if (data.type === 'gallery') {
        // this.files = [...data.files]
        this.lot.gallery.splice(data.index, 1)
      }
    },
    filesDragged(data) {
      console.log('dragEnd ', data)
      this.files = []
      this.files = [...data]
      this.lot.gallery = []
      data.forEach(file => {
        this.lot.gallery.push(file.name)
      })
      this.editLot()
    },
    addOption() {
      this.lot.option.push(["", ""]);
    },

  },
  beforeCreate() {

  },
  created() {
    //console.log('created')
    this.getLot();
  },
  destroyed() {
  },
  mounted() {
    //console.log('mounted')
    // setTimeout(function () { 
    //     this.isShow = true;   
    //  }.bind(this), 400)

  },
  computed: {
    projectsGUIDs() {
      const projects = this.$store.getters['getProjects']('All')
      const projectsGUIDs = projects.map(project => {
        return { value: project.guid, text: project.title }
      })
      console.log('projectsGUIDs ', projectsGUIDs)
      return projectsGUIDs
    },
    allLotsTypes() {
      return this.$store.getters.getAllLotsTypes
    }
  }
} 
</script>

<style lang="scss" scoped>

.loading {
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.50);
  z-index: 9;
}

</style>
