import * as fs from 'fs';
import * as path from 'path';
import { contractAddress } from "ton";
import { TactWallet } from "./output/sample_TactWallet";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { mnemonicNew, mnemonicToWalletKey } from 'ton-crypto';

(async () => {

    // Parameters
    let testnet = true;
    let packageName = 'sample_TactWallet.pkg';
    let mnemonics = await mnemonicNew();
    fs.writeFileSync("secret.txt", mnemonics.toLocaleString());
    let pair = await mnemonicToWalletKey(mnemonics);
    let init = await TactWallet.init(BigInt('0x' + pair.publicKey.toString("hex")));

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