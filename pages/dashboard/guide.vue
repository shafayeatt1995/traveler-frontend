<template>
<div class="container dashboard-container mt-5" v-if="admin">
    <div class="row">
        <div class="col-lg-3">
            <Sidebar />
        </div>
        <div class="col-lg-9">
            <div class="dashboard-content">
                <div class="dashboard-content-header">
                    <button type="button" class="btn add-btn" @click="newModal">Add User</button>
                    <h3 class="strong">Guide List</h3>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr class="text-center">
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="empty">
                            <tr>
                                <th colspan="5">
                                    <Empty message="No Category Found" />
                                </th>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center" v-for="user in users.data" :key="user.id">
                                <td class="align-middle">{{user.id}}</td>
                                <th class="align-middle text-center">
                                    <img :data-src="assetURL+user.image" class="img-fluid mh-200 mw-200" v-lazy-load />
                                </th>
                                <td class="align-middle">{{user.name}}</td>
                                <td class="align-middle">{{user.email}}</td>
                                <td class="align-middle">{{user.role.name}}</td>
                                <td class="align-middle">
                                    <button type="button" class="btn btn-primary" @click="editUser(user)">
                                        <client-only>
                                            <icon icon="edit"></icon>
                                        </client-only>
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteUser(user.id)">
                                        <client-only>
                                            <icon icon="trash-alt"></icon>
                                        </client-only>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <pagination :data="users" @pagination-change-page="getResults" class="justify-content-center mt-3 paginate"></pagination>
            </div>
        </div>
    </div>
    <!-- Modal Start -->
    <div class="modal fade" id="modal" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog">
            <form class="modal-content" @submit.prevent="editMode ? updateUser() : addUser()">
                <div class="modal-header">
                    <h5 class="modal-title" v-if="editMode">Edit User</h5>
                    <h5 class="modal-title" v-else>Add New User</h5>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="name">User Name</label>
                        <input type="text" class="form-control" id="name" v-model="form.name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">User Email</label>
                        <input type="email" class="form-control" id="email" v-model="form.email" required>
                    </div>
                    <div class="form-group" v-if="!editMode">
                        <label for="password">User Password</label>
                        <input type="password" class="form-control" id="password" v-model="form.password">
                    </div>
                    <div class="form-group" v-if="!editMode">
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" class="form-control" :class="form.password !== form.password_confirmation ? 'border-danger':''" id="confirm-password" v-model="form.password_confirmation">
                    </div>
                    <div class="form-group">
                        <label for="user-type">Select User Type</label>
                        <select class="form-control" id="user-type" v-model="form.userType" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'" placeholder="Select User Type" required>
                            <option value="">Select A Category</option>
                            <option value="1">Admin</option>
                            <option value="2">Guide</option>
                            <option value="3">User</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" v-if="editMode">Update User</button>
                    <button type="submit" class="btn btn-primary" v-else>Add User</button>
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
            title: "User - Dashboard",
            link: [{ rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            users: {},
            editMode: false,
            empty: false,
            form: {
                id: "",
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                userType: "",
            },
        }
    },

    methods: {
        // Open New Modal
        newModal() {
            this.editMode = false;
            this.form.id = "";
            this.form.name = "";
            this.form.email = "";
            this.form.password = "";
            this.form.password_confirmation = "";
            this.form.userType = "";
            $("#modal").modal("show");
        },

        // Get All User
        getUser() {
            this.$axios.get("users/" + 2).then(
                (response) => {
                    this.empty = response.data.users.data.length > 0 ? false : true;
                    this.users = response.data.users;
                },
                (error) => {
                    $nuxt.$emit("error", error);
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("users?page=" + page).then(
                (response) => {
                    this.users = response.data.users;
                });
        },

        // Create New User
        addUser() {
            if (this.form.password === this.form.password_confirmation) {
                if (this.click) {
                    this.click = false;
                    this.$axios.post("create-user", this.form).then(
                        () => {
                            $("#modal").modal("hide");
                            this.form.id = "";
                            this.form.name = "";
                            this.form.email = "";
                            this.form.password = "";
                            this.form.password_confirmation = "";
                            this.form.userType = "";
                            $nuxt.$emit("triggerGuide");
                            $nuxt.$emit("success", "User Created Successfully");
                            this.click = true;
                        },
                        (error) => {
                            $nuxt.$emit("error", error);
                            this.click = true;
                        }
                    )
                }
            } else {
                $nuxt.$emit("customError", "Confirm Password Not Matched");
            }
        },

        // Edit User
        editUser(user) {
            this.editMode = true;
            this.form.id = user.id;
            this.form.name = user.name;
            this.form.email = user.email;
            this.form.password = "";
            this.form.password_confirmation = "";
            this.form.userType = user.role_id;
            $("#modal").modal("show");
        },

        // Update User
        updateUser() {
            if (this.click) {
                this.click = false;
                this.$axios.post("update-user/" + this.form.id, this.form).then(
                    () => {
                        $("#modal").modal("hide");
                        this.form.id = "";
                        this.form.name = "";
                        this.form.email = "";
                        this.form.password = "";
                        this.form.password_confirmation = "";
                        this.form.userType = "";
                        $nuxt.$emit("triggerGuide");
                        $nuxt.$emit("success", "User Updated Successfully");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    }
                )
            }
        },

        // Delete User
        deleteUser(id) {
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
                        this.$axios.post("delete-user/" + id).then(
                            () => {
                                Swal.fire(
                                    "Deleted!",
                                    "User has been deleted.",
                                    "success"
                                )
                                $nuxt.$emit("triggerGuide");
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
    },

    created() {
        if (this.admin) {
            this.getUser();
            this.$nuxt.$on("triggerGuide", () => {
                this.getUser();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>
