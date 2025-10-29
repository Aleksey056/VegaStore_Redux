import { Box, Space, Group, Center, Title, Text } from '@mantine/core'
import ProdutCart from '../Carts/ProductCart/ProductCart.tsx'
import ProductCardLoader from '../Carts/ProductCartLoader/ProductCartLoader.tsx';
import { useEffect } from 'react'
import { fetchProducts } from '../../store/ProductSlice.ts'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux.ts'

export default function Main() {
	const dispatch = useTypedDispatch()
	const { catalog, loading, error } = useTypedSelector(state => state.catalog)

	useEffect(() => {
		dispatch(fetchProducts())
	}, [])

	return (
		<>
			<Center>
				<Box component='main' bg='#F3F5FA' maw={1440} mb={100} >
					<Box ml={80} mr={80} >
						<Space h={60} />
						<Title component='h2' fz={32} fw={600}>Catalog</Title>
						<Space h={49} />
						{error && <Text c='red'>Ошибка: {error}</Text>}
						<Group wrap='wrap' gap={24}>
							{loading ?
								Array.from({ length: 30 }).map((_, i) => < ProductCardLoader key={i} />)
								:
								catalog.map(({ id, name, price, image, category }) => (<ProdutCart
									key={`${id}+${name}`}
									id={id}
									name={name}
									price={price}
									image={image}
									category={category}
								// value={1}
								/>)
								)}
						</Group>
					</Box>
				</Box>
			</Center>
		</>
	)
}

