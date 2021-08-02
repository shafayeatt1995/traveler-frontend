<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3">
                <Sidebar />
            </div>
            <div class="col-lg-9">
                <div class="dashboard-content">
                    <div class="dashboard-content-header">
                        <button type="button" class="btn add-btn" @click="newModal">Add Category</button>
                        <h3 class="strong">Category</h3>
                    </div>
                    <table class="table">
                        <thead>
                            <tr class="text-center">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="empty">
                            <tr>
                                <th colspan="4">
                                    <Empty message="No Category Found"/>
                                </th>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center" v-for="category in categories.data" :key="category.id">
                                <th class="align-middle text-center">{{category.id}}</th>
                                <td class="align-middle">{{category.name}}</td>
                                <td class="align-middle">{{category.created_at | date}}</td>
                                <td class="align-middle">
                                    <button type="button" class="btn btn-success" @click="editCategory(category)">
                                        <client-only>
                                            <icon icon="edit"></icon>
                                        </client-only>
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteCategory(category.id)">
                                        <client-only>
                                            <icon icon="trash-alt"></icon>
                                        </client-only>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <pagination :data="categories" @pagination-change-page="getResults" class="justify-content-center"></pagination>
                </div>
            </div>
        </div>
        <!-- Modal Start -->
        <div class="modal fade" id="modal" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
            <div class="modal-dialog">
                <form class="modal-content" @submit.prevent="editMode ? updateCategory() : addCategory()">
                    <div class="modal-header">
                        <h5 class="modal-title" v-if="editMode">Edit Category</h5>
                        <h5 class="modal-title" v-else>Add New Category</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="category">Category Name</label>
                            <input type="text" class="form-control" id="category" v-model="form.name">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success" v-if="editMode">Edit Category</button>
                        <button type="submit" class="btn btn-success" v-else>Add Category</button>
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
            title: "Category - Dashboard",
        };
    },

    data() {
        return {
            categories:{},
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

        //Get All Category
        getCategory(){
            this.$axios.get('category').then(
                (response)=>{
                    this.empty = response.data.categories.data.length > 0 ? false : true;
                    this.categories = response.data.categories
                },
                (error)=>{
                    $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : "Something Wrong! Please try Again")
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("category?page=" + page).then(
                (response) => {
                    this.categories = response.data.categories;
                });
        },

        // Create New Category
        addCategory(){
            this.$axios.post("create-category", this.form).then(
                ()=>{
                    $("#modal").modal("hide");
                    this.form.id = "";
                    this.form.name = "";
                    $nuxt.$emit('triggerCategory');
                    $nuxt.$emit('success', 'Category Created Successfully');
                },
                (error)=>{
                    $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : "Something Wrong! Please try Again");
                }
            )
        },

        // Edit Category
        editCategory(category){
            this.editMode = true;
            this.form.id = category.id;
            this.form.name = category.name;
            $("#modal").modal("show");
        },

        // Update Category
        updateCategory(){
            this.$axios.post("update-category/"+ this.form.id, this.form).then(
                ()=>{
                    $("#modal").modal("hide");
                    this.form.id = "";
                    this.form.name = "";
                    $nuxt.$emit('triggerCategory');
                    $nuxt.$emit('success', 'Category Updated Successfully');
                },
                (error)=>{
                    $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : "Something Wrong! Please try Again");
                }
            )
        },
        
        // Delete Category
        deleteCategory(id){
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$axios.post("delete-category/"+id).then(
                        ()=>{
                            Swal.fire(
                            'Deleted!',
                            'Category has been deleted.',
                            'success'
                            )
                            $nuxt.$emit('triggerCategory');
                        },
                        (error)=>{
                            $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : "Something Wrong! Please try Again");
                        }
                    )
                }
            })
        },
    },

    created() {
        if (this.authCheck) {
            this.getCategory();
            this.$nuxt.$on('triggerCategory', () => {
                this.getCategory();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>