<template>
  <section>
    <div class="container">
      <b-row>
        <b-col md="12">
          <b-tabs content-class="mt-3">
            <b-tab title="Общие данные" active>
              <b-card>
                <div class="form-group">
                  <label for="title">Адрес</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model.trim="company.address"
                  />
                </div>
                <div class="form-group">
                  <label for="title">Телефон</label>
                  <input
                    class="form-control"
                    type="text"
                    v-model.trim="company.phone"
                  />
                </div>
                <div class="form-group">
                  <label for="title">Email для отправок</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder=""
                    v-model.trim="company.emailFrom"
                  />
                </div>
                <div class="form-group">
                  <label for="title">Email для получения</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder=""
                    v-model.trim="company.emailTo"
                  />
                </div>
                <div class="form-group">
                  <label for="title">Ящики для заявок</label>
                  <div
                    v-for="(feature, i) in company.emailsForOrders"
                    :key="i"
                    class="mb-2"
                  >
                    <input
                      class="form-control"
                      type="text"
                      placeholder=""
                      v-model="company.emailsForOrders[i]"
                    />
                  </div>
                  <button class="admin-sec-btn" @click="addEmail()">
                    Добавить
                  </button>
                </div>
                <br />
                <div class="form-group">
                  <button
                    type="submit"
                    class="mr-10 admin-main-btn"
                    name="editPost"
                    id="editPost"
                    @click="editContacts()"
                  >
                    Сохранить
                  </button>
                </div>
                <div class="form-group">
                  <div
                    class="company-save-error"
                    v-html="company.errorWithSave"
                  ></div>
                </div>
              </b-card>
            </b-tab>
            <b-tab title="Контакты">
              <b-card v-for="(contact, index) in company.contacts" :key="index">
                <div class="one-project-prev-info-block row">
                  <div class="col-md-1 row-item-col-1">
                    <div>{{ index + 1 }}</div>
                  </div>
                  <div class="col-md-2 row-item-col-2">
                    <nuxt-link :to="'/admin/company/contacts/' + contact.id">
                      {{ contact.city }}
                    </nuxt-link>
                  </div>
                  <div class="col-md-8 row-item-col-3">
                    {{ contact.address }}
                  </div>
                  <div class="col-md-1 row-item-col-1">
                    <div class="handle">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </b-card>
            </b-tab>
          </b-tabs>
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
      company: {},
    };
  },
  methods: {
    addEmail() {
      this.company.emailsForOrders.push("");
    },
    isActiveTab(lang) {
      return this.activeLang === lang;
    },
    async getContact() {
      const response = await this.$axios.$get("/company-data/");
      this.company = response.company;
    },
    async editContacts() {
      this.company.emailsForOrders = this.company.emailsForOrders.filter(
        function (el) {
          return el != "";
        }
      );

      const response = await this.$axios.$put("/company-edit/", this.company);
      if (response.success) {
        console.log("All good");
      }
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
.company-orders-block {
  margin-top: -20px;
}

.company-orders-block .card p {
  margin-bottom: 0px;
  font-size: 16px;
}

.company-tabs {
  display: flex;
  padding: 0rem 0 2rem;
}

.company-tabs div {
  margin-right: 2rem;
  font-size: 18px;
  cursor: pointer;
  color: #999;
}

.company-tabs div.active {
  color: #111;
}

#add-new-company .table th,
#add-new-company .table td {
  width: 30%;
  border: none;
  padding-right: 20px;
}
</style>
