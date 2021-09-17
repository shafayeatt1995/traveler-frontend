<template>
    <div class="package-card">
        <div class="package-thumb">
            <nuxt-link :to="{name: 'package-slug', params: {slug: pack.slug}}">
                <img :data-src="assetURL + pack.thumbnail" :alt="pack.name" class="img-fluid" v-lazy-load/>
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
                    {{pack.duration_day + (pack.duration_day > 1 ? ' Days' : ' Day')}} / {{pack.duration_night + (pack.duration_night > 1 ? ' Nights' : ' Night')}}
                </h5>
            </div>
            <h4>
                <nuxt-link :to="{name: 'package-slug', params: {slug: pack.slug}}">{{pack.name}}</nuxt-link>
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
</template>
<script>
export default {
    props: {
        pack: {},
    }
}
</script>