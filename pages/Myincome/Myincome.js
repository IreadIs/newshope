// pages/Myincome/Myincome.js
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
              type: "get",
              url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/small.php?module=shopstore&action=myrevenue&comefrom=small',
              data: {
                  littleid: curuser.littleid
              },
              success: function (ret) {
                  var retdata = ret.data
                  console.log(retdata)
                  that.setData({
                      list:retdata
                  })
              }
          });
      })
  },
})