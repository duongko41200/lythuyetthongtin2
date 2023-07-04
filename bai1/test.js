let M = prompt("Nhập số hàng M: ");
let N = prompt("Nhập số cột N: ");

let probabilities = [];
for (let i = 0; i < M; i++) {
  let row = [];
  for (let j = 0; j < N;j++) {
    while (true) {
      let prob = eval(prompt(`Nhập xác suấ P(${i+1},${j+1})` ));
      if (prob && prob >= 0 && prob <= 1) {
        row.push(prob);
        break;
      } else {
        alert("Xác suất không thỏa mãn. Vui lòng nhập lại.");
      }
    }
  }
  probabilities.push(row);
}

console.log("ma trận kết hợp P(x,y):",probabilities);

// let R = []

// for (let i = 0; i< M; i++) {
//     let rows = []

//     for (let j = 0; j < probabilities[i].length;j++) {
//         if(i + 1 < M){
//             let x = P[i][j]*P[i+1][i]

//         console.log(`giá trị x ${j+1} `,P[i][j]*P[i+1][i])
//         rows.push(x)

//         }else{
//             let x = P[i-1][j]*P[i][i]
//             console.log(`giá trị y${j+1} `,P[i-1][j]*P[i][i])
//             rows.push(x)

//         }

//     }
//     R.push(rows)

// }

// console.log("ma trận ket hợp R(x,y):",R);



// let probabilities = [
//   [2/9, 1/18, 1/18],
//   [1/18, 2/9, 1/18],
//     [1/19,1/18,2/9]


// ];



/// ////////////////////////// tính H(x) ////////////////////////////////////////////////////////////////
function entropyHx(probabilities) {
  let conditionalEntropy = 0;

  for (let i = 0; i < probabilities.length; i++) {
    let sum = 0;
    for (let j = 0; j < probabilities[i].length;j++) {
      sum += probabilities[i][j];
    }
    conditionalEntropy -= sum * Math.log2(sum);
  }
  return conditionalEntropy;
}


//////////////////////////////////////// tính H(y)  /////////////////////////////////////////////////////////////////
const entropyHy = (probabilities) => {
  let conditionalEntropy = 0;

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

    conditionalEntropy -= columnSums[i] * Math.log2(columnSums[i]);
  }
  return conditionalEntropy;
};

//////////////////// tính H(x,y) ////////////////////////////////////////////////////////////////////////////////


const entropyHxy = (probabilities) => {
  let conditionalEntropy = 0;
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      conditionalEntropy -= probabilities[i][j] * Math.log2(probabilities[i][j]);

    }
   
  }
  return conditionalEntropy;
};


///////////////////////  tính H(X|Y)    //////////////////////////////////////////////////////////////////////////

const py =(probabilities)=>{
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


// tính xác suất P(x|y)
const conditionalProbabilities = (probabilities) => {
  let y = py(probabilities) // p(y)
  let arr = [] // đây là P(x\y)
  let arrStemp = []
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      let a = probabilities[i][j] / y[j] /// tính giái trị của các P(X1/Y1)
      arrStemp = [...arrStemp,a]
    }
    arr = [...arr,arrStemp]
    arrStemp = []
   
  }
  // console.log("ma trận P(x/y)",arr)
  return arr
};

/////// H(X|Y)
const conditionalEntropy = (probabilities)=>{
  let p = conditionalProbabilities(probabilities)
  let conditionalEntropy = 0
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      conditionalEntropy -= probabilities[i][j] * Math.log2(p[i][j]);
        
    }

   
  }
  return conditionalEntropy

}




///////////////// H(Y|X) /////////////////////////////////////////////////////////////////////////////////////////////
const px =(probabilities)=>{
  let x =[]
  for (let i = 0; i < probabilities.length; i++) {
    let sum = 0
    for (let j = 0; j < probabilities[i].length;j++) {
      sum +=  probabilities[i][j]  
    }
    x=[...x,sum]
   
  }
  // console.log("px",y)
  return x

}


//P(Y/X)
const conditionalProbabilities2 = (probabilities) => {
  let x = px(probabilities) // p(y)
  let arr = [] // đây là P(y\x)
  let arrStemp = []
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      let a = probabilities[i][j] / x[i] /// tính giái trị của các P(X1/Y1)
      arrStemp = [...arrStemp,a]
    }
    arr = [...arr,arrStemp]
    arrStemp = []
   
  }
  // console.log("ma trận P(x/y)",arr)
  return arr
};



const conditionalEntropy2 = (probabilities)=>{
  let p = conditionalProbabilities2(probabilities)
  let conditionalEntropy = 0
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      conditionalEntropy -= probabilities[i][j] * Math.log2(p[i][j]);
        
    }

   
  }
  return conditionalEntropy

}




/////////////////// H(Y) - H(Y | X)///////////////////////////

const calculate = (probabilities)=>{

  return entropyHy(probabilities) - conditionalEntropy2(probabilities)
}



//////////////////////// I(x,y)-Lượng tin tương hỗ ////////////////////

const mutualInformation =(probabilities)=> {
  let mutualInformation = 0;
  let x = px(probabilities)
  let p = conditionalProbabilities(probabilities)

  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities[i].length;j++) {
      mutualInformation +=probabilities[i][j]  * Math.log2(p[i][j] / x[i]);       
    }
   
  }

  return mutualInformation;
}


/////////////////////////////// tính emtropy tương đối ///////////////////////////////////////////////

let Px =px(probabilities)
let Py = py(probabilities)
function calculateKLDivergence(Px, Py) {
  let klDivergence = 0;
  if(Px.length != Py.length) return "không xác định"

  for (let i = 0; i < Px.length; i++) {
    let pxValue = Px[i];
    let pyValue = Py[i];
    klDivergence += pxValue * Math.log2(pxValue / pyValue);
 
  }
  return klDivergence;
}


// Tính D(P(x)||P(y))
let divergenceXY = calculateKLDivergence(Px, Py);

// Tính D(P(y)||P(x))
let divergenceYX = calculateKLDivergence(Py, Px);



// Tính và hiển thị các giá trị
console.log("H(X): " + entropyHx(probabilities));
console.log("H(Y): " + entropyHy(probabilities));
console.log("H(X,Y)"+entropyHxy(probabilities));
console.log("H(X | Y): " + conditionalEntropy(probabilities))
console.log("H(Y | X): " + conditionalEntropy2(probabilities))
console.log("H(Y) - H(Y | X): " + calculate(probabilities));
console.log("I(X; Y): " + mutualInformation(probabilities));
console.log("D(P(x)||P(y)): " + divergenceXY);
console.log("D(P(y)||P(x)): " + divergenceYX);
