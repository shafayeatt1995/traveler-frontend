<template>
    <div class="container">
        <div class="about-us">
            <div class="text-center">
                <h1 class="strong my-5 title">About Us</h1>
            </div>
            <div class="ql-editor" v-html="message"></div>
            <h1 class="text-center mt-5">{{title}}</h1>
            <p class="text-center">{{subTitle}}</p>
            <div class="about-member">
                <ul>
                    <li class="text-center" v-for="(member, key) in members" :key="key">
                        <img :data-src="assetURL + member.image" class="img-fluid" :alt="member.name" v-lazy-load>
                        <h4>{{member.name}}</h4>
                        <p>{{member.designation}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    head() {
        return {
            title: "About Us - " + this.appName,
            meta: [{
                hid: "description",
                name: "description",
                content: this.meta !== null ? this.meta : "",
            }],
        };
    },

    data() {
        return {
            message: "",
            title: "",
            subTitle: "",
            members: [],
            meta: "",
        }
    },

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "about");
        let about = JSON.parse(response.data.about.page);
        return {
            message: about.message,
            title: about.title,
            subTitle: about.subTitle,
            members: about.members,
            meta: response.data.about.meta,
        }
    },
}
</script>