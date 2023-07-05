import { toNano } from "ton";
import { ContractSystem } from "@tact-lang/emulator";
import { AddressBook } from "./output/sample_AddressBook";

describe("contract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let someone = system.treasure("someone");
        let contract = system.open(await AddressBook.fromInit(owner.address));

        let contract_tracker = system.track(contract.address);
        
        await contract.send(owner, {value: toNano("0.1")}, {$$type: 'AddUserMessage', name: "owner", address: owner.address});
        await contract.send(owner, {value: toNano("0.1")}, {$$type: 'AddUserMessage', name: 'someone', address: someone.address});
        await system.run();

        await contract.send(owner, {value: toNano("0.1")}, {$$type: 'ProxyMessage', message: "Hello", to: "someone"});
        await contract.send(someone, {value: toNano("0.1")}, {$$type: 'ProxyMessage', message: "Hello", to: "owner"});
        await contract.send(someone, {value: toNano("0.1")}, {$$type: 'ProxyMessage', message: "Hello", to: "owner"});
        await system.run();
        await contract.send(someone, {value: toNano("0.1")}, "someone");
        await system.run();

        expect(contract_tracker.collect()).toMatchSnapshot();
    });
});
