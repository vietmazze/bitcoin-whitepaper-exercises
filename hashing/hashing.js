"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

// TODO: insert each line into blockchain
for (let line of poem) {
	createBlock(line);
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

//verifyChain()
//check all blocks in the chain to ensure is valid
//returns T/F
function verifyChain(Blockchain) {
	var verify = true;
	for (let block of Blockchain.blocks) {
		verify = verifyBlock(block);
		if (!verify) {
			return false;
			break;
		}
	}
	return verify;
}

function verifyBlock(block) {
	if (block.hash != "000000") {
		if (block.prevHash == "") {
			console.log("failed1");
			return false;
		}
		if (block.index < 0) {
			console.log("failed2");
			return false;
		}
		if (block.hash != blockHash(block)) {
			console.log("failed3");
			return false;
		}
		if (block.prevHash != Blockchain.blocks[block.index - 1].hash) {
			console.log("failed4");
			return false;
		}
	}
	return true;
}

//createBlock()
//`index
//`prevHash
//`data
//`timestamp
//`hash
function createBlock(_data) {
	let block = {
		index: Blockchain.blocks.length,
		prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
		data: _data,
		timestamp: Date.now(),
	};
	block.hash = blockHash(block);
	Blockchain.blocks.push(block);
	console.log(block);
	return block;
}

// **********************************

function blockHash(bl) {
	return crypto
		.createHash("sha256")
		.update(
			// TODO: use block data to calculate hash
			`${bl.index};${bl.prevHash};${bl.data};${bl.timestamp};`
		)
		.digest("hex");
}
