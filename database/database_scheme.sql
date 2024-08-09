-- Drop tables if they exist
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS friends CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- Create the users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,               -- Unique identifier for each user
    username VARCHAR(50) UNIQUE NOT NULL,    -- Unique username for login and display
    display_name varchar(50),
    email VARCHAR(100) UNIQUE NOT NULL,      -- User's email address
    password_hash TEXT NOT NULL,             -- Hashed password for security
    user_profile TEXT,                       -- URL or path to the user's profile picture (nullable if not provided)
    user_banner TEXT,                        -- URL or path to the user's banner image (nullable if not provided)
    verified BOOLEAN NOT NULL DEFAULT FALSE, -- Flag indicating if the user is verified (0 = false, 1 = true)
    friends_amount INTEGER DEFAULT 0         -- Number of friends (or followers) the user has
);

-- Create the posts table
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,                      -- Unique identifier for each post
    author INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE, -- User who created the post
    content TEXT NOT NULL,                          -- The text content of the post
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the post was created
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of when the post was last updated
    likes_amount INTEGER DEFAULT 0,                 -- Number of likes the post has received
    comments_amount INTEGER DEFAULT 0                -- Number of comments the post has received
);

-- Create the likes table
CREATE TABLE likes (
    post_id INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, user_id)  -- Composite primary key
);

-- Create the comments table
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY, -- Unique identifier for each comment
    post_id INTEGER NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the friends table
CREATE TABLE friends (
    first_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    second_user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    friend_status INTEGER CHECK (friend_status IN (0, 1, 2)), -- 0: Pending, 1: Accepted, 2: Blocked
    PRIMARY KEY (first_user_id, second_user_id)
);


-- Drop the functions and triggers if they already exist
DROP TRIGGER IF EXISTS trigger_increment_likes ON likes;
DROP TRIGGER IF EXISTS trigger_decrement_likes ON likes;
DROP FUNCTION IF EXISTS increment_likes_amount;
DROP FUNCTION IF EXISTS decrement_likes_amount;

-- Create the increment function
CREATE OR REPLACE FUNCTION increment_likes_amount() 
RETURNS TRIGGER AS $$
BEGIN
    -- Increment the likes_amount for the post
    UPDATE posts
    SET likes_amount = likes_amount + 1
    WHERE post_id = NEW.post_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the decrement function
CREATE OR REPLACE FUNCTION decrement_likes_amount() 
RETURNS TRIGGER AS $$
BEGIN
    -- Decrement the likes_amount for the post
    UPDATE posts
    SET likes_amount = likes_amount - 1
    WHERE post_id = OLD.post_id;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create the increment trigger
CREATE TRIGGER trigger_increment_likes
AFTER INSERT ON likes
FOR EACH ROW
EXECUTE FUNCTION increment_likes_amount();

-- Create the decrement trigger
CREATE TRIGGER trigger_decrement_likes
AFTER DELETE ON likes
FOR EACH ROW
EXECUTE FUNCTION decrement_likes_amount();




