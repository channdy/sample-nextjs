import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getPosts} from "../lib/api.js";

export async function getServerSideProps(ctx){
  let posts = await getPosts();
  return {
    props:{
      posts
    }
  }
}

export default function Home({posts}) {
  // console.log(posts);
  return (
    <div className={styles.container}>
      <Head>
        <title>CMS blog</title>
        <meta name="description" content="CMS Wordpress with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      {
        posts.map((post,index) => (
          <div key={index}>

              <Link href={`/posts/${post.node.slug}`} style={{color:'blue'}}>{post.node.title}</Link>
            
            <div dangerouslySetInnerHTML={{__html:post.node.excerpt}} />

            <p>By {post.node.author.node.name}</p>
          </div>
        ))
        }
      </main>

      <footer className={styles.footer}>
        <p>Posts</p>
      </footer>
    </div>
  )
}
