// pages/areas/areas.js
var app = getApp();
var curuser;
Page({
  data: {

  },
  onLoad: function (options) {
    console.log(options)
    var that = this,
        region =options.region;
    app.getUserInfo(function (retuser) {
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=customer&action=list&tolevel=-1&pagestart=0&limit=20&comefrom=small&region="+region,
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data.data,
            amount = ret.data.amount
          that.setData({
            list: retdata,
            amount:amount
          })
        }
      });
    });
  },
})