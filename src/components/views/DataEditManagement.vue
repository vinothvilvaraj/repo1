<template>
  <section class="content" id="dataeditingmanagementPANE">
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
               <!-- {{JSON.stringify(clickObjTXT)}} -->
              </div>
               <div class="col-lg-2">
               <span>Region : </span>
               <select class="inputTEXTcss" id="selectRegionTXT"  v-model="selectRegionTXT" @change="getselectCircleNameLst(selectRegionTXT)">>
                 <option value='Choose Region' selected disabled>Choose Region</option>
                 <option v-for="(items,index) in selectregionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
                </select>

             </div>
              <div class="col-lg-2">
               <span>Circle : </span>
               <select class="inputTEXTcss" id="selectCircleTXT"  v-model="selectCircleTXT" @change="getselectSSNameLst(selectCircleTXT)">>
                 <option value='Choose Circle' selected disabled>Choose Circle</option>
                 <option v-for="(items,index) in selectcircleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME">{{items.CIRCLE_NAME}}</option>
						  	</select>
             </div>
             <!--  -->
             <div class="col-lg-2">   
               <span>Device : </span>
               <select class="inputTEXTcss" id="selectDeviceTXT"  v-model="selectDeviceTXT" @change="getselectmeterNameLst(selectDeviceTXT)">
                  <option value='Choose Device' selected disabled>Choose Device</option>
                  <option v-for="(items,index) in selectdeviceListArray" :key="index" :value="items.DCU_ID+'$$'+items.DCU_NAME" >{{items.DCU_NAME}}</option>
							 </select>
             </div>
              <div class="col-lg-2">
               <span>Feeder : </span>
               <select class="inputTEXTcss" id="selectMeterTXT"  v-model="selectMeterTXT">
                   <option value='Choose Feeder' selected disabled>Choose Feeder</option>
                   <option v-for="(items,index) in selmeterListArray" :key="index" :value="items.METER_ID+'$$'+items.METER_NAME">{{items.METER_NAME}}</option>
							 	</select>
             </div>
              <div class="col-lg-2">
                <button class="btn btn-primary" @click="selectSubmitMethod()">Submit</button>
              </div>

          <div class="col-md-12 order-md-3">
             <div class="tab" role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                      <li role="presentation" class="active" id="lsTab1">
                        <a
                          href="#lsTab1PANE"
                          id="lsTab1PANEID"
                          aria-controls="home"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="rightSection1"
                        >
                          <i class="fa fa-edit text-blue" aria-hidden="true"></i> &nbsp;&nbsp; Load Survey Data
                        </a>
                      </li>
                      <li role="presentation" id="midnightTab2">
                        <a
                          href="#midnightTab2PANE"
                          id="midnightTab2PANEID"
                          aria-controls="profile"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="rightSection2"
                        >
                          <i class="fa fa-edit text-green" aria-hidden="true"></i> &nbsp;&nbsp;  Midnight Data
                        </a>
                      </li>
                      <li role="presentation" id="billTab3">
                        <a
                          href="#billTab3PANE"
                          id="billTab3PANEID"
                          aria-controls="profile"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="rightSection3"
                        >
                          <i class="fa fa-edit text-black" aria-hidden="true"></i> &nbsp;&nbsp;  Billing Data
                        </a>
                      </li>
                      </ul>

                       <div class="tab-content">
                      <div role="tabpanel" class="tab-pane fade in active show" id="lsTab1PANE">
                        <p></p>
                             <div class="row">
             <div class="col-lg-2" v-show="false">
               <span>Region : </span>
               <select class="inputTEXTcss" id="loadsurveyTableRegionTXT"  v-model="loadsurveyTableRegionTXT" @change="getloadsurveyCircleNameLst(loadsurveyTableRegionTXT)">>
                 <option value='Choose Region' selected disabled>Choose Region</option>
                 <option v-for="(items,index) in loadsurveyregionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
                </select>

             </div>
              <div class="col-lg-2" v-show="false">
               <span>Circle : </span>
               <select class="inputTEXTcss" id="loadsurveyTableCircleTXT"  v-model="loadsurveyTableCircleTXT" @change="getloadsurveySSNameLst(loadsurveyTableCircleTXT)">>
                 <option value='Choose Circle' selected disabled>Choose Circle</option>
                 <option v-for="(items,index) in loadsurveycircleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME">{{items.CIRCLE_NAME}}</option>
						  	</select>
             </div>
             <div class="col-lg-2" v-show="false">
               <span>Device : </span>
               <select class="inputTEXTcss" id="loadsurveyTableDeviceTXT"  v-model="loadsurveyTableDeviceTXT" @change="getloadsurveymeterNameLst(loadsurveyTableDeviceTXT)">
                  <option value='Choose Device' selected disabled>Choose Device</option>
                  <option v-for="(items,index) in loadsurveydeviceListArray" :key="index" :value="items.DCU_ID+'$$'+items.DCU_NAME" >{{items.DCU_NAME}}</option>
							 </select>
             </div>
              <div class="col-lg-2" v-show="false">
               <span>Feeder : </span>
               <select class="inputTEXTcss" id="loadsurveyTableMeterTXT"  v-model="loadsurveyTableMeterTXT">
                   <option value='Choose Feeder' selected disabled>Choose Feeder</option>
                   <option v-for="(items,index) in loadsurveymeterListArray" :key="index" :value="items.METER_ID+'$$'+items.METER_NAME">{{items.METER_NAME}}</option>
							 	</select>
             </div>
             <div class="col-lg-5" style="padding-top: 5px;">
              </div>
             <div class="col-lg-2" style="padding-top: 5px;">
               <span>Choose Date : </span>
              <datepicker v-model="loadsurveyTableFromdateTXT" :disabledDates="loadsurveyTabledisabledDates" @closed="selectSubmitMethod()" class="inputTEXTcss" style="width:57%;margin-left: 87px;margin-top: -23px;border: 1px solid transparent;"></datepicker>
             </div>
              <div class="col-lg-2"  v-show="false">
                <button class="btn btn-primary" @click="loadsurveyTableMethod()">Submit</button>
             </div>
                         </div>
                         <p></p>
                           <div class="row">
             <div class="col-lg-12" >
               <div class="table-responsive" style="border:1px solid lightgray;" id="loadsurveyTab2IDtable">
              <table class="style table table-bordered" id="loadsurveyTab2ID"  v-if="loadsurveyTableDATAJSON != ''">
                      <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th style="width:30px"></th>
                      <th style="width:30px"></th>
                      <th>S.No</th>
                      <th v-for="(paramterdetailItem,paramterindex) in loadsurveyTableDATAJSON.column_details" v-bind:key="paramterindex">
                        <span>{{paramterdetailItem}}</span></th>
                    </tr>
                  </thead>
                  <tbody v-if="loadsurveyTableDATAJSON != ''">
                    <tr v-for="(detailItem,index) in loadsurveyTableDATAJSON.details" v-bind:key="index" >
                    <td style="width:30px;vertical-align: middle;"><i :id="'ls'+index+'editbtn'" class="fa fa-edit text-blue" @click="editloadsurvey(index,detailItem)" title="Edit"  style="cursor:pointer;font-size:16px"></i></td>
                     <td style="width:30px;vertical-align: middle;"><button :id="'ls'+index+'savebtn'"  class="disableCSS" @click="saveloadsurvey(index,detailItem)" title="Save" style="cursor:pointer;background-color:transparent;border:1px solid transparent"  :disabled="true"> <i :id="'ls'+index+'faiconsavebtn'" class="fa fa-save text-gray" style="font-size:16px"></i></button></td>
                    <td style="vertical-align: middle;">{{index+1}}</td>
                    <td v-for="(paramterdetailItem,paramterindex) in loadsurveyTableDATAJSON.column_details" v-bind:key="paramterindex" >
                   <input type="text" :id="'ls'+index+'textbox'+(paramterindex+1)" class="inputOuterCssText" v-model="detailItem[paramterdetailItem]"  disabled="true"/>
                      </td>
                    </tr>
                  </tbody>
                    </table>
                <div v-if="loadsurveyTableDATAJSON == ''" style="text-align:center;width: 100%;">
                 <span>No records found</span>
                 </div>
                 </div>
             </div>
             </div>
              </div>


              <div role="tabpanel" class="tab-pane fade" id="midnightTab2PANE">
                        <p></p>
                         <div class="row">
             <div class="col-lg-2" v-show="false">
               <span>Region : </span>
               <select class="inputTEXTcss" id="midnightTableRegionTXT"  v-model="midnightTableRegionTXT" @change="getmidnightCircleNameLst(midnightTableRegionTXT)">>
                 <option value='Choose Region' selected disabled>Choose Region</option>
                 <option v-for="(items,index) in midnightregionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
                </select>

             </div>
              <div class="col-lg-2" v-show="false">
               <span>Circle : </span>
               <select class="inputTEXTcss" id="midnightTableCircleTXT"  v-model="midnightTableCircleTXT" @change="getmidnightSSNameLst(midnightTableCircleTXT)">>
                 <option value='Choose Circle' selected disabled>Choose Circle</option>
                 <option v-for="(items,index) in midnightcircleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME">{{items.CIRCLE_NAME}}</option>
						  	</select>
             </div>
             <div class="col-lg-2" v-show="false">
               <span>Device : </span>
               <select class="inputTEXTcss" id="midnightTableDeviceTXT"  v-model="midnightTableDeviceTXT" @change="getmidnightmeterNameLst(midnightTableDeviceTXT)">
                  <option value='Choose Device' selected disabled>Choose Device</option>
                  <option v-for="(items,index) in midnightdeviceListArray" :key="index" :value="items.DCU_ID+'$$'+items.DCU_NAME" >{{items.DCU_NAME}}</option>
							 </select>
             </div>
              <div class="col-lg-2" v-show="false">
               <span>Feeder : </span>
               <select class="inputTEXTcss" id="midnightTableMeterTXT"  v-model="midnightTableMeterTXT">
                   <option value='Choose Feeder' selected disabled>Choose Feeder</option>
                   <option v-for="(items,index) in midnightmeterListArray" :key="index" :value="items.METER_ID+'$$'+items.METER_NAME">{{items.METER_NAME}}</option>
							 	</select>
             </div>
             <div class="col-lg-5" style="padding-top: 5px;">
             </div>
             <div class="col-lg-2" style="padding-top: 5px;">
               <span>Choose Month : </span>
              <datepicker v-model="midnightTableFromdateTXT" minimum-view="month" format="MMM yyyy"  :disabledDates="midnightTabledisabledDates" @closed="selectSubmitMethod()" class="inputTEXTcss" style="width:57%;margin-left: 90px;margin-top: -23px;border: 1px solid transparent;"></datepicker>
             </div>
              <div class="col-lg-2"  v-show="false">
                <button class="btn btn-primary" @click="midnightTableMethod()">Submit</button>
             </div>
                         </div>
                         <p></p>
                       <div class="row">
             <div class="col-lg-12" >
               <div class="table-responsive" style="border:1px solid lightgray;" id="midnightTab2IDtable">
              <table class="style table table-bordered" id="midnightTab2ID"  v-if="midnightTableDATAJSON != ''">
                      <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th style="width:30px"></th>
                      <th style="width:30px"></th>
                      <th>S.No</th>
                      <th v-for="(paramterdetailItem,paramterindex) in midnightTableDATAJSON.column_details" v-bind:key="paramterindex">{{paramterdetailItem}}</th>
                    </tr>
                  </thead>
                  <tbody v-if="midnightTableDATAJSON != ''">
                    <tr v-for="(detailItem,index) in midnightTableDATAJSON.details" v-bind:key="index">
                    <td style="width:30px;vertical-align: middle;"><i :id="'midnight'+index+'editbtn'" class="fa fa-edit text-blue" @click="editmidnight(index,detailItem)" title="Edit"  style="cursor:pointer;font-size:16px"></i></td>
                    <td style="width:30px;vertical-align: middle;"><button :id="'midnight'+index+'savebtn'"  class="disableCSS" @click="savemidnight(index,detailItem)" title="Save" style="cursor:pointer;background-color:transparent;border:1px solid transparent"  :disabled="true"> <i :id="'midnight'+index+'faiconsavebtn'" class="fa fa-save text-gray" style="font-size:16px"></i></button></td>
                    <td>{{index+1}}</td>
                    <td v-for="(paramterdetailItem,paramterindex) in midnightTableDATAJSON.column_details" v-bind:key="paramterindex" >
                    <input type="text" :id="'midnight'+index+'textbox'+(paramterindex+1)" class="inputOuterCssText" v-model="detailItem[paramterdetailItem]"  disabled="true" />
                    </td>
                    </tr>
                  </tbody>
                  </table>
                  <div v-if="midnightTableDATAJSON == ''" style="text-align:center;width: 100%;">
                  <span>No records found</span>
                  </div>
                  </div>
           </div>
            </div>
                      </div>


                      <div role="tabpanel" class="tab-pane fade" id="billTab3PANE">
                        <p></p>
                        <div class="row">
             <div class="col-lg-2" v-show="false">
               <span>Region : </span>
               <select class="inputTEXTcss" id="billingTableRegionTXT"  v-model="billingTableRegionTXT" @change="getbillingCircleNameLst(billingTableRegionTXT)">>
                 <option value='Choose Region' selected disabled>Choose Region</option>
                 <option v-for="(items,index) in billingregionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
                </select>

             </div>
              <div class="col-lg-2" v-show="false">
               <span>Circle : </span>
               <select class="inputTEXTcss" id="billingTableCircleTXT"  v-model="billingTableCircleTXT" @change="getbillingSSNameLst(billingTableCircleTXT)">>
                 <option value='Choose Circle' selected disabled>Choose Circle</option>
                 <option v-for="(items,index) in billingcircleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME">{{items.CIRCLE_NAME}}</option>
						  	</select>
             </div>
             <div class="col-lg-2" v-show="false">
               <span>Device : </span>
               <select class="inputTEXTcss" id="billingTableDeviceTXT"  v-model="billingTableDeviceTXT" @change="getbillingmeterNameLst(billingTableDeviceTXT)">
                  <option value='Choose Device' selected disabled>Choose Device</option>
                  <option v-for="(items,index) in billingdeviceListArray" :key="index" :value="items.DCU_ID+'$$'+items.DCU_NAME" >{{items.DCU_NAME}}</option>
							 </select>
             </div>
              <div class="col-lg-2" v-show="false">
               <span>Feeder : </span>
               <select class="inputTEXTcss" id="billingTableMeterTXT"  v-model="billingTableMeterTXT">
                   <option value='Choose Feeder' selected disabled>Choose Feeder</option>
                   <option v-for="(items,index) in billingmeterListArray" :key="index" :value="items.METER_ID+'$$'+items.METER_NAME">{{items.METER_NAME}}</option>
							 	</select>
             </div>
             <div class="col-lg-5"  style="padding-top: 5px;">
            </div>
             <div class="col-lg-3"  style="padding-top: 5px;">
               <span>Choose Month : </span>
              <datepicker v-model="billingTableFromdateTXT" minimum-view="month" format="MMM yyyy"   :disabledDates="billingTabledisabledDates" @closed="selectSubmitMethod()" class="inputTEXTcss" style="width:57%;margin-left: 90px;margin-top: -23px;border: 1px solid transparent;"></datepicker>
             </div>
              <div class="col-lg-2"  v-show="false">
                <button class="btn btn-primary" @click="billingTableMethod()">Submit</button>
             </div>
                         </div>
                         <p></p>
                        <div class="row">
             <div class="col-lg-12" >
               <div class="table-responsive" style="border:1px solid lightgray;" id="billingTab2IDtable">
              <table class="style table table-bordered" id="billingTab2ID"  v-if="billingTableDATAJSON != ''">
                      <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th style="width:30px"></th>
                      <th style="width:30px"></th>
                      <th>S.No</th>
                      <th v-for="(paramterdetailItem,paramterindex) in billingTableDATAJSON.column_details" v-bind:key="paramterindex">{{paramterdetailItem}}</th>
                    </tr>
                  </thead>
                  <tbody v-if="billingTableDATAJSON != ''">
                    <tr v-for="(detailItem,index) in billingTableDATAJSON.details" v-bind:key="index">
                    <td style="width:30px;vertical-align: middle;"><i :id="'billing'+index+'editbtn'" class="fa fa-edit text-blue" @click="editbilling(index,detailItem)" title="Edit"  style="cursor:pointer;font-size:16px"></i></td>
                    <td style="width:30px;vertical-align: middle;"><button :id="'billing'+index+'savebtn'"  class="disableCSS" @click="savebilling(index,detailItem)" title="Save" style="cursor:pointer;background-color:transparent;border:1px solid transparent"  :disabled="true"> <i :id="'billing'+index+'faiconsavebtn'" class="fa fa-save text-gray" style="font-size:16px"></i></button></td>
                    <td>{{index+1}}</td>
                    <td style="min-width:60px;vertical-align: middle;" v-for="(paramterdetailItem,paramterindex) in billingTableDATAJSON.column_details" v-bind:key="paramterindex" >
                             <input type="text" :id="'billing'+index+'textbox'+(paramterindex+1)" class="inputOuterCssText" v-model="detailItem[paramterdetailItem]"  disabled="true" />
                      </td>
                    </tr>
                  </tbody>
                    </table>
                     <div v-if="billingTableDATAJSON == ''" style="text-align:center;width: 100%;">
                 <span>No records found</span>
                 </div>
                    </div>

           </div>
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

    <modal name="dataEditConfirmPopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
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
              <h4 class="heading" style="color: rgb(0, 115, 183);"> <i class="fa fa-warning" style="color:#629949"></i> Confirmation : {{dataEditBTNTXT}}</h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="confirmCloseBTN" type="button" class="btn btn-default" @click="dataEditConfirmpopupHIDE" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div>
            <p><b>Are sure you want to save ? </b></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Reason :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​<textarea class="inputTEXTcss" id="dataEditReasonTXT" v-model="dataEditReasonTXT" rows="10" cols="70" style="min-width: 100%;min-height: 150px;max-width: 100%;"></textarea>
              </div>
            </div>
            </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
          <a id="firmwareclseBTN" type="button" class="btn bgBtn btnPadding"  style="color:#fff;background:green;" @click="saveconfirmMethod()">Save</a>
          <a id="datConfrimclseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="dataEditConfirmpopupHIDE()">Cancel</a>
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
  name: 'dataeditingPAGE',
  props: ['clickobject'],
  components: {
    CripNotice,
    VueElementLoading,
    Datepicker
  },
  data () {
    return {
      clickObjTXT:this.clickobject,
      user_name: this.$session.get("username"),
      user_role: this.$session.get("userrole"),
      isLoading: false,
      fullPage: true,
      usermanagemode: true,
      tabClickButtonTXT:"Load Survey",
      typevalue: "password",
      typevalue1: "password",
      imgvalue: "static/img/images/Peye1.png",
      imgvalue1: "static/img/images/Peye1.png",
      buttontext: "",
      lsDetailsJson:'',
      midnightDetailsJson:'',
      billingDetailsJson:'',
      loadsurveyTableDATAJSON:'',
      midnightTableDATAJSON:'',
      billingTableDATAJSON:'',
      selectRegionTXT:'Choose Region',
      selectregionListArray:[],
      selectCircleTXT:'Choose Circle',
      selectcircleListArray:[],
      selectDeviceTXT:'Choose Device',
      selectdeviceListArray:[],
      selectMeterTXT:'Choose Feeder',
      selmeterListArray:[],
      //
      loadsurveyregionListArray:[],
      loadsurveyTableRegionTXT:'Choose Region',
      loadsurveycircleListArray:[],
      loadsurveyTableCircleTXT:'Choose Circle',
      loadsurveydeviceListArray:[],
      loadsurveyTableDeviceTXT:'Choose Device',
      loadsurveymeterListArray:[],
      loadsurveyTableMeterTXT:'Choose Feeder',
      loadsurveyTableFromdateTXT:myDate,
      loadsurveyTabledisabledDates: {
        from: new Date()
      },
      midnightregionListArray:[],
      midnightTableRegionTXT:'Choose Region',
      midnightcircleListArray:[],
      midnightTableCircleTXT:'Choose Circle',
      midnightdeviceListArray:[],
      midnightTableDeviceTXT:'Choose Device',
      midnightmeterListArray:[],
      midnightTableMeterTXT:'Choose Feeder',
      midnightTableFromdateTXT:myDate,
      midnightTabledisabledDates: {
        from: new Date()
      },
      billingregionListArray:[],
      billingTableRegionTXT:'Choose Region',
      billingcircleListArray:[],
      billingTableCircleTXT:'Choose Circle',
      billingdeviceListArray:[],
      billingTableDeviceTXT:'Choose Device',
      billingmeterListArray:[],
      billingTableMeterTXT:'Choose Feeder',
      billingTableFromdateTXT:myDate,
      billingTabledisabledDates: {
        from: new Date()
      },
      lsSubmitregionid:'',
      lsSubmitregionname:'',
      lsSubmitcircleid:'',
      lsSubmitcirclename:'',
      lsSubmitdeviceid:'',
      lsSubmitdevicename:'',
      lsSubmitmeterid:'',
      lsSubmitmetername:'',
      lsSubmitloadsurveydate:'',
      midnightSubmitregionid:'',
      midnightSubmitregionname:'',
      midnightSubmitcircleid:'',
      midnightSubmitcirclename:'',
      midnightSubmitdeviceid:'',
      midnightSubmitdevicename:'',
      midnightSubmitmeterid:'',
      midnightSubmitmetername:'',
      midnightSubmitmidnightdate:'',
      billingSubmitregionid:'',
      billingSubmitregionname:'',
      billingSubmitcircleid:'',
      billingSubmitcirclename:'',
      billingSubmitdeviceid:'',
      billingSubmitdevicename:'',
      billingSubmitmeterid:'',
      billingSubmitmetername:'',
      billingSubmitbillingdate:'',
      dataEditReasonTXT:'',
      dataEditSaveLSrowIndex:'',
      dataEditSaveOLDLSdetailItems:{},
      dataEditSaveLSdetailItems:'',
      dataEditSaveMNrowIndex:'',
      dataEditSaveMNdetailItems:'',
      dataEditSaveOLDMNdetailItems:{},
      dataEditSaveBILLrowIndex:'',
      dataEditSaveBILLdetailItems:'',
      dataEditSaveOLDBILLdetailItems:{},
      dataEditBTNTXT : "",
      textbox123:'',
    }
  },
  created(){
  },
 async mounted () {
    this.isLoading = true;
    let innerMinHeight = window.innerHeight -125 + "px";
    document.getElementById("dataeditingmanagementPANE").style.height = innerMinHeight;
    document.getElementById("loadsurveyTab2IDtable").style.height = window.innerHeight - 309 + "px";
    document.getElementById("midnightTab2IDtable").style.height = window.innerHeight - 309 + "px";
    document.getElementById("billingTab2IDtable").style.height = window.innerHeight - 309 + "px";
    this.tabClickButtonTXT = "Load Survey";
    await this.propsLoadRegionNameList();
    console.log('this.clickObjTXT :', JSON.stringify(this.clickObjTXT));
     setTimeout(() => {
       this.selectSubmitMethod();
    }, 1500);
    // setTimeout(() => {
    //   this.midnightTableMethod();
    // }, 1500);
    //  setTimeout(() => {
    //   this.billingTableMethod();
    // }, 1500);
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
      async propsLoadRegionNameList(){
       this.selectregionListArray = [];
       this.selectRegionTXT = "Choose Region";
       this.selectCircleTXT = "Choose Circle";
       this.selectDeviceTXT = "Choose Device";
       this.selectMeterTXT = "Choose Feeder";
    await axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.selectregionListArray = response.data.details;
          if(this.clickObjTXT != undefined){
            if(this.clickObjTXT.hasOwnProperty('region_id')){
              this.selectRegionTXT = this.clickObjTXT.region_id+'$$'+this.clickObjTXT.region_name;
            }else{
              this.selectRegionTXT = this.selectregionListArray[0].REGION_ID+'$$'+this.selectregionListArray[0].REGION_NAME;
            }
          }else{
              this.selectRegionTXT = this.selectregionListArray[0].REGION_ID+'$$'+this.selectregionListArray[0].REGION_NAME;
          }
          this.propsLoadCircleNameLst(this.selectRegionTXT);
        } else {
          this.selectregionListArray = [];
          this.selectRegionTXT = "Choose Region";
          this.selectCircleTXT = "Choose Circle";
          this.selectDeviceTXT = "Choose Device";
          this.selectMeterTXT = "Choose Feeder";
        }
      });
    },
   async propsLoadCircleNameLst(regionidname){
      console.log('propsLoadCircleNameLst :', regionidname);
       var regionid = regionidname.split("$$")[0];
       var regionname = regionidname.split("$$")[1];
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.selectcircleListArray = [];
       this.selectCircleTXT = "Choose Circle";
       this.selectDeviceTXT = "Choose Device";
       this.selectMeterTXT = "Choose Feeder";
     await  axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.selectcircleListArray = response.data.details;
           if(this.clickObjTXT != undefined){
           if(this.clickObjTXT.hasOwnProperty('circle_id')){
              this.selectCircleTXT = this.clickObjTXT.circle_id+'$$'+this.clickObjTXT.circle_name;
           }else{
             this.selectCircleTXT = this.selectcircleListArray[0].CIRCLE_ID+'$$'+this.selectcircleListArray[0].CIRCLE_NAME;
           }
          }else{
              this.selectCircleTXT = this.selectcircleListArray[0].CIRCLE_ID+'$$'+this.selectcircleListArray[0].CIRCLE_NAME;
          }
          this.propsLoadSSNameLst(this.selectCircleTXT);
        } else {
          this.selectcircleListArray = [];
           this.selectCircleTXT = "Choose Circle";
           this.selectDeviceTXT = "Choose Device";
           this.selectMeterTXT = "Choose Feeder";
        }
      });
    },
   async propsLoadSSNameLst(circleidName){
      //console.log('getselectSSNameLst :', circleidName);
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
      var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleid);
      this.selectDeviceTXT = "Choose Device";
      this.selectMeterTXT = "Choose Feeder";
      this.selectdeviceListArray = [];
     await axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.selectdeviceListArray = response.data.details;
          if(this.clickObjTXT != undefined){
            if(this.clickObjTXT.hasOwnProperty('dcu_id')){
              this.selectDeviceTXT = this.clickObjTXT.dcu_id+'$$'+this.clickObjTXT.dcu_name;
            }else{
               this.selectDeviceTXT = this.selectdeviceListArray[0].DCU_ID+'$$'+this.selectdeviceListArray[0].DCU_NAME;
            }
          }else{
            this.selectDeviceTXT = this.selectdeviceListArray[0].DCU_ID+'$$'+this.selectdeviceListArray[0].DCU_NAME;
         }
         console.log('propsLoadSSNameLst sel:', this.selectDeviceTXT)
         this.getselectmeterNameLst(this.selectDeviceTXT);
        } else {
          this.selectdeviceListArray = [];
          this.selectDeviceTXT = "Choose Device";
          this.selectMeterTXT = "Choose Feeder";
        }
      });
    },
   async getSelectRegionNameList(){
       this.selectregionListArray = [];
       this.selectRegionTXT = "Choose Region";
       this.selectCircleTXT = "Choose Circle";
       this.selectDeviceTXT = "Choose Device";
       this.selectMeterTXT = "Choose Feeder";
    await axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.selectregionListArray = response.data.details;
          this.selectRegionTXT = this.selectregionListArray[0].REGION_ID+'$$'+this.selectregionListArray[0].REGION_NAME;
          this.getselectCircleNameLst(this.selectRegionTXT);
        } else {
          this.selectregionListArray = [];
          this.selectRegionTXT = "Choose Region";
          this.selectCircleTXT = "Choose Circle";
          this.selectDeviceTXT = "Choose Device";
          this.selectMeterTXT = "Choose Feeder";
        }
      });
    },
   async getselectCircleNameLst(regionidname){
      console.log('getselectCircleNameLst :', regionidname);
       var regionid = regionidname.split("$$")[0];
       var regionname = regionidname.split("$$")[1];
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.selectcircleListArray = [];
       this.selectCircleTXT = "Choose Circle";
       this.selectDeviceTXT = "Choose Device";
       this.selectMeterTXT = "Choose Feeder";
     await  axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.selectcircleListArray = response.data.details;
          this.selectCircleTXT = this.selectcircleListArray[0].CIRCLE_ID+'$$'+this.selectcircleListArray[0].CIRCLE_NAME;
          this.getselectSSNameLst(this.selectCircleTXT);
        } else {
          this.selectcircleListArray = [];
           this.selectCircleTXT = "Choose Circle";
           this.selectDeviceTXT = "Choose Device";
           this.selectMeterTXT = "Choose Feeder";
        }
      });
    },
   async getselectSSNameLst(circleidName){
      //console.log('getselectSSNameLst :', circleidName);
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
      var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleid);
      this.selectDeviceTXT = "Choose Device";
      this.selectMeterTXT = "Choose Feeder";
      this.selectdeviceListArray = [];
     await axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.selectdeviceListArray = response.data.details;
          this.selectDeviceTXT = this.selectdeviceListArray[0].DCU_ID+'$$'+this.selectdeviceListArray[0].DCU_NAME;
          this.getselectmeterNameLst(this.selectDeviceTXT);
        } else {
          this.selectdeviceListArray = [];
          this.selectDeviceTXT = "Choose Device";
          this.selectMeterTXT = "Choose Feeder";
        }
      });
    },
     getselectmeterNameLst(dcuidName){
      console.log('getselectmeterNameLst 1:', dcuidName);
       var dcuid = dcuidName.split("$$")[0];
       var dcuname = dcuidName.split("$$")[1];
       var getSSMeterURL = this.getSSMeterURL.replace("$$dcuid$$",dcuid);
       this.selectMeterTXT = "Choose Feeder";
       this.selmeterListArray = [];
       axios.get(getSSMeterURL).then(response => {
        if (response.data.status == "found") {
          this.selmeterListArray = response.data.details;
          this.selectMeterTXT = this.selmeterListArray[0].METER_ID+'$$'+this.selmeterListArray[0].METER_NAME;
        } else {
          this.selmeterListArray = [];
          this.selectMeterTXT = "Choose Feeder";
        }
      });
    },
    selectSubmitMethod(){
      if(this.tabClickButtonTXT == "Load Survey"){
        this.loadsurveyTableMethod();
      } else if(this.tabClickButtonTXT == "Midnight"){
        this.midnightTableMethod();
      } else if(this.tabClickButtonTXT == "Billing"){
        this.billingTableMethod();
      }
    },
     rightSection1() {
      this.tabClickButtonTXT = "Load Survey";
      document.getElementById("lsTab1").classList.add("active");
      document.getElementById("midnightTab2").classList.remove("active");
      document.getElementById("billTab3").classList.remove("active");
      document.getElementById("lsTab1PANE").classList.add("in", "active", "show");
      document.getElementById("midnightTab2PANE").classList.remove("in", "active", "show");
      document.getElementById("billTab3PANE").classList.remove("in", "active", "show");
      this.selectSubmitMethod();
      },
      rightSection2() {
      this.tabClickButtonTXT = "Midnight";
      document.getElementById("midnightTab2").classList.add("active");
      document.getElementById("lsTab1").classList.remove("active");
      document.getElementById("billTab3").classList.remove("active");
      document.getElementById("midnightTab2PANE").classList.add("in", "active", "show");
      document.getElementById("lsTab1PANE").classList.remove("in", "active", "show");
      document.getElementById("billTab3PANE").classList.remove("in", "active", "show");
      this.selectSubmitMethod();
      },
      rightSection3() {
      this.tabClickButtonTXT = "Billing";
      document.getElementById("billTab3").classList.add("active");
      document.getElementById("midnightTab2").classList.remove("active");
      document.getElementById("lsTab1").classList.remove("active");
      document.getElementById("billTab3PANE").classList.add("in", "active", "show");
      document.getElementById("lsTab1PANE").classList.remove("in", "active", "show");
      document.getElementById("midnightTab2PANE").classList.remove("in", "active", "show");
      this.selectSubmitMethod();
      },
    dataEditConfirmpopupSHOW(){
      this.$modal.show('dataEditConfirmPopup');
    },
    dataEditConfirmpopupHIDE(){
        this.$modal.hide('dataEditConfirmPopup');
    },
    saveconfirmMethod(){
      if(this.dataEditReasonTXT == ''){
        this.warningMessage('Please enter command reason and proceed further.');
        return false;
      }
      if(this.dataEditReasonTXT.length < 20 ){
        this.warningMessage("Please enter minimum 20 characters.");
        return false;
      }
      if(this.dataEditBTNTXT == "Load Survey"){
      //var olditems = {};
      // console.log('-dataEditSaveLSdetailItems-->>'+ JSON.stringify(this.dataEditSaveLSdetailItems));
      // for (var key in this.dataEditSaveLSdetailItems) {
        // olditems[key] = this.dataEditSaveLSdetailItems[key];
      // }
      this.isLoading = true;
          var saveloadJSON ={
            "table_name":this.loadsurveyTableDATAJSON.table_name,
            "user_name":this.user_name,
            "user_role":this.user_role,
            "region_id":this.lsSubmitregionid,
            "region_name":this.lsSubmitregionname,
            "circle_id":this.lsSubmitcircleid,
            "circle_name":this.lsSubmitcirclename,
            "dcu_id":this.lsSubmitdeviceid,
            "dcu_name":this.lsSubmitdevicename,
            "meter_id":this.lsSubmitmeterid,
            "meter_name":this.lsSubmitmetername,
            "date": this.lsSubmitloadsurveydate,
            "old_object": this.dataEditSaveOLDLSdetailItems,
            "new_object":"",
            "audit_reason":this.dataEditReasonTXT,
            "data_details":[]
          };
          for(var ss=0;ss<this.loadsurveyTableDATAJSON.column_details.length;ss++){
              this.dataEditSaveLSdetailItems[this.loadsurveyTableDATAJSON.column_details[ss]] = document.getElementById('ls'+this.dataEditSaveLSrowIndex+'textbox'+(ss+1)).value;
          }
          saveloadJSON.new_object = this.dataEditSaveLSdetailItems;
          saveloadJSON.data_details = [this.dataEditSaveLSdetailItems];
          console.log('saveloadJSON :', JSON.stringify(saveloadJSON));
          axios.post(this.updateloadsurveyURL, saveloadJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "success") {
              this.successMessage("updated successfully");
              for(var ss=0;ss<this.loadsurveyTableDATAJSON.column_details.length;ss++){
              document.getElementById('ls'+this.dataEditSaveLSrowIndex+'textbox'+(ss+1)).disabled = true;
              document.getElementById('ls'+this.dataEditSaveLSrowIndex+'savebtn').disabled = true;
              document.getElementById('ls'+this.dataEditSaveLSrowIndex+'savebtn').classList.add("disableCSS");
              document.getElementById('ls'+this.dataEditSaveLSrowIndex+'faiconsavebtn').classList.remove("text-green");
              document.getElementById('ls'+this.dataEditSaveLSrowIndex+'faiconsavebtn').classList.add("text-gray");
              }
            this.$modal.hide('dataEditConfirmPopup');
            this.isLoading = false;
            return false;
            }else{
            this.warningMessage(status);
            this.isLoading = false;
            return false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("load survey function error::" + error.message);
          });
      }else if(this.dataEditBTNTXT == "Midnight"){
         var olditems = {};
      for (var key in this.dataEditSaveMNdetailItems) {
        olditems[key] = this.dataEditSaveMNdetailItems[key];
      }
      // console.log('savemidnight detailItems ::', JSON.stringify(this.dataEditSaveMNdetailItems));
      this.isLoading =true;
       for(var ss=0;ss<this.midnightTableDATAJSON.column_details.length;ss++){
              this.dataEditSaveMNdetailItems[this.midnightTableDATAJSON.column_details[ss]] = document.getElementById('midnight'+this.dataEditSaveMNrowIndex+'textbox'+(ss+1)).value;
          }
          var saveloadJSON ={
            "table_name":this.midnightTableDATAJSON.table_name,
            "user_name":this.user_name,
            "user_role":this.user_role,
            "region_id":this.midnightSubmitregionid,
            "region_name":this.midnightSubmitregionname,
            "circle_id":this.midnightSubmitcircleid,
            "circle_name":this.midnightSubmitcirclename,
            "dcu_id":this.midnightSubmitdeviceid,
            "dcu_name":this.midnightSubmitdevicename,
            "meter_id":this.midnightSubmitmeterid,
            "meter_name":this.midnightSubmitmetername,
            "date": this.midnightSubmitmidnightdate,
            "old_object":this.dataEditSaveOLDMNdetailItems,
            "new_object":this.dataEditSaveMNdetailItems,
            "audit_reason":this.dataEditReasonTXT,
            "data_details":[this.dataEditSaveMNdetailItems]
          };
          console.log('saveloadJSON :', JSON.stringify(saveloadJSON));
          axios.post(this.updatemidnightURL, saveloadJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "success") {
              this.successMessage("updated successfully");
              for(var ss=0;ss<this.midnightTableDATAJSON.column_details.length;ss++){
              document.getElementById('midnight'+this.dataEditSaveMNrowIndex+'textbox'+(ss+1)).disabled = true;
               document.getElementById('midnight'+this.dataEditSaveMNrowIndex+'savebtn').disabled = true;
              document.getElementById('midnight'+this.dataEditSaveMNrowIndex+'savebtn').classList.add("disableCSS");
              document.getElementById('midnight'+this.dataEditSaveMNrowIndex+'faiconsavebtn').classList.remove("text-green");
              document.getElementById('midnight'+this.dataEditSaveMNrowIndex+'faiconsavebtn').classList.add("text-gray");
              }
              this.$modal.hide('dataEditConfirmPopup');
              this.isLoading = false;
              return false;
            }else{
              this.warningMessage(status);
              this.isLoading = false;
               return false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
          });
      }else if(this.dataEditBTNTXT == "Billing"){
         var olditems = {};
      for (var key in this.dataEditSaveBILLdetailItems) {
        olditems[key] = this.dataEditSaveBILLdetailItems[key];
      }
      this.isLoading =true;
       for(var ss=0;ss<this.billingTableDATAJSON.column_details.length;ss++){
              this.dataEditSaveBILLdetailItems[this.billingTableDATAJSON.column_details[ss]] = document.getElementById('billing'+this.dataEditSaveBILLrowIndex+'textbox'+(ss+1)).value;
        }
          var saveloadJSON = {
            "table_name":this.billingTableDATAJSON.table_name,
            "user_name":this.user_name,
            "user_role":this.user_role,
            "region_id":this.billingSubmitregionid,
            "region_name":this.billingSubmitregionname,
            "circle_id":this.billingSubmitcircleid,
            "circle_name":this.billingSubmitcirclename,
            "dcu_id":this.billingSubmitdeviceid,
            "dcu_name":this.billingSubmitdevicename,
            "meter_id":this.billingSubmitmeterid,
            "meter_name":this.billingSubmitmetername,
            "date": this.billingSubmitbillingdate,
            "old_object":this.dataEditSaveOLDBILLdetailItems,
            "new_object":this.dataEditSaveBILLdetailItems,
            "audit_reason":this.dataEditReasonTXT,
            "data_details":[this.dataEditSaveBILLdetailItems]
          };
        console.log('saveloadJSON :', JSON.stringify(saveloadJSON))
        axios.post(this.updatebillingURL, saveloadJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "success") {
              this.successMessage("updated successfully");
              for(var ss=0;ss<this.billingTableDATAJSON.column_details.length;ss++){
              document.getElementById('billing'+this.dataEditSaveBILLrowIndex+'textbox'+(ss+1)).disabled = true;
               document.getElementById('billing'+this.dataEditSaveBILLrowIndex+'savebtn').disabled = true;
              document.getElementById('billing'+this.dataEditSaveBILLrowIndex+'savebtn').classList.add("disableCSS");
              document.getElementById('billing'+this.dataEditSaveBILLrowIndex+'faiconsavebtn').classList.remove("text-green");
              document.getElementById('billing'+this.dataEditSaveBILLrowIndex+'faiconsavebtn').classList.add("text-gray");
              }
              this.$modal.hide('dataEditConfirmPopup');
              this.isLoading = false;
              return false;
            }else{
              this.warningMessage(status);
              this.isLoading = false;
               return false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
          });
      }

    },
    editloadsurvey(rowIndex,detailItems){
      this.dataEditSaveOLDLSdetailItems = {};
      if(this.loadsurveyTableDATAJSON != ''){
        for (var key in detailItems) {
          this.dataEditSaveOLDLSdetailItems[key] = detailItems[key];
        }
        for(var index=0;index<this.loadsurveyTableDATAJSON.details.length;index++){
              document.getElementById('ls'+index+'savebtn').disabled = true;
              document.getElementById('ls'+index+'savebtn').classList.add("disableCSS");
              document.getElementById('ls'+index+'faiconsavebtn').classList.remove("text-green");
              document.getElementById('ls'+index+'faiconsavebtn').classList.add("text-gray");
        }
          document.getElementById('ls'+rowIndex+'savebtn').disabled = false;
          document.getElementById('ls'+rowIndex+'faiconsavebtn').classList.remove("text-gray");
          document.getElementById('ls'+rowIndex+'savebtn').classList.remove("disableCSS");
          document.getElementById('ls'+rowIndex+'faiconsavebtn').classList.add("text-green");
          for(var ss=0;ss<this.loadsurveyTableDATAJSON.details.length;ss++){
            for(var mm=0;mm<this.loadsurveyTableDATAJSON.column_details.length;mm++){
              document.getElementById('ls'+ss+'textbox'+(mm+1)).disabled = true;
               if(mm != 0){
              document.getElementById('ls'+rowIndex+'textbox'+(mm+1)).disabled = false;
            }
            }
          }
      }
    },
    saveloadsurvey(rowIndex,newdetailItems){
      this.dataEditSaveLSrowIndex = rowIndex;
      //console.log(JSON.stringify(this.loadsurveyTableDATAJSON.details[rowIndex])+'<<-----newdetailItems LS-::::->>'+ JSON.stringify(newdetailItems));
      this.dataEditSaveLSdetailItems = newdetailItems;
      this.dataEditBTNTXT = "Load Survey";
      this.dataEditReasonTXT = "";
      this.$modal.show('dataEditConfirmPopup');
    },
    editmidnight(rowIndex,detailItems){
       this.dataEditSaveOLDMNdetailItems = {};
      if(this.midnightTableDATAJSON != ''){
         for (var key in detailItems) {
          this.dataEditSaveOLDMNdetailItems[key] = detailItems[key];
        }
      for(var index=0;index<this.midnightTableDATAJSON.details.length;index++){
              document.getElementById('midnight'+index+'savebtn').disabled = true;
              document.getElementById('midnight'+index+'savebtn').classList.add("disableCSS");
              document.getElementById('midnight'+index+'faiconsavebtn').classList.remove("text-green");
              document.getElementById('midnight'+index+'faiconsavebtn').classList.add("text-gray");
        }
          document.getElementById('midnight'+rowIndex+'savebtn').disabled = false;
          document.getElementById('midnight'+rowIndex+'faiconsavebtn').classList.remove("text-gray");
          document.getElementById('midnight'+rowIndex+'savebtn').classList.remove("disableCSS");
          document.getElementById('midnight'+rowIndex+'faiconsavebtn').classList.add("text-green");
          for(var ss=0;ss<this.midnightTableDATAJSON.details.length;ss++){
            for(var mm=0;mm<this.midnightTableDATAJSON.column_details.length;mm++){
              document.getElementById('midnight'+ss+'textbox'+(mm+1)).disabled = true;
               if(mm != 0){
              document.getElementById('midnight'+rowIndex+'textbox'+(mm+1)).disabled = false;
            }
            }
          }
      }
    },
    savemidnight(rowIndex,detailItems){
      this.dataEditSaveMNrowIndex = rowIndex;
      this.dataEditSaveMNdetailItems = detailItems;
      this.dataEditBTNTXT = "Midnight";
      this.dataEditReasonTXT ="";
      this.$modal.show('dataEditConfirmPopup');
    },
    editbilling(rowIndex,detailItems,eleID){
      this.dataEditSaveOLDBILLdetailItems = {};
      if(this.billingTableDATAJSON != ''){
         for (var key in detailItems) {
          this.dataEditSaveOLDBILLdetailItems[key] = detailItems[key];
        }
        for(var ss=0;ss<this.billingTableDATAJSON.column_details.length;ss++){
            if(ss != 0){
              document.getElementById('billing'+rowIndex+'textbox'+(ss+1)).disabled = false;
            }
        }

        for(var index=0;index<this.billingTableDATAJSON.details.length;index++){
            document.getElementById('billing'+index+'savebtn').disabled = true;
            document.getElementById('billing'+index+'savebtn').classList.add("disableCSS");
            document.getElementById('billing'+index+'faiconsavebtn').classList.remove("text-green");
            document.getElementById('billing'+index+'faiconsavebtn').classList.add("text-gray");
        }
          document.getElementById('billing'+rowIndex+'savebtn').disabled = false;
          document.getElementById('billing'+rowIndex+'faiconsavebtn').classList.remove("text-gray");
          document.getElementById('billing'+rowIndex+'savebtn').classList.remove("disableCSS");
          document.getElementById('billing'+rowIndex+'faiconsavebtn').classList.add("text-green");
          for(var ss=0;ss<this.billingTableDATAJSON.details.length;ss++){
            for(var mm=0;mm<this.billingTableDATAJSON.column_details.length;mm++){
              document.getElementById('billing'+ss+'textbox'+(mm+1)).disabled = true;
               if(mm != 0){
              document.getElementById('billing'+rowIndex+'textbox'+(mm+1)).disabled = false;
           }
          }
          }
      }
    },
    savebilling(rowIndex,detailItems){
      this.dataEditSaveBILLrowIndex = rowIndex;
      this.dataEditSaveBILLdetailItems = detailItems;
      this.dataEditBTNTXT = "Billing";
      this.dataEditReasonTXT ="";
      this.$modal.show('dataEditConfirmPopup');
    },
     getmidnightRegionNameList(){
       this.midnightregionListArray = [];
       this.midnightTableRegionTXT = "Choose Region";
       this.midnightTableCircleTXT = "Choose Circle";
       this.midnightTableDeviceTXT = "Choose Device";
       this.midnightTableMeterTXT = "Choose Feeder";
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.midnightregionListArray = response.data.details;
          this.midnightTableRegionTXT =this.midnightregionListArray[0].REGION_ID+'$$'+this.midnightregionListArray[0].REGION_NAME;
          this.getmidnightCircleNameLst(this.midnightTableRegionTXT);
        } else {
          this.midnightregionListArray = [];
          this.midnightTableRegionTXT = "Choose Region";
          this.midnightTableCircleTXT = "Choose Circle";
          this.midnightTableDeviceTXT = "Choose Device";
          this.midnightTableMeterTXT = "Choose Feeder";
        }
      });
    },
     getmidnightCircleNameLst(regionidname){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.midnightTableCircleTXT = "Choose Circle";
       this.midnightTableDeviceTXT = "Choose Device";
       this.midnightTableMeterTXT = "Choose Feeder";
       this.midnightcircleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.midnightcircleListArray = response.data.details;
          this.midnightTableCircleTXT = this.midnightcircleListArray[0].CIRCLE_ID+'$$'+this.midnightcircleListArray[0].CIRCLE_NAME;
          this.getmidnightSSNameLst(this.midnightTableCircleTXT);
        } else {
          this.midnightcircleListArray = [];
          this.midnightTableCircleTXT = "Choose Circle";
          this.midnightTableDeviceTXT = "Choose Device";
          this.midnightTableMeterTXT = "Choose Feeder";
        }
      });
    },
    getmidnightSSNameLst(circleidName){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
       var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleid);
       this.midnightTableDeviceTXT = "Choose Device";
       this.midnightTableMeterTXT = "Choose Feeder";
       this.midnightdeviceListArray = [];
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.midnightdeviceListArray = response.data.details;
          this.midnightTableDeviceTXT = this.midnightdeviceListArray[0].DCU_ID+'$$'+this.midnightdeviceListArray[0].DCU_NAME;
          this.getmidnightmeterNameLst(this.midnightTableDeviceTXT);
        } else {
          this.midnightdeviceListArray = [];
          this.midnightTableDeviceTXT = "Choose Device";
          this.midnightTableMeterTXT = "Choose Feeder";
        }
      });
    },
      getmidnightmeterNameLst(dcuidName){
       var dcuid = dcuidName.split("$$")[0];
      var dcuname = dcuidName.split("$$")[1];
       var getSSMeterURL = this.getSSMeterURL.replace("$$dcuid$$",dcuid);
       this.midnightTableMeterTXT = "Choose Feeder";
       this.midnightmeterListArray = [];
       axios.get(getSSMeterURL).then(response => {
        if (response.data.status == "found") {
          this.midnightmeterListArray = response.data.details;
          this.midnightTableMeterTXT = this.midnightmeterListArray[0].METER_ID+'$$'+this.midnightmeterListArray[0].METER_NAME;
        } else {
          this.midnightmeterListArray = [];
          this.midnightTableMeterTXT = "Choose Feeder";
        }
      });
    },
    midnightTableMethod(){
      this.isLoading = true;
      this.midnightSubmitregionid = this.selectRegionTXT.split('$$')[0];
      this.midnightSubmitregionname = this.selectRegionTXT.split('$$')[1];
      this.midnightSubmitcircleid = this.selectCircleTXT.split('$$')[0];
      this.midnightSubmitcirclename = this.selectCircleTXT.split('$$')[1];
      this.midnightSubmitdeviceid = this.selectDeviceTXT.split('$$')[0];
      this.midnightSubmitdevicename = this.selectDeviceTXT.split('$$')[1];
      this.midnightSubmitmeterid = this.selectMeterTXT.split('$$')[0];
      this.midnightSubmitmetername = this.selectMeterTXT.split('$$')[1];
      this.midnightSubmitmidnightdate = this.datetimeformat(this.midnightTableFromdateTXT);
      var midnightJSON = {
        "region_id":this.midnightSubmitregionid,
        "region_name":this.midnightSubmitregionname,
        "circle_id":this.midnightSubmitcircleid,
        "circle_name":this.midnightSubmitcirclename,
        "dcu_id":this.midnightSubmitdeviceid,
        "dcu_name":this.midnightSubmitdevicename,
        "meter_id":this.midnightSubmitmeterid,
        "meter_name":this.midnightSubmitmetername,
        "date": this.midnightSubmitmidnightdate,
      }
       axios.post(this.getmidnightURL, midnightJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "found") {
              this.isLoading = false;
              this.midnightTableDATAJSON = response.data;
            }else{
              this.isLoading = false;
              this.midnightTableDATAJSON = "";
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
          });
    },
    loadsurveyTableMethod(){
      this.isLoading = true;
      this.lsSubmitregionid = this.selectRegionTXT.split('$$')[0];
      this.lsSubmitregionname = this.selectRegionTXT.split('$$')[1];
      this.lsSubmitcircleid = this.selectCircleTXT.split('$$')[0];
      this.lsSubmitcirclename = this.selectCircleTXT.split('$$')[1];
      this.lsSubmitdeviceid = this.selectDeviceTXT.split('$$')[0];
      this.lsSubmitdevicename = this.selectDeviceTXT.split('$$')[1];
      this.lsSubmitmeterid = this.selectMeterTXT.split('$$')[0];
      this.lsSubmitmetername = this.selectMeterTXT.split('$$')[1];
      this.lsSubmitloadsurveydate = this.datetimeformat(this.loadsurveyTableFromdateTXT);
      var lodsurveyJSON = {
        "region_id":this.lsSubmitregionid,
        "region_name":this.lsSubmitregionname,
        "circle_id":this.lsSubmitcircleid,
        "circle_name":this.lsSubmitcirclename,
        "dcu_id":this.lsSubmitdeviceid,
        "dcu_name":this.lsSubmitdevicename,
        "meter_id":this.lsSubmitmeterid,
        "meter_name":this.lsSubmitmetername,
        "date": this.lsSubmitloadsurveydate,
      }
       axios.post(this.getloadsurveyURL, lodsurveyJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "found") {
              this.isLoading = false;
              this.loadsurveyTableDATAJSON = response.data;
            }else{
              this.loadsurveyTableDATAJSON = "";
              this.isLoading = false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
          });
    },
     getbillingRegionNameList(){
       this.billingregionListArray = [];
       this.billingTableRegionTXT = "Choose Region";
       this.billingTableCircleTXT = "Choose Circle";
       this.billingTableDeviceTXT = "Choose Device";
       this.billingTableMeterTXT = "Choose Feeder";
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.billingregionListArray = response.data.details;
          this.billingTableRegionTXT = this.billingregionListArray[0].REGION_ID+'$$'+this.billingregionListArray[0].REGION_NAME;
          this.getbillingCircleNameLst(this.billingTableRegionTXT);
        } else {
          this.billingregionListArray = [];
          this.billingTableRegionTXT = "Choose Region";
       this.billingTableCircleTXT = "Choose Circle";
       this.billingTableDeviceTXT = "Choose Device";
       this.billingTableMeterTXT = "Choose Feeder";
        }
      });
    },
     getbillingCircleNameLst(regionidname){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.billingTableCircleTXT = "Choose Circle";
       this.billingTableDeviceTXT = "Choose Device";
       this.billingTableMeterTXT = "Choose Feeder";
       this.billingcircleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.billingcircleListArray = response.data.details;
          this.billingTableCircleTXT = this.billingcircleListArray[0].CIRCLE_ID+'$$'+this.billingcircleListArray[0].CIRCLE_NAME;
          this.getbillingSSNameLst(this.billingTableCircleTXT);
        } else {
          this.billingcircleListArray = [];
          this.billingTableCircleTXT = "Choose Circle";
          this.billingTableDeviceTXT = "Choose Device";
          this.billingTableMeterTXT = "Choose Feeder";
        }
      });
    },
    getbillingSSNameLst(circleidName){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
       var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleid);
       this.billingTableMeterTXT = "Choose Feeder";
       this.billingdeviceListArray = [];
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.billingdeviceListArray = response.data.details;
          this.billingTableDeviceTXT = this.billingdeviceListArray[0].DCU_ID+'$$'+this.billingdeviceListArray[0].DCU_NAME;
          this.getbillingmeterNameLst(this.billingTableDeviceTXT);
        } else {
          this.billingdeviceListArray = [];
           this.billingTableMeterTXT = "Choose Feeder";
        }
      });
    },
      getbillingmeterNameLst(dcuidName){
       var dcuid = dcuidName.split("$$")[0];
       var dcuname = dcuidName.split("$$")[1];
       var getSSMeterURL = this.getSSMeterURL.replace("$$dcuid$$",dcuid);
       this.billingTableMeterTXT = "Choose Feeder";
       this.billingmeterListArray = [];
       axios.get(getSSMeterURL).then(response => {
        if (response.data.status == "found") {
          this.billingmeterListArray = response.data.details;
          this.billingTableMeterTXT = this.billingmeterListArray[0].METER_ID+'$$'+this.billingmeterListArray[0].METER_NAME;
        } else {
          this.billingmeterListArray = [];
          this.billingTableMeterTXT = "Choose Feeder";
        }
      });
    },
     billingTableMethod(){
      this.isLoading = true;
      this.billingSubmitregionid = this.selectRegionTXT.split('$$')[0];
      this.billingSubmitregionname = this.selectRegionTXT.split('$$')[1];
      this.billingSubmitcircleid = this.selectCircleTXT.split('$$')[0];
      this.billingSubmitcirclename = this.selectCircleTXT.split('$$')[1];
      this.billingSubmitdeviceid = this.selectDeviceTXT.split('$$')[0];
      this.billingSubmitdevicename = this.selectDeviceTXT.split('$$')[1];
      this.billingSubmitmeterid = this.selectMeterTXT.split('$$')[0];
      this.billingSubmitmetername = this.selectMeterTXT.split('$$')[1];
      this.billingSubmitbillingdate = this.datetimeformat(this.billingTableFromdateTXT);
      var billingJSON = {
        "region_id":this.billingSubmitregionid,
        "region_name":this.billingSubmitregionname,
        "circle_id":this.billingSubmitcircleid,
        "circle_name":this.billingSubmitcirclename,
        "dcu_id":this.billingSubmitdeviceid,
        "dcu_name":this.billingSubmitdevicename,
        "meter_id":this.billingSubmitmeterid,
        "meter_name":this.billingSubmitmetername,
        "date": this.datetimeformat(this.billingTableFromdateTXT),
      }
       axios.post(this.getbillingURL, billingJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "found") {
              this.isLoading = false;
              this.billingTableDATAJSON = response.data;
            } else {
              this.isLoading = false;
              this.billingTableDATAJSON = "";
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
          });
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

input:disabled{
  background-color: #e1d2d2;
}

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

