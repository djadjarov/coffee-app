import {useRouter} from "next/router"
import Link from "next/link"
import coffeeStoresData from "../../data/coffee-stores.json";


export async function getStaticProps(staticProps) {
  const params = getStaticProps.params;
  return {
    props: {
      coffeeStores: coffeeStoresData.find((coffeStore => {
        return coffeStore.id === 0;
      })),
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '0' } }, 
      { params: { id: '1' } }
    ],
    fallback: false, // can also be true or 'blocking'
  }
}

const coffeeShop = () => {
  const router = useRouter();
  return (
    <>
    <div>{router.query.id}</div>
    <Link href="/">home page </Link>
    <Link href="/coffee-shop/dynamic"> Dynamic Page</Link>
    </>
  )
}

export default coffeeShop