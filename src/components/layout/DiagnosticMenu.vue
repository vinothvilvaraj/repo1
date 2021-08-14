<template>
  <li style="cursor:pointer" @click="calDiagnosticMethod()">
    <a>
       <router-link tag="li" class="pageLink" to="/tangedco/diag">
                <i class="fa fa-bars" ></i>
                <span> Diagnostic </span>
       </router-link>
    </a>
  </li>
</template>

<script>
import { mapState } from "vuex";
import MessageItem from "./MessageItem";

export default {
  name: "DiagnosticMenu",
  components: {
    MessageItem,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
    calDiagnosticMethod(){
      this.$router.push({ path: '/tangedco/diag' });
    },
  },
};
</script>
