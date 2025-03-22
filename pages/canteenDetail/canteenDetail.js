// pages/canteenDetail/canteenDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canteenData:{},
windowData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    console.log(options.id);
    wx.cloud.database().collection("canteenData")
    .doc(options.id)
    .get()
    .then((res) => {
      console.log('success=canteen',res);
      this.setData({
         canteenData:res.data,
     });
     //this.setData({
       const canteenA=res.data;
    // });
     return wx.cloud.database().collection("windows-list")
    .where({
      canteen: canteenA.name,
   })
    .get()
    }).then((res) => {
      console.log('success',res.data);
     this.setData({
       windowData:res.data
     });
    
    
    });
    
   },

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
 clickFloorNav(e){
 
  }
})