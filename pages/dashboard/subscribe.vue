<template>
    <div class="container dashboard-container mt-5" v-if="admin">
        <div class="row">
            <div class="col-lg-3">
                <Sidebar />
            </div>
            <div class="col-lg-9">
                <div class="dashboard-content">
                    <div class="dashboard-content-header">
                        <h3 class="strong">Subscriber List</h3>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr class="text-center">
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="empty">
                                <tr>
                                    <th colspan="4">
                                        <Empty message="No Subscriber Found"/>
                                    </th>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="text-center" v-for="subscriber in subscribers.data" :key="subscriber.id">
                                    <th class="align-middle text-center">{{subscriber.id}}</th>
                                    <td class="align-middle">{{subscriber.email}}</td>
                                    <td class="align-middle">{{subscriber.created_at | date}}</td>
                                    <td class="align-middle">
                                        <button type="button" class="btn btn-danger" @click="deleteSubscriber(subscriber.id)">
                                            <client-only>
                                                <icon icon="trash-alt"></icon>
                                            </client-only>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <pagination :data="subscribers" @pagination-change-page="getResults" class="justify-content-center mt-3 paginate"></pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: "Subscriber List - Dashboard",
            link: [{rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            subscribers:{},
            empty: false,
        }
    },

    methods: {
        //Get All subscribers
        getSubscriber(){
            this.$axios.get("subscriber").then(
                (response)=>{
                    this.empty = response.data.subscribers.data.length > 0 ? false : true;
                    this.subscribers = response.data.subscribers
                },
                (error)=>{
                    $nuxt.$emit("error", error)
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("subscriber?page=" + page).then(
                (response) => {
                    this.subscribers = response.data.subscribers;
                });
        },

        // Delete Category
        deleteSubscriber(id){
            this.$swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, remove it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    if(this.click) {
                        this.click = false;
                        this.$axios.post("delete-subscriber/"+id).then(
                            ()=>{
                                Swal.fire(
                                "Removed!",
                                "Subscriber has been removed.",
                                "success"
                                )
                                $nuxt.$emit("triggerSubscriber");
                                this.click = true;
                            },
                            (error)=>{
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
            this.getSubscriber();
            this.$nuxt.$on("triggerSubscriber", () => {
                this.getSubscriber();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>