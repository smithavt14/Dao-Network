import { getFonts } from '../../utils/font.js';

Page({

  navigateToUser: function () {
    wx.redirectTo({ url: '../user/user' })
  },

  copyToClipboard: function () {
    wx.setClipboardData({
      data: 'team@thedaonetwork.com',
      success () { wx.showToast({ title: 'Copied!' }) }
    })
  },

  onLoad: function () {
    getFonts();
  }
})