// pages/template/template.js
var app = getApp();
var curuser;
Page({
  data: {
      item: {
          index: 0,
          msg: 'this is a template',
          time: '2016-09-15'
      }
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
          url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=work&action=work&do=todo&comefrom=small',
          data: {
              littleid: curuser.littleid
          },
          success: function (ret) {
              console.log(ret)
              var retdata = ret.data
              console.log(retdata.data)
              console.log(retdata.error)
              console.log(retdata.flag)
              that.setData({
                  item:{
                  index: retdata.data,
                  msg:retdata.error,
                  time:retdata.flag
                  } 
              })
          }
      })
  })
  },
})