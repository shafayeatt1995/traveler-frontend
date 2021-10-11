<template>
<div class="container dashboard-container mt-5" v-if="adminOrGuide">
    <div class="row">
        <div class="col-lg-3">
            <Sidebar />
        </div>
        <div class="col-lg-9">
            <div class="dashboard-content">
                <div class="dashboard-content-header">
                    <button type="button" class="btn add-btn" @click="newModal">Add New Post</button>
                    <h3 class="strong">Blog Post</h3>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr class="text-center">
                                <th>ID</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="empty">
                            <tr>
                                <th colspan="5">
                                    <Empty message="No Post Found" />
                                </th>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center" v-for="post in posts.data" :key="post.id">
                                <th class="align-middle text-center">{{post.id}}</th>
                                <td class="align-middle">
                                    <nuxt-link :to="{name: 'post-slug', params: {slug: post.slug}}">
                                        <img :data-src="assetURL + post.thumbnail" :alt="post.title" class="img-fluid mh-200 mw-200" v-lazy-load />
                                    </nuxt-link>
                                </td>
                                <td class="align-middle">
                                    <nuxt-link :to="{name: 'post-slug', params: {slug: post.slug}}" class="color-black">{{post.title}}</nuxt-link>
                                </td>
                                <td class="align-middle">
                                    <span class="badge" :class="post.status ? 'bg-success' : 'bg-danger'">{{post.status ? 'Available' : 'Hidden'}}</span>
                                </td>
                                <td class="align-middle">{{post.created_at | date}}</td>
                                <td class="align-middle">
                                    <button type="button" class="btn btn-primary mb-2" @click="editPost(post)">
                                        <client-only>
                                            <icon icon="edit"></icon>
                                        </client-only>
                                    </button>
                                    <button type="button" class="btn btn-danger mb-2" @click="deletePost(post.id)">
                                        <client-only>
                                            <icon icon="trash-alt"></icon>
                                        </client-only>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <pagination :data="posts" @pagination-change-page="getResults" class="justify-content-center mt-3 paginate"></pagination>
            </div>
        </div>
    </div>
    <!-- Modal Start -->
    <div class="modal fade" id="modal" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <form class="modal-content" @submit.prevent="editMode ? updatePost() : addPost()">
                <div class="modal-header">
                    <h5 class="modal-title" v-if="editMode">Edit Post</h5>
                    <h5 class="modal-title" v-else>Add New Post</h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="dashboard-thumbnail my-2">
                        <img :data-src="form.image" class="img-fluid pointer" v-lazy-load />
                        <label for="thumbnail" class="pointer"> Select an Image</label>
                        <input type="file" accept="image/*" class="d-none" id="thumbnail" @change="image($event)">
                    </div>
                    <div class="form-group">
                        <label for="category">Select A Category</label>
                        <select class="form-control" id="category" v-model="form.category_id" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'" placeholder="Select A Category">
                            <option value="">Select A Category</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="title">Blog Post Title</label>
                        <input type="text" class="form-control" id="title" v-model="form.title">
                    </div>
                    <div class="form-group">
                        <label for="body">Blog Post Body</label>
                        <client-only>
                            <VueEditor id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="form.post" />
                        </client-only>
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="status" v-model="form.status">
                        <label class="form-check-label" for="status">Post Show</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" v-if="editMode">Edit Post</button>
                    <button type="submit" class="btn btn-primary" v-else>Create New Post</button>
                </div>
            </form>
        </div>
    </div>
    <!-- Modal End -->
</div>
</template>

<script>
import axios from "axios";
export default {
    head() {
        return {
            title: "Blog - Dashboard",
            link: [{ rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            posts: {},
            categories: [],
            editMode: false,
            empty: false,
            form: {
                id: "",
                category_id: "",
                title: "",
                image: "",
                post: "",
                status: true,
            },
            editorConfig: {},
        }
    },

    methods: {
        // Open New Modal
        newModal() {
            this.editMode = false;
            this.form.id = "";
            this.form.category_id = "";
            this.form.title = "";
            this.form.image = "";
            this.form.post = "";
            this.form.status = true;
            $("#modal").modal("show");
        },

        //Get All Post
        getPost() {
            this.$axios.get("post").then(
                (response) => {
                    this.empty = response.data.posts.data.length > 0 ? false : true;
                    this.posts = response.data.posts;
                    this.categories = response.data.categories;
                },
                (error) => {
                    $nuxt.$emit("error", error);
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("post?page=" + page).then(
                (response) => {
                    this.posts = response.data.posts;
                });
        },

        // Create New Post
        addPost() {
            if (this.click) {
                this.click = false;
                this.$axios.post("create-post", this.form).then(
                    () => {
                        $("#modal").modal("hide");
                        this.form.id = "";
                        this.form.category_id = "";
                        this.form.title = "";
                        this.form.image = "";
                        this.form.post = "";
                        this.form.status = true;
                        $nuxt.$emit("triggerPost");
                        $nuxt.$emit("success", "Post Created Successfully");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    }
                )
            }
        },

        // Edit Post
        editPost(post) {
            this.editMode = true;
            this.form.id = post.id;
            this.form.category_id = post.category_id;
            this.form.title = post.title;
            this.form.image = this.assetURL + post.image;
            this.form.post = post.post;
            this.form.status = post.status;
            $("#modal").modal("show");
        },

        // Update Post
        updatePost() {
            if (this.click) {
                this.click = false;
                this.$axios.post("update-post/" + this.form.id, this.form).then(
                    () => {
                        $("#modal").modal("hide");
                        this.form.id = "";
                        this.form.category_id = "";
                        this.form.title = "";
                        this.form.image = "";
                        this.form.post = "";
                        this.form.status = true;
                        $nuxt.$emit("triggerPost");
                        $nuxt.$emit("success", "Post Updated Successfully");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    }
                )
            }
        },

        // Delete Post
        deletePost(id) {
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
                        this.$axios.post("delete-post/" + id).then(
                            () => {
                                Swal.fire(
                                    "Deleted!",
                                    "Post has been deleted.",
                                    "success"
                                )
                                $nuxt.$emit("triggerPost");
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

        // Add Package Image
        image(event) {
            if (event.target.files.length > 0) {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.form.image = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },

        // Editor Custom Image Setup
        handleImageAdded(file, Editor, cursorLocation) {
            if (this.imgurStatus) {
                $nuxt.$emit("info", "Image Uploading");
                var formData = new FormData();
                formData.append("image", file);
                axios({
                        url: "https://api.imgur.com/3/image",
                        method: "POST",
                        headers: { "Authorization": "Client-ID " + this.imgur },
                        data: formData
                    })
                    .then((result) => {
                            let url = result.data.data.link
                            Editor.insertEmbed(cursorLocation, "image", url);
                            $nuxt.$emit("success", "Image Successfully Uploaded");
                        },
                        (error) => {
                            $nuxt.$emit("customError", "Image Upload Failed");
                        });
            } else {
                $nuxt.$emit("customError", "Image Upload Disable By Admin");
            }
        },
    },

    created() {
        if (this.adminOrGuide) {
            this.getPost();
            this.$nuxt.$on("triggerPost", () => {
                this.getPost();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>
