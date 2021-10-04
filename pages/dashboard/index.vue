<template>
<div class="container dashboard-container mt-5" v-if="authCheck">
    <div class="row">
        <div class="col-lg-3">
            <Sidebar />
        </div>
        <div class="col-lg-9" v-if="admin">
            <h2>Hello {{authUser.name}}</h2>
            <div class="row">
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Monthly Booking Quantity</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>{{dashAdmin.booking.quantity}}</h1>
                        </transition>
                        <button type="button" @click="adminBookingDetails">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </button>
                    </div>

                    <!-- Modal Start -->
                    <div class="modal fade" id="admin-booking-details" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Booking Details</h5>
                                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr class="text-center">
                                                    <th>Sl</th>
                                                    <th>Date</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Ticket</th>
                                                    <th>Amount</th>
                                                    <th>Paid</th>
                                                    <th>Payment</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="text-center" v-for="(booking, key) in dashAdmin.bookingDetails" :key="booking.id">
                                                    <td class="align-middle">{{key + 1}}</td>
                                                    <td class="align-middle">{{booking.created_at | normalDate}}</td>
                                                    <td class="align-middle">{{booking.name}}</td>
                                                    <td class="align-middle">{{booking.email}}</td>
                                                    <td class="align-middle">{{booking.phone}}</td>
                                                    <td class="align-middle">{{booking.ticket}}</td>
                                                    <td class="align-middle">${{booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price) | currency}}</td>
                                                    <td class="align-middle">${{booking.payments.reduce((total, payment)=> total + parseFloat(payment.amount), 0) | currency}}</td>
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
                                                    <td>
                                                        <button type="button" class="btn btn-primary" v-tooltip.top-center="'View Booking Details'" @click="bookingDetails(booking.id)">
                                                            <client-only>
                                                                <icon icon="eye"></icon>
                                                            </client-only>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="5" class="strong text-center">Total</td>
                                                    <td class="strong text-center">{{dashAdmin.bookingDetails.reduce((total, booking) => total + booking.ticket, 0)}}</td>
                                                    <td class="strong text-center">${{dashAdmin.bookingDetails.reduce((total, booking) => total + (booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price)), 0) | currency}}</td>
                                                    <td class="strong text-center">${{dashAdmin.bookingDetails.reduce((total, booking) => total + booking.payments.reduce((subTotal, payment) => subTotal + parseFloat(payment.amount), 0), 0) | currency}}</td>
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
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Monthly Booking Amount</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>${{dashAdmin.booking.amount | currency}}</h1>
                        </transition>
                        <button type="button" @click="adminBookingDetails">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </button>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Today Booking Quantity</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>{{dashAdmin.booking.todayQuantity}}</h1>
                        </transition>
                        <button type="button" @click="adminTodayBookingDetails">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </button>
                    </div>

                    <!-- Modal Start -->
                    <div class="modal fade" id="admin-today-booking-details" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Today Booking Details</h5>
                                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr class="text-center">
                                                    <th>Sl</th>
                                                    <th>Date</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Ticket</th>
                                                    <th>Amount</th>
                                                    <th>Paid</th>
                                                    <th>Payment</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="text-center" v-for="(booking, key) in dashAdmin.todayBookingDetails" :key="booking.id">
                                                    <td class="align-middle">{{key + 1}}</td>
                                                    <td class="align-middle">{{booking.created_at | normalDate}}</td>
                                                    <td class="align-middle">{{booking.name}}</td>
                                                    <td class="align-middle">{{booking.email}}</td>
                                                    <td class="align-middle">{{booking.phone}}</td>
                                                    <td class="align-middle">{{booking.ticket}}</td>
                                                    <td class="align-middle">${{booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price) | currency}}</td>
                                                    <td class="align-middle">${{booking.payments.reduce((total, payment)=> total + parseFloat(payment.amount), 0) | currency}}</td>
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
                                                    <td>
                                                        <button type="button" class="btn btn-primary" v-tooltip.top-center="'View Booking Details'" @click="bookingDetails(booking.id)">
                                                            <client-only>
                                                                <icon icon="eye"></icon>
                                                            </client-only>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="5" class="strong text-center">Total</td>
                                                    <td class="strong text-center">{{dashAdmin.todayBookingDetails.reduce((total, booking) => total + booking.ticket, 0)}}</td>
                                                    <td class="strong text-center">${{dashAdmin.todayBookingDetails.reduce((total, booking) => total + (booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price)), 0) | currency}}</td>
                                                    <td class="strong text-center">${{dashAdmin.todayBookingDetails.reduce((total, booking) => total + booking.payments.reduce((subTotal, payment) => subTotal + parseFloat(payment.amount), 0), 0) | currency}}</td>
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
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Today Booking Amount</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>${{dashAdmin.booking.todayAmount | currency}}</h1>
                        </transition>
                        <button type="button" @click="adminTodayBookingDetails">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </button>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Available Booking Package</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>{{dashAdmin.booking.package | number}}</h1>
                        </transition>
                        <button type="button" @click="adminAvailablePackage">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </button>
                    </div>

                    <!-- Modal Start -->
                    <div class="modal fade" id="admin-available-package" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Package Details</h5>
                                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
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
                                            <tbody>
                                                <tr class="text-center" v-for="pack in dashAdmin.packages" :key="pack.id">
                                                    <td class="align-middle">{{pack.id}}</td>
                                                    <td class="align-middle">
                                                        <p class="pointer" @click="viewPackage(pack.slug)">
                                                            <img :data-src="assetURL + pack.thumbnail" :alt="pack.name" class="img-fluid mw-200" v-lazy-load />
                                                        </p>
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
                                                        <td class="border-0">{{pack.bookings.reduce((total, value)=> total + value.ticket, 0)}}</td>
                                                    </tr>
                                                    <tr class="border-0">
                                                        <td class="border-0">Full Payment:</td>
                                                        <td class="border-0">{{pack.bookings.reduce((total, value)=> total + (value.booking_type ? value.ticket : 0), 0)}}</td>
                                                    </tr>
                                                    <tr class="border-0">
                                                        <td class="border-0">Partial Payment:</td>
                                                        <td class="border-0">{{pack.bookings.reduce((total, value)=> total + (!value.booking_type ? value.ticket : 0), 0)}}</td>
                                                    </tr>
                                                    <tr class="border-0">
                                                        <td class="border-0">Ticket Available:</td>
                                                        <td class="border-0">{{pack.ticket - (pack.bookings.reduce((total, value)=> total + value.ticket, 0))}}</td>
                                                    </tr>
                                                    <tr class="border-0">
                                                        <td class="border-0">Booking Collection Amount:</td>
                                                        <td class="border-0">${{pack.bookings.reduce((total, value)=> total + value.payments.reduce((subTotal, payment)=> subTotal + +payment.amount, 0), 0) | currency}}</td>
                                                    </tr>
                                                </td>
                                                <td class="align-middle">
                                                    <button type="button" class="btn btn-primary mb-3" @click="viewPackage(pack.slug)" v-tooltip.top-center="'Click to View Package'">
                                                        <client-only>
                                                            <icon icon="eye"></icon>
                                                        </client-only>
                                                    </button>
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
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Tour Running Package</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>{{dashAdmin.booking.tourRunning | number}}</h1>
                        </transition>
                        <button type="button" @click="adminTourRunningPackage">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </button>
                    </div>

                    <!-- Modal Start -->
                    <div class="modal fade" id="admin-tour-running-package" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Package Details</h5>
                                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
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
                                            <tbody>
                                                <tr class="text-center" v-for="pack in dashAdmin.runningPackages" :key="pack.id">
                                                    <td class="align-middle">{{pack.id}}</td>
                                                    <td class="align-middle">
                                                        <p class="pointer" @click="viewPackage(pack.slug)">
                                                            <img :data-src="assetURL + pack.thumbnail" :alt="pack.name" class="img-fluid mw-200" v-lazy-load />
                                                        </p>
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
                                                        <td class="border-0">{{pack.bookings.reduce((total, value)=> total + value.ticket, 0)}}</td>
                                                    </tr>
                                                    <tr class="border-0">
                                                        <td class="border-0">Full Payment:</td>
                                                        <td class="border-0">{{pack.bookings.reduce((total, value)=> total + (value.booking_type ? value.ticket : 0), 0)}}</td>
                                                    </tr>
                                                    <tr class="border-0">
                                                        <td class="border-0">Partial Payment:</td>
                                                        <td class="border-0">{{pack.bookings.reduce((total, value)=> total + (!value.booking_type ? value.ticket : 0), 0)}}</td>
                                                    </tr>
                                                    <tr class="border-0">
                                                        <td class="border-0">Ticket Available:</td>
                                                        <td class="border-0">{{pack.ticket - (pack.bookings.reduce((total, value)=> total + value.ticket, 0))}}</td>
                                                    </tr>
                                                    <tr class="border-0">
                                                        <td class="border-0">Booking Collection Amount:</td>
                                                        <td class="border-0">${{pack.bookings.reduce((total, value)=> total + value.payments.reduce((subTotal, payment)=> subTotal + +payment.amount, 0), 0) | currency}}</td>
                                                    </tr>
                                                </td>
                                                <td class="align-middle">
                                                    <button type="button" class="btn btn-primary mb-3" @click="viewPackage(pack.slug)" v-tooltip.top-center="'Click to View Package'">
                                                        <client-only>
                                                            <icon icon="eye"></icon>
                                                        </client-only>
                                                    </button>
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
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Pending Guide Request</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>{{dashAdmin.booking.guideRequest}}</h1>
                        </transition>
                        <nuxt-link :to="{name: 'dashboard-guide-request'}">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </nuxt-link>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Message & Question</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>{{dashAdmin.messages}}</h1>
                        </transition>
                        <nuxt-link :to="{name: 'dashboard-message-question'}">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </nuxt-link>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="dashboard-chart mt-5">
                        <h3 class="text-center mb-3">Last 30 Days Booking Record</h3>
                        <transition name="fade" mode="out-in">
                            <Loading-circle v-if="loading" />
                            <div v-else>
                                <client-only>
                                    <area-chart :data="dashAdmin.bookingChart" id="admin-booking-chart"></area-chart>
                                </client-only>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="dashboard-chart mt-5">
                        <h3 class="text-center">Destination Wise Available Package</h3>
                        <transition name="fade" mode="out-in">
                            <Loading-circle v-if="loading" />
                            <div v-else>
                                <client-only>
                                    <pie-chart :data="dashAdmin.destinationPackage" id="admin-package-chart"></pie-chart>
                                </client-only>
                            </div>
                        </transition>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="dashboard-chart mt-5 p-3">
                        <h3 class="text-center mb-3">Top 5 Guide</h3>
                        <transition name="fade" mode="out-in">
                            <Loading-circle v-if="loading" />
                            <div class="table-responsive" v-else>
                                <table class="table">
                                    <thead>
                                        <tr class="text-center">
                                            <th>Sl</th>
                                            <th>Name</th>
                                            <th>Package</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-center" v-for="(guide, key) in dashAdmin.topGuide" :key="guide.id">
                                            <td class="align-middle strong">{{key + 1}}</td>
                                            <td class="align-middle strong">
                                                <nuxt-link :to="{name: 'package-user-slug', params: {slug: guide.slug}}" class="color-black">
                                                    {{guide.name}}
                                                </nuxt-link>
                                            </td>
                                            <td class="align-middle strong">{{guide.packages_count}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-9" v-if="guide">
            <h2>Hello {{authUser.name}}</h2>
            <div class="row">
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Monthly Booking Quantity</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>{{dashGuide.booking.quantity}}</h1>
                        </transition>
                        <button type="button" @click="guideBookingDetails">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </button>
                    </div>

                    <!-- Modal Start -->
                    <div class="modal fade" id="guide-booking-details" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Booking Details</h5>
                                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr class="text-center">
                                                    <th>Sl</th>
                                                    <th>Date</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Ticket</th>
                                                    <th>Amount</th>
                                                    <th>Paid</th>
                                                    <th>Payment</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="text-center" v-for="(booking, key) in dashGuide.bookingDetails" :key="booking.id">
                                                    <td class="align-middle">{{key + 1}}</td>
                                                    <td class="align-middle">{{booking.created_at | normalDate}}</td>
                                                    <td class="align-middle">{{booking.name}}</td>
                                                    <td class="align-middle">{{booking.email}}</td>
                                                    <td class="align-middle">{{booking.phone}}</td>
                                                    <td class="align-middle">{{booking.ticket}}</td>
                                                    <td class="align-middle">${{booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price) | currency}}</td>
                                                    <td class="align-middle">${{booking.payments.reduce((total, payment)=> total + parseFloat(payment.amount), 0) | currency}}</td>
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
                                                    <td>
                                                        <button type="button" class="btn btn-primary" v-tooltip.top-center="'View Booking Details'" @click="bookingDetails(booking.id)">
                                                            <client-only>
                                                                <icon icon="eye"></icon>
                                                            </client-only>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="5" class="strong text-center">Total</td>
                                                    <td class="strong text-center">{{dashGuide.bookingDetails.reduce((total, booking) => total + booking.ticket, 0)}}</td>
                                                    <td class="strong text-center">${{dashGuide.bookingDetails.reduce((total, booking) => total + (booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price)), 0) | currency}}</td>
                                                    <td class="strong text-center">${{dashGuide.bookingDetails.reduce((total, booking) => total + booking.payments.reduce((subTotal, payment) => subTotal + parseFloat(payment.amount), 0), 0) | currency}}</td>
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
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Monthly Booking Amount</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>${{dashGuide.booking.amount | currency}}</h1>
                        </transition>
                        <button type="button" @click="guideBookingDetails">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </button>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Today Booking Quantity</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>{{dashGuide.booking.todayQuantity}}</h1>
                        </transition>
                        <button type="button" @click="guideTodayBookingDetails">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </button>
                    </div>

                    <!-- Modal Start -->
                    <div class="modal fade" id="guide-today-booking-details" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Today Booking Details</h5>
                                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr class="text-center">
                                                    <th>Sl</th>
                                                    <th>Date</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Ticket</th>
                                                    <th>Amount</th>
                                                    <th>Paid</th>
                                                    <th>Payment</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="text-center" v-for="(booking, key) in dashGuide.todayBookingDetails" :key="booking.id">
                                                    <td class="align-middle">{{key + 1}}</td>
                                                    <td class="align-middle">{{booking.created_at | normalDate}}</td>
                                                    <td class="align-middle">{{booking.name}}</td>
                                                    <td class="align-middle">{{booking.email}}</td>
                                                    <td class="align-middle">{{booking.phone}}</td>
                                                    <td class="align-middle">{{booking.ticket}}</td>
                                                    <td class="align-middle">${{booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price) | currency}}</td>
                                                    <td class="align-middle">${{booking.payments.reduce((total, payment)=> total + parseFloat(payment.amount), 0) | currency}}</td>
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
                                                    <td>
                                                        <button type="button" class="btn btn-primary" v-tooltip.top-center="'View Booking Details'" @click="bookingDetails(booking.id)">
                                                            <client-only>
                                                                <icon icon="eye"></icon>
                                                            </client-only>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="5" class="strong text-center">Total</td>
                                                    <td class="strong text-center">{{dashGuide.todayBookingDetails.reduce((total, booking) => total + booking.ticket, 0)}}</td>
                                                    <td class="strong text-center">${{dashGuide.todayBookingDetails.reduce((total, booking) => total + (booking.ticket * (booking.booking_type ? booking.discount == null ? booking.price : booking.discount : booking.price)), 0) | currency}}</td>
                                                    <td class="strong text-center">${{dashGuide.todayBookingDetails.reduce((total, booking) => total + booking.payments.reduce((subTotal, payment) => subTotal + parseFloat(payment.amount), 0), 0) | currency}}</td>
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
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Today Booking Amount</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>${{dashGuide.booking.todayAmount | currency}}</h1>
                        </transition>
                        <button type="button" @click="guideTodayBookingDetails">
                            See Details
                            <client-only>
                                <icon icon="angle-right"></icon>
                            </client-only>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="dashboard-chart mt-5">
                        <h3 class="text-center mb-3">Last 30 Days Booking Record</h3>
                        <transition name="fade" mode="out-in">
                            <Loading-circle v-if="loading" />
                            <div v-else>
                                <client-only>
                                    <area-chart :data="dashGuide.bookingChart" id="guide-booking-chart"></area-chart>
                                </client-only>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="dashboard-table mt-5 p-3">
                        <h3 class="text-center mb-3">Available Package Details</h3>
                        <transition name="fade" mode="out-in">
                            <Loading-circle v-if="loading" />
                            <div class="table-responsive" v-else>
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
                                    <tbody>
                                        <tr class="text-center" v-for="pack in dashGuide.packages" :key="pack.id">
                                            <td class="align-middle">{{pack.id}}</td>
                                            <td class="align-middle">
                                                <p class="pointer" @click="viewPackage(pack.slug)">
                                                    <img :data-src="assetURL + pack.thumbnail" :alt="pack.name" class="img-fluid mw-200" v-lazy-load />
                                                </p>
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
                                                <td class="border-0">{{pack.bookings.reduce((total, value)=> total + value.ticket, 0)}}</td>
                                            </tr>
                                            <tr class="border-0">
                                                <td class="border-0">Full Payment:</td>
                                                <td class="border-0">{{pack.bookings.reduce((total, value)=> total + (value.booking_type ? value.ticket : 0), 0)}}</td>
                                            </tr>
                                            <tr class="border-0">
                                                <td class="border-0">Partial Payment:</td>
                                                <td class="border-0">{{pack.bookings.reduce((total, value)=> total + (!value.booking_type ? value.ticket : 0), 0)}}</td>
                                            </tr>
                                            <tr class="border-0">
                                                <td class="border-0">Ticket Available:</td>
                                                <td class="border-0">{{pack.ticket - (pack.bookings.reduce((total, value)=> total + value.ticket, 0))}}</td>
                                            </tr>
                                            <tr class="border-0">
                                                <td class="border-0">Booking Collection Amount:</td>
                                                <td class="border-0">${{pack.bookings.reduce((total, value)=> total + value.payments.reduce((subTotal, payment)=> subTotal + +payment.amount, 0), 0) | currency}}</td>
                                            </tr>
                                        </td>
                                        <td class="align-middle">
                                            <button type="button" class="btn btn-primary mb-3" @click="viewPackage(pack.slug)" v-tooltip.top-center="'Click to View Package'">
                                                <client-only>
                                                    <icon icon="eye"></icon>
                                                </client-only>
                                            </button>
                                            <button type="button" class="btn btn-secondary mb-3" @click="bookingList(pack.bookings)" v-tooltip.top-center="'Click to Show Booking List'">
                                                <client-only>
                                                    <icon icon="file-alt"></icon>
                                                </client-only>
                                            </button>
                                        </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </transition>
                    </div>
                    <!-- Modal Start -->
                    <div class="modal fade" id="guide-booking-list" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Booking Details</h5>
                                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
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
                                            <tbody v-if="dashGuide.bookingLists.length > 0">
                                                <tr class="text-center" v-for="(booking, key) in dashGuide.bookingLists" :key="booking.id">
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
                                            <tbody v-else>
                                                <tr>
                                                    <td colspan="6">
                                                        <h1 class="text-center">This package has no booking</h1>
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
            </div>
        </div>
        <div class="col-lg-9" v-if="user">
            <h2>Hello {{authUser.name}}</h2>
            <div class="row">
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Total Booking Quantity</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>{{dashUser.booking.totalQuantity}}</h1>
                        </transition>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Total Booking Amount</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>${{dashUser.booking.totalAmount | currency}}</h1>
                        </transition>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Monthly Booking Quantity</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>{{dashUser.booking.monthlyQuantity}}</h1>
                        </transition>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-3">
                    <div class="dashboard-info">
                        <p>Monthly Booking Amount</p>
                        <transition name="fade" mode="out-in">
                            <Loading-circle-small v-if="loading" />
                            <h1 v-else>${{dashUser.booking.monthlyAmount | currency}}</h1>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="dashboard-chart mt-5">
                        <h3 class="text-center mb-3">Last 30 Days Booking Record</h3>
                        <transition name="fade" mode="out-in">
                            <Loading-circle v-if="loading" />
                            <div v-else>
                                <client-only>
                                    <area-chart :data="dashUser.bookingChart" id="user-booking-chart"></area-chart>
                                </client-only>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="dashboard-table mt-5 p-3">
                        <h3 class="text-center mb-3">Last 30 Days Booking Details</h3>
                        <transition name="fade" mode="out-in">
                            <Loading-circle v-if="loading" />
                            <div class="table-responsive" v-else>
                                <table class="table">
                                    <thead>
                                        <tr class="text-center">
                                            <th>Package Info</th>
                                            <th>Booking Info</th>
                                            <th>Payment Info</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="text-center" v-for="booking in dashUser.bookings" :key="booking.id">
                                            <td class="align-middle">
                                                <nuxt-link :to="{name: 'package-slug', params: {slug: booking.package.slug}}">
                                                    <img :data-src="assetURL + booking.package.thumbnail" :alt="booking.package.name" class="img-fluid mw-200" v-lazy-load />
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
                                            <nuxt-link :to="{name: 'booking-confirm-id', params: {id: booking.id}}" class="btn btn-primary px-3" v-tooltip.top-center="'Click to view booking details'">
                                                <client-only>
                                                    <icon icon="eye"></icon>
                                                </client-only>
                                            </nuxt-link>
                                        </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios"
export default {
    head() {
        return {
            title: "Dashboard - " + this.appName,
        };
    },

    data() {
        return {
            click: true,
            loading: true,
            dashAdmin: {
                booking: {
                    quantity: "",
                    amount: "",
                    package: "",
                    tourRunning: "",
                    guideRequest: "",
                    todayQuantity: "",
                    todayAmount: "",
                },
                bookingChart: {},
                destinationPackage: [],
                topGuide: [],
                bookingDetails: [],
                todayBookingDetails: [],
                packages: [],
                runningPackages: [],
                message: "",
            },
            dashGuide: {
                booking: {
                    quantity: "",
                    amount: "",
                    todayQuantity: "",
                    todayAmount: "",
                },
                bookingChart: {},
                bookingDetails: [],
                todayBookingDetails: [],
                packages: [],
                bookingLists: [],
            },
            dashUser: {
                booking: {
                    totalQuantity: "",
                    totalAmount: "",
                    monthlyQuantity: "",
                    monthlyAmount: "",
                },
                bookingChart: {},
                bookings: [],
            },
        };
    },

    methods: {
        // Get Admin Dashboard Data
        adminDashboard() {
            this.$axios.get("admin-dashboard").then(
                (response) => {
                    this.dashAdmin.booking.quantity = response.data.bookingQuantity;
                    this.dashAdmin.booking.amount = response.data.bookingAmount;
                    this.dashAdmin.booking.package = response.data.package;
                    this.dashAdmin.booking.tourRunning = response.data.tourRunning;
                    this.dashAdmin.booking.guideRequest = response.data.guideRequest;
                    this.dashAdmin.booking.todayQuantity = response.data.todayQuantity;
                    this.dashAdmin.booking.todayAmount = response.data.todayAmount;
                    response.data.bookingChart.forEach(booking => {
                        this.dashAdmin.bookingChart[booking.date] = booking.ticket;
                    });
                    response.data.destinationPackage.forEach(destination => {
                        this.dashAdmin.destinationPackage.push([destination.name, destination.running_packages_count]);
                    });
                    this.dashAdmin.topGuide = response.data.topGuide;
                    this.dashAdmin.messages = response.data.messages;
                    this.loading = false;
                },
                (error) => {
                    $nuxt.$emit("error", error);
                },
            )
        },

        // Get Admin Booking Details
        adminBookingDetails() {
            if (this.click) {
                this.click = false
                $("#admin-booking-details").modal("show");
                this.$axios.get("admin-booking-details").then(
                    (response) => {
                        this.dashAdmin.bookingDetails = response.data.bookings;
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // Get Admin Booking Details
        adminTodayBookingDetails() {
            if (this.click) {
                this.click = false
                $("#admin-today-booking-details").modal("show");
                this.$axios.get("admin-today-booking-details").then(
                    (response) => {
                        this.dashAdmin.todayBookingDetails = response.data.bookings;
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // View Booking Details
        bookingDetails(id) {
            $("#admin-booking-details").modal("hide");
            this.$router.push("/booking-confirm/" + id);
        },

        // Get Admin Available Package Details
        adminAvailablePackage() {
            if (this.click) {
                this.click = false
                $("#admin-available-package").modal("show");
                this.$axios.get("admin-available-package").then(
                    (response) => {
                        this.dashAdmin.packages = response.data.packages;
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // Get Admin Tour running Package Details
        adminTourRunningPackage() {
            if (this.click) {
                this.click = false
                $("#admin-tour-running-package").modal("show");
                this.$axios.get("admin-tour-running-package").then(
                    (response) => {
                        this.dashAdmin.runningPackages = response.data.runningPackages;
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // View Active Package
        viewPackage(slug) {
            $("#admin-available-package").modal("hide");
            this.$router.push("/package/" + slug);
        },

        // Get Guide Dashboard Data
        guideDashboard() {
            this.$axios.get("guide-dashboard").then(
                (response) => {
                    this.dashGuide.booking.quantity = response.data.bookingQuantity;
                    this.dashGuide.booking.amount = response.data.bookingAmount;
                    this.dashGuide.booking.todayQuantity = response.data.todayQuantity;
                    this.dashGuide.booking.todayAmount = response.data.todayAmount;
                    response.data.bookingChart.forEach(booking => {
                        this.dashGuide.bookingChart[booking.date] = booking.ticket;
                    });
                    this.dashGuide.packages = response.data.packages;
                    this.loading = false;
                },
                (error) => {
                    $nuxt.$emit("error", error);
                },
            )
        },

        // Get Admin Booking Details
        guideBookingDetails() {
            if (this.click) {
                this.click = false
                $("#guide-booking-details").modal("show");
                this.$axios.get("guide-booking-details").then(
                    (response) => {
                        this.dashGuide.bookingDetails = response.data.bookings;
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // Get Guide Booking Details
        guideTodayBookingDetails() {
            if (this.click) {
                this.click = false
                $("#guide-today-booking-details").modal("show");
                this.$axios.get("guide-today-booking-details").then(
                    (response) => {
                        this.dashGuide.todayBookingDetails = response.data.bookings;
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        //show Booking List
        bookingList(bookings) {
            this.dashGuide.bookingLists = bookings;
            $("#guide-booking-list").modal("show");
        },

        // Get Guide Dashboard Data
        userDashboard() {
            this.$axios.get("user-dashboard").then(
                (response) => {
                    this.dashUser.booking.totalQuantity = response.data.totalQuantity;
                    this.dashUser.booking.totalAmount = response.data.totalAmount;
                    this.dashUser.booking.monthlyQuantity = response.data.monthlyQuantity;
                    this.dashUser.booking.monthlyAmount = response.data.monthlyAmount;
                    this.dashUser.bookings = response.data.bookings;
                    response.data.bookingChart.forEach(booking => {
                        this.dashUser.bookingChart[booking.date] = booking.ticket;
                    });
                    this.loading = false;
                },
                (error) => {
                    $nuxt.$emit("error", error);
                },
            )
        },
    },

    computed: {
        authUser() {
            return this.$store.getters.auth_user;
        }
    },

    created() {
        if (this.authCheck) {
            if (this.admin) {
                this.adminDashboard();
            } else if (this.guide) {
                this.guideDashboard();
            } else if (this.user) {
                this.userDashboard();
            }
        } else {
            this.$router.push("/login");
        }
    },
};
</script>
