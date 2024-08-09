import express, { Request, Response, Router } from "express";
import { getPostComments, ValidateBuffer } from "../Utils/PostUtils";
import { query } from "../database";

const router: Router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  const { author, content } = req.body;
  if (!author || !content) {
    res.status(400).json({ message: "parameters missing!" });
    return;
  }
  const safe_content = ValidateBuffer(content);
  try {
    const result = await query(
      "INSERT INTO posts (author, content) VALUES ($1,$2) RETURNING *",
      [author, safe_content]
    );
    res.status(201).json({ message: "Post Created!", post: result[0] });
  } catch (error) {
    console.error("Error while creating a post");
    res.status(500).json({ message: "Internal Server Error, try again later" });
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid post ID." });
  }

  try {
    const result = await query(
      "DELETE FROM posts WHERE post_id = $1 RETURNING *",
      [Number(id)]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Respond with a sucdess message
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await query(
      "SELECT user_id, username, display_name, user_profile,verified, post_id, content, created_at, likes_amount, comments_amount FROM users JOIN posts ON users.user_id = posts.author;",
      []
    );

    const postsWithComments = await Promise.all(result.map(async (post: any) => {
        const comments = await getPostComments(post.post_id);
        return {
          ...post,
          comments
        };
      }));

    res.status(200).json({ data: postsWithComments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error!" });
  }
});

router.get("/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;

  if (!user_id) {
    res.status(401).json({ message: "User ID is required!" });
    return;
  }

  try {
    const userIdNumber = Number(user_id);

    if (isNaN(userIdNumber)) {
      res.status(400).json({ message: "Invalid User ID!" });
      return;
    }

    // Query to get user details and their posts
    const result = await query(
      `
        SELECT
          users.user_id, users.username, users.display_name,users.user_profile,
          users.verified, posts.post_id, posts.content, posts.created_at, posts.likes_amount,
          posts.comments_amount
        FROM
          users
        JOIN
          posts ON users.user_id = posts.author
        WHERE
          users.user_id = $1;
      `,
      [userIdNumber]
    );

    const postsWithComments = await Promise.all(result.map(async (post: any) => {
        const comments = await getPostComments(post.post_id);
        return {
          ...post,
          comments
        };
      }));

    res.status(200).json({ data: postsWithComments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

router.get("/friend/:user_id", async (req: Request, res: Response) => {
  const { user_id } = req.params;

  if (!user_id) {
    res.status(400).json({ message: "User ID is required!" });
    return;
  }

  try {
    const userIdNumber = Number(user_id);

    if (isNaN(userIdNumber)) {
      res.status(400).json({ message: "Invalid User ID!" });
      return;
    }

    const result = await query(
      `
        SELECT
          p.post_id, p.content,p.created_at, p.likes_amount,  p.comments_amount,
          u.user_id, u.username, u.display_name,
          u.user_profile, u.verified
        FROM
          posts p
        JOIN
          users u ON p.author = u.user_id
       WHERE
      p.author IN (
        SELECT
          CASE
            WHEN first_user_id = $1 THEN second_user_id
            ELSE first_user_id
          END
        FROM
          friends
        WHERE
          (first_user_id = $1 OR second_user_id = $1)
          AND friend_status = 1
      )
    ORDER BY
      p.created_at DESC;
  `,
      [userIdNumber]
    );

    const postsWithComments = await Promise.all(result.map(async (post: any) => {
        const comments = await getPostComments(post.post_id);
        return {
          ...post,
          comments
        };
      }));

    res.status(200).json({ data: postsWithComments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error!" });
  }
});


router.post("/like/:post_id", async (req: Request, res: Response) => {
    const { post_id } = req.params;
    const user_id = req.body.user_id;

    if (!post_id || !user_id) {
        return res.status(400).json({ message: "Post ID and user ID are required" });
    }

    try {
        const existingLike = await query(
            "SELECT 1 FROM likes WHERE post_id = $1 AND user_id = $2",
            [post_id, user_id]
        );

        if (existingLike.length > 0) {
            // If the like exists, remove it (dislike)
            await query(
                "DELETE FROM likes WHERE post_id = $1 AND user_id = $2",
                [post_id, user_id]
            );
            res.status(200).json({ message: "Like removed successfully" });
        } else {
            // If the like does not exist, add it (like)
            await query(
                "INSERT INTO likes (post_id, user_id) VALUES ($1, $2)",
                [post_id, user_id]
            );
            res.status(200).json({ message: "Post liked successfully" });
        }
    } catch (error) {
        console.error("Error processing like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/comment", async (req: Request, res: Response) => {
    const { post_id, user_id, comment } = req.body;

    if (!post_id || !user_id || !comment) {
        return res.status(400).json({ message: "Post ID, user ID, and comment are required" });
    }

    const safe_content = ValidateBuffer(comment)

    try {
        // Insert the new comment into the comments table
        await query(
            "INSERT INTO comments (post_id, user_id, comment, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
            [post_id, user_id, safe_content]
        );

        // Optionally, increment the comments_amount for the post
        // This can also be handled by a trigger if desired
        await query(
            "UPDATE posts SET comments_amount = comments_amount + 1 WHERE post_id = $1",
            [post_id]
        );

        res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



export default router;
