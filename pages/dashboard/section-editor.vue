<template>
    <div class="container dashboard-container mt-5" v-if="admin">
        <div class="row">
            <div class="col-lg-3">
                <div class="dashboard-sidebar">
                    <ul>
                        <li>
                            <a class="pointer strong" :class="active == 'achievement' ? 'active' : ''" @click.prevent="active = active == 'achievement' ? '' : 'achievement'">
                                Home Achievement
                                <client-only>
                                    <icon icon="angle-right" class="float-end"></icon>
                                </client-only>
                            </a>
                            <transition name="fade" mode="out-in">
                                <div class="px-2" v-if="active == 'achievement'">
                                    <div class="form-group">
                                        <label for="home_achievement_subtitle" class="mt-2">Achievement Subtitle</label>
                                        <input type="text" class="form-control" id="home_achievement_subtitle" v-model="achievement.subTitle">
                                    </div>
                                    <div class="form-group">
                                        <label for="home_achievement_title" class="mt-2">Achievement Title</label>
                                        <input type="text" class="form-control" id="home_achievement_title" v-model="achievement.title">
                                    </div>
                                    <hr>
                                    <div class="form-group">
                                        <div class="text-center">
                                            <transition name="slide" mode="out-in">
                                                <img :src="achievementImage" v-if="achievementImage" class="img-fluid mb-2 mh-100-px">
                                            </transition>
                                        </div>
                                        <input type="file" accept="image/*" class="form-control" @change="image($event, 'achievement')">
                                        <label for="home_achievement" class="mt-2">Achievement</label>
                                        <input type="text" class="form-control" id="home_achievement" v-model="achievementName">
                                        <div class="text-center">
                                            <button type="button" class="btn-second my-2" @click="addAchievement">Add Achievement</button>
                                            <button type="button" class="btn-second" @click="updateAchievement">Update Achievement Section</button>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </li>
                        <li>
                            <a class="pointer strong" :class="active == 'review' ? 'active' : ''" @click.prevent="active = active == 'review' ? '' : 'review'">
                                Home Review
                                <client-only>
                                    <icon icon="angle-right" class="float-end"></icon>
                                </client-only>
                            </a>
                            <transition name="fade" mode="out-in">
                                <div class="px-2" v-if="active == 'review'">
                                    <div class="form-group">
                                        <label for="home_review_subtitle" class="mt-2">Review Subtitle</label>
                                        <input type="text" class="form-control" id="home_review_subtitle" v-model="review.subTitle">
                                    </div>
                                    <div class="form-group">
                                        <label for="home_review_title" class="mt-2">Review Title</label>
                                        <input type="text" class="form-control" id="home_review_title" v-model="review.title">
                                    </div>
                                    <hr>
                                    <div class="form-group">
                                        <div class="text-center">
                                            <transition name="slide" mode="out-in">
                                                <img :src="reviewImage" v-if="reviewImage" class="img-fluid mb-2 mh-100-px">
                                            </transition>
                                        </div>
                                        <input type="file" accept="image/*" class="form-control" @change="image($event, 'review')">
                                        <div class="form-group">
                                            <label for="home_review_name" class="mt-2">Reviewer Name</label>
                                            <input type="text" class="form-control" id="home_review_name" v-model="reviewName">
                                        </div>
                                        <div class="form-group">
                                            <label for="home_review_message" class="mt-2">Reviewer Message</label>
                                            <textarea class="form-control" id="home_review_message" rows="4" v-model="reviewMessage"></textarea>
                                        </div>
                                        <div class="text-center">
                                            <button type="button" class="btn-second my-2" @click="addReview">Add Review</button>
                                            <button type="button" class="btn-second" @click="updateReview">Update Review Section</button>
                                        </div>
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
                        <div class="achievement-area p-80" key="1" v-if="active == 'achievement'" :style="'background-image: url(' + assetURL + 'images/achiv-shape.png)'">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12">
                                        <div class="section-head pb-30">
                                            <h5>{{achievement.subTitle}}</h5>
                                            <h2>{{achievement.title}}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-3 col-sm-6" v-for="(achieve, key) in achievement.achievements" :key="key+100">
                                        <div class="achievement-card mt-30">
                                            <img :src="assetURL + achieve.image" class="img-fluid mh-100-px">
                                            <h5>{{achieve.name}}</h5>
                                        </div>
                                        <div class="text-center mt-1">
                                            <button class="btn btn-danger" @click="removeAchievement(key, achieve.image, 'old')">x</button>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6" v-for="(achieve, key) in achievement.newAchievements" :key="key">
                                        <div class="achievement-card mt-30">
                                            <img :src="achieve.image" class="img-fluid mh-100-px">
                                            <h5>{{achieve.name}}</h5>
                                        </div>
                                        <div class="text-center mt-1">
                                            <button class="btn btn-danger" @click="removeAchievement(key, achieve.image, 'new')">x</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="review-area" key="2" v-if="active == 'review'">
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="section-head pb-40">
                                        <h5>{{review.subTitle}}</h5>
                                        <h2>{{review.title}}</h2>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6" v-for="(reviewData, key) in review.reviews" :key="key+100">
                                    <div class="review-card">
                                        <div class="reviewer-img">
                                            <img :src="assetURL + reviewData.image" :alt="reviewData.name" class="img-fluid">
                                        </div>
                                        <div class="reviewer-info">
                                            <h3>{{reviewData.name}}</h3>
                                            <h5>Traveller</h5>
                                            <p>{{reviewData.message}}</p>
                                        </div>
                                    </div>
                                    <div class="text-center mt-1">
                                        <button class="btn btn-danger" @click="removeReview(key, reviewData.image, 'old')">x</button>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6" v-for="(reviewData, key) in review.newReviews" :key="key">
                                    <div class="review-card">
                                        <div class="reviewer-img">
                                            <img :src="reviewData.image" :alt="reviewData.name" class="img-fluid">
                                        </div>
                                        <div class="reviewer-info">
                                            <h3>{{reviewData.name}}</h3>
                                            <h5>Traveller</h5>
                                            <p>{{reviewData.message}}</p>
                                        </div>
                                    </div>
                                    <div class="text-center mt-1">
                                        <button class="btn btn-danger" @click="removeReview(key, reviewData.image, 'new')">x</button>
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
            title: "Section Editor - Dashboard",
        };
    },

    data() {
        return {
            active: "",
            achievementImage: "",
            achievementName: "",
            achievement: {
                title: "",
                subTitle: "",
                achievements: [],
                oldAchievementImages: [],
                newAchievements: [],
            },
            reviewImage: "",
            reviewName: "",
            reviewMessage: "",
            review: {
                title: "",
                subTitle: "",
                reviews: [],
                oldReviewImages: [],
                newReviews: [],
            },
        }
    },

    methods: {
        // Get Section Editor Information
        getSectionEditor(){
            this.$axios.get("section-editor").then(
                (response)=>{
                    this.achievement.title = JSON.parse(response.data.achievement.info).title;
                    this.achievement.subTitle = JSON.parse(response.data.achievement.info).subTitle;
                    this.achievement.achievements = JSON.parse(response.data.achievement.info).achievements;
                    this.achievement.oldAchievementImages = [];
                    this.achievement.newAchievements = [];
                    
                    this.review.title = JSON.parse(response.data.review.info).title;
                    this.review.subTitle = JSON.parse(response.data.review.info).subTitle;
                    this.review.reviews = JSON.parse(response.data.review.info).reviews;
                    this.review.oldReviewImages = [];
                    this.review.newReviews = [];
                },
                (error)=>{
                    $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : error.response.data.error ? error.response.data.error : "Something Wrong! Please try Again");
                },
            )
        },

        // Add New Achievement
        addAchievement(){
            this.achievement.newAchievements.push({image: this.achievementImage, name: this.achievementName});
            this.achievementImage = "";
            this.achievementName = "";
        },

        // Remove Existing Achievement
        removeAchievement(key, image, status){
            if (status == 'old') {
                this.achievement.oldAchievementImages.push(image);
                this.achievement.achievements.splice(key, 1);
            } else {
                this.achievement.newAchievements.splice(key, 1);
            }
        },

        //Update Achievement Section
        updateAchievement(){
            this.$axios.post("update-achievement", this.achievement).then(
                ()=>{
                    $nuxt.$emit("success", "Achievement Section Successfully Updated");
                    $nuxt.$emit("triggerSectionEditor");
                },
                (error)=>{
                    $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : error.response.data.error ? error.response.data.error : "Something Wrong! Please try Again");
                },
            )
        },

        // Add New Review
        addReview(){
            this.review.newReviews.push({image: this.reviewImage, name: this.reviewName, message: this.reviewMessage});
            this.reviewImage = "";
            this.reviewName = "";
            this.reviewMessage = "";
        },

        // Remove Existing Review
        removeReview(key, image, status){
            if (status == 'old') {
                this.review.oldReviewImages.push(image);
                this.review.reviews.splice(key, 1);
            } else {
                this.review.newReviews.splice(key, 1);
            }
        },

        //Update Review Section
        updateReview(){
            this.$axios.post("update-review", this.review).then(
                ()=>{
                    $nuxt.$emit("success", "Review Section Successfully Updated");
                    $nuxt.$emit("triggerSectionEditor");
                },
                (error)=>{
                    $nuxt.$emit("error", error.response.data.errors ? error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] : error.response.data.error ? error.response.data.error : "Something Wrong! Please try Again");
                },
            )
        },

        // show Selected image
        image(event, status) {
            console.log('image trigger');
            if (event.target.files.length > 0) {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    if (status == 'achievement') {
                        this.achievementImage = reader.result;
                    } else {
                        this.reviewImage = reader.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        },
    },

    created() {
        if (this.admin) {
            this.getSectionEditor();
            this.$nuxt.$on("triggerSectionEditor", () => {
                this.getSectionEditor();
            });
        } else {
            this.$router.push("/login")
        }
    },
};
</script>