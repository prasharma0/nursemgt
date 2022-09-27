import 'ant-design-vue/dist/antd.css';
import 'vue-toastification/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import Antd from 'ant-design-vue';
import store from './store/index';
import Toast from 'vue-toastification';

createApp(App)
  .use(router)
  .use(store)
  .use(Antd)
  .use(Toast)
  .mount('#app');
