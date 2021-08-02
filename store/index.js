export const state = () => ({})

export const getters = {
    //Auth Check
    authentication(state) {
        return state.auth.loggedIn;
    },

    //Admin Check
    isAdmin(state) {
        return state.auth.loggedIn ? state.auth.user.role_id == 1 ? true : false : false;
    },

    //User Check
    isUser(state) {
        return state.auth.loggedIn ? state.auth.user.role_id == 2 ? true : false : false;
    },

    //User id Check
    user_id(state) {
        return state.auth.loggedIn ? state.auth.user.id : '';
    },
}

export const mutations = {}

export const actions = {}



