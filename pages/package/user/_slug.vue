<template>
    <div v-if="packages !== null">
        <Breadcrumb :message="'Tour Packages of ' + packUser.name"/>
        <!-- ===============  Blog wrapper area start =============== -->
        <div class="blog-wrapper pt-90">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="row" v-if="packages.data.length > 0">
                            <div class="col-lg-6" v-for="pack in packages.data" :key="pack.id">
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
                    <div class="col-lg-4">
                        <div class="package-sidebar pt-30">
                            <div class="sidebar-searchbox">
                                <div class="input-group search-box">
                                    <input type="text" class="form-control" placeholder="Search Blog Post..." v-model="search">
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
                                    <div class="right-sidebar-categorie mt-40">
                                        <h5 class="categorie-head">Categories</h5>
                                        <ul>
                                            <li v-for="(category, key) in categories" :key="key">
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
                                    <div class="package-popular mt-40">
                                        <h5 class="categorie-head">Popular Post</h5>
                                        <ul>
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
import axios from "axios"
export default {
    head() {
        return {
            title: (this.packUser == null ? "Not Found - " : this.packUser.name + " Packages - ") + this.appName,
        };
    },

    data() {
        return {
            search: "",
            packUser: {},
            packages: {},
            categories: [],
            popular: [],
        }
    },
    

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "user-packages/" + context.params.slug);
        return {
            packUser: response.data.user,
            packages: response.data.packages,
            categories: response.data.categories,
            popular: response.data.popular,
        }
    },

    methods: {
        // Get Pagination Post
        getResults(page = 1) {
            this.$axios.get("user-packages/" + this.$route.params.slug + "?page=" + page).then(
                (response) => {
                    this.packages = response.data.packages;
                });
        },
    },
}
</script>