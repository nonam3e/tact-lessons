import { Address, beginCell, toNano, TonClient4} from "ton";
import { mnemonicToWalletKey } from "ton-crypto";
import { TactWallet } from "./output/sample_TactWallet";
import { fill_send_parameters, send_ext_message } from "./helpers";
import { readFileSync } from "fs";

(async () => {
    let client4 = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com"
    })
    let mnemonics = readFileSync("secret.txt").toString().split(',');
    let pair = mnemonicToWalletKey(mnemonics);
    let wallet = client4.open(TactWallet.fromAddress(Address.parse("Paste your TactWallet address")));
    let params = fill_send_parameters(Address.parse("Paste some address"), toNano("0.05"), beginCell().storeUint(0,32).storeStringTail("Hello").endCell(), 1n);
    await send_ext_message(wallet, (await pair).secretKey, BigInt((await client4.getLastBlock()).now + 20), params);
})();