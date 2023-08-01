import { toNano } from "ton";
import { ContractSystem } from "@tact-lang/emulator";
import { BroadcastContract } from "./output/sample_BroadcastContract";
import { inspect } from "util";

describe("contract", () => {
    it("should deploy correctly", async () => {
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let user1 = system.treasure("user1");
        let user2 = system.treasure("user2");
        let user3 = system.treasure("user3");
        let user4 = system.treasure("user4");
        let broadcast = system.open(await BroadcastContract.fromInit(owner.address));
        await broadcast.send(owner, {value: toNano(1)}, {$$type: 'AddMessage', address: user1.address});
        await broadcast.send(owner, {value: toNano(1)}, {$$type: 'AddMessage', address: user2.address});
        await broadcast.send(owner, {value: toNano(1)}, {$$type: 'AddMessage', address: user3.address});
        await broadcast.send(owner, {value: toNano(1)}, {$$type: 'AddMessage', address: user4.address});
        await system.run();
        let tracker = system.track(broadcast.address);
        await broadcast.send(owner, {value: toNano(5)}, {$$type: 'BroadcastMessage', message: "Hello everyone"});
        await system.run();
        console.log(inspect(tracker.collect(), true, null, true));
    });
});
