export const useLocalStorage = () => {
    const localStorage = window.localStorage

    const setItem = (key: string, value: string) => {
        localStorage.setItem(key, value)
    }

    const getItem = (key: string) => {
        const item = localStorage.getItem(key)

        if (!item) {
            return 'false'
        }

        return item
    }

    const removeItem = (key: string) => {
        localStorage.removeItem(key)
    }

    return { setItem, getItem, removeItem }
}