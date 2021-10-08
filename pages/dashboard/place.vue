<template>
    <div class="container dashboard-container mt-5" v-if="admin">
        <div class="row">
            <div class="col-lg-3">
                <Sidebar />
            </div>
            <div class="col-lg-9">
                <div class="dashboard-content">
                    <div class="dashboard-content-header">
                        <button type="button" class="btn add-btn" @click="newModal">Add Place</button>
                        <h3 class="strong">Place</h3>
                    </div>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr class="text-center">
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="empty">
                                <tr>
                                    <th colspan="5">
                                        <Empty message="No Place Found"/>
                                    </th>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr class="text-center" v-for="place in places.data" :key="place.id">
                                    <th class="align-middle text-center">{{place.id}}</th>
                                    <td class="align-middle">
                                        <img :data-src="assetURL + place.image" :alt="place.name" class="img-fluid mh-200" v-lazy-load/>
                                    </td>
                                    <td class="align-middle">{{place.name}}</td>
                                    <td class="align-middle">{{place.created_at | date}}</td>
                                    <td class="align-middle">
                                        <button type="button" class="btn btn-primary" @click="editPlace(place)">
                                            <client-only>
                                                <icon icon="edit"></icon>
                                            </client-only>
                                        </button>
                                        <button type="button" class="btn btn-danger" @click="deletePlace(place.id)">
                                            <client-only>
                                                <icon icon="trash-alt"></icon>
                                            </client-only>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <pagination :data="places" @pagination-change-page="getResults" class="justify-content-center mt-3 paginate"></pagination>
                </div>
            </div>
        </div>
        <!-- Modal Start -->
        <div class="modal fade" id="modal" data-backdrop="static" tabindex="-1" aria-labelledby="modal" aria-hidden="true">
            <div class="modal-dialog">
                <form class="modal-content" @submit.prevent="editMode ? updatePlace() : addPlace()">
                    <div class="modal-header">
                        <h5 class="modal-title" v-if="editMode">Edit Place</h5>
                        <h5 class="modal-title" v-else>Add New Place</h5>
                    </div>
                    <div class="modal-body">
                        <div class="dashboard-thumbnail my-2">
                            <img :data-src="form.image" class="img-fluid pointer" v-lazy-load/>
                            <label for="thumbnail" class="pointer"> Select an Image</label>
                            <input type="file" accept="image/*" class="d-none" id="thumbnail" @change="image($event)">
                        </div>
                        <div class="form-group">
                            <label for="place">Place Name</label>
                            <input type="text" class="form-control" id="place" v-model="form.name">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" v-if="editMode">Edit Place</button>
                        <button type="submit" class="btn btn-primary" v-else>Add Place</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Modal End -->
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: "Place - Dashboard",
            link: [{rel: 'icon', type: 'image/x-icon', href: this.assetURL + this.favicon, }]
        };
    },

    data() {
        return {
            click: true,
            places: {},
            editMode: false,
            empty: false,
            form: {
                id: "",
                name: "",
                image: "",
            },
        }
    },

    methods: {
        // Open New Modal
        newModal(){
            this.editMode = false;
            this.form.id = "";
            this.form.name = "";
            this.form.image = "";
            $("#modal").modal("show");
        },

        //Get All Category
        getPlace(){
            this.$axios.get("place").then(
                (response)=>{
                    this.empty = response.data.places.data.length > 0 ? false : true;
                    this.places = response.data.places
                },
                (error)=>{
                    $nuxt.$emit("error", error)
                }
            )
        },
        getResults(page = 1) {
            this.$axios.get("place?page=" + page).then(
                (response) => {
                    this.places = response.data.places;
                });
        },

        // Create New Place
        addPlace(){
            if(this.click) {
                this.click = false;
                this.$axios.post("create-place", this.form).then(
                    ()=>{
                        $("#modal").modal("hide");
                        this.form.id = "";
                        this.form.name = "";
                        this.form.image = "";
                        $nuxt.$emit("triggerPlace");
                        $nuxt.$emit("success", "Place Created Successfully");
                        this.click = true;
                    },
                    (error)=>{
                        $nuxt.$emit("error", error);
                        this.click = true;
                    }
                )
            }
        },

        // Edit Place
        editPlace(place){
            this.editMode = true;
            this.form.id = place.id;
            this.form.name = place.name;
            this.form.image = this.assetURL + place.image;
            $("#modal").modal("show");
        },

        // Update Place
        updatePlace(){
            if(this.click) {
                this.click = false;
                this.$axios.post("update-place/"+ this.form.id, this.form).then(
                    ()=>{
                        $("#modal").modal("hide");
                        this.form.id = "";
                        this.form.name = "";
                        this.form.image = "";
                        $nuxt.$emit("triggerPlace");
                        $nuxt.$emit("success", "Place Updated Successfully");
                        this.click = true;
                    },
                    (error)=>{
                        $nuxt.$emit("error", error);
                        this.click = true;
                    }
                )
            }
        },
        
        // Delete Place
        deletePlace(id){
            this.$swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0B9A52",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                if (result.isConfirmed) {
                    if(this.click) {
                        this.click = false;
                        this.$axios.post("delete-place/"+id).then(
                            ()=>{
                                Swal.fire(
                                "Deleted!",
                                "Place has been deleted.",
                                "success"
                                )
                                $nuxt.$emit("triggerPlace");
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
    },

    created() {
        if (this.admin) {
            this.getPlace();
            this.$nuxt.$on("triggerPlace", () => {
                this.getPlace();
            });
        } else {
            this.$router.push("/login");
        }
    },
};
</script>