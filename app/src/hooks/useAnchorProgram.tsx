import { Mess } from '@/types/mess';
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { AnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { useCallback, useMemo } from 'react';
import idl from '@/idl/mess.json';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { Chat } from '@/types/accounts';

export function useAnchorProgram() {
  const { connection } = useConnection();
  const program = useMemo(() => {
    return new Program<Mess>(
      idl,
      new AnchorProvider(connection, {} as AnchorWallet, {
        commitment: 'confirmed',
      })
    );
  }, [connection]);

  async function getInitIx(
    authority: PublicKey
  ): Promise<TransactionInstruction> {
    return await program.methods
      .init()
      .accounts({
        authority,
      })
      .instruction();
  }

  async function getSendIx(
    text: string,
    chatPda: PublicKey,
    sender: PublicKey
  ): Promise<TransactionInstruction> {
    return await program.methods
      .send(text)
      .accounts({
        sender,
        chat: chatPda,
      })
      .instruction();
  }

  const fetchChatAcc = useCallback(
    async (chatPda: PublicKey) => {
      return await program.account.chat.fetchNullable(chatPda);
    },
    [program]
  );

  const getChatSubscription = useCallback(
    (chatPda: PublicKey, setChatAcc: (chatAcc: Chat) => void) => {
      const eventEmitter = program.account.chat.subscribe(chatPda);

      eventEmitter.on('change', (acc) => {
        setChatAcc(acc);
      });

      return {
        unsubscribe: () => {
          eventEmitter.off('change', setChatAcc);
          program.account.chat.unsubscribe(chatPda);
        },
      };
    },
    [program]
  );

  return {
    getInitIx,
    getSendIx,
    fetchChatAcc,
    getChatSubscription,
  };
}
