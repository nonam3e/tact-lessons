message(0x5fcc3d14) NftTransfer {
    query_id: Int as uint64;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_amount: Int as coins;
    forward_payload: Slice as remaining;
}

message(0x05138d91) NftOwnershipAssigned {
    query_id: Int as uint64;
    prev_owner: Address;
    forward_payload: Slice as remaining;
}

message(0x6f89f5e3) NftExcesses {
    query_id: Int as uint64;
}

message(0x2fcb26a2) NftGetStaticData {
    query_id: Int as uint64;
}

message(0x8b771735) NftReportStaticData {
    query_id: Int as uint64;
    index: Int as uint256;
    collection: Address;
}

message(0x693d3950) NftGetRoyaltyParams {
    query_id: Int as uint64;
}

message(0xa8cb00ad) NftReportRoyaltyParams {
    query_id: Int as uint64;
    numerator: Int as uint16;
    denominator: Int as uint16;
    destination: Address;
}

message(0x1f04537a) NftDestroy {
    query_id: Int as uint64;
}

message NftDeploy {
    index: Int as uint256;
    owner: Address;
    content: Cell;
    royalty_destination: Address;
    numerator: Int as uint16;
    denominator: Int as uint16;
}

message RequestNftDeploy {
    index: Int as uint256;
    amount: Int as coins;
    owner: Address;
    content: Cell;
}