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

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Address | null;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadMaybeAddress();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readAddressOpt();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
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

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260144805, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260144805) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type TransferNotification = {
    $$type: 'TransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Cell;
}

export function storeTransferNotification(src: TransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleTransferNotification(source: TransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTransferNotification(): DictionaryValue<TransferNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type PriceInfo = {
    $$type: 'PriceInfo';
    price: bigint;
    full_price: bigint;
    royalty_fee: bigint;
    royalty_destination: Address | null;
    service_fee: bigint;
    service_address: Address;
}

export function storePriceInfo(src: PriceInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.price, 257);
        b_0.storeInt(src.full_price, 257);
        b_0.storeInt(src.royalty_fee, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.royalty_destination);
        b_1.storeInt(src.service_fee, 257);
        b_1.storeAddress(src.service_address);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPriceInfo(slice: Slice) {
    let sc_0 = slice;
    let _price = sc_0.loadIntBig(257);
    let _full_price = sc_0.loadIntBig(257);
    let _royalty_fee = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _royalty_destination = sc_1.loadMaybeAddress();
    let _service_fee = sc_1.loadIntBig(257);
    let _service_address = sc_1.loadAddress();
    return { $$type: 'PriceInfo' as const, price: _price, full_price: _full_price, royalty_fee: _royalty_fee, royalty_destination: _royalty_destination, service_fee: _service_fee, service_address: _service_address };
}

function loadTuplePriceInfo(source: TupleReader) {
    let _price = source.readBigNumber();
    let _full_price = source.readBigNumber();
    let _royalty_fee = source.readBigNumber();
    let _royalty_destination = source.readAddressOpt();
    let _service_fee = source.readBigNumber();
    let _service_address = source.readAddress();
    return { $$type: 'PriceInfo' as const, price: _price, full_price: _full_price, royalty_fee: _royalty_fee, royalty_destination: _royalty_destination, service_fee: _service_fee, service_address: _service_address };
}

function storeTuplePriceInfo(source: PriceInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.price);
    builder.writeNumber(source.full_price);
    builder.writeNumber(source.royalty_fee);
    builder.writeAddress(source.royalty_destination);
    builder.writeNumber(source.service_fee);
    builder.writeAddress(source.service_address);
    return builder.build();
}

function dictValueParserPriceInfo(): DictionaryValue<PriceInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePriceInfo(src)).endCell());
        },
        parse: (src) => {
            return loadPriceInfo(src.loadRef().beginParse());
        }
    }
}

export type SaleInfo = {
    $$type: 'SaleInfo';
    sale_ended: boolean;
    owner: Address;
    nft: Address;
    nft_received: boolean;
    jetton_master: Address;
    jetton_wallet: Address | null;
    price_info: PriceInfo;
}

export function storeSaleInfo(src: SaleInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.sale_ended);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.nft);
        b_0.storeBit(src.nft_received);
        b_0.storeAddress(src.jetton_master);
        let b_1 = new Builder();
        b_1.storeAddress(src.jetton_wallet);
        let b_2 = new Builder();
        b_2.store(storePriceInfo(src.price_info));
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadSaleInfo(slice: Slice) {
    let sc_0 = slice;
    let _sale_ended = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _nft = sc_0.loadAddress();
    let _nft_received = sc_0.loadBit();
    let _jetton_master = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _jetton_wallet = sc_1.loadMaybeAddress();
    let sc_2 = sc_1.loadRef().beginParse();
    let _price_info = loadPriceInfo(sc_2);
    return { $$type: 'SaleInfo' as const, sale_ended: _sale_ended, owner: _owner, nft: _nft, nft_received: _nft_received, jetton_master: _jetton_master, jetton_wallet: _jetton_wallet, price_info: _price_info };
}

function loadTupleSaleInfo(source: TupleReader) {
    let _sale_ended = source.readBoolean();
    let _owner = source.readAddress();
    let _nft = source.readAddress();
    let _nft_received = source.readBoolean();
    let _jetton_master = source.readAddress();
    let _jetton_wallet = source.readAddressOpt();
    const _price_info = loadTuplePriceInfo(source.readTuple());
    return { $$type: 'SaleInfo' as const, sale_ended: _sale_ended, owner: _owner, nft: _nft, nft_received: _nft_received, jetton_master: _jetton_master, jetton_wallet: _jetton_wallet, price_info: _price_info };
}

function storeTupleSaleInfo(source: SaleInfo) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.sale_ended);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.nft);
    builder.writeBoolean(source.nft_received);
    builder.writeAddress(source.jetton_master);
    builder.writeAddress(source.jetton_wallet);
    builder.writeTuple(storeTuplePriceInfo(source.price_info));
    return builder.build();
}

function dictValueParserSaleInfo(): DictionaryValue<SaleInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSaleInfo(src)).endCell());
        },
        parse: (src) => {
            return loadSaleInfo(src.loadRef().beginParse());
        }
    }
}

 type NftSale_init_args = {
    $$type: 'NftSale_init_args';
    owner: Address;
    nft: Address;
    price: bigint;
    jetton_master: Address;
    numerator: bigint;
    denominator: bigint;
    royalty_destination: Address | null;
}

function initNftSale_init_args(src: NftSale_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.nft);
        b_0.storeInt(src.price, 257);
        let b_1 = new Builder();
        b_1.storeAddress(src.jetton_master);
        b_1.storeInt(src.numerator, 257);
        b_1.storeInt(src.denominator, 257);
        let b_2 = new Builder();
        b_2.storeAddress(src.royalty_destination);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

async function NftSale_init(owner: Address, nft: Address, price: bigint, jetton_master: Address, numerator: bigint, denominator: bigint, royalty_destination: Address | null) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftSale_init_args({ $$type: 'NftSale_init_args', owner, nft, price, jetton_master, numerator, denominator, royalty_destination })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NftSale_errors: { [key: number]: { message: string } } = {
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
    4429: { message: `Invalid sender` },
}

export class NftSale implements Contract {
    
    static async init(owner: Address, nft: Address, price: bigint, jetton_master: Address, numerator: bigint, denominator: bigint, royalty_destination: Address | null) {
        return await NftSale_init(owner, nft, price, jetton_master, numerator, denominator, royalty_destination);
    }
    
    static async fromInit(owner: Address, nft: Address, price: bigint, jetton_master: Address, numerator: bigint, denominator: bigint, royalty_destination: Address | null) {
        const init = await NftSale_init(owner, nft, price, jetton_master, numerator, denominator, royalty_destination);
        const address = contractAddress(0, init);
        return new NftSale(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftSale(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: NftSale_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TakeWalletAddress | NftOwnershipAssigned | TransferNotification | 'Cancel' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TakeWalletAddress') {
            body = beginCell().store(storeTakeWalletAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftOwnershipAssigned') {
            body = beginCell().store(storeNftOwnershipAssigned(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferNotification') {
            body = beginCell().store(storeTransferNotification(message)).endCell();
        }
        if (message === 'Cancel') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetPriceInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_price_info', builder.build())).stack;
        const result = loadTuplePriceInfo(source);
        return result;
    }
    
    async getGetSaleInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_sale_info', builder.build())).stack;
        const result = loadTupleSaleInfo(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}