<template>
  <section class="content" id="SSDetailsPagePANE">
    <vue-element-loading :active="isLoading" spinner="line-wave" color="#000" :is-full-screen="true"/>
    <div class="row">
      <div class="col-lg-12">
       <ul class="timeline" style="margin: 0 0 -10px 0">
        <li>
          <i class="fa fa-comments-o bg-yellow"></i>
          <div class="timeline-item">
          <div class="timeline-body" id="sspageTimeLineBodyPane">
          <div class="row">
            <div class="col-md-1 order-md-3">
            </div>
             <div class="col-md-2 order-md-3">
                <span>Region</span> :
                 <select class="inputTEXTcss12" id="odRegionTXT"  v-model="ssPageRegionTXT" @change="getSSPAGECircleNameLst(ssPageRegionTXT)">
                 <option value='Choose Region' selected disabled>Choose Region</option>
                 <option v-for="(items,index) in ssPageregionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
                </select>
            </div>
             <div class="col-md-2 order-md-3">
                <span>Circle</span> :
                 <select class="inputTEXTcss12" id="ssPageCircleTXT"  v-model="ssPageCircleTXT" @change="getSSPAGESSNameLst(ssPageCircleTXT)">
                 <option value='Choose Circle' selected disabled>Choose Circle</option>
                 <option v-for="(items,index) in ssPagecircleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME" >{{items.CIRCLE_NAME}}</option>
                </select>
            </div>
             <div class="col-md-2 order-md-3">
               <span>Sub Station</span> :
                 <select class="inputTEXTcss12" id="ssPageSubStationTXT"  v-model="ssPageSubStationTXT" @change="changedcuMethod(ssPageSubStationTXT)">
                 <option value='Choose Sub Station' selected disabled>Choose Sub Station</option>
                 <option v-for="(items,index) in ssPageSSListArray" :key="index" :value="items.DCU_SS_ID+'$$'+items.DCU_LOCATION" >{{items.DCU_LOCATION}}</option>
                </select>
            </div>
            <div class="col-md-2 order-md-3">
               <span>DCU Name</span> :
                 <select class="inputTEXTcss12" id="ssPageDCUTXT"  v-model="ssPageDCUTXT">
                 <option value='Choose DCU' selected disabled>Choose DCU</option>
                 <option v-for="(items,index) in ssPageDCUListArray" :key="index" :value="items.DCU_ID+'$$'+items.DCU_NAME" >{{items.DCU_NAME}}</option>
                </select>
            </div>
            <div class="col-md-1 order-md-3 text-left">
             <button id="ssPAGEsubmitBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff" @click="ssPAGEFillterTableMethod()">
              <i class="fa fa-check text-white"></i> Submit
            </button>
            </div>
            <div class="col-md-2 order-md-3 text-right">
              ||
            <button id="ssEditsubmitBTN" class="btn btn-sm btn-primary"  style="color:#fff" @click="ssEditSSTableMethod()">
            <i class="fa fa-external-link text-white"></i>&nbsp; Sub Station DCU Edit Data
            </button>
            </div>
             </div>
             <p></p>
             <div class="row">
               <div class="col-md-12">
               <div class="naccs">
              <div class="grid">
                <div class="gc gc--1-of-3">
                  <div class="menu">
                    <div class="active" id="ssnameplatepaneBTN" @click="getsubstationnameplatePANEdetails">
                      <i class="fa fa-map" aria-hidden="true"></i>
                      <span class="light"></span>
                      <span>DCU Name Plate</span>
                    </div>
                    <div @click="getsubstationloadsurveyPANEdetails">
                      <i class="fa fa-database" aria-hidden="true"></i>
                      <span class="light"></span>
                      <span>Load Survey</span>
                    </div>
                    <div @click="getsubstationMidnightPANEdetails">
                      <i class="fa fa-bookmark" aria-hidden="true"></i>
                      <span class="light"></span>
                      <span>Midnight</span>
                    </div>
                    <div @click="getsubstationloadcurvePANEdetails">
                      <i class="fa fa-line-chart" aria-hidden="true"></i>
                      <span class="light"></span>
                      <span>Load Curve</span>
                    </div>
                    <div @click="getsubstationEventPANEdetails">
                      <i class="fa fa-table" aria-hidden="true"></i>
                      <span class="light"></span>
                      <span>Event</span>
                    </div>
                    <div @click="getsubstationFeederDisturbancePANEdetails">
                      <i class="fa fa-rss-square" aria-hidden="true"></i>
                      <span class="light"></span>
                      <span>Feeder Disturbance</span>
                    </div>
                    <div @click="getsubstationDCUDETAILSPANEdetails" v-show="false">
                      <i class="fa fa-cogs" aria-hidden="true"></i>
                      <span class="light"></span>
                      <span>DCU Details</span>
                    </div>
                  </div>
                </div>
                <div class="gc gc--2-of-3">
                  <ul class="nacc">
                    <li class="active" id="ssnameplateLI_TABPANE">
                      <div
                        id="ssnameplateTABPANE"
                        style="border: 1px dotted cornflowerblue;background: #f7f7f7;"
                      >
                        <h3 style="margin-top: 5px;color: #174b79;" v-if="ssPageSubmitSSname != ''">&nbsp;{{ssPageSubmitSSname}} - DCU Name Plate</h3>
                        <h3 style="margin-top: 5px;color: #174b79;" v-else>&nbsp; DCU Name Plate</h3>
                        <div class="row" id="ssfirstrowID">
                          <div class="col-lg-12">
                            <div class="col-lg-2">
                              <h4 class="fontsize16">SS Rating</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectSSRatingTXT}}</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">Region</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectssregionTXT}}</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">Circle</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectsscircleTXT}}</h4>
                            </div>
                          </div>
                        </div>
                        <div class="row" id="sssecondrowID">
                          <div class="col-lg-12">
                            <div class="col-lg-2">
                              <h4 class="fontsize16">No of GCs</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectnoGcsTXT}}</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">No of Outgoing Feeder</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectnofoutgoingFeederTXT}}</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 style="font-size:16px">Power Transformer & Rating</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectPowerTransformerTXT}}</h4>
                            </div>
                          </div>
                        </div>
                        <div class="row" id="ssthirdrowID">
                          <div class="col-lg-12">
                            <div class="col-lg-2">
                              <h4 class="fontsize16">Sub Station Loss</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectSubStationLossTXT}}</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">Feeder Under Maintence</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectFeederUnderMaintenceTXT}}</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">No of Idle Feeder</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectIdleFeederTXT}}</h4>
                            </div>
                          </div>
                        </div>
                        <div class="row" id="ssthirdrowID1">
                          <div class="col-lg-12">
                            <div class="col-lg-2">
                              <h4 class="fontsize16">No of Overload Feeder</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectOverloadFeederTXT}}</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">DCU Time
                                <br/>
                                <small style="color:red" class="text-bold" v-if="selectDCUStatusTXT == 'Not Communicating'">DUC Last Sync Time (d  hh:mm)   </small>
                              </h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectDCUTIMETXT}}
                               <br/>
                                <small style="color:red" class="text-bold" v-if="selectDCUStatusTXT == 'Not Communicating'"> : {{selectdcuSynTimeTXT}} </small></h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">DCU Status</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16" style="color:green" v-if="selectDCUStatusTXT == 'Communicating'">: <b>{{selectDCUStatusTXT}}</b></h4>
                              <h4 class="fontsize16" style="color:red" v-else-if="selectDCUStatusTXT == 'Not Communicating'">: <b>{{selectDCUStatusTXT}}</b></h4>
                              <h4 class="fontsize16" style="color:gray" v-else>: <b>{{selectDCUStatusTXT}}</b></h4>
                            </div>
                          </div>
                        </div>
                        <div class="row" id="ssthirdrowID2" v-show="false">
                          <div class="col-lg-12">
                            <div class="col-lg-2">
                              <h4 class="fontsize16"></h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{}}</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16"></h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{}}</h4>
                            </div>

                          </div>
                        </div>
                        <div class="row" id="ssfourthrowID">
                          <div class="col-lg-12">
                            <div class="col-lg-12">
                              <button
                                type="button"
                                class="btn btn-md btn-primary"
                                @click="openConnectivitydatapopup()"
                              >
                                <i class="fa fa-eye"></i> View Connectivity & Data Availability
                              </button>
                              <button
                                type="button"
                                class="btn btn-md btn-primary"
                                @click="openMeterNameplatepopup()"
                              >
                                <i class="fa fa-cogs"></i> View Meter Nameplate Details
                              </button>
                              <button
                                type="button" v-show="false"
                                class="btn btn-md btn-primary"
                                @click="opensldDiagrampopup()"
                              >
                                <i class="fa fa-eye"></i> View SLD
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="row" id="ssfifthrowID">
                          <div class="col-lg-12">
                            <div class="col-lg-12">
                              <h4>Incomers - Live Summary Details</h4>
                            </div>
                          </div>
                        </div>
                        <div class="row" id="sssixthrowID">
                          <div class="col-lg-12">
                            <div class="col-lg-12">
                              <template>
                                <div
                                  class="table-responsive"
                                  id="ssnamePlateTablePANE"
                                  style="border:1px solid lightgray;overflow-y: scroll;"
                                  v-bind:style="{height:'165px'}"
                                >
                                <!--namePlateTablePANEHeight-100 -->
                                  <table
                                    class="table table-bordered table-responsive-stack"
                                    id="ssnamePlateTableID"
                                  >
                                    <thead style="position: sticky;top: -1px;z-index:1;">
                                      <tr>
                                        <th style="width: 50px;">S.No</th>
                                        <th style="width:150px">Name</th>
                                        <th style="width:150px">Ser Num</th>
                                        <th style="width:150px">Type</th>
                                        <th style="width: 80px;">Rating</th>
                                        <!-- <th style="width: 80px;">
                                          V
                                          <small>1,2,3</small>
                                        </th> -->
                                        <th style="width: 80px;">V1</th>
                                        <th style="width: 80px;">V2</th>
                                        <th style="width: 80px;">V3</th>
                                        <th style="width: 80px;">I1</th>
                                        <th style="width: 80px;">I2</th>
                                        <th style="width: 80px;">I3</th>
                                        <th style="width: 80px;">PF</th>
                                        <th style="width: 80px;">Freq</th>
                                        <th style="width: 80px;">KW</th>
                                        <th style="width: 80px;">KVAR</th>
                                        <th style="width: 80px;">KVA</th>
                                        <th style="width:150px">Meter Time</th>
                                        <th style="width:150px">Drift Time <br/>(hh:mm:ss)</th>
                                        <th style="width:150px">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody v-if="namePlateliveINCOMERDataTblJSON != ''">
                                      <tr
                                        v-for="(inputItems,index) in namePlateliveINCOMERDataTblJSON.details"
                                        v-bind:key="index"
                                      >
                                        <td>{{index+1}}</td>
                                        <td>{{inputItems.name}}</td>
                                        <td>{{inputItems.met_ser_num}}</td>
                                        <td>{{inputItems.met_type}}</td>
                                        <td>{{inputItems.rating}}</td>
                                        <td>{{inputItems.vol1}}</td>
                                        <td>{{inputItems.vol2}}</td>
                                        <td>{{inputItems.vol3}}</td>
                                        <td>{{inputItems.ivalue}}</td>
                                        <td>{{inputItems.i2value}}</td>
                                        <td>{{inputItems.i3value}}</td>
                                        <td>{{inputItems.pf}}</td>
                                        <td>{{inputItems.freq}}</td>
                                        <td>{{inputItems.kw}}</td>
                                        <td>{{inputItems.kvar}}</td>
                                        <td>{{inputItems.kva}}</td>
                                        <td>{{inputItems.met_time}}</td>
                                        <td>{{inputItems.dirft_time}}</td>
                                        <td v-if="inputItems.status == 'Not Communicating'" style="background-color:red;color:#fff">{{inputItems.status}}</td>
                                        <td v-else-if="inputItems.status == 'Communicating'" style="background-color:green;color:#fff">{{inputItems.status}}</td>
                                        <td v-else style="background-color:lightgray;color:#000">{{inputItems.status}}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div
                                    v-if="namePlateliveINCOMERDataTblJSON != ''"
                                    style="text-align:center;width: 100%;"
                                  >
                                    <span v-if="namePlateliveINCOMERDataTblJSON.details.length == 0">No Records Found</span>
                                  </div>
                                  <div
                                    v-if="namePlateliveINCOMERDataTblJSON == ''"
                                    style="text-align:center;width: 100%;"
                                  >
                                    <span>No Records Found</span>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                        <div class="row" id="ssfifthrowID2">
                          <div class="col-lg-12">
                            <div class="col-lg-12">
                              <h4>Outgoing - Live Summary Details </h4>
                            </div>
                          </div>
                        </div>
                        <div class="row" id="sssixthrowID2">
                          <div class="col-lg-12">
                            <div class="col-lg-12">
                              <template>
                                <div
                                  class="table-responsive"
                                  id="ssnamePlateOutgoingTablePANE"
                                  style="border:1px solid lightgray;overflow-y: scroll;"
                                  v-bind:style="{height:'385px'}"
                                >
                                  <table
                                    class="table table-bordered table-responsive-stack"
                                    id="ssnamePlateTableID"
                                  >
                                    <thead style="position: sticky;top: -1px;z-index:1;">
                                      <tr>
                                        <th style="width: 50px;">S.No</th>
                                        <th style="width:150px">Name</th>
                                        <th style="width:150px">Ser Num</th>
                                        <th style="width:150px">Type</th>
                                        <th style="width: 80px;">Rating</th>
                                        <th style="width: 80px;">V1</th>
                                        <th style="width: 80px;">V2</th>
                                        <th style="width: 80px;">V3</th>
                                        <th style="width: 80px;">I1</th>
                                        <th style="width: 80px;">I2</th>
                                        <th style="width: 80px;">I3</th>
                                        <th style="width: 80px;">PF</th>
                                        <th style="width: 80px;">Freq</th>
                                        <th style="width: 80px;">KW</th>
                                        <th style="width: 80px;">KVAR</th>
                                        <th style="width: 80px;">KVA</th>
                                         <th style="width:150px">Meter Time</th>
                                        <th style="width:150px">Drift Time <br/>(hh:mm:ss)</th>
                                        <th style="width:150px">Status</th>
                                      </tr>
                                    </thead>
                                    <tbody v-if="namePlateliveOUTCOMERDataTblJSON != ''">
                                      <tr
                                        v-for="(inputItems,index) in namePlateliveOUTCOMERDataTblJSON.details"
                                        v-bind:key="index"
                                      >
                                        <td>{{index+1}}</td>
                                        <td>{{inputItems.name}}</td>
                                        <td>{{inputItems.met_ser_num}}</td>
                                        <td>{{inputItems.met_type}}</td>
                                        <td>{{inputItems.rating}}</td>
                                        <td>{{inputItems.vol1}}</td>
                                        <td>{{inputItems.vol2}}</td>
                                        <td>{{inputItems.vol3}}</td>
                                        <td>{{inputItems.ivalue}}</td>
                                        <td>{{inputItems.i2value}}</td>
                                        <td>{{inputItems.i3value}}</td>
                                        <td>{{inputItems.pf}}</td>
                                        <td>{{inputItems.freq}}</td>
                                        <td>{{inputItems.kw}}</td>
                                        <td>{{inputItems.kvar}}</td>
                                        <td>{{inputItems.kva}}</td>
                                        <td>{{inputItems.met_time}}</td>
                                        <td>{{inputItems.dirft_time}}</td>
                                        <td v-if="inputItems.status == 'Not Communicating'" style="background-color:red;color:#fff">{{inputItems.status}}</td>
                                        <td v-else-if="inputItems.status == 'Communicating'" style="background-color:green;color:#fff">{{inputItems.status}}</td>
                                        <td v-else style="background-color:lightgray;color:#000">{{inputItems.status}}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div
                                    v-if="namePlateliveOUTCOMERDataTblJSON != ''"
                                    style="text-align:center;width: 100%;"
                                  >
                                    <span v-if="namePlateliveOUTCOMERDataTblJSON.details.length == 0">No Records Found</span>
                                  </div>
                                  <div
                                    v-if="namePlateliveOUTCOMERDataTblJSON == ''"
                                    style="text-align:center;width: 100%;"
                                  >
                                    <span>No Records Found</span>
                                  </div>
                                </div>
                              </template>
                            </div>
                          </div>
                        </div>
                        <p>&nbsp;</p>
                      </div>
                    </li>
                    <li id="ssloadsurveyLI_TABPANE">
                      <div
                        id="ssloadsurveyTABPANE"
                        style="border: 1px dotted cornflowerblue;background: #f7f7f7;"
                      >
                      <h3 style="margin-top: 5px;color: #174b79;">&nbsp;Load Survey</h3>
                        <div class="row" id="ssloadsurveyfirstrowID">
                          <div class="col-lg-12">
                            <div class="col-lg-12">
                              <div class="box" style="margin-bottom: 10px">
                                <div class="box-header with-border">
                                  <div class="col-lg-2">
                                     <h3
                                    class="box-title"
                                    style="color:#174b79;margin-top: 5px;margin-left: -10px;"
                                  >Table View</h3>
                                  </div>
                                 <div class="col-lg-3">
                                   <span>Choose Feeder : </span>
                                    <select
                                      id="ssloadSurveyfeederSELTXT"
                                      v-model="feederloadSurveySELTXT"
                                      class="inputTEXTcss" @change="chnageloadSurveyfeedername(feederloadSurveySELTXT)"
                                      style="width:60% !important;"
                                    >
                                      <option value="Choose Feeder" disabled>Choose Feeder</option>
                                      <option v-for="(ssItems,ssindex) in ssfeederlist" :key="ssindex" :value="ssItems.METER_NAME" >{{ssItems.METER_NAME}}</option>
                                    </select>
                                  </div>
                                  <div class="col-lg-3" style="margin-top: 5px">
                                    <span>Choose Date : </span>
                                    <datepicker v-model="loadsurveyfeedTableFromdateTXT" :disabledDates="loadsurveyfeedTabledisabledDates" style="width:50%;margin-left: 85px;margin-top: -23px;"></datepicker>
                                  </div>
                                  <div class="col-lg-1">
                                   <button class="btn btn-sm btn-default" @click="getsubstationLoadSurveyMethod()">Submit</button>
                                  </div>
                                  <div class="col-lg-2 text-center"> || 	&nbsp;	&nbsp; &nbsp;
                                    <button class="btn btn-sm btn-warning" @click="pollMissingLoadSurveyDataMethod()"><i class="fa fa-database" aria-hidden="true"></i> Get Missing Data</button>  
                                  </div>
                                </div>
                                <div class="box-body" v-show="loadsurveytableJson != ''">
                                  <p class="box-title" style="color:#1a495e;margin-left: 5px;font-weight: bold;">{{submitMeterName}} - Meter Name Plate Details :</p>
            <template>
                                    <div
                                      class="table-responsive"
                                      id="ssLoadsurveyMeterNamePlateTablePANE"
                                      style="border:1px solid lightgray;overflow: hidden;"
                                      v-bind:style="{height:'80px'}"
                                    >
                                      <table
                                        class="table table-bordered table-responsive-stack"
                                        id="ssLoadsurveyMeterNamePlateTableID"
                                      >
                                        <thead style="position: sticky;top: -1px;z-index:1;">
                                          <tr>
                                            <th rowspan="2">Serial Number</th>
                                            <th rowspan="2">Manufacturer Name</th>
                                            <th rowspan="2">Firmware</th>
                                            <th rowspan="2" v-show="false">Meter Type</th>
                                            <th rowspan="2">CT ratio</th>
                                            <th rowspan="2">PT ratio</th>
                                          </tr>
                                        </thead>
                                        <tbody v-if="loadsurveyTabmeterArrayList.length != 0">
                                          <tr v-for="(inputItems,index) in loadsurveyTabmeterArrayList"
                                            v-bind:key="index"
                                          >
                                            <td>{{inputItems.MET_SER_NUM == null ? '-' : inputItems.MET_SER_NUM}}</td>
                                            <td>{{inputItems.MANF_NAME == null ? '-' : inputItems.MANF_NAME}}</td>
                                            <td>{{inputItems.METER_FW == null ? '-' : inputItems.METER_FW}}</td>
                                            <td v-show="false">{{inputItems.MET_TYPE == null ? '-' : inputItems.MET_TYPE}}</td>
                                            <td>{{inputItems.CTRatio == null ? '-' : inputItems.CTRatio}}</td>
                                            <td>{{inputItems.PTRatio == null ? '-' : inputItems.PTRatio}}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        v-if="loadsurveyTabmeterArrayList.length == 0"
                                        style="text-align:center;width: 100%;"
                                      >
                                        <span>No Records Found</span>
                                      </div>
                                    </div>
                                  </template>
                                  <p class="box-title" style="color:#1a495e;margin-left: 5px;font-weight: bold;">{{submitMeterName}} - Meter Load Survey Details :</p>
                                  <template>
                                <div
                                  class="table-responsive"
                                  id="ssloadsurveyTablePANE"
                                  style="border:1px solid lightgray"
                                  v-bind:style="{height:namePlateTablePANEHeight}"
                                >
                                  <table
                                    class="table table-bordered table-responsive-stack"
                                    id="ssloadsurveyTableID"
                                  >
                                    <thead style="position: sticky;top: -1px;z-index:1;">
                                      <tr>
                                        <th>S.No</th>
                                        <th>Time</th>
                                        <th>AI</th>
                                        <th>RI</th>
                                        <th>AE</th>
                                        <th>RE</th>
                                        <th>KVARH_LEAD</th>
                                        <th>KVARH_LAG</th>
                                        <th>I1</th>
                                        <th>I2</th>
                                        <th>I3</th>
                                        <th>V1</th>
                                        <th>V2</th>
                                        <th>V3</th>
                                        <th>FREQ</th>
                                      </tr>
                                    </thead>
                                    <tbody v-if="loadsurveytableJson != ''">
                                      <tr
                                        v-for="(inputItems,index) in loadsurveytableJson.details"
                                        v-bind:key="index"
                                      >
                                        <td>{{index+1}}</td>
                                        <td>{{inputItems.Time.split(" ")[1]}}</td>
                                        <td>{{inputItems.AI}}</td>
                                        <td>{{inputItems.RI}}</td>
                                        <td>{{inputItems.AE}}</td>
                                        <td>{{inputItems.RE}}</td>
                                        <td>{{inputItems.KVAR_LEAD}}</td>
                                        <td>{{inputItems.KVAR_LAG}}</td>
                                        <td>{{inputItems.I1}}</td>
                                        <td>{{inputItems.I2}}</td>
                                        <td>{{inputItems.I3}}</td>
                                        <td>{{inputItems.V1}}</td>
                                        <td>{{inputItems.V2}}</td>
                                        <td>{{inputItems.V3}}</td>
                                        <td>{{inputItems.FREQ}}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <div
                                    v-if="loadsurveytableJson == ''"
                                    style="text-align:center;width: 100%;"
                                  >
                                    <span>No Records Found</span>
                                  </div>
                                </div>
                              </template>
                                </div>
                                <div class="box-body"  v-show="loadsurveytableJson == ''">
                                  <div style="height:400px;border:1px solid lightgray">
                                  <span>No Records found</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="box">
                                <div class="box-header with-border">
                                  <h3
                                    class="box-title"
                                    style="color:#174b79"
                                  >Graphical View</h3>
                                </div>
                                <div class="box-body" v-show="loadsurveyseries.length != 0">
                                  <apexchart style="margin-top: -42px;"
                                    width="100%"
                                    height="300"
                                    type="line"
                                    :options="loadsurveyoptions"
                                    :series="loadsurveyseries"
                                  ></apexchart>
                                </div>
                                <div class="box-body" v-show="loadsurveyseries.length == 0">
                                  <div style="height:310px"><span>No record found</span></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li id="ssMidnight_TABPANE">
                      <div
                        id="ssmidnightTABPANE"
                        style="border: 1px dotted cornflowerblue;background: #f7f7f7;"
                      >
                        <h3 style="color: #174b79;">&nbsp; Midnight</h3>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="col-lg-12">
                              <div class="box">
                                <div class="box-header with-border">
                                  <div class="col-lg-3">
                                  </div>

                                 <div class="col-lg-3">
                                   <span>Choose Feeder : </span>
                                    <select
                                      id="feedermidnightSELTXT"
                                      v-model="feedermidnightSELTXT"
                                      class="inputTEXTcss" @change="chnageMidnightfeedername(feedermidnightSELTXT,midnightfeedTableFromdateTXT)"
                                      style="width:45% !important;"
                                    >
                                      <option value="Choose Feeder" disabled>Choose Feeder</option>
                                      <option v-for="(ssItems,ssindex) in ssfeederlist" :key="ssindex" :value="ssItems.METER_NAME" >{{ssItems.METER_NAME}}</option>
                                    </select>
                                  </div>
                                      <div class="col-lg-3" style="margin-top: 5px">
                                    <span>Choose Month : </span>
                                    <datepicker v-model="midnightfeedTableFromdateTXT" minimum-view="month" format="MMM yyyy" :disabledDates="midnightfeedTabledisabledDates" style="width:50%;margin-left: 93px;margin-top: -23px;"></datepicker>
                                  </div>
                                   <div class="col-lg-1">
                                   <button class="btn btn-sm btn-default" @click="chnageMidnightfeedername(feedermidnightSELTXT,midnightfeedTableFromdateTXT)">Submit</button>  
                                  </div>
                                </div>
                                <div class="box-body">
                                   <p class="box-title" style="color:#1a495e;margin-left: 5px;font-weight: bold;">{{feedermidnightSELTXT}} - Meter Midnight details :</p>
                                  <template>
                                    <div
                                      class="table-responsive"
                                      id="ssmidnightTablePANE"
                                      style="border:1px solid lightgray"
                                      v-bind:style="{height:'710px'}"
                                    >
                                      <table
                                        class="table table-bordered table-responsive-stack"
                                        id="ssmidnightTableID"
                                      >
                                        <thead style="position: sticky;top: -1px;z-index:1;">
                                          <tr>
                                            <th>S.No</th>
                                            <th style="width:160px">Date</th>
                                            <th>KWH_IMP</th>
                                            <th>KWH_EXP</th>
                                            <th>KVAH_IMP</th>
                                            <th>KVAH_EXP</th>
                                            <th>RE_High</th>
                                            <th>RE_Low</th>
                                            <th>KVARH_Q1</th>
                                            <th>KVARH_Q2</th>
                                            <th>KVARH_Q3</th>
                                            <th>KVARH_Q4</th>
                                          </tr>
                                        </thead>
                                        <tbody v-if="midNightDataTblJSON != ''">
                                          <tr
                                            v-for="(inputItems,index) in midNightDataTblJSON.details"
                                            v-bind:key="index"
                                          >
                                            <td>{{index+1}}</td>
                                            <td>{{inputItems.Time}}</td>
                                            <td>{{inputItems.KWH_IMP}}</td>
                                            <td>{{inputItems.KWH_EXP}}</td>
                                            <td>{{inputItems.KVAH_IMP}}</td>
                                            <td>{{inputItems.KVAH_EXP}}</td>
                                            <td>{{inputItems.RE_High}}</td>
                                            <td>{{inputItems.RE_Low}}</td>
                                            <td>{{inputItems.KVARH_Q1}}</td>
                                            <td>{{inputItems.KVARH_Q2}}</td>
                                            <td>{{inputItems.KVARH_Q3}}</td>
                                            <td>{{inputItems.KVARH_Q4}}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        v-if="midNightDataTblJSON == ''"
                                        style="text-align:center;width: 100%;"
                                      >
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
                    </li>
                    <li id="ssloadcurveLI_TABPANE">
                      <div
                        id="ssloadcurveTABPANE"
                        style="border: 1px dotted cornflowerblue;background: #f7f7f7;"
                      >
                        <h3 style="margin-top: 5px;color: #174b79;">&nbsp;Load Curve</h3>
                        <div class="row" id="ssloadfirstrowID">
                          <div class="col-lg-12">
                            <div class="col-lg-12">
                              <div class="box">
                                <div class="box-header with-border">
                                    <div class="col-lg-4">
                                       <h3
                                    class="box-title"
                                    style="color:#174b79;margin-left: -15px;"
                                  >Load Curve - Feeder Wise</h3>
                                  </div>
                                   <div class="col-lg-3">
                                     <span>Choose Feeder : </span>
                                    <select
                                      id="ssfeederSELTXT"
                                      v-model="feederSELTXT"
                                      class="inputTEXTcss" @change="chnagefeedername(feederSELTXT)"
                                      style="width:51% !important;"
                                    >
                                      <option value="Choose Feeder" disabled>Choose Feeder</option>
                                      <option :value="ssItems.METER_NAME" v-for="(ssItems,ssindex) in ssfeederlist" :key="ssindex">{{ssItems.METER_NAME}}</option>
                                    </select>
                                  </div>
                                 <div class="col-lg-2">
                                    
                                  </div>
                                    <div class="col-lg-3">
                                    <div class="btn-group" style="float:right" role="group">
                                      <button
                                        id="ssloadcurveDailykBTN"
                                        type="button" @click="substationLoadcurveBTN('Day')"
                                        class="btn btn-sm btn-primary"
                                      >D</button>
                                      <button
                                        id="ssloadcurveWeekBTN"
                                        type="button" @click="substationLoadcurveBTN('Week')"
                                        class="btn btn-sm btn-primary active"
                                      >W</button>
                                      <button
                                        id="ssloadcurveMonthBTN"
                                        type="button" @click="substationLoadcurveBTN('Month')"
                                        class="btn btn-sm btn-primary"
                                      >M</button>
                                    </div>
                                  </div>
                                </div>
                                <div class="box-body" v-show="loadcurveseries.length != 0">
                                  <apexchart
                                    width="100%"
                                    height="400"
                                    type="line"
                                    :options="loadcurveoptions"
                                    :series="loadcurveseries"
                                  ></apexchart>
                                </div>
                                <div class="box-body"  v-show="loadcurveseries.length == 0">
                                  <div style="height:400px"><span>No record found</span></div>
                                 
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="box">
                                <div class="box-header with-border">
                                  <h3
                                    class="box-title"
                                    style="color:#174b79"
                                  >Cumulative Curve - All Incomer & Outgoing</h3>
                                  <div class="btn-group" style="float:right" role="group">
                                    <button
                                      id="sscumulativecurveDailyBTN"
                                      type="button" @click="substationCumulativecurveBTN('Day')"
                                      class="btn btn-sm btn-primary"
                                    >D</button>
                                    <button
                                      id="sscumulativecurveWeekBTN"
                                      type="button" @click="substationCumulativecurveBTN('Week')"
                                      class="btn btn-sm btn-primary active"
                                    >W</button>
                                    <button
                                      id="sscumulativecurveMonthBTN"
                                      type="button" @click="substationCumulativecurveBTN('Month')"
                                      class="btn btn-sm btn-primary"
                                    >M</button>
                                  </div>
                                </div>
                                <div class="box-body" v-show="cumulativecurveseries.length != 0">
                                  <apexchart
                                    width="100%"
                                    height="400"
                                    type="line"
                                    :options="cumulativecurveoptions"
                                    :series="cumulativecurveseries"
                                  ></apexchart>
                                </div>
                                <div class="box-body" v-show="cumulativecurveseries.length == 0">
                                  <div style="height:400px"><span>No record found</span></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li id="sseventsLI_TABPANE">
                      <div
                        id="sseventsTABPANE"
                        style="border: 1px dotted cornflowerblue;background: #f7f7f7;"
                      >
                        <h3 style="color: #174b79;">&nbsp; Events</h3>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="col-lg-12">
                              <div class="box">
                                <div class="box-header with-border">
                                  <div class="col-lg-6">
                                     <h3
                                    class="box-title"
                                    style="color:#174b79;margin-top: 5px;margin-left: -10px;"
                                  >Event Details</h3>
                                  </div>
                                 <div class="col-lg-6 text-right">
                                   <span>Choose Feeder : </span>
                                    <select
                                      id="feederEventSELTXT"
                                      v-model="feederEventSELTXT"
                                      class="inputTEXTcss" @change="chnageEventfeedername(feederEventSELTXT)"
                                      style="width:30% !important;"
                                    >
                                      <option value="Choose Feeder" disabled>Choose Feeder</option>
                                      <option v-for="(ssItems,ssindex) in ssfeederlist" :key="ssindex" :value="ssItems.METER_NAME" >{{ssItems.METER_NAME}}</option>
                                    </select>
                                  </div>
                                  <div class="text-right" style="float:right;width: 25%;" v-show="false">
                                    <select
                                      id="sseventselNameTXT"
                                      v-model="eventselNameTXT"
                                      class="inputTEXTcss" @change="changeeventssmethod(eventselNameTXT)"
                                      style="width: 50% !important;"
                                    >
                                      <option value="Choose Event" selected disabled>Choose Event</option>
                                      <option value="All">All</option>
                                      <option value="Configuration">Configuration</option>
                                    </select>&nbsp;
                                    <div class="btn-group" role="group">
                                      <button
                                        id="sseventDailyBTN"
                                        type="button"
                                        class="btn btn-primary" @click="substationEventBTN('Day')"
                                      >D</button>
                                      <button
                                        id="sseventWeekBTN"
                                        type="button" @click="substationEventBTN('Week')"
                                        class="btn btn-primary active"
                                      >W</button>
                                      <button
                                        id="sseventMonthBTN"
                                        type="button" @click="substationEventBTN('Month')"
                                        class="btn btn-primary"
                                      >M</button>
                                    </div>
                                  </div>
                                </div>
                                <div class="box-body">
                                  <p class="box-title" style="color:#1a495e;margin-left: 5px;font-weight: bold;">{{feederEventSELTXT}} - Meter Name Plate details :</p>
            <template>
                                    <div
                                      class="table-responsive"
                                      id="ssEventMeterNamePlateTablePANE"
                                      style="border:1px solid lightgray;overflow: hidden"
                                      v-bind:style="{height:'80px'}"
                                    >
                                      <table
                                        class="table table-bordered table-responsive-stack"
                                        id="ssEventMeterNamePlateTableID"
                                      >
                                        <thead style="position: sticky;top: -1px;z-index:1;">
                                          <tr>
                                            <th rowspan="2">Serial Number</th>
                                            <th rowspan="2">Manufacturer Name</th>
                                            <th rowspan="2">Firmware</th>
                                            <th rowspan="2" v-show="false">Meter Type</th>
                                            <th rowspan="2">CT ratio</th>
                                            <th rowspan="2">PT ratio</th>
                                          </tr>
                                        </thead>
                                        <tbody v-if="eventTabmeterArrayList.length != 0">
                                          <tr v-for="(inputItems,index) in eventTabmeterArrayList"
                                            v-bind:key="index"
                                          >
                                            <td>{{inputItems.MET_SER_NUM == null ? '-' : inputItems.MET_SER_NUM}}</td>
                                            <td>{{inputItems.MANF_NAME == null ? '-' : inputItems.MANF_NAME}}</td>
                                            <td>{{inputItems.METER_FW == null ? '-' : inputItems.METER_FW}}</td>
                                            <td v-show="false">{{inputItems.MET_TYPE == null ? '-' : inputItems.MET_TYPE}}</td>
                                            <td>{{inputItems.CTRatio == null ? '-' : inputItems.CTRatio}}</td>
                                            <td>{{inputItems.PTRatio == null ? '-' : inputItems.PTRatio}}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        v-if="eventTabmeterArrayList.length == 0"
                                        style="text-align:center;width: 100%;"
                                      >
                                        <span>No Records Found</span>
                                      </div>
                                    </div>
                                  </template>
                                   <p class="box-title" style="color:#1a495e;margin-left: 5px;font-weight: bold;">{{feederEventSELTXT}} - Meter Event details :</p>
                                  <template>
                                    <div
                                      class="table-responsive"
                                      id="sseventsTablePANE"
                                      style="border:1px solid lightgray"
                                      v-bind:style="{height:'600px'}"
                                    >
                                      <table
                                        class="table table-bordered table-responsive-stack"
                                        id="sseventsTableID"
                                      >
                                        <thead style="position: sticky;top: -1px;z-index:1;">
                                          <tr>
                                            <th>S.No</th>
                                            <th style="width:160px">Date & Time</th>
                                            <th>Events</th>
                                            <th>I1</th>
                                            <th>I2</th>
                                            <th>I3</th>
                                            <th>PF1</th>
                                            <th>PF2</th>
                                            <th>PF3</th>
                                            <th>V1</th>
                                            <th>V2</th>
                                            <th>V3</th>
                                            <th>KWH</th>
                                          </tr>
                                        </thead>
                                        <tbody v-if="eventsDataTblJSON != ''">
                                          <tr
                                            v-for="(inputItems,index) in eventsDataTblJSON.details"
                                            v-bind:key="index"
                                          >
                                            <td>{{index+1}}</td>
                                            <td>{{inputItems.Time}}</td>
                                            <td>{{inputItems.ecode_str}}</td>
                                            <td>{{inputItems.I1}}</td>
                                            <td>{{inputItems.I2}}</td>
                                            <td>{{inputItems.I3}}</td>
                                            <td>{{inputItems.PF_1}}</td>
                                            <td>{{inputItems.PF_2}}</td>
                                            <td>{{inputItems.PF_3}}</td>
                                            <td>{{inputItems.V1}}</td>
                                            <td>{{inputItems.V2}}</td>
                                            <td>{{inputItems.V3}}</td>
                                            <td>{{inputItems.KWH}}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        v-if="eventsDataTblJSON == ''"
                                        style="text-align:center;width: 100%;"
                                      >
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
                    </li>
                    <li id="ssfeederdisturbanceLI_TABPANE">
                      <div
                        id="ssfeederdisturbanceTABPANE"
                        style="border: 1px dotted cornflowerblue;background: #f7f7f7;"
                      >
                        <h3 style="margin-top: 5px;color: #174b79;">&nbsp;Feeder Disturbance</h3>
                        <div class="row" id="ssfeederdisturbancefirstrowID">
                          <div class="col-lg-12">
                            <div class="col-lg-12">
                              <div class="box">
                                <div class="box-header with-border">
                                  <h3 class="box-title" style="color:#174b79">Outage</h3>

                                  <div class="btn-group" style="float:right" role="group">
                                    <button
                                      id="ssoutageDailyBTN"
                                      type="button"  @click="outageFeederBTN('Day')"
                                      class="btn btn-primary"
                                    >D</button>
                                    <button
                                      id="ssoutageWeekBTN"
                                      type="button" @click="outageFeederBTN('Week')"
                                      class="btn btn-primary active"
                                    >W</button>
                                    <button
                                      id="ssoutageMonthBTN"
                                      type="button" @click="outageFeederBTN('Month')"
                                      class="btn btn-primary"
                                    >M</button>
                                  </div>
                                </div>
                                <div class="box-body">
                                  <template>
                                    <div
                                      class="table-responsive"
                                      id="ssoutageTablePANE"
                                      style="border:1px solid lightgray"
                                      v-bind:style="{height:'300px'}"
                                    >
                                      <table
                                        class="table table-bordered table-responsive-stack"
                                        id="ssoutageTableID"
                                      >
                                        <thead style="position: sticky;top: -1px;z-index:1;">
                                          <tr>
                                            <th>S.No</th>
                                            <th>Feeder Name</th>
                                            <th>Rating</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Duration (DD  HH:MM)</th>
                                            <th>Reason</th>
                                            <th>Unavailable Capacity</th>
                                          </tr>
                                        </thead>
                                        <tbody v-if="feederOUTAGEDataTblJSON != ''">
                                          <tr
                                            v-for="(inputItems,index) in feederOUTAGEDataTblJSON.details"
                                            v-bind:key="index"
                                          >
                                            <td>{{index+1}}</td>
                                            <td>{{inputItems.feeder_name}}</td>
                                            <td>{{inputItems.rating}}</td>
                                            <td>{{inputItems.startdate}}</td>
                                            <td>{{inputItems.enddate}}</td>
                                            <td>{{inputItems.duration}}</td>
                                            <td>{{inputItems.reason}}</td>
                                            <td>{{inputItems.unavailabile}}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        v-if="feederOUTAGEDataTblJSON == ''"
                                        style="text-align:center;width: 100%;"
                                      >
                                        <span>No Records Found</span>
                                      </div>
                                    </div>
                                  </template>
                                  <div class="row">
                                     <div class="col-lg-3 text-left">
                                      <h4>From : {{outageFromdate}}</h4>
                                    </div>
                                    <div class="col-lg-3 text-left">
                                      <h4>To : {{outageTodate}}</h4>
                                    </div>
                                    <div class="col-lg-3">
                                      <h4></h4>
                                    </div>
                                   <div class="col-lg-3">
                                      <h4>Total Unavailable Capacity Value : {{outageUNAvlvalue}}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="box">
                                <div class="box-header with-border">
                                  <h3 class="box-title" style="color:#174b79">Idle Feeder</h3>

                                  <div class="btn-group" style="float:right" role="group">
                                    <button
                                      id="ssidelfeederDailyBTN"
                                      type="button" @click="idleFeederBTN('Day')"
                                      class="btn btn-primary"
                                    >D</button>
                                    <button
                                      id="ssidelfeederWeekBTN"
                                      type="button" @click="idleFeederBTN('Week')"
                                      class="btn btn-primary active"
                                    >W</button>
                                    <button
                                      id="ssidelfeederMonthBTN"
                                      type="button" @click="idleFeederBTN('Month')"
                                      class="btn btn-primary"
                                    >M</button>
                                  </div>
                                </div>
                                <div class="box-body">
                                  <template>
                                    <div
                                      class="table-responsive"
                                      id="ssidlefeederTablePANE"
                                      style="border:1px solid lightgray"
                                      v-bind:style="{height:'300px'}"
                                    >
                                      <table
                                        class="table table-bordered table-responsive-stack"
                                        id="ssidlefeederTableID"
                                      >
                                        <thead style="position: sticky;top: -1px;z-index:1;">
                                          <tr>
                                            <th>S.No</th>
                                            <th>Feeder Name</th>
                                            <th>Rating</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Duration (DD  HH:MM)</th>
                                            <th>Reason</th>
                                            <th>UnUsed Capacity</th>
                                          </tr>
                                        </thead>
                                        <tbody v-if="feederIDLEDataTblJSON != ''">
                                          <tr
                                            v-for="(inputItems,index) in feederIDLEDataTblJSON.details"
                                            v-bind:key="index"
                                          >
                                            <td>{{index+1}}</td>
                                            <td>{{inputItems.feeder_name}}</td>
                                            <td>{{inputItems.rating}}</td>
                                            <td>{{inputItems.startdate}}</td>
                                            <td>{{inputItems.enddate}}</td>
                                            <td>{{inputItems.duration}}</td>
                                            <td>{{inputItems.reason}}</td>
                                            <td>{{inputItems.unused}}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        v-if="feederIDLEDataTblJSON == ''"
                                        style="text-align:center;width: 100%;"
                                      >
                                        <span>No Records Found</span>
                                      </div>
                                    </div>
                                  </template>
                                  <div class="row">
                                   <div class="col-lg-3 text-left">
                                      <h4>From : {{idleFromdate}}</h4>
                                    </div>
                                    <div class="col-lg-3 text-left">
                                      <h4>To : {{idleTodate}}</h4>
                                    </div>
                                    <div class="col-lg-3">
                                      <h4></h4>
                                    </div>
                                     <div class="col-lg-3">
                                      <h4>Total Unused Capacity Value : {{idleUnusedvalue}}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="box">
                                <div class="box-header with-border">
                                  <h3 class="box-title" style="color:#174b79">Overload Feeder</h3>
                                  <div class="btn-group" style="float:right" role="group">
                                    <button
                                      id="ssoverloadfeederDailyBTN"
                                      type="button" @click="overloadfeederBTN('Day')"
                                      class="btn btn-primary"
                                    >D</button>
                                    <button
                                      id="ssoverloadfeederWeekBTN"
                                      type="button" @click="overloadfeederBTN('Week')"
                                      class="btn btn-primary active"
                                    >W</button>
                                    <button
                                      id="ssoverloadfeederMonthBTN"
                                      type="button" @click="overloadfeederBTN('Month')"
                                      class="btn btn-primary"
                                    >M</button>
                                  </div>
                                </div>
                                <div class="box-body">
                                  <template>
                                    <div
                                      class="table-responsive"
                                      id="ssoverloadTablePANE"
                                      style="border:1px solid lightgray"
                                      v-bind:style="{height:'300px'}"
                                    >
                                      <table
                                        class="table table-bordered table-responsive-stack"
                                        id="ssoverloadTableID"
                                      >
                                        <thead style="position: sticky;top: -1px;z-index:1;">
                                          <tr>
                                            <th rowspan="2">S.No</th>
                                            <th rowspan="2">Feeder Name</th>
                                            <th colspan="3">Overload</th>
                                            <th rowspan="2">Overload Value (&gt; 80 %)</th>
                                          </tr>
                                          <tr>
                                            <th>Start</th>
                                            <th>End</th>
                                            <th>Duration (DD  HH:MM)</th>
                                          </tr>
                                        </thead>
                                        <tbody v-if="feederOVERLOADDataTblJSON != ''">
                                          <tr
                                            v-for="(inputItems,index) in feederOVERLOADDataTblJSON.details"
                                            v-bind:key="index"
                                          >
                                            <td>{{index+1}}</td>
                                            <td>{{inputItems.feeder_name}}</td>
                                            <td>{{inputItems.startdate}}</td>
                                            <td>{{inputItems.enddate}}</td>
                                            <td>{{inputItems.duration}}</td>
                                            <td>{{inputItems.overload_value}}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        v-if="feederOVERLOADDataTblJSON == ''"
                                        style="text-align:center;width: 100%;"
                                      >
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
                    </li>
                    <li id="ssdcudetailsLI_TABPANE">
                      <div
                        id="ssdcudetailsTABPANE"
                        style="border: 1px dotted cornflowerblue;background: #f7f7f7;"
                      >
                        <h3 style="color: #174b79;">&nbsp; DCU Details</h3>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="box">
                            <div class="box-body">
                             <div class="row" style="margin-right: 10px;margin-left: -10px;">
                             <div class="col-lg-12" style="margin-left: -10px;">
                            <div class="col-lg-2">
                              <h4 class="fontsize16">Region Name</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectssregionTXT}}</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">Circle Name</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectsscircleTXT}}</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">Sub Station Name</h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">: {{selectSSlocationName}}</h4>
                            </div>
                            <div class="col-lg-2" v-show="false">
                              <h4 class="fontsize16">Device Name</h4>
                            </div>
                            <div class="col-lg-2" v-show="false">
                              <h4 class="fontsize16">: - </h4>
                            </div>
                            <div class="col-lg-2">
                              <h4 class="fontsize16">DCU Status</h4>
                            </div>
                            <div class="col-lg-2">
                               <h4 class="fontsize16" style="color:green" v-if="selectDCUStatusTXT == 'Communicating'">: <b>{{selectDCUStatusTXT}}</b></h4>
                              <h4 class="fontsize16" style="color:red" v-else-if="selectDCUStatusTXT == 'Not Communicating'">: <b>{{selectDCUStatusTXT}}</b></h4>
                              <h4 class="fontsize16" style="color:gray" v-else>: <b>{{selectDCUStatusTXT}}</b></h4>
                            </div>
                          </div>
                                  </div>
                          <p class="box-title" style="color:#;margin-left: 5px;font-weight: bold;">Meter Status :</p>
                                  <div class="row" style="margin-right: 10px;margin-left: -10px;">
       <div class="col-lg-12" >
       <div class="table-responsive"  v-if="countmeterlength != 0 && meterArrayList.length != 0" >
       <table id="dcumetercommStatusTableID" class="table table-bordered" v-for="(tableRow, tableIndex) in countmeterlength" :key="tableIndex" >
          <tr>
            <th style="max-width:100px;width:150px;height: 35px;">Meter Name</th>
            <span v-for="(row, index) in meterArrayList" :key="index">
              <td style="max-width:100px;width:100px;height: 35px;" v-if="index >=  (tableIndex * divLength) && index < (tableIndex * divLength  + divLength)">{{row.METER_NAME}}</td>
            </span>
          </tr>
          <tr>
            <th style="width:150px">Commn Status</th>
            <span v-for="(row, index) in meterArrayList" :key="index">
              <span v-if="index >=  (tableIndex * divLength) && index < (tableIndex * divLength  + divLength)">
                <td v-if="row.METER_STATUS == 'Online' || row.METER_STATUS == 'Communicating'" style="width:100px;max-width:100px;height: 37px;">
                  <img src="static/img/images/tick.png" title="Communicating" style="margin-top: 5px;"/>
                </td>
                 <td  v-else-if ="row.METER_STATUS == 'Offline' || row.METER_STATUS == 'Not Communicating'" style="width:100px;max-width:100px;height: 37px;">
                  <img src="static/img/images/cancel.png" title="Not Communicating" style="margin-top: 5px;"/>
                </td>
                <td v-else style="width:100px;max-width:100px;height: 37px;">
                  <img src="static/img/images/not_config.png" title="Not Configure" style="margin-top: 5px;"/>
                </td>
              </span>
            </span>
          </tr>
        </table>
    </div>
     <div v-if="countmeterlength == 0 || meterArrayList.length == 0 " style="text-align:left;width: 100%;">
                <span>No Meter Connected</span>
                </div>
           </div>
            </div>
            <p class="box-title" style="color:#;margin-left: 5px;font-weight: bold;">Meter Name Plate details :</p>
            <template>
                                    <div
                                      class="table-responsive"
                                      id="ssMeterNamePlateTablePANE"
                                      style="border:1px solid lightgray"
                                      v-bind:style="{height:'450px'}"
                                    >
                                      <table
                                        class="table table-bordered table-responsive-stack"
                                        id="ssMeterNamePlateTableID"
                                      >
                                        <thead style="position: sticky;top: -1px;z-index:1;">
                                          <tr>
                                            <th rowspan="2">S.No</th>
                                            <th rowspan="2">Meter Name</th>
                                            <th rowspan="2">Serial Number</th>
                                            <th rowspan="2">Manufacturer Name</th>
                                            <th rowspan="2">Firmware</th>
                                            <th rowspan="2" v-show="false">Meter Type</th>
                                            <th rowspan="2">CT ratio</th>
                                            <th rowspan="2">PT ratio</th>
                                          </tr>
                                        </thead>
                                        <tbody v-if="meterArrayList.length != 0">
                                          <tr v-for="(inputItems,index) in meterArrayList"
                                            v-bind:key="index"
                                          >
                                            <td>{{index+1}}</td>
                                            <td>{{inputItems.METER_NAME == null ? '-' : inputItems.METER_NAME}}</td>
                                            <td>{{inputItems.MET_SER_NUM == null ? '-' : inputItems.MET_SER_NUM}}</td>
                                            <td>{{inputItems.MANF_NAME == null ? '-' : inputItems.MANF_NAME}}</td>
                                            <td>{{inputItems.METER_FW == null ? '-' : inputItems.METER_FW}}</td>
                                            <td v-show="false">{{inputItems.MET_TYPE == null ? '-' : inputItems.MET_TYPE}}</td>
                                            <td>{{inputItems.CTRatio == null ? '-' : inputItems.CTRatio}}</td>
                                            <td>{{inputItems.PTRatio == null ? '-' : inputItems.PTRatio}}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        v-if="meterArrayList.length == 0"
                                        style="text-align:center;width: 100%;"
                                      >
                                        <span>No Records Found</span>
                                      </div>
                                    </div>
                                  </template>

                                </div>
                              </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
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
  <modal
      name="sssldDiagrampopup"
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
              <h4
                class="heading"
                style="color: rgb(0, 115, 183);"
              >{{selectSSlocationName}} : SLD Details</h4>
            </div>
            <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button
                id="sssldDiagrampopupcloseBTN"
                type="button"
                class="btn btn-default"
                @click="sldDiagrampopupcloseACtion"
                style="background:transparent;border:1px solid transparent"
              >
                <span aria-hidden="true" class="white-text">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <!--Body-->
        <div class="modal-body" style="margin-top:-10px;height:400px;">
          <p></p>
        </div>
        <!--Footer-->
        <div class="modal-footer flex-center">
          <a
            id="ssclseBTN"
            type="button"
            class="btn btn-default waves-effect btnPadding"
            @click="sldDiagrampopupcloseACtion"
          >Cancel</a>
        </div>
      </div>
    </modal>
    <modal
      name="meterNameplatepopup"
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
      width="50%"
      height="auto"
      @before-open="meterNamePlatebeforeOpen"
      @opened="meterNamePlateopened"
      @closed="meterNamePlateclosed"
      @before-close="meterNamePlatebeforeClose"
      :clickToClose="false"
    >
      <div class="size-modal-content">
        <div class="row">
          <div class="modal-header">
            <div class="col-lg-6" style="margin-top:-10px;">
              <h4
                class="heading"
                style="color: rgb(0, 115, 183);"
              > Meter Name Plate Details</h4>
            </div>
            <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button
                id="close1MeterNameplateBTN"
                type="button"
                class="btn btn-default"
                @click="closeMeterNameplatepopup()"
                style="background:transparent;border:1px solid transparent"
              >
                <span aria-hidden="true" class="white-text">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <!--Body-->
        <div class="modal-body" style="margin-top:-10px;height:470px;">
            <template>
                                    <div
                                      class="table-responsive"
                                      id="ssviewMeterNamePlateTablePANE"
                                      style="border:1px solid lightgray"
                                      v-bind:style="{height:'450px'}"
                                    >
                                      <table
                                        class="table table-bordered table-responsive-stack"
                                        id="ssviewMeterNamePlateTableID"
                                      >
                                        <thead style="position: sticky;top: -1px;z-index:1;">
                                          <tr>
                                            <th rowspan="2">S.No</th>
                                            <th rowspan="2">Meter Name</th>
                                            <th rowspan="2">Serial Number</th>
                                            <th rowspan="2">Manufacturer Name</th>
                                            <th rowspan="2">Firmware</th>
                                            <th rowspan="2" v-show="false">Meter Type</th>
                                            <th rowspan="2">CT ratio</th>
                                            <th rowspan="2">PT ratio</th>
                                          </tr>
                                        </thead>
                                        <tbody v-if="meterArrayList.length != 0">
                                          <tr v-for="(inputItems,index) in meterArrayList"
                                            v-bind:key="index"
                                          >
                                            <td>{{index+1}}</td>
                                            <td>{{inputItems.METER_NAME == null ? '-' : inputItems.METER_NAME}}</td>
                                            <td>{{inputItems.MET_SER_NUM == null ? '-' : inputItems.MET_SER_NUM}}</td>
                                            <td>{{inputItems.MANF_NAME == null ? '-' : inputItems.MANF_NAME}}</td>
                                            <td>{{inputItems.METER_FW == null ? '-' : inputItems.METER_FW}}</td>
                                            <td v-show="false">{{inputItems.MET_TYPE == null ? '-' : inputItems.MET_TYPE}}</td>
                                            <td>{{inputItems.CTRatio == null ? '-' : inputItems.CTRatio}}</td>
                                            <td>{{inputItems.PTRatio == null ? '-' : inputItems.PTRatio}}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <div
                                        v-if="meterArrayList.length == 0"
                                        style="text-align:center;width: 100%;"
                                      >
                                        <span>No Records Found</span>
                                      </div>
                                    </div>
                                  </template>
        </div>
        <!--Footer-->
        <div class="modal-footer flex-center">
          <a
            id="closeMeterNameplateBTN"
            type="button"
            class="btn btn-default waves-effect btnPadding"
            @click="closeMeterNameplatepopup()"
          >Close</a>
        </div>
      </div>
    </modal>

     <modal
      name="ssconnectDatavailpopup"
      transition="nice-modal-fade"
      classes="demo-modal-class"
      style="z-index:1111 !important"
      :min-width="600"
      :min-height="200"
      :pivot-y="0.5"
      :adaptive="true"
      :draggable="true"
      :scrollable="true"
      :reset="true"
      width="50%"
      height="auto"
      @before-open="markerbegoreopened"
      @opened="markeropened"
      @closed="closed"
      @before-close="beforeClose"
      :clickToClose="false"
    >
      <div class="size-modal-content">
        <div class="row">
          <div class="modal-header">
            <div class="col-lg-6" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);">Connectivity & Data Availability</h4>
            </div>
            <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button
                id="sscloseConnectivitydatapopupBTN"
                type="button"
                class="btn btn-default"
                @click="closeConnectivitydatapopup"
                style="background:transparent;border:1px solid transparent"
              >
                <span aria-hidden="true" class="white-text">&times;</span>
              </button>
            </div>
          </div>
        </div>
        <!--Body-->
        <div class="modal-body" style="margin-top:-10px;height:400px;">
          <div class="col-lg-12">
            <div class="box">
              <div class="box-header with-border">
                <div class="text-right" style="float:right">
                  <select
                    id="ssdataconnChartTypeTXT"
                    v-model="dataconnChartTypeTXT"
                    class="inputTEXTcss"
                    style="width: 30% !important;"
                  >
                    <option value="Choose Chart Type" selected disabled>Choose Chart Type</option>
                    <option value="line">Line</option>
                    <option value="bar">Bar</option>
                  </select>&nbsp;
                  <div class="btn-group" style="float:right" role="group">
                    <button id="ssconncurveDailyBTN" type="button" class="btn btn-sm btn-primary" @click="markerConvBTN('Day')">D</button>
                    <button id="ssconncurveWeekBTN"  type="button" class="btn btn-sm btn-primary active" @click="markerConvBTN('Week')" >W</button>
                    <button id="ssconncurveMonthBTN" type="button" class="btn btn-sm btn-primary" @click="markerConvBTN('Month')">M</button>
                  </div>&nbsp;&nbsp;
                </div>
              </div>
              <div class="box-body" v-show="connectivtyanddataAvailseries.length !=0">
                <apexchart
                  width="100%"
                  height="300"
                  :type="dataconnChartTypeTXT"
                  :options="connectivtyanddataAvailoptions"
                  :series="connectivtyanddataAvailseries"
                ></apexchart>
              </div>
              <div class="box-body" style="height:400px" v-show="connectivtyanddataAvailseries.length == 0">
                  <span>No record found</span>
              </div>
            </div>
          </div>
        </div>
        <!--Footer-->
        <div class="modal-footer flex-center">
          <a
            id="ssclse2BTN"
            type="button"
            class="btn btn-default waves-effect btnPadding"
            @click="closeConnectivitydatapopup"
          >Cancel</a>
        </div>
      </div>
    </modal>
  </section>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import CripNotice from 'crip-vue-notice';
import Datepicker from "vuejs-datepicker";
import VueElementLoading from 'vue-element-loading';
var myDate = new Date();
export default {
  name: 'ssDetailspagePAGE',
  props: ['mapselObj'],
  components: {
    CripNotice,
    VueElementLoading,
    Datepicker
  },
  data () {
    return {
      mapselObject:this.mapselObj,
      ssPageRegionTXT:'Choose Region',
      ssPageCircleTXT:'Choose Circle',
      ssPageDCUTXT:'Choose DCU',
      ssPageSubStationTXT:'Choose Sub Station',
      ssPageregionListArray:[],
      ssPagecircleListArray:[],
      ssPageSSListArray:[],
      ssPageDCUListArray:[],
      nameplateSubStationJson:'',
      ssPageSubmitregionid:'',
      ssPageSubmitregionname:'',
      ssPageSubmitcircleid :'',
      ssPageSubmitcirclename:'',
      ssPageSubmitDCUid:'',
      ssPageSubmitSSname :'',
      user_role: this.$session.get("userrole"),
      user_name: this.$session.get("username"),
      isLoading: false,
      clearSSNameplateInfoPopInterval:null,
      clearSSDCUDETAILSPANEInfoPopInterval:null,
      submitMeterName:'',
      fullPage: true,
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
      dailycurrStartdate: this.dailyFormattedDate(myDate) + " 00:00:00",
      dailycurrEnddate: this.dailyFormattedDate(myDate) + " 23:59:59",
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
    graphdataoptions:{
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
      },
      eventselNameTXT: "Choose Event",
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
      loadsurveytableJson:"",
      loadsurveyseries:[],
      loadsurveyoptions:{
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
      colors: ['#032457', '#049f82', '#E91E63', '#9C27B0'],
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
      namePlateliveINCOMERDataTblJSON: "",
      namePlateliveOUTCOMERDataTblJSON: "",
      namePlateTablePANEHeight: window.innerHeight - 600 + "px",
      dataconnChartTypeTXT: "line",
      feederOUTAGEDataTblJSON: "",
      feederSELTXT: "Choose Feeder",
      feederloadSurveySELTXT:'Choose Feeder',
      feederEventSELTXT:"Choose Feeder",
      feedermidnightSELTXT:'Choose Feeder',
      ssfeederlist:[],
      loadsurveyfeedTableFromdateTXT:myDate,
      loadsurveyfeedTabledisabledDates: {
        from: new Date()
      },
      midnightfeedTableFromdateTXT:myDate,
      midnightfeedTabledisabledDates: {
        from: new Date()
      },
      feederIDLEDataTblJSON: "",
      feederOVERLOADDataTblJSON: "",
      eventsDataTblJSON: "",
      midNightDataTblJSON:'',
      outageFromdate: "",
      outageTodate: "",
      outageUNAvlvalue: "",
      idleFromdate: "",
      idleTodate: "",
      idleUnusedvalue: "",
      selectregionName: "",
      selectcircleName: "",
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
      selectDCUTIMETXT: "",
      selectDCUStatusTXT:"",
      selectdcuSynTimeTXT:"-",
      selectIdleFeederTXT: "",
      selectOverloadFeederTXT: "",
      substationEventLBL: "substationEventWeekLBL",
      substationLoadcurveLBL: "substationLoadcurveWeekLBL",
      substationCumulativedcurveLBL: "substationCulativecurveWeekLBL",
      substationoutageFeederBTNLBL:'substationoutageFeederWeekLBL',
      substationidleFeederBTNLBL:'substationidleFeederWeekLBL',
      substationoverloadFeederBTNLBL:'substationoverloadFeederWeekLBL',
      meterNamePlateDataJson:"",
      loadsurveyTabmeterArrayList:[],
      eventTabmeterArrayList:[],
      divLength: 10,
      countmeterlength:0,
      meterArrayList:[],
    }
  },
  created(){
  },
  async mounted () {
    this.isLoading = true;
    let innerMinHeight = window.innerHeight - 125 + 'px'
    document.getElementById('SSDetailsPagePANE').style.minHeight = innerMinHeight;
    document.getElementById('sspageTimeLineBodyPane').style.minHeight = innerMinHeight;
    console.log('call mounted function:..mapselObject......', this.mapselObject);
    if(this.mapselObject == undefined){
      await this.getSSPAGERegionNameLst();
    }else{
      await this.paramsregionNameLst();
    }
    setTimeout(async () => await this.ssPAGEFillterTableMethod(), 1500);
    setTimeout(() => this.isLoading= false, 1500);
    document.getElementById('ssnameplatepaneBTN').click();
  },
  destroyed(){
    if(this.clearSSNameplateInfoPopInterval != null){
    clearInterval(this.clearSSNameplateInfoPopInterval);
    }
    if(this.clearSSDCUDETAILSPANEInfoPopInterval != null){
      clearInterval(this.clearSSDCUDETAILSPANEInfoPopInterval);
    }
  },
  methods: {
    getSSPAGERegionNameLst(){
       this.ssPageregionListArray = [];
       this.ssPageRegionTXT = "Choose Region";
       this.ssPageCircleTXT = "Choose Circle";
       this.ssPageSubStationTXT = "Choose Sub Station";
       this.ssPageDCUTXT = "Choose DCU";
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.ssPageregionListArray = response.data.details;
          this.ssPageRegionTXT = this.ssPageregionListArray[0].REGION_ID+'$$'+this.ssPageregionListArray[0].REGION_NAME;
          this.getSSPAGECircleNameLst(this.ssPageRegionTXT);
        } else {
          this.ssPageregionListArray = [];
          this.ssPageRegionTXT = "Choose Region";
          this.ssPageCircleTXT = "Choose Circle";
          this.ssPageSubStationTXT = "Choose Sub Station";
          this.ssPageDCUTXT = "Choose DCU";
        }
      });
    },
     getSSPAGECircleNameLst(regionidname){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.ssPageCircleTXT = "Choose Circle";
       this.ssPageSubStationTXT = "Choose Sub Station";
       this.ssPageDCUTXT = "Choose DCU";
       this.ssPagecircleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.ssPagecircleListArray = response.data.details;
          this.ssPageCircleTXT = this.ssPagecircleListArray[0].CIRCLE_ID+'$$'+this.ssPagecircleListArray[0].CIRCLE_NAME;
          this.getSSPAGESSNameLst(this.ssPageCircleTXT);
        } else {
          this.ssPagecircleListArray = [];
          this.ssPageCircleTXT = "Choose Circle";
          this.ssPageSubStationTXT = "Choose Sub Station";
          this.ssPageDCUTXT = "Choose DCU";
        }
      });
    },
    getSSPAGESSNameLst(circleidName){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
      var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleid);
      this.ssPageSSListArray = [];
      this.ssPageDCUListArray= [];
      axios.get(getcicrleSSURL).then(response => {
      if (response.data.status == "found") {
        this.ssPageSSListArray = response.data.details;
        this.ssPageDCUListArray = response.data.details;
        this.ssPageSubStationTXT = this.ssPageSSListArray[0].DCU_SS_ID+'$$'+this.ssPageSSListArray[0].DCU_LOCATION;
        this.ssPageDCUTXT =  this.ssPageDCUListArray[0].DCU_ID+'$$'+this.ssPageDCUListArray[0].DCU_NAME;
      } else {
          this.ssPageSSListArray = [];
          this.ssPageDCUListArray= [];
        }
      });
    },
    paramsregionNameLst(){
       this.ssPageregionListArray = [];
       this.ssPageRegionTXT = "Choose Region";
       this.ssPageCircleTXT = "Choose Circle";
       this.ssPageSubStationTXT = "Choose Sub Station";
       this.ssPageDCUTXT = "Choose DCU";
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.ssPageregionListArray = response.data.details;
          if(this.mapselObject != undefined){
          if(this.mapselObject.hasOwnProperty('region_id')){
              this.ssPageRegionTXT = this.mapselObject.region_id+'$$'+this.mapselObject.region;
            }else{
              this.ssPageRegionTXT = this.ssPageregionListArray[0].REGION_ID+'$$'+this.ssPageregionListArray[0].REGION_NAME;
            }
          }else{
              this.ssPageRegionTXT = this.ssPageregionListArray[0].REGION_ID+'$$'+this.ssPageregionListArray[0].REGION_NAME;
          }
          this.paramsCircleNameLst(this.ssPageRegionTXT);
        } else {
          this.ssPageregionListArray = [];
          this.ssPageRegionTXT = "Choose Region";
          this.ssPageCircleTXT = "Choose Circle";
          this.ssPageSubStationTXT = "Choose Sub Station";
          this.ssPageDCUTXT = "Choose DCU";
        }
      });
    },
     paramsCircleNameLst(regionidname){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.ssPageCircleTXT = "Choose Circle";
       this.ssPageSubStationTXT = "Choose Sub Station";
       this.ssPageDCUTXT = "Choose DCU";
       this.ssPagecircleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.ssPagecircleListArray = response.data.details;
          if(this.mapselObject != undefined){
          if(this.mapselObject.hasOwnProperty('circle_id')){
              this.ssPageCircleTXT = this.mapselObject.circle_id+'$$'+this.mapselObject.circle;
            }else{
              this.ssPageCircleTXT = this.ssPagecircleListArray[0].CIRCLE_ID+'$$'+this.ssPagecircleListArray[0].CIRCLE_NAME;
            }
          }else{
              this.ssPageCircleTXT = this.ssPagecircleListArray[0].CIRCLE_ID+'$$'+this.ssPagecircleListArray[0].CIRCLE_NAME;
          }
          this.paramsSSNameLst(this.ssPageCircleTXT);
        } else {
          this.ssPagecircleListArray = [];
          this.ssPageCircleTXT = "Choose Circle";
          this.ssPageSubStationTXT = "Choose Sub Station";
          this.ssPageDCUTXT = "Choose DCU";
        }
      });
    },
    paramsSSNameLst(circleidName){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
      var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleid);
      this.ssPageSSListArray = [];
      this.ssPageDCUListArray= [];
      axios.get(getcicrleSSURL).then(response => {
      if (response.data.status == "found") {
        this.ssPageSSListArray = response.data.details;
        this.ssPageDCUListArray = response.data.details;
         if(this.mapselObject != undefined){
          if(this.mapselObject.hasOwnProperty('circle_id')){
              this.ssPageSubStationTXT = this.mapselObject.ss_id+'$$'+this.mapselObject.ss;
               this.ssPageDCUTXT =  this.mapselObject.dcu_id+'$$'+this.mapselObject.dcu_name;
            }else{
              this.ssPageSubStationTXT = this.ssPageSSListArray[0].DCU_SS_ID+'$$'+this.ssPageSSListArray[0].DCU_LOCATION;
               this.ssPageDCUTXT =  this.ssPageSSListArray[0].DCU_ID+'$$'+this.ssPageSSListArray[0].DCU_NAME;
            }
          }else{
              this.ssPageSubStationTXT = this.ssPageSSListArray[0].DCU_SS_ID+'$$'+this.ssPageSSListArray[0].DCU_LOCATION;
               this.ssPageDCUTXT =  this.ssPageSSListArray[0].DCU_ID+'$$'+this.ssPageSSListArray[0].DCU_NAME;
          }
      } else {
          this.ssPageSSListArray = [];
          this.ssPageDCUListArray= [];
        }
      });
    },
    changedcuMethod(selDcuName){
      var dcuid = selDcuName.split("$$")[0];
      var filterItems = this.ssPageSSListArray.filter(item => item.DCU_SS_ID === dcuid);
      console.log('changedcuMethod items :',JSON.stringify(filterItems));
      if(filterItems.length != 0){
      this.ssPageDCUTXT = filterItems[0].DCU_ID+'$$'+filterItems[0].DCU_NAME;
      }
    },
    ssEditSSTableMethod(){
      this.$router.push({
    name: 'Edit Data',
    params: {
        clickobject: {
          region_id:this.ssPageRegionTXT.split('$$')[0],
          region_name:this.ssPageRegionTXT.split('$$')[1],
          circle_id:this.ssPageCircleTXT.split('$$')[0],
          circle_name:this.ssPageCircleTXT.split('$$')[1],
          dcu_id:this.ssPageDCUTXT.split('$$')[0],
          dcu_name:this.ssPageDCUTXT.split('$$')[1],
          }
    }
    });
    },
    ssPAGEFillterTableMethod(){
      this.isLoading = true;
      if(this.ssPageRegionTXT == 'Choose Region'){
        this.warningMessage('Please Choose Region');
        this.isLoading = false;
        return false;
      }
      if(this.ssPageCircleTXT == 'Choose Circle'){
        this.warningMessage('Please Choose Circle');
        this.isLoading = false;
        return false;
      }
      if(this.ssPageSubStationTXT == 'Choose Sub Station'){
        this.warningMessage('Please Choose Sub Station');
        this.isLoading = false;
        return false;
      }
      if(this.ssPageDCUTXT == 'Choose DCU'){
        this.warningMessage('Please Choose DCU');
        this.isLoading = false;
        return false;
      }
      try {
      this.ssPageSubmitregionid = this.ssPageRegionTXT.split('$$')[0];
      this.ssPageSubmitregionname = this.ssPageRegionTXT.split('$$')[1];
      this.ssPageSubmitcircleid = this.ssPageCircleTXT.split('$$')[0];
      this.ssPageSubmitcirclename = this.ssPageCircleTXT.split('$$')[1];
      this.ssPageSubmitDCUid = this.ssPageDCUTXT.split('$$')[0];
      this.ssPageSubmitSSname = this.ssPageDCUTXT.split('$$')[1];
      var filterJSON = {
        "region_id":this.ssPageSubmitregionid,
        "region_name":this.ssPageSubmitregionname,
        "circle_id":this.ssPageSubmitcircleid,
        "circle_name":this.ssPageSubmitcirclename,
        "dcu_id":this.ssPageSubmitDCUid,
        "ss_name":this.ssPageSubmitSSname,
      }
      var substation_nameplate_summaryURL = this.substation_nameplate_summaryURL.replace("$$dcuid$$", this.ssPageSubmitDCUid);
      console.log('fillter submit ', substation_nameplate_summaryURL);
        axios.get(substation_nameplate_summaryURL).then(response => {
        if (response.data.status == "found") {
          this.nameplateSubStationJson = response.data;
          this.namePlateliveINCOMERDataTblJSON = this.nameplateSubStationJson.np_details.incomer_feeder_summary;
          this.namePlateliveOUTCOMERDataTblJSON = this.nameplateSubStationJson.np_details.outcomer_feeder_summary;
          this.selectSSlocationName = this.nameplateSubStationJson.np_details.ss_location;
          this.selectSSPopupDucID = this.nameplateSubStationJson.np_details.ss_id;
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
          if(this.nameplateSubStationJson.np_details.dcu_time == "-"){
            this.selectDCUTIMETXT = "-";
          }else{
            this.selectDCUTIMETXT = this.formatDatewithTime(this.nameplateSubStationJson.np_details.dcu_time);
          }
          this.selectIdleFeederTXT = this.nameplateSubStationJson.np_details.ss_idle;
          this.selectOverloadFeederTXT = this.nameplateSubStationJson.np_details.ss_overload_feeder;
          this.getfeederlist(this.ssPageSubmitDCUid);
          console.log('--before click-->>');
          document.getElementById('ssnameplatepaneBTN').click();
          console.log('--after click-->>');
          //this.getsubstationnameplatePANEdetails();
          this.isLoading = false;
        } else {
          this.nameplateSubStationJson = "";
          this.ssPageSubmitSSname = "";
          this.isLoading = false;
        }
      });
      } catch (error) {
        console.log('ssPAGEFillterTableMethod error :', error.message)
      }
    },
    openConnectivitydatapopup() {
      this.$modal.show("ssconnectDatavailpopup");
     },
    closeConnectivitydatapopup() {
      this.$modal.hide("ssconnectDatavailpopup");
    },
    opensldDiagrampopup() {
      this.$modal.show("sssldDiagrampopup");
    },
    sldDiagrampopupcloseACtion() {
      this.$modal.hide("sssldDiagrampopup");
    },
    openMeterNameplatepopup(){
      this.$modal.show("meterNameplatepopup");
    },
    closeMeterNameplatepopup(){
      this.$modal.hide("meterNameplatepopup");
    },
    meterNamePlatebeforeOpen () {
      this.isLoading = true;
       this.clearSSDCUDETAILSPANEInfoPopInterval  = setInterval(async () => {
       await this.getDCUDetailsMethod();
       this.isLoading = false;
      }, 1000);
      clearInterval(this.clearSSNameplateInfoPopInterval);
    },
    meterNamePlatebeforeClose () {
      this.isLoading = true;
       this.clearSSNameplateInfoPopInterval  = setInterval(async () => {
       await this.getSSInfopopup();
        this.isLoading = false;
      }, 2000);
      clearInterval(this.clearSSDCUDETAILSPANEInfoPopInterval);
    },
    meterNamePlateopened (e) {
    },
    meterNamePlateclosed (e) {
    },
     getSSInfopopup(){
      var substation_nameplate_summaryURL = this.substation_nameplate_summaryURL.replace("$$dcuid$$", this.ssPageSubmitDCUid);
      console.log('substation_nameplate_summaryURL call :', substation_nameplate_summaryURL);
        axios.get(substation_nameplate_summaryURL).then(response => {
        if (response.data.status == "found") {
          this.nameplateSubStationJson = response.data;
          if(this.nameplateSubStationJson != ""){
             //console.log('---------------calling--22222222222222222-----------'+JSON.stringify(this.nameplateSubStationJson));
          this.namePlateliveINCOMERDataTblJSON = this.nameplateSubStationJson.np_details.incomer_feeder_summary;
          this.namePlateliveOUTCOMERDataTblJSON = this.nameplateSubStationJson.np_details.outcomer_feeder_summary;
          this.selectSSlocationName = this.nameplateSubStationJson.np_details.ss_location;
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
          //console.log('this.nameplateSubStationJson.np_details.dcu_time ::', this.nameplateSubStationJson.np_details.dcu_time);
          if(this.nameplateSubStationJson.np_details.dcu_time == "-"){
            this.selectDCUTIMETXT = "-";
          }else{
            this.selectDCUTIMETXT = this.formatDatewithTime(this.nameplateSubStationJson.np_details.dcu_time);
          }
          this.selectDCUStatusTXT = this.nameplateSubStationJson.dcu_status;
          if(this.selectDCUStatusTXT == "Not Communicating"){
            if(this.selectDCUTIMETXT != '-' || this.selectDCUTIMETXT != null){
              this.selectdcuSynTimeTXT = this.timeDiffCalc(new Date(this.selectDCUTIMETXT), new Date());
            }else{
              this.selectdcuSynTimeTXT = "";
            }
          }else{
            this.selectdcuSynTimeTXT = "";
          }
          this.selectIdleFeederTXT = this.nameplateSubStationJson.np_details.ss_idle;
          this.selectOverloadFeederTXT = this.nameplateSubStationJson.np_details.ss_overload_feeder;
        }
        } else {
          this.nameplateSubStationJson = "";
           this.selectDCUStatusTXT = "Not Configure";
        }
      });
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
    chnageloadSurveyfeedername(feedername){
      this.feederloadSurveySELTXT = feedername;
    },
    chnageEventfeedername(feedername){
      this.feederEventSELTXT = feedername;
      var startdate = new Date();
      this.getsubstationEvent(this.ssPageSubmitDCUid,this.feederEventSELTXT,startdate,startdate);
    },
    chnageMidnightfeedername(feedername,selDateTXT){
      console.log('selDateTXT :', selDateTXT);
      this.feedermidnightSELTXT = feedername;
      this.getsubstationMidnight(this.ssPageSubmitDCUid,this.feedermidnightSELTXT,selDateTXT,selDateTXT);
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
    getsubstationnameplatePANEdetails(){
      if(this.clearSSNameplateInfoPopInterval != null){
      clearInterval(this.clearSSNameplateInfoPopInterval);
      }
      document.getElementById("ssnameplateLI_TABPANE").style.display = 'block';
      document.getElementById("ssloadcurveLI_TABPANE").style.display = 'none';
      document.getElementById("ssloadsurveyLI_TABPANE").style.display = 'none';
      document.getElementById("ssfeederdisturbanceLI_TABPANE").style.display = 'none';
      document.getElementById("sseventsLI_TABPANE").style.display = 'none';
      document.getElementById("ssMidnight_TABPANE").style.display = 'none';
      document.getElementById("ssdcudetailsLI_TABPANE").style.display = 'none';
      this.clearSSNameplateInfoPopInterval  = setInterval(() => {
        this.getSSInfopopup();
      }, 2000);
      clearInterval(this.clearSSDCUDETAILSPANEInfoPopInterval);
    },
    getsubstationloadsurveyPANEdetails(){
      var currdate = new Date();
      if(this.feederloadSurveySELTXT == "Choose Feeder"){
        if(this.ssfeederlist.length != 0){
          this.feederloadSurveySELTXT = this.ssfeederlist[0].METER_NAME;
          this.submitMeterName = this.feederloadSurveySELTXT;
        }else{
           this.warningMessage('feeder name not available');
           return false;
        }
      }else{
        if(this.feederloadSurveySELTXT != ''){
         this.submitMeterName = this.feederloadSurveySELTXT;
         }
      }
      this.getsubstationloadsurvey(currdate,this.ssPageSubmitDCUid,this.feederloadSurveySELTXT);
      document.getElementById("ssloadsurveyLI_TABPANE").style.display = 'block';
      document.getElementById("ssloadcurveLI_TABPANE").style.display = 'none';
      document.getElementById("ssnameplateLI_TABPANE").style.display = 'none';
      document.getElementById("ssfeederdisturbanceLI_TABPANE").style.display = 'none';
      document.getElementById("sseventsLI_TABPANE").style.display = 'none';
      document.getElementById("ssMidnight_TABPANE").style.display = 'none';
      document.getElementById("ssdcudetailsLI_TABPANE").style.display = 'none';
      clearInterval(this.clearSSNameplateInfoPopInterval);
      clearInterval(this.clearSSDCUDETAILSPANEInfoPopInterval);
    },
    getsubstationloadcurvePANEdetails(){
      this.substationLoadcurveBTN("Week");
      this.substationCumulativecurveBTN("Week");
      document.getElementById("ssloadcurveLI_TABPANE").style.display = 'block';
      document.getElementById("ssloadsurveyLI_TABPANE").style.display = 'none';
      document.getElementById("ssnameplateLI_TABPANE").style.display = 'none';
      document.getElementById("ssfeederdisturbanceLI_TABPANE").style.display = 'none';
      document.getElementById("sseventsLI_TABPANE").style.display = 'none';
      document.getElementById("ssMidnight_TABPANE").style.display = 'none';
      document.getElementById("ssdcudetailsLI_TABPANE").style.display = 'none';
       clearInterval(this.clearSSNameplateInfoPopInterval);
       clearInterval(this.clearSSDCUDETAILSPANEInfoPopInterval);
    },
    getsubstationFeederDisturbancePANEdetails(){
      this.outageFeederBTN('Week');
      this.idleFeederBTN('Week');
      this.overloadfeederBTN('Week');
      document.getElementById("ssfeederdisturbanceLI_TABPANE").style.display = 'block';
      document.getElementById("ssnameplateLI_TABPANE").style.display = 'none';
      document.getElementById("ssloadsurveyLI_TABPANE").style.display = 'none';
      document.getElementById("ssloadcurveLI_TABPANE").style.display = 'none';
      document.getElementById("sseventsLI_TABPANE").style.display = 'none';
      document.getElementById("ssdcudetailsLI_TABPANE").style.display = 'none';
      document.getElementById("ssMidnight_TABPANE").style.display = 'none';
       clearInterval(this.clearSSNameplateInfoPopInterval);
       clearInterval(this.clearSSDCUDETAILSPANEInfoPopInterval);
    },
    getsubstationMidnightPANEdetails(){
      this.isLoading =  true;
        if(this.feedermidnightSELTXT == "Choose Feeder"){
        if(this.ssfeederlist.length != 0){
          this.feedermidnightSELTXT = this.ssfeederlist[0].METER_NAME;
          this.chnageMidnightfeedername(this.feedermidnightSELTXT,this.midnightfeedTableFromdateTXT);
        }else{
           this.warningMessage('feeder name not available');
           this.isLoading =  false;
           return false;
        }
      }else{
        if(this.feedermidnightSELTXT != ''){
         this.chnageMidnightfeedername(this.feedermidnightSELTXT,this.midnightfeedTableFromdateTXT);
        }
      }
      document.getElementById("ssMidnight_TABPANE").style.display = 'block';
      document.getElementById("ssfeederdisturbanceLI_TABPANE").style.display = 'none';
      document.getElementById("ssnameplateLI_TABPANE").style.display = 'none';
      document.getElementById("ssloadsurveyLI_TABPANE").style.display = 'none';
      document.getElementById("ssloadcurveLI_TABPANE").style.display = 'none';
      document.getElementById("sseventsLI_TABPANE").style.display = 'none';
      document.getElementById("ssdcudetailsLI_TABPANE").style.display = 'none';
      clearInterval(this.clearSSNameplateInfoPopInterval);
      clearInterval(this.clearSSDCUDETAILSPANEInfoPopInterval);
      this.isLoading = false;
    },
    getsubstationEventPANEdetails(){
      var currdate = new Date();
      this.isLoading =  true;
      if(this.feederEventSELTXT == "Choose Feeder"){
        if(this.ssfeederlist.length != 0){
          this.feederEventSELTXT = this.ssfeederlist[0].METER_NAME;
          this.chnageEventfeedername(this.feederEventSELTXT);
        }else{
           this.warningMessage('feeder name not available');
           this.isLoading =  false;
           return false;
        }
      }else{
        if(this.feederEventSELTXT != ''){
         this.chnageEventfeedername(this.feederEventSELTXT);
         }
      }
      this.eventselNameTXT = "All";
      // this.substationEventBTN('Week');
      document.getElementById("sseventsLI_TABPANE").style.display = 'block';
      document.getElementById("ssnameplateLI_TABPANE").style.display = 'none';
      document.getElementById("ssfeederdisturbanceLI_TABPANE").style.display = 'none';
      document.getElementById("ssloadcurveLI_TABPANE").style.display = 'none';
      document.getElementById("ssloadsurveyLI_TABPANE").style.display = 'none';
      document.getElementById("ssdcudetailsLI_TABPANE").style.display = 'none';
      document.getElementById("ssMidnight_TABPANE").style.display = 'none';
       clearInterval(this.clearSSNameplateInfoPopInterval);
       clearInterval(this.clearSSDCUDETAILSPANEInfoPopInterval);
       this.isLoading =  false;
    },
    getsubstationDCUDETAILSPANEdetails(){
      document.getElementById("ssdcudetailsLI_TABPANE").style.display = 'block';
      document.getElementById("ssfeederdisturbanceLI_TABPANE").style.display = 'none';
      document.getElementById("ssnameplateLI_TABPANE").style.display = 'none';
      document.getElementById("ssloadsurveyLI_TABPANE").style.display = 'none';
      document.getElementById("ssloadcurveLI_TABPANE").style.display = 'none';
      document.getElementById("sseventsLI_TABPANE").style.display = 'none';
      document.getElementById("ssMidnight_TABPANE").style.display = 'none';
       this.clearSSDCUDETAILSPANEInfoPopInterval  = setInterval(() => {
        this.getDCUDetailsMethod();
      }, 1000);
      clearInterval(this.clearSSNameplateInfoPopInterval);
    },
    getDCUDetailsMethod(){
       // this.meterArrayList = [];
      //this.countmeterlength = 0;
      var substation_dcudetails_summaryURL = this.substation_dcudetails_summaryURL.replace("$$dcuid$$", this.ssPageSubmitDCUid);
      console.log('getDCUDetailsMethod URL  ::', substation_dcudetails_summaryURL);
      axios.get(substation_dcudetails_summaryURL).then(response => {
        if (response.data.status == "found") {
          this.meterArrayList = response.data.details;
          // for(var kk = 0; kk < response.data.details.length; kk++){
         //   this.meterArrayList.push(response.data.details[kk]);
          //}
         // this.countmeterlength = parseInt( this.meterArrayList.length / this.divLength + (this.meterArrayList.length % this.divLength == 0 ? 0 : 1));
          this.isLoading = false;
        } else {
          this.countmeterlength = 0;
          this.meterArrayList = [];
           this.isLoading = false;
        }
      });
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
      document.getElementById("sseventDailyBTN").classList.add("active");
      document.getElementById("sseventWeekBTN").classList.remove("active");
      document.getElementById("sseventMonthBTN").classList.remove("active");
      this.substationEventLBL = "substationEventDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getsubstationEvent(this.ssPageSubmitDCUid,this.feederEventSELTXT,startdate,enddate);
      } else if(eventBtnName == "Week"){
      document.getElementById("sseventWeekBTN").classList.add("active");
      document.getElementById("sseventDailyBTN").classList.remove("active");
      document.getElementById("sseventMonthBTN").classList.remove("active");
      this.substationEventLBL = "substationEventWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getsubstationEvent(this.ssPageSubmitDCUid,this.eventselNameTXT,startdate,enddate);
      } else if(eventBtnName == "Month"){
     document.getElementById("sseventMonthBTN").classList.add("active");
      document.getElementById("sseventWeekBTN").classList.remove("active");
      document.getElementById("sseventDailyBTN").classList.remove("active");
      this.substationEventLBL = "substationEventMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getsubstationEvent(this.ssPageSubmitDCUid,this.eventselNameTXT,startdate,enddate);
      }
    },
    getsubstationEvent(ssPageSubmitDCUid,feedername,startdate,enddate){
      this.isLoading = true;
      var substation_event_summaryURL = this.substation_event_summaryURL.replace("$$dcuid$$", ssPageSubmitDCUid).replace("$$feedername$$", feedername).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
      axios.get(substation_event_summaryURL).then(response => {
        if (response.data.status == "found") {
          this.eventsDataTblJSON = response.data;
          this.eventTabmeterArrayList = response.data.meter_nameplate.details;
          this.isLoading = false;
        } else {
          this.eventsDataTblJSON = "";
          this.eventTabmeterArrayList = [];
          this.isLoading = false;
        }
      });
    },
    getsubstationMidnight(ssPageSubmitDCUid,feedername,startdate,enddate){
      this.isLoading = true;
      var ssmidnightURL = this.ssmidnightURL.replace("$$dcuid$$", ssPageSubmitDCUid).replace("$$feedername$$", feedername).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
      axios.get(ssmidnightURL).then(response => {
        if (response.data.status == "found") {
          this.midNightDataTblJSON = response.data;
          this.isLoading = false;
        } else {
          this.midNightDataTblJSON = "";
          this.isLoading = false;
        }
      });
    },
    outageFeederBTN(outageBTNname){
      if(outageBTNname == "Day"){
      document.getElementById("ssoutageDailyBTN").classList.add("active");
      document.getElementById("ssoutageWeekBTN").classList.remove("active");
      document.getElementById("ssoutageMonthBTN").classList.remove("active");
      this.substationoutageFeederBTNLBL = "substationoutageFeederDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getOutageDetails(this.ssPageSubmitDCUid,startdate,enddate);
      } else if(outageBTNname == "Week"){
      document.getElementById("ssoutageWeekBTN").classList.add("active");
      document.getElementById("ssoutageDailyBTN").classList.remove("active");
      document.getElementById("ssoutageMonthBTN").classList.remove("active");
      this.substationoutageFeederBTNLBL = "substationoutageFeederWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getOutageDetails(this.ssPageSubmitDCUid,startdate,enddate);
      } else if(outageBTNname == "Month"){
      document.getElementById("ssoutageMonthBTN").classList.add("active");
      document.getElementById("ssoutageWeekBTN").classList.remove("active");
      document.getElementById("ssoutageDailyBTN").classList.remove("active");
      this.substationoutageFeederBTNLBL = "substationoutageFeederMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getOutageDetails(this.ssPageSubmitDCUid,startdate,enddate);
      }
    },
    getOutageDetails(ssPageSubmitDCUid,startdate,enddate){
      this.isLoading = true;
      var substation_outage_summaryURL = this.substation_outage_summaryURL.replace("$$dcuid$$", ssPageSubmitDCUid).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
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
    getOverloadDetails(ssPageSubmitDCUid,startdate,enddate){
      this.isLoading = true;
      var substation_overload_summaryURL = this.substation_overload_summaryURL.replace("$$dcuid$$", ssPageSubmitDCUid).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
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
    idleFeederBTN(idleBTNname){
      if(idleBTNname == "Day"){
      document.getElementById("ssidelfeederDailyBTN").classList.add("active");
      document.getElementById("ssidelfeederWeekBTN").classList.remove("active");
      document.getElementById("ssidelfeederMonthBTN").classList.remove("active");
      this.substationidleFeederBTNLBL = "substationidleFeederDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getIdleDetails(this.ssPageSubmitDCUid,startdate,enddate);
      } else if(idleBTNname == "Week"){
      document.getElementById("ssidelfeederWeekBTN").classList.add("active");
      document.getElementById("ssidelfeederDailyBTN").classList.remove("active");
      document.getElementById("ssidelfeederMonthBTN").classList.remove("active");
      this.substationidleFeederBTNLBL = "substationidleFeederWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getIdleDetails(this.ssPageSubmitDCUid,startdate,enddate);
      } else if(idleBTNname == "Month"){
      document.getElementById("ssidelfeederMonthBTN").classList.add("active");
      document.getElementById("ssidelfeederWeekBTN").classList.remove("active");
      document.getElementById("ssidelfeederDailyBTN").classList.remove("active");
      this.substationidleFeederBTNLBL = "substationidleFeederMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getIdleDetails(this.ssPageSubmitDCUid,startdate,enddate);
      }
    },
    getIdleDetails(ssPageSubmitDCUid,startdate,enddate){
      this.isLoading = true;
      var substation_idle_summaryURL = this.substation_idle_summaryURL.replace("$$dcuid$$", ssPageSubmitDCUid).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate)).replace("$$enddate$$", this.changeYYYYDDMMFORMAT(enddate));
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
    overloadfeederBTN(overloadBTNname){
      if(overloadBTNname == "Day"){
      document.getElementById("ssoverloadfeederDailyBTN").classList.add("active");
      document.getElementById("ssoverloadfeederWeekBTN").classList.remove("active");
      document.getElementById("ssoverloadfeederMonthBTN").classList.remove("active");
      this.substationoverloadFeederBTNLBL = "substationoutageFeederDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getOverloadDetails(this.ssPageSubmitDCUid,startdate,enddate);
      } else if(overloadBTNname == "Week"){
      document.getElementById("ssoverloadfeederWeekBTN").classList.add("active");
      document.getElementById("ssoverloadfeederDailyBTN").classList.remove("active");
      document.getElementById("ssoverloadfeederMonthBTN").classList.remove("active");
      this.substationoverloadFeederBTNLBL = "substationoutageFeederWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getOverloadDetails(this.ssPageSubmitDCUid,startdate,enddate);
      } else if(overloadBTNname == "Month"){
      document.getElementById("ssoverloadfeederMonthBTN").classList.add("active");
      document.getElementById("ssoverloadfeederWeekBTN").classList.remove("active");
      document.getElementById("ssoverloadfeederDailyBTN").classList.remove("active");
      this.substationoverloadFeederBTNLBL = "substationoutageFeederMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getOverloadDetails(this.ssPageSubmitDCUid,startdate,enddate);
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
      document.getElementById("ssloadcurveDailykBTN").classList.add("active");
      document.getElementById("ssloadcurveWeekBTN").classList.remove("active");
      document.getElementById("ssloadcurveMonthBTN").classList.remove("active");
      this.substationLoadcurveLBL = "substationLoadcurveDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getLoadcurveEvent(this.ssPageSubmitDCUid,this.feederSELTXT,loadcurveBTNname,startdate,enddate);
      } else if(loadcurveBTNname == "Week"){
      document.getElementById("ssloadcurveWeekBTN").classList.add("active");
      document.getElementById("ssloadcurveDailykBTN").classList.remove("active");
      document.getElementById("ssloadcurveMonthBTN").classList.remove("active");
      this.substationLoadcurveLBL = "substationLoadcurveWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getLoadcurveEvent(this.ssPageSubmitDCUid,this.feederSELTXT,loadcurveBTNname,startdate,enddate);
      } else if(loadcurveBTNname == "Month"){
      document.getElementById("ssloadcurveMonthBTN").classList.add("active");
      document.getElementById("ssloadcurveWeekBTN").classList.remove("active");
      document.getElementById("ssloadcurveDailykBTN").classList.remove("active");
      this.substationLoadcurveLBL = "substationLoadcurveMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getLoadcurveEvent(this.ssPageSubmitDCUid,this.feederSELTXT,loadcurveBTNname,startdate,enddate);
      }
    },
    getsubstationloadsurvey(startdate,ssPageSubmitDCUid,feederloadSurveySELTXT){
      this.isLoading = true;
      var substation_loadsurvey_summaryURL = this.substation_loadsurvey_summaryURL.replace("$$dcuid$$", ssPageSubmitDCUid).replace("$$feedername$$", feederloadSurveySELTXT).replace("$$startdate$$", this.changeYYYYDDMMFORMAT(startdate));
      console.log('substation_loadsurvey_summaryURL :: ', substation_loadsurvey_summaryURL);
      axios.get(substation_loadsurvey_summaryURL).then(response => {
        if (response.data.status == "found") {
          this.loadsurveytableJson = response.data;
          this.loadsurveyTabmeterArrayList = response.data.meter_nameplate.details;
          var loadsurveyAIgrphArr = [];
          var loadsurveyKVAR_LEADgrphArr = [];
          var loadsurveyKVAR_LAGgrphArr = [];
          var loadsurveyRIgrphArr = [];
          //var loadsurveyV1grphArr =[];
          //var loadsurveyFreqgrphArr = [];
          for (var feIndex = 0; feIndex < this.loadsurveytableJson.details.length; feIndex++) {
            if(this.loadsurveytableJson.details[feIndex].Time != null || this.loadsurveytableJson.details[feIndex].Time != undefined){
            var graphtime = this.loadsurveytableJson.details[feIndex].Time.replace("_","-").replace("_","-");
            var dateonly = graphtime.split(" ")[0];
            //var timeonly = "";
            var splitgraphtime = dateonly.split("-")[2]+"-"+dateonly.split("-")[1]+"-"+dateonly.split("-")[0]+" "+ graphtime.split(" ")[1]+":00";
            //console.log('splitgraphtime', splitgraphtime);
            loadsurveyAIgrphArr.push({ x: splitgraphtime, y: this.loadsurveytableJson.details[feIndex].AI == null ? 0 : this.loadsurveytableJson.details[feIndex].AI });
            loadsurveyRIgrphArr.push({ x: splitgraphtime, y: this.loadsurveytableJson.details[feIndex].RI == null ? 0 : this.loadsurveytableJson.details[feIndex].RI });
            loadsurveyKVAR_LEADgrphArr.push({ x: splitgraphtime, y: this.loadsurveytableJson.details[feIndex].KVAR_LEAD == null ? 0 : this.loadsurveytableJson.details[feIndex].KVAR_LEAD });
            loadsurveyKVAR_LAGgrphArr.push({ x: splitgraphtime, y: this.loadsurveytableJson.details[feIndex].KVAR_LAG == null ? 0 : this.loadsurveytableJson.details[feIndex].KVAR_LAG });
            //loadsurveyV1grphArr.push({ x: splitgraphtime, y: this.loadsurveytableJson.details[feIndex].V1 == null ? 0 : this.loadsurveytableJson.details[feIndex].V1 });
            //loadsurveyFreqgrphArr.push({ x: splitgraphtime, y: this.loadsurveytableJson.details[feIndex].FREQ == null ? 0 : this.loadsurveytableJson.details[feIndex].FREQ });
          }
         }
          this.loadsurveyseries = [{
            name:"AI", data:loadsurveyAIgrphArr
          },
          {
            name:"RI", data:loadsurveyRIgrphArr
          },
          {
            name:"KVARH LEAD", data:loadsurveyKVAR_LEADgrphArr
          },
          {
            name:"KVARH LAG", data:loadsurveyKVAR_LAGgrphArr
          }
          ];
          // console.log('this.loadsurveyseries :', JSON.stringify(this.loadsurveyseries));
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.loadsurveytableJson ="";
          this.loadsurveyTabmeterArrayList = [];
          this.loadsurveyseries = [];
        }
      });
    },
    getsubstationLoadSurveyMethod(){
      this.submitMeterName = this.feederloadSurveySELTXT;
      this.getsubstationloadsurvey(this.loadsurveyfeedTableFromdateTXT,this.ssPageSubmitDCUid,this.feederloadSurveySELTXT);
    },
     pollMissingLoadSurveyDataMethod(){
      var selectSSObject = {
        region_id:this.ssPageRegionTXT.split('$$')[0],
        region:this.ssPageRegionTXT.split('$$')[1],
        circle_id:this.ssPageCircleTXT.split('$$')[0],
        circle:this.ssPageCircleTXT.split('$$')[1],
        dcu_id:this.ssPageDCUTXT.split('$$')[0],
        ss_name:this.ssPageDCUTXT.split('$$')[1]
      }
      var pollMissingdataJson = {
        username:this.user_name,
        role:this.user_role,
        select_object: selectSSObject,
        feeder_name: this.feederloadSurveySELTXT,
        sel_date: this.loadsurveyfeedTableFromdateTXT
      }
      //console.log('SS Details page Jsn :', JSON.stringify(pollMissingdataJson));
      this.isLoading = true;
      axios.post(this.feederMissingDataURL, pollMissingdataJson)
          .then(response => {
            var status = response.data.status;
            if (status == "Command send successfully") {
              this.isLoading = false;
              this.successMessage(status);            }
            else {
              this.isLoading = false;
              this.warningMessage(status);
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
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
    substationCumulativecurveBTN(cumulativecurveBTNname){
      if(cumulativecurveBTNname == "Day"){
      document.getElementById("sscumulativecurveDailyBTN").classList.add("active");
      document.getElementById("sscumulativecurveWeekBTN").classList.remove("active");
      document.getElementById("sscumulativecurveMonthBTN").classList.remove("active");
      this.substationCumulativedcurveLBL = "substationCulativecurveDayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.getCumulativecurveEvent(this.ssPageSubmitDCUid,cumulativecurveBTNname,startdate,enddate);
      } else if(cumulativecurveBTNname == "Week"){
      document.getElementById("sscumulativecurveWeekBTN").classList.add("active");
      document.getElementById("sscumulativecurveDailyBTN").classList.remove("active");
      document.getElementById("sscumulativecurveMonthBTN").classList.remove("active");
      this.substationCumulativedcurveLBL = "substationCulativecurveWeekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.getCumulativecurveEvent(this.ssPageSubmitDCUid,cumulativecurveBTNname,startdate,enddate);
      } else if(cumulativecurveBTNname == "Month"){
      document.getElementById("sscumulativecurveMonthBTN").classList.add("active");
      document.getElementById("sscumulativecurveDailyBTN").classList.remove("active");
      document.getElementById("sscumulativecurveWeekBTN").classList.remove("active");
      this.substationCumulativedcurveLBL = "substationCulativecurveMonthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.getCumulativecurveEvent(this.ssPageSubmitDCUid,cumulativecurveBTNname,startdate,enddate);
      }
    },
    beforeOpen () {
    },
    beforeClose () {
    },
    opened (e) {
    },
    closed (e) {
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
    markerbegoreopened(){
    },
    markeropened(e) {
      this.markerConvBTN('Week');
    },
    markerConvBTN(btnName){
      var regionID = this.ssPageSubmitregionid;
      var circleID = this.ssPageSubmitcircleid;
      var substationID = this.ssPageSubmitDCUid;
      console.log('substationID :', substationID);
      if(btnName == "Day"){
      document.getElementById("ssconncurveDailyBTN").classList.add("active");
      document.getElementById("ssconncurveWeekBTN").classList.remove("active");
      document.getElementById("ssconncurveMonthBTN").classList.remove("active");
      this.markerConvBTNLBL = "dayLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate());
      this.connectivtyanddataAvailoptions = this.dailyoverallGraphdataoptions;
      this.getsubstationdataAvlandconnMethod(regionID,circleID,substationID,this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate));
      } else if(btnName == "Week"){
      document.getElementById("ssconncurveWeekBTN").classList.add("active");
      document.getElementById("ssconncurveDailyBTN").classList.remove("active");
      document.getElementById("ssconncurveMonthBTN").classList.remove("active");
      this.markerConvBTNLBL = "weekLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.connectivtyanddataAvailoptions = this.graphdataoptions;
      this.getsubstationdataAvlandconnMethod(regionID,circleID,substationID,this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate));
      } else if(btnName == "Month"){
     document.getElementById("ssconncurveMonthBTN").classList.add("active");
      document.getElementById("ssconncurveWeekBTN").classList.remove("active");
      document.getElementById("ssconncurveDailyBTN").classList.remove("active");
      this.markerConvBTNLBL = "monthLBL";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-30);
      this.connectivtyanddataAvailoptions = this.graphdataoptions;
      this.getsubstationdataAvlandconnMethod(regionID,circleID,substationID,this.changeYYYYDDMMFORMAT(startdate),this.changeYYYYDDMMFORMAT(enddate));
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
   formatDatewithTime(dateval) {
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
    return year + "-" + monthStr + "-" + dateStr + " " + hourStr + ":" + minStr + ":" + secStr;
},
formatDateOnly(dateval) {
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
    return year + "-" + monthStr + "-" + dateStr;
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
     dailyFormattedDate(date) {
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getFullYear();
      var monthStr = month <= 9 ? "0" + month : month;
      var dateStr = day <= 9 ? "0" + day : day;
      return monthStr + "/" + dateStr + "/" + year;
      // return year + "-" + (month <= 9)  ? ("0" + month) : (month) + "-" + (day <= 9)  ? ("0" + day) : (day);
    },
    timeDiffCalc(endDate, today) {
  //  var diffMs = (today - olddate); // milliseconds between now & Christmas
  //  var diffDays = Math.floor(diffMs / 86400000); // days
  //  var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  //  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  //  var diffsecs = Math.round((((diffMs % 86400000) % 3600000) / 60000) % 60); // seconds
  //const today = new Date();
  //const endDate = new Date(startDate.setDate(startDate.getDate() + 7));
  const days = parseInt((endDate - today) / (1000 * 60 * 60 * 24));
  const hours = parseInt(Math.abs(endDate - today) / (1000 * 60 * 60) % 24);
  const minutes = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000 * 60) % 60);
  //const seconds = parseInt(Math.abs(endDate.getTime() - today.getTime()) / (1000) % 60); 
  //return days + " days, " + hours + " hrs, " + minutes + " mins, "+seconds +" Secs";
   //
    return days + " days, " + hours + " hrs, " + minutes + " mins";
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
.inputTEXTcss12{
   border: 1px solid lightgray;
  width: 70%;
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
label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 0px !important;
    font-weight: normal !important;
}

.columnSize1{

vertical-align: middle !important;
text-align: center;
color: #fff;
}
table thead tr th {
  position: -webkit-sticky;
  position: sticky;
  top: -1;
  left: 0px;
  z-index:1;
}
.instinfo tr td{
  border: 1px solid #fff;
  height: 30px;
}
</style>

