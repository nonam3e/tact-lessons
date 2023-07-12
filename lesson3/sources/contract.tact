import "@stdlib/deploy";

message ExtMessage {
    signature: Slice as bytes64;
    seqno: Int as uint32;
    valid_until: Int as uint32;
    message_parameters: SendParameters;
}

contract TactWallet with Deployable {
    seqno: Int as uint32 = 0;
    publicKey: Int as uint256;
    init(publicKey: Int) {
        self.publicKey = publicKey;
    }

    receive() {}
    receive(str: String) {}
    receive(slice: Slice) {}

    external(msg: ExtMessage) {
        let hash: Int = beginCell().storeUint(msg.seqno, 32).storeUint(msg.valid_until, 32).storeRef(msg.message_parameters.toCell()).endCell().hash();
        require(checkSignature(hash, msg.signature, self.publicKey), "Invalid Signature");
        require(msg.seqno == self.seqno, "Invalid Seqno");
        require(now() <= msg.valid_until, "Invalid Time");
        acceptMessage();
        self.seqno = self.seqno + 1;
        send(msg.message_parameters);
    }

    get fun seqno(): Int {
        return self.seqno;
    }

    get fun get_public_key(): Int {
        return self.publicKey;
    }
}