<template>
    <div class="container dashboard-container mt-5" v-if="authCheck">
        <div class="row">
            <div class="col-lg-3">
                <Sidebar />
            </div>
            <div class="col-lg-9">
                <div class="dashboard-content">
                    <div class="dashboard-content-header">
                        <h3 class="strong">Booking</h3>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr class="text-center">
                                    <th>Package Info</th>
                                    <th>Booking Info</th>
                                    <th>Payment Info</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="empty">
                                <tr>
                                    <th colspan="4">
                                        <Empty message="No Booking Found"/>
                                    </th>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="text-center" v-for="booking in bookings.data" :key="booking.id">
                                    <td class="align-middle">
                                        <nuxt-link :to="'../package/'+booking.package.slug">
                                            <img :src="assetURL + JSON.parse(booking.package.images)[0]" :alt="booking.package.name" class="img-fluid mw-200"/>
                                            <p>{{booking.package.name}}</p>
                                        </nuxt-link>
                                        <h5 class="mt-3">{{booking.package.status == true ? 'Tour Already Complete': booking.package.status == false ? 'Booking Available' : 'Tour Already Running'}}</h5>
                                    </td>
                                    <td class="align-middle dashboard-border">
                                        <tr class="border-0">
                                            <td class="border-0">Name:</td>
                                            <td class="border-0">{{booking.name}}</td>
                                        </tr>
                                        <tr class="border-0">
                                            <td class="border-0">Email:</td>
                                            <td class="border-0">{{booking.email}}</td>
                                        </tr>
                                        <tr class="border-0">
                                            <td class="border-0">Phone:</td>
                                            <td class="border-0">{{booking.phone}}</td>
                                        </tr>
                                        <tr class="border-0">
                                            <td class="border-0">Address:</td>
                                            <td class="border-0">{{booking.address}}</td>
                                        </tr>
                                        <tr class="border-0">
                                            <td class="border-0">Booking Ticket:</td>
                                            <td class="border-0">{{booking.ticket}}</td>
                                        </tr>
                                        <tr class="border-0">
                                            <td class="border-0">Booking Price:</td>
                                            <td class="border-0">${{booking.discount !== null ? booking.booking_type ? booking.discount: booking.price : booking.price}} / Per Person</td>
                                        </tr>
                                    </td>
                                    <td class="dashboard-border align-middle">
                                        <tr class="border-0">
                                            <td class="border-0">Payment Type:</td>
                                            <td class="border-0">{{booking.booking_type ? 'Full Payment' : 'Partial Payment'}}</td>
                                        </tr>
                                        <tr class="border-0">
                                            <td class="border-0">Paid Amount:</td>
                                            <td class="border-0">${{booking.payments.reduce((total, payment) => total + +payment.amount, 0) | currency}}</td>
                                        </tr>
                                        <tr class="border-0">
                                            <td class="border-0">Discount:</td>
                                            <td class="border-0">${{(booking.booking_type ? booking.discount == null ? '0': booking.price - booking.discount : '0') * booking.ticket | currency}}</td>
                                        </tr>
                                        <tr class="border-0">
                                            <td class="border-0">Unpaid Amount:</td>
                                            <td class="border-0">${{(booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price)) - booking.payments.reduce((total, payment) => total + +payment.amount, 0) | currency}}</td>
                                        </tr>
                                        <tr class="border-0">
                                            <td class="border-0">Total Payable Amount:</td>
                                            <td class="border-0">${{booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price) | currency}}</td>
                                        </tr>
                                        <tr class="border-0">
                                            <td class="border-0 text-center" colspan="2">
                                                <h4>
                                                    <span class="text-danger" v-if="booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price) > booking.payments.reduce((total, payment) => total + payment.amount, 0)">
                                                        <client-only>
                                                            <icon icon="times"></icon>
                                                        </client-only>
                                                        Payment Due
                                                    </span>
                                                    <span class="text-success" v-else>
                                                        <client-only>
                                                            <icon :icon="['far', 'check-circle']"></icon>
                                                        </client-only>
                                                        Payment Done
                                                    </span>
                                                </h4>
                                            </td>
                                        </tr>
                                    </td>
                                    <td class="align-middle">
                                        <button type="button" class="btn btn-success mb-3" @click="editBooking(booking)" v-tooltip.top-center="'Click to Edit Booking Information'">
                                            <client-only>
                                                <icon icon="edit"></icon>
                                            </client-only>
                                        </button>
                                        <nuxt-link :to="'/booking-confirm/' + booking.id" class="btn btn-base-color px-3" v-tooltip.top-center="'Click for pay unpaid amount'" v-if="booking.package.status == false ? (booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price)) - booking.payments.reduce((total, payment) => total + +payment.amount, 0) > 0 : false">
                                            $
                                        </nuxt-link>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <pagination :data="bookings" @pagination-change-page="getResults" class="justify-content-center mt-3 paginate"></pagination>
                </div>
            </div>
        </div>
        <!-- Modal Start -->
        <div class="modal fade" id="modal" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
            <div class="modal-dialog">
                <form class="modal-content" @submit.prevent="updateBooking">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Booking Information</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" v-model="form.name">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" v-model="form.email">
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="number" class="form-control" id="phone" v-model="form.phone">
                        </div>
                        <div class="form-group">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" v-model="form.address">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Update Booking</button>
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
            title: "Tour Booking - Dashboard",
        };
    },

    data() {
        return {
            bookings:{},
            form: {
                id: "",
                name: "",
                email: "",
                phone: "",
                address: "",
                status: "",
            },
            empty: false,
        }
    },

    methods: {
        //Get All Booking
        getBooking(){
            this.$axios.get("booking").then(
                (response)=>{
                    this.empty = response.data.bookings.data.length > 0 ? false : true;
                    this.bookings = response.data.bookings
                },
                (error)=>{
                    $nuxt.$emit("error", "Something Wrong! Please try Again");
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("booking?page=" + page).then(
                (response) => {
                    this.bookings = response.data.bookings;
                });
        },

        // Show Modal With Booking Information
        editBooking(booking){
            if (booking.package.status == false) {
                this.form.id = booking.id;
                this.form.name = booking.name;
                this.form.email = booking.email;
                this.form.phone = booking.phone;
                this.form.address = booking.address;
                this.form.status = booking.package.status;
                $("#modal").modal("show");
            } else {
                $nuxt.$emit("error", booking.package.status == true ? "Tour Already Complete" : "Tour Already Running");
            }
        },

        //Update Booking Information
        updateBooking(){
            this.$axios.post("update-booking/" + this.form.id, this.form).then(
                (response)=>{
                    $nuxt.$emit("triggerUpdateBooking");
                    $("#modal").modal("hide");
                },
                (error)=>{
                    $nuxt.$emit("error", "Something Wrong! Please try Again");
                },
            )
        },
    },

    created() {
        if (this.authCheck) {
            this.getBooking();
            this.$nuxt.$on("triggerUpdateBooking", () => {
                this.getBooking();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>