App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin');
    
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo);

    wx.BaaS.init('2d0337ee07f9c9e7df85');
    wx.BaaS.auth.loginWithWechat().then(user => {
      wx.setStorageSync('user', user);
    })
  },
})