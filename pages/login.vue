<template>
    <div class="login-form">
        <form @submit.prevent="submit" class="container" v-if="!authCheck">
            <div class="col-lg-4 offset-lg-4 input-form">
                <h1 class="text-center mb-4">Login</h1>
                <input type="email" id="email" placeholder="Type Your Email" v-model="credential.email" />
                <input
                    type="password"
                    id="password"
                    placeholder="Type Your Password"
                    v-model="credential.password"
                />
                <button type="submit" class="strong" v-if="loading">
                    <div class="spinner">
                        <div class="rect1"></div>
                        <div class="rect2"></div>
                        <div class="rect3"></div>
                        <div class="rect4"></div>
                        <div class="rect5"></div>
                    </div>
                </button>
                <button type="submit" class="strong" v-else>Login</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: "Login - " + process.env.appName,
        };
    },
    data() {
        return {
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
            this.$auth.loginWith("laravelJWT", {
                data: {
                    email: this.credential.email,
                    password: this.credential.password,
                },
            }).then(()=>{
                this.loading = false
            },
            error=>{
                this.loading = false
                $nuxt.$emit("error", "Email or Password Not Matched");
            });
        },
    },

    created() {
        if (this.authCheck) {
            this.$router.push("/dashboard");
        }
    },
};
</script>