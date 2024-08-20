import React, { useState, useEffect } from "react";
import { Post } from "@/app/Types/Post";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { LikePost } from "../Utils/PostUtils";

interface PostCardProps {
  postC: Post;
  current_user_id: number
}

const PostCard = ({ postC, current_user_id }: PostCardProps) => {
  const [post, setPostContent] = useState<Post>(postC);
  
  const [likeLoading, setLikeLoading] = useState<boolean>(false);



  const handleLike = async () => {
    if(likeLoading){
        return;
    }
    setLikeLoading(true)

    try{
        const result = await LikePost(current_user_id, post.post_id, !post.liked)
    }
    catch(error) {
        console.log(error)
    }

  }
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <li
      className="w-full h-[300px] flex flex-row border-white border-t-2 border-b-2 py-2 rounded-md mb-9"
      key={post.post_id}
    >
      <div className="h-full w-fit">
        {post.verified ? (
          <div className="h-6 w-6 bg-blue-700 rounded-full absolute z-20 -translate-x-1 -translate-y-1">
            <h1 className="font-bold text-white">V</h1>
          </div>
        ) : null}
        <div className="h-14 overflow-hidden w-14 rounded-full flex relative mr-2">
          <Image
            width={100}
            height={100}
            alt="user_image"
            src={post.user_profile || "/images/user_profile.jpg"}
          />
        </div>
      </div>

      <div className="flex flex-col items-start w-full">
        <div className="flex flex-col w-fit h-fit items-start">
          <h1 className="text-white text-xl">{post.display_name}</h1>
          <span className="text-gray-400">
            <Link href={`/profile/${post.username}`}>@{post.username}</Link>
          </span>
        </div>

        <div className="w-full h-full flex items-start relative">
          <p className="text-white">{post.content}</p>
          <span className="text-gray-400 absolute bottom-0 left-0 text-sm">
            {post.created_at}
          </span>
        </div>
        <div className="flex w-full flex-row items-center">
          <div className="w-full h-[2px] bg-white rounded-sm" />
          <div className="min-w-2 min-h-2 rounded-full mx-2 bg-white" />
          <div className="w-full h-[2px] bg-white rounded-sm" />
        </div>
        <div className="w-full h-[80px] flex">
          <div className="w-fit h-fit relative">
            <HeartIcon
              style={{ strokeWidth: "1px" }}
              className="text-white cursor-pointer w-12 h-12 bg-slate"
            />
            <h1 className="text-xl text-white cursor-pointer absolute inset-0 flex items-center justify-center">
              {post.likes_amount}
            </h1>
          </div>
          <div className="w-fit h-fit relative">
            <ChatBubbleOvalLeftIcon
              style={{ strokeWidth: "1px" }}
              className="text-white cursor-pointer w-12 h-12 bg-slate"
            />
            <h1 className="text-xl text-white cursor-pointer absolute inset-0 flex items-center justify-center">
              {post.comments_amount}
            </h1>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PostCard;
