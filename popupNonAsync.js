//공용 변수 설정
const popupDataObject = (function () {
  var instance;
  function init() {
    return {
      testValue: [],
      title: {
        value: "",
        valueView: new Uint8Array(),
        valueArray: [[]],
      },
      subTitle: "",
      injectData: {
        value: "",
        constData: "",
        answerData: "",
      },
      editor: "",
    };
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();
var popupData = popupDataObject.getInstance();
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
//popup Header의 요소
const Header = {
  change: document.querySelector(".domChange"),
  save: document.querySelector(".dataSave"),
  load: document.querySelector(".dataLoad"),
  remove: document.querySelector(".dataRemove"),
};
// popup Title의 요소
const Title = {
  input: document.querySelector(".inputTitle"),
  increment: document.querySelector(".increment"),
  decrement: document.querySelector(".decrement"),
};
//select 요소
const selectOption = document.querySelector(".inputSelectOption");
//단원 유형 요소
const subTitle = document.querySelector(".inputSubTitle");
//주입할 데이터 요소
const injectData = document.querySelector("#injectData");
//풀이 라디오 버튼
const answerSelector = document.querySelectorAll(".answerEditorSelector");
//풀이추가 버튼
const addEditor = document.querySelector(".plus");
// Header Dom Change 이벤트
function DOMchange() {}
// Header data save 이벤트
function save() {}
// Header data Load 이벤트
function load() {}
// Header data Remove 이벤트
function remove() {}
// Title Change 이벤트

function getTitleValue({ target }) {
  // popupData.title 초기화
  popupData.title.value = target.value;
  popupData.title.valueArray = [new Uint8Array()];
  popupData.title.valueView = textEncoder.encode(popupData.title.value);
  // 구분자 유니코드 선언
  const delimit = "_".charCodeAt();
  // 각 버퍼 사이즈 정하기
  const bufferSize = getUnit8ArrayLenght(popupData.title.valueView, delimit);
  // 각 인덱스 번호 설정
  let indexBufferSize = 0;
  let indexBufferArray = 0;
  let indexValueArray = 0;
  // 초기 버퍼 사이즈
  let bufferArray = new Uint8Array(
    new ArrayBuffer(bufferSize[indexBufferSize])
  );
  for (const letterCode of popupData.title.valueView) {
    // C에서 컴파일한 함수 _strSplit()
    //_strSplit(int charCode, int delimitCode) -> delimit과 같을때 0 반환
    const strSplitReturnCode = _strSplit(letterCode, delimit);
    if (!strSplitReturnCode) {
      // 데이터 저장
      popupData.title.valueArray[indexValueArray] =
        textDecoder.decode(bufferArray);
      popupData.title.valueArray.push(new Uint8Array());
      // 인덱스 번호 늘리기
      indexValueArray++;
      indexBufferSize++;
      // 버퍼 인덱스 초기화
      indexBufferArray = 0;
      // 버퍼 사이즈 재조정
      bufferArray = new Uint8Array(
        new ArrayBuffer(bufferSize[indexBufferSize])
      );
    } else {
      // 구분자가 아닐때 버퍼에 추가
      bufferArray[indexBufferArray] = letterCode;
      indexBufferArray++;
    }
  }
  // foo_"01" : 여기서 01부분은 위 반복문에서 작동안함 -> 구분자가 뒤에 나올때만 실행하기 떄문 그래서 아래처럼 맨 마지막도 적용하기위해 코드 작성
  popupData.title.valueArray[indexValueArray] = textDecoder.decode(bufferArray);
  // console.log(popupData.title);
}

// function getTitleValue({ target }) {
//   popupData.title.value = target.value;
//   popupData.title.valueView = textEncoder.encode(popupData.title.value);
//   popupData.title.valueArray = getUnit8ArraySplit(
//     popupData.title.valueView,
//     "_",
//     getUnit8ArrayLenght(popupData.title.valueView, "_")
//   );
//   console.log(popupData.title);
// }
// Title Increment 이벤트
// _01 -> +1 씩 추가 (문자열의 마지막 _01 인식)
function increment() {
  popupData.title.valueArray[popupData.title.valueArray.length - 1] =
    _increment(
      Number(popupData.title.valueArray[popupData.title.valueArray.length - 1])
    )
      .toString()
      .padStart(2, "0");
  popupData.title.value = popupData.title.valueArray.join("_");
  Title.input.value = popupData.title.value;
}
// Titl Decrement 이벤트
// _01 -> -1씩 추가 (문자열의 마지막 _01 인식)
function decrement() {
  popupData.title.valueArray[popupData.title.valueArray.length - 1] =
    _decrement(
      Number(popupData.title.valueArray[popupData.title.valueArray.length - 1])
    )
      .toString()
      .padStart(2, "0");
  popupData.title.value = popupData.title.valueArray.join("_");
  Title.input.value = popupData.title.value;
}
// 단웝입력 값 가져오기 subTitle
function getSubTitle({ target }) {
  popupData.subTitle = target.value;
}
// injectData 값 가져오기
function getInjectData({ target }) {
  popupData.injectData.value = target.value;
  console.log();
  console.log(popupData.injectData);
}
// 풀이 추가 이벤트
function apendEditor() {}

// 이벤트 연결
Title.input.addEventListener("change", getTitleValue);
Title.increment.addEventListener("click", increment);
Title.decrement.addEventListener("click", decrement);
subTitle.addEventListener("change", getSubTitle);
injectData.addEventListener("change", getInjectData);
// 기타 기능
//  Unit8Array 타입인 배열 구분자에 따라 길이 반환 (ex: 구분자 "_" 일때 -> ABC_DE -> [3,2] 반환)
function getUnit8ArrayLenght(unit8arrayText, delimitCode) {
  // length 변수의 길이는 split된 개수, 배열 데이터값은 split된 문자열의 길이
  // ex 114,112,123,95,123,111,223,212
  // 구분자가 문자열일때 코드로 변환
  if (typeof delimitCode == "string") {
    delimitCode = delimitCode.charCodeAt();
  }
  let length = [];
  let count = 0;
  let strSplitReturnCode;
  for (const letterCode of unit8arrayText) {
    strSplitReturnCode = _strSplit(letterCode, delimitCode);
    if (!strSplitReturnCode) {
      length.push(count);
      count = 0;
    } else {
      count++;
    }
  }
  length.push(count);
  return length;
}
//2개 이상안됨;;
function getUnit8ArraySplit(unit8arrayText, delimitCode, bufferSize) {
  if (typeof delimitCode == "string") {
    delimitCode = delimitCode.charCodeAt();
  }
  let indexBufferSize = 0;
  let indexBufferArray = 0;
  let indexNewUnit8ArrayText = 0;
  let strSplitReturnCode;
  let bufferArray = new Uint8Array(
    new ArrayBuffer(bufferSize[indexBufferSize])
  );
  let newUnit8ArrayText = [new Uint8Array()];
  for (const letterCode of unit8arrayText) {
    strSplitReturnCode = _strSplit(letterCode, delimitCode);
    if (!strSplitReturnCode) {
      newUnit8ArrayText[indexNewUnit8ArrayText] =
        textDecoder.decode(bufferArray);
      newUnit8ArrayText.push(new Uint8Array());
      bufferArray = new Uint8Array(
        new ArrayBuffer(bufferSize[indexBufferSize])
      );
      indexBufferSize++;
      indexNewUnit8ArrayText++;
      indexBufferArray = 0;
    } else {
      bufferArray[indexBufferArray] = letterCode;
      indexBufferArray++;
    }
  }
  newUnit8ArrayText[indexNewUnit8ArrayText] = textDecoder.decode(bufferArray);
  return newUnit8ArrayText;
}

// var a = textEncoder.encode("가,나,다,라_마,바,사,아");
// var b = getUnit8ArraySplit(a, "_", getUnit8ArrayLenght(a, "_"));
// console.log(
//   getUnit8ArraySplit(
//     textEncoder.encode(b[0]),
//     ",",
//     getUnit8ArrayLenght(textEncoder.encode(b[0]), ",")
//   )
// );
let a = textEncoder.encode("bbbb");
console.log(getUnit8ArraySplit(a, "_", [2, 6]));
