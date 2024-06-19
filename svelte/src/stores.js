import { writable } from 'svelte/store';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletProvider } from '@solana/wallet-adapter-react';

export const connection = writable(null);
export const wallet = writable(null);
export const account = writable(null);

export async function connectWallet() {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);

    const conn = new Connection(endpoint, 'confirmed');
    connection.set(conn);

    const walletAdapter = new PhantomWalletAdapter();
    await walletAdapter.connect();

    wallet.set(walletAdapter);

    const pubkey = walletAdapter.publicKey.toString();
    account.set(pubkey);
}
