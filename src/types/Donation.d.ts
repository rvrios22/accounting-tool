export interface Donation {
  id?: number;
  date: string;
  amount: number;
  memo?: string;
  method: string; 
  DonorId: number;
}