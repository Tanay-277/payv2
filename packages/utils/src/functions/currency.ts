/**
 * Converts a currency value from cents to dollars.
 * @param {number} currency - The currency value in cents.
 * @returns {number} - The currency value in dollars.
 */
export const showCurrency = (currency: number): number => {
    if (typeof currency !== 'number' || isNaN(currency)) {
        throw new Error('Invalid input: currency must be a number');
    }
    return currency / 100;
};

/**
 * Converts a currency value from dollars to cents.
 * @param {number} currency - The currency value in dollars.
 * @returns {number} - The currency value in cents.
 */
export const storeCurrency = (currency: number): number => {
    if (typeof currency !== 'number' || isNaN(currency)) {
        throw new Error('Invalid input: currency must be a number');
    }
    return Math.round(currency * 100);
};
