// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;


contract Storage {

    string encryptedValue;

    function store(string memory _value) public {
        encryptedValue = _value;
    }

    function retrieve() public view returns (string memory){
        return encryptedValue;
    }
}