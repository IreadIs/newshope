// pages/JobDetails/JpbDetails.js
var app = getApp();
var curuser;
var moduleid='';
Page({
  data: {
  
  },
  onLoad: function (options) {
    console.log(options)
    moduleid = options.id;
    var that =this;
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=view&module=work&comefrom=small&id=" + moduleid,
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          console.log(ret)
          var retdata =ret.data;
          console.log(retdata.level)
          if (retdata.level ==0){
              that.setData({chengdu:'一般'})
          } if (retdata.level == 1) {
            that.setData({ chengdu: '紧急' })
          } if (retdata.level == 2) {
            that.setData({ chengdu: '特别紧急' })
          }
          if (retdata.type == 0) {
            that.setData({ leixing: '关注' })
          }
          if (retdata.type == 1) {
            that.setData({ leixing: '用户' })
          }
          if (retdata.type == 2) {
            that.setData({ leixing: '管理中心' })
          } if (retdata.type == 3) {
            that.setData({ leixing: '活动' })
          } if (retdata.type == 4) {
            that.setData({ leixing: '金币' })
          } if (retdata.type == 5) {
            that.setData({ leixing: '分享' })
          } if (retdata.type == 6) {
            that.setData({ leixing: '公众群' })
          } if (retdata.type == 7) {
            that.setData({ leixing: '商城' })
          } if (retdata.type == 8) {
            that.setData({ leixing: '内容' })
          } if (retdata.type == 9) {
            that.setData({ leixing: '早报' })
          } if (retdata.type == 10) {
            that.setData({ leixing: '服务中心' })
          } if (retdata.type == 11) {
            that.setData({ leixing: '其他' })
          }
          that.setData({
            list:retdata
          })
        }
      });
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?action=comment&type=list&orderby=id&module=work&pagestart=0&limit=5&comefrom=small&moduleid=" + moduleid,
        type: "get",
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
            var retdata =ret.data;
            console.log(retdata)
            that.setData({
              weihu:retdata
            })
        }
      })
    })
  },
  delete: function (e) {
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=work&action=work&comefrom=small&do=delete&id=" + moduleid,
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data;
        console.log(retdata)
        if(retdata.flag==1){
          wx.showToast({
            title: '删除成功',
          })
        }
      }
    })
  },
  requestj:function(e){
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?module=work&action=work&do=rob&comefrom=small&id=" + moduleid,
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data;
        console.log(retdata)
        if (retdata.flag == 1) {
          wx.showToast({
            title: '成功',
          })
        }
      }
    })
  }
})