<!--单独作为一个页面-->
<template>
  <view-box ref="viewBox"  body-padding-top="46px" body-padding-bottom="0" style="background: #f3f3f3;">
    <img src="static/working.png" alt="" style="width: 100%;height: auto">
  </view-box>
</template>
<script>
  import { Group, Cell, Badge, ViewBox, XHeader,Flexbox,FlexboxItem,Icon,Popup,XButton,XTextarea,TransferDom} from 'vux'
  import { mapState, mapActions } from 'vuex'
  import VueBetterScroll  from 'vue2-better-scroll'
  import '@/lib/share/js/social-share'
  import '@/lib/share/js/qrcode'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Group,
      Cell,
      ViewBox,
      XHeader,
      XTextarea,
      Flexbox,
      FlexboxItem,
      Icon,
      Popup,
      XButton,
      VueBetterScroll
    }
  }
</script>

