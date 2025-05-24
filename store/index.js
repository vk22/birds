import axios from 'axios'
import vuexFunc from '../utils/vuexFunc'
const config = require('./config')

export const state = () => ({
  host: undefined,
  projects: [],
  lots: [],
  contacts: [],
  gallery: [],
  promos: [],
  slider: [],
  about: [],
  company: [],
  lotCategories: [],
  //allLotsTypes: ['Офис', 'Офис B1', 'Офис B2', 'Офис B3', 'Столовая', 'Магазин', 'Теплый склад', 'Холодный склад', 'ПСН'],
  lotSubcategories: [],
  access_token: 'kukuruza999'
})

  export const actions = {
    async nuxtServerInit({ commit, dispatch }, { app, req }) {
      const { host, cookie } = req.headers
      const authTokenLocal = getCookie(cookie, 'auth._token.local')
      console.log('nuxtServerInit cookie', getCookie(cookie, 'auth._token.local'))
      if (process.env.NODE_ENV !== 'production') {
        commit('SET_HOST', config.local)
      } else {
        commit('SET_HOST', config.prod)
      }
      //console.log('nuxtServerInit ')
      await dispatch('getLotCategories');
      await dispatch('getProjects', authTokenLocal);
      //await dispatch('getLots');
      await dispatch('getPromos');
      await dispatch('getSlider');
      // await dispatch('getCompany');
      await dispatch('getAbout');
      
    },
    async getLotCategories ({ commit, state })  {
      const { data } = await axios.get(`${state.host.baseURL}api/lot-categories/`)
      commit('SET_CATEGORIES', data.lotCategories) 
    },
    
    // async getProjects ({ commit, state }, authTokenLocal) { 
    //   const { data } = await axios.get(`${state.host.baseURL}api/projects/`, {
    //     headers: {
    //       'Authorization': authTokenLocal
    //     }
    //   })
    //   commit('SET_PROJECTS', data.projects)
    // },
    async getProjects ({ commit, state }, authTokenLocal) { 
      const { data } = await axios.get(`${state.host.baseURL}api/projects/`)
      commit('SET_PROJECTS', data.projects)
    },
    async getLots ({ commit, state }) {
      const { data } = await axios.get(`${state.host.baseURL}api/lots/`, { params: { mode: 'all' } })
      commit('SET_LOTS', data.lots)
    },
    async getSlider ({ commit, state })  {
      const { data } = await axios.get(`${state.host.baseURL}api/slider-data/`)
      commit('SET_SLIDER', data.slider) 
    },
    async getCompany ({ commit, state })  {
      const { data } = await axios.get(`${state.host.baseURL}api/company-data/`)
      commit('SET_COMPANY', data.company) 
    },
    async getPromos ({ commit, state }) {
      //console.log('getProjects ')
      const { data } = await axios.get(`${state.host.baseURL}api/promos/`)
      commit('SET_PROMOS', data.promos)
    },
    async getAbout ({ commit, state })  {
      const { data } = await axios.get(`${state.host.baseURL}api/about-data/`)
      commit('SET_ABOUT', data.about) 
    },
    
}

export const mutations = {
  SET_HOST (state, host) {
    state.host = host
  },
  SET_PROJECTS (state, projects) {
    projects.forEach (project => {
      project.freeSpaces = project.freeSpaces.filter( space => {
        return space.data != ''
      })
    })
    state.projects = projects
  },
  SET_LOTS (state, lots) {
    if (lots) {
      lots.map (lot => {
        lot.mainType = vuexFunc.getLotMainType(lot)
        const lotProject = state.projects.find( project => project.guid == lot.project_guid)
        if (lotProject) {
          lot.project = lotProject
          lot.metro = lotProject.metro
          lot.city = lotProject.city
          const lotCategories = state.lotCategories.find( cat => cat.id === lot.mainType)
          if (lotCategories) {
            lot.crumbs = vuexFunc.getBreadcrumbs(lot, lotCategories)
          }
        }

      })
    }
    state.lots = lots
  },
  SET_PROMOS (state, promos) {
    promos.forEach(function (el, index) {
      //console.log('el.date: ', el.date)
      el.date_start = vuexFunc.formatDateRuWitoutYear(el.date_start)
      el.date_end = vuexFunc.formatDateRu(el.date_end)
      el.dates = el.date_start + ' - ' + el.date_end
  });
    state.promos = promos
  },
  SET_CONTACTS (state, contacts) {
    state.contacts = contacts
  },
  SET_SLIDER (state, slider) {
    state.slider = slider
  },
  SET_ABOUT(state, about) {
    state.about = about
  },
  SET_COMPANY (state, company) {
    state.company = company
  },
  SET_CATEGORIES (state, lotCategories) {
    let lotSubcategories = []
    lotCategories.forEach(item => {
      if (item.subcategories) {
        lotSubcategories = lotSubcategories.concat(item.subcategories)
      }
    })
    state.lotSubcategories = lotSubcategories
    state.lotCategories = lotCategories
  },
}

export const getters = {

  getProjectOne: state => (url) => {
      var project = state.projects.find(o => o.url === url);
      return project;
  },
  getProjectOneById: state => (guid) => {
    var project = state.projects.find(o => o.guid === guid);
    return project;
  },
  getProjects:  state => (city) => {
    var projects = []
    if (city != 'All') {
      state.projects.map(element => {
        if (element.city == city) {
          projects.push(element)
        }
      });
    } else {
      projects = state.projects
    }
    return projects;
  },
  getProjectGallery:  state => (project) => {
    var gallery = state.gallery.find(o => o.project === project).gallery;
    return gallery;
  },
  getAllLotsTypes: state => {
    return state.lotSubcategories;
  },
  getAllLots: state => (type) =>  {
    if (type === 'all') {
        return state.lots;
    } else {
      return state.lots.filter( lot => lot.mainType === type )
    }
  },
  getProjectsLots: state => (guid) =>  {
    const lots = [...state.lots]
    const LotProject = state.projects.find(o => o.guid === guid);
    const lotsProject = lots.filter ( lot => {
      return lot.project_guid === guid
    })
    lotsProject.map (lot => {
      lot.project = LotProject
    })
    return lotsProject;
  },  
  getLotOne: state => (id) => {    
    const lot = state.lots.find(lot => lot._id === id);
    const project = state.projects.find( project => project.guid == lot.project_guid)
    lot.project = project
    return lot;
  },
  getProjectsMenu: state => (city) => {
    var menu = []
    state.projects.map(element => {
      if (element.city == city) {
        menu.push({
          name: element.title,
          subname: element.type,
          route: '/projects/'+element.url
  
        })
      }
    });
    return menu;
  },
  getContacts: state => {
    return state.company.contacts;
  },
  getSlider: state => {
    return state.slider;
  },
  getAbout: state => {
    return state.about;
  },
  getPromos: state => (id) => {
    let result
    if (id == 'promo') {
      result = [...state.promos]
    } else if (id == 'index') {
      result = [...state.promos].splice(0,4)
    } else {
      const promosForRent = []
      state.promos.map(element => {
        if (element.checkedRent.includes(id)) {
          promosForRent.push(element)
        }
      });
      result = promosForRent
    }
    return result;
  },
  getPromosForProject: state => (id) => {
    const promosForProject = []
    state.promos.map(element => {
      const findID = element.checkedProjects.filter(checkedProject => checkedProject === id)
      if (findID.length) {
        promosForProject.push(element)
      }
    });
    return promosForProject;
  },
  getPromoOne: state => (id) => {
      const promo = state.promos.find(o => o.id === parseInt(id));
      return promo;
  },
  getCompany: state => {
    return state.company;
  },
  getSections: state => {
    return state.lotCategories;
  },

}

function getCookie(cookie, name) {
  const value = `; ${cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const strict = false