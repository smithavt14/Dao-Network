import { getFonts } from '../../utils/font.js';

Page({
  data: {
    details: {
      name: null,
      country: null,
      city: null,
      email: null,
      wechat: null,
      company: null,
      role: null,
      bio: null,
      goal: null,
      engagement: null,
      networking: null
    },
    
    step: 0,
    
    content: [{title: 'Contact Information', subtitle: "Let's collect some information so we can introduce you to the community!"}, {title: 'Professional Information'}, {title: 'Additional Information'}],
    
    pickers: [
      {
        index: 0,
        array: ['I want to meet a co-founder', 'I want to expand my network', 'I want to meet investors', 'I want to meet startups']
      },
      {
        index: 0,
        array: ['All the time', 'Sometimes', 'Never']
      },
      {
        index: 0,
        array: ['Yes', 'No', 'Maybe, tell me more']
      }
    ]
  },

  inputChange: function (e) {
    let value = e.detail.value;
    let name = e.currentTarget.dataset.name;
    let key = `details.${name}`;

    this.setData({ [key]: value });
  },

  pickerChange: function (e) {
    let index = e.currentTarget.dataset.index;
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    let key = `details.${name}`;
    let pickerKey = `pickers[${index}].index`
    let pickers = this.data.pickers;

    let goal = pickers[index].array[value];

    this.setData({[key]: goal, [pickerKey]: value});
  },

  validate: function () {
    let details = this.data.details;
    for (const key in details) {
      if (!details[key]) {
        wx.showModal({title: 'Missing Field', content: `Almost there, please fill in the "${key}" field before submitting`, showCancel: false});
        return false;
      }
    }
    return true;
  },

  submitSurvey: function () {
    let validate = this.validate();
    
    if (validate) {
      let details = this.data.details;
      
      // --- Send Details to Backend --- //
      wx.setStorageSync('details', details);
      wx.redirectTo({
        url: '../'
      })
    }
  },

  navigateBack: function () {
    let step = this.data.step;

    if (step === 0) this.navigateHome();
    else step--;

    this.setData({step});
  },

  navigateForward: function () {
    let step = this.data.step;

    if (step < 2) step++;

    this.setData({step});
  },

  onLoad: function () {
    getFonts();
  }
})