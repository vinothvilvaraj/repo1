<template>
  <li class="dropdown messages-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <i class="fa fa-star"></i> SS Data <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li>
        <ul class="menu text-left" style="cursor: pointer">
          <li @click="calEditDataMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/dataedit">
                <i class="fa fa-edit" style="color:#1a495e;"></i>
                <span class="page"> Edit Data </span>
              </router-link>
            </a>
          </li>
          <li @click="calViewSSUploadMethod()">
            <a>
              <router-link tag="li" class="pageLink" to="/tangedco/cdfupload">
                <i class="fa fa-eye" style="color:#1a495e;"></i>
                <span class="page"> View SS Upload  </span>
              </router-link>
            </a>
          </li>
        </ul>
      </li>
      <li>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapState } from "vuex";
import MessageItem from "./MessageItem";
export default {
  name: "SsdataMenu",
  components: {
    MessageItem,
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
    calViewSSUploadMethod(){
        this.$router.push({ path: '/tangedco/cdfupload' });
    },
    calEditDataMethod(){
        this.$router.push({ path: '/tangedco/dataedit' });
    },
  },
};
</script>
