// Next.js Imports

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

// React Imports
import { useRef, useEffect, useState } from 'react';

//RainbowKit Imports
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Assets
import logo from '../assets/rainbow-medium.png';
import nftImg from '../assets/nftImg.jpeg';

// Wagmi Imports
import {
	useAccount,
	useContractWrite,
	useWaitForTransaction,
	useSwitchNetwork,
} from 'wagmi';

// React Toastify Imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Constants
import { abi, nft } from '../constants/index.js';

export default function Home() {
	// Connection State
	const { address } = useAccount();

	// Switch Network to Mumbai Testnet
	const network = useSwitchNetwork({
		chainId: 80001,
	});

	// Toastify Notifications
	const toastId = useRef(null);

	const [txOngoing, setTxOngoing] = useState(false);
	const toastConfig = (message, type) => {
		const config = {
			render: message,
			type: type,
			isLoading: false,
			position: 'bottom-left',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		};
		return config;
	};

	const notify = () => {
		toastId.current = toast.loading('Processing Transaction...', {
			position: 'bottom-left',
		});
	};

	// Call Contract
	const { data, write } = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: nft.contractAddress,
		abi: abi,
		functionName: 'safeMint',
		args: [address],
	});

	// Wait for Transaction to Complete and Send Notifications
	const waitForTransaction = useWaitForTransaction({
		hash: data?.hash,
		onSuccess(data) {
			const config = toastConfig('Transaction Successful', 'success');
			setTxOngoing(false);
			toast.update(toastId.current, config);
		},
		onError(data) {
			setTxOngoing(false);
			const config = toastConfig('Transaction Failed', 'error');
			toast.update(toastId.current, config);
		},
	});

	useEffect(() => {
		network;
	}, []);

	return (
		<>
			<Head>
				<title>RainbowKit Tutorial</title>
				<meta
					name='description'
					content='A Simple NFT Minting App using RainbowKit and WAGMI'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='min-h-screen bg-[#F0F1F5] mt-0'>
				<div className='bg-[#F0F1F5]'>
					<nav className='flex flex-col items-center justify-between pt-4 p-4 text-white px-28 sm:flex-row sm:justify-between sm:mx-0'>
						<div className='flex text-xl text-black sm:text-2xl text-gradient font-extrabold'>
							<Image
								src={logo}
								alt='RainbowKit Logo'
								width={28}
								height={28}
								className='mr-5 w-5 h-4 sm:w-7 sm:h-7 mt-2 sm:mt-0'
							/>
							RainbowKit Tutorial
						</div>

						<div className='w-full mt-4 flex justify-center sm:flex sm:justify-center sm:w-auto'>
							<ConnectButton
								chainStatus='none'
								showBalance={false}
								accountStatus={{
									smallScreen: 'avatar',
									largeScreen: 'full',
								}}
							/>
						</div>
					</nav>
				</div>
				<div className='w-72 h-96 m-16 rounded-2xl shadow-xl overflow-hidden max-w-screen-md mx-auto box-shadow-md bg-white'>
					<Image
						src={nftImg}
						alt={nft.name}
						className='w-full h-64 object-cover rounded-t-2xl backdrop-blur-xl'
					/>
					<Link href={nft.openseaLink}>
						<span className='text-black font-bold pt-4 text-xl ml-2'>
							{nft.collectionName}
						</span>
					</Link>
					<div className='text-black mt-2 ml-2'>{nft.name}</div>
					<div className='flex justify-between mt-2 p-2'>
						<div className='text-gray-600 text-sm'>{nft.chain}</div>
						<div className='text-gray-600 text-sm'>{nft.price}</div>
					</div>
				</div>
				<div className='flex justify-center'>
					<button
						className={
							txOngoing
								? 'px-6 py-2 rounded-xl bg-[#76808d] text-white font-bold'
								: 'px-6 py-2 rounded-xl bg-[#0E76FD] hover:scale-105 transition-transform duration-200 text-white font-bold'
						}
						onClick={() => {
							if (address) {
								setTxOngoing(true);
								write();
								notify();
							} else {
								toast.error('Please Connect Wallet', {
									position: 'bottom-left',
								});
							}
						}}
						disabled={txOngoing}
					>
						{txOngoing ? 'Processing...' : 'Mint'}
					</button>
				</div>
				<ToastContainer />
			</div>
		</>
	);
}
