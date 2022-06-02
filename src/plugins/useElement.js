import { ElButton, ElTabPane, ElTabs, ElCarousel, ElCarouselItem, } from 'element-plus'


let needEle = [ElButton, ElTabPane, ElTabs, ElCarousel, ElCarouselItem]
export function useElement (app) {
  needEle.forEach(val => app.use(val))
}