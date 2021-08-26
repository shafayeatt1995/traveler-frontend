<template>
    <!-- ==============  Footer area start================= -->
    <div class="footer-area mt-40 pt-40">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-12">
                    <div class="footer-info">
                        <div class="footer-logo">
                            <img :src="assetURL + 'images/logo-2.png'" alt="" class="img-fluid" />
                        </div>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur
                            adipisicing elit. Aliquid maxime aut ut
                            voluptate dolorum nisi ducimus ratione
                        </p>
                        <div class="footer-social-icons">
                            <h5>Follow Us:</h5>
                            <ul>
                                <li>
                                    <a href="#">
                                        <client-only>
                                            <icon :icon="['fab', 'facebook-f']"></icon>
                                        </client-only>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <client-only>
                                            <icon :icon="['fab', 'instagram']"></icon>
                                        </client-only>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <client-only>
                                            <icon :icon="['fab', 'twitter']"></icon>
                                        </client-only>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <client-only>
                                            <icon :icon="['fab', 'dribbble']"></icon>
                                        </client-only>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-md-12">
                    <div class="row">
                        <div class="col-lg-5 col-md-5 col-sm-7">
                            <div class="footer-links">
                                <h5 class="widget-title">Contact us</h5>

                                <div class="contact-box">
                                    <span><i class="bx bx-phone"></i></span>
                                    <div>
                                        <a href="tel:+01852-1265122">+01852-1265122</a>
                                        <a href="tel:+01852-1265122">+01852-1265122</a>
                                    </div>
                                </div>
                                <div class="contact-box">
                                    <span
                                        ><i class="bx bx-mail-send"></i
                                    ></span>
                                    <div>
                                        <a href="https://demo.egenslab.com/cdn-cgi/l/email-protection#620b0c040d22071a030f120e074c010d0f">
                                            <span class="__cf_email__" data-cfemail="b2dbdcd4ddf2d7cad3dfc2ded79cd1dddf">[email&#160;protected]</span></a>
                                        <a href="https://demo.egenslab.com/cdn-cgi/l/email-protection#f0838580809f8284b09588919d809c95de939f9d">
                                            <span class="__cf_email__" data-cfemail="43303633332c313703263b222e332f266d202c2e">[email&#160;protected]</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="contact-box">
                                    <span><i class="bx bx-location-plus"></i></span>
                                    <div>
                                        <a href="#">2752 Willison Street <br />Eagan, United State</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-5">
                            <div class="footer-links">
                                <h5 class="widget-title">support</h5>
                                <div class="category-list">
                                    <ul>
                                        <li>
                                            <nuxt-link to="/guide-apply">Want to be a Guide</nuxt-link>
                                        </li>
                                        <li>
                                            <a href="contact.html">Contact us</a>
                                        </li>
                                        <li>
                                            <a href="about.html">About us</a>
                                        </li>
                                        <li><a href="#">Services</a></li>
                                        <li>
                                            <a href="blog.html">our Blogs</a>
                                        </li>
                                        <li>
                                            <a href="#">terms and conditions</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                            <div class="footer-links payment-links">
                                <h5 class="widget-title">We Accepts:</h5>
                                <!-- <div class="payment-cards">
                                    <img
                                        src="assets/images/payment/payment-card-2.png"
                                        alt=""
                                        class="img-fluid"
                                    />
                                    <img
                                        src="assets/images/payment/payment-card-1.png"
                                        alt=""
                                        class="img-fluid"
                                    />
                                    <img
                                        src="assets/images/payment/payment-card-3.png"
                                        alt=""
                                        class="img-fluid"
                                    />
                                    <img
                                        src="assets/images/payment/payment-card-4.png"
                                        alt=""
                                        class="img-fluid"
                                    />
                                    <img
                                        src="assets/images/payment/payment-card-5.png"
                                        alt=""
                                        class="img-fluid"
                                    />
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="copyrigth-area">
                        <p>
                            Copyright 2021 <a href="#">TourX</a> | Design By
                            <a href="#">Egens Lab</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ==============  Footer area end================= -->
</template>
<script>
export default {
    data() {
        return {
            dashboard: false
        };
    },
};
</script>