import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth } from "./firebase/firebase";
import "./assets/tailwind.css";

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount("#app");
  }
});
