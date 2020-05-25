export default {
  namespaced: true,
  state: {
    // TODO: wieder deaktivieren
    noSecurity: true
  },
  getters: {
    isNoSecurityActive: (state: { noSecurity: boolean }) => {
      return state.noSecurity;
    },
  },
  mutations: {},
  actions: {}
}