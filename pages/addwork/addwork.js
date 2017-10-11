// pages/addwork/addwork.js
var tempFilePaths = {};
var app = getApp();
var uid ='';
var uids ='';
var curuser;
var photo = '';
var title='';
var username='';
var content='';
var testuser='';
var types ='';
var level='';
var array = ['请选择', '一般', '紧急', '特别紧急 '];
var arrays = ['请选择', '关注', '用户', '管理中心 ', '活动', '金币', '分享', '公众群', '商城', '内容', '早报', '服务中心', '其他'];
Page({
  data: {
  listhide:true,
  listshow:false,
  listshows: false,
  array: ['请选择', '一般', '紧急', '特别紧急 '],
  index:0,
  indexs:0,
  arrays: ['请选择', '关注', '用户', '管理中心 ','活动','金币','分享','公众群','商城','内容','早报','服务中心','其他'],
  },
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (retuser) {
      curuser = retuser;
      that.setData({
        userInfo: retuser
      });
    })
  },
  customer:function(e){
    var that =this;
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/admin.php?module=kfaccount&action=search&pagestart=0&limit=50&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data.data
        console.log(retdata)
        that.setData({
          listback:retdata
        })
      }
    });
    that.setData({
      listhide:false,
      listshow:true
    })
  },
  //标题
  jieshou:function(e){
    title = e.detail.value;
  },
  content:function(e){
    content = e.detail.value;
  },
  customers: function (e) {
    var that = this;
    wx.request({
      dataType: "json",
      url: "https://qiyeplus.qiyeplus.com/mobile/ajax/admin.php?module=kfaccount&action=search&pagestart=0&limit=50&comefrom=small",
      type: "get",
      data: {
        littleid: curuser.littleid
      },
      success: function (ret) {
        var retdata = ret.data.data
        console.log(retdata)
        that.setData({
          listback: retdata
        })
      }
    });
    that.setData({
      listhide: false,
      listshows: true
    })
  },
  close:function(e){
    var that = this;
    that.setData({
      listhide: true,
      listshow: false,
      nickname: ''
    })
  },
  close1: function (e) {
    var that = this;
    that.setData({
      listhide: true,
      listshows: false,
      nicknames: ''
    })
  },
  tijiao:function(e){
    var that = this;
    that.setData({
      listhide: true,
      listshow: false
    })
  },
  tijiao1: function (e) {
    var that = this;
    that.setData({
      listhide: true,
      listshows: false
    })
  },
  addimg:function(e){
    var that =this;
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
            var retdata = res.data
            console.log(retdata)
            photo = retdata
            that.setData({
              tempFilePaths: tempFilePaths,
              templength: templength
            })
          }
        })
      }
    })
  },
  bindPickerChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value
    level =array[index];
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    console.log(e)
    var index = e.detail.value
    console.log('picker发送选择改变，携带值为', e.detail.value)
    types = arrays[index];
    this.setData({
      indexs: e.detail.value
    })
  },
  listCallBack:function(e){
    console.log(this.data)
  var index = parseInt(e.currentTarget.dataset.index),
      selected = e.currentTarget.dataset.selected,
      xuanze = this.data.listback[index].selected,
      name = this.data.listback[index].nickname,
      uid = parseInt(this.data.listback[index].uid),
      listback = this.data.listback;
      // 对勾选状态取反
      listback[index].selected = !selected;
      console.log(name)
      console.log(uid)
      username =name;
      uid = parseInt(uid);
      // 写回经点击修改后的数组
      this.setData({
        listback: listback,
        nickname:name,
        uid:uid
      });
  },
  listCallBack1: function (e) {
    console.log(e)
    var index = parseInt(e.currentTarget.dataset.index),
      selected = e.currentTarget.dataset.selected,
      xuanze = this.data.listback[index].selected,
      name = this.data.listback[index].nickname,
      uids = parseInt(this.data.listback[index].uid),
      listback = this.data.listback;
      // 对勾选状态取反
      listback[index].selected = !selected;
      console.log(name)
      console.log(uids)
      testuser =name;
      uids =parseInt(uids);
    // 写回经点击修改后的数组
    this.setData({
      listback: listback,
      nicknames: name,
      uids:uids
    });
  },
  suerList:function(e){
    console.log(e)
      var that =this,
        useruid = e.currentTarget.dataset.uid,
        textuid = e.currentTarget.dataset.uids;
      wx.request({
        dataType: "json",
        url: "https://qiyeplus.qiyeplus.com/mobile/service.php?module=work&action=add&comefrom=small",
        //url:'https://qiyeplus.qiyeplus.com/mobile/_r.php?comefrom=small',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },  
        data: {
          littleid: curuser.littleid,
          uid: curuser.uid,
          title:title,                       // 标题       
          photo:photo,                       // 图片       
          content:content,                    // 内容         
          username_uid: useruid,                  // 程序员    
          testuser_uid: textuid,                 // 测试人     
          type:types,                    // 类型      
          level: level                  // 紧急程度    
        },
        success: function (ret) {
          var retdata = ret.data
          console.log(retdata)
          if (retdata.flag ==1){
           wx.showToast({
             title: '提交成功',
           })
           wx.navigateTo({
             url: '../JobDetails/JobDetails',
           })
          }else{
            wx.showToast({
              title: ''+retdata.error,
            })
          }
        }
      });
  }
})