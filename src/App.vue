<template>
  <div class="min-h-full font-Poppins box-border">
    <Navigation></Navigation>
    <router-view />
  </div>
</template>

<script>
import { ref } from "vue";
import Navigation from "./components/Navigation.vue";
import { auth } from "././firebase/firebase";
import store from "./store/index";

export default {
  components: {
    Navigation,
  },
  setup() {
    // Create data / vars
    const appReady = ref(false);
    const user = auth.currentUser;
    // If user does not exist, need to make app ready
    if (!user) {
      appReady.value = true;
    }
    console.log(user);
    // Runs when there is a auth state change
    // if user is logged in, this will fire
    // supabase.auth.onAuthStateChange((_, session) => {
    store.methods.setUser(user);
    //   appReady.value = true;
    // });

    return { appReady };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
