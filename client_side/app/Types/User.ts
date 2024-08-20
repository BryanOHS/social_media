export interface RegisterInfo{
    username: string,
    email: string,
    password:string
}

export interface LoginInfo{
    username: string,
    password:string,
}

export interface UserData {
    user_id: number;
    username: string;
    display_name: string | null;
    email: string;
    user_profile: string | null;
    user_banner: string | null;
    verified: boolean;
    friends_amount: number;
  }
  