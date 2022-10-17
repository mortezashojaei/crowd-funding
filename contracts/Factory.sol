// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Fund.sol";

contract Factory {
    address[] public projects;

    function createProject(address _tokenAddress,uint256 _goal) external{
        Fund fund = new Fund(msg.sender,_tokenAddress,_goal);
        projects.push(address(fund));
    }

    function getProjects() external view returns(address[] memory){
        return projects;
    }
}