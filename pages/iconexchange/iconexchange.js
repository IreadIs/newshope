// pages/iconexchange/iconexchange.js
var app = getApp();
var curuser;
var value='';
var credit='';
var curticket='';
Page({
  data: {
    duihuan:'duihuan',
    jia:false,
    randomkey:'100'
  },
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      wx.request({
        dataType: "json",
        type: "get",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/user.php?module=user&action=userqrcode&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          console.log(ret)
          var retdata = ret.data.data,
            times = ret.data.expire;
          that.setData({
            photo: retdata,
            times: times
          })
        }
      });
    })
  },
  slider2change:function(e){
    var that =this;
    console.log(e)
    value = e.detail.value;
    if(value ==50){
      that.setData({
        duihuan:'duihuan2',
        jia:true
      })
    }
  },
invalues:function(e){
  credit =e.detail.value;
  console.log(credit)
  },
exchange:function(e){
  var that =this;
  wx.request({
    dataType: "json",
    type: "get",
    //url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=credittohongbao&comefrom=small',
    url:'https://qiyeplus.qiyeplus.com//mobile/ajax/api.php?action=getticket&comefrom=small',
    data: {
      littleid: curuser.littleid
    },
    success: function (ret) {
      console.log(ret.data)
      curticket =ret.data;
      if(ret.data){
        wx.request({
          dataType: "json",
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=credittohongbao&comefrom=small&littleid=' + curuser.littleid,
        data: {
          randomkey: 100,
          curticket: curticket,
          credit: credit
        },
        success: function (ret) {
              console.log(ret)
        }
        })
      }
    }
  });
}
})