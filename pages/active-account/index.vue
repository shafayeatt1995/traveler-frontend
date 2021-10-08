<template>
<div class="container text-center">
    <div v-if="authUser.email_verified_at == null">
        <transition name="fade" mode="out-in">
            <div class="active-accouunt mt-5" key="1" v-if="loading">
                <Loading-circle />
                <h3 class="strong mt-5">Please Wait. We Are Sending Verification Mail.</h3>
            </div>
            <div class="active-accouunt mt-5" key="2" v-else>
                <client-only>
                    <icon :icon="['far', 'check-circle']"></icon>
                </client-only>
                <h3 class="strong">Activation Mail Send To Your Email "{{authUser.email}}".</h3>
                <h3 class="strong">Please Check Your Email.</h3>
                <button type="button" class="btn-common mt-4" @click="resend">Resend Verification Mail</button>
            </div>
        </transition>
    </div>
    <div v-else>
        <div class="active-accouunt mt-5">
            <client-only>
                <icon :icon="['far', 'check-circle']"></icon>
            </client-only>
            <h3 class="strong">Your Account Activated.</h3>
        </div>
    </div>
</div>
</template>

<script>
export default {
    head() {
        return {
            title: (this.authCheck ? "Active Account - " : "Not found - ") + this.appName,
            link: [{rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            loading: true,
        }
    },

    methods: {
        // Send Verification Mail
        sendVerificationMail() {
            this.$axios.post("send-verification-mail").then(
                (response) => {
                    this.loading = false;
                    $nuxt.$emit("success", "Verification mail send successfully");
                },
                (error) => {
                    $nuxt.$emit("error", error);
                },
            )
        },

        // Resend Verification Mail
        resend() {
            if (this.click) {
                this.click = false;
                this.loading = true;
                this.$axios.post("send-verification-mail").then(
                    (response) => {
                        this.click = true;
                        this.loading = false;
                        $nuxt.$emit("success", "Verification mail send successfully");
                    },
                    (error) => {
                        this.click = true;
                        this.loading = false;
                        $nuxt.$emit("error", error);
                    },
                )
            }
        },
    },

    computed: {
        authUser() {
            return this.$store.getters.auth_user;
        }
    },

    created() {
        if (this.authCheck) {
            if (this.$store.getters.auth_user.email_verified_at == null) {
                this.sendVerificationMail();
            }
        } else {
            this.$router.push("/login");
        }
    },
}
</script>
