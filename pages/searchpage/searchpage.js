// pages/searchpage/searchpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText: '',
    dishData: [] 
  },
  handleInput(e){
    console.log(e);
    this.setData({
      searchText: e.detail.value
    });
    this.searchData();
  },
 async searchData(){ 
   const { searchText } = this.data;
   console.log( searchText);
 if (!searchText) {
   // 如果搜索框为空，则不进行搜索
   return;}
  try {
    const db = wx.cloud.database();
    const res = await db.collection('dishData').where(
      db.command.or([
        { name: db.RegExp({ regexp: searchText, options: 'i' }) },
        { canteen: db.RegExp({ regexp: searchText, options: 'i' }) },
        { window: db.RegExp({ regexp: searchText, options: 'i' }) },
        // ... 其他需要搜索的字段
      ])
    ).get();
    console.log(res);
    this.setData({
      dishData: res.data
    });
  } catch (err) {
    console.error('搜索数据失败', err);
    this.setData({
      dataList: []
    });
  }
},
  /**wx.cloud.database().collection("dishData")
  .where({
    window: windowA.name
 })
  .get()
  }).then((res) => {
    console.log('success',res.data);
   this.setData({
     dishData:res.data
   });
  
  
  });*/
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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