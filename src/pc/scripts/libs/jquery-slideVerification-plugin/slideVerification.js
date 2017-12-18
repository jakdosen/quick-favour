/**
 * Created by shiyang.yao on 2017/12/18.
 */
export default function($, window, document, undefined) {
  var $window = $(window);

  var SliderVerification = function (elem) {
    var self = this;
    this.$box = elem||document.getElementById('verify_box');
    this.$xbox = this.$elem.find('#verify_xbox');
    this.$element = this.$elem.find('#btn');
    this.$b = this.$box.offsetWidth;
    this.$o = this.$element.offsetWidth;
  };

  SliderVerification.prototype={
    inital: function () {
      this.$element.ondragstart = function() {
        return false;
      };
      this.$element.onselectstart = function() {
        return false;
      };
      this.$element.onmousedown = function(e) {
        var disX = e.clientX - this.$element.offsetLeft;
        document.onmousemove = function (e) {
          var l = e.clientX - disX +this.$o;
          if(l<this.$o){
            l=this.$o
          }
          if(l>this.$b){
            l=this.$b
          }
          this.$xbox.style.width = l + 'px';
        };
        document.onmouseup = function (e){
          var l = e.clientX - disX +this.$o;
          if(l<this.$b){
            l=this.$o
          }else{
            l=this.$b;
            this.$xbox.innerHTML='验证通过<div id="btn"><img style="margin-top:8px" src="//www.jq22.com/demo/slideVerification201711082055/img/kkkk.png"/></div>';
          }
          this.$xbox.style.width = l + 'px';
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    }
  }



  $.fn.sliderVerification = function () {
    var sliderVerification = new SliderVerification(this);
    return sliderVerification.inital();
  };
}
