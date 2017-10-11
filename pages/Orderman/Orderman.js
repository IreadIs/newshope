// pages/Orderman/Orderman.js
var app = getApp();
var curuser;
var shopstoreuid;
Page({
  data: {
      selected: true,
      selected1: false,
  },
  onLoad: function (options) {
      var that =this;
      app.getUserInfo(function (retuser) {
          console.log(retuser);
          curuser = retuser;
          shopstoreuid = retuser.uid
          that.setData({
              userInfo: retuser
          });
          wx.request({
              dataType: "json",
              type: "get",
              url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=agencyorder&module=shopstore&flag=2&pagestart=0&limit=20&comefrom=small&shopstoreuid=' +shopstoreuid,
              data: {
                  littleid: curuser.littleid
              },
              success: function (ret) {
                  var retdata = ret.data;
                  console.log(retdata)
                  that.setData({
                      list: retdata
                  })
              }
          })
          wx.request({
              dataType: "json",
              type: "get",
              url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=agencyorderflag&module=shopstore&comefrom=small',
              data: {
                  littleid: curuser.littleid
              },
              success: function (ret) {
                  var retdata = ret.data;
                  console.log(retdata)
                  that.setData({
                      list1: retdata
                  })
              }
          })
      })
  }, 
  selected: function (e) {
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=agencyorder&module=shopstore&flag=2&pagestart=0&limit=20&comefrom=small&shopstoreuid=' + shopstoreuid,
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data;
        console.log(retdata)
        that.setData({
          list: retdata
        })
      }
    })
      this.setData({
          selected1: false,
          selected2: false,
          selected: true
      })
  },
  selected1: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=agencyorder&module=shopstore&shopstoreuid=17773&flag=102&pagestart=0&limit=20&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data;
        console.log(retdata)
        that.setData({
          list2: retdata
        })
      }
    })
      this.setData({
          selected: false,
          selected2: false,
          selected1: true
      })
  },
  selected2: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=agencyorder&module=shopstore&flag=0&pagestart=0&limit=20&comefrom=small&shopstoreuid=' + shopstoreuid,
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data;
        console.log(retdata)
        that.setData({
          list3: retdata
        })
      }
    })
      this.setData({
          selected1: false,
          selected: false,
          selected2: true
      })
  },
})