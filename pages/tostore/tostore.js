// pages/tostore/tostore.js
var app = getApp();
var curuser;
var inputValue = '';
var retlength = '';
var value='';
var content='';
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    items: [
      { name: 'today', value: '今天'},
      { name: 'yesterday', value: '昨天'},
      { name: 'thedaybefore', value: '前天' }
    ]
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
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=customer&action=list&tolevel=6&pagestart=0&limit=20&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data.data;
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
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/small.php?module=user&action=qrcode&type=arrival&comefrom=small',
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
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=customer&action=list&tolevel=6&pagestart=0&limit=20&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        console.log(ret)
        var retdata = ret.data.data
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
  sendmessage:function(e){
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  radioChange: function (e) {
    value = e.detail.value;
    console.log(value)
  },
  binadarea:function(e){
    content = e.detail.value
    console.log(content)
  },
  submits:function(e){
    var that =this;
    if (content == '') {
      wx.showToast({
        title: '内容为必填项',
      })
    }else{
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?action=arrivalsend&module=service&comefrom=small',
      data: {
        littleid: curuser.littleid,
        sendto:value,
        content:content
      },
      success: function (ret) {
        var retdata = ret.data
        console.log(retdata)
        wx.showToast({
          title: '操作'+retdata.error,
          })
      }
    });
  }
  }
})