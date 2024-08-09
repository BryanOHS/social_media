-- Insert sample users
INSERT INTO users (username, display_name, email, password_hash, user_profile, user_banner, verified, friends_amount)
VALUES
('alice', 'Alice Wonderland', 'alice@example.com', 'hashed_password1', 'http://example.com/profiles/alice.jpg', 'http://example.com/banners/alice.jpg', TRUE, 5),
('bob', 'Bob Builder', 'bob@example.com', 'hashed_password2', 'http://example.com/profiles/bob.jpg', 'http://example.com/banners/bob.jpg', FALSE, 3),
('charlie', 'Charlie Chaplin', 'charlie@example.com', 'hashed_password3', NULL, NULL, TRUE, 10);

-- Insert sample posts
INSERT INTO posts (author, content, created_at, updated_at, likes_amount, comments_amount)
VALUES
(1, 'This is Alices first post!', '2024-08-09 10:00:00+00', '2024-08-09 10:00:00+00', 2, 1),
(2, 'Bob post is here!', '2024-08-09 11:00:00+00', '2024-08-09 11:00:00+00', 1, 0),
(1, 'Another post by Alice.', '2024-08-09 12:00:00+00', '2024-08-09 12:00:00+00', 3, 2);

-- Insert sample likes
INSERT INTO likes (post_id, user_id)
VALUES
(1, 2),
(1, 3),
(2, 1);

-- Insert sample comments
INSERT INTO comments (post_id, user_id, comment, created_at)
VALUES
(1, 3, 'Great post, Alice!', '2024-08-09 10:30:00+00'),
(3, 2, 'Interesting perspective!', '2024-08-09 12:30:00+00');

-- Insert sample friends
INSERT INTO friends (first_user_id, second_user_id, friend_status)
VALUES
(1, 2, 1), -- Alice and Bob are friends
(1, 3, 1), -- Alice and Charlie are friends
(2, 3, 0); -- Bob sent a friend request to Charlie

