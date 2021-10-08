import axios from "axios"
export const state = () => ({
    app_name: "",
    paypal_id: "",
    paypalStatus: "",
    stripeStatus: "",
    imgurStatus: "",
    link: process.env.baseURL,
    asset_link: process.env.assetURL,
    header: {},
    footer: {},
    imgur_id: "",
    breadcrumb: "",
    allWishlists: [],
    width: 0,
    titleIcon: "",
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

    // Auth User
    auth_user(state) {
        return state.auth.loggedIn ? state.auth.user : false;
    },

    //User id Check
    user_id(state) {
        return state.auth.loggedIn ? state.auth.user.id : '';
    },

    //Paypal id
    paypal_js(state){
        return state.paypal_id;
    },

    //Paypal status
    paypal_status(state){
        return state.paypalStatus;
    },

    //Stripe status
    stripe_status(state){
        return state.stripeStatus;
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

    //Header Logo
    headerLogo(state){
        return state.header.image;
    },

    //Header.phone
    headerPhone(state){
        return state.header.phone;
    },

    //Header Email
    headerEmail(state){
        return state.header.email;
    },

    //Footer Logo
    footerLogo(state){
        return state.footer.image;
    },

    //Footer Logo
    footerMessage(state){
        return state.footer.message;
    },

    //Footer Logo
    footerSocial(state){
        return state.footer.social;
    },

    //Footer Logo
    footerPhone(state){
        return state.footer.phone;
    },

    //Footer Logo
    footerEmail(state){
        return state.footer.email;
    },

    //Footer Logo
    footerAddress(state){
        return state.footer.address;
    },

    //Footer Logo
    footerNewsletterMessage(state){
        return state.footer.newsletterMessage;
    },

    //Imgur Api link
    imgurId(state){
        return state.imgur_id;
    },

    //Imgur status
    imgur_status(state){
        return state.imgurStatus;
    },

    //Breadcrumb Image
    breadcrumb_image(state){
        return state.breadcrumb;
    },

    //Breadcrumb Image
    wishlists(state){
        return state.allWishlists;
    },

    //Breadcrumb Image
    getWidth(state){
        return state.width;
    },

    //Breadcrumb Image
    title_icon(state){
        return state.titleIcon;
    },
}

export const mutations = {
    // Get Paypal Information
    getapp(state, response) {
        state.app_name = response.data.appName;
        state.paypal_id = response.data.paypal !== "" ? "https://www.paypal.com/sdk/js?client-id=" + response.data.paypal : "";
        state.header = response.data.header !== null ? JSON.parse(response.data.header.info) : {};
        state.footer = response.data.footer !== null ? JSON.parse(response.data.footer.info) : {};
        state.imgur_id = response.data.imgurId !== null ? response.data.imgurId : "";
        state.breadcrumb = response.data.breadcrumb !== null ? response.data.breadcrumb.info : "";
        state.paypalStatus= response.data.paypalStatus;
        state.stripeStatus= response.data.stripeStatus;
        state.imgurStatus= response.data.imgurStatus;
        state.titleIcon= response.data.titleIcon;
    },

    //Set Wishlist
    setWishlist(state, response){
        state.allWishlists = response.wishlists;
    },

    //Set Wishlist
    setWidth(state, width){
        state.width = width;
    },
}

export const actions = {
    // Get Paypal Information
    async nuxtServerInit (context) {
        const response = await axios.get(context.state.link + "start");
        context.commit("getapp", response);
    },
    triggerinit (context) {
        axios.get(context.state.link + "start").then(
            (response)=>{
                context.commit("getapp", response);
            }
        )
    },

    // Get Wishlist Information
    triggerWishlist(context){
        if (context.state.auth.loggedIn) {
            axios.get(context.state.link + "wishlist/" + context.state.auth.user.id).then(
                (response)=>{
                    context.commit("setWishlist", response.data);
                }
            )
        } else{
            context.commit("setWishlist", {wishlists: []});
        }
    },
    
    triggerDisplay(context, width){
        context.commit("setWidth", width);
    },
}



