<template>
<div class="container dashboard-container mt-5" v-if="admin">
    <div class="row">
        <div class="col-lg-3">
            <Sidebar />
        </div>
        <div class="col-lg-9">
            <div class="dashboard-content">
                <div class="dashboard-content-header">
                    <h3 class="strong">Site Setting</h3>
                </div>
                <div class="dashboard-content-body site-setting">
                    <div class="row">
                        <div class="col-lg-6 my-2">
                            <div class="card mb-4 min-h-100">
                                <h3 class="text-center card-header">App Information</h3>
                                <transition name="fade" mode="out-in">
                                    <Loading-circle class="mt-5" v-if="loading" />
                                    <form class="card-body" @submit.prevent="updateApp" v-else>
                                        <div class="form-group">
                                            <label>Select Developer Mode</label>
                                            <select class="form-control" v-model="appSetting.dev" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'">
                                                <option :value="true">Enable</option>
                                                <option :value="false">Disable</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="app-name">App Name</label>
                                            <input type="text" class="form-control" id="app-name" v-model="appSetting.name" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="app-url">Backend URL</label>
                                            <input type="text" class="form-control" id="app-url" v-model="appSetting.url" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="frontend-url">Frontend URL</label>
                                            <input type="text" class="form-control" id="frontend-url" v-model="appSetting.frontendUrl" required>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn-common">Update App Info</button>
                                        </div>
                                    </form>
                                </transition>
                            </div>
                        </div>
                        <div class="col-lg-6 my-2">
                            <div class="card mb-4 min-h-100">
                                <h3 class="text-center card-header">
                                    Imgur
                                    <span :class="imgurSetting.status ? 'text-success' : 'text-danger'">
                                        <client-only>
                                            <icon :icon="imgurSetting.status ? ['far', 'check-circle'] : 'times'"></icon>
                                        </client-only>
                                    </span>
                                </h3>
                                <transition name="fade" mode="out-in">
                                    <Loading-circle class="mt-5" v-if="loading" />
                                    <form class="card-body" @submit.prevent="updateImgur">
                                        <p class="text-center mt-4 strong">This setting for Text Editor Image Upload</p>
                                        <div class="form-group">
                                            <label>Select imgur Status</label>
                                            <select class="form-control" v-model="imgurSetting.status" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'">
                                                <option :value="true">Enable</option>
                                                <option :value="false">Disable</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="imgur-id">Imgur Client ID</label>
                                            <input type="text" class="form-control" id="imgur-id" v-model="imgurSetting.client_id" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="imgur-secret">Imgur Client Secret</label>
                                            <input type="text" class="form-control" id="imgur-secret" v-model="imgurSetting.secret" required>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn-common">Update Imgur Info</button>
                                        </div>
                                    </form>
                                </transition>
                            </div>
                        </div>
                        <div class="col-lg-6 my-2">
                            <div class="card mb-4 min-h-100">
                                <h3 class="text-center card-header">
                                    Paypal
                                    <span :class="paypalSetting.status ? 'text-success' : 'text-danger'">
                                        <client-only>
                                            <icon :icon="paypalSetting.status ? ['far', 'check-circle'] : 'times'"></icon>
                                        </client-only>
                                    </span>
                                </h3>
                                <transition name="fade" mode="out-in">
                                    <Loading-circle class="mt-5" v-if="loading" />
                                    <form class="card-body" @submit.prevent="updatePaypal" v-else>
                                        <div class="form-group">
                                            <label>Select Paypal Payment Status</label>
                                            <select class="form-control" v-model="paypalSetting.status" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'">
                                                <option :value="true">Enable</option>
                                                <option :value="false">Disable</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="paypal-id">Paypal Client ID</label>
                                            <input type="text" class="form-control" id="paypal-id" v-model="paypalSetting.client_id" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="paypal-secret">Paypal Client Secret</label>
                                            <input type="text" class="form-control" id="paypal-secret" v-model="paypalSetting.secret" required>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn-common">Update Paypal Info</button>
                                        </div>
                                    </form>
                                </transition>
                            </div>
                        </div>
                        <div class="col-lg-6 my-2">
                            <div class="card mb-4 min-h-100">
                                <h3 class="text-center card-header">
                                    Stripe
                                    <span :class="stripeSetting.status ? 'text-success' : 'text-danger'">
                                        <client-only>
                                            <icon :icon="stripeSetting.status ? ['far', 'check-circle'] : 'times'"></icon>
                                        </client-only>
                                    </span>
                                </h3>
                                <transition name="fade" mode="out-in">
                                    <Loading-circle class="mt-5" v-if="loading" />
                                    <form class="card-body" @submit.prevent="updateStripe" v-else>
                                        <div class="form-group">
                                            <label>Select Stripe Payment Status</label>
                                            <select class="form-control" v-model="stripeSetting.status" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'">
                                                <option :value="true">Enable</option>
                                                <option :value="false">Disable</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="stripe-id">Stripe Client ID</label>
                                            <input type="text" class="form-control" id="stripe-id" v-model="stripeSetting.client_id" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="stripe-secret">Stripe Client Secret</label>
                                            <input type="text" class="form-control" id="stripe-secret" v-model="stripeSetting.secret" required>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn-common">Update Stripe Info</button>
                                        </div>
                                    </form>
                                </transition>
                            </div>
                        </div>
                        <div class="col-lg-6 my-2">
                            <div class="card mb-4 min-h-100">
                                <h3 class="text-center card-header">Database Setting</h3>
                                <transition name="fade" mode="out-in">
                                    <Loading-circle class="mt-5" v-if="loading" />
                                    <form class="card-body" @submit.prevent="updateDatabase" v-else>
                                        <div class="form-group">
                                            <label for="database-connection">Database Connection</label>
                                            <input type="text" class="form-control" id="database-connection" v-model="databaseSetting.connection">
                                        </div>
                                        <div class="form-group">
                                            <label for="database-name">Database Name</label>
                                            <input type="text" class="form-control" id="database-name" v-model="databaseSetting.name" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="database-host">Database Host</label>
                                            <input type="text" class="form-control" id="database-host" v-model="databaseSetting.host" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="database-port">Database Port</label>
                                            <input type="number" class="form-control" id="database-port" v-model="databaseSetting.port" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="database-user-name">Database User Name</label>
                                            <input type="text" class="form-control" id="database-user-name" v-model="databaseSetting.userName" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="database-password">Database Password</label>
                                            <input type="password" class="form-control" id="database-password" v-model="databaseSetting.password">
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn-common">Update Database Info</button>
                                        </div>
                                    </form>
                                </transition>
                            </div>
                        </div>
                        <div class="col-lg-6 my-2">
                            <div class="card mb-4 min-h-100">
                                <h3 class="text-center card-header">Mail Setting</h3>
                                <transition name="fade" mode="out-in">
                                    <Loading-circle class="mt-5" v-if="loading" />
                                    <form class="card-body" @submit.prevent="updateMail" v-else>
                                        <div class="form-group">
                                            <label for="mail-driver">Mail Driver</label>
                                            <input type="text" class="form-control" id="mail-driver" v-model="mailSetting.driver" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="mail-host">Mail Host</label>
                                            <input type="text" class="form-control" id="mail-host" v-model="mailSetting.host" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="mail-port">Mail Port</label>
                                            <input type="number" class="form-control" id="mail-port" v-model="mailSetting.port" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="user-name">Mail User Name</label>
                                            <input type="text" class="form-control" id="user-name" v-model="mailSetting.userName" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="mail-password">Mail Password</label>
                                            <input type="password" class="form-control" id="mail-password" v-model="mailSetting.password" required>
                                        </div>
                                        <div class="form-group">
                                            <label for="mail-address">Mail Address</label>
                                            <input type="email" class="form-control" id="mail-address" v-model="mailSetting.address">
                                        </div>
                                        <div class="form-group">
                                            <label for="mail-encryption">Mail Encryption</label>
                                            <input type="text" class="form-control" id="mail-encryption" v-model="mailSetting.encryption" required>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn-common">Update Mail Info</button>
                                        </div>
                                    </form>
                                </transition>
                            </div>
                        </div>
                        <div class="col-lg-6 my-2">
                            <div class="card mb-4 min-h-100">
                                <h3 class="text-center card-header">Title Icon</h3>
                                <transition name="fade" mode="out-in">
                                    <Loading-circle class="mt-5" v-if="loading" />
                                    <form class="card-body" @submit.prevent="updateicon" v-else>
                                        <div class="form-group">
                                            <div class="dashboard-thumbnail my-2">
                                                <img :src="titleIcon.image" class="img-fluid mw-100 mh-240" />
                                                <label for="icon" class="pointer"> Select Title Favicon</label>
                                                <input type="file" accept="image/png" class="d-none" id="icon" @change="image($event, 'icon')">
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn-common">Update Title Icon</button>
                                        </div>
                                    </form>
                                </transition>
                            </div>
                        </div>
                        <div class="col-lg-6 my-2">
                            <div class="card mb-4 min-h-100">
                                <h3 class="text-center card-header">Image Preloader</h3>
                                <transition name="fade" mode="out-in">
                                    <Loading-circle class="mt-5" v-if="loading" />
                                    <form class="card-body" @submit.prevent="updatePreloader" v-else>
                                        <div class="form-group">
                                            <div class="dashboard-thumbnail my-2">
                                                <img :src="preloader.image" class="img-fluid mw-100 mh-240" />
                                                <label for="preloader" class="pointer">Select Image Preloader Animation</label>
                                                <input type="file" accept="image/svg+xml" class="d-none" id="preloader" @change="image($event, 'preloader')">
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" class="btn-common">Update Preloader</button>
                                        </div>
                                    </form>
                                </transition>
                            </div>
                        </div>
                    </div>
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
            title: "Site Setting - Dashboard",
            link: [{ rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            loading: true,
            appSetting: {
                name: "",
                dev: "",
                url: "",
                frontendUrl: "",
            },
            imgurSetting: {
                status: "",
                client_id: "",
                secret: "",
            },
            paypalSetting: {
                status: "",
                client_id: "",
                secret: "",
            },
            stripeSetting: {
                status: "",
                client_id: "",
                secret: "",
            },
            databaseSetting: {
                connection: "",
                name: "",
                host: "",
                port: "",
                userName: "",
                password: "",
            },
            mailSetting: {
                driver: "",
                host: "",
                port: "",
                userName: "",
                password: "",
                encryption: "",
                address: "",
            },
            titleIcon: {
                update: false,
                image: "",
            },
            preloader: {
                update: false,
                file: "",
                image: "",
            },
        }
    },

    methods: {
        //Get site setting info
        getSetting() {
            this.$axios.get("site-setting").then(
                (response) => {
                    this.appSetting = response.data.app;
                    this.paypalSetting = response.data.paypal;
                    this.stripeSetting = response.data.stripe;
                    this.imgurSetting = response.data.imgur;
                    this.databaseSetting = response.data.database;
                    this.mailSetting = response.data.mail;
                    this.titleIcon.image = process.env.assetURL + response.data.titleIcon.image;
                    this.preloader.image = process.env.assetURL + response.data.preloader.image;
                    this.loading = false;
                },
                (error) => {
                    $nuxt.$emit("error", error);
                },
            )
        },

        // Update Paypal Payment Information
        updateApp() {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You Want to Update App Info.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false
                        this.$axios.post("update-app", this.appSetting).then(
                            (response) => {
                                $nuxt.$emit("success", "Info Successfully Updated. Wait A Moment For Apply Changes");
                                $nuxt.$emit("triggergetsetting");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("error", error);
                                this.click = true;
                            },
                        )
                    }
                }
            })
        },

        // Update Paypal Payment Information
        updatePaypal() {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You Want to Update Paypal Payment Info.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false
                        this.$axios.post("update-paypal", this.paypalSetting).then(
                            (response) => {
                                $nuxt.$emit("success", "Info Successfully Updated. Wait A Moment For Apply Changes");
                                $nuxt.$emit("triggergetsetting");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("error", error);
                                this.click = true;
                            },
                        )
                    }
                }
            })
        },

        // Update Stripe Payment Information
        updateStripe() {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You Want to Update Stripe Payment Info.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false
                        this.$axios.post("update-stripe", this.stripeSetting).then(
                            (response) => {
                                $nuxt.$emit("success", "Info Successfully Updated. Wait A Moment For Apply Changes");
                                $nuxt.$emit("triggergetsetting");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("error", error);
                                this.click = true;
                            },
                        )
                    }
                }
            })
        },

        // Update Imgur Information
        updateImgur() {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You Want to Update Imgur Info.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false
                        this.$axios.post("update-imgur", this.imgurSetting).then(
                            (response) => {
                                $nuxt.$emit("success", "Info Successfully Updated. Wait A Moment For Apply Changes");
                                $nuxt.$emit("triggergetsetting");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("error", error);
                                this.click = true;
                            },
                        )
                    }
                }
            })
        },

        // Update Database Information
        updateDatabase() {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You Want to Update Database Info.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false
                        this.$axios.post("update-database", this.databaseSetting).then(
                            (response) => {
                                $nuxt.$emit("success", "Info Successfully Updated. Wait A Moment For Apply Changes");
                                $nuxt.$emit("triggergetsetting");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("error", error);
                                this.click = true;
                            },
                        )
                    }
                }
            })
        },

        // Update Mail Information
        updateMail() {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You Want to Update Database Info.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false
                        this.$axios.post("update-mail", this.mailSetting).then(
                            (response) => {
                                $nuxt.$emit("success", "Info Successfully Updated. Wait A Moment For Apply Changes");
                                $nuxt.$emit("triggergetsetting");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("error", error);
                                this.click = true;
                            },
                        )
                    }
                }
            })
        },

        // Update Title Ion Information
        updateicon() {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You Want to Update Title Icon.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false;
                        this.$axios.post("update-icon", this.titleIcon).then(
                            (response) => {
                                $nuxt.$emit("success", "Info Successfully Updated. Wait A Moment For Apply Changes");
                                $nuxt.$emit("triggergetsetting");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("error", error);
                                this.click = true;
                            },
                        )
                    }
                }
            })
        },

        // Update Title Ion Information
        updatePreloader() {
            this.$swal.fire({
                title: "Are you sure?",
                text: "You Want to Update Image Preloader.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    if (this.click) {
                        this.click = false;
                        const data = new FormData();
                        data.append('update', this.preloader.update);
                        data.append('file', this.preloader.file);
                        this.$axios.post("update-preloader", data).then(
                            (response) => {
                                $nuxt.$emit("success", "Info Successfully Updated. Wait A Moment For Apply Changes");
                                $nuxt.$emit("triggergetsetting");
                                this.click = true;
                            },
                            (error) => {
                                $nuxt.$emit("error", error);
                                this.click = true;
                            },
                        )
                    }
                }
            })
        },

        // show Selected image
        image(event, status) {
            if (event.target.files.length > 0) {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    if (status == "icon") {
                        this.titleIcon.update = true;
                        this.titleIcon.image = reader.result;
                    } else if (status == "preloader") {
                        this.preloader.update = true;
                        this.preloader.file = file;
                        this.preloader.image = reader.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        },
    },

    created() {
        if (this.admin) {
            this.getSetting();
            this.$nuxt.$on("triggergetsetting", () => {
                setTimeout(() => {
                    this.getSetting();
                    this.$store.dispatch('triggerinit');
                    $nuxt.$emit("success", "Info Apply Successfully");
                }, 3000);
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>
