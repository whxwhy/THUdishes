// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '', // 用户头像地址
    nickname: '',  // 用户昵称
    enrollmentYear: '', // 用户入学年份
    hasSetInfo: false, // 标记是否已经设置过信息
    studentTypeOptions: ['本科生', '研究生'], // 学生类型选项
    selectedStudentType: '', // 选中的学生类型
    isCropping: false, // 是否正在裁剪
    imageX: 0, // 图片的 x 坐标
    imageY: 0, // 图片的 y 坐标
    imageScale: 1 // 图片的缩放比例
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 尝试从本地存储中获取用户信息
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickname: userInfo.nickname,
        enrollmentYear: userInfo.enrollmentYear,
        selectedStudentType: userInfo.selectedStudentType,
        hasSetInfo: true
      });
    }
  },

  /**
   * 选择头像
   */
  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          avatarUrl: tempFilePaths[0],
          isCropping: true,
          imageX: 0,
          imageY: 0,
          imageScale: 1
        });
      }
    });
  },

  /**
   * 输入昵称
   */
  inputNickname(e) {
    this.setData({
      nickname: e.detail.value
    });
  },

  /**
   * 输入入学年份
   */
  inputEnrollmentYear(e) {
    this.setData({
      enrollmentYear: e.detail.value
    });
  },

  /**
   * 选择学生类型
   */
  bindStudentTypeChange(e) {
    this.setData({
      selectedStudentType: this.data.studentTypeOptions[e.detail.value]
    });
  },


  /**
   * 保存用户信息
   */
  saveUserInfo() {
    const { avatarUrl, nickname, enrollmentYear } = this.data;
    if (!avatarUrl || !nickname || !enrollmentYear) {
      wx.showToast({
        title: '请完善信息',
        icon: 'none'
      });
      return;
    }
    const userInfo = {
      avatarUrl,
      nickname,
      enrollmentYear
    };
    // 保存到本地存储
    wx.setStorageSync('userInfo', userInfo);
    this.setData({
      hasSetInfo: true
    });
    wx.showToast({
      title: '保存成功',
      icon:'success'
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