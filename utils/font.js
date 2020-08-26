const getFonts = () => {
  wx.loadFontFace({
    family: 'LF Black',
    source: 'url(https://cloud-minapp-28793.cloud.ifanrusercontent.com/1kASb4bMP3UQrQPZ.ttf)'
  });

  wx.loadFontFace({
    family: 'LF Regular',
    source: 'url(https://cloud-minapp-28793.cloud.ifanrusercontent.com/1kASb4o1yqgU8c7e.ttf)'
  });

  wx.loadFontFace({
    family: 'LF Thin',
    source: 'url(https://cloud-minapp-28793.cloud.ifanrusercontent.com/1kASmzA1mmmeLNMr.ttf)'
  })
}

module.exports = { getFonts };
