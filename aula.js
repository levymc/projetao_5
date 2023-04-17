//Programa ai!
const indexOf = (array, num) => {
  let check = false;
  let indice;
  for (i=0; i<array.length; i++){
    console.log(array[i])
    if (num == array[i]){
     check = true;
     indice = i;
    }
  }
  if (check){
    return indice
  }else{
    return -1
  }
}

console.log(indexOf([2, 1, 3, 6, 4, 5], 5))