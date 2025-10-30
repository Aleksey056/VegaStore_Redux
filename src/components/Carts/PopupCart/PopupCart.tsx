import { Box, Divider, Flex, Group, Image, Text } from "@mantine/core";
import clearBasket from '../../../assets/cart_empty.svg'
import Stepper from "../../Stepper/Stepper";
import { useTypedDispatch, useTypedSelector } from '../../../hooks/redux'
import { removeFromCart, addToCart } from '../../../store/ProductSlice'
import styles from './PopupCart.module.css'

export default function PopupCard({ visible }: { visible: boolean }) {
	const dispatch = useTypedDispatch()
	const { cart } = useTypedSelector(state => state.catalog)
	const allSum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

	if (!visible) return null;

	if (cart.length <= 0) {
		return (
			<>
				<Flex className={styles.isEmpty} data-testid="popup-drop-is-empty">
					<Image className={styles.isEmpty__image} src={clearBasket} />
					<Text className={styles.isEmpty__text}>You cart is empty!</Text>
				</ Flex >
			</>
		)
	} else {
		return (
			<>
				<Flex className={styles.popup} data-testid="popup-drop-product">
					{cart.map((item, index) => (
						<Box key={item.id + item.price} className="card">
							<Flex className={styles.cart}>
								<Flex className={styles.cart__gap}>
									<Image className={styles.image} src={item.image} />
									<Flex className={styles.column}>
										<Group className={styles.info}>
											<Text className={styles.info__name} component="h4" >{item.name.split(' - ')[0]}</Text>
											<Text className={styles.info__price} component="span">{item.name.trim().split('-')[1]}</Text>
										</Group>
										<Text className={styles.sum}>$ {item.price * item.quantity}</Text>
									</Flex>
								</Flex>
								<Stepper
									data-testid="stepper-popup"
									value={item.quantity}
									onChange={(value) => {
										if (value < 1) {
											dispatch(removeFromCart(item.id))
										} else {
											dispatch(addToCart({ catalog: item, quantity: value - item.quantity }))
										}
									}
									} />
							</Flex>
							{index !== cart.length - 1 && (
								<Divider className={styles.divider} />)}
						</Box>
					))}
					<Flex className={styles.total}>
						<Text className={styles.total__text}>
							Total
						</Text>
						<Text className={styles.total__text}>
							$ {allSum}
						</Text>
					</Flex>
				</Flex >
			</>
		)
	}
}