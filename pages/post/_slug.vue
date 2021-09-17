<template>
<!-- ===============  Blog wrapper area start =============== -->
<Error v-if="post == null" />
<div class="blog-details-wrapper pt-40" v-else>
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <div class="blog-details">
                    <div class="blog-title-xl mb-2">
                        <h3 class="strong">{{post.title}}</h3>
                        <div class="blog-info-xl">
                            <nuxt-link class="blog-writer strong" :to="{name: 'post-user-slug', params: {slug: post.user.slug}}">
                                <client-only>
                                    <icon :icon="['far', 'user']" class="mr-2"></icon>
                                </client-only>
                                {{post.user.name}}
                            </nuxt-link>
                            <nuxt-link :to="{name: 'post-category-slug', params: {slug: post.category.slug}}" class="blog-category strong">{{post.category.name}}</nuxt-link>
                        </div>
                    </div>
                    <div class="blog-img-xl">
                        <img :data-src="assetURL + post.image" :alt="post.title" class="img-fluid" v-lazy-load />
                        <div class="blog-date">
                            <client-only>
                                <icon icon="calendar-alt"></icon>
                            </client-only>
                            <span class="ml-2">
                                {{post.created_at | normalDate}}
                            </span>
                        </div>
                    </div>
                    <div class="blog-texts mt-30 ql-editor" v-html="post.post"></div>
                    <div class="blog-bottom">
                        <hr>
                        <div class="blog-social text-center">
                            <ul>
                                <li>
                                    <a @click.prevent="socialLink('facebook')" class="pointer">
                                        <client-only>
                                            <icon :icon="['fab', 'facebook']"></icon>
                                        </client-only>
                                    </a>
                                    <a @click.prevent="socialLink('twitter')" class="pointer">
                                        <client-only>
                                            <icon :icon="['fab', 'twitter']"></icon>
                                        </client-only>
                                    </a>
                                    <a @click.prevent="socialLink('pinterest')" class="pointer">
                                        <client-only>
                                            <icon :icon="['fab', 'pinterest']"></icon>
                                        </client-only>
                                    </a>
                                    <a @click.prevent="socialLink('linkedin')" class="pointer">
                                        <client-only>
                                            <icon :icon="['fab', 'linkedin']"></icon>
                                        </client-only>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <hr>
                    </div>

                    <div class="blog-comments">
                        <h5>{{post.comments_count}} {{post.comments_count > 1 ? 'Comments' : 'Comment'}}</h5>
                        <ul v-if="comments.data.length > 0">
                            <li v-for="comment in comments.data" :key="comment.id">
                                <div class="commentor">
                                    <div class="commentotor-img text-center">
                                        <img :data-src="assetURL + comment.user.image" class="mh-100-px" :alt="comment.user.name" v-lazy-load />
                                    </div>
                                    <div class="commentor-id">
                                        <strong>{{comment.user.name}}
                                            <span class="pointer text-danger small ml-2 d-none" v-if="userId == comment.user.id" @click="deleteComment(comment.id)">
                                                <client-only>
                                                    <icon icon="trash-alt"></icon>
                                                </client-only>
                                            </span>
                                        </strong>
                                        <p>{{comment.created_at | date}}</p>
                                        <p class="comment text-justify">
                                            {{bigComment == comment.id ? comment.message : comment.message.substring(0, 200)}}
                                            <span class="strong pointer" @click="bigComment = bigComment == comment.id ? '' : comment.id">{{comment.message.length > 200 ? bigComment == comment.id ? '...Less More' : '...See More' : ''}}</span></p>
                                        <span class="reply-icon pointer" @click="replayForm(comment.id)">
                                            <client-only>
                                                <icon icon="reply"></icon>
                                            </client-only>
                                            reply
                                        </span>
                                        <transition name="slide" mode="out-in">
                                            <form v-if="replay.comment_id == comment.id" @submit.prevent="submitReplay">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" placeholder="Type your message" v-model="replay.message">
                                                </div>
                                                <div class="d-block text-end">
                                                    <button class="btn btn-danger" type="button" @click="replayForm(comment.id)">Close</button>
                                                    <button class="btn btn-primary" type="submit">Submit</button>
                                                </div>
                                            </form>
                                        </transition>
                                    </div>
                                </div>
                                <div class="replay mt-3" v-for="replay in comment.replays" :key="replay.id">
                                    <div class="commentor">
                                        <div class="commentotor-img text-center">
                                            <img :data-src="assetURL + replay.user.image" class="mh-100-px" :alt="replay.user.name" v-lazy-load />
                                        </div>
                                        <div class="commentor-id">
                                            <strong>{{replay.user.name}}
                                                <span class="pointer text-danger small ml-2 d-none" v-if="userId == replay.user.id" @click="deleteReplay(replay.id)">
                                                    <client-only>
                                                        <icon icon="trash-alt"></icon>
                                                    </client-only>
                                                </span>
                                            </strong>
                                            <p>{{replay.created_at | date}}</p>
                                            <p class="comment text-justify">
                                                {{bigReplay == replay.id ? replay.message : replay.message.substring(0, 200)}}
                                                <span class="strong pointer" @click="bigReplay = bigReplay == replay.id ? '' : replay.id">{{replay.message.length > 200 ? bigReplay == replay.id ? '...Less More' : '...See More' : ''}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                            </li>
                            <pagination :data="comments" @pagination-change-page="getResults" class="justify-content-center mt-3 f-pagination"></pagination>
                        </ul>
                        <ul v-else>
                            <h2 class="mt-5 text-center">No Comments Found</h2>
                        </ul>
                    </div>
                    <div class="blog-reply">
                        <h2 v-if="!authCheck" class="text-center">Please <nuxt-link :to="{name: 'login'}" class="text-success">Login</nuxt-link> or <nuxt-link :to="{name: 'register'}" class="text-success">Register</nuxt-link> for post Your Comment</h2>
                        <form @submit.prevent="submiitComment" v-else>
                            <h5>Post Your Comment</h5>
                            <div class="row">
                                <div class="col-lg-12">
                                    <textarea class="form-control" cols="30" rows="7" placeholder="Write Message" v-model="comment.message"></textarea>
                                </div>
                                <div class="col-lg-12">
                                    <input type="submit" value="Submit Comment" class="float-end">
                                </div>
                            </div>
                        </form>
                    </div>

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
                                    <Sidebar-post :post="post" v-for="post in posts" :key="post.id"></Sidebar-post>
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
</template>

<script>
import axios from "axios"
export default {
    head() {
        return {
            title: (this.post == null ? "Not Found" : this.post.title) + " - " + this.appName,
        };
    },

    data() {
        return {
            click: true,
            search: "",
            post: {},
            posts: [],
            categories: [],
            comments: {},
            comment: {
                blog_id: "",
                message: "",
            },
            replay: {
                blog_id: "",
                comment_id: "",
                message: "",
            },
            bigComment: "",
            bigReplay: "",
        }
    },

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "blog/" + context.params.slug);
        return {
            click: true,
            search: "",
            post: response.data.post,
            comments: response.data.comments,
            posts: response.data.posts,
            categories: response.data.categories,
            comment: {
                blog_id: response.data.post.id,
                message: "",
            },
            replay: {
                blog_id: response.data.post.id,
                comment_id: "",
                message: "",
            },
            bigComment: "",
            bigReplay: "",
        }
    },

    methods: {
        // Get Post Information
        getComments() {
            this.$axios.get("blog/" + this.$route.params.slug).then(
                (response) => {
                    this.comments = response.data.comments;
                },
                (error) => {
                    $nuxt.$emit("error", error);
                },
            )
        },
        getResults(page = 1) {
            this.$axios.get("comment/" + this.post.id + "?page=" + page).then(
                (response) => {
                    this.comments = response.data.comments;
                });
        },

        // Social Media Share Link
        socialLink(social) {
            if (social == "facebook") {
                window.open("https://www.facebook.com/share.php?u=" + window.location.origin + this.$route.path, "_blank");
            } else if (social == "twitter") {
                window.open("http://twitter.com/share?url=" + window.location.origin + this.$route.path, "_blank");
            } else if (social == "pinterest") {
                window.open("http://pinterest.com/pin/create/button/?url=" + window.location.origin + this.$route.path, "_blank");
            } else if (social == "linkedin") {
                window.open("http://www.linkedin.com/shareArticle?url=" + window.location.origin + this.$route.path, "_blank");
            }
        },

        // Submit Comment
        submiitComment() {
            if (this.click) {
                this.click = false;
                this.$axios.post("create-comment", this.comment).then(
                    (response) => {
                        this.comment.message = "";
                        $nuxt.$emit("success", "Comment Post Successfully");
                        $nuxt.$emit("triggercomment");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        //Delete Comment
        deleteComment(id) {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false;
                        this.$axios.post("delete-comment/" + id).then(
                            () => {
                                Swal.fire(
                                    "Deleted!",
                                    "Comment has been deleted.",
                                    "success"
                                )
                                $nuxt.$emit("triggercomment");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("error", error);
                                this.click = true;
                            }
                        )
                    }
                }
            })
        },

        // Replay Form
        replayForm(id) {
            this.replay.message = "";
            this.replay.comment_id = this.replay.comment_id == id ? "" : id;
        },

        // Submit Replay
        submitReplay() {
            if (this.click) {
                this.click = false;
                this.$axios.post("create-comment-replay", this.replay).then(
                    (response) => {
                        this.replay.comment_id = "";
                        this.replay.message = "";
                        $nuxt.$emit("success", "Replay Post Successfully");
                        $nuxt.$emit("triggercomment");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        //Delete Replay
        deleteReplay(id) {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false;
                        this.$axios.post("delete-comment-replay/" + id).then(
                            () => {
                                Swal.fire(
                                    "Deleted!",
                                    "Replay has been deleted.",
                                    "success"
                                )
                                $nuxt.$emit("triggercomment");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("error", error);
                                this.click = true;
                            }
                        )
                    }
                }
            })
        },

        incrementView() {
            if (process.client) {
                let find = window.localStorage.getItem(btoa('blog' + this.post.id));
                if (!find) {
                    localStorage.setItem(btoa('blog' + this.post.id), Math.random());
                    this.$axios.post("increment-blog/" + this.post.id);
                }
            }
        },
    },

    created() {
        this.$nuxt.$on("triggercomment", () => {
            this.getComments();
        });

        setTimeout(() => { this.incrementView(); }, 10000);
    },
}
</script>
