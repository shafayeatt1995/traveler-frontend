<template>
<div v-if="packages !== null">
    <Breadcrumb :message="'Package Search Result for ' + title" />
    <!-- ===============  Blog wrapper area start =============== -->
    <div class="blog-wrapper pt-90">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row" v-if="packages.data.length > 0">
                        <div class="col-lg-6" v-for="pack in packages.data" :key="pack.id">
                            <Package :pack="pack" />
                        </div>
                    </div>
                    <div class="row" v-else>
                        <Empty message="No Tour Package Found" />
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
                                <input type="text" class="form-control" placeholder="Search Blog Post..." v-model="search.keyword">
                                <button type="button" v-if="search.keyword == ''">
                                    <client-only>
                                        <icon icon="paper-plane"></icon>
                                    </client-only>
                                </button>
                                <nuxt-link :to="{name: 'search-package-keyword', params: {keyword: search.keyword}}" v-else>
                                    <client-only>
                                        <icon icon="paper-plane"></icon>
                                    </client-only>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="filter mt-40">
                            <h3 class="strong">Filter</h3>
                            <p class="strong mt-3">Package Price</p>
                            <div class="filter-price d-flex align-items-center">
                                <div class="form-group">
                                    <input type="number" class="form-control" placeholder="Min Price" v-model="search.minPrice">
                                </div>
                                <p class="mx-2">-</p>
                                <div class="form-group">
                                    <input type="number" class="form-control" placeholder="Max Price" v-model="search.maxPrice">
                                </div>
                            </div>
                            <p class="strong mt-3">Categories</p>
                            <div class="form-group form-check" v-for="category in searchCategory" :key="category.id">
                                <input type="checkbox" class="form-check-input pointer" :id="'category' + category.id" @change="applyFilter" :value="category.id" v-model="search.categories">
                                <label class="form-check-label pointer" :for="'category' + category.id">{{category.name}}</label>
                            </div>
                            <p class="strong mt-3">Tour Duration</p>
                            <div class="form-group form-check" v-for="(duration, key) in searchDuration" :key="'duration' + key">
                                <input type="checkbox" class="form-check-input pointer" :id="'duration' + key" @change="applyFilter" :value="duration" v-model="search.durations">
                                <label class="form-check-label pointer" :for="'duration' + key">{{duration}} {{duration > 1 ? 'Days' : 'day'}}</label>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn-common-sm" @click="applyFilter">Apply Filter</button>
                            </div>
                        </div>
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
    <!-- ===============  Blog wrapper area end =============== -->
</div>
<Empty message="No Package Found" v-else />
</template>

<script>
import axios from "axios"
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    components: { DatePicker },
    head() {
        return {
            title: this.title + " Search Package - " + this.appName,
            link: [{rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            title: "",
            search: {
                keyword: "",
                minPrice: "",
                maxPrice: "",
                categories: [],
                durations: [],
            },
            searchCategory: [],
            searchDuration: [],
            packages: {},
            categories: [],
            popular: [],
        }
    },

    async asyncData(context) {
        let response = await axios.post(context.env.baseURL + "search-package", { keyword: context.params.keyword })
        let categoryList = [];
        let getSearchDuration = [];
        response.data.packages.data.filter((pack) => categoryList.some((list) => list.id == pack.category_id) ? "" : categoryList.push(pack.category));
        response.data.packages.data.filter((pack) => getSearchDuration.some((duration) => duration == pack.duration_day) ? "" : getSearchDuration.push(pack.duration_day));
        return {
            title: context.params.keyword,
            search: {
                keyword: context.params.keyword,
                minPrice: "",
                maxPrice: "",
                date: "",
                categories: [],
                durations: [],
            },
            searchCategory: categoryList,
            searchDuration: getSearchDuration,
            packages: response.data.packages,
            categories: response.data.categories,
            popular: response.data.popular,
        }
    },

    methods: {
        // Get Pagination Post
        getSearchPackage() {
            this.$axios.post("search-package", this.search).then(
                (response) => {
                    this.packages = response.data.packages;
                },
                (error) => {
                    $nuxt.$emit("error", error);
                },
            )
        },
        getResults(page = 1) {
            this.$axios.get("search-package/" + this.$route.params.keyword + "?page=" + page, this.search).then(
                (response) => {
                    this.packages = response.data.packages;
                });
        },

        applyFilter() {
            $nuxt.$emit("triggerSearchPackage");
        },
    },

    created() {
        this.$nuxt.$on("triggerSearchPackage", () => {
            this.getSearchPackage();
        });
    },
}
</script>
