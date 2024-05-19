import 'dotenv/config';
import * as bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';
import {wallet_mnemonic} from "./config/wallet.config";

class Wallet{
    mnemonic : string;

    constructor() {
        this.mnemonic = wallet_mnemonic as string;
      }
    
    async getEthereumAddress(index: number): Promise<string> {
        // Generate the seed from the mnemonic
        const seed = await bip39.mnemonicToSeed(this.mnemonic);
        
        // Create an HD wallet from the seed
        const hdWallet = hdkey.fromMasterSeed(seed);
        
        // Derive the path for Ethereum (m/44'/60'/0'/0/index)
        const path = `m/44'/60'/0'/0/${index}`;
        const wallet = hdWallet.derivePath(path).getWallet();
        
        // Get the Ethereum address
        const address = wallet.getAddressString();
        return address;
    }
    
}

const wallet = new Wallet();

wallet.getEthereumAddress(0).then((address) => {
  console.log('Ethereum Address:', address);
});

export default wallet;