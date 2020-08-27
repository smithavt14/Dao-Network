import { getFonts } from '../../utils/font.js';

Page({

  navigateToSurvey: function () {
    wx.navigateTo({
      url: '../survey/survey'
    })
  },

  getMember: function (user) {
    let member = wx.getStorageSync('member');
    
    if (member) this.setData({ member, user });
    else {
      let Member = new wx.BaaS.TableObject('member');
      let query = new wx.BaaS.Query();

      query.compare('user', '=', user.id);

      Member.setQuery(query).find().then(res => {
        let member = res.data.objects[0];
        if (member) this.setData({member, user});
        else this.setData({ user });
      })
    }
  },

  navigateToUser: function () {
    wx.redirectTo({ url: '../user/user' })
  },
  
  onLoad: function () {
    getFonts();
    let user = wx.getStorageSync('user');
    this.getMember(user);
  },

  onShareAppMessage: function () {
    return {
      title: "Join Our Community!", 
      path: "../index/index"
    }
  }
})