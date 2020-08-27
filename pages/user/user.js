import { getFonts } from '../../utils/font.js';

Page({
  data: {
    updated: false,
    activeDate: undefined,
    active: 0,
    pickers: [
      {
        index: undefined,
        array: ['I want to meet a co-founder', 'I want to expand my network', 'I want to meet investors', 'I want to meet startups']
      },
      {
        index: undefined,
        array: ['All the time', 'Sometimes', 'Never']
      },
      {
        index: undefined,
        array: ['Yes', 'No', 'Maybe, tell me more']
      }
    ]
  },

  inputChange: function (e) {
    let value = e.detail.value;
    let name = e.currentTarget.dataset.name;
    let key = `member.${name}`;

    this.setData({ [key]: value, updated: true });
  },

  pickerChange: function (e) {
    let index = e.currentTarget.dataset.index;
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    let key = `member.${name}`;
    let pickerKey = `pickers[${index}].index`
    let pickers = this.data.pickers;

    let goal = pickers[index].array[value];

    this.setData({[key]: goal, [pickerKey]: value, updated: true});
  },

  submitSurvey: function () {
    let updated = this.data.updated;
    if (updated) this.updateMember();
  },

  updateMember: function () {
    let member = this.data.member;
    member.user = member.user.id;

    let Member = new wx.BaaS.TableObject('member');
    let entry = Member.getWithoutData(member.id);

    entry.set(member).update().then(res => {
      wx.setStorageSync('member', res.data);
      
      this.getMember(this.data.user);
      this.setData({updated: false});
      
      wx.showToast({title: 'Update Success!'});
    })
  },

  userInfoHandler: function (data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
      wx.setStorageSync('user', user);
      this.setData({user});
    })
  },

  switchTab: function (e) {
    let active = e.currentTarget.dataset.index;
    this.setData({ active });
  },

  getMember: function (user) {
    let member = wx.getStorageSync('member');

    if (member) {
      this.setData({member, user}); 
      this.setActiveDate(member);
    } else {
      let Member = new wx.BaaS.TableObject('member');
      let query = new wx.BaaS.Query();
  
      query.compare('user', '=', user.id);
  
      Member.setQuery(query).find().then(res => {
        let member = res.data.objects[0];
        this.setActiveDate(member);
        this.setData({member, user});
      })
    }
  },

  setActiveDate: function (member) {
    let date = member.created_at;
    date = date * 1000;
    date = new Date(date);
    date = date.toLocaleString('en-US', {"month": "short", "year": "numeric"});
    this.setData({activeDate: date});
  },

  navigateToHome: function () {
    wx.redirectTo({ url: '../index/index' });
  },

  onLoad: function () {
    getFonts();
    let user = wx.getStorageSync('user');
    this.getMember(user);
  }
})