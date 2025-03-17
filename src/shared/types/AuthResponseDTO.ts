export interface AuthResponseDTO {
    id: string;
    name: string;
    email: string;
    token: string;
    type: 'user' | 'neighbor';
  }