export interface Donation {
  id?: number;
  date: string;
  amount: string;
  memo?: string;
  method: 'Cash' | 'Check' | 'Online'; 
  DonorId: number | undefined;
}