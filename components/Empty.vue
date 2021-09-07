<template>
    <div class="text-center">
        <img :data-src="assetURL+'images/empty.svg'"  :alt="message" class="img-fluid h-350 w-auto" v-lazy-load/>
        <h4>{{message}}</h4>
    </div>
</template>
<script>
export default {
    props: {
        message: "",
    },
}
</script>