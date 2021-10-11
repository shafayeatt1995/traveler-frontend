<template>
    <div>
        <!-- ===============  Main banner area start =============== -->
        <div class="main-banner">
            <div class="banner-slider">
                <client-only>
                    <carousel :items="1" :autoplay="false" :nav="true" :dots="false" :loop="true">
                        <div class="slider-item" :style="'background: linear-gradient(rgba(0, 0, 0, 0.4) 100%, rgba(0, 0, 0, 0.4) 100%), url(' + assetURL + JSON.parse(pack.images)[0] + ');'" v-for="pack in sliderPackage" :key="pack.id">
                            <div class="slider-content">
                                <h2>{{pack.name}}</h2>
                                <h5>{{pack.duration_day + (pack.duration_day > 1 ? ' Days' : ' Day')}} / {{pack.duration_night + (pack.duration_night > 1 ? ' Nights' : ' Night')}}</h5>
                                <div class="banner-btn">
                                    <nuxt-link class="btn-common" :to="{name: 'package-slug', params:{slug: pack.slug}}">Book Now</nuxt-link>
                                </div>
                            </div>
                        </div>
                    </carousel>
                </client-only>
            </div>
        </div>
        <!-- ===============  Main banner area end =============== -->

        <!-- ===============  Package  area start =============== -->
        <div class="package-area pt-120">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-head pb-45">
                            <h5>Choose Our Package</h5>
                            <h2>Select Our best Package For Your Travel</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6" v-for="pack in packages" :key="pack.id">
                        <Package :pack="pack"/>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
                <nuxt-link :to="{name: 'packages'}" class="btn-common">See All Packages</nuxt-link>
            </div>
        </div>
        <!-- ===============  Package  area end =============== -->

        <!-- =============== Destinations area start =============== -->
        <div class="destinations-area pt-105">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-head pb-40">
                            <h5>Choose Our Package</h5>
                            <h2>Select Our best Package For Your Travel</h2>
                        </div>
                    </div>
                </div>

                <div class="row" v-for="(place, key) in locationPackages" :key="place.id">
                    <div class="col-lg-3" v-if="key % 2 == 0">
                        <div class="package-slider-wrap">
                            <img :data-src="assetURL + place.image" class="img-fluid" v-lazy-load/>
                            <div class="pakage-overlay">
                                <strong>{{place.name}}</strong>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="row" :class="key % 2 == 0 ? 'destinations-left' : 'destinations-right'">
                            <client-only> 
                                <carousel :responsive="{0:{items:1}, 768:{items:2}, 992:{items:3}}" :autoplay="false" :nav="true" :dots="false" :margin="20">
                                    <div  class="place-package" v-for="pack in place.packages" :key="pack.id">
                                        <Package :pack="pack" customClass="flex-column"/>
                                    </div>
                                </carousel>
                            </client-only>
                        </div>
                    </div>
                    <div class="col-lg-3" v-if="key % 2 !== 0">
                        <div class="package-slider-wrap">
                            <img :data-src="assetURL + place.image" class="img-fluid" v-lazy-load/>
                            <div class="pakage-overlay">
                                <strong>{{place.name}}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
                <nuxt-link :to="{name: 'destination'}" class="btn-common">See All Destination</nuxt-link>
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
                            <img :data-src="assetURL + achieve.image" class="img-fluid mh-100-px mb-2" v-lazy-load/>
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
                                    <img :data-src="assetURL + review.image" :alt="review.name" class="img-fluid" v-lazy-load/>
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
                    <div class="col-lg-12">
                        <div class="section-head pb-30">
                            <h5>Our Latest Blog</h5>
                            <h2>Stay Updated And new post our Blog</h2>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="posts.length > 0">
                    <div class="col-lg-4 col-md-6" v-for="post in posts" :key="post.id">
                        <Post :post="post"/>
                    </div>
                </div>
                <div class="row" v-else>
                    <Empty message="No Blog Post Found"/>
                </div>
                <div class="d-flex justify-content-center mt-3">
                    <nuxt-link :to="{name: 'posts'}" class="btn-common">See All Posts</nuxt-link>
                </div>
            </div>
        </div>
        <!-- ===============  Blog area end =============== -->
    </div>
</template>
<script>
import axios from "axios";
export default {
    head() {
        return {
            title: "Home - " + this.appName,
            link: [{rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            sliderPackage:[],
            packages: [],
            locationPackages: [],
            achievement: {},
            review: {},
            posts: [],
        }
    },

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "home");
        return {
            sliderPackage: response.data.sliderPackage,
            packages: response.data.packages,
            locationPackages: response.data.locationPackages,
            achievement: response.data.achievement !== null ? JSON.parse(response.data.achievement.info) : null,
            review: response.data.review !== null ? JSON.parse(response.data.review.info) : null,
            posts: response.data.posts,
        }
    },
};
</script>
