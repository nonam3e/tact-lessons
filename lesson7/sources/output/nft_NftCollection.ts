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

export type NftData = {
    $$type: 'NftData';
    deployed: boolean;
    index: bigint;
    collection: Address;
    owner: Address;
    content: Cell;
}

export function storeNftData(src: NftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.deployed);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

export function loadNftData(slice: Slice) {
    let sc_0 = slice;
    let _deployed = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    return { $$type: 'NftData' as const, deployed: _deployed, index: _index, collection: _collection, owner: _owner, content: _content };
}

function loadTupleNftData(source: TupleReader) {
    let _deployed = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    let _owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'NftData' as const, deployed: _deployed, index: _index, collection: _collection, owner: _owner, content: _content };
}

function storeTupleNftData(source: NftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.deployed);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserNftData(): DictionaryValue<NftData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftData(src)).endCell());
        },
        parse: (src) => {
            return loadNftData(src.loadRef().beginParse());
        }
    }
}

export type NftRoyaltyParams = {
    $$type: 'NftRoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    royalty_destination: Address;
}

export function storeNftRoyaltyParams(src: NftRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.royalty_destination);
    };
}

export function loadNftRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _royalty_destination = sc_0.loadAddress();
    return { $$type: 'NftRoyaltyParams' as const, numerator: _numerator, denominator: _denominator, royalty_destination: _royalty_destination };
}

function loadTupleNftRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _royalty_destination = source.readAddress();
    return { $$type: 'NftRoyaltyParams' as const, numerator: _numerator, denominator: _denominator, royalty_destination: _royalty_destination };
}

function storeTupleNftRoyaltyParams(source: NftRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.royalty_destination);
    return builder.build();
}

function dictValueParserNftRoyaltyParams(): DictionaryValue<NftRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NftTransfer = {
    $$type: 'NftTransfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Cell;
}

export function storeNftTransfer(src: NftTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadNftTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'NftTransfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleNftTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'NftTransfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleNftTransfer(source: NftTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserNftTransfer(): DictionaryValue<NftTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadNftTransfer(src.loadRef().beginParse());
        }
    }
}

export type NftOwnershipAssigned = {
    $$type: 'NftOwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Cell;
}

export function storeNftOwnershipAssigned(src: NftOwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadNftOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'NftOwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleNftOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'NftOwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleNftOwnershipAssigned(source: NftOwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserNftOwnershipAssigned(): DictionaryValue<NftOwnershipAssigned> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadNftOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type NftExcesses = {
    $$type: 'NftExcesses';
    query_id: bigint;
}

export function storeNftExcesses(src: NftExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1871312355, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1871312355) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftExcesses' as const, query_id: _query_id };
}

function loadTupleNftExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftExcesses' as const, query_id: _query_id };
}

function storeTupleNftExcesses(source: NftExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftExcesses(): DictionaryValue<NftExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadNftExcesses(src.loadRef().beginParse());
        }
    }
}

export type NftGetStaticData = {
    $$type: 'NftGetStaticData';
    query_id: bigint;
}

export function storeNftGetStaticData(src: NftGetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftGetStaticData' as const, query_id: _query_id };
}

function loadTupleNftGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftGetStaticData' as const, query_id: _query_id };
}

function storeTupleNftGetStaticData(source: NftGetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftGetStaticData(): DictionaryValue<NftGetStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadNftGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type NftReportStaticData = {
    $$type: 'NftReportStaticData';
    query_id: bigint;
    index: bigint;
    collection: Address;
}

export function storeNftReportStaticData(src: NftReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.collection);
    };
}

export function loadNftReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index = sc_0.loadUintBig(256);
    let _collection = sc_0.loadAddress();
    return { $$type: 'NftReportStaticData' as const, query_id: _query_id, index: _index, collection: _collection };
}

function loadTupleNftReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'NftReportStaticData' as const, query_id: _query_id, index: _index, collection: _collection };
}

function storeTupleNftReportStaticData(source: NftReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserNftReportStaticData(): DictionaryValue<NftReportStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadNftReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type NftGetRoyaltyParams = {
    $$type: 'NftGetRoyaltyParams';
    query_id: bigint;
}

export function storeNftGetRoyaltyParams(src: NftGetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftGetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleNftGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftGetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleNftGetRoyaltyParams(source: NftGetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftGetRoyaltyParams(): DictionaryValue<NftGetRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NftReportRoyaltyParams = {
    $$type: 'NftReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeNftReportRoyaltyParams(src: NftReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadNftReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'NftReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleNftReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'NftReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleNftReportRoyaltyParams(source: NftReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserNftReportRoyaltyParams(): DictionaryValue<NftReportRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NftDestroy = {
    $$type: 'NftDestroy';
    query_id: bigint;
}

export function storeNftDestroy(src: NftDestroy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(520377210, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftDestroy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 520377210) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftDestroy' as const, query_id: _query_id };
}

function loadTupleNftDestroy(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftDestroy' as const, query_id: _query_id };
}

function storeTupleNftDestroy(source: NftDestroy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftDestroy(): DictionaryValue<NftDestroy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftDestroy(src)).endCell());
        },
        parse: (src) => {
            return loadNftDestroy(src.loadRef().beginParse());
        }
    }
}

export type NftDeploy = {
    $$type: 'NftDeploy';
    index: bigint;
    owner: Address;
    content: Cell;
    royalty_destination: Address;
    numerator: bigint;
    denominator: bigint;
}

export function storeNftDeploy(src: NftDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3332240189, 32);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.royalty_destination);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
    };
}

export function loadNftDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3332240189) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadUintBig(256);
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _royalty_destination = sc_0.loadAddress();
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    return { $$type: 'NftDeploy' as const, index: _index, owner: _owner, content: _content, royalty_destination: _royalty_destination, numerator: _numerator, denominator: _denominator };
}

function loadTupleNftDeploy(source: TupleReader) {
    let _index = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _royalty_destination = source.readAddress();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    return { $$type: 'NftDeploy' as const, index: _index, owner: _owner, content: _content, royalty_destination: _royalty_destination, numerator: _numerator, denominator: _denominator };
}

function storeTupleNftDeploy(source: NftDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeAddress(source.royalty_destination);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    return builder.build();
}

function dictValueParserNftDeploy(): DictionaryValue<NftDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeNftDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadNftDeploy(src.loadRef().beginParse());
        }
    }
}

export type RequestNftDeploy = {
    $$type: 'RequestNftDeploy';
    index: bigint;
    amount: bigint;
    owner: Address;
    content: Cell;
}

export function storeRequestNftDeploy(src: RequestNftDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1410495530, 32);
        b_0.storeUint(src.index, 256);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

export function loadRequestNftDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1410495530) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    return { $$type: 'RequestNftDeploy' as const, index: _index, amount: _amount, owner: _owner, content: _content };
}

function loadTupleRequestNftDeploy(source: TupleReader) {
    let _index = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'RequestNftDeploy' as const, index: _index, amount: _amount, owner: _owner, content: _content };
}

function storeTupleRequestNftDeploy(source: RequestNftDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserRequestNftDeploy(): DictionaryValue<RequestNftDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRequestNftDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadRequestNftDeploy(src.loadRef().beginParse());
        }
    }
}

export type RequestNftBatchDeploy = {
    $$type: 'RequestNftBatchDeploy';
    cell: Cell;
}

export function storeRequestNftBatchDeploy(src: RequestNftBatchDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(189313773, 32);
        b_0.storeBuilder(src.cell.asBuilder());
    };
}

export function loadRequestNftBatchDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 189313773) { throw Error('Invalid prefix'); }
    let _cell = sc_0.asCell();
    return { $$type: 'RequestNftBatchDeploy' as const, cell: _cell };
}

function loadTupleRequestNftBatchDeploy(source: TupleReader) {
    let _cell = source.readCell();
    return { $$type: 'RequestNftBatchDeploy' as const, cell: _cell };
}

function storeTupleRequestNftBatchDeploy(source: RequestNftBatchDeploy) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.cell);
    return builder.build();
}

function dictValueParserRequestNftBatchDeploy(): DictionaryValue<RequestNftBatchDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRequestNftBatchDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadRequestNftBatchDeploy(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    next_index: bigint;
    content: Cell;
    owner: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_index, 257);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.owner);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_index = sc_0.loadIntBig(257);
    let _content = sc_0.loadRef();
    let _owner = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_index: _next_index, content: _content, owner: _owner };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_index = source.readBigNumber();
    let _content = source.readCell();
    let _owner = source.readAddress();
    return { $$type: 'CollectionData' as const, next_index: _next_index, content: _content, owner: _owner };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_index);
    builder.writeCell(source.content);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

 type NftCollection_init_args = {
    $$type: 'NftCollection_init_args';
    owner: Address;
    content: Cell;
    royalty_destination: Address;
    numerator: bigint;
    denominator: bigint;
}

function initNftCollection_init_args(src: NftCollection_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.royalty_destination);
        b_0.storeInt(src.numerator, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.denominator, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function NftCollection_init(owner: Address, content: Cell, royalty_destination: Address, numerator: bigint, denominator: bigint) {
    const __code = Cell.fromBase64('te6ccgECJgEABgQAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFds88uCCIAQFAgEgDxAC9gGSMH/gcCHXScIflTAg1wsf3iCCEAtIsu26jhIw0x8BghALSLLtuvLggSAxMH/gIIIQVBJ0KrqOujDTHwGCEFQSdCq68uCB0//6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1FUwbBTbPH/gIIIQlGqYtgYHAKzI+EMBzH8BygBVUFBlINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE8v/zAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSyw/LD8ntVATwEFkQSBA3RpjbPIIArDNThbvy9PhD+Cgp2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhxcFRM/lR4dshVUNs8yRYQWhBMHRMQNhA1EDQCCBsJCgJuuo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+CCEGk9OVC64wIwcAsMABL4QlJgxwXy4IQAooIQxp3zPVAHyx8Vy/9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFswBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyw/LDwEU2zxRQbqRpN5FVA0BOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8DQGw0x8BghBpPTlQuvLggdM/ATH4QnCAQFQzVCjIVTCCEKjLAK1QBcsfE8s/yw/LDwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJQTB/VTBtbds8fw0ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIBESAgEgHB0CFbi13bPFUV2zxsYYIBMCASAUFQACMQIBSBYXAhW09HtniqC7Z42MMCAaAhGuju2ebZ42MMAgGAIRr2vtnm2eNjHAIBkAAiUABlRxAgGQ+EP4KFjbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIGwCiAtD0BDBtAYF56gGAEPQPb6Hy4IcBgXnqIgKAEPQXyAHI9ADJAcxwAcoAQANZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJAgEgHh8CAUgkJQIRtgt7Z5tnjYxwICEAubd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkE4IGc6tPOK/OkoWA6wtxMj2UAHG7UTQ1AH4Y9IAAY5L+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT/9T6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMP0w9VUGwW4Pgo1wsKgwm68uCJIgAGVHQ1AbL6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA1AHQgQEB1wAwFRRDMAXRVQPbPCMABnBVMAARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1ZWG1WakR3VDRySHZQbzJiaVpzNGlKN2FlUGo2UmFTeGJnM2MzeTFCQ1lKVYIA==');
    const __system = Cell.fromBase64('te6cckECRAEAC1cAAQHAAQIBICQCAQW9ESwDART/APSkE/S88sgLBAIBYhcFAgEgDQYCASAJBwIBSCsIAHWybuNDVpcGZzOi8vUW1ZWG1WakR3VDRySHZQbzJiaVpzNGlKN2FlUGo2UmFTeGJnM2MzeTFCQ1lKVYIAIBIAsKALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lACEbYLe2ebZ42McCEMAAZUdDUCASAVDgIBIBEPAhW09HtniqC7Z42MMCEQAZD4Q/goWNs8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgfAgFIExICEa9r7Z5tnjYxwCExAhGuju2ebZ42MMAhFAACJQIVuLXds8VRXbPGxhghFgACMQN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRXbPPLggiEZGACsyPhDAcx/AcoAVVBQZSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhPL/8wBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEssPyw/J7VQC9gGSMH/gcCHXScIflTAg1wsf3iCCEAtIsu26jhIw0x8BghALSLLtuvLggSAxMH/gIIIQVBJ0KrqOujDTHwGCEFQSdCq68uCB0//6APpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1FUwbBTbPH/gIIIQlGqYthwaAm66jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4IIQaT05ULrjAjBwGzcBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8PgTwEFkQSBA3RpjbPIIArDNThbvy9PhD+Cgp2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhxcFRM/lR4dshVUNs8yRYQWhBMHRMQNhA1EDQCIB8eHQEU2zxRQbqRpN5FVD4AooIQxp3zPVAHyx8Vy/9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFswBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wyw/LDwCiAtD0BDBtAYF56gGAEPQPb6Hy4IcBgXnqIgKAEPQXyAHI9ADJAcxwAcoAQANZINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJABL4QlJgxwXy4IQBxu1E0NQB+GPSAAGOS/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//U+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTD9MPVVBsFuD4KNcLCoMJuvLgiSIBsvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wDUAdCBAQHXADAVFEMwBdFVA9s8IwAGcFUwAQW/z1QlART/APSkE/S88sgLJgIBYjInAgEgMCgCASAsKQIBSCsqAHWybuNDVpcGZzOi8vUW1VaFk4bWs4cnJ1RDkzdERQYnczSG9TeFNGTTJIQXRDV0wyNFlzOW9KYnhwMYIAARsK+7UTQ0gABgAgEgLi0Albd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkAIRtfn7Z5tnjZCwQS8AClR3RlOGAhG+dr7Z5tnjZBxBMQAGVHECA37QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVF9s88uCC2zxBNTMB9sj4QwHMfwHKAFVwUHjKAFAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbL/8zIWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhLLDxLLD8kBzDQABsntVATGAZIwf+BwIddJwh+VMCDXCx/eIIIQxp3zPbqOqjDbPGwWNjY2NjeBWt/4QlKQxwXy9CWCAKwzArry9IIAxJQIsxjy9H8Hf+AgghAfBFN6uuMCIIIQX8w9FLrjAiCCEC/LJqK6QD04NgLIjtYw0x8BghAvyyaiuvLggdM/ATH4QnCAQFQzishVIIIQi3cXNVAEyx8Syz/L/wEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbJQTB/VTBtbds8f+CCEGk9OVC64wIwcD43AbDTHwGCEGk9OVC68uCB0z8BMfhCcIBAVDNUKMhVMIIQqMsArVAFyx8Tyz/LD8sPASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFslBMH9VMG1t2zx/PgIKMNs8bBY8OQPyMvhBbySBLkpWEfL0ggCl+1PzxwXy9IIK+vCAIPgnbxC2CKGCCTEtACagIaAmwwCOh1R1QyXbPKDeI4F2xAK+8vQiggkxLQChJqEBoSXDAJM/XwbjDSjCAI6ZAsgBghBvifXjWMsfyz/JGH8DcEMDbW3bPJMwNzDifzs6PgKOVTDbPKFxVEbUyFUgghAFE42RUATLHxLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBzxbJJANQzH9VMG1t2zw7PgBkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwAAwNMfAYIQX8w9FLry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeL6AFFVFRRDMAF+MNMfAYIQHwRTerry4IHTPwExggCl+/hCGMcFF/L0+Cj4QnCDBgnIAYIQb4n141jLH8s/yUEwGX9VMG1t2zx/PgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wA/AJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAKzTHwGCEMad8z268uCB0//6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMP0w9VUAKE7UTQ1AH4Y9IAAeMC+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcAWQLRAds8Q0IAIHBwcSTIySYQVxBWQBVQRAMA8tIA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/1NQB0PpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0w/TDzAQOBA3EDYQNRA0bBgaMQS5');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftCollection_init_args({ $$type: 'NftCollection_init_args', owner, content, royalty_destination, numerator, denominator })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NftCollection_errors: { [key: number]: { message: string } } = {
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
    11850: { message: `Not Deployed` },
    23263: { message: `Invalid Sender` },
    30404: { message: `Invalid Amount` },
    42491: { message: `Invalid Owner` },
    44083: { message: `Invalid Index` },
    50324: { message: `Already Deployed` },
}

export class NftCollection implements Contract {
    
    static async init(owner: Address, content: Cell, royalty_destination: Address, numerator: bigint, denominator: bigint) {
        return await NftCollection_init(owner, content, royalty_destination, numerator, denominator);
    }
    
    static async fromInit(owner: Address, content: Cell, royalty_destination: Address, numerator: bigint, denominator: bigint) {
        const init = await NftCollection_init(owner, content, royalty_destination, numerator, denominator);
        const address = contractAddress(0, init);
        return new NftCollection(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftCollection(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: NftCollection_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: RequestNftBatchDeploy | RequestNftDeploy | Deploy | NftGetRoyaltyParams) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RequestNftBatchDeploy') {
            body = beginCell().store(storeRequestNftBatchDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RequestNftDeploy') {
            body = beginCell().store(storeRequestNftDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftGetRoyaltyParams') {
            body = beginCell().store(storeNftGetRoyaltyParams(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body, sendMode: 1});
        
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, index: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individual_content: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individual_content);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getRoyaltyParams(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('royalty_params', builder.build())).stack;
        const result = loadTupleNftRoyaltyParams(source);
        return result;
    }
    
}