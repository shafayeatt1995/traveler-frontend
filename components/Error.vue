<template>
    <!--Not found area start-->
    <div class="error">
        <div class="container text-center">
            <img :data-src="assetURL+'images/404.svg'" alt="404 not found" class="img-fluid h-350" v-lazy-load/>
            <p>Oops! Error 404</p>
            <h1>Page Not Found</h1>
            <h5>We can't seem to find the page you're looking for.</h5>
            <nuxt-link :to="{name: 'index'}">Go To Home</nuxt-link>
        </div>
    </div>
    <!--Not found area end-->
</template>