// pages/cuxiao/cuxiao.js
var app = getApp();
var curuser;
var inputValue = '';
var retlength = '';
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0
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
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=service&action=customer&do=promation&pagestart=0&limit=20&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          console.log(ret)
          var retdata = ret.data
          console.log(retdata)
          that.setData({
            list: retdata
          })
        }
      });
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: 500
        });
      }
    });
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  coverworks: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=customer&action=effects&pagestart=0&limit=20&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data
        console.log(retdata)
        that.setData({
          lists: retdata
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  swichNav: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=service&action=customer&do=promation&pagestart=0&limit=20&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        console.log(ret)
        var retdata = ret.data
        that.setData({
          list: retdata
        })
      }
    });
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
})