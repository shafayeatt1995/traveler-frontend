<template>
<div class="container dashboard-container mt-5" v-if="admin">
    <div class="row">
        <div class="col-lg-3">
            <div class="dashboard-sidebar">
                <ul>
                    <li>
                        <h5 class="text-center">
                            <nuxt-link :to="{name: 'dashboard'}" class="justify-content-center">
                                <client-only>
                                    <icon icon="arrow-left"></icon>
                                </client-only>
                                <span class="mx-2">Back To Dashboard</span>
                            </nuxt-link>
                        </h5>
                    </li>
                    <li>
                        <a class="pointer strong" :class="active == 'header' ? 'active' : ''" @click.prevent="active = active == 'header' ? '' : 'header'">
                            Header
                            <client-only>
                                <icon icon="angle-right" class="float-end"></icon>
                            </client-only>
                        </a>
                        <transition name="slide" mode="out-in">
                            <div class="px-2" v-if="active == 'header'">
                                <label for="header-logo" class="mt-2">Header Logo</label>
                                <div class="text-center">
                                    <transition name="slide" mode="out-in">
                                        <img :src="header.image" v-if="header.image" class="img-fluid mb-2 mh-100-px" />
                                    </transition>
                                </div>
                                <input type="file" accept="image/*" class="form-control" id="footer-logo" @change="image($event, 'header')">
                                <div class="form-group">
                                    <label for="header-phone" class="mt-2">Header Phone Number</label>
                                    <input type="text" class="form-control" id="header-phone" v-model="header.phone">
                                </div>
                                <div class="form-group">
                                    <label for="header-email" class="mt-2">Achievement Title</label>
                                    <input type="email" class="form-control" id="header-email" v-model="header.email">
                                </div>
                                <div class="text-center mb-2">
                                    <button type="button" class="btn-second" @click="updateHeader">Update Header Section</button>
                                </div>
                            </div>
                        </transition>
                    </li>
                    <li>
                        <a class="pointer strong" :class="active == 'homeSlider' ? 'active' : ''" @click.prevent="active = active == 'homeSlider' ? '' : 'homeSlider'">
                            Home Main Slider
                            <client-only>
                                <icon icon="angle-right" class="float-end"></icon>
                            </client-only>
                        </a>
                        <transition name="slide" mode="out-in">
                            <div class="px-2" v-if="active == 'homeSlider'">
                                <div class="text-center mb-2">
                                    <button type="button" class="btn-second mt-2" @click="updateHomeSlider">Update Home Slider Section</button>
                                </div>
                            </div>
                        </transition>
                    </li>
                    <li>
                        <a class="pointer strong" :class="active == 'achievement' ? 'active' : ''" @click.prevent="active = active == 'achievement' ? '' : 'achievement'">
                            Home Achievement
                            <client-only>
                                <icon icon="angle-right" class="float-end"></icon>
                            </client-only>
                        </a>
                        <transition name="long-slide" mode="out-in">
                            <div class="px-2" v-if="active == 'achievement'">
                                <div class="form-group">
                                    <label for="home-achievement-subtitle" class="mt-2">Achievement Subtitle</label>
                                    <input type="text" class="form-control" id="home-achievement-subtitle" v-model="achievement.subTitle">
                                </div>
                                <div class="form-group">
                                    <label for="home-achievement-title" class="mt-2">Achievement Title</label>
                                    <input type="text" class="form-control" id="home-achievement-title" v-model="achievement.title">
                                </div>
                                <hr>
                                <div class="form-group">
                                    <div class="text-center">
                                        <transition name="slide" mode="out-in">
                                            <img :src="achievementImage" v-if="achievementImage" class="img-fluid mb-2 mh-100-px" />
                                        </transition>
                                    </div>
                                    <input type="file" accept="image/*" class="form-control" @change="image($event, 'achievement')">
                                    <label for="home-achievement" class="mt-2">Achievement</label>
                                    <input type="text" class="form-control" id="home-achievement" v-model="achievementName">
                                    <div class="text-center">
                                        <button type="button" class="btn-second my-2" @click="addAchievement">Add Achievement</button>
                                        <button type="button" class="btn-second" @click="updateAchievement">Update Achievement Section</button>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </li>
                    <li>
                        <a class="pointer strong" :class="active == 'review' ? 'active' : ''" @click.prevent="active = active == 'review' ? '' : 'review'">
                            Home Review
                            <client-only>
                                <icon icon="angle-right" class="float-end"></icon>
                            </client-only>
                        </a>
                        <transition name="long-slide" mode="out-in">
                            <div class="px-2" v-if="active == 'review'">
                                <div class="form-group">
                                    <label for="home-review-subtitle" class="mt-2">Review Subtitle</label>
                                    <input type="text" class="form-control" id="home-review-subtitle" v-model="review.subTitle">
                                </div>
                                <div class="form-group">
                                    <label for="home-review-title" class="mt-2">Review Title</label>
                                    <input type="text" class="form-control" id="home-review-title" v-model="review.title">
                                </div>
                                <hr>
                                <div class="form-group">
                                    <div class="text-center">
                                        <transition name="slide" mode="out-in">
                                            <img :src="reviewImage" v-if="reviewImage" class="img-fluid mb-2 mh-100-px" />
                                        </transition>
                                    </div>
                                    <input type="file" accept="image/*" class="form-control" @change="image($event, 'review')">
                                    <div class="form-group">
                                        <label for="home-review-name" class="mt-2">Reviewer Name</label>
                                        <input type="text" class="form-control" id="home-review-name" v-model="reviewName">
                                    </div>
                                    <div class="form-group">
                                        <label for="home-review-message" class="mt-2">Reviewer Message</label>
                                        <textarea class="form-control" id="home-review-message" rows="4" v-model="reviewMessage"></textarea>
                                    </div>
                                    <div class="text-center">
                                        <button type="button" class="btn-second my-2" @click="addReview">Add Review</button>
                                        <button type="button" class="btn-second" @click="updateReview">Update Review Section</button>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </li>
                    <li>
                        <a class="pointer strong" :class="active == 'footer' ? 'active' : ''" @click.prevent="active = active == 'footer' ? '' : 'footer'">
                            Footer
                            <client-only>
                                <icon icon="angle-right" class="float-end"></icon>
                            </client-only>
                        </a>
                        <transition name="long-slide" mode="out-in">
                            <div class="px-2" v-if="active == 'footer'">
                                <label for="footer-logo" class="mt-2">Footer Logo</label>
                                <div class="text-center">
                                    <transition name="slide" mode="out-in">
                                        <img :src="footer.image" v-if="footer.image" class="img-fluid mb-2 mh-100-px" />
                                    </transition>
                                </div>
                                <input type="file" accept="image/*" class="form-control" id="footer-logo" @change="image($event, 'footer')">
                                <div class="form-group">
                                    <label for="footer-message" class="mt-2">Footer Message</label>
                                    <textarea class="form-control" id="footer-message" cols="4" v-model="footer.message"></textarea>
                                </div>
                                <hr>
                                <h5 class="text-center">Social Link</h5>
                                <div class="form-group">
                                    <label for="footer-facebook" class="mt-2">Facebook Link <span class="small">(Do not add 'https://')</span></label>
                                    <input id="footer-facebook" class="form-control" v-model="footer.social.facebook" />
                                </div>
                                <div class="form-group">
                                    <label for="footer-twitter" class="mt-2">Twitter Link <span class="small">(Do not add 'https://')</span></label>
                                    <input id="footer-twitter" class="form-control" v-model="footer.social.twitter" />
                                </div>
                                <div class="form-group">
                                    <label for="footer-instagram" class="mt-2">Instagram Link <span class="small">(Do not add 'https://')</span></label>
                                    <input id="footer-instagram" class="form-control" v-model="footer.social.instagram" />
                                </div>
                                <div class="form-group">
                                    <label for="footer-whatsapp" class="mt-2">Whatsapp Number <span class="d-block small">(Type Number with Country Code)</span></label>
                                    <input id="footer-whatsapp" class="form-control" v-model="footer.social.whatsapp" />
                                </div>
                                <hr>
                                <h5 class="text-center">Contact Information</h5>
                                <div class="form-group">
                                    <p class="pointer" v-for="(number, key) in footer.phone" :key="key" v-tooltip.top-start="'Click to remove Number'" @click="removeNumber(key)">{{number}}</p>
                                    <label for="contact-number" class="mt-2">Contact Number</label>
                                    <div class="input-group mb-3">
                                        <input type="number" class="form-control" placeholder="Contact Number" id="contact-number" v-model="contactNumber">
                                        <div class="input-group-append">
                                            <button class="btn btn-base-color" type="button" @click="contactNumber.length > 0 ? addNumber(contactNumber) : ''">Add</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <p class="pointer" v-for="(email, key) in footer.email" :key="key" v-tooltip.top-start="'Click to remove Email'" @click="removeEmail(key)">{{email}}</p>
                                    <label for="contact-email" class="mt-2">Contact Email</label>
                                    <div class="input-group mb-3">
                                        <input type="email" class="form-control" placeholder="Contact Email" id="contact-email" v-model="contactEmail">
                                        <div class="input-group-append">
                                            <button class="btn btn-base-color" type="button" @click="contactEmail.length > 0 ? addEmail(contactEmail) : ''">Add</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="contact-address" class="mt-2">Address</label>
                                    <input type="text" class="form-control" placeholder="Address" id="contact-address" v-model="footer.address">
                                </div>
                                <hr>
                                <h5 class="text-center">Newsletter</h5>
                                <div class="form-group">
                                    <label for="footer-newsletter" class="mt-2">Newsletter Message</label>
                                    <textarea id="footer-newsletter" class="form-control" cols="3" v-model="footer.newsletterMessage"></textarea>
                                </div>
                                <hr>
                                <h5 class="text-center">Copyright</h5>
                                <div class="form-group">
                                    <label for="footer-newsletter" class="mt-2">Copyright Message</label>
                                    <input id="footer-newsletter" class="form-control" v-model="footer.copyright" />
                                </div>
                                <div class="text-center mb-2">
                                    <button type="button" class="btn-second" @click="updateFooter">Update Footer Section</button>
                                </div>
                            </div>
                        </transition>
                    </li>
                    <li>
                        <a class="pointer strong" :class="active == 'breadcrumb' ? 'active' : ''" @click.prevent="active = active == 'breadcrumb' ? '' : 'breadcrumb'">
                            Breadcrumb
                            <client-only>
                                <icon icon="angle-right" class="float-end"></icon>
                            </client-only>
                        </a>
                        <transition name="slide" mode="out-in">
                            <div class="px-2" v-if="active == 'breadcrumb'">
                                <label for="breadcrumb-image" class="mt-2">Breadcrumb Image</label>
                                <div class="text-center">
                                    <transition name="slide" mode="out-in">
                                        <img :src="breadcrumb.newIimage" class="img-fluid mb-2 mh-100-px" v-if="breadcrumb.newIimage" />
                                    </transition>
                                </div>
                                <input type="file" accept="image/*" class="form-control" id="breadcrumb-image" @change="image($event, 'breadcrumb')">
                                <div class="text-center my-3">
                                    <button type="button" class="btn-second" @click="updateBreadcrumb">Update Breadcrumb Section</button>
                                </div>
                            </div>
                        </transition>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-lg-9">
            <div class="dashboard-content">
                <transition-group name="fade" mode="out-in">
                    <div key="1" v-if="active == 'header'">
                        <div class="topbar-area">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-6 tob-contact-row">
                                        <div class="topbar-contact-left">
                                            <ul>
                                                <li>
                                                    <a :href="'tel:'+ header.phone" class="ms-1">
                                                        <client-only>
                                                            <icon icon="phone-alt"></icon>
                                                        </client-only>
                                                        {{header.phone}}
                                                    </a>
                                                </li>
                                                <li>
                                                    <a :href="'mailto:' + header.email" class="ms-1">
                                                        <client-only>
                                                            <icon icon="at"></icon>
                                                        </client-only>
                                                        {{header.email}}
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div class="col-lg-6">
                                        <div class="topbar-contact-right">
                                            <ul class="justify-content-end" v-if="authCheck">
                                                <li>
                                                    <nuxt-link :to="{name: 'wishlist'}">
                                                        <client-only>
                                                            <icon icon="heart"></icon>
                                                        </client-only>
                                                        Wishlist
                                                    </nuxt-link>
                                                </li>
                                                <li>
                                                    <nuxt-link :to="{name: 'dashboard'}">
                                                        <client-only>
                                                            <icon icon="tachometer-alt"></icon>
                                                        </client-only>
                                                        Dashboard
                                                    </nuxt-link>
                                                </li>
                                            </ul>
                                            <ul class="justify-content-end" v-else>
                                                <li>
                                                    <nuxt-link :to="{name: 'login'}">Login</nuxt-link>
                                                </li>
                                                <li>
                                                    <nuxt-link :to="{name: 'register'}">Register</nuxt-link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- =============== Topbar area end =============== -->

                        <!-- ===============  header area start =============== -->
                        <header>
                            <div class="header-area">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-2">
                                            <div class="navbar-wrap">
                                                <div class="logo d-flex justify-content-between align-items-center">
                                                    <nuxt-link :to="{name: 'index'}" class="navbar-brand">
                                                        <img :data-src="header.oldImage" alt="logo" class="img-fluid" v-lazy-load />
                                                    </nuxt-link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
                    <div key="2" v-if="active == 'homeSlider'">
                        <h2 class="text-center strong">All Package</h2>
                        <hr>
                        <div class="row" v-if="packages.data.length > 0">
                            <div class="col-lg-4 col-md-6" v-for="pack in packages.data" :key="pack.id">
                                <div class="editor-pack" @click="sliderPackage.activePackages.some( findPackage => findPackage == pack.id) ? removePackage(pack.id) : addPackage(pack.id)">
                                    <p :class="sliderPackage.activePackages.some( findPackage => findPackage == pack.id) ? 'remove' : 'active'">
                                        <span>+</span>
                                    </p>
                                    <Package :pack="pack" />
                                </div>
                            </div>

                            <pagination :data="packages" @pagination-change-page="getResults" class="justify-content-center mt-3 f-pagination"></pagination>
                        </div>
                        <div class="row" v-else>
                            <Empty message="No Package Found" />
                        </div>
                    </div>
                    <div class="achievement-area p-80" key="3" v-if="active == 'achievement'" :style="'background-image: url(' + assetURL + 'images/achiv-shape.png)'">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    <div class="section-head pb-30">
                                        <h5>{{achievement.subTitle}}</h5>
                                        <h2>{{achievement.title}}</h2>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-sm-6" v-for="(achieve, key) in achievement.achievements" :key="key+100">
                                    <div class="achievement-card mt-30">
                                        <img :data-src="assetURL + achieve.image" class="img-fluid mh-100-px" v-lazy-load />
                                        <h5>{{achieve.name}}</h5>
                                    </div>
                                    <div class="text-center mt-1">
                                        <button class="btn btn-danger" @click="removeAchievement(key, achieve.image, 'old')">x</button>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-sm-6" v-for="(achieve, key) in achievement.newAchievements" :key="key">
                                    <div class="achievement-card mt-30">
                                        <img :data-src="achieve.image" class="img-fluid mh-100-px" v-lazy-load />
                                        <h5>{{achieve.name}}</h5>
                                    </div>
                                    <div class="text-center mt-1">
                                        <button class="btn btn-danger" @click="removeAchievement(key, achieve.image, 'new')">x</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="review-area" key="4" v-if="active == 'review'">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="section-head pb-40">
                                    <h5>{{review.subTitle}}</h5>
                                    <h2>{{review.title}}</h2>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6" v-for="(reviewData, key) in review.reviews" :key="key+100">
                                <div class="review-card">
                                    <div class="reviewer-img">
                                        <img :data-src="assetURL + reviewData.image" :alt="reviewData.name" class="img-fluid" v-lazy-load />
                                    </div>
                                    <div class="reviewer-info">
                                        <h3>{{reviewData.name}}</h3>
                                        <h5>Traveller</h5>
                                        <p>{{reviewData.message}}</p>
                                    </div>
                                </div>
                                <div class="text-center mt-1">
                                    <button class="btn btn-danger" @click="removeReview(key, reviewData.image, 'old')">x</button>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6" v-for="(reviewData, key) in review.newReviews" :key="key">
                                <div class="review-card">
                                    <div class="reviewer-img">
                                        <img :data-src="reviewData.image" :alt="reviewData.name" class="img-fluid" v-lazy-load />
                                    </div>
                                    <div class="reviewer-info">
                                        <h3>{{reviewData.name}}</h3>
                                        <h5>Traveller</h5>
                                        <p>{{reviewData.message}}</p>
                                    </div>
                                </div>
                                <div class="text-center mt-1">
                                    <button class="btn btn-danger" @click="removeReview(key, reviewData.image, 'new')">x</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer-area" key="5" v-if="active == 'footer'">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="footer-info">
                                        <div class="footer-logo text-center">
                                            <img :data-src="footer.oldImage" class="img-fluid mh-100-px" v-lazy-load />
                                        </div>
                                        <p>{{footer.message}}</p>
                                        <div class="footer-social-icons">
                                            <h5>Follow Us:</h5>
                                            <ul>
                                                <li>
                                                    <a class="pointer" :href="'https://' + footer.social.facebook" target="_blank">
                                                        <client-only>
                                                            <icon :icon="['fab', 'facebook-f']"></icon>
                                                        </client-only>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="pointer" :href="'https://' + footer.social.instagram" target="_blank">
                                                        <client-only>
                                                            <icon :icon="['fab', 'instagram']"></icon>
                                                        </client-only>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="pointer" :href="'https://' + footer.social.twitter" target="_blank">
                                                        <client-only>
                                                            <icon :icon="['fab', 'twitter']"></icon>
                                                        </client-only>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="pointer" :href="'https://wa.me/' + footer.social.whatsapp" target="_blank">
                                                        <client-only>
                                                            <icon :icon="['fab', 'whatsapp']"></icon>
                                                        </client-only>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <div class="footer-links">
                                        <h5 class="widget-title">Contact us</h5>

                                        <div class="contact-box">
                                            <span>
                                                <client-only>
                                                    <icon icon="phone"></icon>
                                                </client-only>
                                            </span>
                                            <div>
                                                <a :href="'tel:' + phone" v-for="(phone, key) in footer.phone" :key="key">{{phone}}</a>
                                            </div>
                                        </div>
                                        <div class="contact-box">
                                            <span>
                                                <client-only>
                                                    <icon icon="at"></icon>
                                                </client-only>
                                            </span>
                                            <div>
                                                <a :href="'mailto:' + email" v-for="(email, key) in footer.email" :key="key">{{email}}</a>
                                            </div>
                                        </div>
                                        <div class="contact-box">
                                            <span>
                                                <client-only>
                                                    <icon icon="map-marker-alt"></icon>
                                                </client-only>
                                            </span>
                                            <div>
                                                <p>{{footer.address}}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <div class="footer-links">
                                        <h5 class="widget-title">support</h5>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="footer-links payment-links">
                                        <h5 class="widget-title">Newsletter</h5>
                                        <p>{{footer.newsletterMessage}}</p>
                                        <form action="#" class="footer-subscriber-form d-flex">
                                            <input type="email">
                                            <input type="submit" value="Subscribe">
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer-bottom mt-3">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="copyrigth-area text-center">
                                            <p>{{footer.copyright}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer-area" key="6" v-if="active == 'breadcrumb'">
                        <div>
                            <h1 class="text-center">Breadcrumb Image</h1>
                            <div class="breadcrumb-area" :style="'background: linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5) 100%), url(' + assetURL + breadcrumb.image + ')'">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12 col-sm-12">
                                            <div class="breadcrumb-wrap">
                                                <h2>Tour Packages of Category or user name</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <transition name="slide" mode="out-in">
                            <div class="mt-5" v-if="breadcrumb.newImage">
                                <h1 class="text-center">Breadcrumb New Image</h1>
                                <div class="breadcrumb-area" :style="'background: linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5) 100%), url(' + breadcrumb.newImage + ')'">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-12 col-md-12 col-sm-12">
                                                <div class="breadcrumb-wrap">
                                                    <h2>Tour Packages of Category or user name</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    head() {
        return {
            title: "Section Editor - Dashboard",
        };
    },

    data() {
        return {
            click: true,
            packages: {},
            sliderPackage: {
                activePackages: [],
            },
            active: "",
            header: {
                image: "",
                oldImage: "",
                phone: "",
                email: "",
            },
            achievementImage: "",
            achievementName: "",
            achievement: {
                title: "",
                subTitle: "",
                achievements: [],
                oldAchievementImages: [],
                newAchievements: [],
            },
            reviewImage: "",
            reviewName: "",
            reviewMessage: "",
            review: {
                title: "",
                subTitle: "",
                reviews: [],
                oldReviewImages: [],
                newReviews: [],
            },
            contactNumber: "",
            contactEmail: "",
            footer: {
                image: "",
                oldImage: "",
                message: "",
                copyright: "",
                newsletterMessage: "",
                social: {
                    facebook: "",
                    twitter: "",
                    instagram: "",
                    whatsapp: "",
                },
                phone: [],
                email: [],
                address: "",
            },
            breadcrumb: {
                newImage: "",
                image: "",
            },
        }
    },

    methods: {
        // Get Section Editor Information
        getSectionEditor() {
            this.$axios.get("section-editor").then(
                (response) => {
                    if (response.data.header !== null) {
                        this.header.oldImage = this.assetURL + JSON.parse(response.data.header.info).image;
                        this.header.phone = JSON.parse(response.data.header.info).phone;
                        this.header.email = JSON.parse(response.data.header.info).email;
                    }

                    if (response.data.activePackages !== null) {
                        this.sliderPackage.activePackages = JSON.parse(response.data.activePackages.info).id;
                        this.packages = response.data.packages;
                    }

                    if (response.data.achievement !== null) {
                        this.achievement.title = JSON.parse(response.data.achievement.info).title;
                        this.achievement.subTitle = JSON.parse(response.data.achievement.info).subTitle;
                        this.achievement.achievements = JSON.parse(response.data.achievement.info).achievements;
                        this.achievement.oldAchievementImages = [];
                        this.achievement.newAchievements = [];
                    }

                    if (response.data.review !== null) {
                        this.review.title = JSON.parse(response.data.review.info).title;
                        this.review.subTitle = JSON.parse(response.data.review.info).subTitle;
                        this.review.reviews = JSON.parse(response.data.review.info).reviews;
                        this.review.oldReviewImages = [];
                        this.review.newReviews = [];
                    }

                    if (response.data.footer !== null) {
                        this.footer.oldImage = this.assetURL + JSON.parse(response.data.footer.info).image;
                        this.footer.message = JSON.parse(response.data.footer.info).message;
                        this.footer.newsletterMessage = JSON.parse(response.data.footer.info).newsletterMessage;
                        this.footer.social = JSON.parse(response.data.footer.info).social;
                        this.footer.phone = JSON.parse(response.data.footer.info).phone;
                        this.footer.email = JSON.parse(response.data.footer.info).email;
                        this.footer.address = JSON.parse(response.data.footer.info).address;
                        this.footer.copyright = JSON.parse(response.data.footer.info).copyright;
                    }

                    if (response.data.breadcrumb !== null) {
                        this.breadcrumb.image = response.data.breadcrumb.info;
                        this.breadcrumb.newImage = "";
                    }
                },
                (error) => {
                    $nuxt.$emit("error", error);
                },
            )
        },
        getResults(page = 1) {
            this.$axios.get("section-editor-package?page=" + page).then(
                (response) => {
                    this.packages = response.data.packages;
                });
        },

        // Update Header Section
        updateHeader() {
            if (this.click) {
                this.click = false;
                this.$axios.post("update-header", this.header).then(
                    () => {
                        $nuxt.$emit("success", "Header Section Successfully Updated");
                        $nuxt.$emit("triggerSectionEditor");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        //Add Slider Package
        addPackage(id) {
            this.sliderPackage.activePackages.push(id);
        },

        //Remove Slider Package
        removePackage(id) {
            let key = this.sliderPackage.activePackages.findIndex(findKey => findKey == id);
            this.sliderPackage.activePackages.splice(key, 1);
        },

        // Update Home Slider
        updateHomeSlider() {
            if (this.click) {
                this.click = false;
                this.$axios.post("add-slider-package", this.sliderPackage).then(
                    (response) => {
                        $nuxt.$emit("success", "Home Page Slider Section Successfully Updated");
                        $nuxt.$emit("triggerSectionEditor");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // Add New Achievement
        addAchievement() {
            this.achievement.newAchievements.push({ image: this.achievementImage, name: this.achievementName });
            this.achievementImage = "";
            this.achievementName = "";
        },

        // Remove Existing Achievement
        removeAchievement(key, image, status) {
            if (status == 'old') {
                this.achievement.oldAchievementImages.push(image);
                this.achievement.achievements.splice(key, 1);
            } else {
                this.achievement.newAchievements.splice(key, 1);
            }
        },

        //Update Achievement Section
        updateAchievement() {
            if (this.click) {
                this.click = false;
                this.$axios.post("update-achievement", this.achievement).then(
                    () => {
                        $nuxt.$emit("success", "Achievement Section Successfully Updated");
                        $nuxt.$emit("triggerSectionEditor");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // Add New Review
        addReview() {
            this.review.newReviews.push({ image: this.reviewImage, name: this.reviewName, message: this.reviewMessage });
            this.reviewImage = "";
            this.reviewName = "";
            this.reviewMessage = "";
        },

        // Remove Existing Review
        removeReview(key, image, status) {
            if (status == 'old') {
                this.review.oldReviewImages.push(image);
                this.review.reviews.splice(key, 1);
            } else {
                this.review.newReviews.splice(key, 1);
            }
        },

        //Update Review Section
        updateReview() {
            if (this.click) {
                this.click = false;
                this.$axios.post("update-review", this.review).then(
                    () => {
                        $nuxt.$emit("success", "Review Section Successfully Updated");
                        $nuxt.$emit("triggerSectionEditor");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        //Add Footer Contact Number
        addNumber(number) {
            this.footer.phone.push(number);
            this.contactNumber = "";
        },

        //Remove Footer Contact Number
        removeNumber(key) {
            this.footer.phone.splice(key, 1);
        },

        //Add Footer Contact Email
        addEmail(email) {
            this.footer.email.push(email);
            this.contactEmail = "";
        },

        //Remove Footer Contact Email
        removeEmail(key) {
            this.footer.email.splice(key, 1);
        },

        // Update Footer
        updateFooter() {
            if (this.click) {
                this.click = false;
                this.$axios.post("update-footer", this.footer).then(
                    () => {
                        $nuxt.$emit("success", "Footer Section Successfully Updated");
                        $nuxt.$emit("triggerSectionEditor");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // Update Breadcrumb Image
        updateBreadcrumb() {
            if (this.click) {
                this.click = false
                this.$axios.post("update-breadcrumb", this.breadcrumb).then(
                    (response) => {
                        $nuxt.$emit("success", "Breadcrumb Section Successfully Updated");
                        $nuxt.$emit("triggerSectionEditor");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // show Selected image
        image(event, status) {
            if (event.target.files.length > 0) {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    if (status == 'header') {
                        this.header.image = reader.result;
                    } else if (status == 'achievement') {
                        this.achievementImage = reader.result;
                    } else if (status == 'review') {
                        this.reviewImage = reader.result;
                    } else if (status == 'footer') {
                        this.footer.image = reader.result;
                    } else if (status == 'breadcrumb') {
                        this.breadcrumb.newImage = reader.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        },
    },

    created() {
        if (this.admin) {
            this.getSectionEditor();
            this.$nuxt.$on("triggerSectionEditor", () => {
                this.getSectionEditor();
            });
        } else {
            this.$router.push("/login")
        }
    },
};
</script>
