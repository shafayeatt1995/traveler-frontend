<template>
<div>
    <!-- =============== Topbar area start =============== -->
    <div class="active-account" v-if="authCheck">
        <div class="container" v-if="authUser.email_verified_at == null">
            <nuxt-link :to="{ name: 'active-account' }" class="text-center strong d-block color-black py-2">Click To Active Your Aaccount</nuxt-link>
        </div>
    </div>
    <!-- =============== Topbar area end =============== -->

    <!-- =============== Topbar area start =============== -->
    <div class="topbar-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 tob-contact-row">
                    <div class="topbar-contact-left">
                        <ul>
                            <li>
                                <a :href="'tel:' + phone" class="ms-1">
                                    <client-only>
                                        <icon icon="phone-alt"></icon>
                                    </client-only>
                                    {{ phone }}
                                </a>
                            </li>
                            <li>
                                <a :href="'mailto:' + email" class="ms-1">
                                    <client-only>
                                        <icon icon="at"></icon>
                                    </client-only>
                                    {{ email }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="topbar-contact-right">
                        <ul class="justify-content-end" v-if="authCheck">
                            <li>
                                <nuxt-link :to="{ name: 'wishlist' }">
                                    <client-only>
                                        <icon icon="heart"></icon>
                                    </client-only>
                                    Wishlist
                                </nuxt-link>
                            </li>
                            <li>
                                <nuxt-link :to="{ name: 'dashboard' }">
                                    <client-only>
                                        <icon icon="tachometer-alt"></icon>
                                    </client-only>
                                    Dashboard
                                </nuxt-link>
                            </li>
                        </ul>
                        <ul class="justify-content-end" v-else>
                            <li>
                                <nuxt-link :to="{ name: 'login' }">Login</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link :to="{ name: 'register' }">Register</nuxt-link>
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
                                <nuxt-link :to="{ name: 'index' }" class="navbar-brand">
                                    <img :src="assetURL + logo" alt="logo" class="img-fluid" />
                                </nuxt-link>
                                <div class="mobile-menu pointer" @click="mobileMenu = !mobileMenu">
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-10">
                        <nav class="main-nav" :class="mobileMenu ? 'active' : ''">
                            <span class="menu-close-btn pointer" @click="mobileMenu = !mobileMenu">
                                <client-only>
                                    <icon icon="times"></icon>
                                </client-only>
                            </span>
                            <ul>
                                <li>
                                    <nuxt-link :to="{ name: 'index' }">Home</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'guides' }">Guides</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'destination' }">Destinations</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'posts' }">Blog</nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link :to="{ name: 'packages' }">Packages</nuxt-link>
                                </li>
                                <li class="has-child-menu">
                                    <a class="pointer" @click="
                                                mobileSubMenu = !mobileSubMenu
                                            ">Pages
                                        <span class="menu-dropdown-icon" :class="
                                                    mobileSubMenu
                                                        ? 'active'
                                                        : ''
                                                ">
                                            <client-only>
                                                <icon icon="angle-down"></icon>
                                            </client-only>
                                        </span>
                                    </a>
                                    <transition name="slide" mode="out-in">
                                        <ul class="sub-menu" v-if="mobileSubMenu">
                                            <li>
                                                <nuxt-link class="sub-item" :to="{ name: 'about' }">About Us</nuxt-link>
                                            </li>
                                            <li>
                                                <nuxt-link class="sub-item" :to="{
                                                            name: 'contact',
                                                        }">Contact Us</nuxt-link>
                                            </li>
                                            <li>
                                                <nuxt-link class="sub-item" :to="{ name: 'faq' }">FAQ</nuxt-link>
                                            </li>
                                        </ul>
                                    </transition>
                                </li>
                                <li class="mobile-logout" v-if="authCheck">
                                    <a class="pointer" @click.prevent="logout">Logout</a>
                                </li>
                            </ul>
                            <div class="navbar-icons">
                                <div class="text-center mobile-bottom-menu">
                                    <nuxt-link :to="{ name: 'index' }">
                                        <client-only>
                                            <icon icon="home"></icon>
                                        </client-only>
                                    </nuxt-link>
                                </div>
                                <div class="searchbar-open pointer">
                                    <client-only>
                                        <icon icon="search" @click="
                                                    active_search =
                                                        !active_search
                                                "></icon>
                                    </client-only>
                                </div>
                                <div class="text-center mobile-bottom-menu">
                                    <nuxt-link :to="{ name: 'wishlist' }">
                                        <client-only>
                                            <icon :icon="['far', 'heart']"></icon>
                                        </client-only>
                                    </nuxt-link>
                                </div>
                                <div class="user-dropdown-icon pointer">
                                    <client-only>
                                        <icon :icon="['far', 'user']" @click="
                                                    account_dropdown =
                                                        !account_dropdown
                                                "></icon>
                                    </client-only>
                                    <div class="account-dropdown" :class="
                                                account_dropdown
                                                    ? 'activeCard'
                                                    : ''
                                            ">
                                        <ul v-if="authCheck">
                                            <li class="account-el">
                                                <nuxt-link :to="{
                                                            name: 'dashboard',
                                                        }">
                                                    <client-only>
                                                        <icon :icon="[
                                                                    'far',
                                                                    'user-circle',
                                                                ]"></icon>
                                                    </client-only>
                                                    My Account
                                                </nuxt-link>
                                            </li>
                                            <li class="account-el">
                                                <nuxt-link :to="{
                                                            name: 'dashboard-tour-booking',
                                                        }">
                                                    <client-only>
                                                        <icon icon="running"></icon>
                                                    </client-only>
                                                    Tour Booking
                                                </nuxt-link>
                                            </li>
                                            <li class="account-el">
                                                <nuxt-link :to="{
                                                            name: 'dashboard-edit-profile',
                                                        }">
                                                    <client-only>
                                                        <icon icon="cogs"></icon>
                                                    </client-only>
                                                    Settings
                                                </nuxt-link>
                                            </li>
                                            <li class="account-el">
                                                <a @click.prevent="logout" class="pointer">
                                                    <client-only>
                                                        <icon icon="sign-out-alt"></icon>
                                                    </client-only>
                                                    Log out
                                                </a>
                                            </li>
                                        </ul>
                                        <ul v-else>
                                            <li class="account-el">
                                                <nuxt-link :to="{ name: 'login' }">
                                                    <client-only>
                                                        <icon :icon="[
                                                                    'far',
                                                                    'user-circle',
                                                                ]"></icon>
                                                    </client-only>
                                                    login
                                                </nuxt-link>
                                            </li>
                                            <li class="account-el">
                                                <nuxt-link :to="{
                                                            name: 'register',
                                                        }">
                                                    <client-only>
                                                        <icon :icon="[
                                                                    'far',
                                                                    'user-circle',
                                                                ]"></icon>
                                                    </client-only>
                                                    Register
                                                </nuxt-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="main-searchbar" :class="active_search ? 'activeSearch' : ''">
                <div class="searchbar-close">
                    <client-only>
                        <icon icon="times" @click="active_search = !active_search"></icon>
                    </client-only>
                </div>
                <input type="text" placeholder="Search Package......" v-model="search" />
                <div class="searchbar-icon">
                    <button type="button" v-if="search == ''">
                        <client-only>
                            <icon icon="search"></icon>
                        </client-only>
                    </button>

                    <nuxt-link :to="{
                                name: 'search-package-keyword',
                                params: { keyword: search },
                            }" v-else>
                        <client-only>
                            <icon icon="search"></icon>
                        </client-only>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </header>
    <!-- ===============  header area end =============== -->

    <!-- ===============  Preloader & click to top area start =============== -->
    <transition-group name="fade">
        <div class="traveler-site-preloader" v-if="preloader" key="1">
            <div class="sk-cube-grid">
                <div class="sk-cube sk-cube1"></div>
                <div class="sk-cube sk-cube2"></div>
                <div class="sk-cube sk-cube3"></div>
                <div class="sk-cube sk-cube4"></div>
                <div class="sk-cube sk-cube5"></div>
                <div class="sk-cube sk-cube6"></div>
                <div class="sk-cube sk-cube7"></div>
                <div class="sk-cube sk-cube8"></div>
                <div class="sk-cube sk-cube9"></div>
            </div>
        </div>
    </transition-group>
    <transition name="fade">
        <span class="click-to-top pointer" @click="scrollTop" v-if="scroll > 200">
            <client-only>
                <icon icon="arrow-up"></icon>
            </client-only>
        </span>
    </transition>
    <!-- ===============  Preloader & click to top area end =============== -->
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
            mobileMenu: false,
            mobileSubMenu: false,
            preloader: true,
        };
    },

    methods: {
        // Logout
        logout() {
            (this.account_dropdown = false),
            this.$auth.logout("laravelJWT").then(() => {
                this.$store.dispatch("triggerWishlist");
            });
        },

        // For Tracking Scroll
        handleScroll() {
            this.scroll = window.scrollY;
        },

        // Scroll to top
        scrollTop() {
            window.scrollTo(0, 0);
        },
    },

    // For Tracking Scroll
    beforeMount() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.handleScroll);
    },

    updated() {
        this.$nextTick(() => {
            setTimeout(() => { this.preloader = false; }, 500);
        })
    },

    computed: {
        logo() {
            return this.$store.getters.headerLogo;
        },

        phone() {
            return this.$store.getters.headerPhone;
        },

        email() {
            return this.$store.getters.headerEmail;
        },

        wishlists() {
            return this.$store.getters.wishlists;
        },

        authUser() {
            return this.$store.getters.auth_user;
        },
    },

    watch: {
        // Watch route Changes
        $route(to, from) {
            this.account_dropdown = false;
            this.active_search = false;
            this.search = "";
            this.mobileMenu = false;
            this.mobileSubMenu = false;
        },
    },
};
</script>

<style scoped>
.traveler-site-preloader {
    position: fixed;
    z-index: 99999;
    background: #fff;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sk-cube-grid {
    width: 60px;
    height: 60px;
    margin: 100px auto;
}

.sk-cube-grid .sk-cube {
    width: 33%;
    height: 33%;
    background-color: #333;
    float: left;
    -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}

.sk-cube-grid .sk-cube1 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube2 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube3 {
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

.sk-cube-grid .sk-cube4 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube5 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube6 {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube7 {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
}

.sk-cube-grid .sk-cube8 {
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube9 {
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {

    0%,
    70%,
    100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
    }

    35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
    }
}

@keyframes sk-cubeGridScaleDelay {

    0%,
    70%,
    100% {
        -webkit-transform: scale3D(1, 1, 1);
        transform: scale3D(1, 1, 1);
    }

    35% {
        -webkit-transform: scale3D(0, 0, 1);
        transform: scale3D(0, 0, 1);
    }
}
</style>
