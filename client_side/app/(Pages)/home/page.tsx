"use client";
import DisplayFeed from "@/app/Components/DisplayFeed";
import PostForm from "@/app/Components/PostForm";
import { useUserData } from "@/app/Providers/UserDataProvider";
import { Post } from "@/app/Types/Post";
import { UserData } from "@/app/Types/User";
import { CreatePost, GetPosts } from "@/app/Utils/PostUtils";
import React, { Suspense, useEffect, useState } from "react";

import { Roboto } from "next/font/google";
const Robotoo = Roboto({ subsets: ["latin"], weight: ["400", "900"] });

const Home = () => {
  const { userData } = useUserData();
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if(!userData){
          return;
        }
        const result: any = await GetPosts("post/", userData.user_id);
        console.log(result.data);
        setFeedPosts(result.data); // Optionally update feedPosts state with result
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, [userData]); // Empty dependency array ensures this effect runs once on mount

  const HandleSubmitPost = async (
    e: React.FormEvent<HTMLFormElement>,
    content: string
  ) => {
    e.preventDefault();
    if (!userData) {
      return;
    }
    const postObject = {
      author: userData.user_id,
      content: content,
    };
    try {
      const result = await CreatePost(postObject);
      const post = {
        user_id: userData.user_id,
        username: userData.username,
        display_name: userData.display_name,
        user_profile: userData.user_profile,
        verified: userData.verified,
        liked: false,
        ...result.post,
      }
      setFeedPosts((prev) => [post, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };
  if(!userData){
    return <div>Loading...</div>
  }
  return (
    <section className="w-full min-h-screen h-fit text-center bg-black flex flex-col py-10 items-center col-span-5">
      <h1 className="text-white text-5xl font-bold">YOUR FEED</h1>
      <div className={`flex flex-col w-[80%] ${Robotoo.className}`}>
        <PostForm userData={userData} HandlePost={HandleSubmitPost} />
        <DisplayFeed posts={feedPosts} userId={userData.user_id} />
      </div>
    </section>
  );
};

export default Home;
