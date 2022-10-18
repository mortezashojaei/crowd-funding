// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Fund {
    address public OWNER;
    IERC20 FUNDING_TOKEN;
    uint256 public GOAL;
    uint256 public FUND_SHARE;
    string public NAME;
    bool public IS_COMPLETED;
    bool public IS_CLAIMED;
    address[] public INVESTORS_LIST;
    mapping(address=>uint) private FUNDINGS_LIST;
    event NewFundRecived(address investor,uint256 value);

    constructor(address _owner,address _tokenAddress,string memory _name,uint256 _goal,uint256 _share){
        OWNER = _owner;
        FUNDING_TOKEN = IERC20(_tokenAddress);
        GOAL = _goal;
        NAME = _name;
        FUND_SHARE =_share; 
    }

    function getTotalFundingAmount() external view returns (uint){
        return FUNDING_TOKEN.balanceOf(address(this));
    }

    function getInvestorsList() external view returns (address[] memory){
        return INVESTORS_LIST;
    }

    function fund() external {
        require(!IS_COMPLETED,"The fund is closed.");
        FUNDING_TOKEN.transferFrom(msg.sender, address(this), FUND_SHARE);
        INVESTORS_LIST.push(msg.sender);
        FUNDINGS_LIST[msg.sender] = FUND_SHARE;
        emit NewFundRecived(msg.sender, FUND_SHARE);
        if(FUNDING_TOKEN.balanceOf(address(this))>=GOAL){
            IS_COMPLETED = true;
        }
    }

    function claimFunds() external{
        require(msg.sender==OWNER,"Only fund owner can claim the fund.");
        require(IS_COMPLETED,"The fund is not completed yet.");
        FUNDING_TOKEN.transfer(OWNER, FUNDING_TOKEN.balanceOf(address(this)));
        IS_CLAIMED = true;
    }

}