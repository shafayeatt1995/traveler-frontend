<template>
    <div v-if="packages !== null">
        <!-- ===============  breadcrumb area start =============== -->
        <div class="breadcrumb-area" :style="'background: linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5) 100%), url(' + assetURL + 'images/breadcrumb.jpg)'">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="breadcrumb-wrap">
                            <h2>Tour Packages of {{category.name}} Category</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===============  breadcrumb area end =============== -->
        
        <!-- ===============  Blog wrapper area start =============== -->
        <div class="blog-wrapper pt-90">
            <div class="container">
                <div class="row" v-if="packages.data.length > 0">
                    <div class="col-lg-4 col-md-6 col-sm-6" v-for="pack in packages.data" :key="pack.id">
                        <Package :pack="pack"/>
                    </div>
                </div>
                <div class="row" v-else>
                    <Empty message="No Tour Package Found"/>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                    <pagination :data="packages" @pagination-change-page="getResults" class="justify-content-center mt-3 f-pagination"></pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===============  Blog wrapper area end =============== -->
    </div>
    <Empty message="No Package Found" v-else/>
</template>
<script>
import axios from "axios"
export default {
    head() {
        return {
            title: (this.category == null ? "Not Found - " : this.category.name + " Packages - ") + this.appName,
        };
    },

    data() {
        return {
            packages: {},
            category: {},
        }
    },
    

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "category-packages/" + context.params.slug);
        return {
            packages: response.data.packages,
            category: response.data.category,
        }
    },

    methods: {
        // Get Pagination Post
        getResults(page = 1) {
            this.$axios.get("category-packages/" + this.$route.params.slug + "?page=" + page).then(
                (response) => {
                    this.packages = response.data.packages;
                });
        },
    },
}
</script>