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

export type AddUserMessage = {
    $$type: 'AddUserMessage';
    name: string;
    address: Address;
}

export function storeAddUserMessage(src: AddUserMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2489292823, 32);
        b_0.storeStringRefTail(src.name);
        b_0.storeAddress(src.address);
    };
}

export function loadAddUserMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2489292823) { throw Error('Invalid prefix'); }
    let _name = sc_0.loadStringRefTail();
    let _address = sc_0.loadAddress();
    return { $$type: 'AddUserMessage' as const, name: _name, address: _address };
}

function loadTupleAddUserMessage(source: TupleReader) {
    let _name = source.readString();
    let _address = source.readAddress();
    return { $$type: 'AddUserMessage' as const, name: _name, address: _address };
}

function storeTupleAddUserMessage(source: AddUserMessage) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserAddUserMessage(): DictionaryValue<AddUserMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAddUserMessage(src)).endCell());
        },
        parse: (src) => {
            return loadAddUserMessage(src.loadRef().beginParse());
        }
    }
}

export type RemoveUserMessage = {
    $$type: 'RemoveUserMessage';
    name: string;
}

export function storeRemoveUserMessage(src: RemoveUserMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(627615024, 32);
        b_0.storeStringRefTail(src.name);
    };
}

export function loadRemoveUserMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 627615024) { throw Error('Invalid prefix'); }
    let _name = sc_0.loadStringRefTail();
    return { $$type: 'RemoveUserMessage' as const, name: _name };
}

function loadTupleRemoveUserMessage(source: TupleReader) {
    let _name = source.readString();
    return { $$type: 'RemoveUserMessage' as const, name: _name };
}

function storeTupleRemoveUserMessage(source: RemoveUserMessage) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    return builder.build();
}

function dictValueParserRemoveUserMessage(): DictionaryValue<RemoveUserMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRemoveUserMessage(src)).endCell());
        },
        parse: (src) => {
            return loadRemoveUserMessage(src.loadRef().beginParse());
        }
    }
}

export type ProxyMessage = {
    $$type: 'ProxyMessage';
    to: string;
    message: string;
}

export function storeProxyMessage(src: ProxyMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2191829001, 32);
        b_0.storeStringRefTail(src.to);
        b_0.storeStringRefTail(src.message);
    };
}

export function loadProxyMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2191829001) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadStringRefTail();
    let _message = sc_0.loadStringRefTail();
    return { $$type: 'ProxyMessage' as const, to: _to, message: _message };
}

function loadTupleProxyMessage(source: TupleReader) {
    let _to = source.readString();
    let _message = source.readString();
    return { $$type: 'ProxyMessage' as const, to: _to, message: _message };
}

function storeTupleProxyMessage(source: ProxyMessage) {
    let builder = new TupleBuilder();
    builder.writeString(source.to);
    builder.writeString(source.message);
    return builder.build();
}

function dictValueParserProxyMessage(): DictionaryValue<ProxyMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProxyMessage(src)).endCell());
        },
        parse: (src) => {
            return loadProxyMessage(src.loadRef().beginParse());
        }
    }
}

export type User = {
    $$type: 'User';
    name: string;
    address: Address;
    received_count: bigint;
    sent_count: bigint;
}

export function storeUser(src: User) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
        b_0.storeAddress(src.address);
        b_0.storeUint(src.received_count, 32);
        b_0.storeUint(src.sent_count, 32);
    };
}

export function loadUser(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    let _address = sc_0.loadAddress();
    let _received_count = sc_0.loadUintBig(32);
    let _sent_count = sc_0.loadUintBig(32);
    return { $$type: 'User' as const, name: _name, address: _address, received_count: _received_count, sent_count: _sent_count };
}

function loadTupleUser(source: TupleReader) {
    let _name = source.readString();
    let _address = source.readAddress();
    let _received_count = source.readBigNumber();
    let _sent_count = source.readBigNumber();
    return { $$type: 'User' as const, name: _name, address: _address, received_count: _received_count, sent_count: _sent_count };
}

function storeTupleUser(source: User) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    builder.writeAddress(source.address);
    builder.writeNumber(source.received_count);
    builder.writeNumber(source.sent_count);
    return builder.build();
}

function dictValueParserUser(): DictionaryValue<User> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUser(src)).endCell());
        },
        parse: (src) => {
            return loadUser(src.loadRef().beginParse());
        }
    }
}

export type Name = {
    $$type: 'Name';
    name: string;
}

export function storeName(src: Name) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.name);
    };
}

export function loadName(slice: Slice) {
    let sc_0 = slice;
    let _name = sc_0.loadStringRefTail();
    return { $$type: 'Name' as const, name: _name };
}

function loadTupleName(source: TupleReader) {
    let _name = source.readString();
    return { $$type: 'Name' as const, name: _name };
}

function storeTupleName(source: Name) {
    let builder = new TupleBuilder();
    builder.writeString(source.name);
    return builder.build();
}

function dictValueParserName(): DictionaryValue<Name> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeName(src)).endCell());
        },
        parse: (src) => {
            return loadName(src.loadRef().beginParse());
        }
    }
}

 type AddressBook_init_args = {
    $$type: 'AddressBook_init_args';
    owner: Address;
}

function initAddressBook_init_args(src: AddressBook_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function AddressBook_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('te6cckECLAEACWEAAQHAAQEFoMJ5AgEU/wD0pBP0vPLICwMCAWISBAIBIA0FAgEgDAYCAUgIBwB1sm7jQ1aXBmczovL1FtWjRTcHVzWGd6ZGJtMVY0RmpiVmI4UFY5cE14d2FCTnpzTTZlWjVGaU53OWeCACASALCQJNrpMQa6TAgIXdeXBEEGuFhRBAgn/deWhEwYTdeXBEbZ4qge2eNiDAKgoAUoEBCyMCWfQLb6GSMG3fIG6SMG2X0NQB0DFvAeIgbpIwbeAgbvLQgG8hABGtX3aiaGkAAMAAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSCcEDOdWnnFfnSULAdYW4mR7KAIBWBAOAkG1EFtniqB7Z42IJA3SRg2zJA3eWhAN5I3gnEQN0kYNu9AqDwCOgwcB+QIkWVn0D2+hkjBt3yBukjBtji/Q1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0x/TH1UwbBRvBOICEbSju2ebZ42IMCoRAAIjAuTQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCyPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFvQAEvQAyx/J7VQqEwPs7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEJRfmBe6jrQw0x8BghCUX5gXuvLggdQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIEmwS4CCCECVopTC6jpUw0x8BghAlaKUwuvLggdQB0DHbPH/gICglFAJ+ghCCpKgJuo6bMNMfAYIQgqSoCbry4IHUAdAB1AHQEmwS2zx/4MAAjpIg10nCH46JgCDXIds8f9sx4DCRMOJwHRUE2oMHAfkCJFlZ9A9voZIwbd8gbpIwbY4v0NQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf0x9VMGwUbwTiIG7y0IBvJDLIcAHLH28AAW+MbW+MUAPbPItiBzZW50II2zwh2zwkJBwWBDzbPIvSBtZXNzYWdlKHMpICiNs8AYEnEKgjqQRy2zwkJBsXBDTbPI0ECUpIGFuZCByZWNlaXZlZCCDbPCHbPCQkHBgEPNs8i9IG1lc3NhZ2UocykgKI2zwBgScQqCKpBHLbPCQkGxkDQNs8iyJSmNs8byIByZMhbrOWAW8iWczJ6DH4QgF/bds8JCQaATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPCEA2iDBASHCTbHy0IbIIsEAmIAtAcsHAqMC3n9wbwAEjhsEeqkMIMAAUjCws5twM6YwFG+MBKQEA5Ew4gTkAbOXAoAub4wCpN6OEAN6qQymMBNvjAOkIsAAEDTmMyKlA5pTEm+BAcsHAqUC5GwhydAA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AL2gQEL+EIlWVn0C2+hkjBt3yBukjBtl9DUAdAxbwHiIG7y0IBvIfkCAvkCJYMHIln0D2+hkjBt3yBukjBtji/Q1AHQAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0x/TH1UwbBRvBOIgbvLQgG8kcIBAB9s8Ix4CwCQDUIh/VTBtbds8BqQogwcnWfQPb6GSMG3fIG6SMG2OL9DUAdAB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTH9MfVTBsFG8E4iBu8tCAbySDBwukEDdGCSEfAfjIVTDIUATPFslQBMwBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEssfyx/JEDpIUCBulTBZ9FswlEEz9BfigwcEpBjIVTDIUATPFslQBMwBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEssfyx/JEDUSIAAeIG6VMFn0WzCUQTP0F+ICAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ACIAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwBQshwAcsfbwABb4xtb4wB2zxvIgHJkyFus5YBbyJZzMnoMSQAuiDXSiHXSZcgwgAiwgCxjkoDbyKAfyLPMasCoQWrAlFVtgggwgCcIKoCFdcYUDPPFkAU3llvAlNBocIAmcgBbwJQRKGqAo4SMTPCAJnUMNAg10oh10mScCDi4uhfAwKyVTDbPAT5AiKDByJZ9A9voZIwbd8gbpIwbY4v0NQB0AH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf0x9VMGwUbwTiIG7y0IBvJBAjXwODB20pJgH+IG6SMG2OOCBu8tCAbyTIVTDIUATPFslQBMwBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEssfyx/J4hA1QVAgbpUwWfRbMJRBM/QX4oEBC20gbpIwbY4RIG7y0IBvIcgByAHPFskBzMniQUAgbpUwWfRZMJRBM/QT4icABFUCAeRVMds8JfkCgwdTdnAgyFUwyFAEzxbJUATMASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhLLH8sfyRA1EiBulTBZ9FswlEEz9BfigQELBsgByAHPFskBzMkQI0ZQIG6VMFn0WTCUQTP0E+JQA38pABL4QlJAxwXy4IQByu1E0NQB+GPSAAGOKvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB9AT0BNMfVTBsFOD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0ds8KwAIcG1tWNFD1Ic=');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initAddressBook_init_args({ $$type: 'AddressBook_init_args', owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const AddressBook_errors: { [key: number]: { message: string } } = {
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
}

export class AddressBook implements Contract {
    
    static async init(owner: Address) {
        return await AddressBook_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await AddressBook_init(owner);
        const address = contractAddress(0, init);
        return new AddressBook(address, init);
    }
    
    static fromAddress(address: Address) {
        return new AddressBook(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: AddressBook_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: AddUserMessage | RemoveUserMessage | ProxyMessage | string) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddUserMessage') {
            body = beginCell().store(storeAddUserMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RemoveUserMessage') {
            body = beginCell().store(storeRemoveUserMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ProxyMessage') {
            body = beginCell().store(storeProxyMessage(message)).endCell();
        }
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetStat(provider: ContractProvider, str: string) {
        let builder = new TupleBuilder();
        builder.writeString(str);
        let source = (await provider.get('get_stat', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleUser(result_p) : null;
        return result;
    }
    
    async getGetUsername(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('get_username', builder.build())).stack;
        let result = source.readStringOpt();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}