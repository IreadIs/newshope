// pages/region/region.js
var app = getApp();
var curuser;
var kvalue=[];
Page({
  data: {
  
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
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/small.php?module=user&action=customerregion&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          console.log(ret)
          var retdata = ret.data
          console.log(retdata)
          for (var k in retdata) {
            var zhi =retdata[k]
            console.log(k)
            kvalue.push(k);
          }
          console.log(kvalue);
          that.setData({
            list: retdata,
            k:kvalue
          })
        }
      });
    })
  },
})