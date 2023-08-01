import { beginCell, toNano } from "ton";
import { ContractSystem } from "@tact-lang/emulator";
import { TokenWallet } from "./output/lesson5_TokenWallet";
import { TokenMaster} from "./output/lesson5_TokenMaster";
import { inspect } from "util";

describe("contract", () => {
    // it("should deploy correctly", async () => {
    //     let system = await ContractSystem.create();
    //     let master = system.treasure("master");
    //     let owner1 = system.treasure("owner1");
    //     let owner2 = system.treasure("owner2");
    //     let owner1_wallet = system.open(await TokenWallet.fromInit(owner1.address, master.address));
    //     let owner2_wallet = system.open(await TokenWallet.fromInit(owner2.address, master.address));
    //     let tracker_1 = system.track(owner1_wallet);
    //     let tracker_2 = system.track(owner2_wallet);

    //     await owner1_wallet.send(master, {value: toNano("0.05")}, {$$type: 'InternalTransfer', amount: toNano(100), query_id: 13n, from: master.address, response_destination: master.address, forward_ton_amount: 0n, forward_payload: beginCell().endCell()});
    //     await system.run();

    //     let event_1 = tracker_1.collect();
    //     console.log(inspect(event_1, true, null, true));
    //     let result_1 = await owner1_wallet.getGetWalletData();
    //     expect(result_1.balance).toEqual(toNano(100));
    //     expect(result_1.owner.equals(owner1.address)).toBeTruthy();
    //     expect(result_1.master.equals(master.address)).toBeTruthy();

    //     await owner1_wallet.send(owner1, {value: toNano("1.2")}, {$$type: 'Transfer', query_id: 5n, amount: toNano(20), destination: owner2.address, response_destination: owner1.address, custom_payload: beginCell().endCell(), forward_ton_amount: toNano(1), forward_payload: beginCell().storeUint(0,32).storeStringTail("hello owner2").endCell()});
    //     await system.run();
    //     event_1 = tracker_1.collect();
    //     let event_2 = tracker_2.collect();
    //     console.log(inspect(event_1, true, null, true));
    //     console.log(inspect(event_2, true, null, true));

    //     result_1 = await owner1_wallet.getGetWalletData();
    //     expect(result_1.balance).toEqual(toNano(80));
    //     expect(result_1.owner.equals(owner1.address)).toBeTruthy();
    //     expect(result_1.master.equals(master.address)).toBeTruthy();

    //     let result_2 = await owner2_wallet.getGetWalletData();
    //     expect(result_2.balance).toEqual(toNano(20));
    //     expect(result_2.owner.equals(owner2.address)).toBeTruthy();
    //     expect(result_2.master.equals(master.address)).toBeTruthy();
    // });
    it('master test',async () => {
        let system = await ContractSystem.create();
        let owner1 = system.treasure("owner1");
        let owner2 = system.treasure("owner2");
        let master = system.open(await TokenMaster.fromInit(owner1.address, beginCell().endCell()));
        let owner1_wallet = system.open(await TokenWallet.fromInit(owner1.address, master.address));
        let owner2_wallet = system.open(await TokenWallet.fromInit(owner2.address, master.address));
        let tracker_1 = system.track(owner1_wallet);
        let tracker_2 = system.track(owner2_wallet);
        let tracker = system.track(master.address);

        await master.send(owner1, {value: toNano("1.2")}, {$$type: 'Transfer', query_id: 5n, amount: toNano(20), destination: owner1.address, response_destination: owner1.address, custom_payload: beginCell().endCell(), forward_ton_amount: toNano(1), forward_payload: beginCell().storeUint(0,32).storeStringTail("hello owner1").endCell()});
        await system.run();

        console.log(inspect(tracker.collect(), true, null, true));
        console.log(inspect(tracker_1.collect(), true, null, true));

        expect((await master.getGetJettonData()).total_supply).toEqual(toNano(20));
        expect((await owner1_wallet.getGetWalletData()).balance).toEqual(toNano(20));

        await owner1_wallet.send(owner1, {value: toNano(1)}, {$$type: 'Burn', query_id: 144n, amount: toNano(5), response_destination: owner1.address, custom_payload: beginCell().endCell()});
        await system.run();

        console.log(inspect(tracker_1.collect(), true, null, true));
        console.log(inspect(tracker.collect(), true, null, true));

        expect((await master.getGetJettonData()).total_supply).toEqual(toNano(15));
        expect((await owner1_wallet.getGetWalletData()).balance).toEqual(toNano(15));
    });
});
