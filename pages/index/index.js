// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canteenData:[],
    longitude:116.326836,latitude:40.00135,scale:15,
    markers:[{id:0,longitude:116.326836,latitude:40.00366,width:30,height:30,callout:{content:"wwwww",display:'ALWAYS'}}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    wx.cloud.database().collection("canteenData")
    .get()
    .then((res) => {
      console.log('success',res);
     this.setData({
       canteenData:res.data
     })
    });/**wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
     })*/},
    

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
})

