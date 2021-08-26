<template>
    <div class="container dashboard-container mt-5" v-if="authCheck">
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
            title: "Dashboard - " + this.appName,
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