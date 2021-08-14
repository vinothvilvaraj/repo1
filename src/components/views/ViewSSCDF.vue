<template>
  <section class="content" id="viewCDCSPANE">
    <vue-element-loading :active="isLoading" spinner="line-wave" color="#000" :is-full-screen="true"/>
    <div class="row">
       <div class="col-lg-12">
      <ul class="timeline">
        <li>
          <i class="fa fa-comments-o bg-yellow"></i>
          <div class="timeline-item">
            <div class="timeline-body">
              <div class="row">
             <div class="col-lg-2">
               <span>Region : </span>
               <select class="inputTEXTcss" id="cDCSTableRegionTXT"  v-model="cDCSTableRegionTXT" @change="getCircleNameLst(cDCSTableRegionTXT)">>
                 <option value='Choose Region' selected disabled>Choose Region</option>
                 <option v-for="(items,index) in regionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
                </select>

             </div>
              <div class="col-lg-2">
               <span>Circle : </span>
               <select class="inputTEXTcss" id="cDCSTableCircleTXT"  v-model="cDCSTableCircleTXT" @change="getSSNameLst(cDCSTableCircleTXT)">>
                 <option value='Choose Circle' selected disabled>Choose Circle</option>
                 <option v-for="(items,index) in circleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME">{{items.CIRCLE_NAME}}</option>
						  	</select>
             </div>
             <div class="col-lg-2">
               <span>Device : </span>
               <select class="inputTEXTcss" id="cDCSTableDeviceTXT"  v-model="cDCSTableDeviceTXT" @change="getmeterNameLst(cDCSTableDeviceTXT)">
                  <option value='Choose Device' selected disabled>Choose Device</option>
                  <option v-for="(items,index) in deviceListArray" :key="index" :value="items.DCU_ID+'$$'+items.DCU_NAME" >{{items.DCU_NAME}}</option>
							 </select>
             </div>
              <div class="col-lg-2">
               <span>Feeder : </span>
               <select class="inputTEXTcss" id="cDCSTableMeterTXT"  v-model="cDCSTableMeterTXT">
                   <option value='Choose Feeder' selected disabled>Choose Feeder</option>
                   <option v-for="(items,index) in meterListArray" :key="index" :value="items.METER_ID+'$$'+items.METER_NAME">{{items.METER_NAME}}</option>
							 	</select>
             </div>
              <div class="col-lg-2">
                <button id="submitCDCSBTN" class="btn btn-primary" @click="getssCDCSmethod()">Submit</button>
             </div>
             </div>
             <p></p>
      <viewCDCStable :viewCDCSObject="viewCDCSObject"></viewCDCStable>
            </div>
          </div>
        </li>
      </ul>
       </div>
    </div>
    <p></p>
    
  </section>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import CripNotice from 'crip-vue-notice'
import VueElementLoading from 'vue-element-loading'
import viewCDCStable from "./ViewSSCDFTable.vue";
export default {
  name: 'viewCDCS',
  components: {
    CripNotice,
    VueElementLoading,
    viewCDCStable
  },
  data () {
    return {
      user_role: this.$session.get("userrole"),
      user_name: this.$session.get("username"),
      isLoading: false,
      fullPage: true,
      regionListArray:[],
      circleListArray:[],
      deviceListArray:[],
      meterListArray:[],
      cDCSTableRegionTXT:'Choose Region',
      cDCSTableCircleTXT:'Choose Circle',
      cDCSTableDeviceTXT:'Choose Device',
      cDCSTableMeterTXT:'Choose Feeder',
      viewCDCSObject:'',

    }
  },
  created(){
     this.getRegionNameList();
     this.isLoading =true;
    // this.cDCSTableRegionTXT = this.regionListArray[0].REGION_ID+'$$'+this.regionListArray[0].REGION_NAME;
    // this.getCircleNameLst(this.cDCSTableRegionTXT)
     //this.cDCSTableCircleTXT = this.circleListArray[0].CIRCLE_ID+'$$'+this.circleListArray[0].CIRCLE_NAME;
    // this.getSSNameLst(this.cDCSTableCircleTXT);
     //this.cDCSTableDeviceTXT =this.deviceListArray[0].DCU_ID+'$$'+this.deviceListArray[0].DCU_NAME;
    // this.getmeterNameLst(this.cDCSTableDeviceTXT);
    // this.cDCSTableMeterTXT =this.meterListArray[0].METER_ID+'$$'+this.meterListArray[0].METER_NAME;
    setTimeout(() => {
      this.getssCDCSmethod();
    }, 1000);
  },
  mounted () {
    let innerMinHeight = window.innerHeight - 125 + "px";
    document.getElementById("viewCDCSPANE").style.height = innerMinHeight;
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
    getssCDCSmethod(){
      this.isLoading = true;
      this.viewCDCSObject = {
        "region_id":this.cDCSTableRegionTXT.split('$$')[0],
        "region_name":this.cDCSTableRegionTXT.split('$$')[1],
        "circle_id":this.cDCSTableCircleTXT.split('$$')[0],
        "circle_name":this.cDCSTableCircleTXT.split('$$')[1],
        "device_id":this.cDCSTableDeviceTXT.split('$$')[0],
        "device_name":this.cDCSTableDeviceTXT.split('$$')[1],
        "meter_id":this.cDCSTableMeterTXT.split('$$')[0],
        "meter_name":this.cDCSTableMeterTXT.split('$$')[1],
        };
        this.isLoading =false;
        console.log('getssCDCSmethod :: ', JSON.stringify(this.viewCDCSObject));
    },
    viewCDCSresponsePopupShow(){
      this.$modal.show('viewCDCSresponsePopup');
    },
    viewCDCSresponsePopupClose(){
      this.$modal.hide('viewCDCSresponsePopup');
    },
    getRegionNameList(){
      this.regionListArray = [];
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.regionListArray = response.data.details;
          this.cDCSTableRegionTXT = this.regionListArray[0].REGION_ID+'$$'+this.regionListArray[0].REGION_NAME;
          this.getCircleNameLst(this.cDCSTableRegionTXT)
        } else {
          this.regionListArray = [];
        }
      });
    },
    getCircleNameLst(regionidname){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
      this.userselRegionidTXT = regionid;
      this.userselRegionnameTXT = regionname;
      this.cDCSTableCircleTXT = "Choose Circle";
      this. cDCSTableDeviceTXT = "Choose Device";
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.circleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.circleListArray = response.data.details;
           this.cDCSTableCircleTXT = this.circleListArray[0].CIRCLE_ID+'$$'+this.circleListArray[0].CIRCLE_NAME;
           this.getSSNameLst(this.cDCSTableCircleTXT);
        } else {
          this.circleListArray = [];
        }
      });
    },
    getSSNameLst(circleidName){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
       this.userselCircleidTXT = circleid;
      this.userselCirclenameTXT = circlename;
       this.cDCSTableDeviceTXT = "Choose Device";
       var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleid);
       this.deviceListArray = [];
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.deviceListArray = response.data.details;
          this.cDCSTableDeviceTXT =this.deviceListArray[0].DCU_ID+'$$'+this.deviceListArray[0].DCU_NAME;
          this.getmeterNameLst(this.cDCSTableDeviceTXT);
        } else {
          this.deviceListArray = [];
        }
      });
    },
    getmeterNameLst(dcuidName){
       var dcuid = dcuidName.split("$$")[0];
      var dcuname = dcuidName.split("$$")[1];
       var getSSMeterURL = this.getSSMeterURL.replace("$$dcuid$$",dcuid);
       this.meterListArray = [];
       axios.get(getSSMeterURL).then(response => {
        if (response.data.status == "found") {
          this.cDCSTableMeterTXT = "Choose Feeder";
          this.meterListArray = response.data.details;
          this.cDCSTableMeterTXT =this.meterListArray[0].METER_ID+'$$'+this.meterListArray[0].METER_NAME;
        } else {
          this.cDCSTableMeterTXT = "Choose Feeder";
          this.meterListArray = [];
        }
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
  width: 70%;
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

