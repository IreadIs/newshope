// pages/pubdynamics/pubdynamics.js
var textareavalue ='';
var app = getApp();
var curuser;
var photo='';
var tempFilePaths={};
Page({
  data: {
    tempFilePaths:false,
    templength:0
  },
  onLoad: function (options) {
    var that =this;
    app.getUserInfo(function (retuser) {
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
    })
  },
  onShow: function () {
  
  },
  dynavalue:function(e){
    console.log(e)
    textareavalue = e.detail.value
    console.log(textareavalue)
  },
  uploadimg:function(e){
    var that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        tempFilePaths = res.tempFilePaths; 
        var templength = tempFilePaths.length;
        wx.uploadFile({
          url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=app_upload_img&module=user&comefrom=small&littleid=' + curuser.littleid, //仅为示例，非真实的接口地址
          //url:'https://qiyeplus.qiyeplus.com/data/upload/forsmall/images',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var retdata = res,
                urlimg=retdata.data
            console.log(urlimg)
            console.log(retdata)
            photo = urlimg
            that.setData({
              tempFilePaths: tempFilePaths,
              templength: templength,
              urlimg: urlimg
            })
          }
        })
      }
    })
  },
  submitcont:function(){
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/service.php?module=moments&action=add&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid,
        content: textareavalue,
        photo: photo
      },
      success: function (ret) {
        var retdata = ret.data;
        console.log(retdata)
        wx.showToast({
          title: '' + retdata.error,
          icon: 'success',
          duration: 2000
        })
      }
    });
  },
























})