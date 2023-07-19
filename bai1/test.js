// -----------------------------------------------------------------------------------------------------
// // Câu a nhập kích thước ma trận và nhập ma trận kết hợp
// -----------------------------------------------------------------------------------------------------


let sumP = 0  // biến  check tổng phan tử trong ma tran ket hop co === 1 không
let probabilities = []
const input = () =>{


while(true){
  let M = prompt("Nhập số hàng M: ");
  let N = prompt("Nhập số cột N: ");
  probabilities = [];
  sumP = 0
  for (let i = 0; i < M; i++) {
    let row = [];
    for (let j = 0; j < N;j++) {
      while (true) {
        let prob = eval(prompt(`Nhập xác suấ P(${i+1},${j+1})` ));
        if (prob >= 0 && prob <= 1) {
          row.push(prob);
          sumP += prob
          break;
        } else {
          alert("không được âm , lớn hơn 1");
        }
      }
    }
    probabilities.push(row);
  }
  

  if(sumP != 1){
    alert("Xác suất không thỏa mãn. Vui lòng nhập lại.");
  }else{
    break
  }
}


console.log("ma trận kết hợp P(x,y):",probabilities);

}

input()

// -----------------------------------------------------------------------------------------------------------------------
// // câu b, tính giá trị H(X),H(Y),H(X|Y),H(Y|X),H(X,Y),H(Y)-H(Y|X), I(X,Y)
// ------------------------------------------------------------------------------------------------------------------------


// 1.TÍNH H(y)
function entropyHy(probabilities) {
  let Hy = 0;

  for (let i = 0; i < probabilities.length; i++) {
    let sumRow = 0;
    for (let j = 0; j < probabilities[i].length;j++) {
      sumRow += probabilities[i][j];
    }
    Hy -= sumRow * Math.log2(sumRow);
  }
  return Hy;
}


// 2. TÍNH H(x)
// -------------------------------------------------------
const entropyHx = (probabilities) => {
  let Hx = 0;

  const columnSums = [];
  
  // Khởi tạo các giá trị ban đầu của columnSums là 0
  for (let j = 0; j < probabilities[0].length; j++) {
    columnSums[j] = 0;
  }
  
  // Tính tổng từng cột
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length; j++) {
      columnSums[j] += probabilities[i][j];
    }
  }

  // tính entropy của H(y)
  for (let i = 0; i < columnSums.length; i++) {

    Hx-= columnSums[i] * Math.log2(columnSums[i]);
  }
  return Hx;
};



// 3. TÍNH H(X,Y)
// ----------------------------------------------------------------------------
const entropyHxy = (probabilities) => {
  let conditionalEntropy = 0;
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      conditionalEntropy -= probabilities[i][j] * (probabilities[i][j]!= 0 ? Math.log2(probabilities[i][j]) : 0);

    }
   
  }
  return conditionalEntropy;
};




// 4. TÍNH H(X|Y)
// ----------------------------------------------------------------------------


// B1.TÍNH Py
const py =(probabilities)=>{
  let y =[]
  for (let i = 0; i < probabilities.length; i++) {
    let sum = 0
    for (let j = 0; j < probabilities[i].length;j++) {
      sum +=  probabilities[i][j]  
    }
    y=[...y,sum]
   
  }
  // console.log("px",y)
  return y

}


// B2.TÍNH XÁC XUẤT P(x|y)
const conditionalProbabilities = (probabilities) => {
  let y = py(probabilities) 
  let arrP = [] // đây là P(x\y)
  let arrStemp = []
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      /// tính giái trị của các P(Xi/Yi)
      let a = (probabilities[i][j] / y[j]) ? probabilities[i][j] / y[j] : 0
      arrStemp = [...arrStemp,a]
    }
    arrP = [...arrP,arrStemp]
    arrStemp = []
   
  }
  // console.log("ma trận P(x/y)",arr)
  return arrP
};

// B3. TÍNH H(X|Y)
const conditionalEntropy = (probabilities)=>{
  let p = conditionalProbabilities(probabilities)
  let conditionalEntropy = 0
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      conditionalEntropy -= probabilities[i][j] *(p[i][j]!=0 ? Math.log2(p[i][j]) : 0);
        
    }

   
  }
  return conditionalEntropy

}




// 5. Tính H(Y|X) 
// ----------------------------------------------------------------------------
// B1.TÍNH Px
const px =(probabilities)=>{
  const columnSums = [];
  
  // Khởi tạo các giá trị ban đầu của columnSums là 0
  for (let j = 0; j < probabilities[0].length; j++) {
    columnSums[j] = 0;
  }
  
  // Tính tổng từng cột
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length; j++) {
      columnSums[j] += probabilities[i][j];
    }
  }
  // console.log("y",y)
  return columnSums

}



// B2.TÍNH XÁC XUẤT P(Y/X)
const conditionalProbabilities2 = (probabilities) => {
  let x = px(probabilities) // p(y)
  let arr = [] // đây là P(y\x)
  let arrStemp = []
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      let a = (probabilities[i][j] / x[i]) ? (probabilities[i][j] / x[i]) : 0 /// tính giái trị của các P(X1/Y1)
      arrStemp = [...arrStemp,a]
    }
    arr = [...arr,arrStemp]
    arrStemp = []
   
  }
  // console.log("ma trận P(x/y)",arr)
  return arr
};


//B3. TÍNH H(Y/X)
const conditionalEntropy2 = (probabilities)=>{
  let p = conditionalProbabilities2(probabilities)
  let conditionalEntropy = 0
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      conditionalEntropy -= probabilities[i][j] *(p[i][j] != 0 ? Math.log2(p[i][j]) : 0);
        
    }

   
  }
  return conditionalEntropy

}




// 6. TÍNH H(Y) - H(Y | X)

const calculate = (probabilities)=>{

  return entropyHy(probabilities) - conditionalEntropy2(probabilities)
}



// 7. TÍNH I(x,y)-Lượng tin tương hỗ 

const mutualInformation =(probabilities)=> {
  let I = 0;
  let x = px(probabilities)
  let p = conditionalProbabilities(probabilities)

  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
     I +=probabilities[i][j]  *((p[i][j] / x[i]) && (p[i][j] / x[i]) != 0  ? Math.log2(p[i][j] / x[i]) : 0);       
    }
   
  }

  return I;
}

// -----------------------------------------------------------------------------------------------------------------------
// // câu c, tính giá trị D(P(X||P(Y))) VÀ D(P(Y)||P(X))
// ------------------------------------------------------------------------------------------------------------------------


let Px =px(probabilities)
let Py = py(probabilities)
function calculateKLDivergence(a, b) {
  let klDivergence = 0;
  if(a.length != b.length) return "không xác định"

  for (let i = 0; i < a.length; i++) {
    let pxValue = a[i];
    let pyValue = b[i];
    klDivergence += pxValue * Math.log2(pxValue / pyValue);
 
  }
  return klDivergence;
}


// 1. Tính D(P(x)||P(y))
let divergenceXY = calculateKLDivergence(Px, Py);

// 2. Tính D(P(y)||P(x))
let divergenceYX = calculateKLDivergence(Py, Px);


// ----------------------------------------------------------------------------------------------
// Tính và hiển thị các giá trị
console.log("Gía trị của H(X): " + entropyHx(probabilities));
console.log("Gía trị của H(Y): " + entropyHy(probabilities));
console.log("Gía trị của H(X,Y)"+entropyHxy(probabilities));
console.log("Gía trị của H(X | Y): " + conditionalEntropy(probabilities))
console.log("Gía trị của H(Y | X): " + conditionalEntropy2(probabilities))
console.log("Gía trị của H(Y) - H(Y | X): " + calculate(probabilities));
console.log("Gía trị của I(X; Y): " + mutualInformation(probabilities));
console.log("Gía trị của D(P(x)||P(y)): " + divergenceXY);
console.log("Gía trị của D(P(y)||P(x)): " + divergenceYX);
