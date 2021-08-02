<template>
    <div>
        <h1>This is Home Page</h1>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: "Home - " + process.env.appName,
        };
    },
};
</script>
