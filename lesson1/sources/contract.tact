import "@stdlib/ownable";
import "@stdlib/deploy";

message ProxyMessage {
    str: String;
    to: Address;
}

message ChangeExampleOwner {
    address: Address;
}

struct LastMessage {
    last_message: String?;
    last_sender: Address?;
    last_receiver: Address?;
}

trait Stats {

    count: Int;
    last_message: String?;
    last_sender: Address?;
    last_receiver: Address?;

    get fun get_count(): Int {
        return self.count;
    }

    get fun get_last(): LastMessage {
        return LastMessage {
            last_message: self.last_message,
            last_sender: self.last_sender,
            last_receiver: self.last_receiver
        };
    }
}

contract Proxy with Ownable, Stats, Deployable {
    owner: Address;
    count: Int = 0;
    last_message: String? = null;
    last_sender: Address? = null;
    last_receiver: Address? = null;

    init(owner: Address) {
        self.owner = owner;
    }

    receive("Repeat") {
        self.requireOwner();
        send(SendParameters{
            to: self.last_receiver!!,
            value: 0,
            mode: SendRemainingValue,
            body: (self.last_message!!).asComment()
        });
        self.count = self.count + 1;
    }

    receive("Return") {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        send(SendParameters{
            to: self.last_sender!!,
            value: 0,
            mode: SendRemainingValue,
            body: (self.last_message!!).asComment()
        });
        self.count = self.count + 1;
    }

    receive(str: String) {
        send(SendParameters{
            to: self.owner,
            value: 0,
            mode: SendRemainingValue,
            body: str.asComment()
        });
        let ctx: Context = context();
        self.storeStats(ctx.sender, self.owner, str);
    }

    receive(msg: ProxyMessage) {
        send(SendParameters{
            to: msg.to,
            value: 0,
            mode: SendRemainingValue,
            body: msg.str.asComment()
        });
        let ctx: Context = context();
        self.storeStats(ctx.sender, msg.to, msg.str);
    }

    receive(msg: ChangeExampleOwner) {
        self.requireOwner();
        self.owner = msg.address;
    }

    fun storeStats(sender: Address, receiver: Address, message: String) {
        self.count = self.count + 1;
        self.last_sender = sender;
        self.last_receiver = receiver;
        self.last_message = message;
    } 
}