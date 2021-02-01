import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import "@fortawesome/fontawesome-svg-core/styles.css";
import Carousel from 'react-bootstrap/Carousel';

const contentful = require('contentful');

let client = contentful.createClient({
  space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
});

// get static paths for blogs based on slug
export async function getStaticPaths() {
    let data = await client.getEntries({
        content_type: 'imageCarousel',
    });

    // return blogs by slug loop
    return {
        paths: data.items.map((item) => ({   
            params: { id: item.sys.id },
        })),
        fallback: true,
    };
}

export async function getStaticProps({ params }) {
    let data = await client.getEntries({
        content_type: 'imageCarousel',
        'sys.id': params.id,
    })
    return {
        props: {
          data: data.items[0],
        },
         revalidate: 1,
    };
}

export default function Blog({data}) {
    return (
    <div> 
        {console.log(data.fields)}
        <main>
        {/* ccntent type  */}
        <div className="row py-4">
          <div className="container">
            <h5>{data.fields.title}</h5>
            <span>{data.fields.shortDescription}</span>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-7 pt-4">
                <span className="font-weight-bold">Example preview:</span>
              </div>
              <div className="col-5 pt-4">
                <a href="/" className="text-muted">
                  <FontAwesomeIcon icon={faExternalLinkAlt}/><span className="ml-2">Open in new window</span>
                </a>     
                <a href="/" className="text-muted ml-3">
                  <FontAwesomeIcon icon={faExternalLinkAlt}/><span className="ml-2">Open full documentation</span>
                </a>     
              </div>
            </div>
          </div>
        </div>
        {/* content preview  */}
        <div className="container-fluid pl-5 pr-5">
          <div className="row pl-5 pr-5 pb-5">
            <div className="container-fluid pt-3 pb-3 box">
              {/*!-- Hero Slider */}
              <Carousel className="owl-carousel owl-theme owl-dots-modern home-full-slider owl-loaded owl-drag">
                {data.fields.carouselItem.map((edge, i) => 
                <Carousel.Item key={i} style={{ height: '600px'}}>
                    <img className="carousel-image" src={edge.fields.image.fields.file.url} alt={edge.fields.altText}/>
                    <div className="container-fluid h-100 py-5 absolute">
                      <div className="row align-items-center h-100">
                        <div className="col-lg-8 col-xl-6 mx-auto text-white text-center">
                          <h1 className="mb-4 display-2 text-uppercase font-weight-bold">{edge.fields.name}</h1>
                          <p className="lead mb-4">{edge.fields.name}</p>
                          <a className="btn btn-light" href={edge.fields.slug}>Collection</a>
                        </div>
                      </div>
                  </div>
                </Carousel.Item>
                )}
              </Carousel> 
            </div>
          </div>
        </div>
      </main>
    </div> 
    );
}