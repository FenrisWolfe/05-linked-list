'use strict';

//vinicio - This is capital L because it's a class
const LinkedList = require('../lib/linked-list');

describe('linked-list.js', () => {
  test('A list with a single element, should have a value and no next', () => {
    let result = new LinkedList(5);
    expect(result.value).toEqual(5);
    expect(result.next).toEqual(null);
  });

  test('insertion should properly modify the next property', () => {
    let result = new LinkedList(5);
    result.append(new LinkedList(4));
    result.append(new LinkedList(10));

    expect(result.value).toEqual(5);
    expect(result.next.value).toEqual(4);
    expect(result.next.next.value).toEqual(10);
    expect(result.next.next.next).toEqual(null);
  });

  test('insertion without a node will throw an error', () => {
    let result = new LinkedList(5);  

    expect(() => {
      result.append('not-a-node');      
    }).toThrow();
  });

  test('remove should update the next property and erase an element', () => {
    let first = new LinkedList(10);
    let second = new LinkedList(20);
    let third = new LinkedList(30);

    first.append(second);
    first.append(third);
    // vinicio - I can do this because I return this at the end of append
    //first.append(second).append(third);

    expect(first.value).toEqual(10);
    expect(first.next.value).toEqual(20);
    expect(first.next.next.value).toEqual(30);
    expect(first.next.next.next).toEqual(null);

    first.remove(second);

    expect(first.value).toEqual(10);
    expect(first.next.value).toEqual(30);
    expect(first.next.next).toEqual(null);

  });

  test('this will reset the first node as next if the prior node is removed.', () => {
    let first = new LinkedList(10);
    let second = new LinkedList(20);
    let third = new LinkedList(30);

    first.append(second).append(third);

    expect(first.value).toEqual(10);
    expect(first.next.value).toEqual(20);
    expect(first.next.next.value).toEqual(30);
    expect(first.next.next.next).toEqual(null);

    first.remove(first);

    expect(first.value).toEqual(20);
    expect(first.next.value).toEqual(30);
    expect(first.next.next).toEqual(null);

  });
  
  test('remove will return the first node if the removed node is not present.', () => {
    let first = new LinkedList(10);
    let second = new LinkedList(20);
    let third = new LinkedList(30);

    first.append(second);

    expect(first.remove(third)).toEqual(first);
  });

  test('remove with a non-node will throw an error', () => {
    let result = new LinkedList(5);

    expect(() => {
      result.remove('not-a-node');
    }).toThrow();
  });

  test('find will return the node with the given value', () => {
    let first = new LinkedList(10);
    let second = new LinkedList(20);
    let third = new LinkedList(30);

    first.append(second).append(third);
    expect(first.find(30)).toEqual(third);
    expect(first.find(20)).toEqual(second.append(third));
    expect(third.find(30)).toEqual(third);
  });

  test('this will be null if there is no node with the given value', () => {
    let first = new LinkedList(10);
    let second = new LinkedList(20);
    let third = new LinkedList(30);

    first.append(second).append(third);
    expect(first.find(1000)).toBeNull();
    expect(third.find(100)).toBeNull();
  });
});