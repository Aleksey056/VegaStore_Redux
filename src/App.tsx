import './App.css'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import Header from './components/Header/Header'
import Main from './components/Main/Main';

function App() {
	return (
		<>
			<MantineProvider>
				<Header />
				<Main />
			</MantineProvider >
		</>
	)
}

export default App
