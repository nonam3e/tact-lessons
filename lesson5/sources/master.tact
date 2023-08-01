import "./wallet";
import "@stdlib/ownable";
import "@stdlib/deploy";

struct MasterData {
    total_supply: Int;
    mintable: Bool;
    owner: Address;
    jetton_content: Cell;
    jetton_wallet_code: Cell;
}

contract TokenMaster with OwnableTransferable, Deployable {
    total_supply: Int as coins = 0;
    mintable: Bool = true;
    owner: Address;
    jetton_content: Cell;

    init(owner: Address, jetton_content: Cell) {
        self.owner = owner;
        self.jetton_content = jetton_content;
    }

    receive(msg: ChangeContent) {
        self.requireOwner();
        self.jetton_content = msg.jetton_content;
    }

    receive(msg: Transfer) {
        let ctx: Context = context();
        self.requireOwner();
        require(self.mintable, "Mint stopped");
        require(ctx.readForwardFee() * 2 + 2 * gasConsumption + minTons + msg.forward_ton_amount < ctx.value, "Invalid ton amount");
        self.total_supply = self.total_supply + msg.amount;
        let init: StateInit = initOf TokenWallet(msg.destination, myAddress());
        let to: Address = contractAddress(init);

        send(SendParameters {
            to: to,
            value: 0,
            mode: SendRemainingValue,
            bounce: false,
            body: InternalTransfer{
                query_id: msg.query_id,
                amount: msg.amount,
                from: self.owner,
                response_destination: msg.response_destination,
                forward_ton_amount: msg.forward_ton_amount,
                forward_payload: msg.forward_payload}.toCell(),
            data: init.data,
            code: init.code
        });
    }

    receive(msg: ProvideWalletAddress) {
        let ctx: Context = context();
        let wallet: Address = contractAddress(initOf TokenWallet(msg.owner_address, myAddress()));
        let owner_address: Address? = null;
        if (msg.include_address) {
            owner_address = msg.owner_address;
        }
        send(SendParameters {
            to: ctx.sender,
            value: 0,
            mode: SendRemainingValue,
            body: TakeWalletAddress{
                queryId: msg.queryId,
                wallet_address: wallet,
                owner_address: owner_address
            }.toCell()
        });
    }

    receive("Stop Mint") {
        self.requireOwner();
        self.mintable = false;
    }

    receive(msg: BurnNotification) {
        let init: StateInit = initOf TokenWallet(msg.sender, myAddress());
        require(contractAddress(init) == sender(), "Invalid sender");

        self.total_supply = self.total_supply - msg.amount;
        send(SendParameters{
            to: msg.response_destination,
            value: 0,
            mode: SendRemainingValue,
            body: Excesses{query_id: msg.query_id}.toCell()
        });
    }

    get fun get_jetton_data(): MasterData {
        return MasterData{total_supply: self.total_supply, mintable: self.mintable, owner: self.owner, jetton_content: self.jetton_content, jetton_wallet_code: (initOf TokenWallet(self.owner, myAddress())).code};
    }

    get fun get_wallet_address(owner_address: Address): Address {
        let init: StateInit = initOf TokenWallet(owner_address, myAddress());
        return contractAddress(init);
    }
}