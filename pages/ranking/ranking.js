// pages/ranking/ranking.js
var app = getApp();
var curuser;
var windowHeight='';
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    selected: true,
    selected1: false,
    selected3: true,
    selected4: false,
    gundong:true
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
  }, 
  selected3: function (e) {
    this.setData({
      selected4: false,
      selected5: false,
      selected3: true
    })
  },
  selected1: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=sales&action=stat&date=month&do=adminstat&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data,
          retdatalength = retdata.length;
        console.log(retdata)
        that.setData({
          rankingmonth: retdata
        })
      }
    });
    this.setData({
      selected: false,
      selected2: false,
      selected1: true
    })
  },
  selected4: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      url: "http://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=service&action=stat&date=month&do=service&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data,
          retdatalength = retdata.length;
        console.log(retdata)
        that.setData({
          rankingsermonth: retdata
        })
      }
    });
    this.setData({
      selected3: false,
      selected5: false,
      selected4: true
    })
  },
  selected2: function (e) {
    var that =this;
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=sales&action=stat&date=year&do=adminstat&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data;
        console.log(retdata)
        that.setData({
          rankingyear: retdata
        })
      }
    });
    this.setData({
      selected1: false,
      selected: false,
      selected2: true
    })
  }, 
  selected5: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=service&action=stat&date=year&do=service&pagestart=0&limit=20&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data;
        console.log(retdata)
        that.setData({
          rankingseryear: retdata
        })
      }
    });
    this.setData({
      selected3: false,
      selected4: false,
      selected5: true
    })
  },
  onLoad: function (options) {
    var that =this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
      }
    })
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=department&action=stat&date=day&do=adminstat&pagestart=0&limit=20&comefrom=small",
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          console.log(ret)
          var retdata = ret.data
          that.setData({
            ranking: retdata
          })
        }
      });
    })
  },
  slidrank:function(e){
    var that =this;
    console.log(e)
    if (e.detail.current ==1){
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=sales&action=stat&date=day&do=adminstat&pagestart=0&limit=20&comefrom=small",
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data,
          retdatalength =retdata.length;
          console.log(retdata)
          windowHeight = retdatalength*37+268
          console.log(windowHeight)
          that.setData({
            rankingsale: retdata,
            retdatalength: retdatalength,
            windowHeight: windowHeight
          })
        }
      });
    }
    if (e.detail.current == 2) {
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/admin.php?module=members&action=customerstat&pagestart=0&limit=20&comefrom=small",
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data,
            retdatalength = retdata.length;
          console.log(retdata)
          windowHeight = retdatalength * 37 + 158
          console.log(windowHeight)
          that.setData({
            rankingcustomer: retdata,
            retdatalength: retdatalength,
            windowHeight: windowHeight
          })
        }
      });
    }
    if (e.detail.current == 3) {
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=service&action=stat&date=day&do=service&pagestart=0&limit=20&comefrom=small",
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data,
            retdatalength = retdata.length;
          console.log(retdata)
          windowHeight = retdatalength * 89 + 268
          console.log(windowHeight)
          that.setData({
            rankingservice: retdata,
            retdatalength: retdatalength,
            windowHeight: windowHeight
          })
        }
      });
    }
  }
})