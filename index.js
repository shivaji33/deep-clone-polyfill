// Import stylesheets
import './style.css';
import _ from 'lodash';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;


// V1
const obj = {
  // deep clone test,
  value: 'some text',
  obj: {
    browser: 'chrome',
    id: 899
  },
  fn() {
    return 'Sanyasinaidu';
  },
  map: new Map([['name', 'Sanyasinaidu'], ['dob', '10-07-1997']]),
  set: new Set([1,2,3,4,4,6,0,0]),
  error: new Error('Test'),
  arr: [{
    1: [new Date(), new Error('arr'), new Set([0,'v', 1,1,'b','v']),new Map([['name', 'Shivaji'], ['dob', '29-07-1996']])],
    2: [{
      pilla() {
        return 'Pilla';
      },
      map: new Map([['name', 'pilla'], ['dob', '10-07-1997']]),
      set: new Set(['a', 'b', 'b','a', 'c']),
      error: new Error('Eeee'),
      name: 'mutate',
      file: [new File(["foo"], "foo.txt", {
        type: "text/plain",
      })]
    }],
    3: {name: 'Hi', id: 8}
  }]
}

const deep = _.cloneDeep(obj);
const customDeep = deepClone(obj);
console.log({ obj, deep, customDeep }, 'test');
obj.arr[0]['2'][0].name = 'changed' ;

function deepClone(data) {
  if (data === null || typeof data !== 'object') {
    return data;
  }
  const {res, isUpdated} = specialDataTypes(data);
  
  if (!isUpdated) {
    if (typeof data === 'object') {
      return cloneObject(data);
    } else if (Array.isArray(data)) {
      return cloneArray(data);
    } else {
      return data;
    }
  } 
  return res;
}



function cloneObject(obj) {
  const newObj = {};
  for (let key in obj) {
    const value = obj[key];
    const {res, isUpdated} = specialDataTypes(value);
    if (!isUpdated) {
      if(Array.isArray(value))  {
        newObj[key] = cloneArray(value);
      } else if (typeof value === 'object') {
        newObj[key] = cloneObject(value);
      } else {
        newObj[key] = value;
      }
    } else {
      newObj[key] = res;
    }
  }
  return newObj;
}

function specialDataTypes(value) {
  let result;
  if (value instanceof Set) {
    result = new Set(value);
  } else if (value instanceof Map) {
    result = new Map(value);
  } else if (value instanceof RegExp) {
    result = new RegExp(value);
  } else if (value instanceof Date) {
    result = new Date(value);
  } else if (value instanceof File) {
    result = new File([value], value.name, { type: value.type });
  } else if (value instanceof Error) {
    result = new Error(value);
  }
  return result ? {res: result, isUpdated: true} : {res: value};
}

function cloneArray(arr) {
  const result = [];
  arr.forEach((elm, i) => {
    const {res, isUpdated} = specialDataTypes(elm);
    if (!isUpdated) {
      if (Array.isArray(elm)) {
        result[i] = cloneArray(elm);
      } else if (typeof elm === 'object') {
        result[i] = cloneObject(elm);
      } else {
        result[i] = elm;
      }
    } else {
      result[i] = res;
    }
  });
  return result;
}
