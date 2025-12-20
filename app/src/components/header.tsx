import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from './ui';
import { ArrowLeft, MessageSquareMore, Search } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useForm } from 'react-hook-form';
import { searchFormSchema } from '@/lib/schemas';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { getChatPda } from '@/lib/pda';
import SearchBar from './search-bar';
import ModeToggle from './mode-toggle';
import { useChat } from './chat-provider';
import { DialectNotificationComponent } from './dialect-notification-component';

export function Header() {
  const { publicKey, connected } = useWallet();
  const { setChatPda } = useChat();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);

  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      chatroom: '',
    },
  });

  function showDefaultChatroom() {
    if (publicKey) {
      setChatPda(getChatPda(publicKey));
    }
  }

  function joinChatroom(values: z.infer<typeof searchFormSchema>) {
    setChatPda(new PublicKey(values.chatroom));
    searchForm.reset();
  }

  function handleResize() {
    const belowBreakpoint = window.innerWidth < 640;
    setIsMobile(belowBreakpoint);

    if (!belowBreakpoint) {
      setIsSearchExpanded(false);
    }
  }

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  useEffect(() => {
    if (isSearchExpanded) {
      searchForm.setFocus('chatroom');
    }
  }, [isSearchExpanded, searchForm]);

  useEffect(() => {
    searchForm.reset();
  }, [connected, searchForm]);

  return (
    <header className="flex h-[80px] items-center gap-x-2 pt-4 sm:justify-between sm:gap-x-4">
      {!isSearchExpanded && (
        <Button
          variant={'ghost'}
          className="text-primary hover:text-primary mr-auto flex cursor-pointer items-center gap-x-3 pl-0 hover:bg-transparent"
          onClick={showDefaultChatroom}
        >
          <MessageSquareMore size={32} />
          <p className="hidden text-3xl font-semibold sm:block">Mess</p>
        </Button>
      )}
      {publicKey &&
        (isMobile ? (
          isSearchExpanded ? (
            <>
              <Button
                variant={'ghost'}
                size={'icon'}
                className="text-primary hover:text-primary flex cursor-pointer gap-x-3 hover:bg-transparent"
                onClick={() => setIsSearchExpanded(false)}
              >
                <ArrowLeft size={20} />
              </Button>
              <SearchBar joinChatroom={joinChatroom} searchForm={searchForm} />
            </>
          ) : (
            <Button
              variant={'ghost'}
              size={'icon'}
              className="text-primary hover:text-primary flex cursor-pointer gap-x-3 hover:bg-transparent"
              onClick={() => setIsSearchExpanded(true)}
            >
              <Search />
              <p className="hidden text-3xl font-semibold md:block">Mess</p>
            </Button>
          )
        ) : (
          <SearchBar joinChatroom={joinChatroom} searchForm={searchForm} />
        ))}
      {!isSearchExpanded && (
        <>
          <DialectNotificationComponent />
          <ModeToggle />
          <WalletMultiButton />
        </>
      )}
    </header>
  );
}
