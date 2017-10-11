// pages/myorder/myorder.js
var app = getApp();
var curuser;
var addressid='';
var orderid='';
Page({
  data:{
    clock: '',
    selected: true,
    selected1: false,
  },
  onLoad:function (params){
    var that = this
    app.getUserInfo(function (retuser) {
      var retlitt = retuser.littleid
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
    wx.request({
      dataType: "json",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/shop.php?action=order_show&flag=0&pagestart=0&limit=20&comefrom=small',
      data: {
        littleid: retlitt
      },
      type: "get",
      success: function (ret) {
        var retdata = ret.data;
        console.log(retdata)

        if (retdata && retdata.length > 0) {
          for (var i = 0; i < retdata.length; i++) {
            var pinfo = retdata[i].info;
            for (var j = 0; j < pinfo.length; j++) {
              var curinfo = pinfo[j];
              if (retdata[i].flagstr == '待付款') { 
                orderid = curinfo.orderid;
              }
              console.log(orderid)
            }
          }
        }
        that.setData({
          list: retdata
        })
      }
    });
    });
  }, 
  fktap:function(e){
    var that = this
    //app.getUserInfo(function (retuser) {
     // var retlitt = retuser.littleid
      //curuser = retuser;
      //that.setData({
      //  userInfo: retuser
      //});
      wx.request({
        dataType: "json",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/shop.php?action=order_show&flag=1&pagestart=0&limit=20&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        type: "get",
        success: function (ret) {
          var retdata = ret.data,
            addressid = retdata.addressid;
          if (retdata && retdata.length > 0) {
            for (var i = 0; i < retdata.length; i++) {
              var pinfo = retdata[i].info;
              for (var j = 0; j < pinfo.length; j++) {
                var curinfo = pinfo[j];
                orderid =curinfo.orderid;
                console.log(orderid)
              }
            }
          }
          console.log(retdata)
          that.setData({
            list4: retdata
          })
        }
      });
    //});
  },
  fhtap: function (e) {
    var that = this
    //app.getUserInfo(function (retuser) {
      //var retlitt = retuser.littleid
     // curuser = retuser;
     // that.setData({
      //  userInfo: retuser
     // });
      wx.request({
        dataType: "json",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/shop.php?action=order_show&flag=2&pagestart=0&limit=20&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        type: "get",
        success: function (ret) {
          var retdata = ret.data;
          console.log(retdata)
          that.setData({
            list5: retdata
          })
        }
      });
   // });
  },
  dshtap: function (e) {
    var that = this
    //app.getUserInfo(function (retuser) {
      //var retlitt = retuser.littleid
     // curuser = retuser;
     // that.setData({
      //  userInfo: retuser
     // });
      wx.request({
        dataType: "json",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/shop.php?action=order_show&flag=3&pagestart=0&limit=20&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        type: "get",
        success: function (ret) {
          var retdata = ret.data;
          that.setData({
            list6: retdata
          })
        }
      });
   // });
  },
  remindhuo:function(event){
    console.log(event);
    var that = this,
      curdataset = event.currentTarget.dataset,
      curorderid = curdataset.orderid;
    //app.getUserInfo(function (retuser) {
     // var retlitt = retuser.littleid
     // curuser = retuser;
     // that.setData({
    //    userInfo: retuser
    ///  });
      wx.request({
        dataType: "json",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/shop.php?action=reminddeliver&id='+curorderid+'&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        type: "get",
        success: function (ret) {
          console.log(ret)
          var retdata = ret.data;
          if(retdata.flag ==1){
            wx.showToast({
              title: '提醒成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '提醒失败',
              icon: 'loading',
              duration: 2000
            })
          }
        }
      });
   // });
  },
  suerhuo: function (event){
    var that = this,
    curdataset = event.currentTarget.dataset,
      curorderid = curdataset.orderid;
            wx.showModal({
              title: '是否确定收货',
              success: function (res) {
                if (res.confirm) {
                        wx.request({
                                dataType: "json",
                                url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/shop.php?action=order_flag&id=' + curorderid + '&flag=4&comefrom=small',
                                data: {
                                        littleid: curuser.littleid
                                },
                                type: "get",
                                success: function (ret) {
                                        var retdata = ret.data
                                        wx.showToast({
                                                title: '收货成功',
                                                icon: 'success',
                                                duration: 2000
                                        })
                                        that.onShow()
                                }
                        })
                }else if(res.cancel){
                  wx.showToast({
                    title: '收货失败',
                    icon: 'loading',
                    duration: 2000
                  })
                        that.onShow()
                }
              }
            })
       // }
     // });
  },
  selected:function(e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected3: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected2: false,
      selected3: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected1: false,
      selected: false,
      selected3: false,
      selected2: true
    })
  },
  selected3: function (e) {
    this.setData({
      selected1: false,
      selected: false,
      selected3: true,
      selected2: false
    })
  },
  /**
        * 小程序端调起支付api
        */
  weixinpay: function (e) {
    console.log(e);
    //var fId = e.detail.formId;
    // var fObj = e.detail.value;  
    // console.log(fId)
    // console.log(fObj)
    wx.request({
      dataType: "json",
      url: 'https://qiyeplus.qiyeplus.com//mobile/ajax/shop.php?action=shop_order&comefrom=small&addressid=' + addressid,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        littleid: curuser.littleid,
      },
      success: function (ret) {
        console.log(curuser.openid)
        console.log(ret)
        var retght = ret.data
        if (retght.length <= 0) {
          console.log("内容不存在")
        } else {
          wx.request({
            dataType: "json",
            url: 'https://qiyeplus.qiyeplus.com//mobile/ajax/small.php?module=small&action=wxpay&orderid=' + orderid,
            data: {
              openid: curuser.openid
            },
            type: "get",
            success: function (ret) {
              var retdata = ret.data
              console.log(ret)
              if (retdata.flag == 0) {
                wx.showToast({
                  title: '' + retdata.error,//订单失效或不存在
                  icon: 'loading',
                  duration: 2000
                })
              } else {
                wx.requestPayment({
                  'timeStamp': retdata.timeStamp,
                  'nonceStr': retdata.nonceStr,
                  'package': retdata.package,
                  'signType': retdata.signType,
                  'paySign': retdata.paySign,
                  'success': function (res) {
                    console.log(res)
                    wx.showToast({
                      title: '支付成功',
                      icon: 'loading',
                      duration: 2000
                    })
                    wx.navigateTo({
                      url: '../myorder/myorder',
                    })
                    /**模板消息调用 
                      wx.request({
                        dataType: "json",
                        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx758e9825590dc405&secret=edf668617b5f000b25098c551b925a8d',
                        data: {
                          openid: curuser.openid
                        },
                        type: "get",
                        success: function (ret) {
                         console.log(ret)
                         var retdata = ret.data,
                           access_token = retdata.access_token;
                           wx.request({
                             dataType: "json",
                             url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token,
                             data: {
                               touser: curuser.openid,
                               template_id: 'Ck6X0r7e0EwysvydgxrF8Vt7C7BhDW4w0R5-AwRMplU',  
                               page: '/pages/index/index',
                               form_id: fId, 
                               value: { 
                                 "keyword1": {
                                   "value": fObj.product,
                                   "color": "#4a4a4a"
                                 },
                                 "keyword2": {
                                   "value": fObj.detail,
                                   "color": "#9b9b9b"
                                 },
                                 "keyword3": {
                                   "value": new Date().getDate(),
                                   "color": "#9b9b9b"
                                 },
                                 "keyword4": {
                                   "value": "201612130909",
                                   "color": "#9b9b9b"
                                 },
                                 "keyword5": {
                                   "value": "$300",
                                   "color": "red"
                                 }   
                             }
                             },
                             type: "get",
                             success: function (ret) {
                                  console.log(ret)
                             }
                           })
                        }
                      })
                     调用结束 */
                  },
                  'fail': function (res) {
                    wx.showToast({
                      title: '支付失败',
                      icon: 'loading',
                      duration: 2000
                    })
                    wx.navigateTo({
                      url: '../error/error',
                    })
                  }
                })
              }
            }
          })
        }
      }
    })
  },
})