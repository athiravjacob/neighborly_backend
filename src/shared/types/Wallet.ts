export interface WalletDetails {
    neighborId: string;
    balance: number;
    withdrawableBalance?: number;
    createdAt?: Date;
    updatedAt?: Date;
}