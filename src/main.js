// Import ES6 Promise
import 'es6-promise/auto'

// Import System requirements
import Vue from 'vue';
import VueRouter from 'vue-router';
export const bus = new Vue();
import { sync } from 'vuex-router-sync';
import routes from './routes';
import store from './store';
import VueSessionStorage from 'vue-sessionstorage';
// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters';
import VModal from 'vue-js-modal';
import CripNotice from 'crip-vue-notice';
import BlockUI from 'vue-blockui';
// Import Views - Top level
import AppView from './components/App.vue';
import VueSimpleAlert from "vue-simple-alert";
import UniqueId from 'vue-unique-id';
Vue.use(UniqueId);
Vue.use(VueSimpleAlert);
// Import Install and register helper items
Vue.filter('count', count);
Vue.filter('domain', domain);
Vue.filter('prettyDate', prettyDate);
Vue.filter('pluralize', pluralize);
Vue.use(BlockUI);
Vue.use(VModal);
Vue.use(VueRouter);
Vue.use(VueSessionStorage);
Vue.use(CripNotice);
// Vue.use(window["vue-js-modal"].default);
// Routing logic
var router = new VueRouter({
    routes: routes,
    el: 'root',
    //mode: 'history',
    linkExactActiveClass: 'active',
    scrollBehavior: function(to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 };
    }
});

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
    if (
        to.matched.some(record => record.meta.requiresAuth) &&
        (!router.app.$store.state.token || router.app.$store.state.token === 'null')
    ) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        window.console.log('Not authenticated');
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    } else {
        next();
    }
});

sync(store, router);

// Check local storage to handle refreshes
if (window.localStorage) {
    var localUserString = window.localStorage.getItem('user') || 'null'
    var localUser = JSON.parse(localUserString)
    if (localUser && store.state.user !== localUser) {
        store.commit('SET_USER', localUser)
        store.commit('SET_TOKEN', window.localStorage.getItem('token'))
    }
}

const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
    $bus: {
        get() {
            return EventBus;
        },
    },
});


Vue.rootUrl = Vue.prototype.rootUrl = '/';
//Vue.rootUrl = Vue.prototype.rootUrl = 'http://localhost:4000/';
Vue.webSocketUrl = Vue.prototype.webSocketUrl = 'ws://' + location.hostname + ':8000/';


//login related URL
Vue.loginUrl = Vue.prototype.loginUrl = Vue.prototype.rootUrl + 'login/$$username$$/$$password$$/$$sessionloginID$$';
Vue.logoutUrl = Vue.prototype.logoutUrl = Vue.prototype.rootUrl + 'logout';
Vue.deactivatedURL = Vue.prototype.deactivatedURL = Vue.prototype.rootUrl + 'login/admin/deactivated';
Vue.checkactivatedURL = Vue.prototype.checkactivatedURL = Vue.prototype.rootUrl + 'admin/$$sessionloginid$$/activated';


// main dashboard related URL
Vue.dashboard_summary_listURL = Vue.prototype.dashboard_summary_listURL = Vue.prototype.rootUrl + 'main/dashboard/summary_list';
Vue.dashboard_ss_mapURL = Vue.prototype.dashboard_ss_mapURL = Vue.prototype.rootUrl + 'main/dashboard/get_ss_list';
Vue.dashboard_regionwise_listURL = Vue.prototype.dashboard_regionwise_listURL = Vue.prototype.rootUrl + 'main/dashboard/region_wise_list';
Vue.dashboard_regionwise_treeURL = Vue.prototype.dashboard_regionwise_treeURL = Vue.prototype.rootUrl + 'main/dashboard/region_treeview_list';

// main dashboard sub station detail popup
Vue.substation_nameplate_summaryURL = Vue.prototype.substation_nameplate_summaryURL = Vue.prototype.rootUrl + 'main/substation/np/$$dcuid$$/getsubstationdetail_summary';
Vue.substation_loadcurve_summaryURL = Vue.prototype.substation_loadcurve_summaryURL = Vue.prototype.rootUrl + 'main/substation/loadcurve/$$dcuid$$/$$feedername$$/$$btnname$$/$$startdate$$/$$enddate$$/get_summary';
Vue.substation_loadsurvey_summaryURL = Vue.prototype.substation_loadsurvey_summaryURL = Vue.prototype.rootUrl + 'main/substation/loadsurvey/$$dcuid$$/$$feedername$$/$$startdate$$/get_summary';
Vue.substation_cumulativecurve_summaryURL = Vue.prototype.substation_cumulativecurve_summaryURL = Vue.prototype.rootUrl + 'main/substation/cumulativecurve/$$dcuid$$/$$startdate$$/$$enddate$$/get_summary';
Vue.substation_outage_summaryURL = Vue.prototype.substation_outage_summaryURL = Vue.prototype.rootUrl + 'main/substation/feederdis/outage/$$dcuid$$/$$startdate$$/$$enddate$$/get_summary';
Vue.substation_idle_summaryURL = Vue.prototype.substation_idle_summaryURL = Vue.prototype.rootUrl + 'main/substation/feederdis/idle/$$dcuid$$/$$startdate$$/$$enddate$$/get_summary';
Vue.substation_overload_summaryURL = Vue.prototype.substation_overload_summaryURL = Vue.prototype.rootUrl + 'main/substation/feederdis/overload/$$dcuid$$/$$startdate$$/$$enddate$$/get_summary';
Vue.substation_midnight_summaryURL = Vue.prototype.substation_midnight_summaryURL = Vue.prototype.rootUrl + 'main/substation/midnight/$$dcuid$$/$$feedername$$/$$startdate$$/$$enddate$$/getsubstationdetail_summary';
Vue.substation_event_summaryURL = Vue.prototype.substation_event_summaryURL = Vue.prototype.rootUrl + 'main/substation/event/$$dcuid$$/$$feedername$$/$$startdate$$/$$enddate$$/getsubstationdetail_summary';
Vue.feederlistURL = Vue.prototype.feederlistURL = Vue.prototype.rootUrl + 'main/substation/$$dcuid$$/feederlist';
Vue.substation_dcudetails_summaryURL = Vue.prototype.substation_dcudetails_summaryURL = Vue.prototype.rootUrl + 'main/substation/dcu/$$dcuid$$/details';

// substation page related URL
Vue.ssmidnightURL = Vue.prototype.ssmidnightURL = Vue.prototype.rootUrl + 'ss/midnight/$$dcuid$$/$$feedername$$/$$startdate$$/$$enddate$$/getmidnightsummary';

// graphical dashboard related URL
Vue.graphical_summary_listURL = Vue.prototype.graphical_summary_listURL = Vue.prototype.rootUrl + 'main/graphical/summary_list';
Vue.getoverall_graph_listURL = Vue.prototype.getoverall_graph_listURL = Vue.prototype.rootUrl + 'main/graphical/$$startdate$$/$$enddate$$';
Vue.getregionURL = Vue.prototype.getregionURL = Vue.prototype.rootUrl + 'main/graphical/region';
Vue.getcicrleURL = Vue.prototype.getcicrleURL = Vue.prototype.rootUrl + 'main/circle/$$regionid$$';
Vue.getcicrleSSURL = Vue.prototype.getcicrleSSURL = Vue.prototype.rootUrl + 'main/substation/$$circleid$$';
Vue.getcicrleSSOnlineURL = Vue.prototype.getcicrleSSOnlineURL = Vue.prototype.rootUrl + 'main/substation/online/$$circleid$$';
Vue.getSSURL = Vue.prototype.getSSURL = Vue.prototype.rootUrl + 'get/substation/$$circleid$$/list';
Vue.getSSMeterURL = Vue.prototype.getSSMeterURL = Vue.prototype.rootUrl + 'main/meter/$$dcuid$$';
Vue.getSSMeterOnlineURL = Vue.prototype.getSSMeterOnlineURL = Vue.prototype.rootUrl + 'main/meter/online/$$dcuid$$';
Vue.getregionWisegraphURL = Vue.prototype.getregionWisegraphURL = Vue.prototype.rootUrl + 'main/graphical/allregion/$$startdate$$/$$enddate$$';
Vue.getsubstationSSURL = Vue.prototype.getsubstationSSURL = Vue.prototype.rootUrl + 'main/get/$$regionID$$/$$circleID$$/$$substationID$$/$$startdate$$/$$enddate$$';
Vue.getducCountStatusURL = Vue.prototype.getducCountStatusURL = Vue.prototype.rootUrl + 'get/duccountstatus/$$startdate$$/$$enddate$$';
Vue.getducHorizontalconnStatusURL = Vue.prototype.getducHorizontalconnStatusURL = Vue.prototype.rootUrl + 'get/horizontal/graph/conn/$$startper$$/$$endper$$';
Vue.getducHorizontaldatavlStatusURL = Vue.prototype.getducHorizontaldatavlStatusURL = Vue.prototype.rootUrl + 'get/horizontal/graph/dataavl/$$startper$$/$$endper$$';


// device related api
Vue.device_listUrl = Vue.prototype.device_listUrl = Vue.prototype.rootUrl + 'device/device_list';
Vue.device_createUrl = Vue.prototype.device_createUrl = Vue.prototype.rootUrl + 'device/create';
Vue.device_updateUrl = Vue.prototype.device_updateUrl = Vue.prototype.rootUrl + 'device/update';
Vue.device_onlynoofmetersupdateUrl = Vue.prototype.device_onlynoofmetersupdateUrl = Vue.prototype.rootUrl + 'device/noofmeter/update';
Vue.device_deleteUrl = Vue.prototype.device_deleteUrl = Vue.prototype.rootUrl + 'device/$$deviceS_id$$/$$loginPassword$$/$$userRole$$/$$userName$$/delete';
Vue.deviceDMLSmeterUrl = Vue.prototype.deviceDMLSmeterUrl = Vue.prototype.rootUrl + 'device/dlms/$$deviceID$$';
Vue.deviceSERIALmeterUrl = Vue.prototype.deviceSERIALmeterUrl = Vue.prototype.rootUrl + 'device/serial/$$deviceID$$';
Vue.device_IOTdetailsListUrl = Vue.prototype.device_IOTdetailsListUrl = Vue.prototype.rootUrl + 'device/general/$$deviceID$$';
Vue.device_GENcreateUrl = Vue.prototype.device_GENcreateUrl = Vue.prototype.rootUrl + 'device/gen/create';
Vue.dlmsmeter_saveUrl = Vue.prototype.dlmsmeter_saveUrl = Vue.prototype.rootUrl + 'device/dmls/save';
Vue.serialmeter_saveUrl = Vue.prototype.serialmeter_saveUrl = Vue.prototype.rootUrl + 'device/serial/save';
Vue.devicesummaryUrl = Vue.prototype.devicesummaryUrl = Vue.prototype.rootUrl + 'device/$$deviceid$$/list';
Vue.devicecommandUrl = Vue.prototype.devicecommandUrl = Vue.prototype.rootUrl + 'device/command/config';
Vue.deviceresponseBTNUrl = Vue.prototype.deviceresponseBTNUrl = Vue.prototype.rootUrl + 'device/gendlms/$$btnname$$/$$deviceID$$';
Vue.deviceFWdetailsUrl = Vue.prototype.deviceFWdetailsUrl = Vue.prototype.rootUrl + 'device/fw/details';
Vue.dcuSerialNumdataURL = Vue.prototype.dcuSerialNumdataURL = Vue.prototype.rootUrl + 'get/dcu/serialnumber';

// history device
Vue.getHistroyURL = Vue.prototype.getHistroyURL = Vue.prototype.rootUrl + 'device/history/details';
Vue.getviewHistroyRESURL = Vue.prototype.getviewHistroyRESURL = Vue.prototype.rootUrl + 'get/view/history/response';

//region related api
Vue.regionlistURL = Vue.prototype.regionlistURL = Vue.prototype.rootUrl + 'all/region/list';
Vue.addregionURL = Vue.prototype.addregionURL = Vue.prototype.rootUrl + 'add/region';
Vue.updateregionURL = Vue.prototype.updateregionURL = Vue.prototype.rootUrl + 'update/region';
Vue.deleteregionURL = Vue.prototype.deleteregionURL = Vue.prototype.rootUrl + 'delete/$$regionno$$/$$username$$/$$userrole$$/region';

//circle related api
Vue.circlelistURL = Vue.prototype.circlelistURL = Vue.prototype.rootUrl + 'all/circle/list';
Vue.addcircleURL = Vue.prototype.addcircleURL = Vue.prototype.rootUrl + 'add/circle';
Vue.updatecircleURL = Vue.prototype.updatecircleURL = Vue.prototype.rootUrl + 'update/circle';
Vue.deletecircleURL = Vue.prototype.deletecircleURL = Vue.prototype.rootUrl + 'delete/$$circleno$$/$$username$$/$$userrole$$/circle';

//ss management related api
Vue.substationlistURL = Vue.prototype.substationlistURL = Vue.prototype.rootUrl + 'all/substation/list';
Vue.addsubstationURL = Vue.prototype.addsubstationURL = Vue.prototype.rootUrl + 'add/substation';
Vue.updatesubstationURL = Vue.prototype.updatesubstationURL = Vue.prototype.rootUrl + 'update/substation';
Vue.deletesubstationURL = Vue.prototype.deletesubstationURL = Vue.prototype.rootUrl + 'delete/$$substationid$$/$$username$$/$$userrole$$/substation';
Vue.getsubstationRatingURL = Vue.prototype.getsubstationRatingURL = Vue.prototype.rootUrl + 'get/substation/rating';

//command related api
Vue.cmd_listUrl = Vue.prototype.cmd_listUrl = Vue.prototype.rootUrl + 'command/command_list';
Vue.cmd_createUrl = Vue.prototype.cmd_createUrl = Vue.prototype.rootUrl + 'command/create';
Vue.getcommand_resURL = Vue.prototype.getcommand_resURL = Vue.prototype.rootUrl + 'command/response';
Vue.fillterOdMsgURL = Vue.prototype.fillterOdMsgURL = Vue.prototype.rootUrl + 'command/filter/response';
Vue.feederMissingDataURL = Vue.prototype.feederMissingDataURL = Vue.prototype.rootUrl + 'feeder/ls/missing/data';


//import related api
Vue.getfirmware_verURL = Vue.prototype.getfirmware_verURL = Vue.prototype.rootUrl + 'get/firmware/$$deviceID$$';
Vue.xmlfileuploadURL = Vue.prototype.xmlfileuploadURL = Vue.prototype.rootUrl + 'get/upload/xml';
Vue.saveFileExportURL = Vue.prototype.saveFileExportURL = Vue.prototype.rootUrl + 'post/upload/xml/data';
Vue.getCDCSAuditUseDCUURL = Vue.prototype.getCDCSAuditUseDCUURL = Vue.prototype.rootUrl + 'get/dcu/cdf/audit';

Vue.getducInfoURL = Vue.prototype.getducInfoURL = Vue.prototype.rootUrl + 'get/dcu/info/$$deviceID$$';

// user management related api
Vue.userManagementlistUrl = Vue.prototype.userManagementlistUrl = Vue.prototype.rootUrl + 'users/user_list';
Vue.createUserManagementUrl = Vue.prototype.createUserManagementUrl = Vue.prototype.rootUrl + 'users/add_user';
Vue.updateUserManagementUrl = Vue.prototype.updateUserManagementUrl = Vue.prototype.rootUrl + 'users/update_user';
Vue.userManagementdeleteUrl = Vue.prototype.userManagementdeleteUrl = Vue.prototype.rootUrl + 'users/$$empID$$/$$username$$/$$userrole$$/delete';

// diag related api
Vue.getDiagURL = Vue.prototype.getDiagURL = Vue.prototype.rootUrl + 'diag/post';

// threshold related URL
Vue.getThresholdURL = Vue.prototype.getThresholdURL = Vue.prototype.rootUrl + 'threshold/get/details/$$category$$';
Vue.addupdateThresholdURL = Vue.prototype.addupdateThresholdURL = Vue.prototype.rootUrl + 'threshold/add/update';

// data editing api
Vue.getloadsurveyURL = Vue.prototype.getloadsurveyURL = Vue.prototype.rootUrl + 'post/ls/data/editing';
Vue.getmidnightURL = Vue.prototype.getmidnightURL = Vue.prototype.rootUrl + 'post/midnight/data/editing';
Vue.getbillingURL = Vue.prototype.getbillingURL = Vue.prototype.rootUrl + 'post/billing/data/editing';

Vue.updateloadsurveyURL = Vue.prototype.updateloadsurveyURL = Vue.prototype.rootUrl + 'post/ls/update/data/editing';
Vue.updatemidnightURL = Vue.prototype.updatemidnightURL = Vue.prototype.rootUrl + 'post/midnight/update/data/editing';
Vue.updatebillingURL = Vue.prototype.updatebillingURL = Vue.prototype.rootUrl + 'post/billing/update/data/editing';


// Notification related api
Vue.notiManagementlistUrl = Vue.prototype.notiManagementlistUrl = Vue.prototype.rootUrl + 'notification/list';
Vue.notiADDManagementlistUrl = Vue.prototype.notiADDManagementlistUrl = Vue.prototype.rootUrl + 'notification/add';
Vue.notiUPDATEManagementlistUrl = Vue.prototype.notiUPDATEManagementlistUrl = Vue.prototype.rootUrl + 'notification/update';
Vue.notiDELETEManagementlistUrl = Vue.prototype.notiDELETEManagementlistUrl = Vue.prototype.rootUrl + 'notification/$$nofid$$/$$username$$/$$userrole$$/delete';

// VIew CDF
Vue.getCDCSAuditURL = Vue.prototype.getCDCSAuditURL = Vue.prototype.rootUrl + 'get/cdf/audit/data';
Vue.getCDCSResURL = Vue.prototype.getCDCSResURL = Vue.prototype.rootUrl + 'get/cdf/data';
Vue.importCDCSURL = Vue.prototype.importCDCSURL = Vue.prototype.rootUrl + 'post/datatype/save/data';

Vue.firmwareListURL = Vue.prototype.firmwareListURL = Vue.prototype.rootUrl + 'firmware/list';
Vue.addfirmwareInfoURL = Vue.prototype.addfirmwareInfoURL = Vue.prototype.rootUrl + 'firmware/uploadinfo';
Vue.firmwareUploadFileURL = Vue.prototype.firmwareUploadFileURL = Vue.prototype.rootUrl + 'firmware/upload';
Vue.firmwareUploadDeleteURL = Vue.prototype.firmwareUploadDeleteURL = Vue.prototype.rootUrl + 'firmware/delete';

// AUDIT Realted URL
Vue.fillterAuditDetailsURL = Vue.prototype.fillterAuditDetailsURL = Vue.prototype.rootUrl + 'audit/post/details';


// Start out app!
// eslint-disable-next-line no-new
new Vue({
    el: '#root',
    router: router,
    store: store,
    render: h => h(AppView)
});

// change this. demo
// window.bugsnagClient = window.bugsnag('02fe1c2caaf5874c50b6ee19534f5932')
// window.bugsnagClient.use(window.bugsnag__vue(Vue))