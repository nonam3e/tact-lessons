# TACT Compilation Report
Contract: NftItem
BOC Size: 1670 bytes

# Types
Total Types: 16

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## NftTransfer
TLB: `nft_transfer#5fcc3d14 query_id:uint64 new_owner:address response_destination:address custom_payload:Maybe ^cell forward_amount:coins forward_payload:^cell = NftTransfer`
Signature: `NftTransfer{query_id:uint64,new_owner:address,response_destination:address,custom_payload:Maybe ^cell,forward_amount:coins,forward_payload:^cell}`

## NftOwnershipAssigned
TLB: `nft_ownership_assigned#05138d91 query_id:uint64 prev_owner:address forward_payload:^cell = NftOwnershipAssigned`
Signature: `NftOwnershipAssigned{query_id:uint64,prev_owner:address,forward_payload:^cell}`

## NftExcesses
TLB: `nft_excesses#6f89f5e3 query_id:uint64 = NftExcesses`
Signature: `NftExcesses{query_id:uint64}`

## NftGetStaticData
TLB: `nft_get_static_data#2fcb26a2 query_id:uint64 = NftGetStaticData`
Signature: `NftGetStaticData{query_id:uint64}`

## NftReportStaticData
TLB: `nft_report_static_data#8b771735 query_id:uint64 index:uint256 collection:address = NftReportStaticData`
Signature: `NftReportStaticData{query_id:uint64,index:uint256,collection:address}`

## NftGetRoyaltyParams
TLB: `nft_get_royalty_params#693d3950 query_id:uint64 = NftGetRoyaltyParams`
Signature: `NftGetRoyaltyParams{query_id:uint64}`

## NftReportRoyaltyParams
TLB: `nft_report_royalty_params#a8cb00ad query_id:uint64 numerator:uint16 denominator:uint16 destination:address = NftReportRoyaltyParams`
Signature: `NftReportRoyaltyParams{query_id:uint64,numerator:uint16,denominator:uint16,destination:address}`

## NftDestroy
TLB: `nft_destroy#1f04537a query_id:uint64 = NftDestroy`
Signature: `NftDestroy{query_id:uint64}`

## NftData
TLB: `_ deployed:bool index:int257 collection:address owner:address content:^cell = NftData`
Signature: `NftData{deployed:bool,index:int257,collection:address,owner:address,content:^cell}`

## NftRoyaltyParams
TLB: `_ numerator:int257 denominator:int257 royalty_destination:address = NftRoyaltyParams`
Signature: `NftRoyaltyParams{numerator:int257,denominator:int257,royalty_destination:address}`

# Get Methods
Total Get Methods: 2

## get_nft_data

## royalty_params

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
11850: Not Deployed
23263: Invalid Sender
30404: Invalid Amount
42491: Invalid Owner