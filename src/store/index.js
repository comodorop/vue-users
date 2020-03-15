import Vue from 'vue';
import Vuex from 'vuex';
import http from '../services/http'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lstUsers: []
  },
  getters: {
    getUsers: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
});