<template>
    <div>
        <Header />
        <Nuxt />
        <Footer />
    </div>
</template>

<script>
export default {
    transition: {
        name: "home",
        mode: "out-in",
    },

    created() {
        this.$nuxt.$on("success", success => {
            Toast.fire({ icon: "success", title: success });
        });

        this.$nuxt.$on("error", error => {
            Toast.fire({toaster:true, icon: "error", title: error });
        });

        this.$nuxt.$on("info", info => {
            Toast.fire({ icon: "info", title: info });
        });
    },
};
</script>