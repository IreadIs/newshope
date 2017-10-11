// pages/Grabcust/Grabcust.js
var url = "https://qiyeplus.qiyeplus.com/mobile/ajax/service.php?action=list&module=members&do=pool&pagestart=0&limit=20&comefrom=small";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;
var app = getApp();
var curuser;
// 请求数据
var loadMore = function (that) {
  that.setData({
    hidden: false
  });
  app.getUserInfo(function (retuser) {
    console.log(retuser);
    curuser = retuser;
    that.setData({
      userInfo: retuser
    });
  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn,
      littleid: curuser.littleid
    },
    success: function (res) {
      console.log(res)
      //console.info(that.data.list);
      var list = res.data.data;
      console.log(list)
      that.setData({
        list: list
      });
      page++;
      that.setData({
        hidden: true
      });
    }
  });
  wx.request({
    url: 'https://qiyeplus.qiyeplus.com/mobile/ajax/small.php?module=service&action=canrobbernumber&&comefrom=small',
    data: { littleid: curuser.littleid},
    success:function(res){
        console.log(res)
        that.setData({
          minge:res.data.data
        })
    }
  })
  })
}
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0
  },
  onLoad: function () {
    //  这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    loadMore(that);
    
  },
  //页面滑动到底部
  bindDownLoad: function () {
    var that = this;
    loadMore(that);
    console.log("lower");
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function (event) {
    //  该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    loadMore(this);
    console.log("lower");
  }
})