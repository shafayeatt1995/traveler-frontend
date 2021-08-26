<template>
    <div>
        <!-- ===============  Main banner area start =============== -->
        <div class="main-banner">
            <div class="banner-slider owl-carousel">
                <div class="slider-item slider-item-1">
                    <div class="container">
                        <div class="slider-content wow fadeInLeft animated" data-wow-delay="300ms" data-wow-duration="1500ms" >
                            <h2>Amazing Tour In
                                Hampshire </h2>
                                <h5>7 Days, 8 Night Tour</h5>
                                <div class="banner-btn">
                                    <a href="package.html" class="btn-common">Book Now</a>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="slider-item slider-item-2">
                    <div class="container">
                        <div class="slider-content wow fadeInLeft animated" data-wow-delay="300ms" data-wow-duration="1500ms" >
                            <h2>Amazing Tour In
                                Indonesia </h2>
                                <h5>7 Days, 8 Night Tour</h5>
                                <div class="banner-btn">
                                    <a href="package.html" class="btn-common">Book Now</a>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="slider-item slider-item-3">
                    <div class="container">
                        <div class="slider-content wow fadeInLeft animated" data-wow-delay="300ms" data-wow-duration="1500ms" >
                            <h2>Amazing Tour In
                                madagascar </h2>
                                <h5>7 Days, 8 Night Tour</h5>
                                <div class="banner-btn">
                                    <a href="package.html" class="btn-common">Book Now</a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===============  Main banner area end =============== -->

        <!-- ===============  Package  area start =============== -->
        <div class="package-area pt-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="section-head pb-45">
                            <h5>Choose Our Package</h5>
                            <h2>Select Our best Package For Your Travel</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-6" v-for="pack in packages" :key="pack.id">
                        <div class="package-card">
                            <div class="package-thumb">
                                <nuxt-link :to="'package/' + pack.slug">
                                    <img :src="assetURL + JSON.parse(pack.images)[0]" :alt="pack.name" class="img-fluid h-250">
                                </nuxt-link>
                            </div>
                            <div class="package-details">
                                <div class="package-info">
                                    <h5 v-if="pack.discount === null">${{pack.price | currency}}/Per Person</h5>
                                    <h5 v-else><del>${{pack.price |currency}}</del> ${{pack.discount | currency}} /Per Person</h5>
                                    <h5>
                                        <client-only>
                                            <icon icon="calendar-alt"></icon>
                                        </client-only>
                                        {{pack.duration}}
                                    </h5>
                                </div>
                                <h4>
                                    <nuxt-link :to="'package/' + pack.slug">{{pack.name}}</nuxt-link>
                                </h4>
                                <div class="package-address">
                                    <strong>
                                        <client-only>
                                            <icon icon="map-marker-alt"></icon>
                                        </client-only> 
                                        <span class="mx-2">{{pack.address}}</span>
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===============  Package  area end =============== -->

        <!-- =============== Destinations area start =============== -->
        <div class="destinations-area pt-105">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="section-head pb-40">
                            <h5>Choose Our Package</h5>
                            <h2>Select Our best Package For Your Travel</h2>
                        </div>
                    </div>
                </div>

                <div class="row" v-for="(place, key) in locationPackages" :key="place.id">
                    <div class="col-lg-3 col-md-3" v-if="key % 2 == 0">
                        <div class="package-slider-wrap">
                            <img :src="assetURL + place.image" class="img-fluid">
                            <div class="pakage-overlay">
                                <strong>{{place.name}}</strong>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9 col-md-9">
                        <div class="row" :class="key % 2 == 0 ? 'destinations-1' : 'destinations-2'">
                            <client-only> <!-- important to add no-ssr-->
                                <carousel :responsive="{0:{items:1}, 768:{items:2}, 992:{items:3}}" :autoplay="false" :nav="true" :dots="false" :margin="20">
                                    <div class="package-card" v-for="pack in place.packages" :key="pack.id">
                                        <div class="package-thumb">
                                            <nuxt-link :to="'package' + pack.slug">
                                                <img :src="assetURL + JSON.parse(pack.images)[0]" :alt="pack.name" class="img-fluid">
                                            </nuxt-link>
                                        </div>
                                        <div class="package-details">
                                            <div class="package-info">
                                                <h5 v-if="pack.discount === null">${{pack.price | currency}}/Per Person</h5>
                                                <h5 v-else><del>${{pack.price |currency}}</del> ${{pack.discount | currency}} /Per Person</h5>
                                                <h5>
                                                    <client-only>
                                                        <icon icon="calendar-alt"></icon>
                                                    </client-only>
                                                    {{pack.duration}}
                                                </h5>
                                                <h4>
                                                    <nuxt-link :to="'package/' + pack.slug" class="strong">{{pack.name}}</nuxt-link>
                                                </h4>
                                            </div>
                                            <div class="package-address">
                                                <strong>
                                                    <client-only>
                                                        <icon icon="map-marker-alt"></icon>
                                                    </client-only> 
                                                    <span class="mx-2">{{pack.address}}</span>
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </carousel>
                            </client-only>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3" v-if="key % 2 !== 0">
                        <div class="package-slider-wrap">
                            <img :src="assetURL + place.image" class="img-fluid">
                            <div class="pakage-overlay">
                                <strong>{{place.name}}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- =============== Destinations area end =============== -->
        
        <!-- =============== achievement area start =============== -->
        <div class="achievement-area p-80 mt-120" :style="'background-image: url(' + assetURL + 'images/achiv-shape.png)'" v-if="achievement !== null">
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
                    <div class="col-lg-3 col-md-6 col-sm-6 mb-2" v-for="(achieve, key) in achievement.achievements" :key="key">
                        <div class="achievement-card mt-30">
                            <img :src="assetURL + achieve.image" class="img-fluid mh-100-px mb-2">
                            <h5>{{achieve.name}}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- =============== achievement area end =============== -->

        <!-- =============== Review area start =============== -->
        <div class="review-area mt-120" v-if="review !== null">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="section-head pb-40">
                            <h5>{{review.title}}</h5>
                            <h2>{{review.subTitle}}</h2>
                        </div>
                    </div>
                </div>
                <div class="review-slider">
                    <client-only>
                        <carousel :responsive="{0:{items:1}, 768:{items:2}, 992:{items:3}}" :autoplay="false" :nav="false" :dots="true" :margin="20">
                            <div class="review-card" v-for="(review, key) in review.reviews" :key="key">
                                <div class="reviewer-img">
                                    <img :src="assetURL + review.image" :alt="review.name" class="img-fluid">
                                </div>
                                <div class="reviewer-info">
                                    <h3>{{review.name}}</h3>
                                    <h5>Traveller</h5>
                                    <p>{{review.message}}</p>
                                </div>
                            </div>
                        </carousel>
                    </client-only>
                </div> 
            </div>
        </div>
        <!-- =============== Review area end =============== -->

        <!-- ===============  Blog area start =============== -->
        <div class="blog-area pt-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="section-head pb-30">
                            <h5>Latest Blog</h5>
                            <h2>Stay Updated And new post our Blog</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-6 wow fadeInLeft animated"  data-wow-duration="1500ms" data-wow-delay="0ms" >
                        <div class="blog-card">
                            <div class="blog-img">
                                <img src="assets/images/blog/b-1.png" alt="" class="img-fluid">
                                <div class="blog-date"><i class="flaticon-calendar"></i> 1 April, 2021</div>
                            </div>
                            <div class="blog-details">
                                <div class="blog-info">
                                    <a class="blog-writer" href="#"><i class="flaticon-user"></i>Dina Jems</a>
                                    <a class="blog-comment" href="#"><i class="flaticon-comment"></i><span>(3)</span>Comment</a>
                                </div>
                                <a href="blog-details.html" class="blog-title">Donec egestas orci viverra
                                    fermentum risus.</a>
                                <div class="blog-btn">
                                    <a href="blog-details.html" class="btn-common-sm">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6  wow fadeInLeft animated"  data-wow-duration="1500ms" data-wow-delay="300ms">
                        <div class="blog-card">
                            <div class="blog-img">
                                <img src="assets/images/blog/b-2.png" alt="" class="img-fluid">
                                <div class="blog-date"><i class="flaticon-calendar"></i> 1 April, 2021</div>
                            </div>
                            <div class="blog-details">
                                <div class="blog-info">
                                    <a class="blog-writer" href="#"><i class="flaticon-user"></i>Dina Jems</a>
                                    <a class="blog-comment" href="#"><i class="flaticon-comment"></i><span>(3)</span>Comment</a>
                                </div>
                                <a href="blog-details.html" class="blog-title">Praesent ut mattis ante the Nullam lobortis. </a>
                                <div class="blog-btn">
                                    <a href="blog-details.html" class="btn-common-sm">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6 wow fadeInLeft animated"  data-wow-duration="1500ms" data-wow-delay="600ms">
                        <div class="blog-card">
                            <div class="blog-img">
                                <img src="assets/images/blog/b-3.png" alt="" class="img-fluid">
                                <div class="blog-date"><i class="flaticon-calendar"></i> 1 April, 2021</div>
                            </div>
                            <div class="blog-details">
                                <div class="blog-info">
                                    <a class="blog-writer" href="#"><i class="flaticon-user"></i>Dina Jems</a>
                                    <a class="blog-comment" href="#"><i class="flaticon-comment"></i><span>(3)</span>Comment</a>
                                </div>
                                <a href="blog-details.html" class="blog-title">Maecenas vehicula risus non neque tincidunt.</a>
                                <div class="blog-btn">
                                    <a href="blog-details.html" class="btn-common-sm">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ===============  Blog area end =============== -->
    </div>
</template>
<script>
import axios from "axios"
import login from './login.vue';
export default {
    components: { login },
    head() {
        return {
            title: "Home - " + this.appName,
        };
    },

    data() {
        return {
            packages: {},
            locationPackages: {},
            achievement: {},
            review: {},
        }
    },

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "home");
        return {
            packages: response.data.packages,
            locationPackages: response.data.locationPackages,
            achievement: response.data.achievement !== null ? JSON.parse(response.data.achievement.info) : null,
            review: response.data.review !== null ? JSON.parse(response.data.review.info) : null,
        }
    },
};
</script>
