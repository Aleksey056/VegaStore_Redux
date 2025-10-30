import { Button, Card, Flex, Group, Image, Text } from "@mantine/core";
import basket from '../../../assets/basketGreen.svg'
import type { Product } from "../../../types/Product";
import Stepper from "../../Stepper/Stepper";
import { useState } from "react";
import { useTypedDispatch } from '../../../hooks/redux'
import { addToCart } from "../../../store/ProductSlice";
import styles from './ProductCart.module.css'

export default function ProdutCart({ id, name, price, image }: Product) {
	const dispatch = useTypedDispatch()
	const [value, setValue] = useState(1);

	const handleAddPopup = () => {
		if (value > 0) {
			dispatch(addToCart({ catalog: { id, name, price, image }, quantity: value }))
			setValue(1)
		}
	}

	return (
		<Card className={styles.productCart}>
			<Flex className={styles.productCart__block}>
				<Image className={styles.sectionImage} src={image}></Image>
				<Group className={styles.sectionItem}>
					<Group className={styles.sectionItem__info}>
						<Text className={styles.sectionItem__info__name} component="h4">{name.split(' - ')[0]}</Text>
						<Text component="span" className={styles.sectionItem__info__wt} >{name.trim().split('-')[1]}</Text>
					</Group>
					<Stepper value={value} onChange={setValue} />
				</Group>
				<Flex className={styles.sectionBottom} align={'center'} justify={'space-between'} >
					<Text className={styles.sectionBottom__price}>$ {price * value}</Text>
					<Button className={styles.sectionBottom__button} disabled={value < 1}
						leftSection={<Text className={styles.button__text}>Add to cart</Text>}
						rightSection={<Image src={basket}></Image>} onClick={handleAddPopup}>
					</Button>
				</Flex>
			</Flex>
		</Card >
	)
}