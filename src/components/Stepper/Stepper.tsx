import { ActionIcon, Flex, Group, Image, Text } from "@mantine/core";
import disableMinus from '../../assets/disableMinus.svg';
import minusButton from '../../assets/minusButton.svg';
import plusButton from '../../assets/plusButton.svg'
import styles from './Stepper.module.css'

type Stepper = {
	value: number,
	onChange: (value: number) => void,
}

export default function Stepper({ value, onChange }: Stepper) {
	return (
		<Group className={styles.stepper} data-testid='stepper'>
			<ActionIcon
				className={styles.actionIcon}
				data-testid="stepper-image-minus"
				disabled={value < 1}
				onClick={() => onChange(value - 1)}>
				{value < 1 ?
					<Image src={disableMinus} />
					: <Image src={minusButton} />}
			</ActionIcon>
			<Flex className={styles.value}>
				<Text data-testid="stepper-value">{value}</Text>
			</Flex>
			<ActionIcon
				className={styles.actionIcon}
				data-testid="stepper-image-plus"
				onClick={() => onChange(value + 1)}>
				<Image src={plusButton} />
			</ActionIcon>
		</Group>
	)
}