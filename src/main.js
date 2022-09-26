import "ant-design-vue/dist/antd.css";
import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import Antd from "ant-design-vue";
import store from './store/index';

createApp(App).use(router).use(store).use(Antd).mount('#app');
