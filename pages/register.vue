<template>
    <div class="login-form">
        <form @submit.prevent="submit" class="container" v-if="!authCheck">
            <div class="col-lg-4 offset-lg-4 input-form">
                <h1 class="text-center mb-4">Register</h1>
                <input type="text" id="name" placeholder="Type Your Name" v-model="credential.name" />
                <input type="email" id="email" placeholder="Type Your Email" v-model="credential.email" />
                <input type="password" id="password" placeholder="Enter Your Password" v-model="credential.password"/>
                <input type="password" id="confirmPassword" placeholder="Renter Your Password" v-model="credential.password_confirmation" :class="credential.password !== credential.password_confirmation ? 'border-danger':''"/>
                <button type="submit" class="strong">
                    <transition name="fade" mode="out-in">
                        <Loading v-if="loading"/>
                        <span v-else>Register</span>
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
            title: "Register - " + this.appName,
        };
    },
    data() {
        return {
            loading: false,
            credential: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
        };
    },

    methods: {
        submit() {
            this.loading = true;
            this.$axios.post('register', this.credential).then(
                ()=>{
                    this.$auth.loginWith("laravelJWT", {
                        data: {
                            email: this.credential.email,
                            password: this.credential.password,
                        },
                    }).then(
                        ()=>{
                            this.loading = false;
                        },
                        ()=>{
                            this.loading = false;
                            $nuxt.$emit("error", "Email or Password Not Matched");
                        }
                    )
                },
                (error)=>{
                    this.loading = false;
                    $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : error.response.data.error ? error.response.data.error : "Something Wrong! Please try Again");
                }
            )
        },
    },

    created() {
        if (this.authCheck) {
            this.$router.push("/dashboard");
        }
    },
};
</script>