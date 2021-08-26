import Vue from "vue";
import { mapGetters } from "vuex";

const User = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    authCheck: "authentication",
                    admin: "isAdmin",
                    guide: "isGuide",
                    user: "isUser",
                    adminOrGuide: "isAdminOrGuide",
                    adminOrUser: "isAdminOrUser",
                    userId: "user_id",
                    paypal: "paypal_js",
                    appName: "project_app_name",
                    baseURL: "base_url",
                    assetURL: "asset_url",
                })
            }
        });
    }
};

Vue.use(User);
