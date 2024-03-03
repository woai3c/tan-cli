export class EventBus {
    private events: Record<string, Function[]> = {}

    on(event: string, callback: Function) {
        if (!this.events[event]) {
            this.events[event] = []
        }

        this.events[event].push(callback)
    }

    off(event: string, callback?: Function) {
        if (this.events[event]) {
            if (callback) {
                const cbs = this.events[event]
                let l = cbs.length
                while (l--) {
                    if (callback == cbs[l]) {
                        cbs.splice(l, 1)
                    }
                }
            } else {
                this.events[event] = []
            }
        }
    }

    emit(event: string, ...args: any[]) {
        if (this.events[event]) {
            for (const func of this.events[event]) {
                func.call(this, ...args)
            }
        }
    }

    once(event: string, callback: Function) {
        const wrap = (...args: any[]) => {
            callback.call(this, ...args)
            this.off(event, wrap)
        }

        this.on(event, wrap)
    }

    clear(prefix?: string) {
        if (prefix) {
            Object.keys(this.events).forEach((key) => {
                if (key.startsWith(prefix)) {
                    this.events[key] = []
                }
            })
        }
    }
}

export default new EventBus()
