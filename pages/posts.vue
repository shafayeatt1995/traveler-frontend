<template>
    <div v-if="posts !== null">
        <Breadcrumb message="All Blog Posts"/>
        <!-- ===============  Blog wrapper area start =============== -->
        <div class="blog-wrapper pt-60">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="row">
                            <div class="col-lg-6" v-for="post in posts.data" :key="post.id">
                                <Post :post="post"/>
                            </div>
                            <pagination :data="posts" @pagination-change-page="getResults" class="justify-content-center mt-3 f-pagination"></pagination>
                            <Empty message="No Blog Post Found" v-if="posts.data.length < 1"/>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="blog-sidebar pt-30">
                            <div class="sidebar-searchbox">
                                <div class="input-group search-box">
                                    <input type="text" class="form-control" placeholder="Search Blog Post..." v-model="search">
                                    <button type="button" v-if="search == ''">
                                        <client-only>
                                            <icon icon="paper-plane"></icon>
                                        </client-only>
                                    </button>
                                    <nuxt-link :to="{name: 'search-post-keyword', params: {keyword: search}}" v-else>
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
                                                <nuxt-link :to="{name: 'post-category-slug', params: {slug: category.slug}}">
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
                                    <div class="blog-popular mt-40">
                                        <h5 class="categorie-head">Popular Post</h5>
                                        <ul>
                                            <Sidebar-post :post="post" v-for="post in popular" :key="post.id"></Sidebar-post>
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
    <Error v-else/>
</template>
<script>
import axios from "axios";
export default {
    head() {
        return {
            title: "All Posts - " + this.appName,
            link: [{rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            search: "",
            posts: {},
            categories: [],
            popular: [],
        }
    },
    

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "blog-posts");
        return {
            posts: response.data.posts,
            categories: response.data.categories,
            popular: response.data.popular,
        }
    },

    methods: {
        // Get Pagination Post
        getResults(page = 1) {
            this.$axios.get("blog-posts?page=" + page).then(
                (response) => {
                    this.posts = response.data.posts;
                });
        },
    },
}
</script>