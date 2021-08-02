<template>
    <div class="dashboard-sidebar">
        <h3 class="text-center">Menu</h3>
        <ul>
            <li><nuxt-link to="/dashboard" class="strong">Dashboard</nuxt-link></li>
            <li v-if="admin"><nuxt-link to="/dashboard/category" class="strong">Category</nuxt-link></li>
            <li v-if="admin"><nuxt-link to="/dashboard/tour-package" class="strong">Tour Package</nuxt-link></li>
        </ul>
    </div>
</template>
<script>
export default {
    
}
</script>