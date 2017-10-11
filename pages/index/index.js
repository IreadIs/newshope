//获取应用实例
var app = getApp();
var curuser;
var access_token='';
var list = {
  "begin_date": "20170728",
  "end_date": "20170728"}
Page({
  data: {
    userInfo: []
  },
  onShow: function (params) {
    var that = this;
    that.onLoad()
    wx.getSetting({
      success(res) {
        if (!res['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                  var retdata = res.userInfo;
                  console.log(retdata)
                  that.setData({
                    userinfos: retdata
                  })
                },
                fail: function (res) {
                  console.log('失败了')
                },
                complete: function (res) { },
              })
            }
          })
        }
        app.getUserInfo(function (retuser) {
          console.log(retuser);
          curuser = retuser;
          that.setData({
            userInfo: retuser
          });
        });
      }
    })
  }
})
