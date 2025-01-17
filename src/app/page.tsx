'use client';
import { WheelComponent } from '@/components/WheelSpin';
import { useUser } from '@/hooks/useUser';
import { User } from '@/types';
import { useEffect } from 'react';

export default function Home() {
  const { setUserInfo } = useUser();
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Mezon?.WebView) {
      window.Mezon.WebView.postEvent('PING', 'Ping', () => {
        console.log('Hello Mezon!');
      });

      window.Mezon.WebView.onEvent<{ user: User }>(
        'CURRENT_USER_INFO',
        (_, userData) => {
          if (!userData || !userData.user) {
            return;
          }
          setUserInfo(userData.user);
        }
      );
    } else {
      console.warn('Mezon WebView is not available');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="flex flex-col items-center justify-center w-full ">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/bg.jpg')",
        }}
      ></div>
      <WheelComponent />
    </section>
  );
}
