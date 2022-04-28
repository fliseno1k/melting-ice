import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import 'swiper/css';

// import Background from './components/shared/Background/Background';
import Login from './components/Login/Login';
import Story from './components/Story/Story';
import Home from './components/Home/Home';


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

function App() {
  	return (
		<QueryClientProvider client={queryClient}>
			<div className="app">
				<Home />
				{/* <Story /> */}
				{/* <Background /> */}
				{/* <Login /> */}
			</div>
		</QueryClientProvider>
  	);
}

export default App;
