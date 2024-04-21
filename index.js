function Node(value, left = null, right = null) {
    return {value, left, right}
}

function Tree() {
    let root = null

    const insert = (current, value) => {
        if (current === null || current === undefined) {
            return Node(value);
        }
        if (value < current.value) {
            current.left = insert(current.left, value);
        } else if (value > current.value) {
            current.right = insert(current.right, value);
        }
        return current;
    }
    const buildTree = (array) => {
        let normArray = normalizeArray(array)
        for (let i = 0; i < normArray.length; i++) {
            root = insert(root, normArray[i]);
        }
        balanceBST()
        prettyPrint(root)
    }

    const normalizeArray = (array) => {
        array.sort()
        const uniqueSet = new Set(array);
        const uniqueArray = Array.from(uniqueSet);
        uniqueArray.sort();
        return uniqueArray;
    }

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }
        if (node.right !== null) {
            prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };
    const balanceBST = () => {
        const nodes = [];
        inorderTraversal(root, nodes);
        root = buildBalancedBST(nodes, 0, nodes.length - 1);
    };

    const inorderTraversal = (node, nodes) => {
        if (node === null) return;
        inorderTraversal(node.left, nodes);
        nodes.push(node.value);
        inorderTraversal(node.right, nodes);
    };

    const buildBalancedBST = (nodes, start, end) => {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const rootNode = Node(nodes[mid]);
        rootNode.left = buildBalancedBST(nodes, start, mid - 1);
        rootNode.right = buildBalancedBST(nodes, mid + 1, end);
        return rootNode;
    };

    return {buildTree, prettyPrint,balanceBST, root}
}

const tree = Tree();
tree.buildTree([51, 7, 4, 23, 8, 9, 4, 3]);

tree.balanceBST();

