<template>
  <div class="container-fluid">
    <div class="row">
      <p></p>
       <div class="col-lg-12">
                                  <span>
                                    <b>Choose Operation :</b>
                                  </span>
                                  <select
                                    class="dropdownOuterCss"
                                    id="operationSelTXTID"
                                    v-model="operationSelTXT" @change="changeoperationMethod(operationSelTXT)"
                                  >
                                    <option
                                      selected
                                      disabled
                                      value="choose operation"
                                    >choose operation</option>
                                    <option
                                      v-for="items in operationListArray"
                                      v-bind:value="items.name"
                                      v-bind:key="items.id"
                                    >{{ items.name }}</option>
                                  </select>
                                  &nbsp;	&nbsp;
                                  <span v-show="operationSelTXT !='choose operation'">
                                    <b>Choose Circle :</b>
                                  </span>
                                  <select v-show="operationSelTXT !='choose operation'"
                                    class="dropdownOuterCss"
                                    id="operationSelTXTID" v-model="circleSelTXT">
                                    <option
                                      selected
                                      disabled
                                      value="choose circle"
                                    >choose circle</option>
                                    <option
                                      v-for="items in circleListArray"
                                      v-bind:value="items.name"
                                      v-bind:key="items.id"
                                    >{{ items.name }}</option>
                                  </select>
                                  &nbsp;	&nbsp;
                                  <span v-show="operationSelTXT !='choose operation' && operationSelTXT !='Circle wise'">
                                    <b>Choose Division :</b>
                                  </span>
                                  <select v-show="operationSelTXT !='choose operation' && operationSelTXT !='Circle wise'"
                                    class="dropdownOuterCss"
                                    id="divisionSelTXTID"
                                    v-model="divisionSelTXT"
                                  >
                                    <option
                                      selected
                                      disabled
                                      value="choose division"
                                    >choose division</option>
                                    <option
                                      v-for="items in divisionListArray"
                                      v-bind:value="items.name"
                                      v-bind:key="items.id"
                                    >{{ items.name }}</option>
                                  </select>
                                  &nbsp;	&nbsp;
                                  <span v-show="operationSelTXT !='choose operation' && operationSelTXT !='Circle wise' && operationSelTXT !='Division wise'">
                                    <b>Choose Sub Division :</b>
                                  </span>
                                  <select v-show="operationSelTXT !='choose operation' && operationSelTXT !='Circle wise' && operationSelTXT !='Division wise'"
                                    class="dropdownOuterCss"
                                    id="subdivisionSelTXTID"
                                    v-model="subdivisionSelTXT"
                                  >
                                    <option
                                      selected
                                      disabled
                                      value="choose sub division"
                                    >choose sub division</option>
                                    <option
                                      v-for="items in subdivisionListArray"
                                      v-bind:value="items.name"
                                      v-bind:key="items.id"
                                    >{{ items.name }}</option>
                                  </select>
                                  &nbsp;	&nbsp;
                                  <span v-show="operationSelTXT !='choose operation' && operationSelTXT !='Circle wise' && operationSelTXT !='Division wise' && operationSelTXT !='Sub Division wise'">
                                    <b>Choose Sub Station :</b>
                                  </span>
                                  <select v-show="operationSelTXT !='choose operation' && operationSelTXT !='Circle wise' && operationSelTXT !='Division wise' && operationSelTXT !='Sub Division wise'"
                                    class="dropdownOuterCss"
                                    id="substationSelTXTID"
                                    v-model="substationSelTXT"
                                  >
                                    <option
                                      selected
                                      disabled
                                      value="choose sub station"
                                    >choose sub station</option>
                                    <option
                                      v-for="items in substationListArray"
                                      v-bind:value="items.name"
                                      v-bind:key="items.id"
                                    >{{ items.name }}</option>
                                  </select>
                                  	&nbsp;	&nbsp;
                                  <Button type="button" class="btn btn-success" @click="submitAction">Submit</Button>
      </div>
    </div>
    <p></p>
       <div class="row">
        <div class="col-lg-2" v-for="(gridItems, index) in gridCardJson" :key="index">
        <div class="card">
          <div class="card-header">
            <p></p>
           <img src="/static/img/images/locationicon.png" width="35"/>
          </div>
          <div class="card-body" style="padding:0px;">
             <h4><b>{{gridItems.name}}</b></h4>
             <span><i class="fa fa-circle" style="color:green" aria-hidden="true"></i> 5</span> &nbsp;	&nbsp; &nbsp;	&nbsp;
             <span><i class="fa fa-desktop" style="color:green" aria-hidden="true"></i> 5</span>
          </div>
          <div class="card-footer">
          </div>
           <p></p>
        </div>
           </div>
       </div>
  </div>
</template>
<script>
import Vue from "vue";
import { gridCardJson, operationListArray, circleListArray, divisionListArray, subdivisionListArray, substationListArray } from "../../demo";
// import axios from 'axios'
// import $ from 'jquery'
export default {
  name: "check",
  components: {  },
  data() {
    return {
      operationSelTXT:"choose operation",
      circleSelTXT: "choose circle",
      divisionSelTXT: "choose division",
      subdivisionSelTXT: "choose sub division",
      substationSelTXT: "choose sub station",
      operationListArray:operationListArray,
      circleListArray:circleListArray,
      divisionListArray:divisionListArray,
      subdivisionListArray:subdivisionListArray,
      substationListArray:substationListArray,
      gridCardJson:gridCardJson,
      
    }
  },
  components: {},
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
  mounted() {},
  created() {
  },
  methods: {
    submitAction(){

    }
  }
};
</script>
<style scoped>
.dropdownOuterCss {
  height: 30px;
  background: transparent;
  border: 1px solid lightgray;
  width: 10%;
  font-size: 1em;
}
.card{
  text-align: center;
  width:100%;
  margin:5px;
  border-radius:5px;
      position: relative;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,0.125);
    border-radius: .25rem;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
}
</style>