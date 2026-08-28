export function generateSku() {
    return `PRD-${Math.floor(100000 + Math.random() * 900000)}`;
};