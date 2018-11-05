// pages/jsq/jsq.js
Page({

  /**
   * 页面的初始数据
   * num1  第一个数
   * num2 第二个数
   * fuhao 运算符号
   * value 结果
   * dengyu  是否点击了等于号
   * nun  是否有结果
   * leter  运算记录
   */
  data: {
    num1:0,
    num2:0,
    fuhao:0,
    value:0,
    dengyu:0,
    nun:0,
    leter:'',
    sumLength:0
  },

  /**
   * 生命周期函数--监听页面加载
   * 页面加载时移除缓存  即运算记录
   */
  onLoad: function (options) {
    wx.removeStorageSync('leter')
  },
  setnum: function(e){
    //如果dengyu==1 则代表有结果  将结果转化为第一个数 其他的值归零并设置第一数为有
    if(this.data.dengyu==1){
      this.setData({
        num1: this.data.value,
        num2: 0,
        fuhao: 0,
        value: 0,
        dengyu:0,
        nun:1
      })
    }
    //获取点击的数值
    var num = e.currentTarget.dataset.value;
    var n1 = this.data.num1;
    var n2 = this.data.num2;
    //获取点击的符号
    var fuhao = this.data.fuhao;
    //如果没有符号 且没有结果
    if(fuhao==0 && this.data.nun==0){
      //如果第一个数为0则表示未输入数字 将点击的数字作为第一个数的第一位
      console.log(this.data.nun)
      if(n1==0){
        this.data.num1 = num;
        //否则则累加
      }else{
        this.data.num1 += num;
      }
      //如果有结果  但是没有符号 将点击数字作为第一个数字
      //设置第一个数为点击的数字
    }else if(fuhao==0 && this.data.nun !=0 ){
      console.log(this.data.nun+'n')
      wx.removeStorageSync('leter')
      this.setData({
        num1: num,
        num2: 0,
        fuhao: 0,
        value: 0,
        dengyu: 0,
        nun: 0,
        leter:'',
        sumLength:0,
      })
      //如果符号存在 且第一个数存在 则设置第二个数
    }else{
      if(n2==0){
        this.data.num2 = num;
      }else{
        this.data.num2 += num;
      }
    }
    //返回数1 数2
    this.setData({
      num1: this.data.num1,
      num2: this.data.num2
    })
  },
  //符号按钮
  jisuan: function(e){
    //得到点击的符号
    var fuhao = e.currentTarget.dataset.value;
    //如果有等于则设置第一个数为上次计算的结果其他归零
    if(this.data.dengyu){
      this.setData({
        num1:this.data.value,
        fuhao:fuhao,
        num2:0,
        value:0,
        dengyu:0
      })
    }
    //返回点击的符号
    this.setData({
      fuhao:fuhao,
    })
  },
  //计算结果
  getsum: function(e){
    var num1 = this.data.num1*1;
    var num2 = this.data.num2*1;
    var fuhao = this.data.fuhao;
    //若果点击等于号 设置等于为1
    this.setData({
      dengyu:1
    })
    var str =0;
    //判断各种符号的结果
    if(fuhao=='÷'){
      if(num2==0){
        this.setData({
          value:"除数不能为零",
        })
      }else{
        str = num1/num2;
        console.log(str);
        this.setData({
          value:str,
        })
      }
    }else if(fuhao=="+"){
      str = num1+num2;
      this.setData({
        value:str,
      })
    }else if(fuhao=="-"){
      str = num1-num2;
      this.setData({
        value:str,
      })
    }else if(fuhao=="×"){
      str = num1*num2;
      this.setData({
        value:str,
      })
    }else if(fuhao=='%'){
      str = num1%num2;
      this.setData({
        value:str,
      })
    }
    // 将计算过程存入缓存
    var leter = wx.getStorageSync('leter');
    var sumLength = wx.getStorageSync('sumLength');
    //如果缓存存在 则累加 并设置回去
    if (leter) {
      leter += fuhao + "\n" + num2 + "\n" +'=' +str +"\n";
      sumLength++;
      wx.setStorageSync('leter', leter);
      wx.setStorageSync('sumLength', sumLength);
      leter = wx.getStorageSync('leter');
      sumLength = wx.getStorageSync('sumLength');
    // 如果缓存不存在 则设置变量记录当前的计算过程 并存入缓存 再取出
    }else{
      wx.setStorageSync('sumLength', 1);
      leter = num1 + "\n" + fuhao + "\n" + num2 + "\n" + '=' + str + "\n";
      wx.setStorageSync('leter', leter);
      leter = wx.getStorageSync('leter');
      sumLength = wx.getStorageSync('sumLength');
    }
    //设置第一个数为计算结果  将缓存存入data 并展示在前台
    this.setData({
      num1:str,
      leter: leter,
      num2:0,
      fuhao:0,
      dengyu:0,
      nun:1,
      sumLength: sumLength*120
    })
  },
  //清除全部
  qingchu:function(){
    this.setData({
      num1: 0,
      num2: 0,
      fuhao: 0,
      value: 0,
      dengyu:0
    })
  },
  //单个删除
  shanchu:function(){
    var num1 = this.data.num1;
    var num2 = this.data.num2;
    var fuhao  = this.data.fuhao;
    if(num2.length>1){
      num2 =num2.substr(0,num2.length-1);
    }else if(num2==0 && fuhao!=0){
        fuhao =0;
    }else if(num2==0 && fuhao==0 && num1.length>1){
       num1 = num1.substr(0,num1.length-1);
    }else if(num2==0 && fuhao==0){
      num1 = 0;
    }else if(num2==0){
      fuhao = 0;
    }else{
      num2 =0;
    }
    this.setData({
      num1: num1,
      num2: num2,
      fuhao: fuhao,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})