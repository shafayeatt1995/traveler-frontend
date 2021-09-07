<template>
    <div class="container dashboard-container mt-5" v-if="adminOrGuide">
        <div class="row">
            <div class="col-lg-3">
                <Sidebar />
            </div>
            <div class="col-lg-9">
                <div class="dashboard-content">
                    <div class="dashboard-content-header">
                        <button type="button" class="btn add-btn" @click="newModal">Add New Package</button>
                        <h3 class="strong">Tour Package</h3>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr class="text-center">
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Info</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="empty">
                                <tr>
                                    <th colspan="4">
                                        <Empty message="No Package Found"/>
                                    </th>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="text-center" v-for="pack in packages.data" :key="pack.id">
                                    <th class="align-middle text-center">{{pack.id}}</th>
                                    <td class="align-middle">
                                        <nuxt-link :to="{name: 'package-slug', params: {slug: pack.slug}}">
                                            <img :data-src="assetURL + pack.thumbnail" class="img-fluid mw-200" v-lazy-load/>
                                        </nuxt-link>
                                    </td>
                                    <td class="align-middle border-none">
                                        <tr>
                                            <td>Name</td>
                                            <td>{{pack.name}}</td>
                                        </tr>
                                        <tr>
                                            <td>Category</td>
                                            <td>{{pack.category.name}}</td>
                                        </tr>
                                        <tr>
                                            <td>Location</td>
                                            <td>{{pack.address}}</td>
                                        </tr>
                                        <tr>
                                            <td>Duration</td>
                                            <td>{{pack.duration_day + (pack.duration_day > 1 ? ' Days' : ' Day')}} / {{pack.duration_night + (pack.duration_night > 1 ? ' Nights' : ' Night')}}</td>
                                        </tr>
                                        <tr>
                                            <td>Group Size</td>
                                            <td>{{pack.group_size}}</td>
                                        </tr>
                                        <tr>
                                            <td>price</td>
                                            <td v-if="pack.discount === null">${{pack.price}}</td>
                                            <td v-else><del>${{pack.price}}</del> ${{pack.discount}}</td>
                                        </tr>
                                    </td>
                                    <td class="align-middle">
                                        <button type="button" class="btn btn-primary" @click="editPackage(pack)">
                                            <client-only>
                                                <icon icon="edit"></icon>
                                            </client-only>
                                        </button>
                                        <button type="button" class="btn btn-danger" @click="deletePackage(pack.id)">
                                            <client-only>
                                                <icon icon="trash-alt"></icon>
                                            </client-only>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <pagination :data="packages" @pagination-change-page="getResults" class="justify-content-center mt-3 paginate"></pagination>
                </div>
            </div>
        </div>
        <!-- Modal Start -->
        <div class="modal fade" id="modal" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <form class="modal-content" @submit.prevent="editMode ? updatePackage() : addPackage()">
                    <div class="modal-header">
                        <h5 class="modal-title" v-if="editMode">Edit Tour Package</h5>
                        <h5 class="modal-title" v-else>Add New Tour Package</h5>
                    </div>
                    <div class="modal-body">
                        <h2 class="text-center">Package Thumbnails</h2>
                        <div class="dashboard-thumbnail my-2">
                            <img :data-src="form.thumbnail" class="img-fluid" v-lazy-load/>
                            <label for="thumbnail" class="pointer"> Select Thumbnail</label>
                            <input type="file" accept="image/*" class="d-none" id="thumbnail" @change="image($event)">
                        </div>
                        <hr>
                        <h2 class="text-center">Package Images</h2>
                        <div class="dashboard-thumbnail my-2">
                                <img :data-src="editMode ? assetURL+image : image" class="img-fluid pointer" v-for="(image, key) in form.images" :key="key" @click="removeImage(image, key)" v-tooltip.top-center="'Click to Remove Image'" v-lazy-load/>
                                <img :data-src="image" class="img-fluid pointer" v-for="(image, key) in form.new_images" :key="key" @click="removeImage(image = null, key)" v-tooltip.top-center="'Click to Remove Image'" v-lazy-load/>
                            <label for="images" class="pointer"> Select Images</label>
                            <input type="file" accept="image/*" class="d-none" id="images" @change="images($event)" multiple>
                        </div>
                        <h2 class="text-center">Package Information</h2>
                        <div class="form-group">
                            <label for="name">Package Name</label>
                            <input type="text" class="form-control" id="name" v-model="form.name" placeholder="Type Your Package Name">
                        </div>
                        <div class="form-group">
                            <label for="category">Select A Category</label>
                            <select class="form-control" id="category" v-model="form.category_id" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'" placeholder="Select A Category">
                                <option value="">Select A Category</option>
                                <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="place">Select A Place</label>
                            <select class="form-control" id="place" v-model="form.place_id" :style="'background-image: url(' + assetURL +'images/dropdown.svg);'" placeholder="Select A Place">
                                <option value="">Select A Place</option>
                                <option v-for="place in places" :key="place.id" :value="place.id">{{place.name}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="location">Tour Location</label>
                            <input type="text" class="form-control" id="location" v-model="form.address" placeholder="Type Your Tour Location">
                        </div>
                        <div class="row">
                            <div class="form-group col-lg-6">
                                <label for="duration-day">Tour Duration Day</label>
                                <input type="number" class="form-control" id="duration-day" v-model="form.duration_day" placeholder="Tour Duration Day">
                            </div>
                            <div class="form-group col-lg-6">
                                <label for="duration-night">Tour Duration Night</label>
                                <input type="number" class="form-control" id="duration-night" v-model="form.duration_night" placeholder="Tour Duration Night">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="vehicle">Tour Vehicle</label>
                            <input type="text" class="form-control" id="vehicle" v-model="form.vehicle" placeholder="Type Your Tour Vehicle">
                        </div>
                        <div class="form-group">
                            <label for="group-size">Group Size</label>
                            <input type="text" class="form-control" id="group-size" v-model="form.group_size" placeholder="Type Your Group Size">
                        </div>
                        <div class="form-group">
                            <label for="ticket-quantity">Ticket Quantity</label>
                            <input type="number" class="form-control" id="ticket-quantity" v-model="form.ticket" placeholder="Set Available Ticket">
                        </div>
                        <div class="form-group">
                            <label for="price">Tour Package Price</label>
                            <input type="number" class="form-control" id="price" v-model="form.price" placeholder="Set Your Package Price">
                        </div>
                        <div class="form-group">
                            <label for="discount">Tour Package Discount Price <small>(Optional)</small></label>
                            <input type="number" class="form-control" id="discount" v-model="form.discount" placeholder="Set Your Package Discount Price">
                        </div>
                        <div class="form-group">
                            <label for="min-booking">Partial Booking Minimum ammount</label>
                            <input type="number" class="form-control" id="min-booking" v-model="form.min_booking_amount" placeholder="Set Your Partial Booking Minimum Amount">
                        </div>
                        <div class="form-group">
                            <label for="overview">Tour Package Overview</label>
                            <textarea class="form-control" id="overview" v-model="form.overview" placeholder="Type Your Tour Package Overview" rows="5"></textarea>
                        </div>
                        <div class="form-group row justify-content-around">
                            <label>Tour Start Date</label>
                            <date-picker v-model="form.start_date" value-type="YYYY-MM-DD, hh:mm a" type="datetime" format="YYYY-MM-DD, hh:mm a" class="col-lg-6" placeholder="Select Start Date"></date-picker>
                            <date-picker v-model="form.return_date" value-type="YYYY-MM-DD, hh:mm a"  type="datetime" format="YYYY-MM-DD, hh:mm a" class="col-lg-6" placeholder="Select End Date"></date-picker>
                        </div>
                        <div class="form-group">
                            <label for="included">Tour Package Included Item</label>
                            <ul class="table-list-allow">
                                <li v-for="(data, key) in form.included" :key="key">
                                    <span class="pointer" @click="removeInclude(key)" v-tooltip.top-center="'Click to Remove Include Option'"><icon icon="check"></icon> {{data}}</span>
                                    </li>
                            </ul>
                            <div class="input-group">
                                <input type="text" class="form-control input-group" placeholder="Type What is Included in This Package" id="included" v-model="included">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-success" type="button" id="button-addon2" @click="addInclude">Add</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="excluded">Tour Package Excluded Item</label>
                            <ul class="table-list-disallow">
                                <li v-for="(data, key) in form.excluded" :key="key">
                                    <span class="pointer" @click="removeExcluded(key)" v-tooltip.top-center="'Click to Remove Excluded Option'"><icon icon="times"></icon> {{data}}</span>
                                </li>
                            </ul>
                            <div class="input-group">
                                <input type="text" class="form-control input-group" placeholder="Type What is Excluded in This Package" aria-label="Recipient's username" id="excluded" aria-describedby="button-addon2" v-model="excluded">
                                <div class="input-group-append">
                                    <button class="btn btn-outline-success" type="button" id="button-addon2" @click="addExcluded">Add</button>
                                </div>
                            </div>
                        </div>
                        <h2 class="text-center">Tour Plan</h2>
                        <ul class="table-list-disallow">
                                <li v-for="(data, key) in form.tour_plan" :key="key" class="pointer my-3" @click="removeTourPlan(key)" v-tooltip.top-center="'Click to Remove Tour Plan'">
                                    <h3>({{key+1}}) {{data.title}}</h3>
                                    <h4>{{data.time}}</h4>
                                    <p>{{data.description}}</p>
                                </li>
                            </ul>
                        <div class="form-group">
                            <input type="text" class="form-control my-2" v-model="title" placeholder="Type Your Tour Plan Title">
                            <input type="text" class="form-control my-2" v-model="time" placeholder="Type Your Tour Plan Time">
                            <textarea class="form-control my-2" v-model="description" placeholder="Type Your Tour Plan Description" rows="5"></textarea>
                        </div>
                        <button type="button" class="btn btn-primary" @click="addPlan">Add Plan</button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" v-if="editMode">Update Package</button>
                        <button type="submit" class="btn btn-primary" v-else>Add Package</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Modal End -->
    </div>
</template>
<script>
import moment from "moment";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: { DatePicker },

    head() {
        return {
            title: "Tour Package - Dashboard",
        };
    },

    data() {
        return {
            click: true,
            packages: {},
            categories: [],
            places: [],
            editMode: false,
            empty: false,
            form: {
                id: "",
                images: [],
                name: "",
                category_id: "",
                place_id: "",
                address: "",
                duration_day: "",
                duration_night: "",
                vehicle: "",
                group_size: "",
                ticket: "",
                price: "",
                discount: "",
                min_booking_amount: "",
                overview: "",
                start_date: "",
                return_date: "",
                included: [],
                excluded: [],
                tour_plan: [],
                delete_images: [],
                new_images: [],
                thumbnail: "",
            },
            included: "",
            excluded: "",
            title: "",
            time: "",
            description: "",
        }
    },

    methods: {
        // Open New Modal
        newModal(){
            this.editMode = false;
            this.form.id = "";
            this.form.name = "";
            this.form.images = [];
            this.form.category_id = "";
            this.form.place_id = "";
            this.form.address = "";
            this.form.duration_day = "";
            this.form.duration_night = "";
            this.form.vehicle = "";
            this.form.group_size = "";
            this.form.ticket = "";
            this.form.price = "";
            this.form.discount = "";
            this.form.min_booking_amount = "";
            this.form.overview = "";
            this.form.start_date = "";
            this.form.return_date = "";
            this.form.included = [];
            this.form.excluded = [];
            this.form.tour_plan = [];
            this.form.delete_images = [];
            this.form.new_images = [];
            this.form.thumbnail = "";
            this.included = "";
            this.excluded = "";
            this.title = "";
            this.time = "";
            this.description = "";
            $("#modal").modal("show");
        },

        //Get All Package
        getPackage(){
            this.$axios.get('package').then(
                (response)=>{
                    this.empty = response.data.packages.data.length > 0 ? false : true;
                    this.packages = response.data.packages
                    this.categories = response.data.categories
                    this.places = response.data.places
                },
                (error)=>{
                    $nuxt.$emit("error", error)
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("package?page=" + page).then(
                (response) => {
                    this.packages = response.data.packages;
                }
            );
        },

        // Create New Package
        addPackage(){
            if(this.click) {
                this.click = false;
                this.$axios.post("create-package", this.form).then(
                    ()=>{
                        $("#modal").modal("hide");
                        this.form.id = "";
                        this.form.name = "";
                        this.form.images = [];
                        this.form.category_id = "";
                        this.form.place_id = "";
                        this.form.address = "";
                        this.form.duration_day = "";
                        this.form.duration_night = "";
                        this.form.vehicle = "";
                        this.form.group_size = "";
                        this.form.ticket = "";
                        this.form.price = "";
                        this.form.discount = "";
                        this.form.min_booking_amount = "";
                        this.form.overview = "";
                        this.form.start_date = "";
                        this.form.return_date = "";
                        this.form.included = [];
                        this.form.excluded = [];
                        this.form.tour_plan = [];
                        this.form.delete_images = [];
                        this.form.new_images = [];
                        this.form.thumbnail = "";
                        this.included = "";
                        this.excluded = "";
                        this.title = "";
                        this.time = "";
                        this.description = "";
                        $nuxt.$emit('triggerPackages');
                        $nuxt.$emit('success', 'Package Created Successfully');
                        this.click = true;
                    },
                    (error)=>{
                        $nuxt.$emit("error", error);
                        this.click = true;
                    }
                )
            }
        },

        // Edit Package
        editPackage(pack){
            this.editMode = true;
            this.form.id = pack.id;
            this.form.name = pack.name;
            this.form.images = JSON.parse(pack.images);
            this.form.category_id = pack.category_id;
            this.form.place_id = pack.place_id;
            this.form.address = pack.address;
            this.form.duration_day = pack.duration_day;
            this.form.duration_night = pack.duration_night;
            this.form.vehicle = pack.vehicle;
            this.form.group_size = pack.group_size;
            this.form.ticket = pack.ticket;
            this.form.price = pack.price;
            this.form.discount = pack.discount;
            this.form.min_booking_amount = pack.min_booking_amount;
            this.form.overview = pack.overview;
            this.form.start_date = moment(pack.start_date).format('YYYY-MM-DD, hh:mm a');
            this.form.return_date = moment(pack.return_date).format('YYYY-MM-DD, hh:mm a');
            this.form.included = JSON.parse(pack.included);
            this.form.excluded = JSON.parse(pack.excluded);
            this.form.tour_plan = JSON.parse(pack.tour_plan);
            this.form.delete_images = [];
            this.form.new_images = [];
            this.form.thumbnail = this.assetURL + pack.thumbnail;
            this.included = "";
            this.excluded = "";
            this.title = "";
            this.time = "";
            this.description = "";
            $("#modal").modal("show");
        },

        // Update Package
        updatePackage(){
            if(this.click) {
                this.click = false;
                this.$axios.post("update-package/"+ this.form.id, this.form).then(
                    ()=>{
                        $("#modal").modal("hide");
                        this.form.id = "";
                        this.form.name = "";
                        this.form.images = [];
                        this.form.category_id = "";
                        this.form.place_id = "";
                        this.form.address = "";
                        this.form.duration_day = "";
                        this.form.duration_night = "";
                        this.form.vehicle = "";
                        this.form.group_size = "";
                        this.form.ticket = "";
                        this.form.price = "";
                        this.form.discount = "";
                        this.form.min_booking_amount = "";
                        this.form.overview = "";
                        this.form.start_date = "";
                        this.form.return_date = "";
                        this.form.included = [];
                        this.form.excluded = [];
                        this.form.tour_plan = [];
                        this.form.delete_images = [];
                        this.form.new_images = [];
                        this.form.thumbnail = "";
                        this.included = "";
                        this.excluded = "";
                        this.title = "";
                        this.time = "";
                        this.description = "";
                        $nuxt.$emit('triggerPackages');
                        $nuxt.$emit('success', 'Package Updated Successfully');
                        this.click = true;
                    },
                    (error)=>{
                        $nuxt.$emit("error", error);
                        this.click = true;
                    }
                )
            }
        },
        
        // Delete Package
        deletePackage(id){
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    if(this.click) {
                        this.click = false;
                        this.$axios.post("delete-package/"+id).then(
                            ()=>{
                                Swal.fire(
                                'Deleted!',
                                'Package has been deleted.',
                                'success'
                                )
                                $nuxt.$emit('triggerPackages');
                                this.click = true;
                            },
                            (error)=>{
                                $nuxt.$emit("error", error);
                                this.click = true;
                            }
                        )
                    }
                }
            })
        },

        // Add Package Image
        images(event) {
            if (event.target.files.length > 0) {
                for (let file of Object.entries(event.target.files)) {
                    let reader = new FileReader();
                    reader.onloadend = () => {
                        file[1].size < 2097153 ? this.form.images.length + this.form.new_images.length < 5 ? this.editMode ? this.form.new_images.push(reader.result) : this.form.images.push(reader.result) : $nuxt.$emit("customError", "You Can Upload Maximum 5 Images") : $nuxt.$emit("customError", "Maximum Image Size 2 MB");
                    };
                    file !== undefined ? reader.readAsDataURL(file[1]) : "";
                }
            }
        },
        image(event) {
            if (event.target.files.length > 0) {
                let file = event.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    this.form.thumbnail = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },

        // Remove Package Image
        removeImage(image, key) {
            image !== null ? this.form.delete_images.push(image) : '';
            image !== null ? this.form.images.splice(key, 1) : this.form.new_images.splice(key, 1);
        },

        // Add Tour Package Incluide Item
        addInclude(){
            this.form.included.push(this.included);
            this.included = "";
        },

        // Remove Tour Package Incluide Item
        removeInclude(key){
            this.form.included.splice(key, 1);
        },

        // Add Tour Package Excluded Item
        addExcluded(){
            this.form.excluded.push(this.excluded);
            this.excluded = "";
        },

        // Remove Tour Package Excluded Item
        removeExcluded(key){
            this.form.excluded.splice(key, 1);
        },

        // Add Tour Plan
        addPlan(){
            let tour_plan =  {
                title: this.title,
                time: this.time,
                description: this.description,
            };
            this.form.tour_plan.push(tour_plan);
            this.title = "";
            this.time = "";
            this.description = "";
        },

        // Remove Tour Plan
        removeTourPlan(key){
            this.form.tour_plan.splice(key, 1);
        },
    },

    created() {
        if (this.adminOrGuide) {
            this.getPackage();
            this.$nuxt.$on('triggerPackages', () => {
                this.getPackage();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>