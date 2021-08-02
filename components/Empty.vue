<template>
    <div class="text-center">
        <img :src="url+'images/empty.svg'"  :alt="message" class="img-fluid h-350 w-auto"/>
        <h4>{{message}}</h4>
    </div>
</template>
<script>
export default {
    props: {
        message: "",
    },

    computed: {
        // Get Backend URL
        url() {
            return process.env.assetURL;
        },
    },
}
</script>