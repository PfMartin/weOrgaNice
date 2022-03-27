import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: null,
    categories: [],
    systemMessage: {
      msg: '',
      msgType: '',
    },
    isMenuOpen: false,
  },
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [createPersistedState()],
});
