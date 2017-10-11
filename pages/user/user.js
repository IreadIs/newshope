// pages/user/user.js
var app = getApp();
var curuser;
var finsh ='';
var position='';
var nickname='';
var avatar='';
var company ='';
var mobile ='';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    xingbie: '',//性别
    arrayxingbie: ['男', '女'],
    index_xingbie: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (retuser) {
      console.log(retuser);
      avatar = retuser.avatar;
      position = retuser.linkman;
      nickname = retuser.linkman;
      company = retuser.company;
      mobile = retuser.mobile;
      console.log(position)
      console.log(nickname)
      console.log(company)
      console.log(mobile)
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
      that.setData({
        avatar: avatar,
        position: position,
        nickname: nickname,
        company: company,
        mobile: mobile
      })
    })
  },
  bindwxphoto:function(e){
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=refreshavatar&module=user&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        console.log(ret)
        var retdata = ret.data
      }
    });
  },
  xuanzexingbie: function (e) {
    this.setData({
      index_xingbie: e.detail.value
    })
  },
  mobilephoto:function(e){
    console.log(e)
     finsh =e.detail.value;
    console.log(finsh)
    if(finsh.length<11){
      wx.showToast({
        title: '手机号不正确',
        icon: 'fail',
        duration: 2000
      })
    }
  },
  Xname:function(e){
    console.log(e)
    position = e.detail.value
  },
  Ncheng: function (e) {
    console.log(e)
    nickname = e.detail.value
  },
  company: function (e) {
    console.log(e)
    company = e.detail.value
  },
  mobile:function(e){
    console.log(e)
    mobile = e.detail.value
  },
  edits:function(e){
    var that =this;
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/user.php?action=user_edit&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid,
        province: '北京',
        city: '丰台',
        counties: '东城区',
        areacode: '',
        avatar:avatar,
        photo_val: '',
        position: position,
        nickname: nickname,
        sex: 1,
        company: company,
        mobile: mobile
      },
      success: function (ret) {
        console.log(ret)
        var retdata = ret.data
        if(retdata.flag ==1){
          wx.showToast({
            title: '' + retdata.error,
            icon: 'fail',
            duration: 2000
          })
        }else{
        wx.showToast({
          title: ''+retdata.error,
          icon: 'fail',
          duration: 2000
         })
        }
      }
    });
  }
})