<template>
  <section class="content" id="reportsmanagementPANE">
    <vue-element-loading :active="isLoading" spinner="line-wave" color="#000" :is-full-screen="true"/>
    <div class="row">
      <div class="col-lg-12">
       <ul class="timeline">
        <li>
          <i class="fa fa-comments-o bg-yellow"></i>
          <div class="timeline-item">
          <div class="timeline-body">
            <div class="row" >
               <div class="col-md-3 order-md-3" style="background: lightskyblue;margin-left: 10px;">
              <span>Choose Category</span> :
              <select class="inputTEXTcssdrp" id="selcategoryTxt" v-model="selcategoryTxt" @change="categoryTxtchange(selcategoryTxt)">
              <option value='Choose Category' selected disabled>Choose Category</option>
              <option v-for="(items,index) in categoryArrayList" :key="index" :value="items" >{{items}}</option>
              </select>
            </div>
              <div class="col-md-2 order-md-3">
              </div>
              <div class="col-md-2 order-md-3">
              </div>
              <div class="col-md-2 order-md-3">
              </div>
              <div class="col-md-2 order-md-3">
              </div>
              <div class="col-md-1 order-md-3">
              </div>
            </div>
            <hr style="margin-top: 5px;margin-bottom: 5px;" />
            <p style="text-decoration: underline;font-weight: bold;">{{selcategoryTxt}} - Audit Details :</p>
          <div class="row">
             <div class="col-md-2 order-md-3" v-if="datatypeFlag">
              <span>Data Type</span> :
              <select class="inputTEXTcssdrp" id="seldatatypeTXT" v-model="seldatatypeTXT">
              <option value='Choose Data Type' selected disabled>Choose Data Type</option>
              <option v-for="(items,index) in seldatatypeArrayList" :key="index" :value="items" >{{items}}</option>
              </select>
            </div>
             <div class="col-md-2 order-md-3" v-if="datatypeThresholdFlag">
              <span>Data Type</span> :
              <select class="inputTEXTcssdrp" id="thresholddatatypeTXT" v-model="thresholddatatypeTXT">
              <option value='Choose Data Type' selected disabled>Choose Data Type</option>
              <option v-for="(items,index) in thresholddatatypeArrayList" :key="index" :value="items" >{{items}}</option>
              </select>
            </div>
            
             <div class="col-md-2 order-md-3" v-if="regionFlag">
                <span>Region</span> :
                 <select class="inputTEXTcssdrp" id="auditRegionTXT"  v-model="auditRegionTXT" @change="getauditCircleNameLst(auditRegionTXT)">
                 <option value='Choose Region' selected disabled>Choose Region</option>
                 <option v-for="(items,index) in auditregionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
                </select>
            </div>
             <div class="col-md-2 order-md-3" v-if="circleFlag">
                <span>Circle</span> :
                 <select class="inputTEXTcssdrp" id="auditCircleTXT"  v-model="auditCircleTXT" @change="getauditDeviceNameLst(auditCircleTXT)">
                 <option value='Choose Circle' selected disabled>Choose Circle</option>
                 <option v-for="(items,index) in auditcircleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME" >{{items.CIRCLE_NAME}}</option>
                </select>
            </div>
             <div class="col-md-2 order-md-3" v-if="deviceFlag">
               <span>Device</span> :
                 <select class="inputTEXTcssdrp" id="auditDeviceTXT"  v-model="auditDeviceTXT" @change="getauditMeterNameLst(auditDeviceTXT)">
                 <option value='Choose Device' selected disabled>Choose Device</option>
                 <option v-for="(items,index) in auditdeviceListArray" :key="index" :value="items.DCU_ID+'$$'+items.DCU_NAME" >{{items.DCU_NAME}}</option>
                </select>
            </div>
            <div class="col-md-2 order-md-3" v-if="meterFlag">
               <span>Feeder</span> :
                 <select class="inputTEXTcssdrp" id="auditFeederTXT"  v-model="auditFeederTXT">
                 <option value='Choose Feeder' selected disabled>Choose Feeder</option>
                 <option value='All$$All'>All</option>
                 <option v-for="(items,index) in auditfeederListArray" :key="index" :value="items.METER_ID+'$$'+items.METER_NAME" >{{items.METER_NAME}}</option>
                </select>
            </div>
            <div class="col-md-2 order-md-3" v-if="dateFlag">
               <span>Date wise</span> :
                 <select class="inputTEXTcssdrp1"  id="auditDateOptionTXT" v-model="auditDateOptionTXT" @change="changeDatewiseFunction(auditDateOptionTXT)">
                 <option value='Choose Date' selected disabled>Choose Date</option>
                 <option value='Today'>Today</option>
                 <option value='Week'>Week</option>
                 <option value='Month'>Month</option>
                 </select>
                 &nbsp;&nbsp;
                 <button id="auditmanagementaddBTN" class="btn btn-md btn-default bgBtn"  style="color:#fff" title="Submit" @click="submitAuditFunction()">
              <i class="fa fa-check" style="color:#fff"></i> Submit
            </button>
            </div>
             <div class="col-md-4 order-md-3" v-show="false">
              <span>From date : </span>
              <datepicker v-model="auditFromdateTXT" :disabledDates="auditdisabledDates" style="width:50%;"></datepicker>
              <span>To date :</span>
              <datepicker v-model="auditTodateTXT" :disabledDates="auditdisabledDates"  style="width:50%;"></datepicker>
               <button id="auditmanagementaddBTN" class="btn btn-md btn-default bgBtn"  style="color:#fff" title="Submit" >
              <i class="fa fa-check" style="color:#fff"></i> Submit
            </button>
             </div>
            <p></p>
          <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="reportsmanagementTablePANE" style="border:1px solid lightgray">
                <table
                  class="table table-bordered"
                  id="reportsDataEditTablePANEID" v-show="submitCategoryNameTXT == 'Data Edit'"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Date & Time</th>
                              <th>User Name</th>
                              <th>User Role</th>
                              <th>Data Type</th>
                              <th>Region</th>
                              <th>Circle</th>
                              <th>Device</th>
                              <th>Feeder</th>
                              <th style="width:400px">Audit Details</th>
                              <th style="width:300px">Audit Reasons</th>
                    </tr>
                  </thead>
                    <tbody v-if="auditmanagementDATAEDIT_TBLJSONS != ''">
                            <tr v-for="(row,index) in auditmanagementDATAEDIT_TBLJSONS.details" :key="row.id">
                              <td style="vertical-align: middle;">{{index+1}}</td>
                              <td style="vertical-align: middle;">{{datewithTime(row.date_time)}}</td>
                              <td style="vertical-align: middle;">{{row.user_name}}</td>
                              <td style="vertical-align: middle;">{{row.user_role}}</td>
                              <td style="vertical-align: middle;">{{row.data_type}}</td>
                              <td style="vertical-align: middle;">{{row.region_name}}</td>
                              <td style="vertical-align: middle;">{{row.circle_name}}</td>
                              <td style="vertical-align: middle;">{{row.dcu_name}}</td>
                              <td style="vertical-align: middle;">{{row.meter_name}}</td>
                              <td>
                              <table>
                              <tr>
                              <th style="background-color: transparent !important;color:black;font-weight:bold">Parameter</th>
                              <th style="background-color: transparent !important;color:black;font-weight:bold">Old Value</th>
                              <th style="background-color: transparent !important;color:black;font-weight:bold">New Value</th>
                              </tr>
                              <tbody v-if="row.audit_message.indexOf(',') > -1">
                              <tr v-for="(rowitems,rowindex) in row.audit_message.split(',')" :key="rowindex">
                                 <td>{{rowitems.split('parameter ')[1].split(' ')[0]}}</td>
                                  <td>{{rowitems.split('value changed from ')[1].split(' ')[0]}}</td>
                                   <td>{{rowitems.split('to ')[1]}}</td>
                              </tr>
                              </tbody>
                              <tbody v-else>
                              <tr>
                                 <td>{{row.audit_message.split('parameter ')[1].split(' ')[0]}}</td>
                                  <td>{{row.audit_message.split('value changed from ')[1].split(' ')[0]}}</td>
                                   <td>{{row.audit_message.split('to ')[1]}}</td>
                              </tr>
                              </tbody>
                               </table>
                              </td>
                              <!-- <td>{{row.audit_message}}</td> -->
                              <td style="vertical-align: middle;">{{row.audit_reason}}</td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="submitCategoryNameTXT == 'Data Edit' && auditmanagementDATAEDIT_TBLJSONS == ''" style="text-align:center;width: 100%;">
                      <span>No records found</span>
                 </div>
                 <!-- *END DATA EDIT TABLE LAYOUT* -->
                 <table
                  class="table table-bordered"
                  id="auditOnDemandCommandsTablePANEID" v-show="submitCategoryNameTXT == 'On Demand Commands'"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Date & Time</th>
                              <th>User Name</th>
                              <th>User Role</th>
                              <th>Region</th>
                              <th>Circle</th>
                              <th>Device</th>
                              <th>Feeder</th>
                              <th>Commands Name</th>
                              <th style="width:550px">Audit Details</th>
                    </tr>
                  </thead>
                    <tbody v-if="auditmanagementONDEMANDS_TBLJSONS != ''">
                            <tr v-for="(row,index) in auditmanagementONDEMANDS_TBLJSONS.details" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{datewithTime(row.datetime)}}</td>
                              <td>{{row.username}}</td>
                              <td>{{row.role}}</td>
                              <td>{{row.regionname}}</td>
                              <td>{{row.circlename}}</td>
                              <td>{{row.devicename}}</td>
                              <td>{{row.metername}}</td>
                              <td>{{row.command_name}}</td>
                              <td>{{row.reasons}}</td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="submitCategoryNameTXT == 'On Demand Commands' && auditmanagementONDEMANDS_TBLJSONS == ''" style="text-align:center;width: 100%;">
                      <span>No records found</span>
                 </div>
                  <!-- *END ON DEMAND COMMANDS TABLE LAYOUT* -->
                  <table class="table table-bordered" id="auditOnDemandCommandsTablePANEID" v-show="submitCategoryNameTXT == 'SS Data Upload'">
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Date & Time</th>
                              <th>User Name</th>
                              <th>User Role</th>
                              <th>Region</th>
                              <th>Circle</th>
                              <th>Device</th>
                              <th>Feeder</th>
                              <th>Data Type</th>
                              <th>File Name</th>
                              <th>Manufacturer Name</th>
                              <th style="width:550px">Audit Details</th>
                    </tr>
                  </thead>
                    <tbody v-if="auditmanagementCDCSXML_TBLJSONS != ''">
                            <tr v-for="(row,index) in auditmanagementCDCSXML_TBLJSONS.details" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{datewithTime(row.datetime)}}</td>
                              <td>{{row.username}}</td>
                              <td>{{row.role}}</td>
                              <td>{{row.regionname}}</td>
                              <td>{{row.circlename}}</td>
                              <td>{{row.dcuname}}</td>
                              <td>{{row.metername}}</td>
                              <td>{{row.datatype}}</td>
                              <td>{{row.filename}}</td>
                              <td>{{row.manufacturer_name}}</td>
                              <td>{{row.reasons}}</td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="submitCategoryNameTXT == 'SS Data Upload' && auditmanagementCDCSXML_TBLJSONS == ''" style="text-align:center;width: 100%;">
                      <span>No records found</span>
                 </div>
                 <!-- *END SS Data Upload TABLE LAYOUT* -->
                 <table class="table table-bordered" id="auditOnDemandCommandsTablePANEID" v-show="submitCategoryNameTXT == 'DCU Configuration Commands' || submitCategoryNameTXT == 'DCU Firmware Commands'">
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Date & Time</th>
                              <th>User Name</th>
                              <th>User Role</th>
                              <th>Region</th>
                              <th>Circle</th>
                              <th>Device</th>
                              <th>Audit Type</th>
                       <th style="width:550px">Audit Details</th>
                    </tr>
                  </thead>
                    <tbody v-if="auditmanagementCONFIG_TBLJSONS != ''">
                            <tr v-for="(row,index) in auditmanagementCONFIG_TBLJSONS.details" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{datewithTime(row.datetime)}}</td>
                              <td>{{row.username}}</td>
                              <td>{{row.role}}</td>
                              <td>{{submitRegionNameTXT}}</td>
                              <td>{{submitCircleNameTXT}}</td>
                              <td>{{row.devicename}}</td>
                              <td>{{row.audit_type}}</td>
                              <td>{{row.reasons}}</td>
                            </tr>
                          </tbody>
                </table>
                <div v-if="submitCategoryNameTXT == 'DCU Configuration Commands' && auditmanagementCONFIG_TBLJSONS == '' || submitCategoryNameTXT == 'DCU Firmware Commands' && auditmanagementCONFIG_TBLJSONS == ''" style="text-align:center;width: 100%;">
                      <span>No records found</span>
                 </div>
                  <!-- *END Configuration TABLE LAYOUT* -->

                   <table class="table table-bordered" id="auditOnDemandCommandsTablePANEID" v-show="submitCategoryNameTXT == 'Sub Station Management' || submitCategoryNameTXT == 'DCU Management' || submitCategoryNameTXT == 'User Management' || submitCategoryNameTXT == 'Notification Management' || submitCategoryNameTXT == 'Threshold Management' || submitCategoryNameTXT == 'Firmware Management'">
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Date & Time</th>
                              <th>User Name</th>
                              <th>User Role</th>
                              <th>Audit Type</th>
                       <th style="width:550px">Audit Details</th>
                    </tr>
                  </thead>
                    <tbody v-if="auditmanagementMANAGE_TBLJSONS != ''">
                            <tr v-for="(row,index) in auditmanagementMANAGE_TBLJSONS.details" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{datewithTime(row.date_time)}}</td>
                              <td>{{row.user_name}}</td>
                              <td>{{row.role}}</td>
                              <td>{{row.audit_type}}</td>
                              <td>{{row.audit_details}}</td>
                            </tr>
                          </tbody>
                </table>
                <div v-if="submitCategoryNameTXT == 'Sub Station Management' && auditmanagementMANAGE_TBLJSONS == '' || submitCategoryNameTXT == 'DCU Management' && auditmanagementMANAGE_TBLJSONS == '' || submitCategoryNameTXT == 'User Management' && auditmanagementMANAGE_TBLJSONS == '' || submitCategoryNameTXT == 'Notification Management' && auditmanagementMANAGE_TBLJSONS == '' || submitCategoryNameTXT == 'Threshold Management' && auditmanagementMANAGE_TBLJSONS == '' || submitCategoryNameTXT == 'Firmware Management' && auditmanagementMANAGE_TBLJSONS == ''"
                style="text-align:center;width: 100%;">
                      <span>No records found</span>
                 </div>
                   <!-- *END MANAGEMENT TABLE LAYOUT* -->
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
import CripNotice from 'crip-vue-notice';
import VueElementLoading from 'vue-element-loading';
import Datepicker from "vuejs-datepicker";
const dtToday = new Date();
const dtmonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dtmonthVal = dtToday.getMonth();
var dtmonth = dtToday.getMonth();
var dtday = dtToday.getDate();
var dtyear = dtToday.getFullYear();
var myDate = new Date();
var hhours = dtToday.getHours();
var mints = dtToday.getMinutes();
var secs = dtToday.getSeconds();
export default {
  name: 'auditconfigPAGE',
  components: {
    CripNotice,
    VueElementLoading,
    Datepicker
  },
  data () {
    return {
      user_name: this.$session.get("username"),
      user_role: this.$session.get("userrole"),
      isLoading: false,
      fullPage: true,
      auditFromdateTXT:myDate,
      auditTodateTXT:myDate,
      auditdisabledDates: {
        from: new Date()
      },
      auditmanagemode: true,
      auditmanagementDATAEDIT_TBLJSONS: '',
      auditmanagementONDEMANDS_TBLJSONS:'',
      auditmanagementCDCSXML_TBLJSONS: '',
      auditmanagementCONFIG_TBLJSONS: '',
      auditmanagementMANAGE_TBLJSONS: '',
      selcategoryTxt:'Choose Category',
      categoryArrayList:["Data Edit","On Demand Commands","SS Data Upload","DCU Configuration Commands","DCU Firmware Commands","Sub Station Management","DCU Management","User Management","Notification Management","Threshold Management","Firmware Management"],
      seldatatypeTXT:"Choose Data Type",
      seldatatypeArrayList:['All','Load Survey Data','Midnight Data','Billing Data'],
      thresholddatatypeArrayList:['All','Instantaneous','Load Survey','Midnight'],
      thresholddatatypeTXT:'Choose Data Type',
      auditRegionTXT : 'Choose Region',
      auditregionListArray:[],
      auditCircleTXT:'Choose Circle',
      auditcircleListArray:[],
      auditDeviceTXT:'Choose Device',
      auditFeederTXT:'Choose Feeder',
      auditDateOptionTXT:'Choose Date',
      submitCategoryNameTXT:'',
      submitRegionNameTXT:'',
      submitCircleNameTXT:'',
      auditdeviceListArray:[],
      auditfeederListArray:[],
      datatypeThresholdFlag:false,
      datatypeFlag:false,
      regionFlag:false,
      circleFlag:false,
      deviceFlag:false,
      meterFlag:false,
      dateFlag:false,
    }
  },
  created(){
  },
  mounted () {
    //this.isLoading = true;
    
    let innerMinHeight = window.innerHeight - 125 + 'px';
    document.getElementById("reportsmanagementPANE").style.height = innerMinHeight;
    document.getElementById("reportsmanagementTablePANE").style.height = window.innerHeight - 286 + "px";
    document.getElementById("reportsmanagementTablePANE").style.border =  "1px solid lightgray";
    //setTimeout(() => this.isLoading = false, 1500);
    this.selcategoryTxt = this.categoryArrayList[0];
    this.categoryTxtchange(this.selcategoryTxt);
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
    categoryTxtchange(categoryTXT){
      console.log('categoryTXT :', categoryTXT);
      this.isLoading = true;
      this.selcategoryTxt = categoryTXT;
      this.submitCategoryNameTXT = categoryTXT;
      if(categoryTXT == "Data Edit"){
         this.datatypeFlag = true;
         this.datatypeThresholdFlag = false;
         this.regionFlag = true;
         this.circleFlag = true;
         this.deviceFlag = true;
         this.meterFlag = true;
         this.dateFlag = true;
         this.seldatatypeTXT = this.seldatatypeArrayList[0];
         this.changeDatewiseFunction("Week");
         this.getauditRegionNameLst();
        setTimeout(() => this.submitAuditFunction(), 1600);
        setTimeout(() => this.isLoading = false, 1500);
      }else if(categoryTXT == "On Demand Commands"){
         this.datatypeFlag = false;
          this.datatypeThresholdFlag = false;
         this.regionFlag = true;
         this.circleFlag = true;
         this.deviceFlag = true;
         this.meterFlag = true;
         this.dateFlag = true;
         this.changeDatewiseFunction("Week");
         this.getauditRegionNameLst();
        setTimeout(() => this.submitAuditFunction(), 1600);
        setTimeout(() => this.isLoading = false, 1500);
      }else if(categoryTXT == "SS Data Upload"){
         this.datatypeFlag = false;
          this.datatypeThresholdFlag = false;
         this.regionFlag = true;
         this.circleFlag = true;
         this.deviceFlag = true;
         this.meterFlag = true;
         this.dateFlag = true;
         this.changeDatewiseFunction("Week");
         this.getauditRegionNameLst();
        setTimeout(() => this.submitAuditFunction(), 1600);
        setTimeout(() => this.isLoading = false, 1500);
      } else if(categoryTXT == "DCU Configuration Commands" || categoryTXT == "DCU Firmware Commands"){
         this.datatypeFlag = false;
          this.datatypeThresholdFlag = false;
         this.regionFlag = true;
         this.circleFlag = true;
         this.deviceFlag = true;
         this.meterFlag = false;
         this.dateFlag = true;
         this.changeDatewiseFunction("Week");
         this.getauditRegionNameLst();
        setTimeout(() => this.submitAuditFunction(), 1600);
        setTimeout(() => this.isLoading = false, 1500);
      } else if(categoryTXT == "Sub Station Management" || categoryTXT == "DCU Management" || categoryTXT == "User Management" || categoryTXT == "Notification Management"  || categoryTXT == "Firmware Management"){
         this.datatypeFlag = false;
         this.regionFlag = false;
          this.datatypeThresholdFlag = false;
         this.circleFlag = false;
         this.deviceFlag = false;
         this.meterFlag = false;
         this.dateFlag = true;
         this.changeDatewiseFunction("Week");
         this.getauditRegionNameLst();
        setTimeout(() => this.submitAuditFunction(), 1600);
        setTimeout(() => this.isLoading = false, 1500);
      } else if(categoryTXT == "Threshold Management"){
         this.datatypeThresholdFlag = true;
         this.datatypeFlag = false;
         this.regionFlag = false;
         this.circleFlag = false;
         this.deviceFlag = false;
         this.meterFlag = false;
         this.dateFlag = true;
         this.thresholddatatypeTXT = this.thresholddatatypeArrayList[0];
         this.changeDatewiseFunction("Week");
         this.getauditRegionNameLst();
        setTimeout(() => this.submitAuditFunction(), 1600);
        setTimeout(() => this.isLoading = false, 1500);
      }else{
        this.datatypeThresholdFlag = false;
        this.datatypeFlag = false;
        this.regionFlag = false;
        this.circleFlag = false;
        this.deviceFlag = false;
        this.meterFlag = false;
        this.dateFlag = false;
       setTimeout(() => this.isLoading = false, 1500);
      }
    },
    changeDatewiseFunction(changeDatewiseTXT){
      this.auditDateOptionTXT = changeDatewiseTXT;
      if(changeDatewiseTXT == "Today"){
        this.auditFromdateTXT  = new Date();
        this.auditTodateTXT  = new Date();
      }else if(changeDatewiseTXT == "Week"){
        var startdate = new Date();
        startdate.setDate(startdate.getDate()-7);
        this.auditFromdateTXT = startdate;
        this.auditTodateTXT  = new Date();
      }else if(changeDatewiseTXT == "Month"){
        var startdate = new Date();
        startdate.setDate(startdate.getDate()-30);
        this.auditFromdateTXT = startdate;
        this.auditTodateTXT  = new Date();
      }
    },
    getauditRegionNameLst(){
       this.auditregionListArray = [];
       this.auditRegionTXT = "Choose Region";
       this.auditCircleTXT = "Choose Circle";
       this.auditDeviceTXT = "Choose Device";
       this.auditFeederTXT = "Choose Feeder";
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.auditregionListArray = response.data.details;
          this.auditRegionTXT = this.auditregionListArray[0].REGION_ID+'$$'+this.auditregionListArray[0].REGION_NAME;
          this.getauditCircleNameLst(this.auditRegionTXT);
        } else {
          this.auditregionListArray = [];
          this.auditRegionTXT = "Choose Region";
          this.auditCircleTXT = "Choose Circle";
          this.auditDeviceTXT = "Choose Device";
          this.auditFeederTXT = "Choose Feeder";
        }
      });
    },
    getauditCircleNameLst(auditRegionTXT){
      var regionid = auditRegionTXT.split("$$")[0];
      var regionname = auditRegionTXT.split("$$")[1];
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.auditCircleTXT = "Choose Circle";
       this.auditDeviceTXT = "Choose Device";
       this.auditFeederTXT = "Choose Feeder";
       this.odcircleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.auditcircleListArray = response.data.details;
          this.auditCircleTXT = this.auditcircleListArray[0].CIRCLE_ID+'$$'+this.auditcircleListArray[0].CIRCLE_NAME;
          this.getauditDeviceNameLst(this.auditCircleTXT);
        } else {
          this.odcircleListArray = [];
          this.auditCircleTXT = "Choose Circle";
          this.auditDeviceTXT = "Choose Device";
          this.auditFeederTXT = "Choose Feeder";
        }
      });
    },
     getauditDeviceNameLst(auditCircleTXT){
      var circleid = auditCircleTXT.split("$$")[0];
      var circlename = auditCircleTXT.split("$$")[1];
       var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleid);
       this.auditdeviceListArray = [];
       this.auditDeviceTXT = "Choose Device";
       this.auditFeederTXT = "Choose Feeder";
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.auditdeviceListArray = response.data.details;
          this.auditDeviceTXT = this.auditdeviceListArray[0].DCU_ID+'$$'+this.auditdeviceListArray[0].DCU_NAME;
          this.getauditMeterNameLst(this.auditDeviceTXT);
        } else {
          this.auditdeviceListArray = [];
          this.auditDeviceTXT = "Choose Device";
          this.auditFeederTXT = "Choose Feeder";
        }
      });
    },
    getauditMeterNameLst(auditDeviceTXT){
      var dcuid = auditDeviceTXT.split("$$")[0];
      var dcuname = auditDeviceTXT.split("$$")[1];
      var getSSMeterURL = this.getSSMeterURL.replace("$$dcuid$$",dcuid);
      console.log('getSSMeterURL ', getSSMeterURL);
      this.auditfeederListArray = [];
      this.auditFeederTXT = "Choose Feeder";
      axios.get(getSSMeterURL).then(response => {
        if (response.data.status == "found") {
          this.auditfeederListArray = response.data.details;
          this.auditFeederTXT= 'All$$All';
        } else {
          this.auditFeederTXT = "Choose Feeder";
          this.auditfeederListArray = [];
        }
      });
    },
    submitAuditFunction(){
      this.isLoading = true;
       if(this.datatypeThresholdFlag &&  this.thresholddatatypeTXT == "Choose Category"){
        this.isLoading = false;
        this.warningMessage("please choose category and to proceed further.")
        return false;
      }
       if(this.datatypeFlag &&  this.selcategoryTxt == "Choose Category"){
        this.isLoading = false;
        this.warningMessage("please choose category and to proceed further.")
        return false;
      }

      if(this.selcategoryTxt == "Data Edit" && this.seldatatypeTXT == "Choose Data Type"){
        this.isLoading = false;
        this.warningMessage("please choose data type and to proceed further.")
        return false;
      }
       if(this.auditRegionTXT == "Choose Region"){
        this.isLoading = false;
        this.warningMessage("please choose region and to proceed further.")
        return false;
      }
       if(this.auditCircleTXT == "Choose Circle"){
        this.isLoading = false;
        this.warningMessage("please choose circle and to proceed further.")
        return false;
      }
       if(this.auditDeviceTXT == "Choose Device"){
        this.isLoading = false;
        this.warningMessage("please choose device and to proceed further.")
        return false;
      }
      if(this.selcategoryTxt == "DCU Configuration Commands" || this.selcategoryTxt == "DCU Firmware Commands"){
       }else{
         if(this.auditFeederTXT == "Choose Feeder"){
        this.isLoading = false;
        this.warningMessage("please choose feeder and to proceed further.")
        return false;
      }
       }
       if(this.auditDateOptionTXT == "Choose Date"){
        this.isLoading = false;
        this.warningMessage("please choose date and to proceed further.")
        return false;
      }
      this.submitCategoryNameTXT = this.selcategoryTxt;
      this.submitRegionNameTXT = this.auditRegionTXT.split('$$')[1];
      this.submitCircleNameTXT = this.auditCircleTXT.split('$$')[1];
      var auditJson = {
        "user_name":this.user_name,
        "user_role":this.user_role,
        "category_name":this.selcategoryTxt,
        "data_type":this.seldatatypeTXT,
        "threshold_category_name":this.thresholddatatypeTXT,
        "region_id":this.auditRegionTXT.split('$$')[0],
        "region_name":this.auditRegionTXT.split('$$')[1],
        "circle_id":this.auditCircleTXT.split('$$')[0],
        "circle_name":this.auditCircleTXT.split('$$')[1],
        "dcu_id":this.auditDeviceTXT.split('$$')[0],
        "dcu_name":this.auditDeviceTXT.split('$$')[1],
        "met_id":this.auditFeederTXT.split('$$')[0],
        "met_name":this.auditFeederTXT.split('$$')[1],
        "from_date": this.auditFromdateTXT,
        "to_date": this.auditTodateTXT,
      };
         this.resetJson();
         axios.post(this.fillterAuditDetailsURL, auditJson)
          .then(response => {
            var status = response.data.status;
            if (status == "found") {
              this.isLoading = false;
              if(response.data.category_name == "Data Edit"){
                this.auditmanagementDATAEDIT_TBLJSONS = response.data;
              }else if(response.data.category_name == "On Demand Commands"){
                this.auditmanagementONDEMANDS_TBLJSONS = response.data;
              }else if(response.data.category_name == "SS Data Upload"){
                this.auditmanagementCDCSXML_TBLJSONS = response.data;
              }else if(response.data.category_name == "DCU Configuration Commands" || response.data.category_name == "DCU Firmware Commands"){
                this.auditmanagementCONFIG_TBLJSONS = response.data;
              }else if(response.data.category_name == "Sub Station Management" || response.data.category_name == "DCU Management" || response.data.category_name == "User Management" || response.data.category_name == "Notification Management" || response.data.category_name == "Threshold Management" || response.data.category_name == "Firmware Management"){
                this.auditmanagementMANAGE_TBLJSONS = response.data;
              }
            }
            else {
              this.isLoading = false;
              this.resetJson();
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
          });
    },
    resetJson(){
      this.auditmanagementDATAEDIT_TBLJSONS = "";
      this.auditmanagementCONFIG_TBLJSONS = "";
      this.auditmanagementONDEMANDS_TBLJSONS = "";
      this.auditmanagementCDCSXML_TBLJSONS = "";
      this.auditmanagementMANAGE_TBLJSONS = "";
    },
    userIDblockSpecialChar(e) {
      var keyCode = e.which;
      if (
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
     notificationMessage(confirmation,bodydata,type,duration){
        this.$fire({title: confirmation, text: bodydata, type: type, timer: duration}).then(r => {
                console.log(r.value);
            });
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
<style  scoped>
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
  width: 100% !important;
  height: 30px;
}
.inputTEXTcssdrp{
  border: 1px solid lightgray;
  width: 75% !important;
  height: 30px;
}
.inputTEXTcssdrp1{
  border: 1px solid lightgray;
  width: 40% !important;
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
</style>

