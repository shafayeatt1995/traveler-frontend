<template>
<div class="container dashboard-container mt-5" v-if="adminOrGuide">
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
                                <th>ID</th>
                                <th>Image</th>
                                <th>Package Name</th>
                                <th>Booking Info</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody v-if="empty">
                            <tr>
                                <th colspan="5">
                                    <Empty message="No Package Found" />
                                </th>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center" v-for="pack in packages.data" :key="pack.id">
                                <td class="align-middle">{{pack.id}}</td>
                                <td class="align-middle">
                                    <nuxt-link :to="{name: 'package-slug', params: {slug: pack.slug}}">
                                        <img :data-src="assetURL + pack.thumbnail" :alt="pack.name" class="img-fluid mw-200" v-lazy-load />
                                    </nuxt-link>
                                </td>
                                <td class="align-middle dashboard-border">
                            <tr class="border-0">
                                <td class="border-0">Name:</td>
                                <td class="border-0">{{pack.name}}</td>
                            </tr>
                            <tr class="border-0">
                                <td class="border-0">Address:</td>
                                <td class="border-0">{{pack.address}}</td>
                            </tr>
                            <tr class="border-0">
                                <td class="border-0">Status:</td>
                                <td class="border-0">{{pack.status == true ? 'Tour Complete' : pack.status == false ? 'Booking Available' : 'Tour Running'}}</td>
                            </tr>
                            <tr class="border-0">
                                <td class="border-0">Tour Start Date:</td>
                                <td class="border-0">{{pack.start_date | normalDate}}</td>
                            </tr>
                            </td>
                            <td class="align-middle dashboard-border">
                                <tr class="border-0">
                                    <td class="border-0">Total Ticket:</td>
                                    <td class="border-0">{{pack.ticket}}</td>
                                </tr>
                                <tr class="border-0">
                                    <td class="border-0">Ticket Booking:</td>
                                    <td class="border-0">{{pack.bookings.reduce((total, value) => total + value.ticket, 0)}}</td>
                                </tr>
                                <tr class="border-0">
                                    <td class="border-0">Full Payment:</td>
                                    <td class="border-0">{{pack.bookings.reduce((total, value) => total + (value.booking_type ? value.ticket : 0), 0)}}</td>
                                </tr>
                                <tr class="border-0">
                                    <td class="border-0">Partial Payment:</td>
                                    <td class="border-0">{{pack.bookings.reduce((total, value) => total + (!value.booking_type ? value.ticket : 0), 0)}}</td>
                                </tr>
                                <tr class="border-0">
                                    <td class="border-0">Ticket Available:</td>
                                    <td class="border-0">{{pack.ticket - (pack.bookings.reduce((total, value) => total + value.ticket, 0))}}</td>
                                </tr>
                                <tr class="border-0">
                                    <td class="border-0">Booking Collection Amount:</td>
                                    <td class="border-0">${{pack.bookings.reduce((total, value) => total + value.payments.reduce((subTotal, payment) => subTotal + +payment.amount, 0), 0) | currency}}</td>
                                </tr>
                            </td>
                            <td class="align-middle">
                                <button type="button" class="btn btn-secondary mb-3" @click="bookingList(pack.bookings)" v-tooltip.top-center="'Click to Show Booking List'">
                                    <client-only>
                                        <icon icon="eye"></icon>
                                    </client-only>
                                </button>
                                <button type="button" class="btn btn-danger mb-3" @click="changeStatus({status : false}, pack.id)" v-tooltip.top-center="'Click to Booking Status Available'">
                                    <client-only>
                                        <icon icon="file-alt"></icon>
                                    </client-only>
                                </button>
                                <button type="button" class="btn btn-success mb-3" @click="changeStatus({status : null}, pack.id)" v-tooltip.top-center="'Click to Status Tour Start'">
                                    <client-only>
                                        <icon icon="running"></icon>
                                    </client-only>
                                </button>
                                <button type="button" class="btn btn-primary mb-3" @click="changeStatus({status : true}, pack.id)" v-tooltip.top-center="'Click to Status Tour Complete'">
                                    <client-only>
                                        <icon icon="check-circle"></icon>
                                    </client-only>
                                </button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pagination :data="packages" @pagination-change-page="getResults" class="justify-content-center mt-3 paginate"></pagination>
            </div>
        </div>
    </div>

    <!-- Modal Start -->
    <div class="modal fade" id="modal" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Booking List</h5>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr class="text-center">
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Ticket</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="text-center" v-for="(booking, key) in bookingLists" :key="booking.id">
                                    <td class="align-middle">{{key + 1}}</td>
                                    <td class="align-middle">{{booking.name}}</td>
                                    <td class="align-middle">{{booking.email}}</td>
                                    <td class="align-middle">{{booking.phone}}</td>
                                    <td class="align-middle">{{booking.ticket}}</td>
                                    <td class="align-middle">
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
                                            Payment Complete
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
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
            title: "Package Booking - Dashboard",
            link: [{ rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            packages: {},
            bookingLists: [],
            empty: false,
        }
    },

    methods: {
        //Get All Pachages
        getPackage() {
            this.$axios.get("booking-package").then(
                (response) => {
                    this.empty = response.data.packages.data.length > 0 ? false : true;
                    this.packages = response.data.packages
                },
                (error) => {
                    $nuxt.$emit("customError", "Something Wrong! Please try Again")
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("booking-package?page=" + page).then(
                (response) => {
                    this.packages = response.data.packages;
                });
        },

        //Change Package Status
        changeStatus(status, id) {
            if (this.click) {
                this.click = false;
                this.$axios.post("package-status/" + id, status).then(
                    () => {
                        $nuxt.$emit("triggerPackageBooking");
                        this.click = true;
                    },
                    () => {
                        $nuxt.$emit("customError", "Something Wrong! Please try Again")
                        this.click = true;
                    },
                )
            }
        },

        //show Booking List
        bookingList(bookings) {
            this.bookingLists = bookings;
            $("#modal").modal("show");
        },
    },

    created() {
        if (this.adminOrGuide) {
            this.getPackage();

            this.$nuxt.$on("triggerPackageBooking", () => {
                this.getPackage();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>
