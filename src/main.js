import "ant-design-vue/dist/antd.css";
import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import Antd from "ant-design-vue";

createApp(App).use(router).use(Antd).mount('#app');
