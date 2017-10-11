// pages/Mycollection/My collection.js
var app = getApp();
var curuser;
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
         url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=favorites_show&module=article&pagestart=0&limit=20&comefrom=small',
       // url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=favorites_show&module=product&pagestart=0&limit=20&comefrom=small',
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
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  coverworks: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      type: "get",
      //url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=favorites_show&module=article&pagestart=0&limit=20&comefrom=small',
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=favorites_show&module=product&pagestart=0&limit=20&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata =ret.data
        console.log(retdata)
        that.setData({
          list1:retdata
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
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=favorites_show&module=article&pagestart=0&limit=20&comefrom=small',
      //url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=favorites_show&module=product&pagestart=0&limit=20&comefrom=small',
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
})