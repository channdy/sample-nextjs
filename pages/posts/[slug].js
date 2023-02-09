import {getSinglePost} from "../../lib/api";
import Head from "next/head";
import styles from '../../styles/Home.module.css';

export async function getServerSideProps(ctx){
    // console.log(ctx);
    console.log(ctx.req.headers['host']);
    let {slug} = ctx.params;
    // console.log(slug);
    let post = await getSinglePost(slug);
    const UA = ctx.req.headers['user-agent'];
    const isMobile = Boolean(UA.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))
    // console.log(isMobile);
    const REDIRECT_URL = process.env.WORDPRESS_REDIRECT_URL;
    if (isMobile){
        return {
            redirect: {
                destination: `${REDIRECT_URL}/${slug}`,
                permanent: false,
              },
        }    
    } else {
        return {
            props:{
                post
            }
        }
    }
    
}

export default function Post({post}) {
    // console.log(post);
    // console.log(ctx);
    return (

        <div className={styles.container}>

            <Head>
                {/* <title>{post.title}</title> */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="description" content={post.excerpt.replace(/<\/?[^>]+(>|$)/g, "")}></meta>
                <title>{post.title}</title>
                <meta property="og:url" content={post.slug} key="ogurl" />
                <meta property="og:image" content={post.featuredImage.node.sourceUrl} key="ogimage" />
                {/* <meta property="og:site_name" content="" key="ogsitename" /> */}
                <meta property="og:title" content=" " key="ogtitle" />
                <meta property="og:description" content=" " key="ogdesc" />
            </Head>
            <main>                
                <div dangerouslySetInnerHTML={{__html:post.excerpt}} />
                <br />
                <br />
                <div dangerouslySetInnerHTML={{__html:post.content}} />
            </main>

        </div>
    )
}