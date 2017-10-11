// pages/Label/Label.js
var app = getApp();
var curuser;
var scrollHeight = 0;
var scrollTop = 0;
var inputValue = '';
var uid = '';
Page({
  data: {
    userInfo: [],
    scrollTop: 0,
    scrollHeight: 0,
    inputValue: 0
  },
  onLoad: function (options) {
    console.log(options)
    uid = options.uid;
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      if (options) {
        wx.request({
          dataType: "json",
          url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=userdict&action=list&pagestart=0&limit=20&comefrom=small&uid=" + uid,
          type: "get",
          data: {
            littleid: curuser.littleid
          },
          success: function (ret) {
            console.log(ret)
            var retdata = ret.data,
              count = retdata.count,
              friendship = retdata.data;
            that.setData({
              count: count,
              friendship: friendship
            })
          }
        });
      } else {
        wx.request({
          dataType: "json",
          url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=friends&action=list&pagestart=0&limit=20&comefrom=small",
          type: "get",
          data: {
            littleid: curuser.littleid
          },
          success: function (ret) {
            console.log(ret)
            var retdata = ret.data,
              count = retdata.count,
              friendship = retdata.data;
            that.setData({
              count: count,
              friendship: friendship
            })
          }
        });
      }
    })
  },
  bindInput: function (e) {
    var that = this;
    inputValue = e.detail.value,
      that.setData({
        inputValue: inputValue
      })
  },
  setSearchStorage: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?action=search&module=friends&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid,
        keyword: inputValue
      },
      success: function (ret) {
        var retdata = ret.data.data;
        console.log(retdata)
        that.setData({
          friendships: retdata
        })
      }
    });
  }
})