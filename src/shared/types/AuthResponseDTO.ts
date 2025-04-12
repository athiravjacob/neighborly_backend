export interface AuthResponseDTO {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    type: 'user'|'admin' | 'neighbor';
}
  
export interface RefreshToken {
  userId: string; 
  token: string;
  expiresAt: Date;
  type: 'user' | 'neighbor' | 'admin';
}