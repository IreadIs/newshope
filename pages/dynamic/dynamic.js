// pages/dynamic/dynamic.js
var app = getApp();
var curuser;
var retdatas={};
Page({
  data: {
  
  },
  onLoad: function (options) {
    var that =this;
    app.getUserInfo(function (retuser) {
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?module=moments&action=list&pagestart=0&limit=20&comefrom=small",
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          retdatas =ret.data;
          for(var i=0;i<retdatas.length;i++){
            var id =retdatas[i].id
          }
          that.setData({
            list:retdatas
          })
        }
      });
    });
  },
  Edithide:function(e){
  wx.navigateTo({
    url: '../pubdynamics/pubdynamics',
  })
  },
  deletes:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除此条动态',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            dataType: "json",
            url: "https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?module=moments&action=delete&comefrom=small&id="+id,
            type: "get",
            data: {
              littleid: curuser.littleid
            },
            success: function (ret) {
              var retdata = ret.data
              if(retdata.flag ==1){
                wx.showToast({
                  title: '' + retdata.error,
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          });
          that.onLoad();
        } else if (res.cancel) {
          wx.showToast({
            title: '阿欧，出问题了呢',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  }
})