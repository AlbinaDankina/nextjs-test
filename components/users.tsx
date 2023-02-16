import { useAppSelector, useAppDispatch } from '@/store/hooks';
import Link from 'next/link';
import { getUsers } from '../store/userSlice';
import { Suspense, useEffect } from 'react';
import styles from '../styles/users.module.css';
import { Loader } from './loader';


export const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.user.users);
  const status = useAppSelector(state => state.user.status);

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const singleUser = users?.map((u) => {
    return (
      <li key={u.id} className={styles['user']}>
        <Link href={`/${u.id}`} className={styles['link']}>
          <Suspense fallback={<div>ЗАГРУЗКА...</div>}>
            {u.name}
          </Suspense>
        </Link>
      </li>
    )
  })
  
  if (status === 'IDLE' || status === 'LOADING') return <Loader />;

  return (
      <ul>
        {status === 'SUCCEEDED' && singleUser}
      </ul>
  )
}
