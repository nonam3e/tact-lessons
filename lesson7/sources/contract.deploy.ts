import * as fs from 'fs';
import * as path from 'path';
import { Address, contractAddress } from "ton";
import { NftCollection } from "./output/nft_NftCollection";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { createOffchainContent } from './helpers';

(async () => {

    // Parameters
    let testnet = true;
    let packageName = 'nft_NftCollection.pkg';
    let owner = Address.parse('EQDCWAnbip-FJlr71gJKgAVTznR-J_iDW-djThXp43q5qdXw');
    let content = createOffchainContent("https://raw.githubusercontent.com/nonam3e/tact-lessons/main/lesson6/collection_data.json")
    let init = await NftCollection.init(owner, content, owner, 21n, 1000n);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, 'output', packageName));

    // Prepareing
    console.log('Uploading package...');
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log('Contract Address')
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log('Please, follow deployment link')
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();