<template>
  <section class="content" id="ssmanagementPANE">
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
            </div>
          <div class="col-md-12 order-md-3">
             <div class="tab" role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist">
                      <li role="presentation" class="active" id="regionTab1">
                        <a
                          href="#regionTab1PANE"
                          id="regionTab1PANEID"
                          aria-controls="region"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="regionTabSectionMethod"
                        >
                          <i class="fa fa-map-marker text-blue" aria-hidden="true"></i> &nbsp;&nbsp; Region Management
                        </a>
                      </li>
                      <li role="presentation" id="circleTab2">
                        <a
                          href="#circleTab2PANE"
                          id="circleTab2PANEID"
                          aria-controls="circle"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="circleTabSectionMethod"
                        >
                          <i class="fa fa-map-marker text-green" aria-hidden="true"></i> &nbsp;&nbsp;  Circle Management
                        </a>
                      </li>
                      <li role="presentation" id="ssTab3">
                        <a
                          href="#ssTab3PANE"
                          id="ssTab3PANEID"
                          aria-controls="ss"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="ssTabSectionMethod"
                        >
                          <i class="fa fa-map-marker text-black" aria-hidden="true"></i> &nbsp;&nbsp;  Sub Station Management
                        </a>
                      </li>
                      </ul>

                       <div class="tab-content">
                      <div role="tabpanel" class="tab-pane fade in active show" id="regionTab1PANE">
                        <p></p>
                        <div class="row">
            <div class="col-md-6 order-md-3">
              <h4 style="margin-top: 0px">Region Table List</h4>
            </div>
            <div class="col-md-6 order-md-3 text-right">
              <button id="regionaddBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff" title="Add Region" @click="addRegionPopupSHOW()">
              <img src="static/img/images/add.png" /> Add Region
            </button>
            </div>
          <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="addRegionTablePANE" style="border:1px solid lightgray" v-bind:style="{height:temptblHeight+'px'}">
                <table
                  class="table table-bordered"
                  id="addRegionTableid"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th style="width:20px;">S.No</th>
                      <th style="width:100px;" v-show="false">Region id</th>
                      <th style="width:100px;">Region Name</th>
                      <th style="width:25px;">Edit</th>
                      <th style="width:25px;">Delete</th>
                    </tr>
                  </thead>
                  <tbody v-if="regionTableDetailsJson != ''">
                    <tr
                      v-for="(items,index) in regionTableDetailsJson.details"
                      v-bind:key="index"
                    >
                      <td style="width:20px;text-align: center;vertical-align: middle;">{{index+1}}</td>
                      <td style="width:20px;text-align: center;vertical-align: middle;" v-show="false">{{items.REGION_ID}}</td>
                      <td style="width:150px;text-align: center;vertical-align: middle;">{{items.REGION_NAME}}</td>
                      <td style="width:25px;vertical-align: middle">
                          <input type="image" class="pointer"
                                  src="static/img/images/edit.png"
                                  title="Edit a Region" @click="regionEditFunction(items.S_NO,index)"
                                  :id="'region_EditBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                      </td>
                      <td style="width:25px;vertical-align: middle">
                         <input  type="image" class="pointer"
                                  src="static/img/images/delete.png"
                                  title="Delete a Region" @click="regionDeleteFunction(items.S_NO,index)"
                                  :id="'region_deleteBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                      </td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="regionTableDetailsJson == ''" style="text-align:center;width: 100%;">
                      <span>No Records Found</span>
                 </div>
              </div>
            </template>
          </div>
        </div>
              </div>


              <div role="tabpanel" class="tab-pane fade" id="circleTab2PANE">
                        <p></p>
                     <div class="row">
            <div class="col-md-6 order-md-3">
              <h4 style="margin-top: 0px">Circle Table List</h4>
            </div>
            <div class="col-md-6 order-md-3 text-right">
              <button id="circleaddBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff" title="Add Circle" @click="addCirclePopupSHOW()">
              <img src="static/img/images/add.png" /> Add Circle
            </button>
            </div>
          <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="addCircleTablePANE" style="border:1px solid lightgray" v-bind:style="{height:temptblHeight+'px'}">
                <table
                  class="table table-bordered"
                  id="addCircleTableid"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th style="width:20px;">S.No</th>
                      <th style="width:100px;" v-show="false">Region id</th>
                      <th style="width:100px;">Region Name</th>
                      <th style="width:100px;">Circle Name</th>
                      <th style="width:25px;">Edit</th>
                      <th style="width:25px;">Delete</th>
                    </tr>
                  </thead>
                  <tbody v-if="circleTableDetailsJson != ''">
                    <tr
                      v-for="(items,index) in circleTableDetailsJson.details"
                      v-bind:key="index"
                    >
                      <td style="width:20px;text-align: center;vertical-align: middle;">{{index+1}}</td>
                      <td style="width:20px;text-align: center;vertical-align: middle;" v-show="false">{{items.REGION_ID}}</td>
                      <td style="width:150px;text-align: center;vertical-align: middle;">{{items.REGION_NAME}}</td>
                      <td style="width:150px;text-align: center;vertical-align: middle;">{{items.CIRCLE_NAME}}</td>
                      <td style="width:25px;vertical-align: middle">
                          <input type="image" class="pointer"
                                  src="static/img/images/edit.png"
                                  title="Edit a Circle" @click="circleEditFunction(items.S_NO,index)"
                                  :id="'circle_EditBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                      </td>
                      <td style="width:25px;vertical-align: middle">
                         <input  type="image" class="pointer"
                                  src="static/img/images/delete.png"
                                  title="Delete a Circle" @click="circleDeleteFunction(items.S_NO,index)"
                                  :id="'circle_deleteBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                      </td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="circleTableDetailsJson == ''" style="text-align:center;width: 100%;">
                      <span>No Records Found</span>
                 </div>
              </div>
            </template>
          </div>
        </div>
                      </div>


                      <div role="tabpanel" class="tab-pane fade" id="ssTab3PANE">
                       <div class="row">
            <div class="col-md-6 order-md-3">
              <h4>Sub Station Table List</h4>
            </div>
            <div class="col-md-6 order-md-3 text-right">
              <button id="subStationaddBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff;margin-top:10px" title="Add Sub Station" @click="addSubStationPopupSHOW()">
              <img src="static/img/images/add.png" /> Add Sub Station
            </button>
            </div>
          <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="addSubStationTablePANE" style="border:1px solid lightgray" v-bind:style="{height:temptblHeight+'px'}">
                <table
                  class="table table-bordered"
                  id="addSubStationTableid"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th style="width:20px;">S.No</th>
                      <th style="width:100px;" v-show="false">Region id</th>
                      <th style="width:100px;">Region Name</th>
                      <th style="width:100px;">Circle Name</th>
                      <th style="width:100px;">Sub Station Name</th>
                      <th style="width:100px;">Sub Station Rating</th>
                      <th style="width:100px;">SS Latitude</th>
                      <th style="width:100px;">SS Longitude</th>
                      <th style="width:25px;">Edit</th>
                      <th style="width:25px;">Delete</th>
                    </tr>
                  </thead>
                  <tbody v-if="substationTableDetailsJson != ''">
                    <tr
                      v-for="(items,index) in substationTableDetailsJson.details"
                      v-bind:key="index"
                    >
                      <td style="width:20px;text-align: center;vertical-align: middle;">{{index+1}}</td>
                      <td style="width:20px;text-align: center;vertical-align: middle;" v-show="false">{{items.REGION_ID}}</td>
                      <td style="width:150px;text-align: center;vertical-align: middle;">{{items.REGION_NAME}}</td>
                      <td style="width:150px;text-align: center;vertical-align: middle;">{{items.CIRCLE_NAME}}</td>
                      <td style="width:150px;text-align: center;vertical-align: middle;">{{items.SS_NAME}}</td>
                      <td style="width:150px;text-align: center;vertical-align: middle;">{{items.SS_RATING}}</td>
                      <td style="width:150px;text-align: center;vertical-align: middle;">{{items.SS_LAT}}</td>
                      <td style="width:150px;text-align: center;vertical-align: middle;">{{items.SS_LONG}}</td>
                      <td style="width:25px;vertical-align: middle">
                          <input type="image" class="pointer"
                                  src="static/img/images/edit.png"
                                  title="Edit a Sub Station" @click="substationEditFunction(items.S_NO,index)"
                                  :id="'ss_EditBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                      </td>
                      <td style="width:25px;vertical-align: middle">
                         <input  type="image" class="pointer"
                                  src="static/img/images/delete.png"
                                  title="Delete a Sub Station" @click="substationDeleteFunction(items.S_NO,index)"
                                  :id="'ss_deleteBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                      </td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="substationTableDetailsJson == ''" style="text-align:center;width: 100%;">
                      <span>No Records Found</span>
                 </div>
              </div>
            </template>
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

    <modal name="addRegionPopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
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
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{addRegionPopupTITLE}}</h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="addRegionCloseBTN" type="button" class="btn btn-default" @click="addRegionPopupHIDE" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
             <div class="row">
              <div class="col-lg-4">
                <p>Region Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​<input type="text" class="inputTEXTcss" id="addRegionTXT" v-model="addRegionTXT" />
              </div>
            </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
          <a id="regionSaveBTN" type="button" class="btn bgBtn btnPadding"  style="color:#fff;background:green;" @click="regionSaveBTNFunction()">{{regionSaveBTNTXT}}</a>
          <a id="regionConfrimclseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="addRegionPopupHIDE()">Cancel</a>
          </div>
          </div>
          </modal>

        <modal name="addCirclePopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
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
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{addCirclePopupTITLE}}</h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="addCircleCloseBTN" type="button" class="btn btn-default" @click="addCirclePopupHIDE" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div class="row">
              <div class="col-lg-4">
                <p>Region Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss" id="circleTxtRegionNameTXT" v-model="circleTxtRegionNameTXT">
															  <option value='Choose Region' selected disabled>Choose Region</option>
                                <option v-for="(items,index) in regionTABListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
															</select>
              </div>
            </div>
            <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Circle Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​<input type="text" class="inputTEXTcss" id="addCircleTXT" v-model="addCircleTXT" />
              </div>
            </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
          <a id="circleSaveBTN" type="button" class="btn bgBtn btnPadding"  style="color:#fff;background:green;" @click="circleSaveBTNFunction()">{{regionSaveBTNTXT}}</a>
          <a id="circleConfrimclseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="addCirclePopupHIDE()">Cancel</a>
          </div>
          </div>
          </modal>

          <modal name="addSSPopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true" style="z-index:1111 !important"
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
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{addSSPopupTITLE}}</h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="addSSCloseBTN" type="button" class="btn btn-default" @click="addSSPopupHIDE" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div class="row">
              <div class="col-lg-4">
                <p>Region Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss" id="ssTxtRegionNameTXT" v-model="ssTxtRegionNameTXT" @change="getCircleNameLst(ssTxtRegionNameTXT)">
															  <option value='Choose Region' selected disabled>Choose Region</option>
                                <option v-for="(items,index) in regionTABListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
															</select>
              </div>
            </div>
            <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Circle Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss" id="ssTxtCircleNameTXT" v-model="ssTxtCircleNameTXT">
															  <option value='Choose Circle' selected disabled>Choose Circle</option>
                                <option v-for="(items,index) in circleTABListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME" >{{items.CIRCLE_NAME}}</option>
								</select>
              </div>
            </div>
            <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Sub Station Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​<input type="text" class="inputTEXTcss" id="ssTxtSSNameTXT" v-model="ssTxtSSNameTXT" />
              </div>
            </div>
             <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Sub Station Rating :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss" id="ssTxtSSRatingTXT" v-model="ssTxtSSRatingTXT">
															  <option value='Choose Rating' selected disabled>Choose Rating</option>
                                <option v-for="(items,index) in ratingTABListArray" :key="index" :value="items.ss_rating" >{{items.ss_rating}}</option>
								</select>
              </div>
            </div>
             <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Sub Station Latitude :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​<input type="text" class="inputTEXTcss" id="ssTxtSSLatitudeTXT" v-model="ssTxtSSLatitudeTXT" @keydown.space.prevent @keypress="onlyallowLatitudeFloat($event)"/>
              </div>
            </div>
            <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Sub Station Longitude :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​<input type="text" class="inputTEXTcss" id="ssTxtSSLongitudeTXT" @keydown.space.prevent @keypress="onlyallowLongitudeFloat($event)" v-model="ssTxtSSLongitudeTXT" />
              </div>
            </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
          <a id="ssSaveBTN" type="button" class="btn bgBtn btnPadding"  style="color:#fff;background:green;" @click="ssSaveBTNFunction()">{{substationSaveBTNTXT}}</a>
          <a id="ssConfrimclseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="addSSPopupHIDE()">Cancel</a>
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
  name: 'ssmangementpage',
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
      addRegionPopupTITLE:'Add Region',
      addRegionTXT:'',
      regionTableDetailsJson:'',
      regionSaveBTNTXT:'Save',
      regionUpdateId:'',
      temptblHeight:'',
      addCirclePopupTITLE:'Add Circle',
      circleTxtRegionNameTXT:'Choose Region',
      regionTABListArray:[],
      addCircleTXT:'',
      circleUpdateId:'',
      circleTABListArray:[],
      circleTableDetailsJson:'',
      substationTableDetailsJson:'',
      ssTxtRegionNameTXT:'Choose Region',
      ssTxtCircleNameTXT:'Choose Circle',
      ssTxtSSNameTXT:'',
      ssTxtSSRatingTXT:'Choose Rating',
      ratingTABListArray:[],
      ssTxtSSLatitudeTXT:'',
      ssTxtSSLongitudeTXT:'',
      ssUpdateId:'',
      substationSaveBTNTXT:'Save',
      addSSPopupTITLE:'Add Sub Station',

    }
  },
  created(){
  },
  mounted () {
     this.isLoading = true;
    let innerMinHeight = window.innerHeight -125 + "px";
    this.temptblHeight = window.innerHeight - 286;
    document.getElementById("ssmanagementPANE").style.height = innerMinHeight;
    this.getRegionlistMethod();
    this.ssratinglistMethod();
    // this.getCirclelistMethod();
    // this.getSSlistMethod();
     this.isLoading = false;
  },
  watch:{
  },
  methods: {
    regionTabSectionMethod() {
      this.isLoading = true;
      document.getElementById("regionTab1").classList.add("active");
      document.getElementById("circleTab2").classList.remove("active");
      document.getElementById("ssTab3").classList.remove("active");
      document.getElementById("regionTab1PANE").classList.add("in", "active", "show");
      document.getElementById("circleTab2PANE").classList.remove("in", "active", "show");
      document.getElementById("ssTab3PANE").classList.remove("in", "active", "show");
      this.getRegionlistMethod();
      this.isLoading = false;
      },
      circleTabSectionMethod() {
        this.isLoading = true;
      document.getElementById("circleTab2").classList.add("active");
      document.getElementById("regionTab1").classList.remove("active");
      document.getElementById("ssTab3").classList.remove("active");
      document.getElementById("circleTab2PANE").classList.add("in", "active", "show");
      document.getElementById("regionTab1PANE").classList.remove("in", "active", "show");
      document.getElementById("ssTab3PANE").classList.remove("in", "active", "show");
      this.getCirclelistMethod();
      this.isLoading = false;
      },
      ssTabSectionMethod() {
        
      document.getElementById("ssTab3").classList.add("active");
      document.getElementById("regionTab1").classList.remove("active");
      document.getElementById("circleTab2").classList.remove("active");
      document.getElementById("ssTab3PANE").classList.add("in", "active", "show");
      document.getElementById("regionTab1PANE").classList.remove("in", "active", "show");
      document.getElementById("circleTab2PANE").classList.remove("in", "active", "show");
      this.getSSlistMethod();
      this.isLoading = false;
      },
    getCircleNameLst(regionidname){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
      this.ssTxtCircleNameTXT = "Choose Circle";
      var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
      this.circleTABListArray = [];
      axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.circleTABListArray = response.data.details;
        } else {
          this.ssTxtCircleNameTXT = "Choose Circle";
          this.circleTABListArray = [];
        }
      });
    },
    ssratinglistMethod(){
      console.log('this.getsubstationRatingURL :', this.getsubstationRatingURL);
      axios.get(this.getsubstationRatingURL).then(response => {
        if (response.data.status == "found") {
          this.ratingTABListArray = response.data.details;
        } else {
          this.ssTxtSSRatingTXT = "Choose Rating";
          this.ratingTABListArray = [];
        }
      });
    },
    getEditCircleNameLst(regionidname,rowIndex){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
      this.ssTxtCircleNameTXT = "Choose Circle";
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.circleTABListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.circleTABListArray = response.data.details;
          console.log('..>', this.substationTableDetailsJson.details[rowIndex].CIRCLE_ID+"$$"+this.substationTableDetailsJson.details[rowIndex].CIRCLE_NAME);
          this.ssTxtCircleNameTXT = this.substationTableDetailsJson.details[rowIndex].CIRCLE_ID+"$$"+this.substationTableDetailsJson.details[rowIndex].CIRCLE_NAME;
        } else {
          this.ssTxtCircleNameTXT = "Choose Circle";
          this.circleTABListArray = [];
        }
      });
    },
    getRegionlistMethod() {
     this.regionTableDetailsJson = "";
     this.regionTABListArray= [];
     axios.get(this.regionlistURL).then(response => {
        if (response.data.status == "found") {
          this.regionTableDetailsJson = response.data;
          this.regionTABListArray = response.data.details;
        } else {
          this.regionTABListArray = [];
          this.regionTableDetailsJson = "";
        }
      });
    },
    getCirclelistMethod() {
      this.circleTableDetailsJson = "";
      this.circleTABListArray = [];
     axios.get(this.circlelistURL).then(response => {
        if (response.data.status == "found") {
          this.circleTableDetailsJson = response.data;
          this.circleTABListArray = response.data.details;
        } else {
          this.circleTABListArray = [];
          this.circleTableDetailsJson = "";
        }
      });
    },
    getSSlistMethod() {
      this.isLoading = true;
      this.substationTableDetailsJson = "";
     axios.get(this.substationlistURL).then(response => {
        if (response.data.status == "found") {
          this.substationTableDetailsJson = response.data;
          this.isLoading = false;
        } else {
          this.substationTableDetailsJson = "";
           this.isLoading = false;
        }
      });
    },
    beforeOpen () {
    },
    beforeClose () {
    },
    opened (e) {
    },
    closed (e) {
    },
    substationEditFunction(id,rowIndex){
      this.substationSaveBTNTXT = "Update";
      this.ssUpdateId = id;
      this.addSSPopupTITLE= 'Update Sub Station';
      console.log('-->>', JSON.stringify(this.substationTableDetailsJson.details))
      this.ssTxtRegionNameTXT = this.substationTableDetailsJson.details[rowIndex].REGION_ID+"$$"+this.substationTableDetailsJson.details[rowIndex].REGION_NAME;
      this.getEditCircleNameLst(this.ssTxtRegionNameTXT,rowIndex);
      this.ssTxtSSNameTXT = this.substationTableDetailsJson.details[rowIndex].SS_NAME;
      this.ssTxtSSRatingTXT = this.substationTableDetailsJson.details[rowIndex].SS_RATING;
      this.ssTxtSSLatitudeTXT = this.substationTableDetailsJson.details[rowIndex].SS_LAT;
      this.ssTxtSSLongitudeTXT = this.substationTableDetailsJson.details[rowIndex].SS_LONG;
      this.$modal.show('addSSPopup');
    },
    substationDeleteFunction(id,rowIndex){
      this.ssUpdateId = id;
      var ssname = this.substationTableDetailsJson.details[rowIndex].SS_NAME;
      var alertval = confirm("Do you want to delete in this Sub Station - " + this.substationTableDetailsJson.details[rowIndex].SS_NAME);
      if (alertval) {
        this.isLoading = true;
        this.regionUpdateId = id;
        var deleteUrl1 = this.deletesubstationURL.replace("$$substationid$$", this.ssUpdateId).replace("$$username$$", this.user_name).replace("$$userrole$$", this.user_role);
        axios.get(deleteUrl1).then(response => {
          if (response.data.status != null && response.data.status.includes('Success')) {
            this.getSSlistMethod();
            this.successMessage(ssname + " - deleted successfully");
            this.isLoading = false;
            return true;
          }else{
            alert(response.data.status);
            this.isLoading = false;
            return true;
          }
        });
      } else {
        this.isLoading = false;
        return false;
      }
    },
    regionEditFunction(id,rowIndex){
      this.regionSaveBTNTXT = "Update";
      this.regionUpdateId = id;
      this.addRegionPopupTITLE= 'Update Region';
      this.addRegionTXT = this.regionTableDetailsJson.details[rowIndex].REGION_NAME;
      this.$modal.show('addRegionPopup');
    },
    regionDeleteFunction(id,rowIndex){
      var regionname = this.regionTableDetailsJson.details[rowIndex].REGION_NAME;
       var alertval = confirm("Do you want to delete in this Region - " + this.regionTableDetailsJson.details[rowIndex].REGION_NAME);
      if (alertval) {
        this.isLoading = true;
        this.regionUpdateId = id;
        var deleteUrl1 = this.deleteregionURL.replace("$$regionno$$", this.regionUpdateId).replace("$$username$$", this.user_name).replace("$$userrole$$", this.user_role);;
        axios.get(deleteUrl1).then(response => {
          if (response.data.status.includes('Success')) {
            this.getRegionlistMethod();
            this.successMessage(regionname + " - deleted successfully");
          this.isLoading = false;
          }else{
            alert(response.data.status);
            this.isLoading = false;
            return true;
          }
        });
        return true;
      } else {
        this.isLoading = false;
        return false;
      }
    },
    circleEditFunction(id,rowIndex){
      this.circleSaveBTNTXT = "Update";
      this.circleUpdateId = id;
      this.addCirclePopupTITLE= 'Update Circle';
      this.circleTxtRegionNameTXT = this.circleTableDetailsJson.details[rowIndex].REGION_ID +"$$"+ this.circleTableDetailsJson.details[rowIndex].REGION_NAME;
      this.addCircleTXT = this.circleTableDetailsJson.details[rowIndex].CIRCLE_NAME;
      this.$modal.show('addCirclePopup');
    },
    circleDeleteFunction(id,rowIndex){
      var circlename = this.circleTableDetailsJson.details[rowIndex].CIRCLE_NAME;
      this.circleUpdateId = id;
       var alertval = confirm("Do you want to delete in this Circle - " + this.circleTableDetailsJson.details[rowIndex].CIRCLE_NAME);
      if (alertval) {
        this.isLoading = true;
        this.regionUpdateId = id;
        var deleteUrl1 = this.deletecircleURL.replace("$$circleno$$", this.circleUpdateId).replace("$$username$$", this.user_name).replace("$$userrole$$", this.user_role);
        axios.get(deleteUrl1).then(response => {
          if (response.data.status.includes('Success')) {
            this.successMessage(circlename + " - deleted successfully");
            this.getCirclelistMethod();
            this.isLoading = false;
            return true;
          }else{
            alert(response.data.status);
            this.isLoading = false;
            return true;
          }
        });
      } else {
        this.isLoading = false;
        return false;
      }
    },
    addSubStationPopupSHOW(){
      this.getRegionlistMethod();
      this.ssTxtRegionNameTXT = 'Choose Region';
      this.circleTABListArray = [];
      this.ssTxtCircleNameTXT = 'Choose Circle';
      this.substationSaveBTNTXT = "Save";
      this.ssUpdateId = '';
      this.ssTxtSSNameTXT = "";
      this.ssTxtSSRatingTXT = "Choose Rating";
      this.ssTxtSSLatitudeTXT= "";
      this.ssTxtSSLongitudeTXT= "";
      this.addSSPopupTITLE = 'Add Sub Station';
      this.$modal.show('addSSPopup');
    },
    addSSPopupHIDE(){
      this.$modal.hide('addSSPopup');
    },
    ssSaveBTNFunction(){
      if(this.ssTxtRegionNameTXT == 'Choose Region'){
          this.warningMessage('Please choose any one region name.');
          return false;
      }
      if(this.ssTxtCircleNameTXT == 'Choose Circle'){
        this.warningMessage('Please choose any one circle name.');
        return false;
      }
      if(this.ssTxtSSNameTXT == ""){
        this.warningMessage('Please enter sub station name');
        return false;
      }
      if(this.ssTxtSSRatingTXT == "Choose Rating"){
        this.warningMessage('Please choose any one sub station rating');
        return false;
      }
      
       if(this.ssTxtSSLatitudeTXT == ""){
        this.warningMessage('Please enter sub station latitude');
        return false;
      }
       if(this.ssTxtSSLongitudeTXT == ""){
        this.warningMessage('Please enter sub station longitude');
        return false;
      }
      if(this.substationSaveBTNTXT == "Save"){
         var savessJSON = {
            "user_name":this.user_name,
            "user_role":this.user_role,
            "region_id":this.ssTxtRegionNameTXT.split('$$')[0],
            "region_name":this.ssTxtRegionNameTXT.split('$$')[1],
            "circle_id":this.ssTxtCircleNameTXT.split('$$')[0],
            "circle_name":this.ssTxtCircleNameTXT.split('$$')[1],
            "ss_name":this.ssTxtSSNameTXT,
            "ss_rating":this.ssTxtSSRatingTXT,
            "ss_lat":this.ssTxtSSLatitudeTXT,
            "ss_long":this.ssTxtSSLongitudeTXT,
          };
          console.log('savessJSON :', JSON.stringify(savessJSON));
          axios.post(this.addsubstationURL, savessJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "success") {
            this.successMessage(this.ssTxtSSNameTXT+" - Sub Station added successfully");
            this.$modal.hide('addSSPopup');
            this.getSSlistMethod();
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
            this.warningMessage("CircleSaveBTN function error::" + error.message);
          });

      } else {
          var editssJSON = {
            "s_no":this.ssUpdateId,
            "user_name":this.user_name,
            "user_role":this.user_role,
            "region_id":this.ssTxtRegionNameTXT.split('$$')[0],
            "region_name":this.ssTxtRegionNameTXT.split('$$')[1],
            "circle_id":this.ssTxtCircleNameTXT.split('$$')[0],
            "circle_name":this.ssTxtCircleNameTXT.split('$$')[1],
            "ss_name":this.ssTxtSSNameTXT,
            "ss_rating":this.ssTxtSSRatingTXT,
            "ss_lat":this.ssTxtSSLatitudeTXT,
            "ss_long":this.ssTxtSSLongitudeTXT,
          };
          console.log('editssJSON :', JSON.stringify(editssJSON));
          axios.post(this.updatesubstationURL, editssJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "Updated Success") {
            this.getSSlistMethod();
            this.successMessage(this.ssTxtSSNameTXT+" - Sub Station updated successfully");
            this.$modal.hide('addSSPopup');
            this.isLoading = false;
            return false;
            } else {
            this.warningMessage(status);
             this.$modal.hide('addSSPopup');
            this.isLoading = false;
            return false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("SS SaveBTN function error::" + error.message);
          });
      }
    },
    addRegionPopupSHOW(){
      this.regionSaveBTNTXT = "Save";
      this.addRegionTXT = "";
      this.regionUpdateId= "";
      this.addRegionPopupTITLE = 'Add Region';
      this.$modal.show('addRegionPopup');
    },
    addRegionPopupHIDE(){
        this.$modal.hide('addRegionPopup');
    },
    addCirclePopupSHOW(){
      this.circleSaveBTNTXT = "Save";
      this.addCircleTXT = "";
      this.circleUpdateId= "";
      this.addCirclePopupTITLE= 'Add Circle';
      this.$modal.show('addCirclePopup');
    },
    addCirclePopupHIDE(){
        this.$modal.hide('addCirclePopup');
    },
    circleSaveBTNFunction(){
      this.isLoading = true;
      if(this.circleTxtRegionNameTXT == 'Choose Region'){
            this.warningMessage('Please choose any one region name.');
            return false;
          }
          if(this.addCircleTXT == ''){
            this.warningMessage('Please enter circle name.');
            return false;
          }
          if(this.circleSaveBTNTXT == "Save"){
           var savecircleJSON = {
            "user_name":this.user_name,
            "user_role":this.user_role,
            "region_id":this.circleTxtRegionNameTXT.split('$$')[0],
            "region_name":this.circleTxtRegionNameTXT.split('$$')[1],
            "circle_name":this.addCircleTXT
          };
          console.log('savecircleJSON :', JSON.stringify(savecircleJSON));
          axios.post(this.addcircleURL, savecircleJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "success") {
            this.successMessage(this.addCircleTXT+" - Circle added successfully");
            this.$modal.hide('addCirclePopup');
            this.getCirclelistMethod();
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
            this.warningMessage("CircleSaveBTN function error::" + error.message);
          });
          }else{
            this.isLoading = false;
             for(var kk = 0;kk <this.circleTableDetailsJson.details.length;kk++){
              if(this.circleUpdateId != this.circleTableDetailsJson.details[kk].S_NO){
              if(this.addCircleTXT.toLowerCase() == this.circleTableDetailsJson.details[kk].CIRCLE_NAME.toLowerCase()){
                this.warningMessage("Circle Name already configured, please enter new circle name.");
                this.isLoading = false;
                return false;
              }
              }
            }
          var editcircleJSON = {
            "s_no":this.circleUpdateId,
            "user_name":this.user_name,
            "user_role":this.user_role,
            "region_id":this.circleTxtRegionNameTXT.split('$$')[0],
            "region_name":this.circleTxtRegionNameTXT.split('$$')[1],
            "circle_name":this.addCircleTXT,
          };
          console.log('editcircleJSON :', JSON.stringify(editcircleJSON));
          axios.post(this.updatecircleURL, editcircleJSON)
          .then(response => {
            var status = response.data.status;
            if (status.includes('Updated Success')) {
            this.successMessage(this.addCircleTXT+" - Updated successfully");
            this.$modal.hide('addCirclePopup');
            this.getCirclelistMethod();
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
            this.warningMessage("saveregionJSON function error::" + error.message);
          });

          }
    },
    regionSaveBTNFunction(){
      this.isLoading = true;
          if(this.addRegionTXT == ''){
            this.warningMessage('Please enter region name.');
            return false;
          }
          if(this.regionSaveBTNTXT == "Save"){
          var saveregionJSON = {
            "user_name":this.user_name,
            "user_role":this.user_role,
            "region_name":this.addRegionTXT
          };
          console.log('saveregionJSON :', JSON.stringify(saveregionJSON));
          axios.post(this.addregionURL, saveregionJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "success") {
            this.successMessage(this.addRegionTXT+" - Region added successfully");
            this.$modal.hide('addRegionPopup');
            this.getRegionlistMethod();
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
            this.warningMessage("regionSaveBTN function error::" + error.message);
          });
          } else {
            // edit Mode
            for(var kk = 0;kk <this.regionTableDetailsJson.details.length;kk++){
              if(this.regionUpdateId != this.regionTableDetailsJson.details[kk].S_NO){
              if(this.addRegionTXT.toLowerCase() == this.regionTableDetailsJson.details[kk].REGION_NAME.toLowerCase()){
                this.warningMessage("Region Name already configured, please enter new region name.");
                this.isLoading = false;
                return false;
              }
              }
            }
          var editregionJSON = {
            "s_no":this.regionUpdateId,
            "user_name":this.user_name,
            "user_role":this.user_role,
            "region_name":this.addRegionTXT
          };
          console.log('editregionJSON :', JSON.stringify(editregionJSON));
          axios.post(this.updateregionURL, editregionJSON)
          .then(response => {
            var status = response.data.status;
            if (status.includes('Updated Success')) {
            this.successMessage(this.addRegionTXT+" - Updated successfully");
            this.$modal.hide('addRegionPopup');
            this.getRegionlistMethod();
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
            this.warningMessage("saveregionJSON function error::" + error.message);
          });
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
    onlyallowLatitudeFloat ($event) {
       // console.log($event.keyCode); //keyCodes value
       let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode != 46 ||this.ssTxtSSLatitudeTXT.indexOf('.') != -1) && (keyCode < 48 || keyCode > 57) || (keyCode == 46 && this.ssTxtSSLatitudeTXT.start == 0) ) {
          $event.preventDefault();
        }
      if(this.ssTxtSSLatitudeTXT.indexOf('.') == 0) {
           this.ssTxtSSLatitudeTXT.val(this.ssTxtSSLatitudeTXT.val().substring(1));
  }

      
     },
      onlyallowLongitudeFloat ($event) {
       // console.log($event.keyCode); //keyCodes value
       let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
        if ((keyCode != 46 ||this.ssTxtSSLongitudeTXT.indexOf('.') != -1) && (keyCode < 48 || keyCode > 57) || (keyCode == 46 && this.ssTxtSSLongitudeTXT.start == 0) ) {
          $event.preventDefault();
        }
      if(this.ssTxtSSLongitudeTXT.indexOf('.') == 0) {
           this.ssTxtSSLongitudeTXT.val(this.ssTxtSSLongitudeTXT.val().substring(1));
  }

      
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

