<template>
  <!-- Main content -->
  <section class="content" id="dashboardmainPANE">
      <vue-element-loading :active="isLoading" spinner="line-wave" color="green" :is-full-screen="true"/>
    <!-- GitHub hint -->
    <div class="row">
      <!-- Info boxes -->
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span class="bg-theme" style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff">&nbsp;&nbsp;&nbsp;&nbsp;Connectivity&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="bg-theme info-box-icon" style="width: 60px;">
            <i class="fa fa-wifi" style="color:#fff"></i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">{{connectivtyPer}}</span>
            <span class="info-box-number text-right" style="font-size:13px;margin-top:7px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> {{connectivtyPertime}}
            <!-- <i class="fa fa-circle text-green"></i>&nbsp;30% &nbsp;&nbsp;  <i class="fa fa-circle text-red"></i>&nbsp;30% -->
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span
          class="bg-theme"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Last 30 days Avg Connectivity&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="bg-theme info-box-icon" style="width: 60px;">
            <img src="/static/img/images/connectivity_month_avg.png" style="margin-top: -10px;" />
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">{{connectivty30Per}}</span>
            <span class="info-box-number text-right" style="font-size:12px;margin-top:7px;margin-left: -5px;">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
              {{connectivty30Pertime}}
            </span>
          </div>
        </div>
      </div>

      <div class="col-md-2 col-sm-6 col-xs-12">
        <span class="bg-theme2"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Data Availability&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="bg-theme2 info-box-icon" style="width: 60px;">
            <!-- <i class="fa fa-crosshairs" style="color:#fff"></i> -->
            <img src="/static/img/images/data_aval1.png" style="margin-top: -10px;" />
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">{{dataAvlper}}</span>
            <span class="info-box-number text-right" style="font-size:13px;margin-top:7px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>   {{dataAvlpertime}}
             <!--<i class="fa fa-circle text-green"></i>&nbsp;30% &nbsp;&nbsp;  <i class="fa fa-circle text-red"></i>&nbsp;30%-->
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span
          class="bg-theme2"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Last 30 days Avg Data Availability&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="bg-theme2 info-box-icon" style="width: 60px;">
            <img src="/static/img/images/data_aval_month1.png" style="margin-top: -10px;" />
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">{{dataAvl30per}}</span>
            <span class="info-box-number text-right" style="font-size:12px;margin-top:7px;margin-left: -5px;">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
              {{dataAvl30pertime}}
            </span>
          </div>
        </div>
      </div>

      <!-- /.col -->
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span
          class="bg-theme"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;DCU Online Count&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="bg-theme info-box-icon" style="width: 60px;">
            <img src="/static/img/images/dcudashboard.png" style="margin-top: -10px;" />
            <!-- <i class="fa fa-desktop" style="color:#fff"></i> -->
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">{{ducinstallONLINEcount}} / {{ducinstallcount}}</span>
            <span class="info-box-number text-right" style="font-size:13px;margin-top:7px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
              {{ducinstallcounttime}}
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span class="bg-theme2" style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff">
          &nbsp;&nbsp;&nbsp;&nbsp;Date & Time&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <div class="info-box outerline">
          <span class="bg-theme2 info-box-icon" style="width: 60px;">
            <i class="fa fa-clock-o" style="color:#fff"></i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">{{currtime}}</span>
            <span class="info-box-number text-right" style="font-size:13px;margin-top:7px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i>
              {{currdate}}
            </span>
          </div>
        </div>
      </div>

      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>

    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-md-12 col-sm-6 col-xs-12">
        <div class="box" style="height:500px;">
          <div class="box-header with-border">
            <h3 class="box-title" style="color:#174b79">WASA - Wide Area Situational Awareness </h3> 
            <div style="float:right">
              <img src="/static/img/images/greenmarker.png" width="10" /> - Communicating
              <img src="/static/img/images/redmarker.png" width="10" /> - Not Communicating
              <img src="/static/img/images/orangemarker.png" width="10" /> - Not Configured
            </div>
          </div>
          <div class="box-body">
            <div class="col-sm-10 col-xs-12">
              <gmap-map
                ref="mymap"
                :center="startLocation"
                :zoom="mapzoom"
                :fullscreenControl="false"
                style="width: 100%; height: 440px"
              >
                <gmap-info-window
                  :options="infoOptions"
                  :position="infoPosition"
                  :opened="infoOpened"
                  @closeclick="infoOpened=false"
                >
                  <div class="col-lg-12">
                     Region Name:
                    <b> {{selectregionName}}</b>
                    <br />
                    Circle Name:
                    <b> {{selectcircleName}}</b>
                    <br />
                    Sub Station Name:
                    <b> {{selectSSlocationName}}</b>
                    <br />
                    IP Address:
                    <b> {{selectSSipAddress}}</b>
                    <br />
                    <!-- Person Name:
                    <b> {{selectSSPerson}}</b>
                    <br />
                    Phone :
                    <b> {{selectSSphNum}}</b>
                    <br /> -->
                    Latitude & Longitude:
                    <b> {{infolat}} & {{infolng}}</b>
                    <br /><br />
                    <button class="btn btn-success btn-sm" @click="showSSdetailspopup" v-show="false"> View more details.. </button>
                    <button class="btn btn-success btn-sm" @click="callSubStationPage()"><i class="fa fa-external-link" aria-hidden="true"></i> &nbsp; View more details.. </button>
                  </div>
                </gmap-info-window>

                <gmap-marker
                  v-for="(item, key) in coordinates"
                  :key="key"
                  :icon="item.icon"
                  :position="getPosition(item)"
                  :clickable="true"
                  @click="toggleInfo(item, key)"
                />
              </gmap-map>
            </div>
            <div class="col-sm-2 col-xs-12">
              <h4 style="color:#174b79 !important;font-weight:bold">Region Wise</h4>
              <div class="control_wrapper">
                 <ejs-treeview id='regionwiseTreeview' :fields="fields" :allowMultiSelection='false' :selectedNodes="selectedNodes" :nodeSelected="nodeRegionSelected"></ejs-treeview>
              </div>
            <!--  <div class="form-check form-check-inline"  v-for="(regionItem,index) in regionListArray"  :key="index">
                <i class="fa fa-map-marker" style="color:#007cc6"></i> &nbsp; &nbsp;
                <input  class="form-check-input" type="radio" name="Radios" :id="'radios'+index" :value="regionItem.name" @click="regionCLICKmethod(regionItem.name,regionItem.name,false)"/>
                <label class="form-check-label" :for="'radios'+index">{{regionItem.name}}</label>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12" v-show="false">
        <div class="box" style="height:500px;">
          <div class="box-header with-border">
            <h3 class="box-title" style="color:#174b79">Table - Circle Wise</h3>
          </div>
          <div class="box-body">
            <template>
              <div
                class="table-responsive"
                id="circleTableDiv"
                style="height:440px;margin-top:2px;border:1px solid lightgray;overflow-y: scroll;"
              >
                <table class="table table-bordered table-striped table-responsive-stack"
                  id="circleTableID"
                  style="text-align: center;"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr style="background-color:#00a0ff;color:white">
                      <th style="text-align:center">Name</th>
                      <th style="text-align:center">Online</th>
                      <th style="text-align:center">Offline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(tabledetailsItems,indx) in circleTableJson.table_details"
                      v-bind:key="indx"
                    >
                      <td>{{tabledetailsItems.name}}</td>
                      <td>{{tabledetailsItems.online}}</td>
                      <td>{{tabledetailsItems.offline}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Main row -->
    <div class="row">
      <div class="col-md-12 col-sm-6 col-xs-12">
        <div class="box" style="height:450px">
          <div class="box-header with-border">
            <h3 class="box-title" style="color:#174b79">Region - Tabular</h3>
            <div class="text-right btn-group" style="float:right" role="group" v-show="false">
              <span><b>LS </b> - Load Survey</span>&nbsp;&nbsp;&nbsp; <span><b>MN </b>  - Midnight</span> &nbsp;&nbsp;&nbsp;<span><b>BILL </b>  - Billing</span>
            </div>
          </div>
          <div class="box-body">
            <ejs-treegrid  :dataSource="stackeddataSourceContent" :treeColumnIndex="0" :allowSorting="true" childMapping="subtasks" :height="300" :allowResizing="true" width="100%" :enableHover="true"
              :queryCellInfo="customiseCell"
              :rowSelected="rowDataBound"
            >
              <e-columns>
                <e-column
                  field="display_name"
                  headerText="Region Name"
                  textAlign="Left"
                  width="120"
                ></e-column>
                  <e-column headerText="Connectivity %" :columns="connectivity_data_columns" textAlign= "center" width="60" ></e-column>
                  <e-column headerText="Data Availability Today %" :columns="data_aval_data_columns" textAlign= "center" width="60" ></e-column>
                  <e-column headerText="Data Availability Daily Avg %" :columns="data_aval_daily_columns" textAlign= "center" width="60"></e-column>
                  <e-column headerText="Data Availability Monthly Avg %" :columns="data_aval_monthly_columns" textAlign= "center" width="60"></e-column>
           <!--  <e-column field="connect_data" headerText="Connectivity %" textAlign="center" width="60"></e-column>
                <e-column field="connect_daily"
                  headerText="Daily Avg %"
                  textAlign="center"
                  width="60"
                ></e-column>
                <e-column
                  field="connect_monthly"
                  headerText="Monthly Avg %"
                  textAlign="center"
                  width="60"
                ></e-column>
             <e-column
                  field="data_avl_data"
                  headerText="Data Availability %"
                  textAlign="center"
                  width="80"
                ></e-column>
                <e-column
                  field="data_avl_daily"
                  headerText="Daily Avg %"
                  textAlign="center"
                  width="60"
                ></e-column>
                <e-column
                  field="data_avl_monthly"
                  headerText="Month Avg %"
                  textAlign="center"
                  width="60"
                ></e-column> -->
              </e-columns>
            </ejs-treegrid>
          </div>
        </div>
      </div>
      <!-- /.col -->
      <div class="col-md-2 col-sm-6 col-xs-12" v-show="false">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title" style="color:#174b79">Alerts</h3>
            <div class="text-right" style="float:right">
              <select id="alertTypeTXT" v-model="alertTypeTXT" class="inputTEXTcss">
                <option value="Choose alert type" selected disabled>Choose alert type</option>
                <option value="Configuration">Configuration</option>
                <option value="Modem">Modem</option>
              </select>
            </div>
          </div>
          <div class="box-body">
            <div style="padding: 5px;overflow-y: scroll;height:357px" id="alleventarea" readonly></div>
          </div>
        </div>
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
    <!--SLD POPUP START-->
    <!-- Date popup START-->
    <modal
      name="datepopup"
      transition="nice-modal-fade"
      classes="demo-modal-class"
       style="z-index:1111 !important"
      :min-width="500"
      :min-height="200"
      :pivot-y="0.5"
      :adaptive="true"
      :draggable="true"
      :scrollable="true"
      :reset="true"
      width="40%"
      height="auto"
      @before-open="beforeOpen"
      @opened="opened"
      @closed="closed"
      @before-close="beforeClose"
      :clickToClose="false"
    >
      <div class="size-modal-content">
        <div class="row">
          <div class="modal-header">
            <div class="col-lg-6" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);">SLD Details</h4>
            </div>
            <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button
                id="datepopupcloseBTN"
                type="button"
                class="btn btn-default"
                @click="datepopupcloseACtion"
                style="background:transparent;border:1px solid transparent"
              >
                <span aria-hidden="true" class="white-text">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <!--Body-->
        <div class="modal-body" style="margin-top:-10px;">
          <p></p>
        </div>
        <!--Footer-->
        <div class="modal-footer flex-center">
          <a
            id="datepopupclseBTN"
            type="button"
            class="btn btn-default waves-effect btnPadding"
            @click="datepopupcloseACtion"
          >Cancel</a>
        </div>
      </div>
    </modal>
    <div v-show="enableSSDetailsPopup">
    <SSDetailsPopup :selectSSPopupDucID="selectSSDucID" :selectSSObject="selectSSObject" :selectSSDcuStatus="selectSSDcuStatus" :callssRandomNum="callssRandomNum" :nameplateSubStationJson="nameplateSubStationJson"></SSDetailsPopup>
    </div>
    <!-- Date Popup END --->
  </section>
  <!-- /.content -->
</template>
<script>
import Vue from "vue";
import axios from "axios";
import $ from "jquery";
import VueApexCharts from "vue-apexcharts";
import VueElementLoading from 'vue-element-loading'
import * as VueGoogleMaps from "vue2-google-maps";
import {dashboardeventsJSON,circleTableJson,regionListArray} from "../../demo";
import SSDetailsPopup from "./SSDetails.vue";
import { TreeGridPlugin, Sort, load } from "@syncfusion/ej2-vue-treegrid";
import { TreeViewPlugin } from "@syncfusion/ej2-vue-navigations";
Vue.use(TreeViewPlugin);
Vue.use(TreeGridPlugin);
Vue.component("apexchart", VueApexCharts);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAhmIazbnGp_E4opdAL1-HLvC_73qx9tJ0",
    libraries: "places,drawing,visualization",
    // AIzaSyAr04SgWUWWt9BAoXHAIRRUFiIEZMrNVd4 // AIzaSyBZ0U8Bwf0YaCCjPeg7zvuslRFeT_FHoEI
    // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
    // If you want to set the version, you can do so:
    // v: '3.26',
  }
});

$(document).on("click", ".naccs .menu div", function() {
  var numberIndex = $(this).index();
  if (!$(this).is("active")) {
    $(".naccs .menu div").removeClass("active");
    $(".naccs ul li").removeClass("active");

    $(this).addClass("active");
    $(".naccs ul")
      .find("li:eq(" + numberIndex + ")")
      .addClass("active");

    var listItemHeight = $(".naccs ul")
      .find("li:eq(" + numberIndex + ")")
      .innerHeight();
    $(".naccs ul").height(listItemHeight + "px");
  }
});

const dtToday = new Date();
export default {
  name: "Dashboard",
  components: {SSDetailsPopup,VueElementLoading},
  data() {
    return {
      enableSSDetailsPopup:false,
      currTimeInterval:null,
      callssRandomNum:'',
      getDashboardsummaryJSON:'',
      stackeddataSourceContent: [],
      regiontreeviewdata:[],
      allRegionObject:{},
      chennainorthRegionObject:{},
      chennaisouthRegionObject:{},
      coimbatoreRegionObject:{},
      erodeRegionObject:{},
      maduraiRegionObject:{},
      tirunelveliRegionObject:{},
      trichyRegionObject:{},
      villupuramRegionObject:{},
      velloreRegionObject:{},
      wdecRegionObject:{},
      mapclearInterval:null,
      selectMapRegionTXT:null,
      selectMapCircleTXT:null,
      selectMapSSTXT:null,
      selectMapDataBollTXT:null,
      connectivity_data_columns:[
            { field: 'connect_data', headerText: 'Today %', textAlign: 'Center', width: 50 },
            { field: 'connect_daily', headerText: 'Daily Avg %', textAlign: 'Center', width: 50 },
            { field: 'connect_monthly', headerText: 'Monthly Avg %', textAlign: 'Center', width: 50 }
            ],
      data_aval_data_columns:[
            { field: 'data_avl_data', headerText: 'Load Survey', textAlign: 'Center', width: 50 },
            { field: 'data_avl_daily', headerText: 'Midnight', textAlign: 'Center', width: 50 },
            { field: 'data_avl_monthly', headerText: 'Billing', textAlign: 'Center', width: 50 }
            ],
      data_aval_daily_columns:[
        { field: 'ls_data', headerText: 'Load Survey', textAlign: 'Center', width: 50 },
        { field: 'mn_data', headerText: 'Midnight', textAlign: 'Center', width: 50 },
        { field: 'bill_data', headerText: 'Billing', textAlign: 'Center', width: 50 }
      ],
      data_aval_monthly_columns:[
        { field: 'ls_monthly', headerText: 'Load Survey', textAlign: 'Center', width: 50 },
        { field: 'mn_monthly', headerText: 'Midnight', textAlign: 'Center', width: 50 },
        { field: 'bill_monthly', headerText: 'Billing', textAlign: 'Center', width: 50 }
      ],
      sortSettings: {
        columns: [{ field: "display_name", direction: "Ascending" }]
      },
      dailycurrStartdate: this.dailyFormattedDate(dtToday) + " 00:00:00",
      dailycurrEnddate: this.dailyFormattedDate(dtToday) + " 23:59:59",
      dailychartloadcurveOptions : {
      xaxis: {
        type: "datetime",
        min: this.dailycurrStartdate,
        max: this.dailycurrEnddate,
        labels: {
          show: true,
          //  format: 'HH:mm',
          formatter: function(value, timestamp) {
            var today = new Date(timestamp);
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
            // var date = yyyy + "-" + mm + "-" + dd +" : "+ hh +":"+ min + ":"+ sec;
            var date = hh + ":" + min;
            return date;
          }
        }
      },
      // yaxis:
      //  [{
      //   title: {
      //           text: "Energy"
      //   }
      //   }
      // ],
      markers: {
        size: [2, 2, 2]
      },
        colors: ["#032457", "#049f82"],
      chart: {
        height: 385,
        stacked: false,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        curve: "smooth", // ['smooth', 'straight']
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0
      },
      legend: {
        position: "top",
        horizontalAlign: "right"
      },
      title: {
        text: "",
        align: "left"
      },
      tooltip: {
        x: {
          show: true,
          //format: "dd/MM/yyyy HH:mm",
          formatter: function(value, timestamp) {
            var today = new Date(value);
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
            var date = dd + "-" + mm + "-" + yyyy + " : " + hh + ":" + min + ":" + sec;
            return date;
          }
        }
      }
    },
    dailychartcumulativecurveOptions : {
      xaxis: {
        type: "datetime",
        min: this.dailycurrStartdate,
        max: this.dailycurrEnddate,
        labels: {
          show: true,
          //  format: 'HH:mm',
          formatter: function(value, timestamp) {
            var today = new Date(timestamp);
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
            // var date = yyyy + "-" + mm + "-" + dd +" : "+ hh +":"+ min + ":"+ sec;
            var date = hh + ":" + min;
            return date;
          }
        }
      },
      // yaxis:
      //  [{
      //   title: {
      //           text: "Energy"
      //   }
      //   }
      // ],
      markers: {
        size: [2, 2, 2]
      },
        colors: ["#032457", "#049f82"],
      chart: {
        height: 385,
        stacked: false,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        curve: "smooth", // ['smooth', 'straight']
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0
      },
      legend: {
        position: "top",
        horizontalAlign: "right"
      },
      title: {
        text: "",
        align: "left"
      },
      tooltip: {
        x: {
          show: true,
          //format: "dd/MM/yyyy HH:mm",
          formatter: function(value, timestamp) {
            var today = new Date(value);
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
            var date =
              dd + "-" + mm + "-" + yyyy + " : " + hh + ":" + min + ":" + sec;
            return date;
          }
        }
      }
    },
      fields: {},
      connectivtyPer:'0 %',
      connectivty30Per:'0 %',
      connectivtyPertime:'',
      connectivty30Pertime:'',
      dataAvlper:'0 %',
      dataAvlpertime:'',
      dataAvl30per:'0 %',
      dataAvl30pertime:'',
      ducinstallcount:0,
      ducinstallONLINEcount:0,
      ducinstallcounttime:'',
      selectedNodes: ["1"],
      isLoading:false,
      fullPage: true,
      nameplateSubStationJson:'',
      namePlateliveINCOMERDataTblJSON: "",
      namePlateliveOUTCOMERDataTblJSON: "",
      namePlateTablePANEHeight: window.innerHeight - 600 + "px",
      dataconnChartTypeTXT: "line",
      feederOUTAGEDataTblJSON: "",
      feederSELTXT: "Choose Feeder",
      ssfeederlist:[],
      feederIDLEDataTblJSON: "",
      feederOVERLOADDataTblJSON: "",
      eventsDataTblJSON: "",
      outageFromdate: "",
      outageTodate: "",
      outageUNAvlvalue: "",
      idleFromdate: "",
      idleTodate: "",
      idleUnusedvalue: "",
      regionListArray: regionListArray,
      dashboardeventsJSON: dashboardeventsJSON,
      circleTableJson: circleTableJson,
      alertTypeTXT: "Choose alert type",
      selectSSObject:'',
      selectregionID: "",
      selectcircleID: "",
      selectSSlocationID: "",
      selectSSDucName: "",
      selectregionName: "",
      selectcircleName: "",
      selectSSDcuStatus:"",
      selectSSDucID:'',
      selectSSlocationName: "",
      selectSSipAddress:'',
      selectSSPerson :'',
      selectSSphNum:'',
      selectSSRatingTXT: "",
      selectTotincomerTXT: "",
      selectnoGcsTXT: "",
      selectsscircleTXT:"",
      selectssregionTXT:"",
      selectTotoutgoingTXT: "",
      selectnofoutgoingFeederTXT: "",
      selectPowerTransformerTXT: "",
      selectSubStationLossTXT: "",
      selectFeederUnderMaintenceTXT: "",
      selectIdleFeederTXT: "",
      selectOverloadFeederTXT: "",
      substationEventLBL: "substationEventWeekLBL",
      substationLoadcurveLBL: "substationLoadcurveWeekLBL",
      substationCumulativedcurveLBL: "substationCulativecurveWeekLBL",
      substationoutageFeederBTNLBL:'substationoutageFeederWeekLBL',
      substationidleFeederBTNLBL:'substationidleFeederWeekLBL',
      substationoverloadFeederBTNLBL:'substationoverloadFeederWeekLBL',
      markerConvBTNLBL:'weekLBL',
      eventselNameTXT: "Choose Event",
      currtime: "",
      currdate: "",
      currDatewithmins: "",
      mapzoom: 8,
      startLocation: {},
      coordinates: [],
      infoPosition: null,
      infoContent: null,
      infoOpened: false,
      infoCurrentKey: null,
      infolat: null,
      infolng: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      monthchartloadcurveOptions: {
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          //  format: 'HH:mm',
          formatter: function(value, timestamp) {
            var today = new Date(timestamp);
            var yyyy = today.getFullYear();
            var mm = today.getMonth();
            var dd = today.getDate();
            var hh = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();
            //  if (mm < 10) {mm = "0" + mm;}
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
            // var date = yyyy + "-" + mm + "-" + dd +" : "+ hh +":"+ min + ":"+ sec;
            var monthlimt = [
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
            var date = dd + " " + monthlimt[Number(mm)];
            return date;
          }
        }
      },
         dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
      stroke: {
          show: true,
          curve: "smooth", // ['smooth', 'straight']
          lineCap: "butt",
          colors: undefined,
          width: 3,
          dashArray: 0
        },
       colors: ["#032457", "#049f82"],
      legend: {
        position: "top",
        horizontalAlign: "right"
      },
      markers: {
        size: [2, 2, 2, 2]
      },
      chart: {
        type: "line",
        zoom: { enabled: false },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.4
        }
      },
      tooltip: {
        x: {
          show: true,
          formatter: function(value, timestamp) {
            var today = new Date(value);
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
            var date = dd + "-" + mm + "-" + yyyy +" "+ hh +":"+ min + ":"+ sec;
            return date;
          }
        }
      }
    },
      loadcurveoptions: {
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          //  format: 'HH:mm',
          formatter: function(value, timestamp) {
            var today = new Date(timestamp);
            var yyyy = today.getFullYear();
            var mm = today.getMonth();
            var dd = today.getDate();
            var hh = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();
            //  if (mm < 10) {mm = "0" + mm;}
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
            // var date = yyyy + "-" + mm + "-" + dd +" : "+ hh +":"+ min + ":"+ sec;
            var monthlimt = [
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
            var date = dd + " " + monthlimt[Number(mm)];
            return date;
          }
        }
      },
         dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
      stroke: {
          show: true,
          curve: "smooth", // ['smooth', 'straight']
          lineCap: "butt",
          colors: undefined,
          width: 3,
          dashArray: 0
        },
       colors: ["#032457", "#049f82"],
      legend: {
        position: "top",
        horizontalAlign: "right"
      },
      markers: {
        size: [2, 2, 2, 2]
      },
      chart: {
        type: "line",
        zoom: { enabled: false },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.4
        }
      },
      tooltip: {
        x: {
          show: true,
          formatter: function(value, timestamp) {
            var today = new Date(value);
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
            var date = dd + "-" + mm + "-" + yyyy +" "+ hh +":"+ min + ":"+ sec;
            return date;
          }
        }
      }
    },
      loadcurveseries: [],
      monthchartcumulativecurveOptions:{
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          //  format: 'HH:mm',
          formatter: function(value, timestamp) {
            var today = new Date(timestamp);
            var yyyy = today.getFullYear();
            var mm = today.getMonth();
            var dd = today.getDate();
            var hh = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();
            //  if (mm < 10) {mm = "0" + mm;}
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
            // var date = yyyy + "-" + mm + "-" + dd +" : "+ hh +":"+ min + ":"+ sec;
            var monthlimt = [
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
            var date = dd + " " + monthlimt[Number(mm)];
            return date;
          }
        }
      },
         dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
      stroke: {
          show: true,
          curve: "smooth", // ['smooth', 'straight']
          lineCap: "butt",
          colors: undefined,
          width: 3,
          dashArray: 0
        },
       colors: ["#032457", "#049f82"],
      legend: {
        position: "top",
        horizontalAlign: "right"
      },
      markers: {
        size: [2, 2, 2, 2]
      },
      chart: {
        type: "line",
        zoom: { enabled: false },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.4
        }
      },
      tooltip: {
        x: {
          show: true,
          formatter: function(value, timestamp) {
            var today = new Date(value);
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
            var date = dd + "-" + mm + "-" + yyyy +" " +hh +":"+ min + ":"+ sec;
            return date;
          }
        }
      }
    },
      cumulativecurveoptions: {
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          //  format: 'HH:mm',
          formatter: function(value, timestamp) {
            var today = new Date(timestamp);
            var yyyy = today.getFullYear();
            var mm = today.getMonth();
            var dd = today.getDate();
            var hh = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();
            //  if (mm < 10) {mm = "0" + mm;}
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
            // var date = yyyy + "-" + mm + "-" + dd +" : "+ hh +":"+ min + ":"+ sec;
            var monthlimt = [
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
            var date = dd + " " + monthlimt[Number(mm)];
            return date;
          }
        }
      },
         dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
      stroke: {
          show: true,
          curve: "smooth", // ['smooth', 'straight']
          lineCap: "butt",
          colors: undefined,
          width: 3,
          dashArray: 0
        },
       colors: ["#032457", "#049f82"],
      legend: {
        position: "top",
        horizontalAlign: "right"
      },
      markers: {
        size: [2, 2, 2, 2]
      },
      chart: {
        type: "line",
        zoom: { enabled: false },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.4
        }
      },
      tooltip: {
        x: {
          show: true,
          formatter: function(value, timestamp) {
            var today = new Date(value);
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
            var date = dd + "-" + mm + "-" + yyyy +" " +hh +":"+ min + ":"+ sec;
            return date;
          }
        }
      }
    },
      cumulativecurveseries: [],
      connectivtyanddataAvailoptions: {
      xaxis: {
        type: "datetime",
        labels: {
          show: true,
          //  format: 'HH:mm',
          formatter: function(value, timestamp) {
            var today = new Date(timestamp);
            var yyyy = today.getFullYear();
            var mm = today.getMonth();
            var dd = today.getDate();
            var hh = today.getHours();
            var min = today.getMinutes();
            var sec = today.getSeconds();
            //  if (mm < 10) {mm = "0" + mm;}
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
            // var date = yyyy + "-" + mm + "-" + dd +" : "+ hh +":"+ min + ":"+ sec;
            var monthlimt = [
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
            var date = dd + " " + monthlimt[Number(mm)];
            return date;
          }
        }
      },
         dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
      stroke: {
          show: true,
          curve: "smooth", // ['smooth', 'straight']
          lineCap: "butt",
          colors: undefined,
          width: 3,
          dashArray: 0
        },
       colors: ["#032457", "#049f82"],
      legend: {
        position: "top",
        horizontalAlign: "right"
      },
      markers: {
        size: [2, 2, 2, 2]
      },
      chart: {
        type: "line",
        zoom: { enabled: false },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.4
        }
      },
      tooltip: {
        x: {
          show: true,
          formatter: function(value, timestamp) {
            var today = new Date(value);
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
            var date = dd + "-" + mm + "-" + yyyy;
            return date;
          }
        }
      }
    },
      connectivtyanddataAvailseries: [],
      generateRandomNumbers(numbers, max, min) {
        var a = [];
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max);
        }
        return a;
      }
    };
  },

  computed: {
    coPilotNumbers() {
      return this.generateRandomNumbers(12, 1000000, 10000);
    },
    personalNumbers() {
      return this.generateRandomNumbers(12, 1000000, 10000);
    },
    isMobile() {
      return window.innerWidth <= 800 && window.innerHeight <= 600;
    }
  },
  provide: {
    treegrid: [Sort]
  },
  mounted() {
   // document.getElementById("radios0").checked = true;
    this.getdashboardsummaryDetails();
    this.getdashboardtreeviewDetails();
    this.getdashboardRegionWiseDetails();
      this.currTimeInterval  = setInterval(async () => {
        await this.getdashboardsummaryDetails();
        await this.getcurrentDateTime();
      }, 1000);
      this.mapclearInterval =  setInterval(() => {
      this.getdashboarSSDetails();
      }, 1000);
    //setInterval(this.getcurrentDateTime, 1000);
    document.getElementById('dashboardmainPANE').style.height = "1130px";
    //this.geteventslist();
  },
  created() {
    this.loadDashboarSSDetails();
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 1000);
  },
  destroyed(){
    if(this.currTimeInterval != null){
      clearInterval(this.currTimeInterval);
    }
    clearInterval(this.mapclearInterval);
  },
  methods: {
    getdashboardsummaryDetails(){
         axios.get(this.dashboard_summary_listURL).then(response => {
        if (response.data.status == "found") {
          this.getDashboardsummaryJSON = response.data;
          this.connectivtyPer = this.getDashboardsummaryJSON.connv.conv_per;
          this.connectivty30Per = this.getDashboardsummaryJSON.connv30days.conv_per;
          this.connectivtyPertime = this.getDashboardsummaryJSON.connv.update_time;
          this.connectivty30Pertime = this.getDashboardsummaryJSON.connv30days.update_time;
          this.dataAvlper = this.getDashboardsummaryJSON.dataavail.dataavail_per;
          this.dataAvlpertime = this.getDashboardsummaryJSON.dataavail.update_time;
          this.dataAvl30per = this.getDashboardsummaryJSON.dataavail30days.dataavail_per;
          this.dataAvl30pertime = this.getDashboardsummaryJSON.dataavail30days.update_time;
          this.ducinstallONLINEcount = this.getDashboardsummaryJSON.dcu.online_count;
          this.ducinstallcount = this.getDashboardsummaryJSON.dcu.count;
          this.ducinstallcounttime = this.getDashboardsummaryJSON.dcu.update_time;
        } else {
          this.getDashboardsummaryJSON = "";
          this.connectivtyPer = "0 %";
          this.connectivty30Per = "0 %";
          this.connectivtyPertime =  "";
          this.connectivty30Pertime = "";
          this.dataAvlper =  "0 %";
          this.dataAvlpertime = "";
          this.dataAvl30per = "0 %";
          this.dataAvl30pertime  = "";
          this.ducinstallcount = 0;
          this.ducinstallONLINEcount=0;
          this.ducinstallcounttime = "";
        }
      });
    },
     getdashboardtreeviewDetails(){
         axios.get(this.dashboard_regionwise_treeURL).then(response => {
        if (response.data.status == "found") {
          this.regiontreeviewdata = response.data.details;
          this.fields =  { dataSource: this.regiontreeviewdata, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', selected: 'isSelected' };
        } else {
          this.regiontreeviewdata = [];
          this.fields =  {};
        }
      });
    },
    getsubstationloadcurvePANEdetails(){
      this.substationLoadcurveBTN("Week");
      this.substationCumulativecurveBTN("Week");
    },
    chnagefeedername(feedername){
      this.feederSELTXT = feedername;
      if(this.substationLoadcurveLBL == "substationLoadcurveDayLBL"){
        this.substationLoadcurveBTN('Day');
      }else if(this.substationLoadcurveLBL == "substationLoadcurveWeekLBL"){
        this.substationLoadcurveBTN('Week');
      }else if(this.substationLoadcurveLBL == "substationLoadcurveMonthLBL"){
        this.substationLoadcurveBTN('Month');
      }
    },
    substationLoadcurveBTN(loadcurveBTNname){
      console.log('length', this.ssfeederlist.length);
      if(this.feederSELTXT == "Choose Feeder"){
        if(this.ssfeederlist.length != 0){
          this.feederSELTXT = this.ssfeederlist[0].METER_NAME;
        }else{
           this.warningMessage('feeder name not available');
            return false;
        }
      }
      if(loadcurveBTNname == "Day"){
      document.getElementById("loadcurveDailykBTN").classList.add("active");
      document.getElementById("loadcurveWeekBTN").classList.remove("active");
      document.getElementById("loadcurveMonthBTN").classList.remove("active");
      this.substationLoadcurveLBL = "substationLoadcurveDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getLoadcurveEvent(this.selectSSDucID,this.feederSELTXT,loadcurveBTNname,startdate,enddate);
      } else if(loadcurveBTNname == "Week"){
      document.getElementById("loadcurveWeekBTN").classList.add("active");
      document.getElementById("loadcurveDailykBTN").classList.remove("active");
      document.getElementById("loadcurveMonthBTN").classList.remove("active");
      this.substationLoadcurveLBL = "substationLoadcurveWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getLoadcurveEvent(this.selectSSDucID,this.feederSELTXT,loadcurveBTNname,startdate,enddate);
      } else if(loadcurveBTNname == "Month"){
      document.getElementById("loadcurveMonthBTN").classList.add("active");
      document.getElementById("loadcurveWeekBTN").classList.remove("active");
      document.getElementById("loadcurveDailykBTN").classList.remove("active");
      this.substationLoadcurveLBL = "substationLoadcurveMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getLoadcurveEvent(this.selectSSDucID,this.feederSELTXT,loadcurveBTNname,startdate,enddate);
      }
    },
    substationCumulativecurveBTN(cumulativecurveBTNname){
      if(cumulativecurveBTNname == "Day"){
      document.getElementById("cumulativecurveDailyBTN").classList.add("active");
      document.getElementById("cumulativecurveWeekBTN").classList.remove("active");
      document.getElementById("cumulativecurveMonthBTN").classList.remove("active");
      this.substationCumulativedcurveLBL = "substationCulativecurveDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getCumulativecurveEvent(this.selectSSDucID,cumulativecurveBTNname,startdate,enddate);
      } else if(cumulativecurveBTNname == "Week"){
      document.getElementById("cumulativecurveWeekBTN").classList.add("active");
      document.getElementById("cumulativecurveDailyBTN").classList.remove("active");
      document.getElementById("cumulativecurveMonthBTN").classList.remove("active");
      this.substationCumulativedcurveLBL = "substationCulativecurveWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getCumulativecurveEvent(this.selectSSDucID,cumulativecurveBTNname,startdate,enddate);
      } else if(cumulativecurveBTNname == "Month"){
      document.getElementById("cumulativecurveMonthBTN").classList.add("active");
      document.getElementById("cumulativecurveDailyBTN").classList.remove("active");
      document.getElementById("cumulativecurveWeekBTN").classList.remove("active");
      this.substationCumulativedcurveLBL = "substationCulativecurveMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getCumulativecurveEvent(this.selectSSDucID,cumulativecurveBTNname,startdate,enddate);
      }
    },
    getsubstationFeederDisturbancePANEdetails(){
      this.outageFeederBTN('Week');
      this.idleFeederBTN('Week');
      this.overloadfeederBTN('Week');
    },
    outageFeederBTN(outageBTNname){
      if(outageBTNname == "Day"){
      document.getElementById("outageDailyBTN").classList.add("active");
      document.getElementById("outageWeekBTN").classList.remove("active");
      document.getElementById("outageMonthBTN").classList.remove("active");
      this.substationoutageFeederBTNLBL = "substationoutageFeederDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getOutageDetails(this.selectSSDucID,startdate,enddate);
      } else if(outageBTNname == "Week"){
      document.getElementById("outageWeekBTN").classList.add("active");
      document.getElementById("outageDailyBTN").classList.remove("active");
      document.getElementById("outageMonthBTN").classList.remove("active");
      this.substationoutageFeederBTNLBL = "substationoutageFeederWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getOutageDetails(this.selectSSDucID,startdate,enddate);
      } else if(outageBTNname == "Month"){
      document.getElementById("outageMonthBTN").classList.add("active");
      document.getElementById("outageWeekBTN").classList.remove("active");
      document.getElementById("outageDailyBTN").classList.remove("active");
      this.substationoutageFeederBTNLBL = "substationoutageFeederMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getOutageDetails(this.selectSSDucID,startdate,enddate);
      }
    },
    idleFeederBTN(idleBTNname){
      if(idleBTNname == "Day"){
      document.getElementById("idelfeederDailyBTN").classList.add("active");
      document.getElementById("idelfeederWeekBTN").classList.remove("active");
      document.getElementById("idelfeederMonthBTN").classList.remove("active");
      this.substationidleFeederBTNLBL = "substationidleFeederDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getIdleDetails(this.selectSSDucID,startdate,enddate);
      } else if(idleBTNname == "Week"){
      document.getElementById("idelfeederWeekBTN").classList.add("active");
      document.getElementById("idelfeederDailyBTN").classList.remove("active");
      document.getElementById("idelfeederMonthBTN").classList.remove("active");
      this.substationidleFeederBTNLBL = "substationidleFeederWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getIdleDetails(this.selectSSDucID,startdate,enddate);
      } else if(idleBTNname == "Month"){
      document.getElementById("idelfeederMonthBTN").classList.add("active");
      document.getElementById("idelfeederWeekBTN").classList.remove("active");
      document.getElementById("idelfeederDailyBTN").classList.remove("active");
      this.substationidleFeederBTNLBL = "substationidleFeederMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getIdleDetails(this.selectSSDucID,startdate,enddate);
      }
    },
    overloadfeederBTN(overloadBTNname){
      if(overloadBTNname == "Day"){
      document.getElementById("overloadfeederDailyBTN").classList.add("active");
      document.getElementById("overloadfeederWeekBTN").classList.remove("active");
      document.getElementById("overloadfeederMonthBTN").classList.remove("active");
      this.substationoverloadFeederBTNLBL = "substationoutageFeederDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getOverloadDetails(this.selectSSDucID,startdate,enddate);
      } else if(overloadBTNname == "Week"){
      document.getElementById("overloadfeederWeekBTN").classList.add("active");
      document.getElementById("overloadfeederDailyBTN").classList.remove("active");
      document.getElementById("overloadfeederMonthBTN").classList.remove("active");
      this.substationoverloadFeederBTNLBL = "substationoutageFeederWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getOverloadDetails(this.selectSSDucID,startdate,enddate);
      } else if(overloadBTNname == "Month"){
      document.getElementById("overloadfeederMonthBTN").classList.add("active");
      document.getElementById("overloadfeederWeekBTN").classList.remove("active");
      document.getElementById("overloadfeederDailyBTN").classList.remove("active");
      this.substationoverloadFeederBTNLBL = "substationoutageFeederMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getOverloadDetails(this.selectSSDucID,startdate,enddate);
      }
    },
    getsubstationEventPANEdetails(){
      this.eventselNameTXT = "All";
      this.substationEventBTN('Week');
    },
    changeeventssmethod(eventBtnName){
      this.eventselNameTXT = eventBtnName;
      if(this.substationEventLBL == "substationEventDayLBL"){
        this.substationEventBTN('Day');
      } else if(this.substationEventLBL == "substationEventWeekLBL"){
        this.substationEventBTN('Week');
      }
      else if(this.substationEventLBL == "substationEventMonthLBL"){
        this.substationEventBTN('Month');
      }
    },
    substationEventBTN(eventBtnName){
      if(eventBtnName == "Day"){
      document.getElementById("eventDailyBTN").classList.add("active");
      document.getElementById("eventWeekBTN").classList.remove("active");
      document.getElementById("eventMonthBTN").classList.remove("active");
      this.substationEventLBL = "substationEventDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getsubstationEvent(this.selectSSDucID,this.eventselNameTXT,startdate,enddate);
      } else if(eventBtnName == "Week"){
      document.getElementById("eventWeekBTN").classList.add("active");
      document.getElementById("eventDailyBTN").classList.remove("active");
      document.getElementById("eventMonthBTN").classList.remove("active");
      this.substationEventLBL = "substationEventWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getsubstationEvent(this.selectSSDucID,this.eventselNameTXT,startdate,enddate);
      } else if(eventBtnName == "Month"){
     document.getElementById("eventMonthBTN").classList.add("active");
      document.getElementById("eventWeekBTN").classList.remove("active");
      document.getElementById("eventDailyBTN").classList.remove("active");
      this.substationEventLBL = "substationEventMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getsubstationEvent(this.selectSSDucID,this.eventselNameTXT,startdate,enddate);
      }
    },
    getdashboardRegionWiseDetails(){
         axios.get(this.dashboard_regionwise_listURL).then(response => {
        if (response.data.status == "found") {
          this.stackeddataSourceContent = response.data.details;
        } else {
          this.stackeddataSourceContent = [];
        }
      });
    },
    loadDashboarSSDetails(){
        this.allRegionObject = {};
        axios.get(this.dashboard_ss_mapURL).then(response => {
        if (response.data.status == "found") {
          this.allRegionObject = response.data;
          //this.selectMapRegionTXT = "All";
          //this.selectMapCircleTXT = "All";
          //this.selectMapSSTXT = "";
          //this.selectMapDataBollTXT = false;
          this.regionCLICKmethod("All", "All", false);
        } else {
          this.allRegionObject = {};
        }
      });
    },
     getdashboarSSDetails(){
         axios.get(this.dashboard_ss_mapURL).then(response => {
        if (response.data.status == "found") {
         this.allRegionObject = response.data;
         this.regionCLICKmethod(this.selectMapRegionTXT, this.selectMapCircleTXT, this.selectMapDataBollTXT);
        } else {
          this.allRegionObject = {};
        }
      });
    },
     nodeRegionSelected: function(args) {
       //console.log(JSON.stringify(args)+'args :'+args.nodeData.text);
       if(args.nodeData.parentID != null){
         var obj =  this.regiontreeviewdata.find(regiontreeviewdata => regiontreeviewdata.id === parseInt(args.nodeData.parentID));
         var regionNAme = obj.name;
         var circleNAme = args.nodeData.text;
         this.selectMapRegionTXT = regionNAme;
         this.selectMapCircleTXT = circleNAme;
         this.selectMapSSTXT = "";
         this.selectMapDataBollTXT = true;
         this.regionCLICKmethod(regionNAme, circleNAme, true);
       }else{
         var regionNAme = args.nodeData.text;
         var circleNAme = args.nodeData.text;
         this.selectMapRegionTXT = regionNAme;
         this.selectMapCircleTXT = circleNAme;
         this.selectMapSSTXT = "";
         this.selectMapDataBollTXT = true;
         this.regionCLICKmethod(regionNAme, circleNAme, false);
       }
     },
    getcurrentDateTime() {
      var today = new Date();
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
      this.currdate = dd + "-" + mm + "-" + yyyy;
      this.currDatewithmins = dd + "-" + mm + "-" + yyyy + " " + hh + ":" + min;
      this.currtime = hh + ":" + min + ":" + sec;
    },
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      };
    },
    toggleInfo: function(marker, key) {
      this.infoPosition = this.getPosition(marker);
      this.selectSSObject = marker;
      // console.log('selectSSObject --> :', JSON.stringify(this.selectSSObject));
      this.infoContent = marker.ss;
      this.selectregionName = marker.region;
      this.selectregionID = marker.region_id;
      this.selectcircleName = marker.circle;
      this.selectcircleID= marker.circle_id;
      this.selectSSlocationName = marker.ss;
      this.selectSSlocationID = marker.ss_id;
      this.selectSSDucID = marker.dcu_id;
      this.selectSSDucName = marker.dcu_name;
      this.selectSSDcuStatus = marker.dcu_status;
      this.selectSSipAddress = marker.ip_add;
      this.selectSSPerson = marker.person;
      this.selectSSphNum = marker.ph_num;

      this.infolat = marker.lat;
      this.infolng = marker.lng;
      if (this.infoCurrentKey === key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
    },
     getsubstationdataAvlandconnMethod(regionID,circleID,substationID,startdate,enddate){
      try {
       var getsubstationSSURL = this.getsubstationSSURL.replace("$$regionID$$",regionID).replace("$$circleID$$",circleID).replace("$$substationID$$",substationID).replace("$$startdate$$",startdate).replace("$$enddate$$",enddate);
       this.connectivtyanddataAvailseries = [];
         this.isLoading = true;
       axios.get(getsubstationSSURL).then(response => {
        if (response.data.status == "found") {
           this.connectivtyanddataAvailseries.push(response.data.convObj);
          this.connectivtyanddataAvailseries.push(response.data.dataavlObj);
         this.isLoading = false;
        } else {
          this.connectivtyanddataAvailseries = [];
          this.isLoading = false;
        }
      });
      } catch (error) {
        console.log('error:'+ error);
      }
    },
    getfeederlist(ssducID){
    try {
       var feederlistURL = this.feederlistURL.replace("$$dcuid$$",ssducID);
       this.ssfeederlist = [];
       axios.get(feederlistURL).then(response => {
        if (response.data.status == "found") {
           this.isLoading = true;
           this.ssfeederlist = response.data.details;
         this.isLoading = false;
        } else {
          this.ssfeederlist = [];
        }
      });
      } catch (error) {
        console.log('error:'+ error);
      }
    },
    callSubStationPage(){
      this.$router.push({
       name: 'Sub Station Dashboard',
       params: {
        mapselObj: this.selectSSObject
       }
      });
    },
    showSSdetailspopup(){
      this.isLoading = true;
      var substation_nameplate_summaryURL = this.substation_nameplate_summaryURL.replace("$$dcuid$$", this.selectSSDucID);
      console.log('substation_nameplate_summaryURL :', substation_nameplate_summaryURL);
      axios.get(substation_nameplate_summaryURL).then(response => {
      if (response.data.status == "found") {
          this.nameplateSubStationJson = response.data;
          this.enableSSDetailsPopup = true;
          this.callssRandomNum = Math.random();
          this.isLoading = false;
        } else {
          this.nameplateSubStationJson = "";
          this.enableSSDetailsPopup = false;
          this.warningMessage('DCU not Connected');
          this.isLoading = false;
          return false;
        }
      });
    },
    showSSdetailspopup111(){
      this.isLoading = true;
      var substation_nameplate_summaryURL = this.substation_nameplate_summaryURL.replace("$$dcuid$$", this.selectSSDucID);
        axios.get(substation_nameplate_summaryURL).then(response => {
        if (response.data.status == "found") {
          this.nameplateSubStationJson = response.data;
          this.namePlateliveINCOMERDataTblJSON = this.nameplateSubStationJson.np_details.incomer_feeder_summary;
          this.namePlateliveOUTCOMERDataTblJSON = this.nameplateSubStationJson.np_details.outcomer_feeder_summary;
          this.selectsscircleTXT = this.nameplateSubStationJson.np_details.ss_circle;
          this.selectssregionTXT = this.nameplateSubStationJson.np_details.ss_region;
          this.selectSSRatingTXT = this.nameplateSubStationJson.np_details.ss_rating;
          this.selectTotincomerTXT = this.nameplateSubStationJson.np_details.ss_tot_incomer;
          this.selectnoGcsTXT = this.nameplateSubStationJson.np_details.ss_gcs;
          this.selectTotoutgoingTXT = this.nameplateSubStationJson.np_details.ss_tot_outgoing;
          this.selectnofoutgoingFeederTXT = this.nameplateSubStationJson.np_details.ss_out_feeder;
          this.selectPowerTransformerTXT = this.nameplateSubStationJson.np_details.ss_power_trns;
          this.selectSubStationLossTXT = this.nameplateSubStationJson.np_details.ss_sat_loss;
          this.selectFeederUnderMaintenceTXT = this.nameplateSubStationJson.np_details.ss_maintence;
          this.selectIdleFeederTXT = this.nameplateSubStationJson.np_details.ss_idle;
          this.selectOverloadFeederTXT = this.nameplateSubStationJson.np_details.ss_overload_feeder;
          document.getElementById("rightsideModalBTN").click();
          document.getElementById("nameplatepaneBTN").click();
          this.getfeederlist(this.selectSSDucID);
          this.isLoading = false;
        } else {
          this.nameplateSubStationJson = "";
          this.namePlateliveINCOMERDataTblJSON = "";
          this.namePlateliveOUTCOMERDataTblJSON = "";
          this.selectsscircleTXT ="";
          this.selectssregionTXT ="";
          this.selectSSRatingTXT ="";
          this.selectTotincomerTXT ="";
          this.selectnoGcsTXT ="";
          this.selectTotoutgoingTXT ="";
          this.selectnofoutgoingFeederTXT ="";
          this.selectPowerTransformerTXT ="";
          this.selectSubStationLossTXT ="";
          this.selectFeederUnderMaintenceTXT ="";
          this.selectIdleFeederTXT ="";
          this.selectOverloadFeederTXT ="";
           this.isLoading = false;
        }
      });
    },
    getLoadcurveEvent(selectSSDucID,feederName,loadcurveBTNname,startdate,enddate){
      this.isLoading = true;
      var substation_loadcurve_summaryURL = this.substation_loadcurve_summaryURL.replace("$$dcuid$$", selectSSDucID).replace("$$feedername$$", feederName).replace("$$btnname$$",loadcurveBTNname).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
      axios.get(substation_loadcurve_summaryURL).then(response => {
        if (response.data.status == "found") {
          if(loadcurveBTNname == "Day"){
            this.loadcurveoptions = this.dailychartloadcurveOptions;
          }else {
             this.loadcurveoptions = this.monthchartloadcurveOptions;
          }
          this.loadcurveseries = response.data.details;
          this.isLoading = false;
        } else {
           this.isLoading = false;
          this.loadcurveseries = [];
        }
      });
    },
    getCumulativecurveEvent(selectSSDucID,cumulativecurveBTNname,startdate,enddate){
      this.isLoading = true;
      var substation_cumulativecurve_summaryURL = this.substation_cumulativecurve_summaryURL.replace("$$dcuid$$", selectSSDucID).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
      axios.get(substation_cumulativecurve_summaryURL).then(response => {
        if (response.data.status == "found") {
        if(cumulativecurveBTNname == "Day"){
            this.cumulativecurveoptions = this.dailychartcumulativecurveOptions;
          }else {
             this.cumulativecurveoptions = this.monthchartcumulativecurveOptions;
          }
          this.cumulativecurveseries = response.data.details;
          this.isLoading = false;
        } else {
          this.cumulativecurveseries = [];
           this.isLoading = false;
        }
      });
    },
    getOutageDetails(selectSSDucID,startdate,enddate){
      this.isLoading = true;
      var substation_outage_summaryURL = this.substation_outage_summaryURL.replace("$$dcuid$$", selectSSDucID).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
      axios.get(substation_outage_summaryURL).then(response => {
        if (response.data.status == "found") {
          this.outageFromdate = response.data.outage_details.from_date;
          this.outageTodate = response.data.outage_details.to_date;
          this.outageUNAvlvalue = response.data.outage_details.tot_unavailable;
          this.feederOUTAGEDataTblJSON = response.data.outage_details;
          this.isLoading = false;
        } else {
            this.isLoading = false;
            this.outageFromdate = "";
          this.outageTodate = "";
          this.outageUNAvlvalue = "";
          this.feederOUTAGEDataTblJSON = "";
        }
      });
    },
     getIdleDetails(selectSSDucID,startdate,enddate){
      this.isLoading = true;
      var substation_idle_summaryURL = this.substation_idle_summaryURL.replace("$$dcuid$$", selectSSDucID).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
      axios.get(substation_idle_summaryURL).then(response => {
        if (response.data.status == "found") {
          this.idleFromdate = response.data.idle_details.from_date;
          this.idleTodate = response.data.idle_details.to_date;
          this.idleUnusedvalue = response.data.idle_details.tot_unused;
          this.feederIDLEDataTblJSON = response.data.idle_details;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.idleFromdate = "";
          this.idleTodate = "";
          this.idleUnusedvalue = "";
          this.feederIDLEDataTblJSON = "";
        }
      });
    },
    getOverloadDetails(selectSSDucID,startdate,enddate){
      this.isLoading = true;
      var substation_overload_summaryURL = this.substation_overload_summaryURL.replace("$$dcuid$$", selectSSDucID).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
      axios.get(substation_overload_summaryURL).then(response => {
        if (response.data.status == "found") {
          this.feederOVERLOADDataTblJSON = response.data.overload_details;
          this.isLoading = false;
        } else {
          this.feederOVERLOADDataTblJSON = "";
          this.isLoading = false;
        }
      });
    },
    getsubstationEvent(selectSSDucID,eventName,startdate,enddate){
        this.isLoading = true;
      var substation_event_summaryURL = this.substation_event_summaryURL.replace("$$dcuid$$", selectSSDucID).replace("$$eventname$$", eventName).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
      axios.get(substation_event_summaryURL).then(response => {
        if (response.data.status == "found") {
          this.eventsDataTblJSON = response.data;
          this.isLoading = false;
        } else {
            this.isLoading = false;
          this.eventsDataTblJSON = "";
        }
      });
    },
    changeYYYYDDMMFORMAT(oldtime) {
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
      var date =  yyyy + "-" + mm + "-" + dd;
      return date;
    },
    geteventslist() {
      if (this.dashboardeventsJSON.status === "found") {
        for (var i = 0; i < this.dashboardeventsJSON.event_details.length; i++
        ) {
          var eventid = this.dashboardeventsJSON.event_details[i].id;
          var datetime = this.dashboardeventsJSON.event_details[i].date_time;
          var eventtype = this.dashboardeventsJSON.event_details[i].events_type;
          var eventdetails = this.dashboardeventsJSON.event_details[i]
            .events_details;
          // var newTIMEstr = this.changeDDMMYYYYFORMAT(new Date(datetime))
          var img = document.createElement("img");
          img.src = "/static/img/images/alert.png";
          var eventspan = document.createElement("span");
          eventspan.setAttribute("id", "link" + eventid);
          eventspan.setAttribute(
            "style",
            "font-size:14px;color: #ec0000;margin-left: 10px;"
          );
          eventspan.innerHTML =
            datetime + " : " + eventtype + " : " + eventdetails;
          var evntBReakLine = document.createElement("br");
          $("#alleventarea").append(img);
          $("#alleventarea").append(eventspan);
          $("#alleventarea").append(evntBReakLine);
        }
      } else {
        var evntEmtyspan = document.createElement("span");
        evntEmtyspan.innerHTML = "No entries events";
        $("#alleventarea").append(evntEmtyspan);
        return false;
      }
    },
    getcirclefromTreeGrid(regionName, circleName, dataBool, dataObject) {
      if (dataBool) {
        var dataBoolArray = [];
        for (var index = 0; index < dataObject.length; index++) {
          // console.log(circleName+'-------dataBool Condition---------------'+dataObject[index].circle);
          if (circleName == dataObject[index].circle) {
            dataBoolArray.push(dataObject[index]);
          }
        }
        return dataBoolArray;
      }
    },
     getRegionfromTreeGrid(regionName, circleName, dataBool, dataObject) {
      if (!dataBool) {
        var dataBoolArray = [];
        for (var index = 0; index < dataObject.length; index++) {
          if (regionName == dataObject[index].region) {
            dataBoolArray.push(dataObject[index]);
          }
        }
        return dataBoolArray;
      }
    },
    regionCLICKmethod(regionName, circleName, dataBool) {
      console.log('regionName :', regionName);
      console.log('circleName :', circleName);
      console.log('dataBool :', dataBool);
      this.selectMapRegionTXT = regionName;
      this.selectMapCircleTXT = circleName;
      this.selectMapSSTXT = "";
      this.selectMapDataBollTXT = dataBool;
      this.startLocation = {};
      this.coordinates = [];
      this.mapzoom = 8;
      if(dataBool){
      if(this.regiontreeviewdata.length !=0){
                  for(var kk=0;kk<this.regiontreeviewdata.length; kk++){
                      if(circleName == this.regiontreeviewdata[kk].name){
                        this.regiontreeviewdata[kk]['isSelected'] = true;
                     }else{
                       delete this.regiontreeviewdata[kk]["isSelected"];
                         //this.regiontreeviewdata[kk]['isSelected'] = false;
                     }
                }
      }
      }
       if (regionName == "All") {
          this.startLocation = {
          lat: 12.385242,
          lng: 78.410529
        };
        this.coordinates = this.allRegionObject.details;
        this.mapzoom = 4;
       // document.getElementById("radios0").checked = true;
      } else if (regionName != "") {
        // this.startLocation = {
        //   lat: 13.0827,
        //   lng: 80.2707
        // };
        if (dataBool) {
          this.coordinates = this.getcirclefromTreeGrid(
            regionName,
            circleName,
            dataBool,
            this.allRegionObject.details
          );
          this.startLocation = {
          lat: this.coordinates[0].lat,
          lng: this.coordinates[0].lng
          };
        } else {
          this.coordinates = this.getRegionfromTreeGrid(
            regionName,
            circleName,
            dataBool,
            this.allRegionObject.details
          );
          this.startLocation = {
          lat: this.coordinates[0].lat,
          lng: this.coordinates[0].lng
          };
        }
      }else{
         this.coordinates = {};
         this.startLocation = {};
      }


    console.log(JSON.stringify(this.coordinates)+': startLocation :'+JSON.stringify(this.startLocation));
    //   if (regionName == "All") {
    //     this.coordinates = this.allRegionObject.details;
    //     this.startLocation = {
    //       lat: 12.385242,
    //       lng: 78.410529
    //     };
    //     this.mapzoom = 4;
    //    // document.getElementById("radios0").checked = true;
    //   } else if (regionName == "Chennai North") {
    //     this.startLocation = {
    //       lat: 13.0827,
    //       lng: 80.2707
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //       this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //    // document.getElementById("radios1").checked = true;
    //   } else if (regionName == "Chennai South") {
    //     this.startLocation = {
    //       lat: 13.0827,
    //       lng: 80.2707
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //       this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //    // document.getElementById("radios2").checked = true;
    //   } else if (regionName == "Coimbatore") {
    //     this.startLocation = {
    //       lat: 11.004556,
    //       lng: 76.961632
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //       this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //     //  document.getElementById("radios3").checked = true;
    //   } else if (regionName == "Erode") {
    //     this.startLocation = {
    //       lat: 11.170131,
    //       lng: 77.445024
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //       this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //   //  document.getElementById("radios4").checked = true;
    //   } else if (regionName == "Madurai") {
    //     this.startLocation = {
    //       lat: 9.9435,
    //       lng: 78.143703
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //       this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //  //   document.getElementById("radios5").checked = true;
    //   } else if (regionName == "Tirunelveli") {
    //     this.startLocation = {
    //       lat: 8.995529,
    //       lng: 77.625152
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //       this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //   //  document.getElementById("radios6").checked = true;
    //   } else if (regionName == "Trichy") {
    //     this.startLocation = {
    //       lat: 10.74626,
    //       lng: 78.503718
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //      this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //    //   document.getElementById("radios7").checked = true;
    //   } else if (regionName == "Vellore") {
    //     this.startLocation = {
    //       lat: 12.9231,
    //       lng: 78.797151
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //      this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //   // document.getElementById("radios8").checked = true;
    //   } else if (regionName == "Villupuram") {
    //     this.startLocation = {
    //       lat: 11.862887,
    //       lng: 79.374408
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //       this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //   //  document.getElementById("radios9").checked = true;
    //   } else if (regionName.toLowerCase() == "bangalore") {
    //     this.startLocation = {
    //       lat: 13.02392,
    //       lng: 77.51540
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //       this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //   //  document.getElementById("radios9").checked = true;
    //   } else if (regionName.toLowerCase() == "rajasthan") {
    //     this.startLocation = {
    //       lat: 26.4499,
    //       lng: 74.6399
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //       this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //   //  document.getElementById("radios9").checked = true;
    //   }  else if (regionName.toLowerCase() == "kolkatta") {
    //     this.startLocation = {
    //       lat: 22.9747,
    //       lng: 88.4337
    //     };
    //     if (dataBool) {
    //       this.coordinates = this.getcirclefromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     } else {
    //       this.coordinates = this.getRegionfromTreeGrid(
    //         regionName,
    //         circleName,
    //         dataBool,
    //         this.allRegionObject.details
    //       );
    //     }
    //   //  document.getElementById("radios9").checked = true;
    //   } else if (regionName == "WEDC") {
    //     this.startLocation = {};
    //     this.coordinates = {};
    //     document.getElementById("radios10").checked = true;
    //   } else {
    //     this.startLocation = {};
    //     this.coordinates = {};
    //   }
    },
    geteventslist123() {
      document.getElementById("alleventarea").innerHTML = "";
      axios
        .get(this.getDashboardeventlistUrl)
        .then(response => {
          this.dashboardeventsJSON = response.data;
          if (this.dashboardeventsJSON.status === "found") {
            for (
              var i = 0;
              i < this.dashboardeventsJSON.event_details.length;
              i++
            ) {
              var eventid = this.dashboardeventsJSON.event_details[i].id;
              var datetime = this.dashboardeventsJSON.event_details[i]
                .date_time;
              var eventtype = this.dashboardeventsJSON.event_details[i]
                .events_type;
              var eventdetails = this.dashboardeventsJSON.event_details[i]
                .events_details;
              var newTIMEstr = this.changeDDMMYYYYFORMAT(datetime);
              var img = document.createElement("img");
              img.src = "img/images/events.png";
              var eventspan = document.createElement("span");
              eventspan.setAttribute("id", "link" + eventid);
              eventspan.setAttribute(
                "style",
                "font-size:10px;color: #f96332;margin-left: 5px;"
              );
              eventspan.innerHTML =
                newTIMEstr + " : " + eventtype + " : " + eventdetails;
              var evntBReakLine = document.createElement("br");
              $("#alleventarea").append(img);
              $("#alleventarea").append(eventspan);
              $("#alleventarea").append(evntBReakLine);
            }
          } else {
            var evntEmtyspan = document.createElement("span");
            evntEmtyspan.innerHTML = "No entries events";
            $("#alleventarea").append(evntEmtyspan);
            return false;
          }
        })
        .catch(function(error) {
          this.isLoading = false;
          alert(error);
        });
    },
    customiseCell: function(args) {
      if (args.column.field === "connect_data") {
        args.cell.setAttribute(
          "style",
          "text-align:center;background-color:#3b5680;color:white;font-weight:bold"
        );
      } else if (args.column.field === "connect_daily") {
        args.cell.setAttribute(
          "style",
          "background-color:#1b3e75;color:white;text-align:center;font-weight:bold"
        );
      } else if (args.column.field === "connect_monthly") {
        args.cell.setAttribute(
          "style",
          "background-color:#032457;color:white;text-align:center;font-weight:bold"
        );
      } else if (args.column.field === "data_avl_data") {
        args.cell.setAttribute(
          "style",
          "text-align:center;background-color:#35d5b6;color:white;font-weight:bold"
        );
      } else if (args.column.field === "data_avl_daily") {
        args.cell.setAttribute(
          "style",
          "background-color:#1bbfa0;color:white;text-align:center;font-weight:bold"
        );
      } else if (args.column.field === "data_avl_monthly") {
        args.cell.setAttribute(
          "style",
          "background-color:#049f82;color:white;text-align:center;font-weight:bold"
        );
      } else if (args.column.field === "ls_data") {
        args.cell.setAttribute(
          "style",
          "text-align:center;background-color:#35d5b6;color:white;font-weight:bold"
        );
      } else if (args.column.field === "mn_data") {
        args.cell.setAttribute(
          "style",
          "background-color:#1bbfa0;color:white;text-align:center;font-weight:bold"
        );
      } else if (args.column.field === "bill_data") {
        args.cell.setAttribute(
          "style",
          "background-color:#049f82;color:white;text-align:center;font-weight:bold"
        );
      } else if (args.column.field === "ls_monthly") {
        args.cell.setAttribute(
          "style",
          "text-align:center;background-color:#35d5b6;color:white;font-weight:bold"
        );
      } else if (args.column.field === "mn_monthly") {
        args.cell.setAttribute(
          "style",
          "background-color:#1bbfa0;color:white;text-align:center;font-weight:bold"
        );
      } else if (args.column.field === "bill_monthly") {
        args.cell.setAttribute(
          "style",
          "background-color:#049f82;color:white;text-align:center;font-weight:bold"
        );
      }
    },
    opensldDiagrampopup() {
      this.$modal.show("sldDiagrampopup");
    },
    openConnectivitydatapopup() {
      this.$modal.show("connectDatavailpopup");
     },
     markerConvBTN(btnName){
      var regionID = this.selectSSObject.region_id;
      var circleID = this.selectSSObject.circle_id;
      var substationID = this.selectSSObject.dcu_id;
      if(btnName == "Day"){
      document.getElementById("conncurveDailyBTN").classList.add("active");
      document.getElementById("conncurveWeekBTN").classList.remove("active");
      document.getElementById("conncurveMonthBTN").classList.remove("active");
      this.markerConvBTNLBL = "dayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getsubstationdataAvlandconnMethod(regionID,circleID,substationID,this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate));
      } else if(btnName == "Week"){
      document.getElementById("conncurveWeekBTN").classList.add("active");
      document.getElementById("conncurveDailyBTN").classList.remove("active");
      document.getElementById("conncurveMonthBTN").classList.remove("active");
      this.markerConvBTNLBL = "weekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getsubstationdataAvlandconnMethod(regionID,circleID,substationID,this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate));
      } else if(btnName == "Month"){
     document.getElementById("conncurveMonthBTN").classList.add("active");
      document.getElementById("conncurveWeekBTN").classList.remove("active");
      document.getElementById("conncurveDailyBTN").classList.remove("active");
      this.markerConvBTNLBL = "monthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getsubstationdataAvlandconnMethod(regionID,circleID,substationID,this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate));
      }
    },
    closeConnectivitydatapopup() {
      this.$modal.hide("connectDatavailpopup");
    },
    beforeOpen() {},
    beforeClose() {},
    opened(e) {},
    markerbegoreopened(){
    },
    markeropened(e) {
      this.markerConvBTN('Week');
    },
    closed(e) {},
    sldDiagrampopupcloseACtion() {
      this.$modal.hide("sldDiagrampopup");
    },
    rowDataBound: function(args) {
      //console.log("DATA::::::"+JSON.stringify(args));
      //alert(JSON.stringify(args.data.circleName));
      this.regionCLICKmethod(
        args.data.region,
        args.data.display_name,
        args.data.data
      );
    },
    datepopupcloseACtion() {
      this.$modal.hide("datepopup");
    },
    changeDDMMYYYYFORMAT(oldtime) {
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
      var date = dd + "-" + mm + "-" + yyyy;
      return date;
    },
    getdatetimeFORMAT(oldtime) {
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
      var date = dd + "-" + mm + "-" + yyyy +" "+ hh+ ":" +min+ ":" +sec;
      return date;
    },
    dailyFormattedDate(date) {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getFullYear();
      var monthStr = month <= 9 ? "0" + month : month;
      var dateStr = day <= 9 ? "0" + day : day;
      return monthStr + "/" + dateStr + "/" + year;
      // return year + "-" + (month <= 9)  ? ("0" + month) : (month) + "-" + (day <= 9)  ? ("0" + day) : (day);
    },
    successMessage(msg) {
      this.$notice.success({
        title: 'Notification',
        description: msg,
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      })
    },
    warningMessage(msg) {
      this.$notice.warning({
        title: 'Notification',
        description: msg,
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      })
    },
    infoMessage(msg) {
      this.$notice.info({
        title: 'Notification',
        description: msg,
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      })
    },
    errorMessage(msg) {
      this.$notice.error({
        title: 'Notification',
        description: msg,
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      })
    }
  }
};
</script>
<style>
.e-grid .e-headercelldiv {
font-size: 13px !important;
     color: rgb(52, 75, 121) !important;
      font-weight: bold !important;
      text-overflow: unset !important;
}
.e-grid .e-headercell, .e-grid .e-detailheadercell {
      font-size: 13px !important;
      color: rgb(52, 75, 121) !important;
      font-weight: bold !important;
}
.control_wrapper {
        display: block;
        max-width: 350px;
        max-height: 400px;
        margin: auto;
        overflow: auto;
        border: 1px solid #dddddd;
        border-radius: 3px;
}
.info-box {
  cursor: default !important;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
.bg-theme {
  background-color: #032457 !important;
}
.bg-theme2 {
  background-color: #049f82 !important;
}
.inputTEXTcss {
  border: 1px solid lightgray;
  width: 100%;
  height: 30px;
}

.modal.left .modal-dialog,
.modal.right .modal-dialog {
  position: fixed;
  margin: auto;
  width: 88%;
  height: 100%;
  -webkit-transform: translate3d(0%, 0, 0);
  -ms-transform: translate3d(0%, 0, 0);
  -o-transform: translate3d(0%, 0, 0);
  transform: translate3d(0%, 0, 0);
}

.modal.left .modal-content,
.modal.right .modal-content {
  height: 100%;
  /*Left*/
  overflow-y: auto;
}
.modal.left .modal-body,
.modal.right .modal-body {
  padding: 15px 15px 10px;
}

/*Left*/
.modal.left.fade .modal-dialog {
  left: -320px;
  -webkit-transition: opacity 0.3s linear, left 0.3s ease-out;
  -moz-transition: opacity 0.3s linear, left 0.3s ease-out;
  -o-transition: opacity 0.3s linear, left 0.3s ease-out;
  transition: opacity 0.3s linear, left 0.3s ease-out;
}

.modal.left.fade.in .modal-dialog {
  left: 0;
}

/*Right*/
.modal.right.fade .modal-dialog {
  right: -320px;
  -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
  -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
  -o-transition: opacity 0.3s linear, right 0.3s ease-out;
  transition: opacity 0.3s linear, right 0.3s ease-out;
}

.modal.right.fade.in .modal-dialog {
  right: 0;
}

/* ----- MODAL STYLE ----- */
.modal-content {
  border-radius: 0;
  border: none;
}

.modal-header {
  border-bottom-color: #eeeeee;
  background-color: #fafafa;
}

/* ----- v CAN BE DELETED v ----- */
body {
  background-color: #78909c;
}

.demo {
  padding-top: 60px;
  padding-bottom: 110px;
}

.btn-demo {
  margin: 15px;
  padding: 10px 15px;
  border-radius: 0;
  font-size: 16px;
  background-color: #ffffff;
}

.btn-demo:focus {
  outline: 0;
}

.demo-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 15px;
  background-color: #212121;
  text-align: center;
}

.demo-footer > a {
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
}

.grid {
  list-style: none;
}

.gc {
  box-sizing: border-box;
  display: inline-block;
  margin-right: -0.25em;
  min-height: 1px;
  padding-left: 40px;
  vertical-align: top;
}

.gc--1-of-3 {
  width: 15%;
}

.gc--2-of-3 {
  width: 85%;
}

.naccs {
  position: relative;
}

.naccs .menu div {
  padding: 15px 20px 15px 40px;
  margin-bottom: 10px;
  color: #fff;
  background: #174b79;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  vertical-align: middle;
  font-weight: 700;
  transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
}

.naccs .menu div:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.naccs .menu div span.light {
  height: 10px;
  width: 10px;
  position: absolute;
  top: 24px;
  left: 15px;
  background-color: transparent;
  border-radius: 100%;
  transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
}

.naccs .menu div.active span.light {
  background-color: #fbc02d;
  left: 0;
  height: 100%;
  width: 3px;
  top: 0;
  border-radius: 0;
}

.naccs .menu div.active {
  color: #fbc02d;
  padding: 15px 20px 15px 20px;
}

ul.nacc {
  position: relative;
  height: 0px;
  list-style: none;
  margin: 0;
  padding: 0;
  transition: 0.5s all cubic-bezier(0.075, 0.82, 0.165, 1);
}

ul.nacc li {
  opacity: 0;
  width: 100%;
  transform: translateY(100px);
  position: absolute;
  list-style: none;
  transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
}

ul.nacc li.active {
  transition-delay: 0.3s;
  z-index: 2;
  opacity: 1;
  transform: translateX(0px);
}

ul.nacc li p {
  margin: 0;
}

table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td,
table th {
  border: 1px solid rgb(235, 232, 232);
  padding: 8px;
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
  background-color: #174b79;
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
.fontsize16 {
  font-size: 17px;
}
</style>
