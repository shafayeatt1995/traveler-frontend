<template>
<li class="blog-card-sm">
    <div class="blog-img-sm">
        <nuxt-link :to="{name: 'post-slug', params: {slug: post.slug}}">
            <img :data-src="assetURL + post.image" :alt="post.title" v-lazy-load />
        </nuxt-link>
    </div>
    <div class="blog-details-sm">
        <nuxt-link :to="{name: 'post-slug', params: {slug: post.slug}}" class="blog-title-sm">{{post.title.substring(0, 35)}}{{post.title.length > 35 ? '...':''}}</nuxt-link>
        <div class="blog-info">
            <nuxt-link class="blog-writer" :to="{name: 'post-user-slug', params: {slug: post.user.slug}}">
                <client-only>
                    <icon :icon="['far', 'user']" class="mr-2"></icon>
                </client-only>
                {{post.user.name}}
            </nuxt-link>
            <a class="blog-date">
                <client-only>
                    <icon icon="calendar-alt"></icon>
                </client-only>
                {{post.created_at | normalDate}}
            </a>
        </div>
    </div>
</li>
</template>

<script>
export default {
    props: {
        post: {},
    }
}
</script>
