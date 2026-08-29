export const KEYS = {
    PRODUCTS: `IMS:products`,
    CATEGORIES: `IMS:categories`,
    STOCK_LOGS: `IMS:stockLogs`,
    THEME: `IMS:theme`,
};

export function readFromLocalStorage(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        if (!data) {
            return fallback
        };
        return JSON.parse(data);
    } catch {
        console.error(`Failed to read "${key}" from localStorage:`);
        return fallback;
    }

};


export function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        console.log(`Failed to write "${key}" to localStorage:`);
    }
};