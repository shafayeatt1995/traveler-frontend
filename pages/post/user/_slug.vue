<template>
    <div v-if="posts !== null">
        <!-- ===============  breadcrumb area start =============== -->
        <div class="breadcrumb-area" :style="'background: linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5) 100%), url(' + assetURL + 'images/breadcrumb.jpg)'">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="breadcrumb-wrap">
                            <h2>{{postUser.name}} Posts</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===============  breadcrumb area end =============== -->
        
        <!-- ===============  Blog wrapper area start =============== -->
        <div class="blog-wrapper pt-90">
            <div class="container">
                <div class="row" v-if="posts.data.length > 0">
                    <div class="col-lg-4 col-md-6 col-sm-6" v-for="post in posts.data" :key="post.id">
                        <Post :post="post"/>
                    </div>
                </div>
                <div class="row" v-else>
                    <Empty message="No Blog Post Found"/>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                    <pagination :data="posts" @pagination-change-page="getResults" class="justify-content-center mt-3 f-pagination"></pagination>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===============  Blog wrapper area end =============== -->
    </div>
    <Error v-else/>
</template>
<script>
import axios from "axios"
export default {
    head() {
        return {
            title: (this.postUser == null ? "Not Found - " : this.postUser.name + " Posts - ") + this.appName,
        };
    },

    data() {
        return {
            posts: {},
            postUser: {},
        }
    },
    

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "user-blog/" + context.params.slug);
        return {
            posts: response.data.posts,
            postUser: response.data.user,
        }
    },

    methods: {
        // Get Pagination Post
        getResults(page = 1) {
            this.$axios.get("user-blog/" + this.$route.params.slug + "?page=" + page).then(
                (response) => {
                    this.posts = response.data.posts;
                });
        },
    },
}
</script>