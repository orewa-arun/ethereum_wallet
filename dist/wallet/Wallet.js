"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bip39 = __importStar(require("bip39"));
const ethereumjs_wallet_1 = require("ethereumjs-wallet");
class Wallet {
    constructor() {
        this.mnemonic = process.env.MNEMONIC;
    }
    getEthereumAddress(index) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate the seed from the mnemonic
            const seed = yield bip39.mnemonicToSeed(this.mnemonic);
            // Create an HD wallet from the seed
            const hdWallet = ethereumjs_wallet_1.hdkey.fromMasterSeed(seed);
            // Derive the path for Ethereum (m/44'/60'/0'/0/index)
            const path = `m/44'/60'/0'/0/${index}`;
            const wallet = hdWallet.derivePath(path).getWallet();
            // Get the Ethereum address
            const address = wallet.getAddressString();
            return address;
        });
    }
}
const wallet = new Wallet();
wallet.getEthereumAddress(0).then((address) => {
    console.log('Ethereum Address:', address);
});
exports.default = wallet;
