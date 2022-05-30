function remSize(){
  let win = document.documentElement.clientWidth
  //win/7.5表示将任意大小窗口分成100份 则：100rem === 窗口宽度
  document.documentElement.style.fontSize = win/7.5 + "px"
  //设置默认的字体大小
  document.querySelector("body").style.fontSize = 0.3+"rem"

}

remSize()
window.onresize = function() {
  remSize()
}