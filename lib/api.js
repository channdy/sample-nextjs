const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' }

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
      headers[
        'Authorization'
      ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
    }

    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    })

    const json = await res.json()
    if (json.errors) {
      console.error(json.errors)
      throw new Error('Failed to fetch API')
    }
    return json.data
  }

  export async function getPosts(){
    const data = await fetchAPI(
        `query AllPosts {
          posts(first: 20) {
            edges {
              node {
                title
                id
                categories{
                edges{
                    node{
                    name
                    }
                }
                }
                excerpt
                slug
                author {
                  node {
                    name
                    firstName
                    lastName
                  }
                }
              }
            }
          }
        }
      `,
        {
          variables: {},
        }
      );
    return data?.posts?.edges;
}

export async function getSinglePost(id){
  // console.log(slug);
  const data = await fetchAPI(`
  query getSinglePost($id: ID!){
    post(id: $id, idType: SLUG) {
            title
            categories{
            edges{
                node{
                name
                }
            }
            }
            excerpt
            content
            slug
            id
            author {
              node {
                name
                firstName
                lastName
              }
            }
            featuredImage {
              node {
                sourceUrl(size: MEDIUM_LARGE)
              }
            }
      }
    }
  `,{variables: {id}});

  return data?.post;
}