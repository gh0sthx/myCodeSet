
class ClassicStorage{
  static prefix = 'classic'
  constructor(episode){
    this.key = ClassicStorage.prefix + '-' + episode
  }
  get(episode){
    return wx.getStorageSync(this.key)
  }
  set(episode, classic){
    wx.setStorageSync(this.key, classic)
  }
}