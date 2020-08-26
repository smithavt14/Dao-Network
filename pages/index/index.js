import { getFonts } from '../../utils/font.js';

Page({

  navigateToSurvey: function () {
    wx.navigateTo({
      url: '../survey/survey'
    })
  },
  
  onLoad: function () {
    getFonts();
  }
})