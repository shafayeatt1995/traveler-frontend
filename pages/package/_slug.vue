<template>
<div class="package-details-wrapper pt-40" v-if="pack !== null">
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <div class="package-details">
                    <client-only>
                        <!-- important to add no-ssr-->
                        <carousel :items="1" :autoplay="false" :nav="false">
                            <img :data-src="assetURL + image" v-for="(image, key) in JSON.parse(pack.images)" :key="key" v-lazy-load />
                        </carousel>
                    </client-only>
                    <div class="package-header">
                        <div class="package-title">
                            <h3>{{pack.name}}</h3>
                            <strong>
                                <client-only>
                                    <icon icon="map-marker-alt"></icon>
                                </client-only>
                                {{pack.address}}
                            </strong>
                        </div>
                        <div class="pd-status text-center">
                            <p>{{pack.status == true ? 'Tour Complete' : pack.status == false ? 'Tour Running' : 'Booking Available' }}</p>
                            <p v-if="pack.discount === null">${{pack.price | currency}} / Per Person</p>
                            <p v-else><del>${{pack.price |currency}}</del> ${{pack.discount | currency}} / Per Person</p>
                        </div>
                    </div>
                    <div class="p-short-info">
                        <div class="single-info">
                            <client-only>
                                <icon icon="clock"></icon>
                            </client-only>
                            <div class="info-texts">
                                <strong>Duration</strong>
                                <p>{{pack.duration_day + (pack.duration_day > 1 ? ' Days' : ' Day')}} / {{pack.duration_night + (pack.duration_night > 1 ? ' Nights' : ' Night')}}</p>
                            </div>
                        </div>
                        <div class="single-info">
                            <client-only>
                                <icon icon="skating"></icon>
                            </client-only>
                            <div class="info-texts">
                                <strong>Tour Type</strong>
                                <p>{{pack.category.name}}</p>
                            </div>
                        </div>
                        <div class="single-info">
                            <client-only>
                                <icon icon="users"></icon>
                            </client-only>
                            <div class="info-texts">
                                <strong>Group Size</strong>
                                <p>{{pack.group_size}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="package-tab">
                        <ul class="nav nav-pills justify-content-center">
                            <li class="nav-item">
                                <button class="nav-link" :class="activeTab == 'info' ? 'active': ''" type="button" @click="activeTab = 'info'">
                                    <client-only>
                                        <icon icon="info"></icon>
                                    </client-only>
                                    Information
                                </button>
                            </li>
                            <li class="nav-item">
                                <button class="nav-link" :class="activeTab == 'plan' ? 'active': ''" type="button" @click="activeTab = 'plan'">
                                    <client-only>
                                        <icon icon="clipboard"></icon>
                                    </client-only>
                                    Travel Plan
                                </button>
                            </li>
                        </ul>
                        <div class="p-tab-content">
                            <transition name="fade" mode="out-in">
                                <div class="tab-pane" key="1" v-if="activeTab == 'info'">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="tab-content">
                                                <div class="p-overview">
                                                    <h5>Overview</h5>
                                                    <p>{{pack.overview}}</p>
                                                </div>

                                                <div class="p-details-table mt-5">
                                                    <table class="table caption-top">
                                                        <tbody>
                                                            <tr>
                                                                <td>Destination</td>
                                                                <td>{{pack.address}}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Departure Time</td>
                                                                <td>{{pack.start_date | fullDate}}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Return Time</td>
                                                                <td>{{pack.return_date | fullDate}}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Included</td>
                                                                <td>
                                                                    <ul class="table-list-allow">
                                                                        <li v-for="(include, key) in JSON.parse(pack.included)" :key="key">
                                                                            <client-only>
                                                                                <icon icon="check"></icon>
                                                                            </client-only>
                                                                            {{include}}
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Excluded</td>
                                                                <td>
                                                                    <ul class="table-list-disallow">
                                                                        <li v-for="(exclude, key) in JSON.parse(pack.excluded)" :key="key">
                                                                            <client-only>
                                                                                <icon icon="times"></icon>
                                                                            </client-only>
                                                                            {{exclude}}
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Vehicle</td>
                                                                <td class="table-bottom">
                                                                    {{pack.vehicle}}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class="p-rationg">
                                                    <h5>Question</h5>
                                                </div>
                                                <div class="p-review">
                                                    <ul v-if="questions.data.length > 0">
                                                        <li class="p-review-card" v-for="question in questions.data" :key="question.id">
                                                            <div class="p-review-info">
                                                                <div class="p-reviewr-img">
                                                                    <img :data-src="assetURL + question.user.image" :alt="question.user.name" v-lazy-load />
                                                                </div>
                                                                <div class="p-reviewer-info">
                                                                    <strong>
                                                                        {{question.user.name}}
                                                                        <span class="text-danger small pointer mx-3 review-delete" v-if="question.user_id == userId" @click="deleteQuestion(question.id)">
                                                                            <client-only>
                                                                                <icon icon="trash-alt"></icon>
                                                                            </client-only>
                                                                        </span>
                                                                    </strong>
                                                                    <p>{{question.created_at | date}}</p>
                                                                </div>
                                                            </div>
                                                            <div class="p-review-texts">
                                                                <p>{{fullMessage == question.id ? question.message : question.message.substring(0, 220)}}<span class="strong pointer" v-if="question.message.length > 220" @click="fullMessage = fullMessage == question.id ? '' : question.id"> ... {{fullMessage == question.id ? 'Less Message' : 'See Full Message'}}</span></p>
                                                            </div>
                                                            <a class="r-reply-btn pointer" @click.prevent="replayForm(question.id)" v-if="pack.user_id == userId || question.user_id == userId">
                                                                <client-only>
                                                                    <icon icon='reply'></icon>
                                                                </client-only>
                                                                Reply
                                                            </a>
                                                            <transition name="slide" mode="out-in">
                                                                <form v-if="replayQuestion.questionId == question.id" @submit.prevent="createReplay">
                                                                    <div class="form-group">
                                                                        <input type="text" class="form-control mb-2" placeholder="Type your message" v-model="replayQuestion.message">
                                                                        <div class="d-block text-end">
                                                                            <button class="btn btn-danger" type="button" @click="replayForm(question.id)">Close</button>
                                                                            <button class="btn btn-primary" type="submit">Submit</button>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </transition>
                                                            <ul class="ml-5 mt-5">
                                                                <li class="p-review-card" v-for="(replay, key) in JSON.parse(question.replay)" :key="key">
                                                                    <div class="p-review-info align-items-center">
                                                                        <div class="p-reviewr-img text-center">
                                                                            <img :data-src="assetURL + question.user.image" :alt="question.user.name" v-if="question.user_id == replay.user_id" v-lazy-load />
                                                                            <client-only>
                                                                                <icon icon="user-circle" v-if="question.user_id !== replay.user_id"></icon>
                                                                            </client-only>
                                                                        </div>
                                                                        <div class="p-reviewer-info">
                                                                            <strong>
                                                                                {{replay.user_name}}
                                                                                <span class="text-danger small pointer mx-3 review-delete" v-if="replay.user_id == userId" @click="deleteReplay(question.id, key)">
                                                                                    <client-only>
                                                                                        <icon icon="trash-alt"></icon>
                                                                                    </client-only>
                                                                                </span>
                                                                            </strong>
                                                                            <p>{{replay.created_at | date}}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="p-review-texts">
                                                                        <p>{{fullReplay == replay.created_at ? replay.message : replay.message.substring(0, 220)}}<span class="strong pointer" v-if="replay.message.length > 220" @click="fullReplay = fullReplay == replay.created_at ? '' : replay.created_at"> ... {{fullReplay == replay.created_at ? 'Less Message' : 'See Full Message'}}</span></p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <hr>
                                                        </li>
                                                    </ul>
                                                    <ul class="mb-5" v-else>
                                                        <li class="text-center">
                                                            <h1>No Question</h1>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <pagination :data="questions" @pagination-change-page="getResults" class="justify-content-center mb-5 f-pagination"></pagination>
                                                <div class="p-review-input" v-if="authCheck">
                                                    <form @submit.prevent="createQuestion">
                                                        <h5>Ask Your Question</h5>
                                                        <div class="row my-form">
                                                            <div class="col-lg-12">
                                                                <textarea class="form-control" cols="30" rows="4" placeholder="Type Your Question" v-model="question"></textarea>
                                                            </div>

                                                            <div class="col-lg-12">
                                                                <input type="submit" value="Submit Now" class="float-end" />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <div v-else>
                                                    <h3 class="text-center">Please <nuxt-link :to="{name: 'login'}" class="text-primary">Login</nuxt-link> for ask a question</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" key="2" v-else>
                                    <div class="tab-content-2">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="p-timeline-overview">
                                                    <h5 class="strong mb-3">Overview</h5>
                                                    <p>{{pack.overview}}</p>
                                                </div>
                                                <ul class="p-timeline">
                                                    <li v-for="(plan, key) in JSON.parse(pack.tour_plan)" :key="key">
                                                        <div class="timeline-index">
                                                            <div class="index-circle">
                                                                <h5>{{key + 1}}</h5>
                                                            </div>
                                                        </div>
                                                        <div class="timeline-content">
                                                            <h5>{{plan.title}}</h5>
                                                            <strong>{{plan.time}}</strong>
                                                            <p>{{plan.description}}</p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="package-sidebar">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="p-sidebar-form">
                                <h3 class="strong text-center" v-if="pack.status">Tour Already Complete</h3>
                                <h3 class="strong text-center" v-else-if="pack.status == null">Tour Already Running</h3>
                                <form @submit.prevent="checking ? !submitLoading ? submitBooking(): '' : checkBooking()" v-else-if="pack.ticket > bookingsCount">
                                    <h5 class="package-d-head text-center">Book Your Ticket <span class="small d-block fw-normal">{{pack.ticket -  bookingsCount}} {{pack.ticket -  bookingsCount > 1 ? 'Tickets' : 'Ticket'}} Available</span></h5>
                                    <transition-group :name="checking ? 'slideLeft' : 'slideRight'" mode="out-in">
                                        <div class="my-form" v-if="checking" key="1">
                                            <div class="row" v-if="authCheck">
                                                <div class="col-lg-12">
                                                    <label>Select A Payment Option</label>
                                                    <select v-model="form.paymentType" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'" @change.once="paypalStatus ? paypalIntegration():''">
                                                        <option value="">Select A Payment Option</option>
                                                        <option value="paypal" v-if="paypalStatus">PayPal</option>
                                                        <option value="stripe" v-if="stripeStatus">Card Payment</option>
                                                    </select>
                                                </div>
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
                                                            <div class="col-lg-12">
                                                                <label for="card-number">Card Number</label>
                                                                <input type="number" id="card-number" placeholder="Type Your Card Number" v-model="form.card.number">
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <label for="cvc">CVC</label>
                                                                <input type="number" id="cvc" placeholder="CVC Number" v-model="form.card.cvc">
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <label for="card-date">Expire Date</label>
                                                                <date-picker v-model="form.card.date" value-type="YYYY-MM" type="month" format="YYYY-MM" placeholder="Expire Date" class="w-auto"></date-picker>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </transition-group>
                                                <div class="col-lg-6">
                                                    <button type="button" @click="checking = !checking, form.payment = ''">
                                                        <client-only>
                                                            <icon icon="arrow-left"></icon>
                                                        </client-only>
                                                        Back
                                                    </button>
                                                </div>
                                                <div class="col-lg-6">
                                                    <button type="submit" :class="submitDisable || form.paymentMessage == false && form.paymentType == 'paypal' ? 'disabled' : ''" :disabled="submitDisable || form.paymentMessage == false && form.paymentType == 'paypal'">
                                                        <transition name="fade" mode="out-in">
                                                            <Loading v-if="submitLoading" />
                                                            <span v-else>Book Now</span>
                                                        </transition>
                                                    </button>
                                                </div>
                                            </div>
                                            <div v-else>
                                                <h3>Please <span>
                                                        <nuxt-link :to="{name: 'login'}" class="text-success strong">Login</nuxt-link>
                                                    </span> or <span>
                                                        <nuxt-link :to="{name: 'register'}" class="text-success strong">Register</nuxt-link>
                                                    </span> For Booking Your Ticket</h3>
                                            </div>
                                        </div>
                                        <div class="row my-form" key="2" v-else>
                                            <div class="col-lg-12">
                                                <label for="name">Full Name</label>
                                                <input type="text" id="name" placeholder="Type Your Full Name" v-model="form.name">
                                            </div>
                                            <div class="col-lg-12">
                                                <label for="email">Email</label>
                                                <input type="email" id="email" placeholder="Type Your Email" v-model="form.email">
                                            </div>
                                            <div class="col-lg-12">
                                                <label for="phone">Phone Number</label>
                                                <input type="tel" id="phone" placeholder="Type Your Phone Number" v-model="form.phone">
                                            </div>
                                            <div class="col-lg-12">
                                                <label for="address">Address</label>
                                                <input type="text" id="address" placeholder="Type Your Address" v-model="form.address">
                                            </div>
                                            <div class="col-lg-12">
                                                <label>Ticket Quantity</label>
                                                <p class="ticket-count text-center">
                                                    <span @click="form.ticket > 1 ? form.ticket -- : ''" :class="form.ticket > 1 ? '':'disabled'">-</span>
                                                    {{form.ticket}}
                                                    <span @click="(pack.ticket -  bookingsCount) > form.ticket ?  form.ticket++ : ''" :class="(pack.ticket -  bookingsCount) > form.ticket ?  '' : 'disabled'">+</span>
                                                </p>
                                            </div>
                                            <div class="col-lg-12">
                                                <label for="booking">Select A Booking Option</label>
                                                <select v-model="form.payment" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'" id="booking" @change="changeBooking">
                                                    <option value="">Select A Booking Option</option>
                                                    <option value="partial">Partial Payment Booking</option>
                                                    <option value="full">Full Payment Booking</option>
                                                </select>
                                            </div>
                                            <transition name="slide" mode="out-in">
                                                <div class="col-lg-12" v-if="form.payment == 'partial'" key="1">
                                                    <label for="amount">Partial Amount <small>(Minimum ${{pack.min_booking_amount * form.ticket | currency}})</small></label>
                                                    <input type="number" id="amount" placeholder="Set Your Partial Amount" v-model="form.price" :min="pack.min_booking_amount * form.ticket" :max="pack.price * form.ticket">
                                                    <p class="strong" v-if="pack.discount !== null">Discount Applicable only for Full Payment</p>
                                                </div>
                                            </transition>
                                            <div class="col-lg-12">
                                                <button type="submit">
                                                    Next
                                                    <client-only>
                                                        <icon icon="arrow-right"></icon>
                                                    </client-only>
                                                </button>
                                            </div>
                                        </div>
                                    </transition-group>
                                </form>
                                <h3 class="strong" v-else>Booking Not Available. All Ticket are sold.</h3>
                                <div class="wishlist">
                                    <button type="button" class="btn-common" @click="wishlists.some(wishlist => wishlist.package_id == pack.id) ? removeWishlist(pack.id) : addWishlist(pack.id)">
                                        <client-only>
                                            <icon :icon="wishlists.some(wishlist => wishlist.package_id == pack.id) ? 'heart' : ['far', 'heart']"></icon>
                                        </client-only>
                                        Add to wishlist
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="p-sidebar-cards mt-40">
                                <h5 class="package-d-head">Popular Packages</h5>
                                <ul class="package-cards">
                                    <Sidebar-package :pack="pack" v-for="pack in popularPack" :key="pack.id"></Sidebar-package>
                                </ul>

                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="p-sidebar-organizer mt-40">
                                <h5 class="package-d-head">Organized By</h5>
                                <div class="organizer-card d-flex align-items-center">
                                    <div class="organizer-img">
                                        <nuxt-link :to="{name: 'package-user-slug', params: {slug: pack.user.slug}}">
                                            <img :data-src="assetURL+pack.user.image" :alt="pack.user.name" v-lazy-load />
                                        </nuxt-link>
                                    </div>
                                    <div class="organizer-info">
                                        <nuxt-link :to="{name: 'package-user-slug', params: {slug: pack.user.slug}}">
                                            <h5>{{pack.user.name}}</h5>
                                        </nuxt-link>
                                        <p>Member since {{pack.user.created_at | year}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12">
                            <div class="right-sidebar-categorie mt-40">
                                <h5 class="categorie-head">Categories</h5>
                                <ul>
                                    <li v-for="category in categories" :key="category.id">
                                        <nuxt-link :to="{name: 'package-category-slug', params: {slug: category.slug}}">
                                            <client-only>
                                                <icon icon="angle-double-right"></icon>
                                            </client-only>
                                            <span class="ml-2">
                                                {{category.name}}
                                            </span>
                                        </nuxt-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<Error v-else />
</template>

<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
    components: { DatePicker },

    head() {
        return {
            title: (this.pack == null ? "Not Found" : this.pack.name) + " - " + this.appName,
            link: [{ rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }],
            script: [{
                src: this.paypal,
            }],
        };
    },

    data() {
        return {
            click: true,
            pack: {},
            questions: {},
            popularPack: [],
            categories: [],
            activeTab: "info",
            question: "",
            fullMessage: "",
            fullReplay: "",
            submitDisable: false,
            submitLoading: false,
            replayQuestion: {
                questionId: "",
                message: ""
            },
            checking: false,
            form: {
                packageId: "",
                name: "",
                email: "",
                phone: "",
                address: "",
                ticket: 1,
                payment: "",
                paymentType: "",
                price: "",
                discount: "",
                min_booking_amount: "",
                paymentMessage: false,
                card: {
                    number: "",
                    cvc: "",
                    date: "",
                },
                paypal: {
                    email: "",
                    transaction: "",
                    amount: "",
                },
            },
        }
    },

    async asyncData(context) {
        let response = await axios.get(context.store.getters.base_url + "package/" + context.params.slug);
        return {
            click: true,
            pack: response.data.package,
            questions: response.data.questions,
            popularPack: response.data.popularPackage,
            categories: response.data.categories,
            form: {
                packageId: response.data.package == null ? "" : response.data.package.id,
                name: "",
                email: "",
                phone: "",
                address: "",
                ticket: 1,
                payment: "",
                paymentType: "",
                price: "",
                discount: response.data.package == null ? "" : response.data.package.discount,
                min_booking_amount: response.data.package == null ? "" : response.data.package.min_booking_amount,
                paymentMessage: false,
                card: {
                    number: "",
                    cvc: "",
                    date: "",
                },
                paypal: {
                    id: "",
                    email: "",
                    transaction: "",
                    amount: "",
                },
            },
        };
    },

    methods: {
        // Get Question
        getQuestions() {
            this.$axios.get("question/" + this.pack.id).then(
                (response) => {
                    this.questions = response.data.questions;
                },
                (error) => {
                    $nuxt.$emit("error", error);
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("question/" + this.pack.id + "?page=" + page).then(
                (response) => {
                    this.questions = response.data.questions;
                });
        },

        // Booking change to reset booking related info
        changeBooking() {
            this.form.paymentType = "";
            this.form.price = this.form.payment == "full" ? this.pack.discount == null ? this.pack.price : this.pack.discount : "";
            this.form.card.number = "";
            this.form.card.cvc = "";
            this.form.card.date = "";
        },

        // Post New Question
        createQuestion() {
            if (this.authCheck) {
                if (this.click) {
                    this.click = false;
                    this.$axios.post("create-question/", { question: this.question, id: this.pack.id }).then(
                        (response) => {
                            this.question = "",
                                $nuxt.$emit("triggerQuestion");
                            $nuxt.$emit("success", "Question Posted Successfully");
                            this.click = true;
                        },
                        (error) => {
                            $nuxt.$emit("error", error);
                            this.click = true;
                        }
                    )
                }
            }
        },

        // Show or Hide Replay Form
        replayForm(id) {
            this.replayQuestion.questionId = this.replayQuestion.questionId == id ? "" : id;
            this.replayQuestion.message = "";
        },

        // Post New Question Replay
        createReplay() {
            if (this.authCheck) {
                if (this.click) {
                    this.click = false;
                    this.$axios.post("create-replay/" + this.replayQuestion.questionId, this.replayQuestion).then(
                        (response) => {
                            this.replayQuestion.questionId = "",
                                this.replayQuestion.message = "",
                                $nuxt.$emit("triggerQuestion");
                            $nuxt.$emit("success", "Replay Posted Successfully");
                            this.click = true;
                        },
                        (error) => {
                            $nuxt.$emit("error", error);
                            this.click = true;
                        }
                    )
                }
            }
        },

        // Delete Question
        deleteQuestion(id) {
            if (this.authCheck) {
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
                            this.$axios.post("delete-question/" + id).then(
                                () => {
                                    Swal.fire(
                                        "Deleted!",
                                        "Question has been deleted.",
                                        "success"
                                    )
                                    $nuxt.$emit("triggerQuestion");
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
            }
        },

        // Delete Replay
        deleteReplay(id, index) {
            if (this.authCheck) {
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
                            this.$axios.post("delete-replay/" + id, { key: index }).then(
                                () => {
                                    Swal.fire(
                                        "Deleted!",
                                        "Replay has been deleted.",
                                        "success"
                                    )
                                    $nuxt.$emit("triggerQuestion");
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
            }
        },

        // Paypal Payment Integration
        paypalIntegration() {
            if (this.authCheck) {
                let price = this.form.payment == "partial" ? this.form.price : this.form.price * this.form.ticket;
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

        //Check Booking information
        checkBooking() {
            if (this.click) {
                this.click = false;
                this.$axios.post("check-booking/", this.form).then(
                    (response) => {
                        this.checking = true;
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    }
                )
            }
        },

        //Submit Booking Form
        submitBooking() {
            this.submitLoading = true;
            this.submitDisable = true;
            if (this.click) {
                this.click = false;
                this.$axios.post("submit-booking/", this.form).then(
                    (response) => {
                        this.submitLoading = false;
                        this.submitDisable = false;
                        $nuxt.$emit("success", "Your Booking Successfully Submited");
                        this.$router.push("/booking-confirm/" + response.data);
                        this.click = true;
                    },
                    (error) => {
                        this.submitLoading = false;
                        this.submitDisable = false;
                        $nuxt.$emit("error", error);
                        this.click = true;
                    }
                )
            }
        },

        //Set Paypal Payment Info
        setPayment(order) {
            this.form.paypal.email = order.payer.email_address;
            this.form.paypal.transaction = order.id;
            this.form.paypal.amount = order.purchase_units[0].amount.value;
            this.form.paymentMessage = true;
        },

        // Increment View
        incrementView() {
            if (process.client) {
                let find = window.localStorage.getItem(btoa("package" + this.pack.id));
                if (!find) {
                    localStorage.setItem(btoa("package" + this.pack.id), Math.random());
                    this.$axios.post("increment-package/" + this.pack.id);
                }
            }
        },

        //Add Wishlist
        addWishlist(id) {
            if (this.authCheck) {
                if (this.click) {
                    this.click = false
                    this.$axios.post("create-wishlist/" + id).then(
                        (response) => {
                            this.$store.dispatch("triggerWishlist");
                            $nuxt.$emit("success", "Package Successfully Add to Wishlist");
                            this.click = true;
                        },
                        (error) => {
                            $nuxt.$emit("error", error);
                            this.click = true;
                        },
                    )
                }
            } else {
                $nuxt.$emit("customError", "Please Login For Add To Wishlist");
            }
        },

        //Remove Wishlist
        removeWishlist(id) {
            if (this.click) {
                this.click = false
                this.$axios.post("remove-wishlist/" + id).then(
                    () => {
                        this.$store.dispatch("triggerWishlist");
                        $nuxt.$emit("success", "Package Successfully Remove From Wishlist");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },
    },

    computed: {
        // Count total ticket
        bookingsCount() {
            return this.pack.bookings.length > 0 ? this.pack.bookings.reduce((total, booking) => total + booking.ticket, 0) : 0
        },

        wishlists() {
            return this.$store.getters.wishlists;
        }
    },

    created() {
        this.$nuxt.$on("triggerQuestion", () => {
            this.getQuestions();
        });

        this.$nuxt.$on("triggerPaypal", (order) => {
            this.setPayment(order);
        });

        setTimeout(() => { this.incrementView(); }, 3000);
    },
}
</script>
