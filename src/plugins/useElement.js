import { ElButton, ElTabPane, ElTabs, ElCarousel, ElCarouselItem, ElDrawer, ElForm, ElFormItem, ElInput } from 'element-plus'


let needEle = [ElButton, ElTabPane, ElTabs, ElCarousel, ElCarouselItem, ElDrawer, ElForm, ElFormItem, ElInput]
export function useElement(app) {
  needEle.forEach(val => app.use(val))
}