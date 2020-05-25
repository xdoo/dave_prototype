import Vue, {VNode} from 'vue';
import 'babel-polyfill';
import Vuetify from "./plugins/vuetify";
import store from './store';
import App from './App.vue';
import router from "./router";
import moment from "moment";
import validationRules from "@/mixins/validationRules";
import './directives/infinitescroll';
import './plugins/leafletmaps'
import proj4 from "proj4";

Vue.config.productionTip = false;

Vue.use(validationRules);

moment.locale(window.navigator.language);

new Vue({
    router,
    store: store,
    vuetify: Vuetify,
    render: (h): VNode => h(App),
}).$mount('#app');
