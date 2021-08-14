<template>
  <section class="content" id="dashboardgraphicalPANE">
    <vue-element-loading :active="isLoading" spinner="line-wave" color="#000" :is-full-screen="true"/>
       <div class="row">
           <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="box">
          <div class="box-header with-border" style="text-align:center">
            <h3 class="box-title">Connectivity Summary</h3>
            <div class="text-right btn-group" style="float:right" role="group">
            </div>
          </div>
          <div class="box-body">
           <div class="col-md-4 col-sm-6 col-xs-12">
        <span
          class="dataav-theme"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Today&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="dataav-theme info-box-icon" style="width: 60px;">
             <i class="fa fa-wifi" style="color:#fff"></i>
          </span>
          <div class="info-box-content text-left">
            <span class="info-box-text" style="font-size:35px;">{{conngraphtodayPer}}</span>
            <span class="info-box-number text-right" style="font-size:12px;margin-top:10px;margin-left: -1px;">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> {{conngraphtodayPerTime}}
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <span
          class="dataav-theme"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Daily Avg&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="dataav-theme info-box-icon" style="width: 60px;">
               <img src="/static/img/images/connectivity_avg.png" style="margin-top: -10px;"/>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:35px;">{{conngraphtodayAvgPer}}</span>
            <span class="info-box-number text-right" style="font-size:12px;margin-top:10px;margin-left: -40px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> {{conngraphtodayAvgPerTime}}
            </span>
          </div>
        </div>
      </div>
      <!-- /.col -->
      <div class="col-md-4 col-sm-6 col-xs-12">
        <span
          class="dataav-theme"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Monthly Avg&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="dataav-theme info-box-icon" style="width: 60px;">
              <img src="/static/img/images/connectivity_month_avg.png" style="margin-top: -10px;"/>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:35px;">{{conngraphmonthPer}}</span>
            <span class="info-box-number text-right" style="font-size:12px;margin-top:10px;margin-left: -40px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> {{conngraphmonthPerTime}}
            </span>
          </div>
        </div>
      </div>
          </div>
        </div>
           </div>
           <div class="col-md-6 col-sm-6 col-xs-12">
                       <div class="box">
          <div class="box-header with-border" style="text-align:center">
            <h3 class="box-title">Data Availability Summary</h3>
            <div class="text-right btn-group" style="float:right" role="group">
            </div>&nbsp; &nbsp;
          </div>
          <div class="box-body">
           <div class="col-md-4 col-sm-6 col-xs-12">
        <span
          class="dataav-theme2"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Today&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="dataav-theme2 info-box-icon" style="width: 60px;">
              <img src="/static/img/images/data_aval1.png" style="margin-top: -10px;"/>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:35px;">{{dataAvlgraphtodayPer}}</span>
            <span class="info-box-number text-right" style="font-size:12px;margin-top:10px;margin-left: -1px;">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> {{dataAvlgraphtodayPerTime}}
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <span
          class="dataav-theme2"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Daily Avg&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="dataav-theme2 info-box-icon" style="width: 60px;">
               <img src="/static/img/images/data_aval_avg.png" style="margin-top: -10px;"/>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:35px;">{{dataAvlgraphtodayAvgPer}}</span>
            <span class="info-box-number text-right" style="font-size:12px;margin-top:10px;margin-left: -40px;">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> {{dataAvlgraphtodayAvgPerTime}}
            </span>
          </div>
        </div>
      </div>
      <!-- /.col -->
      <div class="col-md-4 col-sm-6 col-xs-12">
        <span
          class="dataav-theme2"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Monthly Avg&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box outerline">
          <span class="dataav-theme2 info-box-icon" style="width: 60px;">
           <img src="/static/img/images/data_aval_month1.png" style="margin-top: -10px;"/>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:35px;">{{dataAvlgraphmonthAvgPer}}</span>
            <span class="info-box-number text-right" style="font-size:12px;margin-top:10px;margin-left: -40px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> {{dataAvlgraphmonthAvgPerTime}}
            </span>
          </div>
        </div>
      </div>
          </div>
        </div>
           </div>
       </div>
    <!-- Main row -->
    <div class="row">
      <div class="col-md-8 col-sm-6 col-xs-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">Status</h3>
        &nbsp;&nbsp;&nbsp;
       <label class="radio-inline radiotop" @click="connectivityMethod" v-show="false">
        <input type="radio" name="optradio" v-show="false">Connectivity
      </label>
      <label class="radio-inline radiotop" @click="datavailMethod" v-show="false">
      <input type="radio" name="optradio" v-show="false">Data Availability
      </label>
      <label class="radio-inline radiotop" @click="bothMethod" v-show="false">
      <input type="radio" name="optradio" checked v-show="false">Both
      </label>
            <div class="text-right btn-group" style="float:right" role="group">
              <button id="graphDayBTN" type="button" class="btn btn-primary" @click="graphBTNmethod('Day')">Day</button>
              <button id="graphWeekBTN" type="button" class="btn btn-primary active" @click="graphBTNmethod('Week')">Week</button>
              <button id="graphMonthBTN" type="button" class="btn btn-primary" @click="graphBTNmethod('Month')">Month</button>
            </div>
            <div style="float:right">
              <select
                id="chartTypeTEXT"
                v-model="chartTypeTEXT"
                class="inputTEXTcss"
                style="width:135px;height: 35px;"
              >
                <option value="choose chart type" selected disabled>choose chart type</option>
                <option value="line">Line</option>
                <option value="bar">Bar</option>
              </select> &nbsp; &nbsp;&nbsp;
            </div>
          </div>
          <div class="box-body" v-show="overallGraphdataseries.length != 0 ">
            <apexchart
              width="100%"
              height="368"
              :type="chartTypeTEXT"
              :options="overallGraphdataoptions"
              :series="overallGraphdataseries"
            ></apexchart>
          </div>
          <div class="box-body" v-show="overallGraphdataseries.length == 0 ">
            <div style="height:380px;"><span>No record found</span></div>
               </div>
        </div>
      </div>
      <!-- /.col -->
      <div class="col-md-4 col-sm-6 col-xs-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">Connectivity</h3>
         <!--   <div class="text-right" style="float:right">
              <div class="text-right btn-group" style="float:right" role="group">
                <button id="WeekBTN" type="button" class="btn btn-primary active">Day</button>
                <button id="WeekBTN" type="button" class="btn btn-primary">Week</button>
                <button id="MonthBTN" type="button" class="btn btn-primary">Month</button>
              </div>
            </div> -->
          </div>
         <div class="box-body" v-show="hzConnectivtydataseries.length != 0">
             <apexchart
              width="100%"
              height="165"
              type="bar"
              :options="hzConnectivtydataoptions"
              :series="hzConnectivtydataseries"
              @dataPointSelection="clickConnvHandler"
            ></apexchart>
          </div>
          <div class="box-body" v-show="hzConnectivtydataseries.length == 0">
              <div style="height:180px;"><span>No record found</span></div>
          </div>
           <div class="box-header with-border" style="margin-top: -25px;">
            <h3 class="box-title">Data Availability</h3>
         <!--   <div class="text-right" style="float:right">
              <div class="text-right btn-group" style="float:right" role="group">
                <button id="WeekBTN" type="button" class="btn btn-primary active">Day</button>
                <button id="WeekBTN" type="button" class="btn btn-primary">Week</button>
                <button id="MonthBTN" type="button" class="btn btn-primary">Month</button>
              </div>
            </div> -->
          </div>
         <div class="box-body" v-show="hzDATAAVAILdataseries.length != 0">
            <apexchart
              width="100%"
              height="165"
              type="bar"
              :options="hzDATAAVAILdataoptions"
              :series="hzDATAAVAILdataseries"
              @dataPointSelection="clickDataAvalHandler"
            ></apexchart>
          </div>
          <div class="box-body" v-show="hzDATAAVAILdataseries.length == 0">
              <div style="height:180px;"><span>No record found</span></div>
          </div>
        </div>
      </div>

      <!-- /.col -->
    </div>
<div class="row" id="regionwiseGraphPANE">
      <div class="col-md-12 col-sm-6 col-xs-12">
 <div class="box">
 <div class="box-header with-border">
            <h3 class="box-title">
              Region Wise
            </h3>
            <div class="text-right btn-group" style="float:right" role="group" v-show="false">
              <button id="reDayBTN" type="button" class="btn btn-primary">Day</button>
              <button id="reWeekBTN" type="button" class="btn btn-primary active">Week</button>
              <button id="reMonthBTN" type="button" class="btn btn-primary">Month</button>
            </div>&nbsp; &nbsp; &nbsp; &nbsp;
            <div style="float:right" v-show="false">
                <select
                id="regionTXTID"
                v-model="regionTXT"
                class="inputTEXTcss"
                style="width:118px;;height: 35px;"
              >
                <option value="choose region" selected disabled>choose region</option>
              </select>
              <select
                id="circleTXT"
                v-model="circleTXT"
                class="inputTEXTcss"
                style="width:105px;height: 35px;"
              >
                <option value="choose circle" selected disabled>choose circle</option>
              </select>
              <select
                id="substationTXT"
                v-model="substationTXT"
                class="inputTEXTcss"
                style="width:145px;height: 35px;"
              >
                <option value="choose sub station" selected disabled>choose sub station</option>
              </select>&nbsp;&nbsp;&nbsp;
            </div>
          </div>
          
          <div class="box-body">
            <div id="regionwiseGraphID">
                <div v-for="(regionItem,index) in regionListArray" :key="index">
            <div class="col-sm-3 col-xs-12" style="border:1px solid lightgray">
              <div class="row">
                <div class="col-lg-6 col-xs-12">
               <h4 style="color:#032457"> <i class="fa fa-map-marker"></i> {{regionItem.REGION_NAME}}</h4>
                </div>
                <div class="col-lg-6 col-xs-12 text-right" style="margin-top: 10px;">
                  <img src="/static/img/images/newwindow.png" width="25" @click="openregionPopup(regionItem.REGION_ID,regionItem.REGION_NAME)" style="cursor:pointer" title="View more.."/>
                </div>
              </div>
              <div class="row" v-if="getregionWiseGraphJSON != ''">
              <div class="col-lg-12 col-xs-12" v-if="getregionWiseGraphJSON.detailsObj[regionItem.REGION_NAME.toLowerCase()+'detailsArray'] != undefined">
              <apexchart
                width="100%"
                height="200"
                type="line"
                :options="regionwisedataoptions"
                :series="getregionWiseGraphJSON.detailsObj[regionItem.REGION_NAME.toLowerCase()+'detailsArray']"
              ></apexchart>
                   </div>



<!--                   
                   <div class="col-lg-12 col-xs-12" v-if="getregionWiseGraphJSON.detailsObj.chennaisouthdetailsArray != undefined && index == 1">
              <apexchart
                width="100%"
                height="200"
                type="line"
                :options="regionwisedataoptions"
                :series="getregionWiseGraphJSON.detailsObj.chennaisouthdetailsArray"
              ></apexchart>
                   </div>
                   <div class="col-lg-12 col-xs-12" v-if="getregionWiseGraphJSON.detailsObj.coimbatoredetailsArray != undefined && index == 2">
              <apexchart
                width="100%"
                height="200"
                type="line"
                :options="regionwisedataoptions"
                :series="getregionWiseGraphJSON.detailsObj.coimbatoredetailsArray"
              ></apexchart>
                   </div>
                   <div class="col-lg-12 col-xs-12" v-if="getregionWiseGraphJSON.detailsObj.erodedetailsArray != undefined && index == 3">
              <apexchart
                width="100%"
                height="200"
                type="line"
                :options="regionwisedataoptions"
                :series="getregionWiseGraphJSON.detailsObj.erodedetailsArray"
              ></apexchart>
                   </div>
                  <div class="col-lg-12 col-xs-12" v-if="getregionWiseGraphJSON.detailsObj.maduraidetailsArray != undefined && index == 4">
              <apexchart
                width="100%"
                height="200"
                type="line"
                :options="regionwisedataoptions"
                :series="getregionWiseGraphJSON.detailsObj.maduraidetailsArray"
              ></apexchart>
                   </div>
                   <div class="col-lg-12 col-xs-12" v-if="getregionWiseGraphJSON.detailsObj.tirunelvelidetailsArray != undefined && index == 5">
              <apexchart
                width="100%"
                height="200"
                type="line"
                :options="regionwisedataoptions"
                :series="getregionWiseGraphJSON.detailsObj.tirunelvelidetailsArray"
              ></apexchart>
                   </div>
                   <div class="col-lg-12 col-xs-12" v-if="getregionWiseGraphJSON.detailsObj.trichydetailsArray != undefined && index == 6">
              <apexchart
                width="100%"
                height="200"
                type="line"
                :options="regionwisedataoptions"
                :series="getregionWiseGraphJSON.detailsObj.trichydetailsArray"
              ></apexchart>
                   </div>
                   <div class="col-lg-12 col-xs-12" v-if="getregionWiseGraphJSON.detailsObj.velloredetailsArray != undefined && index == 7">
              <apexchart
                width="100%"
                height="200"
                type="line"
                :options="regionwisedataoptions"
                :series="getregionWiseGraphJSON.detailsObj.velloredetailsArray"
              ></apexchart>
                   </div>
                   <div class="col-lg-12 col-xs-12" v-if="getregionWiseGraphJSON.detailsObj.villupuramdetailsArray != undefined && index == 8">
              <apexchart
                width="100%"
                height="200"
                type="line"
                :options="regionwisedataoptions"
                :series="getregionWiseGraphJSON.detailsObj.villupuramdetailsArray"
              ></apexchart>
                   </div>
                    <div class="col-lg-12 col-xs-12" v-if="getregionWiseGraphJSON.detailsObj.wedcdetailsArray != undefined && index == 9">
              <apexchart
                width="100%"
                height="200"
                type="line" 
                :options="regionwisedataoptions"
                :series="getregionWiseGraphJSON.detailsObj.wedcdetailsArray"
              ></apexchart>
                   </div> -->
                </div>
            </div>
              </div>
          </div>
 </div>
 </div>
      </div>
</div>


     <modal name="dcuPercntagepopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"  style="z-index:11 !important"
        :reset="true"
        width="50%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-6" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{horizontalChartClk}} </h4>
              </div>
              <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button id="dcuPercntagepopupCloseBTN" type="button" class="btn btn-default" @click="hideDCUPercentagePopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;" >
            <p>{{horizontalChartClk}}  - Sub Station Table</p>
            <div class="row">
              <div class="col-lg-12">
               <template>
              <div class="table-responsive" id="dcuConnectivityTablePANE" style="border:1px solid lightgray;height:450px">
                <table
                  class="table table-bordered"
                  id="dcuConnectivityTablePANEID"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Region Name</th>
                              <th>Circle Name</th>
                              <th>SS Name</th>
                    </tr>
                  </thead>
                    <tbody v-if="dcuConnectivityTBLJSONS != ''">
                            <tr v-for="(row,index) in dcuConnectivityTBLJSONS" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{row.REGION_NAME}}</td>
                              <td>{{row.CIRCLE_NAME}}</td>
                              <td @click="getSSDetailspopup(row)"><a style="cursor:pointer;" >{{row.SS_NAME}}</a></td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="dcuConnectivityTBLJSONS == ''" style="text-align:center;width: 100%;">
                      <span>No records found</span>
                 </div>
              </div>
            </template> 
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center">
            <a id="clspercommandBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="hideDCUPercentagePopup">Cancel</a>
          </div>
          </div>
          </modal>


 <!--regionpopup START-->
        <modal name="openregionpopupNAME" transition="nice-modal-fade" classes="demo-modal-class" :min-width="500" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"  style="z-index:11 !important"
        :scrollable="true"
        :reset="true"
        width="60%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-6" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{openregionpopupTitle}} - Details</h4>
              </div>
              <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button id="openregionpopup_closeBTN" type="button" class="btn btn-default" @click="openregionpopupclose" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
              <div class="row">

              <div class="col-lg-4 text-left">
                <span>Choose Circle: </span>
                 <select
                id="circleoperationTXTID"
                v-model="circleoperationTXT"
                class="inputTEXTcss" @change="changeCircleName(circleoperationTXT)"
                style="width:60%;height: 35px;"
              >
                <option value="choose circle" selected disabled>choose circle</option>
                <option v-for="(circleItem,index) in  circleItemArray" :key="index" :value="circleItem.CIRCLE_ID" >{{circleItem.CIRCLE_NAME}}</option>
              </select>
              </div>
              <div class="col-lg-4 text-left">
                <span>Choose Sub Station: </span>
               <select
                id="substationoperationTXTID" @change="chngeSSMethod()"
                v-model="substationoperationTXT"
                class="inputTEXTcss"
                style="width:60%;height: 35px;"
              >
                <option value="choose sub station" selected disabled>choose sub station</option>
                <option v-for="(ssItem,index) in  circleSUBstationArray" :key="index"  :value="ssItem.DCU_ID">{{ssItem.DCU_LOCATION}}</option>
              </select>
              </div>
              <div class="col-lg-2 text-left">
                <button type="submit" class="btn btn-primary" @click="applysubstationdetails(circleoperationTXT,substationoperationTXT)">Apply</button>
              </div>
            </div>
              <p></p>
              <div class="row" style="border:1px solid lightgray;height:440px" >
                 <p></p>
                            <div class="col-lg-6 text-left" v-show="getsubstationArrayseries.length != 0">
                              <span style="color:#0073b7">Line Chart View:</span>
                            </div>
                           <div class="col-lg-6 text-right" v-show="getsubstationArrayseries.length != 0">
               <div class="btn-group"  role="group">
              <button id="sschartDayBTN" type="button" class="btn btn-primary" @click="sschartBTNmethod('Day')">Day</button>
              <button id="sschartWeekBTN" type="button" class="btn btn-primary active" @click="sschartBTNmethod('Week')">Week</button>
              <button id="sschartMonthBTN" type="button" class="btn btn-primary" @click="sschartBTNmethod('Month')">Month</button>
              </div>
            </div>
           <div class="col-lg-12 text-left" v-show="getsubstationArrayseries.length != 0">
          <apexchart
              width="100%"
              height="378"
              type="line"
              :options="getsubstationArraydataoptions"
              :series="getsubstationArrayseries"
            ></apexchart>
                         </div>

                         <div class="col-lg-12 text-center" v-show="getsubstationArrayseries.length == 0">
                           <span>no record found</span>
                         </div>
                         </div>

          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
            <a id="clseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="openregionpopupclose">Cancel</a>
          </div>
          </div>
          </modal>

 <!--regionpopup END-->


    <div class="row" v-show="false">
      <div class="col-md-8 col-sm-6 col-xs-12">
        <div class="box" style="height:440px;">
          <div class="box-header with-border">
            <h3 class="box-title">
              Status
            </h3>
            <div class="text-right btn-group" style="float:right" role="group">
              <button id="WeekBTN" type="button" class="btn btn-primary active">Week</button>
              <button id="MonthBTN" type="button" class="btn btn-primary">Month</button>
            </div>&nbsp; &nbsp; &nbsp; &nbsp;
            <div style="float:right">
                <select
                id="regionTXTID"
                v-model="regionTXT"
                class="inputTEXTcss"
                style="width:118px;;height: 35px;"
              >
                <option value="choose region" selected disabled>choose region</option>
              </select>
              <select
                id="circleTXT"
                v-model="circleTXT"
                class="inputTEXTcss"
                style="width:105px;height: 35px;"
              >
                <option value="choose circle" selected disabled>choose circle</option>
              </select>
              <select
                id="substationTXT"
                v-model="substationTXT"
                class="inputTEXTcss"
                style="width:145px;height: 35px;"
              >
                <option value="choose sub station" selected disabled>choose sub station</option>
              </select>&nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <div class="box-body">
            <div class="col-sm-6 col-xs-12">
              <apexchart
                width="100%"
                height="380"
                type="line"
                :options="regionwisedataoptions"
                :series="circledataseries"
              ></apexchart>
            </div>
             <div class="col-sm-6 col-xs-12">
<div style="float:right">
            <img src="/static/img/images/red15.png"> 0 - 20%
            <img src="/static/img/images/yellow15.png"> 21 - 50%
            <img src="/static/img/images/perul15.png"> 51 - 80%
            <img src="/static/img/images/green15.png"> 81 - 100% </div>
            <div style="height:15px"></div>
            <div style="border:1px solid lightgray;width:100%;height:345px;overflow-y:scroll">
            <table style="margin-bottom: 0px;"
              id="StatusTableID"
              class="table table-bordered"
              v-for="(tableRow, tableIndex) in countlength"
              :key="tableIndex"
            >
              <tr>
                <span v-for="(row, index) in heatmapArrayList" :key="index">
                  <span
                    v-if="index >=  (tableIndex * divLength) && index < (tableIndex * divLength  + divLength)"
                  >
                    <td
                      style="width:118px;;height: 25px;text-align:center;background-color:#c60909;color:#fff;font-weight:bold"
                      v-if="row.percentage >= 0 && row.percentage <= 20"
                    >
                     <span style="text-align:right;">{{row.date}}</span> <br />
                      <span>{{row.percentage}}%</span>
                      <br />
                      <span>{{row.value}}</span>
                    </td>
                    <td
                      style="width:118px;;height: 25px;text-align:center;background-color:#8c600e;color:#fff;font-weight:bold"
                      v-if="row.percentage >= 21 && row.percentage <= 50"
                    >
                      <span>{{row.date}}</span>
                      <br />
                      <span>{{row.percentage}}%</span>
                      <br />
                      <span>{{row.value}}</span>
                    </td>
                    <td
                      style="width:118px;;height: 25px;text-align:center;background-color:#1c1c44;color:#fff;font-weight:bold"
                      v-if="row.percentage >= 51 && row.percentage <= 80"
                    >
                      <span>{{row.date}}</span>
                      <br />
                      <span>{{row.percentage}}%</span>
                      <br />
                      <span>{{row.value}}</span>
                    </td>
                    <td
                      style="width:118px;;height: 25px;text-align:center;background-color:#006000;color:#fff;font-weight:bold"
                      v-if="row.percentage >= 81 && row.percentage <= 100"
                    >
                      <span>{{row.date}}</span>
                      <br />
                      <span>{{row.percentage}}%</span>
                      <br />
                      <span>{{row.value}}</span>
                    </td>
                  </span>
                </span>
              </tr>
            </table>
            </div>
             </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-6 col-xs-12">
        <div class="box" style="height:440px;">
          <div class="box-header with-border">
            <h3 class="box-title">Bottom 50 Sub Stations</h3>
            <div class="text-right btn-group" style="float:right" role="group">
              <button id="WeekBTN" type="button" class="btn btn-primary active">Week</button>
              <button id="MonthBTN" type="button" class="btn btn-primary">Month</button>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div class="box-body">
            <template>
              <div
                class="table-responsive"
                id="circleTableDiv"
                style="height:365px;margin-top:2px;border:1px solid lightgray;overflow-y: scroll;"
              >
                <table
                  class="table table-bordered table-striped table-responsive-stack"
                  id="circleTableID"
                  style="text-align: center;"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr style="background-color:#032457;color:white">
                      <th style="text-align:center">Sub Station</th>
                      <th style="text-align:center">Circle</th>
                      <th style="text-align:center">Region</th>
                       <th style="text-align:center">Conn</th>
                        <th style="text-align:center">DA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(tabledetailsItems,indx) in bottomlevelssJSONArray"
                      v-bind:key="indx"
                    >
                      <td>{{tabledetailsItems.ss}}</td>
                      <td>{{tabledetailsItems.circle}}</td>
                      <td>{{tabledetailsItems.region}}</td>
                       <td>{{tabledetailsItems.conn}}</td>
                      <td>{{tabledetailsItems.da}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  <div v-show="enableSSDetailsPopup">
    <SSDetailsPopup :selectSSPopupDucID="selectSSPopupDucID" :selectSSObject="selectSSObject" :selectSSDcuStatus="selectSSDcuStatus" :callssRandomNum="callssRandomNum" :nameplateSubStationJson="nameplateSubStationJson" v-on:methodFromChild="screensizeMethod"></SSDetailsPopup>
    </div>
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>
<script>

import Vue from "vue";
import axios from "axios";
import $ from "jquery";
import VueElementLoading from 'vue-element-loading'
import VueApexCharts from "vue-apexcharts";
import SSDetailsPopup from "./SSDetails.vue";
// import { regionListArray, dashboardeventsJSON, circleTableJson, toplevelssJSONArray, bottomlevelssJSONArray } from "../../demo";
Vue.component("apexchart", VueApexCharts);
const dtToday = new Date();
export default {
  name: "GraphDashboard",
  components: {SSDetailsPopup,VueElementLoading},
  data() {
    return {
      enableSSDetailsPopup:false,
      graphicaldashInterval:null,
      callssRandomNum:"",
      nameplateSubStationJson:'',
      isLoading:false,
      regionListArray:[],
      chartTypeTEXT: "line",
      selectSSPopupDucID:'',
      circleTXT: "choose circle",
      regionTXT: "choose region",
      substationTXT: "choose sub station",
      ssBTNTEXT: "WEEK",
      divLength: 4,
      conngraphtodayPer:'0 %',
      conngraphtodayPerTime:'',
      conngraphtodayAvgPer:'0 %',
      conngraphtodayAvgPerTime:'',
      conngraphmonthPer:'0 %',
      conngraphmonthPerTime:'',
      dataAvlgraphtodayPer:'0 %',
      dataAvlgraphtodayPerTime:'',
      dataAvlgraphtodayAvgPer:'0 %',
      dataAvlgraphtodayAvgPerTime:'',
      dataAvlgraphmonthAvgPer:'0 %',
      dataAvlgraphmonthAvgPerTime:'',
      updateRegionID:null,
      updateCircleID:null,
      selectSSObject:'',
      updateSubstationID:null,
      heatmapArrayList: [
        { date: "01-May-2020", percentage: 81, value: "+2.02" },
        { date: "02-May-2020", percentage: 58, value: "+5" },
        { date: "03-May-2020", percentage: 8, value: "+5" },
        { date: "04-May-2020", percentage: 15, value: "+5" },
        { date: "05-May-2020", percentage: 81, value: "+5" },
        { date: "06-May-2020", percentage: 21, value: "+5" },
        { date: "07-May-2020", percentage: 8, value: "+5" },
        { date: "08-May-2020", percentage: 15, value: "+5" },
        { date: "09-May-2020", percentage: 30, value: "+5" },
        { date: "10-May-2020", percentage: 58, value: "+5" },
        { date: "11-May-2020", percentage: 8, value: "+5" },
        { date: "12-May-2020", percentage: 15, value: "+5" },
        { date: "13-May-2020", percentage: 81, value: "+5" },
        { date: "14-May-2020", percentage: 58, value: "+5" },
        { date: "15-May-2020", percentage: 8, value: "+5" },
        { date: "16-May-2020", percentage: 15, value: "+5" },
        { date: "17-May-2020", percentage: 81, value: "+5" },
        { date: "18-May-2020", percentage: 58, value: "+5" },
        { date: "19-May-2020", percentage: 8, value: "+5" },
        { date: "20-May-2020", percentage: 15, value: "+5" },
        { date: "21-May-2020", percentage: 81, value: "+5" },
        { date: "22-May-2020", percentage: 58, value: "+5" },
        { date: "23-May-2020", percentage: 8, value: "+5.6" },
        { date: "24-May-2020", percentage: 50, value: "+5.6" },
        { date: "25-May-2020", percentage: 81, value: "+5.5" },
        { date: "26-May-2020", percentage: 58, value: "+6.0" },
        { date: "27-May-2020", percentage: 8, value: "+15" },
        { date: "28-May-2020", percentage: 15, value: "+35" },
        { date: "29-May-2020", percentage: 81, value: "+15" },
        { date: "30-May-2020", percentage: 58, value: "+5" }
      ],
      countlength: 0,
      regionoperationTXT:"choose operation",
      circleoperationTXT:"choose circle",
      substationoperationTXT:"choose sub station",
      getsubstationArrayseries:[],
      getsubstationArraydataoptions: {
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
       colors: ["#032457", "#049f82"],
      stroke: {
        show: true,
        curve: "smooth", // ['smooth', 'straight']
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0
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
      dataoptions: {
        chart: {
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          zoom:{
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
          width: 3,
          dashArray: 0
        },
        colors: ["#032457", "#049f82"],
        xaxis: {
          categories: ["9 Jun", "10 Jun", "11 Jun", "12 Jun", "13 Jun", "14 Jun", "15 Jun"],
          title: {
            text: ""
          }
        },
        yaxis: {
          title: {
            text: "Percentage"
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true
        }
      },
      dailycurrStartdate: this.dailyFormattedDate(dtToday) + " 00:00:00",
      dailycurrEnddate: this.dailyFormattedDate(dtToday) + " 23:59:59",
       dailyoverallGraphdataoptions : {
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
      monthoverallGraphdataoptions:{
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
     overallGraphdataoptions: {
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
      stroke: {
        show: true,
        curve: "smooth", // ['smooth', 'straight']
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0
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
      getregionWiseGraphJSON:"",
      dataseries: [
        {
          name: "Connectivity",
          data: [150, 229, 353, 403, 732, 832, 933]
        },
         {
          name: "Data Availability",
          data: [120, 339, 426, 596, 620, 812, 905]
        }
      ],
      hzConnectivtydataoptions: {
        chart: {
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top"
            }
          }
        },
        colors: ["#032457", "#ec0000"],
        xaxis: {
          categories: ["> 80 %", "50 - 80 %", "20 - 50 %", "< 20 %"],
          title: {
            text: "No of DCU's"
          }
        },
        yaxis: {
          title: {
            text: "Percentage"
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true
        }
      },
      hzConnectivtydataseries: [],
      hzDATAAVAILdataoptions: {
        chart: {
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top"
            }
          }
        },
        colors: ["#049f82", "#ec0000"],
        xaxis: {
          categories: ["> 80 %", "50 - 80 %", "20 - 50 %", "< 20 %"],
          title: {
            text: "No of DCU's"
          }
        },
        yaxis: {
          title: {
            text: "Percentage"
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true
        }
      },
      hzDATAAVAILdataseries: [],
      regionwisedataoptions: {
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
      stroke: {
        show: true,
        curve: "smooth", // ['smooth', 'straight']
        lineCap: "butt",
        colors: undefined,
        width: 2,
        dashArray: 0
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
      regionwisedataseries:[],
      circledataseries: [
        {
          name: "Connectivity",
          data: [150, 170, 353, 153, 732, 832, 933]
        },
         {
          name: "Data Availability",
          data: [110, 239, 226, 596, 620, 712, 905]
        }
      ],
      overallGraphdataseries:[],
      openregionpopupTitle:'',
      getGraphicalSummaryJSON:'',
      horizontalChartClk:'',
      dcuPercntagepopupTITLE:'',
      dcuConnectivityTBLJSONS:'',
      dcuDataAvalTBLJSONS:'',
      circleItemArray:[],
      circleSUBstationArray:[],
      dashboardgraphicalPANEheight:null,
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
  mounted() {
     this.getRegionNameList();
     this.getGraphicalDashboardDetailsMethod();
     var enddate = new Date();
     var startdate = new Date();
     startdate.setDate(startdate.getDate()-7);
     this.getgraphDetailsMethod(this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate),"Week");
     this.getregionWisegraphDetailsMethod(this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate));
     this.getducCountStatusList(this.changeYYYYDDMMFORMAT(enddate),this.changeYYYYDDMMFORMAT(enddate));
     this.countlength = parseInt(this.heatmapArrayList.length / this.divLength +  (this.heatmapArrayList.length % this.divLength == 0 ? 0 : 1));
      //document.getElementById('dashboardgraphicalPANE').style.height = "1130px";
      this.graphicaldashInterval  = setInterval(async () => {
        await this.getGraphicalDashboardDetailsMethod();
      }, 1000);
      setTimeout(() => this.getscreensizeMethod(), 3000);

  },
  created() {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 3000);
  },
  destroyed(){
    if(this.graphicaldashInterval != null){
      clearInterval(this.graphicaldashInterval);
    }
  },
  methods: {
    getscreensizeMethod(){
      var elmnt = document.getElementById("dashboardgraphicalPANE");
      this.dashboardgraphicalPANEheight = elmnt.offsetHeight;
    },
    screensizeMethod(){
      document.getElementById('dashboardgraphicalPANE').style.height = this.dashboardgraphicalPANEheight+"px";
      console.log('screensizeMethod');
    },
    getRegionNameList(){
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.regionListArray = response.data.details;
        } else {
          this.regionListArray = [];
        }
      });
    },
    getducCountStatusList(startdate,enddate){
      this.isLoading = true;
      var getducCountStatusURL = this.getducCountStatusURL.replace("$$startdate$$",startdate).replace("$$enddate$$",enddate);
      axios.get(getducCountStatusURL).then(response => {
        if (response.data.status == "found") {
          this.hzConnectivtydataseries = response.data.conndetails;
          this.hzDATAAVAILdataseries = response.data.dataavaldetails;
          this.isLoading = false;
        } else {
          this.hzConnectivtydataseries = [];
          this.hzDATAAVAILdataseries= [];
          this.isLoading = false;
        }
      });
    },
    getGraphicalDashboardDetailsMethod(){
      //this.isLoading = true;
       axios.get(this.graphical_summary_listURL).then(response => {
        if (response.data.status == "found") {
          this.getGraphicalSummaryJSON = response.data;
          this.conngraphtodayPer = this.getGraphicalSummaryJSON.connv[0].conv_today;
          this.conngraphtodayPerTime = this.getGraphicalSummaryJSON.connv[0].update_time;
          this.conngraphtodayAvgPer = this.getGraphicalSummaryJSON.connv[1].conv_today_avg;
          this.conngraphtodayAvgPerTime = this.getGraphicalSummaryJSON.connv[1].update_time;
          this.conngraphmonthPer = this.getGraphicalSummaryJSON.connv[2].conv_month_avg;
          this.conngraphmonthPerTime = this.getGraphicalSummaryJSON.connv[2].update_time;
          this.dataAvlgraphtodayPer= this.getGraphicalSummaryJSON.dataavail[0].dataavail_today;
          this.dataAvlgraphtodayPerTime = this.getGraphicalSummaryJSON.dataavail[0].update_time;
          this.dataAvlgraphtodayAvgPer = this.getGraphicalSummaryJSON.dataavail[1].dataavail_today_avg;
          this.dataAvlgraphtodayAvgPerTime = this.getGraphicalSummaryJSON.dataavail[1].update_time;
          this.dataAvlgraphmonthAvgPer = this.getGraphicalSummaryJSON.dataavail[2].dataavail_month_avg;
          this.dataAvlgraphmonthAvgPerTime = this.getGraphicalSummaryJSON.dataavail[2].update_time;
          //this.isLoading = false;
        } else {
          this.getGraphicalSummaryJSON = "";
          this.conngraphtodayPer = "0 %"
          this.conngraphtodayPerTime = "";
          this.conngraphtodayAvgPer = "0 %"
          this.conngraphtodayAvgPerTime = "";
          this.conngraphmonthPer = "0 %"
          this.conngraphmonthPerTime = "";
          this.dataAvlgraphtodayPer = "0 %"
          this.dataAvlgraphtodayPerTime = "";
          this.dataAvlgraphtodayAvgPer == "0 %"
          this.dataAvlgraphtodayAvgPerTime = "";
          this.dataAvlgraphmonthAvgPer = "0 %"
          this.dataAvlgraphmonthAvgPerTime = "";
          this.isLoading = false;
        }
      });
     },
     getgraphDetailsMethod(startdate,enddate,btnName){
       var getoverall_graph_listURL = this.getoverall_graph_listURL.replace("$$startdate$$",startdate).replace("$$enddate$$",enddate);
       this.overallGraphdataseries = [];
       this.isLoading = true;
       axios.get(getoverall_graph_listURL).then(response => {
        if (response.data.status == "found") {
          if(btnName == "Day"){
            this.overallGraphdataoptions  = this.dailyoverallGraphdataoptions;
          }else {
            this.overallGraphdataoptions  = this.monthoverallGraphdataoptions;
          }
          this.overallGraphdataseries.push(response.data.convObj);
          this.overallGraphdataseries.push(response.data.dataavlObj);
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.overallGraphdataseries = [];
        }
      });
     },
     getregionWisegraphDetailsMethod(startdate,enddate){
       var getoverall_graph_listURL = this.getregionWisegraphURL.replace("$$startdate$$",startdate).replace("$$enddate$$",enddate);
       this.getregionWiseGraphJSON = "";
       this.isLoading = true;
       axios.get(getoverall_graph_listURL).then(response => {
        if (response.data.status == "found") {
          this.getregionWiseGraphJSON = response.data;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.getregionWiseGraphJSON = "";
        }
      });
     },
    getcircleItemArray(regionid){
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.circleItemArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.circleItemArray = response.data.details;
          if(this.circleItemArray.length != 0){
             this.circleoperationTXT =this.circleItemArray[0].CIRCLE_ID;
             this.changeCircleName(this.circleoperationTXT);
            // document.getElementById('circleoperationTXTID').innerHTML = this.circleItemArray[0].CIRCLE_NAME;
          }
        } else {
          this.circleItemArray = [];
          this.circleoperationTXT = "choose circle";
        }
      });
    },
    generateData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = (i + 1).toString();
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push({
          x: x,
          y: y
        });
        i++;
      }
      return series;
    },
    changeCircleName(circleID){
       this.updateCircleID = circleID;
       var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleID);
       this.circleSUBstationArray = [];
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.circleSUBstationArray = response.data.details;
          if(this.circleSUBstationArray.length != 0){
            this.substationoperationTXT = this.circleSUBstationArray[0].DCU_ID;
          }
        } else {
          this.circleSUBstationArray = [];
          this.substationoperationTXT = "choose sub station";
        }
      });
    },
    graphBTNmethod(btnName){
      if(btnName == "Day"){
      document.getElementById("graphDayBTN").classList.add("active");
      document.getElementById("graphWeekBTN").classList.remove("active");
      document.getElementById("graphMonthBTN").classList.remove("active");
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
     this.getgraphDetailsMethod(this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate),btnName);
      }else if(btnName == "Week"){
        document.getElementById("graphWeekBTN").classList.add("active");
      document.getElementById("graphDayBTN").classList.remove("active");
      document.getElementById("graphMonthBTN").classList.remove("active");
       var enddate = new Date();
     var startdate = new Date();
     startdate.setDate(startdate.getDate()-7);
     this.getgraphDetailsMethod(this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate),btnName);
     }else {
     document.getElementById("graphMonthBTN").classList.add("active");
     document.getElementById("graphDayBTN").classList.remove("active");
     document.getElementById("graphWeekBTN").classList.remove("active");
     var enddate = new Date();
     var startdate = new Date();
     startdate.setDate(startdate.getDate()-30);
     this.getgraphDetailsMethod(this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate),btnName);
      }
    },
    chngeSSMethod(){
      this.ssBTNTEXT = 'WEEK';
    },
    applysubstationdetails(circleID,substationID){
      if(this.circleoperationTXT === "choose circle"){
        this.warningMessage("please choose any one circle name.")
        return false;
      }
      if(this.substationoperationTXT ===  "choose sub station"){
        this.warningMessage("please choose any one sub station name.")
        return false;
      }
      this.updateSubstationID = substationID;
      var enddate  = "";
      var startdate = "";
      if(this.ssBTNTEXT === "MONTH"){
      enddate = new Date();
      startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      }else if (this.ssBTNTEXT === "WEEK"){
      enddate = new Date();
      startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      }
      else if (this.ssBTNTEXT === "DAY"){
      enddate = new Date();
      startdate = new Date();
      }
      if(this.updateRegionID != null && circleID != null && substationID != null){
      this.getsubstationgraphDetailsMethod(this.updateRegionID,circleID,substationID,this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate))
      }
    },
    sschartBTNmethod(btnName){
         if(this.circleoperationTXT === "choose circle"){
        this.warningMessage("please choose any one circle name.")
        return false;
       }
      if(this.substationoperationTXT ===  "choose sub station"){
         this.warningMessage("please choose any one sub station name.")
        return false;
      }
      if(btnName === "Day"){
        this.ssBTNTEXT = "DAY";
        document.getElementById("sschartDayBTN").classList.add("active");
      document.getElementById("sschartWeekBTN").classList.remove("active");
      document.getElementById("sschartMonthBTN").classList.remove("active");
      var enddate = new Date();
      var startdate = new Date();
      //startdate.setDate(startdate.getDate()-7);
      if(this.updateRegionID != null && this.updateCircleID != null && this.updateSubstationID != null){
              this.getsubstationgraphDetailsMethod(this.updateRegionID,this.updateCircleID,this.updateSubstationID,this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate));
      }
      }
      else if(btnName === "Week"){
        this.ssBTNTEXT = "WEEK";
      document.getElementById("sschartWeekBTN").classList.add("active");
       document.getElementById("sschartDayBTN").classList.remove("active");
      document.getElementById("sschartMonthBTN").classList.remove("active");
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      if(this.updateRegionID != null && this.updateCircleID != null && this.updateSubstationID != null){
              this.getsubstationgraphDetailsMethod(this.updateRegionID,this.updateCircleID,this.updateSubstationID,this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate));
      }
      }else if(btnName === "Month"){
        this.ssBTNTEXT = "MONTH";
      document.getElementById("sschartMonthBTN").classList.add("active");
      document.getElementById("sschartDayBTN").classList.remove("active");
      document.getElementById("sschartWeekBTN").classList.remove("active");
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      if(this.updateRegionID != null && this.updateCircleID != null && this.updateSubstationID != null){
      this.getsubstationgraphDetailsMethod(this.updateRegionID,this.updateCircleID,this.updateSubstationID,this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate));
      }
      }
    },
    getsubstationgraphDetailsMethod(regionID,circleID,substationID,startdate,enddate){
      try {
      this.isLoading = true;
       var getsubstationSSURL = this.getsubstationSSURL.replace("$$regionID$$",regionID).replace("$$circleID$$",circleID).replace("$$substationID$$",substationID).replace("$$startdate$$",startdate).replace("$$enddate$$",enddate);
       this.getsubstationArrayseries = [];
       axios.get(getsubstationSSURL).then(response => {
        if (response.data.status == "found") {
           this.getsubstationArrayseries.push(response.data.convObj);
          this.getsubstationArrayseries.push(response.data.dataavlObj);
          this.isLoading = false;
        } else {
          this.getsubstationArrayseries = [];
          this.isLoading = false;
        }
      });
      } catch (error) {
        console.log('error:'+ error);
      }
    },
    connectivityMethod(){
      this.dataoptions.colors =  ["#032457"];
      this.dataseries = [
         {
          name: "Connectivity",
          data: [150, 229, 353, 403, 732, 832, 933]
        }
      ]
    },
    datavailMethod(){
      this.dataoptions.colors =  ["#049f82"];
      this.dataseries = [
         {
          name: "Data Availability",
          data: [120, 339, 426, 596, 620, 812, 905]
        }
      ]
    },
    bothMethod(){
      this.dataoptions.colors =  ["#032457", "#049f82"];
      this.dataseries = [
         {
          name: "Connectivity",
          data: [150, 229, 353, 403, 732, 832, 933]
        },
         {
          name: "Data Availability",
          data: [120, 339, 426, 596, 620, 812, 905]
        }
      ]
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
    openregionPopup(id,regionname){
      this.isLoading = true;
      this.getcircleItemArray(id);
      this.updateRegionID = id;
      this.updateCircleID = null;
      this.updateSubstationID = null;
     // this.circleoperationTXT = "choose circle";
     // this.substationoperationTXT = "choose sub station";
      this.circleSUBstationArray = [];
      this.ssBTNTEXT = "WEEK";
     // this.changeCircleName(this.circleoperationTXT);
      setTimeout(() => {
       this.applysubstationdetails(this.circleoperationTXT,this.substationoperationTXT);
       this.$modal.show('openregionpopupNAME');
      this.openregionpopupTitle = regionname;
    }, 500);
      this.getsubstationArrayseries= [];
      this.isLoading = false;
    },
    beforeOpen () {
    },
    beforeClose () {
    },
    opened (e) {
    },
    closed (e) {
    },
    clickConnvHandler(event, chartContext, config){
      this.horizontalConnvGraph(config.dataPointIndex);
    },
    clickDataAvalHandler(event, chartContext, config){
        this.horizontalDataAvlGraph(config.dataPointIndex);

    },
    horizontalConnvGraph(index) {
      console.log('-----Enter-->>'+index)
      this.horizontalChartClk = "Connectivity";
      var getducHorizontalconnURL = "";
      if(index == 0){
      getducHorizontalconnURL =  this.getducHorizontalconnStatusURL.replace("$$startper$$", 81).replace("$$endper$$", 100);
      }else if(index == 1){
        getducHorizontalconnURL =  this.getducHorizontalconnStatusURL.replace("$$startper$$", 51).replace("$$endper$$", 80);
      }else if(index == 2){
        getducHorizontalconnURL =  this.getducHorizontalconnStatusURL.replace("$$startper$$", 21).replace("$$endper$$", 50);
      }else if(index == 3){
        getducHorizontalconnURL =  this.getducHorizontalconnStatusURL.replace("$$startper$$", 0).replace("$$endper$$", 20);
      }
      try {
      this.isLoading = true;
       axios.get(getducHorizontalconnURL).then(response => {
        if (response.data.status == "found") {
           this.$modal.show('dcuPercntagepopup');
          this.dcuConnectivityTBLJSONS = response.data.details;
          this.isLoading = false;
        } else {
          this.dcuConnectivityTBLJSONS = "";
          this.errorMessage(response.data.errors);
          this.isLoading = false;
        }
      });
      } catch (error) {
        console.log('error:'+ error);
      }
    },
    horizontalDataAvlGraph(index){
      this.horizontalChartClk = "Data Availability";
       var getducHorizontaldataAvlURL = "";
       console.log('index :', index);
      if(index == 0){
      getducHorizontaldataAvlURL =  this.getducHorizontaldatavlStatusURL.replace("$$startper$$", 81).replace("$$endper$$", 100);
      }else if(index == 1){
        getducHorizontaldataAvlURL =  this.getducHorizontaldatavlStatusURL.replace("$$startper$$", 51).replace("$$endper$$", 80);
      }else if(index == 2){
        getducHorizontaldataAvlURL =  this.getducHorizontaldatavlStatusURL.replace("$$startper$$", 21).replace("$$endper$$", 50);
      }else if(index == 3){
        getducHorizontaldataAvlURL =  this.getducHorizontaldatavlStatusURL.replace("$$startper$$", 0).replace("$$endper$$", 20);
      }
      try {
      this.isLoading = true;
       axios.get(getducHorizontaldataAvlURL).then(response => {
        if (response.data.status == "found") {
           this.$modal.show('dcuPercntagepopup');
          this.dcuConnectivityTBLJSONS = response.data.details;
          this.isLoading = false;
        } else {
          this.dcuConnectivityTBLJSONS = "";
          this.isLoading = false;
        }
      });
      } catch (error) {
        console.log('error:'+ error);
      }
    },
    showDCUPercentagePopup(){
       this.$modal.show('dcuPercntagepopup');
    },
    hideDCUPercentagePopup(){
       this.$modal.hide('dcuPercntagepopup');
    },
    getSSDetailspopup(items){
      this.isLoading = true;
      console.log('items :', JSON.stringify(items));
      var regionID = items.REGION_ID;
      var circleID = items.CIRCLE_ID;
      var substationID = items.DCU_ID;
      this.selectSSObject = {region_id:regionID,circle_id:circleID,dcu_id:substationID};
      this.selectSSPopupDucID = items.DCU_ID;
      this.selectSSDcuStatus = items.DCU_STATUS;
      var substation_nameplate_summaryURL = this.substation_nameplate_summaryURL.replace("$$dcuid$$", this.selectSSPopupDucID);
        axios.get(substation_nameplate_summaryURL).then(response => {
        if (response.data.status == "found") {
          // console.log('Tag value--- :', JSON.stringify(this.nameplateSubStationJson));
          this.nameplateSubStationJson = response.data;
          this.enableSSDetailsPopup = true;
          this.callssRandomNum = Math.random();
          //this.getfeederlist(this.selectSSDucID);
          this.isLoading = false;
        } else {
          this.nameplateSubStationJson = "";
          this.enableSSDetailsPopup =false;
           this.isLoading = false;
        }
      });
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
    openregionpopupclose(){
      this.$modal.hide('openregionpopupNAME')
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
</style>
