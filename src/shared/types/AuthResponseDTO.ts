export interface AuthResponseDTO {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    type: 'user'|'admin' | 'neighbor';
  }