<template>
    <div class="container dashboard-container mt-5" v-if="admin">
        <div class="row">
            <div class="col-lg-3">
                <Sidebar />
            </div>
            <div class="col-lg-9">
                <div class="dashboard-content">
                    <div class="dashboard-content-header">
                        <button type="button" class="btn add-btn" @click="newModal">Add New Page</button>
                        <h3 class="strong">Pages</h3>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr class="text-center">
                                    <th>Name</th>
                                    <th>Page Title</th>
                                    <th>Page Link</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="empty">
                                <tr>
                                    <th colspan="4">
                                        <Empty message="No Pages Found"/>
                                    </th>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="text-center" v-for="page in pages.data" :key="page.id">
                                    <th class="align-middle text-center">{{page.name}}</th>
                                    <td class="align-middle">{{page.name}}</td>
                                    <td class="align-middle">{{page.created_at | date}}</td>
                                    <td class="align-middle">
                                        <button type="button" class="btn btn-success" @click="editPage(page)">
                                            <client-only>
                                                <icon icon="edit"></icon>
                                            </client-only>
                                        </button>
                                        <button type="button" class="btn btn-danger" @click="deletePage(page.id)">
                                            <client-only>
                                                <icon icon="trash-alt"></icon>
                                            </client-only>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <pagination :data="pages" @pagination-change-page="getResults" class="justify-content-center mt-3 paginate"></pagination>
                </div>
            </div>
        </div>
        <!-- Modal Start -->
        <div class="modal fade" id="modal" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
            <div class="modal-dialog">
                <form class="modal-content" @submit.prevent="editMode ? updatePage() : addPage()">
                    <div class="modal-header">
                        <h5 class="modal-title" v-if="editMode">Edit Page</h5>
                        <h5 class="modal-title" v-else>Add New Page</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="Page">Page Title</label>
                            <input type="text" class="form-control" id="Page" v-model="form.name">
                        </div>
                        <div class="form-group">
                            <label for="Page">Page Title</label>
                            <client-only>
                                <ckeditor value="Hello, World!"></ckeditor>
                            </client-only>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success" v-if="editMode">Edit Page</button>
                        <button type="submit" class="btn btn-success" v-else>Add Page</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Modal End -->
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: "Page - Dashboard",
        };
    },

    data() {
        return {
            pages:{},
            editMode: false,
            empty: false,
            form: {
                id: "",
                name: "",
            },
        }
    },

    methods: {
        // Open New Modal
        newModal(){
            this.editMode = false;
            this.form.id = "";
            this.form.name = "";
            $("#modal").modal("show");
        },

        //Get All Page
        getPage(){
            this.$axios.get("page").then(
                (response)=>{
                    this.empty = response.data.pages.data.length > 0 ? false : true;
                    this.pages = response.data.pages;
                },
                (error)=>{
                    $nuxt.$emit("error", "Something Wrong! Please try Again")
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("?page=" + page).then(
                (response) => {
                    this.pages = response.data.pages;
                });
        },

        // Create New Page
        addPage(){
            this.$axios.post("create-page", this.form).then(
                ()=>{
                    $("#modal").modal("hide");
                    this.form.id = "";
                    this.form.name = "";
                    $nuxt.$emit("triggerPage");
                    $nuxt.$emit("success", "Page Created Successfully");
                },
                (error)=>{
                    $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : error.response.data.error ? error.response.data.error : "Something Wrong! Please try Again");
                }
            )
        },

        // Edit Page
        editPage(page){
            this.editMode = true;
            this.form.id = page.id;
            this.form.name = page.name;
            $("#modal").modal("show");
        },

        // Update Page
        updatePage(){
            this.$axios.post("update-page/"+ this.form.id, this.form).then(
                ()=>{
                    $("#modal").modal("hide");
                    this.form.id = "";
                    this.form.name = "";
                    $nuxt.$emit("triggerPage");
                    $nuxt.$emit("success", "Page Updated Successfully");
                },
                (error)=>{
                    $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : error.response.data.error ? error.response.data.error : "Something Wrong! Please try Again");
                }
            )
        },
        
        // Delete Page
        deletePage(id){
            this.$swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$axios.post("delete-page/"+id).then(
                        ()=>{
                            Swal.fire(
                            "Deleted!",
                            "Page has been deleted.",
                            "success"
                            )
                            $nuxt.$emit("triggerPage");
                        },
                        (error)=>{
                            $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : error.response.data.error ? error.response.data.error : "Something Wrong! Please try Again");
                        }
                    )
                }
            })
        },
    },

    created() {
        if (this.admin) {
            this.getPage();
            this.$nuxt.$on("triggerPage", () => {
                this.getPage();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>