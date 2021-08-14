<template>
  <section class="content" id="ImportFilePANE">
    <vue-element-loading :active="isLoading" spinner="line-wave" color="#000" :is-full-screen="true"/>
    <div class="row">
      <div class="col-lg-12">
       <ul class="timeline">
        <li>
          <i class="fa fa-comments-o bg-yellow"></i>
          <div class="timeline-item">
            <div class="timeline-body">
               <div class="row">
            <div class="col-lg-3" id="importleftsidepane" style="border: 10px solid;border-color: transparent #007cc6 transparent transparent;">
            <div class="row">
              <div class="col-lg-4">
                <p>Region Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                {{fileimportRegionNameTXT}}
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Circle Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                {{fileimportCircleNameTXT}}
              </div>
            </div>
            <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Sub Station Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                {{fileimportSSNameTXT}}
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Device Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                {{fileimportDeviceNameTXT}}
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Feeder Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss"  id="fileimportMeterNameTXT" v-model="fileimportMeterNameTXT">
															  <option value='Choose Feeder' selected disabled>Choose Feeder</option>
                                <option v-for="(items,index) in meterListArray" :key="index" :value="items.METER_ID+'$$'+items.METER_NAME">{{items.METER_NAME}}</option>
															</select>
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Data Type :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss" id="fileimportDataTypeTXT" v-model="fileimportDataTypeTXT">
															  <option value='Choose Data Type' selected disabled>Choose Data Type</option>
                                <option value='Instantaneous Data'>Instantaneous Data</option>
                                <option value='Load Surey Data'>Load Surey Data</option>
                                <option value='Midnight Data'>Midnight Data</option>
                                <option value='Event Data'>Event Data</option>
                                <option value='Billing Data'>Billing Data</option>
								</select>
              </div>
            </div>
            
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Upload CDCS Data :</p>
              </div>
               <div class="ccol-lg-8 text-left">
                        <label>
                          <input type="file" id="xmlfile" ref="xmlfile" accept="text/xml" v-on:change="handleFile1UploadConfig()" style="margin-left: 15px;"/>
                        </label>
                      </div>
            </div>
             <p></p>
              <div class="row">
                <div class="col-lg-4">
                </div>
              <div class="col-lg-8">
            <button
                          id="uploadFW1_BTN"
                          type="button"
                          class="btn btn-sm btn-primary"
                          @click="submitXMLFileConfig()"
                        >
                          <img src="static/img/images/upload.png" /> Upload CDCS Data File
              </button>
            </div>
            </div>
            </div>
              <div class="col-lg-9">
                <p style="text-decoration: underline;"><b>Sub Station CDCS Details</b></p>
                <div class="row">
                <div class="col-lg-12">
                 <div class="table-responsive" id="importviewCDCStablePANE" style="border:1px solid lightgray">
                <table class="table table-bordered" id="importviewCDCStablePANEID">
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Date Time</th>
                              <th>Region Name</th>
                              <th>Circle Name</th>
                              <th>SS Name</th>
                              <th>Device Name</th>
                              <th>Feeder Name</th>
                              <th>Data Type</th>
                              <th>CDCS File Name</th>
                              <th>View Res</th>
                    </tr>
                  </thead>
                    <tbody v-if="importviewCDCStableJSON != ''">
                            <tr v-for="(row,index) in importviewCDCStableJSON" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{datewithTime(row.datetime)}}</td>
                              <td>{{row.regionname}}</td>
                              <td>{{row.circlename}}</td>
                              <td>{{row.ssname}}</td>
                              <td>{{row.dcuname}}</td>
                              <td>{{row.metername}}</td>
                              <td>{{row.datatype}}</td>
                              <td>{{row.filename}}</td>
                              <td><i class="fa fa-eye text-blue" style="cursor:pointer" @click="viewCDCSresponseMethod(index,row)"></i></td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="importviewCDCStableJSON == ''" style="text-align:center;width: 100%;">
                      <span>No records found</span>
                 </div>
              </div> 
              </div>
              </div>
              </div>
             </div>
            </div>

          </div>
        </li>
        </ul>
      </div>
    </div>
    <modal name="viewCDCSresponsePopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true"
        width="55%"  style="z-index:1111 !important"
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
              <button id="hide_rescloseBTN" type="button" class="btn btn-default" @click="viewCDCSresponsePopupClose" style="background:transparent;border:1px solid transparent">
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
                 <td style="text-align: left;">Region Name </td> <td>:</td> <td style="text-align:left"><b>{{cDCSResObject.regionname}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">SS Name  </td> <td>:</td> <td style="text-align:left"><b>{{cDCSResObject.ssname}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Data Type </td> <td>:</td> <td style="text-align:left"><b>{{cDCSResObject.datatype}}</b></td>
               </tr>
             </table>
               </div>
                <div class="col-lg-6">
                  <table style="width:275px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Circle Name </td> <td>:</td> <td style="text-align:left"><b>{{cDCSResObject.circlename}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Device Name </td> <td>:</td> <td style="text-align:left"><b>{{cDCSResObject.dcuname}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Feeder Name </td> <td>:</td> <td style="text-align:left"><b>{{cDCSResObject.metername}}</b></td>
               </tr>
             </table>
               </div>
            </div>
              <p style="text-decoration: underline;"><b>Upload CDCS Information</b></p>
              <div class="row" style="margin-top: -10px;">
                <div class="col-lg-6">
                  <table style="width:295px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Date Time </td> <td>:</td> <td style="text-align:left"><b>{{datewithTime(cDCSResObject.file_datetime)}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Firmware Version </td> <td>:</td> <td style="text-align:left"><b>{{cDCSResObject.firmware_version}}</b></td>
               </tr>
             </table>
                </div>
                <div class="col-lg-6">
<table style="width:390px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Meter Serial Num </td> <td>:</td> <td style="text-align:left"><b>{{cDCSResObject.meter_serial_num}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Manufacturer Name </td> <td>:</td> <td style="text-align:left"><b>{{cDCSResObject.manufacturer_name}}</b></td>
               </tr>
             </table>
                </div>
              </div>
                 <p></p>
              <span style="text-decoration: underline;"><b>Parameter Details:</b></span>
         
           <div class="row">
             <div class="col-lg-12 " >
               <div class="table-responsive" style="border:1px solid lightgray;height:450px">
              <table class="style table table-bordered" id="resCDCSTable">
                      <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th>S.No</th>
                      <th v-for="(paramterdetailItem,paramterindex) in importviewresCDCS_MSGJSON.column_details" v-bind:key="paramterindex">{{paramterdetailItem}}</th>
                    </tr>
                  </thead>
                  <tbody v-if="importviewresCDCS_MSGJSON != ''">
                    <tr v-for="(detailItem,index) in importviewresCDCS_MSGJSON.details" v-bind:key="index" >
                    <td>{{index+1}}</td>
                    <td v-for="(paramterdetailItem,paramterindex) in importviewresCDCS_MSGJSON.column_details" v-bind:key="paramterindex" >
                      <span v-if="paramterdetailItem == 'date_time'">{{datewithTime(detailItem[paramterdetailItem])}}</span>
                             <span v-else> {{detailItem[paramterdetailItem]}}</span>
                      </td>
                    </tr>
                  </tbody>
                    </table>
              <div v-if="importviewresCDCS_MSGJSON == ''" style="text-align:center;width: 100%;">
                 <span>No records found</span>
                 </div>
                    </div>
           </div>
             </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
            <a id="viewresclsBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="viewCDCSresponsePopupClose">Cancel</a>
          </div>
          </div>
          </modal>
    <modal name="uploadSummarypopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true"  style="z-index:1111 !important"
        width="38%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-9" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{uploadSummarypopupTitle}}</h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="uploadSummarypopupClsBTN" type="button" class="btn btn-default" @click="uploadSummarypopupClose" style="background:transparent;border:1px solid transparent">
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
                 <td style="text-align: left;">Region Name </td> <td>:</td> <td style="text-align:left"><b>{{fileimportRegionNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">SS Name  </td> <td>:</td> <td style="text-align:left"><b>{{fileimportSSNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Data Type </td> <td>:</td> <td style="text-align:left"><b>{{fileimportDataTypeTXT}}</b></td>
               </tr>
             </table>
               </div>
                <div class="col-lg-6">
                  <table style="width:275px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Circle Name </td> <td>:</td> <td style="text-align:left"><b>{{fileimportCircleNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Device Name </td> <td>:</td> <td style="text-align:left"><b>{{fileimportDeviceNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Feeder Name </td> <td>:</td> <td style="text-align:left"><b>{{fileimportMeterNameTXT.split('$$')[1]}}</b></td>
               </tr>
             </table>
               </div>
            </div>
              <p style="text-decoration: underline;"><b>Upload CDCS Information</b></p>
              <div class="row" style="margin-top: -10px;">
                <div class="col-lg-6">
                  <table style="width:275px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Date Time </td> <td>:</td> <td style="text-align:left"><b>{{xmlfileDatetimeTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Firmware Version </td> <td>:</td> <td style="text-align:left"><b>{{xmlfilFirmwareVersionTXT}}</b></td>
               </tr>
             </table>
                </div>
                <div class="col-lg-6">
<table style="width:275px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Meter Serial Num </td> <td>:</td> <td style="text-align:left"><b>{{xmlfileMetSerailNumTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Manufacturer Name </td> <td>:</td> <td style="text-align:left"><b>{{xmlfilManufacturernameTXT}}</b></td>
               </tr>
             </table>
                </div>
              </div>
             <div class="row">
              <div class="col-lg-12">
               <p> <b>Are you sure want to upload CDCS data file ?</b></p>
              </div></div>
              <p></p>
              <div class="row">
              <div class="col-lg-2">
                <p>Reason :</p>
              </div>
              <div class="col-lg-6 text-left">
                ​<textarea class="inputTEXTcss"  id="fileimportReasonTXT" v-model="fileimportReasonTXT" rows="10" cols="70" style="min-width: 100%;min-height: 150px;max-width: 100%;"></textarea>
              </div>
            </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
          <a id="uploadsaveBTN" type="button" class="btn bgBtn btnPadding"  style="color:#fff;background:green;" @click="fileimportSaveFunction">Upload</a>
          <a id="uploadclseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="uploadSummarypopupClose">Cancel</a>
          </div>
          </div>
          </modal>
  </section>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import CripNotice from 'crip-vue-notice'
import VueElementLoading from 'vue-element-loading'
export default {
  name: 'importFileXMLPAGE',
  components: {
    CripNotice,
    VueElementLoading,
  },
  data () {
    return {
      user_role: this.$session.get("userrole"),
      fileimportUserNameTXT: this.$session.get('username'),
      fileimportRoleTXT: this.$session.get('userrole'),
      loginuserObject: this.$session.get('userdetailsOBJ'),
      isLoading: false,
      fullPage: true,
      importfileemode: true,
      fileimportDataTypeTXT:'Choose Data Type',
      fileimportRegionNameTXT:"",
      fileimportCircleNameTXT:"",
      fileimportSSNameTXT:'',
      fileimportDeviceNameTXT:'',
      fileimportDeviceIDTXT:'',
      circleListArray:[],
      fileimportMeterIDTXT:'',
      fileimportMeterNameTXT:'Choose Feeder',
      deviceListArray:[],
      meterListArray:[],
      xmlfile:'',
      xmlfileName:'',
      uploadSummarypopupTitle:'Upload Information',
      uploadXMLJSONconfig:'',
      xmlfileDatetimeTXT:'',
      xmlfileMetSerailNumTXT:'',
      xmlfilFirmwareVersionTXT:'',
      xmlfilManufacturernameTXT:'',
      fileimportReasonTXT:'',
      viewCDCStableObject:'',
      cDCSResObject:'',
      importviewCDCStableJSON:'',
      importviewresCDCS_MSGJSON:'',
    }
  },
  created(){

  },
  mounted () {
    let innerMinHeight = window.innerHeight - 125 + "px";
    let innerMinHeight2 = window.innerHeight - 240 + "px";
    document.getElementById("ImportFilePANE").style.height = innerMinHeight;
    document.getElementById('importleftsidepane').style.height = innerMinHeight2;
    document.getElementById("importviewCDCStablePANE").style.height = innerMinHeight2;
    console.log('------loginuserObject------>>', JSON.stringify(this.loginuserObject));
    var loginuserObject = this.loginuserObject;
    this.fileimportRegionNameTXT = loginuserObject.region_name;
    this.fileimportCircleNameTXT = loginuserObject.circle_name;
    this.fileimportSSNameTXT = loginuserObject.ss_name;
    this.getSSNameLst(loginuserObject.ss_id);
    this.getmeterNameLst(loginuserObject.ss_id);
    setTimeout(() => {
      this.getssCDCSmethod();
    }, 200);
  },
  watch:{
  },
  methods: {
    getssCDCSmethod(){
       this.isLoading = true;
      var viewCDCSObject = {
        "region_name":this.fileimportRegionNameTXT,
        "circle_name":this.fileimportCircleNameTXT,
        "ss_name":this.fileimportSSNameTXT,
        "device_id":this.loginuserObject.ss_id,
        "device_name": this.fileimportDeviceNameTXT
        };
       console.log('import :', JSON.stringify(viewCDCSObject));
       axios
          .post(this.getCDCSAuditUseDCUURL, viewCDCSObject)
          .then(response => {
            var status = response.data.status;
            if (status.includes("found")) {
            this.importviewCDCStableJSON = response.data.details;
              this.isLoading = false;
            }else{
            this.importviewCDCStableJSON = "";
            this.isLoading = false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error.message);
          });
    },
    viewCDCSresponsePopupShow(){
      this.$modal.show('viewCDCSresponsePopup');
    },
    viewCDCSresponsePopupClose(){
      this.$modal.hide('viewCDCSresponsePopup');
    },
    viewCDCSresponseMethod(rowIndex,detailItems){
      this.cDCSResObject = detailItems;
       axios
          .post(this.getCDCSResURL, detailItems)
          .then(response => {
            var status = response.data.status;
            if (status.includes("found")) {
            this.viewCDCSresponsePopupShow();
            this.importviewresCDCS_MSGJSON = response.data;
            }else{
            this.importviewresCDCS_MSGJSON = "";
            this.cDCSResObject = "";
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error.message);
          });
    },
    uploadSummarypopupShow(){
        this.$modal.show('uploadSummarypopup');
    },
    uploadSummarypopupClose(){
        this.$modal.hide('uploadSummarypopup');
    },
    uploadsaveBTN(){

    },
    getRegionNameList(){
      this.regionListArray = [];
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.regionListArray = response.data.details;
        } else {
          this.regionListArray = [];
        }
      });
    },
    getCircleNameLst(regionidname){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       console.log('-------------------get---', getcicrleURL);
       this.circleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.fileimportCircleNameTXT = "Choose Circle";
          this.circleListArray = response.data.details;
        } else {
          this.fileimportCircleNameTXT = "Choose Circle";
          this.circleListArray = [];
        }
      });
    },
    getSSNameLst(dcuID){
       var getducInfoURL = this.getducInfoURL.replace("$$deviceID$$",dcuID);
       axios.get(getducInfoURL).then(response => {
        if (response.data.status == "found") {
          this.fileimportDeviceNameTXT = response.data.details[0].DCU_NAME;
          this.fileimportDeviceIDTXT = response.data.details[0].DCU_ID;
          this.deviceListArray = response.data.details;
        } else {
          this.fileimportDeviceNameTXT = "";
          this.fileimportDeviceIDTXT = "";
          this.deviceListArray = [];
        }
      });
    },
    getmeterNameLst(dcuid){
       var getSSMeterURL = this.getSSMeterURL.replace("$$dcuid$$",dcuid);
       this.meterListArray = [];
       axios.get(getSSMeterURL).then(response => {
        if (response.data.status == "found") {
          this.fileimportMeterNameTXT = "Choose Feeder";
          this.meterListArray = response.data.details;
        } else {
          this.fileimportMeterNameTXT = "Choose Feeder";
          this.meterListArray = [];
        }
      });
    },
    fileimportSaveFunction(){
      if(this.fileimportReasonTXT == ""){
        this.warningMessage("Please enter command reason and proceed further.");
        this.isLoading = false;
        return false;
      }
      if(this.fileimportReasonTXT.length < 20){
        this.warningMessage("Please enter minimum 20 characters.");
        this.isLoading = false;
        return false;
      }
      var fileimportDataTypeTXT= this.fileimportDataTypeTXT;
      var saveXMLInfo = {
        "user_name":this.fileimportUserNameTXT,
        "role": this.fileimportRoleTXT,
        "region_name": this.fileimportRegionNameTXT,
        "circle_name": this.fileimportCircleNameTXT,
        "ss_name":this.fileimportSSNameTXT,
        "device_id":this.fileimportDeviceIDTXT,
        "device_name":this.fileimportDeviceNameTXT,
        "data_type":this.fileimportDataTypeTXT,
        "meter_id":this.fileimportMeterNameTXT.split('$$')[0],
        "meter_name":this.fileimportMeterNameTXT.split('$$')[1],
        "reason": this.fileimportReasonTXT,
        "xml_file_name":this.xmlfileName,
        "firmware_version":this.xmlfilFirmwareVersionTXT,
        "file_datetime":this.xmlfileDatetimeTXT,
        "meter_serial_num":this.xmlfileMetSerailNumTXT,
        "manufacturer_name":this.xmlfilManufacturernameTXT,
        "xml_info":this.uploadXMLJSONconfig
      };
      console.log('saveXMLInfo ::: ', JSON.stringify(saveXMLInfo));
      this.isLoading = true;
      this.uploadSummarypopupClose();
      axios.post(this.saveFileExportURL, saveXMLInfo)
          .then(response => {
            var status = response.data.status;
            if (status == "success") {
             this.resetFileImportfieldscreen();
             this.isLoading =false;
             this.uploadSummarypopupClose();
             this.getssCDCSmethod();
                this.$fire({title: "Confirmation",text: fileimportDataTypeTXT+" Upload Successfully...",type: "success",timer: 3000
                }).then(r => {
                console.log(r.value);
            });
            } else {
              this.warningMessage(status);
              this.isLoading =false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
          });
    },
    resetFileImportfieldscreen(){
    var loginuserObject = this.loginuserObject;
    this.fileimportRegionNameTXT = loginuserObject.region_name;
    this.fileimportCircleNameTXT = loginuserObject.circle_name;
    this.fileimportSSNameTXT = loginuserObject.ss_name;
    this.getSSNameLst(loginuserObject.ss_id);
    this.getmeterNameLst(loginuserObject.ss_id);
    this.fileimportDataTypeTXT = 'Choose Data Type';
    this.fileimportMeterNameTXT = 'Choose Feeder';
    this.xmlfile = "";
    document.getElementById("xmlfile").value = "";
    },
    handleFile1UploadConfig(){
      if(this.fileimportDataTypeTXT == 'Choose Data Type' || this.fileimportDataTypeTXT == ''){
        this.warningMessage('Please choose any one data type');
        return false;
      }
      if(this.fileimportMeterNameTXT == 'Choose Feeder' || this.fileimportMeterNameTXT == ''){
        this.warningMessage('Please choose any one feeder name');
        return false;
      }
      //console.log(this.$refs.xmlfile.files[0].name+'------------xmlfile-------->', this.$refs.xmlfile.files[0]);
      //this.xmlfile = "";
      //document.getElementById("xmlfile").value = "";
      this.xmlfile = this.$refs.xmlfile.files[0];
      this.xmlfileName = this.$refs.xmlfile.files[0].name;
    },
    submitXMLFileConfig(){
       if(this.fileimportDataTypeTXT == 'Choose Data Type' || this.fileimportDataTypeTXT == ''){
        this.warningMessage('Please choose any one data type');
        return false;
      }
      if(this.fileimportMeterNameTXT == 'Choose Feeder' || this.fileimportMeterNameTXT == ''){
        this.warningMessage('Please choose any one feeder name');
        return false;
      }
      if (this.xmlfile == undefined || this.xmlfile == "") {
        this.warningMessage("Please upload the firmware xml data file and proceed further.");
        return false;
      }
       var _this = this;
      var read = new FileReader();
      //read.readAsArrayBuffer(this.xmlfile);
      read.readAsText(this.xmlfile);
      read.onloadend = function() {
      var xmlText = read.result;
        var uploadfileURL = window.location.protocol + "//" + window.location.host + "/" + "get/upload/xml";
        var config = { headers: {'Content-Type': 'text/xml'} };
        _this.isLoading = true;
        //console.log('xmlText :', JSON.stringify(xmlText));
        axios.post(uploadfileURL, xmlText, config)
          .then(response => {
            var status = response.data.status;
            if (status == "success") {
              if(response.data.data_type == _this.fileimportDataTypeTXT){
              _this.uploadXMLJSONconfig = response.data.details;
              console.log('_this.uploadXMLJSONconfig :', JSON.stringify(_this.uploadXMLJSONconfig));
              _this.xmlfileDatetimeTXT = _this.uploadXMLJSONconfig.cdf.utilitytype.d1.g2;
              _this.xmlfileMetSerailNumTXT = _this.uploadXMLJSONconfig.cdf.utilitytype.d1.g1;
              _this.xmlfilFirmwareVersionTXT = _this.uploadXMLJSONconfig.cdf.utilitytype.d1.g17;
              _this.xmlfilManufacturernameTXT = _this.uploadXMLJSONconfig.cdf.utilitytype.d1.g22['$'].NAME;
              _this.fileimportReasonTXT = "";
              _this.uploadSummarypopupShow();
              _this.isLoading = false;
              }else {
                _this.warningMessage('Data type is different and file is different.please choose and upload same thing');
                _this.isLoading = false;
                return false;
              }
            }else{
               _this.warningMessage(status);
                _this.isLoading = false;
                return false;
            }
          })
          .catch(function(error) {
            _this.isLoading = false;
            _this.warningMessage(error.message);
            console.log("error::" + error.message);
          });
      };
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
<style>
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

