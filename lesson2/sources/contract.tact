import "@stdlib/ownable";

message AddUserMessage {
    name: String;
    address: Address;
}

message RemoveUserMessage {
    name: String;
}

message ProxyMessage {
    to: String;
    message: String;
}

struct User {
    name: String;
    address: Address;
    received_count: Int as uint32 = 0;
    sent_count: Int as uint32 = 0;
}

struct Name {
    name: String;
}

contract AddressBook with Ownable {
    owner: Address;
    user_list: map<Int as uint256, User>;
    reversed_list: map<Address, Name>;
    counter: Int as uint32 = 0;

    init(owner: Address) {
        self.owner = owner;
        self.user_list = emptyMap();
        self.reversed_list = emptyMap();
    }

    receive(msg: AddUserMessage) {
        self.requireOwner();
        let hash: Int = sha256(msg.name);
        self.user_list.set(hash, User {name: msg.name, address: msg.address});
        self.reversed_list.set(msg.address, Name {name: msg.name});
    }
    receive(msg: RemoveUserMessage) {
        self.requireOwner();
        let hash: Int = sha256(msg.name);
        let user: User = self.user_list.get(hash)!!;
        self.user_list.set(hash, null);
        self.reversed_list.set(user.address, null);
    }
    receive(msg: ProxyMessage) {
        let sender_name: String = (self.reversed_list.get(sender())!!).name;
        let sender_hash: Int = sha256(sender_name);
        let receiver_hash: Int = sha256(msg.to);
        let receiver: User = self.user_list.get(receiver_hash)!!;
        send(SendParameters {
            to: receiver.address,
            value: 0,
            mode: SendRemainingValue,
            body: msg.message.asComment()
        });
        self.counter = self.counter + 1;
        let sender: User = self.user_list.get(sender_hash)!!;
        self.user_list.set(receiver_hash, User {name: receiver.name, address: receiver.address, received_count: receiver.received_count + 1, sent_count: receiver.sent_count});
        self.user_list.set(sender_hash, User {name: sender.name, address: sender.address, received_count: sender.received_count, sent_count: sender.sent_count + 1});
    }

    receive(str: String) {
        // user sent n message(s) (.00%) and received n message(s) (.00%)
        let user: User = self.user_list.get(sha256(str))!!;
        let str_builder: StringBuilder = beginComment();
        str_builder.append(user.name);
        str_builder.append(" sent ");
        str_builder.append(user.sent_count.toString());
        str_builder.append(" message(s) (");
        str_builder.append((user.sent_count * 10000 / self.counter).toFloatString(2));
        str_builder.append("%) and received ");
        str_builder.append(user.received_count.toString());
        str_builder.append(" message(s) (");
        str_builder.append((user.received_count * 10000 / self.counter).toFloatString(2));
        str_builder.append("%)");
        self.reply(str_builder.toCell());
    }

    get fun get_stat(str: String): User? {
        return self.user_list.get(sha256(str));
    }
    get fun get_username(address: Address): String? {
        let result: Name? = self.reversed_list.get(address);
        if (result == null) {
            return null;
        }
        else {
            return (result!!).name;
        }
    }
}