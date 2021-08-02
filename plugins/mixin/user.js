import Vue from "vue";
import { mapGetters } from "vuex";

const User = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    authCheck: "authentication",
                    admin: "isAdmin",
                    user: "isUser",
                    userId: "user_id"
                })
            }
        });
    }
};

Vue.use(User);
