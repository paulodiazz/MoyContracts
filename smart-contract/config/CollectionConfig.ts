import CollectionConfigInterface from '../lib/CollectionConfigInterface';
import * as Networks from '../lib/Networks';
import * as Marketplaces from '../lib/Marketplaces';
import whitelistAddresses from './whitelist.json';

const CollectionConfig: CollectionConfigInterface = {
  testnet: Networks.ethereumTestnet,
  mainnet: Networks.polygonMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: 'NinoSiqueiros',
  tokenName: 'NinoS',
  tokenSymbol: 'NSIQ',
  hiddenMetadataUri: 'ipfs://Qmeph8RYWetg4idhyti8JPebQRjWrjZmSXSnxwFHeJ6H9u/hidden.json',
  maxSupply: 1,
  whitelistSale: {
    price: 0.00,
    maxMintAmountPerTx: 0,
  },
  preSale: {
    price: 0.00,
    maxMintAmountPerTx: 1,
  },
  publicSale: {
    price: 434000,
    maxMintAmountPerTx: 1,
  },
  contractAddress: "0xfce603Fe1f09f3bf54a3825490D3c6d186973b8e",
  marketplaceIdentifier: 'ninosiqueiros',
  marketplaceConfig: Marketplaces.openSea,
  whitelistAddresses,
};

export default CollectionConfig;
