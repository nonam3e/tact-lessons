import { beginCell, Cell, Address } from "ton";
import { Dictionary } from "ton-core";
import { sha256_sync } from "ton-crypto";

const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;
const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

export function buildOnchainMetadata(data: { name: string; description: string; image: string; symbol: string }): Cell {
    // Set a empty dictionary for onchain content that has the key with 256 bits
    let dict = Dictionary.empty(Dictionary.Keys.BigUint(256), Dictionary.Values.Cell());

    Object.entries(data).forEach(([key, value]) => {
        dict.set(toKey(key), makeSnakeCell(Buffer.from(value, "utf8")));
    });
    return beginCell().storeInt(ONCHAIN_CONTENT_PREFIX, 8).storeDict(dict).endCell();
}

export function makeSnakeCell(data: Buffer) {
    let chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);
    const b = chunks.reduceRight((curCell, chunk, index) => {
        if (index === 0) {
            curCell.storeInt(SNAKE_PREFIX, 8);
        }
        curCell.storeBuffer(chunk);
        if (index > 0) {
            const cell = curCell.endCell();
            return beginCell().storeRef(cell);
        } else {
            return curCell;
        }
    }, beginCell());
    return b.endCell();
}

function bufferToChunks(buff: Buffer, chunkSize: number) {
    let chunks: Buffer[] = [];
    while (buff.byteLength > 0) {
        chunks.push(buff.slice(0, chunkSize));
        buff = buff.slice(chunkSize);
    }
    return chunks;
}

const toKey = (key: string) => {
    return BigInt(`0x${sha256_sync(key).toString("hex")}`);
};
