<template>
    <div class="container mt-40" v-if="authCheck">
        <form @submit.prevent="submit" class="row" v-if="user">
            <transition name="fade" mode="out-in">
                <div class="col-lg-12 text-center" v-if="success">
                    <img :data-src="assetURL + 'images/contact.svg'" class="img-fluid h-350" v-lazy-load/>
                    <h1>Thank You For Your Application. We Will Contact You Soon.</h1>
                </div>
                <div class="offset-lg-2 col-lg-8" v-else>
                    <div class="form-group">
                        <label for="message">Write something about yourself</label>
                        <input class="form-control mb-3" type="number" placeholder="Type Your Phone Number" v-model="form.phone"/>
                        <textarea class="form-control mb-3" id="message" rows="5" placeholder="Type Your Message" v-model="form.message"></textarea>
                    </div>
                    <button type="submit" class="btn btn-base-color float-end strong">Apply for a guide</button>
                </div>
            </transition>
        </form>
        <div class="text-center" v-else>
            <h2>You Already Grant This Permission</h2>
        </div>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: "Want To Be A Guide - " + this.appName,
            link: [{rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },
    data() {
        return {
            form: {
                click: true,
                phone: "",
                message: "",
            },
            success: false,
        }
    },

    methods: {
        //Get User Application Info
        getApplication(){
            this.$axios.post("user").then(
                (response)=>{
                    this.form.phone = response.data.guide_request == null ? "" : JSON.parse(response.data.guide_request).phone;
                    this.form.message = response.data.guide_request == null ? "" : JSON.parse(response.data.guide_request).message;
                },
                (error)=>{}
            )
        },

        // Submit Application
        submit(){
            if(this.click) {
                this.click = false;
                this.$axios.post("apply-guide", this.form).then(
                    (response)=>{
                        this.success = true;
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

    created() {
        if (this.authCheck) {
            this.getApplication();
        } else {
            this.$router.push("/login");
        }
    },
}
</script>