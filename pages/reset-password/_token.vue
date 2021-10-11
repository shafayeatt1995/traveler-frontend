<template>
<div class="container mt-5" v-if="find">
    <form @submit.prevent="submit">
        <div class="col-lg-4 offset-lg-4 input-form">
            <h1 class="text-center my-4">Reset Password</h1>
            <input type="password" id="password" placeholder="New Password" v-model="credential.password" />
            <input type="password" id="passwor-confirmation" placeholder="Confirm Password" v-model="credential.password_confirmation" />
            <button type="submit" class="strong">
                <transition name="fade" mode="out-in">
                    <Loading v-if="loading" />
                    <span v-else>Reset Password</span>
                </transition>
            </button>
        </div>
    </form>
</div>
<div class="container mt-5 text-center" v-else>
    <h3>Reset Password Link Not Found</h3>
</div>
</template>

<script>
export default {
    head() {
        return {
            title: "Reset Password - " + this.appName,
            link: [{rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            loading: false,
            find: true,
            credential: {
                token: "",
                password: "",
                password_confirmation: "",
            },
        };
    },

    methods: {
        // Get reset password link
        resetLink() {
            this.$axios.get("find-reset-link/" + this.$route.params.token).then(
                (response) => {
                    this.credential.token = this.$route.params.token;
                    this.find = true;
                },
                (error) => {
                    this.find = false;
                    $nuxt.$emit("error", error);
                },
            )
        },

        //Submit New Password
        submit() {
            if (this.click) {
                this.click = false;
                this.loading = true;
                this.$axios.post("reset-password", this.credential).then(
                    (response) => {
                        this.loading = false;
                        this.click = true;
                        $nuxt.$emit("success", "Password Successfully Updated");
                        this.$router.push("/login");
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.loading = false;
                        this.click = true;
                    },
                )
            }
        }
    },

    created() {
        if (!this.authCheck) {
            this.resetLink();
        } else {
            this.$router.push("/dashboard");
        }
    },
};
</script>
