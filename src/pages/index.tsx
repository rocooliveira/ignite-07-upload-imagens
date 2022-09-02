import { Button, Box } from '@chakra-ui/react';
import { useMemo, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import {  useInView } from 'react-intersection-observer';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface ImageProps{
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetImagesResponseProps{
  after: string;
  data: ImageProps[];
}
export default function Home(): JSX.Element {

  const { ref, inView } = useInView();

  async function fetchImages({pageParam = null}):Promise<GetImagesResponseProps>{
    const { data } = await api('/api/images', {
      params: {
        after: pageParam
      }
    })
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages,{
      getNextPageParam: lastPage => lastPage?.after || null
  });

  useEffect( () => {
    if(inView){
      fetchNextPage();
    }
  }, [inView]);

  const formattedData = useMemo(() => {
    const formatted = data?.pages.flatMap(item => {
      return item.data.flat();
    });
    return formatted;
  }, [data]);

  if( isLoading && !isError ){
    return <Loading/>
  }

  if( !isLoading && isError ){
    return <Error/>
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        { hasNextPage && (
          <Button
            ref={ref}
            onClick={ () => fetchNextPage() }
            disabled={isFetchingNextPage}
            mt={6}
          >
            { isFetchingNextPage ? 'Carregando...' : 'Carregar mais' }
          </Button>
        )}
      </Box>
    </>
  );
}
