import axios from "axios"

export const state = () => ({
    app_name: "",
    paypal_id: "",
    link: process.env.baseURL,
    asset_link: process.env.assetURL,
})

export const getters = {
    //Auth Check
    authentication(state) {
        return state.auth.loggedIn;
    },

    //Admin Check
    isAdmin(state) {
        return state.auth.loggedIn ? state.auth.user.role_id == 1 ? true : false : false;
    },

    //Guide Check
    isGuide(state) {
        return state.auth.loggedIn ? state.auth.user.role_id == 2 ? true : false : false;
    },

    //User Check
    isUser(state) {
        return state.auth.loggedIn ? state.auth.user.role_id == 3 ? true : false : false;
    },

    //Admin or Guide Check
    isAdminOrGuide(state) {
        return state.auth.loggedIn ? state.auth.user.role_id == 1 || state.auth.user.role_id == 2 ? true : false : false;
    },

    //Admin or User Check
    isAdminOrUser(state) {
        return state.auth.loggedIn ? state.auth.user.role_id == 1 || state.auth.user.role_id == 3 ? true : false : false;
    },

    //User id Check
    user_id(state) {
        return state.auth.loggedIn ? state.auth.user.id : '';
    },

    //Paypal id
    paypal_js(state){
        return state.paypal_id;
    },

    //Paypal id
    project_app_name(state){
        return state.app_name;
    },

    //Paypal id
    base_url(state){
        return state.link;
    },

    //Paypal id
    asset_url(state){
        return state.asset_link;
    },
}

export const mutations = {
    // Get Paypal Information
    getapp(state, response) {
        state.app_name = response.appName;
        state.paypal_id = "https://www.paypal.com/sdk/js?client-id=" + response.paypal;
    },
}

export const actions = {
    // Get Paypal Information
    async nuxtServerInit (context) {
        const response = await axios.get(context.state.link + "start")
        context.commit("getapp", response.data);
    }
}



