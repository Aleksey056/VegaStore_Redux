import { Image, Flex, Box, Center } from "@mantine/core";
import loaderIcon from '../../../assets/loader2.svg'
import styles from './ProductCartLoader.module.css'

export default function ProductCardLoader() {
	return (
		<Center>
			<Box>
				<Flex className={styles.productCartLoader} >
					<Flex className={styles.productCartLoader__body} >
						<Image className={styles.productCartLoader__image} src={loaderIcon}/>
					</Flex>
				</Flex>
			</Box>
		</Center>
	)
}
