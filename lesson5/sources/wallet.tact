import "./messages";

const gasConsumption: Int = ton("0.02");
const minTons: Int = ton("0.01");

struct WalletData {
    balance: Int;
    owner: Address;
    master: Address;
    code: Cell;
}

contract TokenWallet {
    balance: Int as coins = 0;
    owner: Address;
    master: Address;

    init(owner: Address, master: Address) {
        self.owner = owner;
        self.master = master;
    }

    receive(msg: Transfer) {
        let ctx: Context = context();
        require(self.owner == ctx.sender, "Invalid sender");
        self.balance = self.balance - msg.amount;
        require(self.balance >= 0, "Invalid token amount");
        require(ctx.readForwardFee() * 2 + 2 * gasConsumption + minTons + msg.forward_ton_amount < ctx.value, "Invalid ton amount");
        let init: StateInit = initOf TokenWallet(msg.destination, self.master);
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

    receive(msg: InternalTransfer) {
        let ctx: Context = context();
        if(ctx.sender != self.master) {
            let init: StateInit = initOf TokenWallet(msg.from, self.master);
            require(contractAddress(init) == ctx.sender, "Invalid sender");
        }
        self.balance = self.balance + msg.amount;
        require(self.balance >= 0, "Invalid token amount");
        let msgValue: Int = ctx.value;
        msgValue = msgValue - gasConsumption - (minTons - min(minTons, myBalance() - ctx.value));
        if(msg.forward_ton_amount > 0) {
            msgValue = msgValue - msg.forward_ton_amount - ctx.readForwardFee();
            send(SendParameters {
                to: self.owner,
                value: msg.forward_ton_amount,
                mode: SendPayGasSeparately,
                bounce: false,
                body: TransferNotification {
                    query_id: msg.query_id,
                    amount: msg.amount,
                    sender: msg.from,
                    forward_payload: msg.forward_payload
                }.toCell()
            });
        }
        if(msgValue > 0) {
            send(SendParameters{
                to: msg.response_destination,
                value: msgValue,
                body: Excesses{query_id: msg.query_id}.toCell()
            });
        }
    }

    receive(msg: Burn) {
        let ctx: Context = context();
        require(self.owner == ctx.sender, "Invalid sender");
        require(ctx.value > gasConsumption + gasConsumption + ctx.readForwardFee(), "Invalid ton amount");
        self.balance = self.balance - msg.amount;
        require(self.balance >= 0, "Invalid token amount");
        send(SendParameters{
            to: self.master,
            value: 0,
            mode: SendRemainingValue,
            body: BurnNotification {
                query_id: msg.query_id,
                amount: msg.amount,
                sender: self.owner,
                response_destination: msg.response_destination
            }.toCell()
        });
    }

    bounced(src: bounced<InternalTransfer>) {
        self.balance = self.balance + src.amount;
    }

    bounced(src: bounced<BurnNotification>) {
        self.balance = self.balance + src.amount;
    }

    get fun get_wallet_data(): WalletData {
        return WalletData{balance: self.balance, owner: self.owner, master: self.master, code: (initOf TokenWallet(self.owner, self.master)).code};
    }
}