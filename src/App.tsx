import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Intro from './Intro';
import { PaperProvider, configureFonts } from 'react-native-paper';
import { AxiosError, isAxiosError } from 'axios';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (isAxiosError(error)) {
        const data: any = (error as AxiosError).response?.data;
        data.message;

        Toast.show({
          type: 'error',
          text1: '문제가 발생했습니다.',
          text2: data.message
        });
      }
    }
  })
})

export default function App(): JSX.Element {
  useEffect(() => {
    console.log('[App] started');
  })
  const baseFont = {
    fontFamily: 'PretendardVariable',
  }

  const baseVariants = configureFonts({ config: baseFont });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={{
          fonts: baseVariants
        }}>
          <Intro />
        </PaperProvider>
      </QueryClientProvider>
      <Toast />
    </>
  );
}
