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
                    paypalStatus: "paypal_status",
                    stripeStatus: "stripe_status",
                    appName: "project_app_name",
                    baseURL: "base_url",
                    assetURL: "asset_url",
                    imgur: "imgurId",
                    imgurStatus: "imgur_status",
                    breadcrumbImage: "breadcrumb_image",
                    displayWidth: "getWidth",
                })
            }
        });
    }
};

Vue.use(User);
