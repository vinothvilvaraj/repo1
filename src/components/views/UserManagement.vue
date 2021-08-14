<template>
  <section class="content" id="usermanagementPANE">
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
               <span id="usermanagementMSGlbl" v-show="false"></span>
              <button id="usermanagementaddBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff" title="Add User" @click="usermanagementAddFunction()"  v-if="user_role != 'Operator'">
              <img src="static/img/images/add.png" /> Add User
            </button>
            </div>
          <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="usermanagementTablePANE" style="border:1px solid lightgray">
                <table
                  class="table table-bordered"
                  id="usermanagementTablePANEID"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th style="display:none">Employee ID</th>
                              <th>Role</th>
                              <th>User Name</th>
                              <th>Mail ID</th>
                              <th>Phone Number</th>
                              <th>Edit</th>
                              <th>Delete</th>
                              <th style="display:none">
                                <b>hiddenID</b>
                              </th>
                    </tr>
                  </thead>
                    <tbody v-if="usermanageTBLJSONS != ''">
                            <tr v-for="(row,index) in usermanageTBLJSONS" :key="row.id">
                              <td>{{index+1}}</td>
                              <td style="display:none">{{row.employee_id}}</td>
                              <td>{{row.role}}</td>
                              <td>{{row.user_name}}</td>
                              <td>{{row.mail_id}}</td>
                              <td>{{row.phone_num}}</td>
                              <td>
                                <input type="image"
                                  src="static/img/images/edit.png"
                                  v-if="user_role == 'System Admin' || user_role == 'Admin'"
                                  class="pointer editbtncss"
                                  title="Edit a User"
                                  :id="'editBtn'+(index+1)"
                                  @click="usermanagementEditFunction(row.id)"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                                <input type="image"
                                  v-else
                                  src="static/img/images/edit_0.png"
                                  class="disablepointer editbtncss"
                                  title="Edit a User"
                                  :id="'editBtn'+(index+1)"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                              </td>
                              <td>
                                <input type="image"
                                  src="static/img/images/delete.png"
                                  v-if="user_role == 'System Admin' || user_role == 'Admin'"
                                  class="pointer deletebtncss"
                                  title="Delete a User"
                                  :id="'deleteBtn'+(index+1)"
                                  style="background-color:transparent;border:1px solid transparent;"
                                  @click="userManageDeleteFunction(row.id)"
                                />
                                <input type="image"
                                  src="static/img/images/delete_0.png"
                                  v-else
                                  class="disablepointer deletebtncss"
                                  title="Delete a User"
                                  :id="'deleteBtn'+(index+1)"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                              </td>
                              <td style="display:none">{{row.id}}</td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="usermanageTBLJSONS == ''" style="text-align:center;width: 100%;">
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
     <modal name="usermangementpopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true"  style="z-index:1111 !important"
        width="40%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-6" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{usermangementpopupTitle}}</h4>
              </div>
              <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button id="hide_closeBTN" type="button" class="btn btn-default" @click="hideusermanagementpopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
           <div class="row" style="display:none;margin:0px;padding: 5px;">
                    <div class="col-lg-4">
                      Employee ID
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input
                        type="text"
                        @keypress="userIDblockSpecialChar($event)"
                        v-model="employeeId"
                        id="empIDTxtBox"
                        class="inputOuterCssText"
                        name="employeeId"
                        placeholder="Enter the Employee ID"
                        maxlength="32"
                      />
                    </div>
                  </div>

                  <div class="row" style="margin:0px;padding: 5px;">
                    <div class="col-lg-4">
                      Role
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <select id="userRoledropBox" v-model="userRole" class="inputOuterCssText">
                        <option value="System Admin">System Admin</option>
                        <option value="Admin" selected>Admin</option>
                        <option value="Operator">Operator</option>
                        <option value="Sub Station User">Sub Station User</option>
                      </select>
                    </div>
                  </div>
                  <div class="row" style="margin:0px;padding: 5px;" v-show="userRole == 'Sub Station User'">
                    <div class="col-lg-4">
                      Region Name
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                        <select class="inputOuterCssText" id="userRegionNameTXT" v-model="userRegionNameTXT" @change="getCircleNameLst(userRegionNameTXT)">
															  <option value='Choose Region' selected disabled>Choose Region</option>
                                <option v-for="(items,index) in regionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
															</select>
                    </div>
                  </div>
                   <div class="row" style="margin:0px;padding: 5px;" v-show="userRole == 'Sub Station User'">
                    <div class="col-lg-4">
                      Circle Name
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                        <select class="inputOuterCssText" id="userCircleNameTXT" v-model="userCircleNameTXT" @change="getSSNameLst(userCircleNameTXT)">
															  <option value='Choose Circle' selected disabled>Choose Circle</option>
                                <option v-for="(items,index) in circleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME">{{items.CIRCLE_NAME}}</option>
															</select>
                    </div>
                  </div>
                  <div class="row" style="margin:0px;padding: 5px;" v-show="userRole == 'Sub Station User'">
                    <div class="col-lg-4">
                      Sub Station Name
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                        <select class="inputOuterCssText" id="userSSNameTXT" v-model="userSSNameTXT">
															  <option value='Choose Sub Station' selected disabled>Choose Sub Station</option>
                                <option v-for="(items,index) in substationListArray" :key="index" :value="items.DCU_ID+'$$'+items.DCU_LOCATION">{{items.DCU_LOCATION}}</option>
															</select>
                    </div>
                  </div>
                  <div class="row" style="margin:0px;padding: 5px;">
                    <div class="col-lg-4">
                      User Name
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input
                        type="text"
                        v-model="userNameTxt"
                        @keypress="userIDblockSpecialChar($event)"
                        id="userNameTxtBox"
                        class="inputOuterCssText"
                        name="username"
                        
                      />
                       <br/>
                  <span v-if="usererrormsg.userNameTxt" class="errorMsg">{{usererrormsg.userNameTxt}}</span>
                    </div>
                  </div>
                  <div class="row" style="margin:0px;padding: 5px;">
                    <div class="col-lg-4">
                      Password
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input
                        class="inputOuterCssText"
                        v-model="userPasswordTXT"
                        :type="typevalue"
                        
                        id="userPasswordID"
                      />
                      <img id="passwdimg" :src="imgvalue" class="eyeimg" @click="showPassword" />
                        <br/>
                  <span v-if="usererrormsg.userPasswordTXT" class="errorMsg">{{usererrormsg.userPasswordTXT}}</span>
                    </div>
                  </div>
                  <div class="row" style="margin:0px;padding: 5px;">
                    <div class="col-lg-4">
                      Confirm Password
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input
                        class="inputOuterCssText"
                        :type="typevalue1"
                        v-model="userPasswordconfrimTXT"
                        id="confrimPasswordID"
                      />
                      <img id="cnpasswdimg" :src="imgvalue1" class="eyeimg" @click="showPassword1" />
                          <br/>
                  <span v-if="usererrormsg.userPasswordconfrimTXT" class="errorMsg">{{usererrormsg.userPasswordconfrimTXT}}</span>
                    </div>
                  </div>
                  <div class="row" style="margin:0px;padding: 5px;">
                    <div class="col-lg-4">
                      Mail ID
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input
                        id="mailIDTxtbox"
                        class="inputOuterCssText"
                        v-model="mailIDTxt"
                        type="text"
                      />
                        <br/>
                  <span v-if="usererrormsg.mailIDTxt" class="errorMsg">{{usererrormsg.mailIDTxt}}</span>
                    </div>
                  </div>

                  <div class="row" style="margin:0px;padding: 5px;">
                    <div class="col-lg-4">
                      Phone Number
                      <span style="color: red">*</span>:
                    </div>
                    <div class="col-lg-8">
                      <input
                        id="PhoneTxtbox"
                        class="inputOuterCssText"
                        type="text"
                        v-model="PhoneTxt"
                        
                        maxlength="10"
                        @keypress="isNumber($event)"
                      />
                         <br/>
                  <span v-if="usererrormsg.PhoneTxt" class="errorMsg">{{usererrormsg.PhoneTxt}}</span>
                    </div>
                  </div>

                  <div class="row" style="margin:0px;padding-top:20px;">
                    <div class="col-lg-4"></div>
                    <div class="col-lg-8"></div>
                  </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
            <a id="createusermanagementBTN" class="btn bgBtn btnPadding"  style="color:#fff" @click="usermanagementSaveFunction()">{{buttontext}}</a>
            <a id="usermanagementclseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="hideusermanagementpopup">Cancel</a>
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
      usermanagemode: true,
      typevalue: "password",
      typevalue1: "password",
      imgvalue: "static/img/images/Peye1.png",
      imgvalue1: "static/img/images/Peye1.png",
      buttontext: "",
      usermanageTBLJSONS: "",
      usermangementpopupTitle:'Add User Management',
      employeeId: "",
      userRole: "",
      userNameTxt: "",
      userPasswordTXT: "",
      userPasswordconfrimTXT: "",
      mailIDTxt: "",
      PhoneTxt: "",
      manageUpdateid: "",
      usererrormsg:[],
      regionListArray:[],
      circleListArray:[],
      substationListArray:[],
      userRegionNameTXT:'Choose Region',
      userCircleNameTXT:'Choose Circle',
      userSSNameTXT:'Choose Sub Station',
      userDeviceNameTXT:'',
      userMeterNameTXT:'',
      userselRegionidTXT:'',
      userselRegionnameTXT:'',
      userselCircleidTXT:'',
      userselCirclenameTXT:'',
      userselSubstationidTXT:'',
      userselSubstationnameTXT:'',
    }
  },
  created(){
     this.getUsermanageList();
     this.getRegionNameList();
  },
  mounted () {
    let innerMinHeight = window.innerHeight - 125 + 'px'
    document.getElementById("usermanagementPANE").style.height = innerMinHeight;
    document.getElementById("usermanagementTablePANE").style.height = window.innerHeight - 235 + "px";
    document.getElementById("usermanagementTablePANE").style.border =  "1px solid lightgray";
  },
  watch:{
    userNameTxt(value){
      this.userNameTxtpress();
    },
    userPasswordTXT (value){
      this.userPasswordTXTpress();
    },
    userPasswordconfrimTXT (value){
      this.userPasswordconfrimTXTpress();
    },
    mailIDTxt(value){
      this.mailIDTxtpress();
    },
    PhoneTxt(value){
      this.PhoneTxtpress();
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
    
    getUsermanageList() {
      this.isLoading = true;
      axios.get(this.userManagementlistUrl).then(response => {
        if (response.data.num_users != null || response.data.num_users != 0) {
          this.isLoading = false;
          this.usermanageTBLJSONS = response.data.user_details;
        } else {
          this.isLoading = false;
          this.usermanageTBLJSONS = "";
        }
      });
    },
    hideusermanagementpopup(){
       this.usererrormsg = [];
       document.getElementById("userNameTxtBox").style.border = "1px solid lightgray";
       document.getElementById("userPasswordID").style.border = "1px solid lightgray";
       document.getElementById("confrimPasswordID").style.border = "1px solid lightgray";
       document.getElementById("mailIDTxtbox").style.border = "1px solid lightgray";
       document.getElementById("PhoneTxtbox").style.border = "1px solid lightgray";
       this.$modal.hide('usermangementpopup');
    },
    userNameTxtpress(){
      if (this.userNameTxt == "") {
        this.usererrormsg['userNameTxt'] = "* Please enter the username.";
        document.getElementById("userNameTxtBox").style.border = "1px solid red";
        return false;
      }else {
        this.usererrormsg['userNameTxt'] = "";
        document.getElementById("userNameTxtBox").style.border = "1px solid lightgray";
      }
    },
    userPasswordTXTpress(){
      if (this.userPasswordTXT == "") {
        this.usererrormsg['userPasswordTXT'] = "* Please enter the password.";
        document.getElementById("userPasswordID").style.border = "1px solid red";
        return false;
      }else {
        this.usererrormsg['userPasswordTXT'] = "";
        document.getElementById("userPasswordID").style.border = "1px solid lightgray";
      }
    },
    userPasswordconfrimTXTpress(){
      if (this.userPasswordconfrimTXT == "") {
        this.usererrormsg['userPasswordconfrimTXT'] = "* Please enter the confirm password.";
        document.getElementById("confrimPasswordID").style.border = "1px solid red";
        return false;
      }else {
        this.usererrormsg['userPasswordconfrimTXT'] = "";
        document.getElementById("confrimPasswordID").style.border = "1px solid lightgray";
      }
    },
    mailIDTxtpress(){
      if (this.mailIDTxt == "") {
        this.usererrormsg['mailIDTxt'] = "* Please enter the confirm password.";
        document.getElementById("mailIDTxtbox").style.border = "1px solid red";
        return false;
      }else {
        this.usererrormsg['mailIDTxt'] = "";
        document.getElementById("mailIDTxtbox").style.border = "1px solid lightgray";
      }

       var boolMail = this.EmailAddressvalid(this.mailIDTxt);
      if (!boolMail) {
        this.usererrormsg['mailIDTxt'] = "* Invalid email address.";
        document.getElementById("mailIDTxtbox").style.border = "1px solid red";
        return false;
      }else{
        this.usererrormsg['mailIDTxt'] = "";
        document.getElementById("mailIDTxtbox").style.border = "1px solid lightgray";
      }

    },
    PhoneTxtpress(){
      if (this.PhoneTxt == "") {
        this.usererrormsg['PhoneTxt'] = "* Please enter the phone number.";
        document.getElementById("PhoneTxtbox").style.border = "1px solid red";
        return false;
      }else {
        this.usererrormsg['PhoneTxt'] = "";
        document.getElementById("PhoneTxtbox").style.border = "1px solid lightgray";
      }
    },
    usermanagementSaveFunction: function() {
      this.isLoading = true;
      //if (this.userNameTxt == "" && this.userPasswordTXT == "" && this.userPasswordconfrimTXT == "" && this.mailIDTxt == "" && this.PhoneTxt == "") {
      //  this.isLoading = false;
      //  document.getElementById("usermanagementMSGlbl").innerHTML = "Please enter all the input fields";
      //  this.warningMessage("Please enter all the input fields.");
      //  return false;
      //}
      if (this.employeeId == "") {
        this.isLoading = false;
        document.getElementById("usermanagementMSGlbl").innerHTML = "Please enter the Employee ID.";
        this.warningMessage("Please enter the Employee ID.");
        return false;
      }  if (this.userRole == "") {
        document.getElementById("usermanagementMSGlbl").innerHTML = "Please select any role.";
        this.warningMessage("Please select any role.");
        this.isLoading = false;
        return false;
      }  if (this.userRole == "Sub Station User") {
        if(this.userRegionNameTXT == "Choose Region"){
        this.warningMessage("Please choose any one region name.");
        this.isLoading = false;
        return false;
        }
        if(this.userCircleNameTXT == "Choose Circle"){
        this.warningMessage("Please choose any one circle name.");
        this.isLoading = false;
        return false;
        }
        if(this.userSSNameTXT == "Choose Sub Station"){
        this.warningMessage("Please choose any one sub station name.");
        this.isLoading = false;
        return false;
        }
      }
       if (this.userNameTxt == "") {
        document.getElementById("usermanagementMSGlbl").innerHTML = "Please enter the username.";
        this.warningMessage("Please enter the username.");
        this.isLoading = false;
        return false;
      }  if (this.userPasswordTXT == "" || this.userPasswordconfrimTXT == "") {
        document.getElementById("usermanagementMSGlbl").innerHTML = "Please enter the password.";
        this.warningMessage("Please enter the password.");
        this.isLoading = false;
        return false;
      }  if (this.userPasswordTXT != this.userPasswordconfrimTXT) {
        document.getElementById("usermanagementMSGlbl").innerHTML = "Those passwords didn't match. Try again.";
        this.warningMessage("Those passwords didn't match. Try again.");
        this.isLoading = false;
        return false;
      }  if (this.mailIDTxt == "") {
        document.getElementById("usermanagementMSGlbl").innerHTML = "Please enter the Mail ID.";
        this.warningMessage("Please enter the Mail ID.");
        this.isLoading = false;
        return false;
      }  if (this.PhoneTxt == "") {
        document.getElementById("usermanagementMSGlbl").innerHTML = "Please enter the phone number.";
        this.warningMessage("Please enter the phone number.");
        this.isLoading = false;
        return false;
      }
      var boolMail = this.EmailAddressvalid(this.mailIDTxt);
      if (!boolMail) {
        this.isLoading = false;
        document.getElementById("usermanagementMSGlbl").innerHTML = "Invalid email address, please enter the valid email address";
        this.warningMessage(
          "Invalid email address, please enter the valid email address"
        );
        return false;
      }

      if (this.userNameTxt.length > 33) {
        this.isLoading = false;
        document.getElementById("usermanagementMSGlbl").innerHTML = "Username too long - limit of 32 chars";
        this.warningMessage("Username too long - limit of 32 chars");
        return false;
      }
      if (this.userPasswordTXT.length >= 33) {
        this.isLoading = false;
        document.getElementById("usermanagementMSGlbl").innerHTML = "Password too long - limit of 32 chars";
        this.warningMessage("Password too long - limit of 32 chars");
        return false;
      }
      if (this.userPasswordconfrimTXT.length >= 33) {
        this.isLoading = false;
        document.getElementById("usermanagementMSGlbl").innerHTML = "Confrim Password too long - limit of 32 chars";
        this.warningMessage("Confrim Password too long - limit of 32 chars");
        return false;
      }
      if (this.PhoneTxt.length != 10) {
        this.isLoading = false;
        document.getElementById("usermanagementMSGlbl").innerHTML = "Please enter the 10 digit phone number";
        this.warningMessage("Please enter the 10 digit phone number");
        return false;
      }
      console.log('this.userSSNameTXT :', this.userSSNameTXT);
      if(this.userSSNameTXT.includes('$$')){
        this.userselSubstationidTXT = this.userSSNameTXT.split('$$')[0];
       this.userselSubstationnameTXT = this.userSSNameTXT.split('$$')[1];
      }else{
      this.userselSubstationidTXT = "";
       this.userselSubstationnameTXT = "";
      }

      if (this.usermanagemode) {
        for (var i = 0; i < this.usermanageTBLJSONS.length; i++) {
          var empID11 = this.usermanageTBLJSONS[i].employee_id;
          var user_name11 = this.usermanageTBLJSONS[i].user_name;
          //  var role11 = this.usermanageTBLJSONS[i].role;
          //var password11 = this.usermanageTBLJSONS[i].password;
          var mail_id11 = this.usermanageTBLJSONS[i].mail_id;
          var phone_no11 = this.usermanageTBLJSONS[i].phone_num;

          if (empID11 == this.employeeId) {
            this.isLoading = false;
            document.getElementById("usermanagementMSGlbl").innerHTML = "Employee ID is already used. Try another.";
            this.warningMessage("Employee ID is already used. Try another.");
            return false;
          }

          if (user_name11 == this.userNameTxt) {
            this.isLoading = false;
            document.getElementById("usermanagementMSGlbl").innerHTML = "User name is already used. Try another.";
            this.warningMessage("User name is already used. Try another.");
            return false;
          } else if (mail_id11 == this.mailIDTxt) {
            this.isLoading = false;
            document.getElementById("usermanagementMSGlbl").innerHTML = "Mail ID is already used. Try another.";
            this.warningMessage("Mail ID is already used. Try another.");
            return false;
          } else if (phone_no11 == this.PhoneTxt) {
            this.isLoading = false;
            document.getElementById("usermanagementMSGlbl").innerHTML = "Phone number is already used. Try another.";
            this.warningMessage("Phone number is already used. Try another.");
            return false;
          }
        }
       
        var createUsermanagement_JSON = {
          employee_id: "" + this.employeeId + "",
          login_user_name: "" + this.user_name + "",
          login_user_role: "" + this.user_role + "",
          role: "" + this.userRole + "",
          region_id: "" + this.userselRegionidTXT + "",
          region_name: "" + this.userselRegionnameTXT + "",
          circle_id: "" + this.userselCircleidTXT + "",
          circle_name: "" + this.userselCirclenameTXT + "",
          ss_id: "" + this.userselSubstationidTXT + "",
          ss_name: "" + this.userselSubstationnameTXT + "",
          user_name: "" + this.userNameTxt + "",
          password: "" + this.userPasswordTXT + "",
          mail_id: "" + this.mailIDTxt + "",
          phone_num: "" + this.PhoneTxt + ""
        };

        axios
          .post(this.createUserManagementUrl, createUsermanagement_JSON)
          .then(response => {
            var status = response.data.status;
            if (status.includes("New user")) {
              this.getUsermanageList();
              document.getElementById("usermanagementMSGlbl").innerHTML = "Employee Name: " + this.userNameTxt + " - created successfully";
              this.successMessage(
                "Employee Name: " + this.userNameTxt + " - created successfully"
              );
              this.$modal.hide('usermangementpopup');
              this.usererrormsg = [];
       document.getElementById("userNameTxtBox").style.border = "1px solid lightgray";
       document.getElementById("userPasswordID").style.border = "1px solid lightgray";
       document.getElementById("confrimPasswordID").style.border = "1px solid lightgray";
       document.getElementById("mailIDTxtbox").style.border = "1px solid lightgray";
       document.getElementById("PhoneTxtbox").style.border = "1px solid lightgray";
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error);
          });
      } else {
        for (var km = 0; km < this.usermanageTBLJSONS.length; km++) {
          var empid = this.usermanageTBLJSONS[km].id;

          if (empid != this.manageUpdateid) {
            var user_name22 = this.usermanageTBLJSONS[km].user_name;
            var mail_id22 = this.usermanageTBLJSONS[km].mail_id;
            var phone_no22 = this.usermanageTBLJSONS[km].phone_num;

            if (this.userNameTxt == user_name22) {
              document.getElementById("usermanagementMSGlbl").innerHTML = "User name is already used. Try another.";
              this.warningMessage("User name is already used. Try another.");
              this.isLoading = false;
              return false;
            } else if (mail_id22 == this.mailIDTxt) {
              this.isLoading = false;
              document.getElementById("usermanagementMSGlbl").innerHTML = "Mail ID is already used. Try another.";
              this.warningMessage("Mail ID is already used. Try another.");
              return false;
            } else if (phone_no22 == this.PhoneTxt) {
              this.isLoading = false;
              document.getElementById("usermanagementMSGlbl").innerHTML = "Phone number is already used. Try another.";
              this.warningMessage("Phone number is already used. Try another.");
              return false;
            }
          }
        }

        var editUsermanagement_JSON = {
          id: this.manageUpdateid,
          employee_id: "" + this.employeeId + "",
          login_user_name: "" + this.user_name + "",
          login_user_role: "" + this.user_role + "",
          role: "" + this.userRole + "",
          region_id: "" + this.userselRegionidTXT + "",
          region_name: "" + this.userselRegionnameTXT + "",
          circle_id: "" + this.userselCircleidTXT + "",
          circle_name: "" + this.userselCirclenameTXT + "",
          ss_id: "" + this.userselSubstationidTXT + "",
          ss_name: "" + this.userselSubstationnameTXT + "",
          user_name: "" + this.userNameTxt + "",
          password: "" + this.userPasswordTXT + "",
          mail_id: "" + this.mailIDTxt + "",
          phone_num: "" + this.PhoneTxt + ""
        };
        axios
          .post(this.updateUserManagementUrl, editUsermanagement_JSON)
          .then(response => {
            var status = response.data.status;
            if (status.includes("updated")) {
              this.getUsermanageList();
              document.getElementById("usermanagementMSGlbl").innerHTML = "Employee Name: " + this.userNameTxt + " - updated successfully";
              this.successMessage(
                "Employee Name: " + this.userNameTxt + " - updated successfully"
              );
              this.$modal.hide('usermangementpopup');
              this.usererrormsg = [];
       document.getElementById("userNameTxtBox").style.border = "1px solid lightgray";
       document.getElementById("userPasswordID").style.border = "1px solid lightgray";
       document.getElementById("confrimPasswordID").style.border = "1px solid lightgray";
       document.getElementById("mailIDTxtbox").style.border = "1px solid lightgray";
       document.getElementById("PhoneTxtbox").style.border = "1px solid lightgray";
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error);
          });
      }
      this.isLoading = false;
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
      this.userselRegionidTXT = regionid;
      this.userselRegionnameTXT = regionname;
      this.userCircleNameTXT = "Choose Circle";
      this.userSSNameTXT = "Choose Sub Station";
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.circleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.circleListArray = response.data.details;
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
       this.userSSNameTXT = "Choose Sub Station";
       var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleid);
       this.substationListArray = [];
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.substationListArray = response.data.details;
        } else {
          this.substationListArray = [];
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
          this.userMeterNameTXT = "Choose Feeder";
          this.meterListArray = response.data.details;
        } else {
          this.userMeterNameTXT = "Choose Feeder";
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
    resetusermanagementPopup: function() {
      this.employeeId = "mdas" + this.generateRandomString(4);
      this.userRole = "Admin";
      this.userNameTxt = "";
      this.userPasswordTXT = "";
      this.userPasswordconfrimTXT = "";
      this.mailIDTxt = "";
      this.PhoneTxt = "";
      this.userRegionNameTXT = "Choose Region";
      this.userCircleNameTXT = "Choose Circle";
      this.userSSNameTXT = "Choose Sub Station";
      this.typevalue = "password";
      this.typevalue1 = "password";
      this.imgvalue = "static/img/images/Peye1.png";
      this.imgvalue1 = "static/img/images/Peye1.png";
    },
    usermanagementEditFunction: function(userID) {
       this.$modal.show('usermangementpopup');
      this.isLoading = true;
      var employee_id;
      var role;
      var username;
      var password;
      var mail_id;
      var phone_no;
      this.usermangementpopupTitle = "Edit User Management";
      this.buttontext = "Update";
      this.typevalue = "password";
      this.typevalue1 = "password";
      this.imgvalue = "static/img/images/Peye1.png";
      this.imgvalue1 = "static/img/images/Peye1.png";
      this.usermanagemode = false;
      this.manageUpdateid = userID;
      for (var k = 0; k < this.usermanageTBLJSONS.length; k++) {
        var check_id = this.usermanageTBLJSONS[k].id;
        if (check_id == userID) {
          employee_id = this.usermanageTBLJSONS[k].employee_id;
          role = this.usermanageTBLJSONS[k].role;
          if(role == 'Sub Station User'){
          this.userRegionNameTXT = this.usermanageTBLJSONS[k].region_id +"$$"+ this.usermanageTBLJSONS[k].region_name;
          this.getCircleNameLst(this.userRegionNameTXT);
           this.userCircleNameTXT = this.usermanageTBLJSONS[k].circle_id +"$$"+ this.usermanageTBLJSONS[k].circle_name;
          this.getSSNameLst(this.userCircleNameTXT);
          this.userSSNameTXT = this.usermanageTBLJSONS[k].ss_id +"$$"+ this.usermanageTBLJSONS[k].ss_name;
        }else {
           this.userRegionNameTXT = "Choose Region";
          this.userCircleNameTXT = "Choose Circle";
          this.userSSNameTXT = "Choose Sub Station";
        }
          username = this.usermanageTBLJSONS[k].user_name;
          password = this.usermanageTBLJSONS[k].password;
          mail_id = this.usermanageTBLJSONS[k].mail_id;
          phone_no = this.usermanageTBLJSONS[k].phone_num;
        }
      }
      this.employeeId = employee_id;
      this.userRole = role;
      this.userNameTxt = username;
      this.userPasswordTXT = password;
      this.userPasswordconfrimTXT = password;
      this.mailIDTxt = mail_id;
      this.PhoneTxt = phone_no;
      this.isLoading = false;
       
      this.usererrormsg = [];
      
       document.getElementById("userNameTxtBox").style.border = "1px solid lightgray";
       document.getElementById("userPasswordID").style.border = "1px solid lightgray";
       document.getElementById("confrimPasswordID").style.border = "1px solid lightgray";
       document.getElementById("mailIDTxtbox").style.border = "1px solid lightgray";
       document.getElementById("PhoneTxtbox").style.border = "1px solid lightgray";
    },
    usermanagementAddFunction: function() {
      this.$modal.show('usermangementpopup');
      this.buttontext = "Save";
      this.resetusermanagementPopup();
      this.manageUpdateid = "";
      this.usermanagemode = true;
      this.usererrormsg = [];
       document.getElementById("userNameTxtBox").style.border = "1px solid lightgray";
       document.getElementById("userPasswordID").style.border = "1px solid lightgray";
       document.getElementById("confrimPasswordID").style.border = "1px solid lightgray";
       document.getElementById("mailIDTxtbox").style.border = "1px solid lightgray";
       document.getElementById("PhoneTxtbox").style.border = "1px solid lightgray";
    },
    userManageDeleteFunction: function(userid) {
      this.isLoading = true;
      var employee_id;
      var userNameTxt;
      for (var r = 0; r < this.usermanageTBLJSONS.length; r++) {
        var dpID_id = this.usermanageTBLJSONS[r].id;
        if (dpID_id == userid) {
          employee_id = this.usermanageTBLJSONS[r].employee_id;
          userNameTxt = this.usermanageTBLJSONS[r].user_name;
        }
      }
      var alertval = confirm("Do you want to delete in this user name - " + userNameTxt);
      if (alertval) {
        var deleteUrl1 = this.userManagementdeleteUrl.replace("$$empID$$", employee_id).replace("$$username$$",this.user_name).replace("$$userrole$$",this.user_role);
        axios.get(deleteUrl1).then(response => {
          if (response.data.status != null || response.data.status != "") {
            this.getUsermanageList();
            document.getElementById("usermanagementMSGlbl").innerHTML = userNameTxt + " deleted successfully";
            this.successMessage(userNameTxt + " deleted successfully");
          }
          this.isLoading = false;
        });
        return true;
      } else {
        this.isLoading = false;
        return false;
      }
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

