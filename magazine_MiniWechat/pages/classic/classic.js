// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    latest:true,
    first:false,
    like:false,
    count:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      this.setData({
        classic:res,
        count: res.fav_nums,
        like:res.like_status
      })
    })
  },

  onPrevious:function(event){
    this._updateClassic('previous')
  },

  onNext:function(event){
    this._updateClassic('next')
  },
  _updateClassic:function(nextOrPrevious){
    let index = this.data.classic.index
    classicModel.getClassic(index,nextOrPrevious, (res)=>{
      if (res) {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
      }
      else {
        console.log('not more classic')
      }
    })
  },
  onLike:function(event){
    let like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.classic.id, this.data.classic.type)
  },

  _getLikeStatus:function(cid, type){
    likeModel.getClassicLikeStatus(cid, type, (res)=>{
      this.setData({
        like:res.like_status,
        count:res.fav_nums
      })
    })
  },

  onShareAppMessage(){

  }
})