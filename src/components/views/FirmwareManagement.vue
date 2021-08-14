<template>
  <section class="content" id="firmwaremanagementPANE">
    <vue-element-loading :active="isLoading" spinner="line-wave" color="#000" :is-full-screen="true"/>
    <div class="row">
      <div class="col-lg-12">
       <ul class="timeline">
        <li>
          <i class="fa fa-comments-o bg-yellow"></i>
          <div class="timeline-item">
            <div class="timeline-body">
         <div class="row">
            <div class="col-md-6 order-md-3">
            </div>
            <div class="col-md-6 order-md-3 text-right">
              <button id="firmwaremanagementaddBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff" title="Add User" @click="firmwaremanagementAddFunction()"  v-if="user_role != 'Operator'">
              <img src="static/img/images/add.png" /> Add Firmware
            </button>
            </div>
          <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="firmwaremanagementTablePANE" style="border:1px solid lightgray">
                <table
                  class="table table-bordered"
                  id="firmwaremanagementTablePANEID"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Date & Time</th>
                              <th>User Role</th>
                              <th>User Name</th>
                              <th>Firmware File Name</th>
                              <th>Firmware Version</th>
                              <th>Delete</th>
                    </tr>
                  </thead>
                    <tbody v-if="firmwaremanageTBLJSONS != ''">
                            <tr v-for="(row,index) in firmwaremanageTBLJSONS" :key="row.S_NO">
                              <td>{{index+1}}</td>
                              <td>{{datewithTime(row.DATE_TIME)}}</td>
                              <td>{{row.ROLE}}</td>
                              <td>{{row.USER_NAME}}</td>
                              <td>{{row.FW_FILE_NAME}}</td>
                              <td>{{row.VERSION_NAME}}</td>
                              <td>
                                <input type="image"
                                  src="static/img/images/delete.png"
                                  v-if="user_role == 'System Admin' || user_role == 'Admin'"
                                  class="pointer deletebtncss"
                                  title="Delete a Firmware"
                                  :id="'firmwaredeleteBtn'+(index+1)"
                                  style="background-color:transparent;border:1px solid transparent;"
                                  @click="showdeleteConfrimationPopup(row.S_NO,row.FW_FILE_NAME,row.VERSION_NAME)"
                                />
                                <input type="image"
                                  src="static/img/images/delete_0.png"
                                  v-else
                                  class="disablepointer deletebtncss"
                                  title="Delete a Firmware"
                                  :id="'firmwaredeleteBtn'+(index+1)"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                              </td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="firmwaremanageTBLJSONS == ''" style="text-align:center;width: 100%;">
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
     <modal id="firmwaremangementpopup" name="firmwaremangementpopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true"  style="z-index:111 !important"
        width="35%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-6" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{firmwaremangementpopupTitle}}</h4>
              </div>
              <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button id="hide_hidefirmwaremangementpopup" type="button" class="btn btn-default" @click="hidefirmwaremangementpopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
        
                  <div class="row" style="margin:0px;padding: 5px;" v-show="false">
                    <div class="col-lg-4">
                      Firmware Version
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input
                        type="text"
                        v-model="firmwareVersionNameTxt"
                        id="firmwareVersionNameTxt"
                        class="inputOuterCssText"
                        name="firmware Name"
                      />
                    </div>
                  </div>

                  <div class="row" style="margin:0px;padding:5px;">
                    <div class="col-lg-4">Upload Firmware
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input type="file" id="file" ref="file" accept=".bin"  v-on:change="handleFileUpload()" />
                      </div>
                  </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
            <a id="createfirmwaremanagementBTN" class="btn bgBtn btnPadding"  style="color:#fff" @click="firmwaremanagementSaveFunction()">Submit</a>
            <a id="hidefirmwaremangementpopup2" type="button" class="btn btn-default waves-effect btnPadding" @click="hidefirmwaremangementpopup">Cancel</a>
          </div>
          </div>
          </modal>

           <modal id="deletefirmwareConfrimationPopup" name="deletefirmwareConfrimationPopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true"  style="z-index:1111 !important"
        width="30%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-9" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"><i class="fa fa-warning" style="color:#629949"></i> Confirmation </h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="closedeletefirmwareConfrimationBTN1" type="button" class="btn btn-default" @click="closedeletefirmwareConfrimationPopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div>
             <div class="row">
              <div class="col-lg-12">
                <h4 style="margin-top: 0px;">{{deleteFWPasswordCONFRIMTXT}}</h4>
              </div>
            </div>
            <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Login Password :</p>
              </div>
              <div class="col-lg-8">
                     <input id="deleteFWPassword" type="password" placeholder="Please enter password" class="outerInputCss" v-model="deleteFWPasswordTXT"/>
              </div>
            </div>
            </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
            <a id="confrimationdeleteApplyBtn" class="btn bgBtn btnPadding"  style="color:#fff;background:green;" @click="firmwareManageDeleteFunction()">Apply</a>
          <a id="closedeletefirmwareConfrimationBTN2" type="button" class="btn btn-default waves-effect btnPadding" @click="closedeletefirmwareConfrimationPopup">Cancel</a>
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
  name: 'userconfigPAGE',
  components: {
    CripNotice,
    VueElementLoading
  },
  data () {
    return {
      user_name: this.$session.get("username"),
      user_role: this.$session.get("userrole"),
      isLoading: false,
      fullPage: true,
      firmwaremanagemode: true,
      firmwaremanageTBLJSONS: "",
      firmwaremangementpopupTitle:'Add Firmware',
      firmwareVersionNameTxt: "",
      deleteFWPasswordCONFRIMTXT:'',
      deleteFWPasswordTXT:"",
      file:'',
      fwID:'',
      fwFileName:'',
      fwVERName:''
    }
  },
  created(){
     this.getFirmwaremanageList();
  },
  mounted () {
    let innerMinHeight = window.innerHeight - 125 + 'px'
    document.getElementById("firmwaremanagementPANE").style.height = innerMinHeight;
    document.getElementById("firmwaremanagementTablePANE").style.height = window.innerHeight - 235 + "px";
    document.getElementById("firmwaremanagementTablePANE").style.border =  "1px solid lightgray";
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
    getFirmwaremanageList() {
      this.isLoading = true;
      axios.get(this.firmwareListURL).then(response => {
        if (response.data.status == "firmware found") {
          this.isLoading = false;
          this.firmwaremanageTBLJSONS = response.data.fw_details;
        } else {
          this.isLoading = false;
          this.firmwaremanageTBLJSONS = "";
        }
      });
    },
    firmwaremanagementAddFunction(){
      this.file = "";
       this.$modal.show('firmwaremangementpopup');
    },
    hidefirmwaremangementpopup(){
       this.$modal.hide('firmwaremangementpopup');
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  firmwaremanagementSaveFunction() {
    this.isLoading = true;
      if (this.file == undefined || this.file == "") {
        this.warningMessage("Please upload the bin file and proceed further.");
        this.isLoading = false;
        return false;
      }
      if(this.firmwaremanageTBLJSONS.length !=0){
      for(var tt=0;tt<this.firmwaremanageTBLJSONS.length;tt++){
        if(this.firmwaremanageTBLJSONS[tt].FW_FILE_NAME.toLowerCase() == this.file.name.toLowerCase()){
          this.warningMessage("file name already there, please change bin file name and proceed further.");
          this.isLoading = false;
          return false;
        }
      }
      }
      const formData = new FormData();
      formData.append("file", this.file);
      axios
        .post(this.firmwareUploadFileURL, formData)
        .then(response => {
          console.log(response);
          if (response.data.status == "upload successfully") {
                 this.notificationMessage("Confirmation", "file upload successfully", "success", 4000);
                 var splitNme = this.file.name.split(".bin")[0]
                 this.onUploadFileData(this.user_name,this.user_role,this.file.name,splitNme);
                 this.hidefirmwaremangementpopup();
                 this.getFirmwaremanageList();
                 this.isLoading = false;
                 return false;
              }else{
                 this.notificationMessage("Confirmation", response.data.status, "error", 4000);
                 this.isLoading = false;
                 return false;
              }
        })
        .catch(err => {
          console.log(err);
        });
  },
    onUploadFileData(user_name,user_role,file_name,ver_name) {
      this.isLoading = true;
       var addfrimwareResJson = {
          "user_name":user_name,
          "user_role":user_role,
          "file_name":file_name,
          "ver_name":ver_name
       };
       // console.log('on UploadFile Data delete json:', JSON.stringify(addfrimwareResJson));
        axios
          .post(this.addfirmwareInfoURL, addfrimwareResJson)
          .then(response => {
            var status = response.data.status;
            if (status == "added successfully") {
               this.isLoading = false;
               return false;
            }else{
               this.isLoading = false;
               return false;
            }
            });
    },
    closedeletefirmwareConfrimationPopup(){
       this.fwID = "";
       this.fwFileName = "";
       this.fwVERName = "";
       this.deleteFWPasswordCONFRIMTXT = "";
       this.$modal.hide('deletefirmwareConfrimationPopup');
    },
     showdeleteConfrimationPopup(id,fileName,verName){
       this.fwID = id;
       this.fwFileName = fileName;
       this.fwVERName = verName;
       this.deleteFWPasswordTXT = "";
       this.deleteFWPasswordCONFRIMTXT = "Do you want to delete this firmware ?";
       this.$modal.show('deletefirmwareConfrimationPopup');
    },
    firmwareManageDeleteFunction(){
       this.isLoading = true;
      if(this.deleteFWPasswordTXT == ""){
        this.warningMessage("Please enter login password.");
        this.isLoading  = false;
        return false
      }
       var viewfrimwareResJson = {
          "id":this.fwID,
          "file_name":this.fwFileName,
          "ver_name":this.fwVERName,
          "user_name":this.user_name,
          "user_role":this.user_role,
          "password":this.deleteFWPasswordTXT
       };
       // console.log('fw delete json:', viewfrimwareResJson);
        axios
          .post(this.firmwareUploadDeleteURL, viewfrimwareResJson)
          .then(response => {
            var status = response.data.status;
            if (status == "delete successfully") {
               this.getFirmwaremanageList();
               this.closedeletefirmwareConfrimationPopup();
               this.notificationMessage("Confirmation", status, "success", 4000);
               this.isLoading = false;
               return false;
            }else{
               this.notificationMessage("Notification", status, "warning", 4000);
               //this.closedeletefirmwareConfrimationPopup();
               this.isLoading = false;
               return false;
            }
            });
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
</style>

