<template>
  <section class="content" id="deviceconfigPAGE">
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
              <button id="deviceaddBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff" title="Add Device" @click="rmsAddDeviceFunction()">
              <img src="static/img/images/add.png" /> Add DCU
            </button>
            </div>
             <div class="col-md-12 order-md-3">
            <template>
              <div class="table-responsive" id="rmsdeviceTablePANExxxxx" style="border:1px solid lightgray" v-bind:style="{height:devicetblHeight+'px'}">
                <table
                  class="table table-bordered"
                  id="rmsdevicetableListidxxxx"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                     <tr>
                      <th style="width:20px;" rowspan="2">S.No</th>
                      <th v-show="false" rowspan="2">DCU ID</th>
                      <th style="width:100px" rowspan="2">Region Name</th>
                      <th style="width:100px" rowspan="2">Circle Name</th>
                      <th style="width:100px" rowspan="2">SS Name</th>
                      <th style="width:100px" rowspan="2">DCU Name</th>
                      <th style="width:100px"  rowspan="2">IP Address</th>
                      <th style="width:100px;" colspan="4">Configuration</th>
                      <th style="width:100px;" colspan="4">Firmware</th>
                      <th style="width:25px;" rowspan="2">Edit</th>
                      <th style="width:25px;" rowspan="2">Delete</th>
                      </tr>
                       <tr>
                       <th>View / Config</th>
                       <th>Rollback</th>
                       <th>Activate</th>
                       <th>View History</th>
                       <th>Update</th>
                       <th>Rollback</th>
                       <th>Activate</th>
                       <th>View History</th>
                       </tr>
                  </thead>
                  <tbody v-if="rmsdeviceConfigJson != ''">
                   <tr v-for="(details,index) in rmsdeviceConfigJson.device_details" v-bind:key="index">
                     <td style="width:20px;text-align: center;vertical-align: middle;">{{index+1}}</td>
                     <td style="text-align: center;vertical-align: middle;" v-show="false">{{details.id}}</td>
                     <td style="width:150px;text-align: center;vertical-align: middle;">{{details.region_name}}</td>
                     <td style="width:150px;text-align: center;vertical-align: middle;">{{details.circle_name}}</td>
                     <td style="width:150px;text-align: center;vertical-align: middle;">{{details.ss_name}}</td>
                     <td style="width:150px;text-align: center;vertical-align: middle;">{{details.device_name}}</td>
                     <td style="width:150px;text-align: center;vertical-align: middle;">{{details.ip_address}}</td>
                     <td style="text-align: center;vertical-align: middle;">
                       <input type="image" class="pointer"
                                  src="static/img/images/configure.png"
                                  title="View / Configuration" @click="dcuviewconfigBTNFunction(index,details.id,details.device_name)"
                                  :id="'dcuviewconfigBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;"
                        />
                      </td>
                      <td style="vertical-align:middle;padding-bottom:5px">
                        <table>
                          <tr>
                            <td v-if="details.rollback_flag == 'YES'">
                               <input type="image" class="pointer"
                                  src="static/img/images/rollback.png"
                                  title="Rollback Configuration" @click="rmsConfigureROLLBACKFunction(index,details.id,details.device_name)"
                                  :id="'rmsdevice_getrollbackBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;height:22px;"
                                />
                            </td>
                            <td v-else>
                               <input type="image"  class="disableCSS"
                                  src="static/img/images/rollback1.png"
                                  :id="'rmsdevice_getrollbackBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;height:22px;"
                                />
                            </td>
                          <td  v-if="details.rollback_flag == 'YES'">
                            <a class="hyperlinkcss" title="View Previous & Current Configuration" @click="viewPrevCurrConfigFunction(index,details.id,details.device_name)">View <br/>Prev & Curr </a>
                          </td>
                           <td  v-else>
                            <a class="hyperlinkdisable" title="View Previous & Current Configuration">View <br/>Prev & Curr </a>
                          </td>
                          </tr>
                        </table>
                      </td>
                      <td style="vertical-align:middle;padding-bottom:5px">
                         <table>
                          <tr>
                            <td v-if="details.set_gen_config == 'YES' || details.set_dlms_config == 'YES'">
                        <input type="image" class="pointer" src="static/img/images/activate.png" title="Activate Configuration" @click="rmsConfigureACTIVATEFunction(index,details.id,details.device_name)"
                                  :id="'rmsdevice_getactivateBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;height:22px;"
                                />
                            </td>
                                <td v-else>
                               <input type="image"  class="disableCSS"
                                  src="static/img/images/disableactivate.png"
                                  :id="'rmsdevice_getactivateBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;height:22px;"
                                />
                            </td>
                          <td v-if="details.set_gen_config == 'YES' || details.set_dlms_config == 'YES'">
                          <a class="hyperlinkcss" title="View Activation Changes" @click="viewCurrNewConfigFunction(index,details.id,details.device_name)">View <br/>Changes </a>
                          </td>
                          <td v-else>
                          <a class="hyperlinkdisable" title="View Activation Changes" >View <br/>Changes </a>
                          </td>
                          </tr>
                        </table>
                      </td>
                      <td style="vertical-align:middle;" @click="getconfigHistroyPopup(index,details.id,details.device_name)">
                        <i class="fa fa-history" style="font-size: 20px;color: #1a495e;cursor:pointer" title="View Configuration History" aria-hidden="true"></i>
                      </td>
                       <td style="text-align: center;vertical-align: middle;">
                          <input type="image"  class="pointer"
                                  src="static/img/images/Update_Firmware.png"
                                  title="View / Update Firmware" @click="rmsConfigureUpdateFirmwareFunction(index,details.id,details.device_name)"
                                  :id="'rmsdevice_updatefirmwareBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;height:22px;"
                                />
                      </td>
                      <td style="vertical-align:middle;padding-bottom:5px">
                          <table>
                          <tr>
                            <td>
                        <input type="image"  class="pointer"
                                  src="static/img/images/rollback_firmware.png"
                                  title="Rollback Firmware" @click="rmsConfigureRollbackFirmwareFunction(index,details.id,details.device_name)"
                                  :id="'rmsdevice_rollbackfirmwareBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;height:22px;"
                                />
                                  </td>
                                  <td>
                            <a class="hyperlinkcss" title="View Previous & Current Firmware" @click="viewFWRPrevCurrFunction(index,details.id,details.device_name)">View Fwr <br/>Prev & Curr  </a> 

                          </td>
                                </tr>
                        </table>
                      </td>
                     <td style="vertical-align:middle;padding-bottom:5px" >
                       <table>
                          <tr>
                            <td  v-if="details.update_firmware == 'YES'">
                             <input type="image"  class="pointer"
                                  src="static/img/images/Activate Firmware.png"
                                  title="Activate Firmware" @click="rmsConfigureActivateFirmwareFunction(index,details.id,details.device_name)"
                                  :id="'rmsdevice_activatefirmwareBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;height:22px;"
                                />
                                   </td>
                                   <td v-else>
                                     <input type="image"  class="disableCSS"
                                  src="static/img/images/Activate Firmware1.png"
                                  :id="'rmsdevice_activatefirmwareBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;height:22px;margin-top: 5px;"
                                />
                                   </td>
                                    <td  v-if="details.update_firmware == 'YES'">
                            <a class="hyperlinkcss" title="View Firmware Version" @click="viewALLFWRVersionFunction(index,details.id,details.device_name)">View Fwr<br/>Version </a> 

                          </td>
                          <td  v-else>
                            <a class="hyperlinkdisable" title="View Firmware Version" >View Fwr<br/>Version </a>
                          </td>
                                </tr>
                        </table>
                           </td>
                      <td style="vertical-align:middle;" @click="getfirmwareHistroyPopup(index,details.id,details.device_name)">
                        <i class="fa fa-history" style="font-size: 20px;color: #1a495e;cursor:pointer" title="View Configuration History" aria-hidden="true"></i>
                      </td>
                      <td style="width:25px;vertical-align: middle">
                          <input type="image" class="pointer"
                                  src="static/img/images/edit.png"
                                  title="Edit a device" @click="rmsEditDeviceFunction(details.s_no,index)"
                                  :id="'rmsdevice_EditBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                      </td>

                      <td style="width:25px;vertical-align: middle">
                         <input  type="image" class="pointer"
                                  src="static/img/images/delete.png"
                                  title="Delete a device" @click="rmsDeleteDeviceFunction(details.id,index)"
                                  :id="'rmsdevice_deleteBTN'+index"
                                  style="background-color:transparent;border:1px solid transparent;"
                                />
                      </td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="rmsdeviceConfigJson == ''" style="text-align:center;width: 100%;">
                      <span>No DCU Found</span>
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
     <modal name="rmsdeviceConfigModal" transition="nice-modal-fade" adaptive="true" height="auto"  width="40%" :resizable="true" class="modalSize" :draggable='true' classes="demo-modal-class modalSize" :min-width="300" :min-height="200" :pivot-y="0.5"
        :scrollable="true"
        :reset="true" style="z-index:1111 !important"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-6" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{rmsdeviceepopupTitle}}</h4>
              </div>
              <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button id="hide_closeBTN" type="button" class="btn btn-default" @click="hidedevicepopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
             <div class="row">
              <div class="col-lg-4">
                <p>DCU ID :</p>
              </div>
              <div class="col-lg-8 text-left">
                 <select class="inputOuterCssText" id="rmsdevicedrpTXT" v-model="rmsdeviceIDTXT" v-show="updateid == ''">
															  <option value='Choose DCU ID' selected disabled>Choose DCU ID</option>
                                <option v-for="(items,index) in dcuSerialNumdataArray" :key="index" :value="items.serial_num" >{{items.serial_num}}</option>
								 </select>
                <input @keydown.space.prevent class="inputOuterCssText" :disabled="true" v-show="updateid != ''" v-model="rmsdeviceIDTXT"  id="rmsdeviceTboxTXT" />
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Region Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <select class="inputOuterCssText" id="dcuRegionnameTXT" v-model="dcuRegionnameTXT" @change="getCircleNameLst(dcuRegionnameTXT)" :disabled="deviceEditMode">
															  <option value='Choose Region' selected disabled>Choose Region</option>
                                <option v-for="(items,index) in dcuregionListArray" :key="index" :value="items.REGION_ID+'$$'+items.REGION_NAME" >{{items.REGION_NAME}}</option>
															</select>
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Circle Name :</p>
              </div>
              <div class="col-lg-8 text-left">
             <select class="inputOuterCssText" id="dcuCircleNameTXT" v-model="dcuCircleNameTXT" @change="getSSNameLst(dcuCircleNameTXT)" :disabled="deviceEditMode">
															  <option value='Choose Circle' selected disabled>Choose Circle</option>
                                <option v-for="(items,index) in dcucircleListArray" :key="index" :value="items.CIRCLE_ID+'$$'+items.CIRCLE_NAME">{{items.CIRCLE_NAME}}</option>
															</select>
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Sub Station Name :</p>
              </div>
              <div class="col-lg-8 text-left">
              <select class="inputOuterCssText" id="scuSSNameTXT" v-model="dcuSSNameTXT" :disabled="deviceEditMode">
															  <option value='Choose Sub Station' selected disabled>Choose Sub Station</option>
                                <option v-for="(items,index) in dcusubstationListArray" :key="index" :value="items.SS_ID+'$$'+items.SS_NAME">{{items.SS_NAME}}</option>
															</select>
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>DCU Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                <input
                  @keydown.space.prevent
                  class="inputOuterCssText"
                  v-model="rmsdeviceNameTXT"
                  id="rmsdeviceNameTXT"
                />
                <br/>
                  <span v-if="deviceerrorMsg.rmsdeviceNameTXT" class="errorMsg">{{deviceerrorMsg.rmsdeviceNameTXT}}</span>
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>DCU IP Address :</p>
              </div>
              <div class="col-lg-8 text-left">
                <input
                  class="inputOuterCssText"
                  v-model="rmsdeviceIPTXT"
                  id="rmsdeviceIPTXT" @keydown.space.prevent  @keypress="isNumber($event)"
                />
                <br/>
                <span v-if="deviceerrorMsg.rmsdeviceIPTXT" class="errorMsg">{{deviceerrorMsg.rmsdeviceIPTXT}}</span>
              </div>
            </div>
             <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>No of GCs :</p>
              </div>
              <div class="col-lg-8 text-left">
                 <select class="inputOuterCssText" id="dcuGCSTXT" v-model="dcuGCSTXT" :disabled="deviceEditMode">
															  <option value='1'>1</option>
                                <option value='2' selected>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
								 </select>
              </div>
            </div>
             <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>No of Outgoing Feeder :</p>
              </div>
              <div class="col-lg-8 text-left">
                 <select class="inputOuterCssText" id="dcuOutgoingFeederTXT" v-model="dcuOutgoingFeederTXT" :disabled="deviceEditMode">
															  <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8' selected>8</option>
                                <option value='9'>9</option>
                                <option value='10'>10</option>
                                <option value='11'>11</option>
                                <option value='12'>12</option>
                                <option value='13'>13</option>
                                <option value='14'>14</option>
                                <option value='15'>15</option>
                                <option value='16'>16</option>
                                <option value='17'>17</option>
                                <option value='18'>18</option>
                                <option value='19'>19</option>
                                <option value='20'>20</option>
								 </select>
              </div>
            </div>
            <p v-show="false"></p>
            <div class="row" v-show="false">
              <div class="col-lg-4">
                <p>DCU Port Number :</p>
              </div>
              <div class="col-lg-8 text-left">
                <input
                  class="inputOuterCssText" @keydown.space.prevent  @keypress="isNumber($event)" @input="filterInput($event)"
                  v-model="rmsdevicePortnoTXT" maxlength="5"
                  id="rmsdevicePortnoTXT"
                />
                <br/>
                <span v-if="deviceerrorMsg.rmsdevicePortnoTXT" class="errorMsg">{{deviceerrorMsg.rmsdevicePortnoTXT}}</span>
              </div>
            </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
              <a id="rmsdeviceSaveBTN" class="btn bgBtn btnPadding"  style="color:#fff" @click="rmsdeviceSaveFunction()">{{rmsSavebtnTXT}}</a>
            <a id="clseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="hidedevicepopup">Cancel</a>
          </div>
          </div>
          </modal>

        <modal name="confirmationPopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
        :adaptive="true" :draggable="true"
        :scrollable="true" style="z-index:11111 !important"
        :reset="true" 
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
              <h4 class="heading" style="color: rgb(0, 115, 183);"><i class="fa fa-warning" style="color:#629949"></i> {{confirmationPopupTitle}}</h4>
              </div>
              <div class="col-lg-6 text-right" style="margin-top:-10px;">
              <button id="confirmCloseBTN" type="button" class="btn btn-default" @click="closeconfirmationPopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
             <div v-show="configurecmdName == 'UPDATE_FIRMWARE'">
             <div class="row">
              <div class="col-lg-4">
                <p>Current Version :</p>
              </div>
              <div class="col-lg-8">
                 <p><b>{{firmwareCURRVERTXT}}</b></p>
              </div>
            </div>
            <p></p>
            </div>
            <div v-show="configurecmdName == 'ACTIVATE_FIRMWARE'">
             <div class="row">
              <div class="col-lg-4">
                <span>Current Version :</span>
              </div>
               <div class="col-lg-8">
                 <span><b>{{firmwareCURRVERTXT}}</b> </span>
               </div>
            </div>
            <p></p>
             <div class="row">
            <div class="col-lg-4">
                <span>New Version :</span>
              </div>
               <div class="col-lg-8">
                 <span><b>{{firmwareNEWVERTXT}}</b></span>
               </div>
             </div>
            <p></p>
            </div>
            <div v-show="configurecmdName == 'UPDATE_FIRMWARE'">
             <div class="row">
              <div class="col-lg-4">
                <p>IP Address :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​<input type="text" class="inputTEXTcss"  id="firmwareIPTXT" v-model="firmwareIPTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)" />
              </div>
            </div>
            <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Port No :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​​<input type="text" class="inputTEXTcss"  id="firmwarePORTTXT" v-model="firmwarePORTTXT" />
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>User Name :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​<input type="text" class="inputTEXTcss"  id="firmwareUSERTXT" v-model="firmwareUSERTXT" />
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Password :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​​<input type="password" class="inputTEXTcss"  id="firmwarePASSTXT" v-model="firmwarePASSTXT" />
              </div>
            </div>
            <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Choose Firmware :</p>
              </div>
              <div class="col-lg-8 text-left">
               <select class="inputTEXTcss" id="firmwareSELTXT" v-model="firmwareSELTXT">
															  <option value='Choose Firmware' selected disabled>Choose Firmware</option>
                                 <option v-for="(items,index) in fwListArray" :key="index" :value="items.VERSION_NAME" >{{items.VERSION_NAME}}</option>
															</select>
              </div>
            </div>
            <p></p>
            </div>
             <div v-show="configurecmdName == 'ROLLBACK_FIRMWARE'">
             <div class="row">
              <div class="col-lg-4">
                <p>Previous Version :</p>
              </div>
              <div class="col-lg-8">
                 <p><b>{{firmwarePREVVERTXT}}</b></p>
              </div>
            </div>
            <p></p>
            <div class="row">
              <div class="col-lg-4">
                <p>Current Version :</p>
              </div>
              <div class="col-lg-8">
                 <p><b>{{firmwareCURRVERTXT}}</b></p>
              </div>
            </div>
            <p></p>
            </div>
             <div class="row" v-show="configurecmdName == 'ROLLBACK_FIRMWARE' || configurecmdName == 'CONFIG_ROLLBACK' || configurecmdName == 'ACTIVATE_CONFIG' || configurecmdName == 'UPDATE_FIRMWARE' || configurecmdName == 'ACTIVATE_FIRMWARE'">
              <div class="col-lg-4">
                <p>Reason :</p>
              </div>
              <div class="col-lg-8 text-left">
                ​<textarea class="inputTEXTcss"  id="deviceReasonTXT" v-model="deviceReasonTXT" rows="10" cols="70" style="min-width: 100%;min-height: 150px;max-width: 100%;"></textarea>
              </div>
            </div>
            <p></p>
              <div class="row" v-show="confrimationSUBTEXT != ''">
              <div class="col-lg-12">
            <p style="font-size:16px"><b>{{confrimationSUBTEXT}}</b></p>
             </div>
            </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
            <a id="confrimationApplyBtn" class="btn bgBtn btnPadding"  style="color:#fff;background:green;" @click="saveConfirmationpopup()">{{confrimationApplyBtnTXT}}</a>
            <a id="crmclseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="closeconfirmationPopup">Cancel</a>
          </div>
          </div>
          </modal>
  
      <modal name="deleteConfrimationPopup" transition="nice-modal-fade" classes="demo-modal-class" :min-width="300" :min-height="200" :pivot-y="0.5"
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
              <button id="deleteConfrimationPopupBTN" type="button" class="btn btn-default" @click="closedeleteConfrimationPopup" style="background:transparent;border:1px solid transparent">
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
                <h4 style="margin-top: 0px;">{{deleteDevicePasswordCONFRIMTXT}}</h4>
              </div>
            </div>
            <p></p>
             <div class="row">
              <div class="col-lg-4">
                <p>Login Password :</p>
              </div>
              <div class="col-lg-8">
                     <input id="deleteDevicePassword" type="password" placeholder="Please enter password" class="outerInputCss" v-model="deleteDevicePasswordTXT"/>
              </div>
            </div>
            </div>
          </div>
          <!--Footer-->
          <div class="modal-footer flex-center">
            <a id="confrimationdeleteApplyBtn" class="btn bgBtn btnPadding"  style="color:#fff;background:green;" @click="applyDeviceDeleteConfirmationpopup()">{{confrimationApplyBtnTXT}}</a>
          <a id="deletedeviceclseBTN" type="button" class="btn btn-default waves-effect btnPadding" @click="closedeleteConfrimationPopup">Cancel</a>
          </div>
          </div>
          </modal>

          <!-- Rework Device page START -->


            <!-- Device config/get  START -->
        <modal id="dcuviewconfigBTNpopup" name="dcuviewconfigBTNpopup" transition="nice-modal-fade" classes="demo-modal-class"  :min-width="300" :min-height="200" :pivot-y="1.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true" style="z-index:1111 !important;"
        width="60%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-9" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> DCU View / Configuration </h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="closedcuviewconfigBTN1popup" type="button" class="btn btn-default" @click="closedcuviewconfigBTN1popup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div>
        <div class="tab" role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist" style="font-size:12px">
                      <li role="presentation" class="active" id="dcuconfigurationTab">
                        <a
                          href="#dcuconfigurationTabPANE"
                          id="dcuconfigurationTabPANEID"
                          aria-controls="Configuration"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="dcuconfigurationTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp;  Configuration
                        </a>
                      </li>
                      <li role="dcuviewTab" id="dcuviewTab">
                        <a href="#dcuviewTabPANE"
                          id="dcuviewTabPANEID"
                          aria-controls="View"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="dcuviewTabPANEMethod"
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i> &nbsp;&nbsp; GET Configuration
                        </a>
                      </li>
                      </ul>
                       <div class="tab-content" style="margin:1px;padding:5px;border: 2px solid lavender;">
                      <div role="tabpanel" class="tab-pane fade in active show" id="dcuconfigurationTabPANE">
                        <span>Configuration : </span>
                         <div class="tab" role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist"  style="font-size:12px">
                      <li role="presentation" class="active" id="dcuGENTab">
                        <a
                          href="#dcuGENTabPANE"
                          id="dcuGENTabPANEID"
                          aria-controls="General Configuration"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="dcuGENTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; General Configuration
                        </a>
                      </li>
                      <li role="dcuviewTab" id="dcuDLMSTab">
                        <a href="#dcuDLMSTabPANE"
                          id="dcuDLMSTabPANEID"
                          aria-controls="DLMS"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="dcuDLMSTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; Ethernet Configuration
                        </a>
                      </li>
                      </ul>
                    <div class="tab-content">
                      <div role="tabpanel" class="tab-pane fade in active show" id="dcuGENTabPANE">
                       <div class="col-xl-12 order-xl-1">
                          <div class="row">
                           <div class="col-lg-6">
                        <span style="text-decoration: underline;"><b>{{deviceTblDeviceName}} - General Configuration :</b></span>
                           </div>
                           <div class="col-lg-6 text-right">
                  <a id="dcuConfigSaveBtnFunction" class="btn bgBtn btnPadding" style="color:#fff;background:green;margin-top: -70px;" @click="dcuConfigSaveBtnFunction()">Save General Configuration</a>
                                      </div>
                          </div>
                         <div class="row">
                           <div class="col-lg-6">
                 <h6 class="heading-small text-header-color mb-2">GENERAL</h6>
                           </div>
                            
                         </div>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label" >DCU ID</label>
                        <div class="form control">
                        <input id="genGatewayTXT"  @keydown.space.prevent disabled  @keypress="isNumber($event)" placeholder="Gateway ID" class="outerInputCss" v-model="gatewayTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Location (Max length 64)</label>
                        <div class="form control">
                        <input id="genlocationTXT" placeholder="Location" class="outerInputCss" v-model="locationTXT" maxlength="64"/>
                        </div>
                        </div>
                      </div>
                    <div class="col-lg-3" style="margin-top:20px;">
                       <label class="form-control-label">Enable DBG Log : </label>
                        <label style="margin-left:10px;margin-bottom:0px;">
                        <input type="checkbox" id="genDBGChkbox" v-model="enabledbglogChkBox" style="margin-top:10px;"/> Enable
                        </label>
                    </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">DBG Log IP Address</label>
                         <div class="form control">
                         <input id="genDBGIPTXT" placeholder="DBG Log IP Address" class="outerInputCss" :disabled="! enabledbglogChkBox" v-model="dbglogIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <!-- Address -->
                  <h6 class="heading-small text-header-color mb-2">ETHERNET</h6>
                  <div class="pl-lg-1">
                     <div class="row">
                      <div class="col-lg-6 text-left">
                    <h5>Ethernet 1 Configuration :</h5>
                      </div>
                      <div class="col-lg-6 text-right">
                     <input type="radio" name="networkbutton" id="metnetradioBTN" v-model="networkbtnTXT" value="Meter Network"/><label for="metnetradioBTN"><b>Meter Network</b></label>&nbsp;&nbsp;
                     <input type="radio" name="networkbutton"  id="cdsnetradioBTN" v-model="networkbtnTXT" checked ="checked" value="CDCS Network" /><label for = "cdsnetradioBTN"><b>CDCS Network</b></label>
                      </div>
                     </div>
                    <div class="row">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="genLANcurrentIPTXT" placeholder="IP Address" class="outerInputCss"
                          v-model="ipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="genLANnewIPTXT" placeholder="IP Address" class="outerInputCss" v-model="newipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="genLANSubnetIPTXT" placeholder="Subnet Mask" class="outerInputCss" v-model="subnetmaskTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="genLANGatewayIPTXT" placeholder="Gateway" class="outerInputCss" v-model="gateTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="getGenEthNumPort != null && getGenEthNumPort == '4' || getGenEthNumPort != null && getGenEthNumPort == '2'">Ethernet 2  Configuration :</h5>
                     <div class="row"  v-if="getGenEthNumPort != null && getGenEthNumPort ==  '4' || getGenEthNumPort != null && getGenEthNumPort == '2'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="genLANcurrentIPTXT2" placeholder="IP Address" class="outerInputCss"
                          v-model="ipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                                                  />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="genLANnewIPTXT2" placeholder="IP Address" class="outerInputCss" v-model="newipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="genLANSubnetIPTXT2" placeholder="Subnet Mask" class="outerInputCss" v-model="subnetmaskTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="genLANGatewayIPTXT2" placeholder="Gateway" class="outerInputCss" v-model="gateTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5  v-if="getGenEthNumPort != null && getGenEthNumPort == '4'">Ethernet 3 Configuration :</h5>
                     <div class="row"  v-if="getGenEthNumPort != null && getGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="genLANcurrentIPTXT3" placeholder="IP Address" class="outerInputCss"
                          v-model="ipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                                                  />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="genLANnewIPTXT3" placeholder="IP Address" class="outerInputCss" v-model="newipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="genLANSubnetIPTXT3" placeholder="Subnet Mask" class="outerInputCss" v-model="subnetmaskTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="genLANGatewayIPTXT3" placeholder="Gateway" class="outerInputCss" v-model="gateTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5  v-if="getGenEthNumPort != null && getGenEthNumPort == '4'">Ethernet 4  Configuration :</h5>
                     <div class="row"  v-if="getGenEthNumPort != null && getGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="genLANcurrentIPTXT4" placeholder="IP Address" class="outerInputCss"
                          v-model="ipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                                                  />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="genLANnewIPTXT4" placeholder="IP Address" class="outerInputCss" v-model="newipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="genLANSubnetIPTXT4" placeholder="Subnet Mask" class="outerInputCss" v-model="subnetmaskTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="genLANGatewayIPTXT4" placeholder="Gateway" class="outerInputCss" v-model="gateTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

               <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false"/>
               <div v-show="false">
                <div class="row">
                  <div class="col-lg-2">
                  <h6 class="heading-small text-header-color mb-2">Serial Port</h6>
                   </div>
                    <div class="col-lg-2">
                           <p>No of serials :</p>
                    </div>
                    <div class="col-lg-2">
                    <select id="genno_serialDropTXT"  v-model="no_serialDropTXT" style="margin-left: -95px;height:30px;width: 50%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"                            >
                              <option disabled value="choose no of serial" selected>choose no of serial</option>
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                              <option value="4">4</option>
                    </select>
                    </div> 
                </div>
                  <div class="pl-lg-1">
                    <div id="serialPane1" style="margin-top: -25px;">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 1: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="genBaudDropdown"
                              v-model="serialBaudRateDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="genDataBitsDropdown"
                              v-model="serialDatabitsDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="genStopBitsDropdown"
                              v-model="serialStopbitsDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="genParityDropdown" v-model="serialParityDropTXT1" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="genHandshakeDropdown"
                              v-model="serialHandshakeDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="genInfModeDropdown" v-model="serialInfModeDropTXT1" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                <hr class="my-1" v-show="no_serialDropTXT == '2' || no_serialDropTXT == '4'"/>
                    <div id="serialPane2"  v-show="no_serialDropTXT == '2' || no_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 2: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="genBaudDropdown2"
                              v-model="serialBaudRateDropTXT2"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="genDataBitsDropdown2"
                              v-model="serialDatabitsDropTXT2"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="genStopBitsDropdown2"
                              v-model="serialStopbitsDropTXT2"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="genParityDropdown2" v-model="serialParityDropTXT2" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select  id="genHandshakeDropdown2"
                              v-model="serialHandshakeDropTXT2"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="genInfModeDropdown2" v-model="serialInfModeDropTXT2" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="no_serialDropTXT == '4'"/>
                   <div id="serialPane3" v-show="no_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 3: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="genBaudDropdown3"
                              v-model="serialBaudRateDropTXT3"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="genDataBitsDropdown3"
                              v-model="serialDatabitsDropTXT3"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="genStopBitsDropdown3"
                              v-model="serialStopbitsDropTXT3"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="genParityDropdown3" v-model="serialParityDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="genHandshakeDropdown3"
                              v-model="serialHandshakeDropTXT3"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="genInfModeDropdown3" v-model="serialInfModeDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="no_serialDropTXT == '4'"/>
                   <div id="serialPane4" v-show="no_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 4: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="genBaudDropdown4"
                              v-model="serialBaudRateDropTXT4"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="genDataBitsDropdown4"
                              v-model="serialDatabitsDropTXT4"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="genStopBitsDropdown4"
                              v-model="serialStopbitsDropTXT4"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="genParityDropdown4" v-model="serialParityDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="genHandshakeDropdown4"
                              v-model="serialHandshakeDropTXT4"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="genInfModeDropdown4" v-model="serialInfModeDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <h6 class="heading-small text-header-color mb-2">NTP</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 1: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="genNTPchkbx1" v-model="ntpChekBOX1" /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                        <input id="genNTPipaddTXT1"  placeholder="IP Address" class="outerInputCss"  :disabled="!ntpChekBOX1" v-model="ntpIpaddressTXT" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="genNTPPortTXT1" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" :disabled="!ntpChekBOX1"  maxlength="5" @keydown.space.prevent @keypress="isNumber($event)" v-model="ntpPortNoTXT"/>
                        </div>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 2: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="genNTPchkbx2" v-model="ntpChekBOX2" /> Enable
                        </label>

                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                         <input id="genNTPipaddTXT2" placeholder="IP Address" @keydown.space.prevent @keypress="isNumber($event)" class="outerInputCss" v-model="ntpIpaddressTXT2" :disabled="!ntpChekBOX2"/>
                        </div>
                        </div>
                      </div>

                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="genNTPPortTXT2" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" v-model="ntpPortNoTXT2" :disabled="!ntpChekBOX2" maxlength="5" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3" v-show="false">
                       <div>
                          <label class="form-control-label">TimeOffset (Hrs, Mins)</label>
                          <div class="form control">
                            <select id="ntpTimeOffsetHrsdropdwn"
                              v-model="ntpTimeOffsetHrsTXT" :disabled="ntpChekBOX1 || ntpChekBOX2 ? false : true"  class="disable"
                              style="height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in HoursArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                           
                            <select id="ntpTimeOffsetSecdropdwn"
                              v-model="ntpTimeOffsetSecTXT" :disabled="ntpChekBOX1 || ntpChekBOX2 ? false : true"  class="disable"
                              style="margin-left:10px;height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in MinsArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                 
                           </div>
                        </div>
                        </div>
                        <div class="col-lg-2" style="margin-top: -20px;">
                        <div>
                        <label class="form-control-label">Update Interval (Mins)</label>
                        <div class="form control">
                        <input id="genNTPintervalTXT"  placeholder="Interval" class="outerInputCss" v-model="ntpIntervalTXT" :disabled="ntpChekBOX1 || ntpChekBOX2 ? false : true"/>
                        </div>
                        </div>                        
                        </div>
                        </div>   

                  </div>
 <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >FTP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="ftpEnablechekbox" v-model="ftpEnablechekbox" /> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IP Address : </span>
                       <input id="ftpIpaddTXT" class="inputTEXTcss" placeholder="IP Address" v-model="ftpIpaddTXT" maxlength="32" :disabled="!ftpEnablechekbox"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number : </span>
                       <input id="ftpprtnoTXT" class="inputTEXTcss" placeholder="Port Number" v-model="ftpprtnoTXT" maxlength="5" @keydown.space.prevent :disabled="!ftpEnablechekbox"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">User Name : </span>
                       <input id="ftpusernameTXT" class="inputTEXTcss" placeholder="User Name" v-model="ftpusernameTXT" maxlength="10" :disabled="!ftpEnablechekbox"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Password : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                       <input id="ftppasswordTXT" class="inputTEXTcss" placeholder="Password" v-model="ftppasswordTXT" maxlength="32" @keydown.space.prevent  :disabled="!ftpEnablechekbox"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Directory : </span>
                       <input id="ftpdirTXT" class="inputTEXTcss" placeholder="Directory" v-model="ftpdirTXT" :disabled="!ftpEnablechekbox"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Time Interval(mins) : </span>
                       <select class="inputTEXTcss"  name="ftpTimeInt" id="ftpTimeInt" v-model="ftptimeoutTXT" :disabled="!ftpEnablechekbox">
																<!-- <option value='5' selected>5</option> -->
																<option value='15' selected>15</option>
																<option value='30'>30</option>
																<option value='60'>60</option>
															</select>
              </div>
              </div>
 </div>
<hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >IEC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="iec104Enablechekbox" v-model="iec104Enablechekbox" /> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Station Address : </span>
                       <input id="iecStationTXT" class="inputTEXTcss" placeholder="Station Address" v-model="iecStationTXT" maxlength="32" :disabled="!iec104Enablechekbox"/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number :</span>
                       <input id="iecportTXT" class="inputTEXTcss" placeholder="Port Number" v-model="iecportTXT" @keydown.space.prevent @keypress="isNumber($event)" :disabled="!iec104Enablechekbox"/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Cyclic Int(in Sec) : </span>
                       <input id="iecCylicTXT" class="inputTEXTcss" placeholder="Cyclic Int(in Sec)" v-model="iecCylicTXT"  @keypress="isNumber($event)" :disabled="!iec104Enablechekbox"/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Start IOA Addr : </span>
                       <input id="startIOAaddTXT" class="inputTEXTcss" placeholder="Start IOA Addr" v-model="startIOAaddTXT"  @keypress="isNumber($event)" :disabled="!iec104Enablechekbox"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">COT Size : </span>
                       <select id="iecCodsizedwnTXT" v-model="iecCodsizedwnTXT" class="inputTEXTcss" :disabled="!iec104Enablechekbox">
                              <option value="Choose COT Size" selected disabled>Choose COT Size</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                      </select>
              </div>
             <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IOA : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <select id="iecIOAsizedwnTXT" v-model="iecIOAsizedwnTXT" class="inputTEXTcss" :disabled="!iec104Enablechekbox">
                              <option value="Choose IOA Size" selected disabled>Choose IOA Size</option>
                              <option value="3">3</option>
                              <option value="2">2</option>
                      </select>
              </div>
              </div>
</div>
                <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >Allowed Master&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="genallowcommonchkbx" v-model="genallowcommonchkbx" :disabled="!iec104Enablechekbox"/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="genallow1chkbx" v-model="genallow1chkbx" :disabled="!genallowcommonchkbx"/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="genallow1IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="genallow1IPTXT" :disabled="!genallow1chkbx"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="genallow2chkbx" v-model="genallow2chkbx" :disabled="!genallowcommonchkbx"/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="genallow2IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="genallow2IPTXT" :disabled="!genallow2chkbx"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="genallow3chkbx" v-model="genallow3chkbx" :disabled="!genallowcommonchkbx"/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="genallow3IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="genallow3IPTXT" :disabled="!genallow3chkbx"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="genallow4chkbx" v-model="genallow4chkbx" :disabled="!genallowcommonchkbx" /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="genallow4IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="genallow4IPTXT" :disabled="!genallow4chkbx"/>
                        </div>
                        </div>
                      </div>
 </div>
</div>

 
  

                  <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false" >MQTT</h6>
                  <div class="pl-lg-1" v-show="false" >
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Broker IP</label>
                        <div class="form control">
                        <input id="genMQTTbrokerIPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a Broker IP" class="outerInputCss" v-model="mqttBrokerTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Port No</label>
                        <div class="form control">
                        <input id="genMQTTPortTXT" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" @keydown.space.prevent  @keypress="isNumber($event)" @input="filterInput2($event)" maxlength="5" v-model="mqttPortNoTXT1"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Username</label>
                        <div class="form control">
                        <input id="genMQTTusernameTXT" placeholder="Username" maxlength="32" class="outerInputCss" v-model="mqttUsernameTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                         <div>
                        <label class="form-control-label">Password</label>
                        <div class="form control">
                        <input id="genMQTTpasswdTXT" :type="typevalue1" placeholder="Password" maxlength="32" class="outerInputCss" v-model="mqttPasswodTXT"/>
                        <img id="mqttcnpasswdimg1" :src="imgvalue1" class="eyeimg" title="show password" @click="showPassword1()">
                        </div>
                        </div>   
                      </div>
                    </div>
                    <div class="row"> 
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Publish Topic</label>
                        <div class="form control">
                        <input id="genMQTTPublishtocTXT" placeholder=" Publish Topic" class="outerInputCss" v-model="mqttPublicTopicTXT"/>
                        </div>
                        </div>                          
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Publish Interval (Hrs, Mins, Secs)</label>
                          <div class="form control">
                              <select id="genmqttHrsdropDwn"
                              v-model="mqttHrsTXT"   class="disable"
                              style="height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item1 in Hours24Array" v-bind:value="item1" v-bind:key="item1" >{{ item1 }}</option>
                            </select> 

                            <select id="genmqttMinsdropDwn"
                              v-model="mqttMinsTXT"   class="disable"
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item2 in Mins5Array" v-bind:value="item2" v-bind:key="item2" >{{ item2 }}</option>
                            </select>   

                               <select id="genmqttSecsdropDwn"
                              v-model="mqttSecsTXT"   class="disable"
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item3 in SecondsArray" v-bind:value="item3" v-bind:key="item3" >{{ item3 }}</option>
                            </select> 
                           
                          </div>
                        </div>
                      </div>                     
                    </div>
                    <div class="row">
                    
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Events : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="mqttEnableEventsChkBOX" id="genmqttEventschkbox"/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Events Topic</label>
                        <div class="form control">
                        <input id="genmqttEventstocTXT" placeholder="Events Topic" class="outerInputCss" :disabled="! mqttEnableEventsChkBOX" v-model="mqttEventsTopicTXT"/>
                        </div>
                        </div>                        
                      </div>
                     <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="mqttEnablePingChkBOX" id="genmqttPingchkbox"/> Enable
                        </label> 
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Diag Topic</label>
                        <div class="form control">
                         <input id="genmqttDiagtocTXT" placeholder="Diag Topic"  :disabled="! mqttEnablePingChkBOX" class="outerInputCss" v-model="mqttDiagTXT"/>
                        </div>
                        </div>                       
                      </div>
                    </div>
                  </div>
                                 
                  <hr class="my-1" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false">Modem</h6>
                  <div class="pl-lg-1" v-show="false">
                    <div class="row">
                       <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Modem : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="enableModemChkBox" id="genmodemChkbox"/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-2">
                        <div>
                          <label class="form-control-label">Connection Type</label>
                          <div class="form control">

                        <select id="genmodemConnectionDropwn"
                              v-model="modmConnectionTypeTXT" :disabled="! enableModemChkBox" class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                            
                              <option value="0" selected>Select Connection</option>
                              <option value="LAN_TYPE">LAN_TYPE</option>
                              <option value="3G_TYPE">3G_TYPE</option>
                              <option value="CDMA_TYPE">CDMA_TYPE</option>
                              <option value="2G_TYPE">2G_TYPE</option>
                              <option value="4G_TYPE">4G_TYPE</option>
                              <option value="5G_TYPE">5G_TYPE</option>
                            
                            </select>
 </div> </div>

                      </div>
                      <div class="col-lg-2">
                        <input id="genmodemusernameTXT"
                          alternative
                          label="Username"
                          placeholder="Username" :disabled="!enableModemChkBox"
                          class="outerInputCss"
                          v-model="UsernameTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative  id="genmodempasswordTXT"
                          label="Password" :disabled="!enableModemChkBox"
                          placeholder="Password" :type="typevalue"
                          class="outerInputCss"
                          v-model="PasswordTXT"
                        />
                        <img id="genmodemcnpasswdimg" :src="imgvalue" class="eyeimg" title="show password" @click="showPassword()">
                      </div>
                       <div class="col-lg-2">
                        <input 
                          alternative id="genmodemPHTXT"
                          label="Phone Number (Num length 10)" :disabled="!enableModemChkBox" 
                          placeholder="Phone Number" maxlength="10" @keydown.space.prevent @keypress="isNumber($event)"
                          class="outerInputCss"
                          v-model="modemPhNumTXT"
                        />
                     
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="APN" id="genmodemAPNTXT"
                          placeholder="APN" :disabled="!enableModemChkBox"
                          class="outerInputCss"
                          v-model="apnTXT"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="genmodemPingChkBox" v-model="enablePinChkBox"  :disabled="!enableModemChkBox"/> Enable
                        </label>
 
                      </div>
                   
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="Ping IP" id="genmodempingIpTXT"
                          placeholder="Ping IP"
                          class="outerInputCss" :disabled="! enablePinChkBox || !enableModemChkBox" 
                          v-model="pingIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="genmodemAttemptsTXT"
                          label="Ping Num (between 5 to 10)"
                          placeholder="Num attempts"
                          class="outerInputCss" :disabled="! enablePinChkBox || !enableModemChkBox" 
                          v-model="pingNumTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="genmodemPingintervalTXT"
                          label="Ping Interval (in secs)"
                          placeholder="Interval"
                          class="outerInputCss" :disabled="! enablePinChkBox || !enableModemChkBox" 
                          v-model="pingTimeoutTXT"
                        />
                      </div>
                    </div>
                  </div>


                  <hr class="my-1" v-show="false"/>
                  <h6 class="heading-small text-header-color mb-2" v-show="false">VPN</h6>
                  <div class="pl-lg-1" v-show="false">
                     <div class="row">
<div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> VPN : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="genVPNchkbox" v-model="enableVPNChkBox" /> Enable
                        </label>
 
                      </div>

                      <div class="col-lg-2" >
                          <div>
                          <label class="form-control-label">Choose VPN Type</label>
                          <div class="form control">
                            <select id="genVPNTypeDropwn" v-model="selectVpnVal" :disabled="!enableVPNChkBox" class="disable" 
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0">VPN Disable</option>
                              <option value="1">VPN_IPSEC</option>
                              <option value="2">VPN_PPTP</option>
                            
                            </select>
                          </div>
                        </div>
 
                      </div>
                     </div>
                     <div style="height:10px"></div>
                      <div style="border:1px solid lightgray;padding:5px;">
                        <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_IPSEC</h5>
                    <div class="row">
                        
                   
                      <div class="col-lg-3">
                        <input
                          alternative id="genVPNTunnelTXT"
                          label="Tunnel Name  (Max length 64)"
                          placeholder="Tunnel Name"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnTunnelNameTXT" maxlength="64" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnSharedKeyTXT"
                          label="Pre SharedKey (Max length 64)"
                          placeholder="Pre SharedKey"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnSharedKeyTXT" maxlength="64" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnKeyLifeTimeTXT"
                          label="KeyLifeTime (mins 1 to 10)"
                          placeholder="KeyLifeTime"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnKeyLifeTimeTXT" maxlength="2" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnRightIpTXT"
                          label="Right IP"
                          placeholder="Right IP"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnRightIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnRightSubnetTXT"
                          label="Right Subnet"
                          placeholder="Right Subnet"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnRightSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnRightIdTXT"
                          label="Right ID  (Max length 32)"
                          placeholder="Right ID"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnRightIdTXT" maxlength="32" 
                        />
                      </div>
                     
                    </div>


                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnLeftIpTXT"
                          label="Left IP"
                          placeholder="Left IP"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnLeftIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnLeftSubnetTXT"
                          label="Left Subnet"
                          placeholder="Left Subnet"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnLeftSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnLeftIdTXT"
                          label="Left ID (Max length 32)"
                          placeholder="Left ID"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnLeftIdTXT" maxlength="32" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input 
                          alternative id="genvpnLefSrcIPTXT"
                          label="Left Source IP"
                          placeholder="Left Source IP"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnLefSrcIPTXT" maxlength="32" 
                        />
                      </div>
                    </div>

                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative
                          label="PFS" id="genvpnPfsTXT"
                          placeholder="PFS"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnPfsTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Aggr Mode</label>
                          <div class="form control">
                            <select id="genvpnAggrModeTXT"
                              v-model="vpnAggrModeTXT" :disabled="selectVpnVal =='1'? false  : true" class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="1">Yes</option>
                              <option value="2">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnKeyingModeTXT"
                          label="Keying Mode (Max length 8)" 
                          placeholder="KeyingMode"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnKeyingModeTXT" maxlength="8" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input
                          alternative id="genvpnNatTravTXT"
                          label="Nat Trav" 
                          placeholder="Nat Trav"
                          class="outerInputCss" :disabled="selectVpnVal =='1'? false  : true"
                          v-model="vpnNatTravTXT" maxlength="2"  @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>

                    <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase1 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="genvpnDhGrpTXT1"
                              v-model="vpnDhGrpTXT1" :disabled="selectVpnVal =='1'? false  : true" class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select  id="genvpnEncrptTXT1"
                              v-model="vpnEncrptTXT1" :disabled="selectVpnVal =='1'? false  : true" class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="genvpnAuthenTXT1"
                              v-model="vpnAuthenTXT1" :disabled="selectVpnVal =='1'? false  : true" class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>
                     
                    </div>
<div style="height:10px;"></div>
                     <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase2 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="genvpnDhGrpTXT2"
                              v-model="vpnDhGrpTXT2" :disabled="selectVpnVal =='1'? false  : true" class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select id="genvpnEncrptTXT2"
                              v-model="vpnEncrptTXT2" :disabled="selectVpnVal =='1'? false  : true" class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="genvpnAuthenTXT2"
                              v-model="vpnAuthenTXT2" :disabled="selectVpnVal =='1'? false  : true" class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            </select>
                          </div>
                        </div>
                      </div>
                     
                    </div>


<div style="height:15px;"></div>
</div>
 <div style="height:10px;"></div>
 <div style="border:1px solid lightgray;padding:5px;">
                        <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_PPTP</h5>

<div class="row">
                <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Require Memory Map</label>
                          <div class="form control">
                            <select id="genReqMmpeType" v-model="ReqMmpeType" :disabled="selectVpnVal =='2'? false  : true" class="disable" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                       <input id="genvpnPptpconnNameTXT"
                          alternative
                          label="Connection Name"
                          placeholder="Connection Name"
                          class="outerInputCss" :disabled="selectVpnVal =='2'? false  : true"
                          v-model="vpnPptpconnNameTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>

                       <div class="col-lg-3">
                        <input id="genvpnPptpLocalUnameTXT"
                          alternative
                          label="Local User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" :disabled="selectVpnVal =='2'? false  : true"
                          v-model="vpnPptpLocalUnameTXT" maxlength="32" 
                        />
                      </div>
                     <div class="col-lg-3">
                          <input
                          alternative id="genvpnPptpLocalUpassTXT"
                          label="Local Password"  :type="typevalue2"
                          placeholder="Local Password" maxlength="32"
                          class="outerInputCss"
                          v-model="vpnPptpLocalUpassTXT" :disabled="selectVpnVal =='2'? false  : true"
                        />
                        <img id="vpnpptpPasswdimg1" :src="imgvalue2" class="eyeimg" title="show password" >
                      </div>
                    </div>
                  <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnPptpRemoteUnameTXT"
                          label="Remote User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" :disabled="selectVpnVal =='2'? false  : true"
                          v-model="vpnPptpRemoteUnameTXT" maxlength="32"
                        />

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="genvpnPptpRemoteIpTXT"
                          label="Remote IP Address"
                          placeholder="Remote IP Address"
                          class="outerInputCss" :disabled="selectVpnVal =='2'? false  : true"
                          v-model="vpnPptpRemoteIpTXT" maxlength="32"  @keydown.space.prevent @keypress="isNumber($event)"
                        />

                      </div>
                      </div>
                      </div>
                      </div>
                      <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
               
            </div>
                      </div>
                       <div role="tabpanel" class="tab-pane fade" id="dcuDLMSTabPANE">
                         
                        <div class="row"> 
                         <div class="col-lg-6">
                           <span style="text-decoration: underline;"><b>{{deviceTblDeviceName}} - Ethernet Configuration :</b></span>
                        </div>
                          <div class="col-lg-6 text-right">
                             <a id="dcuDMLSConfigSaveBtnFunction" class="btn bgBtn btnPadding" style="color:#fff;background:green;margin-top: -70px;" @click="dcuDLMSSaveBtnFunction()">Save DMLS Meter Configuration</a>
                        </div>
                        </div>
                        <template>
              <div class="table-responsive" id="rmsDLMSConfigTablePANE" style="height:500px;border:1px solid lightgray">
                <table
                  class="table table-bordered"
                  id="rmsDLMSConfigTableid"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th>S.No</th>
                      <th>Enable</th>
                      <th>Meter IP address</th>
                      <th>Port Number</th>
                      <th>Password</th>
                      <th>Meter Location</th>
                      <th>Clear</th>
                    </tr>
                  </thead>
                  <tbody v-if="rmsMeterDLMSConfigJson != ''">
                    <tr
                      v-for="(items,index) in rmsMeterDLMSConfigJson.details"
                      v-bind:key="index"
                    >
                      <td>{{index+1}}</td>
                      <td class="center-block text-center"><input type="checkbox" class="checkbox2" :id="'dlmsETHcheckbox'+(index+1)" :checked="items.meter_enable == 'Yes'? true : false" @click="enableDMLSmeter('dlmsETHcheckbox'+(index+1),index,items)"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'dlmsETHipTXT'+(index+1)" :value="items.meter_ip" :disabled="items.meter_enable == 'No'? true : false" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'dlmsETHportTXT'+(index+1)" :value="items.meter_port" :disabled="items.meter_enable == 'No'? true : false" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="password" class="inputTEXTcss center-block text-center" :id="'dlmsETHpassTXT'+(index+1)" :value="items.meter_pass" :disabled="items.meter_enable == 'No'? true : false" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'dlmsETHlocTXT'+(index+1)" :value="items.meter_location" :disabled="items.meter_enable == 'No'? true : false" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><i class="fa fa-ban text-blue" style="font-size: 20px;" :id="'dlmsETHClearicon'+(index+1)"  :disabled="items.meter_enable == 'No'? true : false" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'" @click="clearDLMSfunction(index,items)"/></td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="rmsMeterDLMSConfigJson == ''" style="text-align:center;width: 100%;">
                      <span>no record found</span>
                 </div>
              </div>
            </template>
                      </div>
                    </div>
                         </div>
                      </div>


                    <div role="tabpanel" class="tab-pane fade" id="dcuviewTabPANE">
                       <span> GET Configuration : </span>
                       <div class="tab" role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist" style="font-size:12px">
                      <li role="presentation" class="active" id="getGENConfigTab">
                        <a href="#getGENConfigTabPANE"
                          id="getGENConfigTabPANEID"
                          aria-controls="getconfig"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="getGENConfigTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; Get General Configuration
                        </a>
                      </li>
                      <li role="dcuviewTab" id="getDLMSConfigTab">
                        <a href="#getDLMSConfigTabPANE"
                          id="getDLMSConfigTabPANEID"
                          aria-controls="View"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="getDLMSConfigTabPANEMethod"
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i> &nbsp;&nbsp;  Get Ethernet Configuration
                        </a>
                      </li>
                      </ul>
                      <div class="tab-content" style="margin:1px;padding:2px;border: 1px solid lavender;">
                      <div role="tabpanel" class="tab-pane fade in active show" id="getGENConfigTabPANE">
                      <div class="row">
                      <div class="col-lg-12">
                      <p style="font-size:16px"><b>Confirm GET_GEN_CONFIG of device - {{deviceTblDeviceName}} ?</b></p>
                      <p></p>
                       <a id="getGENconfigBTN" class="btn bgBtn btnPadding"  style="color:#fff;background:green;" @click="getGENconfigBTNFunction()">Submit Command</a>
                      </div>
                      </div>
                      <p></p>
                      <div class="row" v-show="enableGETGENFlag">
                       <div class="col-lg-12">
                           <span style="text-decoration: underline;"><b>{{deviceTblDeviceName}} - General Configuration :</b></span>
                 <h6 class="heading-small text-header-color mb-2">GENERAL</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label" >DCU ID</label>
                        <div class="form control">
                        <input id="getCurrViewgenGatewayTXT"  @keydown.space.prevent disabled  @keypress="isNumber($event)" placeholder="Gateway ID" class="outerInputCss" v-model="getCurrViewgatewayTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Location (Max length 64)</label>
                        <div class="form control">
                        <input id="getCurrViewgenlocationTXT" placeholder="Location" class="outerInputCss" disabled v-model="getCurrViewlocationTXT" maxlength="64"/>
                        </div>
                        </div>
                      </div>
                    <div class="col-lg-3" style="margin-top:20px;">
                       <label class="form-control-label">Enable DBG Log : </label>
                        <label style="margin-left:10px;margin-bottom:0px;">
                        <input type="checkbox" id="getCurrViewgenDBGChkbox" v-model="getCurrViewenabledbglogChkBox" disabled style="margin-top:10px;"/> Enable
                        </label>
                    </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">DBG Log IP Address</label>
                         <div class="form control">
                         <input id="getCurrViewgenDBGIPTXT" placeholder="DBG Log IP Address" class="outerInputCss" disabled v-model="getCurrViewdbglogIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <!-- Address -->
                  <h6 class="heading-small text-header-color mb-2">ETHERNET</h6>
                  <div class="pl-lg-1">
                   <div class="row">
                      <div class="col-lg-6 text-left">
                    <h5>Ethernet 1 Configuration :</h5>
                      </div>
                      <div class="col-lg-6 text-right">
                     <input type="radio" name="getCurrViewnetworkbutton" id="getCurrViewmetnetradioBTN" v-model="getCurrViewnetworkbtnTXT" value="Meter Network" disabled/><label for="getCurrViewmetnetradioBTN"><b>Meter Network</b></label>&nbsp;&nbsp;
                    <input type="radio" name="getCurrViewnetworkbutton"  id="getCurrViewcdsnetradioBTN" v-model="getCurrViewnetworkbtnTXT" checked ="checked" value="CDCS Network" disabled/><label for = "getCurrViewcdsnetradioBTN"><b>CDCS Network</b></label>
                      </div>
                     </div>
                    <div class="row">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="getCurrViewgenLANcurrentIPTXT" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="getCurrViewipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANnewIPTXT" placeholder="IP Address" class="outerInputCss" disabled v-model="getCurrViewnewipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANSubnetIPTXT" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="getCurrViewsubnetmaskTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANGatewayIPTXT" placeholder="Gateway" class="outerInputCss" disabled v-model="getCurrViewgateTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                     <h5 v-if="getCurrViewgetGenEthNumPort != null && getCurrViewgetGenEthNumPort == '4' || getCurrViewgetGenEthNumPort != null && getCurrViewgetGenEthNumPort == '2'">Ethernet 2  Configuration :</h5>
                     <div class="row"  v-if="getCurrViewgetGenEthNumPort != null && getCurrViewgetGenEthNumPort ==  '4' || getCurrViewgetGenEthNumPort != null && getCurrViewgetGenEthNumPort == '2'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="getCurrViewgenLANcurrentIPTXT2" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="getCurrViewipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                                                  />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANnewIPTXT2" placeholder="IP Address" class="outerInputCss" disabled v-model="getCurrViewnewipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANSubnetIPTXT2" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="getCurrViewsubnetmaskTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANGatewayIPTXT2" placeholder="Gateway" class="outerInputCss" disabled v-model="getCurrViewgateTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                     <h5 v-if="getCurrViewgetGenEthNumPort != null && getCurrViewgetGenEthNumPort == '4'">Ethernet 3 Configuration :</h5>
                     <div class="row"  v-if="getCurrViewgetGenEthNumPort != null && getCurrViewgetGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="getCurrViewgenLANcurrentIPTXT3" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="getCurrViewipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                                                  />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANnewIPTXT3" placeholder="IP Address" class="outerInputCss" disabled v-model="getCurrViewnewipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANSubnetIPTXT3" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="getCurrViewsubnetmaskTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANGatewayIPTXT3" placeholder="Gateway" class="outerInputCss" disabled v-model="getCurrViewgateTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="getCurrViewgetGenEthNumPort != null && getCurrViewgetGenEthNumPort == '4'">Ethernet 4 Configuration :</h5>
                     <div class="row"  v-if="getCurrViewgetGenEthNumPort != null && getCurrViewgetGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="getCurrViewgenLANcurrentIPTXT4" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="getCurrViewipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANnewIPTXT4" placeholder="IP Address" class="outerInputCss" disabled v-model="getCurrViewnewipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANSubnetIPTXT4" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="getCurrViewsubnetmaskTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="getCurrViewgenLANGatewayIPTXT4" placeholder="Gateway" class="outerInputCss" disabled v-model="getCurrViewgateTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

               <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false"/>
               <div v-show="false">
                <div class="row">
                  <div class="col-lg-2">
                  <h6 class="heading-small text-header-color mb-2">Serial Port</h6>
                   </div>
                    <div class="col-lg-2">
                           <p>No of serials :</p>
                    </div>
                    <div class="col-lg-2">
                    <select id="getCurrViewgenno_serialDropTXT"  v-model="getCurrViewno_serialDropTXT" disabled style="margin-left: -95px;height:30px;width: 50%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option disabled value="choose no of serial" selected>choose no of serial</option>
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                              <option value="4">4</option>
                    </select>
                    </div>
                </div>
                  <div class="pl-lg-1">
                    <div id="getCurrViewserialPane1" style="margin-top: -25px;">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 1: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control"> 
                            <select id="getCurrViewgenBaudDropdown" disabled
                              v-model="getCurrViewserialBaudRateDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="getCurrViewgenDataBitsDropdown"
                              v-model="getCurrViewserialDagetCurrViewitsDropTXT1" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="getCurrViewgenStopBitsDropdown" disabled
                              v-model="getCurrViewserialStopbitsDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="getCurrViewgenParityDropdown" v-model="getCurrViewserialParityDropTXT1" disabled style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="getCurrViewgenHandshakeDropdown"
                              v-model="getCurrViewserialHandshakeDropTXT1" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="getCurrViewgenInfModeDropdown" disabled v-model="getCurrViewserialInfModeDropTXT1" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                <hr class="my-1" v-show="getCurrViewno_serialDropTXT == '2' || getCurrViewno_serialDropTXT == '4'"/>
                    <div id="getCurrViewserialPane2"  v-show="getCurrViewno_serialDropTXT == '2' || getCurrViewno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 2: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="getCurrViewgenBaudDropdown2"
                              v-model="getCurrViewserialBaudRateDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="getCurrViewgenDataBitsDropdown2"
                              v-model="getCurrViewserialDagetCurrViewitsDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="getCurrViewgenStopBitsDropdown2"
                              v-model="getCurrViewserialStopbitsDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control"> 
                      <select id="getCurrViewgenParityDropdown2" disabled v-model="getCurrViewserialParityDropTXT2" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select  id="getCurrViewgenHandshakeDropdown2" disabled
                              v-model="getCurrViewserialHandshakeDropTXT2"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="getCurrViewgenInfModeDropdown2" v-model="getCurrViewserialInfModeDropTXT2" disabled style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="getCurrViewno_serialDropTXT == '4'"/>
                   <div id="serialPane3" v-show="getCurrViewno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 3: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="getCurrViewgenBaudDropdown3"
                              v-model="getCurrViewserialBaudRateDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="getCurrViewgenDataBitsDropdown3"
                              v-model="getCurrViewserialDagetCurrViewitsDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="getCurrViewgenStopBitsDropdown3"
                              v-model="getCurrViewserialStopbitsDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="getCurrViewgenParityDropdown3" disabled v-model="getCurrViewserialParityDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="getCurrViewgenHandshakeDropdown3" disabled
                              v-model="getCurrViewserialHandshakeDropTXT3"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="getCurrViewgenInfModeDropdown3" disabled v-model="getCurrViewserialInfModeDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="getCurrViewno_serialDropTXT == '4'"/>
                   <div id="getCurrViewserialPane4" v-show="getCurrViewno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 4: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="getCurrViewgenBaudDropdown4"
                              v-model="getCurrViewserialBaudRateDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="getCurrViewgenDataBitsDropdown4" disabled
                              v-model="getCurrViewserialDagetCurrViewitsDropTXT4"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="getCurrViewgenStopBitsDropdown4"
                              v-model="getCurrViewserialStopbitsDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="getCurrViewgenParityDropdown4" disabled v-model="getCurrViewserialParityDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="getCurrViewgenHandshakeDropdown4"
                              v-model="getCurrViewserialHandshakeDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="getCurrViewgenInfModeDropdown4" disabled v-model="getCurrViewserialInfModeDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <h6 class="heading-small text-header-color mb-2">NTP</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 1: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="getCurrViewgenNTPchkbx1" disabled v-model="getCurrViewntpChekBOX1" /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                        <input id="getCurrViewgenNTPipaddTXT1"  placeholder="IP Address" class="outerInputCss"  disabled v-model="getCurrViewntpIpaddressTXT" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="getCurrViewgenNTPPortTXT1" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" disabled  maxlength="5" @keydown.space.prevent @keypress="isNumber($event)" v-model="getCurrViewntpPortNoTXT"/>
                        </div>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 2: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="getCurrViewgenNTPchkbx2" v-model="getCurrViewntpChekBOX2" disabled /> Enable
                        </label>

                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                         <input id="getCurrViewgenNTPipaddTXT2" placeholder="IP Address" @keydown.space.prevent @keypress="isNumber($event)" class="outerInputCss" v-model="getCurrViewntpIpaddressTXT2" disabled/>
                        </div>
                        </div>
                      </div>

                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="getCurrViewgenNTPPortTXT2" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" v-model="getCurrViewntpPortNoTXT2" disabled maxlength="5" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3" v-show="false">
                       <div>
                          <label class="form-control-label">TimeOffset (Hrs, Mins)</label>
                          <div class="form control">
                            <select id="getCurrViewntpTimeOffsetHrsdropdwn"
                              v-model="getCurrViewntpTimeOffsetHrsTXT" disabled  class="disable"
                              style="height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in HoursArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                            <select id="getCurrViewntpTimeOffsetSecdropdwn"
                              v-model="getCurrViewntpTimeOffsetSecTXT" disabled  class="disable"
                              style="margin-left:10px;height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in MinsArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                           </div>
                        </div>
                        </div>
                        <div class="col-lg-2" style="margin-top: -20px;">
                        <div>
                        <label class="form-control-label">Update Interval (Mins)</label>
                        <div class="form control">
                        <input id="getCurrViewgenNTPintervalTXT"  placeholder="Interval" class="outerInputCss" v-model="getCurrViewntpIntervalTXT" disabled/>
                        </div>
                        </div>
                        </div>
                        </div>

                  </div>
 <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >FTP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="getCurrViewftpEnablechekbox" v-model="getCurrViewftpEnablechekbox" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IP Address : </span>
                       <input id="getCurrViewftpIpaddTXT" class="inputTEXTcss" placeholder="IP Address" v-model="getCurrViewftpIpaddTXT" maxlength="32" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number : </span>
                       <input id="getCurrViewftpprtnoTXT" class="inputTEXTcss" placeholder="Port Number" v-model="getCurrViewftpprtnoTXT" maxlength="5" @keydown.space.prevent disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">User Name : </span>
                       <input id="getCurrViewftpusernameTXT" class="inputTEXTcss" placeholder="User Name" v-model="getCurrViewftpusernameTXT" maxlength="10" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Password : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                       <input id="getCurrViewftppasswordTXT" class="inputTEXTcss" placeholder="Password" v-model="getCurrViewftppasswordTXT" maxlength="32" @keydown.space.prevent  disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Directory : </span>
                       <input id="getCurrViewftpdirTXT" class="inputTEXTcss" placeholder="Directory" v-model="getCurrViewftpdirTXT" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Time Interval(mins) : </span>
                       <select class="inputTEXTcss"  name="getCurrViewftpTimeInt" id="getCurrViewftpTimeInt" v-model="getCurrViewftptimeoutTXT" disabled>
																<!-- <option value='5' selected>5</option> -->
																<option value='15' selected>15</option>
																<option value='30'>30</option>
																<option value='60'>60</option>
															</select>
              </div>
              </div>
 </div>
<hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >IEC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="getCurrViewiec104Enablechekbox" v-model="getCurrViewiec104Enablechekbox" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Station Address : </span>
                       <input id="getCurrViewiecStationTXT" class="inputTEXTcss" placeholder="Station Address" v-model="getCurrViewiecStationTXT" maxlength="32" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number :</span>
                       <input id="getCurrViewiecportTXT" class="inputTEXTcss" placeholder="Port Number" v-model="getCurrViewiecportTXT" @keydown.space.prevent @keypress="isNumber($event)" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Cyclic Int(in Sec) : </span>
                       <input id="getCurrViewiecCylicTXT" class="inputTEXTcss" placeholder="Cyclic Int(in Sec)" v-model="getCurrViewiecCylicTXT"  @keypress="isNumber($event)" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Start IOA Addr : </span>
                       <input id="getCurrViewstartIOAaddTXT" class="inputTEXTcss" placeholder="Start IOA Addr" v-model="getCurrViewstartIOAaddTXT"  @keypress="isNumber($event)" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">COT Size : </span>
                       <select id="getCurrViewiecCodsizedwnTXT" v-model="getCurrViewiecCodsizedwnTXT" class="inputTEXTcss" disabled>
                              <option value="Choose COT Size" selected disabled>Choose COT Size</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                      </select>
              </div>
             <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IOA : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <select id="getCurrViewiecIOAsizedwnTXT" v-model="getCurrViewiecIOAsizedwnTXT" class="inputTEXTcss" disabled>
                              <option value="Choose IOA Size" selected disabled>Choose IOA Size</option>
                              <option value="3">3</option>
                              <option value="2">2</option>
                      </select>
              </div>
              </div>
</div>
                <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >Allowed Master&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="getCurrViewgenallowcommonchkbx" v-model="getCurrViewgenallowcommonchkbx" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="getCurrViewgenallow1chkbx" v-model="getCurrViewgenallow1chkbx" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="getCurrViewgenallow1IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="getCurrViewgenallow1IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="getCurrViewgenallow2chkbx" v-model="getCurrViewgenallow2chkbx" :disabled="!getCurrViewgenallowcommonchkbx"/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="getCurrViewgenallow2IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="getCurrViewgenallow2IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="getCurrViewgenallow3chkbx" v-model="getCurrViewgenallow3chkbx" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="getCurrViewgenallow3IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="getCurrViewgenallow3IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="getCurrViewgenallow4chkbx" v-model="getCurrViewgenallow4chkbx" disabled /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="getCurrViewgenallow4IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="getCurrViewgenallow4IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
 </div>
</div>

                  <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false" >MQTT</h6>
                  <div class="pl-lg-1" v-show="false" >
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Broker IP</label>
                        <div class="form control">
                        <input id="getCurrViewgenMQTTbrokerIPTXT" disabled @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a Broker IP" class="outerInputCss" v-model="getCurrViewmqttBrokerTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Port No</label>
                        <div class="form control">
                        <input id="getCurrViewgenMQTTPortTXT" disabled placeholder="Port No" class="outerInputCss" title="Range(1-65535)" @keydown.space.prevent  @keypress="isNumber($event)" @input="filterInput2($event)" maxlength="5" v-model="getCurrViewmqttPortNoTXT1"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Username</label>
                        <div class="form control">
                        <input id="getCurrViewgenMQTTusernameTXT" placeholder="Username" maxlength="32" class="outerInputCss" v-model="getCurrViewmqttUsernameTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                         <div>
                        <label class="form-control-label">Password</label>
                        <div class="form control">
                        <input id="getCurrViewgenMQTTpasswdTXT" :type="getCurrViewtypevalue1" placeholder="Password" maxlength="32" class="outerInputCss" v-model="getCurrViewmqttPasswodTXT" disabled/>
                        <img id="getCurrViewmqttcnpasswdimg1" :src="getCurrViewimgvalue1" class="eyeimg" title="show password" @click="getCurrViewshowPassword1()">
                        </div>
                        </div>   
                      </div>
                    </div>
                    <div class="row"> 
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Publish Topic</label>
                        <div class="form control">
                        <input id="getCurrViewgenMQTTPublishtocTXT" placeholder=" Publish Topic" class="outerInputCss" v-model="getCurrViewmqttPublicTopicTXT" disabled/>
                        </div>
                        </div>                          
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Publish Interval (Hrs, Mins, Secs)</label>
                          <div class="form control">
                              <select id="getCurrViewgenmqttHrsdropDwn"
                              v-model="getCurrViewmqttHrsTXT"   class="disable" disabled
                              style="height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item1 in Hours24Array" v-bind:value="item1" v-bind:key="item1" >{{ item1 }}</option>
                            </select> 

                            <select id="getCurrViewgenmqttMinsdropDwn" disabled
                              v-model="getCurrViewmqttMinsTXT"   class="disable"
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item2 in Mins5Array" v-bind:value="item2" v-bind:key="item2" >{{ item2 }}</option>
                            </select>   

                               <select id="getCurrViewgenmqttSecsdropDwn"
                              v-model="getCurrViewmqttSecsTXT"  class="disable" disabled
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item3 in SecondsArray" v-bind:value="item3" v-bind:key="item3" >{{ item3 }}</option>
                            </select> 
                           
                          </div>
                        </div>
                      </div>                     
                    </div>
                    <div class="row">
                    
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Events : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="getCurrViewmqttEnableEventsChkBOX" id="getCurrViewgenmqttEventschkbox" disabled/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Events Topic</label>
                        <div class="form control">
                        <input id="getCurrViewgenmqttEventstocTXT" placeholder="Events Topic" class="outerInputCss" disabled v-model="getCurrViewmqttEventsTopicTXT"/>
                        </div>
                        </div>
                      </div>
                     <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="getCurrViewmqttEnablePingChkBOX" id="getCurrViewgenmqttPingchkbox" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Diag Topic</label>
                        <div class="form control">
                         <input id="getCurrViewgenmqttDiagtocTXT" placeholder="Diag Topic"  disabled class="outerInputCss" v-model="getCurrViewmqttDiagTXT"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="my-1" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false">Modem</h6>
                  <div class="pl-lg-1" v-show="false">
                    <div class="row">
                       <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Modem : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="getCurrViewenableModemChkBox" id="getCurrViewgenmodemChkbox" disabled/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-2">
                        <div>
                          <label class="form-control-label">Connection Type</label>
                          <div class="form control">

                        <select id="getCurrViewgenmodemConnectionDropwn"
                              v-model="getCurrViewmodmConnectionTypeTXT" class="disable" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Connection</option>
                              <option value="LAN_TYPE">LAN_TYPE</option>
                              <option value="3G_TYPE">3G_TYPE</option>
                              <option value="CDMA_TYPE">CDMA_TYPE</option>
                              <option value="2G_TYPE">2G_TYPE</option>
                              <option value="4G_TYPE">4G_TYPE</option>
                              <option value="5G_TYPE">5G_TYPE</option>
                            
                            </select>
 </div> </div>

                      </div>
                      <div class="col-lg-2">
                        <input id="getCurrViewgenmodemusernameTXT"
                          alternative
                          label="Username"
                          placeholder="Username" disabled
                          class="outerInputCss"
                          v-model="getCurrViewUsernameTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative  id="getCurrViewgenmodempasswordTXT"
                          label="Password"  disabled
                          placeholder="Password" :type="getCurrViewtypevalue"
                          class="outerInputCss"
                          v-model="getCurrViewPasswordTXT"
                        />
                        <img id="getCurrViewgenmodemcnpasswdimg" :src="getCurrViewimgvalue" class="eyeimg" title="show password" @click="getCurrViewshowPassword()">
                      </div>
                       <div class="col-lg-2">
                        <input 
                          alternative id="getCurrViewgenmodemPHTXT"
                          label="Phone Number (Num length 10)" disabled
                          placeholder="Phone Number" maxlength="10" @keydown.space.prevent @keypress="isNumber($event)"
                          class="outerInputCss"
                          v-model="getCurrViewmodemPhNumTXT"
                        />
                     
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="APN" id="getCurrViewgenmodemAPNTXT"
                          placeholder="APN" disabled
                          class="outerInputCss"
                          v-model="getCurrViewapnTXT"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="getCurrViewgenmodemPingChkBox" v-model="getCurrViewenablePinChkBox"  disabled/> Enable
                        </label>
 
                      </div>
                   
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="Ping IP" id="getCurrViewgenmodempingIpTXT"
                          placeholder="Ping IP"
                          class="outerInputCss" disabled
                          v-model="getCurrViewpingIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="getCurrViewgenmodemAttemptsTXT"
                          label="Ping Num (between 5 to 10)"
                          placeholder="Num attempts"
                          class="outerInputCss" disabled
                          v-model="getCurrViewpingNumTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="getCurrViewgenmodemPingintervalTXT"
                          label="Ping Interval (in secs)"
                          placeholder="Interval"
                          class="outerInputCss" disabled
                          v-model="getCurrViewpingTimeoutTXT"
                        />
                      </div>
                    </div>
                  </div>


                  <hr class="my-1" v-show="false"/>
                  <h6 class="heading-small text-header-color mb-2" v-show="false">VPN</h6>
                  <div class="pl-lg-1" v-show="false">
                     <div class="row">
<div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> VPN : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="getCurrViewgenVPNchkbox" v-model="getCurrViewenableVPNChkBox" disabled/> Enable
                        </label>
 
                      </div>

                      <div class="col-lg-2" >
                          <div>
                          <label class="form-control-label">Choose VPN Type</label>
                          <div class="form control">
                            <select id="getCurrViewgenVPNTypeDropwn" v-model="getCurrViewselectVpnVal" disabled class="disable" 
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0">VPN Disable</option>
                              <option value="1">VPN_IPSEC</option>
                              <option value="2">VPN_PPTP</option>
                            
                            </select>
                          </div>
                        </div>
 
                      </div>
                     </div>
                     <div style="height:10px"></div>
                      <div style="border:1px solid lightgray;padding:5px;">
                        <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_IPSEC</h5>
                    <div class="row">
                        
                   
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenVPNTunnelTXT"
                          label="Tunnel Name  (Max length 64)"
                          placeholder="Tunnel Name"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnTunnelNameTXT" maxlength="64" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnSharedKeyTXT"
                          label="Pre SharedKey (Max length 64)"
                          placeholder="Pre SharedKey"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnSharedKeyTXT" maxlength="64" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnKeyLifeTimeTXT"
                          label="KeyLifeTime (mins 1 to 10)"
                          placeholder="KeyLifeTime"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnKeyLifeTimeTXT" maxlength="2" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnRightIpTXT"
                          label="Right IP"
                          placeholder="Right IP"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnRightIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnRightSubnetTXT"
                          label="Right Subnet"
                          placeholder="Right Subnet"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnRightSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnRightIdTXT"
                          label="Right ID  (Max length 32)"
                          placeholder="Right ID"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnRightIdTXT" maxlength="32" 
                        />
                      </div>
                     
                    </div>


                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnLeftIpTXT"
                          label="Left IP"
                          placeholder="Left IP"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnLeftIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnLeftSubnetTXT"
                          label="Left Subnet"
                          placeholder="Left Subnet"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnLeftSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnLeftIdTXT"
                          label="Left ID (Max length 32)"
                          placeholder="Left ID"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnLeftIdTXT" maxlength="32" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input 
                          alternative id="getCurrViewgenvpnLefSrcIPTXT"
                          label="Left Source IP"
                          placeholder="Left Source IP"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnLefSrcIPTXT" maxlength="32" 
                        />
                      </div>
                    </div>

                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative
                          label="PFS" id="getCurrViewgenvpnPfsTXT"
                          placeholder="PFS"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnPfsTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Aggr Mode</label>
                          <div class="form control">
                            <select id="getCurrViewgenvpnAggrModeTXT"
                              v-model="getCurrViewvpnAggrModeTXT" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="1">Yes</option>
                              <option value="2">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnKeyingModeTXT"
                          label="Keying Mode (Max length 8)" 
                          placeholder="KeyingMode"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnKeyingModeTXT" maxlength="8" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnNatTravTXT"
                          label="Nat Trav" 
                          placeholder="Nat Trav"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnNatTravTXT" maxlength="2"  @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>

                    <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase1 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="getCurrViewgenvpnDhGrpTXT1"
                              v-model="getCurrViewvpnDhGrpTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select  id="getCurrViewgenvpnEncrptTXT1"
                              v-model="getCurrViewvpnEncrptTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="getCurrViewgenvpnAuthenTXT1"
                              v-model="getCurrViewvpnAuthenTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>
                     
                    </div>
<div style="height:10px;"></div>
                     <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase2 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="getCurrViewgenvpnDhGrpTXT2"
                              v-model="getCurrViewvpnDhGrpTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select id="getCurrViewgenvpnEncrptTXT2"
                              v-model="getCurrViewvpnEncrptTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="getCurrViewgenvpnAuthenTXT2"
                              v-model="getCurrViewvpnAuthenTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="height:15px;"></div>
                  </div>
                  <div style="height:10px;"></div>
                  <div style="border:1px solid lightgray;padding:5px;">
                       <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_PPTP</h5>

                <div class="row">
                <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Require Memory Map</label>
                          <div class="form control">
                            <select id="getCurrViewgenReqMmpeType" v-model="getCurrViewReqMmpeType" disabled class="disable" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                       <input id="getCurrViewgenvpnPptpconnNameTXT"
                          alternative
                          label="Connection Name"
                          placeholder="Connection Name"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnPptpconnNameTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>

                       <div class="col-lg-3">
                        <input id="getCurrViewgenvpnPptpLocalUnameTXT"
                          alternative
                          label="Local User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnPptpLocalUnameTXT" maxlength="32"
                        />
                      </div>
                     <div class="col-lg-3">
                          <input
                          alternative id="getCurrViewgenvpnPptpLocalUpassTXT"
                          label="Local Password"  :type="getCurrViewtypevalue2"
                          placeholder="Local Password" maxlength="32"
                          class="outerInputCss"
                          v-model="getCurrViewvpnPptpLocalUpassTXT" disabled
                        />
                        <img id="getCurrViewvpnpptpPasswdimg1" :src="getCurrViewimgvalue2" class="eyeimg" title="show password" >
                      </div>
                    </div>
                  <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnPptpRemoteUnameTXT"
                          label="Remote User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnPptpRemoteUnameTXT" maxlength="32"
                        />

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="getCurrViewgenvpnPptpRemoteIpTXT"
                          label="Remote IP Address"
                          placeholder="Remote IP Address"
                          class="outerInputCss" disabled
                          v-model="getCurrViewvpnPptpRemoteIpTXT" maxlength="32"  @keydown.space.prevent @keypress="isNumber($event)"
                        />

                      </div>
                      </div>
                      </div>
                      </div>
                      <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                        </div>
                      </div>
                      </div>
                      <div role="tabpanel" class="tab-pane fade" id="getDLMSConfigTabPANE">
                      <div class="row">
                      <div class="col-lg-12">
                      <p style="font-size:16px"><b>Confirm GET_DLMS_CONFIG of device - {{deviceTblDeviceName}} ?</b></p>
                      <p></p>
                      <a id="getDLMSconfigBTN" class="btn bgBtn btnPadding"  style="color:#fff;background:green;" @click="getDLMSconfigBTNFunction()">Submit Command</a>
                      </div>
                      </div>
                      <p></p>
                      <div class="row" v-show="enableGETDLMSFlag">
                        <div class="col-lg-12">
                          <span style="text-decoration: underline;"><b>{{deviceTblDeviceName}} - Ethernet Configuration :</b></span>
                        <template>
              <div class="table-responsive" id="getDLMSConfigTablePANE" style="height:500px;border:1px solid lightgray">
                <table
                  class="table table-bordered"
                  id="getDLMSConfigTableid"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th>S.No</th>
                      <th>Enable</th>
                      <th>Meter IP address</th>
                      <th>Port Number</th>
                      <th>Password</th>
                      <th>Meter Location</th>
                    </tr>
                  </thead>
                  <tbody v-if="getMeterDLMSConfigJson != ''">
                    <tr
                      v-for="(items,index) in getMeterDLMSConfigJson.dlms_details"
                      v-bind:key="index"
                    >
                      <td>{{index+1}}</td>
                      <td class="text-center" style="vertical-align: middle;" v-if="items.meter_enable == 'Yes'">Enable</td>
                      <td class="text-center" style="vertical-align: middle;" v-else>Disable</td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'tabdlmsETHipTXT'+(index+1)" :value="items.meter_ip" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'tabdlmsETHportTXT'+(index+1)" :value="items.meter_port" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="password" class="inputTEXTcss center-block text-center" :id="'tabdlmsETHpassTXT'+(index+1)" :value="items.meter_pass" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'tabdlmsETHlocTXT'+(index+1)" :value="items.meter_location" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="getMeterDLMSConfigJson == ''" style="text-align:center;width: 100%;">
                      <span>no record found</span>
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
          </div>
          <!--Footer-->
          
          </div>
          </modal>
  <!-- Device config/get  END -->

      <!-- View prev / curr START* -->

      <modal id="viewPrevCurrNewConfigPopup" name="viewPrevCurrNewConfigPopup" transition="nice-modal-fade" classes="demo-modal-class"  :min-width="300" :min-height="200" :pivot-y="1.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true" style="z-index:1111 !important;"
        width="60%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-9" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> <b>{{deviceTblDeviceName}} </b> - Configurations </h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="closeviewPrevCurrConfigBTN1Popup" type="button" class="btn btn-default" @click="closeviewPrevCurrNewConfigPopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div>
        <div class="tab" role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist" style="font-size:12px">
                      <li role="presentation" class="active" id="viewPreviousconfigurationTab"  v-show="viewPreviousConfigFlag">
                        <a
                          href="#viewPreviousconfigurationTabPANE"
                          id="viewPreviousconfigurationTabPANEID"
                          aria-controls="Previous"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewPreviousconfigurationTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; Previous Configuration
                        </a>
                      </li>
                      <li role="dcuviewTab" id="viewCurrentconfigurationTab" v-show="viewCurrentConfigFlag">
                        <a href="#viewCurrentconfigurationTabPANE"
                          id="viewCurrentconfigurationTabPANEID"
                          aria-controls="Current"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewCurrentconfigurationTabPANEMethod"
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i> &nbsp;&nbsp; Current Configuration
                        </a>
                      </li>
                      <li role="dcuviewTab" id="viewNewconfigurationTab" v-show="viewNewConfigFlag">
                        <a href="#viewNewconfigurationTabPANE"
                          id="viewNewconfigurationTabPANEID"
                          aria-controls="new"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewNewconfigurationTabPANEMethod"
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i> &nbsp;&nbsp; New Configuration
                        </a>
                      </li>
                      </ul>
                       <div class="tab-content" style="margin:1px;padding:5px;border: 2px solid lavender;">
                      <div role="tabpanel" class="tab-pane fade in active show" id="viewPreviousconfigurationTabPANE">
                        <p><b>{{devicesummarypopupTITLE}}  : </b></p>
                         <div class="tab" role="tabpanel">
                    <ul class="nav nav-tabs" role="tablist"  style="font-size:12px">
                      <li role="presentation" class="active" id="viewPrevGENTab">
                        <a
                          href="#viewPrevGENTabPANE"
                          id="viewPrevGENTabPANEID"
                          aria-controls="General Configuration"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewPrevGENTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; General Configuration
                        </a>
                      </li>
                      <li role="dcuviewTab" id="viewPrevDLMSTab">
                        <a href="#viewPrevDLMSTabPANE"
                          id="viewPrevDLMSTabPANEID"
                          aria-controls="DLMS"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewPrevDLMSTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; Ethernet Configuration
                        </a>
                      </li>
                      </ul>
                    <div class="tab-content" slot="border: 1px solid lightgray;margin: 1px;padding: 5px;">
                      <div role="tabpanel" class="tab-pane fade in active show" id="viewPrevGENTabPANE">
                        <div class="row">
                  <div class="col-md-12">
                 <div class="col-xl-12 order-xl-1">
                 <h6 class="heading-small text-header-color mb-2">GENERAL</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label" >DCU ID</label>
                        <div class="form control">
                        <input id="tabgenGatewayTXT"  @keydown.space.prevent disabled  @keypress="isNumber($event)" placeholder="Gateway ID" class="outerInputCss" v-model="tabgatewayTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Location (Max length 64)</label>
                        <div class="form control">
                        <input id="tabgenlocationTXT" placeholder="Location" class="outerInputCss" disabled v-model="tablocationTXT" maxlength="64"/>
                        </div>
                        </div>
                      </div>
                    <div class="col-lg-3" style="margin-top:20px;">
                       <label class="form-control-label">Enable DBG Log : </label>
                        <label style="margin-left:10px;margin-bottom:0px;">
                        <input type="checkbox" id="tabgenDBGChkbox" v-model="tabenabledbglogChkBox" disabled style="margin-top:10px;"/> Enable
                        </label>
                    </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">DBG Log IP Address</label>
                         <div class="form control">
                         <input id="tabgenDBGIPTXT" placeholder="DBG Log IP Address" class="outerInputCss" disabled v-model="tabdbglogIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <!-- Address -->
                  <h6 class="heading-small text-header-color mb-2">ETHERNET</h6>
                  <div class="pl-lg-1">
                   <div class="row">
                      <div class="col-lg-6 text-left">
                    <h5>Ethernet 1 Configuration :</h5>
                      </div>
                      <div class="col-lg-6 text-right">
                     <input type="radio" name="tabnetworkbutton" id="tabmetnetradioBTN" v-model="tabnetworkbtnTXT" value="Meter Network" disabled/><label for="tabmetnetradioBTN"><b>Meter Network</b></label>&nbsp;&nbsp;
                    <input type="radio" name="tabnetworkbutton"  id="tabcdsnetradioBTN" v-model="tabnetworkbtnTXT" checked ="checked" value="CDCS Network" disabled/><label for = "tabcdsnetradioBTN"><b>CDCS Network</b></label>
                      </div>
                     </div>
                    <div class="row">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="tabgenLANcurrentIPTXT" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="tabipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="tabgenLANnewIPTXT" placeholder="IP Address" class="outerInputCss" disabled v-model="tabnewipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="tabgenLANSubnetIPTXT" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="tabsubnetmaskTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="tabgenLANGatewayIPTXT" placeholder="Gateway" class="outerInputCss" disabled v-model="tabgateTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="tabgetGenEthNumPort != null && tabgetGenEthNumPort == '4' || tabgetGenEthNumPort != null && tabgetGenEthNumPort == '2'">Ethernet 2  Configuration :</h5>
                     <div class="row"  v-if="tabgetGenEthNumPort != null && tabgetGenEthNumPort ==  '4' || tabgetGenEthNumPort != null && tabgetGenEthNumPort == '2'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="tabgenLANcurrentIPTXT2" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="tabipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                                                  />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="tabgenLANnewIPTXT2" placeholder="IP Address" class="outerInputCss" disabled v-model="tabnewipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="tabgenLANSubnetIPTXT2" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="tabsubnetmaskTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="tabgenLANGatewayIPTXT2" placeholder="Gateway" class="outerInputCss" disabled v-model="tabgateTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="tabgetGenEthNumPort != null && tabgetGenEthNumPort == '4'">Ethernet 3 Configuration :</h5>
                     <div class="row"  v-if="tabgetGenEthNumPort != null && tabgetGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="tabgenLANcurrentIPTXT3" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="tabipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="tabgenLANnewIPTXT3" placeholder="IP Address" class="outerInputCss" disabled v-model="tabnewipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="tabgenLANSubnetIPTXT3" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="tabsubnetmaskTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="tabgenLANGatewayIPTXT3" placeholder="Gateway" class="outerInputCss" disabled v-model="tabgateTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="tabgetGenEthNumPort != null && tabgetGenEthNumPort == '4'">Ethernet 4 Configuration :</h5>
                     <div class="row"  v-if="tabgetGenEthNumPort != null && tabgetGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="tabgenLANcurrentIPTXT4" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="tabipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="tabgenLANnewIPTXT4" placeholder="IP Address" class="outerInputCss" disabled v-model="tabnewipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="tabgenLANSubnetIPTXT4" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="tabsubnetmaskTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="tabgenLANGatewayIPTXT4" placeholder="Gateway" class="outerInputCss" disabled v-model="tabgateTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

               <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false"/>
               <div v-show="false">
                <div class="row">
                  <div class="col-lg-2">
                  <h6 class="heading-small text-header-color mb-2">Serial Port</h6>
                   </div>
                    <div class="col-lg-2">
                           <p>No of serials :</p>
                    </div>
                    <div class="col-lg-2">
                    <select id="tabgenno_serialDropTXT"  v-model="tabno_serialDropTXT" disabled style="margin-left: -95px;height:30px;width: 50%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option disabled value="choose no of serial" selected>choose no of serial</option>
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                              <option value="4">4</option>
                    </select>
                    </div>
                </div>
                  <div class="pl-lg-1">
                    <div id="tabserialPane1" style="margin-top: -25px;">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 1: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control"> 
                            <select id="tabgenBaudDropdown" disabled
                              v-model="tabserialBaudRateDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="tabgenDataBitsDropdown"
                              v-model="tabserialDatabitsDropTXT1" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="tabgenStopBitsDropdown" disabled
                              v-model="tabserialStopbitsDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="tabgenParityDropdown" v-model="tabserialParityDropTXT1" disabled style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="tabgenHandshakeDropdown"
                              v-model="tabserialHandshakeDropTXT1" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="tabgenInfModeDropdown" disabled v-model="tabserialInfModeDropTXT1" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                <hr class="my-1" v-show="tabno_serialDropTXT == '2' || tabno_serialDropTXT == '4'"/>
                    <div id="tabserialPane2"  v-show="tabno_serialDropTXT == '2' || tabno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 2: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="tabgenBaudDropdown2"
                              v-model="tabserialBaudRateDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="tabgenDataBitsDropdown2"
                              v-model="tabserialDatabitsDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="tabgenStopBitsDropdown2"
                              v-model="tabserialStopbitsDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control"> 
                      <select id="tabgenParityDropdown2" disabled v-model="tabserialParityDropTXT2" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select  id="tabgenHandshakeDropdown2" disabled
                              v-model="tabserialHandshakeDropTXT2"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="tabgenInfModeDropdown2" v-model="tabserialInfModeDropTXT2" disabled style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="tabno_serialDropTXT == '4'"/>
                   <div id="serialPane3" v-show="tabno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 3: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="tabgenBaudDropdown3"
                              v-model="tabserialBaudRateDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="tabgenDataBitsDropdown3"
                              v-model="tabserialDatabitsDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="tabgenStopBitsDropdown3"
                              v-model="tabserialStopbitsDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="tabgenParityDropdown3" disabled v-model="tabserialParityDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="tabgenHandshakeDropdown3" disabled
                              v-model="tabserialHandshakeDropTXT3"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="tabgenInfModeDropdown3" disabled v-model="tabserialInfModeDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="tabno_serialDropTXT == '4'"/>
                   <div id="tabserialPane4" v-show="tabno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 4: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="tabgenBaudDropdown4"
                              v-model="tabserialBaudRateDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="tabgenDataBitsDropdown4" disabled
                              v-model="tabserialDatabitsDropTXT4"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="tabgenStopBitsDropdown4"
                              v-model="tabserialStopbitsDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="tabgenParityDropdown4" disabled v-model="tabserialParityDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="tabgenHandshakeDropdown4"
                              v-model="tabserialHandshakeDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="tabgenInfModeDropdown4" disabled v-model="tabserialInfModeDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <h6 class="heading-small text-header-color mb-2">NTP</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 1: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="tabgenNTPchkbx1" disabled v-model="tabntpChekBOX1" /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                        <input id="tabgenNTPipaddTXT1"  placeholder="IP Address" class="outerInputCss"  disabled v-model="tabntpIpaddressTXT" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="tabgenNTPPortTXT1" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" disabled  maxlength="5" @keydown.space.prevent @keypress="isNumber($event)" v-model="tabntpPortNoTXT"/>
                        </div>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 2: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="tabgenNTPchkbx2" v-model="tabntpChekBOX2" disabled /> Enable
                        </label>

                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                         <input id="tabgenNTPipaddTXT2" placeholder="IP Address" @keydown.space.prevent @keypress="isNumber($event)" class="outerInputCss" v-model="tabntpIpaddressTXT2" disabled/>
                        </div>
                        </div>
                      </div>

                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="tabgenNTPPortTXT2" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" v-model="tabntpPortNoTXT2" disabled maxlength="5" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3" v-show="false">
                       <div>
                          <label class="form-control-label">TimeOffset (Hrs, Mins)</label>
                          <div class="form control">
                            <select id="tabntpTimeOffsetHrsdropdwn"
                              v-model="tabntpTimeOffsetHrsTXT" disabled  class="disable"
                              style="height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in HoursArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                            <select id="tabntpTimeOffsetSecdropdwn"
                              v-model="tabntpTimeOffsetSecTXT" disabled  class="disable"
                              style="margin-left:10px;height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in MinsArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                           </div>
                        </div>
                        </div>
                        <div class="col-lg-2" style="margin-top: -20px;">
                        <div>
                        <label class="form-control-label">Update Interval (Mins)</label>
                        <div class="form control">
                        <input id="tabgenNTPintervalTXT"  placeholder="Interval" class="outerInputCss" v-model="tabntpIntervalTXT" disabled/>
                        </div>
                        </div>
                        </div>
                        </div>

                  </div>
 <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >FTP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="tabftpEnablechekbox" v-model="tabftpEnablechekbox" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IP Address : </span>
                       <input id="tabftpIpaddTXT" class="inputTEXTcss" placeholder="IP Address" v-model="tabftpIpaddTXT" maxlength="32" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number : </span>
                       <input id="tabftpprtnoTXT" class="inputTEXTcss" placeholder="Port Number" v-model="tabftpprtnoTXT" maxlength="5" @keydown.space.prevent disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">User Name : </span>
                       <input id="tabftpusernameTXT" class="inputTEXTcss" placeholder="User Name" v-model="tabftpusernameTXT" maxlength="10" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Password : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                       <input id="tabftppasswordTXT" class="inputTEXTcss" placeholder="Password" v-model="tabftppasswordTXT" maxlength="32" @keydown.space.prevent  disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Directory : </span>
                       <input id="tabftpdirTXT" class="inputTEXTcss" placeholder="Directory" v-model="tabftpdirTXT" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Time Interval(mins) : </span>
                       <select class="inputTEXTcss"  name="tabftpTimeInt" id="tabftpTimeInt" v-model="tabftptimeoutTXT" disabled>
																<!-- <option value='5' selected>5</option> -->
																<option value='15' selected>15</option>
																<option value='30'>30</option>
																<option value='60'>60</option>
															</select>
              </div>
              </div>
 </div>
<hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >IEC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="tabiec104Enablechekbox" v-model="tabiec104Enablechekbox" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Station Address : </span>
                       <input id="tabiecStationTXT" class="inputTEXTcss" placeholder="Station Address" v-model="tabiecStationTXT" maxlength="32" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number :</span>
                       <input id="tabiecportTXT" class="inputTEXTcss" placeholder="Port Number" v-model="tabiecportTXT" @keydown.space.prevent @keypress="isNumber($event)" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Cyclic Int(in Sec) : </span>
                       <input id="tabiecCylicTXT" class="inputTEXTcss" placeholder="Cyclic Int(in Sec)" v-model="tabiecCylicTXT"  @keypress="isNumber($event)" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Start IOA Addr : </span>
                       <input id="tabstartIOAaddTXT" class="inputTEXTcss" placeholder="Start IOA Addr" v-model="tabstartIOAaddTXT"  @keypress="isNumber($event)" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">COT Size : </span>
                       <select id="tabiecCodsizedwnTXT" v-model="tabiecCodsizedwnTXT" class="inputTEXTcss" disabled>
                              <option value="Choose COT Size" selected disabled>Choose COT Size</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                      </select>
              </div>
             <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IOA : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <select id="tabiecIOAsizedwnTXT" v-model="tabiecIOAsizedwnTXT" class="inputTEXTcss" disabled>
                              <option value="Choose IOA Size" selected disabled>Choose IOA Size</option>
                              <option value="3">3</option>
                              <option value="2">2</option>
                      </select>
              </div>
              </div>
</div>
                <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >Allowed Master&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="tabgenallowcommonchkbx" v-model="tabgenallowcommonchkbx" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="tabgenallow1chkbx" v-model="tabgenallow1chkbx" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="tabgenallow1IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="tabgenallow1IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="tabgenallow2chkbx" v-model="tabgenallow2chkbx" :disabled="!tabgenallowcommonchkbx"/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="tabgenallow2IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="tabgenallow2IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="tabgenallow3chkbx" v-model="tabgenallow3chkbx" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="tabgenallow3IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="tabgenallow3IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="tabgenallow4chkbx" v-model="tabgenallow4chkbx" disabled /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="tabgenallow4IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="tabgenallow4IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
 </div>
</div>

 
  

                  <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false" >MQTT</h6>
                  <div class="pl-lg-1" v-show="false" >
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Broker IP</label>
                        <div class="form control">
                        <input id="tabgenMQTTbrokerIPTXT" disabled @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a Broker IP" class="outerInputCss" v-model="tabmqttBrokerTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Port No</label>
                        <div class="form control">
                        <input id="tabgenMQTTPortTXT" disabled placeholder="Port No" class="outerInputCss" title="Range(1-65535)" @keydown.space.prevent  @keypress="isNumber($event)" @input="filterInput2($event)" maxlength="5" v-model="tabmqttPortNoTXT1"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Username</label>
                        <div class="form control">
                        <input id="tabgenMQTTusernameTXT" placeholder="Username" maxlength="32" class="outerInputCss" v-model="tabmqttUsernameTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                         <div>
                        <label class="form-control-label">Password</label>
                        <div class="form control">
                        <input id="tabgenMQTTpasswdTXT" :type="tabtypevalue1" placeholder="Password" maxlength="32" class="outerInputCss" v-model="tabmqttPasswodTXT" disabled/>
                        <img id="tabmqttcnpasswdimg1" :src="tabimgvalue1" class="eyeimg" title="show password" @click="tabshowPassword1()">
                        </div>
                        </div>   
                      </div>
                    </div>
                    <div class="row"> 
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Publish Topic</label>
                        <div class="form control">
                        <input id="tabgenMQTTPublishtocTXT" placeholder=" Publish Topic" class="outerInputCss" v-model="tabmqttPublicTopicTXT" disabled/>
                        </div>
                        </div>                          
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Publish Interval (Hrs, Mins, Secs)</label>
                          <div class="form control">
                              <select id="tabgenmqttHrsdropDwn"
                              v-model="tabmqttHrsTXT"   class="disable" disabled
                              style="height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item1 in Hours24Array" v-bind:value="item1" v-bind:key="item1" >{{ item1 }}</option>
                            </select> 

                            <select id="tabgenmqttMinsdropDwn" disabled
                              v-model="tabmqttMinsTXT"   class="disable"
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item2 in Mins5Array" v-bind:value="item2" v-bind:key="item2" >{{ item2 }}</option>
                            </select>   

                               <select id="tabgenmqttSecsdropDwn"
                              v-model="tabmqttSecsTXT"  class="disable" disabled
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item3 in SecondsArray" v-bind:value="item3" v-bind:key="item3" >{{ item3 }}</option>
                            </select> 
                           
                          </div>
                        </div>
                      </div>                     
                    </div>
                    <div class="row">
                    
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Events : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="tabmqttEnableEventsChkBOX" id="tabgenmqttEventschkbox" disabled/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Events Topic</label>
                        <div class="form control">
                        <input id="tabgenmqttEventstocTXT" placeholder="Events Topic" class="outerInputCss" disabled v-model="tabmqttEventsTopicTXT"/>
                        </div>
                        </div>
                      </div>
                     <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="tabmqttEnablePingChkBOX" id="tabgenmqttPingchkbox" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Diag Topic</label>
                        <div class="form control">
                         <input id="tabgenmqttDiagtocTXT" placeholder="Diag Topic"  disabled class="outerInputCss" v-model="tabmqttDiagTXT"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="my-1" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false">Modem</h6>
                  <div class="pl-lg-1" v-show="false">
                    <div class="row">
                       <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Modem : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="tabenableModemChkBox" id="tabgenmodemChkbox" disabled/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-2">
                        <div>
                          <label class="form-control-label">Connection Type</label>
                          <div class="form control">

                        <select id="tabgenmodemConnectionDropwn"
                              v-model="tabmodmConnectionTypeTXT" class="disable" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Connection</option>
                              <option value="LAN_TYPE">LAN_TYPE</option>
                              <option value="3G_TYPE">3G_TYPE</option>
                              <option value="CDMA_TYPE">CDMA_TYPE</option>
                              <option value="2G_TYPE">2G_TYPE</option>
                              <option value="4G_TYPE">4G_TYPE</option>
                              <option value="5G_TYPE">5G_TYPE</option>
                            
                            </select>
 </div> </div>

                      </div>
                      <div class="col-lg-2">
                        <input id="tabgenmodemusernameTXT"
                          alternative
                          label="Username"
                          placeholder="Username" disabled
                          class="outerInputCss"
                          v-model="tabUsernameTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative  id="tabgenmodempasswordTXT"
                          label="Password"  disabled
                          placeholder="Password" :type="tabtypevalue"
                          class="outerInputCss"
                          v-model="tabPasswordTXT"
                        />
                        <img id="tabgenmodemcnpasswdimg" :src="tabimgvalue" class="eyeimg" title="show password" @click="tabshowPassword()">
                      </div>
                       <div class="col-lg-2">
                        <input 
                          alternative id="tabgenmodemPHTXT"
                          label="Phone Number (Num length 10)" disabled
                          placeholder="Phone Number" maxlength="10" @keydown.space.prevent @keypress="isNumber($event)"
                          class="outerInputCss"
                          v-model="tabmodemPhNumTXT"
                        />
                     
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="APN" id="tabgenmodemAPNTXT"
                          placeholder="APN" disabled
                          class="outerInputCss"
                          v-model="tabapnTXT"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="tabgenmodemPingChkBox" v-model="tabenablePinChkBox"  disabled/> Enable
                        </label>
 
                      </div>
                   
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="Ping IP" id="tabgenmodempingIpTXT"
                          placeholder="Ping IP"
                          class="outerInputCss" disabled
                          v-model="tabpingIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="tabgenmodemAttemptsTXT"
                          label="Ping Num (between 5 to 10)"
                          placeholder="Num attempts"
                          class="outerInputCss" disabled
                          v-model="tabpingNumTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="tabgenmodemPingintervalTXT"
                          label="Ping Interval (in secs)"
                          placeholder="Interval"
                          class="outerInputCss" disabled
                          v-model="tabpingTimeoutTXT"
                        />
                      </div>
                    </div>
                  </div>


                  <hr class="my-1" v-show="false"/>
                  <h6 class="heading-small text-header-color mb-2" v-show="false">VPN</h6>
                  <div class="pl-lg-1" v-show="false">
                     <div class="row">
<div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> VPN : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="tabgenVPNchkbox" v-model="tabenableVPNChkBox" disabled/> Enable
                        </label>
 
                      </div>

                      <div class="col-lg-2" >
                          <div>
                          <label class="form-control-label">Choose VPN Type</label>
                          <div class="form control">
                            <select id="tabgenVPNTypeDropwn" v-model="tabselectVpnVal" disabled class="disable" 
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0">VPN Disable</option>
                              <option value="1">VPN_IPSEC</option>
                              <option value="2">VPN_PPTP</option>
                            
                            </select>
                          </div>
                        </div>
 
                      </div>
                     </div>
                     <div style="height:10px"></div>
                      <div style="border:1px solid lightgray;padding:5px;">
                        <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_IPSEC</h5>
                    <div class="row">
                        
                   
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenVPNTunnelTXT"
                          label="Tunnel Name  (Max length 64)"
                          placeholder="Tunnel Name"
                          class="outerInputCss" disabled
                          v-model="tabvpnTunnelNameTXT" maxlength="64" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnSharedKeyTXT"
                          label="Pre SharedKey (Max length 64)"
                          placeholder="Pre SharedKey"
                          class="outerInputCss" disabled
                          v-model="tabvpnSharedKeyTXT" maxlength="64" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnKeyLifeTimeTXT"
                          label="KeyLifeTime (mins 1 to 10)"
                          placeholder="KeyLifeTime"
                          class="outerInputCss" disabled
                          v-model="tabvpnKeyLifeTimeTXT" maxlength="2" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnRightIpTXT"
                          label="Right IP"
                          placeholder="Right IP"
                          class="outerInputCss" disabled
                          v-model="tabvpnRightIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnRightSubnetTXT"
                          label="Right Subnet"
                          placeholder="Right Subnet"
                          class="outerInputCss" disabled
                          v-model="tabvpnRightSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnRightIdTXT"
                          label="Right ID  (Max length 32)"
                          placeholder="Right ID"
                          class="outerInputCss" disabled
                          v-model="tabvpnRightIdTXT" maxlength="32" 
                        />
                      </div>
                     
                    </div>


                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnLeftIpTXT"
                          label="Left IP"
                          placeholder="Left IP"
                          class="outerInputCss" disabled
                          v-model="tabvpnLeftIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnLeftSubnetTXT"
                          label="Left Subnet"
                          placeholder="Left Subnet"
                          class="outerInputCss" disabled
                          v-model="tabvpnLeftSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnLeftIdTXT"
                          label="Left ID (Max length 32)"
                          placeholder="Left ID"
                          class="outerInputCss" disabled
                          v-model="tabvpnLeftIdTXT" maxlength="32" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input 
                          alternative id="tabgenvpnLefSrcIPTXT"
                          label="Left Source IP"
                          placeholder="Left Source IP"
                          class="outerInputCss" disabled
                          v-model="tabvpnLefSrcIPTXT" maxlength="32" 
                        />
                      </div>
                    </div>

                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative
                          label="PFS" id="tabgenvpnPfsTXT"
                          placeholder="PFS"
                          class="outerInputCss" disabled
                          v-model="tabvpnPfsTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Aggr Mode</label>
                          <div class="form control">
                            <select id="tabgenvpnAggrModeTXT"
                              v-model="tabvpnAggrModeTXT" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="1">Yes</option>
                              <option value="2">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnKeyingModeTXT"
                          label="Keying Mode (Max length 8)" 
                          placeholder="KeyingMode"
                          class="outerInputCss" disabled
                          v-model="tabvpnKeyingModeTXT" maxlength="8" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnNatTravTXT"
                          label="Nat Trav" 
                          placeholder="Nat Trav"
                          class="outerInputCss" disabled
                          v-model="tabvpnNatTravTXT" maxlength="2"  @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>

                    <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase1 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="tabgenvpnDhGrpTXT1"
                              v-model="tabvpnDhGrpTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select  id="tabgenvpnEncrptTXT1"
                              v-model="tabvpnEncrptTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="tabgenvpnAuthenTXT1"
                              v-model="tabvpnAuthenTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>
                     
                    </div>
<div style="height:10px;"></div>
                     <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase2 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="tabgenvpnDhGrpTXT2"
                              v-model="tabvpnDhGrpTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select id="tabgenvpnEncrptTXT2"
                              v-model="tabvpnEncrptTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="tabgenvpnAuthenTXT2"
                              v-model="tabvpnAuthenTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="height:15px;"></div>
                  </div>
                  <div style="height:10px;"></div>
                  <div style="border:1px solid lightgray;padding:5px;">
                       <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_PPTP</h5>

                <div class="row">
                <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Require Memory Map</label>
                          <div class="form control">
                            <select id="tabgenReqMmpeType" v-model="tabReqMmpeType" disabled class="disable" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                       <input id="tabgenvpnPptpconnNameTXT"
                          alternative
                          label="Connection Name"
                          placeholder="Connection Name"
                          class="outerInputCss" disabled
                          v-model="tabvpnPptpconnNameTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>

                       <div class="col-lg-3">
                        <input id="tabgenvpnPptpLocalUnameTXT"
                          alternative
                          label="Local User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" disabled
                          v-model="tabvpnPptpLocalUnameTXT" maxlength="32" 
                        />
                      </div>
                     <div class="col-lg-3">
                          <input
                          alternative id="tabgenvpnPptpLocalUpassTXT"
                          label="Local Password"  :type="tabtypevalue2"
                          placeholder="Local Password" maxlength="32"
                          class="outerInputCss"
                          v-model="tabvpnPptpLocalUpassTXT" disabled
                        />
                        <img id="tabvpnpptpPasswdimg1" :src="tabimgvalue2" class="eyeimg" title="show password" >
                      </div>
                    </div>
                  <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnPptpRemoteUnameTXT"
                          label="Remote User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" disabled
                          v-model="tabvpnPptpRemoteUnameTXT" maxlength="32"
                        />

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="tabgenvpnPptpRemoteIpTXT"
                          label="Remote IP Address"
                          placeholder="Remote IP Address"
                          class="outerInputCss" disabled
                          v-model="tabvpnPptpRemoteIpTXT" maxlength="32"  @keydown.space.prevent @keypress="isNumber($event)"
                        />

                      </div>
                      </div>
                      </div>
                      </div>
                      <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
            </div>
                            </div>
                            </div>
                      </div>
                       <div role="tabpanel" class="tab-pane fade" id="viewPrevDLMSTabPANE">
                            <p></p>
                              <h6 class="heading-small text-header-color mb-2">Ethernet</h6>
                        <div class="row">
                          <div class="col-md-12">
              <template>
              <div class="table-responsive" id="tabrmsDLMSConfigTablePANE" style="height:500px;border:1px solid lightgray;overflow: auto">
                <table
                  class="table table-bordered"
                  id="rmsDLMSConfigTableid"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th>S.No</th>
                      <th>Enable</th>
                      <th>Meter IP address</th>
                      <th>Port Number</th>
                      <th>Password</th>
                      <th>Meter Location</th>
                    </tr>
                  </thead>
                  <tbody v-if="tabrmsMeterDLMSConfigJson != ''">
                    <tr
                      v-for="(items,index) in tabrmsMeterDLMSConfigJson.dlms_details"
                      v-bind:key="index"
                    >
                      <td>{{index+1}}</td>
                      <td class="text-center" style="vertical-align: middle;" v-if="items.meter_enable == 'Yes'"><span :id="'tabdlmsETHEnableTXT'+(index+1)" >Enable</span></td>
                      <td class="text-center" style="vertical-align: middle;" v-else><span :id="'tabdlmsETHEnableTXT'+(index+1)" >Disable</span></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'tabdlmsETHipTXT'+(index+1)" :value="items.meter_ip" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'tabdlmsETHportTXT'+(index+1)" :value="items.meter_port" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="password" class="inputTEXTcss center-block text-center" :id="'tabdlmsETHpassTXT'+(index+1)" :value="items.meter_pass" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'tabdlmsETHlocTXT'+(index+1)" :value="items.meter_location" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="tabrmsMeterDLMSConfigJson == ''" style="text-align:center;width: 100%;">
                      <span>no record found</span>
                 </div>
              </div>
            </template>
                            </div>
                            </div>
                      </div>
                    </div>
                      </div>
                      </div>
                      <div role="tabpanel" class="tab-pane fade" id="viewCurrentconfigurationTabPANE">
                       <p><b>{{devicesummarypopupTITLE}} :</b></p>
                     <div class="tab" role="tabpanel">
                    <ul class="nav nav-tabs" role="tablist"  style="font-size:12px">
                      <li role="presentation" class="active" id="viewCurrentGENTab">
                        <a
                          href="#viewCurrentGENTabPANE"
                          id="viewCurrentGENTabPANEID"
                          aria-controls="General Configuration"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewCurrentGENTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; General Configuration
                        </a>
                      </li>
                      <li role="dcuviewTab" id="viewCurrentDLMSTab">
                        <a href="#viewCurrentDLMSTabPANE"
                          id="viewCurrentDLMSTabPANEID"
                          aria-controls="DLMS"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewCurrentDLMSTabPANEMethod">
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; Ethernet Configuration
                        </a>
                      </li>
                      </ul>
                    <div class="tab-content">
                    <div role="tabpanel" class="tab-pane fade in active show" id="viewCurrentGENTabPANE">
                    <div class="row">
                  <div class="col-md-12">
                 <div class="col-xl-12 order-xl-1">
                 <h6 class="heading-small text-header-color mb-2">GENERAL</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label" >DCU ID</label>
                        <div class="form control">
                        <input id="currentTabgenGatewayTXT"  @keydown.space.prevent disabled  @keypress="isNumber($event)" placeholder="Gateway ID" class="outerInputCss" v-model="currentTabgatewayTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Location (Max length 64)</label>
                        <div class="form control">
                        <input id="currentTabgenlocationTXT" placeholder="Location" class="outerInputCss" disabled v-model="currentTablocationTXT" maxlength="64"/>
                        </div>
                        </div>
                      </div>
                    <div class="col-lg-3" style="margin-top:20px;">
                       <label class="form-control-label">Enable DBG Log : </label>
                        <label style="margin-left:10px;margin-bottom:0px;">
                        <input type="checkbox" id="currentTabgenDBGChkbox" v-model="currentTabenabledbglogChkBox" disabled style="margin-top:10px;"/> Enable
                        </label>
                    </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">DBG Log IP Address</label>
                         <div class="form control">
                         <input id="currentTabgenDBGIPTXT" placeholder="DBG Log IP Address" class="outerInputCss" disabled v-model="currentTabdbglogIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <!-- Address -->
                  <h6 class="heading-small text-header-color mb-2">ETHERNET</h6>
                  <div class="pl-lg-1">
                   <div class="row">
                      <div class="col-lg-6 text-left">
                    <h5>Ethernet 1 Configuration :</h5>
                      </div>
                      <div class="col-lg-6 text-right">
                     <input type="radio" name="currentTabnetworkbutton" id="currentTabmetnetradioBTN" v-model="currentTabnetworkbtnTXT" value="Meter Network" disabled/><label for="currentTabmetnetradioBTN"><b>Meter Network</b></label>&nbsp;&nbsp;
                    <input type="radio" name="currentTabnetworkbutton"  id="currentTabcdsnetradioBTN" v-model="currentTabnetworkbtnTXT" checked ="checked" value="CDCS Network" disabled/><label for = "currentTabcdsnetradioBTN"><b>CDCS Network</b></label>
                      </div>
                     </div>
                    <div class="row">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="currentTabgenLANcurrentIPTXT" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="currentTabipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="currentTabgenLANnewIPTXT" placeholder="IP Address" class="outerInputCss" disabled v-model="currentTabnewipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="currentTabgenLANSubnetIPTXT" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="currentTabsubnetmaskTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="currentTabgenLANGatewayIPTXT" placeholder="Gateway" class="outerInputCss" disabled v-model="currentTabgateTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="currentTabgetGenEthNumPort != null && currentTabgetGenEthNumPort == '4' || currentTabgetGenEthNumPort != null && currentTabgetGenEthNumPort == '2'">Ethernet 2 Configuration :</h5>
                     <div class="row"  v-if="currentTabgetGenEthNumPort != null && currentTabgetGenEthNumPort ==  '4' || currentTabgetGenEthNumPort != null && currentTabgetGenEthNumPort == '2'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="currentTabgenLANcurrentIPTXT2" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="currentTabipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                                                  />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="currentTabgenLANnewIPTXT2" placeholder="IP Address" class="outerInputCss" disabled v-model="currentTabnewipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="currentTabgenLANSubnetIPTXT2" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="currentTabsubnetmaskTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="currentTabgenLANGatewayIPTXT2" placeholder="Gateway" class="outerInputCss" disabled v-model="currentTabgateTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="currentTabgetGenEthNumPort != null && currentTabgetGenEthNumPort == '4'">Ethernet 3 Configuration :</h5>
                     <div class="row"  v-if="currentTabgetGenEthNumPort != null && currentTabgetGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="currentTabgenLANcurrentIPTXT3" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="currentTabipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                                                  />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="currentTabgenLANnewIPTXT3" placeholder="IP Address" class="outerInputCss" disabled v-model="currentTabnewipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="currentTabgenLANSubnetIPTXT3" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="currentTabsubnetmaskTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="currentTabgenLANGatewayIPTXT3" placeholder="Gateway" class="outerInputCss" disabled v-model="currentTabgateTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                     <h5 v-if="currentTabgetGenEthNumPort != null && currentTabgetGenEthNumPort == '4'">Ethernet 4 Configuration :</h5>
                     <div class="row"  v-if="currentTabgetGenEthNumPort != null && currentTabgetGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="currentTabgenLANcurrentIPTXT4" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="currentTabipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="currentTabgenLANnewIPTXT4" placeholder="IP Address" class="outerInputCss" disabled v-model="currentTabnewipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="currentTabgenLANSubnetIPTXT4" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="currentTabsubnetmaskTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="currentTabgenLANGatewayIPTXT4" placeholder="Gateway" class="outerInputCss" disabled v-model="currentTabgateTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

               <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false"/>
               <div v-show="false">
                <div class="row">
                  <div class="col-lg-2">
                  <h6 class="heading-small text-header-color mb-2">Serial Port</h6>
                   </div>
                    <div class="col-lg-2">
                           <p>No of serials :</p>
                    </div>
                    <div class="col-lg-2">
                    <select id="currentTabgenno_serialDropTXT"  v-model="currentTabno_serialDropTXT" disabled style="margin-left: -95px;height:30px;width: 50%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option disabled value="choose no of serial" selected>choose no of serial</option>
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                              <option value="4">4</option>
                    </select>
                    </div>
                </div>
                  <div class="pl-lg-1">
                    <div id="currentTabserialPane1" style="margin-top: -25px;">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 1: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control"> 
                            <select id="currentTabgenBaudDropdown" disabled
                              v-model="currentTabserialBaudRateDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="currentTabgenDataBitsDropdown"
                              v-model="currentTabserialDacurrentTabitsDropTXT1" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="currentTabgenStopBitsDropdown" disabled
                              v-model="currentTabserialStopbitsDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="currentTabgenParityDropdown" v-model="currentTabserialParityDropTXT1" disabled style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="currentTabgenHandshakeDropdown"
                              v-model="currentTabserialHandshakeDropTXT1" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="currentTabgenInfModeDropdown" disabled v-model="currentTabserialInfModeDropTXT1" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                <hr class="my-1" v-show="currentTabno_serialDropTXT == '2' || currentTabno_serialDropTXT == '4'"/>
                    <div id="currentTabserialPane2"  v-show="currentTabno_serialDropTXT == '2' || currentTabno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 2: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="currentTabgenBaudDropdown2"
                              v-model="currentTabserialBaudRateDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="currentTabgenDataBitsDropdown2"
                              v-model="currentTabserialDacurrentTabitsDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="currentTabgenStopBitsDropdown2"
                              v-model="currentTabserialStopbitsDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control"> 
                      <select id="currentTabgenParityDropdown2" disabled v-model="currentTabserialParityDropTXT2" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select  id="currentTabgenHandshakeDropdown2" disabled
                              v-model="currentTabserialHandshakeDropTXT2"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="currentTabgenInfModeDropdown2" v-model="currentTabserialInfModeDropTXT2" disabled style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="currentTabno_serialDropTXT == '4'"/>
                   <div id="serialPane3" v-show="currentTabno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 3: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="currentTabgenBaudDropdown3"
                              v-model="currentTabserialBaudRateDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="currentTabgenDataBitsDropdown3"
                              v-model="currentTabserialDacurrentTabitsDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="currentTabgenStopBitsDropdown3"
                              v-model="currentTabserialStopbitsDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="currentTabgenParityDropdown3" disabled v-model="currentTabserialParityDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="currentTabgenHandshakeDropdown3" disabled
                              v-model="currentTabserialHandshakeDropTXT3"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="currentTabgenInfModeDropdown3" disabled v-model="currentTabserialInfModeDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="currentTabno_serialDropTXT == '4'"/>
                   <div id="currentTabserialPane4" v-show="currentTabno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 4: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="currentTabgenBaudDropdown4"
                              v-model="currentTabserialBaudRateDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="currentTabgenDataBitsDropdown4" disabled
                              v-model="currentTabserialDacurrentTabitsDropTXT4"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="currentTabgenStopBitsDropdown4"
                              v-model="currentTabserialStopbitsDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="currentTabgenParityDropdown4" disabled v-model="currentTabserialParityDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="currentTabgenHandshakeDropdown4"
                              v-model="currentTabserialHandshakeDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="currentTabgenInfModeDropdown4" disabled v-model="currentTabserialInfModeDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <h6 class="heading-small text-header-color mb-2">NTP</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 1: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="currentTabgenNTPchkbx1" disabled v-model="currentTabntpChekBOX1" /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                        <input id="currentTabgenNTPipaddTXT1"  placeholder="IP Address" class="outerInputCss"  disabled v-model="currentTabntpIpaddressTXT" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="currentTabgenNTPPortTXT1" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" disabled  maxlength="5" @keydown.space.prevent @keypress="isNumber($event)" v-model="currentTabntpPortNoTXT"/>
                        </div>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 2: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="currentTabgenNTPchkbx2" v-model="currentTabntpChekBOX2" disabled /> Enable
                        </label>

                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                         <input id="currentTabgenNTPipaddTXT2" placeholder="IP Address" @keydown.space.prevent @keypress="isNumber($event)" class="outerInputCss" v-model="currentTabntpIpaddressTXT2" disabled/>
                        </div>
                        </div>
                      </div>

                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="currentTabgenNTPPortTXT2" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" v-model="currentTabntpPortNoTXT2" disabled maxlength="5" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3" v-show="false">
                       <div>
                          <label class="form-control-label">TimeOffset (Hrs, Mins)</label>
                          <div class="form control">
                            <select id="currentTabntpTimeOffsetHrsdropdwn"
                              v-model="currentTabntpTimeOffsetHrsTXT" disabled  class="disable"
                              style="height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in HoursArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                            <select id="currentTabntpTimeOffsetSecdropdwn"
                              v-model="currentTabntpTimeOffsetSecTXT" disabled  class="disable"
                              style="margin-left:10px;height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in MinsArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                           </div>
                        </div>
                        </div>
                        <div class="col-lg-2" style="margin-top: -20px;">
                        <div>
                        <label class="form-control-label">Update Interval (Mins)</label>
                        <div class="form control">
                        <input id="currentTabgenNTPintervalTXT"  placeholder="Interval" class="outerInputCss" v-model="currentTabntpIntervalTXT" disabled/>
                        </div>
                        </div>
                        </div>
                        </div>

                  </div>
 <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >FTP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="currentTabftpEnablechekbox" v-model="currentTabftpEnablechekbox" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IP Address : </span>
                       <input id="currentTabftpIpaddTXT" class="inputTEXTcss" placeholder="IP Address" v-model="currentTabftpIpaddTXT" maxlength="32" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number : </span>
                       <input id="currentTabftpprtnoTXT" class="inputTEXTcss" placeholder="Port Number" v-model="currentTabftpprtnoTXT" maxlength="5" @keydown.space.prevent disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">User Name : </span>
                       <input id="currentTabftpusernameTXT" class="inputTEXTcss" placeholder="User Name" v-model="currentTabftpusernameTXT" maxlength="10" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Password : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                       <input id="currentTabftppasswordTXT" class="inputTEXTcss" placeholder="Password" v-model="currentTabftppasswordTXT" maxlength="32" @keydown.space.prevent  disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Directory : </span>
                       <input id="currentTabftpdirTXT" class="inputTEXTcss" placeholder="Directory" v-model="currentTabftpdirTXT" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Time Interval(mins) : </span>
                       <select class="inputTEXTcss"  name="currentTabftpTimeInt" id="currentTabftpTimeInt" v-model="currentTabftptimeoutTXT" disabled>
																<!-- <option value='5' selected>5</option> -->
																<option value='15' selected>15</option>
																<option value='30'>30</option>
																<option value='60'>60</option>
															</select>
              </div>
              </div>
 </div>
<hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >IEC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="currentTabiec104Enablechekbox" v-model="currentTabiec104Enablechekbox" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Station Address : </span>
                       <input id="currentTabiecStationTXT" class="inputTEXTcss" placeholder="Station Address" v-model="currentTabiecStationTXT" maxlength="32" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number :</span>
                       <input id="currentTabiecportTXT" class="inputTEXTcss" placeholder="Port Number" v-model="currentTabiecportTXT" @keydown.space.prevent @keypress="isNumber($event)" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Cyclic Int(in Sec) : </span>
                       <input id="currentTabiecCylicTXT" class="inputTEXTcss" placeholder="Cyclic Int(in Sec)" v-model="currentTabiecCylicTXT"  @keypress="isNumber($event)" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Start IOA Addr : </span>
                       <input id="currentTabstartIOAaddTXT" class="inputTEXTcss" placeholder="Start IOA Addr" v-model="currentTabstartIOAaddTXT"  @keypress="isNumber($event)" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">COT Size : </span>
                       <select id="currentTabiecCodsizedwnTXT" v-model="currentTabiecCodsizedwnTXT" class="inputTEXTcss" disabled>
                              <option value="Choose COT Size" selected disabled>Choose COT Size</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                      </select>
              </div>
             <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IOA : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <select id="currentTabiecIOAsizedwnTXT" v-model="currentTabiecIOAsizedwnTXT" class="inputTEXTcss" disabled>
                              <option value="Choose IOA Size" selected disabled>Choose IOA Size</option>
                              <option value="3">3</option>
                              <option value="2">2</option>
                      </select>
              </div>
              </div>
</div>
                <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >Allowed Master&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="currentTabgenallowcommonchkbx" v-model="currentTabgenallowcommonchkbx" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="currentTabgenallow1chkbx" v-model="currentTabgenallow1chkbx" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="currentTabgenallow1IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="currentTabgenallow1IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="currentTabgenallow2chkbx" v-model="currentTabgenallow2chkbx" :disabled="!currentTabgenallowcommonchkbx"/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="currentTabgenallow2IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="currentTabgenallow2IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="currentTabgenallow3chkbx" v-model="currentTabgenallow3chkbx" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="currentTabgenallow3IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="currentTabgenallow3IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="currentTabgenallow4chkbx" v-model="currentTabgenallow4chkbx" disabled /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="currentTabgenallow4IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="currentTabgenallow4IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
 </div>
</div>

                  <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false" >MQTT</h6>
                  <div class="pl-lg-1" v-show="false" >
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Broker IP</label>
                        <div class="form control">
                        <input id="currentTabgenMQTTbrokerIPTXT" disabled @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a Broker IP" class="outerInputCss" v-model="currentTabmqttBrokerTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Port No</label>
                        <div class="form control">
                        <input id="currentTabgenMQTTPortTXT" disabled placeholder="Port No" class="outerInputCss" title="Range(1-65535)" @keydown.space.prevent  @keypress="isNumber($event)" @input="filterInput2($event)" maxlength="5" v-model="currentTabmqttPortNoTXT1"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Username</label>
                        <div class="form control">
                        <input id="currentTabgenMQTTusernameTXT" placeholder="Username" maxlength="32" class="outerInputCss" v-model="currentTabmqttUsernameTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                         <div>
                        <label class="form-control-label">Password</label>
                        <div class="form control">
                        <input id="currentTabgenMQTTpasswdTXT" :type="currentTabtypevalue1" placeholder="Password" maxlength="32" class="outerInputCss" v-model="currentTabmqttPasswodTXT" disabled/>
                        <img id="currentTabmqttcnpasswdimg1" :src="currentTabimgvalue1" class="eyeimg" title="show password" @click="currentTabshowPassword1()">
                        </div>
                        </div>   
                      </div>
                    </div>
                    <div class="row"> 
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Publish Topic</label>
                        <div class="form control">
                        <input id="currentTabgenMQTTPublishtocTXT" placeholder=" Publish Topic" class="outerInputCss" v-model="currentTabmqttPublicTopicTXT" disabled/>
                        </div>
                        </div>                          
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Publish Interval (Hrs, Mins, Secs)</label>
                          <div class="form control">
                              <select id="currentTabgenmqttHrsdropDwn"
                              v-model="currentTabmqttHrsTXT"   class="disable" disabled
                              style="height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item1 in Hours24Array" v-bind:value="item1" v-bind:key="item1" >{{ item1 }}</option>
                            </select> 

                            <select id="currentTabgenmqttMinsdropDwn" disabled
                              v-model="currentTabmqttMinsTXT"   class="disable"
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item2 in Mins5Array" v-bind:value="item2" v-bind:key="item2" >{{ item2 }}</option>
                            </select>   

                               <select id="currentTabgenmqttSecsdropDwn"
                              v-model="currentTabmqttSecsTXT"  class="disable" disabled
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item3 in SecondsArray" v-bind:value="item3" v-bind:key="item3" >{{ item3 }}</option>
                            </select> 
                           
                          </div>
                        </div>
                      </div>                     
                    </div>
                    <div class="row">
                    
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Events : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="currentTabmqttEnableEventsChkBOX" id="currentTabgenmqttEventschkbox" disabled/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Events Topic</label>
                        <div class="form control">
                        <input id="currentTabgenmqttEventstocTXT" placeholder="Events Topic" class="outerInputCss" disabled v-model="currentTabmqttEventsTopicTXT"/>
                        </div>
                        </div>
                      </div>
                     <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="currentTabmqttEnablePingChkBOX" id="currentTabgenmqttPingchkbox" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Diag Topic</label>
                        <div class="form control">
                         <input id="currentTabgenmqttDiagtocTXT" placeholder="Diag Topic"  disabled class="outerInputCss" v-model="currentTabmqttDiagTXT"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="my-1" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false">Modem</h6>
                  <div class="pl-lg-1" v-show="false">
                    <div class="row">
                       <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Modem : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="currentTabenableModemChkBox" id="currentTabgenmodemChkbox" disabled/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-2">
                        <div>
                          <label class="form-control-label">Connection Type</label>
                          <div class="form control">

                        <select id="currentTabgenmodemConnectionDropwn"
                              v-model="currentTabmodmConnectionTypeTXT" class="disable" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Connection</option>
                              <option value="LAN_TYPE">LAN_TYPE</option>
                              <option value="3G_TYPE">3G_TYPE</option>
                              <option value="CDMA_TYPE">CDMA_TYPE</option>
                              <option value="2G_TYPE">2G_TYPE</option>
                              <option value="4G_TYPE">4G_TYPE</option>
                              <option value="5G_TYPE">5G_TYPE</option>
                            
                            </select>
 </div> </div>

                      </div>
                      <div class="col-lg-2">
                        <input id="currentTabgenmodemusernameTXT"
                          alternative
                          label="Username"
                          placeholder="Username" disabled
                          class="outerInputCss"
                          v-model="currentTabUsernameTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative  id="currentTabgenmodempasswordTXT"
                          label="Password"  disabled
                          placeholder="Password" :type="currentTabtypevalue"
                          class="outerInputCss"
                          v-model="currentTabPasswordTXT"
                        />
                        <img id="currentTabgenmodemcnpasswdimg" :src="currentTabimgvalue" class="eyeimg" title="show password" @click="currentTabshowPassword()">
                      </div>
                       <div class="col-lg-2">
                        <input 
                          alternative id="currentTabgenmodemPHTXT"
                          label="Phone Number (Num length 10)" disabled
                          placeholder="Phone Number" maxlength="10" @keydown.space.prevent @keypress="isNumber($event)"
                          class="outerInputCss"
                          v-model="currentTabmodemPhNumTXT"
                        />
                     
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="APN" id="currentTabgenmodemAPNTXT"
                          placeholder="APN" disabled
                          class="outerInputCss"
                          v-model="currentTabapnTXT"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="currentTabgenmodemPingChkBox" v-model="currentTabenablePinChkBox"  disabled/> Enable
                        </label>
 
                      </div>
                   
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="Ping IP" id="currentTabgenmodempingIpTXT"
                          placeholder="Ping IP"
                          class="outerInputCss" disabled
                          v-model="currentTabpingIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="currentTabgenmodemAttemptsTXT"
                          label="Ping Num (between 5 to 10)"
                          placeholder="Num attempts"
                          class="outerInputCss" disabled
                          v-model="currentTabpingNumTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="currentTabgenmodemPingintervalTXT"
                          label="Ping Interval (in secs)"
                          placeholder="Interval"
                          class="outerInputCss" disabled
                          v-model="currentTabpingTimeoutTXT"
                        />
                      </div>
                    </div>
                  </div>


                  <hr class="my-1" v-show="false"/>
                  <h6 class="heading-small text-header-color mb-2" v-show="false">VPN</h6>
                  <div class="pl-lg-1" v-show="false">
                     <div class="row">
<div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> VPN : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="currentTabgenVPNchkbox" v-model="currentTabenableVPNChkBox" disabled/> Enable
                        </label>
 
                      </div>

                      <div class="col-lg-2" >
                          <div>
                          <label class="form-control-label">Choose VPN Type</label>
                          <div class="form control">
                            <select id="currentTabgenVPNTypeDropwn" v-model="currentTabselectVpnVal" disabled class="disable" 
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0">VPN Disable</option>
                              <option value="1">VPN_IPSEC</option>
                              <option value="2">VPN_PPTP</option>
                            
                            </select>
                          </div>
                        </div>
 
                      </div>
                     </div>
                     <div style="height:10px"></div>
                      <div style="border:1px solid lightgray;padding:5px;">
                        <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_IPSEC</h5>
                    <div class="row">
                        
                   
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenVPNTunnelTXT"
                          label="Tunnel Name  (Max length 64)"
                          placeholder="Tunnel Name"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnTunnelNameTXT" maxlength="64" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnSharedKeyTXT"
                          label="Pre SharedKey (Max length 64)"
                          placeholder="Pre SharedKey"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnSharedKeyTXT" maxlength="64" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnKeyLifeTimeTXT"
                          label="KeyLifeTime (mins 1 to 10)"
                          placeholder="KeyLifeTime"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnKeyLifeTimeTXT" maxlength="2" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnRightIpTXT"
                          label="Right IP"
                          placeholder="Right IP"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnRightIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnRightSubnetTXT"
                          label="Right Subnet"
                          placeholder="Right Subnet"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnRightSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnRightIdTXT"
                          label="Right ID  (Max length 32)"
                          placeholder="Right ID"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnRightIdTXT" maxlength="32" 
                        />
                      </div>
                     
                    </div>


                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnLeftIpTXT"
                          label="Left IP"
                          placeholder="Left IP"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnLeftIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnLeftSubnetTXT"
                          label="Left Subnet"
                          placeholder="Left Subnet"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnLeftSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnLeftIdTXT"
                          label="Left ID (Max length 32)"
                          placeholder="Left ID"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnLeftIdTXT" maxlength="32" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input 
                          alternative id="currentTabgenvpnLefSrcIPTXT"
                          label="Left Source IP"
                          placeholder="Left Source IP"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnLefSrcIPTXT" maxlength="32" 
                        />
                      </div>
                    </div>

                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative
                          label="PFS" id="currentTabgenvpnPfsTXT"
                          placeholder="PFS"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnPfsTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Aggr Mode</label>
                          <div class="form control">
                            <select id="currentTabgenvpnAggrModeTXT"
                              v-model="currentTabvpnAggrModeTXT" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="1">Yes</option>
                              <option value="2">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnKeyingModeTXT"
                          label="Keying Mode (Max length 8)" 
                          placeholder="KeyingMode"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnKeyingModeTXT" maxlength="8" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnNatTravTXT"
                          label="Nat Trav" 
                          placeholder="Nat Trav"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnNatTravTXT" maxlength="2"  @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>

                    <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase1 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="currentTabgenvpnDhGrpTXT1"
                              v-model="currentTabvpnDhGrpTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select  id="currentTabgenvpnEncrptTXT1"
                              v-model="currentTabvpnEncrptTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="currentTabgenvpnAuthenTXT1"
                              v-model="currentTabvpnAuthenTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>
                     
                    </div>
<div style="height:10px;"></div>
                     <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase2 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="currentTabgenvpnDhGrpTXT2"
                              v-model="currentTabvpnDhGrpTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select id="currentTabgenvpnEncrptTXT2"
                              v-model="currentTabvpnEncrptTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="currentTabgenvpnAuthenTXT2"
                              v-model="currentTabvpnAuthenTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="height:15px;"></div>
                  </div>
                  <div style="height:10px;"></div>
                  <div style="border:1px solid lightgray;padding:5px;">
                       <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_PPTP</h5>

                <div class="row">
                <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Require Memory Map</label>
                          <div class="form control">
                            <select id="currentTabgenReqMmpeType" v-model="currentTabReqMmpeType" disabled class="disable" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                       <input id="currentTabgenvpnPptpconnNameTXT"
                          alternative
                          label="Connection Name"
                          placeholder="Connection Name"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnPptpconnNameTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>

                       <div class="col-lg-3">
                        <input id="currentTabgenvpnPptpLocalUnameTXT"
                          alternative
                          label="Local User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnPptpLocalUnameTXT" maxlength="32"
                        />
                      </div>
                     <div class="col-lg-3">
                          <input
                          alternative id="currentTabgenvpnPptpLocalUpassTXT"
                          label="Local Password"  :type="currentTabtypevalue2"
                          placeholder="Local Password" maxlength="32"
                          class="outerInputCss"
                          v-model="currentTabvpnPptpLocalUpassTXT" disabled
                        />
                        <img id="currentTabvpnpptpPasswdimg1" :src="currentTabimgvalue2" class="eyeimg" title="show password" >
                      </div>
                    </div>
                  <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnPptpRemoteUnameTXT"
                          label="Remote User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnPptpRemoteUnameTXT" maxlength="32"
                        />

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="currentTabgenvpnPptpRemoteIpTXT"
                          label="Remote IP Address"
                          placeholder="Remote IP Address"
                          class="outerInputCss" disabled
                          v-model="currentTabvpnPptpRemoteIpTXT" maxlength="32"  @keydown.space.prevent @keypress="isNumber($event)"
                        />

                      </div>
                      </div>
                      </div>
                      </div>
                      <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
            </div>
                            </div>
                            </div>
                      </div>
                       <div role="tabpanel" class="tab-pane fade" id="viewCurrentDLMSTabPANE">
                            <p></p>
                              <h6 class="heading-small text-header-color mb-2">Ethernet</h6>
                        <div class="row">
                          <div class="col-md-12">
              <template>
              <div class="currentTable-responsive" id="currentTabrmsDLMSConfigTablePANE" style="height:500px;border:1px solid lightgray;overflow: auto;">
                <table
                  class="table table-bordered"
                  id="rmsDLMSConfigTableid"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th>S.No</th>
                      <th>Enable</th>
                      <th>Meter IP address</th>
                      <th>Port Number</th>
                      <th>Password</th>
                      <th>Meter Location </th>
                    </tr>
                  </thead>
                  <tbody v-if="currentTabrmsMeterDLMSConfigJson != ''">
                    <tr
                      v-for="(items,index) in currentTabrmsMeterDLMSConfigJson.dlms_details"
                      v-bind:key="index"
                    >
                      <td>{{index+1}}</td>
                      <td class="text-center" style="vertical-align: middle;" v-if="items.meter_enable == 'Yes'"><span :id="'currentTabdlmsETHEnableTXT'+(index+1)">Enable</span></td>
                      <td class="text-center" style="vertical-align: middle;" v-else><span :id="'currentTabdlmsETHEnableTXT'+(index+1)">Disable</span></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'currentTabdlmsETHipTXT'+(index+1)" :value="items.meter_ip" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'currentTabdlmsETHportTXT'+(index+1)" :value="items.meter_port" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="password" class="inputTEXTcss center-block text-center" :id="'currentTabdlmsETHpassTXT'+(index+1)" :value="items.meter_pass" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'currentTabdlmsETHlocTXT'+(index+1)" :value="items.meter_location" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="currentTabrmsMeterDLMSConfigJson == ''" style="text-align:center;width: 100%;">
                      <span>no record found</span>
                 </div>
              </div>
            </template>
                            </div>
                            </div>
                      </div>
                    </div>
                      </div>
                      </div>
                      <div role="tabpanel" class="tab-pane fade" id="viewNewconfigurationTabPANE">
                       <p><b>{{devicesummarypopupTITLE}} :</b></p>
                     <div class="tab" role="tabpanel">
                    <ul class="nav nav-tabs" role="tablist"  style="font-size:12px">
                      <li role="presentation" class="active" id="viewNewGENTab">
                        <a
                          href="#viewNewGENTabPANE"
                          id="viewNewGENTabPANEID"
                          aria-controls="General Configuration"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewNewGENTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; General Configuration
                        </a>
                      </li>
                      <li role="dcuviewTab" id="viewNewDLMSTab">
                        <a href="#viewNewDLMSTabPANE"
                          id="viewNewDLMSTabPANEID"
                          aria-controls="DLMS"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewNewDLMSTabPANEMethod">
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; Ethernet Configuration
                        </a>
                      </li>
                      </ul>
                    <div class="tab-content">
                    <div role="tabpanel" class="tab-pane fade in active show" id="viewNewGENTabPANE">
                    <div class="row">
                  <div class="col-md-12">
                 <div class="col-xl-12 order-xl-1">
                 <h6 class="heading-small text-header-color mb-2">GENERAL</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label" >DCU ID</label>
                        <div class="form control">
                        <input id="newTabgenGatewayTXT"  @keydown.space.prevent disabled  @keypress="isNumber($event)" placeholder="Gateway ID" class="outerInputCss" v-model="newTabgatewayTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Location (Max length 64)</label>
                        <div class="form control">
                        <input id="newTabgenlocationTXT" placeholder="Location" class="outerInputCss" disabled v-model="newTablocationTXT" maxlength="64"/>
                        </div>
                        </div>
                      </div>
                    <div class="col-lg-3" style="margin-top:20px;">
                       <label class="form-control-label">Enable DBG Log : </label>
                        <label style="margin-left:10px;margin-bottom:0px;">
                        <input type="checkbox" id="newTabgenDBGChkbox" v-model="newTabenabledbglogChkBox" disabled style="margin-top:10px;"/> Enable
                        </label>
                    </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">DBG Log IP Address</label>
                         <div class="form control">
                         <input id="newTabgenDBGIPTXT" placeholder="DBG Log IP Address" class="outerInputCss" disabled v-model="newTabdbglogIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <!-- Address -->
                  <h6 class="heading-small text-header-color mb-2">ETHERNET</h6>
                  <div class="pl-lg-1">
                   <div class="row">
                      <div class="col-lg-6 text-left">
                    <h5>Ethernet 1 Configuration :</h5>
                      </div>
                      <div class="col-lg-6 text-right">
                     <input type="radio" name="newTabnetworkbutton" id="newTabmetnetradioBTN" v-model="newTabnetworkbtnTXT" value="Meter Network" disabled/><label for="newTabmetnetradioBTN"><b>Meter Network</b></label>&nbsp;&nbsp;
                    <input type="radio" name="newTabnetworkbutton"  id="newTabcdsnetradioBTN" v-model="newTabnetworkbtnTXT" checked ="checked" value="CDCS Network" disabled/><label for = "newTabcdsnetradioBTN"><b>CDCS Network</b></label>
                      </div>
                     </div>
                    <div class="row">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="newTabgenLANcurrentIPTXT" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="newTabipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="newTabgenLANnewIPTXT" placeholder="IP Address" class="outerInputCss" disabled v-model="newTabnewipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="newTabgenLANSubnetIPTXT" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="newTabsubnetmaskTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="newTabgenLANGatewayIPTXT" placeholder="Gateway" class="outerInputCss" disabled v-model="newTabgateTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="newTabgetGenEthNumPort != null && newTabgetGenEthNumPort == '4' || newTabgetGenEthNumPort != null && newTabgetGenEthNumPort == '2'">Ethernet 2  Configuration :</h5>
                     <div class="row"  v-if="newTabgetGenEthNumPort != null && newTabgetGenEthNumPort ==  '4' || newTabgetGenEthNumPort != null && newTabgetGenEthNumPort == '2'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="newTabgenLANcurrentIPTXT2" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="newTabipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                                                  />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="newTabgenLANnewIPTXT2" placeholder="IP Address" class="outerInputCss" disabled v-model="newTabnewipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="newTabgenLANSubnetIPTXT2" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="newTabsubnetmaskTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="newTabgenLANGatewayIPTXT2" placeholder="Gateway" class="outerInputCss" disabled v-model="newTabgateTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="newTabgetGenEthNumPort != null && newTabgetGenEthNumPort == '4'">Ethernet 3 Configuration :</h5>
                     <div class="row"  v-if="newTabgetGenEthNumPort != null && newTabgetGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="newTabgenLANcurrentIPTXT3" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="newTabipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="newTabgenLANnewIPTXT3" placeholder="IP Address" class="outerInputCss" disabled v-model="newTabnewipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="newTabgenLANSubnetIPTXT3" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="newTabsubnetmaskTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="newTabgenLANGatewayIPTXT3" placeholder="Gateway" class="outerInputCss" disabled v-model="newTabgateTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="newTabgetGenEthNumPort != null && newTabgetGenEthNumPort == '4'">Ethernet 4 Configuration :</h5>
                     <div class="row"  v-if="newTabgetGenEthNumPort != null && newTabgetGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="newTabgenLANcurrentIPTXT4" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="newTabipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="newTabgenLANnewIPTXT4" placeholder="IP Address" class="outerInputCss" disabled v-model="newTabnewipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="newTabgenLANSubnetIPTXT4" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="newTabsubnetmaskTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="newTabgenLANGatewayIPTXT4" placeholder="Gateway" class="outerInputCss" disabled v-model="newTabgateTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

               <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false"/>
               <div v-show="false">
                <div class="row">
                  <div class="col-lg-2">
                  <h6 class="heading-small text-header-color mb-2">Serial Port</h6>
                   </div>
                    <div class="col-lg-2">
                           <p>No of serials :</p>
                    </div>
                    <div class="col-lg-2">
                    <select id="newTabgenno_serialDropTXT"  v-model="newTabno_serialDropTXT" disabled style="margin-left: -95px;height:30px;width: 50%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option disabled value="choose no of serial" selected>choose no of serial</option>
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                              <option value="4">4</option>
                    </select>
                    </div>
                </div>
                  <div class="pl-lg-1">
                    <div id="newTabserialPane1" style="margin-top: -25px;">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 1: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control"> 
                            <select id="newTabgenBaudDropdown" disabled
                              v-model="newTabserialBaudRateDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="newTabgenDataBitsDropdown"
                              v-model="newTabserialDanewTabitsDropTXT1" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="newTabgenStopBitsDropdown" disabled
                              v-model="newTabserialStopbitsDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="newTabgenParityDropdown" v-model="newTabserialParityDropTXT1" disabled style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="newTabgenHandshakeDropdown"
                              v-model="newTabserialHandshakeDropTXT1" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="newTabgenInfModeDropdown" disabled v-model="newTabserialInfModeDropTXT1" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                <hr class="my-1" v-show="newTabno_serialDropTXT == '2' || newTabno_serialDropTXT == '4'"/>
                    <div id="newTabserialPane2"  v-show="newTabno_serialDropTXT == '2' || newTabno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 2: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="newTabgenBaudDropdown2"
                              v-model="newTabserialBaudRateDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="newTabgenDataBitsDropdown2"
                              v-model="newTabserialDanewTabitsDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="newTabgenStopBitsDropdown2"
                              v-model="newTabserialStopbitsDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control"> 
                      <select id="newTabgenParityDropdown2" disabled v-model="newTabserialParityDropTXT2" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select  id="newTabgenHandshakeDropdown2" disabled
                              v-model="newTabserialHandshakeDropTXT2"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="newTabgenInfModeDropdown2" v-model="newTabserialInfModeDropTXT2" disabled style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="newTabno_serialDropTXT == '4'"/>
                   <div id="serialPane3" v-show="newTabno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 3: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="newTabgenBaudDropdown3"
                              v-model="newTabserialBaudRateDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="newTabgenDataBitsDropdown3"
                              v-model="newTabserialDanewTabitsDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="newTabgenStopBitsDropdown3"
                              v-model="newTabserialStopbitsDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="newTabgenParityDropdown3" disabled v-model="newTabserialParityDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="newTabgenHandshakeDropdown3" disabled
                              v-model="newTabserialHandshakeDropTXT3"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="newTabgenInfModeDropdown3" disabled v-model="newTabserialInfModeDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="newTabno_serialDropTXT == '4'"/>
                   <div id="newTabserialPane4" v-show="newTabno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 4: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="newTabgenBaudDropdown4"
                              v-model="newTabserialBaudRateDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="newTabgenDataBitsDropdown4" disabled
                              v-model="newTabserialDanewTabitsDropTXT4"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="newTabgenStopBitsDropdown4"
                              v-model="newTabserialStopbitsDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="newTabgenParityDropdown4" disabled v-model="newTabserialParityDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="newTabgenHandshakeDropdown4"
                              v-model="newTabserialHandshakeDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="newTabgenInfModeDropdown4" disabled v-model="newTabserialInfModeDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <h6 class="heading-small text-header-color mb-2">NTP</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 1: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="newTabgenNTPchkbx1" disabled v-model="newTabntpChekBOX1" /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                        <input id="newTabgenNTPipaddTXT1"  placeholder="IP Address" class="outerInputCss"  disabled v-model="newTabntpIpaddressTXT" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="newTabgenNTPPortTXT1" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" disabled  maxlength="5" @keydown.space.prevent @keypress="isNumber($event)" v-model="newTabntpPortNoTXT"/>
                        </div>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 2: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="newTabgenNTPchkbx2" v-model="newTabntpChekBOX2" disabled /> Enable
                        </label>

                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                         <input id="newTabgenNTPipaddTXT2" placeholder="IP Address" @keydown.space.prevent @keypress="isNumber($event)" class="outerInputCss" v-model="newTabntpIpaddressTXT2" disabled/>
                        </div>
                        </div>
                      </div>

                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="newTabgenNTPPortTXT2" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" v-model="newTabntpPortNoTXT2" disabled maxlength="5" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3" v-show="false">
                       <div>
                          <label class="form-control-label">TimeOffset (Hrs, Mins)</label>
                          <div class="form control">
                            <select id="newTabntpTimeOffsetHrsdropdwn"
                              v-model="newTabntpTimeOffsetHrsTXT" disabled  class="disable"
                              style="height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in HoursArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                            <select id="newTabntpTimeOffsetSecdropdwn"
                              v-model="newTabntpTimeOffsetSecTXT" disabled  class="disable"
                              style="margin-left:10px;height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in MinsArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                           </div>
                        </div>
                        </div>
                        <div class="col-lg-2" style="margin-top: -20px;">
                        <div>
                        <label class="form-control-label">Update Interval (Mins)</label>
                        <div class="form control">
                        <input id="newTabgenNTPintervalTXT"  placeholder="Interval" class="outerInputCss" v-model="newTabntpIntervalTXT" disabled/>
                        </div>
                        </div>
                        </div>
                        </div>

                  </div>
 <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >FTP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="newTabftpEnablechekbox" v-model="newTabftpEnablechekbox" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IP Address : </span>
                       <input id="newTabftpIpaddTXT" class="inputTEXTcss" placeholder="IP Address" v-model="newTabftpIpaddTXT" maxlength="32" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number : </span>
                       <input id="newTabftpprtnoTXT" class="inputTEXTcss" placeholder="Port Number" v-model="newTabftpprtnoTXT" maxlength="5" @keydown.space.prevent disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">User Name : </span>
                       <input id="newTabftpusernameTXT" class="inputTEXTcss" placeholder="User Name" v-model="newTabftpusernameTXT" maxlength="10" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Password : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                       <input id="newTabftppasswordTXT" class="inputTEXTcss" placeholder="Password" v-model="newTabftppasswordTXT" maxlength="32" @keydown.space.prevent  disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Directory : </span>
                       <input id="newTabftpdirTXT" class="inputTEXTcss" placeholder="Directory" v-model="newTabftpdirTXT" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Time Interval(mins) : </span>
                       <select class="inputTEXTcss"  name="newTabftpTimeInt" id="newTabftpTimeInt" v-model="newTabftptimeoutTXT" disabled>
																<!-- <option value='5' selected>5</option> -->
																<option value='15' selected>15</option>
																<option value='30'>30</option>
																<option value='60'>60</option>
															</select>
              </div>
              </div>
 </div>
<hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >IEC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="newTabiec104Enablechekbox" v-model="newTabiec104Enablechekbox" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Station Address : </span>
                       <input id="newTabiecStationTXT" class="inputTEXTcss" placeholder="Station Address" v-model="newTabiecStationTXT" maxlength="32" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number :</span>
                       <input id="newTabiecportTXT" class="inputTEXTcss" placeholder="Port Number" v-model="newTabiecportTXT" @keydown.space.prevent @keypress="isNumber($event)" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Cyclic Int(in Sec) : </span>
                       <input id="newTabiecCylicTXT" class="inputTEXTcss" placeholder="Cyclic Int(in Sec)" v-model="newTabiecCylicTXT"  @keypress="isNumber($event)" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Start IOA Addr : </span>
                       <input id="newTabstartIOAaddTXT" class="inputTEXTcss" placeholder="Start IOA Addr" v-model="newTabstartIOAaddTXT"  @keypress="isNumber($event)" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">COT Size : </span>
                       <select id="newTabiecCodsizedwnTXT" v-model="newTabiecCodsizedwnTXT" class="inputTEXTcss" disabled>
                              <option value="Choose COT Size" selected disabled>Choose COT Size</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                      </select>
              </div>
             <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IOA : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <select id="newTabiecIOAsizedwnTXT" v-model="newTabiecIOAsizedwnTXT" class="inputTEXTcss" disabled>
                              <option value="Choose IOA Size" selected disabled>Choose IOA Size</option>
                              <option value="3">3</option>
                              <option value="2">2</option>
                      </select>
              </div>
              </div>
</div>
                <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >Allowed Master&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="newTabgenallowcommonchkbx" v-model="newTabgenallowcommonchkbx" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="newTabgenallow1chkbx" v-model="newTabgenallow1chkbx" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="newTabgenallow1IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="newTabgenallow1IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="newTabgenallow2chkbx" v-model="newTabgenallow2chkbx" :disabled="!newTabgenallowcommonchkbx"/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="newTabgenallow2IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="newTabgenallow2IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="newTabgenallow3chkbx" v-model="newTabgenallow3chkbx" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="newTabgenallow3IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="newTabgenallow3IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="newTabgenallow4chkbx" v-model="newTabgenallow4chkbx" disabled /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="newTabgenallow4IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="newTabgenallow4IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
 </div>
</div>

                  <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false" >MQTT</h6>
                  <div class="pl-lg-1" v-show="false" >
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Broker IP</label>
                        <div class="form control">
                        <input id="newTabgenMQTTbrokerIPTXT" disabled @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a Broker IP" class="outerInputCss" v-model="newTabmqttBrokerTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Port No</label>
                        <div class="form control">
                        <input id="newTabgenMQTTPortTXT" disabled placeholder="Port No" class="outerInputCss" title="Range(1-65535)" @keydown.space.prevent  @keypress="isNumber($event)" @input="filterInput2($event)" maxlength="5" v-model="newTabmqttPortNoTXT1"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Username</label>
                        <div class="form control">
                        <input id="newTabgenMQTTusernameTXT" placeholder="Username" maxlength="32" class="outerInputCss" v-model="newTabmqttUsernameTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                         <div>
                        <label class="form-control-label">Password</label>
                        <div class="form control">
                        <input id="newTabgenMQTTpasswdTXT" :type="newTabtypevalue1" placeholder="Password" maxlength="32" class="outerInputCss" v-model="newTabmqttPasswodTXT" disabled/>
                        <img id="newTabmqttcnpasswdimg1" :src="newTabimgvalue1" class="eyeimg" title="show password" @click="newTabshowPassword1()">
                        </div>
                        </div>   
                      </div>
                    </div>
                    <div class="row"> 
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Publish Topic</label>
                        <div class="form control">
                        <input id="newTabgenMQTTPublishtocTXT" placeholder=" Publish Topic" class="outerInputCss" v-model="newTabmqttPublicTopicTXT" disabled/>
                        </div>
                        </div>                          
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Publish Interval (Hrs, Mins, Secs)</label>
                          <div class="form control">
                              <select id="newTabgenmqttHrsdropDwn"
                              v-model="newTabmqttHrsTXT"   class="disable" disabled
                              style="height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item1 in Hours24Array" v-bind:value="item1" v-bind:key="item1" >{{ item1 }}</option>
                            </select> 

                            <select id="newTabgenmqttMinsdropDwn" disabled
                              v-model="newTabmqttMinsTXT"   class="disable"
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item2 in Mins5Array" v-bind:value="item2" v-bind:key="item2" >{{ item2 }}</option>
                            </select>   

                               <select id="newTabgenmqttSecsdropDwn"
                              v-model="newTabmqttSecsTXT"  class="disable" disabled
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item3 in SecondsArray" v-bind:value="item3" v-bind:key="item3" >{{ item3 }}</option>
                            </select> 
                           
                          </div>
                        </div>
                      </div>                     
                    </div>
                    <div class="row">
                    
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Events : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="newTabmqttEnableEventsChkBOX" id="newTabgenmqttEventschkbox" disabled/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Events Topic</label>
                        <div class="form control">
                        <input id="newTabgenmqttEventstocTXT" placeholder="Events Topic" class="outerInputCss" disabled v-model="newTabmqttEventsTopicTXT"/>
                        </div>
                        </div>
                      </div>
                     <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="newTabmqttEnablePingChkBOX" id="newTabgenmqttPingchkbox" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Diag Topic</label>
                        <div class="form control">
                         <input id="newTabgenmqttDiagtocTXT" placeholder="Diag Topic"  disabled class="outerInputCss" v-model="newTabmqttDiagTXT"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="my-1" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false">Modem</h6>
                  <div class="pl-lg-1" v-show="false">
                    <div class="row">
                       <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Modem : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="newTabenableModemChkBox" id="newTabgenmodemChkbox" disabled/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-2">
                        <div>
                          <label class="form-control-label">Connection Type</label>
                          <div class="form control">

                        <select id="newTabgenmodemConnectionDropwn"
                              v-model="newTabmodmConnectionTypeTXT" class="disable" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Connection</option>
                              <option value="LAN_TYPE">LAN_TYPE</option>
                              <option value="3G_TYPE">3G_TYPE</option>
                              <option value="CDMA_TYPE">CDMA_TYPE</option>
                              <option value="2G_TYPE">2G_TYPE</option>
                              <option value="4G_TYPE">4G_TYPE</option>
                              <option value="5G_TYPE">5G_TYPE</option>
                            
                            </select>
 </div> </div>

                      </div>
                      <div class="col-lg-2">
                        <input id="newTabgenmodemusernameTXT"
                          alternative
                          label="Username"
                          placeholder="Username" disabled
                          class="outerInputCss"
                          v-model="newTabUsernameTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative  id="newTabgenmodempasswordTXT"
                          label="Password"  disabled
                          placeholder="Password" :type="newTabtypevalue"
                          class="outerInputCss"
                          v-model="newTabPasswordTXT"
                        />
                        <img id="newTabgenmodemcnpasswdimg" :src="newTabimgvalue" class="eyeimg" title="show password" @click="newTabshowPassword()">
                      </div>
                       <div class="col-lg-2">
                        <input 
                          alternative id="newTabgenmodemPHTXT"
                          label="Phone Number (Num length 10)" disabled
                          placeholder="Phone Number" maxlength="10" @keydown.space.prevent @keypress="isNumber($event)"
                          class="outerInputCss"
                          v-model="newTabmodemPhNumTXT"
                        />
                     
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="APN" id="newTabgenmodemAPNTXT"
                          placeholder="APN" disabled
                          class="outerInputCss"
                          v-model="newTabapnTXT"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="newTabgenmodemPingChkBox" v-model="newTabenablePinChkBox"  disabled/> Enable
                        </label>
 
                      </div>
                   
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="Ping IP" id="newTabgenmodempingIpTXT"
                          placeholder="Ping IP"
                          class="outerInputCss" disabled
                          v-model="newTabpingIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="newTabgenmodemAttemptsTXT"
                          label="Ping Num (between 5 to 10)"
                          placeholder="Num attempts"
                          class="outerInputCss" disabled
                          v-model="newTabpingNumTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="newTabgenmodemPingintervalTXT"
                          label="Ping Interval (in secs)"
                          placeholder="Interval"
                          class="outerInputCss" disabled
                          v-model="newTabpingTimeoutTXT"
                        />
                      </div>
                    </div>
                  </div>


                  <hr class="my-1" v-show="false"/>
                  <h6 class="heading-small text-header-color mb-2" v-show="false">VPN</h6>
                  <div class="pl-lg-1" v-show="false">
                     <div class="row">
<div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> VPN : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="newTabgenVPNchkbox" v-model="newTabenableVPNChkBox" disabled/> Enable
                        </label>
 
                      </div>

                      <div class="col-lg-2" >
                          <div>
                          <label class="form-control-label">Choose VPN Type</label>
                          <div class="form control">
                            <select id="newTabgenVPNTypeDropwn" v-model="newTabselectVpnVal" disabled class="disable" 
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0">VPN Disable</option>
                              <option value="1">VPN_IPSEC</option>
                              <option value="2">VPN_PPTP</option>
                            
                            </select>
                          </div>
                        </div>
 
                      </div>
                     </div>
                     <div style="height:10px"></div>
                      <div style="border:1px solid lightgray;padding:5px;">
                        <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_IPSEC</h5>
                    <div class="row">
                        
                   
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenVPNTunnelTXT"
                          label="Tunnel Name  (Max length 64)"
                          placeholder="Tunnel Name"
                          class="outerInputCss" disabled
                          v-model="newTabvpnTunnelNameTXT" maxlength="64" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnSharedKeyTXT"
                          label="Pre SharedKey (Max length 64)"
                          placeholder="Pre SharedKey"
                          class="outerInputCss" disabled
                          v-model="newTabvpnSharedKeyTXT" maxlength="64" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnKeyLifeTimeTXT"
                          label="KeyLifeTime (mins 1 to 10)"
                          placeholder="KeyLifeTime"
                          class="outerInputCss" disabled
                          v-model="newTabvpnKeyLifeTimeTXT" maxlength="2" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnRightIpTXT"
                          label="Right IP"
                          placeholder="Right IP"
                          class="outerInputCss" disabled
                          v-model="newTabvpnRightIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnRightSubnetTXT"
                          label="Right Subnet"
                          placeholder="Right Subnet"
                          class="outerInputCss" disabled
                          v-model="newTabvpnRightSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnRightIdTXT"
                          label="Right ID  (Max length 32)"
                          placeholder="Right ID"
                          class="outerInputCss" disabled
                          v-model="newTabvpnRightIdTXT" maxlength="32" 
                        />
                      </div>
                     
                    </div>


                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnLeftIpTXT"
                          label="Left IP"
                          placeholder="Left IP"
                          class="outerInputCss" disabled
                          v-model="newTabvpnLeftIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnLeftSubnetTXT"
                          label="Left Subnet"
                          placeholder="Left Subnet"
                          class="outerInputCss" disabled
                          v-model="newTabvpnLeftSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnLeftIdTXT"
                          label="Left ID (Max length 32)"
                          placeholder="Left ID"
                          class="outerInputCss" disabled
                          v-model="newTabvpnLeftIdTXT" maxlength="32" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input 
                          alternative id="newTabgenvpnLefSrcIPTXT"
                          label="Left Source IP"
                          placeholder="Left Source IP"
                          class="outerInputCss" disabled
                          v-model="newTabvpnLefSrcIPTXT" maxlength="32" 
                        />
                      </div>
                    </div>

                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative
                          label="PFS" id="newTabgenvpnPfsTXT"
                          placeholder="PFS"
                          class="outerInputCss" disabled
                          v-model="newTabvpnPfsTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Aggr Mode</label>
                          <div class="form control">
                            <select id="newTabgenvpnAggrModeTXT"
                              v-model="newTabvpnAggrModeTXT" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="1">Yes</option>
                              <option value="2">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnKeyingModeTXT"
                          label="Keying Mode (Max length 8)" 
                          placeholder="KeyingMode"
                          class="outerInputCss" disabled
                          v-model="newTabvpnKeyingModeTXT" maxlength="8" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnNatTravTXT"
                          label="Nat Trav" 
                          placeholder="Nat Trav"
                          class="outerInputCss" disabled
                          v-model="newTabvpnNatTravTXT" maxlength="2"  @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>

                    <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase1 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="newTabgenvpnDhGrpTXT1"
                              v-model="newTabvpnDhGrpTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select  id="newTabgenvpnEncrptTXT1"
                              v-model="newTabvpnEncrptTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="newTabgenvpnAuthenTXT1"
                              v-model="newTabvpnAuthenTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>
                     
                    </div>
<div style="height:10px;"></div>
                     <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase2 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="newTabgenvpnDhGrpTXT2"
                              v-model="newTabvpnDhGrpTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select id="newTabgenvpnEncrptTXT2"
                              v-model="newTabvpnEncrptTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="newTabgenvpnAuthenTXT2"
                              v-model="newTabvpnAuthenTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="height:15px;"></div>
                  </div>
                  <div style="height:10px;"></div>
                  <div style="border:1px solid lightgray;padding:5px;">
                       <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_PPTP</h5>

                <div class="row">
                <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Require Memory Map</label>
                          <div class="form control">
                            <select id="newTabgenReqMmpeType" v-model="newTabReqMmpeType" disabled class="disable" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                       <input id="newTabgenvpnPptpconnNameTXT"
                          alternative
                          label="Connection Name"
                          placeholder="Connection Name"
                          class="outerInputCss" disabled
                          v-model="newTabvpnPptpconnNameTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>

                       <div class="col-lg-3">
                        <input id="newTabgenvpnPptpLocalUnameTXT"
                          alternative
                          label="Local User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" disabled
                          v-model="newTabvpnPptpLocalUnameTXT" maxlength="32"
                        />
                      </div>
                     <div class="col-lg-3">
                          <input
                          alternative id="newTabgenvpnPptpLocalUpassTXT"
                          label="Local Password"  :type="newTabtypevalue2"
                          placeholder="Local Password" maxlength="32"
                          class="outerInputCss"
                          v-model="newTabvpnPptpLocalUpassTXT" disabled
                        />
                        <img id="newTabvpnpptpPasswdimg1" :src="newTabimgvalue2" class="eyeimg" title="show password" >
                      </div>
                    </div>
                  <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnPptpRemoteUnameTXT"
                          label="Remote User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" disabled
                          v-model="newTabvpnPptpRemoteUnameTXT" maxlength="32"
                        />

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="newTabgenvpnPptpRemoteIpTXT"
                          label="Remote IP Address"
                          placeholder="Remote IP Address"
                          class="outerInputCss" disabled
                          v-model="newTabvpnPptpRemoteIpTXT" maxlength="32"  @keydown.space.prevent @keypress="isNumber($event)"
                        />

                      </div>
                      </div>
                      </div>
                      </div>
                      <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
            </div>
                            </div>
                            </div>
                      </div>
                       <div role="tabpanel" class="tab-pane fade" id="viewNewDLMSTabPANE">
                            <p></p>
                              <h6 class="heading-small text-header-color mb-2">DLMS</h6>
                        <div class="row">
                          <div class="col-md-12">
              <template>
              <div class="newTable-responsive" id="newTabrmsDLMSConfigTablePANE" style="height:500px;border:1px solid lightgray;overflow: auto">
                <table
                  class="table table-bordered"
                  id="newTabrmsDLMSConfigTableid"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th>S.No</th>
                      <th>Enable</th>
                      <th>Meter IP address</th>
                      <th>Port Number</th>
                      <th>Password</th>
                      <th>Meter Location</th>
                    </tr>
                  </thead>
                  <tbody v-if="newTabrmsMeterDLMSConfigJson != ''">
                    <tr
                      v-for="(items,index) in newTabrmsMeterDLMSConfigJson.dlms_details"
                      v-bind:key="index"
                    >
                      <td>{{index+1}}</td>
                      <td class="text-center" style="vertical-align: middle;" v-if="items.meter_enable == 'Yes'"><span :id="'newTabdlmsETHEnableTXT'+(index+1)">Enable</span></td>
                      <td class="text-center" style="vertical-align: middle;" v-else><span :id="'newTabdlmsETHEnableTXT'+(index+1)">Disable</span></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'newTabdlmsETHipTXT'+(index+1)" :value="items.meter_ip" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'newTabdlmsETHportTXT'+(index+1)" :value="items.meter_port" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="password" class="inputTEXTcss center-block text-center" :id="'newTabdlmsETHpassTXT'+(index+1)" :value="items.meter_pass" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'newTabdlmsETHlocTXT'+(index+1)" :value="items.meter_location" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="newTabrmsMeterDLMSConfigJson == ''" style="text-align:center;width: 100%;">
                      <span>no record found</span>
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
          </div>
          <!--Footer-->
          </div>
          </modal>

  <!-- View prev / curr END* -->



<!-- view frimware prevoius / current configuration START -->

  <modal id="viewPrevCurrFWRPopup" name="viewPrevCurrFWRPopup" transition="nice-modal-fade" classes="demo-modal-class"  :min-width="300" :min-height="200" :pivot-y="1.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true" style="z-index:1111 !important;"
        width="40%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-9" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> View Firmware  </h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="closeviewPrevCurrFWRPopup" type="button" class="btn btn-default" @click="closeviewPrevCurrFWRPopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div>
        <div class="tab" role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist" style="font-size:12px">
                      <li role="presentation" class="active" id="viewFWRPreviousTab">
                        <a
                          href="#viewFWRPreviousTabPANE"
                          id="viewFWRPreviousTabPANEID"
                          aria-controls="Previous"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewFWRPreviousTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; Previous Firmware
                        </a>
                      </li>
                      <li role="dcuviewTab" id="viewFWRCurrentTab">
                        <a href="#viewFWRCurrentTabPANE"
                          id="viewFWRCurrentTabPANEID"
                          aria-controls="View"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewFWRCurrentTabPANEMethod"
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i> &nbsp;&nbsp; Current Firmware
                        </a>
                      </li>
                      </ul>
                       <div class="tab-content" style="margin:1px;padding:5px;border: 1px solid lightgray;">
                      <div role="tabpanel" class="tab-pane fade in active show" id="viewFWRPreviousTabPANE">
                        <p>Previous Firmware Version : <b> {{firmwarePREVVERTXT}}</b> </p>
<p></p>
                      </div>
                    <div role="tabpanel" class="tab-pane fade" id="viewFWRCurrentTabPANE">
                      <p>Current Firmware Version : <b> {{firmwareCURRVERTXT}} </b></p>
                      <p></p>
                      </div>
                      </div>
             </div>
            </div>
          </div>
          <!--Footer-->
          </div>
          </modal>

<!-- view frimware prevoius / current configuration END -->

<!-- view viewACtivateFWRPopup prevoius / current configuration END -->
<modal id="viewACtivateFWRPopup" name="viewACtivateFWRPopup" transition="nice-modal-fade" classes="demo-modal-class"  :min-width="300" :min-height="200" :pivot-y="1.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true" style="z-index:1111 !important;"
        width="40%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-9" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> View Firmware  </h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="closeviewACtivateFWRPopup" type="button" class="btn btn-default" @click="closeviewACtivateFWRPopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div>
        <div class="tab" role="tabpanel">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" role="tablist" style="font-size:12px">
                      <li role="presentation" class="active" id="viewActivateFWRcurrentTab">
                        <a href="#viewActivateFWRcurrentTabPANE"
                          id="viewActivateFWRcurrentTabPANEID"
                          aria-controls="Previous"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewActivateFWRcurrentTabPANEMethod"
                        >
                          <i class="fa fa-cogs" aria-hidden="true"></i> &nbsp;&nbsp; Current Firmware
                        </a>
                      </li>
                      <li role="dcuviewTab" id="viewActivateFWRnewTab">
                        <a href="#viewActivateFWRnewTabPANE"
                          id="viewActivateFWRnewTabPANEID"
                          aria-controls="View"
                          role="tab"
                          data-toggle="tab"
                          style="text-transform:uppercase"
                          @click="viewActivateFWRnewTabPANEMethod"
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i> &nbsp;&nbsp; New Firmware
                        </a>
                      </li>
                      </ul>
                      <div class="tab-content" style="margin:1px;padding:5px;border: 1px solid lightgray;">
                      <div role="tabpanel" class="tab-pane fade in active show" id="viewActivateFWRcurrentTabPANE">
                      <p>Current Firmware Version : <b> {{firmwareCURRVERTXT}}</b> </p>
                      <p></p>
                      </div>
                    <div role="tabpanel" class="tab-pane fade" id="viewActivateFWRnewTabPANE">
                      <p>New Firmware Version : <b> {{firmwareNEWVERTXT}} </b></p>
                      <p></p>
                      </div>
                      </div>
             </div>
            </div>
          </div>
          <!--Footer-->
          </div>
          </modal>
           <!--Rework Device page END-->


<modal id="viewConfigHISTORYPopup" name="viewConfigHISTORYPopup" transition="nice-modal-fade" classes="demo-modal-class"  :min-width="300" :min-height="200" :pivot-y="1.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true" style="z-index:1111 !important;"
        width="55%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-9" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{deviceTblDeviceName}} - {{historyBTNclickTXT}} History  </h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="closeviewConfigHISTORYPopup" type="button" class="btn btn-default" @click="closeviewConfigHISTORYPopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div>
              <div class="row">
             <div class="col-md-3 order-md-3" style="margin-top: 5px;">
              <span>From date : </span>
              <datepicker v-model="historyFromdateTXT" :disabledDates="historydisabledDates" style="width:50%;margin-left: 70px;margin-top: -22px;"></datepicker>
             </div>
              <div class="col-md-3 order-md-3"  style="margin-top: 5px;">
              <span>To date :</span>
              <datepicker v-model="historyTodateTXT" :disabledDates="historydisabledDates"  style="width:50%;margin-left: 55px;margin-top: -22px;"></datepicker>
            </div>
            <div class="col-md-1 order-md-3 text-left">
             <button id="historysubmitBTN" class="btn btn-sm btn-default bgBtn"  style="color:#fff;margin-top: 1px;" @click="historyconfigFwFunction()">
              <i class="fa fa-check text-white"></i> Submit
            </button>
            </div>
            </div>
            <p></p>
               <div class="row">
                 <div class="col-lg-12 order-md-3">
            <template>
              <div class="table-responsive" id="configHistoryTablePANE" style="border:1px solid lightgray;height:500px;">
                <table
                  class="table table-bordered"
                  id="configHistoryTablePANEID"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                       <th style="width:50px">S.No</th>
                              <th>Date & Time</th>
                              <th>User Name</th>
                              <th>Role</th>
                              <th>History Type</th>
                              <th>History Details</th>
                              <th v-show="historyBTNclickTXT == 'Configuration'">View Changes</th>
                    </tr>
                  </thead>
                    <tbody v-if="configHistoryTableJSONS != ''">
                            <tr v-for="(row,index) in configHistoryTableJSONS.details" :key="row.id">
                              <td>{{index+1}}</td>
                              <td>{{datetimeformat(row.date_time)}}</td>
                              <td>{{row.user_name}}</td>
                              <td>{{row.role}}</td>
                              <td>{{row.history_type}}</td>
                              <td>{{row.history_details}}</td>
                              <td v-show="historyBTNclickTXT == 'Configuration'"><i class="fa fa-eye text-blue" title="View Changes" style="cursor:pointer" @click="viewhistroyresponseFunction(index,row)" /></td>
                            </tr>
                          </tbody>
                </table>
                 <div v-if="configHistoryTableJSONS == ''" style="text-align:center;width: 100%;">
                      <span>No records found</span>
                 </div>
              </div>
            </template>
          </div>
               </div>
            </div>
          </div>
          <!--Footer-->
          </div>
          </modal>

               <!-- Device config/get  START -->
        <modal id="historygenconfigPopup" name="historygenconfigPopup" transition="nice-modal-fade" classes="demo-modal-class"  :min-width="300" :min-height="200" :pivot-y="1.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true" style="z-index:11111 !important;"
        width="60%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-9" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> DCU View / Configuration </h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="closehistorygenconfigPopupbtn1" type="button" class="btn btn-default" @click="closehistorygenconfigPopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div class="row">
                  <div class="col-md-12">
                 <div class="col-xl-12 order-xl-1">
                 <h6 class="heading-small text-header-color mb-2">GENERAL</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label" >DCU ID</label>
                        <div class="form control">
                        <input id="historyViewgenGatewayTXT"  @keydown.space.prevent disabled  @keypress="isNumber($event)" placeholder="Gateway ID" class="outerInputCss" v-model="historyViewgatewayTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Location (Max length 64)</label>
                        <div class="form control">
                        <input id="historyViewgenlocationTXT" placeholder="Location" class="outerInputCss" disabled v-model="historyViewlocationTXT" maxlength="64"/>
                        </div>
                        </div>
                      </div>
                    <div class="col-lg-3" style="margin-top:20px;">
                       <label class="form-control-label">Enable DBG Log : </label>
                        <label style="margin-left:10px;margin-bottom:0px;">
                        <input type="checkbox" id="historyViewgenDBGChkbox" v-model="historyViewenabledbglogChkBox" disabled style="margin-top:10px;"/> Enable
                        </label>
                    </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">DBG Log IP Address</label>
                         <div class="form control">
                         <input id="historyViewgenDBGIPTXT" placeholder="DBG Log IP Address" class="outerInputCss" disabled v-model="historyViewdbglogIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <!-- Address -->
                  <h6 class="heading-small text-header-color mb-2">ETHERNET</h6>
                  <div class="pl-lg-1">
                   <div class="row">
                      <div class="col-lg-6 text-left">
                    <h5>Ethernet 1 Configuration :</h5>
                      </div>
                      <div class="col-lg-6 text-right">
                     <input type="radio" name="historyViewnetworkbutton" id="historyViewmetnetradioBTN" v-model="historyViewnetworkbtnTXT" value="Meter Network" disabled/><label for="historyViewmetnetradioBTN"><b>Meter Network</b></label>&nbsp;&nbsp;
                    <input type="radio" name="historyViewnetworkbutton"  id="historyViewcdsnetradioBTN" v-model="historyViewnetworkbtnTXT" checked ="checked" value="CDCS Network" disabled/><label for = "historyViewcdsnetradioBTN"><b>CDCS Network</b></label>
                      </div>
                     </div>
                    <div class="row">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="historyViewgenLANcurrentIPTXT" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="historyViewipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="historyViewgenLANnewIPTXT" placeholder="IP Address" class="outerInputCss" disabled v-model="historyViewnewipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="historyViewgenLANSubnetIPTXT" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="historyViewsubnetmaskTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="historyViewgenLANGatewayIPTXT" placeholder="Gateway" class="outerInputCss" disabled v-model="historyViewgateTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="historyViewgetGenEthNumPort != null && historyViewgetGenEthNumPort == '4' || historyViewgetGenEthNumPort != null && historyViewgetGenEthNumPort == '2'">Ethernet 2  Configuration :</h5>
                     <div class="row"  v-if="historyViewgetGenEthNumPort != null && historyViewgetGenEthNumPort ==  '4' || historyViewgetGenEthNumPort != null && historyViewgetGenEthNumPort == '2'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="historyViewgenLANcurrentIPTXT2" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="historyViewipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                                                  />
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="historyViewgenLANnewIPTXT2" placeholder="IP Address" class="outerInputCss" disabled v-model="historyViewnewipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="historyViewgenLANSubnetIPTXT2" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="historyViewsubnetmaskTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="historyViewgenLANGatewayIPTXT2" placeholder="Gateway" class="outerInputCss" disabled v-model="historyViewgateTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="historyViewgetGenEthNumPort != null && historyViewgetGenEthNumPort == '4'">Ethernet 3 Configuration :</h5>
                     <div class="row"  v-if="historyViewgetGenEthNumPort != null && historyViewgetGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="historyViewgenLANcurrentIPTXT3" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="historyViewipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="historyViewgenLANnewIPTXT3" placeholder="IP Address" class="outerInputCss" disabled v-model="historyViewnewipaddressTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="historyViewgenLANSubnetIPTXT3" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="historyViewsubnetmaskTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="historyViewgenLANGatewayIPTXT3" placeholder="Gateway" class="outerInputCss" disabled v-model="historyViewgateTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                    <h5 v-if="historyViewgetGenEthNumPort != null && historyViewgetGenEthNumPort == '4'">Ethernet 4 Configuration :</h5>
                     <div class="row"  v-if="historyViewgetGenEthNumPort != null && historyViewgetGenEthNumPort == '4'">
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Current IP Address</label>
                         <div class="form control">
                         <input id="historyViewgenLANcurrentIPTXT4" placeholder="IP Address" class="outerInputCss" disabled
                          v-model="historyViewipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                         <label class="form-control-label">New IP Address</label>
                         <div class="form control">
                        <input id="historyViewgenLANnewIPTXT4" placeholder="IP Address" class="outerInputCss" disabled v-model="historyViewnewipaddressTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Subnet Mask</label>
                         <div class="form control">
                        <input id="historyViewgenLANSubnetIPTXT4" placeholder="Subnet Mask" class="outerInputCss" disabled v-model="historyViewsubnetmaskTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div> 
                      </div>
                      <div class="col-lg-3">
                         <div>
                         <label class="form-control-label">Gateway</label>
                         <div class="form control">
                        <input id="historyViewgenLANGatewayIPTXT4" placeholder="Gateway" class="outerInputCss" disabled v-model="historyViewgateTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

               <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false"/>
               <div v-show="false">
                <div class="row">
                  <div class="col-lg-2">
                  <h6 class="heading-small text-header-color mb-2">Serial Port</h6>
                   </div>
                    <div class="col-lg-2">
                           <p>No of serials :</p>
                    </div>
                    <div class="col-lg-2">
                    <select id="historyViewgenno_serialDropTXT"  v-model="historyViewno_serialDropTXT" disabled style="margin-left: -95px;height:30px;width: 50%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option disabled value="choose no of serial" selected>choose no of serial</option>
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                              <option value="4">4</option>
                    </select>
                    </div>
                </div>
                  <div class="pl-lg-1">
                    <div id="historyViewserialPane1" style="margin-top: -25px;">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 1: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control"> 
                            <select id="historyViewgenBaudDropdown" disabled
                              v-model="historyViewserialBaudRateDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="historyViewgenDataBitsDropdown"
                              v-model="historyViewserialDahistoryViewitsDropTXT1" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="historyViewgenStopBitsDropdown" disabled
                              v-model="historyViewserialStopbitsDropTXT1"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="historyViewgenParityDropdown" v-model="historyViewserialParityDropTXT1" disabled style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="historyViewgenHandshakeDropdown"
                              v-model="historyViewserialHandshakeDropTXT1" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="historyViewgenInfModeDropdown" disabled v-model="historyViewserialInfModeDropTXT1" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                <hr class="my-1" v-show="historyViewno_serialDropTXT == '2' || historyViewno_serialDropTXT == '4'"/>
                    <div id="historyViewserialPane2"  v-show="historyViewno_serialDropTXT == '2' || historyViewno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 2: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="historyViewgenBaudDropdown2"
                              v-model="historyViewserialBaudRateDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="historyViewgenDataBitsDropdown2"
                              v-model="historyViewserialDahistoryViewitsDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="historyViewgenStopBitsDropdown2"
                              v-model="historyViewserialStopbitsDropTXT2" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control"> 
                      <select id="historyViewgenParityDropdown2" disabled v-model="historyViewserialParityDropTXT2" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select  id="historyViewgenHandshakeDropdown2" disabled
                              v-model="historyViewserialHandshakeDropTXT2"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="historyViewgenInfModeDropdown2" v-model="historyViewserialInfModeDropTXT2" disabled style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="historyViewno_serialDropTXT == '4'"/>
                   <div id="serialPane3" v-show="historyViewno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 3: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="historyViewgenBaudDropdown3"
                              v-model="historyViewserialBaudRateDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="historyViewgenDataBitsDropdown3"
                              v-model="historyViewserialDahistoryViewitsDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="historyViewgenStopBitsDropdown3"
                              v-model="historyViewserialStopbitsDropTXT3" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="historyViewgenParityDropdown3" disabled v-model="historyViewserialParityDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="historyViewgenHandshakeDropdown3" disabled
                              v-model="historyViewserialHandshakeDropTXT3"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="historyViewgenInfModeDropdown3" disabled v-model="historyViewserialInfModeDropTXT3" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>

                   <hr class="my-1" v-show="historyViewno_serialDropTXT == '4'"/>
                   <div id="historyViewserialPane4" v-show="historyViewno_serialDropTXT == '4'">
                     <span style="color:rgb(210, 159, 122);font-weight: bold;font-size: 12px;">Serial port 4: </span>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Baud Rate</label>
                          <div class="form control">
                            <select id="historyViewgenBaudDropdown4"
                              v-model="historyViewserialBaudRateDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1200" selected>1200</option>
                              <option value="2400">2400</option>
                              <option value="4800">4800</option>
                              <option value="9600">9600</option>
                              <option value="19200">19200</option>
                              <option value="38400">38400</option>
                              <option value="57600">57600</option>
                              <option value="115200">115200</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Data Bits</label>
                          <div class="form control">
                            <select  id="historyViewgenDataBitsDropdown4" disabled
                              v-model="historyViewserialDahistoryViewitsDropTXT4"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="7">7</option>
                              <option value="8" selected>8</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Stop Bits</label>
                          <div class="form control">
                            <select id="historyViewgenStopBitsDropdown4"
                              v-model="historyViewserialStopbitsDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="1" selected>1</option>
                              <option value="2">2</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Parity</label>
                          <div class="form control">
                      <select id="historyViewgenParityDropdown4" disabled v-model="historyViewserialParityDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="None" selected>None</option>
                              <option value="Odd">Odd</option>
                              <option value="Even">Even</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p></p>
                    <p></p>
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Handshake</label>
                          <div class="form control">
                            <select id="historyViewgenHandshakeDropdown4"
                              v-model="historyViewserialHandshakeDropTXT4" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                               <option value="None" selected>None</option>
                              <option value="HW">Hardware</option>
                              <option value="SW">Software</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">InfMode</label>
                          <div class="form control">
                            <select id="historyViewgenInfModeDropdown4" disabled v-model="historyViewserialInfModeDropTXT4" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option selected value="Choose Mode">Choose Mode</option>
                              <option value="RS232_MODE">RS232_MODE</option>
                              <option value="RS485_MODE">RS485_MODE</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                   </div>
                    </div>
                  </div>
                  <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                  <h6 class="heading-small text-header-color mb-2">NTP</h6>
                  <div class="pl-lg-1">
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 1: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="historyViewgenNTPchkbx1" disabled v-model="historyViewntpChekBOX1" /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                        <input id="historyViewgenNTPipaddTXT1"  placeholder="IP Address" class="outerInputCss"  disabled v-model="historyViewntpIpaddressTXT" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="historyViewgenNTPPortTXT1" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" disabled  maxlength="5" @keydown.space.prevent @keypress="isNumber($event)" v-model="historyViewntpPortNoTXT"/>
                        </div>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label">Server 2: </label>
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="historyViewgenNTPchkbx2" v-model="historyViewntpChekBOX2" disabled /> Enable
                        </label>

                      </div>
                      <div class="col-lg-2">
                         <div>
                         <label class="form-control-label">IP Address</label>
                         <div class="form control">
                         <input id="historyViewgenNTPipaddTXT2" placeholder="IP Address" @keydown.space.prevent @keypress="isNumber($event)" class="outerInputCss" v-model="historyViewntpIpaddressTXT2" disabled/>
                        </div>
                        </div>
                      </div>

                      <div class="col-lg-2">
                        <div>
                         <label class="form-control-label">Port No</label>
                         <div class="form control">
                        <input id="historyViewgenNTPPortTXT2" placeholder="Port No" class="outerInputCss" title="Range(1-65535)" v-model="historyViewntpPortNoTXT2" disabled maxlength="5" @keydown.space.prevent @keypress="isNumber($event)"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3" v-show="false">
                       <div>
                          <label class="form-control-label">TimeOffset (Hrs, Mins)</label>
                          <div class="form control">
                            <select id="historyViewntpTimeOffsetHrsdropdwn"
                              v-model="historyViewntpTimeOffsetHrsTXT" disabled  class="disable"
                              style="height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in HoursArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                            <select id="historyViewntpTimeOffsetSecdropdwn"
                              v-model="historyViewntpTimeOffsetSecTXT" disabled  class="disable"
                              style="margin-left:10px;height:30px;width:30%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item in MinsArray" v-bind:value="item" v-bind:key="item" >{{ item }}</option>
                            </select>
                           </div>
                        </div>
                        </div>
                        <div class="col-lg-2" style="margin-top: -20px;">
                        <div>
                        <label class="form-control-label">Update Interval (Mins)</label>
                        <div class="form control">
                        <input id="historyViewgenNTPintervalTXT"  placeholder="Interval" class="outerInputCss" v-model="historyViewntpIntervalTXT" disabled/>
                        </div>
                        </div>
                        </div>
                        </div>

                  </div>
 <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >FTP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="historyViewftpEnablechekbox" v-model="historyViewftpEnablechekbox" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IP Address : </span>
                       <input id="historyViewftpIpaddTXT" class="inputTEXTcss" placeholder="IP Address" v-model="historyViewftpIpaddTXT" maxlength="32" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number : </span>
                       <input id="historyViewftpprtnoTXT" class="inputTEXTcss" placeholder="Port Number" v-model="historyViewftpprtnoTXT" maxlength="5" @keydown.space.prevent disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">User Name : </span>
                       <input id="historyViewftpusernameTXT" class="inputTEXTcss" placeholder="User Name" v-model="historyViewftpusernameTXT" maxlength="10" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Password : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                       <input id="historyViewftppasswordTXT" class="inputTEXTcss" placeholder="Password" v-model="historyViewftppasswordTXT" maxlength="32" @keydown.space.prevent  disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Directory : </span>
                       <input id="historyViewftpdirTXT" class="inputTEXTcss" placeholder="Directory" v-model="historyViewftpdirTXT" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Time Interval(mins) : </span>
                       <select class="inputTEXTcss"  name="historyViewftpTimeInt" id="historyViewftpTimeInt" v-model="historyViewftptimeoutTXT" disabled>
																<!-- <option value='5' selected>5</option> -->
																<option value='15' selected>15</option>
																<option value='30'>30</option>
																<option value='60'>60</option>
															</select>
              </div>
              </div>
 </div>
<hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >IEC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="historyViewiec104Enablechekbox" v-model="historyViewiec104Enablechekbox" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Station Address : </span>
                       <input id="historyViewiecStationTXT" class="inputTEXTcss" placeholder="Station Address" v-model="historyViewiecStationTXT" maxlength="32" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Port Number :</span>
                       <input id="historyViewiecportTXT" class="inputTEXTcss" placeholder="Port Number" v-model="historyViewiecportTXT" @keydown.space.prevent @keypress="isNumber($event)" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Cyclic Int(in Sec) : </span>
                       <input id="historyViewiecCylicTXT" class="inputTEXTcss" placeholder="Cyclic Int(in Sec)" v-model="historyViewiecCylicTXT"  @keypress="isNumber($event)" disabled/>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Start IOA Addr : </span>
                       <input id="historyViewstartIOAaddTXT" class="inputTEXTcss" placeholder="Start IOA Addr" v-model="historyViewstartIOAaddTXT"  @keypress="isNumber($event)" disabled/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">COT Size : </span>
                       <select id="historyViewiecCodsizedwnTXT" v-model="historyViewiecCodsizedwnTXT" class="inputTEXTcss" disabled>
                              <option value="Choose COT Size" selected disabled>Choose COT Size</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                      </select>
              </div>
             <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IOA : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <select id="historyViewiecIOAsizedwnTXT" v-model="historyViewiecIOAsizedwnTXT" class="inputTEXTcss" disabled>
                              <option value="Choose IOA Size" selected disabled>Choose IOA Size</option>
                              <option value="3">3</option>
                              <option value="2">2</option>
                      </select>
              </div>
              </div>
</div>
                <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
                <h6 class="heading-small text-header-color mb-2" >Allowed Master&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <label style="margin-left:10px;">
                           <input type="checkbox" id="historyViewgenallowcommonchkbx" v-model="historyViewgenallowcommonchkbx" disabled/> Enable
                        </label></h6>
<div class="pl-lg-1">
 <div class="row">
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="historyViewgenallow1chkbx" v-model="historyViewgenallow1chkbx" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="historyViewgenallow1IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="historyViewgenallow1IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="historyViewgenallow2chkbx" v-model="historyViewgenallow2chkbx" :disabled="!historyViewgenallowcommonchkbx"/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="historyViewgenallow2IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="historyViewgenallow2IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="historyViewgenallow3chkbx" v-model="historyViewgenallow3chkbx" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="historyViewgenallow3IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="historyViewgenallow3IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-1">
                        <label style="margin-top: 25px;">
                           <input type="checkbox" id="historyViewgenallow4chkbx" v-model="historyViewgenallow4chkbx" disabled /> Enable
                        </label>
                      </div>
                      <div class="col-lg-2">
                        <div>
                        <label class="form-control-label">IP Address</label>
                        <div class="form control">
                        <input id="historyViewgenallow4IPTXT" @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a IP Address" class="outerInputCss" v-model="historyViewgenallow4IPTXT" disabled/>
                        </div>
                        </div>
                      </div>
 </div>
</div>

                  <hr class="my-1" style="margin-top: 0px;margin-bottom: 0px;" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false" >MQTT</h6>
                  <div class="pl-lg-1" v-show="false" >
                    <div class="row">
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Broker IP</label>
                        <div class="form control">
                        <input id="historyViewgenMQTTbrokerIPTXT" disabled @keydown.space.prevent @keypress="isNumber($event)" maxlength="32" placeholder="Enter a Broker IP" class="outerInputCss" v-model="historyViewmqttBrokerTXT"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Port No</label>
                        <div class="form control">
                        <input id="historyViewgenMQTTPortTXT" disabled placeholder="Port No" class="outerInputCss" title="Range(1-65535)" @keydown.space.prevent  @keypress="isNumber($event)" @input="filterInput2($event)" maxlength="5" v-model="historyViewmqttPortNoTXT1"/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Username</label>
                        <div class="form control">
                        <input id="historyViewgenMQTTusernameTXT" placeholder="Username" maxlength="32" class="outerInputCss" v-model="historyViewmqttUsernameTXT" disabled/>
                        </div>
                        </div>
                      </div>
                      <div class="col-lg-3">
                         <div>
                        <label class="form-control-label">Password</label>
                        <div class="form control">
                        <input id="historyViewgenMQTTpasswdTXT" :type="historyViewtypevalue1" placeholder="Password" maxlength="32" class="outerInputCss" v-model="historyViewmqttPasswodTXT" disabled/>
                        <img id="historyViewmqttcnpasswdimg1" :src="historyViewimgvalue1" class="eyeimg" title="show password" @click="historyViewshowPassword1()">
                        </div>
                        </div>   
                      </div>
                    </div>
                    <div class="row"> 
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Publish Topic</label>
                        <div class="form control">
                        <input id="historyViewgenMQTTPublishtocTXT" placeholder=" Publish Topic" class="outerInputCss" v-model="historyViewmqttPublicTopicTXT" disabled/>
                        </div>
                        </div>                          
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Publish Interval (Hrs, Mins, Secs)</label>
                          <div class="form control">
                              <select id="historyViewgenmqttHrsdropDwn"
                              v-model="historyViewmqttHrsTXT"   class="disable" disabled
                              style="height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item1 in Hours24Array" v-bind:value="item1" v-bind:key="item1" >{{ item1 }}</option>
                            </select> 

                            <select id="historyViewgenmqttMinsdropDwn" disabled
                              v-model="historyViewmqttMinsTXT"   class="disable"
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item2 in Mins5Array" v-bind:value="item2" v-bind:key="item2" >{{ item2 }}</option>
                            </select>   

                               <select id="historyViewgenmqttSecsdropDwn"
                              v-model="historyViewmqttSecsTXT"  class="disable" disabled
                              style="margin-left:10px;height:30px;width:20%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                             <option  v-for="item3 in SecondsArray" v-bind:value="item3" v-bind:key="item3" >{{ item3 }}</option>
                            </select> 
                           
                          </div>
                        </div>
                      </div>                     
                    </div>
                    <div class="row">
                    
                      <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Events : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="historyViewmqttEnableEventsChkBOX" id="historyViewgenmqttEventschkbox" disabled/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Events Topic</label>
                        <div class="form control">
                        <input id="historyViewgenmqttEventstocTXT" placeholder="Events Topic" class="outerInputCss" disabled v-model="historyViewmqttEventsTopicTXT"/>
                        </div>
                        </div>
                      </div>
                     <div class="col-lg-2" style="margin-top: 25px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="historyViewmqttEnablePingChkBOX" id="historyViewgenmqttPingchkbox" disabled/> Enable
                        </label>
                      </div>
                      <div class="col-lg-3">
                        <div>
                        <label class="form-control-label">Diag Topic</label>
                        <div class="form control">
                         <input id="historyViewgenmqttDiagtocTXT" placeholder="Diag Topic"  disabled class="outerInputCss" v-model="historyViewmqttDiagTXT"/>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr class="my-1" v-show="false" />
                  <h6 class="heading-small text-header-color mb-2" v-show="false">Modem</h6>
                  <div class="pl-lg-1" v-show="false">
                    <div class="row">
                       <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Modem : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" v-model="historyViewenableModemChkBox" id="historyViewgenmodemChkbox" disabled/> Enable
                        </label>
 
                      </div>
                      <div class="col-lg-2">
                        <div>
                          <label class="form-control-label">Connection Type</label>
                          <div class="form control">

                        <select id="historyViewgenmodemConnectionDropwn"
                              v-model="historyViewmodmConnectionTypeTXT" class="disable" disabled
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Connection</option>
                              <option value="LAN_TYPE">LAN_TYPE</option>
                              <option value="3G_TYPE">3G_TYPE</option>
                              <option value="CDMA_TYPE">CDMA_TYPE</option>
                              <option value="2G_TYPE">2G_TYPE</option>
                              <option value="4G_TYPE">4G_TYPE</option>
                              <option value="5G_TYPE">5G_TYPE</option>
                            
                            </select>
 </div> </div>

                      </div>
                      <div class="col-lg-2">
                        <input id="historyViewgenmodemusernameTXT"
                          alternative
                          label="Username"
                          placeholder="Username" disabled
                          class="outerInputCss"
                          v-model="historyViewUsernameTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative  id="historyViewgenmodempasswordTXT"
                          label="Password"  disabled
                          placeholder="Password" :type="historyViewtypevalue"
                          class="outerInputCss"
                          v-model="historyViewPasswordTXT"
                        />
                        <img id="historyViewgenmodemcnpasswdimg" :src="historyViewimgvalue" class="eyeimg" title="show password" @click="historyViewshowPassword()">
                      </div>
                       <div class="col-lg-2">
                        <input 
                          alternative id="historyViewgenmodemPHTXT"
                          label="Phone Number (Num length 10)" disabled
                          placeholder="Phone Number" maxlength="10" @keydown.space.prevent @keypress="isNumber($event)"
                          class="outerInputCss"
                          v-model="historyViewmodemPhNumTXT"
                        />
                     
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="APN" id="historyViewgenmodemAPNTXT"
                          placeholder="APN" disabled
                          class="outerInputCss"
                          v-model="historyViewapnTXT"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> Ping : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="historyViewgenmodemPingChkBox" v-model="historyViewenablePinChkBox"  disabled/> Enable
                        </label>
 
                      </div>
                   
                      <div class="col-lg-2">
                        <input
                          alternative
                          label="Ping IP" id="historyViewgenmodempingIpTXT"
                          placeholder="Ping IP"
                          class="outerInputCss" disabled
                          v-model="historyViewpingIpTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="historyViewgenmodemAttemptsTXT"
                          label="Ping Num (between 5 to 10)"
                          placeholder="Num attempts"
                          class="outerInputCss" disabled
                          v-model="historyViewpingNumTXT"
                        />
                      </div>
                      <div class="col-lg-2">
                        <input
                          alternative id="historyViewgenmodemPingintervalTXT"
                          label="Ping Interval (in secs)"
                          placeholder="Interval"
                          class="outerInputCss" disabled
                          v-model="historyViewpingTimeoutTXT"
                        />
                      </div>
                    </div>
                  </div>


                  <hr class="my-1" v-show="false"/>
                  <h6 class="heading-small text-header-color mb-2" v-show="false">VPN</h6>
                  <div class="pl-lg-1" v-show="false">
                     <div class="row">
<div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label"> VPN : </label>  
                        <label style="margin-left:10px;">
                           <input type="checkbox" id="historyViewgenVPNchkbox" v-model="historyViewenableVPNChkBox" disabled/> Enable
                        </label>
 
                      </div>

                      <div class="col-lg-2" >
                          <div>
                          <label class="form-control-label">Choose VPN Type</label>
                          <div class="form control">
                            <select id="historyViewgenVPNTypeDropwn" v-model="historyViewselectVpnVal" disabled class="disable" 
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0">VPN Disable</option>
                              <option value="1">VPN_IPSEC</option>
                              <option value="2">VPN_PPTP</option>
                            
                            </select>
                          </div>
                        </div>
 
                      </div>
                     </div>
                     <div style="height:10px"></div>
                      <div style="border:1px solid lightgray;padding:5px;">
                        <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_IPSEC</h5>
                    <div class="row">
                        
                   
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenVPNTunnelTXT"
                          label="Tunnel Name  (Max length 64)"
                          placeholder="Tunnel Name"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnTunnelNameTXT" maxlength="64" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnSharedKeyTXT"
                          label="Pre SharedKey (Max length 64)"
                          placeholder="Pre SharedKey"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnSharedKeyTXT" maxlength="64" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnKeyLifeTimeTXT"
                          label="KeyLifeTime (mins 1 to 10)"
                          placeholder="KeyLifeTime"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnKeyLifeTimeTXT" maxlength="2" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnRightIpTXT"
                          label="Right IP"
                          placeholder="Right IP"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnRightIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnRightSubnetTXT"
                          label="Right Subnet"
                          placeholder="Right Subnet"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnRightSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnRightIdTXT"
                          label="Right ID  (Max length 32)"
                          placeholder="Right ID"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnRightIdTXT" maxlength="32" 
                        />
                      </div>
                     
                    </div>


                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnLeftIpTXT"
                          label="Left IP"
                          placeholder="Left IP"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnLeftIpTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnLeftSubnetTXT"
                          label="Left Subnet"
                          placeholder="Left Subnet"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnLeftSubnetTXT" maxlength="16" 
                        />
                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnLeftIdTXT"
                          label="Left ID (Max length 32)"
                          placeholder="Left ID"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnLeftIdTXT" maxlength="32" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input 
                          alternative id="historyViewgenvpnLefSrcIPTXT"
                          label="Left Source IP"
                          placeholder="Left Source IP"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnLefSrcIPTXT" maxlength="32" 
                        />
                      </div>
                    </div>

                     <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative
                          label="PFS" id="historyViewgenvpnPfsTXT"
                          placeholder="PFS"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnPfsTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Aggr Mode</label>
                          <div class="form control">
                            <select id="historyViewgenvpnAggrModeTXT"
                              v-model="historyViewvpnAggrModeTXT" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="1">Yes</option>
                              <option value="2">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnKeyingModeTXT"
                          label="Keying Mode (Max length 8)" 
                          placeholder="KeyingMode"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnKeyingModeTXT" maxlength="8" 
                        />
                      </div>

                       <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnNatTravTXT"
                          label="Nat Trav" 
                          placeholder="Nat Trav"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnNatTravTXT" maxlength="2"  @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>
                     
                    </div>

                    <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase1 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="historyViewgenvpnDhGrpTXT1"
                              v-model="historyViewvpnDhGrpTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select  id="historyViewgenvpnEncrptTXT1"
                              v-model="historyViewvpnEncrptTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="historyViewgenvpnAuthenTXT1"
                              v-model="historyViewvpnAuthenTXT1" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            
                            </select>
                          </div>
                        </div>
                      </div>
                     
                    </div>
<div style="height:10px;"></div>
                     <div class="row">
                     <div class="col-lg-2" style="margin-top: 35px;">
                       <label class="form-control-label">Vpn Phase2 Config: </label>  
                      </div>
                      <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">DhGrp</label>
                          <div class="form control">
                            <select id="historyViewgenvpnDhGrpTXT2"
                              v-model="historyViewvpnDhGrpTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select DhGrp</option>
                              <option value="1">G1_768_BIT</option>
                              <option value="2">G2_1024_BIT</option>
                              <option value="3">G5_1536_BIT</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                         <div>
                          <label class="form-control-label">Encrpt</label>
                          <div class="form control">
                            <select id="historyViewgenvpnEncrptTXT2"
                              v-model="historyViewvpnEncrptTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="4">ENC_DES</option>
                              <option value="5">ENC_3DES</option>
                              <option value="6">ENC_AES_128</option>
                              <option value="7">ENC_AES_192</option>
                              <option value="8">ENC_AES_256</option>
                            </select>
                          </div>
                        </div>
                      </div>

                       <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Authentication</label>
                          <div class="form control">
                            <select id="historyViewgenvpnAuthenTXT2"
                              v-model="historyViewvpnAuthenTXT2" disabled class="disable"
                              style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;"
                            >
                              <option value="0" selected>Select Mode</option>
                              <option value="9">AUT_MD5</option>
                              <option value="10">AUT_SHA1</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style="height:15px;"></div>
                  </div>
                  <div style="height:10px;"></div>
                  <div style="border:1px solid lightgray;padding:5px;">
                       <h5 style="background:rgb(58, 67, 117) none repeat scroll 0% 0%;color:#fff;width:100px;padding: 5px;margin-top: -5px;">VPN_PPTP</h5>

                <div class="row">
                <div class="col-lg-3">
                        <div>
                          <label class="form-control-label">Require Memory Map</label>
                          <div class="form control">
                            <select id="historyViewgenReqMmpeType" v-model="historyViewReqMmpeType" disabled class="disable" style="height:30px;width:100%;font-size: 12px;border-radius: 0;border: 1px solid lightgray;font-weight: 400;background-color: #fff;">
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>

                      </div>
                      <div class="col-lg-3">
                       <input id="historyViewgenvpnPptpconnNameTXT"
                          alternative
                          label="Connection Name"
                          placeholder="Connection Name"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnPptpconnNameTXT" maxlength="16" @keydown.space.prevent @keypress="isNumber($event)"
                        />
                      </div>

                       <div class="col-lg-3">
                        <input id="historyViewgenvpnPptpLocalUnameTXT"
                          alternative
                          label="Local User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnPptpLocalUnameTXT" maxlength="32"
                        />
                      </div>
                     <div class="col-lg-3">
                          <input
                          alternative id="historyViewgenvpnPptpLocalUpassTXT"
                          label="Local Password"  :type="historyViewtypevalue2"
                          placeholder="Local Password" maxlength="32"
                          class="outerInputCss"
                          v-model="historyViewvpnPptpLocalUpassTXT" disabled
                        />
                        <img id="historyViewvpnpptpPasswdimg1" :src="historyViewimgvalue2" class="eyeimg" title="show password" >
                      </div>
                    </div>
                  <div class="row">
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnPptpRemoteUnameTXT"
                          label="Remote User Name"
                          placeholder="Local User Name"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnPptpRemoteUnameTXT" maxlength="32"
                        />

                      </div>
                      <div class="col-lg-3">
                        <input
                          alternative id="historyViewgenvpnPptpRemoteIpTXT"
                          label="Remote IP Address"
                          placeholder="Remote IP Address"
                          class="outerInputCss" disabled
                          v-model="historyViewvpnPptpRemoteIpTXT" maxlength="32"  @keydown.space.prevent @keypress="isNumber($event)"
                        />

                      </div>
                      </div>
                      </div>
                      </div>
                      <hr class="my-1" style="margin-top: 5px;margin-bottom: 0px;" />
            </div>
                            </div>
                            </div>
          </div>
          <!--Footer-->
          </div>
          </modal>



      <!-- view history dlms popup   start-->

      
  <modal id="historydlmsconfigPopup" name="historydlmsconfigPopup" transition="nice-modal-fade" classes="demo-modal-class"  :min-width="300" :min-height="200" :pivot-y="1.5"
        :adaptive="true" :draggable="true"
        :scrollable="true"
        :reset="true" style="z-index:11111 !important;"
        width="40%"
        height="auto"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
        @before-close="beforeClose" :clickToClose="false">
        <div class="size-modal-content">
          <div class="row">
            <div class="modal-header">
              <div class="col-lg-9" style="margin-top:-10px;">
              <h4 class="heading" style="color: rgb(0, 115, 183);"> {{deviceTblDeviceName}} - Ethernet Configuration  </h4>
              </div>
              <div class="col-lg-3 text-right" style="margin-top:-10px;">
              <button id="closehistorydlmsconfigPopupbtn1" type="button" class="btn btn-default" @click="closehistorydlmsconfigPopup" style="background:transparent;border:1px solid transparent">
              <span aria-hidden="true" class="white-text">&times;</span>
              </button>
              </div>
               </div>
              </div>
          <!--Body-->
          <div class="modal-body" style="margin-top:-10px;">
            <div class="row">
                          <div class="col-md-12">
              <template>
              <div class="historyViewle-responsive" id="historyViewrmsDLMSConfigTablePANE" style="height:500px;border:1px solid lightgray;overflow: auto;">
                <table
                  class="table table-bordered"
                  id="rmsDLMSConfigTableid"
                >
                  <thead class style="position: sticky;top: -1px;z-index:1;">
                    <tr>
                      <th>S.No</th>
                      <th>Enable</th>
                      <th>Meter IP address</th>
                      <th>Port Number</th>
                      <th>Password</th>
                      <th>Meter Location </th>
                    </tr>
                  </thead>
                  <tbody v-if="historyViewrmsMeterDLMSConfigJson != ''">
                    <tr
                      v-for="(items,index) in historyViewrmsMeterDLMSConfigJson.details"
                      v-bind:key="index"
                    >
                      <td>{{index+1}}</td>
                      <td class="text-center" style="vertical-align: middle;" v-if="items.meter_enable == 'Yes'"><span :id="'historyViewdlmsETHEnableTXT'+(index+1)">Enable</span></td>
                      <td class="text-center" style="vertical-align: middle;" v-else><span :id="'historyViewdlmsETHEnableTXT'+(index+1)">Disable</span></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'historyViewdlmsETHipTXT'+(index+1)" :value="items.meter_ip" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'historyViewdlmsETHportTXT'+(index+1)" :value="items.meter_port" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="password" class="inputTEXTcss center-block text-center" :id="'historyViewdlmsETHpassTXT'+(index+1)" :value="items.meter_pass" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                      <td><input type="text" class="inputTEXTcss center-block text-center" :id="'historyViewdlmsETHlocTXT'+(index+1)" :value="items.meter_location" :disabled="true" v-bind:class="items.meter_enable == 'Yes'? '' : 'disableCSS'"/></td>
                    </tr>
                  </tbody>
                </table>
                 <div v-if="historyViewrmsMeterDLMSConfigJson == ''" style="text-align:center;width: 100%;">
                      <span>no record found</span>
                 </div>
              </div>
            </template>
                            </div>
                            </div>
          </div>
          <!--Footer-->
          </div>
          </modal>
        <!--Rework Device page END-->
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
  name: 'deviceconfigPAGE',
  components: {
    CripNotice,
    VueElementLoading,
    Datepicker
  },
  data () {
    return {
      isLoading:false,
      clearFlag:false,
      historyBTNclickTXT:'Configuration',
      configHistoryTableJSONS:'',
      historyFromdateTXT:myDate,
      historyTodateTXT:myDate,
      historydisabledDates: {
        from: new Date()
      },
      username: this.$session.get('username'),
      userrole: this.$session.get('userrole'),
      confrimationTEXT:'',
      activatedInterval:null,
      devicesummarypopupTITLE:'Configuration',
      firmwareSummaryPopupTitle:'Firmware Configuration',
      deviceReasonTXT:'',
      confirmationPopupTitle:'Confirmation',
      confrimationApplyBtnTXT:'Apply',
      saveDmls:'',
      devicetblHeight:'',
      company_name:"",
      company_logo:"",
      serial_number:"",
      rmsdeviceConfigJson: "",
      rmsMeterDLMSConfigJson:"",
      copyrmsMeterDLMSConfigJson:'',
      dlmsupdateId:'',
      dlmsupdatedeviceName:'',
      firmwareIPTXT:"",
      firmwarePORTTXT:"",
      firmwareUSERTXT:"",
      firmwarePASSTXT:"",
      firmwareSELTXT:"Choose Firmware",
      fwListArray:[],
      firmwarePREVVERTXT:'',
      firmwareCURRVERTXT:'',
      firmwareNEWVERTXT:'',
      deviceStatusArray: [
        { id: "0", name: "Disable" },
        { id: "1", name: "Enable" }
      ],
      rmsdeviceIDTXT:'',
      rmsdeviceNameTXT: "",
      rmsdeviceIPTXT: "",
      deviceEditMode:false,
      dcuGCSTXT:'2',
      dcuOutgoingFeederTXT:'8',
      ssRatingTXT:'110/11kV',
      rmsdevicePortnoTXT: 1,
      rmsdevicenoOfmeterTXT:"",
      rmsdeviceLocationTXT: "",
      rmsdevicestatusTXT: "1",
      rmsdeviceepopupTitle: "",
      rmsSavebtnTXT: "",
      updateid: "",
      rmsMeterListJson: "",
      deviceMeterUIName:'',
      isload: false,
      metertypelistArray:[],
      meterpopupTITLE:'',
      rmsmeterNameTXT :'',
      rmsmeterTypeListTXT :'',
      rmsmeterslaveAddTXT:'',
      meterpopupSavebtnTXT:'',
      rmsmeterStatusListTXT:'0',
      updatemeterpopupID:0,
      configureMeterTbname:'',
      configureIOTTbname:'',
      configureMeterTbID:0,
      configuredeviceName:'',
      configurecmdName:'',
      confrimationSUBTEXT:'',
      configurenoofMetersTbID:0,
      // device IOT gateway function variables
      configIOTpopupTITLE:'DCU General Configuration',
      orginalGenConfigJson : "",
      copydeviceGenConfigJson:[],
      Hours24Array:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      HoursArray:[0,1,2,3,4,5,6,7,8,9,10,11,12],
      MinsArray:[0,15,30,45],
      Mins5Array:[0,5,10,15,20,25,30,35,40,45,50,55,60],
      SecondsArray:[0],
      deviceHoursArray:[0,1,2,3,6,8,12,24],
      deviceMinsArray:[0,5,10,15,30,60],
      devicehoursVAL:"choose hours",
      deviceminsVAL:"choose minutes",
      getGenEthNumPort:null,
      gatewayTXT: "",
      locationTXT: "",
      enabledbglogChkBox: false,
      dbglogIpTXT:"",
      networkbtnTXT:'CDCS Network',
      ipaddressTXT: "",
      newipaddressTXT: "",
      subnetmaskTXT: "",
      gateTXT: "",
      ipaddressTXT2: "",
      newipaddressTXT2: "",
      subnetmaskTXT2: "",
      gateTXT2: "",
      ipaddressTXT3: "",
      newipaddressTXT3: "",
      subnetmaskTXT3: "",
      gateTXT3: "",
      ipaddressTXT4: "",
      newipaddressTXT4: "",
      subnetmaskTXT4: "",
      gateTXT4: "",
      modmConnectionTypeTXT: "0",
      UsernameTXT: "",
      PasswordTXT: "",
      apnTXT: "",
      enablePinChkBox: false,
      enableModemChkBox: false,
      modemPhNumTXT:'',
      pingIpTXT: "",
      pingNumTXT: "",
      pingTimeoutTXT: "",
      ntpChekBOX1: false,
      ntpChekBOX2: false,
      ntpIpaddressTXT: "",
      ntpPortNoTXT: "",
      ntpIpaddressTXT2: "",
      ntpPortNoTXT2: "",
      ntpIntervalTXT:"",
      ntpTimeOffsetHrsTXT:"0",
      ntpTimeOffsetSecTXT:"0",
// VPN
      enableVPNChkBox: "0",
      selectVpnVal : '1',
      ReqMmpeType:'Yes',
      vpnPptpconnNameTXT:"",
      vpnPptpLocalUnameTXT:"",
      vpnPptpLocalUpassTXT:"",
      vpnPptpRemoteUnameTXT:"",
      vpnPptpRemoteIpTXT:"",

      vpnTunnelNameTXT:"",
      vpnSharedKeyTXT:"",
      vpnKeyLifeTimeTXT:"",
      vpnRightIpTXT:"",
      vpnRightSubnetTXT:"",
      vpnRightIdTXT:"",

      vpnLeftIpTXT:"",
      vpnLeftSubnetTXT:"",
      vpnLeftIdTXT:"",
      vpnLefSrcIPTXT:"",

      vpnPfsTXT:"",
      vpnAggrModeTXT : '0',
      vpnKeyingModeTXT:"",
      vpnNatTravTXT:"",

      vpnDhGrpTXT1 : '0',
      vpnEncrptTXT1 : '0',
      vpnAuthenTXT1 : '0',

      vpnDhGrpTXT2 : '0',
      vpnEncrptTXT2 : '0',
      vpnAuthenTXT2 : '0', 
//Mqtt
      mqttBrokerTXT: "",
      mqttPortNoTXT1: "",
      mqttStatusTXT2: "",
      mqttUsernameTXT: "",
      mqttPasswodTXT: "",
      genallowcommonchkbx:false,
      genallow1chkbx: false,
      genallow1IPTXT: "",
      genallow2chkbx: false,
      genallow2IPTXT: "",
      genallow3chkbx: false,
      genallow3IPTXT: "",
      genallow4chkbx: false,
      genallow4IPTXT: "",
      iec104Enablechekbox:false,
      ftpEnablechekbox:false,
      ftpIpaddTXT:'',
      ftpprtnoTXT:'',
      ftpusernameTXT:'',
      ftppasswordTXT:'',
      ftpdirTXT:'',
      ftptimeoutTXT:'15',
      iecStationTXT: '',
      startIOAaddTXT:'',
      iecCodsizedwnTXT: 'Choose COT Size',
      iecCylicTXT: '',
      iecIOAsizedwnTXT: 'Choose IOA Size',
      iecTSTAdwnTXT: 'Choose TSTA',
      iecTSTAstartAddresTXT: '',
      iecportTXT: '',
      iecTimeout1TXT: '',
      iecTimeout2TXT: '',
      iecTimeout3TXT: '',
      mqttPublicTopicTXT: "",
      mqttHrsTXT: "0",
      mqttMinsTXT: "0",
      mqttSecsTXT: "0",
      mqttSubscrbeTXT: "",
      mqttEnableEventsChkBOX: false,
      mqttEventsTopicTXT: "",
      mqttEnablePingChkBOX: false,
      mqttDiagTXT: "",
      no_serialDropTXT:"1",
      serialBaudRateDropTXT1: "9600",
      serialDatabitsDropTXT1: "8",
      serialStopbitsDropTXT1: "1",
      serialParityDropTXT1: "None",
      serialHandshakeDropTXT1: "None",
      serialInfModeDropTXT1: "Choose Mode",
      serialBaudRateDropTXT2: "9600",
      serialDatabitsDropTXT2: "8",
      serialStopbitsDropTXT2: "1",
      serialParityDropTXT2: "None",
      serialHandshakeDropTXT2: "None",
      serialInfModeDropTXT2: "Choose Mode",
      serialBaudRateDropTXT3: "9600",
      serialDatabitsDropTXT3: "8",
      serialStopbitsDropTXT3: "1",
      serialParityDropTXT3: "None",
      serialHandshakeDropTXT3: "None",
      serialInfModeDropTXT3: "Choose Mode",
      serialBaudRateDropTXT4: "9600",
      serialDatabitsDropTXT4: "8",
      serialStopbitsDropTXT4: "1",
      serialParityDropTXT4: "None",
      serialHandshakeDropTXT4: "None",
      serialInfModeDropTXT4: "Choose Mode",
      imgvalue: "static/img/images/Peye1.png",
      typevalue: "password",
      imgvalue1: "static/img/images/Peye1.png",
      typevalue1: "password",
      imgvalue2: "static/img/images/Peye1.png",
      typevalue2: "password",
      // tab related 
      tabgetGenEthNumPort:null,
      tabrmsMeterDLMSConfigJson:"",
      tabgatewayTXT: "",
      tablocationTXT: "",
      tabenabledbglogChkBox: false,
      tabdbglogIpTXT:"",
      tabnetworkbtnTXT:"CDCS Network",
      tabipaddressTXT: "",
      tabnewipaddressTXT: "",
      tabsubnetmaskTXT: "",
      tabgateTXT: "",
      tabipaddressTXT2: "",
      tabnewipaddressTXT2: "",
      tabsubnetmaskTXT2: "",
      tabgateTXT2: "",
      tabipaddressTXT3: "",
      tabnewipaddressTXT3: "",
      tabsubnetmaskTXT3: "",
      tabgateTXT3: "",
      tabipaddressTXT4: "",
      tabnewipaddressTXT4: "",
      tabsubnetmaskTXT4: "",
      tabgateTXT4: "",
      tabmodmConnectionTypeTXT: "0",
      tabUsernameTXT: "",
      tabPasswordTXT: "",
      tabapnTXT: "",
      tabenablePinChkBox: false,
      tabenableModemChkBox: false,
      tabmodemPhNumTXT:'',
      tabpingIpTXT: "",
      tabpingNumTXT: "",
      tabpingTimeoutTXT: "",
      tabntpChekBOX1: false,
      tabntpChekBOX2: false,
      tabntpIpaddressTXT: "",
      tabntpPortNoTXT: "",
      tabntpIpaddressTXT2: "",
      tabntpPortNoTXT2: "",
      tabntpIntervalTXT:"",
      tabntpTimeOffsetHrsTXT:"0",
      tabntpTimeOffsetSecTXT:"0",
// VPN
      tabenableVPNChkBox: "0",
      tabselectVpnVal : '1',
      tabReqMmpeType:'Yes',
      tabvpnPptpconnNameTXT:"",
      tabvpnPptpLocalUnameTXT:"",
      tabvpnPptpLocalUpassTXT:"",
      tabvpnPptpRemoteUnameTXT:"",
      tabvpnPptpRemoteIpTXT:"",

      tabvpnTunnelNameTXT:"",
      tabvpnSharedKeyTXT:"",
      tabvpnKeyLifeTimeTXT:"",
      tabvpnRightIpTXT:"",
      tabvpnRightSubnetTXT:"",
      tabvpnRightIdTXT:"",

      tabvpnLeftIpTXT:"",
      tabvpnLeftSubnetTXT:"",
      tabvpnLeftIdTXT:"",
      tabvpnLefSrcIPTXT:"",

      tabvpnPfsTXT:"",
      tabvpnAggrModeTXT : '0',
      tabvpnKeyingModeTXT:"",
      tabvpnNatTravTXT:"",

      tabvpnDhGrpTXT1 : '0',
      tabvpnEncrptTXT1 : '0',
      tabvpnAuthenTXT1 : '0',

      tabvpnDhGrpTXT2 : '0',
      tabvpnEncrptTXT2 : '0',
      tabvpnAuthenTXT2 : '0', 
//Mqtt
      tabmqttBrokerTXT: "",
      tabmqttPortNoTXT1: "",
      tabmqttStatusTXT2: "",
      tabmqttUsernameTXT: "",
      tabmqttPasswodTXT: "",
      tabgenallowcommonchkbx:false,
      tabgenallow1chkbx: false,
      tabgenallow1IPTXT: "",
      tabgenallow2chkbx: false,
      tabgenallow2IPTXT: "",
      tabgenallow3chkbx: false,
      tabgenallow3IPTXT: "",
      tabgenallow4chkbx: false,
      tabgenallow4IPTXT: "",
      tabiec104Enablechekbox:false,
      tabftpEnablechekbox:false,
      tabftpIpaddTXT:'',
      tabftpprtnoTXT:'',
      tabftpusernameTXT:'',
      tabftppasswordTXT:'',
      tabftpdirTXT:'',
      tabftptimeoutTXT:'15',
      tabiecStationTXT: '',
      tabstartIOAaddTXT:'',
      tabiecCodsizedwnTXT: 'Choose COT Size',
      tabiecCylicTXT: '',
      tabiecIOAsizedwnTXT: 'Choose IOA Size',
      tabiecTSTAdwnTXT: 'Choose TSTA',
      tabiecTSTAstartAddresTXT: '',
      tabiecportTXT: '',
      tabiecTimeout1TXT: '',
      tabiecTimeout2TXT: '',
      tabiecTimeout3TXT: '',
      tabmqttPublicTopicTXT: "",
      tabmqttHrsTXT: "0",
      tabmqttMinsTXT: "0",
      tabmqttSecsTXT: "0",
      tabmqttSubscrbeTXT: "",
      tabmqttEnableEventsChkBOX: false,
      tabmqttEventsTopicTXT: "",
      tabmqttEnablePingChkBOX: false,
      tabmqttDiagTXT: "",
      tabno_serialDropTXT:"1",
      tabserialBaudRateDropTXT1: "9600",
      tabserialDatabitsDropTXT1: "8",
      tabserialStopbitsDropTXT1: "1",
      tabserialParityDropTXT1: "None",
      tabserialHandshakeDropTXT1: "None",
      tabserialInfModeDropTXT1: "Choose Mode",
      tabserialBaudRateDropTXT2: "9600",
      tabserialDatabitsDropTXT2: "8",
      tabserialStopbitsDropTXT2: "1",
      tabserialParityDropTXT2: "None",
      tabserialHandshakeDropTXT2: "None",
      tabserialInfModeDropTXT2: "Choose Mode",
      tabserialBaudRateDropTXT3: "9600",
      tabserialDatabitsDropTXT3: "8",
      tabserialStopbitsDropTXT3: "1",
      tabserialParityDropTXT3: "None",
      tabserialHandshakeDropTXT3: "None",
      tabserialInfModeDropTXT3: "Choose Mode",
      tabserialBaudRateDropTXT4: "9600",
      tabserialDatabitsDropTXT4: "8",
      tabserialStopbitsDropTXT4: "1",
      tabserialParityDropTXT4: "None",
      tabserialHandshakeDropTXT4: "None",
      tabserialInfModeDropTXT4: "Choose Mode",
      tabimgvalue: "static/img/images/Peye1.png",
      tabtypevalue: "password",
      tabimgvalue1: "static/img/images/Peye1.png",
      tabtypevalue1: "password",
      tabimgvalue2: "static/img/images/Peye1.png",
      tabtypevalue2: "password",

      previousTabGenConfigJson:'',
      currentTabGenConfigJson:'',
      newTabGenConfigJson:'',

      // current tab related
      currentgetGenEthNumPort:null,
      currentTabrmsMeterDLMSConfigJson:"",
      currentTabgatewayTXT: "",
      currentTablocationTXT: "",
      currentTabenabledbglogChkBox: false,
      currentTabdbglogIpTXT:"",
      currentTabnetworkbtnTXT:"CDCS Network",
      currentTabipaddressTXT: "",
      currentTabnewipaddressTXT: "",
      currentTabsubnetmaskTXT: "",
      currentTabgateTXT: "",
      currentTabipaddressTXT2: "",
      currentTabnewipaddressTXT2: "",
      currentTabsubnetmaskTXT2: "",
      currentTabgateTXT2: "",
      currentTabipaddressTXT3: "",
      currentTabnewipaddressTXT3: "",
      currentTabsubnetmaskTXT3: "",
      currentTabgateTXT3: "",
      currentTabipaddressTXT4: "",
      currentTabnewipaddressTXT4: "",
      currentTabsubnetmaskTXT4: "",
      currentTabgateTXT4: "",
      currentTabmodmConnectionTypeTXT: "0",
      currentTabUsernameTXT: "",
      currentTabPasswordTXT: "",
      currentTabapnTXT: "",
      currentTabenablePinChkBox: false,
      currentTabenableModemChkBox: false,
      currentTabmodemPhNumTXT:'',
      currentTabpingIpTXT: "",
      currentTabpingNumTXT: "",
      currentTabpingTimeoutTXT: "",
      currentTabntpChekBOX1: false,
      currentTabntpChekBOX2: false,
      currentTabntpIpaddressTXT: "",
      currentTabntpPortNoTXT: "",
      currentTabntpIpaddressTXT2: "",
      currentTabntpPortNoTXT2: "",
      currentTabntpIntervalTXT:"",
      currentTabntpTimeOffsetHrsTXT:"0",
      currentTabntpTimeOffsetSecTXT:"0",
// VPN
      currentTabenableVPNChkBox: "0",
      currentTabselectVpnVal : '1',
      currentTabReqMmpeType:'Yes',
      currentTabvpnPptpconnNameTXT:"",
      currentTabvpnPptpLocalUnameTXT:"",
      currentTabvpnPptpLocalUpassTXT:"",
      currentTabvpnPptpRemoteUnameTXT:"",
      currentTabvpnPptpRemoteIpTXT:"",

      currentTabvpnTunnelNameTXT:"",
      currentTabvpnSharedKeyTXT:"",
      currentTabvpnKeyLifeTimeTXT:"",
      currentTabvpnRightIpTXT:"",
      currentTabvpnRightSubnetTXT:"",
      currentTabvpnRightIdTXT:"",

      currentTabvpnLeftIpTXT:"",
      currentTabvpnLeftSubnetTXT:"",
      currentTabvpnLeftIdTXT:"",
      currentTabvpnLefSrcIPTXT:"",

      currentTabvpnPfsTXT:"",
      currentTabvpnAggrModeTXT : '0',
      currentTabvpnKeyingModeTXT:"",
      currentTabvpnNatTravTXT:"",

      currentTabvpnDhGrpTXT1 : '0',
      currentTabvpnEncrptTXT1 : '0',
      currentTabvpnAuthenTXT1 : '0',

      currentTabvpnDhGrpTXT2 : '0',
      currentTabvpnEncrptTXT2 : '0',
      currentTabvpnAuthenTXT2 : '0', 
//Mqtt
      currentTabmqttBrokerTXT: "",
      currentTabmqttPortNoTXT1: "",
      currentTabmqttStatusTXT2: "",
      currentTabmqttUsernameTXT: "",
      currentTabmqttPasswodTXT: "",
      currentTabgenallowcommonchkbx:false,
      currentTabgenallow1chkbx: false,
      currentTabgenallow1IPTXT: "",
      currentTabgenallow2chkbx: false,
      currentTabgenallow2IPTXT: "",
      currentTabgenallow3chkbx: false,
      currentTabgenallow3IPTXT: "",
      currentTabgenallow4chkbx: false,
      currentTabgenallow4IPTXT: "",
      currentTabiec104Enablechekbox:false,
      currentTabftpEnablechekbox:false,
      currentTabftpIpaddTXT:'',
      currentTabftpprtnoTXT:'',
      currentTabftpusernameTXT:'',
      currentTabftppasswordTXT:'',
      currentTabftpdirTXT:'',
      currentTabftptimeoutTXT:'15',
      currentTabiecStationTXT: '',
      currentTabstartIOAaddTXT:'',
      currentTabiecCodsizedwnTXT: 'Choose COT Size',
      currentTabiecCylicTXT: '',
      currentTabiecIOAsizedwnTXT: 'Choose IOA Size',
      currentTabiecTSTAdwnTXT: 'Choose TSTA',
      currentTabiecTSTAstartAddresTXT: '',
      currentTabiecportTXT: '',
      currentTabiecTimeout1TXT: '',
      currentTabiecTimeout2TXT: '',
      currentTabiecTimeout3TXT: '',
      currentTabmqttPublicTopicTXT: "",
      currentTabmqttHrsTXT: "0",
      currentTabmqttMinsTXT: "0",
      currentTabmqttSecsTXT: "0",
      currentTabmqttSubscrbeTXT: "",
      currentTabmqttEnableEventsChkBOX: false,
      currentTabmqttEventsTopicTXT: "",
      currentTabmqttEnablePingChkBOX: false,
      currentTabmqttDiagTXT: "",
      currentTabno_serialDropTXT:"1",
      currentTabserialBaudRateDropTXT1: "9600",
      currentTabserialDacurrentTabitsDropTXT1: "8",
      currentTabserialStopbitsDropTXT1: "1",
      currentTabserialParityDropTXT1: "None",
      currentTabserialHandshakeDropTXT1: "None",
      currentTabserialInfModeDropTXT1: "Choose Mode",
      currentTabserialBaudRateDropTXT2: "9600",
      currentTabserialDacurrentTabitsDropTXT2: "8",
      currentTabserialStopbitsDropTXT2: "1",
      currentTabserialParityDropTXT2: "None",
      currentTabserialHandshakeDropTXT2: "None",
      currentTabserialInfModeDropTXT2: "Choose Mode",
      currentTabserialBaudRateDropTXT3: "9600",
      currentTabserialDacurrentTabitsDropTXT3: "8",
      currentTabserialStopbitsDropTXT3: "1",
      currentTabserialParityDropTXT3: "None",
      currentTabserialHandshakeDropTXT3: "None",
      currentTabserialInfModeDropTXT3: "Choose Mode",
      currentTabserialBaudRateDropTXT4: "9600",
      currentTabserialDacurrentTabitsDropTXT4: "8",
      currentTabserialStopbitsDropTXT4: "1",
      currentTabserialParityDropTXT4: "None",
      currentTabserialHandshakeDropTXT4: "None",
      currentTabserialInfModeDropTXT4: "Choose Mode",
      currentTabimgvalue: "static/img/images/Peye1.png",
      currentTabtypevalue: "password",
      currentTabimgvalue1: "static/img/images/Peye1.png",
      currentTabtypevalue1: "password",
      currentTabimgvalue2: "static/img/images/Peye1.png",
      currentTabtypevalue2: "password",


    // History view Res
       // current tab related
      historyViewgetGenEthNumPort:null,
      historyViewrmsMeterDLMSConfigJson:"",
      historyViewgatewayTXT: "",
      historyViewlocationTXT: "",
      historyViewenabledbglogChkBox: false,
      historyViewdbglogIpTXT:"",
      historyViewnetworkbtnTXT:"CDCS Network",
      historyViewipaddressTXT: "",
      historyViewnewipaddressTXT: "",
      historyViewsubnetmaskTXT: "",
      historyViewgateTXT: "",
      historyViewipaddressTXT2: "",
      historyViewnewipaddressTXT2: "",
      historyViewsubnetmaskTXT2: "",
      historyViewgateTXT2: "",
      historyViewipaddressTXT3: "",
      historyViewnewipaddressTXT3: "",
      historyViewsubnetmaskTXT3: "",
      historyViewgateTXT3: "",
      historyViewipaddressTXT4: "",
      historyViewnewipaddressTXT4: "",
      historyViewsubnetmaskTXT4: "",
      historyViewgateTXT4: "",
      historyViewmodmConnectionTypeTXT: "0",
      historyViewUsernameTXT: "",
      historyViewPasswordTXT: "",
      historyViewapnTXT: "",
      historyViewenablePinChkBox: false,
      historyViewenableModemChkBox: false,
      historyViewmodemPhNumTXT:'',
      historyViewpingIpTXT: "",
      historyViewpingNumTXT: "",
      historyViewpingTimeoutTXT: "",
      historyViewntpChekBOX1: false,
      historyViewntpChekBOX2: false,
      historyViewntpIpaddressTXT: "",
      historyViewntpPortNoTXT: "",
      historyViewntpIpaddressTXT2: "",
      historyViewntpPortNoTXT2: "",
      historyViewntpIntervalTXT:"",
      historyViewntpTimeOffsetHrsTXT:"0",
      historyViewntpTimeOffsetSecTXT:"0",
// VPN
      historyViewenableVPNChkBox: "0",
      historyViewselectVpnVal : '1',
      historyViewReqMmpeType:'Yes',
      historyViewvpnPptpconnNameTXT:"",
      historyViewvpnPptpLocalUnameTXT:"",
      historyViewvpnPptpLocalUpassTXT:"",
      historyViewvpnPptpRemoteUnameTXT:"",
      historyViewvpnPptpRemoteIpTXT:"",

      historyViewvpnTunnelNameTXT:"",
      historyViewvpnSharedKeyTXT:"",
      historyViewvpnKeyLifeTimeTXT:"",
      historyViewvpnRightIpTXT:"",
      historyViewvpnRightSubnetTXT:"",
      historyViewvpnRightIdTXT:"",

      historyViewvpnLeftIpTXT:"",
      historyViewvpnLeftSubnetTXT:"",
      historyViewvpnLeftIdTXT:"",
      historyViewvpnLefSrcIPTXT:"",

      historyViewvpnPfsTXT:"",
      historyViewvpnAggrModeTXT : '0',
      historyViewvpnKeyingModeTXT:"",
      historyViewvpnNatTravTXT:"",

      historyViewvpnDhGrpTXT1 : '0',
      historyViewvpnEncrptTXT1 : '0',
      historyViewvpnAuthenTXT1 : '0',

      historyViewvpnDhGrpTXT2 : '0',
      historyViewvpnEncrptTXT2 : '0',
      historyViewvpnAuthenTXT2 : '0', 
//Mqtt
      historyViewmqttBrokerTXT: "",
      historyViewmqttPortNoTXT1: "",
      historyViewmqttStatusTXT2: "",
      historyViewmqttUsernameTXT: "",
      historyViewmqttPasswodTXT: "",
      historyViewgenallowcommonchkbx:false,
      historyViewgenallow1chkbx: false,
      historyViewgenallow1IPTXT: "",
      historyViewgenallow2chkbx: false,
      historyViewgenallow2IPTXT: "",
      historyViewgenallow3chkbx: false,
      historyViewgenallow3IPTXT: "",
      historyViewgenallow4chkbx: false,
      historyViewgenallow4IPTXT: "",
      historyViewiec104Enablechekbox:false,
      historyViewftpEnablechekbox:false,
      historyViewftpIpaddTXT:'',
      historyViewftpprtnoTXT:'',
      historyViewftpusernameTXT:'',
      historyViewftppasswordTXT:'',
      historyViewftpdirTXT:'',
      historyViewftptimeoutTXT:'15',
      historyViewiecStationTXT: '',
      historyViewstartIOAaddTXT:'',
      historyViewiecCodsizedwnTXT: 'Choose COT Size',
      historyViewiecCylicTXT: '',
      historyViewiecIOAsizedwnTXT: 'Choose IOA Size',
      historyViewiecTSTAdwnTXT: 'Choose TSTA',
      historyViewiecTSTAstartAddresTXT: '',
      historyViewiecportTXT: '',
      historyViewiecTimeout1TXT: '',
      historyViewiecTimeout2TXT: '',
      historyViewiecTimeout3TXT: '',
      historyViewmqttPublicTopicTXT: "",
      historyViewmqttHrsTXT: "0",
      historyViewmqttMinsTXT: "0",
      historyViewmqttSecsTXT: "0",
      historyViewmqttSubscrbeTXT: "",
      historyViewmqttEnableEventsChkBOX: false,
      historyViewmqttEventsTopicTXT: "",
      historyViewmqttEnablePingChkBOX: false,
      historyViewmqttDiagTXT: "",
      historyViewno_serialDropTXT:"1",
      historyViewserialBaudRateDropTXT1: "9600",
      historyViewserialDahistoryViewitsDropTXT1: "8",
      historyViewserialStopbitsDropTXT1: "1",
      historyViewserialParityDropTXT1: "None",
      historyViewserialHandshakeDropTXT1: "None",
      historyViewserialInfModeDropTXT1: "Choose Mode",
      historyViewserialBaudRateDropTXT2: "9600",
      historyViewserialDahistoryViewitsDropTXT2: "8",
      historyViewserialStopbitsDropTXT2: "1",
      historyViewserialParityDropTXT2: "None",
      historyViewserialHandshakeDropTXT2: "None",
      historyViewserialInfModeDropTXT2: "Choose Mode",
      historyViewserialBaudRateDropTXT3: "9600",
      historyViewserialDahistoryViewitsDropTXT3: "8",
      historyViewserialStopbitsDropTXT3: "1",
      historyViewserialParityDropTXT3: "None",
      historyViewserialHandshakeDropTXT3: "None",
      historyViewserialInfModeDropTXT3: "Choose Mode",
      historyViewserialBaudRateDropTXT4: "9600",
      historyViewserialDahistoryViewitsDropTXT4: "8",
      historyViewserialStopbitsDropTXT4: "1",
      historyViewserialParityDropTXT4: "None",
      historyViewserialHandshakeDropTXT4: "None",
      historyViewserialInfModeDropTXT4: "Choose Mode",
      historyViewimgvalue: "static/img/images/Peye1.png",
      historyViewtypevalue: "password",
      historyViewimgvalue1: "static/img/images/Peye1.png",
      historyViewtypevalue1: "password",
      historyViewimgvalue2: "static/img/images/Peye1.png",
      historyViewtypevalue2: "password",


      // new tab related 
      newTabgetGenEthNumPort:null,
      newTabrmsMeterDLMSConfigJson:'',
      newTabgatewayTXT: "",
      newTablocationTXT: "",
      newTabenabledbglogChkBox: false,
      newTabdbglogIpTXT:"",
      newTabnetworkbtnTXT:"CDCS Network",
      newTabipaddressTXT: "",
      newTabnewipaddressTXT: "",
      newTabsubnetmaskTXT: "",
      newTabgateTXT: "",
      newTabipaddressTXT2: "",
      newTabnewipaddressTXT2: "",
      newTabsubnetmaskTXT2: "",
      newTabgateTXT2: "",
      newTabipaddressTXT3: "",
      newTabnewipaddressTXT3: "",
      newTabsubnetmaskTXT3: "",
      newTabgateTXT3: "",
      newTabipaddressTXT4: "",
      newTabnewipaddressTXT4: "",
      newTabsubnetmaskTXT4: "",
      newTabgateTXT4: "",
      newTabmodmConnectionTypeTXT: "0",
      newTabUsernameTXT: "",
      newTabPasswordTXT: "",
      newTabapnTXT: "",
      newTabenablePinChkBox: false,
      newTabenableModemChkBox: false,
      newTabmodemPhNumTXT:'',
      newTabpingIpTXT: "",
      newTabpingNumTXT: "",
      newTabpingTimeoutTXT: "",
      newTabntpChekBOX1: false,
      newTabntpChekBOX2: false,
      newTabntpIpaddressTXT: "",
      newTabntpPortNoTXT: "",
      newTabntpIpaddressTXT2: "",
      newTabntpPortNoTXT2: "",
      newTabntpIntervalTXT:"",
      newTabntpTimeOffsetHrsTXT:"0",
      newTabntpTimeOffsetSecTXT:"0",
// VPN
      newTabenableVPNChkBox: "0",
      newTabselectVpnVal : '1',
      newTabReqMmpeType:'Yes',
      newTabvpnPptpconnNameTXT:"",
      newTabvpnPptpLocalUnameTXT:"",
      newTabvpnPptpLocalUpassTXT:"",
      newTabvpnPptpRemoteUnameTXT:"",
      newTabvpnPptpRemoteIpTXT:"",

      newTabvpnTunnelNameTXT:"",
      newTabvpnSharedKeyTXT:"",
      newTabvpnKeyLifeTimeTXT:"",
      newTabvpnRightIpTXT:"",
      newTabvpnRightSubnetTXT:"",
      newTabvpnRightIdTXT:"",

      newTabvpnLeftIpTXT:"",
      newTabvpnLeftSubnetTXT:"",
      newTabvpnLeftIdTXT:"",
      newTabvpnLefSrcIPTXT:"",

      newTabvpnPfsTXT:"",
      newTabvpnAggrModeTXT : '0',
      newTabvpnKeyingModeTXT:"",
      newTabvpnNatTravTXT:"",

      newTabvpnDhGrpTXT1 : '0',
      newTabvpnEncrptTXT1 : '0',
      newTabvpnAuthenTXT1 : '0',

      newTabvpnDhGrpTXT2 : '0',
      newTabvpnEncrptTXT2 : '0',
      newTabvpnAuthenTXT2 : '0', 
//Mqtt
      newTabmqttBrokerTXT: "",
      newTabmqttPortNoTXT1: "",
      newTabmqttStatusTXT2: "",
      newTabmqttUsernameTXT: "",
      newTabmqttPasswodTXT: "",
      newTabgenallowcommonchkbx:false,
      newTabgenallow1chkbx: false,
      newTabgenallow1IPTXT: "",
      newTabgenallow2chkbx: false,
      newTabgenallow2IPTXT: "",
      newTabgenallow3chkbx: false,
      newTabgenallow3IPTXT: "",
      newTabgenallow4chkbx: false,
      newTabgenallow4IPTXT: "",
      newTabiec104Enablechekbox:false,
      newTabftpEnablechekbox:false,
      newTabftpIpaddTXT:'',
      newTabftpprtnoTXT:'',
      newTabftpusernameTXT:'',
      newTabftppasswordTXT:'',
      newTabftpdirTXT:'',
      newTabftptimeoutTXT:'15',
      newTabiecStationTXT: '',
      newTabstartIOAaddTXT:'',
      newTabiecCodsizedwnTXT: 'Choose COT Size',
      newTabiecCylicTXT: '',
      newTabiecIOAsizedwnTXT: 'Choose IOA Size',
      newTabiecTSTAdwnTXT: 'Choose TSTA',
      newTabiecTSTAstartAddresTXT: '',
      newTabiecportTXT: '',
      newTabiecTimeout1TXT: '',
      newTabiecTimeout2TXT: '',
      newTabiecTimeout3TXT: '',
      newTabmqttPublicTopicTXT: "",
      newTabmqttHrsTXT: "0",
      newTabmqttMinsTXT: "0",
      newTabmqttSecsTXT: "0",
      newTabmqttSubscrbeTXT: "",
      newTabmqttEnableEventsChkBOX: false,
      newTabmqttEventsTopicTXT: "",
      newTabmqttEnablePingChkBOX: false,
      newTabmqttDiagTXT: "",
      newTabno_serialDropTXT:"1",
      newTabserialBaudRateDropTXT1: "9600",
      newTabserialDanewTabitsDropTXT1: "8",
      newTabserialStopbitsDropTXT1: "1",
      newTabserialParityDropTXT1: "None",
      newTabserialHandshakeDropTXT1: "None",
      newTabserialInfModeDropTXT1: "Choose Mode",
      newTabserialBaudRateDropTXT2: "9600",
      newTabserialDanewTabitsDropTXT2: "8",
      newTabserialStopbitsDropTXT2: "1",
      newTabserialParityDropTXT2: "None",
      newTabserialHandshakeDropTXT2: "None",
      newTabserialInfModeDropTXT2: "Choose Mode",
      newTabserialBaudRateDropTXT3: "9600",
      newTabserialDanewTabitsDropTXT3: "8",
      newTabserialStopbitsDropTXT3: "1",
      newTabserialParityDropTXT3: "None",
      newTabserialHandshakeDropTXT3: "None",
      newTabserialInfModeDropTXT3: "Choose Mode",
      newTabserialBaudRateDropTXT4: "9600",
      newTabserialDanewTabitsDropTXT4: "8",
      newTabserialStopbitsDropTXT4: "1",
      newTabserialParityDropTXT4: "None",
      newTabserialHandshakeDropTXT4: "None",
      newTabserialInfModeDropTXT4: "Choose Mode",
      newTabimgvalue: "static/img/images/Peye1.png",
      newTabtypevalue: "password",
      newTabimgvalue1: "static/img/images/Peye1.png",
      newTabtypevalue1: "password",
      newTabimgvalue2: "static/img/images/Peye1.png",
      newTabtypevalue2: "password",


      // GET GENERAL
      // current tab related
      getCurrViewgetGenEthNumPort:null,
      getCurrViewrmsMeterDLMSConfigJson:"",
      getCurrViewgatewayTXT: "",
      getCurrViewlocationTXT: "",
      getCurrViewenabledbglogChkBox: false,
      getCurrViewdbglogIpTXT:"",
      getCurrViewnetworkbtnTXT:"CDCS Network",
      getCurrViewipaddressTXT: "",
      getCurrViewnewipaddressTXT: "",
      getCurrViewsubnetmaskTXT: "",
      getCurrViewgateTXT: "",
      getCurrViewipaddressTXT2: "",
      getCurrViewnewipaddressTXT2: "",
      getCurrViewsubnetmaskTXT2: "",
      getCurrViewgateTXT2: "",
      getCurrViewipaddressTXT3: "",
      getCurrViewnewipaddressTXT3: "",
      getCurrViewsubnetmaskTXT3: "",
      getCurrViewgateTXT3: "",
      getCurrViewipaddressTXT4: "",
      getCurrViewnewipaddressTXT4: "",
      getCurrViewsubnetmaskTXT4: "",
      getCurrViewgateTXT4: "",
      getCurrViewmodmConnectionTypeTXT: "0",
      getCurrViewUsernameTXT: "",
      getCurrViewPasswordTXT: "",
      getCurrViewapnTXT: "",
      getCurrViewenablePinChkBox: false,
      getCurrViewenableModemChkBox: false,
      getCurrViewmodemPhNumTXT:'',
      getCurrViewpingIpTXT: "",
      getCurrViewpingNumTXT: "",
      getCurrViewpingTimeoutTXT: "",
      getCurrViewntpChekBOX1: false,
      getCurrViewntpChekBOX2: false,
      getCurrViewntpIpaddressTXT: "",
      getCurrViewntpPortNoTXT: "",
      getCurrViewntpIpaddressTXT2: "",
      getCurrViewntpPortNoTXT2: "",
      getCurrViewntpIntervalTXT:"",
      getCurrViewntpTimeOffsetHrsTXT:"0",
      getCurrViewntpTimeOffsetSecTXT:"0",
// VPN
      getCurrViewenableVPNChkBox: "0",
      getCurrViewselectVpnVal : '1',
      getCurrViewReqMmpeType:'Yes',
      getCurrViewvpnPptpconnNameTXT:"",
      getCurrViewvpnPptpLocalUnameTXT:"",
      getCurrViewvpnPptpLocalUpassTXT:"",
      getCurrViewvpnPptpRemoteUnameTXT:"",
      getCurrViewvpnPptpRemoteIpTXT:"",

      getCurrViewvpnTunnelNameTXT:"",
      getCurrViewvpnSharedKeyTXT:"",
      getCurrViewvpnKeyLifeTimeTXT:"",
      getCurrViewvpnRightIpTXT:"",
      getCurrViewvpnRightSubnetTXT:"",
      getCurrViewvpnRightIdTXT:"",

      getCurrViewvpnLeftIpTXT:"",
      getCurrViewvpnLeftSubnetTXT:"",
      getCurrViewvpnLeftIdTXT:"",
      getCurrViewvpnLefSrcIPTXT:"",

      getCurrViewvpnPfsTXT:"",
      getCurrViewvpnAggrModeTXT : '0',
      getCurrViewvpnKeyingModeTXT:"",
      getCurrViewvpnNatTravTXT:"",

      getCurrViewvpnDhGrpTXT1 : '0',
      getCurrViewvpnEncrptTXT1 : '0',
      getCurrViewvpnAuthenTXT1 : '0',

      getCurrViewvpnDhGrpTXT2 : '0',
      getCurrViewvpnEncrptTXT2 : '0',
      getCurrViewvpnAuthenTXT2 : '0', 
//Mqtt
      getCurrViewmqttBrokerTXT: "",
      getCurrViewmqttPortNoTXT1: "",
      getCurrViewmqttStatusTXT2: "",
      getCurrViewmqttUsernameTXT: "",
      getCurrViewmqttPasswodTXT: "",
      getCurrViewgenallowcommonchkbx:false,
      getCurrViewgenallow1chkbx: false,
      getCurrViewgenallow1IPTXT: "",
      getCurrViewgenallow2chkbx: false,
      getCurrViewgenallow2IPTXT: "",
      getCurrViewgenallow3chkbx: false,
      getCurrViewgenallow3IPTXT: "",
      getCurrViewgenallow4chkbx: false,
      getCurrViewgenallow4IPTXT: "",
      getCurrViewiec104Enablechekbox:false,
      getCurrViewftpEnablechekbox:false,
      getCurrViewftpIpaddTXT:'',
      getCurrViewftpprtnoTXT:'',
      getCurrViewftpusernameTXT:'',
      getCurrViewftppasswordTXT:'',
      getCurrViewftpdirTXT:'',
      getCurrViewftptimeoutTXT:'15',
      getCurrViewiecStationTXT: '',
      getCurrViewstartIOAaddTXT:'',
      getCurrViewiecCodsizedwnTXT: 'Choose COT Size',
      getCurrViewiecCylicTXT: '',
      getCurrViewiecIOAsizedwnTXT: 'Choose IOA Size',
      getCurrViewiecTSTAdwnTXT: 'Choose TSTA',
      getCurrViewiecTSTAstartAddresTXT: '',
      getCurrViewiecportTXT: '',
      getCurrViewiecTimeout1TXT: '',
      getCurrViewiecTimeout2TXT: '',
      getCurrViewiecTimeout3TXT: '',
      getCurrViewmqttPublicTopicTXT: "",
      getCurrViewmqttHrsTXT: "0",
      getCurrViewmqttMinsTXT: "0",
      getCurrViewmqttSecsTXT: "0",
      getCurrViewmqttSubscrbeTXT: "",
      getCurrViewmqttEnableEventsChkBOX: false,
      getCurrViewmqttEventsTopicTXT: "",
      getCurrViewmqttEnablePingChkBOX: false,
      getCurrViewmqttDiagTXT: "",
      getCurrViewno_serialDropTXT:"1",
      getCurrViewserialBaudRateDropTXT1: "9600",
      getCurrViewserialDagetCurrViewitsDropTXT1: "8",
      getCurrViewserialStopbitsDropTXT1: "1",
      getCurrViewserialParityDropTXT1: "None",
      getCurrViewserialHandshakeDropTXT1: "None",
      getCurrViewserialInfModeDropTXT1: "Choose Mode",
      getCurrViewserialBaudRateDropTXT2: "9600",
      getCurrViewserialDagetCurrViewitsDropTXT2: "8",
      getCurrViewserialStopbitsDropTXT2: "1",
      getCurrViewserialParityDropTXT2: "None",
      getCurrViewserialHandshakeDropTXT2: "None",
      getCurrViewserialInfModeDropTXT2: "Choose Mode",
      getCurrViewserialBaudRateDropTXT3: "9600",
      getCurrViewserialDagetCurrViewitsDropTXT3: "8",
      getCurrViewserialStopbitsDropTXT3: "1",
      getCurrViewserialParityDropTXT3: "None",
      getCurrViewserialHandshakeDropTXT3: "None",
      getCurrViewserialInfModeDropTXT3: "Choose Mode",
      getCurrViewserialBaudRateDropTXT4: "9600",
      getCurrViewserialDagetCurrViewitsDropTXT4: "8",
      getCurrViewserialStopbitsDropTXT4: "1",
      getCurrViewserialParityDropTXT4: "None",
      getCurrViewserialHandshakeDropTXT4: "None",
      getCurrViewserialInfModeDropTXT4: "Choose Mode",
      getCurrViewimgvalue: "static/img/images/Peye1.png",
      getCurrViewtypevalue: "password",
      getCurrViewimgvalue1: "static/img/images/Peye1.png",
      getCurrViewtypevalue1: "password",
      getCurrViewimgvalue2: "static/img/images/Peye1.png",
      getCurrViewtypevalue2: "password",
  

      // meter Parameter variables
       meterParameterTableJson :'',
       regsisterFormatArray: [
        { id: 1, name: "SIGNED_16BIT_INTEGER_TYPE" },
        { id: 2, name: "UNSIGNED_16BIT_INTEGER_TYPE" },
        { id: 3, name: "SIGNED_32BIT_HW_LW_INTEGER_TYPE" },
        { id: 4, name: "SIGNED_32BIT_LW_HW_INTEGER_TYPE" },
        { id: 5, name: "UNSIGNED_32BIT_HW_LW_INTEGER_TYPE" },
        { id: 6, name: "UNSIGNED_32BIT_LW_HW_INTEGER_TYPE" },
        { id: 7, name: "FLOAT_HW_LW_TYPE" },
        { id: 8, name: "FLOAT_LW_HW_TYPE" }
      ],
      regsisterFuncodeArray: [
        { id: 1, name: "1 - Read Coil" },
        { id: 2, name: "2 - Read Discrete Input" },
        { id: 3, name: "3 - Read Holding Registers" },
        { id: 4, name: "4 - Read Input Registers" },
        { id: 15, name: "15 - Write Multiple Coils" },
        { id: 16, name: "16 - Write Multiple Holding Registers" }
      ],
       meterParameterTableArray :[],
       selectmeterTypeName:'',
       regsisterAcqModArray: [
        { id: 1, name: "Periodic" },
        { id: 2, name: "Absolute" },
        { id: 3, name: "Deadband" }
        ],
        meterPramsAcqModeTXT:'Choose Mode',
        meterPramsDeadbndTXT:'',
        meterPramsminvalTXT:'',
        meterPramsmaxvalTXT:'',
        meterPramsScaleFactorTXT:'',
        selectiveParmsAray:[],
        rmsdevicemeterNameTbl:'',
        compareArray:'',

        // device Summary variables
        devicesummaryJson:'',
        deviceerrorMsg: [],
        deleteDevicePasswordCONFRIMTXT:'',
        deleteDevicePasswordTXT:'',
        deviceDeleteid :'',
        deviceDeleteNAME:'',
        dcuregionListArray:[],
        dcucircleListArray:[],
        dcusubstationListArray:[],
        dcuRegionidTXT:'',
        dcuRegionnameTXT:'Choose Region',
        dcuCircleidTXT:'',
        dcuCircleNameTXT:'Choose Circle',
        dcuSSNameTXT:'Choose Sub Station',
        deviceTblRowIndex: "",
        deviceTblID:'',
        deviceTblDeviceName:'',
        getMeterDLMSConfigJson:'',
        enableGETGENFlag:false,
        enableGETDLMSFlag:false,
        viewPreviousConfigFlag:false,
        viewCurrentConfigFlag:false,
        viewNewConfigFlag:false,
        dcuSerialNumdataArray:[],
    }
  },
  created(){
  },
  destroyed(){
    console.log('--------device management----destroyed fn call----');
    console.log('--------device management----this.activatedInterval fn call----'+this.activatedInterval);
    clearInterval(this.activatedInterval);
  },
  mounted () {
    this.isLoading = true;
    let innerMinHeight = window.innerHeight - 125 + 'px'
    this.devicetblHeight = window.innerHeight - 235;
    document.getElementById('deviceconfigPAGE').style.minHeight = innerMinHeight;
    this.loadDeviceListMethod();
    this.dcugetRegionNameList();
    this.dcuSerialNumdataList();
    setTimeout(() => this.isLoading = false, 1000);
  },
  updated(){
  if(this.orginalGenConfigJson.length != 0) {
    console.log('----------updated--insdie--------');
    this.orginalGenConfigJson[0].dev_id = this.gatewayTXT
    this.orginalGenConfigJson[0].dcu_location = this.locationTXT;
    this.orginalGenConfigJson[0].dbglog_enable = this.enabledbglogChkBox ? "Yes" : "No";
    this.orginalGenConfigJson[0].dbglog_ip = this.dbglogIpTXT;
    // LAN
    this.orginalGenConfigJson[0].net_type = this.networkbtnTXT;
    // this.orginalGenConfigJson[0].lan_ip = this.ipaddressTXT;
    this.orginalGenConfigJson[0].eth_ip1 = this.ipaddressTXT;
    this.orginalGenConfigJson[0].eth_new_ip1 =this.newipaddressTXT;
    this.orginalGenConfigJson[0].eth_subnet1 = this.subnetmaskTXT;
    this.orginalGenConfigJson[0].eth_gateway1 = this.gateTXT;
    this.orginalGenConfigJson[0].eth_ip2 = this.ipaddressTXT2;
    this.orginalGenConfigJson[0].eth_new_ip2 = this.newipaddressTXT2;
    this.orginalGenConfigJson[0].eth_subnet2 = this.subnetmaskTXT2;
    this.orginalGenConfigJson[0].eth_gateway2 =this.gateTXT2;
    this.orginalGenConfigJson[0].eth_ip3 = this.ipaddressTXT3;
    this.orginalGenConfigJson[0].eth_new_ip3 = this.newipaddressTXT3;
    this.orginalGenConfigJson[0].eth_subnet3 = this.subnetmaskTXT3;
    this.orginalGenConfigJson[0].eth_gateway3 =this.gateTXT3;
    this.orginalGenConfigJson[0].eth_ip4 = this.ipaddressTXT4;
    this.orginalGenConfigJson[0].eth_new_ip4 = this.newipaddressTXT4;
    this.orginalGenConfigJson[0].eth_subnet4 = this.subnetmaskTXT4;
    this.orginalGenConfigJson[0].eth_gateway4 =this.gateTXT4;
    /*
    this.orginalGenConfigJson[0].no_serial = this.no_serialDropTXT;
    // Serial Port  1
    this.orginalGenConfigJson[0].serial_baudrate1 = this.serialBaudRateDropTXT1;
    this.orginalGenConfigJson[0].serial_databits1 = this.serialDatabitsDropTXT1;
    this.orginalGenConfigJson[0].serial_stopbits1 = this.serialStopbitsDropTXT1;
    this.orginalGenConfigJson[0].serial_parity1 = this.serialParityDropTXT1;
    this.orginalGenConfigJson[0].serial_handshake1 = this.serialHandshakeDropTXT1;
    this.orginalGenConfigJson[0].serial_infMode1 = this.serialInfModeDropTXT1;

  // Serial Port  2
    this.orginalGenConfigJson[0].serial_baudrate2 = this.serialBaudRateDropTXT2;
    this.orginalGenConfigJson[0].serial_databits2 = this.serialDatabitsDropTXT2;
    this.orginalGenConfigJson[0].serial_stopbits2 = this.serialStopbitsDropTXT2;
    this.orginalGenConfigJson[0].serial_parity2 = this.serialParityDropTXT2;
    this.orginalGenConfigJson[0].serial_handshake2 = this.serialHandshakeDropTXT2;
    this.orginalGenConfigJson[0].serial_infMode2 = this.serialInfModeDropTXT2;

    // Serial Port  3
    this.orginalGenConfigJson[0].serial_baudrate3 = this.serialBaudRateDropTXT3;
    this.orginalGenConfigJson[0].serial_databits3 = this.serialDatabitsDropTXT3;
    this.orginalGenConfigJson[0].serial_stopbits3 = this.serialStopbitsDropTXT3;
    this.orginalGenConfigJson[0].serial_parity3 = this.serialParityDropTXT3;
    this.orginalGenConfigJson[0].serial_handshake3 = this.serialHandshakeDropTXT3;
    this.orginalGenConfigJson[0].serial_infMode3 = this.serialInfModeDropTXT3;

    // Serial Port  3
    this.orginalGenConfigJson[0].serial_baudrate4 = this.serialBaudRateDropTXT4;
    this.orginalGenConfigJson[0].serial_databits4  = this.serialDatabitsDropTXT4;
    this.orginalGenConfigJson[0].serial_stopbits4 = this.serialStopbitsDropTXT4;
    this.orginalGenConfigJson[0].serial_parity4 = this.serialParityDropTXT4;
    this.orginalGenConfigJson[0].serial_handshake4 = this.serialHandshakeDropTXT4;
    this.orginalGenConfigJson[0].serial_infMode4 = this.serialInfModeDropTXT4;
    */
    // NTP
    this.orginalGenConfigJson[0].ntp_enable1 = this.ntpChekBOX1 ? "Yes" : "No";
    this.orginalGenConfigJson[0].ntp_enable2 = this.ntpChekBOX2 ? "Yes" : "No";
    this.orginalGenConfigJson[0].ntp_ipadd1 = this.ntpIpaddressTXT;
    this.orginalGenConfigJson[0].ntp_port1 = this.ntpPortNoTXT;
    this.orginalGenConfigJson[0].ntp_ipadd2= this.ntpIpaddressTXT2;
    this.orginalGenConfigJson[0].ntp_port2 =this.ntpPortNoTXT2;
    this.orginalGenConfigJson[0].ntp_interval =this.ntpIntervalTXT;
   /* this.orginalGenConfigJson[0].ntp_hrs = this.ntpTimeOffsetHrsTXT;
    this.orginalGenConfigJson[0].ntp_mints = this.ntpTimeOffsetSecTXT;
    // MQTT
    this.orginalGenConfigJson[0].mqtt_broker_ip = this.mqttBrokerTXT;
    this.orginalGenConfigJson[0].mqtt_broker_port = this.mqttPortNoTXT1;
    this.orginalGenConfigJson[0].mqtt_username = this.mqttUsernameTXT;
    this.orginalGenConfigJson[0].mqtt_password = this.mqttPasswodTXT;
    this.orginalGenConfigJson[0].mqtt_pub_topic = this.mqttPublicTopicTXT;
    this.orginalGenConfigJson[0].mqtt_pub_int_hour = this.mqttHrsTXT;
    this.orginalGenConfigJson[0].mqtt_pub_int_mint = this.mqttMinsTXT;
    this.orginalGenConfigJson[0].mqtt_pub_int_sec = this.mqttSecsTXT;
    this.orginalGenConfigJson[0].mqtt_event_topic_flag = this.mqttEnableEventsChkBOX ? "Yes" : "No";
    this.orginalGenConfigJson[0].mqtt_event_pub_topic = this.mqttEventsTopicTXT;
    this.orginalGenConfigJson[0].mqtt_diag_topic_flag  = this.mqttEnablePingChkBOX ? "Yes" : "No";
    this.orginalGenConfigJson[0].mqtt_diag_pub_topic = this.mqttDiagTXT;
      */
    this.orginalGenConfigJson[0].enable_allow_master = this.genallowcommonchkbx ? "Yes" : "No";
    this.orginalGenConfigJson[0].master1_enable = this.genallow1chkbx ? "Yes" : "No";
    this.orginalGenConfigJson[0].master1_ip = this.genallow1IPTXT;
    this.orginalGenConfigJson[0].master2_enable = this.genallow2chkbx  ? "Yes" : "No";
    this.orginalGenConfigJson[0].master2_ip =this.genallow2IPTXT;
    this.orginalGenConfigJson[0].master3_enable = this.genallow3chkbx ? "Yes" : "No";
    this.orginalGenConfigJson[0].master3_ip = this.genallow3IPTXT;
    this.orginalGenConfigJson[0].master4_enable = this.genallow4chkbx ? "Yes" : "No";
    this.orginalGenConfigJson[0].master4_ip = this.genallow4IPTXT
    this.orginalGenConfigJson[0].iec_enable = this.iec104Enablechekbox ? "Yes" : "No";
    this.orginalGenConfigJson[0].iec_addr = this.iecStationTXT;
    this.orginalGenConfigJson[0].iec_port = this.iecportTXT;
    this.orginalGenConfigJson[0].iec_cyc_int = this.iecCylicTXT;
    this.orginalGenConfigJson[0].iec_met_start_ioa = this.startIOAaddTXT;
    this.orginalGenConfigJson[0].iec_cot = this.iecCodsizedwnTXT;
    this.orginalGenConfigJson[0].iec_ioa = this.iecIOAsizedwnTXT;

    this.orginalGenConfigJson[0].ftp_enable = this.ftpEnablechekbox ? "Yes" : "No";
    this.orginalGenConfigJson[0].ftp_ip = this.ftpIpaddTXT;
    this.orginalGenConfigJson[0].ftp_port = this.ftpprtnoTXT;
    this.orginalGenConfigJson[0].ftp_user = this.ftpusernameTXT;
    this.orginalGenConfigJson[0].ftp_pass = this.ftppasswordTXT;
    this.orginalGenConfigJson[0].ftp_dir = this.ftpdirTXT;
    this.orginalGenConfigJson[0].ftp_period = this.ftptimeoutTXT;
    }
     //console.log(JSON.stringify(this.copydeviceGenConfigJson)+'----------updated--method-------'+JSON.stringify(this.orginalGenConfigJson));
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
     dcugetRegionNameList(){
      this.dcuregionListArray = [];
      axios.get(this.getregionURL).then(response => {
        if (response.data.status == "found") {
          this.dcuregionListArray = response.data.details;
        } else {
          this.dcuregionListArray = [];
        }
      });
    },
    dcuSerialNumdataList(){
      this.dcuSerialNumdataArray = [];
      axios.get(this.dcuSerialNumdataURL).then(response => {
        if (response.data.status == "found") {
          this.dcuSerialNumdataArray = response.data.details;
        } else {
          this.dcuSerialNumdataArray = [];
        }
      });
    },
    getCircleNameLst(regionidname){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
      this.dcuRegionidTXT = regionid;
      this.dcuCircleNameTXT = "Choose Circle";
      this.dcuSSNameTXT = "Choose Sub Station";
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.dcucircleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.dcucircleListArray = response.data.details;
        } else {
      this.dcuCircleNameTXT = "Choose Circle";
      this.dcuSSNameTXT = "Choose Sub Station";
          this.dcucircleListArray = [];
        }
      });
    },
    dcuviewconfigBTNFunction(index,id,devicename){
      this.deviceTblRowIndex = index;
      this.deviceTblID = id;
      this.deviceTblDeviceName = devicename;
      this.rmsConfigureGENFunction(index,id,devicename);
      clearInterval(this.activatedInterval);
      this.clearFlag = true;
      this.$modal.show('dcuviewconfigBTNpopup');
      this.enableGETGENFlag = false;
      this.enableGETDLMSFlag = false;
    },
    closedcuviewconfigBTN1popup(){
        this.$modal.hide('dcuviewconfigBTNpopup');
        this.clearFlag = false;
        this.loadDeviceListMethod();
    },
    closeviewPrevCurrNewConfigPopup(){
       this.$modal.hide('viewPrevCurrNewConfigPopup');
        this.loadDeviceListMethod();
    },
    closeviewConfigHISTORYPopup(){
       this.$modal.hide('viewConfigHISTORYPopup');
       this.loadDeviceListMethod();
    },
    viewhistroyresponseFunction(rowIndex,items){
    this.isLoading = true;
    var history_type = items.history_type;
    var viewHistoryResJson = {
      "user_name":this.username,
      "user_role":this.userrole,
      "seq_num":items.seq_num,
      "dcu_id":items.dcu_id,
      "history_type":items.history_type
    };
     console.log('viewHistoryResJson  :::', JSON.stringify(viewHistoryResJson));
      axios
          .post(this.getviewHistroyRESURL, viewHistoryResJson)
          .then(response => {
            var status = response.data.status;
            if (status = "found") {
            if(history_type == "General Configuration"){
              var historyGENCONFIGVIEWJSON = response.data.details;
              this.historyViewgatewayTXT = historyGENCONFIGVIEWJSON[0].dev_id;
              this.historyViewlocationTXT = historyGENCONFIGVIEWJSON[0].dcu_location;
              this.historyViewenabledbglogChkBox = historyGENCONFIGVIEWJSON[0].dbglog_enable == "Yes" ? true : false;
              this.historyViewdbglogIpTXT = historyGENCONFIGVIEWJSON[0].dbglog_ip;
                // LAN
            //this.historyViewipaddressTXT = historyGENCONFIGVIEWJSON[0].lan_ip;
            this.historyViewgetGenEthNumPort = historyGENCONFIGVIEWJSON[0].num_eth_port;
            this.historyViewnetworkbtnTXT =  historyGENCONFIGVIEWJSON[0].net_type == "null" ? "": historyGENCONFIGVIEWJSON[0].net_type;
            this.historyViewipaddressTXT = historyGENCONFIGVIEWJSON[0].eth_ip1 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_ip1;
            this.historyViewnewipaddressTXT = historyGENCONFIGVIEWJSON[0].eth_new_ip1 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_new_ip1;
            this.historyViewsubnetmaskTXT = historyGENCONFIGVIEWJSON[0].eth_subnet1 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_subnet1;
            this.historyViewgateTXT = historyGENCONFIGVIEWJSON[0].eth_gateway1 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_gateway1;
            this.historyViewipaddressTXT2 = historyGENCONFIGVIEWJSON[0].eth_ip2 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_ip2;
            this.historyViewnewipaddressTXT2 = historyGENCONFIGVIEWJSON[0].eth_new_ip2 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_new_ip2;
            this.historyViewsubnetmaskTXT2 = historyGENCONFIGVIEWJSON[0].eth_subnet2 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_subnet2;
            this.historyViewgateTXT2 = historyGENCONFIGVIEWJSON[0].eth_gateway2 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_gateway2;

            this.historyViewipaddressTXT3 = historyGENCONFIGVIEWJSON[0].eth_ip3 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_ip3;
            this.historyViewnewipaddressTXT3 = historyGENCONFIGVIEWJSON[0].eth_new_ip3 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_new_ip3;
            this.historyViewsubnetmaskTXT3 = historyGENCONFIGVIEWJSON[0].eth_subnet3 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_subnet3;
            this.historyViewgateTXT3 = historyGENCONFIGVIEWJSON[0].eth_gateway3 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_gateway3;
            this.historyViewipaddressTXT4 = historyGENCONFIGVIEWJSON[0].eth_ip4 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_ip4;
            this.historyViewnewipaddressTXT4 = historyGENCONFIGVIEWJSON[0].eth_new_ip4 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_new_ip4;
            this.historyViewsubnetmaskTXT4 = historyGENCONFIGVIEWJSON[0].eth_subnet4 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_subnet4;
            this.historyViewgateTXT4 = historyGENCONFIGVIEWJSON[0].eth_gateway4 == "null" ? "": historyGENCONFIGVIEWJSON[0].eth_gateway4;

          /*
          this.historyViewno_serialDropTXT = historyGENCONFIGVIEWJSON[0].no_serial == "" ||  historyGENCONFIGVIEWJSON[0].no_serial == "null" ? "1": historyGENCONFIGVIEWJSON[0].no_serial;
          // Serial Port  1
          this.historyViewserialBaudRateDropTXT1 = historyGENCONFIGVIEWJSON[0].serial_baudrate1 == "" ||  historyGENCONFIGVIEWJSON[0].serial_baudrate1 == "null" ? "9600": historyGENCONFIGVIEWJSON[0].serial_baudrate1;
          this.historyViewserialDahistoryViewitsDropTXT1= historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits1 == "" || historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits1 == "null" ? "8" : historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits1;
          this.historyViewserialStopbitsDropTXT1= historyGENCONFIGVIEWJSON[0].serial_stopbits1 == "" || historyGENCONFIGVIEWJSON[0].serial_stopbits1 == "null" ? "1" : historyGENCONFIGVIEWJSON[0].serial_stopbits1;
          this.historyViewserialParityDropTXT1= historyGENCONFIGVIEWJSON[0].serial_parity1 == "" || historyGENCONFIGVIEWJSON[0].serial_parity1 == "null" ? "None" : historyGENCONFIGVIEWJSON[0].serial_parity1;
          this.historyViewserialHandshakeDropTXT1= historyGENCONFIGVIEWJSON[0].serial_handshake1 == "" || historyGENCONFIGVIEWJSON[0].serial_handshake1 == "null" ? "None" : historyGENCONFIGVIEWJSON[0].serial_handshake1;
          this.historyViewserialInfModeDropTXT1= historyGENCONFIGVIEWJSON[0].serial_infMode1 == "" || historyGENCONFIGVIEWJSON[0].serial_infMode1 == "null" ? "Choose Mode" : historyGENCONFIGVIEWJSON[0].serial_infMode1;

          // Serial Port  2
          this.historyViewserialBaudRateDropTXT2 = historyGENCONFIGVIEWJSON[0].serial_baudrate2 == "" ||  historyGENCONFIGVIEWJSON[0].serial_baudrate2 == "null" ? "9600": historyGENCONFIGVIEWJSON[0].serial_baudrate2;
          this.historyViewserialDahistoryViewitsDropTXT2= historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits2 == "" || historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits2 == "null" ? "8" : historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits2;
          this.historyViewserialStopbitsDropTXT2= historyGENCONFIGVIEWJSON[0].serial_stopbits2 == "" || historyGENCONFIGVIEWJSON[0].serial_stopbits2 == "null" ? "1" : historyGENCONFIGVIEWJSON[0].serial_stopbits2;
          this.historyViewserialParityDropTXT2 = historyGENCONFIGVIEWJSON[0].serial_parity2 == "" || historyGENCONFIGVIEWJSON[0].serial_parity2 == "null" ? "None" : historyGENCONFIGVIEWJSON[0].serial_parity2;
          this.historyViewserialHandshakeDropTXT2 = historyGENCONFIGVIEWJSON[0].serial_handshake2 == "" || historyGENCONFIGVIEWJSON[0].serial_handshake2 == "null" ? "None" : historyGENCONFIGVIEWJSON[0].serial_handshake2;
          this.historyViewserialInfModeDropTXT2 = historyGENCONFIGVIEWJSON[0].serial_infMode2 == "" || historyGENCONFIGVIEWJSON[0].serial_infMode2 == "null" ? "Choose Mode" : historyGENCONFIGVIEWJSON[0].serial_infMode2;

          // Serial Port  3
          this.historyViewserialBaudRateDropTXT3 = historyGENCONFIGVIEWJSON[0].serial_baudrate3 == "" ||  historyGENCONFIGVIEWJSON[0].serial_baudrate3 == "null" ? "9600": historyGENCONFIGVIEWJSON[0].serial_baudrate3;
          this.historyViewserialDahistoryViewitsDropTXT3= historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits3 == "" || historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits3 == "null" ? "8" : historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits3;
          this.historyViewserialStopbitsDropTXT3= historyGENCONFIGVIEWJSON[0].serial_stopbits3 == "" || historyGENCONFIGVIEWJSON[0].serial_stopbits3 == "null" ? "1" : historyGENCONFIGVIEWJSON[0].serial_stopbits3;
          this.historyViewserialParityDropTXT3 = historyGENCONFIGVIEWJSON[0].serial_parity3 == "" || historyGENCONFIGVIEWJSON[0].serial_parity3 == "null" ? "None" : historyGENCONFIGVIEWJSON[0].serial_parity3;
          this.historyViewserialHandshakeDropTXT3 = historyGENCONFIGVIEWJSON[0].serial_handshake3 == "" || historyGENCONFIGVIEWJSON[0].serial_handshake3 == "null" ? "None" : historyGENCONFIGVIEWJSON[0].serial_handshake3;
          this.historyViewserialInfModeDropTXT3 = historyGENCONFIGVIEWJSON[0].serial_infMode3 == "" || historyGENCONFIGVIEWJSON[0].serial_infMode3 == "null" ? "Choose Mode" : historyGENCONFIGVIEWJSON[0].serial_infMode3;

          // Serial Port  3
          this.historyViewserialBaudRateDropTXT4 = historyGENCONFIGVIEWJSON[0].serial_baudrate4 == "" ||  historyGENCONFIGVIEWJSON[0].serial_baudrate4 == "null" ? "9600": historyGENCONFIGVIEWJSON[0].serial_baudrate4;
          this.historyViewserialDahistoryViewitsDropTXT4 = historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits4 == "" || historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits4 == "null" ? "8" : historyGENCONFIGVIEWJSON[0].serial_dahistoryViewits4;
          this.historyViewserialStopbitsDropTXT4 = historyGENCONFIGVIEWJSON[0].serial_stopbits4 == "" || historyGENCONFIGVIEWJSON[0].serial_stopbits4 == "null" ? "1" : historyGENCONFIGVIEWJSON[0].serial_stopbits4;
          this.historyViewserialParityDropTXT4 = historyGENCONFIGVIEWJSON[0].serial_parity4 == "" || historyGENCONFIGVIEWJSON[0].serial_parity4 == "null" ? "None" : historyGENCONFIGVIEWJSON[0].serial_parity4;
          this.historyViewserialHandshakeDropTXT4 = historyGENCONFIGVIEWJSON[0].serial_handshake4 == "" || historyGENCONFIGVIEWJSON[0].serial_handshake4 == "null" ? "None" : historyGENCONFIGVIEWJSON[0].serial_handshake4;
          this.historyViewserialInfModeDropTXT4 = historyGENCONFIGVIEWJSON[0].serial_infMode4 == "" || historyGENCONFIGVIEWJSON[0].serial_infMode4 == "null" ? "Choose Mode" : historyGENCONFIGVIEWJSON[0].serial_infMode4;
          */

          // NTP
          this.historyViewntpChekBOX1 = historyGENCONFIGVIEWJSON[0].ntp_enable1 == "Yes" ? true : false;
          this.historyViewntpChekBOX2 = historyGENCONFIGVIEWJSON[0].ntp_enable2 == "Yes" ? true : false;
          this.historyViewntpIpaddressTXT = historyGENCONFIGVIEWJSON[0].ntp_ipadd1 == "null" ? "": historyGENCONFIGVIEWJSON[0].ntp_ipadd1;
          this.historyViewntpPortNoTXT = historyGENCONFIGVIEWJSON[0].ntp_port1 == "null" ? "": historyGENCONFIGVIEWJSON[0].ntp_port1;
          this.historyViewntpIpaddressTXT2 = historyGENCONFIGVIEWJSON[0].ntp_ipadd2 == "null" ? "": historyGENCONFIGVIEWJSON[0].ntp_ipadd2;
          this.historyViewntpPortNoTXT2 = historyGENCONFIGVIEWJSON[0].ntp_port2 == "null" ? "": historyGENCONFIGVIEWJSON[0].ntp_port2;
          this.historyViewntpIntervalTXT = historyGENCONFIGVIEWJSON[0].ntp_interval == "null" ? "": historyGENCONFIGVIEWJSON[0].ntp_interval;

         /* this.historyViewntpTimeOffsetHrsTXT = historyGENCONFIGVIEWJSON[0].ntp_hrs == "" ||  historyGENCONFIGVIEWJSON[0].ntp_hrs == "null" ? "0": historyGENCONFIGVIEWJSON[0].ntp_hrs;
          this.historyViewntpTimeOffsetSecTXT = historyGENCONFIGVIEWJSON[0].ntp_mints == "" ||  historyGENCONFIGVIEWJSON[0].ntp_mints == "null" ? "0": historyGENCONFIGVIEWJSON[0].ntp_mints;
          // MQTT
          this.historyViewmqttBrokerTXT = historyGENCONFIGVIEWJSON[0].mqtt_broker_ip == "null" ? "" : historyGENCONFIGVIEWJSON[0].mqtt_broker_ip;
          this.historyViewmqttPortNoTXT1 = historyGENCONFIGVIEWJSON[0].mqtt_broker_port == "null" ? "" : historyGENCONFIGVIEWJSON[0].mqtt_broker_port;
          this.historyViewmqttUsernameTXT = historyGENCONFIGVIEWJSON[0].mqtt_username == "null" ? "" : historyGENCONFIGVIEWJSON[0].mqtt_username;
          this.historyViewmqttPasswodTXT = historyGENCONFIGVIEWJSON[0].mqtt_password == "null" ? "" : historyGENCONFIGVIEWJSON[0].mqtt_password;
          this.historyViewmqttPublicTopicTXT = historyGENCONFIGVIEWJSON[0].mqtt_pub_topic == "null" ? "" : historyGENCONFIGVIEWJSON[0].mqtt_pub_topic;
          this.historyViewmqttHrsTXT = historyGENCONFIGVIEWJSON[0].mqtt_pub_int_hour == "" ||  historyGENCONFIGVIEWJSON[0].mqtt_pub_int_hour == "null" ? "0": historyGENCONFIGVIEWJSON[0].mqtt_pub_int_hour;
          this.historyViewmqttMinsTXT = historyGENCONFIGVIEWJSON[0].mqtt_pub_int_mint == "" ||  historyGENCONFIGVIEWJSON[0].mqtt_pub_int_mint == "null" ? "0": historyGENCONFIGVIEWJSON[0].mqtt_pub_int_mint;
          this.historyViewmqttSecsTXT = historyGENCONFIGVIEWJSON[0].mqtt_pub_int_sec == "" ||  historyGENCONFIGVIEWJSON[0].mqtt_pub_int_sec == "null" ? "0": historyGENCONFIGVIEWJSON[0].mqtt_pub_int_sec; 
          this.historyViewmqttEnableEventsChkBOX = historyGENCONFIGVIEWJSON[0].mqtt_event_topic_flag == "Yes" ? true : false;
          this.historyViewmqttEventsTopicTXT = historyGENCONFIGVIEWJSON[0].mqtt_event_pub_topic == null ? "":historyGENCONFIGVIEWJSON[0].mqtt_event_pub_topic;
          this.historyViewmqttEnablePingChkBOX = historyGENCONFIGVIEWJSON[0].mqtt_diag_topic_flag == "Yes" ? true : false;
          this.historyViewmqttDiagTXT = historyGENCONFIGVIEWJSON[0].mqtt_diag_pub_topic == "null" ? "" : historyGENCONFIGVIEWJSON[0].mqtt_diag_pub_topic;
          */

          this.historyViewgenallowcommonchkbx = historyGENCONFIGVIEWJSON[0].enable_allow_master == "Yes" ? true : false;
          this.historyViewgenallow1chkbx = historyGENCONFIGVIEWJSON[0].master1_enable == "Yes" ? true : false;
          this.historyViewgenallow1IPTXT= historyGENCONFIGVIEWJSON[0].master1_ip;
          this.historyViewgenallow2chkbx = historyGENCONFIGVIEWJSON[0].master2_enable == "Yes" ? true : false;
          this.historyViewgenallow2IPTXT = historyGENCONFIGVIEWJSON[0].master2_ip;
          this.historyViewgenallow3chkbx = historyGENCONFIGVIEWJSON[0].master3_enable == "Yes" ? true : false;
          this.historyViewgenallow3IPTXT= historyGENCONFIGVIEWJSON[0].master3_ip;
          this.historyViewgenallow4chkbx= historyGENCONFIGVIEWJSON[0].master4_enable == "Yes" ? true : false;
          this.historyViewgenallow4IPTXT = historyGENCONFIGVIEWJSON[0].master4_ip;
          this.historyViewiec104Enablechekbox  = historyGENCONFIGVIEWJSON[0].iec_enable == "Yes" ? true : false;
          this.historyViewiecStationTXT = historyGENCONFIGVIEWJSON[0].iec_addr == "null" ? "" : historyGENCONFIGVIEWJSON[0].iec_addr;
          this.historyViewiecportTXT = historyGENCONFIGVIEWJSON[0].iec_port == "null" ? "" : historyGENCONFIGVIEWJSON[0].iec_port;
          this.historyViewiecCylicTXT = historyGENCONFIGVIEWJSON[0].iec_cyc_int == "null" ? "" : historyGENCONFIGVIEWJSON[0].iec_cyc_int;
          this.historyViewstartIOAaddTXT = historyGENCONFIGVIEWJSON[0].iec_met_start_ioa == "null" ? "" : historyGENCONFIGVIEWJSON[0].iec_met_start_ioa;
          this.historyViewiecCodsizedwnTXT =historyGENCONFIGVIEWJSON[0].iec_cot == "null" ? "" : historyGENCONFIGVIEWJSON[0].iec_cot;
          this.historyViewiecIOAsizedwnTXT=historyGENCONFIGVIEWJSON[0].iec_ioa == "null" ? "" : historyGENCONFIGVIEWJSON[0].iec_ioa;

          this.historyViewftpEnablechekbox = historyGENCONFIGVIEWJSON[0].ftp_enable == "Yes" ? true : false;
          this.historyViewftpIpaddTXT=historyGENCONFIGVIEWJSON[0].ftp_ip == "null" ? "" : historyGENCONFIGVIEWJSON[0].ftp_ip;
          this.historyViewftpprtnoTXT=historyGENCONFIGVIEWJSON[0].ftp_port == "null" ? "" : historyGENCONFIGVIEWJSON[0].ftp_port;
          this.historyViewftpusernameTXT=historyGENCONFIGVIEWJSON[0].ftp_user == "null" ? "" : historyGENCONFIGVIEWJSON[0].ftp_user;
          this.historyViewftppasswordTXT=historyGENCONFIGVIEWJSON[0].ftp_pass == "null" ? "" : historyGENCONFIGVIEWJSON[0].ftp_pass;
          this.historyViewftpdirTXT=historyGENCONFIGVIEWJSON[0].ftp_dir == "null" ? "" : historyGENCONFIGVIEWJSON[0].ftp_dir;
          this.historyViewftptimeoutTXT=historyGENCONFIGVIEWJSON[0].ftp_period == "null" ? "" : historyGENCONFIGVIEWJSON[0].ftp_period;
            this.$modal.show('historygenconfigPopup');
            }else if(history_type == "DLMS Configuration"){
              this.historyViewrmsMeterDLMSConfigJson = response.data;
              this.$modal.show('historydlmsconfigPopup');
            }
            this.isLoading = false;
            return false;
            }else{
            this.resetViewHistoryResPOPUP();
            this.historyViewrmsMeterDLMSConfigJson = "";
            this.isLoading = false;
            return false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("viewhistroyresponseFunction Function error::" + error.message);
          });

    },

   closehistorygenconfigPopup(){
     this.$modal.hide('historygenconfigPopup');
   },
   closehistorydlmsconfigPopup(){
     this.$modal.hide('historydlmsconfigPopup');
   },
    historyconfigFwFunction(){
      this.isLoading = true;
      var histroyJSon = {
        user_role: this.userrole,
        user_name: this.username,
        dcu_id:this.deviceTblID,
        dcu_name:this.deviceTblDeviceName,
        from_date:this.datetimeformat(this.historyFromdateTXT),
        to_date:this.datetimeformat(this.historyTodateTXT),
        btnName:this.historyBTNclickTXT
      }
      console.log('histroyJSon  :::', JSON.stringify(histroyJSon));
      axios
          .post(this.getHistroyURL, histroyJSon)
          .then(response => {
            var status = response.data.status;
            if (status = "success") {
            this.configHistoryTableJSONS = response.data;
            this.isLoading = false;
            return false;
            }else{
            this.configHistoryTableJSONS = "";
            this.isLoading = false;
            return false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("historyconfigFw Function error::" + error.message);
          });
    },
    dcuconfigurationTabPANEMethod(){
      this.isLoading = true;
      document.getElementById("dcuconfigurationTab").classList.add("active");
      document.getElementById("dcuviewTab").classList.remove("active");
      document.getElementById("dcuconfigurationTabPANE").classList.add("in", "active", "show");
      document.getElementById("dcuviewTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
    },
    dcuviewTabPANEMethod(){
      this.isLoading = true;
      document.getElementById("dcuviewTab").classList.add("active");
      document.getElementById("dcuconfigurationTab").classList.remove("active");
      document.getElementById("dcuviewTabPANE").classList.add("in", "active", "show");
      document.getElementById("dcuconfigurationTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
    },
    dcuGENTabPANEMethod(){
      this.isLoading = true;
      document.getElementById("dcuGENTab").classList.add("active");
      document.getElementById("dcuDLMSTab").classList.remove("active");
      document.getElementById("dcuGENTabPANE").classList.add("in", "active", "show");
      document.getElementById("dcuDLMSTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
    },
    dcuDLMSTabPANEMethod(){
      this.isLoading = true;
      document.getElementById("dcuDLMSTab").classList.add("active");
      document.getElementById("dcuGENTab").classList.remove("active");
      document.getElementById("dcuDLMSTabPANE").classList.add("in", "active", "show");
      document.getElementById("dcuGENTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
      this.rmsConfigureDLMSMeterFunction(this.deviceTblRowIndex,this.deviceTblID,this.deviceTblDeviceName);
    },
    viewPreviousconfigurationTabPANEMethod(){
      document.getElementById("viewPreviousconfigurationTab").classList.add("active");
      document.getElementById("viewCurrentconfigurationTab").classList.remove("active");
      document.getElementById("viewNewconfigurationTab").classList.remove("active");
      document.getElementById("viewPreviousconfigurationTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewCurrentconfigurationTabPANE").classList.remove("in", "active", "show");
      document.getElementById("viewNewconfigurationTabPANE").classList.remove("in", "active", "show");
      this.showdevicesummarypopup(this.deviceTblRowIndex,this.deviceTblID,this.deviceTblDeviceName,'previous');

    },
    viewPrevGENTabPANEMethod(){
      this.isLoading = true;
      document.getElementById("viewPrevGENTab").classList.add("active");
      document.getElementById("viewPrevDLMSTab").classList.remove("active");
      document.getElementById("viewPrevGENTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewPrevDLMSTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
    },
    viewPrevDLMSTabPANEMethod(){
      this.isLoading = true;
      document.getElementById("viewPrevDLMSTab").classList.add("active");
      document.getElementById("viewPrevGENTab").classList.remove("active");
      document.getElementById("viewPrevDLMSTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewPrevGENTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
    },
    viewCurrentconfigurationTabPANEMethod(){
      document.getElementById("viewCurrentconfigurationTab").classList.add("active");
      document.getElementById("viewPreviousconfigurationTab").classList.remove("active");
      document.getElementById("viewNewconfigurationTab").classList.remove("in", "active", "show");
      document.getElementById("viewCurrentconfigurationTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewPreviousconfigurationTabPANE").classList.remove("in", "active", "show");
      document.getElementById("viewNewconfigurationTabPANE").classList.remove("in", "active", "show");
      this.showdevicesummarypopup(this.deviceTblRowIndex,this.deviceTblID,this.deviceTblDeviceName,'current');

    },
    viewCurrentGENTabPANEMethod(){
      this.isLoading = true;
      document.getElementById("viewCurrentGENTab").classList.add("active");
      document.getElementById("viewCurrentDLMSTab").classList.remove("active");
      document.getElementById("viewCurrentGENTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewCurrentDLMSTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
    },
    viewCurrentDLMSTabPANEMethod(){
     this.isLoading = true;
      document.getElementById("viewCurrentDLMSTab").classList.add("active");
      document.getElementById("viewCurrentGENTab").classList.remove("active");
      document.getElementById("viewCurrentDLMSTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewCurrentGENTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
    },
    viewNewconfigurationTabPANEMethod(){
      document.getElementById("viewNewconfigurationTab").classList.add("active");
      document.getElementById("viewPreviousconfigurationTab").classList.remove("active");
      document.getElementById("viewCurrentconfigurationTab").classList.remove("in", "active", "show");
      document.getElementById("viewNewconfigurationTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewPreviousconfigurationTabPANE").classList.remove("in", "active", "show");
      document.getElementById("viewCurrentconfigurationTabPANE").classList.remove("in", "active", "show");
      this.showdevicesummarypopup(this.deviceTblRowIndex,this.deviceTblID,this.deviceTblDeviceName,'new');
    },
    viewNewGENTabPANEMethod(){
      this.isLoading = true;
      document.getElementById("viewNewGENTab").classList.add("active");
      document.getElementById("viewNewDLMSTab").classList.remove("active");
      document.getElementById("viewNewGENTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewNewDLMSTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
    },
    viewNewDLMSTabPANEMethod(){
      this.isLoading = true;
      document.getElementById("viewNewDLMSTab").classList.add("active");
      document.getElementById("viewNewGENTab").classList.remove("active");
      document.getElementById("viewNewDLMSTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewNewGENTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
    },
    viewFWRPreviousTabPANEMethod(){
     this.isLoading = true;
      document.getElementById("viewFWRPreviousTab").classList.add("active");
      document.getElementById("viewFWRCurrentTab").classList.remove("active");
      document.getElementById("viewFWRPreviousTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewFWRCurrentTabPANE").classList.remove("in", "active", "show");
      this.isLoading = false;
    },
    viewFWRCurrentTabPANEMethod(){
     this.isLoading = true;
     document.getElementById("viewFWRCurrentTab").classList.add("active");
     document.getElementById("viewFWRPreviousTab").classList.remove("active");
     document.getElementById("viewFWRCurrentTabPANE").classList.add("in", "active", "show");
     document.getElementById("viewFWRPreviousTabPANE").classList.remove("in", "active", "show");
     this.isLoading = false;
     this.showfirmwareSummaryPopup(this.deviceTblRowIndex,this.deviceTblID,this.deviceTblDeviceName,'current');
    },
     viewActivateFWRcurrentTabPANEMethod(){
     this.isLoading = true;
     document.getElementById("viewActivateFWRcurrentTab").classList.add("active");
     document.getElementById("viewActivateFWRnewTab").classList.remove("active");
     document.getElementById("viewActivateFWRcurrentTabPANE").classList.add("in", "active", "show");
     document.getElementById("viewActivateFWRnewTabPANE").classList.remove("in", "active", "show");
     this.isLoading = false;
     this.showfirmwareSummaryPopup(this.deviceTblRowIndex,this.deviceTblID,this.deviceTblDeviceName,'current');
     //this.$modal.show('viewACtivateFWRPopup');
     },
    viewActivateFWRnewTabPANEMethod(){
     this.isLoading = true;
     document.getElementById("viewActivateFWRnewTab").classList.add("active");
     document.getElementById("viewActivateFWRcurrentTab").classList.remove("active");
     document.getElementById("viewActivateFWRnewTabPANE").classList.add("in", "active", "show");
     document.getElementById("viewActivateFWRcurrentTabPANE").classList.remove("in", "active", "show");
     this.isLoading = false;
     this.showfirmwareSummaryPopup(this.deviceTblRowIndex,this.deviceTblID,this.deviceTblDeviceName,'new');
     //this.$modal.show('viewACtivateFWRPopup');
    },
    getGENConfigTabPANEMethod(){
     this.isLoading = true;
     document.getElementById("getGENConfigTab").classList.add("active");
     document.getElementById("getDLMSConfigTab").classList.remove("active");
     document.getElementById("getGENConfigTabPANE").classList.add("in", "active", "show");
     document.getElementById("getDLMSConfigTabPANE").classList.remove("in", "active", "show");
     this.isLoading = false;
    },
    getDLMSConfigTabPANEMethod(){
     this.isLoading = true;
     document.getElementById("getDLMSConfigTab").classList.add("active");
     document.getElementById("getGENConfigTab").classList.remove("active");
     document.getElementById("getDLMSConfigTabPANE").classList.add("in", "active", "show");
     document.getElementById("getGENConfigTabPANE").classList.remove("in", "active", "show");
     this.isLoading = false;
    },
    getGENconfigBTNFunction(){
       var deviceConfigMsg = {
        username:this.username,
        role:this.userrole,
        reason:"",
        device_id:this.deviceTblID,
        device_name:this.deviceTblDeviceName,
        command_name:"GET_GEN_CONFIG",
        ip_address:"",
        port_no:"",
        user_name:"",
        password:"",
        firmware:"",
      };
      this.isLoading = true;
      console.log('deviceConfigMsg ** ** : ', JSON.stringify(deviceConfigMsg));
      axios
          .post(this.devicecommandUrl, deviceConfigMsg)
          .then(response => {
            var status = response.data.status;
            console.log('status :', status);
            if (status.includes("Success")) {
             this.showGETGENsummaryFunction(this.deviceTblRowIndex,this.deviceTblID,this.deviceTblDeviceName,'current');
             this.notificationMessage("Confirmation", "GET_GEN_CONFIG - command applied successfully", "success", 4000);
             // this.successMessage("Sent GET_GEN_CONFIG to "+this.deviceTblDeviceName +" Successfully...");
             return false;
            }
          })
          .catch(function(error) {
            console.log("error::" + error);
          });
    
    },
    showGETDLMSSummaryFunction(rowIndex,id,devicename,btnName){
    var getDlmsUrl = this.deviceresponseBTNUrl.replace("$$btnname$$", btnName).replace("$$deviceID$$", id);
    console.log('showGETDLMSSummaryFunction getDlmsUrl', getDlmsUrl);
    axios.get(getDlmsUrl).then(response => {
    if (response.data.dlms_status == "found") {
     var getMeterDLMSConfigJson = response.data;
    if(getMeterDLMSConfigJson.dlms_details.length != 0){
      this.enableGETDLMSFlag = true;
      this.getMeterDLMSConfigJson = getMeterDLMSConfigJson;
    }else{
      this.enableGETDLMSFlag = false;
      this.getMeterDLMSConfigJson = "";
    }
    }
    });
    },
    getDLMSconfigBTNFunction(){
       var deviceDLMSConfigMsg = {
        username:this.username,
        role:this.userrole,
        reason:"",
        device_id:this.deviceTblID,
        device_name:this.deviceTblDeviceName,
        command_name:"GET_DLMS_CONFIG",
        ip_address:"",
        port_no:"",
        user_name:"",
        password:"",
        firmware:"",
      };
      this.isLoading = true;
      console.log('deviceDLMSConfigMsg ** ** : ', JSON.stringify(deviceDLMSConfigMsg));
      axios
          .post(this.devicecommandUrl, deviceDLMSConfigMsg)
          .then(response => {
            var status = response.data.status;
            console.log('status :', status);
            if (status.includes("Success")) {
             // this.successMessage("Sent GET_DLMS_CONFIG to "+this.deviceTblDeviceName +" Successfully...");
             this.notificationMessage("Confirmation", "GET_DLMS_CONFIG - command applied successfully", "success", 4000);
             this.showGETDLMSSummaryFunction(this.deviceTblRowIndex,this.deviceTblID,this.deviceTblDeviceName,'current');
             this.isLoading = false;
             return false;
            }
          })
          .catch(function(error) {
             this.isLoading = false;
            console.log("error::" + error);
          });
    },

    closeviewACtivateFWRPopup(){
       this.loadDeviceListMethod();
      this.$modal.hide('viewACtivateFWRPopup');
    },
    closeviewPrevCurrFWRPopup(){
      this.loadDeviceListMethod();
      this.$modal.hide('viewPrevCurrFWRPopup');
    },
    dcuConfigSaveBtnFunction(){
      this.confrimationTEXT = 'deviceIOTpopup';
      this.deviceIOTGATESAVEACTION();
    },
    dcuDLMSSaveBtnFunction(){
      this.confrimationTEXT = 'deviceDLMSpopup';
      this.rmsDLMSSaveFunction();
    },
    viewPrevCurrConfigFunction(index,id,deviceName){
      this.deviceTblRowIndex = index;
      this.deviceTblID = id;
      this.deviceTblDeviceName = deviceName;
      this.viewPreviousConfigFlag = true;
      this.viewCurrentConfigFlag= true;
      this.viewNewConfigFlag= false;
       setTimeout(() => {
         document.getElementById("viewPreviousconfigurationTab").classList.add("active");
         document.getElementById("viewCurrentconfigurationTab").classList.remove("active");
         document.getElementById("viewNewconfigurationTab").classList.remove("in", "active", "show");
         document.getElementById("viewPreviousconfigurationTabPANE").classList.add("in", "active", "show");
         document.getElementById("viewCurrentconfigurationTabPANE").classList.remove("in", "active", "show");
         document.getElementById("viewNewconfigurationTabPANE").classList.remove("in", "active", "show");
         this.resetHighlightGENValueFunction("previous");
         }, 200);
      this.showdevicesummarypopup(index,id,deviceName,"previous");
      clearInterval(this.activatedInterval);
    },
    viewCurrNewConfigFunction(index,id,deviceName){
      this.deviceTblRowIndex = index;
      this.deviceTblID = id;
      this.deviceTblDeviceName = deviceName;
      this.viewPreviousConfigFlag = false;
      this.viewCurrentConfigFlag= true;
      this.viewNewConfigFlag= true;
      setTimeout(() => {
      document.getElementById("viewCurrentconfigurationTab").classList.add("active");
      document.getElementById("viewPreviousconfigurationTab").classList.remove("active");
      document.getElementById("viewNewconfigurationTab").classList.remove("active");
      document.getElementById("viewCurrentconfigurationTabPANE").classList.add("in", "active", "show");
      document.getElementById("viewPreviousconfigurationTabPANE").classList.remove("in", "active", "show");
      document.getElementById("viewNewconfigurationTabPANE").classList.remove("in", "active", "show");
       this.resetHighlightGENValueFunction("new");
      }, 200);
      this.showdevicesummarypopup(index,id,deviceName,"current");
     clearInterval(this.activatedInterval);
    },
    getEDITCircleNameLst(regionidname,index){
      var regionid = regionidname.split("$$")[0];
      var regionname = regionidname.split("$$")[1];
      this.dcuRegionidTXT = regionid;
      this.dcuCircleNameTXT = "Choose Circle";
      this.dcuSSNameTXT = "Choose Sub Station";
       var getcicrleURL = this.getcicrleURL.replace("$$regionid$$",regionid);
       this.dcucircleListArray = [];
       axios.get(getcicrleURL).then(response => {
        if (response.data.status == "found") {
          this.dcucircleListArray = response.data.details;
          this.dcuCircleNameTXT =  this.rmsdeviceConfigJson.device_details[index].circle_id+"$$"+this.rmsdeviceConfigJson.device_details[index].circle_name;
          this.getEDITSSNameLst(this.dcuCircleNameTXT,index);
        } else {
          this.dcuCircleNameTXT = "Choose Circle";
          this.dcuSSNameTXT = "Choose Sub Station";
          this.dcucircleListArray = [];
        }
      });
    },
      getEDITSSNameLst(circleidName,index){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
       this.dcuCircleidTXT = circleid;
      this.dcuCirclenameTXT = circlename;
       this.dcuSSNameTXT = "Choose Sub Station";
       var getSSURL = this.getSSURL.replace("$$circleid$$",circleid);
       this.dcusubstationListArray = [];
       axios.get(getSSURL).then(response => {
        if (response.data.status == "found") {
          this.dcusubstationListArray = response.data.details;
          this.dcuSSNameTXT = this.rmsdeviceConfigJson.device_details[index].ss_id+"$$"+this.rmsdeviceConfigJson.device_details[index].ss_name;
        } else {
          this.dcusubstationListArray = [];
        }
      });
    },
    getSSNameLst(circleidName){
      var circleid = circleidName.split("$$")[0];
      var circlename = circleidName.split("$$")[1];
       this.dcuCircleidTXT = circleid;
      this.dcuCirclenameTXT = circlename;
       this.dcuSSNameTXT = "Choose Sub Station";
       var getcicrleSSURL = this.getSSURL.replace("$$circleid$$",circleid);
       this.dcusubstationListArray = [];
       axios.get(getcicrleSSURL).then(response => {
        if (response.data.status == "found") {
          this.dcusubstationListArray = response.data.details;
        } else {
          this.dcusubstationListArray = [];
        }
      });
    },
    loadDeviceListMethod() {
      this.activatedInterval = setInterval(
        () =>axios.get(this.device_listUrl).then(response => {
        if (response.data.status == "devices found") {
          this.rmsdeviceConfigJson = response.data;
        } else {
          this.rmsdeviceConfigJson = "";
        }
      }),1000);
    },
    loadFWListMethod() {
      this.fwListArray =[];
     axios.get(this.deviceFWdetailsUrl).then(response => {
        if (response.data.status == "found") {
          this.fwListArray = response.data.details;
        } else {
          this.fwListArray = [];
        }
      });
    },
    filterloadFWListMethod(currFwrVersion) {
      this.fwListArray =[];
     axios.get(this.deviceFWdetailsUrl).then(response => {
        if (response.data.status == "found") {
          for(var tt=0;tt<response.data.details.length;tt++){
            if(currFwrVersion != response.data.details[tt].VERSION_NAME){
              this.fwListArray.push(response.data.details[tt]);
            }
          }
        } else {
          this.fwListArray = [];
        }
      });
    },
    rightSection1() {
      document.getElementById("gendlmsTab1").classList.add("active");
      document.getElementById("gendlmsTab2").classList.remove("active");
      document.getElementById("gendlmsTab1PANE").classList.add("in", "active", "show");
      document.getElementById("gendlmsTab2PANE").classList.remove("in", "active", "show");
      },
      rightSection2() {
      document.getElementById("gendlmsTab2").classList.add("active");
      document.getElementById("gendlmsTab1").classList.remove("active");
      document.getElementById("gendlmsTab2PANE").classList.add("in", "active", "show");
      document.getElementById("gendlmsTab1PANE").classList.remove("in", "active", "show");
      },
    saveConfirmationpopup(){
      this.isLoading = true;
      if(this.configurecmdName == "UPDATE_FIRMWARE"){
             if(this.firmwareIPTXT == ""){
               this.isLoading = false;
               this.warningMessage("Please enter ip address");
               return false;
             }
               var bool22 = this.ValidateDBGIPaddress('in IP is',this.firmwareIPTXT);
              if (!bool22) {
                this.isLoading = false;
              this.warningMessage("ip address is invalid");
              return false;
              }
             if(this.firmwarePORTTXT == ""){
               this.isLoading = false;
               this.warningMessage("Please enter port number");
               return false;
             }
             if (this.firmwarePORTTXT <= 0 || this.firmwarePORTTXT > 65535 ) {
               this.isLoading = false;
              this.warningMessage("Port number should range from 1 to 65535");
              return false;
             }
             if(this.firmwareUSERTXT == ""){
               this.isLoading = false;
               this.warningMessage("Please enter user name");
               return false;
             }
              if(this.firmwarePASSTXT == ""){
                this.isLoading = false;
               this.warningMessage("Please enter password");
               return false;
             }
             if(this.firmwareSELTXT == "Choose Firmware" || this.firmwareSELTXT == ""){
               this.isLoading = false;
               this.warningMessage("Please choose any one firmware");
               return false;
             }
      }
      if(this.configurecmdName == "ROLLBACK_FIRMWARE" || this.configurecmdName == "CONFIG_ROLLBACK" || this.configurecmdName == "ACTIVATE_CONFIG" || this.configurecmdName == "UPDATE_FIRMWARE" || this.configurecmdName == "ACTIVATE_FIRMWARE"){
      if(this.deviceReasonTXT == ''){
        this.isLoading = false;
        this.warningMessage('Please enter command reason and proceed further.');
        return false;
      }
      if(this.deviceReasonTXT.length < 20 ){
        this.isLoading = false;
        this.warningMessage("Please enter minimum 20 characters.");
        return false;
      }
      }
      console.log('this.confrimationTEXT :::', this.confrimationTEXT);
      if(this.confrimationTEXT == 'deviceIOTpopup'){
      if(this.configureIOTTbname != ""){
        var deviceIOTJSON = {
          reason:this.deviceReasonTXT,
          iot_table:this.configureIOTTbname,
          username:this.username,
          role:this.userrole,
          device_name:this.configuredeviceName,
          dev_id:this.configureMeterTbID,
          dcu_id:this.gatewayTXT,
          dcu_location:this.locationTXT,
          dbglog_enable:this.enabledbglogChkBox == true ?  "Yes": "No",
          dbglog_ip:this.dbglogIpTXT,
          num_eth_port:this.getGenEthNumPort,
          net_type:this.networkbtnTXT,
          eth_ip1:this.ipaddressTXT,
          eth_new_ip1:this.newipaddressTXT,
          eth_subnet1:this.subnetmaskTXT,
          eth_gateway1:this.gateTXT,
          eth_ip2:this.ipaddressTXT2,
          eth_new_ip2:this.newipaddressTXT2,
          eth_subnet2:this.subnetmaskTXT2,
          eth_gateway2:this.gateTXT2,
          eth_ip3:this.ipaddressTXT3,
          eth_new_ip3:this.newipaddressTXT3,
          eth_subnet3:this.subnetmaskTXT3,
          eth_gateway3:this.gateTXT3,
          eth_ip4:this.ipaddressTXT4,
          eth_new_ip4:this.newipaddressTXT4,
          eth_subnet4:this.subnetmaskTXT4,
          eth_gateway4:this.gateTXT4,
          /* no_serial:this.no_serialDropTXT,
          serial_baudrate1:this.serialBaudRateDropTXT1,
          serial_databits1:this.serialDatabitsDropTXT1,
          serial_stopbits1:this.serialStopbitsDropTXT1,
          serial_parity1:this.serialParityDropTXT1,
          serial_handshake1:this.serialHandshakeDropTXT1,
          serial_infMode1:this.serialInfModeDropTXT1,
          serial_baudrate2:this.serialBaudRateDropTXT2,
          serial_databits2:this.serialDatabitsDropTXT2,
          serial_stopbits2:this.serialStopbitsDropTXT2,
          serial_parity2:this.serialParityDropTXT2,
          serial_handshake2:this.serialHandshakeDropTXT2,
          serial_infMode2:this.serialInfModeDropTXT2,
          serial_baudrate3:this.serialBaudRateDropTXT3,
          serial_databits3:this.serialDatabitsDropTXT3,
          serial_stopbits3:this.serialStopbitsDropTXT3,
          serial_parity3:this.serialParityDropTXT3,
          serial_handshake3:this.serialHandshakeDropTXT3,
          serial_infMode3:this.serialInfModeDropTXT3,
          serial_baudrate4:this.serialBaudRateDropTXT4,
          serial_databits4:this.serialDatabitsDropTXT4,
          serial_stopbits4:this.serialStopbitsDropTXT4,
          serial_parity4:this.serialParityDropTXT4,
          serial_handshake4:this.serialHandshakeDropTXT4,
          serial_infMode4:this.serialInfModeDropTXT4,  */
          ntp_enable1:this.ntpChekBOX1 == true ?  "Yes": "No",
          ntp_enable2:this.ntpChekBOX2 == true ?  "Yes": "No",
          ntp_ipadd1:this.ntpIpaddressTXT,
          ntp_port1:this.ntpPortNoTXT,
          ntp_ipadd2:this.ntpIpaddressTXT2,
          ntp_port2:this.ntpPortNoTXT2,
          ntp_interval:this.ntpIntervalTXT,
         /* ntp_hrs:this.ntpTimeOffsetHrsTXT,
          ntp_mints:this.ntpTimeOffsetSecTXT,
          mqtt_broker_ip:this.mqttBrokerTXT,
          mqtt_broker_port:this.mqttPortNoTXT1,
          mqtt_username:this.mqttUsernameTXT,
          mqtt_password:this.mqttPasswodTXT,
          mqtt_pub_topic:this.mqttPublicTopicTXT,
          mqtt_pub_int_hour:this.mqttHrsTXT,
          mqtt_pub_int_mint:this.mqttMinsTXT,
          mqtt_pub_int_sec:this.mqttSecsTXT,
          mqtt_event_topic_flag:this.mqttEnableEventsChkBOX == true ?  "Yes": "No",
          mqtt_event_pub_topic:this.mqttEventsTopicTXT,
          mqtt_diag_topic_flag:this.mqttEnablePingChkBOX == true ?  "Yes": "No",
          mqtt_diag_pub_topic:this.mqttDiagTXT, */
          enable_allow_master:this.genallowcommonchkbx  == true ?  "Yes": "No",
          master1_enable:this.genallow1chkbx == true ?  "Yes": "No",
          master1_ip:this.genallow1IPTXT,
          master2_enable:this.genallow2chkbx == true ?  "Yes": "No",
          master2_ip:this.genallow2IPTXT,
          master3_enable:this.genallow3chkbx == true ?  "Yes": "No",
          master3_ip:this.genallow3IPTXT,
          master4_enable:this.genallow4chkbx == true ?  "Yes": "No",
          master4_ip:this.genallow4IPTXT,
          iec_enable:this.iec104Enablechekbox == true ?  "Yes": "No",
          iec_addr:this.iecStationTXT,
          iec_met_start_ioa:this.startIOAaddTXT,
          iec_cyc_int:this.iecCylicTXT,
          iec_port:this.iecportTXT,
          iec_ioa:this.iecIOAsizedwnTXT,
          iec_cot:this.iecCodsizedwnTXT,
          ftp_enable:this.ftpEnablechekbox == true ?  "Yes": "No",
          ftp_ip:this.ftpIpaddTXT,
          ftp_port:this.ftpprtnoTXT,
          ftp_user:this.ftpusernameTXT,
          ftp_pass:this.ftppasswordTXT,
          ftp_dir:this.ftpdirTXT,
          ftp_period:this.ftptimeoutTXT
      }
       //console.log("IOT DETAILS :"+JSON.stringify(deviceIOTJSON));
       axios
          .post(this.device_GENcreateUrl, deviceIOTJSON)
          .then(response => {
            var status = response.data.status;
            if (status.includes("Success")) {
            this.isLoading = false;
            //console.log("GEN JSON :"+JSON.stringify(this.orginalGenConfigJson));
            // console.log("COPY JSON :"+JSON.stringify(this.copydeviceGenConfigJson));
            this.copydeviceGenConfigJson[0].dev_id = this.orginalGenConfigJson[0].dev_id;
            this.copydeviceGenConfigJson[0].dcu_location = this.orginalGenConfigJson[0].dcu_location;
            this.copydeviceGenConfigJson[0].dbglog_enable = this.orginalGenConfigJson[0].dbglog_enable;
            this.copydeviceGenConfigJson[0].dbglog_ip = this.orginalGenConfigJson[0].dbglog_ip;
            // LAN
            this.copydeviceGenConfigJson[0].net_type = this.orginalGenConfigJson[0].net_type;
            this.copydeviceGenConfigJson[0].eth_ip1 = this.orginalGenConfigJson[0].eth_ip1;
            this.copydeviceGenConfigJson[0].eth_new_ip1 = this.orginalGenConfigJson[0].eth_new_ip1;
            this.copydeviceGenConfigJson[0].eth_subnet1 = this.orginalGenConfigJson[0].eth_subnet1;
            this.copydeviceGenConfigJson[0].eth_gateway1 = this.orginalGenConfigJson[0].eth_gateway1;
            this.copydeviceGenConfigJson[0].eth_ip2 = this.orginalGenConfigJson[0].eth_ip2 ;
            this.copydeviceGenConfigJson[0].eth_new_ip2 = this.orginalGenConfigJson[0].eth_new_ip2 ;
            this.copydeviceGenConfigJson[0].eth_subnet2 =  this.orginalGenConfigJson[0].eth_subnet2 ;
            this.copydeviceGenConfigJson[0].eth_gateway2 =  this.orginalGenConfigJson[0].eth_gateway2 ;
            this.copydeviceGenConfigJson[0].eth_ip3 = this.orginalGenConfigJson[0].eth_ip3;
            this.copydeviceGenConfigJson[0].eth_new_ip3 = this.orginalGenConfigJson[0].eth_new_ip3;
            this.copydeviceGenConfigJson[0].eth_subnet3 =  this.orginalGenConfigJson[0].eth_subnet3;
            this.copydeviceGenConfigJson[0].eth_gateway3 =  this.orginalGenConfigJson[0].eth_gateway3;
             this.copydeviceGenConfigJson[0].eth_ip4 = this.orginalGenConfigJson[0].eth_ip4;
            this.copydeviceGenConfigJson[0].eth_new_ip4 = this.orginalGenConfigJson[0].eth_new_ip4;
            this.copydeviceGenConfigJson[0].eth_subnet4 =  this.orginalGenConfigJson[0].eth_subnet4;
            this.copydeviceGenConfigJson[0].eth_gateway4 =  this.orginalGenConfigJson[0].eth_gateway4;
    /*
    this.copydeviceGenConfigJson[0].no_serial = this.orginalGenConfigJson[0].no_serial;
    // Serial Port  1
    this.copydeviceGenConfigJson[0].serial_baudrate1 = this.orginalGenConfigJson[0].serial_baudrate1;
    this.copydeviceGenConfigJson[0].serial_databits1 =  this.orginalGenConfigJson[0].serial_databits1;
    this.copydeviceGenConfigJson[0].serial_stopbits1 = this.orginalGenConfigJson[0].serial_stopbits1;
    this.copydeviceGenConfigJson[0].serial_parity1 = this.orginalGenConfigJson[0].serial_parity1;
    this.copydeviceGenConfigJson[0].serial_handshake1 = this.orginalGenConfigJson[0].serial_handshake1;
    this.copydeviceGenConfigJson[0].serial_infMode1 = this.orginalGenConfigJson[0].serial_infMode1;

  // Serial Port  2
    this.copydeviceGenConfigJson[0].serial_baudrate2 = this.orginalGenConfigJson[0].serial_baudrate2;
    this.copydeviceGenConfigJson[0].serial_databits2 = this.orginalGenConfigJson[0].serial_databits2 ;
    this.copydeviceGenConfigJson[0].serial_stopbits2 = this.orginalGenConfigJson[0].serial_stopbits2;
    this.copydeviceGenConfigJson[0].serial_parity2 = this.orginalGenConfigJson[0].serial_parity2 ;
    this.copydeviceGenConfigJson[0].serial_handshake2 = this.orginalGenConfigJson[0].serial_handshake2;
    this.copydeviceGenConfigJson[0].serial_infMode2 = this.orginalGenConfigJson[0].serial_infMode2;

    // Serial Port  3
    this.copydeviceGenConfigJson[0].serial_baudrate3 = this.orginalGenConfigJson[0].serial_baudrate3;
    this.copydeviceGenConfigJson[0].serial_databits3 = this.orginalGenConfigJson[0].serial_databits3;
    this.copydeviceGenConfigJson[0].serial_stopbits3 = this.orginalGenConfigJson[0].serial_stopbits3;
    this.copydeviceGenConfigJson[0].serial_parity3 = this.orginalGenConfigJson[0].serial_parity3;
    this.copydeviceGenConfigJson[0].serial_handshake3 = this.orginalGenConfigJson[0].serial_handshake3 ;
    this.copydeviceGenConfigJson[0].serial_infMode3 =this.orginalGenConfigJson[0].serial_infMode3;

    // Serial Port  3
    this.copydeviceGenConfigJson[0].serial_baudrate4= this.orginalGenConfigJson[0].serial_baudrate4;
    this.copydeviceGenConfigJson[0].serial_databits4 =  this.orginalGenConfigJson[0].serial_databits4;
    this.copydeviceGenConfigJson[0].serial_stopbits4 =this.orginalGenConfigJson[0].serial_stopbits4;
    this.copydeviceGenConfigJson[0].serial_parity4= this.orginalGenConfigJson[0].serial_parity4;
    this.copydeviceGenConfigJson[0].serial_handshake4 = this.orginalGenConfigJson[0].serial_handshake4;
    this.copydeviceGenConfigJson[0].serial_infMode4 = this.orginalGenConfigJson[0].serial_infMode4;
    */
    // NTP
    this.copydeviceGenConfigJson[0].ntp_enable1 = this.orginalGenConfigJson[0].ntp_enable1;
    this.copydeviceGenConfigJson[0].ntp_enable2 = this.orginalGenConfigJson[0].ntp_enable2;
    this.copydeviceGenConfigJson[0].ntp_ipadd1 = this.orginalGenConfigJson[0].ntp_ipadd1;
    this.copydeviceGenConfigJson[0].ntp_port1 = this.orginalGenConfigJson[0].ntp_port1;
    this.copydeviceGenConfigJson[0].ntp_ipadd2= this.orginalGenConfigJson[0].ntp_ipadd2;
    this.copydeviceGenConfigJson[0].ntp_port2 = this.orginalGenConfigJson[0].ntp_port2;
    this.copydeviceGenConfigJson[0].ntp_interval= this.orginalGenConfigJson[0].ntp_interval;

   /* 
   this.copydeviceGenConfigJson[0].ntp_hrs = this.orginalGenConfigJson[0].ntp_hrs;
   this.copydeviceGenConfigJson[0].ntp_mints =  this.orginalGenConfigJson[0].ntp_mints;
    // MQTT
   this.copydeviceGenConfigJson[0].mqtt_broker_ip=  this.orginalGenConfigJson[0].mqtt_broker_ip;
    this.copydeviceGenConfigJson[0].mqtt_broker_port = this.orginalGenConfigJson[0].mqtt_broker_port;
    this.copydeviceGenConfigJson[0].mqtt_username = this.orginalGenConfigJson[0].mqtt_username;
    this.copydeviceGenConfigJson[0].mqtt_password = this.orginalGenConfigJson[0].mqtt_password;
    this.copydeviceGenConfigJson[0].mqtt_pub_topic= this.orginalGenConfigJson[0].mqtt_pub_topic;
    this.copydeviceGenConfigJson[0].mqtt_pub_int_hour= this.orginalGenConfigJson[0].mqtt_pub_int_hour;
    this.copydeviceGenConfigJson[0].mqtt_pub_int_mint = this.orginalGenConfigJson[0].mqtt_pub_int_mint;
    this.copydeviceGenConfigJson[0].mqtt_pub_int_sec = this.orginalGenConfigJson[0].mqtt_pub_int_sec;
    this.copydeviceGenConfigJson[0].mqtt_event_topic_flag = this.orginalGenConfigJson[0].mqtt_event_topic_flag;
    this.copydeviceGenConfigJson[0].mqtt_event_pub_topic = this.orginalGenConfigJson[0].mqtt_event_pub_topic;
    this.copydeviceGenConfigJson[0].mqtt_diag_topic_flag = this.orginalGenConfigJson[0].mqtt_diag_topic_flag;
    this.copydeviceGenConfigJson[0].mqtt_diag_pub_topic =this.orginalGenConfigJson[0].mqtt_diag_pub_topic;
      */
    this.copydeviceGenConfigJson[0].enable_allow_master = this.orginalGenConfigJson[0].enable_allow_master;
    this.copydeviceGenConfigJson[0].master1_enable= this.orginalGenConfigJson[0].master1_enable;
    this.copydeviceGenConfigJson[0].master1_ip = this.orginalGenConfigJson[0].master1_ip;
    this.copydeviceGenConfigJson[0].master2_enable = this.orginalGenConfigJson[0].master2_enable;
    this.copydeviceGenConfigJson[0].master2_ip = this.orginalGenConfigJson[0].master2_ip ;
    this.copydeviceGenConfigJson[0].master3_enable = this.orginalGenConfigJson[0].master3_enable ;
    this.copydeviceGenConfigJson[0].master3_ip = this.orginalGenConfigJson[0].master3_ip ;
    this.copydeviceGenConfigJson[0].master4_enable = this.orginalGenConfigJson[0].master4_enable;
    this.copydeviceGenConfigJson[0].master4_ip =  this.orginalGenConfigJson[0].master4_ip ;
    this.copydeviceGenConfigJson[0].iec_enable = this.orginalGenConfigJson[0].iec_enable;
    this.copydeviceGenConfigJson[0].iec_addr = this.orginalGenConfigJson[0].iec_addr;
    this.copydeviceGenConfigJson[0].iec_port = this.orginalGenConfigJson[0].iec_port ;
    this.copydeviceGenConfigJson[0].iec_cyc_int = this.orginalGenConfigJson[0].iec_cyc_int ;
    this.copydeviceGenConfigJson[0].iec_met_start_ioa = this.orginalGenConfigJson[0].iec_met_start_ioa ;
    this.copydeviceGenConfigJson[0].iec_cot = this.orginalGenConfigJson[0].iec_cot;
    this.copydeviceGenConfigJson[0].iec_ioa = this.orginalGenConfigJson[0].iec_ioa;

    this.copydeviceGenConfigJson[0].ftp_enable = this.orginalGenConfigJson[0].ftp_enable;
    this.copydeviceGenConfigJson[0].ftp_ip = this.orginalGenConfigJson[0].ftp_ip;
    this.copydeviceGenConfigJson[0].ftp_port =this.orginalGenConfigJson[0].ftp_port;
    this.copydeviceGenConfigJson[0].ftp_user = this.orginalGenConfigJson[0].ftp_user;
    this.copydeviceGenConfigJson[0].ftp_pass = this.orginalGenConfigJson[0].ftp_pass;
    this.copydeviceGenConfigJson[0].ftp_dir = this.orginalGenConfigJson[0].ftp_dir;
    this.copydeviceGenConfigJson[0].ftp_period = this.orginalGenConfigJson[0].ftp_period;

            //this.successMessage("Saved Successfully...");
            if(this.clearFlag){
                clearInterval(this.activatedInterval);
              }else{
                this.loadDeviceListMethod();
              }
            this.$modal.hide('confirmationPopup');
            this.notificationMessage("Confirmation", "SET_GEN_CONFIG - command applied successfully", "success", 4000);
            // this.$modal.hide('configIOTpopup');
           // this.loadDeviceListMethod();
            return false;
            }else{
            this.isLoading = false;
            this.warningMessage(status);
            if(this.clearFlag){
                clearInterval(this.activatedInterval);
              }else{
                this.loadDeviceListMethod();
              }
            this.$modal.hide('confirmationPopup');
             return false;
            }
          })
          .catch(function(error) {
            console.log("error::" + error);
          });
      }
    } else if(this.confrimationTEXT == 'deviceDLMSpopup'){
      this.saveDmls.reason = this.deviceReasonTXT;
      console.log('this.saveDmls :'+ JSON.stringify(this.saveDmls));
      axios
          .post(this.dlmsmeter_saveUrl, this.saveDmls)
          .then(response => {
            var status = response.data.status;
            if (status.includes("Success")) {
              this.isLoading = false;
              // this.successMessage("Saved Successfully");
              if(this.saveDmls.details.length != 0){
              for(var rowindex = 0; rowindex < this.saveDmls.details.length;rowindex++){
                this.copyrmsMeterDLMSConfigJson[rowindex].dev_id = this.saveDmls.details[rowindex].dev_id;
                this.copyrmsMeterDLMSConfigJson[rowindex].id = this.saveDmls.details[rowindex].id;
                this.copyrmsMeterDLMSConfigJson[rowindex].met_id = this.saveDmls.details[rowindex].met_id;
                this.copyrmsMeterDLMSConfigJson[rowindex].meter_enable = this.saveDmls.details[rowindex].meter_enable;
                this.copyrmsMeterDLMSConfigJson[rowindex].meter_ip = this.saveDmls.details[rowindex].meter_ip;
                this.copyrmsMeterDLMSConfigJson[rowindex].meter_port = this.saveDmls.details[rowindex].meter_port;
                this.copyrmsMeterDLMSConfigJson[rowindex].meter_pass = this.saveDmls.details[rowindex].meter_pass;
                this.copyrmsMeterDLMSConfigJson[rowindex].meter_location = this.saveDmls.details[rowindex].meter_location;
                this.copyrmsMeterDLMSConfigJson[rowindex].meter_unique_id = this.saveDmls.details[rowindex].dev_id+"_"+this.saveDmls.details[rowindex].met_id;
              }
              }
              //this.copyrmsMeterDLMSConfigJson = this.saveDmls.details;
              if(this.clearFlag){
                clearInterval(this.activatedInterval);
              }else{
                this.loadDeviceListMethod();
              }
              this.$modal.hide('confirmationPopup');
              this.notificationMessage("Confirmation", "SET_DLMS_CONFIG - command applied successfully", "success", 4000);
              return false;
            }else{
              this.isLoading = false;
              this.warningMessage(status);
              if(this.clearFlag){
                clearInterval(this.activatedInterval);
              }else{
                this.loadDeviceListMethod();
              }
              this.$modal.hide('confirmationPopup');
              return false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error);
          });
    } else if(this.confrimationTEXT == 'deviceGET_GEN_CONFIGpopup' || this.confrimationTEXT == 'deviceGET_DLMS_CONFIGpopup' || this.confrimationTEXT == 'deviceCONFIG_ROLLBACKpopup' || this.confrimationTEXT == 'deviceACTIVATE_CONFIGpopup' ||  this.confrimationTEXT == 'deviceUpdateFirmwarepopup'  || this.confrimationTEXT == 'deviceRollbackFirmwarepopup' || this.confrimationTEXT == 'deviceActivateFirmwarepopup'){
       var deviceConfigMsg = {
        username:this.username,
        role:this.userrole,
        reason:this.deviceReasonTXT,
        device_id:this.configureMeterTbID,
        device_name:this.configuredeviceName,
        command_name:this.configurecmdName,
        ip_address:this.firmwareIPTXT,
        port_no:this.firmwarePORTTXT,
        user_name:this.firmwareUSERTXT,
        password:this.firmwarePASSTXT,
        firmware:this.firmwareSELTXT,
      };
      axios
          .post(this.devicecommandUrl, deviceConfigMsg)
          .then(response => {
            var status = response.data.status;
            this.isLoading = false;
            if (status.includes("Success")) {
              this.isLoading = false;
              this.$modal.hide('confirmationPopup');
              //GET_GEN_CONFIG - command applied successfully
              this.notificationMessage("Confirmation", this.configurecmdName + " - command applied successfully..", "success", 4000);
              //this.successMessage("Sent "+this.configurecmdName+" to "+this.configuredeviceName +" Successfully...");
              if(this.clearFlag){
                clearInterval(this.activatedInterval);
              }else{
                this.loadDeviceListMethod();
              }
              return false;
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error);
          });
    }
    },
    showdeleteConfrimationPopup(){
       this.$modal.show('deleteConfrimationPopup');
    },
    closedeleteConfrimationPopup(){
       this.$modal.hide('deleteConfrimationPopup');
    },
    showdevicesummarypopup(index , id, devicename, btnName) {
    this.isLoading = true;
    this.configureMeterTbID = id;
    this.configuredeviceName = devicename;
    var iotUrl = this.deviceresponseBTNUrl.replace("$$btnname$$", btnName).replace("$$deviceID$$", id);
    console.log('showdevicesummarypopup iotUrl', iotUrl);
    axios.get(iotUrl).then(response => {
    if(btnName == "previous"){
    this.devicesummarypopupTITLE = devicename+ " - Previous Configuration";
    if (response.data.gen_status == "found") {
    this.previousTabGenConfigJson = response.data.gen_details;
    var tabViewGenConfigJson = response.data.gen_details;
    if(tabViewGenConfigJson.length != 0){
    this.tabgatewayTXT = tabViewGenConfigJson[0].dev_id;
    this.tablocationTXT = tabViewGenConfigJson[0].dcu_location;
    this.tabenabledbglogChkBox = tabViewGenConfigJson[0].dbglog_enable == "Yes" ? true : false;
    this.tabdbglogIpTXT = tabViewGenConfigJson[0].dbglog_ip == "null" ? "" : tabViewGenConfigJson[0].dbglog_ip;
    // LAN
    //this.tabipaddressTXT = tabViewGenConfigJson[0].lan_ip;
    this.tabgetGenEthNumPort =  tabViewGenConfigJson[0].num_eth_port;
    this.tabnetworkbtnTXT =  tabViewGenConfigJson[0].net_type == "null" ? "" : tabViewGenConfigJson[0].net_type;
    this.tabipaddressTXT = tabViewGenConfigJson[0].eth_ip1 == "null" ? "" : tabViewGenConfigJson[0].eth_ip1;
    this.tabnewipaddressTXT = tabViewGenConfigJson[0].eth_new_ip1 == "null" ? "" : tabViewGenConfigJson[0].eth_new_ip1;
    this.tabsubnetmaskTXT = tabViewGenConfigJson[0].eth_subnet1 == "null" ? "" : tabViewGenConfigJson[0].eth_subnet1;
    this.tabgateTXT = tabViewGenConfigJson[0].eth_gateway1 == "null" ? "" : tabViewGenConfigJson[0].eth_gateway1;
    this.tabipaddressTXT2 = tabViewGenConfigJson[0].eth_ip2 == "null" ? "" : tabViewGenConfigJson[0].eth_ip2;
    this.tabnewipaddressTXT2 = tabViewGenConfigJson[0].eth_new_ip2 == "null" ? "" : tabViewGenConfigJson[0].eth_new_ip2;
    this.tabsubnetmaskTXT2 = tabViewGenConfigJson[0].eth_subnet2 == "null" ? "" : tabViewGenConfigJson[0].eth_subnet2;
    this.tabgateTXT2 = tabViewGenConfigJson[0].eth_gateway2 == "null" ? "" : tabViewGenConfigJson[0].eth_gateway2;

    this.tabipaddressTXT3 = tabViewGenConfigJson[0].eth_ip3 == "null" ? "" : tabViewGenConfigJson[0].eth_ip3;
    this.tabnewipaddressTXT3 = tabViewGenConfigJson[0].eth_new_ip3 == "null" ? "" : tabViewGenConfigJson[0].eth_new_ip3;
    this.tabsubnetmaskTXT3 = tabViewGenConfigJson[0].eth_subnet3 == "null" ? "" : tabViewGenConfigJson[0].eth_subnet3;
    this.tabgateTXT3 = tabViewGenConfigJson[0].eth_gateway3 == "null" ? "" : tabViewGenConfigJson[0].eth_gateway3;
    this.tabipaddressTXT4 = tabViewGenConfigJson[0].eth_ip4 == "null" ? "" : tabViewGenConfigJson[0].eth_ip4;
    this.tabnewipaddressTXT4 = tabViewGenConfigJson[0].eth_new_ip4 == "null" ? "" : tabViewGenConfigJson[0].eth_new_ip4;
    this.tabsubnetmaskTXT4 = tabViewGenConfigJson[0].eth_subnet4 == "null" ? "" : tabViewGenConfigJson[0].eth_subnet4;
    this.tabgateTXT4 = tabViewGenConfigJson[0].eth_gateway4 == "null" ? "" : tabViewGenConfigJson[0].eth_gateway4;
    /*
    this.tabno_serialDropTXT = tabViewGenConfigJson[0].no_serial == "" ||  tabViewGenConfigJson[0].no_serial == "null" ? "1": tabViewGenConfigJson[0].no_serial;
    // Serial Port  1
    this.tabserialBaudRateDropTXT1 = tabViewGenConfigJson[0].serial_baudrate1 == "" ||  tabViewGenConfigJson[0].serial_baudrate1 == "null" ? "9600": tabViewGenConfigJson[0].serial_baudrate1;
    this.tabserialDatabitsDropTXT1= tabViewGenConfigJson[0].serial_databits1 == "" || tabViewGenConfigJson[0].serial_databits1 == "null" ? "8" : tabViewGenConfigJson[0].serial_databits1;
    this.tabserialStopbitsDropTXT1= tabViewGenConfigJson[0].serial_stopbits1 == "" || tabViewGenConfigJson[0].serial_stopbits1 == "null" ? "1" : tabViewGenConfigJson[0].serial_stopbits1;
    this.tabserialParityDropTXT1= tabViewGenConfigJson[0].serial_parity1 == "" || tabViewGenConfigJson[0].serial_parity1 == "null" ? "None" : tabViewGenConfigJson[0].serial_parity1;
    this.tabserialHandshakeDropTXT1= tabViewGenConfigJson[0].serial_handshake1 == "" || tabViewGenConfigJson[0].serial_handshake1 == "null" ? "None" : tabViewGenConfigJson[0].serial_handshake1;
    this.tabserialInfModeDropTXT1= tabViewGenConfigJson[0].serial_infMode1 == "" || tabViewGenConfigJson[0].serial_infMode1 == "null" ? "Choose Mode" : tabViewGenConfigJson[0].serial_infMode1;

  // Serial Port  2
    this.tabserialBaudRateDropTXT2 = tabViewGenConfigJson[0].serial_baudrate2 == "" ||  tabViewGenConfigJson[0].serial_baudrate2 == "null" ? "9600": tabViewGenConfigJson[0].serial_baudrate2;
    this.tabserialDatabitsDropTXT2= tabViewGenConfigJson[0].serial_databits2 == "" || tabViewGenConfigJson[0].serial_databits2 == "null" ? "8" : tabViewGenConfigJson[0].serial_databits2;
    this.tabserialStopbitsDropTXT2= tabViewGenConfigJson[0].serial_stopbits2 == "" || tabViewGenConfigJson[0].serial_stopbits2 == "null" ? "1" : tabViewGenConfigJson[0].serial_stopbits2;
    this.tabserialParityDropTXT2 = tabViewGenConfigJson[0].serial_parity2 == "" || tabViewGenConfigJson[0].serial_parity2 == "null" ? "None" : tabViewGenConfigJson[0].serial_parity2;
    this.tabserialHandshakeDropTXT2 = tabViewGenConfigJson[0].serial_handshake2 == "" || tabViewGenConfigJson[0].serial_handshake2 == "null" ? "None" : tabViewGenConfigJson[0].serial_handshake2;
    this.tabserialInfModeDropTXT2 = tabViewGenConfigJson[0].serial_infMode2 == "" || tabViewGenConfigJson[0].serial_infMode2 == "null" ? "Choose Mode" : tabViewGenConfigJson[0].serial_infMode2;

    // Serial Port  3
    this.tabserialBaudRateDropTXT3 = tabViewGenConfigJson[0].serial_baudrate3 == "" ||  tabViewGenConfigJson[0].serial_baudrate3 == "null" ? "9600": tabViewGenConfigJson[0].serial_baudrate3;
    this.tabserialDatabitsDropTXT3= tabViewGenConfigJson[0].serial_databits3 == "" || tabViewGenConfigJson[0].serial_databits3 == "null" ? "8" : tabViewGenConfigJson[0].serial_databits3;
    this.tabserialStopbitsDropTXT3= tabViewGenConfigJson[0].serial_stopbits3 == "" || tabViewGenConfigJson[0].serial_stopbits3 == "null" ? "1" : tabViewGenConfigJson[0].serial_stopbits3;
    this.tabserialParityDropTXT3 = tabViewGenConfigJson[0].serial_parity3 == "" || tabViewGenConfigJson[0].serial_parity3 == "null" ? "None" : tabViewGenConfigJson[0].serial_parity3;
    this.tabserialHandshakeDropTXT3 = tabViewGenConfigJson[0].serial_handshake3 == "" || tabViewGenConfigJson[0].serial_handshake3 == "null" ? "None" : tabViewGenConfigJson[0].serial_handshake3;
    this.tabserialInfModeDropTXT3 = tabViewGenConfigJson[0].serial_infMode3 == "" || tabViewGenConfigJson[0].serial_infMode3 == "null" ? "Choose Mode" : tabViewGenConfigJson[0].serial_infMode3;

    // Serial Port  3
    this.tabserialBaudRateDropTXT4 = tabViewGenConfigJson[0].serial_baudrate4 == "" ||  tabViewGenConfigJson[0].serial_baudrate4 == "null" ? "9600": tabViewGenConfigJson[0].serial_baudrate4;
    this.tabserialDatabitsDropTXT4 = tabViewGenConfigJson[0].serial_databits4 == "" || tabViewGenConfigJson[0].serial_databits4 == "null" ? "8" : tabViewGenConfigJson[0].serial_databits4;
    this.tabserialStopbitsDropTXT4 = tabViewGenConfigJson[0].serial_stopbits4 == "" || tabViewGenConfigJson[0].serial_stopbits4 == "null" ? "1" : tabViewGenConfigJson[0].serial_stopbits4;
    this.tabserialParityDropTXT4 = tabViewGenConfigJson[0].serial_parity4 == "" || tabViewGenConfigJson[0].serial_parity4 == "null" ? "None" : tabViewGenConfigJson[0].serial_parity4;
    this.tabserialHandshakeDropTXT4 = tabViewGenConfigJson[0].serial_handshake4 == "" || tabViewGenConfigJson[0].serial_handshake4 == "null" ? "None" : tabViewGenConfigJson[0].serial_handshake4;
    this.tabserialInfModeDropTXT4 = tabViewGenConfigJson[0].serial_infMode4 == "" || tabViewGenConfigJson[0].serial_infMode4 == "null" ? "Choose Mode" : tabViewGenConfigJson[0].serial_infMode4;
    */
    // NTP
    this.tabntpChekBOX1 = tabViewGenConfigJson[0].ntp_enable1 == "Yes" ? true : false;
    this.tabntpChekBOX2 = tabViewGenConfigJson[0].ntp_enable2 == "Yes" ? true : false;
    this.tabntpIpaddressTXT = tabViewGenConfigJson[0].ntp_ipadd1 == "null" ? "" : tabViewGenConfigJson[0].ntp_ipadd1;
    this.tabntpPortNoTXT = tabViewGenConfigJson[0].ntp_port1 == "null" ? "" : tabViewGenConfigJson[0].ntp_port1;
    this.tabntpIpaddressTXT2 = tabViewGenConfigJson[0].ntp_ipadd2 == "null" ? "" : tabViewGenConfigJson[0].ntp_ipadd2;
    this.tabntpPortNoTXT2 = tabViewGenConfigJson[0].ntp_port2 == "null" ? "" : tabViewGenConfigJson[0].ntp_port2;
    this.tabntpIntervalTXT = tabViewGenConfigJson[0].ntp_interval == "null" ? "" : tabViewGenConfigJson[0].ntp_interval;
   /* this.tabntpTimeOffsetHrsTXT = tabViewGenConfigJson[0].ntp_hrs == "" ||  tabViewGenConfigJson[0].ntp_hrs == "null" ? "0": tabViewGenConfigJson[0].ntp_hrs;
    this.tabntpTimeOffsetSecTXT = tabViewGenConfigJson[0].ntp_mints == "" ||  tabViewGenConfigJson[0].ntp_mints == "null" ? "0": tabViewGenConfigJson[0].ntp_mints;
    
    // MQTT
    this.tabmqttBrokerTXT = tabViewGenConfigJson[0].mqtt_broker_ip == "null" ? "" : tabViewGenConfigJson[0].mqtt_broker_ip;
    this.tabmqttPortNoTXT1 = tabViewGenConfigJson[0].mqtt_broker_port == "null" ? "" : tabViewGenConfigJson[0].mqtt_broker_port;
    this.tabmqttUsernameTXT = tabViewGenConfigJson[0].mqtt_username == "null" ? "" : tabViewGenConfigJson[0].mqtt_username;
    this.tabmqttPasswodTXT = tabViewGenConfigJson[0].mqtt_password == "null" ? "" : tabViewGenConfigJson[0].mqtt_password;
    this.tabmqttPublicTopicTXT = tabViewGenConfigJson[0].mqtt_pub_topic == "null" ? "" : tabViewGenConfigJson[0].mqtt_pub_topic;
    this.tabmqttHrsTXT = tabViewGenConfigJson[0].mqtt_pub_int_hour == "" ||  tabViewGenConfigJson[0].mqtt_pub_int_hour == "null" ? "0": tabViewGenConfigJson[0].mqtt_pub_int_hour;
    this.tabmqttMinsTXT = tabViewGenConfigJson[0].mqtt_pub_int_mint == "" ||  tabViewGenConfigJson[0].mqtt_pub_int_mint == "null" ? "0": tabViewGenConfigJson[0].mqtt_pub_int_mint;
    this.tabmqttSecsTXT = tabViewGenConfigJson[0].mqtt_pub_int_sec == "" ||  tabViewGenConfigJson[0].mqtt_pub_int_sec == "null" ? "0": tabViewGenConfigJson[0].mqtt_pub_int_sec; 
    this.tabmqttEnableEventsChkBOX = tabViewGenConfigJson[0].mqtt_event_topic_flag == "Yes" ? true : false;
    this.tabmqttEventsTopicTXT = tabViewGenConfigJson[0].mqtt_event_pub_topic == null ? "":tabViewGenConfigJson[0].mqtt_event_pub_topic;
    this.tabmqttEnablePingChkBOX = tabViewGenConfigJson[0].mqtt_diag_topic_flag == "Yes" ? true : false;
    this.tabmqttDiagTXT = tabViewGenConfigJson[0].mqtt_diag_pub_topic == "null" ? "" : tabViewGenConfigJson[0].mqtt_diag_pub_topic;
      */
    this.tabgenallowcommonchkbx = tabViewGenConfigJson[0].enable_allow_master == "Yes" ? true : false;
    this.tabgenallow1chkbx = tabViewGenConfigJson[0].master1_enable == "Yes" ? true : false;
    this.tabgenallow1IPTXT= tabViewGenConfigJson[0].master1_ip;
    this.tabgenallow2chkbx = tabViewGenConfigJson[0].master2_enable == "Yes" ? true : false;
    this.tabgenallow2IPTXT = tabViewGenConfigJson[0].master2_ip;
    this.tabgenallow3chkbx = tabViewGenConfigJson[0].master3_enable == "Yes" ? true : false;
    this.tabgenallow3IPTXT= tabViewGenConfigJson[0].master3_ip;
    this.tabgenallow4chkbx= tabViewGenConfigJson[0].master4_enable == "Yes" ? true : false;
    this.tabgenallow4IPTXT = tabViewGenConfigJson[0].master4_ip;
    this.tabiec104Enablechekbox  = tabViewGenConfigJson[0].iec_enable == "Yes" ? true : false;
    this.tabiecStationTXT = tabViewGenConfigJson[0].iec_addr == "null" ? "" : tabViewGenConfigJson[0].iec_addr;
    this.tabiecportTXT = tabViewGenConfigJson[0].iec_port == "null" ? "" : tabViewGenConfigJson[0].iec_port;
    this.tabiecCylicTXT = tabViewGenConfigJson[0].iec_cyc_int == "null" ? "" : tabViewGenConfigJson[0].iec_cyc_int;
    this.tabstartIOAaddTXT = tabViewGenConfigJson[0].iec_met_start_ioa == "null" ? "" : tabViewGenConfigJson[0].iec_met_start_ioa;
    this.tabiecCodsizedwnTXT =tabViewGenConfigJson[0].iec_cot == "null" ? "" : tabViewGenConfigJson[0].iec_cot;
    this.tabiecIOAsizedwnTXT=tabViewGenConfigJson[0].iec_ioa == "null" ? "" : tabViewGenConfigJson[0].iec_ioa;

    this.tabftpEnablechekbox = tabViewGenConfigJson[0].ftp_enable == "Yes" ? true : false;
    this.tabftpIpaddTXT=tabViewGenConfigJson[0].ftp_ip == "null" ? "" : tabViewGenConfigJson[0].ftp_ip;
    this.tabftpprtnoTXT=tabViewGenConfigJson[0].ftp_port == "null" ? "" : tabViewGenConfigJson[0].ftp_port;
    this.tabftpusernameTXT=tabViewGenConfigJson[0].ftp_user == "null" ? "" : tabViewGenConfigJson[0].ftp_user;
    this.tabftppasswordTXT=tabViewGenConfigJson[0].ftp_pass == "null" ? "" : tabViewGenConfigJson[0].ftp_pass;
    this.tabftpdirTXT=tabViewGenConfigJson[0].ftp_dir == "null" ? "" : tabViewGenConfigJson[0].ftp_dir;
    this.tabftptimeoutTXT=tabViewGenConfigJson[0].ftp_period == "null" ? "" : tabViewGenConfigJson[0].ftp_period;
    }else{
      this.previousTabGenConfigJson = "";
      this.tabrmsMeterDLMSConfigJson = "";
      this.resetViewPreviousPOPUP();
    }
    if (response.data.dlms_status == "found") {
     var tabViewDLMSConfigJson = response.data;
    if(tabViewDLMSConfigJson.dlms_details.length != 0){
      this.tabrmsMeterDLMSConfigJson = tabViewDLMSConfigJson;
    }else{
      this.tabrmsMeterDLMSConfigJson = "";
    }
    }
    }else{
      this.previousTabGenConfigJson = "";
      this.tabrmsMeterDLMSConfigJson = "";
     this.resetViewPreviousPOPUP();
    }
    this.isLoading = false;
    }else if(btnName == "current"){
    this.devicesummarypopupTITLE = devicename+ " - Current Configuration";
    if (response.data.gen_status == "found") {
    this.currentTabGenConfigJson = response.data.gen_details;
    var currentTabViewGenConfigJson = response.data.gen_details;
    if(currentTabViewGenConfigJson.length != 0){
    this.currentTabgatewayTXT = currentTabViewGenConfigJson[0].dev_id;
    this.currentTablocationTXT = currentTabViewGenConfigJson[0].dcu_location;
    this.currentTabenabledbglogChkBox = currentTabViewGenConfigJson[0].dbglog_enable == "Yes" ? true : false;
    this.currentTabdbglogIpTXT = currentTabViewGenConfigJson[0].dbglog_ip == "null" ? "" : currentTabViewGenConfigJson[0].dbglog_ip;
    // LAN
    //this.currentTabipaddressTXT = currentTabViewGenConfigJson[0].lan_ip;
    this.currentTabgetGenEthNumPort =  currentTabViewGenConfigJson[0].num_eth_port == "null" ? "2" : currentTabViewGenConfigJson[0].num_eth_port;
    this.currentTabnetworkbtnTXT =  currentTabViewGenConfigJson[0].net_type == "null" ? "" : currentTabViewGenConfigJson[0].net_type;
    this.currentTabipaddressTXT = currentTabViewGenConfigJson[0].eth_ip1 == "null" ? "" : currentTabViewGenConfigJson[0].eth_ip1;
    this.currentTabnewipaddressTXT = currentTabViewGenConfigJson[0].eth_new_ip1 == "null" ? "" : currentTabViewGenConfigJson[0].eth_new_ip1;
    this.currentTabsubnetmaskTXT = currentTabViewGenConfigJson[0].eth_subnet1 == "null" ? "" : currentTabViewGenConfigJson[0].eth_subnet1;
    this.currentTabgateTXT = currentTabViewGenConfigJson[0].eth_gateway1 == "null" ? "" : currentTabViewGenConfigJson[0].eth_gateway1;
    this.currentTabipaddressTXT2 = currentTabViewGenConfigJson[0].eth_ip2 == "null" ? "" : currentTabViewGenConfigJson[0].eth_ip2;
    this.currentTabnewipaddressTXT2 = currentTabViewGenConfigJson[0].eth_new_ip2 == "null" ? "" : currentTabViewGenConfigJson[0].eth_new_ip2;
    this.currentTabsubnetmaskTXT2 = currentTabViewGenConfigJson[0].eth_subnet2 == "null" ? "" : currentTabViewGenConfigJson[0].eth_subnet2;
    this.currentTabgateTXT2 = currentTabViewGenConfigJson[0].eth_gateway2 == "null" ? "" : currentTabViewGenConfigJson[0].eth_gateway2;

    this.currentTabipaddressTXT3 = currentTabViewGenConfigJson[0].eth_ip3 == "null" ? "" : currentTabViewGenConfigJson[0].eth_ip3;
    this.currentTabnewipaddressTXT3 = currentTabViewGenConfigJson[0].eth_new_ip3 == "null" ? "" : currentTabViewGenConfigJson[0].eth_new_ip3;
    this.currentTabsubnetmaskTXT3 = currentTabViewGenConfigJson[0].eth_subnet3 == "null" ? "" : currentTabViewGenConfigJson[0].eth_subnet3;
    this.currentTabgateTXT3 = currentTabViewGenConfigJson[0].eth_gateway3 == "null" ? "" : currentTabViewGenConfigJson[0].eth_gateway3;

    this.currentTabipaddressTXT4 = currentTabViewGenConfigJson[0].eth_ip4 == "null" ? "" : currentTabViewGenConfigJson[0].eth_ip4;
    this.currentTabnewipaddressTXT4 = currentTabViewGenConfigJson[0].eth_new_ip4 == "null" ? "" : currentTabViewGenConfigJson[0].eth_new_ip4;
    this.currentTabsubnetmaskTXT4 = currentTabViewGenConfigJson[0].eth_subnet4 == "null" ? "" : currentTabViewGenConfigJson[0].eth_subnet4;
    this.currentTabgateTXT4 = currentTabViewGenConfigJson[0].eth_gateway4 == "null" ? "" : currentTabViewGenConfigJson[0].eth_gateway4;

    /*
    this.currentTabno_serialDropTXT = currentTabViewGenConfigJson[0].no_serial == "" ||  currentTabViewGenConfigJson[0].no_serial == "null" ? "1": currentTabViewGenConfigJson[0].no_serial;
    // Serial Port  1
    this.currentTabserialBaudRateDropTXT1 = currentTabViewGenConfigJson[0].serial_baudrate1 == "" ||  currentTabViewGenConfigJson[0].serial_baudrate1 == "null" ? "9600": currentTabViewGenConfigJson[0].serial_baudrate1;
    this.currentTabserialDacurrentTabitsDropTXT1= currentTabViewGenConfigJson[0].serial_dacurrentTabits1 == "" || currentTabViewGenConfigJson[0].serial_dacurrentTabits1 == "null" ? "8" : currentTabViewGenConfigJson[0].serial_dacurrentTabits1;
    this.currentTabserialStopbitsDropTXT1= currentTabViewGenConfigJson[0].serial_stopbits1 == "" || currentTabViewGenConfigJson[0].serial_stopbits1 == "null" ? "1" : currentTabViewGenConfigJson[0].serial_stopbits1;
    this.currentTabserialParityDropTXT1= currentTabViewGenConfigJson[0].serial_parity1 == "" || currentTabViewGenConfigJson[0].serial_parity1 == "null" ? "None" : currentTabViewGenConfigJson[0].serial_parity1;
    this.currentTabserialHandshakeDropTXT1= currentTabViewGenConfigJson[0].serial_handshake1 == "" || currentTabViewGenConfigJson[0].serial_handshake1 == "null" ? "None" : currentTabViewGenConfigJson[0].serial_handshake1;
    this.currentTabserialInfModeDropTXT1= currentTabViewGenConfigJson[0].serial_infMode1 == "" || currentTabViewGenConfigJson[0].serial_infMode1 == "null" ? "Choose Mode" : currentTabViewGenConfigJson[0].serial_infMode1;

  // Serial Port  2
    this.currentTabserialBaudRateDropTXT2 = currentTabViewGenConfigJson[0].serial_baudrate2 == "" ||  currentTabViewGenConfigJson[0].serial_baudrate2 == "null" ? "9600": currentTabViewGenConfigJson[0].serial_baudrate2;
    this.currentTabserialDacurrentTabitsDropTXT2= currentTabViewGenConfigJson[0].serial_dacurrentTabits2 == "" || currentTabViewGenConfigJson[0].serial_dacurrentTabits2 == "null" ? "8" : currentTabViewGenConfigJson[0].serial_dacurrentTabits2;
    this.currentTabserialStopbitsDropTXT2= currentTabViewGenConfigJson[0].serial_stopbits2 == "" || currentTabViewGenConfigJson[0].serial_stopbits2 == "null" ? "1" : currentTabViewGenConfigJson[0].serial_stopbits2;
    this.currentTabserialParityDropTXT2 = currentTabViewGenConfigJson[0].serial_parity2 == "" || currentTabViewGenConfigJson[0].serial_parity2 == "null" ? "None" : currentTabViewGenConfigJson[0].serial_parity2;
    this.currentTabserialHandshakeDropTXT2 = currentTabViewGenConfigJson[0].serial_handshake2 == "" || currentTabViewGenConfigJson[0].serial_handshake2 == "null" ? "None" : currentTabViewGenConfigJson[0].serial_handshake2;
    this.currentTabserialInfModeDropTXT2 = currentTabViewGenConfigJson[0].serial_infMode2 == "" || currentTabViewGenConfigJson[0].serial_infMode2 == "null" ? "Choose Mode" : currentTabViewGenConfigJson[0].serial_infMode2;

    // Serial Port  3
    this.currentTabserialBaudRateDropTXT3 = currentTabViewGenConfigJson[0].serial_baudrate3 == "" ||  currentTabViewGenConfigJson[0].serial_baudrate3 == "null" ? "9600": currentTabViewGenConfigJson[0].serial_baudrate3;
    this.currentTabserialDacurrentTabitsDropTXT3= currentTabViewGenConfigJson[0].serial_dacurrentTabits3 == "" || currentTabViewGenConfigJson[0].serial_dacurrentTabits3 == "null" ? "8" : currentTabViewGenConfigJson[0].serial_dacurrentTabits3;
    this.currentTabserialStopbitsDropTXT3= currentTabViewGenConfigJson[0].serial_stopbits3 == "" || currentTabViewGenConfigJson[0].serial_stopbits3 == "null" ? "1" : currentTabViewGenConfigJson[0].serial_stopbits3;
    this.currentTabserialParityDropTXT3 = currentTabViewGenConfigJson[0].serial_parity3 == "" || currentTabViewGenConfigJson[0].serial_parity3 == "null" ? "None" : currentTabViewGenConfigJson[0].serial_parity3;
    this.currentTabserialHandshakeDropTXT3 = currentTabViewGenConfigJson[0].serial_handshake3 == "" || currentTabViewGenConfigJson[0].serial_handshake3 == "null" ? "None" : currentTabViewGenConfigJson[0].serial_handshake3;
    this.currentTabserialInfModeDropTXT3 = currentTabViewGenConfigJson[0].serial_infMode3 == "" || currentTabViewGenConfigJson[0].serial_infMode3 == "null" ? "Choose Mode" : currentTabViewGenConfigJson[0].serial_infMode3;

    // Serial Port  3
    this.currentTabserialBaudRateDropTXT4 = currentTabViewGenConfigJson[0].serial_baudrate4 == "" ||  currentTabViewGenConfigJson[0].serial_baudrate4 == "null" ? "9600": currentTabViewGenConfigJson[0].serial_baudrate4;
    this.currentTabserialDacurrentTabitsDropTXT4 = currentTabViewGenConfigJson[0].serial_dacurrentTabits4 == "" || currentTabViewGenConfigJson[0].serial_dacurrentTabits4 == "null" ? "8" : currentTabViewGenConfigJson[0].serial_dacurrentTabits4;
    this.currentTabserialStopbitsDropTXT4 = currentTabViewGenConfigJson[0].serial_stopbits4 == "" || currentTabViewGenConfigJson[0].serial_stopbits4 == "null" ? "1" : currentTabViewGenConfigJson[0].serial_stopbits4;
    this.currentTabserialParityDropTXT4 = currentTabViewGenConfigJson[0].serial_parity4 == "" || currentTabViewGenConfigJson[0].serial_parity4 == "null" ? "None" : currentTabViewGenConfigJson[0].serial_parity4;
    this.currentTabserialHandshakeDropTXT4 = currentTabViewGenConfigJson[0].serial_handshake4 == "" || currentTabViewGenConfigJson[0].serial_handshake4 == "null" ? "None" : currentTabViewGenConfigJson[0].serial_handshake4;
    this.currentTabserialInfModeDropTXT4 = currentTabViewGenConfigJson[0].serial_infMode4 == "" || currentTabViewGenConfigJson[0].serial_infMode4 == "null" ? "Choose Mode" : currentTabViewGenConfigJson[0].serial_infMode4;
    */

    // NTP
    this.currentTabntpChekBOX1 = currentTabViewGenConfigJson[0].ntp_enable1 == "Yes" ? true : false;
    this.currentTabntpChekBOX2 = currentTabViewGenConfigJson[0].ntp_enable2 == "Yes" ? true : false;
    this.currentTabntpIpaddressTXT = currentTabViewGenConfigJson[0].ntp_ipadd1 == "null" ? "" : currentTabViewGenConfigJson[0].ntp_ipadd1;
    this.currentTabntpPortNoTXT = currentTabViewGenConfigJson[0].ntp_port1 == "null" ? "" : currentTabViewGenConfigJson[0].ntp_port1;
    this.currentTabntpIpaddressTXT2 = currentTabViewGenConfigJson[0].ntp_ipadd2 == "null" ? "" : currentTabViewGenConfigJson[0].ntp_ipadd2;
    this.currentTabntpPortNoTXT2 = currentTabViewGenConfigJson[0].ntp_port2 == "null" ? "" : currentTabViewGenConfigJson[0].ntp_port2;
    this.currentTabntpIntervalTXT = currentTabViewGenConfigJson[0].ntp_interval == "null" ? "" : currentTabViewGenConfigJson[0].ntp_interval;

   /* this.currentTabntpTimeOffsetHrsTXT = currentTabViewGenConfigJson[0].ntp_hrs == "" ||  currentTabViewGenConfigJson[0].ntp_hrs == "null" ? "0": currentTabViewGenConfigJson[0].ntp_hrs;
    this.currentTabntpTimeOffsetSecTXT = currentTabViewGenConfigJson[0].ntp_mints == "" ||  currentTabViewGenConfigJson[0].ntp_mints == "null" ? "0": currentTabViewGenConfigJson[0].ntp_mints;
    // MQTT
    this.currentTabmqttBrokerTXT = currentTabViewGenConfigJson[0].mqtt_broker_ip == "null" ? "" : currentTabViewGenConfigJson[0].mqtt_broker_ip;
    this.currentTabmqttPortNoTXT1 = currentTabViewGenConfigJson[0].mqtt_broker_port == "null" ? "" : currentTabViewGenConfigJson[0].mqtt_broker_port;
    this.currentTabmqttUsernameTXT = currentTabViewGenConfigJson[0].mqtt_username == "null" ? "" : currentTabViewGenConfigJson[0].mqtt_username;
    this.currentTabmqttPasswodTXT = currentTabViewGenConfigJson[0].mqtt_password == "null" ? "" : currentTabViewGenConfigJson[0].mqtt_password;
    this.currentTabmqttPublicTopicTXT = currentTabViewGenConfigJson[0].mqtt_pub_topic == "null" ? "" : currentTabViewGenConfigJson[0].mqtt_pub_topic;
    this.currentTabmqttHrsTXT = currentTabViewGenConfigJson[0].mqtt_pub_int_hour == "" ||  currentTabViewGenConfigJson[0].mqtt_pub_int_hour == "null" ? "0": currentTabViewGenConfigJson[0].mqtt_pub_int_hour;
    this.currentTabmqttMinsTXT = currentTabViewGenConfigJson[0].mqtt_pub_int_mint == "" ||  currentTabViewGenConfigJson[0].mqtt_pub_int_mint == "null" ? "0": currentTabViewGenConfigJson[0].mqtt_pub_int_mint;
    this.currentTabmqttSecsTXT = currentTabViewGenConfigJson[0].mqtt_pub_int_sec == "" ||  currentTabViewGenConfigJson[0].mqtt_pub_int_sec == "null" ? "0": currentTabViewGenConfigJson[0].mqtt_pub_int_sec; 
    this.currentTabmqttEnableEventsChkBOX = currentTabViewGenConfigJson[0].mqtt_event_topic_flag == "Yes" ? true : false;
    this.currentTabmqttEventsTopicTXT = currentTabViewGenConfigJson[0].mqtt_event_pub_topic == null ? "":currentTabViewGenConfigJson[0].mqtt_event_pub_topic;
    this.currentTabmqttEnablePingChkBOX = currentTabViewGenConfigJson[0].mqtt_diag_topic_flag == "Yes" ? true : false;
    this.currentTabmqttDiagTXT = currentTabViewGenConfigJson[0].mqtt_diag_pub_topic == "null" ? "" : currentTabViewGenConfigJson[0].mqtt_diag_pub_topic;
    */

    this.currentTabgenallowcommonchkbx = currentTabViewGenConfigJson[0].enable_allow_master == "Yes" ? true : false;
    this.currentTabgenallow1chkbx = currentTabViewGenConfigJson[0].master1_enable == "Yes" ? true : false;
    this.currentTabgenallow1IPTXT= currentTabViewGenConfigJson[0].master1_ip;
    this.currentTabgenallow2chkbx = currentTabViewGenConfigJson[0].master2_enable == "Yes" ? true : false;
    this.currentTabgenallow2IPTXT = currentTabViewGenConfigJson[0].master2_ip;
    this.currentTabgenallow3chkbx = currentTabViewGenConfigJson[0].master3_enable == "Yes" ? true : false;
    this.currentTabgenallow3IPTXT= currentTabViewGenConfigJson[0].master3_ip;
    this.currentTabgenallow4chkbx= currentTabViewGenConfigJson[0].master4_enable == "Yes" ? true : false;
    this.currentTabgenallow4IPTXT = currentTabViewGenConfigJson[0].master4_ip;
    this.currentTabiec104Enablechekbox  = currentTabViewGenConfigJson[0].iec_enable == "Yes" ? true : false;
    this.currentTabiecStationTXT = currentTabViewGenConfigJson[0].iec_addr == "null" ? "" : currentTabViewGenConfigJson[0].iec_addr;
    this.currentTabiecportTXT = currentTabViewGenConfigJson[0].iec_port == "null" ? "" : currentTabViewGenConfigJson[0].iec_port;
    this.currentTabiecCylicTXT = currentTabViewGenConfigJson[0].iec_cyc_int == "null" ? "" : currentTabViewGenConfigJson[0].iec_cyc_int;
    this.currentTabstartIOAaddTXT = currentTabViewGenConfigJson[0].iec_met_start_ioa == "null" ? "" : currentTabViewGenConfigJson[0].iec_met_start_ioa;
    this.currentTabiecCodsizedwnTXT = currentTabViewGenConfigJson[0].iec_cot == "null" ? "" : currentTabViewGenConfigJson[0].iec_cot;
    this.currentTabiecIOAsizedwnTXT= currentTabViewGenConfigJson[0].iec_ioa == "null" ? "" : currentTabViewGenConfigJson[0].iec_ioa;

    this.currentTabftpEnablechekbox = currentTabViewGenConfigJson[0].ftp_enable == "Yes" ? true : false;
    this.currentTabftpIpaddTXT=currentTabViewGenConfigJson[0].ftp_ip == "null" ? "" : currentTabViewGenConfigJson[0].ftp_ip;
    this.currentTabftpprtnoTXT=currentTabViewGenConfigJson[0].ftp_port == "null" ? "" : currentTabViewGenConfigJson[0].ftp_port;
    this.currentTabftpusernameTXT=currentTabViewGenConfigJson[0].ftp_user == "null" ? "" : currentTabViewGenConfigJson[0].ftp_user;
    this.currentTabftppasswordTXT=currentTabViewGenConfigJson[0].ftp_pass == "null" ? "" : currentTabViewGenConfigJson[0].ftp_pass;
    this.currentTabftpdirTXT=currentTabViewGenConfigJson[0].ftp_dir == "null" ? "" : currentTabViewGenConfigJson[0].ftp_dir;
    this.currentTabftptimeoutTXT=currentTabViewGenConfigJson[0].ftp_period == "null" ? "" : currentTabViewGenConfigJson[0].ftp_period;
    if(this.viewPreviousConfigFlag){
      this.highlightsValueGENFunction("current",this.previousTabGenConfigJson,this.currentTabGenConfigJson);
      
    }
    }else{
      this.currentTabGenConfigJson ="";
      this.currentTabrmsMeterDLMSConfigJson = "";
      this.resetViewCurrentPOPUP();
    }
    if (response.data.dlms_status == "found") {
     var currentTabViewDLMSConfigJson = response.data;
    if(currentTabViewDLMSConfigJson.dlms_details.length != 0){
      this.currentTabrmsMeterDLMSConfigJson = currentTabViewDLMSConfigJson;
      if(this.viewPreviousConfigFlag){
      setTimeout(() => {
      this.resetHighlightDLMSValueFunction("current",this.currentTabrmsMeterDLMSConfigJson);
      this.highlightsValueDLMSFunction("current",this.tabrmsMeterDLMSConfigJson,this.currentTabrmsMeterDLMSConfigJson);
      }, 300);
    }
    }else{
      this.currentTabrmsMeterDLMSConfigJson = "";
    }
    }
    }else{
     this.currentTabGenConfigJson ="";
     this.currentTabrmsMeterDLMSConfigJson = "";
     this.resetViewCurrentPOPUP();
    }
    this.isLoading = false;
    } else if(btnName == "new"){
    this.devicesummarypopupTITLE = devicename+ " - New Configuration";
    if (response.data.gen_status == "found") {
    this.newTabGenConfigJson = response.data.gen_details;
    var newTabViewGenConfigJson = response.data.gen_details;
    if(newTabViewGenConfigJson.length != 0){
    this.newTabgatewayTXT = newTabViewGenConfigJson[0].dev_id;
    this.newTablocationTXT = newTabViewGenConfigJson[0].dcu_location == "null" ? "" : newTabViewGenConfigJson[0].dcu_location;
    this.newTabenabledbglogChkBox = newTabViewGenConfigJson[0].dbglog_enable == "Yes" ? true : false;
    this.newTabdbglogIpTXT = newTabViewGenConfigJson[0].dbglog_ip == "null" ? "" : newTabViewGenConfigJson[0].dbglog_ip;
    // LAN
    //this.newTabipaddressTXT = newTabViewGenConfigJson[0].lan_ip;
    this.newTabgetGenEthNumPort =  newTabViewGenConfigJson[0].num_eth_port == "null" ? "" : newTabViewGenConfigJson[0].num_eth_port;
    this.newTabnetworkbtnTXT =  newTabViewGenConfigJson[0].net_type == "null" ? "" : newTabViewGenConfigJson[0].net_type;
    this.newTabipaddressTXT = newTabViewGenConfigJson[0].eth_ip1 == "null" ? "" : newTabViewGenConfigJson[0].eth_ip1;
    this.newTabnewipaddressTXT = newTabViewGenConfigJson[0].eth_new_ip1 == "null" ? "" : newTabViewGenConfigJson[0].eth_new_ip1;
    this.newTabsubnetmaskTXT = newTabViewGenConfigJson[0].eth_subnet1 == "null" ? "" : newTabViewGenConfigJson[0].eth_subnet1;
    this.newTabgateTXT = newTabViewGenConfigJson[0].eth_gateway1 == "null" ? "" : newTabViewGenConfigJson[0].eth_gateway1;
    this.newTabipaddressTXT2 = newTabViewGenConfigJson[0].eth_ip2 == "null" ? "" : newTabViewGenConfigJson[0].eth_ip2;
    this.newTabnewipaddressTXT2 = newTabViewGenConfigJson[0].eth_new_ip2 == "null" ? "" : newTabViewGenConfigJson[0].eth_new_ip2;
    this.newTabsubnetmaskTXT2 = newTabViewGenConfigJson[0].eth_subnet2 == "null" ? "" : newTabViewGenConfigJson[0].eth_subnet2;
    this.newTabgateTXT2 = newTabViewGenConfigJson[0].eth_gateway2 == "null" ? "" : newTabViewGenConfigJson[0].eth_gateway2;

    this.newTabipaddressTXT3 = newTabViewGenConfigJson[0].eth_ip3 == "null" ? "" : newTabViewGenConfigJson[0].eth_ip3;
    this.newTabnewipaddressTXT3 = newTabViewGenConfigJson[0].eth_new_ip3 == "null" ? "" : newTabViewGenConfigJson[0].eth_new_ip3;
    this.newTabsubnetmaskTXT3 = newTabViewGenConfigJson[0].eth_subnet3 == "null" ? "" : newTabViewGenConfigJson[0].eth_subnet3;
    this.newTabgateTXT3 = newTabViewGenConfigJson[0].eth_gateway3 == "null" ? "" : newTabViewGenConfigJson[0].eth_gateway3;
    this.newTabipaddressTXT4 = newTabViewGenConfigJson[0].eth_ip4 == "null" ? "" : newTabViewGenConfigJson[0].eth_ip4;
    this.newTabnewipaddressTXT4 = newTabViewGenConfigJson[0].eth_new_ip4 == "null" ? "" : newTabViewGenConfigJson[0].eth_new_ip4;
    this.newTabsubnetmaskTXT4 = newTabViewGenConfigJson[0].eth_subnet4 == "null" ? "" : newTabViewGenConfigJson[0].eth_subnet4;
    this.newTabgateTXT4 = newTabViewGenConfigJson[0].eth_gateway4 == "null" ? "" : newTabViewGenConfigJson[0].eth_gateway4;
    /*
    this.newTabno_serialDropTXT = newTabViewGenConfigJson[0].no_serial == "" ||  newTabViewGenConfigJson[0].no_serial == "null" ? "1": newTabViewGenConfigJson[0].no_serial;
    // Serial Port  1
    this.newTabserialBaudRateDropTXT1 = newTabViewGenConfigJson[0].serial_baudrate1 == "" ||  newTabViewGenConfigJson[0].serial_baudrate1 == "null" ? "9600": newTabViewGenConfigJson[0].serial_baudrate1;
    this.newTabserialDanewTabitsDropTXT1= newTabViewGenConfigJson[0].serial_danewTabits1 == "" || newTabViewGenConfigJson[0].serial_danewTabits1 == "null" ? "8" : newTabViewGenConfigJson[0].serial_danewTabits1;
    this.newTabserialStopbitsDropTXT1= newTabViewGenConfigJson[0].serial_stopbits1 == "" || newTabViewGenConfigJson[0].serial_stopbits1 == "null" ? "1" : newTabViewGenConfigJson[0].serial_stopbits1;
    this.newTabserialParityDropTXT1= newTabViewGenConfigJson[0].serial_parity1 == "" || newTabViewGenConfigJson[0].serial_parity1 == "null" ? "None" : newTabViewGenConfigJson[0].serial_parity1;
    this.newTabserialHandshakeDropTXT1= newTabViewGenConfigJson[0].serial_handshake1 == "" || newTabViewGenConfigJson[0].serial_handshake1 == "null" ? "None" : newTabViewGenConfigJson[0].serial_handshake1;
    this.newTabserialInfModeDropTXT1= newTabViewGenConfigJson[0].serial_infMode1 == "" || newTabViewGenConfigJson[0].serial_infMode1 == "null" ? "Choose Mode" : newTabViewGenConfigJson[0].serial_infMode1;

  // Serial Port  2
    this.newTabserialBaudRateDropTXT2 = newTabViewGenConfigJson[0].serial_baudrate2 == "" ||  newTabViewGenConfigJson[0].serial_baudrate2 == "null" ? "9600": newTabViewGenConfigJson[0].serial_baudrate2;
    this.newTabserialDanewTabitsDropTXT2= newTabViewGenConfigJson[0].serial_danewTabits2 == "" || newTabViewGenConfigJson[0].serial_danewTabits2 == "null" ? "8" : newTabViewGenConfigJson[0].serial_danewTabits2;
    this.newTabserialStopbitsDropTXT2= newTabViewGenConfigJson[0].serial_stopbits2 == "" || newTabViewGenConfigJson[0].serial_stopbits2 == "null" ? "1" : newTabViewGenConfigJson[0].serial_stopbits2;
    this.newTabserialParityDropTXT2 = newTabViewGenConfigJson[0].serial_parity2 == "" || newTabViewGenConfigJson[0].serial_parity2 == "null" ? "None" : newTabViewGenConfigJson[0].serial_parity2;
    this.newTabserialHandshakeDropTXT2 = newTabViewGenConfigJson[0].serial_handshake2 == "" || newTabViewGenConfigJson[0].serial_handshake2 == "null" ? "None" : newTabViewGenConfigJson[0].serial_handshake2;
    this.newTabserialInfModeDropTXT2 = newTabViewGenConfigJson[0].serial_infMode2 == "" || newTabViewGenConfigJson[0].serial_infMode2 == "null" ? "Choose Mode" : newTabViewGenConfigJson[0].serial_infMode2;

    // Serial Port  3
    this.newTabserialBaudRateDropTXT3 = newTabViewGenConfigJson[0].serial_baudrate3 == "" ||  newTabViewGenConfigJson[0].serial_baudrate3 == "null" ? "9600": newTabViewGenConfigJson[0].serial_baudrate3;
    this.newTabserialDanewTabitsDropTXT3= newTabViewGenConfigJson[0].serial_danewTabits3 == "" || newTabViewGenConfigJson[0].serial_danewTabits3 == "null" ? "8" : newTabViewGenConfigJson[0].serial_danewTabits3;
    this.newTabserialStopbitsDropTXT3= newTabViewGenConfigJson[0].serial_stopbits3 == "" || newTabViewGenConfigJson[0].serial_stopbits3 == "null" ? "1" : newTabViewGenConfigJson[0].serial_stopbits3;
    this.newTabserialParityDropTXT3 = newTabViewGenConfigJson[0].serial_parity3 == "" || newTabViewGenConfigJson[0].serial_parity3 == "null" ? "None" : newTabViewGenConfigJson[0].serial_parity3;
    this.newTabserialHandshakeDropTXT3 = newTabViewGenConfigJson[0].serial_handshake3 == "" || newTabViewGenConfigJson[0].serial_handshake3 == "null" ? "None" : newTabViewGenConfigJson[0].serial_handshake3;
    this.newTabserialInfModeDropTXT3 = newTabViewGenConfigJson[0].serial_infMode3 == "" || newTabViewGenConfigJson[0].serial_infMode3 == "null" ? "Choose Mode" : newTabViewGenConfigJson[0].serial_infMode3;

    // Serial Port  3
    this.newTabserialBaudRateDropTXT4 = newTabViewGenConfigJson[0].serial_baudrate4 == "" ||  newTabViewGenConfigJson[0].serial_baudrate4 == "null" ? "9600": newTabViewGenConfigJson[0].serial_baudrate4;
    this.newTabserialDanewTabitsDropTXT4 = newTabViewGenConfigJson[0].serial_danewTabits4 == "" || newTabViewGenConfigJson[0].serial_danewTabits4 == "null" ? "8" : newTabViewGenConfigJson[0].serial_danewTabits4;
    this.newTabserialStopbitsDropTXT4 = newTabViewGenConfigJson[0].serial_stopbits4 == "" || newTabViewGenConfigJson[0].serial_stopbits4 == "null" ? "1" : newTabViewGenConfigJson[0].serial_stopbits4;
    this.newTabserialParityDropTXT4 = newTabViewGenConfigJson[0].serial_parity4 == "" || newTabViewGenConfigJson[0].serial_parity4 == "null" ? "None" : newTabViewGenConfigJson[0].serial_parity4;
    this.newTabserialHandshakeDropTXT4 = newTabViewGenConfigJson[0].serial_handshake4 == "" || newTabViewGenConfigJson[0].serial_handshake4 == "null" ? "None" : newTabViewGenConfigJson[0].serial_handshake4;
    this.newTabserialInfModeDropTXT4 = newTabViewGenConfigJson[0].serial_infMode4 == "" || newTabViewGenConfigJson[0].serial_infMode4 == "null" ? "Choose Mode" : newTabViewGenConfigJson[0].serial_infMode4;
    */
    // NTP
    this.newTabntpChekBOX1 = newTabViewGenConfigJson[0].ntp_enable1 == "Yes" ? true : false;
    this.newTabntpChekBOX2 = newTabViewGenConfigJson[0].ntp_enable2 == "Yes" ? true : false;
    this.newTabntpIpaddressTXT = newTabViewGenConfigJson[0].ntp_ipadd1 == "null" ? "" : newTabViewGenConfigJson[0].ntp_ipadd1;
    this.newTabntpPortNoTXT = newTabViewGenConfigJson[0].ntp_port1 == "null" ? "" : newTabViewGenConfigJson[0].ntp_port1;
    this.newTabntpIpaddressTXT2 = newTabViewGenConfigJson[0].ntp_ipadd2 == "null" ? "" : newTabViewGenConfigJson[0].ntp_ipadd2;
    this.newTabntpPortNoTXT2 = newTabViewGenConfigJson[0].ntp_port2 == "null" ? "" : newTabViewGenConfigJson[0].ntp_port2;
    this.newTabntpIntervalTXT = newTabViewGenConfigJson[0].ntp_interval == "null" ? "" : newTabViewGenConfigJson[0].ntp_interval;
   /* this.newTabntpTimeOffsetHrsTXT = newTabViewGenConfigJson[0].ntp_hrs == "" ||  newTabViewGenConfigJson[0].ntp_hrs == "null" ? "0": newTabViewGenConfigJson[0].ntp_hrs;
    this.newTabntpTimeOffsetSecTXT = newTabViewGenConfigJson[0].ntp_mints == "" ||  newTabViewGenConfigJson[0].ntp_mints == "null" ? "0": newTabViewGenConfigJson[0].ntp_mints;
    
    // MQTT
    this.newTabmqttBrokerTXT = newTabViewGenConfigJson[0].mqtt_broker_ip == "null" ? "" : newTabViewGenConfigJson[0].mqtt_broker_ip;
    this.newTabmqttPortNoTXT1 = newTabViewGenConfigJson[0].mqtt_broker_port == "null" ? "" : newTabViewGenConfigJson[0].mqtt_broker_port;
    this.newTabmqttUsernameTXT = newTabViewGenConfigJson[0].mqtt_username == "null" ? "" : newTabViewGenConfigJson[0].mqtt_username;
    this.newTabmqttPasswodTXT = newTabViewGenConfigJson[0].mqtt_password == "null" ? "" : newTabViewGenConfigJson[0].mqtt_password;
    this.newTabmqttPublicTopicTXT = newTabViewGenConfigJson[0].mqtt_pub_topic == "null" ? "" : newTabViewGenConfigJson[0].mqtt_pub_topic;
    this.newTabmqttHrsTXT = newTabViewGenConfigJson[0].mqtt_pub_int_hour == "" ||  newTabViewGenConfigJson[0].mqtt_pub_int_hour == "null" ? "0": newTabViewGenConfigJson[0].mqtt_pub_int_hour;
    this.newTabmqttMinsTXT = newTabViewGenConfigJson[0].mqtt_pub_int_mint == "" ||  newTabViewGenConfigJson[0].mqtt_pub_int_mint == "null" ? "0": newTabViewGenConfigJson[0].mqtt_pub_int_mint;
    this.newTabmqttSecsTXT = newTabViewGenConfigJson[0].mqtt_pub_int_sec == "" ||  newTabViewGenConfigJson[0].mqtt_pub_int_sec == "null" ? "0": newTabViewGenConfigJson[0].mqtt_pub_int_sec; 
    this.newTabmqttEnableEventsChkBOX = newTabViewGenConfigJson[0].mqtt_event_topic_flag == "Yes" ? true : false;
    this.newTabmqttEventsTopicTXT = newTabViewGenConfigJson[0].mqtt_event_pub_topic == null ? "":newTabViewGenConfigJson[0].mqtt_event_pub_topic;
    this.newTabmqttEnablePingChkBOX = newTabViewGenConfigJson[0].mqtt_diag_topic_flag == "Yes" ? true : false;
    this.newTabmqttDiagTXT = newTabViewGenConfigJson[0].mqtt_diag_pub_topic == "null" ? "" : newTabViewGenConfigJson[0].mqtt_diag_pub_topic;
      */
    this.newTabgenallowcommonchkbx = newTabViewGenConfigJson[0].enable_allow_master == "Yes" ? true : false;
    this.newTabgenallow1chkbx = newTabViewGenConfigJson[0].master1_enable == "Yes" ? true : false;
    this.newTabgenallow1IPTXT= newTabViewGenConfigJson[0].master1_ip;
    this.newTabgenallow2chkbx = newTabViewGenConfigJson[0].master2_enable == "Yes" ? true : false;
    this.newTabgenallow2IPTXT = newTabViewGenConfigJson[0].master2_ip;
    this.newTabgenallow3chkbx = newTabViewGenConfigJson[0].master3_enable == "Yes" ? true : false;
    this.newTabgenallow3IPTXT= newTabViewGenConfigJson[0].master3_ip;
    this.newTabgenallow4chkbx= newTabViewGenConfigJson[0].master4_enable == "Yes" ? true : false;
    this.newTabgenallow4IPTXT = newTabViewGenConfigJson[0].master4_ip;
    this.newTabiec104Enablechekbox  = newTabViewGenConfigJson[0].iec_enable == "Yes" ? true : false;
    this.newTabiecStationTXT = newTabViewGenConfigJson[0].iec_addr == "null" ? "" : newTabViewGenConfigJson[0].iec_addr;
    this.newTabiecportTXT = newTabViewGenConfigJson[0].iec_port == "null" ? "" : newTabViewGenConfigJson[0].iec_port;
    this.newTabiecCylicTXT = newTabViewGenConfigJson[0].iec_cyc_int == "null" ? "" : newTabViewGenConfigJson[0].iec_cyc_int;
    this.newTabstartIOAaddTXT = newTabViewGenConfigJson[0].iec_met_start_ioa == "null" ? "" : newTabViewGenConfigJson[0].iec_met_start_ioa;
    this.newTabiecCodsizedwnTXT =newTabViewGenConfigJson[0].iec_cot == "null" ? "" : newTabViewGenConfigJson[0].iec_cot;
    this.newTabiecIOAsizedwnTXT=newTabViewGenConfigJson[0].iec_ioa == "null" ? "" : newTabViewGenConfigJson[0].iec_ioa;

    this.newTabftpEnablechekbox = newTabViewGenConfigJson[0].ftp_enable == "Yes" ? true : false;
    this.newTabftpIpaddTXT=newTabViewGenConfigJson[0].ftp_ip == "null" ? "" : newTabViewGenConfigJson[0].ftp_ip;
    this.newTabftpprtnoTXT=newTabViewGenConfigJson[0].ftp_port == "null" ? "" : newTabViewGenConfigJson[0].ftp_port;
    this.newTabftpusernameTXT=newTabViewGenConfigJson[0].ftp_user == "null" ? "" : newTabViewGenConfigJson[0].ftp_user;
    this.newTabftppasswordTXT=newTabViewGenConfigJson[0].ftp_pass == "null" ? "" : newTabViewGenConfigJson[0].ftp_pass;
    this.newTabftpdirTXT=newTabViewGenConfigJson[0].ftp_dir == "null" ? "" : newTabViewGenConfigJson[0].ftp_dir;
    this.newTabftptimeoutTXT=newTabViewGenConfigJson[0].ftp_period == "null" ? "" : newTabViewGenConfigJson[0].ftp_period;
    this.highlightsValueGENFunction("new",this.currentTabGenConfigJson,this.newTabGenConfigJson);
    }else{
      this.newTabGenConfigJson = "";
      this.resetViewnewPOPUP();
    }
    if (response.data.dlms_status == "found") {
     var newTabViewDLMSConfigJson = response.data;
    if(newTabViewDLMSConfigJson.dlms_details.length != 0){
      this.newTabrmsMeterDLMSConfigJson = newTabViewDLMSConfigJson;
      setTimeout(() => {
        this.resetHighlightDLMSValueFunction("new",this.newTabrmsMeterDLMSConfigJson);
      this.highlightsValueDLMSFunction("new",this.currentTabrmsMeterDLMSConfigJson,this.newTabrmsMeterDLMSConfigJson);
      }, 300);
    }else{
      this.newTabrmsMeterDLMSConfigJson = "";
    }
    }
    }else{
     this.newTabGenConfigJson = "";
     this.newTabrmsMeterDLMSConfigJson = "";
     this.resetViewnewPOPUP();
    }
    this.isLoading = false;
    }
    });
    clearInterval(this.activatedInterval);
    this.confrimationSUBTEXT = "";
    this.confrimationTEXT = "";
    this.$modal.show('viewPrevCurrNewConfigPopup');
    },
    closedevicesummarypopup(){
      this.$modal.hide('devicesummarypopup');
    },
    closeconfirmationPopup(){
       this.$modal.hide('confirmationPopup');
       if(this.clearFlag){
         clearInterval(this.activatedInterval);
       }else{
         this.loadDeviceListMethod();
       }

    },
    resetHighlightGENValueFunction(btnName){
      var higlightArray = [];
      if(btnName == 'previous'){
        higlightArray = ['tab','currentTab'];
      }else if(btnName == 'current'){
       higlightArray = ['tab','currentTab','newTab'];
      }else if(btnName == 'new'){
        higlightArray = ['currentTab','newTab'];
      }
      for(var hilindex =0; hilindex < higlightArray.length; hilindex++) {
      var eleid = higlightArray[hilindex];
      // console.log('eleid ::', eleid);
      document.getElementById(eleid+'genGatewayTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genGatewayTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genlocationTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genlocationTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genDBGChkbox').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genDBGChkbox').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genDBGIPTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genDBGIPTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANcurrentIPTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANcurrentIPTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANnewIPTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANnewIPTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANSubnetIPTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANSubnetIPTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANGatewayIPTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANGatewayIPTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANcurrentIPTXT2').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANcurrentIPTXT2').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANnewIPTXT2').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANnewIPTXT2').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANSubnetIPTXT2').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANSubnetIPTXT2').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANGatewayIPTXT2').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANGatewayIPTXT2').classList.add('valueNotChangeCSS');
      //
      document.getElementById(eleid+'genLANcurrentIPTXT3').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANcurrentIPTXT3').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANnewIPTXT3').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANnewIPTXT3').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANSubnetIPTXT3').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANSubnetIPTXT3').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANGatewayIPTXT3').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANGatewayIPTXT3').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANcurrentIPTXT4').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANcurrentIPTXT4').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANnewIPTXT4').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANnewIPTXT4').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANSubnetIPTXT4').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANSubnetIPTXT4').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genLANGatewayIPTXT4').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genLANGatewayIPTXT4').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genNTPchkbx1').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genNTPchkbx1').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genNTPchkbx2').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genNTPchkbx2').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genNTPipaddTXT1').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genNTPipaddTXT1').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genNTPPortTXT1').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genNTPPortTXT1').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genNTPipaddTXT2').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genNTPipaddTXT2').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genNTPPortTXT2').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genNTPPortTXT2').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genNTPintervalTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genNTPintervalTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'ftpEnablechekbox').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'ftpEnablechekbox').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'ftpIpaddTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'ftpIpaddTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'ftpprtnoTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'ftpprtnoTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'ftpusernameTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'ftpusernameTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'ftppasswordTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'ftppasswordTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'ftpdirTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'ftpdirTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'ftpTimeInt').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'ftpTimeInt').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genallowcommonchkbx').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genallowcommonchkbx').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genallow1chkbx').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genallow1chkbx').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genallow1IPTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genallow1IPTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genallow2chkbx').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genallow2chkbx').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genallow2IPTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genallow2IPTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genallow3chkbx').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genallow3chkbx').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genallow3IPTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genallow3IPTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genallow4chkbx').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genallow4chkbx').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'genallow4IPTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'genallow4IPTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'iec104Enablechekbox').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'iec104Enablechekbox').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'iecStationTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'iecStationTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'iecportTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'iecportTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'iecCylicTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'iecCylicTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'startIOAaddTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'startIOAaddTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'iecCodsizedwnTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'iecCodsizedwnTXT').classList.add('valueNotChangeCSS');
      document.getElementById(eleid+'iecIOAsizedwnTXT').classList.remove('valueChangeCSS');
      document.getElementById(eleid+'iecIOAsizedwnTXT').classList.add('valueNotChangeCSS');
      }
    },
    highlightsValueGENFunction(btnName,oldGenJSON,NewGenJSON){
      console.log('btnName:', btnName);
      console.log('oldGenJSON:', JSON.stringify(oldGenJSON));
      console.log('NewGenJSON:', JSON.stringify(NewGenJSON));
      var eleid =""
      if(btnName == "previous"){
        eleid = "tab";
      }else if(btnName == "current"){
        eleid = "currentTab";
      }else if(btnName == "new"){
        eleid = "newTab";
      }
      if(oldGenJSON[0].dev_id != NewGenJSON[0].dev_id){
          document.getElementById(eleid+'genGatewayTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genGatewayTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].dcu_location != NewGenJSON[0].dcu_location){
          document.getElementById(eleid+'genlocationTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genlocationTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].dbglog_enable != NewGenJSON[0].dbglog_enable){
          document.getElementById(eleid+'genDBGChkbox').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genDBGChkbox').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].dbglog_ip != NewGenJSON[0].dbglog_ip){
          document.getElementById(eleid+'genDBGIPTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genDBGIPTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_ip1 != NewGenJSON[0].eth_ip1){
          document.getElementById(eleid+'genLANcurrentIPTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANcurrentIPTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_new_ip1 != NewGenJSON[0].eth_new_ip1){
          document.getElementById(eleid+'genLANnewIPTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANnewIPTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_subnet1 != NewGenJSON[0].eth_subnet1){
          document.getElementById(eleid+'genLANSubnetIPTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANSubnetIPTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_gateway1 != NewGenJSON[0].eth_gateway1){
          document.getElementById(eleid+'genLANGatewayIPTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANGatewayIPTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_ip2 != NewGenJSON[0].eth_ip2){
          document.getElementById(eleid+'genLANcurrentIPTXT2').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANcurrentIPTXT2').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_new_ip2 != NewGenJSON[0].eth_new_ip2){
          document.getElementById(eleid+'genLANnewIPTXT2').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANnewIPTXT2').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_subnet2 != NewGenJSON[0].eth_subnet2){
          document.getElementById(eleid+'genLANSubnetIPTXT2').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANSubnetIPTXT2').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_gateway2 != NewGenJSON[0].eth_gateway2){
          document.getElementById(eleid+'genLANGatewayIPTXT2').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANGatewayIPTXT2').classList.add('valueChangeCSS');
      }
      //
      if(oldGenJSON[0].eth_ip3 != NewGenJSON[0].eth_ip3){
          document.getElementById(eleid+'genLANcurrentIPTXT3').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANcurrentIPTXT3').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_new_ip3 != NewGenJSON[0].eth_new_ip3){
          document.getElementById(eleid+'genLANnewIPTXT3').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANnewIPTXT3').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_subnet3 != NewGenJSON[0].eth_subnet3){
          document.getElementById(eleid+'genLANSubnetIPTXT3').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANSubnetIPTXT3').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_gateway3 != NewGenJSON[0].eth_gateway3){
          document.getElementById(eleid+'genLANGatewayIPTXT3').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANGatewayIPTXT3').classList.add('valueChangeCSS');
      }
      //
      if(oldGenJSON[0].eth_ip4 != NewGenJSON[0].eth_ip4){
          document.getElementById(eleid+'genLANcurrentIPTXT4').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANcurrentIPTXT4').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_new_ip4 != NewGenJSON[0].eth_new_ip4){
          document.getElementById(eleid+'genLANnewIPTXT4').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANnewIPTXT4').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_subnet4 != NewGenJSON[0].eth_subnet4){
          document.getElementById(eleid+'genLANSubnetIPTXT4').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANSubnetIPTXT4').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].eth_gateway4 != NewGenJSON[0].eth_gateway4){
          document.getElementById(eleid+'genLANGatewayIPTXT4').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genLANGatewayIPTXT4').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ntp_enable1  != NewGenJSON[0].ntp_enable1 ){
          document.getElementById(eleid+'genNTPchkbx1').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genNTPchkbx1').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ntp_enable2  != NewGenJSON[0].ntp_enable2 ){
          document.getElementById(eleid+'genNTPchkbx2').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genNTPchkbx2').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ntp_ipadd1  != NewGenJSON[0].ntp_ipadd1 ){
          document.getElementById(eleid+'genNTPipaddTXT1').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genNTPipaddTXT1').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ntp_port1  != NewGenJSON[0].ntp_port1 ){
          document.getElementById(eleid+'genNTPPortTXT1').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genNTPPortTXT1').classList.add('valueChangeCSS');
      }
       if(oldGenJSON[0].ntp_ipadd2  != NewGenJSON[0].ntp_ipadd2 ){
          document.getElementById(eleid+'genNTPipaddTXT2').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genNTPipaddTXT2').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ntp_port2  != NewGenJSON[0].ntp_port2 ){
          document.getElementById(eleid+'genNTPPortTXT2').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genNTPPortTXT2').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ntp_interval  != NewGenJSON[0].ntp_interval ){
          document.getElementById(eleid+'genNTPintervalTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genNTPintervalTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ftp_enable != NewGenJSON[0].ftp_enable){
          document.getElementById(eleid+'ftpEnablechekbox').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'ftpEnablechekbox').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ftp_ip != NewGenJSON[0].ftp_ip){
          document.getElementById(eleid+'ftpIpaddTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'ftpIpaddTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ftp_port != NewGenJSON[0].ftp_port){
          document.getElementById(eleid+'ftpprtnoTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'ftpprtnoTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ftp_user != NewGenJSON[0].ftp_user){
          document.getElementById(eleid+'ftpusernameTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'ftpusernameTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ftp_pass != NewGenJSON[0].ftp_pass){
          document.getElementById(eleid+'ftppasswordTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'ftppasswordTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ftp_dir != NewGenJSON[0].ftp_dir){
          document.getElementById(eleid+'ftpdirTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'ftpdirTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].ftp_period != NewGenJSON[0].ftp_period){
          document.getElementById(eleid+'ftpTimeInt').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'ftpTimeInt').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].enable_allow_master != NewGenJSON[0].enable_allow_master){
          document.getElementById(eleid+'genallowcommonchkbx').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genallowcommonchkbx').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].master1_enable != NewGenJSON[0].master1_enable){
          document.getElementById(eleid+'genallow1chkbx').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genallow1chkbx').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].master1_ip != NewGenJSON[0].master1_ip){
          document.getElementById(eleid+'genallow1IPTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genallow1IPTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].master2_enable != NewGenJSON[0].master2_enable){
          document.getElementById(eleid+'genallow2chkbx').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genallow2chkbx').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].master2_ip != NewGenJSON[0].master2_ip){
          document.getElementById(eleid+'genallow2IPTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genallow2IPTXT').classList.add('valueChangeCSS');
      }
       if(oldGenJSON[0].master3_enable != NewGenJSON[0].master3_enable){
          document.getElementById(eleid+'genallow3chkbx').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genallow3chkbx').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].master3_ip != NewGenJSON[0].master3_ip){
          document.getElementById(eleid+'genallow3IPTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genallow3IPTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].master4_enable != NewGenJSON[0].master4_enable){
          document.getElementById(eleid+'genallow4chkbx').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genallow4chkbx').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].master4_ip != NewGenJSON[0].master4_ip){
          document.getElementById(eleid+'genallow4IPTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'genallow4IPTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].iec_enable != NewGenJSON[0].iec_enable){
          document.getElementById(eleid+'iec104Enablechekbox').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'iec104Enablechekbox').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].iec_addr != NewGenJSON[0].iec_addr){
          document.getElementById(eleid+'iecStationTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'iecStationTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].iec_port != NewGenJSON[0].iec_port){
          document.getElementById(eleid+'iecportTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'iecportTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].iec_cyc_int != NewGenJSON[0].iec_cyc_int){
          document.getElementById(eleid+'iecCylicTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'iecCylicTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].iec_met_start_ioa != NewGenJSON[0].iec_met_start_ioa){
          document.getElementById(eleid+'startIOAaddTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'startIOAaddTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].iec_cot != NewGenJSON[0].iec_cot){
          document.getElementById(eleid+'iecCodsizedwnTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'iecCodsizedwnTXT').classList.add('valueChangeCSS');
      }
      if(oldGenJSON[0].iec_ioa != NewGenJSON[0].iec_ioa){
          document.getElementById(eleid+'iecIOAsizedwnTXT').classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'iecIOAsizedwnTXT').classList.add('valueChangeCSS');
      }

    },
     resetHighlightDLMSValueFunction(btnName,valuefullJon){
      var higlightArray = [];
      if(btnName == 'previous'){
        higlightArray = ['tab','currentTab'];
      }else if(btnName == 'current'){
       higlightArray = ['tab','currentTab','newTab'];
      }else if(btnName == 'new'){
        higlightArray = ['currentTab','newTab'];
      }
      console.log(btnName+':valuefullJon  :', JSON.stringify(valuefullJon))
       var valueJon = valuefullJon.dlms_details;
       console.log('............', valuefullJon.dlms_details.length);
      for(var hilindex= 0; hilindex < higlightArray.length; hilindex++) {
      var eleid = higlightArray[hilindex];
      for(var jsonIndex = 0; jsonIndex< valueJon.length;jsonIndex++){
        console.log('99999999999999999 ;;;; ::', eleid+'dlmsETHEnableTXT'+(jsonIndex+1));
        var elem = document.getElementById(eleid+'dlmsETHEnableTXT'+(jsonIndex+1));
        if(typeof elem !== 'undefined' && elem !== null) {
         document.getElementById(eleid+'dlmsETHEnableTXT'+(jsonIndex+1)).classList.remove('valueChangeCSS');
         document.getElementById(eleid+'dlmsETHEnableTXT'+(jsonIndex+1)).classList.add('valueNotChangeCSS');

         document.getElementById(eleid+'dlmsETHipTXT'+(jsonIndex+1)).classList.remove('valueChangeCSS');
         document.getElementById(eleid+'dlmsETHipTXT'+(jsonIndex+1)).classList.add('valueNotChangeCSS');

         document.getElementById(eleid+'dlmsETHportTXT'+(jsonIndex+1)).classList.remove('valueChangeCSS');
         document.getElementById(eleid+'dlmsETHportTXT'+(jsonIndex+1)).classList.add('valueNotChangeCSS');

         document.getElementById(eleid+'dlmsETHpassTXT'+(jsonIndex+1)).classList.remove('valueChangeCSS');
         document.getElementById(eleid+'dlmsETHpassTXT'+(jsonIndex+1)).classList.add('valueNotChangeCSS');

         document.getElementById(eleid+'dlmsETHlocTXT'+(jsonIndex+1)).classList.remove('valueChangeCSS');
         document.getElementById(eleid+'dlmsETHlocTXT'+(jsonIndex+1)).classList.add('valueNotChangeCSS');
       }
      }
      }
    },
     highlightsValueDLMSFunction(btnName,oldDlmsfullJSON,NewDlmsfullJSON){
      console.log('btnName:', btnName);
      console.log('oldDlmsfullJSON:', JSON.stringify(oldDlmsfullJSON));
      console.log('NewDlmsfullJSON:', JSON.stringify(NewDlmsfullJSON));
      var eleid =""
      if(btnName == "previous"){
        eleid = "tab";
      }else if(btnName == "current"){
        eleid = "currentTab";
      }else if(btnName == "new"){
        eleid = "newTab";
      }
      var oldDlmsJSON = oldDlmsfullJSON.dlms_details;
      var NewDlmsJSON = NewDlmsfullJSON.dlms_details;
      for(var oldIndex = 0; oldIndex < oldDlmsJSON.length; oldIndex++){
        console.log(oldDlmsJSON[oldIndex].meter_enable+'<----------------1-------------->'+NewDlmsJSON[oldIndex].meter_enable);
        console.log(oldDlmsJSON[oldIndex].meter_ip+'<----------------1-------------->'+NewDlmsJSON[oldIndex].meter_ip);
        if(oldDlmsJSON[oldIndex].meter_enable != NewDlmsJSON[oldIndex].meter_enable){
          document.getElementById(eleid+'dlmsETHEnableTXT'+(oldIndex+1)).classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'dlmsETHEnableTXT'+(oldIndex+1)).classList.add('valueChangeCSS');
        }
        if(oldDlmsJSON[oldIndex].meter_ip  != NewDlmsJSON[oldIndex].meter_ip){
           document.getElementById(eleid+'dlmsETHipTXT'+(oldIndex+1)).classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'dlmsETHipTXT'+(oldIndex+1)).classList.add('valueChangeCSS');
        }
        if(oldDlmsJSON[oldIndex].meter_port != NewDlmsJSON[oldIndex].meter_port){
           document.getElementById(eleid+'dlmsETHportTXT'+(oldIndex+1)).classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'dlmsETHportTXT'+(oldIndex+1)).classList.add('valueChangeCSS');
        }
        if(oldDlmsJSON[oldIndex].meter_pass != NewDlmsJSON[oldIndex].meter_pass){
           document.getElementById(eleid+'dlmsETHpassTXT'+(oldIndex+1)).classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'dlmsETHpassTXT'+(oldIndex+1)).classList.add('valueChangeCSS');
        }
        if(oldDlmsJSON[oldIndex].meter_location != NewDlmsJSON[oldIndex].meter_location){
           document.getElementById(eleid+'dlmsETHlocTXT'+(oldIndex+1)).classList.remove('valueNotChangeCSS');
          document.getElementById(eleid+'dlmsETHlocTXT'+(oldIndex+1)).classList.add('valueChangeCSS');
        }
      }


    },
    loadDeviceMeterTableListMethod(name){
      var meterTableListURL = this.meter_listUrl.replace("$$meterTbName$$", name);
      axios.get(meterTableListURL).then(response => {
        if (response.data.status == "meters found") {
          this.rmsMeterListJson = response.data;
        } else {
          this.rmsMeterListJson = "";
        }
      });
    },
    rmsDLMSSaveFunction(){
      this.isLoading = true;
       this.saveDmls = {
         "username":this.username,
         "role":this.userrole,
         'reason':this.deviceReasonTXT,
         "device_id":this.dlmsupdateId,
         "device_name":this.dlmsupdatedeviceName,
         "count":this.rmsMeterDLMSConfigJson.details.length,
         "details":[],
       };
       if(this.rmsMeterDLMSConfigJson.details.length != 0){
         for(var dlmsIndex=0;dlmsIndex<this.rmsMeterDLMSConfigJson.details.length;dlmsIndex++){
           if(document.getElementById('dlmsETHcheckbox'+(dlmsIndex+1)).checked){
             if(document.getElementById('dlmsETHipTXT'+(dlmsIndex+1)).value == ""){
               this.isLoading = false;
               this.warningMessage("Please enter a meter ip address");
               return false;
             }
               var bool22 = this.ValidateDBGIPaddress('in meter IP is',document.getElementById('dlmsETHipTXT'+(dlmsIndex+1)).value);
            if (!bool22) {
              this.isLoading = false;
              this.warningMessage("meter ip address is invalid");
              return false;
            }
             if(document.getElementById('dlmsETHportTXT'+(dlmsIndex+1)).value == ""){
               this.isLoading = false;
               this.warningMessage("Please enter a meter port number");
               return false;
             }
             if (document.getElementById('dlmsETHportTXT'+(dlmsIndex+1)).value <= 0 || document.getElementById('dlmsETHportTXT'+(dlmsIndex+1)).value > 65535 ) {
              this.isLoading = false;
              this.warningMessage("meter port number should range from 1 to 65535");
              return false;
             }
             if(document.getElementById('dlmsETHpassTXT'+(dlmsIndex+1)).value == ""){
               this.isLoading = false;
               this.warningMessage("Please enter a meter password");
               return false;
             }
             if(document.getElementById('dlmsETHlocTXT'+(dlmsIndex+1)).value == ""){
               this.isLoading = false;
               this.warningMessage("Please enter a meter location");
               return false;
             }
           }
           this.saveDmls.details.push({dev_id:this.dlmsupdateId,id:this.rmsMeterDLMSConfigJson.details[dlmsIndex].id,met_id:(dlmsIndex+1).toString(),meter_enable:document.getElementById('dlmsETHcheckbox'+(dlmsIndex+1)).checked == true ? "Yes": "No",
           meter_ip:document.getElementById('dlmsETHipTXT'+(dlmsIndex+1)).value,meter_port:document.getElementById('dlmsETHportTXT'+(dlmsIndex+1)).value,
           meter_pass:document.getElementById('dlmsETHpassTXT'+(dlmsIndex+1)).value,meter_location:document.getElementById('dlmsETHlocTXT'+(dlmsIndex+1)).value
           ,meter_unique_id:this.dlmsupdateId+"_"+(dlmsIndex+1)});
       }
       }
       var orginaldata = {details:this.saveDmls.details};
       var copydata = {details:this.copyrmsMeterDLMSConfigJson};
       // console.log('orginaldata ===>', JSON.stringify(orginaldata));
       //console.log('copydata ===>', JSON.stringify(copydata));
       var checkDLMSflag = _.isEqual(orginaldata,copydata);
    if(!checkDLMSflag){
      this.isLoading = false;
      this.$modal.show('confirmationPopup');
      this.confrimationSUBTEXT = "Confirm SET_DLMS_CONFIG of device - "+this.configuredeviceName+" ?";
      //clearInterval(this.activatedInterval);
      this.deviceReasonTXT = "";
    }else{
      this.successMessage(this.configuredeviceName+" - SET_DLMS_CONFIG command applied successfully");
      this.isLoading = false;
      //this.loadDeviceListMethod();
      this.confrimationSUBTEXT = "";
    }
    },
    showfirmwareSummaryPopup(rowIndex,id,devicename,btnName){
      console.log('btnName', btnName);
      if(btnName == 'current'){
        this.firmwareSummaryPopupTitle = devicename+" - Current Firmware";
      }else if(btnName == 'previous'){
        this.firmwareSummaryPopupTitle = devicename+" - Previous Firmware";
      }else if(btnName == 'new'){
        this.firmwareSummaryPopupTitle = devicename+" - New Firmware";
      }
      var getfirmware_verURL = this.getfirmware_verURL.replace("$$deviceID$$",id);
      console.log('getfirmware_verURL', getfirmware_verURL);
        axios
        .get(getfirmware_verURL)
        .then(response => {
          var status = response.data.status;
          if (status.includes("found")) {
            this.firmwarePREVVERTXT = response.data.details[0].prev_firmware_version;
            this.firmwareCURRVERTXT = response.data.details[0].firmware_version;
            this.firmwareNEWVERTXT =  response.data.details[0].new_firmware_version;
            //this.$modal.show('firmwareSummaryPopup');
            clearInterval(this.activatedInterval);
          }else{
             this.firmwarePREVVERTXT = "";
             this.firmwareCURRVERTXT = "";
             this.firmwareNEWVERTXT =  "";
            // this.$modal.show('firmwareSummaryPopup');
             clearInterval(this.activatedInterval);
          }
        })
        .catch(function(error) {
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    
    closefirmwareSummaryPopup(){
      this.$modal.hide('firmwareSummaryPopup');
      this.loadDeviceListMethod();
    },
    clearDLMSfunction(rowIndex,resultItems){
      document.getElementById("dlmsETHipTXT"+(rowIndex+1)).value = "";
      document.getElementById("dlmsETHportTXT"+(rowIndex+1)).value = "";
      document.getElementById("dlmsETHpassTXT"+(rowIndex+1)).value = "";
      document.getElementById("dlmsETHlocTXT"+(rowIndex+1)).value = "";
    },
    enableDMLSmeter(id,rowIndex,resultItems){
       var dlmsMetercheckboxval = document.getElementById(id).checked;
       if(dlmsMetercheckboxval){
         var elem = document.getElementById("dlmsETHipTXT"+(rowIndex+1));
          if(typeof elem !== 'undefined' && elem !== null) {
          document.getElementById("dlmsETHipTXT"+(rowIndex+1)).disabled = false;
          document.getElementById("dlmsETHipTXT"+(rowIndex+1)).classList.remove("disableCSS");
          }
          var elem = document.getElementById("dlmsETHportTXT"+(rowIndex+1));
          if(typeof elem !== 'undefined' && elem !== null) {
          document.getElementById("dlmsETHportTXT"+(rowIndex+1)).disabled = false;
          document.getElementById("dlmsETHportTXT"+(rowIndex+1)).classList.remove("disableCSS");
          }
          var elem = document.getElementById("dlmsETHpassTXT"+(rowIndex+1));
          if(typeof elem !== 'undefined' && elem !== null) {
          document.getElementById("dlmsETHpassTXT"+(rowIndex+1)).disabled = false;
          document.getElementById("dlmsETHpassTXT"+(rowIndex+1)).classList.remove("disableCSS");
          }
          var elem = document.getElementById("dlmsETHlocTXT"+(rowIndex+1));
          if(typeof elem !== 'undefined' && elem !== null) {
          document.getElementById("dlmsETHlocTXT"+(rowIndex+1)).disabled = false;
          document.getElementById("dlmsETHlocTXT"+(rowIndex+1)).classList.remove("disableCSS");
          }
        }else{
          var elem = document.getElementById("dlmsETHipTXT"+(rowIndex+1));
          if(typeof elem !== 'undefined' && elem !== null) {
          document.getElementById("dlmsETHipTXT"+(rowIndex+1)).disabled = true;
          document.getElementById("dlmsETHipTXT"+(rowIndex+1)).classList.add("disableCSS");
          }
          var elem = document.getElementById("dlmsETHportTXT"+(rowIndex+1));
          if(typeof elem !== 'undefined' && elem !== null) {
          document.getElementById("dlmsETHportTXT"+(rowIndex+1)).disabled = true;
          document.getElementById("dlmsETHportTXT"+(rowIndex+1)).classList.add("disableCSS");
          }
          var elem = document.getElementById("dlmsETHpassTXT"+(rowIndex+1));
          if(typeof elem !== 'undefined' && elem !== null) {
          document.getElementById("dlmsETHpassTXT"+(rowIndex+1)).disabled = true;
          document.getElementById("dlmsETHpassTXT"+(rowIndex+1)).classList.add("disableCSS");
          }
          var elem = document.getElementById("dlmsETHlocTXT"+(rowIndex+1));
          if(typeof elem !== 'undefined' && elem !== null) {
          document.getElementById("dlmsETHlocTXT"+(rowIndex+1)).disabled = true;
          document.getElementById("dlmsETHlocTXT"+(rowIndex+1)).classList.add("disableCSS");
          }
        }
    },
    metersEditFunction(id,rowindex){
      this.updatemeterpopupID = id;
      this.meterpopupTITLE = "Edit Device";
      this.meterpopupSavebtnTXT = "Update";
      this.rmsmeterNameTXT = this.rmsMeterListJson.meter_details[rowindex].meter_name;
      this.rmsmeterTypeListTXT = this.rmsMeterListJson.meter_details[rowindex].meter_type;
      this.rmsmeterslaveAddTXT = this.rmsMeterListJson.meter_details[rowindex].slave_address;
      this.rmsmeterStatusListTXT = this.rmsMeterListJson.meter_details[rowindex].meter_status;
      this.rmsdevicemeterNameTbl = this.rmsMeterListJson.meter_details[rowindex].device_met_tab_name;
      var getTbleDetailsUrl = this.listTabledetailsUrl.replace("$$tablename$$",this.rmsdevicemeterNameTbl);
      this.meterParameterTableArray = [];
      axios
        .get(getTbleDetailsUrl)
        .then(response => {
          var status = response.data.status;
          if (status == "found") {
            for(var kk = 0; kk < response.data.details.length; kk++){
            this.meterParameterTableArray.push(response.data.details[kk]);
            }
            this.compareArray = {
              device_name: this.deviceMeterUIName,
              meter_name : this.rmsmeterNameTXT,
              meter_type : this.rmsmeterTypeListTXT,
              slave_address : this.rmsmeterslaveAddTXT,
              // meter_status : parseInt(this.rmsmeterStatusListTXT),
              parms_array: this.meterParameterTableArray
            }
          }
        })
        .catch(function(error) {
          // handle error
          alert(error);
        });
      $("#meterpopup").modal("show");
    },
    metersDeleteFunction(id,rowindex){
       var meteralertval = confirm("Do you want to delete " + this.rmsMeterListJson.meter_details[rowindex].meter_name +" meter ?");
      var meterName = this.rmsMeterListJson.meter_details[rowindex].meter_name;
      if (meteralertval) {
        var deletemeterTbUrl = this.meter_deleteUrl.replace("$$meterS_id$$",this.rmsMeterListJson.meter_details[rowindex].id).replace("$$table_name$$",this.configureMeterTbname);
        axios
        .get(deletemeterTbUrl)
        .then(response => {
          var deleteStatus = response.data.status;
          if (deleteStatus.includes("Success")) {
            this.loadDeviceMeterTableListMethod(this.configureMeterTbname);
            this.successMessage(meterName + " - deleted successfully");
          }
        })
        .catch(function(error) {
          // handle error
          alert(error);
        })
        .finally(function() {
          // always executed
        });
        return true;
      } else {
        return false;
      }
    },
    meterpopupSaveFunction(){
      if (this.rmsmeterNameTXT == "" || this.rmsmeterNameTXT == null) {
        this.warningMessage("Please enter a feeder name.");
        return false;
      }
      var checkbool = this.checksplChar(this.rmsmeterNameTXT);
      if (!checkbool) {
        this.warningMessage("feeder name only allows character, number and underscore.");
        return false;
      }
      if (this.rmsmeterTypeListTXT == "Choose Feeder type" || this.rmsmeterTypeListTXT == "") {
        this.warningMessage("Please choose any one meter type.");
        return false;
      }
      if (this.rmsmeterslaveAddTXT == "" || this.rmsmeterslaveAddTXT == null) {
        this.warningMessage("Please enter a slave address.");
        return false;
      }
      if (this.rmsmeterslaveAddTXT <= 0 || this.rmsmeterslaveAddTXT > 65535 ) {
        this.warningMessage("Slave address should range from 1 to 65535.");
        return false;
      }
     if (this.meterpopupSavebtnTXT == "Save") {
         if (this.rmsMeterListJson != "") {
          for (var k = 0;k < this.rmsMeterListJson.meter_details.length;k++) {
            if (this.rmsmeterNameTXT == this.rmsMeterListJson.meter_details[k].meter_name) {
              this.warningMessage("feeder name already configured. Please enter new feeder name.");
              return false;
            }

           if (this.rmsmeterslaveAddTXT == this.rmsMeterListJson.meter_details[k].slave_address) {
              this.warningMessage("Slave address already configured. Please enter new slave address.");
              return false;
            }
          }
        }
         this.selectiveParmsAray=[];
        for(var i=0;i<this.meterParameterTableArray.length;i++){
              // if(document.getElementById("acqmode"+(i+1)).value =="Choose Mode"){
              //    this.warningMessage("Please choose an acquisition mode.");
              //    return false;
              // }
            //  if(document.getElementById("deadband"+(i+1)).value ==""){
            //     this.warningMessage("Please enter a dead band value.");
           //      return false;
            //  }
           //   if(document.getElementById("minval"+(i+1)).value == ""){
           //      this.warningMessage("Please choose a min value.");
          //      return false;
          //    }
          //    if(document.getElementById("maxval"+(i+1)).value ==""){
          //       this.warningMessage("Please enter a max value.");
          //       return false;
         //     }
         //     if(document.getElementById("scalefactor"+(i+1)).value ==""){
         //        this.warningMessage("Please enter a scale factor value.");
         //        return false;
         //     }
          var objectarr = {
            short_name: document.getElementById("parmsshortname" + (i + 1)).innerHTML,
            full_name: document.getElementById("parmsfullname" + (i + 1)).innerHTML,
            unit: document.getElementById("parmsunit" + (i + 1)).innerHTML,
            fun_code: parseInt(document.getElementById("hideparmsfuncode" + (i + 1)).innerHTML),
            address: document.getElementById("parmsaddress" + (i + 1)).innerHTML,
            no_reg: parseInt(document.getElementById("parmsnoreg" + (i + 1)).innerHTML),
            data_type: parseInt(document.getElementById("hideparmsdatatype" + (i + 1)).innerHTML),
           // acq_mode: document.getElementById("acqmode" + (i + 1)).value,
            dead_band: document.getElementById("deadband" + (i + 1)).value,
            min_val: document.getElementById("minval" + (i + 1)).value,
            max_val: document.getElementById("maxval" + (i + 1)).value,
            scale_factor: document.getElementById("scalefactor" + (i + 1)).value
          };
          this.selectiveParmsAray.push(objectarr);
        };

        var createPOST= {
          device_id: this.configureMeterTbID,
          device_name: this.deviceMeterUIName,
          table_name: this.configureMeterTbname,
          meter_name: this.rmsmeterNameTXT,
          meter_type: this.rmsmeterTypeListTXT,
          slave_address: this.rmsmeterslaveAddTXT,
          //meter_status : parseInt(this.rmsmeterStatusListTXT),
          params_array:this.selectiveParmsAray
        };
        //console.log("------NEW:----createPOST----->"+ JSON.stringify(createPOST));
        axios
          .post(this.meter_createUrl, createPOST)
          .then(response => {
            var status = response.data.status;
            if (status.includes("Success")) {
              this.loadDeviceMeterTableListMethod(this.configureMeterTbname);
              this.successMessage(this.rmsmeterNameTXT + " - added successfully");
              $("#meterpopup").modal("hide");
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error);
          });
     }else
     {
        if (this.rmsMeterListJson != "") {
          for (var k = 0;k < this.rmsMeterListJson.meter_details.length;k++) {
            if (this.updatemeterpopupID != this.rmsMeterListJson.meter_details[k].id) {
            if (this.rmsmeterNameTXT == this.rmsMeterListJson.meter_details[k].meter_name) {
              this.warningMessage("feeder name already configured. Please enter new feeder name.");
              return false;
            }

           if (this.rmsmeterslaveAddTXT == this.rmsMeterListJson.meter_details[k].slave_address) {
              this.warningMessage("Slave address already configured. Please enter new slave address.");
              return false;
            }
            }
          }
        }
        var editselctiveArray =[];
        for(var i=0;i<this.meterParameterTableArray.length;i++){
              // if(document.getElementById("acqmode"+(i+1)).value =="Choose Mode"){
              //    this.warningMessage("Please choose an acquisition mode.");
              //    return false;
              // }
              //if(document.getElementById("deadband"+(i+1)).value ==""){
             //    this.warningMessage("Please enter a dead band value.");
             //    return false;
             // }
            //  if(document.getElementById("minval"+(i+1)).value == ""){
           //      this.warningMessage("Please choose a min value.");
            //     return false;
           //   }
             // if(document.getElementById("maxval"+(i+1)).value ==""){
              //   this.warningMessage("Please enter a max value.");
            //     return false;
            //  }
            //  if(document.getElementById("scalefactor"+(i+1)).value ==""){
              //   this.warningMessage("Please enter a scale factor value.");
             //    return false;
             // }
           var objectarr = {
            id: this.meterParameterTableArray[i].id,
            short_name: document.getElementById("parmsshortname" + (i + 1)).innerHTML,
            full_name: document.getElementById("parmsfullname" + (i + 1)).innerHTML,
            unit: document.getElementById("parmsunit" + (i + 1)).innerHTML,
            fun_code: parseInt(document.getElementById("hideparmsfuncode" + (i + 1)).innerHTML),
            address: document.getElementById("parmsaddress" + (i + 1)).innerHTML,
            no_reg: parseInt(document.getElementById("parmsnoreg" + (i + 1)).innerHTML),
            data_type: parseInt(document.getElementById("hideparmsdatatype" + (i + 1)).innerHTML),
            // acq_mode: document.getElementById("acqmode" + (i + 1)).value,
            dead_band: document.getElementById("deadband" + (i + 1)).value,
            min_val: document.getElementById("minval" + (i + 1)).value,
            max_val: document.getElementById("maxval" + (i + 1)).value,
            scale_factor: document.getElementById("scalefactor" + (i + 1)).value
           }
            editselctiveArray.push(objectarr);
        }
        var newcompareArray = {
              device_id: this.configureMeterTbID,
              device_name: this.deviceMeterUIName,
              meter_name : this.rmsmeterNameTXT,
              meter_type : this.rmsmeterTypeListTXT,
              slave_address : this.rmsmeterslaveAddTXT,
              //meter_status : parseInt(this.rmsmeterStatusListTXT),
              parms_array: editselctiveArray
            }
          //    console.log(JSON.stringify(this.compareArray) == JSON.stringify(newcompareArray));
          // console.log("------EDIT--:12345678:----newcompareArray----->"+ JSON.stringify(newcompareArray));
        if(JSON.stringify(this.compareArray) == JSON.stringify(newcompareArray)){
            $("#meterpopup").modal("hide");
        }else{
        var editPOSTJSON = {
          id: parseInt(this.updatemeterpopupID),
          device_id: this.configureMeterTbID,
          device_name: this.deviceMeterUIName,
          table_name: this.configureMeterTbname,
          meter_name: this.rmsmeterNameTXT,
          meter_type: this.rmsmeterTypeListTXT,
          slave_address: this.rmsmeterslaveAddTXT,
        //  meter_status : parseInt(this.rmsmeterStatusListTXT),
          params_array: editselctiveArray
        };
          console.log("--------22222:----EDIT----->"+JSON.stringify(editPOSTJSON));
        axios
          .post(this.meter_updateUrl, editPOSTJSON)
          .then(response => {
            var updateStatus = response.data.status;
            if (updateStatus.includes("Success")) {
              this.loadDeviceMeterTableListMethod(this.configureMeterTbname);
              this.successMessage(this.rmsmeterNameTXT + " - updated successfully"
              );
              $("#meterpopup").modal("hide");
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error);
          });

          }
      }
    },
    rmsAddDeviceFunction:function() {
      this.dcuSerialNumdataList();
      this.$modal.show('rmsdeviceConfigModal');
      clearInterval(this.activatedInterval);
      this.resetEMSdevicepopup();
      this.deviceerrorMsg = [];
    },
    resetEMSdevicepopup: function() {
      this.rmsSavebtnTXT = "Save";
      this.rmsdeviceepopupTitle = "Add DCU";
     /* if(this.rmsdeviceConfigJson != ""){
      var devicenoOflenid = this.rmsdeviceConfigJson.device_details[this.rmsdeviceConfigJson.device_details.length-1].s_no;
      console.log('devicenoOflenid :', devicenoOflenid);
      if(devicenoOflenid <= 8){
        this.rmsdeviceIDTXT = "DCU_000"+(devicenoOflenid+1);
      }else if(devicenoOflenid > 9 && devicenoOflenid <= 98){
         this.rmsdeviceIDTXT = "DCU_00"+(devicenoOflenid+1);
      }else if(devicenoOflenid >= 99 && devicenoOflenid <= 998){
         this.rmsdeviceIDTXT = "DCU_0"+(devicenoOflenid+1);
      }else{
         this.rmsdeviceIDTXT = "DCU_"+(devicenoOflenid+1);
      }
      }else{
         this.rmsdeviceIDTXT = "DCU_0001";
      }
      */
      this.updateid = "";
      this.rmsdeviceIDTXT = "Choose DCU ID";
      this.dcuRegionnameTXT = "Choose Region";
      this.dcuCircleNameTXT = "Choose Circle";
      this.dcuSSNameTXT = "Choose Sub Station";
      this.deviceEditMode = false;
      this.rmsdeviceNameTXT = "";
      this.configureMeterTbname = "";
      this.rmsdeviceIPTXT = "";
      this.rmsdevicenoOfmeterTXT = "";
      this.rmsdevicePortnoTXT = 1;
      this.devicehoursVAL="choose hours";
      this.deviceminsVAL="choose minutes";
      this.rmsdeviceLocationTXT = "";
      this.rmsdevicestatusTXT = "1";
      this.dcuGCSTXT = "2";
      this.dcuOutgoingFeederTXT = "8";
    },
    rmsConfigureMeterFunction(index , id, devicename) {
      this.configureMeterTbname = this.rmsdeviceConfigJson.device_details[index].meter_table_name;
      this.configurenoofMetersTbID = this.rmsdeviceConfigJson.device_details[index].no_of_meters;
      this.configureMeterTbID = id;
      this.loadDeviceMeterTableListMethod(this.configureMeterTbname);
      this.deviceMeterUIName = devicename;
      this.innerMinHeight1 = window.innerHeight - 235 + "px";
      document.getElementById("meterTableDiv").style.height = this.innerMinHeight1;
      document.getElementById("meterTableDiv").style.border = "1px solid lightgray";
      clearInterval(this.activatedInterval);
      this.$modal.show('configureMeterpopup');
    },
    resetViewPreviousPOPUP(){
    this.tabgatewayTXT = this.configureMeterTbID;
    this.tablocationTXT = "";
    this.tabenabledbglogChkBox = false;
    this.tabdbglogIpTXT = "";
    // LAN
    this.tabgetGenEthNumPort = null;
    this.tabipaddressTXT = "";
    this.tabnewipaddressTXT = "";
    this.tabsubnetmaskTXT = "";
    this.tabnetworkbtnTXT= "CDCS Network";
    this.tabgateTXT = "";
    this.tabipaddressTXT2 = "";
    this.tabnewipaddressTXT2 = "";
    this.tabsubnetmaskTXT2 = "";
    this.tabgateTXT2 = "";
    this.tabipaddressTXT3 = "";
    this.tabnewipaddressTXT3 = "";
    this.tabsubnetmaskTXT3 = "";
    this.tabgateTXT3 = "";
    this.tabipaddressTXT4 = "";
    this.tabnewipaddressTXT4 = "";
    this.tabsubnetmaskTXT4 = "";
    this.tabgateTXT4 = "";

    /*
    // Serial Port
    this.tabno_serialDropTXT="1",
    this.tabserialBaudRateDropTXT1 = "9600";
    this.tabserialDatabitsDropTXT1 = "8";
    this.tabserialStopbitsDropTXT1= "1";
    this.tabserialParityDropTXT1= "None";
    this.tabserialHandshakeDropTXT1= "None";
    this.tabserialInfModeDropTXT1= "Choose Mode",
    this.tabserialBaudRateDropTXT2 = "9600";
    this.tabserialDatabitsDropTXT2 = "8";
    this.tabserialStopbitsDropTXT2= "1";
    this.tabserialParityDropTXT2 = "None";
    this.tabserialHandshakeDropTXT2 = "None";
    this.tabserialInfModeDropTXT2 = "Choose Mode",
    this.tabserialBaudRateDropTXT3 = "9600";
    this.tabserialDatabitsDropTXT3 = "8";
    this.tabserialStopbitsDropTXT3 = "1";
    this.tabserialParityDropTXT3 = "None";
    this.tabserialHandshakeDropTXT3 = "None";
    this.tabserialInfModeDropTXT3 = "Choose Mode",
    this.tabserialBaudRateDropTXT4 = "9600";
    this.tabserialDatabitsDropTXT4 = "8";
    this.tabserialStopbitsDropTXT4 = "1";
    this.tabserialParityDropTXT4 = "None";
    this.tabserialHandshakeDropTXT4 = "None";
    this.tabserialInfModeDropTXT4 = "Choose Mode",
    */

    // NTP
    this.tabntpChekBOX1 = false ;
    this.tabntpChekBOX2 =   false ;
    this.tabntpIpaddressTXT = "";
    this.tabntpPortNoTXT = "";
    this.tabntpIpaddressTXT2 = "";
    this.tabntpPortNoTXT2 = "";
    this.tabntpIntervalTXT = "";
    this.tabntpTimeOffsetHrsTXT = "0";
    this.tabntpTimeOffsetSecTXT = "0";
/*
    // MQTT
    this.tabmqttBrokerTXT = "";
    this.tabmqttPortNoTXT1 = "";
    this.tabmqttUsernameTXT = "";
    this.tabmqttPasswodTXT = "";
    this.tabmqttPublicTopicTXT = "";
    this.tabmqttHrsTXT = "0";
    this.tabmqttMinsTXT = "0";
    this.tabmqttSecsTXT = "0";
    this.tabmqttEnableEventsChkBOX = false;
    this.tabmqttEventsTopicTXT = "";
    this.tabmqttEnablePingChkBOX =  false;
    this.tabmqttDiagTXT = "";
    this.tabmqttBrokerTXT =  "0.0.0.0";
    this.tabmqttPortNoTXT1 = "123";
    this.tabmqttUsernameTXT = "xxxx";
    this.tabmqttPasswodTXT = "xxxx";
    */
      this.tabdbglogIpTXT = "0.0.0.0";
      this.tabntpIpaddressTXT = "0.0.0.0";
      this.tabntpPortNoTXT = "123";
      this.tabntpIpaddressTXT2 = "0.0.0.0";
      this.tabntpPortNoTXT2 = "123";
      this.tabntpIntervalTXT ="5";
      this.tabgenallowcommonchkbx = false;
      this.tabgenallow1chkbx =  false;
      this.tabgenallow1IPTXT = "",
      this.tabgenallow2chkbx = false;
      this.tabgenallow2IPTXT = "";
      this.tabgenallow3chkbx = false;
      this.tabgenallow3IPTXT =  "";
      this.tabgenallow4chkbx =  false,
      this.tabgenallow4IPTXT =  "",
      this.tabiec104Enablechekbox = false;
      this.tabftpEnablechekbox =false;
      this.tabftpIpaddTXT="";
      this.tabftpprtnoTXT = '';
      this.tabftpusernameTXT = '';
      this.tabftppasswordTXT = '';
      this.tabftpdirTXT = "";
      this.tabftptimeoutTXT = '15';
      this.tabiecStationTXT = '',
      this.tabstartIOAaddTXT = '';
      this.tabiecCodsizedwnTXT = 'Choose COT Size';
      this.tabiecCylicTXT =  '';
      this.tabiecIOAsizedwnTXT =  'Choose IOA Size';
      this.tabiecTSTAdwnTXT ='Choose TSTA';
      this.tabiecTSTAstartAddresTXT = '';
      this.tabiecportTXT   ='';

    },
     resetViewHistoryResPOPUP(){
    this.historyViewgatewayTXT = this.deviceTblID;
    this.historyViewlocationTXT = "";
    this.historyViewenabledbglogChkBox = false;
    this.historyViewdbglogIpTXT = "";
    // LAN
    this.historyViewgetGenEthNumPort = null;
    this.historyViewipaddressTXT = "";
    this.historyViewnewipaddressTXT = "";
    this.historyViewsubnetmaskTXT = "";
    this.historyViewnetworkbtnTXT= "CDCS Network";
    this.historyViewgateTXT = "";
    this.historyViewipaddressTXT2 = "";
    this.historyViewnewipaddressTXT2 = "";
    this.historyViewsubnetmaskTXT2 = "";
    this.historyViewgateTXT2 = "";
     
    this.historyViewipaddressTXT3 = "";
    this.historyViewnewipaddressTXT3 = "";
    this.historyViewsubnetmaskTXT3 = "";
    this.historyViewgateTXT3 = "";
    this.historyViewipaddressTXT4 = "";
    this.historyViewnewipaddressTXT4 = "";
    this.historyViewsubnetmaskTXT4 = "";
    this.historyViewgateTXT4 = "";
    /*
    // Serial Port
    this.historyViewno_serialDropTXT="1",
    this.historyViewserialBaudRateDropTXT1 = "9600";
    this.historyViewserialDahistoryViewitsDropTXT1 = "8";
    this.historyViewserialStopbitsDropTXT1= "1";
    this.historyViewserialParityDropTXT1= "None";
    this.historyViewserialHandshakeDropTXT1= "None";
    this.historyViewserialInfModeDropTXT1= "Choose Mode",
    this.historyViewserialBaudRateDropTXT2 = "9600";
    this.historyViewserialDahistoryViewitsDropTXT2 = "8";
    this.historyViewserialStopbitsDropTXT2= "1";
    this.historyViewserialParityDropTXT2 = "None";
    this.historyViewserialHandshakeDropTXT2 = "None";
    this.historyViewserialInfModeDropTXT2 = "Choose Mode",
    this.historyViewserialBaudRateDropTXT3 = "9600";
    this.historyViewserialDahistoryViewitsDropTXT3 = "8";
    this.historyViewserialStopbitsDropTXT3 = "1";
    this.historyViewserialParityDropTXT3 = "None";
    this.historyViewserialHandshakeDropTXT3 = "None";
    this.historyViewserialInfModeDropTXT3 = "Choose Mode",
    this.historyViewserialBaudRateDropTXT4 = "9600";
    this.historyViewserialDahistoryViewitsDropTXT4 = "8";
    this.historyViewserialStopbitsDropTXT4 = "1";
    this.historyViewserialParityDropTXT4 = "None";
    this.historyViewserialHandshakeDropTXT4 = "None";
    this.historyViewserialInfModeDropTXT4 = "Choose Mode",
    */

    // NTP
    this.historyViewntpChekBOX1 = false ;
    this.historyViewntpChekBOX2 =   false ;
    this.historyViewntpIpaddressTXT = "";
    this.historyViewntpPortNoTXT = "";
    this.historyViewntpIpaddressTXT2 = "";
    this.historyViewntpPortNoTXT2 = "";
    this.historyViewntpIntervalTXT = "";
    this.historyViewntpTimeOffsetHrsTXT = "0";
    this.historyViewntpTimeOffsetSecTXT = "0";
/*
    // MQTT
    this.historyViewmqttBrokerTXT = "";
    this.historyViewmqttPortNoTXT1 = "";
    this.historyViewmqttUsernameTXT = "";
    this.historyViewmqttPasswodTXT = "";
    this.historyViewmqttPublicTopicTXT = "";
    this.historyViewmqttHrsTXT = "0";
    this.historyViewmqttMinsTXT = "0";
    this.historyViewmqttSecsTXT = "0";
    this.historyViewmqttEnableEventsChkBOX = false;
    this.historyViewmqttEventsTopicTXT = "";
    this.historyViewmqttEnablePingChkBOX =  false;
    this.historyViewmqttDiagTXT = "";
    this.historyViewmqttBrokerTXT =  "0.0.0.0";
    this.historyViewmqttPortNoTXT1 = "123";
    this.historyViewmqttUsernameTXT = "xxxx";
    this.historyViewmqttPasswodTXT = "xxxx";
    */
      this.historyViewdbglogIpTXT = "0.0.0.0";
      this.historyViewntpIpaddressTXT = "0.0.0.0";
      this.historyViewntpPortNoTXT = "123";
      this.historyViewntpIpaddressTXT2 = "0.0.0.0";
      this.historyViewntpPortNoTXT2 = "123";
      this.historyViewntpIntervalTXT ="5";
      this.historyViewgenallowcommonchkbx = false;
      this.historyViewgenallow1chkbx =  false;
      this.historyViewgenallow1IPTXT = "",
      this.historyViewgenallow2chkbx = false;
      this.historyViewgenallow2IPTXT = "";
      this.historyViewgenallow3chkbx = false;
      this.historyViewgenallow3IPTXT =  "";
      this.historyViewgenallow4chkbx =  false,
      this.historyViewgenallow4IPTXT =  "",
      this.historyViewiec104Enablechekbox = false;
      this.historyViewftpEnablechekbox =false;
      this.historyViewftpIpaddTXT="";
      this.historyViewftpprtnoTXT = '';
      this.historyViewftpusernameTXT = '';
      this.historyViewftppasswordTXT = '';
      this.historyViewftpdirTXT = "";
      this.historyViewftptimeoutTXT = '15';
      this.historyViewiecStationTXT = '',
      this.historyViewstartIOAaddTXT = '';
      this.historyViewiecCodsizedwnTXT = 'Choose COT Size';
      this.historyViewiecCylicTXT =  '';
      this.historyViewiecIOAsizedwnTXT =  'Choose IOA Size';
      this.historyViewiecTSTAdwnTXT ='Choose TSTA';
      this.historyViewiecTSTAstartAddresTXT = '';
      this.historyViewiecportTXT   ='';

    },
    resetViewCurrentPOPUP(){
    this.currentTabgatewayTXT = this.deviceTblID;
    this.currentTablocationTXT = "";
    this.currentTabenabledbglogChkBox = false;
    this.currentTabdbglogIpTXT = "";
    // LAN
    this.currentTabgetGenEthNumPort = null;
    this.currentTabipaddressTXT = "";
    this.currentTabnewipaddressTXT = "";
    this.currentTabsubnetmaskTXT = "";
    this.currentTabnetworkbtnTXT= "CDCS Network";
    this.currentTabgateTXT = "";
    this.currentTabipaddressTXT2 = "";
    this.currentTabnewipaddressTXT2 = "";
    this.currentTabsubnetmaskTXT2 = "";
    this.currentTabgateTXT2 = "";
    this.currentTabipaddressTXT3 = "";
    this.currentTabnewipaddressTXT3 = "";
    this.currentTabsubnetmaskTXT3 = "";
    this.currentTabgateTXT3 = "";
    this.currentTabipaddressTXT4 = "";
    this.currentTabnewipaddressTXT4 = "";
    this.currentTabsubnetmaskTXT4 = "";
    this.currentTabgateTXT4 = "";

    /*
    // Serial Port
    this.currentTabno_serialDropTXT="1",
    this.currentTabserialBaudRateDropTXT1 = "9600";
    this.currentTabserialDacurrentTabitsDropTXT1 = "8";
    this.currentTabserialStopbitsDropTXT1= "1";
    this.currentTabserialParityDropTXT1= "None";
    this.currentTabserialHandshakeDropTXT1= "None";
    this.currentTabserialInfModeDropTXT1= "Choose Mode",
    this.currentTabserialBaudRateDropTXT2 = "9600";
    this.currentTabserialDacurrentTabitsDropTXT2 = "8";
    this.currentTabserialStopbitsDropTXT2= "1";
    this.currentTabserialParityDropTXT2 = "None";
    this.currentTabserialHandshakeDropTXT2 = "None";
    this.currentTabserialInfModeDropTXT2 = "Choose Mode",
    this.currentTabserialBaudRateDropTXT3 = "9600";
    this.currentTabserialDacurrentTabitsDropTXT3 = "8";
    this.currentTabserialStopbitsDropTXT3 = "1";
    this.currentTabserialParityDropTXT3 = "None";
    this.currentTabserialHandshakeDropTXT3 = "None";
    this.currentTabserialInfModeDropTXT3 = "Choose Mode",
    this.currentTabserialBaudRateDropTXT4 = "9600";
    this.currentTabserialDacurrentTabitsDropTXT4 = "8";
    this.currentTabserialStopbitsDropTXT4 = "1";
    this.currentTabserialParityDropTXT4 = "None";
    this.currentTabserialHandshakeDropTXT4 = "None";
    this.currentTabserialInfModeDropTXT4 = "Choose Mode",
    */

    // NTP
    this.currentTabntpChekBOX1 = false ;
    this.currentTabntpChekBOX2 =   false ;
    this.currentTabntpIpaddressTXT = "";
    this.currentTabntpPortNoTXT = "";
    this.currentTabntpIpaddressTXT2 = "";
    this.currentTabntpPortNoTXT2 = "";
    this.currentTabntpIntervalTXT = "";
    this.currentTabntpTimeOffsetHrsTXT = "0";
    this.currentTabntpTimeOffsetSecTXT = "0";
/*
    // MQTT
    this.currentTabmqttBrokerTXT = "";
    this.currentTabmqttPortNoTXT1 = "";
    this.currentTabmqttUsernameTXT = "";
    this.currentTabmqttPasswodTXT = "";
    this.currentTabmqttPublicTopicTXT = "";
    this.currentTabmqttHrsTXT = "0";
    this.currentTabmqttMinsTXT = "0";
    this.currentTabmqttSecsTXT = "0";
    this.currentTabmqttEnableEventsChkBOX = false;
    this.currentTabmqttEventsTopicTXT = "";
    this.currentTabmqttEnablePingChkBOX =  false;
    this.currentTabmqttDiagTXT = "";
    this.currentTabmqttBrokerTXT =  "0.0.0.0";
    this.currentTabmqttPortNoTXT1 = "123";
    this.currentTabmqttUsernameTXT = "xxxx";
    this.currentTabmqttPasswodTXT = "xxxx";
    */
      this.currentTabdbglogIpTXT = "0.0.0.0";
      this.currentTabntpIpaddressTXT = "0.0.0.0";
      this.currentTabntpPortNoTXT = "123";
      this.currentTabntpIpaddressTXT2 = "0.0.0.0";
      this.currentTabntpPortNoTXT2 = "123";
      this.currentTabntpIntervalTXT ="5";
      this.currentTabgenallowcommonchkbx = false;
      this.currentTabgenallow1chkbx =  false;
      this.currentTabgenallow1IPTXT = "",
      this.currentTabgenallow2chkbx = false;
      this.currentTabgenallow2IPTXT = "";
      this.currentTabgenallow3chkbx = false;
      this.currentTabgenallow3IPTXT =  "";
      this.currentTabgenallow4chkbx =  false,
      this.currentTabgenallow4IPTXT =  "",
      this.currentTabiec104Enablechekbox = false;
      this.currentTabftpEnablechekbox =false;
      this.currentTabftpIpaddTXT="";
      this.currentTabftpprtnoTXT = '';
      this.currentTabftpusernameTXT = '';
      this.currentTabftppasswordTXT = '';
      this.currentTabftpdirTXT = "";
      this.currentTabftptimeoutTXT = '15';
      this.currentTabiecStationTXT = '',
      this.currentTabstartIOAaddTXT = '';
      this.currentTabiecCodsizedwnTXT = 'Choose COT Size';
      this.currentTabiecCylicTXT =  '';
      this.currentTabiecIOAsizedwnTXT =  'Choose IOA Size';
      this.currentTabiecTSTAdwnTXT ='Choose TSTA';
      this.currentTabiecTSTAstartAddresTXT = '';
      this.currentTabiecportTXT   ='';

    },
    resetViewnewPOPUP(){
    this.newTabgatewayTXT = this.deviceTblID;
    this.newTablocationTXT = "";
    this.newTabenabledbglogChkBox = false;
    this.newTabdbglogIpTXT = "";
    // LAN
    this.newTabgetGenEthNumPort = null;
    this.newTabipaddressTXT = "";
    this.newTabnewipaddressTXT = "";
    this.newTabsubnetmaskTXT = "";
    this.newTabnetworkbtnTXT= "CDCS Network";
    this.newTabgateTXT = "";
    this.newTabipaddressTXT2 = "";
    this.newTabnewipaddressTXT2 = "";
    this.newTabsubnetmaskTXT2 = "";
    this.newTabgateTXT2 = "";
    this.newTabipaddressTXT3 = "";
    this.newTabnewipaddressTXT3 = "";
    this.newTabsubnetmaskTXT3 = "";
    this.newTabgateTXT3 = "";
    this.newTabipaddressTXT4 = "";
    this.newTabnewipaddressTXT4 = "";
    this.newTabsubnetmaskTXT4 = "";
    this.newTabgateTXT4 = "";

    /*
    // Serial Port
    this.newTabno_serialDropTXT="1",
    this.newTabserialBaudRateDropTXT1 = "9600";
    this.newTabserialDanewTabitsDropTXT1 = "8";
    this.newTabserialStopbitsDropTXT1= "1";
    this.newTabserialParityDropTXT1= "None";
    this.newTabserialHandshakeDropTXT1= "None";
    this.newTabserialInfModeDropTXT1= "Choose Mode",
    this.newTabserialBaudRateDropTXT2 = "9600";
    this.newTabserialDanewTabitsDropTXT2 = "8";
    this.newTabserialStopbitsDropTXT2= "1";
    this.newTabserialParityDropTXT2 = "None";
    this.newTabserialHandshakeDropTXT2 = "None";
    this.newTabserialInfModeDropTXT2 = "Choose Mode",
    this.newTabserialBaudRateDropTXT3 = "9600";
    this.newTabserialDanewTabitsDropTXT3 = "8";
    this.newTabserialStopbitsDropTXT3 = "1";
    this.newTabserialParityDropTXT3 = "None";
    this.newTabserialHandshakeDropTXT3 = "None";
    this.newTabserialInfModeDropTXT3 = "Choose Mode",
    this.newTabserialBaudRateDropTXT4 = "9600";
    this.newTabserialDanewTabitsDropTXT4 = "8";
    this.newTabserialStopbitsDropTXT4 = "1";
    this.newTabserialParityDropTXT4 = "None";
    this.newTabserialHandshakeDropTXT4 = "None";
    this.newTabserialInfModeDropTXT4 = "Choose Mode",
    */

    // NTP
    this.newTabntpChekBOX1 = false ;
    this.newTabntpChekBOX2 =   false ;
    this.newTabntpIpaddressTXT = "";
    this.newTabntpPortNoTXT = "";
    this.newTabntpIpaddressTXT2 = "";
    this.newTabntpPortNoTXT2 = "";
    this.newTabntpIntervalTXT = "";
    this.newTabntpTimeOffsetHrsTXT = "0";
    this.newTabntpTimeOffsetSecTXT = "0";
/*
    // MQTT
    this.newTabmqttBrokerTXT = "";
    this.newTabmqttPortNoTXT1 = "";
    this.newTabmqttUsernameTXT = "";
    this.newTabmqttPasswodTXT = "";
    this.newTabmqttPublicTopicTXT = "";
    this.newTabmqttHrsTXT = "0";
    this.newTabmqttMinsTXT = "0";
    this.newTabmqttSecsTXT = "0";
    this.newTabmqttEnableEventsChkBOX = false;
    this.newTabmqttEventsTopicTXT = "";
    this.newTabmqttEnablePingChkBOX =  false;
    this.newTabmqttDiagTXT = "";
    this.newTabmqttBrokerTXT =  "0.0.0.0";
    this.newTabmqttPortNoTXT1 = "123";
    this.newTabmqttUsernameTXT = "xxxx";
    this.newTabmqttPasswodTXT = "xxxx";
    */
      this.newTabdbglogIpTXT = "0.0.0.0";
      this.newTabntpIpaddressTXT = "0.0.0.0";
      this.newTabntpPortNoTXT = "123";
      this.newTabntpIpaddressTXT2 = "0.0.0.0";
      this.newTabntpPortNoTXT2 = "123";
      this.newTabntpIntervalTXT ="5";
      this.newTabgenallowcommonchkbx = false;
      this.newTabgenallow1chkbx =  false;
      this.newTabgenallow1IPTXT = "",
      this.newTabgenallow2chkbx = false;
      this.newTabgenallow2IPTXT = "";
      this.newTabgenallow3chkbx = false;
      this.newTabgenallow3IPTXT =  "";
      this.newTabgenallow4chkbx =  false,
      this.newTabgenallow4IPTXT =  "",
      this.newTabiec104Enablechekbox = false;
      this.newTabftpEnablechekbox =false;
      this.newTabftpIpaddTXT="";
      this.newTabftpprtnoTXT = '';
      this.newTabftpusernameTXT = '';
      this.newTabftppasswordTXT = '';
      this.newTabftpdirTXT = "";
      this.newTabftptimeoutTXT = '15';
      this.newTabiecStationTXT = '',
      this.newTabstartIOAaddTXT = '';
      this.newTabiecCodsizedwnTXT = 'Choose COT Size';
      this.newTabiecCylicTXT =  '';
      this.newTabiecIOAsizedwnTXT =  'Choose IOA Size';
      this.newTabiecTSTAdwnTXT ='Choose TSTA';
      this.newTabiecTSTAstartAddresTXT = '';
      this.newTabiecportTXT   ='';

    },
    showGETGENsummaryFunction(index, id, devicename, btnName) {
     console.log('showGETGENsummaryFunction entry');
    var getGenUrl = this.deviceresponseBTNUrl.replace("$$btnname$$", btnName).replace("$$deviceID$$", id);
    console.log('showGETGENsummaryFunction getGenUrl', getGenUrl);
    axios.get(getGenUrl).then(response => {
    if (response.data.gen_status == "found") {
    var getCurrViewViewGenConfigJson = response.data.gen_details;
    this.enableGETGENFlag = true;
    this.isLoading = false;
    if(getCurrViewViewGenConfigJson.length != 0){
    this.getCurrViewgatewayTXT = getCurrViewViewGenConfigJson[0].dev_id;
    this.getCurrViewlocationTXT = getCurrViewViewGenConfigJson[0].dcu_location;
    this.getCurrViewenabledbglogChkBox = getCurrViewViewGenConfigJson[0].dbglog_enable == "Yes" ? true : false;
    this.getCurrViewdbglogIpTXT = getCurrViewViewGenConfigJson[0].dbglog_ip;
    // LAN
    //this.getCurrViewipaddressTXT = getCurrViewViewGenConfigJson[0].lan_ip;
    this.getCurrViewgetGenEthNumPort =  getCurrViewViewGenConfigJson[0].num_eth_port;
    this.getCurrViewnetworkbtnTXT =  getCurrViewViewGenConfigJson[0].net_type == "null" ? "": getCurrViewViewGenConfigJson[0].net_type;
    this.getCurrViewipaddressTXT = getCurrViewViewGenConfigJson[0].eth_ip1 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_ip1;
    this.getCurrViewnewipaddressTXT = getCurrViewViewGenConfigJson[0].eth_new_ip1 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_new_ip1;
    this.getCurrViewsubnetmaskTXT = getCurrViewViewGenConfigJson[0].eth_subnet1 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_subnet1;
    this.getCurrViewgateTXT = getCurrViewViewGenConfigJson[0].eth_gateway1 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_gateway1;
    this.getCurrViewipaddressTXT2 = getCurrViewViewGenConfigJson[0].eth_ip2 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_ip2;
    this.getCurrViewnewipaddressTXT2 = getCurrViewViewGenConfigJson[0].eth_new_ip2 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_new_ip2;
    this.getCurrViewsubnetmaskTXT2 = getCurrViewViewGenConfigJson[0].eth_subnet2 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_subnet2;
    this.getCurrViewgateTXT2 = getCurrViewViewGenConfigJson[0].eth_gateway2 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_gateway2;

    this.getCurrViewipaddressTXT3 = getCurrViewViewGenConfigJson[0].eth_ip3 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_ip3;
    this.getCurrViewnewipaddressTXT3 = getCurrViewViewGenConfigJson[0].eth_new_ip3 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_new_ip3;
    this.getCurrViewsubnetmaskTXT3 = getCurrViewViewGenConfigJson[0].eth_subnet3 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_subnet3;
    this.getCurrViewgateTXT3 = getCurrViewViewGenConfigJson[0].eth_gateway3 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_gateway3;
    this.getCurrViewipaddressTXT4 = getCurrViewViewGenConfigJson[0].eth_ip4 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_ip4;
    this.getCurrViewnewipaddressTXT4 = getCurrViewViewGenConfigJson[0].eth_new_ip4 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_new_ip4;
    this.getCurrViewsubnetmaskTXT4 = getCurrViewViewGenConfigJson[0].eth_subnet4 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_subnet4;
    this.getCurrViewgateTXT4 = getCurrViewViewGenConfigJson[0].eth_gateway4 == "null" ? "": getCurrViewViewGenConfigJson[0].eth_gateway4;

    /*
    this.getCurrViewno_serialDropTXT = getCurrViewViewGenConfigJson[0].no_serial == "" ||  getCurrViewViewGenConfigJson[0].no_serial == "null" ? "1": getCurrViewViewGenConfigJson[0].no_serial;
    // Serial Port  1
    this.getCurrViewserialBaudRateDropTXT1 = getCurrViewViewGenConfigJson[0].serial_baudrate1 == "" ||  getCurrViewViewGenConfigJson[0].serial_baudrate1 == "null" ? "9600": getCurrViewViewGenConfigJson[0].serial_baudrate1;
    this.getCurrViewserialDagetCurrViewitsDropTXT1= getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits1 == "" || getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits1 == "null" ? "8" : getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits1;
    this.getCurrViewserialStopbitsDropTXT1= getCurrViewViewGenConfigJson[0].serial_stopbits1 == "" || getCurrViewViewGenConfigJson[0].serial_stopbits1 == "null" ? "1" : getCurrViewViewGenConfigJson[0].serial_stopbits1;
    this.getCurrViewserialParityDropTXT1= getCurrViewViewGenConfigJson[0].serial_parity1 == "" || getCurrViewViewGenConfigJson[0].serial_parity1 == "null" ? "None" : getCurrViewViewGenConfigJson[0].serial_parity1;
    this.getCurrViewserialHandshakeDropTXT1= getCurrViewViewGenConfigJson[0].serial_handshake1 == "" || getCurrViewViewGenConfigJson[0].serial_handshake1 == "null" ? "None" : getCurrViewViewGenConfigJson[0].serial_handshake1;
    this.getCurrViewserialInfModeDropTXT1= getCurrViewViewGenConfigJson[0].serial_infMode1 == "" || getCurrViewViewGenConfigJson[0].serial_infMode1 == "null" ? "Choose Mode" : getCurrViewViewGenConfigJson[0].serial_infMode1;

  // Serial Port  2
    this.getCurrViewserialBaudRateDropTXT2 = getCurrViewViewGenConfigJson[0].serial_baudrate2 == "" ||  getCurrViewViewGenConfigJson[0].serial_baudrate2 == "null" ? "9600": getCurrViewViewGenConfigJson[0].serial_baudrate2;
    this.getCurrViewserialDagetCurrViewitsDropTXT2= getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits2 == "" || getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits2 == "null" ? "8" : getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits2;
    this.getCurrViewserialStopbitsDropTXT2= getCurrViewViewGenConfigJson[0].serial_stopbits2 == "" || getCurrViewViewGenConfigJson[0].serial_stopbits2 == "null" ? "1" : getCurrViewViewGenConfigJson[0].serial_stopbits2;
    this.getCurrViewserialParityDropTXT2 = getCurrViewViewGenConfigJson[0].serial_parity2 == "" || getCurrViewViewGenConfigJson[0].serial_parity2 == "null" ? "None" : getCurrViewViewGenConfigJson[0].serial_parity2;
    this.getCurrViewserialHandshakeDropTXT2 = getCurrViewViewGenConfigJson[0].serial_handshake2 == "" || getCurrViewViewGenConfigJson[0].serial_handshake2 == "null" ? "None" : getCurrViewViewGenConfigJson[0].serial_handshake2;
    this.getCurrViewserialInfModeDropTXT2 = getCurrViewViewGenConfigJson[0].serial_infMode2 == "" || getCurrViewViewGenConfigJson[0].serial_infMode2 == "null" ? "Choose Mode" : getCurrViewViewGenConfigJson[0].serial_infMode2;

    // Serial Port  3
    this.getCurrViewserialBaudRateDropTXT3 = getCurrViewViewGenConfigJson[0].serial_baudrate3 == "" ||  getCurrViewViewGenConfigJson[0].serial_baudrate3 == "null" ? "9600": getCurrViewViewGenConfigJson[0].serial_baudrate3;
    this.getCurrViewserialDagetCurrViewitsDropTXT3= getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits3 == "" || getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits3 == "null" ? "8" : getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits3;
    this.getCurrViewserialStopbitsDropTXT3= getCurrViewViewGenConfigJson[0].serial_stopbits3 == "" || getCurrViewViewGenConfigJson[0].serial_stopbits3 == "null" ? "1" : getCurrViewViewGenConfigJson[0].serial_stopbits3;
    this.getCurrViewserialParityDropTXT3 = getCurrViewViewGenConfigJson[0].serial_parity3 == "" || getCurrViewViewGenConfigJson[0].serial_parity3 == "null" ? "None" : getCurrViewViewGenConfigJson[0].serial_parity3;
    this.getCurrViewserialHandshakeDropTXT3 = getCurrViewViewGenConfigJson[0].serial_handshake3 == "" || getCurrViewViewGenConfigJson[0].serial_handshake3 == "null" ? "None" : getCurrViewViewGenConfigJson[0].serial_handshake3;
    this.getCurrViewserialInfModeDropTXT3 = getCurrViewViewGenConfigJson[0].serial_infMode3 == "" || getCurrViewViewGenConfigJson[0].serial_infMode3 == "null" ? "Choose Mode" : getCurrViewViewGenConfigJson[0].serial_infMode3;

    // Serial Port  3
    this.getCurrViewserialBaudRateDropTXT4 = getCurrViewViewGenConfigJson[0].serial_baudrate4 == "" ||  getCurrViewViewGenConfigJson[0].serial_baudrate4 == "null" ? "9600": getCurrViewViewGenConfigJson[0].serial_baudrate4;
    this.getCurrViewserialDagetCurrViewitsDropTXT4 = getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits4 == "" || getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits4 == "null" ? "8" : getCurrViewViewGenConfigJson[0].serial_dagetCurrViewits4;
    this.getCurrViewserialStopbitsDropTXT4 = getCurrViewViewGenConfigJson[0].serial_stopbits4 == "" || getCurrViewViewGenConfigJson[0].serial_stopbits4 == "null" ? "1" : getCurrViewViewGenConfigJson[0].serial_stopbits4;
    this.getCurrViewserialParityDropTXT4 = getCurrViewViewGenConfigJson[0].serial_parity4 == "" || getCurrViewViewGenConfigJson[0].serial_parity4 == "null" ? "None" : getCurrViewViewGenConfigJson[0].serial_parity4;
    this.getCurrViewserialHandshakeDropTXT4 = getCurrViewViewGenConfigJson[0].serial_handshake4 == "" || getCurrViewViewGenConfigJson[0].serial_handshake4 == "null" ? "None" : getCurrViewViewGenConfigJson[0].serial_handshake4;
    this.getCurrViewserialInfModeDropTXT4 = getCurrViewViewGenConfigJson[0].serial_infMode4 == "" || getCurrViewViewGenConfigJson[0].serial_infMode4 == "null" ? "Choose Mode" : getCurrViewViewGenConfigJson[0].serial_infMode4;
    */
    // NTP
    this.getCurrViewntpChekBOX1 = getCurrViewViewGenConfigJson[0].ntp_enable1 == "Yes" ? true : false;
    this.getCurrViewntpChekBOX2 = getCurrViewViewGenConfigJson[0].ntp_enable2 == "Yes" ? true : false;
    this.getCurrViewntpIpaddressTXT = getCurrViewViewGenConfigJson[0].ntp_ipadd1 == "null" ? "": getCurrViewViewGenConfigJson[0].ntp_ipadd1;
    this.getCurrViewntpPortNoTXT = getCurrViewViewGenConfigJson[0].ntp_port1 == "null" ? "": getCurrViewViewGenConfigJson[0].ntp_port1;
    this.getCurrViewntpIpaddressTXT2 = getCurrViewViewGenConfigJson[0].ntp_ipadd2 == "null" ? "": getCurrViewViewGenConfigJson[0].ntp_ipadd2;
    this.getCurrViewntpPortNoTXT2 = getCurrViewViewGenConfigJson[0].ntp_port2 == "null" ? "": getCurrViewViewGenConfigJson[0].ntp_port2;
    this.getCurrViewntpIntervalTXT = getCurrViewViewGenConfigJson[0].ntp_interval == "null" ? "": getCurrViewViewGenConfigJson[0].ntp_interval;
   /* this.getCurrViewntpTimeOffsetHrsTXT = getCurrViewViewGenConfigJson[0].ntp_hrs == "" ||  getCurrViewViewGenConfigJson[0].ntp_hrs == "null" ? "0": getCurrViewViewGenConfigJson[0].ntp_hrs;
    this.getCurrViewntpTimeOffsetSecTXT = getCurrViewViewGenConfigJson[0].ntp_mints == "" ||  getCurrViewViewGenConfigJson[0].ntp_mints == "null" ? "0": getCurrViewViewGenConfigJson[0].ntp_mints;
    
    // MQTT
    this.getCurrViewmqttBrokerTXT = getCurrViewViewGenConfigJson[0].mqtt_broker_ip == "null" ? "" : getCurrViewViewGenConfigJson[0].mqtt_broker_ip;
    this.getCurrViewmqttPortNoTXT1 = getCurrViewViewGenConfigJson[0].mqtt_broker_port == "null" ? "" : getCurrViewViewGenConfigJson[0].mqtt_broker_port;
    this.getCurrViewmqttUsernameTXT = getCurrViewViewGenConfigJson[0].mqtt_username == "null" ? "" : getCurrViewViewGenConfigJson[0].mqtt_username;
    this.getCurrViewmqttPasswodTXT = getCurrViewViewGenConfigJson[0].mqtt_password == "null" ? "" : getCurrViewViewGenConfigJson[0].mqtt_password;
    this.getCurrViewmqttPublicTopicTXT = getCurrViewViewGenConfigJson[0].mqtt_pub_topic == "null" ? "" : getCurrViewViewGenConfigJson[0].mqtt_pub_topic;
    this.getCurrViewmqttHrsTXT = getCurrViewViewGenConfigJson[0].mqtt_pub_int_hour == "" ||  getCurrViewViewGenConfigJson[0].mqtt_pub_int_hour == "null" ? "0": getCurrViewViewGenConfigJson[0].mqtt_pub_int_hour;
    this.getCurrViewmqttMinsTXT = getCurrViewViewGenConfigJson[0].mqtt_pub_int_mint == "" ||  getCurrViewViewGenConfigJson[0].mqtt_pub_int_mint == "null" ? "0": getCurrViewViewGenConfigJson[0].mqtt_pub_int_mint;
    this.getCurrViewmqttSecsTXT = getCurrViewViewGenConfigJson[0].mqtt_pub_int_sec == "" ||  getCurrViewViewGenConfigJson[0].mqtt_pub_int_sec == "null" ? "0": getCurrViewViewGenConfigJson[0].mqtt_pub_int_sec; 
    this.getCurrViewmqttEnableEventsChkBOX = getCurrViewViewGenConfigJson[0].mqtt_event_topic_flag == "Yes" ? true : false;
    this.getCurrViewmqttEventsTopicTXT = getCurrViewViewGenConfigJson[0].mqtt_event_pub_topic == null ? "":getCurrViewViewGenConfigJson[0].mqtt_event_pub_topic;
    this.getCurrViewmqttEnablePingChkBOX = getCurrViewViewGenConfigJson[0].mqtt_diag_topic_flag == "Yes" ? true : false;
    this.getCurrViewmqttDiagTXT = getCurrViewViewGenConfigJson[0].mqtt_diag_pub_topic == "null" ? "" : getCurrViewViewGenConfigJson[0].mqtt_diag_pub_topic;
      */
    this.getCurrViewgenallowcommonchkbx = getCurrViewViewGenConfigJson[0].enable_allow_master == "Yes" ? true : false;
    this.getCurrViewgenallow1chkbx = getCurrViewViewGenConfigJson[0].master1_enable == "Yes" ? true : false;
    this.getCurrViewgenallow1IPTXT= getCurrViewViewGenConfigJson[0].master1_ip;
    this.getCurrViewgenallow2chkbx = getCurrViewViewGenConfigJson[0].master2_enable == "Yes" ? true : false;
    this.getCurrViewgenallow2IPTXT = getCurrViewViewGenConfigJson[0].master2_ip;
    this.getCurrViewgenallow3chkbx = getCurrViewViewGenConfigJson[0].master3_enable == "Yes" ? true : false;
    this.getCurrViewgenallow3IPTXT= getCurrViewViewGenConfigJson[0].master3_ip;
    this.getCurrViewgenallow4chkbx= getCurrViewViewGenConfigJson[0].master4_enable == "Yes" ? true : false;
    this.getCurrViewgenallow4IPTXT = getCurrViewViewGenConfigJson[0].master4_ip;
    this.getCurrViewiec104Enablechekbox  = getCurrViewViewGenConfigJson[0].iec_enable == "Yes" ? true : false;
    this.getCurrViewiecStationTXT = getCurrViewViewGenConfigJson[0].iec_addr == "null" ? "" : getCurrViewViewGenConfigJson[0].iec_addr;
    this.getCurrViewiecportTXT = getCurrViewViewGenConfigJson[0].iec_port == "null" ? "" : getCurrViewViewGenConfigJson[0].iec_port;
    this.getCurrViewiecCylicTXT = getCurrViewViewGenConfigJson[0].iec_cyc_int == "null" ? "" : getCurrViewViewGenConfigJson[0].iec_cyc_int;
    this.getCurrViewstartIOAaddTXT = getCurrViewViewGenConfigJson[0].iec_met_start_ioa == "null" ? "" : getCurrViewViewGenConfigJson[0].iec_met_start_ioa;
    this.getCurrViewiecCodsizedwnTXT =getCurrViewViewGenConfigJson[0].iec_cot == "null" ? "" : getCurrViewViewGenConfigJson[0].iec_cot;
    this.getCurrViewiecIOAsizedwnTXT=getCurrViewViewGenConfigJson[0].iec_ioa == "null" ? "" : getCurrViewViewGenConfigJson[0].iec_ioa;

    this.getCurrViewftpEnablechekbox = getCurrViewViewGenConfigJson[0].ftp_enable == "Yes" ? true : false;
    this.getCurrViewftpIpaddTXT=getCurrViewViewGenConfigJson[0].ftp_ip == "null" ? "" : getCurrViewViewGenConfigJson[0].ftp_ip;
    this.getCurrViewftpprtnoTXT=getCurrViewViewGenConfigJson[0].ftp_port == "null" ? "" : getCurrViewViewGenConfigJson[0].ftp_port;
    this.getCurrViewftpusernameTXT=getCurrViewViewGenConfigJson[0].ftp_user == "null" ? "" : getCurrViewViewGenConfigJson[0].ftp_user;
    this.getCurrViewftppasswordTXT=getCurrViewViewGenConfigJson[0].ftp_pass == "null" ? "" : getCurrViewViewGenConfigJson[0].ftp_pass;
    this.getCurrViewftpdirTXT=getCurrViewViewGenConfigJson[0].ftp_dir == "null" ? "" : getCurrViewViewGenConfigJson[0].ftp_dir;
    this.getCurrViewftptimeoutTXT=getCurrViewViewGenConfigJson[0].ftp_period == "null" ? "" : getCurrViewViewGenConfigJson[0].ftp_period;
    }else{
      this.isLoading = false;
      this.resetGETGENViewfields();
    }
    }else{
      this.isLoading = false;
     this.resetGETGENViewfields();
    }
    });
    },
    resetGETGENViewfields(){
    this.enableGETGENFlag = false;
    this.getCurrViewgatewayTXT = this.deviceTblID;
    this.getCurrViewlocationTXT = "";
    this.getCurrViewenabledbglogChkBox = false;
    this.getCurrViewdbglogIpTXT = "";
    // LAN
    this.getCurrViewgetGenEthNumPort = null;
    this.getCurrViewnetworkbtnTXT= "CDCS Network";
    this.getCurrViewipaddressTXT = "";
    this.getCurrViewnewipaddressTXT = "";
    this.getCurrViewsubnetmaskTXT = "";
    this.getCurrViewgateTXT = "";
    this.getCurrViewipaddressTXT2 = "";
    this.getCurrViewnewipaddressTXT2 = "";
    this.getCurrViewsubnetmaskTXT2 = "";
    this.getCurrViewgateTXT2 = "";
    this.getCurrViewipaddressTXT3 = "";
    this.getCurrViewnewipaddressTXT3 = "";
    this.getCurrViewsubnetmaskTXT3 = "";
    this.getCurrViewgateTXT3 = "";
    this.getCurrViewipaddressTXT4 = "";
    this.getCurrViewnewipaddressTXT4 = "";
    this.getCurrViewsubnetmaskTXT4 = "";
    this.getCurrViewgateTXT4 = "";

    /*
    // Serial Port
    this.getCurrViewno_serialDropTXT="1",
    this.getCurrViewserialBaudRateDropTXT1 = "9600";
    this.getCurrViewserialDagetCurrViewitsDropTXT1 = "8";
    this.getCurrViewserialStopbitsDropTXT1= "1";
    this.getCurrViewserialParityDropTXT1= "None";
    this.getCurrViewserialHandshakeDropTXT1= "None";
    this.getCurrViewserialInfModeDropTXT1= "Choose Mode",
    this.getCurrViewserialBaudRateDropTXT2 = "9600";
    this.getCurrViewserialDagetCurrViewitsDropTXT2 = "8";
    this.getCurrViewserialStopbitsDropTXT2= "1";
    this.getCurrViewserialParityDropTXT2 = "None";
    this.getCurrViewserialHandshakeDropTXT2 = "None";
    this.getCurrViewserialInfModeDropTXT2 = "Choose Mode",
    this.getCurrViewserialBaudRateDropTXT3 = "9600";
    this.getCurrViewserialDagetCurrViewitsDropTXT3 = "8";
    this.getCurrViewserialStopbitsDropTXT3 = "1";
    this.getCurrViewserialParityDropTXT3 = "None";
    this.getCurrViewserialHandshakeDropTXT3 = "None";
    this.getCurrViewserialInfModeDropTXT3 = "Choose Mode",
    this.getCurrViewserialBaudRateDropTXT4 = "9600";
    this.getCurrViewserialDagetCurrViewitsDropTXT4 = "8";
    this.getCurrViewserialStopbitsDropTXT4 = "1";
    this.getCurrViewserialParityDropTXT4 = "None";
    this.getCurrViewserialHandshakeDropTXT4 = "None";
    this.getCurrViewserialInfModeDropTXT4 = "Choose Mode",
    */

    // NTP
    this.getCurrViewntpChekBOX1 = false ;
    this.getCurrViewntpChekBOX2 =   false ;
    this.getCurrViewntpIpaddressTXT = "";
    this.getCurrViewntpPortNoTXT = "";
    this.getCurrViewntpIpaddressTXT2 = "";
    this.getCurrViewntpPortNoTXT2 = "";
    this.getCurrViewntpIntervalTXT = "";
    this.getCurrViewntpTimeOffsetHrsTXT = "0";
    this.getCurrViewntpTimeOffsetSecTXT = "0";
/*
    // MQTT
    this.getCurrViewmqttBrokerTXT = "";
    this.getCurrViewmqttPortNoTXT1 = "";
    this.getCurrViewmqttUsernameTXT = "";
    this.getCurrViewmqttPasswodTXT = "";
    this.getCurrViewmqttPublicTopicTXT = "";
    this.getCurrViewmqttHrsTXT = "0";
    this.getCurrViewmqttMinsTXT = "0";
    this.getCurrViewmqttSecsTXT = "0";
    this.getCurrViewmqttEnableEventsChkBOX = false;
    this.getCurrViewmqttEventsTopicTXT = "";
    this.getCurrViewmqttEnablePingChkBOX =  false;
    this.getCurrViewmqttDiagTXT = "";
    this.getCurrViewmqttBrokerTXT =  "0.0.0.0";
    this.getCurrViewmqttPortNoTXT1 = "123";
    this.getCurrViewmqttUsernameTXT = "xxxx";
    this.getCurrViewmqttPasswodTXT = "xxxx";
    */
      this.getCurrViewdbglogIpTXT = "0.0.0.0";
      this.getCurrViewntpIpaddressTXT = "0.0.0.0";
      this.getCurrViewntpPortNoTXT = "123";
      this.getCurrViewntpIpaddressTXT2 = "0.0.0.0";
      this.getCurrViewntpPortNoTXT2 = "123";
      this.getCurrViewntpIntervalTXT ="5";
      this.getCurrViewgenallowcommonchkbx = false;
      this.getCurrViewgenallow1chkbx =  false;
      this.getCurrViewgenallow1IPTXT = "",
      this.getCurrViewgenallow2chkbx = false;
      this.getCurrViewgenallow2IPTXT = "";
      this.getCurrViewgenallow3chkbx = false;
      this.getCurrViewgenallow3IPTXT =  "";
      this.getCurrViewgenallow4chkbx =  false,
      this.getCurrViewgenallow4IPTXT =  "",
      this.getCurrViewiec104Enablechekbox = false;
      this.getCurrViewftpEnablechekbox =false;
      this.getCurrViewftpIpaddTXT="";
      this.getCurrViewftpprtnoTXT = '';
      this.getCurrViewftpusernameTXT = '';
      this.getCurrViewftppasswordTXT = '';
      this.getCurrViewftpdirTXT = "";
      this.getCurrViewftptimeoutTXT = '15';
      this.getCurrViewiecStationTXT = '',
      this.getCurrViewstartIOAaddTXT = '';
      this.getCurrViewiecCodsizedwnTXT = 'Choose COT Size';
      this.getCurrViewiecCylicTXT =  '';
      this.getCurrViewiecIOAsizedwnTXT =  'Choose IOA Size';
      this.getCurrViewiecTSTAdwnTXT ='Choose TSTA';
      this.getCurrViewiecTSTAstartAddresTXT = '';
      this.getCurrViewiecportTXT   ='';

    },
    resetdeviceGENconfigurePOPUP(){
    this.gatewayTXT = this.configureMeterTbID;
    this.locationTXT = "";
    this.enabledbglogChkBox = false;
    this.dbglogIpTXT = "";
    // LAN
    this.ipaddressTXT = "";
    this.newipaddressTXT = "";
    this.subnetmaskTXT = "";
    this.networkbtnTXT = "CDCS Network";
    this.getGenEthNumPort = null;
    this.gateTXT = "";
    this.ipaddressTXT2 = "";
    this.newipaddressTXT2 = "";
    this.subnetmaskTXT2 = "";
    this.gateTXT2 = "";
    this.ipaddressTXT3 = "";
    this.newipaddressTXT3 = "";
    this.subnetmaskTXT3 = "";
    this.gateTXT3 = "";
    this.ipaddressTXT4 = "";
    this.newipaddressTXT4 = "";
    this.subnetmaskTXT4 = "";
    this.gateTXT4 = "";
    /*
    // Serial Port  
    this.no_serialDropTXT="1",
    this.serialBaudRateDropTXT1 = "9600";
    this.serialDatabitsDropTXT1 = "8";
    this.serialStopbitsDropTXT1= "1";
    this.serialParityDropTXT1= "None";
    this.serialHandshakeDropTXT1= "None";
    this.serialInfModeDropTXT1= "Choose Mode",
    this.serialBaudRateDropTXT2 = "9600";
    this.serialDatabitsDropTXT2 = "8";
    this.serialStopbitsDropTXT2= "1";
    this.serialParityDropTXT2 = "None";
    this.serialHandshakeDropTXT2 = "None";
    this.serialInfModeDropTXT2 = "Choose Mode",
    this.serialBaudRateDropTXT3 = "9600";
    this.serialDatabitsDropTXT3 = "8";
    this.serialStopbitsDropTXT3 = "1";
    this.serialParityDropTXT3 = "None";
    this.serialHandshakeDropTXT3 = "None";
    this.serialInfModeDropTXT3 = "Choose Mode",
    this.serialBaudRateDropTXT4 = "9600";
    this.serialDatabitsDropTXT4 = "8";
    this.serialStopbitsDropTXT4 = "1";
    this.serialParityDropTXT4 = "None";
    this.serialHandshakeDropTXT4 = "None";
    this.serialInfModeDropTXT4 = "Choose Mode",
    */
    // NTP
    this.ntpChekBOX1 = false ;
    this.ntpChekBOX2 =   false ;
    this.ntpIpaddressTXT = "";
    this.ntpPortNoTXT = "";
    this.ntpIpaddressTXT2 = "";
    this.ntpPortNoTXT2 = "";
    this.ntpIntervalTXT = "";
    this.ntpTimeOffsetHrsTXT = "0";
    this.ntpTimeOffsetSecTXT = "0";
  /*
    // MQTT
    this.mqttBrokerTXT = "";
    this.mqttPortNoTXT1 = "";
    this.mqttUsernameTXT = "";
    this.mqttPasswodTXT = "";
    this.mqttPublicTopicTXT = "";
    this.mqttHrsTXT = "0";
    this.mqttMinsTXT = "0";
    this.mqttSecsTXT = "0";
    this.mqttEnableEventsChkBOX =  false;
    this.mqttEventsTopicTXT = "";
    this.mqttEnablePingChkBOX =  false;
    this.mqttDiagTXT = "";
    this.mqttBrokerTXT =  "0.0.0.0";
    this.mqttPortNoTXT1 = "123";
    this.mqttUsernameTXT = "xxxx";
    this.mqttPasswodTXT = "xxxx";
  */
      this.dbglogIpTXT = "0.0.0.0";
      this.ntpIpaddressTXT = "0.0.0.0";
      this.ntpPortNoTXT = "123";
      this.ntpIpaddressTXT2 = "0.0.0.0";
      this.ntpPortNoTXT2 = "123";
      this.ntpIntervalTXT ="5";
      this.genallowcommonchkbx = false;
      this.genallow1chkbx =  false;
      this.genallow1IPTXT = "",
      this.genallow2chkbx = false;
      this.genallow2IPTXT = "";
      this.genallow3chkbx = false;
      this.genallow3IPTXT =  "";
      this.genallow4chkbx =  false,
      this.genallow4IPTXT =  "",
      this.iec104Enablechekbox = false;
      this.ftpEnablechekbox =false;
      this.ftpIpaddTXT="";
      this.ftpprtnoTXT = '';
      this.ftpusernameTXT = '';
      this.ftppasswordTXT = '';
      this.ftpdirTXT = "";
      this.ftptimeoutTXT = '15';
      this.iecStationTXT = '',
      this.startIOAaddTXT = '';
      this.iecCodsizedwnTXT = 'Choose COT Size';
      this.iecCylicTXT =  '';
      this.iecIOAsizedwnTXT =  'Choose IOA Size';
      this.iecTSTAdwnTXT ='Choose TSTA';
      this.iecTSTAstartAddresTXT = '';
      this.iecportTXT   ='';
    },
    getcopyGENdevice(deviceid){
       var iotUrl = this.device_IOTdetailsListUrl.replace("$$deviceID$$", deviceid);
    console.log('copy device iot url:', iotUrl);
    axios.get(iotUrl).then(response => {
    if (response.data.status == "found") {
       console.log('getcopyGENdevice.status:', response.data.status);
       var copydata = response.data.details;
    for(var tt=0;tt<copydata.length;tt++){
      this.copydeviceGenConfigJson.push(copydata[tt]);
    }
    }
    });
    },
    rmsConfigureGENFunction(index , id, devicename) {
      this.orginalGenConfigJson= "";
      this.copydeviceGenConfigJson= [];
    this.configureIOTTbname = this.rmsdeviceConfigJson.device_details[index].iot_table_name;
    var deviceIP = this.rmsdeviceConfigJson.device_details[index].ip_address;
    this.configureMeterTbID = id;
    this.configuredeviceName = devicename;
    var iotUrl = this.device_IOTdetailsListUrl.replace("$$deviceID$$", this.configureMeterTbID);
    this.getcopyGENdevice(id);
    console.log('iotUrl', iotUrl);
    axios.get(iotUrl).then(response => {
    if (response.data.status == "found") {
      console.log('response.data.status:', response.data.status);
    this.orginalGenConfigJson = response.data.details;
    if(this.orginalGenConfigJson.length != 0){
      console.log('this.orginalGenConfigJson :', JSON.stringify(this.orginalGenConfigJson));
    this.gatewayTXT = this.orginalGenConfigJson[0].dev_id;
    this.locationTXT = this.orginalGenConfigJson[0].dcu_location;
    this.enabledbglogChkBox = this.orginalGenConfigJson[0].dbglog_enable == "Yes" ? true : false;
    this.dbglogIpTXT = this.orginalGenConfigJson[0].dbglog_ip;
    // LAN
    this.networkbtnTXT = this.orginalGenConfigJson[0].net_type;
    this.getGenEthNumPort = this.orginalGenConfigJson[0].num_eth_port;
    //this.ipaddressTXT = this.orginalGenConfigJson[0].lan_ip;
    this.ipaddressTXT = this.orginalGenConfigJson[0].eth_ip1;
    this.newipaddressTXT = this.orginalGenConfigJson[0].eth_new_ip1;
    this.subnetmaskTXT = this.orginalGenConfigJson[0].eth_subnet1;
    this.gateTXT = this.orginalGenConfigJson[0].eth_gateway1;
    this.ipaddressTXT2 = this.orginalGenConfigJson[0].eth_ip2;
    this.newipaddressTXT2 = this.orginalGenConfigJson[0].eth_new_ip2;
    this.subnetmaskTXT2 = this.orginalGenConfigJson[0].eth_subnet2;
    this.gateTXT2 = this.orginalGenConfigJson[0].eth_gateway2;
    this.ipaddressTXT3 = this.orginalGenConfigJson[0].eth_ip3;
    this.newipaddressTXT3 = this.orginalGenConfigJson[0].eth_new_ip3;
    this.subnetmaskTXT3 = this.orginalGenConfigJson[0].eth_subnet3;
    this.gateTXT3 = this.orginalGenConfigJson[0].eth_gateway3;
    this.ipaddressTXT4 = this.orginalGenConfigJson[0].eth_ip4;
    this.newipaddressTXT4 = this.orginalGenConfigJson[0].eth_new_ip4;
    this.subnetmaskTXT4 = this.orginalGenConfigJson[0].eth_subnet4;
    this.gateTXT4 = this.orginalGenConfigJson[0].eth_gateway4;
    /*
    this.no_serialDropTXT = this.orginalGenConfigJson[0].no_serial == "" ||  this.orginalGenConfigJson[0].no_serial == "null" ? "1": this.orginalGenConfigJson[0].no_serial;
    // Serial Port  1
    this.serialBaudRateDropTXT1 = this.orginalGenConfigJson[0].serial_baudrate1 == "" ||  this.orginalGenConfigJson[0].serial_baudrate1 == "null" ? "9600": this.orginalGenConfigJson[0].serial_baudrate1;
    this.serialDatabitsDropTXT1= this.orginalGenConfigJson[0].serial_databits1 == "" || this.orginalGenConfigJson[0].serial_databits1 == "null" ? "8" : this.orginalGenConfigJson[0].serial_databits1;
    this.serialStopbitsDropTXT1= this.orginalGenConfigJson[0].serial_stopbits1 == "" || this.orginalGenConfigJson[0].serial_stopbits1 == "null" ? "1" : this.orginalGenConfigJson[0].serial_stopbits1;
    this.serialParityDropTXT1= this.orginalGenConfigJson[0].serial_parity1 == "" || this.orginalGenConfigJson[0].serial_parity1 == "null" ? "None" : this.orginalGenConfigJson[0].serial_parity1;
    this.serialHandshakeDropTXT1= this.orginalGenConfigJson[0].serial_handshake1 == "" || this.orginalGenConfigJson[0].serial_handshake1 == "null" ? "None" : this.orginalGenConfigJson[0].serial_handshake1;
    this.serialInfModeDropTXT1= this.orginalGenConfigJson[0].serial_infMode1 == "" || this.orginalGenConfigJson[0].serial_infMode1 == "null" ? "Choose Mode" : this.orginalGenConfigJson[0].serial_infMode1;

  // Serial Port  2
    this.serialBaudRateDropTXT2 = this.orginalGenConfigJson[0].serial_baudrate2 == "" ||  this.orginalGenConfigJson[0].serial_baudrate2 == "null" ? "9600": this.orginalGenConfigJson[0].serial_baudrate2;
    this.serialDatabitsDropTXT2= this.orginalGenConfigJson[0].serial_databits2 == "" || this.orginalGenConfigJson[0].serial_databits2 == "null" ? "8" : this.orginalGenConfigJson[0].serial_databits2;
    this.serialStopbitsDropTXT2= this.orginalGenConfigJson[0].serial_stopbits2 == "" || this.orginalGenConfigJson[0].serial_stopbits2 == "null" ? "1" : this.orginalGenConfigJson[0].serial_stopbits2;
    this.serialParityDropTXT2 = this.orginalGenConfigJson[0].serial_parity2 == "" || this.orginalGenConfigJson[0].serial_parity2 == "null" ? "None" : this.orginalGenConfigJson[0].serial_parity2;
    this.serialHandshakeDropTXT2 = this.orginalGenConfigJson[0].serial_handshake2 == "" || this.orginalGenConfigJson[0].serial_handshake2 == "null" ? "None" : this.orginalGenConfigJson[0].serial_handshake2;
    this.serialInfModeDropTXT2 = this.orginalGenConfigJson[0].serial_infMode2 == "" || this.orginalGenConfigJson[0].serial_infMode2 == "null" ? "Choose Mode" : this.orginalGenConfigJson[0].serial_infMode2;

    // Serial Port  3
    this.serialBaudRateDropTXT3 = this.orginalGenConfigJson[0].serial_baudrate3 == "" ||  this.orginalGenConfigJson[0].serial_baudrate3 == "null" ? "9600": this.orginalGenConfigJson[0].serial_baudrate3;
    this.serialDatabitsDropTXT3= this.orginalGenConfigJson[0].serial_databits3 == "" || this.orginalGenConfigJson[0].serial_databits3 == "null" ? "8" : this.orginalGenConfigJson[0].serial_databits3;
    this.serialStopbitsDropTXT3= this.orginalGenConfigJson[0].serial_stopbits3 == "" || this.orginalGenConfigJson[0].serial_stopbits3 == "null" ? "1" : this.orginalGenConfigJson[0].serial_stopbits3;
    this.serialParityDropTXT3 = this.orginalGenConfigJson[0].serial_parity3 == "" || this.orginalGenConfigJson[0].serial_parity3 == "null" ? "None" : this.orginalGenConfigJson[0].serial_parity3;
    this.serialHandshakeDropTXT3 = this.orginalGenConfigJson[0].serial_handshake3 == "" || this.orginalGenConfigJson[0].serial_handshake3 == "null" ? "None" : this.orginalGenConfigJson[0].serial_handshake3;
    this.serialInfModeDropTXT3 = this.orginalGenConfigJson[0].serial_infMode3 == "" || this.orginalGenConfigJson[0].serial_infMode3 == "null" ? "Choose Mode" : this.orginalGenConfigJson[0].serial_infMode3;

    // Serial Port  3
    this.serialBaudRateDropTXT4 = this.orginalGenConfigJson[0].serial_baudrate4 == "" ||  this.orginalGenConfigJson[0].serial_baudrate4 == "null" ? "9600": this.orginalGenConfigJson[0].serial_baudrate4;
    this.serialDatabitsDropTXT4 = this.orginalGenConfigJson[0].serial_databits4 == "" || this.orginalGenConfigJson[0].serial_databits4 == "null" ? "8" : this.orginalGenConfigJson[0].serial_databits4;
    this.serialStopbitsDropTXT4 = this.orginalGenConfigJson[0].serial_stopbits4 == "" || this.orginalGenConfigJson[0].serial_stopbits4 == "null" ? "1" : this.orginalGenConfigJson[0].serial_stopbits4;
    this.serialParityDropTXT4 = this.orginalGenConfigJson[0].serial_parity4 == "" || this.orginalGenConfigJson[0].serial_parity4 == "null" ? "None" : this.orginalGenConfigJson[0].serial_parity4;
    this.serialHandshakeDropTXT4 = this.orginalGenConfigJson[0].serial_handshake4 == "" || this.orginalGenConfigJson[0].serial_handshake4 == "null" ? "None" : this.orginalGenConfigJson[0].serial_handshake4;
    this.serialInfModeDropTXT4 = this.orginalGenConfigJson[0].serial_infMode4 == "" || this.orginalGenConfigJson[0].serial_infMode4 == "null" ? "Choose Mode" : this.orginalGenConfigJson[0].serial_infMode4;
    */
    // NTP
    this.ntpChekBOX1 = this.orginalGenConfigJson[0].ntp_enable1 == "Yes" ? true : false;
    this.ntpChekBOX2 = this.orginalGenConfigJson[0].ntp_enable2 == "Yes" ? true : false;
    this.ntpIpaddressTXT = this.orginalGenConfigJson[0].ntp_ipadd1 == "null" ? "" : this.orginalGenConfigJson[0].ntp_ipadd1;
    this.ntpPortNoTXT = this.orginalGenConfigJson[0].ntp_port1 == "null" ? "" : this.orginalGenConfigJson[0].ntp_port1;
    this.ntpIpaddressTXT2 = this.orginalGenConfigJson[0].ntp_ipadd2  == "null" ? "" : this.orginalGenConfigJson[0].ntp_ipadd2;
    this.ntpPortNoTXT2 = this.orginalGenConfigJson[0].ntp_port2  == "null" ? "" : this.orginalGenConfigJson[0].ntp_port2;
    this.ntpIntervalTXT = this.orginalGenConfigJson[0].ntp_interval  == "null" ? "" : this.orginalGenConfigJson[0].ntp_interval;
   /* this.ntpTimeOffsetHrsTXT = this.orginalGenConfigJson[0].ntp_hrs == "" ||  this.orginalGenConfigJson[0].ntp_hrs == "null" ? "0": this.orginalGenConfigJson[0].ntp_hrs;
    this.ntpTimeOffsetSecTXT = this.orginalGenConfigJson[0].ntp_mints == "" ||  this.orginalGenConfigJson[0].ntp_mints == "null" ? "0": this.orginalGenConfigJson[0].ntp_mints;

    // MQTT
    this.mqttBrokerTXT = this.orginalGenConfigJson[0].mqtt_broker_ip == "null" ? "" : this.orginalGenConfigJson[0].mqtt_broker_ip;
    this.mqttPortNoTXT1 = this.orginalGenConfigJson[0].mqtt_broker_port == "null" ? "" : this.orginalGenConfigJson[0].mqtt_broker_port;
    this.mqttUsernameTXT = this.orginalGenConfigJson[0].mqtt_username == "null" ? "" : this.orginalGenConfigJson[0].mqtt_username;
    this.mqttPasswodTXT = this.orginalGenConfigJson[0].mqtt_password == "null" ? "" : this.orginalGenConfigJson[0].mqtt_password;
    this.mqttPublicTopicTXT = this.orginalGenConfigJson[0].mqtt_pub_topic == "null" ? "" : this.orginalGenConfigJson[0].mqtt_pub_topic;
    this.mqttHrsTXT = this.orginalGenConfigJson[0].mqtt_pub_int_hour == "" ||  this.orginalGenConfigJson[0].mqtt_pub_int_hour == "null" ? "0": this.orginalGenConfigJson[0].mqtt_pub_int_hour;
    this.mqttMinsTXT = this.orginalGenConfigJson[0].mqtt_pub_int_mint == "" ||  this.orginalGenConfigJson[0].mqtt_pub_int_mint == "null" ? "0": this.orginalGenConfigJson[0].mqtt_pub_int_mint;
    this.mqttSecsTXT = this.orginalGenConfigJson[0].mqtt_pub_int_sec == "" ||  this.orginalGenConfigJson[0].mqtt_pub_int_sec == "null" ? "0": this.orginalGenConfigJson[0].mqtt_pub_int_sec; 
    this.mqttEnableEventsChkBOX = this.orginalGenConfigJson[0].mqtt_event_topic_flag == "Yes" ? true : false;
    this.mqttEventsTopicTXT = this.orginalGenConfigJson[0].mqtt_event_pub_topic == null ? "":this.orginalGenConfigJson[0].mqtt_event_pub_topic;
    this.mqttEnablePingChkBOX = this.orginalGenConfigJson[0].mqtt_diag_topic_flag == "Yes" ? true : false;
    this.mqttDiagTXT = this.orginalGenConfigJson[0].mqtt_diag_pub_topic == "null" ? "" : this.orginalGenConfigJson[0].mqtt_diag_pub_topic;
      */
     this.genallowcommonchkbx = this.orginalGenConfigJson[0].enable_allow_master == "Yes" ? true : false;
          this.genallow1chkbx = this.orginalGenConfigJson[0].master1_enable == "Yes" ? true : false;
          this.genallow1IPTXT= this.orginalGenConfigJson[0].master1_ip;
          this.genallow2chkbx = this.orginalGenConfigJson[0].master2_enable == "Yes" ? true : false;
          this.genallow2IPTXT = this.orginalGenConfigJson[0].master2_ip;
          this.genallow3chkbx = this.orginalGenConfigJson[0].master3_enable == "Yes" ? true : false;
          this.genallow3IPTXT= this.orginalGenConfigJson[0].master3_ip;
          this.genallow4chkbx= this.orginalGenConfigJson[0].master4_enable == "Yes" ? true : false;
          this.genallow4IPTXT = this.orginalGenConfigJson[0].master4_ip;
          this.iec104Enablechekbox  = this.orginalGenConfigJson[0].iec_enable == "Yes" ? true : false;
          this.iecStationTXT = this.orginalGenConfigJson[0].iec_addr == "null" ? "" : this.orginalGenConfigJson[0].iec_addr;
        this.iecportTXT = this.orginalGenConfigJson[0].iec_port == "null" ? "" : this.orginalGenConfigJson[0].iec_port;
    this.iecCylicTXT = this.orginalGenConfigJson[0].iec_cyc_int == "null" ? "" : this.orginalGenConfigJson[0].iec_cyc_int;
    this.startIOAaddTXT = this.orginalGenConfigJson[0].iec_met_start_ioa == "null" ? "" : this.orginalGenConfigJson[0].iec_met_start_ioa;
    this.iecCodsizedwnTXT =this.orginalGenConfigJson[0].iec_cot == "null" ? "" : this.orginalGenConfigJson[0].iec_cot;
    this.iecIOAsizedwnTXT=this.orginalGenConfigJson[0].iec_ioa == "null" ? "" : this.orginalGenConfigJson[0].iec_ioa;

     this.ftpEnablechekbox = this.orginalGenConfigJson[0].ftp_enable == "Yes" ? true : false;
      this.ftpIpaddTXT=this.orginalGenConfigJson[0].ftp_ip == "null" ? "" : this.orginalGenConfigJson[0].ftp_ip;
      this.ftpprtnoTXT=this.orginalGenConfigJson[0].ftp_port == "null" ? "" : this.orginalGenConfigJson[0].ftp_port;
      this.ftpusernameTXT=this.orginalGenConfigJson[0].ftp_user == "null" ? "" : this.orginalGenConfigJson[0].ftp_user;
      this.ftppasswordTXT=this.orginalGenConfigJson[0].ftp_pass == "null" ? "" : this.orginalGenConfigJson[0].ftp_pass;
      this.ftpdirTXT=this.orginalGenConfigJson[0].ftp_dir == "null" ? "" : this.orginalGenConfigJson[0].ftp_dir;
      this.ftptimeoutTXT=this.orginalGenConfigJson[0].ftp_period == "null" ? "" : this.orginalGenConfigJson[0].ftp_period;
    }else{
      //this.ipaddressTXT = deviceIP;
      this.resetdeviceGENconfigurePOPUP();
    }
    }else{
     //this.ipaddressTXT = deviceIP;
     this.resetdeviceGENconfigurePOPUP();
     this.orginalGenConfigJson = "";
     this.copydeviceGenConfigJson= [];
    }
    });
    clearInterval(this.activatedInterval);
    this.confrimationSUBTEXT = "";
     //this.$modal.show('dcuviewconfigBTNpopup');
     this.confrimationTEXT = "deviceIOTpopup";
    },
    rmsConfigureDLMSMeterFunction(rowIndex,id,devicename){
       this.rmsMeterDLMSConfigJson = "";
       this.copyrmsMeterDLMSConfigJson = "";
       this.dlmsupdateId = id;
       this.dlmsupdatedeviceName = devicename;
        var deviceDMLSmeterUrl = this.deviceDMLSmeterUrl.replace("$$deviceID$$",id);
        axios
        .get(deviceDMLSmeterUrl)
        .then(response => {
          var status = response.data.status;
          if (status.includes("found")) {
            this.rmsMeterDLMSConfigJson = response.data;
            this.copyrmsMeterDLMSConfigJson = response.data.details;
            this.confrimationSUBTEXT = "";
            clearInterval(this.activatedInterval);
            //this.$modal.show('rmsDLMSconfigModal');
            this.confrimationTEXT = "deviceDLMSpopup";
          }else{
            this.rmsMeterDLMSConfigJson = "";
            this.copyrmsMeterDLMSConfigJson = "";
            this.warningMessage("Device not configured")
            return false;
          }
        })
        .catch(function(error) {
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    
    rmsGETDeviceFunction(rowIndex,id,devicename){
       this.confrimationTEXT = "deviceGET_GEN_CONFIGpopup";
       this.configureMeterTbID = id;
       this.configuredeviceName = devicename;
       this.configurecmdName = "GET_GEN_CONFIG";
       this.confrimationSUBTEXT = "Confirm GET_GEN_CONFIG of device - "+devicename +"?";
       this.resetconfrimationpopup();
       this.$modal.show('confirmationPopup');
       // 
    },
    rmsGETDLMSFunction(rowIndex,id,devicename){
      this.confrimationTEXT = "deviceGET_DLMS_CONFIGpopup";
      this.configureMeterTbID = id;
      this.configuredeviceName = devicename;
      this.configurecmdName = "GET_DLMS_CONFIG";
      this.confrimationSUBTEXT = "Confirm GET_DLMS_CONFIG of device - "+devicename +"?";
      this.resetconfrimationpopup();
      this.$modal.show('confirmationPopup');
    },
    rmsConfigureROLLBACKFunction(rowIndex,id,devicename){
      this.confrimationTEXT = "deviceCONFIG_ROLLBACKpopup";
      this.configureMeterTbID = id;
      this.configuredeviceName = devicename;
      this.configurecmdName = "CONFIG_ROLLBACK";
      this.confrimationSUBTEXT = "Confirm CONFIG_ROLLBACK of device - "+devicename +"?";
      this.resetconfrimationpopup();
      this.$modal.show('confirmationPopup');
      clearInterval(this.activatedInterval);
    },
    rmsConfigureACTIVATEFunction(rowIndex,id,devicename){
    this.confrimationTEXT = "deviceACTIVATE_CONFIGpopup";
    this.configureMeterTbID = id;
    this.configuredeviceName = devicename;
    this.configurecmdName = "ACTIVATE_CONFIG";
    this.confrimationSUBTEXT = "Confirm ACTIVATE_CONFIG of device - "+devicename +"?";
    this.resetconfrimationpopup();
     this.$modal.show('confirmationPopup');
    },
    rmsConfigureRollbackFirmwareFunction(rowIndex,id,devicename){
    this.resetconfrimationpopup();
    this.confrimationTEXT = "deviceRollbackFirmwarepopup";
    this.configureMeterTbID = id;
    this.configuredeviceName = devicename;
    this.configurecmdName = "ROLLBACK_FIRMWARE";
    this.confrimationSUBTEXT = "Confirm ROLLBACK_FIRMWARE of firmware - "+devicename +"?";
    clearInterval(this.activatedInterval);
    this.$modal.show('confirmationPopup');
    var getfirmware_verURL = this.getfirmware_verURL.replace("$$deviceID$$",id);
        axios
        .get(getfirmware_verURL)
        .then(response => {
          var status = response.data.status;
          if (status.includes("found")) {
            this.firmwarePREVVERTXT = response.data.details[0].prev_firmware_version;
            this.firmwareCURRVERTXT = response.data.details[0].firmware_version;
            this.firmwareNEWVERTXT = response.data.details[0].new_firmware_version;
          }else{
             this.firmwarePREVVERTXT = "";
             this.firmwareCURRVERTXT = "";
             this.firmwareNEWVERTXT = "";
          }
        })
        .catch(function(error) {
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    viewFWRPrevCurrFunction(rowIndex,id,devicename){
      this.deviceTblRowIndex = rowIndex;
      this.deviceTblID = id;
      this.deviceTblDeviceName = devicename;
      this.$modal.show('viewPrevCurrFWRPopup');
      clearInterval(this.activatedInterval);
      this.showfirmwareSummaryPopup(rowIndex,id,devicename,'previous');
    },
     viewALLFWRVersionFunction(rowIndex,id,devicename){
      this.deviceTblRowIndex = rowIndex;
      this.deviceTblID = id;
      this.deviceTblDeviceName = devicename;
      this.$modal.show('viewACtivateFWRPopup');
      clearInterval(this.activatedInterval);
      this.showfirmwareSummaryPopup(rowIndex,id,devicename,'current');
    },
    getconfigHistroyPopup(rowIndex,id,devicename){
      this.deviceTblRowIndex = rowIndex;
      this.deviceTblID = id;
      this.deviceTblDeviceName = devicename;
      this.historyBTNclickTXT = "Configuration";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.historyFromdateTXT = startdate;
      this.historyTodateTXT = enddate;
      this.$modal.show('viewConfigHISTORYPopup');
      clearInterval(this.activatedInterval);
      this.historyconfigFwFunction();
    },
     getfirmwareHistroyPopup(rowIndex,id,devicename){
      this.deviceTblRowIndex = rowIndex;
      this.deviceTblID = id;
      this.deviceTblDeviceName = devicename;
      this.historyBTNclickTXT = "Firmware";
      var enddate = new Date();
      var startdate = new Date();
      startdate.setDate(startdate.getDate()-7);
      this.historyFromdateTXT = startdate;
      this.historyTodateTXT = enddate;
      this.$modal.show('viewConfigHISTORYPopup');
      clearInterval(this.activatedInterval);
      this.historyconfigFwFunction();
    },
    rmsConfigureUpdateFirmwareFunction(rowIndex,id,devicename){
      this.isLoading = true;
    this.resetconfrimationpopup();
    this.confrimationTEXT = "deviceUpdateFirmwarepopup";
    this.configureMeterTbID = id;
    this.configuredeviceName = devicename;
    this.configurecmdName = "UPDATE_FIRMWARE";
    this.confrimationSUBTEXT = "Confirm UPDATE_FIRMWARE of firmware - "+devicename +"?";
    var getfirmware_verURL = this.getfirmware_verURL.replace("$$deviceID$$",id);
        axios
        .get(getfirmware_verURL)
        .then(response => {
          var status = response.data.status;
          if (status.includes("found")) {
            if(response.data.details[0] == undefined){
              this.isLoading = false;
            this.firmwareCURRVERTXT = "";
            this.firmwareNEWVERTXT = "";
            clearInterval(this.activatedInterval);
            this.$modal.show('confirmationPopup'); 
            this.loadFWListMethod();
            
            }else{
            this.firmwareCURRVERTXT = response.data.details[0].firmware_version;
            this.firmwareNEWVERTXT = response.data.details[0].new_firmware_version;
           clearInterval(this.activatedInterval);
            this.$modal.show('confirmationPopup');
            this.isLoading = false;
            this.filterloadFWListMethod(this.firmwareCURRVERTXT);
            }
          }else{
            this.firmwareCURRVERTXT = "";
            this.firmwareNEWVERTXT = "";
            this.isLoading = false;
            clearInterval(this.activatedInterval);
            this.$modal.show('confirmationPopup');
            this.loadFWListMethod();
          }
        })
        .catch(function(error) {
          this.isLoading = false;
          alert("rmsConfigureUpdateFirmwareFunction :"+error);
        })
        .finally(function() {
          // always executed
        });
        
    },
    rmsConfigureActivateFirmwareFunction(rowIndex,id,devicename){
    this.confrimationTEXT = "deviceActivateFirmwarepopup";
    this.configureMeterTbID = id;
    this.configuredeviceName = devicename;
    this.configurecmdName = "ACTIVATE_FIRMWARE";
    this.confrimationSUBTEXT = "Confirm ACTIVATE_FIRMWARE of firmware - "+devicename +"?";
    this.resetconfrimationpopup();
    var getfirmware_verURL = this.getfirmware_verURL.replace("$$deviceID$$",id);
      console.log('getfirmware_verURL', getfirmware_verURL);
        axios
        .get(getfirmware_verURL)
        .then(response => {
          var status = response.data.status;
          if (status.includes("found")) {
             if(response.data.details[0] == undefined){
            this.firmwareCURRVERTXT = "";
             this.firmwareNEWVERTXT =  "";
             this.$modal.show('confirmationPopup');
             clearInterval(this.activatedInterval);
             }else{
            this.firmwareCURRVERTXT = response.data.details[0].firmware_version;
            this.firmwareNEWVERTXT =  response.data.details[0].new_firmware_version;
            this.$modal.show('confirmationPopup');
            clearInterval(this.activatedInterval);
             }
          }else{
             this.firmwareCURRVERTXT = "";
             this.firmwareNEWVERTXT =  "";
             this.$modal.show('confirmationPopup');
             clearInterval(this.activatedInterval);
          }
        })
        .catch(function(error) {
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    resetconfrimationpopup(){
    this.deviceReasonTXT = "";
    this.firmwareIPTXT= "";
    this.firmwarePORTTXT= "";
    this.firmwareUSERTXT= "";
    this.firmwarePASSTXT= "";
    this.firmwareSELTXT= "Choose Firmware";
    this.firmwareCURRVERTXT = "";
    this.firmwareNEWVERTXT = "";
    clearInterval(this.activatedInterval);
    },
    deviceViewSummary(index , id, devicename) {
      this.deviceMeterUIName = devicename;
      var deviceSummaryUrl = this.devicesummaryUrl.replace("$$deviceid$$",id);
      this.devicesummaryJson = "";
       axios
        .get(deviceSummaryUrl)
        .then(response => {
          var status = response.data.status;
          if (status.includes("found")) {
            if(response.data.iot_table_details.length != 0){
            this.devicesummaryJson = response.data;
            clearInterval(this.activatedInterval);
            this.$modal.show('devicesummarypopup');
            }else{
            this.devicesummaryJson = "";
            this.warningMessage("DCU not configured")
            return false;
            }
           ;
          }else{
            this.devicesummaryJson = "";
            this.warningMessage("DCU not configured")
            return false;
          }
        })
        .catch(function(error) {
          // handle error
          alert(error);
        })
        .finally(function() {
          // always executed
        });
    },
    filterInput(e){
     // console.log('-------------');
      this.rmsdevicePortnoTXT = e.target.value.replace(/[^0-9]+/g, '');
    },
    filterInput1(e){
     // console.log('-------------');
      this.rmsmeterslaveAddTXT = e.target.value.replace(/[^0-9]+/g, '');
    },
    filterInput2(e){
     // console.log('-------------');
      this.mqttPortNoTXT1 = e.target.value.replace(/[^0-9]+/g, '');
    },
    deviceIOTGATESAVEACTION(){
      this.isLoading = true;
    if(this.gatewayTXT =="" || this.gatewayTXT == null){
      this.isLoading = false;
      this.warningMessage("Please enter a IOT Gateway ID.")
      return false;
    }
    if(this.locationTXT =="" || this.locationTXT == null){
      this.isLoading = false;
      this.warningMessage("Please enter a IOT Location.")
      return false;
    }

    if(this.enabledbglogChkBox){
    var bool22 = this.ValidateDBGIPaddress('in DBG log IP is',this.dbglogIpTXT);
      if (!bool22) {
        this.isLoading = false;
        this.warningMessage("Debug log IP address invalid ");
        return false;
      }
     }

    var bool = this.ValidateDBGIPaddress('in LAN current IP is',this.ipaddressTXT);
    if (!bool) {
      this.isLoading = false;
        this.warningMessage("Ethernet current IP address invalid ");
        return false;
      }
    var bool0 = this.ValidateDBGIPaddress('in LAN new IP is',this.newipaddressTXT);
    if (!bool0) {
      this.isLoading = false;
        this.warningMessage("New IP address invalid");
        return false;
      }
    var bool1 = this.ValidateDBGIPaddress('in LAN subnet mask IP is',this.subnetmaskTXT);
     if (!bool1) {
       this.isLoading = false;
        this.warningMessage("LAN subnet mask IP address invalid ");
        return false;
      }
    var bool2 = this.ValidateDBGIPaddress('in LAN gateway IP is',this.gateTXT);
      if (!bool2) {
        this.isLoading = false;
        this.warningMessage("LAN gateway IP address invalid ");
        return false;
      }
     /*
      if(this.no_serialDropTXT == "choose no of serial"){
        this.isLoading = false;
        this.warningMessage("Please select no. of serial ports.");
        return false;
      }
      if(this.no_serialDropTXT == "1"){
      if(this.serialBaudRateDropTXT1 == "" || this.serialBaudRateDropTXT1 == null){
        this.isLoading = false;
        this.warningMessage("Please select baud rate for serial port 1.");
        return false;
      }
       if(this.serialDatabitsDropTXT1 == "" || this.serialDatabitsDropTXT1 == null){
         this.isLoading = false;
        this.warningMessage("Please select data bits for serial port 1.");
        return false;
      }
       if(this.serialStopbitsDropTXT1 == "" || this.serialStopbitsDropTXT1 == null){
         this.isLoading = false;
        this.warningMessage("Please select stop bits for serial port 1.");
        return false;
      }
       if(this.serialParityDropTXT1 == "" || this.serialParityDropTXT1 == null){
         this.isLoading = false;
        this.warningMessage("Please select parity for serial port 1.");
        return false;
      }
       if(this.serialHandshakeDropTXT1 == "" || this.serialHandshakeDropTXT1 == null){
         this.isLoading = false;
        this.warningMessage("Please select a Handshake for serial port 1.");
        return false;
      }
      if(this.serialInfModeDropTXT1 == "" || this.serialInfModeDropTXT1 == null || this.serialInfModeDropTXT1 == "Choose Mode"){
        this.isLoading = false;
        this.warningMessage("Please select communication mode for Serial port 1.");
        return false;
      }
      }


      if(this.no_serialDropTXT == "2" || this.no_serialDropTXT == "4"){
      if(this.serialBaudRateDropTXT2 == "" || this.serialBaudRateDropTXT2 == null){
        this.isLoading = false;
        this.warningMessage("Please select baud rate for serial port 2.");
        return false;
      }
       if(this.serialDatabitsDropTXT2 == "" || this.serialDatabitsDropTXT2 == null){
         this.isLoading = false;
        this.warningMessage("Please select data bits for serial port 2.");
        return false;
      }
       if(this.serialStopbitsDropTXT2 == "" || this.serialStopbitsDropTXT2 == null){
         this.isLoading = false;
        this.warningMessage("Please select stop bits for serial port 2.");
        return false;
      }
       if(this.serialParityDropTXT2 == "" || this.serialParityDropTXT2 == null){
         this.isLoading = false;
        this.warningMessage("Please select parity for serial port 2.");
        return false;
      }
       if(this.serialHandshakeDropTXT2 == "" || this.serialHandshakeDropTXT2 == null){
         this.isLoading = false;
        this.warningMessage("Please select Handshake for Serial port 2.");
        return false;
      }
      if(this.serialInfModeDropTXT2 == "" || this.serialInfModeDropTXT2 == null || this.serialInfModeDropTXT2 == "Choose Mode"){
        this.isLoading = false;
        this.warningMessage("Please select a communication mode for serial port 2.");
        return false;
      }
      }

      if(this.no_serialDropTXT == "4"){
      if(this.serialBaudRateDropTXT3 == "" || this.serialBaudRateDropTXT3 == null){
        this.isLoading = false;
        this.warningMessage("Please select baud rate for serial port 3.");
        return false;
      }
       if(this.serialDatabitsDropTXT3 == "" || this.serialDatabitsDropTXT3 == null){
         this.isLoading = false;
        this.warningMessage("Please select Data bits for Serial port 3.");
        return false;
      }
       if(this.serialStopbitsDropTXT3 == "" || this.serialStopbitsDropTXT3 == null){
         this.isLoading = false;
        this.warningMessage("Please select Stop bits for serial port 3.");
        return false;
      }
       if(this.serialParityDropTXT3 == "" || this.serialParityDropTXT3 == null){
         this.isLoading = false;
        this.warningMessage("Please select parity for serial port 3.");
        return false;
      }
       if(this.serialHandshakeDropTXT3 == "" || this.serialHandshakeDropTXT3 == null){
         this.isLoading = false;
        this.warningMessage("Please select Handshake for serial port 3.");
        return false;
      }
      if(this.serialInfModeDropTXT3 == "" || this.serialInfModeDropTXT3 == null || this.serialInfModeDropTXT3 == "Choose Mode"){
        this.isLoading = false;
        this.warningMessage("Please Interface mode for serial port 3.");
        return false;
      }

      if(this.serialBaudRateDropTXT4 == "" || this.serialBaudRateDropTXT4 == null){
        this.isLoading = false;
        this.warningMessage("Please select Baud rate for serial port 4.");
        return false;
      }
       if(this.serialDatabitsDropTXT4 == "" || this.serialDatabitsDropTXT4 == null){
         this.isLoading = false;
        this.warningMessage("Please select data bits for Serial port 4.");
        return false;
      }
       if(this.serialStopbitsDropTXT4 == "" || this.serialStopbitsDropTXT4 == null){
         this.isLoading = false;
        this.warningMessage("Please select stop bits for Serial port 4.");
        return false;
      }
       if(this.serialParityDropTXT4 == "" || this.serialParityDropTXT4 == null){
         this.isLoading = false;
        this.warningMessage("please choose parity for Serial port 4.");
        return false;
      }
       if(this.serialHandshakeDropTXT4 == "" || this.serialHandshakeDropTXT4 == null){
         this.isLoading = false;
        this.warningMessage("please select any Handshake method for Serial port 4.");
        return false;
      }
      if(this.serialInfModeDropTXT4 == "" || this.serialInfModeDropTXT4 == null || this.serialInfModeDropTXT4 == "Choose Mode"){
        this.isLoading = false;
        this.warningMessage("Please select an Interface mode for Serial port 4.");
        return false;
      }
      }
      */

      if(this.ntpChekBOX1){
      var boolt = this.ValidateIPaddress('in NTP server 1 IP is',this.ntpIpaddressTXT);
      if (!boolt) {
        this.isLoading = false;
        return false;
      }
      if (this.ntpPortNoTXT <= 0 || this.ntpPortNoTXT > 65535 ) {
        this.isLoading = false;
        this.warningMessage("NTP Server 1 port number should range from 1 to 65535");
        return false;
      }
      }

      if(this.ntpChekBOX2){
      var boolk = this.ValidateIPaddress('in NTP server 2 IP is',this.ntpIpaddressTXT2);
      if (!boolk) {
        this.isLoading = false;
        return false;
      }
      if (this.ntpPortNoTXT2 <= 0 || this.ntpPortNoTXT2 > 65535 ) {
        this.isLoading = false;
        this.warningMessage("NTP Server 2 port number should range from 1 to 65535.");
        return false;
      }
      }

      if(this.ntpChekBOX1 || this.ntpChekBOX2) {
        if (this.ntpIntervalTXT <= 4 || this.ntpIntervalTXT > 60 ) {
          this.isLoading = false;
        this.warningMessage("NTP Update Interval(mins.) should range from 5 to 60");
        return false;
      }
      }

      if(this.genallowcommonchkbx){
        if(this.genallow1chkbx){
          if(this.genallow1IPTXT == "" || this.genallow1IPTXT == null){
            this.isLoading = false;
             this.warningMessage("Please enter a master 1 ip address");
            return false;
          }
        }
         if(this.genallow2chkbx){
          if(this.genallow2IPTXT == "" || this.genallow2IPTXT == null){
            this.isLoading = false;
             this.warningMessage("Please enter a master 2 ip address");
            return false;
          }
        }
         if(this.genallow3chkbx){
          if(this.genallow3IPTXT == "" || this.genallow3IPTXT == null){
            this.isLoading = false;
             this.warningMessage("Please enter a master 3 ip address");
            return false;
          }
        }
        if(this.genallow4chkbx){
          if(this.genallow4IPTXT == "" || this.genallow4IPTXT == null){
            this.isLoading = false;
             this.warningMessage("Please enter a master 4 ip address");
            return false;
          }
        }
      }

      if(this.ftpEnablechekbox){
        if(this.ftpIpaddTXT == "" || this.ftpIpaddTXT == null){
          this.isLoading = false;
             this.warningMessage("Please enter a ftp ip address");
            return false;
          }
           if(this.ftpprtnoTXT == "" || this.ftpprtnoTXT == null){
             this.isLoading = false;
             this.warningMessage("Please enter a ftp port number");
            return false;
          }
          if(this.ftpusernameTXT == "" || this.ftpusernameTXT == null){
            this.isLoading = false;
             this.warningMessage("Please enter a ftp user name");
            return false;
          }
          if(this.ftppasswordTXT == "" || this.ftppasswordTXT == null){
            this.isLoading = false;
             this.warningMessage("Please enter a ftp password");
            return false;
          }
          if(this.ftpdirTXT == "" || this.ftpdirTXT == null){
            this.isLoading = false;
             this.warningMessage("Please enter a ftp directory");
            return false;
          }
          if(this.ftptimeoutTXT == "" || this.ftptimeoutTXT == null){
            this.isLoading = false;
             this.warningMessage("Please choose any one ftp time peroid");
            return false;
          }
      }

    if(this.iec104Enablechekbox){
      if( this.iecStationTXT == "" ||  this.iecStationTXT == null){
        this.isLoading = false;
         this.warningMessage("Please enter a station address");
         return false;
      }
       if( this.iecportTXT == "" ||  this.iecportTXT == null){
         this.isLoading = false;
         this.warningMessage("Please enter a port number");
         return false;
      }
      if( this.iecCylicTXT == "" ||  this.iecCylicTXT == null){
        this.isLoading = false;
         this.warningMessage("Please enter a Cyclic Int");
         return false;
      }
      if( this.startIOAaddTXT == "" ||  this.startIOAaddTXT == null){
        this.isLoading = false;
         this.warningMessage("Please enter a Start IOA Address");
         return false;
      }
      if( this.iecCodsizedwnTXT == "Choose COT Size" ||  this.iecCodsizedwnTXT == null){
        this.isLoading = false;
         this.warningMessage("Please choose any one COT Size");
         return false;
      }
      if( this.iecIOAsizedwnTXT == "Choose IOA Size" ||  this.iecIOAsizedwnTXT == null){
        this.isLoading = false;
         this.warningMessage("Please choose any one IOA Size");
         return false;
      }
    }
/*
      var bool2Broker = this.ValidateIPaddress('in MQTT Broker IP is',this.mqttBrokerTXT);
      if (!bool2Broker) {
        this.isLoading = false;
        return false;
      }

      if (this.mqttPortNoTXT1 <= 0 || this.mqttPortNoTXT1 > 65535 ) {
        this.isLoading = false;
        this.warningMessage("MQTT Port number should range from 1 to 65535");
        return false;
      }
      if (this.mqttUsernameTXT == "" || this.mqttUsernameTXT == null ) {
        this.isLoading = false;
        this.warningMessage("Please enter a MQTT Username.");
        return false;
      }

       if (this.mqttPasswodTXT == "" || this.mqttPasswodTXT == null ) {
         this.isLoading = false;
        this.warningMessage("Please enter MQTT Password.");
        return false;
      }
        if (this.mqttPublicTopicTXT == "" || this.mqttPublicTopicTXT == null ) {
          this.isLoading = false;
        this.warningMessage("Please enter MQTT Public Topic.");
        return false;
      }

      if (this.mqttHrsTXT < 0 || this.mqttHrsTXT > 24 ) {
        this.isLoading = false;
        this.warningMessage("MQTT Publish Interval Seconds should range from 0 to 24.");
        return false;
      }
      if (this.mqttMinsTXT < 0 || this.mqttMinsTXT > 60 ) {
        this.isLoading = false;
        this.warningMessage("MQTT Publish Interval Seconds should range from 0 to 60.");
        return false;
      }
      if (this.mqttSecsTXT < 0 || this.mqttSecsTXT > 60 ) {
        this.isLoading = false;
        this.warningMessage("MQTT Publish Interval Seconds should range from 0 to 60.");
        return false;
      }

     if(this.mqttEnableEventsChkBOX)
      {
            if (this.mqttEventsTopicTXT == '' || this.mqttEventsTopicTXT == null ) {
              this.isLoading = false;
                 this.warningMessage("Please enter MQTT Events Topic.");
                 return false;
            }
      }

      if(this.mqttEnablePingChkBOX)
      {
            if (this.mqttDiagTXT == '' || this.mqttDiagTXT == null ) {
              this.isLoading = false;
                 this.warningMessage("Please enter MQTT Diag Topic.");
                 return false;
            }
      }
*/
      console.log(JSON.stringify(this.copydeviceGenConfigJson)+'-----copy-----savee--------'+JSON.stringify(this.orginalGenConfigJson));
      var checkGEN = _.isEqual(this.copydeviceGenConfigJson, this.orginalGenConfigJson);
      console.log('checkGEN :', checkGEN);
      if(!checkGEN){
       this.$modal.show('confirmationPopup');
       this.confrimationSUBTEXT = "Confirm SET_GEN_CONFIG of device - "+this.configuredeviceName+" ?";
       clearInterval(this.activatedInterval);
       this.isLoading = false;
       this.deviceReasonTXT = "";
      } else{
        this.successMessage(this.configuredeviceName+" - SET_GEN_CONFIG command applied successfully");
        this.confrimationSUBTEXT = "";
        clearInterval(this.activatedInterval);
        this.isLoading = false;
        return false;
     }
    },
    configureMeterClsAction(){
        var noofmeter = Number(document.getElementById("meterTableID").rows.length -1);
        var Noofmeterpost = {id: this.configureMeterTbID, no_of_meters:  noofmeter}
        axios
          .post(this.device_onlynoofmetersupdateUrl, Noofmeterpost)
          .then(response => {
            var updateStatus = response.data.status;
            if (updateStatus.includes("Success")) {
              this.loadDeviceListMethod();
            }
          })
          .catch(function(error) {
            console.log("error::" + error);
          });
          this.$modal.hide('configureMeterpopup');
          this.loadDeviceListMethod();
    },
    rmsEditDeviceFunction: function(id, index) {
      clearInterval(this.activatedInterval);
      this.confrimationSUBTEXT = "";
      this.$modal.show('rmsdeviceConfigModal');
      this.updateid = id;
      this.rmsdeviceepopupTitle = "Edit DCU";
      this.rmsSavebtnTXT = "Update";
      this.deviceEditMode = true;
      this.dcuRegionnameTXT =  this.rmsdeviceConfigJson.device_details[index].region_id+"$$"+this.rmsdeviceConfigJson.device_details[index].region_name;
      this.getEDITCircleNameLst(this.dcuRegionnameTXT,index);
      this.rmsdeviceIDTXT =  this.rmsdeviceConfigJson.device_details[index].id;
      this.rmsdeviceNameTXT = this.rmsdeviceConfigJson.device_details[index].device_name;
      this.rmsdeviceIPTXT = this.rmsdeviceConfigJson.device_details[index].ip_address;
      this.rmsdevicePortnoTXT = this.rmsdeviceConfigJson.device_details[index].port_no;
      this.rmsdevicenoOfmeterTXT = this.rmsdeviceConfigJson.device_details[index].no_of_meters;
      this.configurenoofMetersTbID = this.rmsdeviceConfigJson.device_details[index].no_of_meters;
      this.devicehoursVAL = this.rmsdeviceConfigJson.device_details[index].hours;
      this.deviceminsVAL = this.rmsdeviceConfigJson.device_details[index].mins;
      this.rmsdevicestatusTXT = this.rmsdeviceConfigJson.device_details[index].status;
      this.dcuGCSTXT = this.rmsdeviceConfigJson.device_details[index].no_of_incomer;
      this.dcuOutgoingFeederTXT = this.rmsdeviceConfigJson.device_details[index].no_of_outgoing;
      this.deviceerrorMsg = [];
    },
    rmsDeleteDeviceFunction(id, index) {
      this.deleteDevicePasswordTXT = "";
      this.deviceDeleteid = id;
      this.deviceDeleteNAME = this.rmsdeviceConfigJson.device_details[index].device_name;
      this.deleteDevicePasswordCONFRIMTXT = "Do you want to delete " + this.rmsdeviceConfigJson.device_details[index].device_name + " Device ?";
      this.showdeleteConfrimationPopup();
      //var rmsDeviceval = confirm("Do you want delete to " + this.rmsdeviceConfigJson.device_details[index].device_name + " Device ?");
      //if (rmsDeviceval) {
       // var deleteUrl1 = this.device_deleteUrl.replace("$$deviceS_id$$",this.rmsdeviceConfigJson.device_details[index].id);
      //  this.deleteDevicelistMethod(deleteUrl1,this.rmsdeviceConfigJson.device_details[index].device_name);
      //  return true;
     // } else {
     //   return false;
    //  }
    },
    applyDeviceDeleteConfirmationpopup(){
      this.isLoading = true;
      if(this.deleteDevicePasswordTXT == ""){
        this.warningMessage("Please enter login password.");
        this.isLoading  = false;
        return false
      }
       var deleteUrl1 = this.device_deleteUrl.replace("$$deviceS_id$$",this.deviceDeleteid).replace("$$loginPassword$$",this.deleteDevicePasswordTXT).replace("$$userRole$$",this.userrole).replace("$$userName$$",this.username);
            axios
        .get(deleteUrl1)
        .then(response => {
          var deleteStatus = response.data.status;
          if (deleteStatus.includes("Success")) {
            this.loadDeviceListMethod();
            this.isLoading  = false;
            this.successMessage(this.deviceDeleteNAME + " - deleted successfully");
            this.closedeleteConfrimationPopup();
          }else{
            this.isLoading  = false;
             this.warningMessage(deleteStatus);
             return false;
          }
        })
        .catch(function(error) {
          // handle error
          this.isLoading  = false;
          alert(error);
        })
        .finally(function() {
          this.isLoading  = false;
          // always executed
        });
    },
    devicestatusTXTFunction(val) {
      console.log("CHANGE::::" + val);
    },
    checksplChar(inputstring){
    var regex = /^[0-9a-zA-Z\_]+$/
    return regex.test(inputstring);
    },
    rmsdeviceNameTXTpress(){
      if (this.rmsdeviceNameTXT == "" || this.rmsdeviceNameTXT == null) {
        this.deviceerrorMsg['rmsdeviceNameTXT'] = '* Please enter a DCU Name.';
         document.getElementById("rmsdeviceNameTXT").style.border = '1px solid red';
         return false;
      }else {
         this.deviceerrorMsg['rmsdeviceNameTXT'] = '';
         document.getElementById("rmsdeviceNameTXT").style.border = '1px solid lightgray';
      }
     var checkbool = this.checksplChar(this.rmsdeviceNameTXT);
      if (!checkbool) {
         this.deviceerrorMsg['rmsdeviceNameTXT'] = '* DCU Name only allow character, number and underscore.';
         document.getElementById("rmsdeviceNameTXT").style.border = '1px solid red';
        return false;
      }else{
        this.deviceerrorMsg['rmsdeviceNameTXT'] = '';
         document.getElementById("rmsdeviceNameTXT").style.border = '1px solid lightgray';
      }
    },
    rmsdeviceIPTXTpress(){
       if (this.rmsdeviceIPTXT == "" || this.rmsdeviceIPTXT == null) {
        this.deviceerrorMsg['rmsdeviceIPTXT'] = '* Please enter a dcu ip address.';
         document.getElementById("rmsdeviceIPTXT").style.border = '1px solid red';
         return false;
      }else{
         this.deviceerrorMsg['rmsdeviceIPTXT'] = '';
         document.getElementById("rmsdeviceIPTXT").style.border = '1px solid lightgray';
      }
      var bool22 = this.ValidateDBGIPaddress('in device IP',this.rmsdeviceIPTXT);
      if (!bool22) {
        this.deviceerrorMsg['rmsdeviceIPTXT'] = '* Please enter a valid ip address.';
         document.getElementById("rmsdeviceIPTXT").style.border = '1px solid red';
        return false;
      }else{
         this.deviceerrorMsg['rmsdeviceIPTXT'] = '';
         document.getElementById("rmsdeviceIPTXT").style.border = '1px solid lightgray';
      }
    },
    rmsdevicePortnoTXTpress(){
       if (this.rmsdevicePortnoTXT == "" || this.rmsdevicePortnoTXT == null) {
          this.deviceerrorMsg['rmsdevicePortnoTXT'] = '* Please enter a device port number.';
         document.getElementById("rmsdevicePortnoTXT").style.border = '1px solid red';
        return false;
      }else{
        this.deviceerrorMsg['rmsdevicePortnoTXT'] = '';
         document.getElementById("rmsdevicePortnoTXT").style.border = '1px solid lightgray';
      }
      if(this.rmsdevicePortnoTXT <= 0 || this.rmsdevicePortnoTXT > 65535)
        {
          this.deviceerrorMsg['rmsdevicePortnoTXT'] = '* port number should be range 1 to 65535.';
         document.getElementById("rmsdevicePortnoTXT").style.border = '1px solid red';
          return false;
        }else{
        this.deviceerrorMsg['rmsdevicePortnoTXT'] = '';
         document.getElementById("rmsdevicePortnoTXT").style.border = '1px solid lightgray';
        }
    },
    devicehoursVALpress(){
       if (this.devicehoursVAL == "choose hours" || this.devicehoursVAL == null) {
       this.deviceerrorMsg['devicehoursVAL'] = '* Please choose any one hours.';
         document.getElementById("devicehoursVALTXT").style.border = '1px solid red';
        return false;
      }else{
        this.deviceerrorMsg['devicehoursVAL'] = '';
         document.getElementById("devicehoursVALTXT").style.border = '1px solid lightgray';
        }
    },
    deviceminsVALpress(){
      if (this.deviceminsVAL == "choose minutes" || this.deviceminsVAL == null) {
          this.deviceerrorMsg['devicehoursVAL'] = '* Please choose any one minutes';
         document.getElementById("deviceminsVAL").style.border = '1px solid red';
        return false;
      }else {
         this.deviceerrorMsg['devicehoursVAL'] = '';
         document.getElementById("deviceminsVAL").style.border = '1px solid lightgray';
      }

      if  (this.devicehoursVAL == "0") {
        if (this.deviceminsVAL == "0") {
           this.deviceerrorMsg['devicehoursVAL'] = '* TIme offset should not be zero';
         document.getElementById("deviceminsVAL").style.border = '1px solid red';
        return false;
      }else {
         this.deviceerrorMsg['devicehoursVAL'] = '';
         document.getElementById("deviceminsVAL").style.border = '1px solid lightgray';
      }
      }
    },
    hidedevicepopup(){
      this.isLoading = true;
      this.$modal.hide('rmsdeviceConfigModal');
      this.loadDeviceListMethod();
      this.deviceerrorMsg = [];
      this.isLoading = false;
    },
    hideIOTdevicepopup(){
      this.isLoading = true;
      this.$modal.hide('configIOTpopup');
      this.orginalGenConfigJson = "";
      this.copydeviceGenConfigJson= [];
      this.loadDeviceListMethod();
      this.isLoading = false;
    },
    rmsdeviceSaveFunction() {
      this.isLoading = true;
      if(this.dcuRegionnameTXT == 'Choose Region'){
        this.isLoading = false;
        this.warningMessage("Please choose any one region name.");
        return false;
      }
      if(this.dcuCircleNameTXT == 'Choose Circle'){
        this.isLoading = false;
        this.warningMessage("Please choose any one circle name.");
        return false;
      }
      if(this.dcuSSNameTXT == 'Choose Sub Station'){
        this.isLoading = false;
        this.warningMessage("Please choose any one sub station name.");
        return false;
      }
      if(this.updateid == ""){
      if (this.rmsdeviceIDTXT == "" || this.rmsdeviceIDTXT == null || this.rmsdeviceIDTXT == "Choose DCU ID") {
        this.isLoading = false;
        this.warningMessage("Please Choose DCU ID.");
        return false;
      }
      }
      if (this.rmsdeviceNameTXT == "" || this.rmsdeviceNameTXT == null) {
        this.isLoading = false;
        this.warningMessage("Please enter an DCU Name.");
        return false;
      }
      var checkbool = this.checksplChar(this.rmsdeviceNameTXT);
      if (!checkbool) {
        this.isLoading = false;
        this.warningMessage("DCU name only allows character, number and underscore.");
        return false;
      }
      if (this.rmsdeviceIPTXT == "" || this.rmsdeviceIPTXT == null) {
        this.isLoading = false;
        this.warningMessage("Please enter a DCU IP address.");
        return false;
      }
      var bool22 = this.ValidateIPaddress('in DCU IP',this.rmsdeviceIPTXT);
      if (!bool22) {
        this.isLoading = false;
        return false;
      }
    /*  if (this.rmsdevicePortnoTXT == "" || this.rmsdevicePortnoTXT == null) {
        this.warningMessage("Please enter a device port number.");
        return false;
      }
      if(this.rmsdevicePortnoTXT <= 0 || this.rmsdevicePortnoTXT > 65535)
        {
          this.warningMessage("Port number should range from 1 to 65535");
          return false;
        } */
      if (this.rmsSavebtnTXT == "Save") {
         if (this.rmsdeviceConfigJson != "") {
          for (var k = 0;k < this.rmsdeviceConfigJson.device_details.length;k++) {
             if (this.rmsdeviceIDTXT == this.rmsdeviceConfigJson.device_details[k].id) {
               this.isLoading = false;
              this.warningMessage("This DCU id is already configured. Please enter a new id.");
              return false;
            }
            if (this.rmsdeviceNameTXT == this.rmsdeviceConfigJson.device_details[k].device_name) {
              this.isLoading = false;
              this.warningMessage("This DCU name is already configured. Please enter a new name.");
              return false;
            }

           if (this.rmsdeviceIPTXT == this.rmsdeviceConfigJson.device_details[k].ip_address) {
             this.isLoading = false;
              this.warningMessage("This IP address is already configured. Please enter a new IP address.");
              return false;
            }
          }
        }
        var createPOSTJSON = {
          user_name:this.username,
          user_role:this.userrole,
          region_id : this.dcuRegionnameTXT.split('$$')[0],
          region_name : this.dcuRegionnameTXT.split('$$')[1],
          circle_id : this.dcuCircleNameTXT.split('$$')[0],
          circle_name: this.dcuCircleNameTXT.split('$$')[1],
          ss_id: this.dcuSSNameTXT.split('$$')[0],
          ss_name : this.dcuSSNameTXT.split('$$')[1],
          device_id : this.rmsdeviceIDTXT,
          device_name: this.rmsdeviceNameTXT,
          ip_address: this.rmsdeviceIPTXT,
          no_of_incomer:this.dcuGCSTXT,
          no_of_outgoing:this.dcuOutgoingFeederTXT,
          ss_rating:this.ssRatingTXT,
          port_no: parseInt(this.rmsdevicePortnoTXT),
          status: 1
        };
        console.log('createPOSTJSON --> :', JSON.stringify(createPOSTJSON));
        axios
          .post(this.device_createUrl, createPOSTJSON)
          .then(response => {
            var status = response.data.status;
            if (status.includes("Success")) {
              this.hidedevicepopup();
              this.loadDeviceListMethod();
              this.isLoading = false;
              this.successMessage(this.rmsdeviceNameTXT + " - added successfully");
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error::" + error);
          });
      } else {
         if (this.rmsdeviceConfigJson != "") {
          for (var k = 0;k < this.rmsdeviceConfigJson.device_details.length;k++) {
            if (this.updateid != this.rmsdeviceConfigJson.device_details[k].s_no) {
            if (this.rmsdeviceIDTXT == this.rmsdeviceConfigJson.device_details[k].device_name) {
              this.isLoading = false;
            this.warningMessage("This DCU id is already configuresd. Please enter a new id.");
            return false;
            }
            if (this.rmsdeviceNameTXT == this.rmsdeviceConfigJson.device_details[k].device_name) {
              this.isLoading = false;
              this.warningMessage("This DCU name is already configuresd. Please enter a new name.");
              return false;
            }
           if (this.rmsdeviceIPTXT == this.rmsdeviceConfigJson.device_details[k].ip_address) {
             this.isLoading = false;
              this.warningMessage("This IP address is already configured. Please enter a new IP address.");
              return false;
            }
          }
         }
        }
        var editPOSTJSON = {
          s_no: this.updateid,
          user_name:this.username,
          user_role:this.userrole,
          region_id : this.dcuRegionnameTXT.split('$$')[0],
          region_name : this.dcuRegionnameTXT.split('$$')[1],
          circle_id : this.dcuCircleNameTXT.split('$$')[0],
          circle_name: this.dcuCircleNameTXT.split('$$')[1],
          ss_id: this.dcuSSNameTXT.split('$$')[0],
          ss_name : this.dcuSSNameTXT.split('$$')[1],
          device_id:this.rmsdeviceIDTXT,
          device_name: this.rmsdeviceNameTXT,
          ip_address: this.rmsdeviceIPTXT,
          port_no: this.rmsdevicePortnoTXT
        };
        axios
          .post(this.device_updateUrl, editPOSTJSON)
          .then(response => {
            var updateStatus = response.data.status;
            if (updateStatus.includes("Success")) {
              this.$modal.hide('rmsdeviceConfigModal');
              this.loadDeviceListMethod();
              this.deviceerrorMsg = [];
              this.isLoading = false;
              this.successMessage(this.rmsdeviceNameTXT + " - updated successfully");
            }
          })
          .catch(function(error) {
            this.isLoading = false;
            console.log("error:>::" + error);
          });
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
        duration: 3,
        onClose() {
          // tslint:disable-next-line:no-console
        }
      });
    },
    notificationMessage(confirmation,bodydata,type,duration){
        this.$fire({title: confirmation, text: bodydata, type: type, timer: duration}).then(r => {
                console.log(r.value);
            });
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
    tabshowPassword1() {
      if (this.tabtypevalue1 === "password") {
        this.tabtypevalue1 = "text";
        this.tabimgvalue1 = "static/img/images/Peye.png";
      } else {
        this.tabtypevalue1 = "password";
        this.tabimgvalue1 = "static/img/images/Peye1.png";
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
<style >
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
    top: 70px !important;
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
input:disabled{
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
.hyperlinkcss{
  /* vertical-align:super; */
  text-decoration:none;
  cursor:pointer;
  color: #1a495e;
}
.hyperlinkcss:hover{
 /* vertical-align:super; */
  text-decoration:underline;
  cursor:pointer;
  color: #1a495e;
}
.hyperlinkdisable{
  text-decoration: none;
cursor: pointer;
color: #ced3d0;
}
.hyperlinkdisable:hover{
  text-decoration: none;
  cursor: not-allowed;
  color: #ced3d0;
}
.table-bordered > tbody > tr > td{
  border: 1px solid #e3dcdc;
}
 table tr td{
   padding-bottom: 0px;
 }
 .topPop{
   top: 58px !important;
 }
 .valueChangeCSS{
       background-color: #e67373 !important;
 }
 .valueNotChangeCSS{
        background-color: #eaeaea !important;
 }
</style>

