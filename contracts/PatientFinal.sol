// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Todos {
    struct Todo {
        string name;
        // bool completed;
        string add;
        uint age;
        string gender;
        uint height;
    }
    Todo[] public todos;

    //calldata
    function create(string memory _name, string memory _add , uint _age , string memory _gender, uint _height) public {
        // 3 ways to initialize a struct
        // - calling it like a function
        // todos.push(Todo(_text, false));

        // key value mapping
        todos.push(Todo({name: _name, age: _age ,  gender:_gender, height:_height, add: _add}));

        // // initialize an empty struct and then update it
        // Todo memory todo;
        // todo.text = _text;
        // // todo.completed initialized to false

        // todos.push(todo);
    }
    function get(uint _index) public view returns (string memory name, uint age, string memory gender, uint height, string memory add) {
        Todo storage todo = todos[_index];   
        return (todo.name, todo.age, todo.gender, todo.height, todo.add);
    }
}