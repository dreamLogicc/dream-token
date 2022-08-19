// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IERC20.sol";

contract Token is IERC20{

    uint private _totalSupply;
    
    string private name_;
    string private symbol_;

    mapping(address => uint) private balances;
    mapping(address => mapping(address => uint)) private allowed;
    
    constructor(string memory _name, string memory _symbol) {
        name_ = _name;
        symbol_ = _symbol;
    }

    function totalSupply() public view override returns(uint) {
        return _totalSupply;
    }

    function name() public view override returns(string memory) {
        return name_;
    }

    function symbol() public view override returns(string memory) {
        return symbol_;
    }

    function decimals() public pure override returns(uint8) {
        return 18;
    }

    function balanceOf(address _account) public view override returns(uint) {
        return balances[_account];
    }

    function allowance(address _tokenOwner, address _spender) public view override returns(uint){
        return allowed[_tokenOwner][_spender];
    }

    function transfer(address _to, uint _amount) public override returns(bool){
        require(balances[msg.sender] >= _amount);

        _transfer(msg.sender, _to, _amount);

        return true;
    }
    
    function approve(address _spender, uint _amount) public override returns(bool){
        allowed[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    function transferFrom(address _from, address _to, uint _amount) public override returns(bool){
        require(balances[_from] >= _amount);
        require(allowed[_from][msg.sender] >= _amount);

        allowed[_from][msg.sender] -= _amount;
        _transfer(_from, _to, _amount);

        return true;
    }

    function _mint(address _to, uint _amount) internal {
        _totalSupply += _amount;
        balances[_to] += _amount;

        emit Transfer(address(0), _to, _amount);
    }

    function _burn(address _from, uint _amount) internal {   
        require(balances[_from] >= _amount, "Burn amount exceeds balance");
        _totalSupply -= _amount;
        balances[_from] -= _amount;

        emit Transfer(_from, address(0), _amount);
    }

    function _transfer(address _from, address _to, uint _amount) internal {
        balances[_from] -= _amount;
        balances[_to] += _amount;
        emit Transfer(_from, _to, _amount);
    }

}