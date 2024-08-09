
import sanitize from 'sanitize-html';
import { query } from '../database';
// Define the ValidateBuffer function
export const ValidateBuffer = (content: string): string => {
    const sanitizedContent = sanitize(content, {
        allowedTags: [],         // Disallow all HTML tags
        allowedAttributes: {},   // Disallow all HTML attributes
        allowedSchemes: [],      // Disallow all URL schemes
    });

    const safeContent = sanitizedContent
        .replace(/[\r\n]+/g, ' ') // Replace newline characters with spaces
        .trim(); // Remove leading and trailing whitespace

    return safeContent;
};

export const getPostComments = async (postId: number) => {
    try {
      const comments = await query(
        `
          SELECT
            comment_id, comment, created_at, user_id
          FROM
            comments
          WHERE
            post_id = $1
          ORDER BY
            created_at ASC
        `,
        [postId]
      );
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error("Failed to fetch comments");
    }
  };