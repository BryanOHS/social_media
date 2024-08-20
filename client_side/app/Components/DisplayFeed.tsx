import React from "react";
import { Post } from "../Types/Post";
import PostCard from "./PostCard";

interface DisplayFeedProps {
  posts?: Post[];
  userId: number

}

const DisplayFeed = ({ posts, userId }: DisplayFeedProps) => {
  return (
    <ul className="w-full h-fit p-2 ">
      {posts &&
        posts.map((post) => (
        <PostCard key={post.post_id} current_user_id={userId} postC={post}/> 
        ))}
    </ul>
  );
};

export default DisplayFeed;


