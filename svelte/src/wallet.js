import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

export function getProvider() {
    const provider = new PhantomWalletAdapter();
    return provider;
}

export function getWallet() {
    const provider = getProvider();
    provider.connect();
    return provider;
}

export async function connectWallet() {
    const provider = getProvider();
    await provider.connect();
    return provider;
}
