import { reactive } from "vue";

const state = reactive({
  user: null,
});

const methods = {
  setUser(payLoad) {
    state.user = payLoad ? payLoad.user : null;
  },
};

export default {
  state,
  methods,
};
