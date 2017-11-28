<template>
  <div style="background: #f4f4f4;height: 100%">
     <view-box>

     </view-box>
  </div>
</template>
<script>
  import { ViewBox, XSwitch, Group, Checker, CheckerItem} from 'vux'
  import {mapGetters, mapState} from 'vuex'
  import CommonHeader  from '@/components/CommonHeader'
  export default {
    components: {
      CommonHeader,
      ViewBox,
      XSwitch,
      Group,
      Checker,
      CheckerItem
    },
    created:function () {

    },
    data(){
      return {

      }
    },
    computed: {

    },
    methods: {

    }
  }
</script>
<style lang="less" rel="stylesheet/less">

</style>
