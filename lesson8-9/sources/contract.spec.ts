import { Address, OpenedContract, beginCell, toNano } from "ton-core";
import { ContractSystem, TrackedTransaction, Tracker, Treasure } from "@tact-lang/emulator";
import { NftSale } from "./output/sale_NftSale";
import { TokenMaster } from "./output/jetton_TokenMaster";
import { NftCollection } from "./output/nft_NftCollection";
import { TokenWallet } from "./output/jetton_TokenWallet";
import { NftItem } from "./output/nft_NftItem";
import { inspect } from "util";

describe("sale", () => {

  let system: ContractSystem;

  let seller: Treasure;
  let royalty: Treasure;
  let buyer: Treasure;
  let service_address = Address.parse("EQCXClzJ0HFilRoB0iYBWF-VGqcuSFtUVkQZ-sNjAZoN8Hfc");

  let sale: OpenedContract<NftSale>;

  let collection: OpenedContract<NftCollection>;

  let nft_item: OpenedContract<NftItem>;
  let another_nft_item: OpenedContract<NftItem>;

  let jetton: OpenedContract<TokenMaster>;

  let seller_wallet: OpenedContract<TokenWallet>;
  let buyer_wallet: OpenedContract<TokenWallet>;
  let sale_wallet: OpenedContract<TokenWallet>;
  let service_wallet: OpenedContract<TokenWallet>;
  let royalty_wallet: OpenedContract<TokenWallet>;

  let wrong_jetton: OpenedContract<TokenMaster>;

  let buyer_wrong_wallet: OpenedContract<TokenWallet>;
  let sale_wrong_wallet: OpenedContract<TokenWallet>;

  let sale_tracker: Tracker;
  let sale_events: TrackedTransaction[];

  beforeEach(async () => {
    system = await ContractSystem.create();
    seller = system.treasure("seller");
    royalty = system.treasure("royalty");
    buyer = system.treasure("buyer");
    collection = system.open(await NftCollection.fromInit(royalty.address, beginCell().endCell(), royalty.address, 4n, 100n));
    jetton = system.open(await TokenMaster.fromInit(royalty.address, beginCell().endCell()));
    wrong_jetton = system.open(await TokenMaster.fromInit(royalty.address, beginCell().storeStringTail("wrong").endCell()))
    seller_wallet = system.open(await TokenWallet.fromInit(seller.address, jetton.address));
    buyer_wallet = system.open(await TokenWallet.fromInit(buyer.address, jetton.address));
    buyer_wrong_wallet = system.open(await TokenWallet.fromInit(buyer.address, wrong_jetton.address));
    nft_item = system.open(await NftItem.fromInit(collection.address, 0n));
    another_nft_item = system.open(await NftItem.fromInit(collection.address, 1n));
    sale = system.open(await NftSale.fromInit(seller.address, nft_item.address, toNano(100), jetton.address, 4n, 100n, royalty.address));
    sale_wallet = system.open(await TokenWallet.fromInit(sale.address, jetton.address));
    sale_wrong_wallet = system.open(await TokenWallet.fromInit(sale.address, wrong_jetton.address));
    service_wallet = system.open(await TokenWallet.fromInit(service_address, jetton.address));
    royalty_wallet = system.open(await TokenWallet.fromInit(royalty.address, jetton.address));
    
    sale_tracker = system.track(sale.address);

    system.name(collection.address, "collection");
    system.name(jetton.address, "jetton");
    system.name(wrong_jetton.address, "wrong_jetton");
    system.name(seller_wallet.address, "seller_wallet");
    system.name(buyer_wallet.address, "buyer_wallet");
    system.name(buyer_wrong_wallet.address, "seller_wrong_wallet");
    system.name(nft_item.address, "nft_item");
    system.name(another_nft_item.address, "another_nft_item");
    system.name(sale.address, "sale");
    system.name(sale_wallet.address, "sale_wallet");
    system.name(sale_wrong_wallet.address, "sale_wrong_wallet");
    system.name(service_address, "service_address");
    system.name(service_wallet.address, "service_wallet");
    system.name(royalty_wallet.address, "royalty_wallet");


    await collection.send(royalty, {value: toNano("0.1")}, {$$type: "RequestNftDeploy", index: 0n, amount: toNano("0.05"), content: beginCell().endCell(), owner: seller.address});
    await collection.send(royalty, {value: toNano("0.1")}, {$$type: "RequestNftDeploy", index: 1n, amount: toNano("0.05"), content: beginCell().endCell(), owner: seller.address});

    await jetton.send(royalty, {value: toNano("0.2")}, {$$type: "Transfer", query_id: 0n, amount: toNano(1000), destination: buyer.address, response_destination: royalty.address, custom_payload: beginCell().endCell(), forward_ton_amount: 0n, forward_payload: beginCell().endCell()});
    await wrong_jetton.send(royalty, {value: toNano("0.2")}, {$$type: "Transfer", query_id: 0n, amount: toNano(1000), destination: buyer.address, response_destination: royalty.address, custom_payload: beginCell().endCell(), forward_ton_amount: 0n, forward_payload: beginCell().endCell()});
    await system.run();

    await sale.send(seller, {value: toNano("0.2")}, {$$type: 'Deploy', queryId: 1234n});
    await system.run();

    sale_events = sale_tracker.collect();
  });
  it("should deploy",async () => {
    console.log(inspect(sale_events, true, null, true));
    let result = await sale.getGetSaleInfo();
    console.log(inspect(result, true, null, true));
    expect(result).toMatchSnapshot();
    expect(result.jetton_wallet?.equals(sale_wallet.address)).toBeTruthy();
    expect(result.price_info.full_price).toEqual(toNano(100) + toNano("1.1") + toNano(4));
  });
  it("should receive nft",async () => {
    await nft_item.send(seller, {value: toNano("0.1")}, {$$type: 'NftTransfer', query_id: 1234n, new_owner: sale.address, response_destination: seller.address, custom_payload: beginCell().endCell(), forward_amount: toNano("0.06"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    console.log(inspect(sale_events, true, null, true));
    expect((await sale.getGetSaleInfo()).nft_received).toBeTruthy();
    expect(sale_events).toMatchSnapshot();
  });
  it("should send wrong nft back",async () => {
    await another_nft_item.send(seller, {value: toNano("0.1")}, {$$type: 'NftTransfer', query_id: 1234n, new_owner: sale.address, response_destination: seller.address, custom_payload: beginCell().endCell(), forward_amount: toNano("0.06"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    console.log(inspect(sale_events, true, null, true));
    expect((await sale.getGetSaleInfo()).nft_received).toBeFalsy();
    expect(sale_events).toMatchSnapshot();
    expect((await another_nft_item.getGetNftData()).owner.equals(seller.address)).toBeTruthy();
  });
  it("should be able to cancel",async () => {
    await nft_item.send(seller, {value: toNano("0.1")}, {$$type: 'NftTransfer', query_id: 1234n, new_owner: sale.address, response_destination: seller.address, custom_payload: beginCell().endCell(), forward_amount: toNano("0.06"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    await sale.send(seller, {value: toNano("0.03")}, "Cancel");
    await system.run();
    sale_events = sale_tracker.collect();
    console.log(inspect(sale_events, true, null, true));
    expect((await nft_item.getGetNftData()).owner.equals(seller.address)).toBeTruthy();
    expect((await sale.getGetSaleInfo()).nft_received).toBeFalsy();
  });
  it("should process sale with exact amount of tokens",async () => {
    await nft_item.send(seller, {value: toNano("0.1")}, {$$type: 'NftTransfer', query_id: 1234n, new_owner: sale.address, response_destination: seller.address, custom_payload: beginCell().endCell(), forward_amount: toNano("0.06"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    await buyer_wallet.send(buyer, {value: toNano("0.5")}, {$$type: 'Transfer', query_id: 1234n, destination: sale.address, amount: (await sale.getGetPriceInfo()).full_price, response_destination: buyer.address, custom_payload: beginCell().endCell(), forward_ton_amount: toNano("0.4"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    console.log(inspect(sale_events, true, null, true));
    expect(sale_events).toMatchSnapshot();
    expect((await nft_item.getGetNftData()).owner.equals(buyer.address)).toBeTruthy();
    expect((await royalty_wallet.getGetWalletData()).balance).toEqual(toNano(4));
    expect((await service_wallet.getGetWalletData()).balance).toEqual(toNano("1.1"));
    expect((await seller_wallet.getGetWalletData()).balance).toEqual(toNano(100));
    expect((await sale.getGetSaleInfo()).nft_received).toBeFalsy();
    expect((await sale.getGetSaleInfo()).sale_ended).toBeTruthy();
  });
  it("should process sale with a big amount of tokens",async () => {
    await nft_item.send(seller, {value: toNano("0.1")}, {$$type: 'NftTransfer', query_id: 1234n, new_owner: sale.address, response_destination: seller.address, custom_payload: beginCell().endCell(), forward_amount: toNano("0.06"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    await buyer_wallet.send(buyer, {value: toNano("0.5")}, {$$type: 'Transfer', query_id: 1234n, destination: sale.address, amount: toNano(200), response_destination: buyer.address, custom_payload: beginCell().endCell(), forward_ton_amount: toNano("0.4"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    console.log(inspect(sale_events, true, null, true));
    expect(sale_events).toMatchSnapshot();
    expect((await nft_item.getGetNftData()).owner.equals(buyer.address)).toBeTruthy();
    expect((await royalty_wallet.getGetWalletData()).balance).toEqual(toNano(4));
    expect((await service_wallet.getGetWalletData()).balance).toEqual(toNano("1.1"));
    expect((await seller_wallet.getGetWalletData()).balance).toEqual(toNano(100));
    expect((await sale_wallet.getGetWalletData()).balance).toEqual(toNano(0));
    expect((await buyer_wallet.getGetWalletData()).balance).toEqual(toNano(1000)-(await sale.getGetPriceInfo()).full_price);
    expect((await sale.getGetSaleInfo()).nft_received).toBeFalsy();
    expect((await sale.getGetSaleInfo()).sale_ended).toBeTruthy();
  });
  it("should return tokens if small value received",async () => {
    await nft_item.send(seller, {value: toNano("0.1")}, {$$type: 'NftTransfer', query_id: 1234n, new_owner: sale.address, response_destination: seller.address, custom_payload: beginCell().endCell(), forward_amount: toNano("0.06"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    await buyer_wallet.send(buyer, {value: toNano("0.5")}, {$$type: 'Transfer', query_id: 1234n, destination: sale.address, amount: toNano(100), response_destination: buyer.address, custom_payload: beginCell().endCell(), forward_ton_amount: toNano("0.4"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    console.log(inspect(sale_events, true, null, true));
    expect((await buyer_wallet.getGetWalletData()).balance).toEqual(toNano(1000));
  });
  it("should return tokens if small amount of toncoins received",async () => {
    await nft_item.send(seller, {value: toNano("0.1")}, {$$type: 'NftTransfer', query_id: 1234n, new_owner: sale.address, response_destination: seller.address, custom_payload: beginCell().endCell(), forward_amount: toNano("0.06"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    await buyer_wallet.send(buyer, {value: toNano("0.5")}, {$$type: 'Transfer', query_id: 1234n, destination: sale.address, amount: toNano(110), response_destination: buyer.address, custom_payload: beginCell().endCell(), forward_ton_amount: toNano("0.2"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    console.log(inspect(sale_events, true, null, true));
    expect((await buyer_wallet.getGetWalletData()).balance).toEqual(toNano(1000));
  });
  it("should return tokens if buyer sent wrong tokens",async () => {
    await nft_item.send(seller, {value: toNano("0.1")}, {$$type: 'NftTransfer', query_id: 1234n, new_owner: sale.address, response_destination: seller.address, custom_payload: beginCell().endCell(), forward_amount: toNano("0.06"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    await buyer_wrong_wallet.send(buyer, {value: toNano("0.5")}, {$$type: 'Transfer', query_id: 1234n, destination: sale.address, amount: toNano(110), response_destination: buyer.address, custom_payload: beginCell().endCell(), forward_ton_amount: toNano("0.4"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    console.log(inspect(sale_events, true, null, true));
    expect((await buyer_wrong_wallet.getGetWalletData()).balance).toEqual(toNano(1000));
  });
  it("should return tokens if seller hasn't sent nft",async () => {
    await buyer_wallet.send(buyer, {value: toNano("0.5")}, {$$type: 'Transfer', query_id: 1234n, destination: sale.address, amount: toNano(110), response_destination: buyer.address, custom_payload: beginCell().endCell(), forward_ton_amount: toNano("0.4"), forward_payload: beginCell().endCell()});
    await system.run();
    sale_events = sale_tracker.collect();
    console.log(inspect(sale_events, true, null, true));
    expect((await buyer_wallet.getGetWalletData()).balance).toEqual(toNano(1000));
  });
});
