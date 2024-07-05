export function calculateMinMoves(puzzle) {
    const goal = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Stato finale obiettivo
    const visited = new Set();
    let minMoves = Infinity;

    function backtrack(current, moves) {
        const currentKey = current.toString();
        if (visited.has(currentKey)) {
            return;
        }
        visited.add(currentKey);

        if (arraysEqual(current, goal)) {
            minMoves = Math.min(minMoves, moves);
            return;
        }

        const zeroIndex = current.indexOf(0);
        const neighbors = getNeighbors(current, zeroIndex);

        for (const neighbor of neighbors) {
            backtrack(neighbor, moves + 1);
        }

        visited.delete(currentKey);
    }

    backtrack(puzzle, 0);
    return minMoves;
}

function getNeighbors(puzzle, zeroIndex) {
    const neighbors = [];
    const moves = [-1, 1, -3, 3]; // Possibili spostamenti (sinistra, destra, su, giù)
    for (const move of moves) {
        const newIndex = zeroIndex + move;
        if (isValidMove(zeroIndex, newIndex)) {
            const newPuzzle = puzzle.slice();
            [newPuzzle[zeroIndex], newPuzzle[newIndex]] = [newPuzzle[newIndex], newPuzzle[zeroIndex]];
            neighbors.push(newPuzzle);
        }
    }
    return neighbors;
}

function isValidMove(zeroIndex, newIndex) {
    if (newIndex < 0 || newIndex >= 9) return false;
    if (zeroIndex % 3 === 0 && newIndex === zeroIndex - 1) return false; // Evita movimenti a sinistra
    if (zeroIndex % 3 === 2 && newIndex === zeroIndex + 1) return false; // Evita movimenti a destra
    return true;
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}
