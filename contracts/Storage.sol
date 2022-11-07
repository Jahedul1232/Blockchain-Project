// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract dataStorage {

  string public name = "hello world";
  function getData() view public returns(string memory)
  {
    return name;
  }     
  function setData(string memory _name) public
  {
    name = _name;
  }
}