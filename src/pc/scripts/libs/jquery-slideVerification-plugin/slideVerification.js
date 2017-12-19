/**
 * Created by shiyang.yao on 2017/12/18.
 */
export default function($, window, document, undefined) {
  var SliderVerification = function (options) {
    var self = this;
    this.$box =document.getElementById('verify_box');
    this.$xbox = document.getElementById('verify_xbox');
    this.$element = document.getElementById('btn');
    this.$b = this.$box.offsetWidth;
    this.$o = this.$element.offsetWidth;
    this.callBack = options.callBack;
  };

  SliderVerification.prototype={
    inital: function () {
      var  _this = this;
      _this.$element.ondragstart = function() {
        return false;
      };
      _this.$element.onselectstart = function() {
        return false;
      };
      this.$element.onmousedown = function(e) {
        var disX = e.clientX - _this.$element.offsetLeft;
        document.onmousemove = function (e) {
          var l = e.clientX - disX +_this.$o;
          if(l<_this.$o){
            l=_this.$o
          }
          if(l>_this.$b){
            l=_this.$b
          }
          _this.$xbox.style.width = l + 'px';
        };
        document.onmouseup = function (e){
          var l = e.clientX - disX +_this.$o;
          if(l<_this.$b){
            l=_this.$o
          }else{
            l=_this.$b;
            _this.$xbox.innerHTML='验证通过<div id="btn"><img style="margin-top:8px" src="//www.jq22.com/demo/slideVerification201711082055/img/kkkk.png"/></div>';
            _this.callBack();
          }
          _this.$xbox.style.width = l + 'px';
          document.onmousemove = null;
          document.onmouseup = null;
        };
      }
    }
  }



  $.sliderVerification = function (options) {
    var sliderVerification = new SliderVerification(options);
    return sliderVerification.inital();
  };
}
