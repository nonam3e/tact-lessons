import "@stdlib/ownable";
import "@stdlib/deploy";
import "./util.fc";
import "./message";

const sale_init_value: Int = ton("0.1");
const sale_processing_value: Int = ton("0.4");
const jetton_transer_value: Int = ton("0.06");
const nft_transfer_value: Int = ton("0.04");

const service_numerator: Int = 11;
const service_denominator: Int = 1000;

const hundred_percent: Int = 100000000000;

@name(service_address)
native serviceAddress(): Address;

@name(muldiv)
native mulDiv(a: Int, b: Int, c: Int): Int;

struct PriceInfo {
    price: Int;
    full_price: Int;
    royalty_fee: Int;
    royalty_destination: Address?;
    service_fee: Int;
    service_address: Address;
}

struct SaleInfo {
    sale_ended: Bool;
    owner: Address;
    nft: Address;
    nft_received: Bool;
    jetton_master: Address;
    jetton_wallet: Address?;
    price_info: PriceInfo;
}

contract NftSale with Ownable {
    owner: Address;
    nft: Address;
    nft_received: Bool = false;
    jetton_master: Address;
    jetton_wallet: Address? = null;
    numerator: Int as uint16;
    denominator: Int as uint16;
    royalty_destination: Address?;
    sale_ended: Bool = false;
    price: Int as coins;

    init(owner: Address, nft: Address, price: Int, jetton_master: Address, numerator: Int, denominator: Int, royalty_destination: Address?) {
        self.owner = owner;
        self.nft = nft;
        self.price = price;
        self.jetton_master = jetton_master;
        self.royalty_destination = royalty_destination;
        self.numerator = numerator;
        self.denominator = denominator;
        if (self.royalty_destination == null || denominator == 0) {
            self.numerator = 0;
            self.denominator = 1;
            self.royalty_destination = null;
        }
        send(SendParameters{
            to: self.jetton_master,
            value: 0,
            mode: SendRemainingValue,
            body: ProvideWalletAddress{query_id: now(), owner_address: myAddress(), include_address: true}.toCell()
        });
    }
    receive(msg: TakeWalletAddress) {
        let ctx: Context = context();
        require(ctx.sender == self.jetton_master, "Invalid sender");
        self.jetton_wallet = msg.wallet_address;
    }
    receive(msg: NftOwnershipAssigned) {
        let ctx: Context = context();
        if(ctx.sender != self.nft) {
            send(SendParameters{
                to: ctx.sender,
                value: 0,
                mode: SendRemainingValue,
                body: NftTransfer{query_id: msg.query_id, new_owner: msg.prev_owner, response_destination: msg.prev_owner, custom_payload: "Invalid Nft".asComment(), forward_amount: 0, forward_payload: emptySlice()}.toCell()
            });
        }
        else {
            self.nft_received = true;
            send(SendParameters{
                to: msg.prev_owner,
                value: 0,
                mode: SendRemainingValue,
                body: "Nft Received".asComment()
            });
        }
    }

    receive(msg: TransferNotification) {
        let ctx: Context = context();
        let sale_fee: Int = mulDiv(self.price, mulDiv(service_numerator, hundred_percent, service_denominator), hundred_percent);
        let royalty_fee: Int = mulDiv(self.price, mulDiv(self.numerator, hundred_percent, self.denominator), hundred_percent);
        let full_price: Int = self.price + sale_fee + royalty_fee;
        if(ctx.sender != self.jetton_wallet || self.nft_received == false || self.sale_ended || ctx.value < sale_processing_value || msg.amount < full_price) {
            self.send_jetton(ctx.sender, 0, SendRemainingValue, msg.query_id, msg.amount, msg.sender, msg.sender, "Error occured".asComment());
            return;
        }
        if(msg.amount > full_price) {
            self.send_jetton(ctx.sender, jetton_transer_value, 0, msg.query_id, msg.amount - full_price, msg.sender, msg.sender, "Error occured".asComment());
            ctx.value = ctx.value - jetton_transer_value;
        }
        self.send_jetton(ctx.sender, jetton_transer_value, 0, msg.query_id, sale_fee, serviceAddress(), msg.sender, emptyCell());
        ctx.value = ctx.value - jetton_transer_value;
        if(self.royalty_destination != null) {
            self.send_jetton(ctx.sender, jetton_transer_value, 0, msg.query_id, royalty_fee, self.royalty_destination!!, msg.sender, "Error occured".asComment());
            ctx.value = ctx.value - jetton_transer_value;
        }
        send(SendParameters{
            to: self.nft,
            value: ctx.value,
            body: NftTransfer{query_id: msg.query_id, new_owner: msg.sender, response_destination: msg.sender, custom_payload: "Nft received".asComment(), forward_amount: 0, forward_payload: emptySlice()}.toCell()
        });
        self.nft_received = false;
        self.sale_ended = true;
        self.send_jetton(ctx.sender, 0, SendRemainingBalance, msg.query_id, self.price, self.owner, msg.sender, emptyCell());
    }

    receive("Cancel") {
        self.requireOwner();
        send(SendParameters{
            to: self.nft,
            value: 0,
            mode: SendRemainingBalance,
            body: NftTransfer{query_id: now(), new_owner: self.owner, response_destination: self.owner, custom_payload: "Nft received".asComment(), forward_amount: 0, forward_payload: emptySlice()}.toCell()
        });
        self.nft_received = false;
        self.sale_ended = true;
    }

    receive(msg: Deploy) {
        self.requireOwner();
        self.sale_ended = false;
    }

    fun send_jetton(to: Address, value: Int, mode: Int, query_id: Int, amount: Int, destination: Address, response_destination: Address, custom_payload: Cell) {
        if (amount > 0) {
            send(SendParameters{
                to: to,
                value: value,
                mode: mode,
                body: Transfer{query_id: query_id, amount: amount, destination: destination, response_destination: response_destination, custom_payload: custom_payload, forward_ton_amount: 0, forward_payload: emptySlice()}.toCell()
            });
        }
    }

    get fun get_price_info(): PriceInfo {
        let service_fee: Int = mulDiv(self.price, mulDiv(service_numerator, hundred_percent, service_denominator), hundred_percent);
        let royalty_fee: Int = mulDiv(self.price, mulDiv(self.numerator, hundred_percent, self.denominator), hundred_percent);
        let full_price: Int = self.price + service_fee + royalty_fee;
        return PriceInfo{price: self.price, full_price: full_price, royalty_fee: royalty_fee, royalty_destination: self.royalty_destination, service_fee: service_fee, service_address: serviceAddress()};
    }
    get fun get_sale_info(): SaleInfo {
        let service_fee: Int = mulDiv(self.price, mulDiv(service_numerator, hundred_percent, service_denominator), hundred_percent);
        let royalty_fee: Int = mulDiv(self.price, mulDiv(self.numerator, hundred_percent, self.denominator), hundred_percent);
        let full_price: Int = self.price + service_fee + royalty_fee;
        return SaleInfo { sale_ended: self.sale_ended, owner: self.owner, nft: self.nft, nft_received: self.nft_received, jetton_master: self.jetton_master, jetton_wallet: self.jetton_wallet, price_info:
                            PriceInfo{price: self.price, full_price: full_price, royalty_fee: royalty_fee, royalty_destination: self.royalty_destination, service_fee: service_fee, service_address: serviceAddress()}};
    }
}