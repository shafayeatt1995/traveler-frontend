<template>
<div class="container" v-if="authCheck">
    <h1 class="my-5 text-center">Wishlists</h1>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr class="text-center">
                    <th>SI</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody v-if="wishlists.length > 0">
                <tr class="text-center" v-for="(wishlist, key) in wishlists" :key="wishlist.id">
                    <th class="align-middle text-center">{{key + 1}}</th>
                    <td class="align-middle">
                        <nuxt-link :to="{name: 'package-slug', params: {slug: wishlist.package.slug}}">
                            <img :data-src="assetURL + wishlist.package.thumbnail" :alt="wishlist.package.name" class="img-fluid mh-200" v-lazy-load />
                        </nuxt-link>
                    </td>
                    <td class="align-middle">
                        <nuxt-link :to="{name: 'package-slug', params: {slug: wishlist.package.slug}}">
                            {{wishlist.package.name}}
                        </nuxt-link>
                    </td>
                    <td class="align-middle">
                        <p v-if="wishlist.package.discount === null">${{wishlist.package.price | currency}}</p>
                        <p v-else><del>${{wishlist.package.price |currency}}</del> ${{wishlist.package.discount | currency}}</p>
                    </td>
                    <td class="align-middle">
                        <button type="button" class="remove-wishlist" @click="removeWishlist(wishlist.package.id)">
                            <client-only>
                                <icon icon="times"></icon>
                            </client-only>
                        </button>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <th colspan="5">
                        <Empty message="No Product Found" />
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="container" v-else>
    <div class="text-center mt-5">
        <h3>Please <span>
                <nuxt-link :to="{name: 'login'}" class="text-primary strong">Login</nuxt-link>
            </span> or <span>
                <nuxt-link :to="{name: 'register'}" class="text-primary strong">Register</nuxt-link>
            </span> For Booking Your Ticket</h3>
    </div>
</div>
</template>

<script>
import axios from "axios"
export default {
    head() {
        return {
            title: "Wishlist - " + this.appName,
            link: [{rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
        }
    },

    methods: {
        // Remove Wishlist
        removeWishlist(id) {
            if (this.click) {
                this.click = false
                this.$axios.post("remove-wishlist/" + id).then(
                    () => {
                        this.$store.dispatch('triggerWishlist');
                        $nuxt.$emit("success", "Package Successfully Remove From Wishlist");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },
    },

    computed: {
        wishlists() {
            return this.$store.getters.wishlists;
        }
    },

    created() {
        this.$store.dispatch('triggerWishlist');
    },
}
</script>
