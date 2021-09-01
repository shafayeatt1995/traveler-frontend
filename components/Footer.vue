<template>
        <!-- ==============  Footer area start================= -->
        <div class="footer-area pt-40">
            <div class="container">
                <hr>
                <div class="row">
                    <div class="col-lg-3">
                        <div class="footer-info">
                            <div class="footer-logo text-center">
                                <img :src="assetURL + logo" alt="" class="img-fluid mh-100-px"/>
                            </div>
                            <p>{{message}}</p>
                            <div class="footer-social-icons">
                                <h5>Follow Us:</h5>
                                <ul>
                                    <li>
                                        <a :href="'https://' + social.facebook" target="_blank">
                                            <client-only>
                                                <icon :icon="['fab', 'facebook-f']"></icon>
                                            </client-only>
                                        </a>
                                    </li>
                                    <li>
                                        <a :href="'https://' + social.instagram" target="_blank">
                                            <client-only>
                                                <icon :icon="['fab', 'instagram']"></icon>
                                            </client-only>
                                        </a>
                                    </li>
                                    <li>
                                        <a :href="'https://' + social.twitter" target="_blank">
                                            <client-only>
                                                <icon :icon="['fab', 'twitter']"></icon>
                                            </client-only>
                                        </a>
                                    </li>
                                    <li>
                                        <a :href="'https://wa.me/' + social.whatsapp" target="_blank">
                                            <client-only>
                                                <icon :icon="['fab', 'whatsapp']"></icon>
                                            </client-only>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="footer-links">
                            <h5 class="widget-title">Contact us</h5>
                            <div class="contact-box">
                                <span>
                                    <client-only>
                                        <icon icon="phone"></icon>
                                    </client-only>
                                </span>
                                <div>
                                    <a :href="'tel:'+ phone" v-for="(phone, key) in phones" :key="key" target="">{{phone}}</a>
                                </div>
                            </div>
                            <div class="contact-box">
                                <span>
                                    <client-only>
                                        <icon icon="at"></icon>
                                    </client-only>
                                </span>
                                <div>
                                    <a :href="'mailto:' + email" v-for="(email, key) in emails" :key="key">{{email}}</a>
                                </div>
                            </div>
                            <div class="contact-box">
                                <span>
                                    <client-only>
                                        <icon icon="map-marker-alt"></icon>
                                    </client-only>
                                </span>
                                <div>
                                    <p>{{address}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <div class="footer-links">
                            <h5 class="widget-title">support</h5>
                            <div class="category-list">
                                <ul>
                                    <li>
                                        <nuxt-link :to="{name: 'guide-apply'}">Want to be a Guide</nuxt-link>
                                    </li>
                                    <li>
                                        <a href="contact.html">Contact us</a>
                                    </li>
                                    <li>
                                        <a href="about.html">About us</a>
                                    </li>
                                    <li>
                                        <nuxt-link :to="{name: 'posts'}">Our Blogs</nuxt-link>
                                    </li>
                                    <li>
                                        <a href="#">terms and conditions</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="footer-links payment-links">
                            <h5 class="widget-title">Newsletter:</h5>
                            <p>{{newsletterMessage}}</p>
                            <form action="#" class="footer-subscriber-form mt-3">
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
                                <p>
                                    Copyright 2021 & Design By <nuxt-link :to="{name: 'index'}" class="strong">Shafayet Al-Anik</nuxt-link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ==============  Footer area end================= -->
</template>

<script>
export default {
    computed: {
        logo(){
            return this.$store.getters.footerLogo;
        },

        message(){
            return this.$store.getters.footerMessage;
        },

        social(){
            return this.$store.getters.footerSocial;
        },

        phones(){
            return this.$store.getters.footerPhone;
        },

        emails(){
            return this.$store.getters.footerEmail;
        },

        address(){
            return this.$store.getters.footerAddress;
        },

        newsletterMessage(){
            return this.$store.getters.footerNewsletterMessage;
        },
    },
}
</script>