import Head from 'next/head';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-svg-core/styles.css";


const contentful = require('contentful');

let client = contentful.createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticProps() {
let data = await client.getEntries({
    content_type: 'imageCarousel'
  });

  return {
    props: {
      data: data.items
    },
    revalidate: 1,
  };
}

export default function MyApp ({ data }) {
  console.log(data)
  return (
    <section>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* ccntent type  */}
        <div className="row py-4">
          <div className="container">
            <h5>Components</h5>
            <ul>
              {data.map((data) => (
              <li key={data.sys.id}>
                <Link href={'/component/' + data.sys.id}>
                  <a>{data.fields.title}</a>
                </Link>
              </li>
              ))}  
            </ul>
          </div>
        </div>
      </main>
    </section>
  )
}
