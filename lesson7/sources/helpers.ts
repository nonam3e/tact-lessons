import { beginCell } from "ton-core";

export function createOffchainContent(str: string) {
    return beginCell().storeUint(1, 8).storeStringTail(str).endCell();
}