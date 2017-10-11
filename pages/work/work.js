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
  onShow: function (options) {
    var that = this;  
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=work&action=list&my=1&pagestart=0&limit=20&comefrom=small",
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data.data
          console.log(retdata)
          if(retdata.length ==0){
            wx.getSystemInfo({
              success: function (res) {
                that.setData({
                  winWidth: res.windowWidth,
                  winHeight: 150
                });
              }
            }); 
          }else{
            wx.getSystemInfo({
              success: function (res) {
                that.setData({
                  winWidth: res.windowWidth,
                  winHeight: retdata.length*51+88
                });
              }
            }); 
          }
          that.setData({
            list:retdata
          })
        }
      });
    }) 
    that.onLoad();
  },
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });
  },  
  coverworks:function(e){
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
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=work&action=list&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data.data,
          retlength =retdata.length,
          winHeight = retlength*51+88
        console.log(retdata)
        that.setData({
          list1: retdata,
          winHeight: winHeight
        })
      }
    });
  },
  tongji: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: 200
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
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=work&action=list&my=1&pagestart=0&limit=20&comefrom=small",
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