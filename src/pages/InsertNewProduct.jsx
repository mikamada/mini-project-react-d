import React, { useEffect, useState } from 'react';
import { storage } from '../firebase/firebase';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import useInserProduct from '../hooks/useInsertProduct';
import Loading from '../components/Loading';

const Dashboard = () => {
	const [imageUpload, setImageUpload] = useState(null);

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [imageList, setImageList] = useState([]);
	const { insertProduct, loadingInsertProduct } = useInserProduct();

	const imageListRef = ref(storage, 'images/');
	const uploadImage = async () => {
		if (imageUpload == null) return;
		const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
		const snapshot = await uploadBytes(imageRef, imageUpload);
		const downloadUrl = await getDownloadURL(snapshot.ref);
		console.log(downloadUrl);

		insertProduct({
			variables: {
				img: downloadUrl,
				name: name,
				price: price,
			},
		});
	};

	useEffect(() => {
		listAll(imageListRef).then((respone) => {
			respone.items.forEach((item) => {
				getDownloadURL(item).then((url) => {
					setImageList((prev) => [...prev, url]);
				});
			});
		});
	});

	if (loadingInsertProduct) {
		return <Loading />;
	}
	return (
		// <div className="min-h-screen antialiased py-6 flex flex-col justify-center mobile:py-12">
		// 	<div className="relative">
		// 		<input
		// 			required
		// 			type="text"
		// 			onChange={(e) => setName(e.target.value)}
		// 			placeholder="name"
		// 			className="border-b py-1 focus:outline-none focus:border-indigo-600 focus:border-2"
		// 		/>
		// 		<label className="absolute left-0 top-1">Nama barang</label>
		// 	</div>

		// 	<input
		// 		required
		// 		type="number"
		// 		onChange={(e) => setPrice(e.target.value)}
		// 		placeholder="price"
		// 	/>
		// 	<div className="relative">
		// 		<input
		// 			required
		// 			type="file"
		// 			onChange={(event) => {
		// 				setImageUpload(event.target.files[0]);
		// 			}}
		//
		// 		/>
		// 	</div>

		// 	<button onClick={uploadImage}>Tambah Barang</button>
		// </div>
		<div className="min-h-screen  antialiased py-6 flex flex-col justify-center ">
			<div className="relative py-3 mobile:max-w-xl mobile:m-auto">
				<span className="text-2xl font-light">Tambah barang </span>
				<div className="mt-4 bg-white shadow-md rounded-lg">
					<div className="px-8 py-6 w-full">
						<input
							className="mt-4"
							required
							type="file"
							onChange={(event) => {
								setImageUpload(event.target.files[0]);
							}}
						/>
						<label className="block font-semibold mt-4">Nama barang</label>
						<input
							type="text"
							placeholder="nama barang"
							className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
							onChange={(e) => setName(e.target.value)}
						/>
						<label className="block font-semibold mt-4">Harga</label>
						<input
							type="number"
							placeholder="harga"
							className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
							onChange={(e) => setPrice(e.target.value)}
						/>

						<div className="flex justify-end items-baseline">
							<button
								onClick={uploadImage}
								type="submit"
								className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
							>
								Tambah
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;