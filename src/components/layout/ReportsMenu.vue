<template>
  <li class="">
    <a href="javascript:;" class="" data-toggle="" @click="alertmeg()">
      <i class="fa fa-file"></i> Reports
    </a>
  </li>
</template>

<script>
import { mapState } from "vuex";
import MessageItem from "./MessageItem";

export default {
  name: "ReportsMenu",
  components: {
    MessageItem,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
  alertmeg(){
      alert('Need to implement');
      return false;
    },
  },
};
</script>
