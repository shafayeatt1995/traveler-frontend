<template>
    <div v-if="!authCheck">
        <h1>This is Register Page</h1>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: "Register - " + process.env.appName,
        };
    },
    data() {
        return {};
    },

    created() {
        if (this.authCheck) {
            this.$router.push("/dashboard");
        }
    },
};
</script>