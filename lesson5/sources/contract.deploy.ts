import * as fs from 'fs';
import * as path from 'path';
import { Address, contractAddress } from "ton";
import { TokenMaster } from "./output/lesson5_TokenMaster";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { buildOnchainMetadata } from './build_data';
import metadata from "./data.json";

(async () => {

    // Parameters
    let testnet = true;
    let packageName = 'lesson5_TokenMaster.pkg';
    let owner = Address.parse('EQC4ehueRqyWjOdWBKSSZuvmWOJ6vuO134tYIZbuZBzv0CH5');
    let init = await TokenMaster.init(owner, buildOnchainMetadata(metadata));

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