<template>
  <!-- Main content -->
  <section class="content">
    <!-- GitHub hint -->
    <div class="row">
      <!-- Info boxes -->
      <div class="col-md-1 col-sm-6 col-xs-12"></div>
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span
          class="dataav-theme"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Today&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box">
          <span class="dataav-theme info-box-icon" style="width: 60px;">
            <i class="fa fa-bookmark" style="color:#fff"></i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">60%</span>
            <span class="info-box-number text-right" style="font-size:13px;margin-top:7px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> 29-May-2020 10:19
            </span>
          </div>
        </div>
      </div>
      <!-- /.col -->
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span
          class="dataav-theme2"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Daily Avg&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box">
          <span class="dataav-theme2 info-box-icon" style="width: 60px;">
            <i class="fa fa-bookmark" style="color:#fff"></i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">96%</span>
            <span class="info-box-number text-right" style="font-size:13px;margin-top:7px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> 29-May-2020 10:19
            </span>
          </div>
        </div>
      </div>
      <!-- /.col -->

      <!-- fix for small devices only -->

      <div class="col-md-2 col-sm-6 col-xs-12">
        <span
          class="dataav-theme"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Monthly Avg&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box">
          <span class="dataav-theme info-box-icon" style="width: 60px;">
            <i class="fa fa-bookmark" style="color:#fff"></i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">94%</span>
            <span class="info-box-number text-right" style="font-size:13px;margin-top:7px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> 29-May-2020 10:19
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span
          class="dataav-theme2"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;> 90 % Count&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box">
          <span class="dataav-theme2 info-box-icon" style="width: 60px;">
            <i class="fa fa-bookmark" style="color:#fff"></i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">800 / 920</span>
            <span class="info-box-number text-right" style="font-size:13px;margin-top:7px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> 29-May-2020 10:19
            </span>
          </div>
        </div>
      </div>
      <!-- /.col -->
      <div class="col-md-2 col-sm-6 col-xs-12">
        <span
          class="dataav-theme"
          style="border-radius:5px;font-weight: bolder;font-style: italic;color:#fff"
        >&nbsp;&nbsp;&nbsp;&nbsp;Date&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="info-box">
          <span class="dataav-theme info-box-icon" style="width: 60px;">
            <i class="fa fa-bookmark" style="color:#fff"></i>
          </span>
          <div class="info-box-content">
            <span class="info-box-text" style="font-size:38px;margin-left: -50px;">16:40:20</span>
            <span class="info-box-number text-right" style="font-size:13px;margin-top:7px">
              <i class="fa fa-calendar-check-o" aria-hidden="true"></i> 26-May-2020
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-1 col-sm-6 col-xs-12"></div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <!-- /.row -->

    <!-- Main row -->
    <div class="row">
      <div class="col-md-7 col-sm-6 col-xs-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">Data Availability Status</h3>

            <div class="text-right btn-group" style="float:right" role="group">
              <button id="WeekBTN" type="button" class="btn btn-primary active">Week</button>
              <button id="MonthBTN" type="button" class="btn btn-primary">Month</button>
            </div>&nbsp; &nbsp;
            <div style="float:right">
              <select
                id="chartTypeTEXT"
                v-model="chartTypeTEXT"
                class="inputTEXTcss"
                style="width:135px;height: 35px;"
              >
                <option value="Choose chart type" selected disabled>Choose chart type</option>
                <option value="Line">Line</option>
                <option value="Bar">Bar</option>
              </select>
            </div>
          </div>
          <div class="box-body">
            <apexchart
              width="100%"
              height="300"
              type="line"
              :options="dataoptions"
              :series="dataseries"
            ></apexchart>
          </div>
        </div>
      </div>
      <!-- /.col -->
      <div class="col-md-5 col-sm-6 col-xs-12">
        <div class="box">
          <div class="box-header with-border">
            <h3 class="box-title">Data Availability %</h3>
            <div class="text-right" style="float:right">
              <div class="text-right btn-group" style="float:right" role="group">
                <button id="WeekBTN" type="button" class="btn btn-primary active">Day</button>
                <button id="WeekBTN" type="button" class="btn btn-primary">Week</button>
                <button id="MonthBTN" type="button" class="btn btn-primary">Month</button>
              </div>
            </div>
          </div>
          <div class="box-body">
            <apexchart
              width="100%"
              height="300"
              type="bar"
              :options="hzdataoptions"
              :series="hzdataseries"
            ></apexchart>
          </div>
        </div>
      </div>

      <!-- /.col -->
    </div>

    <div class="row">
      <div class="col-md-7 col-sm-6 col-xs-12">
        <div class="box" style="height:400px;">
          <div class="box-header with-border">
            <h3 class="box-title">
              Data Availability Status
              <span style="font-size:15px;">by Circle / Division / Sub Division</span>
            </h3>
            <div class="text-right btn-group" style="float:right" role="group">
              <button id="WeekBTN" type="button" class="btn btn-primary active">Week</button>
              <button id="MonthBTN" type="button" class="btn btn-primary">Month</button>
            </div>&nbsp; &nbsp; &nbsp; &nbsp;
            <div style="float:right">
              <select
                id="circleTXT"
                v-model="circleTXT"
                class="inputTEXTcss"
                style="width:105px;height: 35px;"
              >
                <option value="Choose circle" selected disabled>Choose circle</option>
              </select>
              <select
                id="divisionTXT"
                v-model="divisionTXT"
                class="inputTEXTcss"
                style="width:120px;height: 35px;"
              >
                <option value="Choose division" selected disabled>Choose division</option>
              </select>
              <select
                id="subdivisionTXT"
                v-model="subdivisionTXT"
                class="inputTEXTcss"
                style="width:145px;height: 35px;"
              >
                <option value="Choose sub division" selected disabled>Choose sub division</option>
              </select>
            </div>
          </div>
          <div class="box-body">
            <div class="col-sm-12 col-xs-12">
              <apexchart
                width="100%"
                height="300"
                type="line"
                :options="circledataoptions"
                :series="circledataseries"
              ></apexchart>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 col-sm-6 col-xs-12">
        <div class="box" style="height:400px;">
          <div class="box-header with-border">
            <h3 class="box-title">View</h3>
            <div class="text-right btn-group" style="float:right" role="group">
              <button id="WeekBTN" type="button" class="btn btn-primary active">Week</button>
              <button id="MonthBTN" type="button" class="btn btn-primary">Month</button>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div class="box-body" v-show="false">
            <apexchart
              type="heatmap"
              height="315"
              :options="heatmapchartOptions"
              :series="heatmapseries"
            ></apexchart>
          </div>
          <div class="box-body" v-show="true">
            <div style="float:right">
            <img src="/static/img/images/red15.png"> 0 - 20%
            <img src="/static/img/images/yellow15.png"> 21 - 50%
            <img src="/static/img/images/perul15.png"> 51 - 80%
            <img src="/static/img/images/green15.png"> 81 - 100% </div>
            <div style="height:1  5px"></div>
            <table
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
                      style="max-width:100px;width:100px;height: 50px;text-align:center;background-color:#c60909;color:#fff;font-weight:bold"
                      v-if="row.percentage >= 0 && row.percentage <= 20"
                    >
                     <span style="text-align:right;">{{row.date}}</span> <br />
                      <span>{{row.percentage}}%</span>
                      <br />
                      <span>{{row.value}}</span>
                       
                      
                    </td>
                    <td
                      style="max-width:100px;width:100px;height: 50px;text-align:center;background-color:#8c600e;color:#fff;font-weight:bold"
                      v-if="row.percentage >= 21 && row.percentage <= 50"
                    >
                      <span>{{row.date}}</span>
                      <br />
                      <span>{{row.percentage}}%</span>
                      <br />
                      <span>{{row.value}}</span>
                    </td>
                    <td
                      style="max-width:100px;width:100px;height: 50px;text-align:center;background-color:#1c1c44;color:#fff;font-weight:bold"
                      v-if="row.percentage >= 51 && row.percentage <= 80"
                    >
                      <span>{{row.date}}</span>
                      <br />
                      <span>{{row.percentage}}%</span>
                      <br />
                      <span>{{row.value}}</span>
                    </td>
                    <td
                      style="max-width:100px;width:100px;height: 50px;text-align:center;background-color:#006000;color:#fff;font-weight:bold"
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
    <!-- /.row -->
  </section>
  <!-- /.content -->
</template>
<script>
import Vue from "vue";
// import axios from 'axios'
// import $ from 'jquery'
import VueApexCharts from "vue-apexcharts";
import { dashboardeventsJSON, circleTableJson } from "../../demo";
Vue.component("apexchart", VueApexCharts);
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      dashboardeventsJSON: dashboardeventsJSON,
      circleTableJson: circleTableJson,
      chartTypeTEXT: "Choose chart type",
      circleTXT: "Choose circle",
      divisionTXT: "Choose division",
      subdivisionTXT: "Choose sub division",
      divLength: 6,
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
      dataoptions: {
        chart: {
          type: "bar",
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
        colors: ["#032457", "#ec0000"],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          title: {
            text: "Month"
          }
        },
        yaxis: {
          title: {
            text: "Range"
          }
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true
        }
      },
      dataseries: [
        {
          name: "Online",
          data: [28, 29, 33, 36, 32, 32, 33]
        }
      ],
      hzdataoptions: {
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
          categories: ["> 90 %", "60 - 90 %", "20 - 50 %", "< 20 %"],
          title: {
            text: "No of DCU"
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
      hzdataseries: [
        {
          name: "Online",
          data: [3, 36, 32, 33]
        }
      ],
      circledataoptions: {
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
        colors: ["#032457", "#ec0000", "#174b79"],
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May"],
          title: {
            text: "Value"
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
      circledataseries: [
        {
          name: "Online",
          data: [30, 32, 32, 34, 33]
        }
      ],
      heatmapseries: [
        {
          name: "Jan",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Feb",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Mar",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Apr",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "May",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Jun",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Jul",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        },
        {
          name: "Aug",
          data: this.generateData(20, {
            min: -30,
            max: 55
          })
        }
      ],
      heatmapchartOptions: {
        chart: {
          height: 450,
          type: "heatmap",
          toolbar: {
            show: false
          }
        },
        dataLabels: {
          enabled: true
        },
        colors: ["#032457", "#ec0000", "#174b79"],
        xaxis: {
          type: "category",
          categories: [
            "10:00",
            "10:30",
            "11:00",
            "11:30",
            "12:00",
            "12:30",
            "01:00",
            "01:30"
          ]
        },
        grid: {
          padding: {
            right: 20
          }
        }
      },
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
    this.countlength = parseInt(
      this.heatmapArrayList.length / this.divLength +
        (this.heatmapArrayList.length % this.divLength == 0 ? 0 : 1)
    );
  },
  created() {},
  methods: {
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      };
    },
    toggleInfo: function(marker, key) {
      this.infoPosition = this.getPosition(marker);
      this.infoContent = marker.full_name;
      if (this.infoCurrentKey === key) {
        this.infoOpened = !this.infoOpened;
      } else {
        this.infoOpened = true;
        this.infoCurrentKey = key;
      }
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
    }
  }
};
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
.dataav-theme {
  background-color: #032457 !important;
}
.dataav-theme2 {
  background-color: #3e2a2a !important;
}
.inputTEXTcss {
  border: 1px solid lightgray;
  width: 100%;
  height: 30px;
}
</style>
