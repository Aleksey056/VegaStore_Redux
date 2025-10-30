import { Box, Group, Center, Title, Text } from '@mantine/core'
import ProdutCart from '../Carts/ProductCart/ProductCart.tsx'
import ProductCardLoader from '../Carts/ProductCartLoader/ProductCartLoader.tsx';
import { useEffect } from 'react'
import { fetchProducts } from '../../store/ProductSlice.ts'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux.ts'
import styles from './Main.module.css'

export default function Main() {
	const dispatch = useTypedDispatch()
	const { catalog, loading, error } = useTypedSelector(state => state.catalog)

	useEffect(() => {
		dispatch(fetchProducts())
	}, [])

	return (
		<>
			<Center>
				<Box className={styles.main} component='main' >
					<Box className={styles.box}>
						<Title className={styles.title} component='h2'>Catalog</Title>
						{error && <Text className={styles.title__error}>Ошибка: {error}</Text>}
						<Group className={styles.group}>
							{loading ?
								Array.from({ length: 30 }).map((_, i) => < ProductCardLoader key={i} />)
								:
								catalog.map(({ id, name, price, image, category }) => (<ProdutCart
									key={`${id}+${name}`}
									id={id}
									name={name}
									price={price}
									image={image}
									category={category} />)
								)}
						</Group>
					</Box>
				</Box>
			</Center>
		</>
	)
}

