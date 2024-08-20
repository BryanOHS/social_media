export interface Comment {
    comment: string;       // The text of the comment
    comment_id: number;    // Unique identifier for the comment
    created_at: string;    // Timestamp of when the comment was created
    user_id: number;       // Identifier of the user who made the comment
  }

export interface Post {
    post_id: number;        // Unique identifier for the post
    user_id: number;        // Identifier of the user who created the post
    username: string;       // Username of the user who created the post
    display_name: string | null; // Display name of the user (can be null)
    user_profile: string | null; // URL or path to user profile picture (can be null)
    content: string;        // Content of the post
    created_at: string;     // Timestamp of when the post was created
    likes_amount: number;   // Number of likes the post has received
    comments_amount: number; // Number of comments the post has received
    verified: boolean;      // Indicates if the user is verified
    comments: Comment[];    // Array of comments associated with the post
    liked: boolean
  }