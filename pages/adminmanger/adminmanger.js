// pages/adminmanger/adminmanger.js
var app = getApp();
var curuser;
var spid='';
Page({
  data: {
  show:false
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
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=supplierproduct&do=list&module=shopstore&pagestart=0&limit=7&comefrom=small',
       // url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/small.php?module=' + product + '&id=' + id +'&action=getModuleData&&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data
          console.log(retdata)
          spid =retdata.spid;
          that.setData({
            list: retdata
          })
        }
      });
    })
  },
  adds:function(e){
    console.log(e.currentTarget.dataset.blan)
    var that =this;
    if (e.currentTarget.dataset.blan==false){
      that.setData({
        show: true
      })
    }else{
      that.setData({
        show: false
      })
    }
  },
  upjia:function(e){
      var that =this;
      wx.showModal({
          title: '提示',
          content: '是否确定上架/下架该产品',
          success: function (res) {
              if (res.confirm) {
                  console.log('用户点击确定')
                  wx.request({
                      dataType: "json",
                      type: "get",
                      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=supplierproduct&moderate=down&do=remove&comefrom=small',
                      data: {
                          littleid: curuser.littleid,
                          id: spid
                      },
                      success: function (ret) {
                          var retdata = ret.data
                          console.log(retdata)
                          wx.showToast({
                              title: '下架/上架'+retdata.error,
                              icon: 'success',
                              duration: 2000
                          })
                      }
                  });
              } else if (res.cancel) {
                  console.log('用户点击取消')
              }
          }
      })
  },
  deletepro: function (e) {
      console.log(e)
      var spids = e.currentTarget.dataset.spid
        var that =this;
        wx.showModal({
            title: '提示',
            content: '是否确认删除此规格',
            success: function (res) {
                if (res.confirm) {
                    wx.request({
                        dataType: "json",
                        type: "get",
                        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=supplierproduct&do=delete&comefrom=small&id=' + spids,
                        data: {
                            littleid: curuser.littleid
                        },
                        success: function (ret) {
                            var retdata = ret.data
                            console.log(retdata)
                            wx.showToast({
                                title: '删除' + retdata.error,
                                icon: 'success',
                                duration: 2000
                            })
                        }
                    });
                    that.onLoad();
                } else if (res.cancel) {

                }
            }
        })
  }
})