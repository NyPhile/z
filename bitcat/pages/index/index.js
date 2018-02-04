//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    allCatsCount: app.globalData.allCatsCount,
    userInfo: {},
    userCats: app.globalData.userCats,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getACat: function(){
    if (app.globalData.allCatsCount === 0){

    } else {
      this.createCat();
      app.globalData.allCatsCount--;
      this.setData({
        allCatsCount: app.globalData.allCatsCount
      })
    }
  },
  createCat: function(){
    var guid = () => {
      return 'A' + (Math.random() * (1 << 16)).toString(16).replace(/\..*/, "");
    }
    class CAT {
      constructor(param) {
        this.gene = param.gene;
        this.id = guid();
        this.level = Math.ceil(Math.random() * 5);
        this.gender = param.gender;
        this.createTime = new Date().getTime();
        this.coins = 0;
        this.parents = param.parents;
      }
    }
    var cat = new CAT({})
    console.log(cat)
  },
  onLoad: function () {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
