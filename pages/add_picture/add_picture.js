// pages/add_picture/add_picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishName: '', // 菜品名称
    imagePath: '', // 图片路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  /**
   * 获取菜品名称输入值
   */
  handleDishNameInput(e) {
    this.setData({
      dishName: e.detail.value
    });
  },

  /**
   * 选择图片函数
   */
  chooseImage() {
    wx.chooseImage({
      count: 1, // 最多选择1张图片
      sizeType: ['original', 'compressed'], // 可选择原图或压缩图
      sourceType: ['album'], // 仅从相册选择
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.setData({
          imagePath: tempFilePaths[0]
        });
        this.uploadImage(tempFilePaths[0]);
      },
      fail: (err) => {
        console.error('选择图片失败', err);
      }
    });
  },

  /**
   * 上传图片函数
   */
  uploadImage(filePath) {
    const cloudPath = `dishes/${Date.now()}.jpg`; // 自定义云存储路径
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: (res) => {
        const fileID = res.fileID;
        this.saveToDatabase(this.data.dishName, fileID);
      },
      fail: (err) => {
        console.error('图片上传失败', err);
      }
    });
  },

  /**
   * 保存数据到云数据库
   */
  saveToDatabase(dishName, imageFileID) {
    wx.cloud.database().collection('dishImages') // 假设集合名为dishImages
     .add({
        data: {
          dishName,
          imageFileID
        }
      })
     .then(() => {
        wx.showToast({
          title: '保存成功',
          icon:'success'
        });
      })
     .catch((err) => {
        console.error('保存到数据库失败', err);
        wx.showToast({
          title: '保存失败',
          icon: 'none'
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

  }
})