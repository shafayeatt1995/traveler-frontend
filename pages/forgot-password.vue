<template>
    <div class="login-form">
        <form @submit.prevent="submit" class="container" v-if="!authCheck">
            <div class="col-lg-6 offset-lg-3 input-form">
                <h1 class="text-center my-4">Forgot Password</h1>
                <input type="email" id="email" placeholder="Type Your Email" v-model="credential.email" />
                <button type="submit" class="strong">
                    <transition name="fade" mode="out-in">
                        <Loading v-if="loading"/>
                        <span v-else>Reset Password</span>
                    </transition>
                </button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: "Forgot Password - " + this.appName,
            link: [{rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },
    data() {
        return {
            click: true,
            loading: false,
            credential: {
                email: "",
            },
        };
    },

    methods: {
        submit() {
            if(this.click) {
                this.click = false
                this.$axios.post("forget-password", this.credential).then(
                    (response)=>{
                        this.credential.email = "";
                        $nuxt.$emit("success", "Reset Password Link Send Your Email");
                        this.click = true;
                    },
                    (error)=>{
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },
    },

    created() {
        if (this.authCheck) {
            this.$router.push("/dashboard");
        }
    },
};
</script>