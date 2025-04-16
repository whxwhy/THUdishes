Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishData: {},
    rating: 0,
    userRating: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id);
    // 调用云函数初始化菜品评分信息
    wx.cloud.callFunction({
      name: 'initDishRating', 
      success: (res) => {
        console.log('初始化评分信息云函数调用成功', res.result);
        // 继续执行获取菜品数据的逻辑
        this.fetchDishData(options.id);
      },
      fail: (err) => {
        console.error('初始化评分信息云函数调用失败', err);
        // 即使云函数调用失败，也继续执行获取菜品数据的逻辑
        this.fetchDishData(options.id);
      }
    });
  },

  fetchDishData(dishId) {
    wx.cloud.database().collection("dishData")
      .doc(dishId)
      .get()
      .then((res) => {
        console.log('success=dish', res);
        let ratings = res.data.ratings || [];
        let totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
        let averageRating = ratings.length > 0 ? totalRating / ratings.length : 0;
        this.setData({
          dishData: res.data,
          rating: averageRating
        });
      });
  },

  /**
   * 点击星星事件处理函数
   */
  onStarClick(e) {
    let userRating = e.currentTarget.dataset.index + 1;
    this.setData({
      userRating: userRating
    });
    // 上传打分数据到云函数
    let dishId = this.data.dishData._id;
    wx.cloud.callFunction({
      name: 'updateDishRating',
      data: {
        dishId,
        userRating
      },
      success: res => {
        console.log('评分上传成功', res.result);
        // 更新页面显示的平均评分
        this.setData({
          rating: res.result.averageRating
        });
      },
      fail: err => {
        console.error('评分上传失败', err);
      }
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

  }
})  