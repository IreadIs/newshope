// pages/analysis/analysis.js
var app = getApp();
var curuser;
var scrollHeight = 0;
var scrollTop = 0;
var inputValue = '';
var uid = '';
var nickname = '';
var avatar='';
var linkname='';
Page({
  data: {
    userInfo: [],
    scrollTop: 0,
    scrollHeight: 0,
    inputValue: 0,
    zanwu: '暂无数据'
  },
  onLoad: function (options) {
    console.log(options)
    uid = options.uid;
    nickname = options.nickname;
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
        wx.request({
          dataType: "json",
          url: "https://qiyeplus.qiyeplus.com/mobile/ajax/timeline.php?module=user&action=timeline&comefrom=small&uid=" + uid,
          type: "get",
          data: {
            littleid: curuser.littleid
          },
          success: function (ret) {
            console.log(ret)
            avatar = ret.data[0].avatar;
            linkname = ret.data[0].linkname;
            var retdata =ret.data
            that.setData({
              analysis:retdata,
              avatar:avatar,
              linkname: linkname
            })
          }
        });
    })
  }
})