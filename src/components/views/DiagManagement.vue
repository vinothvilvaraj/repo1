<template>
  <section class="content" id="diagmanagementPANE">
    <vue-element-loading :active="isLoading" spinner="line-wave" color="#000" :is-full-screen="true"/>
    <div class="row">
      <div class="col-lg-12">
       <ul class="timeline">
        <li>
          <i class="fa fa-comments-o bg-yellow"></i>
          <div class="timeline-item">
            <div class="timeline-body">
         <div class="row">
            <div class="col-md-2 order-md-3">
              <span>Category  : <select class="inputTEXTcss" id="diagCategoryTXT" v-model="diagCategoryTXT">
															<option value='Choose Category' selected disabled>Choose Category</option>
                              <option value='ALL_DIAG'>ALL_DIAG</option>
                              <option value='DLMS_DIAG'>DLMS_DIAG</option>
                              <option value='NTP_DIAG'>NTP_DIAG</option>
                              <option value='FTP_DIAG'>FTP_DIAG</option>
                              </select>
                              </span>
            </div>
            <div class="col-md-2 order-md-3">
              <span>Choose Date :  <select class="inputTEXTcss" id="diagDateOptionTXT" v-model="diagDateOptionTXT" @change="diagDateOptionMethod(diagDateOptionTXT)">
															<option value='Choose Date' selected disabled>Choose Date</option>
                              <option value='Today'>Today</option>
                              <option value='Week'>Week</option>
                              <option value='Month'>Month</option>
                              <option value='Custom'>Custom</option>
                              </select></span>
            </div>
            <div class="col-md-2 order-md-3" v-show="diagDateOptionTXT == 'Custom'" style="margin-top: 5px;">
              <span>From date : </span>
                <datepicker v-model="diagFromdateTXT" :disabledDates="disabledDates" class="inputTEXTcss" style="width:50%;margin-left: 70px;margin-top: -23px;"></datepicker>
            </div>
            <div class="col-md-2 order-md-3"  v-show="diagDateOptionTXT == 'Custom'" style="margin-top: 5px;">
              <span>To date : </span>
                <datepicker v-model="diagTodateTXT" :disabledDates="disabledDates" class="inputTEXTcss" style="width:50%;margin-left: 70px;margin-top: -23px;"></datepicker>
            </div>
             <div class="col-md-2 order-md-3">
               <button class="btn btn-primary" @click="getDiagMethod()">Submit</button>
            </div>
              </div>
            <div class="row">
          <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="diagmanagementTablePANE" style="border:1px solid lightgray">
                <table
                  class="table table-bordered"
                  id="diagmanagementTablePANEID"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Date Time</th>
                              <th>Diag Category</th>
                              <th v-show="false">Diag Port Num</th>
                              <th>Diag Message</th>
                    </tr>
                  </thead>
                    <tbody v-if="diagTBLJSONS != ''">
                            <tr v-for="(row,index) in diagTBLJSONS" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{datetimeformat(row.DATE_TIME)}}</td>
                              <td>{{row.DIAG_CATEGORY}}</td>
                              <td v-show="false">{{row.PORT}}</td>
                              <td style="text-align:left">{{row.DIAG_MSG}}</td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="diagTBLJSONS == ''" style="text-align:center;width: 100%;">
                      <span>No records found</span>
                 </div>
              </div>
            </template>
          </div>
        </div>
            </div>
          </div>
        </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import CripNotice from 'crip-vue-notice'
import VueElementLoading from 'vue-element-loading'
import Datepicker from "vuejs-datepicker";
const dtToday = new Date();
const dtmonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
var dtmonthVal = dtToday.getMonth();
var dtmonth = dtToday.getMonth();
var dtday = dtToday.getDate();
var dtyear = dtToday.getFullYear();
var myDate = new Date();
var hhours = dtToday.getHours();
var mints = dtToday.getMinutes();
var secs = dtToday.getSeconds();
export default {
  name: 'diagconfigPAGE',
  components: {
    CripNotice,
    VueElementLoading,
    Datepicker
  },
  data () {
    return {
      user_role: this.$session.get("userrole"),
      isLoading: false,
      fullPage: true,
      diagmanagemode: true,
      diagTBLJSONS:'',
      disabledDates: {
        from: new Date()
      },
      diagFromdateTXT:myDate,
      diagTodateTXT:myDate,
      diagCategoryTXT:'ALL_DIAG',
      diagDateOptionTXT:'Today',
      diagSetInterval:null,
    }
  },
  created(){
  },
  mounted () {
    let innerMinHeight = window.innerHeight - 125 + "px";
    document.getElementById("diagmanagementPANE").style.height = innerMinHeight;
    document.getElementById("diagmanagementTablePANE").style.height = window.innerHeight - 235 + "px";
    document.getElementById("diagmanagementTablePANE").style.border = "1px solid lightgray";
    //this.getDiagManageList("",this.diagCategoryTXT,this.diagDateOptionTXT,this.changeDDMMYYYYFORMAT(this.diagFromdateTXT),this.changeDDMMYYYYFORMAT(this.diagTodateTXT));
    this.getDiagMethod();
  },
  destroyed(){
    if(this.diagSetInterval != null){
      clearInterval(this.diagSetInterval);
    }
  },
  watch:{
  },
  methods: {
    beforeOpen () {
    },
    beforeClose () {
    },
    opened (e) {
    },
    closed (e) {
    },
    diagDateOptionMethod(dateoptionTXT){
      if(dateoptionTXT == "Today"){
        this.diagFromdateTXT = new Date();
        this.diagTodateTXT = new Date();
      }else if(dateoptionTXT == "Week"){
        var weekdate = new Date();
        weekdate.setDate(weekdate.getDate() - 7);
        this.diagFromdateTXT = weekdate;
        this.diagTodateTXT = myDate;
      }else if(dateoptionTXT == "Month"){
        var monthdate =new Date();
        monthdate.setDate(monthdate.getDate() - 30);
        this.diagFromdateTXT = monthdate;
        this.diagTodateTXT = myDate;
      }
    },
     autorefreshDiagManageList(dcuid,category,dateoption,startdate,enddate) {
      var saveInfo = {
        "dcuid":dcuid,
        "category": category,
        "date_option":dateoption,
        "start_date":startdate,
        "end_date":enddate
      }
       axios.post(this.getDiagURL, saveInfo)
          .then(response => {
            var status = response.data.status;
            if (status == "found") {
              this.diagTBLJSONS = response.data.details;
            }else{
              this.diagTBLJSONS = "";
            }
          })
          .catch(function(error) {
            this.warningMessage("error::" + error.message);
          });
    },
    getDiagManageList(dcuid,category,dateoption,startdate,enddate) {
      this.isLoading = true;
      var saveInfo = {
        "dcuid":dcuid,
        "category": category,
        "date_option":dateoption,
        "start_date":startdate,
        "end_date":enddate
      }
       axios.post(this.getDiagURL, saveInfo)
          .then(response => {
            var status = response.data.status;
            if (status == "found") {
              this.diagTBLJSONS = response.data.details;
              this.isLoading = false;
            }else{
              this.diagTBLJSONS = "";
               this.isLoading = false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
          });
    },
    async getDiagMethod(){
      if(this.diagSetInterval != null){
        clearInterval(this.diagSetInterval);
      }
      await this.getDiagManageList("",this.diagCategoryTXT,this.diagDateOptionTXT,this.changeDDMMYYYYFORMAT(this.diagFromdateTXT),this.changeDDMMYYYYFORMAT(this.diagTodateTXT));
      setTimeout(() => {
              this.diagSetInterval = setInterval(async() => {
              await this.autorefreshDiagManageList("",this.diagCategoryTXT,this.diagDateOptionTXT,this.changeDDMMYYYYFORMAT(this.diagFromdateTXT),this.changeDDMMYYYYFORMAT(this.diagTodateTXT));
              }, 2000);
              }, 1000);
    },
     changeDDMMYYYYFORMAT(oldtime) {
      var today = new Date(oldtime);
      var yyyy = today.getFullYear();
      var mm = today.getMonth() + 1;
      var dd = today.getDate();
      var hh = today.getHours();
      var min = today.getMinutes();
      var sec = today.getSeconds();
       if (mm < 10) {
        mm = "0" + mm;
      }
      if (dd < 10) {
        dd = "0" + dd;
      }
      var date = yyyy + "-" + mm + "-" + dd;
      return date;
    },
     datetimeformat(oldtime) {
      var today = new Date(oldtime);
      var yyyy = today.getFullYear();
      var mm = today.getMonth() + 1;
      var dd = today.getDate();
      var hh = today.getHours();
      var min = today.getMinutes();
      var sec = today.getSeconds();
       if (mm < 10) {
        mm = "0" + mm;
      }
      if (dd < 10) {
        dd = "0" + dd;
      }
       if (hh < 10) {
        hh = "0" + hh;
      }
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      var date = yyyy + "-" + mm + "-" + dd +" "+hh +":"+min+":"+sec;
      return date;
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    userIDblockSpecialChar(e) {
      var keyCode = e.which; // Not allow special

      /*
 48-57 - (0-9)Numbers
 65-90 - (A-Z)
 97-122 - (a-z)
 8 - (backspace)
 32 - (space)
 */ if (
        !(
          (keyCode >= 65 && keyCode <= 90) ||
          (keyCode >= 97 && keyCode <= 122)
        ) &&
        keyCode != 8 &&
        keyCode != 32
      ) {
        e.preventDefault();
      }
    },
    EmailAddressvalid(str) {
      var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return pattern.test(str); // returns a boolean
    },
    successMessage(msg) {
      this.$notice.success({
        title: "Notification",
        description: msg,
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      });
    },
    warningMessage(msg) {
      this.$notice.warning({
        title: "Notification",
        description: msg,
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      });
    },
    errorMessage(msg) {
      this.$notice.error({
        title: "Notification",
        description: msg,
        duration: 5,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      });
    },
    showPassword() {
      if (this.typevalue === "password") {
        this.typevalue = "text";
        this.imgvalue = "static/img/images/Peye.png";
      } else {
        this.typevalue = "password";
        this.imgvalue = "static/img/images/Peye1.png";
      }
    },
    showPassword1() {
      if (this.typevalue1 === "password") {
        this.typevalue1 = "text";
        this.imgvalue1 = "static/img/images/Peye.png";
      } else {
        this.typevalue1 = "password";
        this.imgvalue1 = "static/img/images/Peye1.png";
      }
    }
  }
}
</script>
<style scoped>

.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
.dataav-theme {
  background-color: #032457 !important;
}
.dataav-theme2 {
  background-color: #049f82 !important;
}
.inputTEXTcss {
  border: 1px solid lightgray;
  width: 60%;
  height: 30px;
}
.radiotop{
    margin-top:-5px !important;
}

.modal-content {
  border-radius: 0;
  border: none;
}

.modal-header {
  border-bottom-color: #eeeeee;
  padding: 5px;
}
 .size-modal-content {
    padding: 10px;
    font-style: 13px;
  }
  .v--modal-overlay[data-modal="size-modal"] {
    background: rgba(0, 0, 0, 0.5);
  }
.demo-modal-class {
    border-radius: 5px;
    background: #F7F7F7;
    height: auto;
    background:white;
    box-shadow: 5px 5px 30px 0px rgba(46,61,73, 0.6);
  }
.outerline{
  border: 1px solid lavender;
}
.inputTEXTLBLcss{
 font-size: 15px;
}
.timeline > li > .timeline-item > .timeline-header {
    margin: 0;
    color: #0073b7 !important;
    border-bottom: 1px solid#f4f4f4;
    padding: 10px;
    font-size: 16px;
    line-height: 1.1;
}

table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td,
table th {
  border: 1px solid rgb(235, 232, 232);
  padding: 2px;
}

table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tbody tr:hover {
  background-color: rgb(235, 232, 232);
}
td img {
  cursor: pointer;
}
table th {
  padding-bottom: 1px;
  text-align: center;
  background-color: #1a495e;
  max-height: 40px;
  height: 40px;
  vertical-align: middle !important;
  font-size: 13px;
  color: white;
}
table tr td {
  padding-bottom: 1px;
  text-align: center;
  max-height: 40px;
  height: 40px;
  font-size: 13px;
}
.hyperlink{
cursor: pointer;
text-decoration: underline;
}
.hyperlink:hover{
cursor: pointer;
color: #1a495e;
text-decoration: underline;
}
.eyeimg {
  right: 20px;
  position: absolute;
  top: 12px;
  width: 20px;
  cursor: pointer;
}
.disableCSS{
  background-color: #eaeaea;
cursor: not-allowed;
}

.bgBtn {
  background: #1a495e !important;
  border: 0;
}
.outerInputCss{
 border: 1px solid lightgray;
 height: 30px;
 color:#000;
 width: 100%;
 font-size: 12px;
}
.outerInputCss::placeholder {
  color: gray;
  font-family: Arial, Helvetica, sans-serif;
}
.inputOuterCssText77 {
  height: 30px;
  background: transparent;
  border: 1px solid lightgray;
  width: 35%;
  font-size: 0.9em;
}
.inputOuterCssText {
  height: 30px;
  background: transparent;
  border: 1px solid lightgray;
  width: 70%;
  font-size: 0.9em;
}
.inputOuterCss1 {
  height: 30px;
  background: transparent;
  border: 1px solid lightgray;
  width: 20%;
  font-size: 0.9em;
}
.inputOuterCss2 {
  height: 30px;
  background: transparent;
  border: 1px solid lightgray;
  width: 95%;
  font-size: 0.9em;
}
.text-header-color {
  color: #5e72e4;
  font-size: 15px;
}
.eyeimg {
  right: 120px;
  position: absolute;
  top: 10px;
  width: 20px;
}
label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 0px !important;
    font-weight: normal !important;
}
</style>

