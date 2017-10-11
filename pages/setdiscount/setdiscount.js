// pages/setdiscount/setdiscount.js
var app = getApp();
var curuser;
var money='';
var limitcount='';
var starttime='';
var endtime='';
Page({
  data: {
      dates: '2016-11-08',
      dates1:'2017-11-08',
      disshow:false
  },
  onLoad: function (options) {
      console.log(options)
      var that = this;
      app.getUserInfo(function (retuser) {
          curuser = retuser;
          that.setData({
              userInfo: retuser
          });
      })
      
  },
  bindDateChange: function (e) {
      starttime = e.detail.value
      console.log(starttime)
      this.setData({
          dates: e.detail.value
      })
  },
  bindDateChange1: function (e) {
      endtime  = e.detail.value
      console.log(endtime)
      this.setData({
          dates1: e.detail.value
      })
  },
  switch1Change: function (e) {
      var that =this;
      console.log('switch1 发生 change 事件，携带值为', e.detail.value)
      if (e.detail.value==true){
          that.setData({
              disshow: true
          })
      }else{
          that.setData({
              disshow: false
          })
      }
  },
  jiage:function(e){
      money = e.detail.value
      console.log(money)
  },
  xiangou:function(e){
      limitcount =e.detail.value
      console.log(limitcount)
  },
  dissure: function (e) {
    var that = this;
      wx.request({
          method: "POST",
          url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=discount&do=add&comefrom=small&littleid=' + curuser.littleid,
          data: {
            starttime: starttime,
            endtime: endtime,
            money: money,
            limitcount: limitcount
          },
          header: {
              'content-type': 'application/json'
          },
          success: function (ret) {
              var retdata = ret.data
              console.log(retdata)
          }
      });
  }
})