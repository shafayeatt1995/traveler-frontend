<template>
<div class="container">
    <Error v-if="empty" />
    <div class="faq-wrapper" v-else>
        <div class="text-center">
            <h1 class="strong my-5 title faq">Frequently Asked Question</h1>
        </div>
        <div class="row">
            <div class="col-lg-7">
                <div class="faq-wrap">
                    <div class="faq-box" v-for="(topic, key) in topics" :key="key">
                        <h2 class="strong" :class="key > 0 ? 'mt-5' : ''">
                            {{topic.name}}
                        </h2>
                        <div class="faq-item my-3" v-for="(qna, index) in topic.qnas" :key="index">
                            <div>
                                <p class="faq-header">
                                    <button type="button" :class="showQNA == key + '-' + index ? 'faq-active' : ''" @click="showQNA = showQNA == key + '-' + index ? '' : key + '-' + index">
                                        {{qna.question}}
                                        <client-only>
                                            <icon icon="angle-down"></icon>
                                        </client-only>
                                    </button>
                                </p>
                                <transition :name="displayWidth <= 768 ? 'long-slide' : 'slide'" mode="out-in">
                                    <div class="faq-body" v-show="showQNA == key + '-' + index">
                                        <p class="p-3">{{qna.answer}}</p>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="contact-us-form">
                    <form class="ask-form" @submit.prevent="submitMessage">
                        <h3 class="strong">Ask A Question</h3>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" id="name" class="form-control" v-model="form.name">
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="phone" id="phone" class="form-control" v-model="form.phone">
                        </div>
                        <div class="form-group">
                            <label for="email">Email address <small>(Optional)</small></label>
                            <input type="email" id="email" class="form-control" v-model="form.email">
                        </div>
                        <div class="form-group">
                            <label for="question">Your Question</label>
                            <textarea id="question" rows="4" class="form-control" v-model="form.message"></textarea>
                        </div>
                        <button type="submit" class="btn-second float-end">Ask Question</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    head() {
        return {
            title: "FAQ - " + this.appName,
            link: [{ rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }],
            meta: [{
                hid: "description",
                name: "description",
                content: this.meta !== null ? this.meta : "",
            }],
        };
    },

    data() {
        return {
            click: true,
            empty: false,
            showQNA: "",
            topics: [],
            meta: "",
            form: {
                name: "",
                phone: "",
                email: "",
                subject: "Question",
                message: "",
            },
        }
    },

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "faq");
        if (response.data.faq !== null) {
            let faq = JSON.parse(response.data.faq.page);
            return {
                click: true,
                empty: false,
                showQNA: "",
                topics: faq,
                meta: response.data.faq.meta,
                form: {
                    name: "",
                    phone: "",
                    email: "",
                    subject: "Question",
                    message: "",
                },
            }
        } else {
            return {
                click: true,
                empty: true,
                showQNA: "",
                topics: [],
                meta: "",
                form: {
                    name: "",
                    phone: "",
                    email: "",
                    subject: "Question",
                    message: "",
                },
            }
        }
    },

    methods: {
        // Submit Message 
        submitMessage() {
            if (this.click) {
                this.click = false;
                this.$axios.post("submit-message", this.form).then(
                    (response) => {
                        this.form.name = "";
                        this.form.phone = "";
                        this.form.email = "";
                        this.form.message = "";
                        $nuxt.$emit("success", "Your Question Submitted Successfully");
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
}
</script>
