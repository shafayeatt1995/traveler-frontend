<template>
    <div class="container" v-if="authCheck">
        <div class="row">
            <div class="col-lg-3">
                <Sidebar />
            </div>
            <div class="col-lg-9">
                <h1>Dashboard Component</h1>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: "Dashboard - " + process.env.appName,
        };
    },

    data() {
        return {};
    },

    created() {
        if (!this.authCheck) {
            this.$router.push("/login");
        }
    },
};
</script>