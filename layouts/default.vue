<template>
<div>
    <Header />
    <Nuxt />
    <Footer />
</div>
</template>

<script>
export default {
    methods: {
        // For Tracking Scroll
        display() {
            if (process.client) {
                let width = window.innerWidth;
                this.$store.dispatch('triggerDisplay', width);
            }
        },
    },

    created() {
        // Get Wishlist
        this.$store.dispatch('triggerWishlist');

        // For Tracking Scroll
        this.display();

        //Trigger Success Toast Message
        this.$nuxt.$on("success", success => {
            Toast.fire({ icon: "success", title: success });
        });

        //Trigger Error Toast Message
        this.$nuxt.$on("error", error => {
            Toast.fire({ icon: "error", title: error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : error.response.data.error ? error.response.data.error : "Something Wrong! Please try Again" });
        });

        //Trigger Error Toast Message
        this.$nuxt.$on("customError", error => {
            Toast.fire({ icon: "error", title: error });
        });

        //Trigger Info Toast Message
        this.$nuxt.$on("info", info => {
            Toast.fire({ icon: "info", title: info });
        });
    },
};
</script>
