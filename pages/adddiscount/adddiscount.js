// pages/adddiscount/adddiscount.js
var app = getApp();
var curuser;
var id='';
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
                url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=discount&do=view&pagestart=0&limit=20&comefrom=small',
                data: {
                    littleid: curuser.littleid
                },
                success: function (ret) {
                    var retdata = ret.data,
                    id =retdata.id;
                    console.log(retdata)
                    that.setData({
                        list:retdata
                    })
                }
            })
        })
  },
  adelete:function(e){
      var that =this;
      wx.showModal({
          title: '提示',
          content: '确定删除该商品？',
          success: function (res) {
              if (res.confirm) {
                  console.log('用户点击确定')
                  wx.request({
                      dataType: "json",
                      type: "get",
                      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=discount&do=delete&comefrom=small&id=' + id,
                      data: {
                          littleid: curuser.littleid
                      },
                      success: function (ret) {
                          var retdata = ret.data
                          console.log(retdata)
                          wx.showToast({
                              title: '产出'+retdata.error,
                              icon: 'success',
                              duration: 2000
                          })
                      }
                  })
              } else if (res.cancel) {
                  console.log('用户点击取消')
              }
          }
      })
  }
})