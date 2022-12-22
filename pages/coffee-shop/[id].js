import { useRouter } from "next/router";
import Link from "next/link";
import coffeeStoresData from "../../data/coffee-stores.json";
import Head from "next/head";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import {fetchCoffeStores} from "../../lib/coffee-stores"
import { useContext, useState, useEffect } from "react";

import { StoreContext } from "../../store/store-context";

import { isEmpty } from "../../utils";

export async function getStaticProps(staticProps) {
  const coffeeStores = await fetchCoffeStores();
  const params = staticProps.params;
  const findCoffeStoreBId = coffeeStores.find((coffeStore) => {
    return coffeStore.id.toString() === params.id;
  });

  console.log(params);
  return {
    props: {
      coffeeStore: findCoffeStoreBId ? findCoffeStoreBId : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: { id: coffeeStore.id.toString(), },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

const coffeeShop = (initialProps) => {
  const router = useRouter();
  // console.log(props.coffeeStores.address);

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  // const { name, address, imgUrl } = props.coffeeStores;
  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id; //dynamic id
        });
        setCoffeeStore(findCoffeeStoreById);
      }
    }
  }, [id]);

  const { name, address, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    console.log("button");
  }

  return (
    <div className={styles.layoot}>
      {/* <div>{router.query.id}</div> */}
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home page </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={250}
            height={180}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="places icon"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt="places icon"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="places icon"
            />
            <p className={styles.text}>10</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default coffeeShop;
