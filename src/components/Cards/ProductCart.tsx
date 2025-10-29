import { Button, Card, Flex, Group, Image, Text } from "@mantine/core";
import basket from '../../assets/basketGreen.svg'
import basketHover from '../../assets/basket.svg'
import type { Product } from "../../types/Product";
import Stepper from "../Stepper/Stepper";
import { useState } from "react";
import { useHover } from "@mantine/hooks";
import { useTypedDispatch } from '../../hooks/redux'
import { addToCart } from "../../store/ProductSlice";

export default function ProdutCart({ id, name, price, image }: Product) {
	const dispatch = useTypedDispatch()
	const [value, setValue] = useState(1);
	const { hovered, ref } = useHover();

	const handleAddPopup = () => {
		if (value > 0) {
			dispatch(addToCart({ catalog: { id, name, price, image }, quantity: value }))
			setValue(1)
		}
	}

	return (
		<Card bdrs={24} w={302} h={414} py={16}>
			<Flex direction={'column'} justify={'center'} gap={16}>
				<Image src={image} w={276} h={276}></Image>
				<Group justify="space-between">
					<Group gap={12} justify="space-between">
						<Text component="h4" fw={600} fz={18}>{name.split(' - ')[0]}</Text>
						<Text color="#868E96" component="span" fw={600} fz={14}>{name.trim().split('-')[1]}</Text>
					</Group>
					<Stepper value={value} onChange={setValue} />
				</Group>
				<Flex align={'center'} justify={'space-between'} >
					<Text fw={600} fz={20}>$ {price * value}</Text>
					{hovered ?
						<Button ref={ref} disabled={value < 1} w={204} h={44} bg={'#3B944E'} bdrs={8}
							leftSection={<Text fw={600} fz={16}>Add to cart</Text>}
							rightSection={<Image src={basketHover}></Image>} onClick={handleAddPopup}>
						</Button>
						:
						<Button ref={ref} disabled={value < 1} w={204} h={44} bg={'#E7FAEB'} bdrs={8}
							leftSection={<Text fw={600} fz={16} color="#3B944E">Add to cart</Text>}
							rightSection={<Image src={basket}></Image>} onClick={handleAddPopup}>
						</Button>}
				</Flex>
			</Flex>
		</Card >
	)
}