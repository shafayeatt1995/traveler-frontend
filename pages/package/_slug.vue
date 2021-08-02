<template>
    <div class="package-details-wrapper pt-40">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="package-details">
                        <div class="package-thumb">
                            <client-only> <!-- important to add no-ssr-->
                                <carousel :items="1" :autoplay="false" :nav="false">
                                    <img :src="assetURL + image" v-for="(image, key) in JSON.parse(pack.images)" :key="key">
                                </carousel>
                            </client-only>
                        </div>
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
                                <p>{{pack.status == true ? 'Tour Complete' : pack.status == false ? 'Booking Available' : 'Tour Running' }}</p>
                                <p v-if="pack.discount === null">${{pack.price}} / Per Person</p>
                                <p v-else><del>${{pack.price}}</del> ${{pack.discount}} / Per Person</p>
                            </div>
                        </div>
                        <div class="p-short-info">
                            <div class="single-info">
                                <client-only>
                                    <icon icon="clock"></icon>
                                </client-only>
                                <div class="info-texts">
                                    <strong>Duration</strong>
                                    <p>{{pack.duration}}</p>
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
                                    Information</button>
                                </li>
                                <li class="nav-item">
                                  <button class="nav-link" :class="activeTab == 'plan' ? 'active': ''" type="button" @click="activeTab = 'plan'">
                                    <client-only>
                                        <icon icon="clipboard"></icon>
                                    </client-only>
                                    Travel Plan</button>
                                </li>
                            </ul>
                            <div class="p-tab-content">
                                <transition name="fade" mode="out-in">
                                    <div class="tab-pane" key="1" v-if="activeTab == 'info'">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="tab-content-1">
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
                                                                            {{include}}</li>
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
                                                                            {{exclude}}</li>
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
                                                    <h5>Rating</h5>
                                                    <div class="rating-card">
                                                        <div class="r-card-avarag">
                                                            <h2>4.9</h2>
                                                            <h5>Excellent</h5>
                                                        </div>
                                                        <div class="r-card-info">
                                                            <ul>
                                                                <li>
                                                                    <strong>Accommodation</strong>
                                                                    <ul class="r-rating">
                                                                        <li> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                                <li>
                                                                    <strong>Transport</strong>
                                                                    <ul class="r-rating">
                                                                        <li> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bx-star' ></i>
                                                                            <i class='bx bx-star' ></i>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                                <li>
                                                                    <strong>Comfort</strong>
                                                                    <ul class="r-rating">
                                                                        <li> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bx-star' ></i> 
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                                <li>
                                                                    <strong>Hospitality</strong>
                                                                    <ul class="r-rating">
                                                                        <li> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bx-star' ></i>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                                <li>
                                                                    <strong>Food</strong>
                                                                    <ul class="r-rating">
                                                                        <li> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bxs-star' ></i> 
                                                                            <i class='bx bx-star' ></i>
                                                                            <i class='bx bx-star' ></i>
                                                                            <i class='bx bx-star' ></i> 
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div class="p-review">
                                                        <ul>
                                                            <li class="p-review-card">
                                                                <div class="p-review-info">
                                                                    <div class="p-reviewr-img">
                                                                        <img src="assets/images/package/pr-1.png" alt="">
                                                                    </div>
                                                                    <div class="p-reviewer-info">
                                                                        <strong>Bertram Bil</strong>
                                                                        <p>2 April, 2021 10.00PM</p>
                                                                        <ul class="review-star">
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="p-review-texts">
                                                                    <p>Morbi dictum pulvinar velit, id mollis lorem faucibus acUt sed
                                                                        lacinia ipsum. Suspendisse massa augue lorem faucibus acUt
                                                                        sed lacinia ipsum. Suspendisse </p>
                                                                </div>
                                                                <a href="#" class="r-reply-btn"><i class='bx bx-reply'></i> Reply</a>
                                                            </li>
                                                            <li class="p-review-card">
                                                                <div class="p-review-info">
                                                                    <div class="p-reviewr-img">
                                                                        <img src="assets/images/package/pr-1.png" alt="">
                                                                    </div>
                                                                    <div class="p-reviewer-info">
                                                                        <strong>Bertram Bil</strong>
                                                                        <p>2 April, 2021 10.00PM</p>
                                                                        <ul class="review-star">
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="p-review-texts">
                                                                    <p>Morbi dictum pulvinar velit, id mollis lorem faucibus acUt sed
                                                                        lacinia ipsum. Suspendisse massa augue lorem faucibus acUt
                                                                        sed lacinia ipsum. Suspendisse </p>
                                                                </div>
                                                                <a href="#" class="r-reply-btn"><i class='bx bx-reply'></i> Reply</a>
                                                            </li>
                                                            <li class="p-review-card">
                                                                <div class="p-review-info">
                                                                    <div class="p-reviewr-img">
                                                                        <img src="assets/images/package/pr-1.png" alt="">
                                                                    </div>
                                                                    <div class="p-reviewer-info">
                                                                        <strong>Bertram Bil</strong>
                                                                        <p>2 April, 2021 10.00PM</p>
                                                                        <ul class="review-star">
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                            <li> <i class='bx bxs-star'></i> </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div class="p-review-texts">
                                                                    <p>Morbi dictum pulvinar velit, id mollis lorem faucibus acUt sed
                                                                        lacinia ipsum. Suspendisse massa augue lorem faucibus acUt
                                                                        sed lacinia ipsum. Suspendisse </p>
                                                                </div>
                                                                <a href="#" class="r-reply-btn"><i class='bx bx-reply'></i> Reply</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="p-review-input">
                                                        <form>
                                                            <h5>Leave Your Comment</h5>
                                                            <div class="row my-form">
                                                            <div class="col-lg-6">
                                                                <input type="text" placeholder="Your Full Name">
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <input type="text" placeholder="Your Email">
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <input type="text" placeholder="Tour Type">
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <textarea  cols="30" rows="7" placeholder="Write Message"></textarea>
                                                            </div>
            
                                                            <div class="col-lg-12">
                                                                <ul class="input-rating">
                                                                    <li><i class='bx bx-star' ></i></li>
                                                                    <li><i class='bx bx-star' ></i></li>
                                                                    <li><i class='bx bx-star' ></i></li>
                                                                    <li><i class='bx bx-star' ></i></li>
                                                                    <li><i class='bx bx-star' ></i></li>
                                                                </ul>
                                                                <input type="submit" value="Submit Now">
                                                            </div>
                                                            </div>
                                                        </form>
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
                                                        <h5>Overview</h5>
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
                    <div class="package-d-sidebar">
                        <div class="row">
                            <div class="col-lg-12 col-md-6">
                                <div class="p-sidebar-form">
                                    <form>
                                        <h5 class="package-d-head">Book Your Ticket</h5>
                                        <div class="row my-form">
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
                                                    <span @click="form.ticket ++">+</span>
                                                </p>
                                            </div>
                                            <div class="col-lg-12">
                                                <label for="booking">Select A Booking Option</label>
                                                <select v-model="form.payment" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'" id="booking" @change="changeBooking">
                                                    <option value="">Select A Booking Option</option>
                                                    <option value="booking">Temporary Book Now</option>
                                                    <option value="partial">Partial Payment Booking</option>
                                                    <option value="full">Full Payment Booking</option>
                                                </select>
                                            </div>
                                            <transition name="slide" mode="out-in">
                                                <div class="col-lg-12" v-if="form.payment == 'partial'" key="1">
                                                    <label for="amount">Partial Amount</label>
                                                    <input type="number" id="amount" placeholder="Set Your Partial Amount" v-model="form.amount">
                                                    <div class="col-lg-12">
                                                        <label>Select A Payment Option</label>
                                                        <select v-model="form.paymentType" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'">
                                                            <option value="">Select A Payment Option</option>
                                                            <option value="paypal">PayPal</option>
                                                            <option value="stripe">Card Payment</option>
                                                        </select>
                                                    </div>
                                                    <transition name="slide" mode="out-in">
                                                        <div class="col-lg-12" v-if="form.paymentType == 'paypal'" key="1">
                                                            <div ref="paypal"></div>
                                                        </div>
                                                        <div class="row" v-if="form.paymentType == 'stripe'" key="2">
                                                            <div class="col-lg-12">
                                                                <label for="card-number">Card Number</label>
                                                                <input type="number" id="card-number" placeholder="Type Your Card Number" v-model="form.card.number">
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <label for="cvv">CVV</label>
                                                                <input type="number" id="cvv" placeholder="CVV Number" v-model="form.card.cvv">
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <label for="card-date">Expire Date</label>
                                                                <date-picker v-model="form.card.date" value-type="YYYY-MM" type="month" format="YYYY-MM" placeholder="Expire Date" class="w-auto"></date-picker>
                                                            </div>
                                                        </div>
                                                    </transition>
                                                </div>
                                                <div class="col-lg-12" v-if="form.payment == 'full'" key="2">
                                                    <label for="amount">Partial Amount</label>
                                                    <input type="number" id="amount" placeholder="Set Your Partial Amount" v-model="form.amount">
                                                </div>
                                            </transition>
                                            <div class="col-lg-12">
                                                <input type="submit" value="Book Now">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-6">
                                <div class="p-sidebar-cards mt-40">
                                    <h5 class="package-d-head">Popular Packages</h5>
                                    
                                    <ul class="package-cards">
                                        <li class="package-card-sm">
                                            <div class="p-sm-img">
                                                <img src="assets/images/package/p-sm-1.png" alt="">
                                            </div>
                                            <div class="package-info">
                                                <div class="package-date-sm">
                                                    <strong><i class="flaticon-calendar"></i>5 Days/6 night</strong>
                                                </div>
                                                <h3><i class="flaticon-arrival"></i>
                                                    <a href="package-details.html">Lake Garda</a>
                                                </h3>
                                                <h5><span>$180</span>/ Per Person</h5>
                                            </div>
                                        </li>
                                        <li class="package-card-sm">
                                            <div class="p-sm-img">
                                                <img src="assets/images/package/p-sm-4.png" alt="">
                                            </div>
                                            <div class="package-info">
                                                <div class="package-date-sm">
                                                    <strong><i class="flaticon-calendar"></i>5 Days/6 night</strong>
                                                </div>
                                                <h3><i class="flaticon-arrival"></i>
                                                    <a href="package-details.html">Paris Hill Tour</a>
                                                </h3>
                                                <h5><span>$180</span>/ Per Person</h5>
                                            </div>
                                        </li>
                                        <li class="package-card-sm">
                                            <div class="p-sm-img">
                                                <img src="assets/images/package/p-sm-2.png" alt="">
                                            </div>
                                            <div class="package-info">
                                                <div class="package-date-sm">
                                                    <strong><i class="flaticon-calendar"></i>5 Days/6 night</strong>
                                                </div>
                                                <h3><i class="flaticon-arrival"></i>
                                                    <a href="package-details.html">Amalfi Costa</a>
                                                </h3>
                                                <h5><span>$180</span>/ Per Person</h5>
                                            </div>
                                        </li>
                                        <li class="package-card-sm">
                                            <div class="p-sm-img">
                                                <img src="assets/images/package/p-sm-3.png" alt="">
                                            </div>
                                            <div class="package-info">
                                                <div class="package-date-sm">
                                                    <strong><i class="flaticon-calendar"></i>5 Days/6 night</strong>
                                                </div>
                                                <h3><i class="flaticon-arrival"></i>
                                                    <a href="package-details.html">Mount Dtna</a>
                                                </h3>
                                                <h5><span>$180</span>/ Per Person</h5>
                                            </div>
                                        </li>
                                        <li class="package-card-sm">
                                            <div class="p-sm-img">
                                                <img src="assets/images/package/p-sm-4.png" alt="">
                                            </div>
                                            <div class="package-info">
                                                <div class="package-date-sm">
                                                    <strong><i class="flaticon-calendar"></i>5 Days/6 night</strong>
                                                </div>
                                                <h3><i class="flaticon-arrival"></i>
                                                    <a href="package-details.html">Fench Rivirany</a>
                                                </h3>
                                                <h5><span>$180</span>/ Per Person</h5>
                                            </div>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-6">
                                <div class="p-sidebar-organizer mt-40">
                                    <h5 class="package-d-head">Organized By</h5>
                                    <div class="organizer-card">
                                        <div class="organizer-img">
                                            <img src="assets/images/organizer.png" alt="">
                                        </div>
                                        <div class="organizer-info">
                                            <h5>Travelhotel</h5>
                                            <p>Member since 2021</p>
                                            <ul class="organizer-rating">
                                                <li><i class='bx bxs-star'></i></li>
                                                <li><i class='bx bxs-star'></i></li>
                                                <li><i class='bx bxs-star'></i></li>
                                                <li><i class='bx bxs-star'></i></li>
                                                <li><i class='bx bx-star' ></i></li>
                                            </ul>
                                            <h5>500 Reviews</h5>
                                        </div>
                                    </div>
                                    <div class="p-ask-btn">
                                        <a href="#">ASK A QUESTION</a>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-12 col-md-6">
                                <div class="p-sidebar-banner mt-40">
                                    <img src="assets/images/sidebar-banner.png" alt="" class="img-fluid">
                                    <div class="sidebar-banner-overlay">
                                        <div class="overlay-content">
                                            <h3>Get 50% Off 
                                                In Dubai Tour</h3>
                                            <div class="sidebar-banner-btn">
                                                <a href="#">Book Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    components: { DatePicker },
    
    head() {
        return {
            title: this.pack.name + ' - ' + process.env.appName,
        };
    },

    data() {
        return {
            pack: {},
            activeTab: "info",
            form: {
                name: "",
                email: "",
                phone: "",
                address: "",
                ticket: 1,
                payment: "",
                paymentType: "",
                amount: "",
                card: {
                    number: "",
                    cvv: "",
                    date: "",
                }
            }
        }
    },

    async asyncData(context){
        let response = await axios.get(context.env.baseURL + "package/" + context.params.slug);
        return {pack: response.data.package};
    },

    methods: {
        // Booking change to reset booking related info
        changeBooking(){
            this.form.paymentType = "";
            this.form.amount = "";
            this.form.card.number = "";
            this.form.card.cvv = "";
            this.form.card.date = "";
        }
    },

    computed: {
        // Get Backend URL
        url() {
            return process.env.baseURL;
        },

        // Get Asset URL
        assetURL() {
            return process.env.assetURL;
        },
    },
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: 0.5s;
}

.slide-enter-to,
.slide-leave {
    max-height: 200px;
    overflow: hidden;
}

.slide-enter,
.slide-leave-to {
    overflow: hidden;
    max-height: 0;
}
</style>