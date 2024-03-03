import ColorPicker from '@/components/ColorPicker.vue'
import { mount } from '@vue/test-utils'

test('ColorPicker Test', () => {
    const wrapper = mount(ColorPicker)
    expect(wrapper.text()).toBe('清空 最近使用颜色系统预设颜色')
})
