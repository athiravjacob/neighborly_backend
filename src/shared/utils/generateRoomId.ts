export function generateRoomId(userId: string, neighborId: string): string {
    return [userId, neighborId].sort().join('-');
  }
  