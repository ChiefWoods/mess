import {
  AddressType,
  DappMessageActionType,
  Dialect,
  DialectCloudEnvironment,
  DialectSdk,
} from '@dialectlabs/sdk';

import {
  Solana,
  SolanaSdkFactory,
  NodeDialectSolanaWalletAdapter,
} from '@dialectlabs/blockchain-sdk-solana';
import { truncateAddress } from './utils';

const environment: DialectCloudEnvironment = 'production';

const sdk: DialectSdk<Solana> = Dialect.sdk(
  {
    environment,
  },
  SolanaSdkFactory.create({
    wallet: NodeDialectSolanaWalletAdapter.create(),
  })
);

const dapp = await sdk.dapps.find();

export async function notifyChatOwner(
  sender: string,
  message: string,
  owner: string
) {
  await dapp?.messages.send({
    title: `Message from ${truncateAddress(sender)}`,
    message,
    recipient: owner,
    notificationTypeId: '3718b994-a613-4b4a-b243-f9e19c9e2bcf',
    addressTypes: [AddressType.Email, AddressType.Telegram],
    actionsV2: {
      type: DappMessageActionType.LINK,
      links: [
        {
          label: 'View Chatroom',
          url: window.location.href,
        },
      ],
    },
  });
}
