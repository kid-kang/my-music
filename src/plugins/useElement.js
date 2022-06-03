import { ElButton, ElTabPane, ElTabs, ElCarousel, ElCarouselItem, ElDrawer } from 'element-plus'


let needEle = [ElButton, ElTabPane, ElTabs, ElCarousel, ElCarouselItem, ElDrawer]
export function useElement (app) {
  needEle.forEach(val => app.use(val))
}