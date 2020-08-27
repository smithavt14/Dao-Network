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
    content: [{title: 'Contact Information', subtitle: "Let's collect some information so we can introduce you to the community!"}, {title: 'Professional Information', subtitle: 'What do you do? Tell us more.'}, {title: 'Additional Information', subtitle: 'Finally, just a few more questions to finish up.'}],
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
        wx.showModal({
          title: 'Missing Field', 
          content: `Almost there, please fill in the "${key}" field before submitting`, 
          showCancel: false
        });
        return false;
      }
    }
    return true;
  },

  submitSurvey: function () {
    let validate = this.validate();
    
    if (validate) {
      let details = this.data.details;
      this.createMember(details);
    }
  },

  createMember: async function (details) {
    wx.showLoading({title: 'Working...'});
    let user = this.data.user;
    details['user'] = user.id;

    let Member = new wx.BaaS.TableObject('member');
    
    let existingMember = await this.doesMemberExist();

    if (existingMember) {
      wx.hideLoading();
      wx.showModal({
        title: 'Existing Member', 
        content: "Looks like you're already a member, do you want to overwrite your existing information or navigate to your user page?",
        cancelText: 'User',
        confirmText: 'OK',
        success (res) {
          if (res.confirm) {
            let member = Member.getWithoutData(existingMember.id);
            member.set(details).update().then(res => {
              wx.setStorageSync('member', res.data);
              wx.redirectTo({ 
                url: '../user/user',
                success () {
                  wx.showToast({title: 'Updated!'})
                }
              });
            })
          } else if (res.cancel) {
            wx.redirectTo({ url: '../user/user' }) 
          }
        }
      })
    } else {
      let member = Member.create();
      member.set(details).save().then(res => {
        wx.hideLoading();
        wx.setStorageSync('member', res.data);
        wx.redirectTo({ 
          url: '../confirmation/confirmation',
          success () {
            wx.showToast({title: 'Created!'})
          }
        })
      })
    }
  },

  doesMemberExist: function () {
    return new Promise(resolve => {
      let user = this.data.user;
    
      let Member = new wx.BaaS.TableObject('member');
      let query = new wx.BaaS.Query();
  
      query.compare('user', '=', user.id);
  
      Member.setQuery(query).find().then(res => {
        let member = res.data.objects[0];
        resolve(member);
      })
    })
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
    this.setData({ user: wx.getStorageSync('user') });
    getFonts();
  }
})