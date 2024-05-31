import { add, sub, mul, div } from '@/index'

describe('数学函数测试', () => {
  test('相加', () => {
    expect(add(2, 4, 6)).toBe(12)
  })

  test('相减', () => {
    expect(sub(2, 4, 6)).toBe(-8)
  })

  test('相乘', () => {
    expect(mul(2, 4, 6)).toBe(48)
  })

  test('相除', () => {
    expect(div(2, 4, 6)).toBe(0.08333333333333333)
  })
})
