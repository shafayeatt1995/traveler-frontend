<template>
    <!-- =============== Destinations area start =============== -->
    <div class="destinations-area pt-40" v-if="destinations !== null">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <div class="section-head pb-40">
                        <h5>Choose Our Package</h5>
                        <h2>Select Our best Package For Your Travel</h2>
                    </div>
                </div>
            </div>

            <div class="row" v-for="(destination, key) in destinations" :key="destination.id">
                <div class="col-lg-3 col-md-3" v-if="key % 2 == 0">
                    <div class="package-slider-wrap">
                        <img :data-src="assetURL + destination.image" class="img-fluid" v-lazy-load/>
                        <div class="pakage-overlay">
                            <strong>{{destination.name}}</strong>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-md-9">
                    <div class="row" :class="key % 2 == 0 ? 'destinations-1' : 'destinations-2'" v-if="destination.packages.length > 0">
                        <client-only> <!-- important to add no-ssr-->
                            <carousel :responsive="{0:{items:1}, 768:{items:2}, 992:{items:3}}" :autoplay="false" :nav="true" :dots="false" :margin="20">
                                <div class="place-package" v-for="pack in destination.packages" :key="pack.id">
                                    <Package :pack="pack"/>
                                </div>
                            </carousel>
                        </client-only>
                    </div>
                    <div class="row h-100 align-items-center text-center" v-else>
                        <h3 class="strong">There Are No Tour Packages To {{destination.name}}</h3>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3" v-if="key % 2 !== 0">
                    <div class="package-slider-wrap">
                        <img :data-src="assetURL + destination.image" class="img-fluid" v-lazy-load/>
                        <div class="pakage-overlay">
                            <strong>{{destination.name}}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Error v-else/>
    <!-- =============== Destinations area end =============== -->
</template>
<script>
import axios from "axios"
export default {
    head() {
        return {
            title: "Destination Packages - " + this.appName,
        };
    },
    data() {
        return {
            destinations: [],
        }
    },

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "destination-package");
        return {
            destinations: response.data.destinations,
        }
    },
}
</script>