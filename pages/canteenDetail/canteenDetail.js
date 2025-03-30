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
     }, () => {
      this.fetchRelatedDishData();});
    
    
    });
    
   },
   fetchRelatedDishData: function () {
    const db = wx.cloud.database();
    const updates = this.data.windowData.map(item => {
      return db.collection('dishData') // 替换为实际的集合名称
        .where({ window: item.name })
        .get()
        .then(res => {
          // 假设返回的数据结构是数组，取第一个元素或根据需要处理
          console.log('success',res);
          item.dishData = res.data;
        });
    });

    Promise.all(updates).then(() => {
      this.setData({
        windowData: this.data.windowData,
       
      });
    }).catch(err => {
      console.error('获取相关菜品数据失败:', err); 
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