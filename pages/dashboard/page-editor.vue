<template>
<div class="container dashboard-container mt-5" v-if="admin">
    <div class="row">
        <div class="col-lg-3">
            <div class="dashboard-sidebar">
                <ul>
                    <li>
                        <h5 class="text-center">
                            <nuxt-link :to="{name: 'dashboard'}" class="justify-content-center">
                                <client-only>
                                    <icon icon="arrow-left"></icon>
                                </client-only>
                                <span class="mx-2">Back To Dashboard</span>
                            </nuxt-link>
                        </h5>
                    </li>
                    <li>
                        <a class="pointer strong" :class="active == 'about' ? 'active' : ''" @click.prevent="active = active == 'about' ? '' : 'about'">
                            About Us Page
                            <client-only>
                                <icon icon="angle-right" class="float-end"></icon>
                            </client-only>
                        </a>
                        <transition name="long-slide" mode="out-in">
                            <div class="px-2" v-if="active == 'about'">
                                <client-only>
                                    <VueEditor class="mt-2" id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="about.message" />
                                </client-only>

                                <div class="form-group">
                                    <label for="about-title" class="mt-2">About Us Title</label>
                                    <input type="text" class="form-control" id="about-title" v-model="about.title">
                                </div>
                                <div class="form-group">
                                    <label for="about-subTitle" class="mt-2">About Us Sub-Title</label>
                                    <input type="text" class="form-control" id="about-subTitle" v-model="about.subTitle">
                                </div>
                                <label for="team-member-image" class="mt-2">Team Member Image</label>
                                <div class="text-center">
                                    <transition name="slide" mode="out-in">
                                        <img :src="teamMember.image" v-if="teamMember.image" class="img-fluid mb-2 mh-200" />
                                    </transition>
                                </div>
                                <input type="file" accept="image/*" class="form-control" id="footer-logo" @change="image($event, 'about')">
                                <div class="form-group">
                                    <label for="member-name" class="mt-2">Team Member Name</label>
                                    <input type="text" class="form-control" id="member-namel" v-model="teamMember.name">
                                </div>
                                <div class="form-group">
                                    <label for="member-designation" class="mt-2">Team Member Designation</label>
                                    <input type="text" class="form-control" id="member-designation" v-model="teamMember.designation">
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn-second" @click="addMember">Add Team Member</button>
                                </div>
                                <div class="form-group">
                                    <label for="about-meta" class="mt-2">About Us Page Meta content<small>(For SEO)</small></label>
                                    <textarea class="form-control" id="about-meta" cols="3" v-model="about.meta"></textarea>
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn-second my-2" @click="updateAbout">Update About Us Page</button>
                                </div>
                            </div>
                        </transition>
                    </li>
                    <li>
                        <a class="pointer strong" :class="active == 'contact' ? 'active' : ''" @click.prevent="active = active == 'contact' ? '' : 'contact'">
                            Contact Us Page
                            <client-only>
                                <icon icon="angle-right" class="float-end"></icon>
                            </client-only>
                        </a>
                        <transition name="long-slide" mode="out-in">
                            <div class="px-2" v-if="active == 'contact'">
                                <div class="form-group">
                                    <label for="about-title" class="mt-2">About Us Title</label>
                                    <client-only>
                                        <VueEditor class="mt-2" id="editor" useCustomImageHandler @image-added="handleImageAdded" v-model="contact.message" />
                                    </client-only>
                                </div>
                                <div class="form-group">
                                    <label for="contact-meta" class="mt-2">Contact Us Page Meta content <small>(For SEO)</small></label>
                                    <textarea class="form-control" id="about-meta" cols="3" v-model="contact.meta"></textarea>
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn-second my-2" @click="updateContact">Update Contact Us Page</button>
                                </div>
                            </div>
                        </transition>
                    </li>
                    <li>
                        <a class="pointer strong" :class="active == 'faq' ? 'active' : ''" @click.prevent="active = active == 'faq' ? '' : 'faq'">
                            FAQ Page
                            <client-only>
                                <icon icon="angle-right" class="float-end"></icon>
                            </client-only>
                        </a>
                        <transition name="long-slide" mode="out-in">
                            <div class="px-2" v-if="active == 'faq'">
                                <div class="form-group">
                                    <label for="faq-topic" class="mt-2">FAQ Topic</label>
                                    <input class="form-control" id="faq-topic" v-model="faqTopic"/>
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn-second my-2" @click="CreateTopic">Create New Topic</button>
                                </div>
                                <hr>
                                <div class="faq-group">
                                    <h5 class="text-center">Select A Topic</h5>
                                    <ul>
                                        <li class="pointer" :class="key == faqActiveTopic ? 'active' : ''" v-for="(topic, key) in faq.topics" :key="key" @click="faqActiveTopic = key">
                                            {{topic.name}}
                                        </li>
                                    </ul>
                                </div>
                                <div class="form-group">
                                    <label for="faq-question" class="mt-2">FAQ Question</label>
                                    <input class="form-control" id="faq-question" v-model="faqQuestion"/>
                                </div>
                                <div class="form-group">
                                    <label for="faq-answer" class="mt-2">FAQ Answer</label>
                                    <textarea class="form-control" id="faq-answer" rows="3" v-model="faqAnswer"></textarea>
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn-second my-2" @click="addQuestion">Add Question</button>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label for="faq-meta" class="mt-2">FAQ Page Meta content <small>(For SEO)</small></label>
                                    <textarea class="form-control" id="about-meta" cols="3" v-model="faq.meta"></textarea>
                                </div>
                                <div class="text-center">
                                    <button type="button" class="btn-second my-2" @click="updateFAQ">Update Contact Us Page</button>
                                </div>
                            </div>
                        </transition>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-lg-9">
            <div class="dashboard-content">
                <transition-group name="fade" mode="out-in">
                    <div class="about-us" v-if="active == 'about'" key="1">
                        <h1 class="text-center">About Us</h1>
                        <div class="ql-editor" v-html="about.message"></div>
                        <h1 class="text-center mt-5">{{about.title}}</h1>
                        <p class="text-center">{{about.subTitle}}</p>
                        <div class="about-member">
                            <ul>
                                <li class="text-center" v-for="(member, key) in about.oldMembers" :key="key">
                                    <img :src="assetURL + member.image" class="img-fluid" :alt="member.name">
                                    <h4>{{member.name}}</h4>
                                    <p>{{member.designation}}</p>
                                    <button type="button" class="btn btn-danger" @click="removeMember(key, member.image, 'old')">x</button>
                                </li>
                                <li class="text-center" v-for="(member, key) in about.newMembers" :key="key + 100">
                                    <img :src="member.image" class="img-fluid" :alt="member.name">
                                    <h4>{{member.name}}</h4>
                                    <p>{{member.designation}}</p>
                                    <button type="button" class="btn btn-danger" @click="removeMember(key)">x</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="contact-us" v-if="active == 'contact'" key="2">
                        <h1 class="text-center mb-3">Contact Us</h1>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="ql-editor" v-html="contact.message"></div>
                            </div>
                            <div class="col-lg-6">
                                <div class="contact-us-form">
                                    <h3>Leave us a Message</h3>
                                    <form>
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <input type="text" id="name" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for="phone">Phone</label>
                                            <input type="phone" id="phone" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for="email">Email address <small>(Optional)</small></label>
                                            <input type="email" id="email" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for="subject">Subject</label>
                                            <input type="text" id="subject" class="form-control">
                                        </div>
                                        <div class="form-group">
                                            <label for="message">Your Message</label>
                                            <textarea id="message" rows="4" class="form-control"></textarea>
                                        </div>
                                        <button type="button" class="btn-second float-end">Send Message</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="faq-wrapper" v-if="active == 'faq'" key="3">
                        <div class="container">
                            <h1 class="text-center my-4">FAQ</h1>
                            <div class="row">
                                <div class="col-lg-7">
                                    <div class="faq-wrap">
                                        <div class="faq-box" v-for="(topic, key) in faq.topics" :key="key">
                                            <h2 class="strong">
                                                {{topic.name}}
                                                <span class="pointer remove-topic" @click="removeTopic(key)">x</span>
                                            </h2>
                                            <div class="dashboard-faq faq-item my-3" v-for="(qna, index) in topic.qnas" :key="index">
                                                <div>
                                                    <p class="faq-header">
                                                        <button type="button" :class="showQNA == key + '-' + index ? 'faq-active' : ''" @click="showQNA = showQNA == key + '-' + index ? '' : key + '-' + index">
                                                            {{qna.question}}
                                                            <client-only>
                                                                <icon icon="angle-down"></icon>
                                                            </client-only>
                                                        </button>
                                                    </p>
                                                    <transition name="slide">
                                                        <div class="faq-body" v-if="showQNA == key + '-' + index">
                                                            <p class="p-3">{{qna.answer}}</p>
                                                        </div>
                                                    </transition>
                                                </div>
                                                <span class="pointer remove-topic mt-3 strong" @click="removeQuestion(key, index)">x</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5">
                                    <form>
                                        <div class="ask-inputs">
                                            <h5>Ask Any Question</h5>
                                            <input class="form-control" type="text" placeholder="Your Full Name">
                                            <input class="form-control" type="email" placeholder="Your Email">
                                            <input class="form-control" type="text" placeholder="Phone">
                                            <textarea class="form-control" cols="30" rows="7" placeholder="Message"></textarea>
                                            <button class="btn-common translatex-100" type="submit">Ask Question</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    head() {
        return {
            title: "Page Editor - Dashboard",
        };
    },

    data() {
        return {
            click: true,
            active: "",
            teamMember: {
                name: "",
                designation: "",
                image: "",
            },
            about: {
                message: "",
                title: "",
                subTitle: "",
                meta: "",
                newMembers: [],
                oldMembers: [],
                deleteMembers: [],
            },
            contact: {
                message: "",
                meta: "",
            },
            faqActiveTopic: 0,
            faqTopic: "",
            faqQuestion: "",
            faqAnswer: "",
            showQNA: "",
            faq: {
                topics: [],
                meta: "",
            },
        }
    },

    methods: {
        //Get Page edit Info
        getEditPage() {
            this.$axios.get("edit-page").then(
                (response) => {
                    this.about.message = JSON.parse(response.data.about.page).message;
                    this.about.title = JSON.parse(response.data.about.page).title;
                    this.about.subTitle = JSON.parse(response.data.about.page).subTitle;
                    this.about.meta = response.data.about.meta;
                    this.about.oldMembers = JSON.parse(response.data.about.page).members;
                    
                    this.contact.message = response.data.contact.page;
                    this.contact.meta = response.data.contact.meta;
                    
                    this.faq.topics = JSON.parse(response.data.faq.page);
                    this.faq.meta = response.data.faq.meta;


                },
                (error) => {
                    $nuxt.$emit("error", error);
                },
            )
        },
        // Add About Us Team Member
        addMember() {
            this.about.newMembers.push({
                name: this.teamMember.name,
                designation: this.teamMember.designation,
                image: this.teamMember.image
            });
            this.teamMember.name = "";
            this.teamMember.designation = "";
            this.teamMember.image = "";
        },

        // Remove About Us Team Member
        removeMember(key, image, status) {
            if (status == 'old') {
                this.about.deleteMembers.push(image);
                this.about.oldMembers.splice(key, 1);
            } else {
                this.about.newMembers.splice(key, 1);
            }
        },

        // Update About Us Page
        updateAbout() {
            if (this.click) {
                this.click = false
                this.$axios.post("update-about", this.about).then(
                    (response) => {
                        this.click = true;
                        $nuxt.$emit("success", "About Us Page Successfully Updated");
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // Update Contact Us Page
        updateContact() {
            if (this.click) {
                this.click = false
                this.$axios.post("update-contact", this.contact).then(
                    (response) => {
                        this.click = true;
                        $nuxt.$emit("success", "Contact Us Page Successfully Updated");
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // Create FAQ Topic
        CreateTopic(){
            this.faq.topics.push({name: this.faqTopic, qnas: []});
            this.faqTopic = "";
        },

        // Remove Topic
        removeTopic(key){
            this.faq.topics.splice(key, 1)
        },

        // Add FAQ Question and Answer
        addQuestion(){
            let find = this.faq.topics.find((topic, key)=> {return key == this.faqActiveTopic});
            find.qnas.push({question: this.faqQuestion, answer: this.faqAnswer});
            this.faqQuestion = "";
            this.faqAnswer = "";
        },

        // Remove FAQ Question and Answer
        removeQuestion(key, index){
            let find = this.faq.topics.find((topic, key2)=> {return key2 == key});
            find.qnas.splice(index, 1);
            this.showQNA = "";
        },

        // Update FAQ Page
        updateFAQ() {
            if (this.click) {
                this.click = false
                this.$axios.post("update-faq", this.faq).then(
                    (response) => {
                        this.click = true;
                        $nuxt.$emit("success", "FAQ Page Successfully Updated");
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        // Editor Custom Image Setup
        handleImageAdded(file, Editor, cursorLocation) {
            if (this.imgur == null) {
                $nuxt.$emit("customError", "Image Upload Disable By Admin");
            } else {
                $nuxt.$emit("info", "Image Uploading");
                var formData = new FormData();
                formData.append("image", file)
                axios({
                        url: "https://api.imgur.com/3/image",
                        method: "POST",
                        headers: { "Authorization": "Client-ID " + this.imgur },
                        data: formData
                    })
                    .then((result) => {
                            let url = result.data.data.link
                            Editor.insertEmbed(cursorLocation, "image", url);
                            $nuxt.$emit("success", "Image Successfully Uploaded");
                        },
                        (error) => {
                            $nuxt.$emit("customError", "Image Upload Failed");
                        })
            }
        },

        // Add Package Image
        image(event, status) {
            if (event.target.files.length > 0) {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    if (status == 'about') {
                        this.teamMember.image = reader.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        },
    },

    created() {
        if (this.admin) {
            this.getEditPage();
            // this.$nuxt.$on("triggerPage", () => {
            //     this.getPage();
            // });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>
