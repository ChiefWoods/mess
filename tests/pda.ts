import { PublicKey } from '@solana/web3.js';
import idl from '../target/idl/mess.json';

const CHAT_PROGRAM_ID = new PublicKey(idl.address);

export function getChatPda(authority: PublicKey) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('global'), authority.toBuffer()],
    CHAT_PROGRAM_ID
  )[0];
}
