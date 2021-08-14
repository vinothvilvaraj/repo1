<template>
  <section class="content" id="notimanagementPANE">
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
               <span id="notificationmanagementMSGlbl" v-show="false"></span>
              <button id="notificationmanagementaddBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff" title="Add Notification" @click="notificationmanagementAddFunction()"  v-if="user_role != 'Operator'">
              <img src="static/img/images/add.png" /> Add Notification
            </button>
            </div>
          <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="notificationmanagementTablePANE" style="border:1px solid lightgray">
                <table
                  class="table table-bordered"
                  id="notificationmanagementTablePANEID"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Region</th>
                              <th>Circle</th>
                              <th>Sub Station</th>
                              <th>Category</th>
                              <th>User Name</th>
                              <th>Mail ID</th>
                              <th>Phone Number</th>
                              <th>SMS / EMAIL</th>
                              <th>Edit</th>
                              <th>Delete</th>
                    </tr>
                  </thead>
                    <tbody v-if="notificationManageTBLJSONS != ''">
                            <tr v-for="(row,index) in notificationManageTBLJSONS" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{row.region_name}}</td>
                              <td>{{row.circle_name}}</td>
                              <td>{{row.ss_name}}</td>
                              <td>{{row.category_name}}</td>
                              <td>{{row.user_name}}</td>
                              <td>{{row.mail_id}}</td>
                              <td>{{row.phone_num}}</td>
                              <td>{{row.sms_email}}</td>
                              <td>
                                <input type="image"
                                  src="static/img/images/edit.png"
                                  v-if="user_role == 'System Admin' || user_role == 'Admin'"
                                  class="pointer editbtncss"
                                  title="Edit a notification"
                                  :id="'notieditBtn'+(index+1)"
                                  @click="notificationmanagementEditFunction(row.id,index)"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                                <input type="image"
                                  v-else
                                  src="static/img/images/edit_0.png"
                                  class="disablepointer editbtncss"
                                  title="Edit a notification"
                                  :id="'notieditBtn'+(index+1)"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                              </td>
                              <td>
                                <input type="image"
                                  src="static/img/images/delete.png"
                                  v-if="user_role == 'System Admin' || user_role == 'Admin'"
                                  class="pointer deletebtncss"
                                  title="Delete a notification"
                                  :id="'notideleteBtn'+(index+1)"
                                  style="background-color:transparent;border:1px solid transparent;"
                                  @click="notificationmanagementDeleteFunction(row.id,index)"
                                />
                                <input type="image"
                                  src="static/img/images/delete_0.png"
                                  v-else
                                  class="disablepointer deletebtncss"
                                  title="Delete a notification"
                                  :id="'notideleteBtn'+(index+1)"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                              </td>
                              <td style="display:none">{{row.id}}</td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="notificationManageTBLJSONS == ''" style="text-align:center;width: 100%;">
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
     <modal name="notificationMangementpopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true"  style="z-index:1111 !important"
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
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{notificationmangementpopupTitle}}</h4>
              </div>
              <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button id="hide_closeBTN" type="button" class="btn btn-default" @click="hideNotificationmanagementpopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
                  <div class="row" >
                    <div class="col-lg-4">
                     Notification Category
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <select id="notificationCategoryTXT" v-model="notificationCategoryTXT" class="inputOuterCssText">
                        <option value="Choose Category">Choose Category</option>
                        <option value="All">All</option>
                        <option value="Configuration">Configuration</option>
                        <option value="Threshold">Threshold</option>
                      </select>
                    </div>
                  </div>
                  <p></p>
                  <div class="row" >
                    <div class="col-lg-4">
                      Region Name
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                        <select class="inputOuterCssText" id="notificationRegionTXT" v-model="notificationRegionTXT" @change="getCircleNameLst(notificationRegionTXT)">
															  <option value='Choose Region' selected disabled>Choose Region</option>
                                <option v-for="(items,index) in notificationRegionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
															</select>
                    </div>
                  </div>
                  <p></p>
                   <div class="row" >
                    <div class="col-lg-4">
                      Circle Name
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                        <select class="inputOuterCssText" id="notificationCircleTXT" v-model="notificationCircleTXT" @change="getSSNameLst(notificationCircleTXT)">
															  <option value='Choose Circle' selected disabled>Choose Circle</option>
                                <option v-for="(items,index) in notificationCircleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME">{{items.CIRCLE_NAME}}</option>
															</select>
                    </div>
                  </div>
                  <p></p>
                  <div class="row" >
                    <div class="col-lg-4">
                      Sub Station Name
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                        <select class="inputOuterCssText" id="notificationSSTXT" v-model="notificationSSTXT">
															  <option value='Choose Sub Station' selected disabled>Choose Sub Station</option>
                                <option v-for="(items,index) in notificationSubstationListArray" :key="index" :value="items.SS_ID+'$$'+items.SS_NAME">{{items.SS_NAME}}</option>
															</select>
                    </div>
                  </div>
                  <p></p>
                  <div class="row" >
                    <div class="col-lg-4">
                      User Name
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <select class="inputOuterCssText" id="notificationUserNameTxt" v-model="notificationUserNameTxt" @change="getUserDetailsMethod(notificationUserNameTxt)">
															  <option value='Choose User Name' selected disabled>User Name</option>
                                <option v-for="(items,index) in notificationUserNameListArray" :key="index" :value="items.id+'$$'+items.user_name">{{items.user_name}}</option>
															</select>
                         </div>
                  </div>
                  <p></p>
                  <div class="row" >
                    <div class="col-lg-4">
                      User Role
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input id="notificationRoleTxt" class="inputOuterCssText" v-model="notificationRoleTxt" type="text" disabled/>
                         </div>
                  </div>
                  <p></p>
                  
                  <div class="row" >
                    <div class="col-lg-4">
                      Mail ID
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input id="notificationMailIDTxt" class="inputOuterCssText" v-model="notificationMailIDTxt" type="text" disabled/>
                    </div>
                  </div>
                  <p></p>
                  <div class="row" >
                    <div class="col-lg-4">
                      Phone Number
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input id="notificationPhoneTxt" class="inputOuterCssText" type="text" disabled v-model="notificationPhoneTxt" maxlength="10" @keypress="isNumber($event)"/>
                    </div>
                  </div>
                  <p></p>
                  <div class="row" >
                    <div class="col-lg-4">
                       SMS / EMAIL
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                    <div> <input type = "radio" name = "smsmailradios" id = "smsradio" value = "SMS"  v-model="smsmailradiosTXT"/>
                          <label for = "smsradio">SMS</label>
                          <input type = "radio"  name = "smsmailradios"  id = "mailradio" checked = "checked" value = "Mail"  v-model="smsmailradiosTXT"/>
                          <label for = "mailradio">Mail</label>
                           <input type = "radio"  name = "smsmailradios"  id = "bothradio" checked = "checked" value = "Both"  v-model="smsmailradiosTXT"/>
                          <label for = "bothradio">Both</label>
                      </div>
                    </div>
                  </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
            <a id="createnotificationmanagementBTN" class="btn bgBtn btnPadding"  style="color:#fff" @click="notificationManagementSaveFunction()">{{notificationButtonText}}</a>
            <a id="notificationmanagementclseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="hideNotificationmanagementpopup">Cancel</a>
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
  name: 'notificationconfigPAGE',
  components: {
    CripNotice,
    VueElementLoading
  },
  data () {
    return {
      user_name: this.$session.get('username'),
      user_role: this.$session.get('userrole'),
      isLoading: false,
      fullPage: true,
      notificationButtonText: "Save",
      notificationManageTBLJSONS: "",
      notificationmangementpopupTitle:'Add Notification',
      notificationCategoryTXT:'Choose Category',
      notificationRegionTXT: "Choose Region",
      notificationCircleTXT: "Choose Circle",
      notificationSSTXT: "Choose Sub Station",
      smsmailradiosTXT:'Mail',
      notificationRoleTxt: "",
      notificationUserNameTxt: "",
      notificationMailIDTxt: "",
      notificationPhoneTxt: "",
      notificationUpdateid: "",
      notificationRegionListArray:[],
      notificationCircleListArray:[],
      notificationSubstationListArray:[],
    }
  },
  created(){
  },
  mounted () {
    let innerMinHeight = window.innerHeight - 125 + 'px'
    document.getElementById("notimanagementPANE").style.height = innerMinHeight;
    document.getElementById("notificationmanagementTablePANE").style.height = window.innerHeight - 235 + "px";
    document.getElementById("notificationmanagementTablePANE").style.border =  "1px solid lightgray";
    this.getNotificationManageList();
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
     getRegionNameList(){
      this.notificationRegionListArray = [];
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          console.log('======getRegionNameList=====>');
          this.notificationRegionListArray = response.data.details;
        } else {
          this.notificationRegionListArray = [];
        }
      });
    },
    getCircleNameLst(regionidname){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
      this.notificationCircleTXT = "Choose Circle";
      this.notificationSSTXT = "Choose Sub Station";
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.notificationCircleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          console.log('======getCircleNameLst=====>');
          this.notificationCircleListArray = response.data.details;
        } else {
          this.notificationCircleTXT = "Choose Circle";
          this.notificationSSTXT = "Choose Sub Station";
          this.notificationCircleListArray = [];
        }
      });
    },
     getSSNameLst(circleidName){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
       this.notificationSSTXT = "Choose Sub Station";
       var getcicrleSSURL = this.getSSURL.replace("$$circleid$$",circleid);
       this.notificationSubstationListArray = [];
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          console.log('======getSSNameLst=====>');
          this.notificationSubstationListArray = response.data.details;
        } else {
          this.notificationSSTXT = "Choose Sub Station";
          this.notificationSubstationListArray = [];
        }
      });
    },
    getUSerROLENameLst(){
       this.notificationUserNameTxt = "Choose User Name";
       this.notificationUserNameListArray = [];
       axios.get(this.userManagementlistUrl).then(response => {
        if (response.data.status == "users found") {
          console.log('======getUSerROLENameLst=====>');
          this.notificationUserNameListArray = response.data.user_details;
        } else {
          this.notificationUserNameTxt = "Choose User Name";
          this.notificationUserNameListArray = [];
        }
      });
    },
    getUserDetailsMethod(userNameTxt){
      var userid = userNameTxt.split("$$")[0];
      var username = userNameTxt.split("$$")[1];
      for(var tt=0; tt<this.notificationUserNameListArray.length;tt++){
        if(this.notificationUserNameListArray[tt].id == userid && this.notificationUserNameListArray[tt].user_name == username){
          this.notificationRoleTxt  = this.notificationUserNameListArray[tt].role;
          this.notificationMailIDTxt  = this.notificationUserNameListArray[tt].mail_id;
          this.notificationPhoneTxt  = this.notificationUserNameListArray[tt].phone_num;
        }
      }
    },
    notificationmanagementAddFunction(){
      this.showNotificationmanagementpopup();
      this.getRegionNameList();
      this.getUSerROLENameLst();
      this.resetNoftiPopup();
    },
    resetNoftiPopup(){
      this.getUSerROLENameLst();
      this.notificationmangementpopupTitle = "Add Notification";
      this.notificationCategoryTXT = "Choose Category";
      this.notificationUpdateid = "";
      this.notificationRegionTXT = "Choose Region",
      this.notificationCircleTXT = "Choose Circle",
      this.notificationSSTXT = "Choose Sub Station",
      this.smsmailradiosTXT = "Mail";
      this.notificationRoleTxt = "";
      this.notificationUserNameTxt = "Choose User Name";
      this.notificationMailIDTxt = "";
      this.notificationPhoneTxt = "";
      this.notificationRegionListArray = [];
      this.notificationCircleListArray = [];
      this.notificationSubstationListArray = [];
      this.notificationUserNameListArray = [];
    },
    notificationmanagementEditFunction(id,rowIndex){
      this.showNotificationmanagementpopup();
       this.getRegionNameList();
      this.getUSerROLENameLst();
      this.notificationmangementpopupTitle = "Update Notification";
      this.notificationButtonText = "Update";
      this.notificationUpdateid = id;
      this.notificationCategoryTXT = this.notificationManageTBLJSONS[rowIndex].category_name;
      this.notificationRegionTXT = this.notificationManageTBLJSONS[rowIndex].region_id+"$$"+this.notificationManageTBLJSONS[rowIndex].region_name;
      this.getEDITCircleNameLst(this.notificationRegionTXT,rowIndex);
      this.notificationUserNameTxt = this.notificationManageTBLJSONS[rowIndex].user_id+"$$"+this.notificationManageTBLJSONS[rowIndex].user_name;
      this.notificationRoleTxt = this.notificationManageTBLJSONS[rowIndex].user_role;
      this.notificationMailIDTxt  = this.notificationManageTBLJSONS[rowIndex].mail_id;
      this.notificationPhoneTxt = this.notificationManageTBLJSONS[rowIndex].phone_num;
      this.smsmailradiosTXT = this.notificationManageTBLJSONS[rowIndex].sms_email;
    },
    getEDITCircleNameLst(regionidname,rowIndex){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.notificationCircleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.notificationCircleListArray = response.data.details;
          this.notificationCircleTXT = this.notificationManageTBLJSONS[rowIndex].circle_id+"$$"+this.notificationManageTBLJSONS[rowIndex].circle_name;
          this.getEDITSSNameLst(this.notificationCircleTXT,rowIndex);
       } else {
          this.notificationCircleListArray = [];
        }
      });
    },
     getEDITSSNameLst(circleidName,rowIndex){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
       var getcicrleSSURL = this.getSSURL.replace("$$circleid$$",circleid);
       this.notificationSubstationListArray = [];
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.notificationSubstationListArray = response.data.details;
          this.notificationSSTXT = this.notificationManageTBLJSONS[rowIndex].ss_id+"$$"+this.notificationManageTBLJSONS[rowIndex].ss_name;
        } else {
          this.notificationSSTXT = "Choose Sub Station";
          this.notificationSubstationListArray = [];
        }
      });
    },
    notificationmanagementDeleteFunction(id,rowIndex){
      this.notificationUpdateid = id;
      var alertval = confirm("Do you want to delete");
      if (alertval) {
        this.isLoading = true;
        var deleteUrl1 = this.notiDELETEManagementlistUrl.replace("$$nofid$$", this.notificationUpdateid).replace("$$username$$", this.user_name).replace("$$userrole$$", this.user_role);
        axios.get(deleteUrl1).then(response => {
          if (response.data.status != null || response.data.status.includes("deleted successfully")) {
            this.successMessage("Deleted successfully");
            this.getNotificationManageList();
            this.isLoading = false;
            return true;
          }else{
            this.isLoading = false;
            this.warningMessage(response.data.status);
            this.isLoading = false;
            return true;
          }
        });
      } else {
        this.isLoading = false;
        return false;
      }
    },
    getNotificationManageList(){
      this.isLoading = true;
      axios.get(this.notiManagementlistUrl).then(response => {
        if (response.data.num_noti != null || response.data.num_noti != 0) {
          this.isLoading = false;
          this.notificationManageTBLJSONS = response.data.noti_details;
        } else {
          this.isLoading = false;
          this.notificationManageTBLJSONS = "";
        }
      });
    },
    notificationManagementSaveFunction(){
      if(this.notificationCategoryTXT == "Choose Category"){
        this.warningMessage("Choose any one category");
        return false;
      }
      if(this.notificationRegionTXT == "Choose Region"){
        this.warningMessage("Choose any one region name");
        return false;
      }
      if(this.notificationCircleTXT == "Choose Circle"){
        this.warningMessage("Choose any one circle name");
        return false;
      }
      if(this.notificationSSTXT == "Choose Sub Station"){
        this.warningMessage("Choose any one sub station name");
        return false;
      }
      if(this.notificationUserNameTxt == "Choose User Name"){
        this.warningMessage("Choose any one user name");
        return false;
      }
      if(this.notificationRoleTxt == ""){
        this.warningMessage("please enter user role");
        return false;
      }
       if(this.notificationMailIDTxt == ""){
        this.warningMessage("please enter user mail id");
        return false;
      }
      if(this.notificationPhoneTxt == ""){
        this.warningMessage("please enter user phone number");
        return false;
      }
      this.isLoading = true;
        if(this.notificationButtonText == "Save"){
          var notfiNewJSON = {
            login_user_name:this.user_name,
            login_user_role:this.user_role,
            region_id:this.notificationRegionTXT.split('$$')[0],
            region_name:this.notificationRegionTXT.split('$$')[1],
            circle_id:this.notificationCircleTXT.split('$$')[0],
            circle_name:this.notificationCircleTXT.split('$$')[1],
            ss_id:this.notificationSSTXT.split('$$')[0],
            ss_name:this.notificationSSTXT.split('$$')[1],
            category_name:this.notificationCategoryTXT,
            user_id:this.notificationUserNameTxt.split('$$')[0],
            user_name:this.notificationUserNameTxt.split('$$')[1],
            user_role:this.notificationRoleTxt,
            mail_id:this.notificationMailIDTxt,
            phone_num:this.notificationPhoneTxt,
            sms_email:this.smsmailradiosTXT
          };
          axios
          .post(this.notiADDManagementlistUrl, notfiNewJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "Success") {
            this.hideNotificationmanagementpopup();
            this.successMessage("Added Successfully...");
            this.getNotificationManageList();
            this.isLoading = false;
            return false;
            }else{
              this.warningMessage(status);
               this.isLoading = true;
               return false;
            }
          })
          .catch(function(error) {
            this.errorMessage(error.message);
            console.log("error::" + error);
          });
        }else{
           this.isLoading = true;
           var notfiEDTJSON = {
            noti_id:this.notificationUpdateid,
            login_user_name:this.user_name,
            login_user_role:this.user_role,
            region_id:this.notificationRegionTXT.split('$$')[0],
            region_name:this.notificationRegionTXT.split('$$')[1],
            circle_id:this.notificationCircleTXT.split('$$')[0],
            circle_name:this.notificationCircleTXT.split('$$')[1],
            ss_id:this.notificationSSTXT.split('$$')[0],
            ss_name:this.notificationSSTXT.split('$$')[1],
            category_name:this.notificationCategoryTXT,
            user_id:this.notificationUserNameTxt.split('$$')[0],
            user_name:this.notificationUserNameTxt.split('$$')[1],
            user_role:this.notificationRoleTxt,
            mail_id:this.notificationMailIDTxt,
            phone_num:this.notificationMailIDTxt,
            sms_email:this.smsmailradiosTXT
          };
          axios
          .post(this.notiUPDATEManagementlistUrl, notfiEDTJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "updated") {
            this.hideNotificationmanagementpopup();
            this.successMessage("Updated Successfully...");
            this.getNotificationManageList();
             this.isLoading = false;
            return false;
            }else{
              this.warningMessage(status);
               this.isLoading = true;
               return false;
            }
          })
          .catch(function(error) {
            this.errorMessage(error.message);
            console.log("error::" + error);
          });
        }
    },
    showNotificationmanagementpopup(){
      this.$modal.show('notificationMangementpopup');
    },
    hideNotificationmanagementpopup(){
      this.$modal.hide('notificationMangementpopup');
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
    notificationIDblockSpecialChar(e) {
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

