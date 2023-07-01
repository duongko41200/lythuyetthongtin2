// let M = prompt("Nhập số hàng M: ");
// let N = prompt("Nhập số cột N: ");

// let P = [];
// for (let i = 0; i < M; i++) {
//   let row = [];
//   for (let j = 0; j < N; j++) {
//     while (true) {
//       let prob = parseFloat(prompt(`Nhập xác suấ P(${i+1},${j+1})` ));
//       if (prob >= 0) {
//         row.push(prob);
//         break;
//       } else {
//         alert("Xác suất không được âm. Vui lòng nhập lại.");
//       }
//     }
//   }
//   P.push(row);
// }

// console.log("ma trận ban đầu P(x,y):",P);

// let R = []

// for (let i = 0; i< M; i++) {
//     let rows = []

//     for (let j = 0; j < N; j++) {
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

// Tính entropy của một biến ngẫu nhiên

let probabilities = [
  [2 / 9, 1 / 18, 1 / 18],
  [1 / 18, 2 / 9, 1 / 18],
  [1 / 18, 1 / 18, 2 / 9],
];
/// tính H(x)
function entropyHx(probabilities) {
  let conditionalEntropy = 0;

  for (let i = 0; i < probabilities.length; i++) {
    let sum = 0;
    for (let j = 0; j < probabilities.length; j++) {
      sum += probabilities[i][j];
    }
    conditionalEntropy -= sum * Math.log2(sum);
  }
  return conditionalEntropy;
}
//////////////////////////////////////// tính H(y)  /////////////////////////////////////////////////////////////////
const entropyHy = (probabilities) => {
  let conditionalEntropy = 0;
  for (let i = 0; i < probabilities.length; i++) {
    let sum = 0;
    for (let j = 0; j < probabilities.length; j++) {
      sum += probabilities[j][i];
    }
    conditionalEntropy -= sum * Math.log2(sum);
  }
  return conditionalEntropy;
};

//////////////////// tính H(x,y) ///////////////////////////////////////////////////////////
const entropyHxy = (probabilities) => {
  let conditionalEntropy = 0;
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities.length; j++) {
      conditionalEntropy -= probabilities[i][j] * Math.log2(probabilities[i][j]);

    }
   
  }
  return conditionalEntropy;
};





///////////////////////  tính H(X|Y)    //////////////////////////////////////

const py =(probabilities)=>{
  let y =[]
  for (let i = 0; i < probabilities.length; i++) {
    let sum = 0
    for (let j = 0; j < probabilities.length; j++) {
      sum +=  probabilities[j][i]  
    }
    y=[...y,sum]
   
  }
  // console.log("y",y)
  return y

}

const conditionalProbabilities = (probabilities) => {
  let y = py(probabilities) // p(y)
  let arr = [] // đây là P(x\y)
  let arrStemp = []
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities.length; j++) {
      let a = probabilities[i][j] / y[j] /// tính giái trị của các P(X1/Y1)
      arrStemp = [...arrStemp,a]
    }
    arr = [...arr,arrStemp]
    arrStemp = []
   
  }
  // console.log("ma trận P(x/y)",arr)
  return arr
};

const conditionalEntropy = (probabilities)=>{
  let p = conditionalProbabilities(probabilities)
  let conditionalEntropy = 0
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities.length; j++) {
      conditionalEntropy -= probabilities[i][j] * Math.log2(p[i][j]);
        
    }

   
  }
  return conditionalEntropy

}




///////////////// H(Y|X) ////////////////////////////////////////////
const px =(probabilities)=>{
  let y =[]
  for (let i = 0; i < probabilities.length; i++) {
    let sum = 0
    for (let j = 0; j < probabilities.length; j++) {
      sum +=  probabilities[i][j]  
    }
    y=[...y,sum]
   
  }
  // console.log("y",y)
  return y

}



const conditionalProbabilities2 = (probabilities) => {
  let y = px(probabilities) // p(y)
  let arr = [] // đây là P(x\y)
  let arrStemp = []
  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities.length; j++) {
      let a = probabilities[i][j] / y[j] /// tính giái trị của các P(X1/Y1)
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
    for (let j = 0; j < probabilities.length; j++) {
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

function mutualInformation(probabilities) {
  let mutualInformation = 0;
  let y = py(probabilities)
  let p = conditionalProbabilities(probabilities)

  for (let i = 0; i < probabilities.length; i++) {
    for (let j = 0; j < probabilities.length; j++) {
      mutualInformation +=probabilities[i][j]  * Math.log2(p[i][j] / y[j]);       
    }
   
  }

  return mutualInformation;
}



// Tính và hiển thị các giá trị
console.log("H(X): " + entropyHx(probabilities));
console.log("H(Y): " + entropyHy(probabilities));
console.log("H(X,Y)"+entropyHxy(probabilities));
console.log("H(X | Y): " + conditionalEntropy(probabilities))
console.log("H(y | x): " + conditionalEntropy2(probabilities))
console.log("H(Y) - H(Y | X): " + calculate(probabilities));
console.log("I(X; Y): " + mutualInformation(probabilities));
