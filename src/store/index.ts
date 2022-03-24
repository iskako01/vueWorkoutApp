import { ref } from "vue";
import { firebase } from "../firebase/firebase";
interface Iuser {
  user: firebase.User | string | null;
}

const state = ref<Iuser>({
  user: null,
});

const methods = {
  setUser(payLoad: firebase.User) {
    state.value.user = payLoad;
  },
};

export default {
  state,
  methods,
};
