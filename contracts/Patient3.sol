// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
 
contract Todos {
    struct Todo {
        string  name;
        // bool completed;
        string add;
        uint age;
    }
    Todo[] public todos;

    // todos.push(Todo({name: "jahed", add:"north carolin", age: 25}));
 

    //callData
    function create(string memory _name, string memory _add , uint _age) public {
        // 3 ways to initialize a struct
        // - calling it like a function
        // todos.push(Todo(_text, false));

 
        // key value mapping
        todos.push(Todo({name: _name, add: _add, age: _age}));
 
        // // initialize an empty struct and then update it
        // Todo memory todo;
        // todo.text = _text;
        // // todo.completed initialized to false
 
        // todos.push(todo);
    }
    function get(uint _index) public view returns (string memory name, string memory add, uint age) {
        Todo storage todo = todos[_index];
        return (todo.name, todo.add, todo.age);
    }
}
