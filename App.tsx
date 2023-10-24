import React, { FC, type PropsWithChildren } from 'react';
import { Button, SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Logger } from './logger/ui/logger';

const App: FC = () => {
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, flex: 1 };

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Button title='Action 1' />
			<Button title='Action 2' />
			<Button title='Navigation' />
			<Logger />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

export default App;
