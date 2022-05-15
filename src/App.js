import Home from './pages/Home';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client/apolloClient';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EditProduct from './pages/EditProduct';
import UpdateDataProduct from './pages/UpdateDataProduct';
import Search from './pages/Search';
import InsertNewProduct from './pages/InsertNewProduct';

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/dashboard/edit-product" element={<EditProduct />} />
					<Route
						path="/dashboard/edit-product/:id"
						element={<UpdateDataProduct />}
					/>
					<Route path="/search" element={<Search />} />
					<Route path="dashboard/insert-product" element={<InsertNewProduct />} />
				</Routes>
			</Router>
		</ApolloProvider>
	);
}

export default App;
