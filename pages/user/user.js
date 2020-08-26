import { getFonts } from '../../utils/font.js';

Page({
  data: {
    active: 0
  },

  switchTab: function (e) {
    let active = e.currentTarget.dataset.index;
    this.setData({ active });
  },

  onLoad: function () {
    getFonts();
    let user = {};
    user['details'] = wx.getStorageSync('details');
    this.setData({user});
  }
})