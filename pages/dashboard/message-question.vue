<template>
<div class="container dashboard-container mt-5" v-if="admin">
    <div class="row">
        <div class="col-lg-3">
            <Sidebar />
        </div>
        <div class="col-lg-9">
            <div class="dashboard-content">
                <div class="dashboard-content-header">
                    <h3 class="strong">Message & Question</h3>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr class="text-center">
                                <th class="align-middle">Name</th>
                                <th class="align-middle">Phone</th>
                                <th class="align-middle">message</th>
                                <th class="align-middle">Status</th>
                                <th class="align-middle">Created At</th>
                                <th class="align-middle">Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="empty">
                            <tr>
                                <th colspan="6">
                                    <Empty message="No Message Found" />
                                </th>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center" v-for="message in messages.data" :key="message.id">
                                <th class="align-middle">{{message.name}}</th>
                                <td class="align-middle">{{message.phone}}</td>
                                <td class="align-middle">
                                    <h4>{{message.subject}}</h4>
                                    <p>{{message.message.substring(0, 100)}}{{message.message.length > 100 ? '.....' : ''}}</p>
                                </td>
                                <td class="align-middle">
                                    <span class="badge" :class="message.solve ? 'bg-success' : 'bg-danger'">{{message.solve ? 'Solved' : 'Unsolved'}}</span>
                                </td>
                                <td class="align-middle">{{message.created_at | date}}</td>
                                <td class="align-middle">
                                    <button type="button" class="btn mb-2" :class="message.solve ? 'btn-danger' : 'btn-primary'" @click="updateMessage(message.id)" v-tooltip.top-center="message.solve ? 'Click to Status Unsolved' : 'Click to Status Solved'">
                                        <client-only>
                                            <icon :icon="message.solve ? 'times' : 'check'"></icon>
                                        </client-only>
                                    </button>
                                    <button type="button" class="btn btn-secondary mb-2" @click="viewMessage(message)" v-tooltip.top-center="'Click to View Full Message'">
                                        <client-only>
                                            <icon icon="file-alt"></icon>
                                        </client-only>
                                    </button>
                                    <button type="button" class="btn btn-danger mb-2" @click="deleteMessage(message.id)" v-tooltip.top-center="'Click to Delete Message'">
                                        <client-only>
                                            <icon icon="trash-alt"></icon>
                                        </client-only>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <pagination :data="messages" @pagination-change-page="getResults" class="justify-content-center mt-3 paginate"></pagination>
            </div>
        </div>
    </div>
    <!-- Modal Start -->
    <div class="modal fade" id="modal" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">View Message</h5>
                </div>
                <div class="modal-body">
                    <h3 class="strong">Name: {{view.name}}</h3>
                    <h4>Phone: {{view.phone}}</h4>
                    <h4 v-if="view.email">Email: {{view.email}}</h4>
                    <hr>
                    <h4>Message:</h4>
                    <p class="strong">Subject: {{view.subject}}</p>
                    <p>{{view.message}}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn" :class="view.solve ? 'btn-danger' : 'btn-primary'" @click="updateMessage(view.id)">{{view.solve ? 'Unolved' : 'Solved'}}</button>
                    <button type="button" class="btn btn-danger" @click="deleteMessage(view.id)">Delete Message</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal End -->
</div>
</template>

<script>
export default {
    head() {
        return {
            title: "Message & Question - Dashboard",
            link: [{rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            messages: {},
            view: {},
            empty: false,
        }
    },

    methods: {
        //Get All Contact Messages
        getContactMessage() {
            this.$axios.get("get-contact-message").then(
                (response) => {
                    this.empty = response.data.messages.data.length > 0 ? false : true;
                    this.messages = response.data.messages;
                },
                (error) => {
                    $nuxt.$emit("error", error)
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("get-contact-message?page=" + page).then(
                (response) => {
                    this.messages = response.data.messages;
                });
        },

        // View Full Message
        viewMessage(message){
            this.view = message;
            $("#modal").modal("show");
        },

        // Update Message Status
        updateMessage(id) {
            if (this.click) {
                this.click = false;
                this.$axios.post("update-contact-message/" + id).then(
                    () => {
                        $nuxt.$emit("triggerContactMessage");
                        $nuxt.$emit("success", "Message Status Updated Successfully");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    }
                )
            }
        },

        // Delete Message
        deleteMessage(id) {
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
                        this.$axios.post("delete-contact-message/" + id).then(
                            () => {
                                Swal.fire(
                                    "Deleted!",
                                    "Message has been deleted.",
                                    "success"
                                )
                                $nuxt.$emit("triggerContactMessage");
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
            this.getContactMessage();
            this.$nuxt.$on("triggerContactMessage", () => {
                this.getContactMessage();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>
