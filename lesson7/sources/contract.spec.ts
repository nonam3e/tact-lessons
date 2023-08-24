import { beginCell, toNano } from "ton";
import { ContractSystem } from "@tact-lang/emulator";
import { NftItem } from "./output/nft_NftItem";
import { inspect } from "util";

describe("contract", () => {
    it("should deploy correctly", async () => {
        let system = await ContractSystem.create();
        let owner = system.treasure("onwer");
        let master = system.treasure("master");
        let nft = system.open(await NftItem.fromInit(master.address, owner.address, 0n, beginCell().storeUint(10,8).endCell(), master.address, 5n, 100n));
        
        let nft_tracker = system.track(nft.address);

        await nft.send(master, {value: toNano("0.1")}, {$$type: 'Deploy', queryId: 0n});
        await system.run();

        let nft_events = nft_tracker.collect();
        console.log(inspect(nft_events, true, null, true));
        let result = await nft.getGetNftData();
        expect(result.deployed).toBeTruthy();
        expect(result.index).toEqual(0n);
        expect(result.collection.equals(master.address)).toBeTruthy();
        expect(result.owner.equals(owner.address)).toBeTruthy();
        expect(result.content.equals(beginCell().storeUint(10,8).endCell())).toBeTruthy();

        let owner_2 = system.treasure("owner_2");
        await nft.send(owner, {value: toNano("0.15")}, {$$type: 'NftTransfer', query_id: 1n, new_owner: owner_2.address, response_destination: owner.address, custom_payload: beginCell().storeUint(0,32).storeStringTail("Hello to Nothing").endCell(), forward_amount: toNano("0.05"), forward_payload: beginCell().storeUint(0,32).storeStringTail("Hello to New Owner").endCell()});
        await system.run();
        nft_events = nft_tracker.collect();
        console.log(inspect(nft_events, true, null, true));

        result = await nft.getGetNftData();
        expect(result.owner.equals(owner_2.address)).toBeTruthy();

        await nft.send(owner_2, {value: toNano("0.02")}, {$$type: 'NftDestroy', query_id: 1n});
        await system.run();
        nft_events = nft_tracker.collect();
        console.log(inspect(nft_events, true, null, true));
        result = await nft.getGetNftData();
        expect(result.owner.equals(nft.address)).toBeTruthy();
    });
});
