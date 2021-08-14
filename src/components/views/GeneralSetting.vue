<template>
  <section class="content" id="generalsettingPagePANE">
    <vue-element-loading :active="isLoading" spinner="bar-fade-scale" color="#000" :is-full-screen="true"/>
    <div class="row">
      <div class="col-lg-12">
       <ul class="timeline">
        <!-- timeline time label -->
        <li>
          <!-- timeline icon -->
          <i class="fa fa-desktop bg-yellow"></i>
          <div class="timeline-item">
         <!--   <span class="time"><i class="fa fa-cogs"></i>&nbsp;</span> -->
            <h3 class="timeline-header">Ethernet Settings</h3>
            <div class="timeline-body">
              <div class="row">
                  <div class="col-lg-12"> <input type="checkbox" id="enethernet1Checkbox" v-model="enethernet1Checkbox"/>
                    <label for="enethernet1Checkbox" class="inputcheckTEXTLBLcss">Enable Ethernet 1 </label></div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Ethernet 1 IP Address : </span>
                       <input id="genLANcurrentIPTXT" class="inputTEXTcss" placeholder="Ethernet 1 IP Address" :disabled="!enethernet1Checkbox" v-model="lancurrentipaddressTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">New Address : </span>
                       <input id="genLANNewIPTXT" class="inputTEXTcss" placeholder="Ethernet 1 New Address" :disabled="!enethernet1Checkbox" v-model="genLANNewIPTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Subnet Mask : </span>
                       <input id="gensubnetMaskIPTXT" class="inputTEXTcss" placeholder="Subnet Mask Address" :disabled="!enethernet1Checkbox" v-model="gensubnetMaskIPTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Gateway Address : </span>
                       <input id="genGatewayaddressIPTXT" class="inputTEXTcss" placeholder="Gateway Address" :disabled="!enethernet1Checkbox" v-model="genGatewayaddressIPTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-2" style="margin-top:20px;">
                       <input type="checkbox" id="gendebugipcheckbox" v-model="gendebugipcheckbox"/>
                       <label for="gendebugipcheckbox" class="inputcheckTEXTLBLcss">Enable debug log IP</label>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Debug Log IP : </span>
                       <input id="gendebugIPTXT" class="inputTEXTcss" placeholder="Debug IP Address" :disabled="!gendebugipcheckbox" v-model="gendebugIPTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              </div>
               <div style="height:15px;"></div>
              <div class="row">
                  <div class="col-lg-12">
                    <input type="checkbox" id="enethernet2Checkbox" v-model="enethernet2Checkbox"/>
                    <label for="enethernet2Checkbox" class="inputcheckTEXTLBLcss">Enable Ethernet 2 </label></div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Ethernet 2 IP Address : </span>
                       <input id="genLANcurrentIPTXT2" class="inputTEXTcss" placeholder="Ethernet 2 IP Address" :disabled="!enethernet2Checkbox" v-model="lancurrentipaddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">New Address : </span>
                       <input id="genLANNewIPTXT2" class="inputTEXTcss" placeholder="Ethernet 2 New Address" :disabled="!enethernet2Checkbox" v-model="genLANNewIPTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Subnet Mask : </span>
                       <input id="gensubnetMaskIPTXT2" class="inputTEXTcss" placeholder="Subnet Mask Address" :disabled="!enethernet2Checkbox" v-model="gensubnetMaskIPTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Gateway Address : </span>
                       <input id="genGatewayaddressIPTXT2" class="inputTEXTcss" placeholder="Gateway Address" :disabled="!enethernet2Checkbox" v-model="genGatewayaddressIPTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              </div>
            </div>
          <!--  <div class="timeline-footer">
              <a>&nbsp;</a>
            </div> -->
          </div>
        </li>
 <!-- timeline 22222 -->
          <li>
          <!-- timeline icon -->
          <i class="fa fa-desktop bg-blue"></i>
          <div class="timeline-item">
            <!--   <span class="time"><i class="fa fa-cogs"></i>&nbsp;</span> -->
            <h3 class="timeline-header">Mobile Network Settings&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       <input type="checkbox" id="mbEnablechekbox" v-model="mbEnablechekbox"/>
                       <label for="mbEnablechekbox" class="inputcheckTEXTLBLcss">Enable </label></h3>
            <div class="timeline-body">
                <div class="row">
              <div class="col-lg-3">
                       <span class="inputTEXTLBLcss">UserName : </span>
                       <input id="mbUsernameTXT" class="inputTEXTcss" placeholder="UserName" v-model="mbUsernameTXT" maxlength="32" :disabled="!mbEnablechekbox"/>
              </div>
              <div class="col-lg-3">
                       <span class="inputTEXTLBLcss">Password : </span>
                       <input id="mbPasswordTXT" class="inputTEXTcss" placeholder="Password" v-model="mbPasswordTXT" maxlength="32" @keydown.space.prevent :disabled="!mbEnablechekbox"/>
              </div>
              <div class="col-lg-3">
                       <span class="inputTEXTLBLcss">Phone Number : </span>
                       <input id="mbPhoneTXT" class="inputTEXTcss" placeholder="Phone Number" v-model="mbPhoneTXT" maxlength="10"  @keypress="isNumber($event)" :disabled="!mbEnablechekbox"/>
              </div>
              <div class="col-lg-3">
                       <span class="inputTEXTLBLcss">APN : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                       <input id="mbAPNTXT" class="inputTEXTcss" placeholder="APN address" v-model="mbAPNTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)" :disabled="!mbEnablechekbox"/>
              </div>
              </div>
              <p></p>
               <div class="row">
              <div class="col-lg-3" style="margin-top:20px;">
                       <input type="checkbox" id="mbEnablenetchekbox" v-model="mbEnablenethealthchekbox" :disabled="!mbEnablechekbox"/>
                       <label for="mbEnablenetchekbox" class="inputcheckTEXTLBLcss">Enable Network Health</label>
              </div>
              <div class="col-lg-3">
                       <span class="inputTEXTLBLcss">Ping IP : </span>
                       <input id="mbPingIPTXT" class="inputTEXTcss" placeholder="Ping IP" v-model="mbPingIPTXT" maxlength="32" @keydown.space.prevent :disabled="!mbEnablechekbox"/>
              </div>
              <div class="col-lg-3">
                       <span class="inputTEXTLBLcss">Ping Interval( In 5) : </span>
                       <input id="mbPingIntervalTXT" class="inputTEXTcss" placeholder="Ping Interval" v-model="mbPingIntervalTXT" @keydown.space.prevent :disabled="!mbEnablechekbox"/>
              </div>
              <div class="col-lg-3">
                       <span class="inputTEXTLBLcss">Num of Pings :</span>
                       <input id="mbNumofPingTXT" class="inputTEXTcss" placeholder="Num of Pings" v-model="mbNumofPingTXT" @keydown.space.prevent @keypress="isNumber($event)" :disabled="!mbEnablechekbox"/>
              </div>
              </div>
            </div>
          </div>
        </li>
        <!-- timeline 3333333333333333 -->
          <li>
          <i class="fa fa-desktop bg-green"></i>
          <div class="timeline-item">
            <!--   <span class="time"><i class="fa fa-cogs"></i>&nbsp;</span> -->
            <h3 class="timeline-header">NTP Settings</h3>
            <div class="timeline-body">
              <div class="row">
                <div class="col-lg-6"><span class="inputTEXTLBLcss"><i class="fa fa-desktop text-blue"></i> Server 1</span>
                   <div class="row">
                <div class="col-lg-4">
                       <span class="inputTEXTLBLcss">Choose State : </span>
                      <select id="ntpStatedwnTXT1" v-model="ntpStatedwnTXT1" class="inputTEXTcss">
                              <option value="Choose State" selected disabled>Choose State</option>
                              <option value="Enable">Enable</option>
                              <option value="Disable">Disable</option>
                      </select>
              </div>
              <div class="col-lg-4">
                       <span class="inputTEXTLBLcss">IP Address : </span>
                       <input id="ntpserverIPAddressTXT1" class="inputTEXTcss" placeholder="Server 1 IP Address" v-model="ntpserverIPAddressTXT1" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-4">
                       <span class="inputTEXTLBLcss">Port :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                       <input id="ntpserverPortTXT1" class="inputTEXTcss" placeholder="Server 1 Port" v-model="ntpserverPortTXT1" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
                </div>
                </div>
               <div class="col-lg-6"><span class="inputTEXTLBLcss"><i class="fa fa-desktop text-blue"></i> Server 2</span>
                   <div class="row">
                <div class="col-lg-4">
                       <span class="inputTEXTLBLcss">Choose State : </span>
                       <select id="ntpStatedwnTXT2" v-model="ntpStatedwnTXT2" class="inputTEXTcss">
                              <option value="Choose State" selected disabled>Choose State</option>
                              <option value="Enable">Enable</option>
                              <option value="Disable">Disable</option>
                      </select>
              </div>
              <div class="col-lg-4">
                       <span class="inputTEXTLBLcss">IP Address : </span>
                       <input id="ntpserverIPAddressTXT2" class="inputTEXTcss" placeholder="Server 2 IP Address" v-model="ntpserverIPAddressTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-4">
                       <span class="inputTEXTLBLcss">Port :  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                       <input id="ntpserverPortTXT2" class="inputTEXTcss" placeholder="Server 2 Port" v-model="ntpserverPortTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
                </div>
                </div>
              </div>
              <p></p>
              <div class="row">
                 <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">NTP Interval : </span>
                       <input id="ntpserverIntervalTXT" class="inputTEXTcss" placeholder="NTP Interval" v-model="ntpserverIntervalTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Communication Protocol : </span>
                        <select id="ntpservercommnicationdwnTXT2" v-model="ntpservercommnicationdwnTXT" class="inputTEXTcss">
                              <option value="Choose Protocol" selected disabled>Choose Protocol</option>
                      </select>
              </div>
              </div>
            </div>
          </div>
        </li>
        <!-- timeline 4444444 -->
          <li>
          <i class="fa fa-desktop bg-white"></i>
          <div class="timeline-item">
            <!--   <span class="time"><i class="fa fa-cogs"></i>&nbsp;</span> -->
            <h3 class="timeline-header">IEC-104 Settings</h3>
            <div class="timeline-body">
                <div class="row">
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Station Address : </span>
                       <input id="iecStationTXT" class="inputTEXTcss" placeholder="Station Address" v-model="iecStationTXT" maxlength="32" />
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">COT Size : </span>
                       <select id="iecCodsizedwnTXT" v-model="iecCodsizedwnTXT" class="inputTEXTcss">
                              <option value="Choose COT Size" selected disabled>Choose COT Size</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                      </select>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">Cyclic (In sec) : </span>
                       <input id="iecCylicTXT" class="inputTEXTcss" placeholder="Cyclic (In sec)" v-model="iecCylicTXT"  @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">IOA : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <select id="iecIOAsizedwnTXT" v-model="iecIOAsizedwnTXT" class="inputTEXTcss">
                              <option value="Choose IOA Size" selected disabled>Choose IOA Size</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                      </select>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">TSTA : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <select id="iecTSTAdwnTXT" v-model="iecTSTAdwnTXT" class="inputTEXTcss">
                              <option value="Choose TSTA" selected disabled>Choose TSTA</option>
                              <option value="Enable">Enable</option>
                              <option value="Disable">Disable</option>
                      </select>
              </div>
               <div class="col-lg-2">
                       <span class="inputTEXTLBLcss">TSTA Start Address :</span>
                       <input id="iecTSTAstartAddresTXT" class="inputTEXTcss" placeholder="TSTA Start Address" v-model="iecTSTAstartAddresTXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              </div>
              <p></p>
               <div class="row">
              <div class="col-lg-3">
                      <span class="inputTEXTLBLcss">Timeout T1 (In mil sec) :</span>
                       <input id="iecTimeout1TXT" class="inputTEXTcss" placeholder="Timeout T1 (In mil sec)" v-model="iecTimeout1TXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-3">
                       <span class="inputTEXTLBLcss">Timeout T2 (In mil sec) :</span>
                       <input id="iecTimeout2TXT" class="inputTEXTcss" placeholder="Timeout T2 (In mil sec)" v-model="iecTimeout2TXT" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              <div class="col-lg-3">
                       <span class="inputTEXTLBLcss">Timeout T3 (In mil sec) : </span>
                       <input id="iecTimeout3TXT" class="inputTEXTcss" placeholder="Timeout T3 (In mil sec)" v-model="iecTimeout3TXT" @keydown.space.prevent />
              </div>
              <div class="col-lg-3">
                       <span class="inputTEXTLBLcss">Port Number :</span>
                       <input id="iecTimeoutportTXT" class="inputTEXTcss" placeholder="Port Number" v-model="iecTimeoutportTXT" @keydown.space.prevent @keypress="isNumber($event)"/>
              </div>
              </div>
              <div style="height:15px;"></div>
              <div class="row">
                 <div class="col-lg-12">
                 <h4 class="timeline-header">Allowed Master Settings &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       <input type="checkbox" id="allowMastercheckbox" v-model="allowMastercheckbox"/>
                       <label for="allowMastercheckbox" class="inputcheckTEXTLBLcss">Enable </label></h4>
              </div></div>
                 <div class="row">
              <div class="col-lg-3">
                <input type="checkbox" id="allowMastercheckbox1" v-model="allowMastercheckbox1"/>&nbsp;&nbsp;
                       <span class="inputTEXTLBLcss"> Allowed Master1 : </span>
                       <input id="allowMasterTXT1" class="inputTEXTcss" placeholder="Allowed Master1 Address" v-model="allowMasterTXT1" maxlength="32" :disabled="!allowMastercheckbox1"/>
              </div>
               <div class="col-lg-3">
                 <input type="checkbox" id="allowMastercheckbox2" v-model="allowMastercheckbox2"/>&nbsp;&nbsp;
                       <span class="inputTEXTLBLcss">Allowed Master2 :</span>
                       <input id="allowMasterTXT2" class="inputTEXTcss" placeholder="Allowed Master2 Address" v-model="allowMasterTXT2" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)" :disabled="!allowMastercheckbox2"/>
              </div>
               <div class="col-lg-3">
                 <input type="checkbox" id="allowMastercheckbox3" v-model="allowMastercheckbox3"/>&nbsp;&nbsp;
                       <span class="inputTEXTLBLcss">Allowed Master3 :</span>
                       <input id="allowMasterTXT3" class="inputTEXTcss" placeholder="Allowed Master3 Address" v-model="allowMasterTXT3" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)" :disabled="!allowMastercheckbox3"/>
              </div>
               <div class="col-lg-3">
                 <input type="checkbox" id="allowMastercheckbox4" v-model="allowMastercheckbox4"/>&nbsp;&nbsp;
                       <span class="inputTEXTLBLcss">Allowed Master4 :</span>
                       <input id="allowMasterTXT4" class="inputTEXTcss" placeholder="Allowed Master4 Address" v-model="allowMasterTXT4" maxlength="32" @keydown.space.prevent @keypress="isNumber($event)" :disabled="!allowMastercheckbox4"/>
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
import CripNotice from 'crip-vue-notice'
import VueElementLoading from 'vue-element-loading'
export default {
  name: 'GeneralSetting',
  components: {
    VueElementLoading
  },
  data () {
    return {
      isLoading: false,
      enethernet1Checkbox: true,
      enethernet2Checkbox: false,
      lancurrentipaddressTXT: '',
      genLANNewIPTXT: '',
      gensubnetMaskIPTXT: '',
      genGatewayaddressIPTXT: '',
      lancurrentipaddressTXT2: '',
      genLANNewIPTXT2: '',
      gensubnetMaskIPTXT2: '',
      genGatewayaddressIPTXT2: '',
      gendebugipcheckbox: false,
      gendebugIPTXT: '',
      mbEnablechekbox: false,
      mbUsernameTXT: '',
      mbPasswordTXT: '',
      mbPhoneTXT: '',
      mbAPNTXT: '',
      mbEnablenethealthchekbox: false,
      mbPingIPTXT: '',
      mbPingIntervalTXT: '',
      mbNumofPingTXT: '',
      ntpStatedwnTXT1: 'Choose State',
      ntpserverIPAddressTXT1: '',
      ntpserverPortTXT1: '',
      ntpStatedwnTXT2: 'Choose State',
      ntpserverIPAddressTXT2: '',
      ntpserverPortTXT2: '',
      ntpserverIntervalTXT: '',
      ntpservercommnicationdwnTXT: 'Choose Protocol',
      iecStationTXT: '',
      iecCodsizedwnTXT: 'Choose COT Size',
      iecCylicTXT: '',
      iecIOAsizedwnTXT: 'Choose IOA Size',
      iecTSTAdwnTXT: 'Choose TSTA',
      iecTSTAstartAddresTXT: '',
      iecTimeout1TXT: '',
      iecTimeout2TXT: '',
      iecTimeout3TXT: '',
      iecTimeoutportTXT: '',
      allowMastercheckbox: false,
      allowMastercheckbox1: false,
      allowMastercheckbox2: false,
      allowMastercheckbox3: false,
      allowMastercheckbox4: false,
      allowMasterTXT1: '',
      allowMasterTXT2: '',
      allowMasterTXT3: '',
      allowMasterTXT4: ''
    }
  },
  mounted () {
    // this.isLoading = true
    let innerMinHeight = window.innerHeight - 130 + 'px'
    document.getElementById('generalsettingPagePANE').style.minHeight = innerMinHeight
  },
  created () {
    this.infoMessage('Welcome to RTU 2000')
    this.isLoading = true
    setTimeout(this.isLoading = false, 5000)
  },
  methods: {
    isNumber: function(evt) {
      evt = (evt) ? true : window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
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
}
</script>
<style>
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
.inputTEXTLBLcss{
 font-size: 15px;
}
.inputcheckTEXTLBLcss{
  font-size: 15px;
  font-weight: 500
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
</style>
