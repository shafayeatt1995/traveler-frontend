<template>
    <div class="login-form">
        <form @submit.prevent="submit" class="container" v-if="!authCheck">
            <div class="col-lg-4 offset-lg-4 input-form">
                <h1 class="text-center mb-4">Login</h1>
                <input type="email" id="email" placeholder="Type Your Email" v-model="credential.email" />
                <input type="password" id="password" placeholder="Type Your Password" v-model="credential.password"/>
                <button type="submit" class="strong">
                    <transition name="fade" mode="out-in">
                        <Loading v-if="loading"/>
                        <span v-else>Login</span>
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
            title: "Login - " + this.appName,
        };
    },
    data() {
        return {
            click: true,
            loading: false,
            credential: {
                email: "",
                password: "",
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
    },

    created() {
        if (this.authCheck) {
            this.$router.push("/dashboard");
        }
    },
};
</script>