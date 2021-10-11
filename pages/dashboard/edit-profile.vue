<template>
<div class="container dashboard-container mt-5" v-if="authCheck">
    <div class="row">
        <div class="col-lg-3">
            <Sidebar />
        </div>
        <div class="col-lg-9">
            <div class="dashboard-content">
                <div class="dashboard-content-header bb-2">
                    <h3 class="strong">Edit Profile</h3>
                </div>
                <div class="dashboard-content-body b-2">
                    <form class="row" @submit.prevent="updateProfile">
                        <div class="col-lg-6">
                            <div class="user-info">
                                <div class="dashboard-thumbnail my-2">
                                    <img :data-src="form.image" class="img-fluid mw-100 mh-240" v-lazy-load />
                                    <label for="thumbnail" class="pointer"> Select Profile Image</label>
                                    <input type="file" accept="image/*" class="d-none" id="thumbnail" @change="image($event)">
                                </div>
                                <div class="form-group">
                                    <label for="name">Profile Name</label>
                                    <input type="text" class="form-control" id="name" v-model="form.name">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="social-profile">
                                <h3>Social Profile Link</h3>
                                <div class="form-group">
                                    <label for="facebook">Facebook Profile Link</label>
                                    <input type="text" class="form-control" id="facebook" v-model="form.socialProfile.facebook">
                                </div>
                                <div class="form-group">
                                    <label for="twitter">Twitter Profile Link</label>
                                    <input type="text" class="form-control" id="twitter" v-model="form.socialProfile.twitter">
                                </div>
                                <div class="form-group">
                                    <label for="instagram">Instagram Profile Link</label>
                                    <input type="text" class="form-control" id="instagram" v-model="form.socialProfile.instagram">
                                </div>
                                <div class="form-group">
                                    <label for="whatsapp">Whatsapp Number <small>(Type Your Number with Country Code)</small></label>
                                    <input type="text" class="form-control" id="whatsapp" v-model="form.socialProfile.whatsapp">
                                </div>
                                <button type="submit" class="btn btn-base-color d-block w-100 mt-20">Update Profile</button>
                            </div>
                        </div>
                    </form>
                    <form class="row" @submit.prevent="updatePassword">
                        <div class="col-lg-12">
                            <hr>
                            <h3 class="text-center">Update Password</h3>
                        </div>
                        <div class="form-group col-lg-4">
                            <label for="old_password">Old Password</label>
                            <input type="password" class="form-control" id="old_password" v-model="form.old_password">
                        </div>
                        <div class="form-group col-lg-4">
                            <label for="password">New Password</label>
                            <input type="password" class="form-control" id="password" v-model="form.password">
                        </div>
                        <div class="form-group col-lg-4">
                            <label for="confirn_password">Confirm Password</label>
                            <input type="password" class="form-control" :class="form.password !== form.password_confirmation ? 'border-danger':''" id="confirn_password" v-model="form.password_confirmation">
                        </div>
                        <div class="col-lg-12">
                            <button type="submit" class="btn btn-base-color d-block w-100">Update Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    head() {
        return {
            title: "Edit Profile - Dashboard",
            link: [{ rel: "icon", type: "image/x-icon", href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            form: {
                name: "",
                password: "",
                old_password: "",
                password_confirmation: "",
                image: "",
                socialProfile: {
                    instagram: "",
                    facebook: "",
                    twitter: "",
                    whatsapp: "",

                },
            },
        }
    },

    methods: {
        //Get User Info
        getUser() {
            this.$axios.post("user").then(
                (response) => {
                    this.form.name = response.data.name;
                    this.form.image = this.assetURL + response.data.image;
                    this.form.socialProfile.facebook = JSON.parse(response.data.social_profile).facebook;
                    this.form.socialProfile.twitter = JSON.parse(response.data.social_profile).twitter;
                    this.form.socialProfile.instagram = JSON.parse(response.data.social_profile).instagram;
                    this.form.socialProfile.whatsapp = JSON.parse(response.data.social_profile).whatsapp;
                },
                (error) => {
                    $nuxt.$emit("customError", "Something Wrong! Please try Again")
                }
            )
        },

        // show Selected image
        image(event) {
            if (event.target.files.length > 0) {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.form.image = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },

        //Update Profile
        updateProfile() {
            if (this.click) {
                this.click = false;
                this.$axios.$post("update-profile", this.form).then(
                    (response) => {
                        $nuxt.$emit("triggerProfile");
                        $nuxt.$emit("success", "Profile Successfully Updated");
                        this.click = true;
                    },
                    (error) => {
                        $nuxt.$emit("error", error);
                        this.click = true;
                    },
                )
            }
        },

        //Update Password
        updatePassword() {
            if (this.form.password === this.form.password_confirmation) {
                if (this.click) {
                    this.click = false;
                    this.$axios.$post("update-password", this.form).then(
                        (response) => {
                            this.form.password = "",
                                this.form.old_password = "",
                                this.form.password_confirmation = "",
                                this.click = true;
                            this.$swal.fire({
                                title: "Password Update Successfully",
                                text: "You want to logout for check your password",
                                icon: "success",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, Logout"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    if (this.click) {
                                        this.click = false;
                                        this.$auth.logout("laravelJWT").then(
                                            () => {
                                                this.$store.dispatch("triggerWishlist");
                                                this.$router.push("/login");
                                                this.click = true;
                                            },
                                            () => {
                                                this.click = true;
                                            }
                                        )
                                    }
                                }
                            })
                        },
                        (error) => {
                            $nuxt.$emit("error", error);
                            this.click = true;
                        },
                    )
                }
            } else {
                $nuxt.$emit("customError", "Confirm Password Not Match");
            }
        },
    },

    created() {
        if (this.authCheck) {
            this.getUser();
            this.$nuxt.$on("triggerProfile", () => {
                this.getUser();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>
