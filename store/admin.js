import axios from 'axios'
import vuexFunc from '../utils/vuexFunc'
const config = require('./config')

export const state = () => ({
  filterSelected: {
    type: null,
    project_title: null
  }
})

export const actions = {

    
}

export const mutations = {
  SET_FILTER_SELECTED (state, data) {
    state.filterSelected[data.prop] = data.value
  },
  RESET_FILTER_SELECTED (state, data) {
    for (const item in state.filterSelected) {
      state.filterSelected[item] = null
    }
  },
}

export const getters = {
  getFilterSelected(state) {
    const filteredSelected = { 
      ...state.filterSelected 
    }

    const isEmpty = Object.values(filteredSelected).every(x => x === null);
    if (isEmpty) {
      return false
    } else {
      Object.keys(filteredSelected).forEach(key => {
        if (filteredSelected[key] === null) {
          delete filteredSelected[key];
        }
      });
      return filteredSelected
    }
  }

}


export const strict = false