import { useEffect, useState } from "react";
import ky from 'ky'
import type { Product } from "../types/Product";

export default function useProducts() {
	const url = "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"

	const [catalog, setCatalog] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const getProductsAPI = async () => {
			try {
				const products = await ky.get(url).json<Product[]>();
				setCatalog(products)
				setLoading(false)
			} catch (err) {
				console.log('Ошибка загрузки каталога: ', err)
			}
		}
		getProductsAPI()
	}, [])
	return { loading, catalog }
}