<template>
    <div class="text-center">
        <img :src="assetURL+'images/empty.svg'"  :alt="message" class="img-fluid h-350 w-auto"/>
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