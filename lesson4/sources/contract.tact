import "@stdlib/ownable";
import "@stdlib/deploy";

message AddMessage {
    address: Address;
}

message RemoveMessage {
    address: Address;
}

message BroadcastMessage {
    message: String;
}

contract BroadcastContract with Ownable, Deployable {
    owner: Address;
    address_list: map<Int, Address>;
    list_length: Int = 0;
    init(owner: Address) {
        self.owner = owner;
    }

    receive(msg: AddMessage) {
        self.requireOwner();
        let hash: Int = msg.address.asSlice().hash();
        require(self.address_list.get(hash) == null, "Address already exists");
        self.address_list.set(hash, msg.address);
        self.list_length = self.list_length + 1;
    }
    receive(msg: RemoveMessage) {
        self.requireOwner();
        let hash: Int = msg.address.asSlice().hash();
        require(self.address_list.get(hash) != null, "Address does not exist");
        self.address_list.set(hash, null);
        self.list_length = self.list_length - 1;
    }

    receive(msg: BroadcastMessage) {
        self.requireOwner();
        let ctx: Context = context();
        require(ctx.value >= ton("0.01") * self.list_length + ton("0.03"), "Invalid amount");
        let send_value: Int = (ctx.value - ton("0.03")) / self.list_length;
        let mes_body: Cell = msg.message.asComment();
        let pair: DictPair? = DictGetMin(self.address_list);
        while(pair != null) {
            send(SendParameters {
                to: (pair!!).value,
                value: send_value,
                mode: SendIgnoreErrors,
                bounce: false,
                body: mes_body
            });
            pair = DictGetNext(self.address_list, (pair!!).key);
        }
    }

    get fun address_list(): map<Int, Address> {
        return self.address_list;
    }
}

struct NativePair {
    key: Int?;
    value: Address?;
    flag: Bool;
}

struct DictPair {
    key: Int;
    value: Address;
}

@name(idict_get_min?)
native native_dict_get_min(dict: map<Int, Address>, length: Int): NativePair;

fun DictGetMin(dict: map<Int, Address>): DictPair? {
    let pair: NativePair = native_dict_get_min(dict, 257);
    if (pair.flag) {
        return DictPair{key: pair.key!!, value: pair.value!!};
    }
    else {
        return null;
    }
}

@name(idict_get_next?)
native native_dict_get_next(dict: map<Int, Address>, length: Int, pivot: Int): NativePair;

fun DictGetNext(dict: map<Int, Address>, pivot: Int): DictPair? {
    let pair: NativePair = native_dict_get_next(dict, 257, pivot);
    if (pair.flag) {
        return DictPair{key: pair.key!!, value: pair.value!!};
    }
    else {
        return null;
    }
}