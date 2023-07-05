# TACT Compilation Report
Contract: AddressBook
BOC Size: 2403 bytes

# Types
Total Types: 10

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## AddUserMessage
TLB: `add_user_message#945f9817 name:^string address:address = AddUserMessage`
Signature: `AddUserMessage{name:^string,address:address}`

## RemoveUserMessage
TLB: `remove_user_message#2568a530 name:^string = RemoveUserMessage`
Signature: `RemoveUserMessage{name:^string}`

## ProxyMessage
TLB: `proxy_message#82a4a809 to:^string message:^string = ProxyMessage`
Signature: `ProxyMessage{to:^string,message:^string}`

## User
TLB: `_ name:^string address:address received_count:uint32 sent_count:uint32 = User`
Signature: `User{name:^string,address:address,received_count:uint32,sent_count:uint32}`

## Name
TLB: `_ name:^string = Name`
Signature: `Name{name:^string}`

# Get Methods
Total Get Methods: 3

## get_stat
Argument: str

## get_username
Argument: address

## owner

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract