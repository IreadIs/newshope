// pages/shareproductguang/shareproductguang.js
// pages/productguang/productguang.js
var app = getApp();
var curuser;
var winHeights = '';
var retlength = '';
Page({
  data: {
    // tab切换  
    currentTab: 0
  },
  onShow: function (options) {
    var that = this;
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      wx.getSystemInfo({
        success: function (res) {
          winHeights = res.windowHeight
        }
      });
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=customer&action=new&do=operatorshare&pagestart=0&limit=20&comefrom=small",
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data.data,
            rand = ret.data.rand,
            retlength = ret.data.data.length,
            retvalue = retlength * 63 + 88;
          console.log(retdata)
          that.setData({
            list: retdata,
            rand: rand,
            winHeight: retvalue
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
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=customer&action=new&do=newfromoperator&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data.data,
          retlength = retdata.length,
          winHeight = retlength * 63 + 88
        console.log(retdata)
        that.setData({
          list1: retdata,
          winHeight: winHeight,
          retlength: retlength
        })
      }
    });
  },
  swichNav: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=customer&action=recommend&module=holidayact&do=operatorshare&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data.data,
          rand = ret.data.rand,
          retlength = ret.data.data.length,
          retvalue = retlength * 63 + 88;
        console.log(retdata)
        that.setData({
          list: retdata,
          rand: rand,
          winHeight: retvalue
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
  tongji: function (e) {
    var that = this;
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
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=customer&action=new&do=operatorrank&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data.data,
          retlength = retdata.length,
          winHeights =retlength*61+88
        console.log(retlength)
        that.setData({
          lists: retdata,
          retlength: retlength
        })
      }
    });
  },
  bindDownLoad: function (e) {
    console.log(e)
  },
  scroll: function (event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
})