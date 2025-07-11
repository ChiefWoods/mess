import { beforeAll, describe, expect, test } from 'bun:test';
import { Program } from '@coral-xyz/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Mess } from '../target/types/mess';
import { LiteSVM } from 'litesvm';
import { LiteSVMProvider } from 'anchor-litesvm';
import { expectAnchorError, fundedSystemAccountInfo, getSetup } from './setup';
import { fetchChatAcc } from './accounts';
import { getChatPda } from './pda';

describe('mess', () => {
  let { litesvm, provider, program } = {} as {
    litesvm: LiteSVM;
    provider: LiteSVMProvider;
    program: Program<Mess>;
  };

  let chatPda: PublicKey;

  const messager = Keypair.generate();

  beforeAll(async () => {
    ({ litesvm, provider, program } = await getSetup([
      {
        pubkey: messager.publicKey,
        account: fundedSystemAccountInfo(),
      },
    ]));

    chatPda = getChatPda(provider.wallet.payer.publicKey);
  });

  test('initializes chat', async () => {
    await program.methods
      .init()
      .accounts({
        authority: provider.wallet.payer.publicKey,
      })
      .signers([provider.wallet.payer])
      .rpc();

    const chat = await fetchChatAcc(program, chatPda);

    expect(chat.authority).toStrictEqual(provider.wallet.payer.publicKey);
    expect(chat.messages).toEqual([]);
  });

  test('sends message', async () => {
    const message = 'Hello world';
    const sender = provider.wallet.payer.publicKey;

    await program.methods
      .send(message)
      .accounts({
        chat: chatPda,
        sender,
      })
      .signers([provider.wallet.payer])
      .rpc();

    const chat = await fetchChatAcc(program, chatPda);

    expect(chat.messages[0].sender).toEqual(sender);
    expect(chat.messages[0].text).toEqual(message);
  });

  test('sends message from another wallet', async () => {
    const message = 'Hey there';
    const sender = messager.publicKey;

    await program.methods
      .send(message)
      .accounts({
        chat: chatPda,
        sender: messager.publicKey,
      })
      .signers([messager])
      .rpc();

    const chat = await fetchChatAcc(program, chatPda);

    expect(chat.messages[1].sender).toEqual(sender);
    expect(chat.messages[1].text).toEqual(message);
  });

  test('throws an error when text is too long', async () => {
    const veryLongText = 'a'.repeat(256);

    try {
      await program.methods
        .send(veryLongText)
        .accounts({
          chat: chatPda,
          sender: provider.wallet.payer.publicKey,
        })
        .signers([provider.wallet.payer])
        .rpc();
    } catch (err) {
      expectAnchorError(err, 'TextTooLong');
    }
  });

  test('throws an error when text is empty', async () => {
    try {
      await program.methods
        .send('')
        .accounts({
          chat: chatPda,
          sender: provider.wallet.payer.publicKey,
        })
        .signers([provider.wallet.payer])
        .rpc();
    } catch (err) {
      expectAnchorError(err, 'TextEmpty');
    }
  });
});
