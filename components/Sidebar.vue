<template>
<div>
    <div class="dashboard-sidebar mobile" v-show="displayWidth <= 768">
        <div class="text-center my-2 pinter d-flex align-items-center justify-content-between px-3" @click="mobileMenu = !mobileMenu">
            <h3>Dashboard Menu</h3>
            <div class="mobile-menu pointer">
                <p></p>
            </div>
        </div>
        <transition name="long-slide">
            <ul v-if="mobileMenu">
                <li v-if="authCheck">
                    <nuxt-link :to="{name : 'dashboard'}" class="strong">Dashboard</nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link :to="{name: 'dashboard-category'}" class="strong">Category</nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link :to="{name: 'dashboard-place'}" class="strong">Place</nuxt-link>
                </li>
                <li v-if="adminOrGuide">
                    <nuxt-link :to="{name: 'dashboard-tour-package'}" class="strong">Tour Package</nuxt-link>
                </li>
                <li v-if="adminOrGuide">
                    <nuxt-link :to="{name: 'dashboard-package-booking'}" class="strong">Package Booking</nuxt-link>
                </li>
                <li v-if="authCheck">
                    <nuxt-link :to="{name: 'dashboard-tour-booking'}" class="strong">Tour Booking</nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link :to="{name: 'dashboard-message-question'}" class="strong">Message & Question</nuxt-link>
                </li>
                <li v-if="adminOrGuide">
                    <nuxt-link :to="{name: 'dashboard-blog'}" class="strong">Blog</nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link :to="{name: 'dashboard-guide-request'}" class="strong">Guide Request</nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link :to="{name: 'dashboard-page-editor'}" class="strong">Page Editor</nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link :to="{name: 'dashboard-section-editor'}" class="strong">Section Editor</nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link :to="{name: 'dashboard-admin'}" class="strong">Admin List</nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link :to="{name: 'dashboard-guide'}" class="strong">Guide List</nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link :to="{name: 'dashboard-user'}" class="strong">User List</nuxt-link>
                </li>
                <li v-if="authCheck">
                    <nuxt-link :to="{name: 'dashboard-edit-profile'}" class="strong">Edit Profile</nuxt-link>
                </li>
                <li v-if="admin">
                    <nuxt-link :to="{name: 'dashboard-site-setting'}" class="strong">Site Setting</nuxt-link>
                </li>
                <li v-if="authCheck"><a class="strong pointer" @click.prevent="logout">Logout</a></li>
            </ul>
        </transition>
    </div>
    <div class="dashboard-sidebar" v-show="displayWidth > 768">
        <h3 class="text-center my-2">Menu</h3>
        <ul>
            <li v-if="authCheck">
                <nuxt-link :to="{name : 'dashboard'}" class="strong">Dashboard</nuxt-link>
            </li>
            <li v-if="admin">
                <nuxt-link :to="{name: 'dashboard-category'}" class="strong">Category</nuxt-link>
            </li>
            <li v-if="admin">
                <nuxt-link :to="{name: 'dashboard-place'}" class="strong">Place</nuxt-link>
            </li>
            <li v-if="adminOrGuide">
                <nuxt-link :to="{name: 'dashboard-tour-package'}" class="strong">Tour Package</nuxt-link>
            </li>
            <li v-if="adminOrGuide">
                <nuxt-link :to="{name: 'dashboard-package-booking'}" class="strong">Package Booking</nuxt-link>
            </li>
            <li v-if="authCheck">
                <nuxt-link :to="{name: 'dashboard-tour-booking'}" class="strong">Tour Booking</nuxt-link>
            </li>
            <li v-if="admin">
                <nuxt-link :to="{name: 'dashboard-message-question'}" class="strong">Message & Question</nuxt-link>
            </li>
            <li v-if="adminOrGuide">
                <nuxt-link :to="{name: 'dashboard-blog'}" class="strong">Blog</nuxt-link>
            </li>
            <li v-if="admin">
                <nuxt-link :to="{name: 'dashboard-guide-request'}" class="strong">Guide Request</nuxt-link>
            </li>
            <li v-if="admin">
                <nuxt-link :to="{name: 'dashboard-page-editor'}" class="strong">Page Editor</nuxt-link>
            </li>
            <li v-if="admin">
                <nuxt-link :to="{name: 'dashboard-section-editor'}" class="strong">Section Editor</nuxt-link>
            </li>
            <li v-if="admin">
                <nuxt-link :to="{name: 'dashboard-admin'}" class="strong">Admin List</nuxt-link>
            </li>
            <li v-if="admin">
                <nuxt-link :to="{name: 'dashboard-guide'}" class="strong">Guide List</nuxt-link>
            </li>
            <li v-if="admin">
                <nuxt-link :to="{name: 'dashboard-user'}" class="strong">User List</nuxt-link>
            </li>
            <li v-if="authCheck">
                <nuxt-link :to="{name: 'dashboard-edit-profile'}" class="strong">Edit Profile</nuxt-link>
            </li>
            <li v-if="admin">
                <nuxt-link :to="{name: 'dashboard-site-setting'}" class="strong">Site Setting</nuxt-link>
            </li>
            <li v-if="authCheck"><a class="strong pointer" @click.prevent="logout">Logout</a></li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            mobileMenu: false,
        }
    },

    methods: {
        // Logout
        logout() {
            this.$auth.logout("laravelJWT").then(
                () => {
                    this.$store.dispatch('triggerWishlist');
                }
            );
        },
    },
}
</script>
