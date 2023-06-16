// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OurToken is ERC20 {
    //initial supply is in wei, 50 <- 50 wei
    //initial supply 50e18, for 50 with default 18 decimals
    // 50 * 10 ** 18
    constructor(uint256 initialSupply) ERC20("Our Token", "OT") {
        _mint(msg.sender, initialSupply);
    }
}
