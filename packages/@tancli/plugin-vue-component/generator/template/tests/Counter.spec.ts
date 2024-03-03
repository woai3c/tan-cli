import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('计数器测试', () => {
    test('默认值为 0', () => {
        const wrapper = mount(Counter)
        expect(wrapper.vm.modelValue).toBe(0)
    })

    test('值减一', async () => {
        const wrapper: VueWrapper = mount(Counter, {
            props: {
                modelValue: 100,
                'onUpdate:modelValue': (val: number) => wrapper.setProps({ modelValue: val }),
            },
        })

        await wrapper.find('.decrease').trigger('click')
        expect(wrapper.props('modelValue')).toBe(99)
    })

    test('值加一', async () => {
        const wrapper: VueWrapper = mount(Counter, {
            props: {
                modelValue: 100,
                'onUpdate:modelValue': (val: number) => wrapper.setProps({ modelValue: val }),
            },
        })

        await wrapper.find('.increase').trigger('click')
        expect(wrapper.props('modelValue')).toBe(101)
    })
})
