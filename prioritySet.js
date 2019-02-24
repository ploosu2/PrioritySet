/**
* Set where elements have priority and can be popped in the priority order from it (larger priority first).
* 
*/
class PrioritySet {
    constructor() {
        this.heap = [null];
        this.positions = {}; // val: index in the heap
    }
    
    /** Swap the node at ind with its parent as long as the parent's priority is smaller */
    bubble(ind) {
        let curr = this.heap[ind];
        let parentInd = ind>>1;
        let parent = this.heap[parentInd];
        while (parent && curr.priority>parent.priority) {
            this.heap[parentInd] = curr;
            this.heap[ind] = parent;
            this.positions[parent.value] = ind;
            this.positions[curr.value] = parentInd;
            ind = parentInd;
            parentInd = ind>>1;
            parent = this.heap[parentInd];
        }
    }
    
    /** Add an element with given priority to the queue, priority defaults to -Infinity */
    push(elem, priority=-Infinity) {
        const newNode = new this.Node(elem, priority);
        if ((elem in this.positions)) {
            this.reprioritize(elem, priority);
        } else {
            this.positions[elem] = this.heap.length;
            this.heap.push(newNode);
            this.bubble(this.heap.length - 1);
        }
    }
    
    /** Swap the node at ind with its greater child as long as possible */
    sink(ind) {
        let curr = this.heap[ind];
        let leftInd, rightInd, left, right, child, childInd, rightChildBigger;
        while (true) {
            leftInd = 2*ind;
            rightInd = leftInd+1;
            left = this.heap[leftInd];
            right = this.heap[rightInd];
            rightChildBigger = right && right.priority >= left.priority;
            childInd = rightChildBigger ? rightInd : leftInd;
            child = this.heap[childInd];
            curr = this.heap[ind]
            if (!child || curr.priority>=child.priority) {
                break;
            }
            this.heap[childInd] = curr;
            this.heap[ind] = child;
            this.positions[curr.value] = childInd;
            this.positions[child.value] = ind;
            ind = childInd;
        }
    }
    
    removeAt(ind) {
        let toRemove = this.heap[ind];
        let curr = this.heap[ind] = this.heap.pop();
        delete this.positions[toRemove.value];
        this.positions[curr.value] = ind;
        this.sink(ind);
        return toRemove;
    }
    
    /** Get the element with highest priority (and remove it), or null if empty */
    pop() {
        if (this.heap.length < 3) {
            const toReturn = this.heap.pop();
            this.heap[0] = null;
            return toReturn!==null ? toReturn.value : null;
        }
        return this.removeAt(1).value;
    }
    
    isEmpty() {
        return this.heap.length===1; //is empty if contains only the single null-element (root)
    }
    
    /** Removes a node with value elem if there is one */
    remove(elem) {
        if (!(elem in this.positions)) return false;
        var ind = this.positions[elem];
        this.removeAt(ind);
        return true;
    }
    
    reprioritize(elem, priority) {
        if (!(elem in this.positions)) {
            throw "Element "+elem+" not found";
        } else {
            let ind = this.positions[elem];
            let node = this.heap[ind];
            if (priority < node.priority) {
                node.priority = priority;
                this.sink(ind);
            } else if (priority > node.priority) {
                node.priority = priority;
                this.bubble(ind);
            }
        }
    }
    
    
}

PrioritySet.prototype.Node = class Node {
    constructor(val, priority) {
        this.value = val;
        this.priority = priority;
    }
};
