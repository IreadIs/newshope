// pages/members/members.js
var app = getApp();
var curuser;
var uid='';
var nickname='';
Page({
  data: {
    userInfo: []
  },
  onLoad: function (options) {
    console.log(options)
    uid =options.uid;
    var that = this;
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      wx.request({
        dataType: "json",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/small.php?module=user&action=getUserInfo&comefrom=small&uid='+uid,
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data
          if(retdata.sex ==1){
            that.setData({
              xingbie:'男'
            })
          } if (retdata.sex == 2) {
            that.setData({
              xingbie: '女'
            })
          }if(retdata.sex ==0){
            that.setData({
              xingbie: '保密'
            })
          }
          console.log(retdata)
          nickname = retdata.nickname
          that.setData({
            list: retdata
          })
        }
      })
      wx.request({
        dataType: "json",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?action=comment&type=list&orderby=id&module=members&pagestart=0&comefrom=small&limit=5&moduleid=' + uid,
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata =ret.data
          console.log(retdata)
          that.setData({
            weihu:retdata
          })
        }
      })
    });
  },
  goodfriends:function(e){
    wx.navigateTo({
      url: '../myfriend/myfriend?uid='+uid,
    })
  },
  lable:function(e){
    wx.navigateTo({
      url: '../Label/Label?uid=' + uid,
    })
  },
  share:function(e) {
    wx.navigateTo({
      url: '../share/share?uid=' + uid + '&nickname=' + nickname,
    })
  },
  order:function(e){
    wx.navigateTo({
      url: '../order/order?uid=' + uid + '&nickname=' + nickname,
    })
  },
  push:function(e){
    wx.navigateTo({
      url: '../push/push?uid=' + uid + '&nickname=' + nickname,
    })
  },
  analysisi:function(e){
    wx.navigateTo({
      url: '../analysis/analysis?uid=' + uid + '&nickname=' + nickname,
    })
  }
})