// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:"",
    nickname:"",
  },
  getAvatar(e){
    console.log(e);
    this.setData({
      avatar:e.detail.avatarUrl
    })
  },
  getName(e){
    console.log(e);
    this.setData({
      nickname:e.detail.value
    })
  },

  /**
   * 登录按钮点击事件
   */
  login() {
    const { avatar, nickname } = this.data;
    // 表单验证
    if (!avatar) {
      wx.showToast({
        title: '请选择头像',
        icon: 'none'
      });
      return;
    }
    if (!nickname) {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
      return;
    }

    // 保存用户信息到本地存储
    wx.setStorageSync('userInfo', {
      avatar,
      nickname
    });

    // 登录成功提示
    wx.showToast({
      title: '登录成功',
      icon:'success'
    });

    // 跳转到指定页面，这里假设跳转到首页
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 检查用户是否已经登录
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      // 如果已经登录，直接跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
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