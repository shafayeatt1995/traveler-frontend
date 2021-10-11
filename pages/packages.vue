<template>
    <div v-if="packages !== null">
        <Breadcrumb message="All Tour Packages"/>
        <!-- ===============  Blog wrapper area start =============== -->
        <div class="blog-wrapper pt-90">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="row" v-if="packages.data.length > 0">
                            <div class="col-lg-6" v-for="pack in packages.data" :key="pack.id">
                                <Package :pack="pack"/>
                            </div>
                            <pagination :data="packages" @pagination-change-page="getResults" class="justify-content-center mt-3 f-pagination"></pagination>
                        </div>
                        <div class="row" v-else>
                            <Empty message="No Tour Package Found"/>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="package-sidebar">
                            <div class="sidebar-searchbox">
                                <div class="input-group search-box">
                                    <input type="text" class="form-control" placeholder="Search Package..." v-model="search">
                                    <button type="button" v-if="search == ''">
                                        <client-only>
                                            <icon icon="paper-plane"></icon>
                                        </client-only>
                                    </button>
                                    <nuxt-link :to="{name: 'search-package-keyword', params: {keyword: search}}" v-else>
                                        <client-only>
                                            <icon icon="paper-plane"></icon>
                                        </client-only>
                                    </nuxt-link>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="right-sidebar-categorie">
                                        <h5 class="categorie-head">Categories</h5>
                                        <ul>
                                            <li v-for="category in categories" :key="category.id">
                                                <nuxt-link :to="{name: 'package-category-slug', params: {slug: category.slug}}">
                                                    <client-only>
                                                        <icon icon="angle-double-right"></icon>
                                                    </client-only>
                                                    <span class="ml-2">
                                                        {{category.name}}
                                                    </span>
                                                </nuxt-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="col-lg-12">
                                    <div class="p-sidebar-cards mt-40">
                                        <h5 class="package-d-head">Popular Packages</h5>
                                        <ul class="package-cards">
                                            <Sidebar-package :pack="pack" v-for="pack in popular" :key="pack.id"></Sidebar-package>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===============  Blog wrapper area end =============== -->
    </div>
    <Empty message="No Package Found" v-else/>
</template>
<script>
import axios from "axios";
export default {
    head() {
        return {
            title: "All Packages - " + this.appName,
            link: [{rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            search: "",
            packages: {},
            popular: [],
            categories: [],
        }
    },
    

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "packages");
        return {
            search: "",
            packages: response.data.packages,
            popular: response.data.popular,
            categories: response.data.categories,
        }
    },

    methods: {
        // Get Pagination Post
        getResults(page = 1) {
            this.$axios.get("packages?page=" + page).then(
                (response) => {
                    this.packages = response.data.packages;
                });
        },
    },
}
</script>