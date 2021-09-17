<template>
    <div class="blog-card">
        <div class="blog-img">
            <nuxt-link :to="{name: 'post-slug', params: {slug: post.slug}}">
                <img :data-src="assetURL + post.thumbnail" :alt="post.title" class="img-fluid" v-lazy-load/>
            </nuxt-link>
            <div class="blog-date">
                <client-only>
                    <icon icon="calendar-alt"></icon>
                </client-only>
                <span class="ml-2">{{post.created_at | normalDate}}</span>
            </div>
        </div>
        <div class="blog-details">
            <div class="blog-info">
                <nuxt-link class="blog-writer" :to="{name: 'post-user-slug', params: {slug: post.user.slug}}">
                    <client-only>
                        <icon :icon="['far', 'user']"></icon>
                    </client-only>
                    <span class="ml-2">
                        {{post.user.name}}
                    </span>
                </nuxt-link>
                <p class="blog-comment">
                    <span>({{post.comments_count}}) </span>
                    {{post.comments_count > 1 ? 'Comments' : 'Comment'}}
                </p>
            </div>
            <nuxt-link :to="{name: 'post-slug', params: {slug: post.slug}}" class="blog-title">{{post.title.substring(0, 75)}}{{post.title.length > 75 ? '...':''}}</nuxt-link>
            <div class="blog-btn">
                <nuxt-link :to="{name: 'post-slug', params: {slug: post.slug}}" class="btn-common-sm">Read More</nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        post: {},
    }
}
</script>