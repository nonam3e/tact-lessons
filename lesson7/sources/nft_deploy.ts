import { Address, Builder, Cell, Dictionary, Slice, beginCell, fromNano, toNano } from "ton-core";
import { NftCollection, storeRequestNftDeploy } from "./output/nft_NftCollection";
import { createOffchainContent } from "./helpers";
import { readFileSync } from "fs";
import { mnemonicToWalletKey } from "ton-crypto";
import { TonClient4, WalletContractV3R2, WalletContractV4 } from "ton";
import { buffer } from "stream/consumers";

(async () => {
    // createNftDeployLink(Address.parse("EQCWywmUzk71ivxC6YrzzWBW0iwUox9hEw_ZXS5JWqWCRwTf"), Address.parse('EQDCWAnbip-FJlr71gJKgAVTznR-J_iDW-djThXp43q5qdXw'), toNano("0.06"), "https://raw.githubusercontent.com/nonam3e/tact-lessons/main/lesson6/nft_data.json", 0n);
    let mnemonics = readFileSync("./secret.txt").toString().split(",");
    let pair = await mnemonicToWalletKey(mnemonics);
    let client4 = new TonClient4({endpoint: "https://sandbox-v4.tonhubapi.com"});
    let wallet = client4.open(WalletContractV4.create({workchain: 0, publicKey: pair.publicKey}));
    let collection = client4.open(NftCollection.fromAddress(Address.parse("EQCWywmUzk71ivxC6YrzzWBW0iwUox9hEw_ZXS5JWqWCRwTf")));
    await collection.send(wallet.sender(pair.secretKey), {value: toNano("0.08")}, {$$type: 'RequestNftDeploy', index: 1n, amount: toNano("0.03"), content: createOffchainContent("https://raw.githubusercontent.com/nonam3e/tact-lessons/main/lesson6/nft_data.json"), owner: wallet.address})
})();

export function createNftDeployLink(collection: Address, owner: Address, amount: bigint, content: string, index: bigint) {

    let message = createNftDeployMessage(owner, content, index);
    let link =`ton://transfer/${collection.toString()}?amount=${amount}&bin=${message.toBoc().toString('base64url')}`;
    console.log(link);
}

export function createNftDeployMessage(owner: Address, content: string, index: bigint, amount: bigint = toNano("0.03")) {
    return beginCell().store(storeRequestNftDeploy({$$type: 'RequestNftDeploy', index, amount, content: createOffchainContent(content), owner})).endCell();
}

