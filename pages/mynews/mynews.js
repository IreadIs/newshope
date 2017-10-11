// pages/mynews/mynews.js
var app = getApp();
var curuser;
Page({
  data: {
  
  },
  onLoad: function (options) {
  var that =this;
  app.getUserInfo(function (retuser) {
    console.log(retuser);
    curuser = retuser;
    that.setData({
      userInfo: retuser
    });
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=message&action=list&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data.data
        console.log(retdata)
        that.setData({
          news: retdata
        })
      }
    });
  })
  },
})