import { beginCell, toNano } from "ton";
import { mnemonicNew, mnemonicToWalletKey } from "ton-crypto";
import { ContractSystem } from "@tact-lang/emulator";
import { TactWallet, SendParameters } from "./output/sample_TactWallet";
import { fill_send_parameters, send_ext_message } from "./helpers";
import { inspect } from "util";

describe("contract", () => {
    it("should deploy correctly", async () => {
        let system = await ContractSystem.create();
        let creator = system.treasure("creator");
        let mnemonics = await mnemonicNew();
        let pair = await mnemonicToWalletKey(mnemonics);
        let wallet = system.open(await TactWallet.fromInit(BigInt('0x' + pair.publicKey.toString("hex"))));
        await wallet.send(creator, {value: toNano(10)}, "Hello");
        await system.run();
        expect(await wallet.getGetPublicKey()).toEqual(BigInt('0x' + pair.publicKey.toString("hex")));
        expect(await wallet.getSeqno()).toEqual(0n);

        let params: SendParameters = fill_send_parameters(creator.address, toNano("0.1"), beginCell().storeUint(0, 32).storeStringTail("Hello Creator!").endCell())
        let tracker = system.track(wallet.address);
        await send_ext_message(wallet, pair.secretKey, BigInt(system.now + 15), params);
        await system.run();
        expect(tracker.collect()).toMatchSnapshot();
        expect(await wallet.getSeqno()).toEqual(1n);
    });
});
