<template>
<li class="package-card-sm">
    <div class="p-sm-img">
        <nuxt-link :to="{name: 'package-slug', params: {slug: pack.slug}}">
            <img :data-src="assetURL + pack.thumbnail" :alt="pack.name" v-lazy-load />
        </nuxt-link>
    </div>
    <div class="package-info">
        <div class="package-date-sm">
            <h3>
                <nuxt-link :to="{name: 'package-slug', params: {slug: pack.slug}}">{{pack.name}}</nuxt-link>
            </h3>
            <strong>
                <client-only>
                    <icon icon="calendar-alt"></icon>
                </client-only>
                {{pack.duration_day + (pack.duration_day > 1 ? ' Days' : ' Day')}} / {{pack.duration_night + (pack.duration_night > 1 ? ' Nights' : ' Night')}}
            </strong>
        </div>
        <h5 v-if="pack.discount"><span><del>${{pack.price | currency}}</del> ${{pack.discount | currency}}</span>/ Per Person</h5>
        <h5 v-else><span>${{pack.price | currency}}</span> / Per Person</h5>
    </div>
</li>
</template>

<script>
export default {
    props: {
        pack: {},
    }
}
</script>
