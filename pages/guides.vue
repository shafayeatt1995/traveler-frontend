<template>
<div class="container mt-40">
    <!-- ===============  Guide area start =============== -->
    <div class="guide-wrapper">
        <div class="container">
            <h1 class="text-center text-uppercase strong">Our Tour Guide</h1>
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-6" v-for="guide in guides.data" :key="guide.id">
                    <div class="guide-card">
                        <div class="guide-thumb">
                            <nuxt-link :to="{name: 'package-user-slug', params: {slug: guide.slug}}" class="d-block">
                                <img :data-src="assetURL + guide.image" :alt="guide.name" class="img-fluid" v-lazy-load />
                            </nuxt-link>
                            <div class="guide-info">
                                <nuxt-link :to="{name: 'package-user-slug', params: {slug: guide.slug}}">
                                    <strong>{{guide.name}}</strong>
                                    <p>Tour Guide</p>
                                </nuxt-link>
                                <ul class="guide-links">
                                    <li>
                                        <a :href="JSON.parse(guide.social_profile).facebook" target="_blank">
                                            <client-only>
                                                <icon :icon="['fab', 'facebook']"></icon>
                                            </client-only>
                                        </a>
                                    </li>
                                    <li>
                                        <a :href="JSON.parse(guide.social_profile).twitter" target="_blank">
                                            <client-only>
                                                <icon :icon="['fab', 'twitter']"></icon>
                                            </client-only>
                                        </a>
                                    </li>
                                    <li>
                                        <a :href="JSON.parse(guide.social_profile).instagram" target="_blank">
                                            <client-only>
                                                <icon :icon="['fab', 'instagram']"></icon>
                                            </client-only>
                                        </a>
                                    </li>
                                    <li>
                                        <a :href="'https://wa.me/' + JSON.parse(guide.social_profile).whatsapp" target="_blank">
                                            <client-only>
                                                <icon :icon="['fab', 'whatsapp']"></icon>
                                            </client-only>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <pagination :data="guides" @pagination-change-page="getResults" class="justify-content-center mt-3 f-pagination"></pagination>
            <!-- paginate -->
        </div>
    </div>
    <!-- ===============  Guide area end =============== -->
</div>
</template>

<script>
import axios from "axios";
export default {
    head() {
        return {
            title: "Tour Guides - " + this.appName,
            link: [{rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            guides: {},
        };
    },

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "guides");
        return {
            guides: response.data.guides,
        }
    },

    methods: {
        // Get Pagination Post
        getResults(page = 1) {
            this.$axios.get("guides?page=" + page).then(
                (response) => {
                    this.guides = response.data.guides;
                }
            );
        },
    },
}
</script>
