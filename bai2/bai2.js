// Tính toán tần suất xuất hiện của mỗi ký tự trong chuỗi
// function calculateFrequencies(string) {
//     const frequencies = {};
//     for (let char of string) {
//       console.log({char})
//       frequencies[char] = frequencies[char] + 1 || 1;
//     }
//     console.log({frequencies})
//     return frequencies;
//   }
  
//   // Xây dựng cây Huffman
//   function buildHuffmanTree(frequencies) {
//     const heap = new Queue();
//     for (let char in frequencies) {
    
//       heap.enqueue({ char, frequency: frequencies[char] });
//     }
    
//     while (heap.size() > 1) { 
//       const left = heap.dequeue();
//       const right = heap.dequeue();

//       const newNode = { char: '', frequency: left.frequency + right.frequency, left, right };

//       console.log({newNode})
//       heap.enqueue(newNode);
//     }
  
//     return heap.dequeue();
//   }
  
//   // Tạo bảng ánh xạ từng ký tự sang mã Huffman
//   function buildHuffmanTable(node, prefix = '') {
//     const huffmanTable = {};
    
//     if (node.char) {
//       huffmanTable[node.char] = prefix;
//     } else {
//       Object.assign(huffmanTable, buildHuffmanTable(node.left, prefix + '0'));
//       Object.assign(huffmanTable, buildHuffmanTable(node.right, prefix + '1'));
//     }
  
//     return huffmanTable;
//   }
  
//   // Mã hóa chuỗi bằng mã Huffman
//   function encodeHuffman(string, huffmanTable) {
//     let encodedString = '';
//     for (let char of string) {
//       encodedString += huffmanTable[char];
//     }
//     return encodedString;
//   }
  
//   // Định nghĩa lớp hàng đợi ưu tiên
//   class Queue {
//     constructor() {
//       this.values = [];
//     }
  
//     enqueue(value) {
//       this.values.push(value);
//       this.sort();
//     }
  
//     dequeue() {
//       return this.values.shift();
//     }
  
//     size() {
//       return this.values.length;
//     }
  
//     sort() {

//       this.values.sort((a, b) => a.frequency - b.frequency);
//     }
//   }
  
//   // Chuỗi đầu vào
//   const inputString = prompt("Nhập vào một chuỗi ký tự không dấu: ");
  
//   // Tính toán tần suất xuất hiện của mỗi ký tự trong chuỗi
//   const frequencies = calculateFrequencies(inputString);
  
//   // Xây dựng cây Huffman
//   const huffmanTree = buildHuffmanTree(frequencies);
  
//   // Tạo bảng ánh xạ từng ký tự sang mã Huffman
//   const huffmanTable = buildHuffmanTable(huffmanTree);
  
//   // Mã hóa chuỗi bằng mã Huffman
//   const encodedString = encodeHuffman(inputString, huffmanTable);
  
//   console.log("Chuỗi đã mã hóa Huffman:", encodedString);



// ------------------------------------------------------------------------------------------------------------
// // câu 2 Nhập vào 1 chuỗi ký tự không dấu kích thướng bất kỳ , không phân biệt chữ hoa, chữ thường
      // mã hóa theo huffman
      // mã hóa theo shanno-Fano cho chuỗi trên  tính hiệu xuất mã hóa và tính dư thừa

// ------------------------------------------------------------------------------------------------------------
class Node {
  constructor(char, freq) {
    this.char = char;
    this.freq = freq;
    this.left = null;
    this.right = null;
  }
}

// Tính tần suất xuất hiện của các kí tự trong chuỗi
function frequency(data) {
  const frequencies = {};
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  return frequencies;
}

function buildHuffmanTree(frequencies) {
  const Queue = [];
  for (let char in frequencies) {
    Queue.push(new Node(char, frequencies[char]));
  }
  Queue.sort((a, b) => a.freq - b.freq);
  while (Queue.length > 1) {
    const leftNode = Queue.shift();
    const rightNode = Queue.shift();
    const parentNode = new Node(null, leftNode.freq + rightNode.freq);
    parentNode.left = leftNode;
    parentNode.right = rightNode;
    Queue.push(parentNode);
    Queue.sort((a, b) => a.freq - b.freq);
  }
  // console.log({Queue});

  return Queue[0];
}

function assignCodes(node, code = '', codes = {}) {
  if (node.char) {
    codes[node.char] = code;
  } else {
    assignCodes(node.left, code + '0', codes);
    assignCodes(node.right, code + '1', codes);
  }
  // console.log("assign code ", codes)
  return codes;
}

// Mã hóa chuỗi bằng mã Huffman
function encodeHuffman(data, codes) {
  let encodedData = '';
  for (let i = 0; i < data.length; i++) {
    const char = data[i];
    encodedData += codes[char];
  }
  console.log({encodeHuffman})
  return encodedData;
}


// giải mã
function decodeData(encodedData, huffmanTree) {
  let decodedData = '';
  let currentNode = huffmanTree;
  for (let i = 0; i < encodedData.length; i++) {
    const bit = encodedData[i];
    if (bit === '0') {
      currentNode = currentNode.left;
    } else {
      currentNode = currentNode.right;
    }
    if (currentNode.char) {
      decodedData += currentNode.char;
      currentNode = huffmanTree;
    }
  }
  return decodedData;
}

function huffmanCoding(data) {
  const frequencies = frequency(data);
  const huffmanTree = buildHuffmanTree(frequencies);
  const codes = assignCodes(huffmanTree);
  const encodedData = encodeHuffman(data, codes);
  const decodedData = decodeData(encodedData, huffmanTree);
  return { codes, encodedData, decodedData };
}




const input = prompt("Nhập vào một chuỗi ký tự không dấu: ");
const result = huffmanCoding(input.toLowerCase());

console.log('Input data:', input);
console.log('Huffman Codes:', result.codes);
console.log('Encoded data:', result.encodedData);
console.log('Decoded data:', result.decodedData);








  // Tính toán xác suất xuất hiện của mỗi ký tự trong chuỗi
  function calculateProbabilities(string) {
    const probabilities = {};
    const total = string.length;
    
    for (let char of string) {
      probabilities[char] = probabilities[char] + 1 || 1;
    }
    
    for (let char in probabilities) {
      probabilities[char] = probabilities[char] / total;
    }
    
    return probabilities;
  }
  
  // Mã hóa chuỗi bằng mã Shannon-Fano
  function encodeShannonFano(string, probabilities) {
    const shannonFanoTable = buildShannonFanoTable(probabilities);
    let encodedString = '';
    
    for (let char of string) {
      encodedString += shannonFanoTable[char];
    }
    
    return encodedString;
  }
  
  // Xây dựng bảng Shannon-Fano
  function buildShannonFanoTable(probabilities, prefix = '') {
    const shannonFanoTable = {};
    const chars = Object.keys(probabilities);
    
    if (chars.length === 1) {
      shannonFanoTable[chars[0]] = prefix + '0';
      return shannonFanoTable;
    }
    
    const divideIndex = findDivideIndex(chars, probabilities);
    const leftChars = chars.slice(0, divideIndex);
    const rightChars = chars.slice(divideIndex);
    
    for (let char of leftChars) {
      shannonFanoTable[char] = prefix + '0';
    }
    
    for (let char of rightChars) {
      shannonFanoTable[char] = prefix + '1';
    }
    
    const leftProbabilities = calculateProbabilities(leftChars.join(''));
    const rightProbabilities = calculateProbabilities(rightChars.join(''));
    
    Object.assign(shannonFanoTable, buildShannonFanoTable(leftProbabilities, prefix + '0'));
    Object.assign(shannonFanoTable, buildShannonFanoTable(rightProbabilities, prefix + '1'));
    
    return shannonFanoTable;
  }
  
  // Tìm chỉ mục tách nhóm trong Shannon-Fano
  function findDivideIndex(chars, probabilities) {
    let totalProb = 0;
    let divideIndex = 0;
    let minDiff = Number.POSITIVE_INFINITY;
    
    for (let i = 0; i < chars.length; i++) {
      const diff = Math.abs(totalProb - (1 - totalProb));
  
      if (diff < minDiff) {
        minDiff = diff;
        divideIndex = i;
      }
      
      totalProb += probabilities[chars[i]];
    }
    
    return divideIndex;
  }
  
  // Chuỗi đầu vào
  // const inputString2 = prompt("Nhập vào một chuỗi ký tự không dấu: ");
  
  // Tính toán xác suất xuất hiện của mỗi ký tự trong chuỗi
  const probabilities2 = calculateProbabilities(input);
  
  // Mã hóa chuỗi bằng mã Shannon-Fano
  const encodedString2 = encodeShannonFano(input, probabilities2);
  
  // Tính hiệu suất mã hóa
  const inputBits = input.length * 8;
  const encodedBits = encodedString2.length;
  const compressionRatio = inputBits / encodedBits;
  
  // Tính dư thừa
  const redundancy = 1 - (encodedBits / inputBits);
  
  console.log("Chuỗi đã mã hóa Shannon-Fano:", encodedString2);
  console.log("Tỷ lệ nén: 1:", compressionRatio.toFixed(2));
  console.log("Dư thừa: ", (redundancy * 100).toFixed(2), "%");