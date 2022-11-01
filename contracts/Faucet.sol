// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet {
    IERC20 TOKEN;
    mapping(address => bool) public users;

    constructor(address _tokenAddress){
        TOKEN = IERC20(_tokenAddress);
    }

    function requestToken() external {
        require(!users[msg.sender],"You recieved your faucet");
        TOKEN.transfer(msg.sender,10**20);
        users[msg.sender] = true;
    }
}