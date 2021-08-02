import Vue from "vue";
import moment from "moment";

Vue.filter("date", value => {
    return moment(value).startOf('hour').fromNow();
});

Vue.filter("fullDate", value => {
    return moment(value).format('LLLL');
});