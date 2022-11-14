// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract dataStorage {

  string[] public name = ["hello world"] ;
  
  function get_reta() view public returns(string[] memory)
  {
    return name;
  }     
  function set_reta(string memory _name) public
  {
    name.push(_name);
    // name = _name;
  }
}