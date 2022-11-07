// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;


contract test {
   struct Book { 
      string title;
      string author;
      uint book_id;
   }
   Book book;

   function setBook() public {
      book = Book('Learn Java', 'TP', 1);
      book = Book('C++','SC',2);
   }
   function getBookId(uint number) public view returns (string memory, string memory) {
    
    return (book.title, book.author);
   }
}
