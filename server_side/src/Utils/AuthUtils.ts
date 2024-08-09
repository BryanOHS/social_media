import { query } from '../database'; 

export const UserExist = async (username: string, email: string): Promise<boolean> => {
    try {
        // Execute the query to check if the user exists
        const result = await query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        // Return true if any rows are returned, indicating the user exists
        return result.length > 0;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw new Error('Database query error');
    }
};
