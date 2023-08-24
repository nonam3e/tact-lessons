import "@stdlib/deploy";
import "./messages";

const min_balance: Int = ton("0.05");
const gas_consumption: Int = ton("0.02");

struct NftData {
    deployed: Bool;
    index: Int;
    collection: Address;
    owner: Address;
    content: Cell;
}

struct NftRoyaltyParams {
    numerator: Int;
    denominator: Int;
    royalty_destination: Address;
}

trait NftRoyalty {
    royalty_destination: Address;
    numerator: Int;
    denominator: Int;

    receive(msg: NftGetRoyaltyParams) {
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue,
            body: NftReportRoyaltyParams{
                query_id: msg.query_id, 
                numerator: self.numerator, 
                denominator: self.denominator,  
                destination: self.royalty_destination
                }.toCell()
        });
    }

    get fun royalty_params(): NftRoyaltyParams {
        return NftRoyaltyParams{numerator: self.numerator, denominator: self.denominator, royalty_destination: self.royalty_destination};
    }
}

trait NftStandart {
    deployed: Bool;
    collection: Address;
    owner: Address;
    index: Int;
    content: Cell;

    receive(msg: NftTransfer) {
        let ctx: Context = context();
        require(self.deployed, "Not Deployed");
        require(ctx.sender == self.owner, "Invalid Owner");
        let min: Int = min_balance - min(min_balance, myBalance());
        let required: Int = gas_consumption + msg.forward_amount + min;
        if (msg.forward_amount != 0) {
            required = required + ctx.readForwardFee();
        }
        require(ctx.value >= required, "Invalid Amount");
        let cashback: Int = ctx.value - gas_consumption - msg.forward_amount - min;
        if (msg.forward_amount != 0) {
            cashback = cashback - ctx.readForwardFee();
            send(SendParameters{
                to: msg.new_owner,
                value: msg.forward_amount,
                mode: SendPayGasSeparately,
                body: NftOwnershipAssigned{
                    query_id: msg.query_id,
                    prev_owner: self.owner,
                    forward_payload: msg.forward_payload
                }.toCell()
            });
        }
        self.owner = msg.new_owner;
        if (cashback > 0) {
            send(SendParameters{
                to: msg.response_destination,
                value: cashback,
                body: NftExcesses{
                    query_id: msg.query_id
                }.toCell()
            });
        }
    }
    receive(msg: NftGetStaticData) {
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue,
            body: NftReportStaticData{
                query_id: msg.query_id,
                index: self.index,
                collection: self.collection
            }.toCell()
        });
    }

    get fun get_nft_data(): NftData {
        return NftData{deployed: self.deployed, index: self.index, collection: self.collection, owner: self.owner, content: self.content};
    }
}

contract NftItem with NftStandart, NftRoyalty {
    deployed: Bool = false;
    collection: Address;
    owner: Address;
    index: Int as uint256;
    content: Cell;
    royalty_destination: Address;
    numerator: Int as uint16 = 0;
    denominator: Int as uint16 = 1;

    init(collection: Address, index: Int) {
        self.collection = collection;
        self.index = index;

        self.owner = self.collection;
        self.content = emptyCell();
        self.royalty_destination = self.collection;
    }

    receive(msg: NftDeploy) {
        require(sender() == self.collection, "Invalid Sender");
        require(self.index == msg.index, "Invalid Index");
        require(!self.deployed, "Already Deployed");
        self.owner = msg.owner;
        self.content = msg.content;
        self.deployed = true;
        self.royalty_destination = msg.royalty_destination;
        self.numerator = msg.numerator;
        self.denominator = msg.denominator;
    }

    receive(msg: NftDestroy) {
        require(sender() == self.owner, "Invalid Owner");
        self.owner = myAddress();
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingBalance,
            body: NftExcesses{
                query_id: msg.query_id
            }.toCell()
        });
    }
}