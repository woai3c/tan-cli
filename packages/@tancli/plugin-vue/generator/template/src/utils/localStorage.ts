export class LocalStorage {
    getItem<T>(key: string): T {
        try {
            return JSON.parse(localStorage.getItem(key) as string) as T
        } catch (error) {
            return localStorage.getItem(key) as unknown as T
        }
    }

    setItem(key: string, value: any) {
        if (typeof value !== 'object') {
            return localStorage.setItem(key, value)
        }

        return localStorage.setItem(key, JSON.stringify(value))
    }

    removeItem(key: string) {
        return localStorage.removeItem(key)
    }

    clear() {
        return localStorage.clear()
    }
}

export default new LocalStorage()
