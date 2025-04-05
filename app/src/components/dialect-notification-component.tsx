import '@dialectlabs/react-ui/index.css';
import { DialectSolanaSdk } from '@dialectlabs/react-sdk-blockchain-solana';
import { NotificationsButton } from '@dialectlabs/react-ui';
import { Button } from './ui';
import { Bell } from 'lucide-react';
import { useTheme } from './theme-provider';
import { MESS_PROGRAM_ID } from '@/lib/constants';

export const DialectNotificationComponent = () => {
  const { theme } = useTheme();

  return (
    <DialectSolanaSdk dappAddress={MESS_PROGRAM_ID.toBase58()}>
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
