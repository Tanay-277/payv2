import { hash, compare } from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hashes a string using bcrypt
 * @param item - The string to hash
 * @returns Promise<string> - The hashed string
 * @throws Error if hashing fails
 */
const hashItem = async (item: string): Promise<string> => {
    if (!item) {
        throw new Error("Input string cannot be empty");
    }

    try {
        return await hash(item, SALT_ROUNDS);
    } catch (err) {
        console.error("Hashing error:", err);
        throw new Error("Hashing failed. Please try again later.");
    }
};

/**
 * Compares a string with a hash
 * @param item - The string to compare
 * @param hashedItem - The hash to compare against
 * @returns Promise<boolean> - True if match, false otherwise
 * @throws Error if comparison fails
 */
const compareItem = async (item: string, hashedItem: string): Promise<boolean> => {
    if (!item || !hashedItem) {
        throw new Error("Both input string and hash are required");
    }

    try {
        return await compare(item, hashedItem);
    } catch (err) {
        console.error("Comparison error:", err);
        throw new Error("Comparison failed. Please try again later.");
    }
};

export { hashItem, compareItem };