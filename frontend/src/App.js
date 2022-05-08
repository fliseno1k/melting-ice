import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

// import Background from './components/shared/Background/Background';
import Story from './views/pages/Story/Story';
import Gallery from './views/pages/Gallery/Gallery';
import Compliments from './views/pages/Compliments/Compliments';
import Login from './views/pages/Login/Login';
import AuthProvider from './context/AuthProvider';

import './App.scss';
import 'swiper/css';


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

const App = () => {
  	return (
		<QueryClientProvider client={queryClient}>
				<Router>
					<AuthProvider>
						<div className="app">
							<Routes>
								<Route path="/">
									<Route index element={<Login />} />
									<Route path="gallery" element={<Gallery />} />
									<Route path="compliments" element={<Compliments />} />
									<Route path="story/:storyId" element={<Story />} />
								</Route>
							</Routes>
							{/* <Background /> */}
						</div>
					</AuthProvider>
				</Router>
		</QueryClientProvider>
  	);
}

export default App;
