<template>
<div class="container" v-if="authCheck">
    <transition name="fade" mode="out-in">
        <div class="active-accouunt mt-5 text-center" key="1" v-if="status == 'sendMail'">
            <Loading-circle />
            <h3 class="strong mt-5">Please Wait. We Are Sending Verification Mail.</h3>
        </div>
        <div class="active-accouunt mt-5 text-center" key="2" v-else-if="status == 'sendMailSuccess'">
            <client-only>
                <icon :icon="['far', 'check-circle']"></icon>
            </client-only>
            <h3 class="strong">Activation Mail Send To Your Email "{{authUser.email}}".</h3>
            <h3 class="strong">Please Check Your Email.</h3>
            <button type="button" class="btn-common mt-4" @click="resend">Resend Verification Mail</button>
        </div>
        <div class="active-accouunt mt-5 text-center" key="3" v-else-if="status == 'verify'">
            <Loading-circle />
            <h3 class="strong mt-5">We Are Verifying Your Account.</h3>
        </div>
        <div class="active-accouunt mt-5 text-center" key="4" v-else-if="status == 'fail'">
            <client-only>
                <icon icon="times" class="text-danger"></icon>
            </client-only>
            <h3 class="strong">We Can't Verify Your Account. Verification Code Not Matched.</h3>
            <button type="button" class="btn-common mt-4" @click="resend">Resend Verification Mail</button>
        </div>
    </transition>
</div>

<div class="container mt-5" v-else>
    <h3 class="text-center">Please <nuxt-link :to="{name: 'login'}" class="text-primary">Login</nuxt-link> For Active Your Account</h3>
</div>
</template>

<script>
export default {
    head() {
        return {
            title: "Active Account - " + this.appName,
        };
    },

    data() {
        return {
            click: true,
            status: "verify",
        }
    },

    methods: {
        // Verify Account
        verification() {
            this.$axios.post("verification/" + this.$route.params.token).then(
                (response) => {
                    this.$auth.fetchUser();
                    setTimeout(() => { this.$router.push("/active-account") }, 2000);
                },
                (error) => {
                    this.status = "fail"
                    $nuxt.$emit("error", error);
                },
            )
        },

        // Resend Verification Mail
        resend() {
            if (this.click) {
                this.click = false;
                this.status = "sendMail";
                this.$axios.post("send-verification-mail").then(
                    (response) => {
                        this.click = true;
                        this.status = "sendMailSuccess";
                        $nuxt.$emit("success", "Verification mail send successfully");
                    },
                    (error) => {
                        this.click = true;
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
            this.verification()
        }
    },
}
</script>
