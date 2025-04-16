// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mapId:"myMap",
    longitude:116.326836,latitude:40.00485,scale:15,
    markers:[
      {
        id:0,
        longitude:116.32871,
        latitude:40.01161,
        width:30,
        height:30,
        callout:{
          content:"紫荆园",
          display:'ALWAYS',
          padding:6
      }},
     {
       id:1,
        longitude:116.32634,
        latitude:40.01083,
       width:30,
       height:30,
       callout:{
        content:"桃李园",
       display:'ALWAYS',
       padding:6
      }}, 
      {
        id:2,
       longitude:116.32702,
       latitude:40.00631,
        width:30,
        height:30,
        callout:{
         content:"听涛园",
          display:'ALWAYS',
          padding:6
     }},
      {
        id:3,
        longitude:116.328152,
        latitude:40.00586,
        width:30,
        height:30,
        callout:{
          content:"清芬园",
          display:'ALWAYS',
          padding:6
        }},
        {
          id:4,
          longitude:116.32257,
          latitude:40.00684,
          width:30,
          height:30,
          callout:{
            content:"观畴园",
            display:'ALWAYS',
            padding:6
        }},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    /**wx.cloud.database().collection("canteenData")
    .get()
    .then((res) => {
      console.log('success',res);
     this.setData({
       canteenData:res.data
     })
    })*//**wx.getLocation({
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
  toDetail:async function(e){
    console.log('success',e);
    const element = this.data.markers.find(item => item.id === e.markerId);
    if (element) {
      console.log('找到的元素:', element);
      this.setData({
        foundElement: element
      });
    } else {
      console.log('未找到对应的元素');
      return; // 如果没找到元素，直接结束函数，避免后续错误
    }
    wx.cloud.database().collection("canteenData")
    .where({name:element.callout.content})
    .get()
    .then((res) => {
      console.log('success',res);
     wx.navigateTo({url:'/pages/canteenDetail/canteenDetail?id='+res.data[0]._id,})
    });
    console.log('monitor',this.data);
  
    },
    moveTolocation:function(){
      let Id=this.data.mapId
     wx.createMapContext(Id).moveToLocation({
      longitude:116.326836,latitude:40.00485
     });
    }
})

