// pages/myshare/myshare.js
var app = getApp();
var curuser;
Page({
  data: {

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
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?module=user&action=share&pagestart=0&limit=20&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data
          console.log(retdata)
          that.setData({
            list: retdata
          })
        }
      })
    });
  },
})