<template>
<div class="container dashboard-container mt-5" v-if="admin">
    <div class="row">
        <div class="col-lg-3">
            <Sidebar />
        </div>
        <div class="col-lg-9">
            <div class="dashboard-content">
                <div class="dashboard-content-header">
                    <h3 class="strong">Guide request</h3>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr class="text-center">
                                <th>ID</th>
                                <th>User info</th>
                                <th>message</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="empty">
                            <tr>
                                <th colspan="4">
                                    <Empty message="No Request Found" />
                                </th>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center" v-for="user in users.data" :key="user.id">
                                <th class="align-middle text-center">{{user.id}}</th>
                                <td class="align-middle">
                                    <img :data-src="assetURL+user.image" :alt="user.name" v-lazy-load />
                                    <p>{{user.name}}</p>
                                    <p>Account created {{user.created_at | date}}</p>
                                </td>
                                <td class="align-middle text-start">
                                    <h5>Phone:</h5>
                                    <p class="mb-3">{{JSON.parse(user.guide_request).phone}}</p>
                                    <h5>Message:</h5>
                                    <transition name="slide" mode="out-in">
                                        <p>{{JSON.parse(user.guide_request).message}}</p>
                                    </transition>
                                </td>
                                <td class="align-middle">
                                    <button type="button" class="btn btn-primary" @click="status(user.id, true)">
                                        <client-only>
                                            <icon icon="check-circle"></icon>
                                        </client-only>
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="status(user.id, false)">
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
</div>
</template>

<script>
export default {
    head() {
        return {
            title: "Guide Request - Dashboard",
            link: [{ rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            users: {},
            empty: false,
        }
    },

    methods: {
        //Get Guide Request
        getGuideRequest() {
            this.$axios.get("guide-request").then(
                (response) => {
                    this.empty = response.data.users.data.length > 0 ? false : true;
                    this.users = response.data.users;
                },
                (error) => {
                    $nuxt.$emit("customError", "Something Wrong! Please try Again")
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("guide-request?page=" + page).then(
                (response) => {
                    this.users = response.data.users;
                });
        },

        // Approve User
        status(id, info) {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: info ? "Approve" : "Reject"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false;
                        this.$axios.post("guide-request-status/" + id, { approve: info }).then(
                            () => {
                                if (info) {
                                    Swal.fire("Approve!", "This user is now a Guide", "success");
                                } else {
                                    Swal.fire("Reject", "This user still is a user", "success");
                                }
                                $nuxt.$emit("triggerguide");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("customError", "Something Wrong! Please try Again");
                                this.click = true;
                            }
                        )
                    }
                }
            });
        },
    },

    created() {
        if (this.admin) {
            this.getGuideRequest();

            this.$nuxt.$on("triggerguide", () => {
                this.getGuideRequest();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>
