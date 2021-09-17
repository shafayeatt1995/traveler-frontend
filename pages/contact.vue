<template>
    <div class="contact-us">
        <div class="container">
            <div class="text-center">
                <h1 class="strong my-5 title">Contact Us</h1>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="ql-editor" v-html="message"></div>
                </div>
                <div class="col-lg-6">
                    <div class="contact-us-form">
                        <h3>Leave us a Message</h3>
                        <form @submit.prevent="submitMessage">
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
                                <label for="subject">Subject</label>
                                <input type="text" id="subject" class="form-control" v-model="form.subject">
                            </div>
                            <div class="form-group">
                                <label for="message">Your Message</label>
                                <textarea id="message" rows="4" class="form-control" v-model="form.message"></textarea>
                            </div>
                            <button type="submit" class="btn-second float-end">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    head() {
        return {
            title: "Contact Us - " + this.appName,
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
            message: "",
            meta: "",
            form: {
                name: "",
                phone: "",
                email: "",
                subject: "",
                message: "",
            },
        }
    },

    async asyncData(context) {
        let response = await axios.get(context.env.baseURL + "contact");
        return {
            click: true,
            message: response.data.contact.page,
            meta: response.data.contact.meta,
            form: {
                name: "",
                phone: "",
                email: "",
                subject: "",
                message: "",
            },
        }
    },

    methods: {
        // Submit Message 
        submitMessage(){
            if(this.click) {
                this.click = false
                this.$axios.post("submit-message", this.form).then(
                    (response)=>{
                        this.form.name = "";
                        this.form.phone = "";
                        this.form.email = "";
                        this.form.subject = "";
                        this.form.message = "";
                        $nuxt.$emit("success", "Your Message Submitted Successfully");
                        this.click = true;
                    },
                    (error)=>{
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },
    },
}
</script>