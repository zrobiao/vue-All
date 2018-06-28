
export default {
  pay (payargs, successCallback, errorCallback) {
    var WeixinJSBridge = window.WeixinJSBridge
    console.log(WeixinJSBridge)
    function jsApiCall () {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', payargs,
        function (res) {
          // 使用以上方式判断前端返回,微信团队郑重提示: res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠.
          console.log('getBrandWCPayRequest: ', res)
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            successCallback()
          } else {
            errorCallback(res.err_desc)
          }
        }
      )
    }
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false)
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', jsApiCall)
        document.attachEvent('onWeixinJSBridgeReady', jsApiCall)
      }
    } else {
      jsApiCall()
    }
  }
}
