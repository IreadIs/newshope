// pages/Complaint/Complaint.js
var app = getApp();
var curuser;
var content='';
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
  jianyi: function (e) {
    var that = this;
    content = e.detail.value;
  },
  tijiaocon:function(e){
    var that = this;
    if (content == '') {
      wx.showToast({
        title: '请填写意见',
      })
    } else {
      wx.request({
        dataType: "json",
        type: "get",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/user.php?action=complain&module=user&comefrom=small',
        data: {
          littleid: curuser.littleid,
          content: content,
          type: 'complain'
        },
        success: function (ret) {
          console.log(ret.data.error)
          wx.showToast({
            title: '' + ret.data.error,
          })
        }
      })
    }
  },
  tijiaocon1: function (e) {
    var that = this;
    if (content == '') {
      wx.showToast({
        title: '请填写意见',
      })
    } else {
      wx.request({
        dataType: "json",
        type: "get",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/user.php?action=suggest&module=user&comefrom=small',
        data: {
          littleid: curuser.littleid,
          content: content,
          type: 'complain'
        },
        success: function (ret) {
          console.log(ret.data.error)
          wx.showToast({
            title: '' + ret.data.error,
          })
        }
      })
    }
  }
})