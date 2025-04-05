import { Connection, PublicKey } from '@solana/web3.js';

export const connection = new Connection(import.meta.env.VITE_RPC_URL);
export const MESS_PROGRAM_ID = new PublicKey(import.meta.env.VITE_MESS_PROGRAM_ID);
