import { createStore } from 'vuex';

export default createStore({
  state: {
    postsList: {},
    admin: true,
  },
  mutations: {
    changePostList({ postsList }, { id, newPost }) {
      postsList[id] = { ...newPost }
    },
    changeAmountComments({ postsList }, id) { // amount - либо +1 либо -1

      let amountComments = 0;
      function checkObj(obj) {
        Object.keys(obj.comments).forEach(comment => {
          if (Object.keys(obj.comments[comment])) {
            amountComments += 1;
            checkObj(obj.comments[comment]);
          }
        })
      }
      checkObj(postsList[id])
      postsList[id].amountComments = amountComments
    },
    changeAdminState(state) {
      state.admin = !state.admin
    }
  },
  actions: {
    loadPostsList({ state }) {
      state.postsList = { ...JSON.parse(localStorage.getItem('postsList')) };
    },
    savePostList({ dispatch, state }) {
      localStorage.setItem('postsList', JSON.stringify(state.postsList));
      dispatch('loadPostsList');
    },
  },
  getters: {
    getPostList(state) {
      return state.postsList;
    },
    isAdmin(state) {
      return state.admin
    },
    getPostListMainPage: (state) => (numbers) => Object.entries(state.postsList).slice(0, numbers+1),
    getCurrentPost: (state) => (id) => state.postsList[id],
  },
});
