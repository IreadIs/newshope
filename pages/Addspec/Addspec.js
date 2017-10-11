// pages/Addspec/Addspec.js
var app = getApp();
var curuser;
var spid = '';
var options = '';
var itemno = '';
var price = '';
var special = '';
var commission = '';
var allowcredit = '';
var storage = '';
var saled = '';
Page({
    data: {

    },
    onLoad: function (options) {
        console.log(options)
        spid = options.id;
        var that = this;
        app.getUserInfo(function (retuser) {
            curuser = retuser;
            that.setData({
                userInfo: retuser
            });
            wx.request({
                dataType: "json",
                url: "https://qiyeplus.qiyeplus.com/mobile/ajax/api.php?action=view&module=product&id=" + spid,
                type: "get",
                data: {
                    littleid: curuser.littleid
                },
                success: function (ret) {
                    var retdata = ret.data
                    console.log(retdata)
                    that.setData({
                        list: retdata
                    })
                }
            });
        });
    },
    guige: function (e) {
        console.log(e.detail.value)
        options = e.detail.value
    },
    huohao: function (e) {
        console.log(e.detail.value)
        itemno = e.detail.value
    },
    yuanjia: function (e) {
        console.log(e.detail.value)
        price = e.detail.value
    },
    xianjia: function (e) {
        console.log(e.detail.value)
        special = e.detail.value
    },
    yongjin: function (e) {
        console.log(e.detail.value)
        commission = e.detail.value
    },
    jinbi: function (e) {
        console.log(e.detail.value)
        allowcredit = e.detail.value
    },
    kucun: function (e) {
        console.log(e.detail.value)
        storage = e.detail.value
    },
    yishou: function (e) {
        console.log(e.detail.value)
        saled = e.detail.value
    },
    suerpro: function () {
        var that = this;
        wx.request({
            dataType: "json",
            url: "https://qiyeplus.qiyeplus.com/mobile/ajax/agency.php?action=supplierproduct&do=add&comefrom=small&littleid=" + curuser.littleid,
            method: 'POST',
            data: {
                pid: spid,
                options: options,
                itemno: itemno,
                price: price,
                special: special,
                commission: commission,
                allowcredit: allowcredit,
                storage: storage,
                saled: saled,
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (ret) {
                var retdata = ret.data
                console.log(retdata)
            }
        });
    },
})