// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Ownable{

    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(){
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "You are not owner");
        _;
    }

    function owner() public view returns(address) {
        return _owner;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        address previousOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(previousOwner, newOwner);
    }

    function renounceOwnership() public onlyOwner {
        transferOwnership(address(0));
    }

}