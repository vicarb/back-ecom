import Image from 'next/image'
import CreateProduct from '@/components/CreateProduct/CreateProduct'
import ProductForm from '@/components/ProductForm/ProductForm'
import UploadForm from '@/components/UploadForm/UploadForm'
import ProductContainer from '@/components/ProductContainer/ProductContainer'
import Checkout from '@/components/Checkout/Checkout'
import AddressInput from '@/components/AddressInput/AddressInput'
import Coberturas from '@/components/Coberturas/Coberturas'
import Cotizador from '@/components/Cotizador/Cotizador'
import ProductList from '@/components/ProductList/ProductList'
export default function Home() {
  return (
    <>
    <ProductContainer/>
    <ProductForm/>``
    <Checkout/>
    <AddressInput/>
    <Coberturas/>
    <Cotizador/>
    <ProductList/>
    </>
  )
}
