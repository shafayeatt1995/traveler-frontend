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
            Toast.fire({toaster:true, icon: "error", title: error });
        });

        //Trigger Info Toast Message
        this.$nuxt.$on("info", info => {
            Toast.fire({ icon: "info", title: info });
        });
    },
};
</script>