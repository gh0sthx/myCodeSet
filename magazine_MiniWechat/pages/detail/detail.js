// pages/detail/detail.js
import {
  BookModel
} from '../../models/book.js'
import {
  LikeModel
} from '../../models/like.js'
import {
  CommentModel
} from '../../models/comment.js'

let bookModel = new BookModel()
let commentModel = new CommentModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: null,
    comments: [],
    noComment: true,
    posting: false,
    like: false,
    count: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    detail.then(res => {
      this.setData({
        book: res
      })
    })

    comments.then(res => {
      this.setData({
        comments: res.comments
      })
    })

    likeStatus.then(res => {
      this.setData({
        likeStatus: res.like_status,
        likeCount: res.fav_nums
      })
    })
  },

  onFakePost: function() {
    this.setData({
      posting: true
    })
  },

  onPost(event) {
    const comment = event.detail.text || event.detail.value
    if (comment.lenght > 12) {
      wx.showToast({
        title: '短评最多12字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      this.data.comments.unshift({
        content: comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false,
        noComment: false
      })
    })
  },

  onCancel: function(event) {
    this.setData({
      posting: false
    })
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onShareAppMessage(){

  }
})