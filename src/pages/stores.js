import Head from 'next/head'
import { FaExternalLinkAlt } from 'react-icons/fa';

import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";

import Layout from '@components/Layout';
import Container from '@components/Container';
import Map from '@components/Map';

import styles from '@styles/Page.module.scss'

export default function Stores({ storeLocations }) {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container>
        <h1>Locations</h1>

        <div className={styles.stores}>

          <div className={styles.storesLocations}>
            <ul className={styles.locations}>
              {storeLocations.map((location) => {
                  return (
                    <li key={location.id}>
                      <p className={styles.locationName}>
                        {location.name}
                      </p>
                      <address>
                        {location.address}
                      </address>
                      <p>
                        {location.phoneNumber}
                      </p>
                      <p className={styles.locationDiscovery}>
                        <button>
                          View on Map
                        </button>
                        <a href={`https://www.google.com/maps/dir//${location.location.latitude},${location.location.longitude}/@{location.location.latitude},${location.location.longitude},12z/`} target="_blank" rel="noreferrer">
                          Get Directions
                          <FaExternalLinkAlt />
                        </a>
                      </p>
                    </li>
                  )
                })}
            </ul>
          </div>
          <div className={styles.storesMap}>
            <div className={styles.storesMapContainer}>
              <Map className={styles.map} center={[0, 0]} zoom={2} scrollWheelZoom={false}>
                {({TileLayer, Marker, Popup}, map) => {
                  return (
                    <>
                      <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {storeLocations.map((location) => {

                        const { latitude, longitude } = location.location

                        return (
                          <Marker position={[latitude, longitude]} key={location.name}>
                            <Popup>
                                <p>{location.name}</p>
                                <p>{location.address}</p>
                            </Popup>
                          </Marker>
                        )
                      })}
                    </>
                  )
                }}
              </Map>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}


export async function getStaticProps() {
  const client  = new ApolloClient({
    uri: 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cldw1isol1vlm01ulh98o2d1l/master',
    cache: new InMemoryCache()
  });
  
  const data = await client.query({
    query: gql`
      query PageStores {
        storeLocations {
          address
          id
          name
          phoneNumber
          location {
            latitude
            longitude
          }
        }
      }
    `
  })

  const storeLocations = data.data.storeLocations;

  return {
    props: {
      storeLocations
    }
  }
}