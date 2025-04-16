// pages/canteenDetail/canteenDetail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canteenData: {},
    windowData: [],
    floorData: [
      { text: "一 层" },
      { text: "二 层" },
      { text: "三 层" },
      { text: "四 层" }
    ],
    imageUrl: '',
    canteenId: '',
    dishName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id);
    this.setData({ canteenId: options.id });
    wx.cloud.database().collection("canteenData")
    .doc(options.id)
    .get()
    .then((res) => {
      console.log('success=canteen', res);
      this.setData({
        canteenData: res.data,
      });
      const canteenA = res.data;
      return wx.cloud.database().collection("windows-list")
      .where({
        canteen: canteenA.name,
      })
      .get()
    })
    .then((res) => {
      console.log('success', res.data);
      this.setData({
        windowData: res.data
      }, () => {
        this.fetchRelatedDishData();
      });
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
        console.log('success', res);
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

  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        this.uploadImage(tempFilePaths[0]);
      }
    });
  },

  uploadImage(filePath) {
    const { canteenId, dishName } = this.data;
    const cloudPath = `dishes/${canteenId}/${dishName}_${Date.now()}.jpg`;
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: (res) => {
        const fileID = res.fileID;
        this.setData({
          imageUrl: fileID
        });
        // 保存图片信息到数据库
        this.saveImageInfoToDatabase(fileID);
      },
      fail: (err) => {
        console.error('图片上传失败', err);
      }
    });
  },

  saveImageInfoToDatabase(fileID) {
    const { canteenId, dishName } = this.data;
    wx.cloud.database().collection('dishImages')
   .add({
      data: {
        canteenId,
        dishName,
        imageFileID: fileID
      }
    })
   .then(() => {
      console.log('图片信息保存成功');
    })
   .catch((err) => {
      console.error('图片信息保存失败', err);
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
  clickFloorNav(e) {

  }
});