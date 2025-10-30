import { Box, Text, Button, Flex, Badge, Group, Center } from '@mantine/core'
import icon from '../../assets/basket2.svg'
import PopupCard from '../Carts/PopupCart/PopupCart'
import { useTypedSelector } from '../../hooks/redux'
import { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
	const { cart } = useTypedSelector(state => state.catalog)
	const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
	const [opened, setOpened] = useState(false);
	return (
		<Center >
			<Flex className={styles.header} component='header' data-testid="header">
				<Group className={styles.logo}>
					<Text className={styles.logo__text}>Vegatable</Text>
					<Badge className={styles.logo__badge}>SHOP</Badge>
				</Group>
				<Box>
					<Button className={styles.button}
						data-testid='buttonCart'
						onClick={() => setOpened((o) => !o)}
						leftSection={
							totalQuantity > 0 ? (
								<Flex className={styles.button__leftSection} >
									<Text className={styles.button__leftSection__text} data-testid="header-totalQuantity">{totalQuantity}
									</Text>
								</Flex>
							) : null
						}
						rightSection={<img src={icon}
						/>}
					>
						<Text className={styles.button__text}>Cart</Text>
					</Button>
					<PopupCard visible={opened} data-testid='popover-drop' />
				</Box>
			</Flex >
		</Center >
	)
}
