<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="admin-content-header">
            <h1>{{ contact.city }}</h1>
          </div>

          <div class="card">
            <div class="form-group">
              <label for="title">Город</label>
              <input
                class="form-control"
                type="text"
                placeholder=""
                v-model.trim="contact.city"
              />
            </div>
            <div class="form-group">
              <label for="title">Адрес</label>
              <input
                class="form-control"
                type="text"
                v-model.trim="contact.address"
              />
            </div>
            <div class="form-group">
              <label for="title">Телефон</label>
              <input
                class="form-control"
                type="text"
                v-model.trim="contact.phone"
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
          </div>
          <br />
          <div
            class="form-group d-flex align-items-center justify-content-start"
          >
            <button
              type="submit"
              class="mr-10 admin-main-btn"
              @click="editContact()"
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
            <div
              class="contact-save-error"
              v-html="contact.errorWithSave"
            ></div>
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
      contact: {},
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
      this.contact.features.push("");
    },
    isActiveTab(lang) {
      return this.activeLang === lang;
    },
    async getContact() {
      const response = await this.$axios.$get("/company-data/");
      this.contact = response.company.contacts.find(
        (item) => item.id === +this.$route.params.id
      );
      this.mapCoordsLat = this.contact.mapCoords.lat;
      this.mapCoordsLng = this.contact.mapCoords.lng;
    },
    async editContact() {
      this.contact.mapCoords = {
        lat: this.mapCoordsLat,
        lng: this.mapCoordsLng,
      };

      console.log("editPost ", this.contact);
      const response = await this.$axios.$put(
        "/company-contact/" + this.$route.params.id,
        this.contact
      );
      console.log("response after edit: " + JSON.stringify(response));
    },
    async deleteContact() {
      await this.$axios.$delete("/delete-contact/" + this.contact._id);
      this.$router.push({
        name: "admin-contacts",
      });
    },
    showDeletePostModal(data) {
      this.$modal.show(
        adminDeleteModal,
        {
          type: "contact",
          contact: this.contact,
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
    this.getContact();
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
.contact-orders-block {
  margin-top: -20px;
}

.contact-orders-block .card p {
  margin-bottom: 0px;
  font-size: 16px;
}

.contact-tabs {
  display: flex;
  padding: 0rem 0 2rem;
}

.contact-tabs div {
  margin-right: 2rem;
  font-size: 18px;
  cursor: pointer;
  color: #999;
}

.contact-tabs div.active {
  color: #111;
}

#add-new-contact .table th,
#add-new-contact .table td {
  width: 30%;
  border: none;
  padding-right: 20px;
}
</style>
