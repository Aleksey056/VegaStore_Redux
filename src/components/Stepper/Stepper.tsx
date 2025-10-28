import { ActionIcon, Flex, Group, Image, Text } from "@mantine/core";
import disableMinus from '../../assets/disableMinus.svg';
import minusButton from '../../assets/minusButton.svg';
import plusButton from '../../assets/plusButton.svg'

type Stepper = {
	value: number,
	onChange: (value: number) => void,
}

export default function Stepper({ value, onChange }: Stepper) {

	return (
		<Group
			gap={0}
			data-testid='stepper'>
			<ActionIcon
				data-testid="stepper-image-minus"
				disabled={value < 1}
				onClick={() => onChange(value - 1)}
				bg={'#DEE2E6'}
				size={30}
				bdrs={8}
			>
				{value < 1 ? <Image src={disableMinus} />
					: <Image src={minusButton} />}
			</ActionIcon>
			<Flex
				w={30}
				h={30}
				justify={'center'}
				align={'center'}>
				<Text
					data-testid="stepper-value">{value}
				</Text>
			</Flex>
			<ActionIcon
				data-testid="stepper-image-plus"
				onClick={() => onChange(value + 1)}
				bg={'#DEE2E6'}
				size={30}
				bdrs={8}
			>
				<Image
					src={plusButton}
				/>
			</ActionIcon>
		</Group>
	)
}