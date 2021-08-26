import Vue from "vue";
import moment from "moment";


// Date Format
Vue.filter("date", value => {
    return moment(value).startOf('hour').fromNow();
});

Vue.filter("normalDate", value => {
    return moment(value).format('LL');
});

Vue.filter("fullDate", value => {
    return moment(value).format('LLLL');
});

Vue.filter("year", value => {
    return moment(value).format('YYYY');
});


// Currency Format
Vue.filter("currency", value => {
    return isNaN(value) ? value : parseFloat(value).toFixed(2);;
});