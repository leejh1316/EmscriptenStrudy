//공용 변수 설정
const popupDataObject = (function () {
  var instance;
  function init() {
    return {
      testValue: [],
      title: {
        value: "",
        valueView: new Uint8Array(),
        valueArray: [new Uint8Array()],
      },
      subTitle: "",
      questionsValue: 201,
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
  popupData.title.value = target.value;
  popupData.title.valueView = textEncoder.encode(popupData.title.value);
  popupData.title.valueArray = getUnit8ArraySplit(
    popupData.title.valueView,
    "_",
    getUnit8ArrayLength(popupData.title.valueView, "_")
  );
  console.log(popupData.title);
}
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
// 문제유형 값 가져오기
function getSelectValue({ target }) {
  popupData.questionsValue = target.value;
  console.log(popupData);
}
// injectData 값 가져오기
function getInjectData({ target }) {
  let viewData = undefined;
  let old = undefined;
  let now = undefined;
  old = new Date().getTime();
  popupData.injectData.value = textEncoder.encode(target.value);
  viewData = getUnit8ArraySplit(
    popupData.injectData.value,
    "_",
    getUnit8ArrayLength(popupData.injectData.value, "_")
  ).map((str) => {
    str = textEncoder.encode(str);
    return getUnit8ArraySplit(str, ",", getUnit8ArrayLength(str, ","));
  });
  console.log(viewData);
  // console.log(popupData.injectData);
  now = new Date().getTime();
  console.log(now - old + "ms");
  viewData = undefined;
  popupData.injectData.value = undefined;
  old = undefined;
  now = undefined;
  old = new Date().getTime();
  popupData.injectData.value = target.value;
  viewData = popupData.injectData.value.split("_").map((str) => {
    return str.split(",");
  });
  console.log(viewData);
  now = new Date().getTime();
  console.log(now - old + "ms");
}
// 풀이 추가 이벤트
function apendEditor() {}

// 이벤트 연결
Title.input.addEventListener("change", getTitleValue);
Title.increment.addEventListener("click", increment);
Title.decrement.addEventListener("click", decrement);
subTitle.addEventListener("change", getSubTitle);
selectOption.addEventListener("change", getSelectValue);
injectData.addEventListener("change", getInjectData);

// 기타 기능
// 사용법 : getUnit8ArrayLength(Encoding된 문장 또는 String, 유니코드값 또는 String 한문자)
// ->반환값 : getUnit8ArrayLength("가나다_라_마바","_") -> return : [3,1,2]
function getUnit8ArrayLength(unit8arrayText, delimitCode) {
  // length 변수의 길이는 split된 개수, 배열 데이터값은 split된 문자열의 길이
  // ex 114,112,123,95,123,111,223,212
  if (!(unit8arrayText instanceof Uint8Array)) {
    unit8arrayText = textEncoder.encode(unit8arrayText);
  }
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
// 사용법 -> getUnit8ArraySplit(Encoding된 Text 또는 String, 문자 또는 유니코드, 구분자 전까지의 문장의 인코딩된 사이즈 크기 정수형 배열)
// 반환 -> getUnit8ArraySplit("abcd_ef_g","_",[4,2,1]) -> return : ["abcd","ef","g"]
// 응용 -> getUnit8ArraySplit("가나,다라_마바_아자,차","_",getUnit8ArrayLength("가나,다라_마바_아자,차","_")).map(str=>{return getUnit8ArraySplit(str,",",getUnit8Arraylength(str,","))})
// 반환 -> [["가나","다라"],["마바"],["아자,차"]];
// JS일땐 그냥 "가나,다라_마바_아자,차".split("_").map((str)=>{return str.split(",")})이면 끝
function getUnit8ArraySplit(unit8arrayText, delimitCode, bufferSize) {
  if (!(unit8arrayText instanceof Uint8Array)) {
    unit8arrayText = textEncoder.encode(unit8arrayText);
  }
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
      indexBufferSize++;
      indexNewUnit8ArrayText++;
      indexBufferArray = 0;
      bufferArray = new Uint8Array(
        new ArrayBuffer(bufferSize[indexBufferSize])
      );
    } else {
      bufferArray[indexBufferArray] = strSplitReturnCode;
      indexBufferArray++;
    }
  }
  newUnit8ArrayText[indexNewUnit8ArrayText] = textDecoder.decode(bufferArray);
  return newUnit8ArrayText;
}

// _strSplit(int charCode, int deliCode) -> charCode == delicode 일때 0 반환, 아닐때 charCode 반환
// _increment(int value) -> return (value+1);
// _decrment(int value) -> return (value-1);
