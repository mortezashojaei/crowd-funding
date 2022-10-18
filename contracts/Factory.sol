// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Fund.sol";

contract Factory {
    address[] public projects;

    function createProject(address _tokenAddress,string memory _name,uint256 _goal,uint256 _share) external{
        Fund fund = new Fund(msg.sender,_tokenAddress,_name, _goal, _share);
        projects.push(address(fund));
    }

    function getProjects() external view returns(address[] memory){
        return projects;
    }
}