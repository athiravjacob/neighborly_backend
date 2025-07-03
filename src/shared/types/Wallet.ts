export interface WalletDetails {
    role: "Admin" | "User" | "Neighbor",
    holder_id: string;
    balance: number;
    withdrawableBalance?: number;
    
}