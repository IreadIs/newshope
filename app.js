var appUserinfo;
var openid = '';
var sessionkey = '';
var encryptedData = '';
var iv = '';
App({
  //用户登录
  getUserInfo: function (callback) {
    //调用登录接口
    var retuser = {};
    var that = this;
    wx.showLoading({ title: "加载中..." });
    wx.login({
      success: function (res) {
        var code = res.code;
        if (code) {
          //读取会员信息
          wx.request({
            url: "https://qiyeplus.qiyeplus.com/mobile/ajax/small.php?action=appletauth",
            data: {
              code: code,
            },
            success: function (res) {
              console.log(res)
              var retdata = res.data.data;
              openid = retdata.openid,
                sessionkey = retdata.session_key;
              //设置微信用户信息
              wx.getUserInfo({
                success: function (res) {
                  encryptedData = res.encryptedData;
                  iv = res.iv;
                  appUserinfo = res.userInfo
                  wx.request({
                    url: "https://qiyeplus.qiyeplus.com/mobile/ajax/small.php?comefrom=small&module=user&action=decryptuserinfo",
                    data: {
                      openid: openid,
                      unionid: encryptedData,
                      sessionkey: sessionkey,
                      iv: iv,
                      appid: 'wx758e9825590dc405'
                    },
                    dataType: "json",
                    success: function (ret) {
                      wx.hideLoading();
                      var retdata = ret.data;
                      for (var key in retdata) {
                        retuser[key] = retdata[key];
                      }
                      retuser.littleid = retuser.uid;
                      retuser.openid = openid;
                      callback && callback(retuser);
                    }
                  });
                },
                fail: function (res) {
                  var that = this
                  console.log(res)
/*
                  wx.redirectTo({
                    url: '/pages/error/error?error=请同意获得微信用户信息'
                  })
*/if (res) {
                    wx.showModal({
                      title: '警告',
                      content: '若不授权微信登陆，您将无法使用商城部分功能,点击重新获取授权',
                      success: function () {
                        wx.openSetting({
                          success: function (res) {
                            if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
                              wx.getUserInfo({})
                            }
                          }
                        })
                      }
                    })
                  }
                }
              })
            }
          });
        }
      }
    })
  },
})