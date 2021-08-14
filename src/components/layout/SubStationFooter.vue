<template>
  <footer class="main-footer" style="margin-left:0px">
    <div class="row">
     <div class="col-lg-4 text-left">
           <span> &copy; {{ year }}, Creative Micro Systems </span>
           <a href="https://www.cmsgp.com"  target="_blank"> - www.cmsgp.com</a>
     </div>
     <div class="col-lg-4 text-center">
       <span>Product Support: +91-97419-66060 E-mail: support@cmsgp.com</span>
    </div>
     <div class="col-lg-4 text-right">
         <span>Product Enquiries: +91-9686703878 E-mail: sales@cmsgp.com</span>
         </div>
      </div>
  </footer>
</template>

<script>
export default {
  name: 'SubStationFooter',
  data: function () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>

.main-footer {
    background:#fff;
    padding: 5px;
    color:#444;
    border-top: 1px solid #d2d6de;
}
</style>
