// pages/cardintrs/cardintrs.js
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
/*
          wx.request({
              dataType: "json",
              type: "get",
              url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=agencyorder&module=shopstore&flag=2&pagestart=0&limit=20&comefrom=small&shopstoreuid=' + shopstoreuid,
              data: {
                  littleid: curuser.littleid
              },
              success: function (ret) {
                  var retdata = ret.data;
                  console.log(retdata)
                  that.setData({
                      list: retdata
                  })
              }
          })
*/
      })
  },
})