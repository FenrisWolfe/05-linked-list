'use strict';

//function LinkedList(){} <--- HAHAHA, nice try, this causes a failed test!
//function LinkedList...
//vinicio - classes are not hoisted :p
class LinkedList{
  //new LinkedList()...
  constructor(value){
    this.value = value;
    this.next = null;
  }

  append(node){
    if(!(node instanceof LinkedList))
      throw new TypeError('<node> should be an instance of LinkedList');
    
    // vinicio - we know we are at the last element if there is no next
    if(!this.next)
      this.next = node;
    else
      this.next.append(node);
    
    return this;
  }

  //TODO : Homework
  // fredric - this returns a value or return null if there is no node or a node without the given value
  find(value){
    return this.value === value ? this : !this.next ? null
      :this.next.find(value);
  }

  //vinicio - remove has( intentionally n_o), a bug. Can you find it?
  remove(node){
    // hopping code below fixes errors 
    if(!(node instanceof LinkedList))
      throw new TypeError('<node> should be an instance of LinkedList');
    
    if(!this.next)
      return this;
    if(this === node){
      //vinicio - here we know we need to remove the NEXT node
      // this should fix the error
      this.value = this.next.value;
      this.next = this.next.next;
    } else if (this.next === node) {
      this.next = this.next.next;
    } else {
      this.next.remove(node);
    }
    return this;
  }
}

module.exports = LinkedList;