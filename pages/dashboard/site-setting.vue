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
                                <form class="card-body" @submit.prevent="updateApp">
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
                                    <div class="text-center">
                                        <button type="submit" class="btn-common">Update App Info</button>
                                    </div>
                                </form>
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
                                <form class="card-body" @submit.prevent="updatePaypal">
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
                                <form class="card-body" @submit.prevent="updateStripe">
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
                                <p class="text-center mt-4 strong">This setting for Blog Post Image Upload</p>
                                <form class="card-body" @submit.prevent="updateImgur">
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
                            </div>
                        </div>
                        <div class="col-lg-6 my-2">
                            <div class="card mb-4 min-h-100">
                                <h3 class="text-center card-header">Database Setting</h3>
                                <form class="card-body" @submit.prevent="updateDatabase">
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
                            </div>
                        </div>
                        <div class="col-lg-6 my-2">
                            <div class="card mb-4 min-h-100">
                                <h3 class="text-center card-header">Mail Setting</h3>
                                <form class="card-body" @submit.prevent="updateMail">
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
        };
    },

    data() {
        return {
            click: true,
            appSetting: {
                name: "",
                dev: "",
                url: "",
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
