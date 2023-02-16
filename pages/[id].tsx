import Button from '@mui/material/Button';
import { Suspense } from "react";
import Link from 'next/link';
import { BASE_URL } from '../store/constant-data';
import { IUser } from '../types';
import styles from '../styles/user.module.css';

export const getStaticPaths = async () => { 
  try {
      const res = await fetch(BASE_URL)
      const json = await res.json()
      const paths = json.map((user: IUser) => {
        return {
          params: { id: user.id.toString() } 
        }
      })
      return {
        paths,
        fallback: false
      };
    } catch (error) {
      console.log(error)
    }
}
 
export const getStaticProps = async (context: { params: { id: any; }; }) => {
  const id = context.params.id;

  try {
    const res = await fetch(`${BASE_URL}/${id}`)
    const json = await res.json()
    return {
      props: {
        user: json
      }
    }
  } catch (error) {
    console.log(error)
  }
}


const User = ({ user }: { user: IUser }) => (
  <div className={styles['user_page']}>
    <Suspense fallback={<div>ЗАГРУЗКА...</div>}>
      <div>
        <h3>{user.name}</h3>
        <span>{user.username}</span>
        <span>{user.email}</span>
      </div>
      <Link href={'/'} className={styles['link']}>
        <Button variant="outlined">Назад</Button>
      </Link> 
    </Suspense>
  </div>
)

export default User;
 