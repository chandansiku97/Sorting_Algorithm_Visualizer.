const n = 25;
const arr = [n];
init();

let audioCtx = null;
//Function for Audio WEB API:
function playNote(freq) {
    if (audioCtx == null) {
        audioCtx = new(AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext)();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);
    osc.connect(node);
    node.connect(audioCtx.destination);
}

//Function to show bars:
function init() {
    for (let i = 0; i < n; i++) {
        arr[i] = Math.random();
    }
    showbars();
}

function play() {
    const copyArr = [...arr];
    const moves = SortingAlgorithms.selectionSort(copyArr);
    animate(moves);
}
//Animation function:
function animate(moves) {
    if (moves.length == 0) {
        return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type == "swap") {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    playNote(100 + arr[i] * 500);
    playNote(100 + arr[j] * 500);

    showbars(move);
    setTimeout(function() {
        animate(moves);
    }, 250);
}

function showbars(move) {
    container.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = arr[i] * 100 + "%";
        bar.classList.add("bar");
        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type == "swap" ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}

//Class for Sorting Algorithm

class SortingAlgorithms {
    // BubbleSort:
    static bubbleSort(arr) {
            const moves = [];
            let swapped;

            for (let j = 0; j < arr.length - 1; j++) {
                swapped = false;

                for (let i = 1; i < arr.length - j; i++) {
                    moves.push({ indices: [i - 1, i], type: "comp" });
                    if (arr[i - 1] > arr[i]) {
                        swapped = true;
                        moves.push({ indices: [i - 1, i], type: "swap" });
                        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                    }
                }

                if (!swapped) {
                    break;
                }
            }

            return moves;
        }
        //SelectionSort:
    static selectionSort(arr) {
        const moves = [];

        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < arr.length; j++) {
                moves.push({ indices: [minIndex, j], type: "comp" });
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            if (minIndex !== i) {
                moves.push({ indices: [i, minIndex], type: "swap" });
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            }
        }

        return moves;
    }

    //InsertionSort:
    static insertionSort(arr) {
            const moves = [];

            for (let i = 1; i < arr.length; i++) {
                const key = arr[i];
                let j = i - 1;
                moves.push({ indices: [i, j], type: "comp" });

                while (j >= 0 && arr[j] > key) {
                    moves.push({ indices: [j + 1, j], type: "swap" });
                    arr[j + 1] = arr[j];
                    j--;
                }

                arr[j + 1] = key;
            }

            return moves;
        }
        //End of SortingAlgo Class:
}

function insertion() {
    const copyArr = [...arr];
    const moves = SortingAlgorithms.insertionSort(copyArr);
    animate(moves);
}

function selection() {
    const copyArr = [...arr];
    const moves = SortingAlgorithms.selectionSort(copyArr);
    animate(moves);
}

function bubble() {
    const copyArr = [...arr];
    const moves = SortingAlgorithms.bubbleSort(copyArr);
    animate(moves);
}