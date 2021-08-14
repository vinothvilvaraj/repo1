<template>
  <div class="row">
     <vue-element-loading :active="isLoading" spinner="line-wave" color="#000" :is-full-screen="true"/>
    <div class="col-lg-12">
      <div class="table-responsive" id="viewCDFtablePANE" style="border:1px solid lightgray">
                <table class="table table-bordered" id="viewCDFtablePANEID">
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Date Time</th>
                              <th>User Name</th>
                              <th>User Role</th>
                              <th>Region Name</th>
                              <th>Circle Name</th>
                              <th>SS Name</th>
                              <th>Device Name</th>
                              <th>Feeder Name</th>
                              <th>Data Type</th>
                              <th>CDCS File Name</th>
                              <th>View</th>
                              <th>Import</th>
                    </tr>
                  </thead>
                    <tbody v-if="viewCDFtableJSON != ''">
                            <tr v-for="(row,index) in viewCDFtableJSON" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{datewithTime(row.datetime)}}</td>
                              <td>{{row.username}}</td>
                              <td>{{row.role}}</td>
                              <td>{{row.regionname}}</td>
                              <td>{{row.circlename}}</td>
                              <td>{{row.ssname}}</td>
                              <td>{{row.dcuname}}</td>
                              <td>{{row.metername}}</td>
                              <td>{{row.datatype}}</td>
                              <td>{{row.filename}}</td>
                              <td><i class="fa fa-eye text-blue" style="cursor:pointer" @click="viewCDFresponseMethod(index,row)"></i></td>
                              <td><i class="fa fa-align-justify text-black" style="cursor:pointer" @click="importCDFMethod(index,row)"></i></td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="viewCDFtableJSON == ''" style="text-align:center;width: 100%;">
                      <span>No records found</span>
                 </div>
              </div>  </div>


     <modal name="viewcdfresponsePopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"  style="z-index:1111 !important"
        :scrollable="true"
        :reset="true"
        width="55%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-6" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> Response</h4>
              </div>
              <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button id="hide_rescloseBTN" type="button" class="btn btn-default" @click="viewcdfresponsePopupClose" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
              <div class="row">
               <div class="col-lg-6">
                 <table style="width:275px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Region Name </td> <td>:</td> <td style="text-align:left"><b>{{cdfResObject.regionname}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">SS Name  </td> <td>:</td> <td style="text-align:left"><b>{{cdfResObject.ssname}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Data Type </td> <td>:</td> <td style="text-align:left"><b>{{cdfResObject.datatype}}</b></td>
               </tr>
             </table>
               </div>
                <div class="col-lg-6">
                  <table style="width:275px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Circle Name </td> <td>:</td> <td style="text-align:left"><b>{{cdfResObject.circlename}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Device Name </td> <td>:</td> <td style="text-align:left"><b>{{cdfResObject.dcuname}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Feeder Name </td> <td>:</td> <td style="text-align:left"><b>{{cdfResObject.metername}}</b></td>
               </tr>
             </table>
               </div>
            </div>
              <p style="text-decoration: underline;"><b>Upload CDF Information</b></p>
              <div class="row" style="margin-top: -10px;">
                <div class="col-lg-6">
                  <table style="width:295px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Date Time </td> <td>:</td> <td style="text-align:left"><b>{{datewithTime(cdfResObject.file_datetime)}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Firmware Version </td> <td>:</td> <td style="text-align:left"><b>{{cdfResObject.firmware_version}}</b></td>
               </tr>
             </table>
                </div>
                <div class="col-lg-6">
<table style="width:395px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Meter Serial Num </td> <td>:</td> <td style="text-align:left"><b>{{cdfResObject.meter_serial_num}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Manufacturer Name </td> <td>:</td> <td style="text-align:left"><b>{{cdfResObject.manufacturer_name}}</b></td>
               </tr>
             </table>
                </div>
              </div>
                 <p></p>
              <span style="text-decoration: underline;"><b>Parameter Details:</b></span>
         
           <div class="row">
             <div class="col-lg-12 " >
               <div class="table-responsive" style="border:1px solid lightgray;height:450px">
              <table class="style table table-bordered" id="rescdfTable">
                      <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th>S.No</th>
                      <th v-for="(paramterdetailItem,paramterindex) in viewresCDF_MSGJSON.column_details" v-bind:key="paramterindex">{{paramterdetailItem}}</th>
                    </tr>
                  </thead>
                  <tbody v-if="viewresCDF_MSGJSON != ''">
                    <tr v-for="(detailItem,index) in viewresCDF_MSGJSON.details" v-bind:key="index" >
                    <td>{{index+1}}</td>
                    <td v-for="(paramterdetailItem,paramterindex) in viewresCDF_MSGJSON.column_details" v-bind:key="paramterindex" >
                      <span v-if="paramterdetailItem == 'date_time'">{{datewithTime(detailItem[paramterdetailItem])}}</span>
                             <span v-else> {{detailItem[paramterdetailItem]}}</span>
                      </td>
                    </tr>
                  </tbody>
                    </table>
              <div v-if="viewresCDF_MSGJSON == ''" style="text-align:center;width: 100%;">
                 <span>No records found</span>
                 </div>
                    </div>
           </div>
             </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
            <a id="viewresclsBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="viewcdfresponsePopupClose">Cancel</a>
          </div>
          </div>
          </modal>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import CripNotice from 'crip-vue-notice'
import VueElementLoading from 'vue-element-loading'
export default {
  name: 'viewCDFTable',
  props:["viewCDCSObject"],
  components: {
    CripNotice,
    VueElementLoading
  },
  data () {
    return {
      user_role: this.$session.get("userrole"),
      user_name: this.$session.get("username"),
      viewCDFtableJSON:'',
      viewresCDF_MSGJSON:'',
      cdfResObject:'',
      isLoading: false,
      fullPage: true,
    }
  },
  created(){
    
  },
  mounted () {
    let innerMinHeight = window.innerHeight - 235 + "px";
    document.getElementById("viewCDFtablePANE").style.height = innerMinHeight;
  },
   watch: {
    viewCDCSObject: function () {
     this.getCDFAuditMethod();
    }
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
    viewcdfresponsePopupShow(){
      this.$modal.show('viewcdfresponsePopup');
    },
    viewcdfresponsePopupClose(){
      this.$modal.hide('viewcdfresponsePopup');
    },
    importCDFMethod(rowIndex,detailsitems){
      this.isLoading = true;
      axios
          .post(this.importCDCSURL, detailsitems)
          .then(response => {
            var status = response.data.status;
            if (status.includes("import success")) {
              this.isLoading = false;
                  this.$fire({title: "Confirmation",text: "Import Successfully...",type: "success",timer: 3000
                }).then(r => {
                console.log(r.value);
            });
            }else{
              this.isLoading = false;
                  this.$fire({title: "Confirmation",text: status ,type: "failure",timer: 3000
                }).then(r => {
                console.log(r.value);
            });
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error.message);
          });
    },
    getCDFAuditMethod(){
      // console.log('this.viewCDCSObject:', this.viewCDCSObject);
       axios
          .post(this.getCDCSAuditURL, this.viewCDCSObject)
          .then(response => {
            var status = response.data.status;
            if (status.includes("found")) {
            this.viewCDFtableJSON = response.data.details;
            }else{
            this.viewCDFtableJSON = "";
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error.message);
          });
    },
    viewCDFresponseMethod(rowIndex,detailItems){
      this.cdfResObject = detailItems;
       axios
          .post(this.getCDCSResURL, detailItems)
          .then(response => {
            var status = response.data.status;
            if (status.includes("found")) {
            this.viewcdfresponsePopupShow();
            this.viewresCDF_MSGJSON = response.data;
            }else{
            this.viewresCDF_MSGJSON = "";
            this.cdfResObject = "";
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error.message);
          });
    },
    generateRandomString(length) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
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
    datewithTime(dateval) {
    var date = new Date(dateval);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    var monthStr = month <= 9 ? "0" + month : month;
    var dateStr = day <= 9 ? "0" + day : day;
    var hourStr = hour <= 9 ? "0" + hour : hour;
    var minStr = min <= 9 ? "0" + min : min;
    var secStr = sec <= 9 ? "0" + sec : sec;
    return year +"-" +monthStr +"-" +dateStr +" " +hourStr +":" +minStr +":" + secStr;
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
  width: 100%;
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
.inputTEXTcss{
  border: 1px solid lightgray;
  width: 100%;
  height: 30px;
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
.instinfo tr td{
  border: 1px solid #fff;
  height: 30px;
}
</style>

