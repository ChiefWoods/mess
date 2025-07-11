import { PublicKey } from '@solana/web3.js';
import { Mess } from '../target/types/mess';
import { Program } from '@coral-xyz/anchor';

export async function fetchChatAcc(program: Program<Mess>, chatPda: PublicKey) {
  return await program.account.chat.fetchNullable(chatPda);
}
