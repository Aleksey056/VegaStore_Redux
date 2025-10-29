import { Image, Flex, Box, Center } from "@mantine/core";
import loaderIcon from '../../../assets/loader2.svg'

export default function ProductCardLoader() {
	return (
		<Center>
			<Box>
				<Flex w={302} h={412} bg={'white'} py={16} px={16} bdrs={24}>
					<Flex w={276} h={276} bg={'#F3F5FA'} justify={'center'} align={'center'}>
						<Image src={loaderIcon} h={20} w={22} />
					</Flex>
				</Flex>
			</Box>
		</Center>
	)
}
