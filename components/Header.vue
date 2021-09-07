<template>
    <div>
        <!-- =============== Topbar area start =============== -->
        <div class="topbar-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 tob-contact-row">
                        <div class="topbar-contact">
                            <ul>
                                <li>
                                    <client-only>
                                        <icon icon="phone-alt"></icon>
                                    </client-only>
                                    <a :href="'tel:'+ phone" class="ms-1">{{phone}}</a>
                                </li>
                                <li>
                                    <client-only>
                                        <icon icon="at"></icon>
                                    </client-only>
                                    <a :href="'mailto:' + email" class="ms-1">{{email}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="topbar-contact">
                            <ul class="justify-content-end" v-if="authCheck">
                                <li>
                                    <nuxt-link :to="{name: 'dashboard'}">Dashboard</nuxt-link>
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
                        <div class="col-lg-2 col-md-12 col-sm-12 col-xs-12">
                            <div class="navbar-wrap">
                                <div class="logo d-flex justify-content-between">
                                    <nuxt-link :to="{name: 'index'}" class="navbar-brand">
                                        <img :data-src="assetURL + logo" alt="logo" class="img-fluid" v-lazy-load/>
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                            <nav class="main-nav">
                                <ul>
                                    <li>
                                        <nuxt-link :to="{name: 'index'}">Home</nuxt-link>
                                    </li>
                                    <li>
                                        <nuxt-link :to="{name: 'guides'}">Guides</nuxt-link>
                                    </li>
                                    <li>
                                        <nuxt-link :to="{name: 'destination'}">Destinations</nuxt-link>
                                    </li>
                                    <li>
                                        <nuxt-link :to="{name: 'posts'}">Posts</nuxt-link>
                                    </li>
                                    <li>
                                        <nuxt-link :to="{name: 'packages'}">Packages</nuxt-link>
                                    </li>
                                    <li class="has-child-menu">
                                        <a class="pointer">Pages 
                                            <span class="menu-dropdown-icon">
                                                <client-only>
                                                    <icon icon="angle-down"></icon>
                                                </client-only>
                                            </span>
                                        </a>
                                        <ul class="sub-menu">
                                            <li>
                                                <nuxt-link class="sub-item" :to="{name: 'about'}">About Us</nuxt-link>
                                            </li>
                                            <li>
                                                <nuxt-link class="sub-item" :to="{name: 'contact'}">Contact Us</nuxt-link>
                                            </li>
                                            <li>
                                                <nuxt-link class="sub-item" :to="{name: 'faq'}">FAQ</nuxt-link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <div class="navbar-icons-2">
                                    <div class="searchbar-open">
                                        <client-only>
                                            <icon icon="search" @click="active_search = !active_search"></icon>
                                        </client-only>
                                    </div>
                                    <div class="user-dropdown-icon">
                                        <client-only>
                                            <icon :icon="['far', 'user']" @click="account_dropdown = !account_dropdown"></icon>
                                        </client-only>
                                        <div class="account-dropdown" :class="account_dropdown ? 'activeCard' : ''">
                                            <ul v-if="authCheck">
                                                <li class="account-el">
                                                    <a @click.prevent="myAccount" class="pointer">
                                                        <client-only>
                                                            <icon :icon="['far','user-circle',]" @click="account_dropdown =!account_dropdown"></icon>
                                                        </client-only>
                                                    My Account</a>
                                                </li>
                                                <li class="account-el">
                                                    <a @click.prevent="setting" class="pointer">
                                                        <client-only>
                                                            <icon icon="cogs"></icon>
                                                        </client-only>
                                                    Settings</a>
                                                </li>
                                                <li class="account-el">
                                                    <a @click.prevent="logout" class="pointer">
                                                        <client-only>
                                                            <icon icon="sign-out-alt"></icon>
                                                        </client-only>
                                                    Log out</a>
                                                </li>
                                            </ul>
                                            <ul v-else>
                                                <li class="account-el">
                                                    <a class="pointer" @click.prevent="login">
                                                        <client-only>
                                                            <icon :icon="[ 'far', 'user-circle', ]"></icon>
                                                        </client-only>
                                                    login</a>
                                                </li>
                                                <li class="account-el">
                                                    <a class="pointer" @click.prevent="register">
                                                        <client-only>
                                                            <icon :icon="[ 'far', 'user-circle', ]"></icon>
                                                        </client-only>
                                                    Register</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                <form>
                    <div class="main-searchbar" :class="active_search ? 'activeSearch' : ''">
                        <div class="searchbar-close">
                            <client-only>
                                <icon icon="times" @click="active_search = !active_search"></icon>
                            </client-only>
                        </div>
                        <input type="text" placeholder="Search Here......"  v-model="search"/>
                        <div class="searchbar-icon">
                            <client-only>
                                <icon icon="search"></icon>
                            </client-only>
                        </div>
                    </div>
                </form>
            </div>
        </header>
        <!-- ===============  header area end =============== -->
        <transition name="fade">
            <span class="click-to-top pointer" @click="scrollTop" v-if="scroll > 200">
                <client-only>
                    <icon icon="arrow-up"></icon>
                </client-only>
            </span>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            account_dropdown: false,
            active_search: false,
            scroll: 0,
            search: "",
        };
    },

    methods: {
        // My Account
        myAccount() {
            this.account_dropdown = false,
            this.$router.push("/dashboard");
        },

        // Setting
        setting() {
            this.account_dropdown = false,
            this.$router.push("/dashboard/edit-profile");
        },
        
        // Logout
        logout() {
            this.account_dropdown = false,
            this.$auth.logout("laravelJWT");
        },

        // For Tracking Scroll
        handleScroll() {
            this.scroll = window.scrollY;
        },

        // For Push Login & Register
        login() {
            this.account_dropdown = false;
            this.$router.push("/login");
        },
        register() {
            this.account_dropdown = false;
            this.$router.push("/register");
        },

        // Scroll to top
        scrollTop() {
            window.scrollTo(0,0);
        }
    },

    // For Tracking Scroll
    beforeMount() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    },

    computed: {
        logo(){
            return this.$store.getters.headerLogo;
        },

        phone(){
            return this.$store.getters.headerPhone;
        },

        email(){
            return this.$store.getters.headerEmail;
        },
    },
};
</script>