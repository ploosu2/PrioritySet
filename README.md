# PrioritySet
Javascript implementation of a priority set

Here's an example usage:

```javascript
var s = new PrioritySet();
s.push('a', 4);
s.push('b', 5);
s.push('c', -Infinity);
s.push('d', 1);

s.pop(); // --> 'b'
s.reprioritize('c', 10); //element to reprioritize must be in the set, otherwise throws an error
s.pop(); // --> 'c'
s.remove('a'); //--> true
s.pop(); // --> 'd'
s.pop(); // --> null

```
