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
            this.loading = true
            if(this.click) {
                this.click = false;
                this.$auth.loginWith("laravelJWT", {
                    data: {
                        email: this.credential.email,
                        password: this.credential.password,
                    },
                }).then(
                    ()=>{
                        this.loading = false
                        this.click = true;
                    },
                    ()=>{
                        this.loading = false
                        $nuxt.$emit("customError", "Email or Password Not Matched");
                        this.click = true;
                    }
                );
            }
        },

        // Get Remember Password Info
        rememberInfo(){},
    },

    created() {
        if (this.authCheck) {
            this.$router.push("/dashboard");
        }
    },
};
</script>