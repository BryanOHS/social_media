DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,               -- Unique identifier for each user
    username VARCHAR(50) UNIQUE NOT NULL,    -- Unique username for login and display
    email VARCHAR(100) UNIQUE NOT NULL,      -- User's email address
    password_hash TEXT NOT NULL,             -- Hashed password for security
    user_profile TEXT,                       -- URL or path to the user's profile picture (nullable if not provided)
    user_banner TEXT,                        -- URL or path to the user's banner image (nullable if not provided)
    verified BOOLEAN NOT NULL DEFAULT FALSE -- Flag indicating if the user is verified (0 = false, 1 = true)
);

