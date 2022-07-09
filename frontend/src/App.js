import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import queryClient from './services/queryClient';

import Story from './views/pages/Story/Story';
import Gallery from './views/pages/Gallery/Gallery';
import Compliments from './views/pages/Compliments/Compliments';
import Login from './views/pages/Login/Login';
import { AuthProvider } from './context/AuthProvider';
import Background from './views/components/Background/Background';
import Edit from './views/pages/Edit/Edit';
import RequireAuth from './views/hoc/RequireAuth';

import './App.scss';
import 'swiper/css';


const App = () => {
  	return (
		<div className="app">
			<Background />
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<Router>
						<Routes>
							<Route path="/">
								<Route index element={<Login />} />
								<Route 
									path="gallery" 
									element={<RequireAuth><Gallery /></RequireAuth>}
								/>
								<Route 
									path="compliments" 
									element={<RequireAuth><Compliments /></RequireAuth>}
								/>
								<Route 
									path="story/:storyId" 
									element={<RequireAuth><Story /></RequireAuth>}
								/>
								<Route 
									path="edit"
									element={<RequireAuth><Edit /></RequireAuth>}
								/>
							</Route>
						</Routes>
					</Router>
				</AuthProvider>
			</QueryClientProvider>
		</div>
  	);
}

export default App;
