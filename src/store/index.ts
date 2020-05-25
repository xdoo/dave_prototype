import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import snackbar from './modules/snackbar';
import security from './modules/security';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    snackbar,
    security,
  },
  strict: debug
})
