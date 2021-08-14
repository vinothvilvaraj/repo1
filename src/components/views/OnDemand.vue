<template>
  <section class="content" id="commandconfigPAGE">
    <vue-element-loading :active="isLoading" spinner="line-wave" color="#000" :is-full-screen="true"/>
    <div class="row">
      <div class="col-lg-12">
       <ul class="timeline">
        <li>
          <i class="fa fa-comments-o bg-yellow"></i>
          <div class="timeline-item">
            <div class="timeline-body">
         <div class="row">
            <div class="col-md-2 order-md-3" v-show="false">
              <span>Choose Option</span> :
              <select class="inputTEXTcss12" id="odOptionTxt"  v-model="odOptionTxt" @change="odOptionTxtchange(odOptionTxt)">
              <option value='Choose Option' selected disabled>Choose Option</option>
              <option v-for="(items,index) in odoptionArray" :key="index" :value="items" >{{items}}</option>
              </select>
            </div>
             <div class="col-md-2 order-md-3">
                <span>Region</span> :
                 <select class="inputTEXTcss12" id="odRegionTXT"  v-model="odRegionTXT" @change="getODCircleNameLst(odRegionTXT)">
                 <option value='Choose Region' selected disabled>Choose Region</option>
                 <option v-for="(items,index) in odregionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
                </select>
            </div>
             <div class="col-md-2 order-md-3">
                <span>Circle</span> :
                 <select class="inputTEXTcss12" id="odCircleTXT"  v-model="odCircleTXT" @change="getODDeviceNameLst(odCircleTXT)">
                 <option value='Choose Circle' selected disabled>Choose Circle</option>
                 <option v-for="(items,index) in odcircleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME" >{{items.CIRCLE_NAME}}</option>
                </select>
            </div>
             <div class="col-md-2 order-md-3">
               <span>Device</span> :
                 <select class="inputTEXTcss12" id="odDeviceTXT"  v-model="odDeviceTXT" >
                 <option value='Choose Device' selected disabled>Choose Device</option>
                 <option v-for="(items,index) in oddeviceListArray" :key="index" :value="items.DCU_ID+'$$'+items.DCU_NAME" >{{items.DCU_NAME}}</option>
                </select>
            </div>
             <div class="col-md-2 order-md-3" style="margin-top: 5px;">
              <span>From date : </span>
              <datepicker v-model="odFromdateTXT" :disabledDates="oddisabledDates" style="width:50%;margin-left: 70px;margin-top: -22px;"></datepicker>
             </div>
              <div class="col-md-2 order-md-3"  style="margin-top: 5px;">
              <span>To date :</span>
              <datepicker v-model="odTodateTXT" :disabledDates="oddisabledDates"  style="width:50%;margin-left: 55px;margin-top: -22px;"></datepicker>
            </div>
            <div class="col-md-1 order-md-3 text-left">
             <button id="cmdsubmitBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff" @click="odFillterTableMethod()">
              <i class="fa fa-check text-white"></i> Submit
            </button>
            </div>
            <div class="col-md-1 order-md-3 text-right">
              <button id="cmdaddBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff;margin-top: -2px;" title="Issue Command" @click="rmsAddOnDemandFunction()">
              <img src="static/img/images/add.png" /> Issue Command
            </button>
            </div>
            <p></p>
          <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="rmsaddcommandTablePANE" style="border:1px solid lightgray" v-bind:style="{height:ondemandHeight+'px'}">
                <table
                  class="table table-bordered"
                  id="rmsaddcommandtableListid"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th>S.No</th>
                      <th>Command Name</th>
                      <th>Region Name</th>
                      <th>Circle Name</th>
                      <th>Device Name</th>
                      <th>Feeder Name</th>
                      <th>Serial Number</th>
                      <th>Issued Time</th>
                      <th>End Time</th>
                      <th>Execution Time</th>
                      <th>Command Status</th>
                      <th>View Response</th>
                    </tr>
                  </thead>
                  <tbody v-if="rmsondemandConfigJson != ''">
                    <tr v-for="(items,index) in rmsondemandConfigJson.cmds_details" v-bind:key="index">
                      <td>{{index+1}}</td>
                       <td v-if="items.command_status == 'FAILED (Max Retry Occurred)'">{{items.command_name}}</td>
                      <td v-else-if="items.command_name == 'RESET' || items.command_name == 'SET_IP_ADDRESS'">{{items.command_name}}</td>
                      <td v-else-if="items.command_name == 'TIME_SYNC' || items.command_name == 'SET_BLOCK_INTEGRATION_PERIOD'">{{items.command_name}}</td>
                      <td v-else style="cursor:pointer" @click="viewCommandresponseFunction(index,items,items.id,items.command_name,items.region_id,items.circle_id,items.device_id,items.meter_id,items.seq_num,items.serial_number)"><a style="font-weight: bold;cursor: pointer;">{{items.command_name}}</a></td>
                      <td>{{items.region_name}}</td>
                      <td>{{items.circle_name}}</td>
                      <td>{{items.device_name}}</td>
                      <td>{{items.meter_name}}</td>
                      <td>{{items.serial_number}}</td>
                      <td>{{datewithTime(items.issued_time)}}</td>
                      <td>{{datewithTime(items.res_time)}}</td>
                      <td>{{items.exec_time}}</td>
                      <td>{{items.command_status}}</td>
                      <td v-if="items.command_status == 'FAILED (Max Retry Occurred)'"><i class="fa fa-eye text-gray" title="Not Applicable" style="cursor:not-allowed"/></td>
                      <td v-else-if="items.command_name == 'RESET' || items.command_name == 'SET_IP_ADDRESS'"><i class="fa fa-eye text-gray" title="Not Applicable" style="cursor:not-allowed"/></td>
                      <td v-else-if="items.command_name == 'TIME_SYNC' || items.command_name == 'SET_BLOCK_INTEGRATION_PERIOD'"><i class="fa fa-eye text-gray" title="Not Applicable" style="cursor:not-allowed"/></td>
                      <td v-else><i class="fa fa-eye text-blue" title="View Status" style="cursor:pointer" @click="viewCommandresponseFunction(index,items,items.id,items.command_name,items.region_id,items.circle_id,items.device_id,items.meter_id,items.seq_num,items.serial_number)"/></td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="rmsondemandConfigJson == ''" style="text-align:center;width: 100%;">
                      <span>Not found</span>
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
     <modal name="rmsondemandConfigModal" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
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
              <div class="col-lg-6" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{rmsondemandpopupTitle}}</h4>
              </div>
              <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button id="hide_demandcloseBTN" type="button" class="btn btn-default" @click="hideonDemandpopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div class="row">
              <div class="col-lg-4">
                <p>Command Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss" id="onDemandCommandTXT" v-model="onDemandCommandTXT" @change="ondemandCMDMethod(onDemandCommandTXT)">
															  <option value='Choose Command' selected disabled>Choose Command</option>
                                <option value='GET_GEN_CONFIG' v-show="false">GET_GEN_CONFIG</option>
                                <option value='GET_DLMS_CONFIG' v-show="false">GET_DLMS_CONFIG</option>
                                <option value='OD_INST_MESSAGE'>OD_INST_MESSAGE</option>
                                <option value='OD_LS_MESSAGE'>OD_LS_MESSAGE</option>
                                <option value='OD_EVENT_MESSAGE'>OD_EVENT_MESSAGE</option>
                                <option value='OD_MIDNIGHT_MESSAGE'>OD_MIDNIGHT_MESSAGE</option>
                                <option value='OD_BILLING_MESSAGE'>OD_BILLING_MESSAGE</option>
                                <option value='RESET'>RESET</option>
                                <option value='TIME_SYNC'>TIME_SYNC</option>
                                <option value='SET_IP_ADDRESS' v-show="false">SET_IP_ADDRESS</option>
                                <option value='SET_BLOCK_INTEGRATION_PERIOD' v-show="false">SET_BLOCK_INTEGRATION_PERIOD</option>
															</select>
              </div>
            </div>
            <p v-show="onDemandCommandTXT == 'OD_LS_MESSAGE'"> </p>
            <div class="row" v-show="onDemandCommandTXT == 'OD_LS_MESSAGE'">
              <div class="col-lg-4">
                <p>Choose Date :</p>
              </div>
              <div class="col-lg-8 text-left">
               <div style="height:31px;padding-top:4px;">
                <datepicker v-model="demandFromdateTXT" :disabledDates="disabledDates" style="width:100%"></datepicker>
                </div>
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Region Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss" id="ondemandRegionNameTXT" v-model="ondemandRegionNameTXT" @change="getCircleNameLst(ondemandRegionNameTXT)">
															  <option value='Choose Region' selected disabled>Choose Region</option>
                                <option v-for="(items,index) in regionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
															</select>
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Circle Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss" id="ondemandCircleNameTXT" v-model="ondemandCircleNameTXT" @change="getSSNameLst(ondemandCircleNameTXT)">
															  <option value='Choose Circle' selected disabled>Choose Circle</option>
                                <option v-for="(items,index) in circleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME">{{items.CIRCLE_NAME}}</option>
															</select>
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Device Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss" id="ondemandDeviceNameTXT" v-model="ondemandDeviceNameTXT"  @change="getmeterNameLst(ondemandDeviceNameTXT)">
															  <option value='Choose Device' selected disabled>Choose Device</option>
                                <option v-for="(items,index) in deviceListArray" :key="index" :value="items.DCU_ID+'$$'+items.DCU_NAME" >{{items.DCU_NAME}}</option>
															</select>
              </div>
            </div>
            <p v-show="ondemandFlag"></p>
            <div class="row" v-show="ondemandFlag">
              <div class="col-lg-4">
                <p>Feeder Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss"  id="ondemandMeterNameTXT" v-model="ondemandMeterNameTXT">
															  <option value='Choose Feeder' selected disabled>Choose Feeder</option>
                                <option v-for="(items,index) in meterListArray" :key="index" :value="items.METER_ID+'$$'+items.METER_NAME">{{items.METER_NAME}}</option>
															</select>
              </div>
            </div>
             <p></p>
            <div class="row"  v-show="false">
              <div class="col-lg-4">
                <p>Step Size Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss"  id="ondemandTimeSyncSELVal" v-model="ondemandTimeSyncSELVal">
															  <option value='Advance' selected>Advance</option>
                                <option value='Retard'>Retard</option>
                                </select>
              </div>
            </div>
             <p></p> 
              <div class="row" v-show="false">
              <div class="col-lg-4">
                <p>Choose Drift :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss"  id="ondemandTimeSyncTXT" v-model="ondemandTimeSyncTXT">
                                <option v-for="(items,index) in ondemandTimeSyncArr" :key="index" :value="items">{{items}}</option>
															</select>
              </div>
            </div>
              <p></p> 
              <div class="row" v-show="onDemandCommandTXT == 'SET_BLOCK_INTEGRATION_PERIOD'">
              <div class="col-lg-4">
                <p>Choose Interval :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputTEXTcss"  id="ondemandTimeSyncTXT" v-model="ondemandBlockPeroidTXT">
                                <option value='5' selected>5</option>
                                <option value='15'>15</option>
								</select>
              </div>
            </div>
             <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Reason :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​<textarea class="inputTEXTcss"  id="ondemandReasonTXT" v-model="ondemandReasonTXT" rows="10" cols="70" style="min-width: 100%;min-height: 150px;max-width: 100%;"></textarea>
              </div>
            </div>
            <p></p>
          </div>
          <div class="modal-footer flex-center">
              <a id="rmscommandSaveBTN" class="btn bgBtn btnPadding"  style="color:#fff" @click="rmsCommandSaveFunction()">Apply</a>
            <a id="clsrmscommandBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="hideonDemandpopup">Cancel</a>
          </div>
          </div>
          </modal>


  <modal name="commandResponseViewPopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"  style="z-index:1111 !important"
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
              <h4 class="heading" style="color: rgb(0, 115, 183);"> Command Response</h4>
              </div>
              <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button id="commdresclosebtn" type="button" class="btn btn-default" @click="commandresClose" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
           <div id="insttablePANE" v-if="commandOD_MSGJSON.command_name == 'OD_INST_MESSAGE'">
             <div class="row">
             <div class="col-lg-4">
             <table style="width:275px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Command Name </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusCmdNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Device Name </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusDeviceNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Serial Number </td> <td>:</td> <td style="text-align:left"><b>{{commandOD_MSGJSON.details[0].SN}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Meter ID </td> <td>:</td> <td style="text-align:left"><b>{{commandOD_MSGJSON.details[0].MET_ID}}</b></td>
               </tr>
             </table>
               </div>
               <div class="col-lg-4">
             <table style="width:275px" class="instinfo">
               <tr>
                 <td style="text-align:left">Region Name </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusRegionNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Feeder Name </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusMeterNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">IMEI  </td> <td>:</td> <td style="text-align:left"><b>{{commandOD_MSGJSON.details[0].IMEI}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Meter Serial Num </td> <td>:</td> <td style="text-align:left"><b>{{commandOD_MSGJSON.details[0].MET_SER_NUM}}</b></td>
               </tr>
             </table>
              </div>
              <div class="col-lg-4">
             <table style="width:300px" class="instinfo">
               <tr>
                 <td style="text-align:left">Circle Name  </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusCircleNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Issue Time </td> <td>:</td> <td style="text-align:left"><b>{{datewithTime(viewStatusIssueTimeTXT)}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Response Time  </td> <td>:</td> <td style="text-align:left"><b>{{commandOD_MSGJSON.res_time == '0000-00-00 00:00:00' ? '0000-00-00 00:00:00' : datewithTime(commandOD_MSGJSON.res_time)}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Command Status </td> <td>:</td> <td style="text-align:left"><b>{{viewStatuscmdstatusTXT}}</b></td>
               </tr>
             </table>
              </div>
             </div>
           <p></p>
           <span style="text-decoration: underline;">Parameter Details:</span>
           <div class="row">
             <div class="col-lg-12">
              <table class="table style" id="summary_INST_tbl">
                      <tr>
                        <th class="columnSize1">Volt_1</th>
                        <td style="width: 180px;">{{commandOD_MSGJSON.details[0].Volt_1}}</td>
                       <th class="columnSize1">Volt_2</th>
                       <td style="width: 180px;">{{commandOD_MSGJSON.details[0].Volt_2}}</td>
                        <th class="columnSize1">Volt_3</th>
                       <td style="width: 180px;">{{commandOD_MSGJSON.details[0].Volt_3}}</td>
                      </tr>
                      <tr>
                       <th class="columnSize1">Curr_1</th>
                        <td>{{commandOD_MSGJSON.details[0].Curr_1}}</td>
                       <th class="columnSize1">Curr_2</th>
                        <td>{{commandOD_MSGJSON.details[0].Curr_2}}</td>
                        <th class="columnSize1">Curr_3</th>
                        <td style="width: 180px;">{{commandOD_MSGJSON.details[0].Curr_3}}</td>
                      </tr>
                       <tr>
                        <th class="columnSize1">PF_1</th>
                        <td style="width: 180px;">{{commandOD_MSGJSON.details[0].PF_1}}</td>
                       <th class="columnSize1">PF_2</th>
                       <td style="width: 180px;">{{commandOD_MSGJSON.details[0].PF_2}}</td>
                        <th class="columnSize1">PF_3</th>
                       <td style="width: 180px;">{{commandOD_MSGJSON.details[0].PF_3}}</td>
                      </tr>
                       <tr>
                       <th class="columnSize1">PF</th>
                       <td style="width: 180px;">{{commandOD_MSGJSON.details[0].PF}}</td>
                       <th class="columnSize1">Freq</th>
                       <td style="width: 180px;">{{commandOD_MSGJSON.details[0].Freq}}</td>
                        <th class="columnSize1">KVA</th>
                        <td style="width: 180px;">{{commandOD_MSGJSON.details[0].KVA}}</td>
                      </tr>
                      <tr>
                        <th class="columnSize1">KVAR</th>
                        <td style="width: 180px;">{{commandOD_MSGJSON.details[0].KVAR}}</td>
                       <th class="columnSize1">KW</th>
                        <td style="width: 180px;">{{commandOD_MSGJSON.details[0].KW}}</td>
                        <th class="columnSize1">CTRatio </th>
                        <td style="width: 180px;">{{commandOD_MSGJSON.details[0].CTRatio}}</td>
                      </tr>
                       <tr>
                       <th class="columnSize1">PTRatio</th>
                        <td style="width: 180px;">{{commandOD_MSGJSON.details[0].PTRatio}}</td>
                       <th class="columnSize1">&nbsp;</th>
                        <td style="width: 180px;">&nbsp;</td>
                        <th class="columnSize1">&nbsp;</th>
                       <td style="width: 180px;">&nbsp;</td>
                      </tr>
                    </table>
           </div> </div>
           </div>
           <div id="datatablePANE" v-if="commandOD_MSGJSON.command_name == 'OD_MIDNIGHT_MESSAGE' || commandOD_MSGJSON.command_name == 'OD_LS_MESSAGE' || commandOD_MSGJSON.command_name == 'OD_BILLING_MESSAGE' || commandOD_MSGJSON.command_name == 'OD_EVENT_MESSAGE'">
              <div class="row">
             <div class="col-lg-4">
             <table style="width:275px" class="instinfo">
               <tr>
                 <td style="text-align: left;">Command Name </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusCmdNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Device Name </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusDeviceNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Serial Number </td> <td>:</td> <td style="text-align:left"><b>{{commandOD_MSGJSON.details[0].SN}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Meter ID </td> <td>:</td> <td style="text-align:left"><b>{{commandOD_MSGJSON.details[0].MET_ID}}</b></td>
               </tr>
             </table>
               </div>
               <div class="col-lg-4">
             <table style="width:275px" class="instinfo">
               <tr>
                 <td style="text-align:left">Region Name </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusRegionNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Feeder Name </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusMeterNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">IMEI  </td> <td>:</td> <td style="text-align:left"><b>{{commandOD_MSGJSON.details[0].IMEI}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Meter Serial Num </td> <td>:</td> <td style="text-align:left"><b>{{commandOD_MSGJSON.details[0].MET_SER_NUM}}</b></td>
               </tr>
             </table>
              </div>
              <div class="col-lg-4">
             <table style="width:300px" class="instinfo">
               <tr>
                 <td style="text-align:left">Circle Name  </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusCircleNameTXT}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Issue Time </td> <td>:</td> <td style="text-align:left"><b>{{datewithTime(viewStatusIssueTimeTXT)}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Response Time  </td> <td>:</td> <td style="text-align:left"><b>{{commandOD_MSGJSON.res_time == '0000-00-00 00:00:00' ? '0000-00-00 00:00:00' : datewithTime(commandOD_MSGJSON.res_time)}}</b></td>
               </tr>
               <tr>
                 <td style="text-align:left">Command Status </td> <td>:</td> <td style="text-align:left"><b>{{viewStatuscmdstatusTXT}}</b></td>
               </tr>
             </table>
              </div>
             </div>
           <div class="row" v-show="commandOD_MSGJSON.command_name == 'OD_LS_MESSAGE'">
             <div class="col-lg-4">
               <table style="width:235px" class="instinfo">
               <tr>
                 <td style="text-align:left">Load Survey Date </td> <td>:</td> <td style="text-align:left"><b>{{viewStatusloadSurveyDateTXT}}</b></td>
               </tr>
             </table>
             </div>
           </div>
           <p></p>
           <span style="text-decoration: underline;">Parameter Details:</span>
           <div class="row">
             <div class="col-lg-12 " >
               <div class="table-responsive" style="border:1px solid lightgray;height:450px">
              <table class="style table table-bordered" id="datatableID">
                      <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th>S.No</th>
                      <th v-for="(paramterdetailItem,paramterindex) in commandOD_MSGJSON.column_details" v-bind:key="paramterindex">{{paramterdetailItem}}</th>
                    </tr>
                  </thead>
                  <tbody v-if="commandOD_MSGJSON != ''">
                    <tr v-for="(detailItem,index) in commandOD_MSGJSON.details" v-bind:key="index" >
                    <td>{{index+1}}</td>
                    <td v-for="(paramterdetailItem,paramterindex) in commandOD_MSGJSON.column_details" v-bind:key="paramterindex" >
                      <span v-if="paramterdetailItem == 'Time'">{{detailItem[paramterdetailItem].replace("_","-").replace("_","-")}}</span>
                             <span v-else> {{detailItem[paramterdetailItem]}}</span>
                      </td>
                    </tr>
                  </tbody>
                    </table>
                    </div>
           </div>
            <div v-if="commandOD_MSGJSON == ''" style="text-align:center;width: 100%;">
                 <span>No records found</span>
                 </div> </div>
           </div>
          </div>
          </div>
          </modal>

          <!-- device Config popup end -->
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
  name: 'commandconfigPAGE',
  components: {
    CripNotice,
    VueElementLoading,
    Datepicker
  },
  data () {
    return {
      isLoading:false,
      ondemandHeight:'',
      rmsondemandpopupTitle:"Add On Demand",
      rmsondemandConfigJson:"",
      ondemandRegionNameTXT:"Choose Region",
      regionListArray:[],
      ondemandCircleNameTXT:"Choose Circle",
      circleListArray:[],
      onDemandUserNameTXT: this.$session.get('username'),
      onDemandRoleTXT: this.$session.get('userrole'),
      ondemandFlag:true,
      onDemandCommandTXT:'Choose Command',
      ondemandDeviceNameTXT:'Choose Device',
      ondemandMeterNameTXT:'Choose Feeder',
      ondemandDeviceSerialTXT:'Choose Serial Number',
      ondemandTimeSyncArr:['10','20','30','40','50','60'],
      ondemandTimeSyncTXT:'10',
      ondemandBlockPeroidTXT:'5',
      ondemandTimeSyncSELVal:'Advance',
      commandListTblSTOP:null,
      commandOD_MSGJSON:'',
      deviceListArray:[],
      meterListArray:[],
      ondemandReasonTXT:'',
      viewStatusCmdNameTXT:'',
      viewStatusRegionNameTXT:'',
      viewStatusCircleNameTXT:'',
      viewStatusDeviceNameTXT:'',
      viewStatusMeterNameTXT:'',
      viewStatusIssueTimeTXT:'',
      viewStatuscmdstatusTXT:'',
      viewStatusloadSurveyDateTXT:'',
      demandFromdateTXT:myDate,
      disabledDates: {
        from: new Date()
      },
      odoptionArray:[],
      odOptionTxt:'Choose Option',
      odRegionTXT:'Choose Region',
      odDeviceTXT:'Choose Device',
      odregionListArray:[],
      odcircleListArray:[],
      oddeviceListArray:[],
      odFromdateTXT:myDate,
      odTodateTXT:myDate,
      oddisabledDates: {
        from: new Date()
      },
      odSubmitregionid : '',
      odSubmitregionname: '',
      odSubmitcircleid : '',
      odSubmitcirclename : '',
      odSubmitdeviceid : '',
      odSubmitdevicename : '',
      odSubmitFromdate: '',
      odSubmitTodate: ''
    }
  },
  created(){
  },
  mounted () {
    this.isLoading = true;
    let innerMinHeight = window.innerHeight - 125 + 'px'
    document.getElementById('commandconfigPAGE').style.minHeight = innerMinHeight;
    this.ondemandHeight = window.innerHeight - 235;
    setTimeout(() => this.isLoading = false, 1000);
    this.getCommandmanageList();
    this.getODRegionNameLst();
    this.getRegionNameList();
    this.getDeviceListMethod();
  },
   destroyed(){
     if(this.commandListTblSTOP != null){
     clearInterval(this.commandListTblSTOP);
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
    odFillterTableMethod(){
      this.isLoading = true;
      this.odSubmitregionid = this.odRegionTXT.split('$$')[0];
      this.odSubmitregionname = this.odRegionTXT.split('$$')[1];
      this.odSubmitcircleid = this.odCircleTXT.split('$$')[0];
      this.odSubmitcirclename = this.odCircleTXT.split('$$')[1];
      this.odSubmitdeviceid = this.odDeviceTXT.split('$$')[0];
      this.odSubmitdevicename = this.odDeviceTXT.split('$$')[1];
      this.odSubmitFromdate = this.datetimeformat(this.odFromdateTXT);
      this.odSubmitTodate = this.datetimeformat(this.odTodateTXT);

      var filterJSON = {
        "region_id":this.odSubmitregionid,
        "region_name":this.odSubmitregionname,
        "circle_id":this.odSubmitcircleid,
        "circle_name":this.odSubmitcirclename,
        "dcu_id":this.odSubmitdeviceid,
        "dcu_name":this.odSubmitdevicename,
        "from_date": this.odSubmitFromdate,
        "to_date": this.odSubmitTodate,
      }
      clearInterval(this.commandListTblSTOP);
       axios.post(this.fillterOdMsgURL, filterJSON)
          .then(response => {
            var status = response.data.status;
            if (status == "commands found") {
              this.isLoading = false;
              this.rmsondemandConfigJson = response.data;
            }
            else {
              this.isLoading = false;
              this.rmsondemandConfigJson = "";
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            this.warningMessage("error::" + error.message);
          });
    },
    getODRegionNameLst(){
       this.odregionListArray = [];
       this.odRegionTXT = "Choose Region";
       this.odCircleTXT = "Choose Circle";
       this.odDeviceTXT = "Choose Device";
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.odregionListArray = response.data.details;
          this.odRegionTXT = this.odregionListArray[0].REGION_ID+'$$'+this.odregionListArray[0].REGION_NAME;
          this.getODCircleNameLst(this.odRegionTXT);
        } else {
          this.odregionListArray = [];
          this.odRegionTXT = "Choose Region";
          this.odCircleTXT = "Choose Circle";
          this.odDeviceTXT = "Choose Device";
        }
      });
    },
     getODCircleNameLst(regionidname){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.odCircleTXT = "Choose Circle";
       this.odDeviceTXT = "Choose Device";
       this.odcircleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.odcircleListArray = response.data.details;
          this.odCircleTXT = this.odcircleListArray[0].CIRCLE_ID+'$$'+this.odcircleListArray[0].CIRCLE_NAME;
          this.getbillingSSNameLst(this.odCircleTXT);
        } else {
          this.odcircleListArray = [];
          this.odCircleTXT = "Choose Circle";
          this.odDeviceTXT = "Choose Device";
        }
      });
    },
    getbillingSSNameLst(circleidName){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
       var getcicrleSSURL = this.getcicrleSSURL.replace("$$circleid$$",circleid);
       this.oddeviceListArray = [];
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.oddeviceListArray = response.data.details;
          this.odDeviceTXT = this.oddeviceListArray[0].DCU_ID+'$$'+this.oddeviceListArray[0].DCU_NAME;
        } else {
          this.oddeviceListArray = [];
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
          this.ondemandCircleNameTXT = "Choose Circle";
          this.circleListArray = response.data.details;
        } else {
          this.ondemandCircleNameTXT = "Choose Circle";
          this.circleListArray = [];
        }
      });
    },
    getSSNameLst(circleidName){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
       var getcicrleSSURL = this.getcicrleSSOnlineURL.replace("$$circleid$$",circleid);
       this.deviceListArray = [];
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.ondemandDeviceNameTXT = "Choose Device";
          this.deviceListArray = response.data.details;
        } else {
          this.ondemandDeviceNameTXT = "Choose Device";
          this.deviceListArray = [];
        }
      });
    },
    getmeterNameLst(dcuidName){
      var dcuid = dcuidName.split("$$")[0];
      var dcuname = dcuidName.split("$$")[1];
      var getSSMeterURL = this.getSSMeterOnlineURL.replace("$$dcuid$$",dcuid);
      this.meterListArray = [];
       axios.get(getSSMeterURL).then(response => {
        if (response.data.status == "found") {
          this.ondemandMeterNameTXT = "Choose Feeder";
          this.meterListArray = response.data.details;
        } else {
          this.ondemandMeterNameTXT = "Choose Feeder";
          this.meterListArray = [];
        }
      });
    },
    getCommandmanageList() {
      this.isLoading = true;
     this.commandListTblSTOP = setInterval(
        () =>axios.get(this.cmd_listUrl).then(response => {
        if (response.data.status == 'commands found') {
          this.isLoading = false;
          this.rmsondemandConfigJson = response.data;
        } else {
          this.isLoading = false;
          this.rmsondemandConfigJson = "";
        }
      }),1000);
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
    getDeviceListMethod() {
      this.deviceListArray = [];
      axios.get(this.device_listUrl).then(response => {
        if (response.data.status == "devices found") {
          this.deviceListArray = response.data.device_details;
        } else {
          this.deviceListArray = [];
        }
      });
    },
    commandresClose(){
      this.$modal.hide('commandResponseViewPopup');
      this.getCommandmanageList();
    },
    viewCommandresponseFunction(rowIndex,object,cmd_id,commandName,region_id,circle_id,dcu_id,met_id,seq_num,serial_number){
      this.isLoading = true;
      var str = {
        command_id:cmd_id,
        command_name:commandName,
        region_id:region_id,
        circle_id:circle_id,
        dcu_id:dcu_id,
        met_id:met_id,
        seq_num:seq_num,
        serial_number:serial_number
      };
      this.commandOD_MSGJSON = "";
       axios
          .post(this.getcommand_resURL, str)
          .then(response => {
            var status = response.data.status;
            if (status.includes("found")) {
            this.$modal.show('commandResponseViewPopup');
            this.viewStatusCmdNameTXT = object.command_name;
            this.viewStatusRegionNameTXT = object.region_name;
            this.viewStatusCircleNameTXT = object.circle_name;
            this.viewStatusDeviceNameTXT = object.device_name;
            this.viewStatusMeterNameTXT = object.meter_name;
            this.viewStatusIssueTimeTXT =  object.issued_time;
            this.viewStatuscmdstatusTXT =  object.command_status;
            if(object.command_name == 'OD_LS_MESSAGE'){
            var jsoncmdstr = JSON.parse(object.commands_str);
              this.viewStatusloadSurveyDateTXT = jsoncmdstr.DATA.LS_DATE.replace("_","-").replace("_","-");
            }
            this.commandOD_MSGJSON = response.data;
            clearInterval(this.commandListTblSTOP);
            this.isLoading = false;
            }else{
            this.warningMessage('Command response not available now');
            this.commandOD_MSGJSON = "";
            this.isLoading = false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error.message);
          });
      
    },
    rmsAddOnDemandFunction(){
      this.onDemandCommandTXT = "Choose Command";
      this.ondemandRegionNameTXT = "Choose Region";
      this.ondemandCircleNameTXT = "Choose Circle";
      this.ondemandDeviceNameTXT = "Choose Device";
      this.ondemandMeterNameTXT = "Choose Feeder";
      this.demandFromdateTXT = myDate;
      this.ondemandDeviceSerialTXT = "Choose Serial Number";
      this.ondemandReasonTXT = "";
      this.ondemandBlockPeroidTXT = "5";
      this.$modal.show('rmsondemandConfigModal');
      clearInterval(this.commandListTblSTOP);
    },
    hideonDemandpopup(){
       this.$modal.hide('rmsondemandConfigModal');
       this.getCommandmanageList();
    },
    ondemandCMDMethod(cmdTXT){
      if(cmdTXT == 'RESET'){
        this.ondemandFlag = false;
      }else{
        this.ondemandFlag = true;
      }
    },
    rmsCommandSaveFunction(){
      this.isLoading = true;
      console.log("Eneter ::" );
      if(this.onDemandCommandTXT == "Choose Command"){
        this.warningMessage("Please choose any one command name");
        this.isLoading = false;
        return false;
      }
      if(this.ondemandRegionNameTXT == "Choose Region"){
        this.warningMessage("Please choose any one region name");
        this.isLoading = false;
        return false;
      }
      if(this.ondemandCircleNameTXT == "Choose Circle"){
        this.warningMessage("Please choose any one circle name");
        this.isLoading = false;
        return false;
      }
      if(this.ondemandDeviceNameTXT == "Choose Device"){
        this.warningMessage("Please choose any one device name");
        this.isLoading = false;
        return false;
      }
       if(this.onDemandCommandTXT == 'RESET'){
          this.ondemandMeterNameTXT = "-$$-";
        }else{
        if(this.ondemandMeterNameTXT == "Choose Feeder"){
        this.warningMessage("Please choose any one feeder name");
        this.isLoading = false;
        return false;
        }
        }
      //  console.log("Eneter :2222222222222:" );
      //  if(this.ondemandDeviceSerialTXT == "Choose Serial Number"){
      //  this.warningMessage("Please choose any one serial number");
      //  this.isLoading = false;
      //  return false;
      //  }

      if(this.onDemandCommandTXT == 'OD_LS_MESSAGE'){
      if(this.demandFromdateTXT == ''){
        this.warningMessage("Please choose date.");
        this.isLoading = false;
        return false;
      }
      }
     if(this.ondemandReasonTXT == ""){
        this.warningMessage("Please enter command reason and proceed further.");
        this.isLoading = false;
        return false;
       }
      if(this.ondemandReasonTXT.length < 20){
        this.warningMessage("Please enter minimum 20 characters.");
        this.isLoading = false;
        return false;
      }
      var regionId = this.ondemandRegionNameTXT.split('$$')[0];
      var regionName = this.ondemandRegionNameTXT.split('$$')[1];
      var circleId = this.ondemandCircleNameTXT.split('$$')[0];
      var circleName = this.ondemandCircleNameTXT.split('$$')[1];
      var dcuId = this.ondemandDeviceNameTXT.split('$$')[0];
      var dcuName = this.ondemandDeviceNameTXT.split('$$')[1];
      var meterId = this.ondemandMeterNameTXT.split('$$')[0];
      var meterName = this.ondemandMeterNameTXT.split('$$')[1];
      var createCommandmanagementJSON = {
          username: this.onDemandUserNameTXT,
          role: this.onDemandRoleTXT,
          command_name: this.onDemandCommandTXT,
          region_id: regionId,
          region_name: regionName,
          circle_id: circleId,
          circle_name: circleName,
          dcu_id: dcuId,
          dcu_name: dcuName,
          meter_id:meterId,
          meter_name:meterName,
          time_sync_step:this.ondemandTimeSyncTXT,
          time_sync_drift:this.ondemandTimeSyncSELVal,
          block_period:this.ondemandBlockPeroidTXT,
          from_date: this.changeDDMMYYYYwithUnderscoreFORMAT(this.demandFromdateTXT),
          reason:this.ondemandReasonTXT
        };
        clearInterval(this.commandListTblSTOP);
        console.log("createCommandmanagementJSON ::" + JSON.stringify(createCommandmanagementJSON));
        axios
          .post(this.cmd_createUrl, createCommandmanagementJSON)
          .then(response => {
            var status = response.data.status;
            if (status.includes("New command")) {
              this.getCommandmanageList();
              this.$modal.hide('rmsondemandConfigModal');
              this.successMessage(this.onDemandCommandTXT + " - added successfully...");
              this.isLoading = false;
            }else{
              this.getCommandmanageList();
              this.warningMessage(status);
              this.isLoading = false;
            } 
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error.message);
          });
    },
     changeDDMMYYYYwithUnderscoreFORMAT(oldtime) {
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
      var date = dd + "_" + mm + "_" + yyyy;
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
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      });
    },
    showPassword1() {
      if (this.typevalue1 === "password") {
        this.typevalue1 = "text";
        this.imgvalue1 = "static/img/images/Peye.png";
      } else {
        this.typevalue1 = "password";
        this.imgvalue1 = "static/img/images/Peye1.png";
      }
    },
    showPassword2() {
      if (this.typevalue2 === "password") {
        this.typevalue2 = "text";
        this.imgvalue2 = "static/img/images/Peye.png";
      } else {
        this.typevalue2 = "password";
        this.imgvalue2 = "static/img/images/Peye1.png";
      }
    },
    ValidateIPaddress(whichmsg,inputText) {
      var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
     if(inputText == "" || inputText == null){
       this.warningMessage("please enter a"+whichmsg.replace("in","").replace("IP is","")+" IP address.");
       return false;
     }else{
       if (inputText.match(ipformat)) {
        return true;
      } else {
        this.warningMessage("You have entered "+whichmsg+" invalid IP address! ");
        return false;
      }
     }
    },
    ValidateDBGIPaddress(whichmsg,inputText) {
      var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
     if(inputText == "" || inputText == null){
       return false;
     }else{
       if (inputText.match(ipformat)) {
        return true;
      } else {
        return false;
      }
     }
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
    isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
     isNumber1: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
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

