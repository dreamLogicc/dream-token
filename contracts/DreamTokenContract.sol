// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Token.sol";
import "./Ownable.sol";

contract DreamToken is Token, Ownable{
    
    uint public factor;
    
    event Bought(address buyer, uint amount);
    event Sold(address seller, uint amount);
    event Factor(uint oldFactor, uint newFactor);

    constructor(uint _factor) Token("DreamToken", "DT") {
        _mint(owner(), 1000*1000*10**decimals());
        setFactor(_factor);
    }

    function setFactor(uint _factor) public onlyOwner{
        require(_factor != 0, "Factor can't equals zero");
        uint oldFactor = factor;
        factor = _factor;
        emit Factor(oldFactor, _factor);
    }

    function buy(uint _amount) public payable returns(bool){
        require(_amount < balanceOf(owner()), "Not enough tokens in bank");
        require(msg.value >= _amount*factor, "Not enough funds to buy your amount of tokens");

        _mint(msg.sender, _amount);
        _burn(owner(), _amount);
        
        if(msg.value > _amount*factor){
            uint change = msg.value - _amount*factor;
            payable(msg.sender).transfer(change);
        }

        emit Bought(msg.sender, _amount);
        return true;
    }

    function sell(uint _amount) public payable returns(bool){
        require(balanceOf(msg.sender) >= _amount, "Not enough tokens to sell");
        require(address(this).balance > _amount*factor, "Not enough funds to buy your amount of tokens");
        
        payable(msg.sender).transfer(_amount*factor);

        _mint(owner(), _amount);
        _burn(msg.sender, _amount);
        
        emit Sold(msg.sender, _amount);
        return true;
    }

    receive() external payable {
        buy(msg.value / factor);
    } 

    fallback() external {
        revert("Function is not allowed");
    }
}