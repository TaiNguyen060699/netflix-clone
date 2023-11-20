import { getSession } from 'next-auth/react';
import Navbar from '@/components/Navbar'
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';

import useMoviesList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModal';

import Head from 'next/head';

// Check user login
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
export default function Home() {
  const { data: movies = [] } = useMoviesList()
  const { data: favorites = [] } = useFavorites()
  const {isOpen, closeModal} = useInfoModalStore();
  return (  
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title="Trending now" data={movies}/>
        <MovieList title="My List" data={favorites}/>
      </div>
    </>
  )
}
