// pages/work/work.js
var app = getApp();
var curuser;
var inputValue = '';
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=calendar&action=list&pagestart=0&limit=20&comefrom=small",
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data.data
          console.log(retdata)
          that.setData({
            list: retdata
          })
        }
      });
    })
  },
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  coverworks: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=work&action=list&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data.data
        console.log(retdata)
        that.setData({
          list1: retdata
        })
      }
    });
  },
  tongji: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile//ajax/service.php?module=work&action=work&do=stat&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data
        console.log(retdata)
        that.setData({
          list2: retdata
        })
      }
    });
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})