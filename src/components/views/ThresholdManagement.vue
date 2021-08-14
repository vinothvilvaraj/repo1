<template>
  <section class="content" id="thresholdmanagementPANE">
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
              <span>Category :</span>
                <select class="inputOuterCss1" id="categoryNameTXT" v-model="categoryNameTXT" @change="changeCategoryName(categoryNameTXT)">
															  <option value='Choose Category' selected disabled>Choose Category</option>
                                <option v-for="(items,index) in categoryListArray" :key="index" :value="items">{{items}}</option>
															</select>
            </div>
            <div class="col-md-6 order-md-3 text-right">
              <button id="thresholdmanagementSaveBTN" class="btn btn-md btn-default bgBtn"  style="color:#fff" v-show="user_role != 'Operator'"  title="Save Threshold" @click="thresholdmanagementAddFunction()"  v-if="threshold_role != 'Operator'">
             <i class="fa fa-floppy-o text-white"></i> Save
            </button>
            </div>
          <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="thresholdmanagementTablePANE" style="border:1px solid lightgray">
                <table class="table table-bordered" id="thresholdmanagementTablePANEID">
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Category</th>
                              <th>Parameter Name</th>
                              <th>Min Value</th>
                              <th>Max Value</th>
                    </tr>
                  </thead>
                    <tbody v-if="thresholdmanageTBLJSONS != ''">
                            <tr v-for="(row,index) in thresholdmanageTBLJSONS.details" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{thresholdmanageTBLJSONS.category_name}}</td>
                              <td>{{row.pram_name}}</td>
                              <td><input type="text" :id="'minTXTbox'+(index+1)" :disabled="user_role == 'Operator'" class="inputOuterCssTextnrml" :value="row.min_val"  style="background: white;" @keypress="thresholdIDblockSpecialChar($event)" @change="masterMinvaluechangefunction(index,row.id)"/></td>
                              <td><input type="text" :id="'maxTXTbox'+(index+1)" :disabled="user_role == 'Operator'" class="inputOuterCssTextnrml" :value="row.max_val"  style="background: white;" @keypress="thresholdIDblockSpecialChar($event)" @change="masterMaxvaluechangefunction(index,row.id)"/></td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="thresholdmanageTBLJSONS == ''" style="text-align:center;width: 100%;">
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
export default {
  name: 'thresholdconfigPAGE',
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
      thresholdmanageTBLJSONS :'',
      thresholdCOPYTBLJSONS:{status:'',category_name:'',details:[]},
      categoryNameTXT:"Choose Category",
      categoryListArray:['Instantaneous','Load Survey','Midnight'],
    }
  },
  created(){
  },
  mounted () {
    let innerMinHeight = window.innerHeight - 125 + 'px'
    document.getElementById("thresholdmanagementPANE").style.height = innerMinHeight;
    document.getElementById("thresholdmanagementTablePANE").style.height = window.innerHeight - 235 + "px";
    document.getElementById("thresholdmanagementTablePANE").style.border =  "1px solid lightgray";
    this.getthresholdmanageList(this.categoryListArray[0]);
    this.categoryNameTXT = this.categoryListArray[0];
  },
  methods: {
    getthresholdmanageList(categoryname) {
      this.isLoading = true;
      this.thresholdCOPYTBLJSONS = {status:'',category_name:'',details:[]};
      var getThresholdURL = this.getThresholdURL.replace("$$category$$",categoryname);
      axios.get(getThresholdURL).then(response => {
        if (response.data.status == "found") {
          this.isLoading = false;
          this.thresholdmanageTBLJSONS = response.data;
          if(this.thresholdmanageTBLJSONS.details.length != 0){
          for(var index = 0; index < this.thresholdmanageTBLJSONS.details.length;index++ ){
          this.thresholdCOPYTBLJSONS.status = this.thresholdmanageTBLJSONS.status;
          this.thresholdCOPYTBLJSONS.category_name = this.thresholdmanageTBLJSONS.category_name;
          var obj = {id:this.thresholdmanageTBLJSONS.details[index].id,pram_name:this.thresholdmanageTBLJSONS.details[index].pram_name,min_val:this.thresholdmanageTBLJSONS.details[index].min_val,
          max_val:this.thresholdmanageTBLJSONS.details[index].max_val};
          this.thresholdCOPYTBLJSONS.details.push(obj);
          }
          }
        } else {
          this.isLoading = false;
          this.thresholdmanageTBLJSONS = "";
          this.thresholdCOPYTBLJSONS = {status:'',category_name:'',details:[]};
        }
      });
    },
    changeCategoryName(changeCategoryName){
      this.getthresholdmanageList(changeCategoryName);
      for(var index = 0; index < this.thresholdmanageTBLJSONS.details.length;index++ ){
        document.getElementById("minTXTbox"+(index+1)).classList.add("inputOuterCssTextnrml");
        document.getElementById("maxTXTbox"+(index+1)).classList.add("inputOuterCssTextnrml");
      }
    },
    masterMinvaluechangefunction(rowindex,id){
       document.getElementById("minTXTbox"+(rowindex+1)).classList.add("inputOuterCssTextnrml");
          document.getElementById("maxTXTbox"+(rowindex+1)).classList.add("inputOuterCssTextnrml");
          document.getElementById("minTXTbox"+(rowindex+1)).classList.remove("inputOuterCssTextfail");
          document.getElementById("maxTXTbox"+(rowindex+1)).classList.remove("inputOuterCssTextfail");
          this.thresholdmanageTBLJSONS.details[rowindex].min_val = document.getElementById("minTXTbox" + (rowindex + 1)).value;
    },
    masterMaxvaluechangefunction(rowindex,id){
         document.getElementById("minTXTbox"+(rowindex+1)).classList.add("inputOuterCssTextnrml");
          document.getElementById("maxTXTbox"+(rowindex+1)).classList.add("inputOuterCssTextnrml");
          document.getElementById("minTXTbox"+(rowindex+1)).classList.remove("inputOuterCssTextfail");
          document.getElementById("maxTXTbox"+(rowindex+1)).classList.remove("inputOuterCssTextfail");
      this.thresholdmanageTBLJSONS.details[rowindex].max_val = document.getElementById("maxTXTbox" + (rowindex + 1)).value;
    },
    thresholdmanagementAddFunction(){
        this.isLoading = true;
      if(this.categoryNameTXT == 'Choose Category'){
        this.warningMessage("Please choose any one category");
         this.isLoading = false;
        return false;
      }
      if(this.thresholdmanageTBLJSONS.details.length != 0){

      for(var index = 0; index < this.thresholdmanageTBLJSONS.details.length;index++ ){
        console.log(this.thresholdmanageTBLJSONS.details[index].min_val+'index ;;', index);
         if(document.getElementById("minTXTbox"+(index+1)).value == ""){
          this.warningMessage("Please enter a min value");
          console.log('id min ;', "minTXTbox"+(index+1));
          document.getElementById("minTXTbox"+(index+1)).classList.remove("inputOuterCssTextnrml");
          document.getElementById("minTXTbox"+(index+1)).classList.add("inputOuterCssTextfail");
          this.isLoading = false;
          return false;
        }
        if(document.getElementById("maxTXTbox"+(index+1)).value == ""){
          this.warningMessage("Please enter a max value");
          console.log('id max ;', "maxTXTbox"+(index+1));
          document.getElementById("maxTXTbox"+(index+1)).classList.remove("inputOuterCssTextnrml");
          document.getElementById("maxTXTbox"+(index+1)).classList.add("inputOuterCssTextfail");
          this.isLoading = false;
          return false;
        }
        console.log(document.getElementById("minTXTbox"+(index+1)).value+'--MIN---------------MAX------>'+document.getElementById("maxTXTbox"+(index+1)).value )
        if(parseInt(document.getElementById("minTXTbox"+(index+1)).value) > parseInt(document.getElementById("maxTXTbox"+(index+1)).value)){
          this.warningMessage("Max value Should be greater than min value");
          document.getElementById("minTXTbox"+(index+1)).classList.remove("inputOuterCssTextnrml");
          document.getElementById("maxTXTbox"+(index+1)).classList.remove("inputOuterCssTextnrml");
          document.getElementById("minTXTbox"+(index+1)).classList.add("inputOuterCssTextfail");
          document.getElementById("maxTXTbox"+(index+1)).classList.add("inputOuterCssTextfail");
          this.isLoading = false;
          return false;
        }
      }
      }
      console.log('thresholdmanageTBLJSONS :', JSON.stringify(this.thresholdmanageTBLJSONS));
      console.log('thresholdCOPYTBLJSONS :', JSON.stringify(this.thresholdCOPYTBLJSONS));
      var checkGEN = _.isEqual(this.thresholdmanageTBLJSONS, this.thresholdCOPYTBLJSONS);
      console.log('threshold ** FLAG :', checkGEN);
      if(checkGEN){
       this.successMessage("Updated successfully..");
       this.isLoading = false;
       return true;
      }else{
      var thresholdJSON = {
        "username":this.user_name,
        "userrole":this.user_role,
        "category":this.categoryNameTXT,
        "details":this.thresholdmanageTBLJSONS,
        "copy_details":this.thresholdCOPYTBLJSONS,
        };
         axios
          .post(this.addupdateThresholdURL, thresholdJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "updated") {
              this.getthresholdmanageList(this.categoryNameTXT);
              this.successMessage("Updated successfully");
              this.isLoading = false;
              return true;
            } else {
              this.warningMessage(status);
              this.isLoading = false;
              return false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.errorMessage(error.message);
          });
    }
    },
       thresholdIDblockSpecialChar ($event) {
       var eleID = $event.target.id;
       let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
       // only allow number and one dot
       if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || document.getElementById(eleID).value.indexOf('.') != -1)) { // 46 is dot
        $event.preventDefault();
       }
       // restrict to 2 decimal places
       if(document.getElementById(eleID).value !=null && document.getElementById(eleID).value.indexOf(".")>-1 && (document.getElementById(eleID).value.split('.')[1].length > 5)){
       $event.preventDefault();
       }
         document.getElementById(eleID).classList.remove("inputOuterCssTextfail");
         document.getElementById(eleID).classList.add("inputOuterCssTextnrml");
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
.inputOuterCssText {
  height: 30px;
  background: transparent;
  border: 1px solid lightgray;
  width: 40%;
  font-size: 0.9em;
}
.inputOuterCssTextnrml {
  height: 30px;
  background: transparent;
  border: 1px solid lightgray;
  width: 40%;
  font-size: 0.9em;
}
.inputOuterCssTextfail {
  height: 30px;
  background: transparent;
  border: 1px solid red;
  width: 40%;
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

