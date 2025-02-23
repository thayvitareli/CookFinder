import { focusManager, onlineManager, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { useEffect, useState } from 'react';
import Home from './home'; 
import NetInfo from '@react-native-community/netinfo';
import { AppState, AppStateStatus } from 'react-native';


export default function App() {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });
  }, [NetInfo, onlineManager]);

  useEffect(() => {
    const subscriber = AppState.addEventListener('change', onFocusRefetch);

    return () => subscriber.remove();
  }, []);

  const onFocusRefetch = (status: AppStateStatus) => {
    focusManager.setFocused(status == 'active');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
