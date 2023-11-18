import { signOut } from 'next-auth/react'
import { getSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/useCurrentUser';

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
  const { data: user } = useCurrentUser()
  return (
    <>
     <h1 className='text-4xl text-green-500'>Netflix clone</h1>
     <p className='text-white'>Logged is as: {user?.name}</p>
     <button className='h-10 w-full bg-white' onClick={() => signOut()}>Logout!</button>
    </>
  )
}
