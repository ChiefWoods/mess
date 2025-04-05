import { PublicKey } from '@solana/web3.js';
import { MESS_PROGRAM_ID } from './constants';

export function getChatPda(owner: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('global'), owner.toBuffer()],
    MESS_PROGRAM_ID
  )[0];
}
