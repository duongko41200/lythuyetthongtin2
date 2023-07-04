// Tính toán tần suất xuất hiện của mỗi ký tự trong chuỗi
function calculateFrequencies(string) {
    const frequencies = {};
    for (let char of string) {
      console.log({char})
      frequencies[char] = frequencies[char] + 1 || 1;
    }
    console.log({frequencies})
    return frequencies;
  }
  
  // Xây dựng cây Huffman
  function buildHuffmanTree(frequencies) {
    const heap = new PriorityQueue();
    for (let char in frequencies) {
    
      heap.enqueue({ char, frequency: frequencies[char] });
    }
    
    while (heap.size() > 1) { 
      const left = heap.dequeue();
      const right = heap.dequeue();

      const newNode = { char: '', frequency: left.frequency + right.frequency, left, right };

      console.log({newNode})
      heap.enqueue(newNode);
    }
  
    return heap.dequeue();
  }
  
  // Tạo bảng ánh xạ từng ký tự sang mã Huffman
  function buildHuffmanTable(node, prefix = '') {
    const huffmanTable = {};
    
    if (node.char) {
      huffmanTable[node.char] = prefix;
    } else {
      Object.assign(huffmanTable, buildHuffmanTable(node.left, prefix + '0'));
      Object.assign(huffmanTable, buildHuffmanTable(node.right, prefix + '1'));
    }
  
    return huffmanTable;
  }
  
  // Mã hóa chuỗi bằng mã Huffman
  function encodeHuffman(string, huffmanTable) {
    let encodedString = '';
    for (let char of string) {
      encodedString += huffmanTable[char];
    }
    return encodedString;
  }
  
  // Định nghĩa lớp hàng đợi ưu tiên
  class PriorityQueue {
    constructor() {
      this.values = [];
    }
  
    enqueue(value) {
      this.values.push(value);
      this.sort();
    }
  
    dequeue() {
      return this.values.shift();
    }
  
    size() {
      return this.values.length;
    }
  
    sort() {

      this.values.sort((a, b) => a.frequency - b.frequency);
    }
  }
  
  // Chuỗi đầu vào
  const inputString = prompt("Nhập vào một chuỗi ký tự không dấu: ");
  
  // Tính toán tần suất xuất hiện của mỗi ký tự trong chuỗi
  const frequencies = calculateFrequencies(inputString);
  
  // Xây dựng cây Huffman
  const huffmanTree = buildHuffmanTree(frequencies);
  
  // Tạo bảng ánh xạ từng ký tự sang mã Huffman
  const huffmanTable = buildHuffmanTable(huffmanTree);
  
  // Mã hóa chuỗi bằng mã Huffman
  const encodedString = encodeHuffman(inputString, huffmanTable);
  
  console.log("Chuỗi đã mã hóa Huffman:", encodedString);