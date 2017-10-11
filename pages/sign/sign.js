// pages/sign/sign.js
var app = getApp();
var curuser;
var inputValue = '';
var retlength='';
var content='';
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    signs:'签到',
    signstatus: 1,
    usercredit: 0,
    coinTomorrow:10
  },
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      curuser = retuser;
      that.setData({
        userInfo: retuser,
        usercredit: curuser.credit
      });
      wx.request({
        dataType: "json",
        type: "get",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?module=news&action=list&orderby=visitor&pagestart=0&limit=3&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata=ret.data
          console.log(retdata)
          that.setData({
            list:retdata
          })
        }
      });
      wx.request({
        dataType: "json",
        type: "get",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?module=product&action=list&orderby=views&pagestart=0&limit=3&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data
          console.log(retdata)
          that.setData({
            list2: retdata
          })
        }
      })
      wx.request({
        dataType: "json",
        type: "get",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?module=games&action=list&pagestart=0&limit=3&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          var retdata = ret.data
          console.log(retdata)
          that.setData({
            list3: retdata
          })
        }
      })
      wx.request({
        dataType: "json",
        type: "get",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/small.php?module=user&action=getsigninfo&comefrom=small',
        data: {
          littleid: curuser.littleid
        },
        success: function (ret) {
          console.log(ret)
          var retdata =ret.data.data;
          if(retdata.signinstatus==1){
            that.setData({
              signs:'明日',
              coinTomorrow:retdata.credit
            })
          }
        }
      })
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: 945
        });
      }
    }); 
  },
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });
  },  
  share: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?module=news&action=list&orderby=visitor&pagestart=0&limit=3&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data.data
        console.log(retdata)
        that.setData({
          list:retdata
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: 825
        });
      }
    });
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  active: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?module=product&action=list&orderby=views&pagestart=0&limit=3&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data
        console.log(retdata)
        that.setData({
          lists: retdata,
          winHeight: 825
        })
      }
    })
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?module=games&action=list&pagestart=0&limit=3&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data
        console.log(retdata)
        that.setData({
          listss: retdata,
          winHeight: 825
        })
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth
        });
      }
    });
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  buyshop: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?module=product&action=list&orderby=views&pagestart=0&limit=10&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data
        console.log(retdata)
        that.setData({
          shop: retdata,
          winHeight: 825
        })
      }
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  proposal:function(e){
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  jianyi:function(e){
    var that =this;
    content = e.detail.value;
  },
  tijiaocon:function(e){
    var that =this;
    if(content==''){
      wx.showToast({
        title: '请填写意见',
      })
    }else{
      wx.request({
        dataType: "json",
        type: "get",
        url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/user.php?action=suggest&module=user&comefrom=small',
        data: {
          littleid: curuser.littleid,
          content: content,
          type: 'evaluate'
        },
        success: function (ret) {
          console.log(ret.data.error)
          wx.showToast({
            title: ''+ret.data.error,
          })
        }
      })
    }
  },
  signeds:function(e){
    var that =this;
    wx.request({
      dataType: "json",
      type: "get",
      url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/signin.php?&comefrom=small',
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
          console.log(ret)
        var retdata = ret.data,
          coinPlus = retdata.coinPlus;
        console.log(retdata)
        if (retdata.flag == 1) {
          wx.showToast({
            title: retdata.error,
            icon: 'success',
            duration: 2000
          });
          that.setData({
            signs: "明日",
            usercredit: retdata.coinNew,
            coinTomorrow: retdata.coinTomorrow,
          });
        } else {
          wx.showToast({
            title: retdata.error,
            icon: 'error',
            duration: 2000
          });
        }
      }
    })
  }
})