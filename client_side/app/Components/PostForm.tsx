import React, { useState } from "react";
import { UserData } from "../Types/User";
import Image from "next/image";
import Link from "next/link";

interface PostFormProps {
  userData: UserData | null
  HandlePost: (e: React.FormEvent<HTMLFormElement>, content: string) => void
}
const PostForm = ({ userData, HandlePost }: PostFormProps) => {

  const [twweetContent , setTwwwetContent ] = useState<string>("")

  return (
    <section className="w-full h-fit p-2 my-3 flex flex-col">
      <div className="w-full h-fit flex flex-row relative">
        {userData && userData.verified ? (
          <div className="h-6 w-6 bg-blue-700 rounded-full absolute z-20 -translate-x-1 -translate-y-1">
            <h1 className="font-bold text-white">V</h1>
          </div>
        ) : (
          <></>
        )}
        <div className=" h-14 overflow-hidden w-14 rounded-full flex relative">
          <Image
            width={100}
            height={100}
            alt="user_image"
            src={userData?.user_profile || "/images/user_profile.jpg"}
          />
        </div>
        <div className="flex flex-col ml-2">
          <h1 className="text-white text-xl">{userData?.display_name}</h1>
          <span className="text-gray-400">
            <Link href={`/profile/${userData?.username}`}>
              @{userData?.username}
            </Link>
          </span>
        </div>
      </div>
      <form className="w-full h-full mt-1 " method="post" onSubmit={(e) => HandlePost(e, twweetContent)}>
        <textarea
          onChange={(e) => setTwwwetContent(e.target.value)}
          style={{ resize: "none" }}
          placeholder="Write your anti social tweet, (not a real tweet)..."
          className=" p-2 text-white w-full h-[200px] bg-transparent border-2 border-white rounded-lg"
          name="content"
          id="content"
        />
        <input
         className="cursor-pointer text-white text-2xl w-[200px] h-[60px] font-bold uppercase border-2 border-white rounded-lg" type="submit" value="AntiTwweet" />
      </form>
    </section>
  );
};

export default PostForm;
