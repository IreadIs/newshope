// pages/service/service.js
var app = getApp();
var curuser;
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that =this
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
    })
  },
})