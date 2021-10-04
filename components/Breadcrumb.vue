<template>
<!-- ===============  breadcrumb area start =============== -->
<div class="breadcrumb-area" :style="'background: linear-gradient(rgba(0, 0, 0, 0.5) 100%, rgba(0, 0, 0, 0.5) 100%), url(' + assetURL + breadcrumbImage + ')'">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="breadcrumb-wrap">
                    <h2>{{message}}</h2>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- ===============  breadcrumb area end =============== -->
</template>

<script>
export default {
    props: {
        message: "",
    },
}
</script>
