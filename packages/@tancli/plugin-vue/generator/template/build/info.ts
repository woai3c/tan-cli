import type { Plugin } from 'vite'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { green, bold } from 'picocolors'

dayjs.extend(duration)

export function viteBuildInfo(): Plugin {
    let config: { command: string }
    let startTime: Dayjs
    let endTime: Dayjs
    return {
        name: 'vite:buildInfo',
        configResolved(resolvedConfig: { command: string }) {
            config = resolvedConfig
        },
        buildStart() {
            if (config.command === 'build') {
                startTime = dayjs(new Date())
            }
        },
        closeBundle() {
            if (config.command === 'build') {
                endTime = dayjs(new Date())
                console.log(
                    bold(green(`🎉恭喜打包完成（总用时${dayjs.duration(endTime.diff(startTime)).format('mm分ss秒')}）`))
                )
            }
        },
    }
}
