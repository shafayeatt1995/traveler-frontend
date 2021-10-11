<template>
<!-- Checkout Success area start-->
<div class="checkout-success" v-if="authCheck && booking !== null">
    <div class="container" v-if="!loading">
        <div class="checkout-success-body-top mt-5">
            <client-only>
                <icon :icon="['far', 'check-circle']"></icon>
            </client-only>
            <h1>Thank You</h1>
            <h4 v-if="booking.package.status">Tour Already Complete</h4>
            <h4 v-else-if="booking.package.status == null">Tour Already Running</h4>
            <h4 v-else>Your Booking is Confirmed<span v-if="booking.ticket * bookingAmount > booking.payments.reduce((total, payment) => total + payment.amount, 0)">. Please Pay Full Amount Within {{booking.package.start_date | normalDate}}</span></h4>
            <h4>Booking Number #{{booking.id}}</h4>
            <ul>
                <li>
                    <p>Name</p>
                    <span>{{booking.name}}</span>
                </li>
                <li>
                    <p>Email</p>
                    <span>{{booking.email}}</span>
                </li>
                <li>
                    <p>Phone</p>
                    <span>{{booking.phone}}</span>
                </li>
                <li>
                    <p>Address</p>
                    <span>{{booking.address}}</span>
                </li>
            </ul>
        </div>
        <div class="checkout-success-body">
            <div class="row">
                <div class="offset-lg-1 col-lg-10">
                    <div class="table-responsive">
                        <table class="table">
                            <thead class="thead-light text-center">
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Package Name</th>
                                    <th scope="col">Payment Method</th>
                                    <th scope="col">Payment Date</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="payment in booking.payments" :key="payment.id">
                                    <td class="text-center">
                                        <nuxt-link :to="{name: 'package-slug', params: {slug: payment.package.slug}}">
                                            <img :data-src="assetURL + payment.package.thumbnail" :alt="payment.package.name" class="img-fluid text-center mw-200" v-lazy-load />
                                        </nuxt-link>
                                    </td>
                                    <td class="text-left align-middle">
                                        <nuxt-link :to="{name: 'package-slug', params: {slug: payment.package.slug}}" class="color-black">{{payment.package.name}}</nuxt-link>
                                    </td>
                                    <td class="text-center align-middle">{{payment.payment_type == 'paypal' ? 'Paypal' : 'Card'}}</td>
                                    <td class="text-center align-middle">{{payment.created_at | normalDate}}</td>
                                    <td class="text-center align-middle">${{payment.amount}}</td>
                                </tr>
                                <tr>
                                    <td colspan="5" class="text-left order-success-ammount">
                                        <ul>
                                            <li>
                                                <p>Total Paid Amount: <span>${{booking.payments.reduce((total, payment) => total + +payment.amount, 0) | currency}}</span></p>
                                            </li>
                                            <li>
                                                <p>Total Payable Amount: <span>${{booking.ticket * bookingAmount | currency}}</span></p>
                                            </li>
                                            <li>
                                                <p>Discount: <span>${{(booking.booking_type ? booking.discount == null ? '0': booking.price - booking.discount : '0') * booking.ticket | currency}}</span></p>
                                            </li>
                                            <hr>
                                            <li class="shopping-cart-total">
                                                <p>Total Amount: <span>${{booking.ticket * booking.price | currency}}</span></p>
                                            </li>
                                            <li class="shopping-cart-total">
                                                <p>Discrepancy: <span>${{(booking.ticket * bookingAmount) - booking.payments.reduce((total, payment) => total + +payment.amount, 0) | currency}}</span></p>
                                            </li>
                                            <hr>
                                            <li>
                                                <h4>Payment Status:
                                                    <span class="text-danger" v-if="booking.ticket * bookingAmount > booking.payments.reduce((total, payment) => total + payment.amount, 0)">
                                                        <client-only>
                                                            <icon icon="times"></icon>
                                                        </client-only>
                                                        ${{(booking.ticket * bookingAmount) - booking.payments.reduce((total, payment) => total + payment.amount, 0) | currency}} Due
                                                    </span>
                                                    <span class="text-success" v-else>
                                                        <client-only>
                                                            <icon :icon="['far', 'check-circle']"></icon>
                                                        </client-only>
                                                        Payment Done
                                                    </span>
                                                </h4>
                                            </li>

                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="checkout-success-body-top mt-2">
                    <ul>
                        <li>
                            <p>Booking Date</p>
                            <span>{{booking.created_at | normalDate}}</span>
                        </li>
                        <li>
                            <p>Ticket Quantity</p>
                            <span>{{booking.ticket}}</span>
                        </li>
                        <li>
                            <p>Total Ammount</p>
                            <span>${{booking.ticket * bookingAmount | currency}}</span>
                        </li>
                        <li>
                            <p>Payment Method</p>
                            <span>{{booking.payments.some((payment) => payment.payment_type == 'paypal') && booking.payments.some((payment) => payment.payment_type == 'stripe') ? 'Paypal / Card' : booking.payments.some((payment) => payment.payment_type == 'paypal') ? 'Paypal' : 'Card'}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="checkbox-success-cta">
                <nuxt-link :to="{name: 'index'}">Back To Home</nuxt-link>
                <button type="button" v-if="booking.package.status == false ? booking.ticket * bookingAmount > booking.payments.reduce((total, payment) => total + payment.amount, 0) : false" @click="setPayment((booking.ticket * bookingAmount) - booking.payments.reduce((total, payment) => total + payment.amount, 0))">Pay Due Amount</button>
            </div>
        </div>
        <transition name="slide" mode="out-in">
            <form class="row mt-3" v-if="payment" @submit.prevent="!submitLoading ? paymentSubmit() : ''">
                <div class="offset-lg-1 col-lg-10">
                    <div class="my-form">
                        <label>Select A Payment Option</label>
                        <select v-model="form.paymentType" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'" @change.once="paypalIntegration()">
                            <option value="">Select A Payment Option</option>
                            <option value="paypal">PayPal</option>
                            <option value="stripe">Card Payment</option>
                        </select>
                    </div>
                </div>
                <div class="offset-lg-1 col-lg-10">
                    <transition-group name="slide" mode="out-in">
                        <div class="col-lg-12 text-center" v-show="form.paymentType == 'paypal'" key="1">
                            <div id="smart-button-container text-center">
                                <div ref="paypal"></div>
                            </div>
                            <transition name="slide" mode="out-in">
                                <h3 v-if="form.paymentMessage">Payment Successful</h3>
                            </transition>
                        </div>
                        <div class="col-lg-12" v-show="form.paymentType == 'stripe'" key="2">
                            <div class="row">
                                <div class="col-lg-12 mb-3">
                                    <label for="card-number">Card Number</label>
                                    <input type="number" id="card-number" class="form-control" placeholder="Type Your Card Number" v-model="form.card.number">
                                </div>
                                <div class="col-lg-6">
                                    <label for="cvc">CVC</label>
                                    <input type="number" id="cvc" class="form-control" placeholder="CVC Number" v-model="form.card.cvc">
                                </div>
                                <div class="col-lg-6">
                                    <label for="card-date">Expire Date</label>
                                    <date-picker v-model="form.card.date" value-type="YYYY-MM" type="month" format="YYYY-MM" placeholder="Expire Date" class="w-auto date-form"></date-picker>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </div>
                <div class="offset-lg-1 col-lg-10 text-center">
                    <transition name="slide" mode="out-in">
                        <h2 v-if="paypalPayment">Paypal Payment Successfull</h2>
                    </transition>
                    <button type="submit" class="mt-3 payment-submit-btn" :class="form.paymentType == 'paypal' ? paypalPayment ? '': 'disabled' : ''" :disabled="form.paymentType == 'paypal' ? !paypalPayment : false">
                        <transition name="fade" mode="out-in">
                            <Loading v-if="submitLoading" />
                            <span v-else>Submit Due Amount</span>
                        </transition>
                    </button>
                </div>
            </form>
        </transition>
    </div>
</div>
<Error v-else />
<!-- Checkout Success area end-->
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
    components: { DatePicker },

    head() {
        return {
            title: "Booking Confirm - " + this.appName,
            link: [{ rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }],
            script: [{
                src: this.paypal,
            }],
        };
    },

    data() {
        return {
            click: true,
            booking: {},
            loading: true,
            payment: false,
            paypalPayment: false,
            submitLoading: false,
            form: {
                packageId: "",
                bookingId: "",
                paymentType: "",
                paymentMessage: false,
                amount: "",
                paypal: {
                    email: "",
                    transaction: "",
                    amount: "",
                },
                card: {
                    number: "",
                    cvc: "",
                    date: "",
                },
            },
        }
    },

    methods: {
        // Get Booking Info
        getBooking() {
            this.$axios.get("get-booking/" + this.$route.params.id).then(
                (response) => {
                    this.booking = response.data.booking;
                    this.form.packageId = response.data.booking.package.id;
                    this.form.bookingId = response.data.booking.id;
                    this.loading = false;
                },
                (error) => {
                    this.loading = false;
                }
            )
        },

        // Payment setup
        setPayment(due) {
            this.form.amount = due;
            this.payment = !this.payment;
        },

        // Paypal Payment Integration
        paypalIntegration() {
            if (this.authCheck) {
                let price = (this.booking.ticket * (this.booking.booking_type ? this.booking.discount == null ? this.booking.price : this.booking.discount : this.booking.price)) - this.booking.payments.reduce((total, payment) => total + payment.amount, 0);
                window.paypal.Buttons({
                    style: {
                        shape: "rect",
                        color: "gold",
                        layout: "horizontal",
                        label: "pay",
                    },
                    createOrder(data, actions) {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: "USD",
                                    value: price,
                                }
                            }]
                        });
                    },
                    async onApprove(data, actions) {
                        await actions.order.capture().then(
                            (response) => {
                                $nuxt.$emit("triggerPaypal", response);
                                $nuxt.$emit("success", "Payment Successfully");
                            },
                        )
                    },
                    onError(err) {
                        $nuxt.$emit("customError", "Payment Failed. Please Try Again");
                    }
                }).render(this.$refs.paypal);
            }
        },

        //Set Paypal Payment Info
        setPaypalPayment(order) {
            this.form.paypal.email = order.payer.email_address;
            this.form.paypal.transaction = order.id;
            this.form.paypal.amount = order.purchase_units[0].amount.value;
            this.paypalPayment = true;
        },

        //Submit Payment
        paymentSubmit() {
            this.submitLoading = true;
            if (this.click) {
                this.click = false;
                this.$axios.post("partial-payment", this.form).then(
                    (response) => {
                        this.submitLoading = false;
                        this.payment = false;
                        this.form.paypal.email = "";
                        this.form.paypal.transaction = "";
                        this.form.paypal.amount = "";
                        this.form.card.number = "";
                        this.form.card.cvc = "";
                        this.form.card.date = "";
                        $nuxt.$emit("triggerBooking");
                        $nuxt.$emit("success", "Your Payment Successfully Complete");
                        this.click = true;
                    },
                    (error) => {
                        this.submitLoading = false;
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },
    },

    computed: {
        // Calculate Booking Price
        bookingAmount() {
            return this.booking.booking_type ? this.booking.discount == null ? this.booking.price : this.booking.discount : this.booking.price;
        }
    },

    created() {
        if (this.authCheck) {
            this.getBooking();

            this.$nuxt.$on("triggerPaypal", (order) => {
                this.setPaypalPayment(order);
            });

            this.$nuxt.$on("triggerBooking", () => {
                this.getBooking();
            });
        } else {
            this.$router.push("/login");
        }
    },
}
</script>
