export default {
    namespaced: true,
    state: {
      dummyresult: []
    },
    getters: {
      dummyresult: (state: any) => {
        return state.dummyresult
      },
    },
    mutations: {
        dummyresult (state: any, payload: number[]) {
          state.dummyresult = payload
        }
    },
    actions: {
      dummyresult (context: any, payload: number[]) {
        context.commit('dummyresult', payload)
      }
    }
  }