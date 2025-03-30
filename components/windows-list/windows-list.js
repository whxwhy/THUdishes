// components/windows-list/windows-list.js


Component({

  /**
   * 组件的属性列表
   */
  properties: {
   windowData:{
     type:Array,
     value:[]
   },
  
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },
  
  /**
   * 组件的方法列表
   */
  /**lifetimes:{
attached:function(){
  catname=item.name
  wx.cloud.database().collection("dishData")
    .where({
      window: catname,
   })
    .get()
    .then((res) => {
      console.log('success',res.data);
     this.setData({
       dishData:res.data
     });
});
  },}, */
  methods: {
  },
})