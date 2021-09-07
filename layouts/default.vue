<template>
    <div>
        <Header />
        <Nuxt />
        <Footer />
    </div>
</template>

<script>
export default {
    created() {
        //Trigger Success Toast Message
        this.$nuxt.$on("success", success => {
            Toast.fire({ icon: "success", title: success });
        });

        //Trigger Error Toast Message
        this.$nuxt.$on("error", error => {
            Toast.fire({icon: "error", title: error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : error.response.data.error ? error.response.data.error : "Something Wrong! Please try Again" });
        });

        //Trigger Error Toast Message
        this.$nuxt.$on("customError", error => {
            Toast.fire({icon: "error", title: error});
        });

        //Trigger Info Toast Message
        this.$nuxt.$on("info", info => {
            Toast.fire({ icon: "info", title: info });
        });
    },
};
</script>