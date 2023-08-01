import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type AddMessage = {
    $$type: 'AddMessage';
    address: Address;
}

export function storeAddMessage(src: AddMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2909481082, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadAddMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2909481082) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'AddMessage' as const, address: _address };
}

function loadTupleAddMessage(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'AddMessage' as const, address: _address };
}

function storeTupleAddMessage(source: AddMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserAddMessage(): DictionaryValue<AddMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAddMessage(src)).endCell());
        },
        parse: (src) => {
            return loadAddMessage(src.loadRef().beginParse());
        }
    }
}

export type RemoveMessage = {
    $$type: 'RemoveMessage';
    address: Address;
}

export function storeRemoveMessage(src: RemoveMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(585376955, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadRemoveMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 585376955) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    return { $$type: 'RemoveMessage' as const, address: _address };
}

function loadTupleRemoveMessage(source: TupleReader) {
    let _address = source.readAddress();
    return { $$type: 'RemoveMessage' as const, address: _address };
}

function storeTupleRemoveMessage(source: RemoveMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserRemoveMessage(): DictionaryValue<RemoveMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRemoveMessage(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveMessage(src.loadRef().beginParse());
        }
    }
}

export type BroadcastMessage = {
    $$type: 'BroadcastMessage';
    message: string;
}

export function storeBroadcastMessage(src: BroadcastMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2297231508, 32);
        b_0.storeStringRefTail(src.message);
    };
}

export function loadBroadcastMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2297231508) { throw Error('Invalid prefix'); }
    let _message = sc_0.loadStringRefTail();
    return { $$type: 'BroadcastMessage' as const, message: _message };
}

function loadTupleBroadcastMessage(source: TupleReader) {
    let _message = source.readString();
    return { $$type: 'BroadcastMessage' as const, message: _message };
}

function storeTupleBroadcastMessage(source: BroadcastMessage) {
    let builder = new TupleBuilder();
    builder.writeString(source.message);
    return builder.build();
}

function dictValueParserBroadcastMessage(): DictionaryValue<BroadcastMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBroadcastMessage(src)).endCell());
        },
        parse: (src) => {
            return loadBroadcastMessage(src.loadRef().beginParse());
        }
    }
}

export type NativePair = {
    $$type: 'NativePair';
    key: bigint | null;
    value: Address | null;
    flag: boolean;
}

export function storeNativePair(src: NativePair) {
    return (builder: Builder) => {
        let b_0 = builder;
        if (src.key !== null && src.key !== undefined) { b_0.storeBit(true).storeInt(src.key, 257); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.value);
        b_0.storeBit(src.flag);
    };
}

export function loadNativePair(slice: Slice) {
    let sc_0 = slice;
    let _key = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    let _value = sc_0.loadMaybeAddress();
    let _flag = sc_0.loadBit();
    return { $$type: 'NativePair' as const, key: _key, value: _value, flag: _flag };
}

function loadTupleNativePair(source: TupleReader) {
    let _key = source.readBigNumberOpt();
    let _value = source.readAddressOpt();
    let _flag = source.readBoolean();
    return { $$type: 'NativePair' as const, key: _key, value: _value, flag: _flag };
}

function storeTupleNativePair(source: NativePair) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeAddress(source.value);
    builder.writeBoolean(source.flag);
    return builder.build();
}

function dictValueParserNativePair(): DictionaryValue<NativePair> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNativePair(src)).endCell());
        },
        parse: (src) => {
            return loadNativePair(src.loadRef().beginParse());
        }
    }
}

export type DictPair = {
    $$type: 'DictPair';
    key: bigint;
    value: Address;
}

export function storeDictPair(src: DictPair) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.key, 257);
        b_0.storeAddress(src.value);
    };
}

export function loadDictPair(slice: Slice) {
    let sc_0 = slice;
    let _key = sc_0.loadIntBig(257);
    let _value = sc_0.loadAddress();
    return { $$type: 'DictPair' as const, key: _key, value: _value };
}

function loadTupleDictPair(source: TupleReader) {
    let _key = source.readBigNumber();
    let _value = source.readAddress();
    return { $$type: 'DictPair' as const, key: _key, value: _value };
}

function storeTupleDictPair(source: DictPair) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeAddress(source.value);
    return builder.build();
}

function dictValueParserDictPair(): DictionaryValue<DictPair> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDictPair(src)).endCell());
        },
        parse: (src) => {
            return loadDictPair(src.loadRef().beginParse());
        }
    }
}

 type BroadcastContract_init_args = {
    $$type: 'BroadcastContract_init_args';
    owner: Address;
}

function initBroadcastContract_init_args(src: BroadcastContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function BroadcastContract_init(owner: Address) {
    const __code = Cell.fromBase64('te6ccgECHwEABRkAART/APSkE/S88sgLAQIBYgIDAuTQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCyPhDAcx/AcoAVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEvQAgQEBzwDJ7VQaBAIBIBMUBJoBkjB/4HAh10nCH5UwINcLH94gghCtayh6uuMCIIIQIuQku7rjAiCCEIjs+JS6jpUw0x8BghCI7PiUuvLggdQB0DHbPH/gghCUapi2ugUGBwgBwjDTHwGCEK1rKHq68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDFVINs8I/kBggCvVyOBAQEjWfQMb6GSMG3fbvL0gQEBQBUgbpUwWfRaMJRBM/QU4gKkEn8JAcQw0x8BghAi5CS7uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxVSDbPAP5AYIAsqkigQEBI1n0DG+hkjBt326z8vSBAQEBbSBulTBZ9FowlEEz9BTiAqUSfwkEZlUg2zz4QW8kE18DgUKmggiYloAjqIIJycOAoFIgvvL0ggnJw4ChIakEBNs8Its8kyBuswkKCwwBWI6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwEAAS+EJSMMcF8uCEAULIcAHLH28AAW+MbW+MAds8byIByZMhbrOWAW8iWczJ6DENADCBAQH0hG+lnSBu8tCAASBu8tCAbwLgW20BCoroW2wTDgC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAkAgIG7y0IBvIjEmcnAlFEMwbW3bPCBu8tCAbyIwUjDbPBEPADIBgQEB9HhvpZ0gbvLQgAEgbvLQgG8C4FttATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPBEByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAEgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIRviju2ebZ42GMGhUCASAWFwACIgIBIBgZAgFIHR4CEbbWW2ebZ42GMBobALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lABzO1E0NQB+GPSAAGOK/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9ASBAQHXAFUgbBPg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdHbPBwAAiEABG1wABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVBVQVlvUXpUM2hrSGJyempBS3I5dFNoZVpyOTIxNGFjVGVYTXJpeGM2TDJkgg');
    const __system = Cell.fromBase64('te6cckECIQEABSMAAQHAAQEFoKPtAgEU/wD0pBP0vPLICwMCAWIPBAIBIA0FAgEgCQYCAUgIBwB1sm7jQ1aXBmczovL1FtUFVBWW9RelQzaGtIYnJ6akFLcjl0U2hlWnI5MjE0YWNUZVhNcml4YzZMMmSCAAEbCvu1E0NIAAYAIBIAsKALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lACEbbWW2ebZ42GMB8MAAIhAhG+KO7Z5tnjYYwfDgACIgLk0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLggsj4QwHMfwHKAFUgWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhL0AIEBAc8Aye1UHxAEmgGSMH/gcCHXScIflTAg1wsf3iCCEK1rKHq64wIgghAi5CS7uuMCIIIQiOz4lLqOlTDTHwGCEIjs+JS68uCB1AHQMds8f+CCEJRqmLa6HRwTEQFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHASATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPBcEZlUg2zz4QW8kE18DgUKmggiYloAjqIIJycOAoFIgvvL0ggnJw4ChIakEBNs8Its8kyBusx4aGRQBCoroW2wTFQJAICBu8tCAbyIxJnJwJRRDMG1t2zwgbvLQgG8iMFIw2zwXFgAyAYEBAfR4b6WdIG7y0IABIG7y0IBvAuBbbQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAYAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMADCBAQH0hG+lnSBu8tCAASBu8tCAbwLgW20BQshwAcsfbwABb4xtb4wB2zxvIgHJkyFus5YBbyJZzMnoMRsAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwHEMNMfAYIQIuQku7ry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMVUg2zwD+QGCALKpIoEBASNZ9AxvoZIwbd9us/L0gQEBAW0gbpUwWfRaMJRBM/QU4gKlEn8eAcIw0x8BghCtayh6uvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxVSDbPCP5AYIAr1cjgQEBI1n0DG+hkjBt327y9IEBAUAVIG6VMFn0WjCUQTP0FOICpBJ/HgAS+EJSMMcF8uCEAcztRNDUAfhj0gABjiv6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQEgQEB1wBVIGwT4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHR2zwgAARtcNA2G/g=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBroadcastContract_init_args({ $$type: 'BroadcastContract_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const BroadcastContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    17062: { message: `Invalid amount` },
    44887: { message: `Address already exists` },
    45737: { message: `Address does not exist` },
}

export class BroadcastContract implements Contract {
    
    static async init(owner: Address) {
        return await BroadcastContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await BroadcastContract_init(owner);
        const address = contractAddress(0, init);
        return new BroadcastContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new BroadcastContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: BroadcastContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: AddMessage | RemoveMessage | BroadcastMessage | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddMessage') {
            body = beginCell().store(storeAddMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveMessage') {
            body = beginCell().store(storeRemoveMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BroadcastMessage') {
            body = beginCell().store(storeBroadcastMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getAddressList(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('address_list', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}