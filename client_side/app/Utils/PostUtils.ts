"use server";
export const GetPosts = async (pathname: string, user_id:number) => {
    try {
      const API_URL = process.env.API_URL;
  
      if (!API_URL) {
        throw new Error('API_URL is not defined');
      }
      const params = {
        userId: user_id.toString(),
      }
      const queryString = new URLSearchParams(params).toString();


      const response = await fetch(`${API_URL}/${pathname}?${queryString}`, {
        method: 'GET', // Default method is GET, can be omitted
        headers: {
          'Content-Type': 'application/json', // Adjust headers if needed
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (err) {
      // Log and handle the error
      console.error('Error fetching posts:', err);
      return []; // Return an empty array in case of an error
    }
  };

export const CreatePost = async(postObject: {author: number, content:string}) => {
  try{
    const API_URL = process.env.API_URL;
  
      if (!API_URL) {
        throw new Error('API_URL is not defined');
      } 
        const response = await fetch(`${API_URL}/post/create`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(postObject),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (err) {
      // Log and handle the error
      console.error('Error fetching posts:', err);
      return []; // Return an empty array in case of an error
    }

}

export const LikePost = async (user_id:number, post_id:number, like:boolean) =>{
  try{
    const API_URL = process.env.API_URL;

      if (!API_URL) {
        throw new Error('API_URL is not defined');
      } 
        const likeObject = {user_id, post_id, like}
        const response = await fetch(`${API_URL}/post/like`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(likeObject),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (err) {
      // Log and handle the error
      console.error('Error fetching posts:', err);
      return []; // Return an empty array in case of an error
    }

}