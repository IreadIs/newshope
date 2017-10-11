// pages/Invitation/Invitation.js
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
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/user.php?module=user&action=userqrcode&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          console.log(ret)
          var retdata = ret.data.data,
            times = ret.data.expire;
          that.setData({
            photo: retdata,
            times: times
          })
        }
      });
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: 650
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
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/user.php?module=user&action=userqrcode&do=new&pagestart=0&limit=20&comefrom=small',
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
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/user.php?module=user&action=userqrcode&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data.data,
          times = ret.data.expire;
          console.log(times)
        console.log(retdata)
        that.setData({
          photo: retdata,
          times: times
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth
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
  refrshs: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=customer&action=new&do=userqrcode&needupdate=1&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data
        console.log(retdata)
        that.setData({
          photo: retdata
        })
      }
    })
  }
})