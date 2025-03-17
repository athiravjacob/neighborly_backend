export interface UserDTO {
    id?: string;
    email: string;
  name: string;
  role: 'user' | 'admin';
    profilePicUrl?: string;
  }