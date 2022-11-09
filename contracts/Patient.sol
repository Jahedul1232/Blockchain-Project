// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;


contract Course {

    mapping(uint => Instructor) instructors;
    
    struct Instructor {
        uint age;
        // string first_name;
        // string last_name;
    }
    Instructor i;
    function setInstructor(uint index , uint _age) public 
    {
        i.age = _age;
        // i.first_name = _first_name;
        // i.last_name = _last_name;
        instructors[index] = i;
    }
    
    
    
    function getInstructorInfos(uint index) public view returns (uint) {           
        
        // uint age = instructors[_index].age;
        // string memory first_name = instructors[_index].first_name;
        // string memory last_name = instructors[_index].last_name;
        Instructor memory i = instructors[index];
        
        return (i.age);
    }

    // function get(uint _index) public view returns (uint age , string memory name, string memory last_name) {
    //     // Instructor storage i = i[_index];
    //     return (i.age, i.first_name, i.last_name);
    // }
}