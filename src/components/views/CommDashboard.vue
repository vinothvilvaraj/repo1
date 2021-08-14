<template>
  <!-- Main content -->
  <section class="content">
    <!-- GitHub hint -->
    <div class="row">
      <!-- Info boxes -->
        <div class="col-md-1 col-sm-6 col-xs-12">
       </div>
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span class="bg-theme" style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff">&nbsp;&nbsp;&nbsp;&nbsp;Online&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <div class="info-box">
     <span class="bg-theme info-box-icon" style="width: 60px;">
      <i class="fa fa-bookmark" style="color:#fff"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text" style="font-size:38px;margin-left: -50px;">800 / 920</span>
      <span class="info-box-number text-right" style="font-size:13px;margin-top:7px"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> 26-05-2020 10:19</span>
    </div>
  </div>
      </div>
      <!-- /.col -->
      <div class="col-md-2 col-sm-6 col-xs-12">
           <span class="bg-theme2" style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff">&nbsp;&nbsp;&nbsp;&nbsp;Weekly Avg&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <div class="info-box">
     <span class="bg-theme2 info-box-icon"  style="width: 60px;">
      <i class="fa fa-bookmark" style="color:#fff"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text" style="font-size:38px;margin-left: -50px;">800 / 920</span>
      <span class="info-box-number text-right" style="font-size:13px;margin-top:7px"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> 26-05-2020 10:19</span>
    </div>
  </div>
      </div>
      <!-- /.col -->

      <!-- fix for small devices only -->
     
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span class="bg-theme" style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff">&nbsp;&nbsp;&nbsp;&nbsp;Monthly Avg&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box">
     <span class="bg-theme info-box-icon" style="width: 60px;">
      <i class="fa fa-bookmark" style="color:#fff"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text" style="font-size:38px;margin-left: -50px;">800 / 920</span>
      <span class="info-box-number text-right" style="font-size:13px;margin-top:7px"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> 26-05-2020 10:19</span>
    </div>
  </div>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-12">
          <span class="bg-theme2" style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff">&nbsp;&nbsp;&nbsp;&nbsp;> 90 % Avg&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box">
     <span class="bg-theme2 info-box-icon" style="width: 60px;">
      <i class="fa fa-bookmark" style="color:#fff"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text" style="font-size:38px;margin-left: -50px;">800 / 920</span>
      <span class="info-box-number text-right" style="font-size:13px;margin-top:7px"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> 26-05-2020 10:19</span>
    </div>
  </div>
      </div>
      <!-- /.col -->
      <div class="col-md-2 col-sm-6 col-xs-12">
            <span class="bg-theme" style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff">&nbsp;&nbsp;&nbsp;&nbsp;Date&nbsp;&nbsp;&nbsp;&nbsp;</span>
           <div class="info-box">
     <span class="bg-theme info-box-icon" style="width: 60px;">
      <i class="fa fa-bookmark" style="color:#fff"></i>
    </span>
    <div class="info-box-content">
      <span class="info-box-text" style="font-size:38px;margin-left: -50px;">16:40:20</span>
      <span class="info-box-number text-right" style="font-size:13px;margin-top:7px"><i class="fa fa-calendar-check-o" aria-hidden="true"></i> 26-05-2020</span>
    </div>
  </div>
      </div>
       <div class="col-md-1 col-sm-6 col-xs-12">
       </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    
    <!-- /.row -->

    <!-- Main row -->
    <div class="row">
      <div class="col-md-7 col-sm-6 col-xs-12">
    <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Communication Status</h3>
          
          <div class="text-right btn-group" style="float:right" role="group">
                                        <button
                                            id="WeekBTN"
                                            type="button"
                                            class="btn btn-primary active"
                                          >Week</button>
                                          <button
                                            id="MonthBTN"
                                            type="button"
                                            class="btn btn-primary"
                                          >Month</button>
                                        </div>	&nbsp;	&nbsp;
                                         <div style="float:right">
           <select id="chartTypeTEXT" v-model="chartTypeTEXT" class="inputTEXTcss" style="width:135px;height: 35px;">
                              <option value="Choose chart type" selected disabled>Choose chart type</option>
                              <option value="Line">Line</option>
                              <option value="Bar">Bar</option>
             </select>
           </div>
        </div>
         <div class="box-body">
  <apexchart width="100%" height="300" type="line" :options="dataoptions" :series="dataseries"></apexchart>
          </div>
</div>
      </div>
      <!-- /.col -->
      <div class="col-md-5 col-sm-6 col-xs-12">
   <div class="box">
        <div class="box-header with-border">
          <h3 class="box-title">Connectivity %</h3>
         <div class="text-right" style="float:right">
          <div class="text-right btn-group" style="float:right" role="group">
                                        <button
                                            id="WeekBTN"
                                            type="button"
                                            class="btn btn-primary active"
                                          >Week</button>
                                          <button
                                            id="MonthBTN"
                                            type="button"
                                            class="btn btn-primary"
                                          >Month</button>
                                        </div>
        </div>
        </div>
          <div class="box-body">
 <apexchart width="100%" height="300" type="bar" :options="hzdataoptions" :series="hzdataseries"></apexchart>
          </div>
</div>
      </div>
     
      <!-- /.col -->
    </div>

    <div class="row">
 <div class="col-md-7 col-sm-6 col-xs-12">
      <div class="box" style="height:370px;">
        <div class="box-header with-border">
          <h3 class="box-title">Communication Status  <span style="font-size:15px;">by Circle / Division / Sub Division </span></h3>
           <div class="text-right btn-group" style="float:right" role="group">
                                        <button
                                            id="WeekBTN"
                                            type="button"
                                            class="btn btn-primary active"
                                          >Week</button>
                                          <button
                                            id="MonthBTN"
                                            type="button"
                                            class="btn btn-primary"
                                          >Month</button>
                                        </div>	&nbsp;	&nbsp;	&nbsp;	&nbsp;
            <div style="float:right">
           <select id="circleTXT" v-model="circleTXT" class="inputTEXTcss" style="width:105px;height: 35px;">
                              <option value="Choose circle" selected disabled>Choose circle</option>
             </select>
             <select id="divisionTXT" v-model="divisionTXT" class="inputTEXTcss" style="width:120px;height: 35px;">
                              <option value="Choose division" selected disabled>Choose division</option>
             </select>
              <select id="subdivisionTXT" v-model="subdivisionTXT" class="inputTEXTcss" style="width:145px;height: 35px;">
                              <option value="Choose sub division" selected disabled>Choose sub division</option>
             </select>
           </div>
          
        </div>
       <div class="box-body">
            <div class="col-sm-12 col-xs-12">
            <apexchart width="100%" height="300" type="line" :options="circledataoptions" :series="circledataseries"></apexchart>
            </div>
          </div>
      </div>
      </div>
      <div class="col-md-5 col-sm-6 col-xs-12">
      <div class="box" style="height:370px;">
        <div class="box-header with-border">
          <h3 class="box-title">Toggling Modem</h3>
              <div class="text-right btn-group" style="float:right" role="group">
                                        <button
                                            id="WeekBTN"
                                            type="button"
                                            class="btn btn-primary active"
                                          >Week</button>
                                          <button
                                            id="MonthBTN"
                                            type="button"
                                            class="btn btn-primary"
                                          >Month</button>
                                        </div>	&nbsp;&nbsp;&nbsp;&nbsp;
          <div style="float:right">
           <select id="circleTXT" v-model="circleTXT" class="inputTEXTcss" style="width:105px;height: 35px;">
                              <option value="Choose circle" selected disabled>Choose circle</option>
             </select>
             <select id="divisionTXT" v-model="divisionTXT" class="inputTEXTcss" style="width:120px;height: 35px;">
                              <option value="Choose division" selected disabled>Choose division</option>
             </select>
              <select id="subdivisionTXT" v-model="subdivisionTXT" class="inputTEXTcss" style="width:145px;height: 35px;">
                              <option value="Choose sub division" selected disabled>Choose sub division</option>
             </select>
           </div>
        </div>
     <div class="box-body">
     <apexchart width="100%" height="315" type="bar" :options="toggledataoptions" :series="toggledataseries"></apexchart>
     </div>
      </div>
      </div>
    </div>
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>
<script>
import Vue from 'vue'
// import axios from 'axios'
// import $ from 'jquery'
import VueApexCharts from 'vue-apexcharts'
import {dashboardeventsJSON, circleTableJson} from '../../demo'
Vue.component('apexchart', VueApexCharts)
export default {
  name: 'Dashboard',
  components: {
  },
  data () {
    return {
      dashboardeventsJSON: dashboardeventsJSON,
      circleTableJson: circleTableJson,
      chartTypeTEXT: 'Choose chart type',
      circleTXT: 'Choose circle',
      divisionTXT: 'Choose division',
      subdivisionTXT: 'Choose sub division',
      dataoptions: {
        chart: {
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#177950', '#ec0000'],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          title: {
            text: 'Month'
          }
        },
        yaxis: {
          title: {
            text: 'Range'
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true
        }
      },
      dataseries: [
        {
          name: "Online",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Offline",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
      hzdataoptions: {
        chart: {
          dropShadow: {
            enabled: true,
            color: '#000',
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
              position: 'top'
            }
          }
        },
        colors: ['#177950', '#ec0000'],
        xaxis: {
          categories: ['> 90 %', '80 - 90 %', '70 - 50 %', '50 - 20 %', '< 20 %'],
          title: {
            text: 'No of DCU'
          }
        },
        yaxis: {
          title: {
            text: 'Percentage'
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true
        }
      },
      hzdataseries: [
        {
          name: "Online",
          data: [3, 36, 32, 32, 33]
        },
        {
          name: "Offline",
          data: [14, 18, 17, 13, 13]
        }
      ],
      circledataoptions: {
        chart: {
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
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
              position: 'top'
            }
          }
        },
        colors: ['#177950', '#ec0000', '#174b79'],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
          title: {
            text: 'Value'
          }
        },
        yaxis: {
          title: {
            text: 'Percentage'
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true
        }
      },
      circledataseries: [
        {
          name: "Online",
          data: [3, 36, 32, 32, 33]
        },
        {
          name: "Offline",
          data: [14, 18, 17, 13, 13]
        },
        {
          name: "Online",
          data: [30, 6, 2, 2, 3]
        }
      ],
      toggledataoptions: {
        chart: {
          dropShadow: {
            enabled: true,
            color: '#000',
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
            horizontal: false,
            dataLabels: {
              position: 'top'
            }
          }
        },
        colors: ['#177950', '#ec0000'],
        xaxis: {
          categories: ['> 90 %', '80 - 90 %', '70 - 50 %', '50 - 20 %', '< 20 %'],
          title: {
            text: 'Value'
          }
        },
        yaxis: {
          title: {
            text: 'Percentage'
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true
        }
      },
      toggledataseries: [
        {
          name: "Toggling",
          data: [3, 36, 32, 32, 2]
        }
      ],
      generateRandomNumbers (numbers, max, min) {
        var a = []
        for (var i = 0; i < numbers; i++) {
          a.push(Math.floor(Math.random() * (max - min + 1)) + max)
        }
        return a
      }
    }
  },
  computed: {
    coPilotNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    personalNumbers () {
      return this.generateRandomNumbers(12, 1000000, 10000)
    },
    isMobile () {
      return (window.innerWidth <= 800 && window.innerHeight <= 600)
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    toggleInfo: function(marker, key) {
      this.infoPosition = this.getPosition(marker)
      this.infoContent = marker.full_name
      if (this.infoCurrentKey === key) {
        this.infoOpened = !this.infoOpened
      } else {
        this.infoOpened = true
        this.infoCurrentKey = key
      }
    },
    changeDDMMYYYYFORMAT(oldtime) {
      var today = new Date(oldtime)
      var yyyy = today.getFullYear()
      var mm = today.getMonth() + 1
      var dd = today.getDate()
      var hh = today.getHours()
      var min = today.getMinutes()
      var sec = today.getSeconds()
      if (mm < 10) {
        mm = "0" + mm
      }
      if (dd < 10) {
        dd = "0" + dd
      }
      if (hh < 10) {
        hh = "0" + hh
      }
      if (min < 10) {
        min = "0" + min
      }
      if (sec < 10) {
        sec = "0" + sec
      }
      var date = dd + "-" + mm + "-" + yyyy
      return date
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
.bg-theme{
  background-color: #177950 !important;
}
.bg-theme2{
  background-color: #3c97e8 !important;
}
.inputTEXTcss{
  border: 1px solid lightgray;
  width: 100%;
  height: 30px;
}
</style>
