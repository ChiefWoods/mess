import '@dialectlabs/react-ui/index.css';
import { DialectSolanaSdk } from '@dialectlabs/react-sdk-blockchain-solana';
import { NotificationsButton } from '@dialectlabs/react-ui';
import { Button } from './ui';
import { Bell } from 'lucide-react';
import { useTheme } from './theme-provider';

const DAPP_ADDRESS = 'MESS6sYCuTxwEZsF8M6zrkBdUd4oNvqWCdyBTx6KFNo';

export const DialectNotificationComponent = () => {
  const { theme } = useTheme();

  return (
    <DialectSolanaSdk dappAddress={DAPP_ADDRESS}>
      <NotificationsButton theme={theme === 'system' ? 'dark' : theme}>
        {({ setOpen, unreadCount, ref }) => {
          return (
            <Button
              ref={ref}
              onClick={() => setOpen((prev) => !prev)}
              size={'icon'}
              className="btn"
            >
              {unreadCount > 0 && (
                <div className="absolute right-[15%] top-[15%] flex h-3 w-3 items-center justify-center rounded-full border-2 border-solid border-primary bg-secondary text-xs text-primary"></div>
              )}
              <Bell size={20} />
            </Button>
          );
        }}
      </NotificationsButton>
    </DialectSolanaSdk>
  );
};
