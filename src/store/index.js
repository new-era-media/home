import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    homes: [],
  },
  getters: {
    allPosts(state) {
      return state.homes;
    },
  },
  mutations: {
    UPDATE_HOMES(state, homes) {
      state.homes = homes;
    },
    addLike(state, data) {
      state.homes[data.id].like = data.value
    },
  },
  actions: {
    addLike(actions, data) {
      return data.forEach((element) => {
        element.like = false;
      });
    },
    async fetchHome(ctx) {
      try {
        const res = await axios.get("/entities.json");
        res.data.response.forEach((element) => {
          element.like = false;
        });
        ctx.commit("UPDATE_HOMES", res.data.response);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
