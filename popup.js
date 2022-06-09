import Module from "./Module/module.js";
//공용 변수 설정
const singlePopup = (function () {
  var instance;
  function init() {
    return {
      title: {
        value: "",
        valueArray: [],
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
const popup = singlePopup.getInstance();
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
  popup.title.value = target.value;
  Module().then((mymod) => {
    const titleSplit = mymod.cwrap("titleSplit", "number", [
      "string",
      "string",
    ]);
    var structTitle = titleSplit(popup.title.value, "_");
    var titleValue = mymod.getValue(structTitle, "i32");
    var splitLength = mymod.getValue(structTitle + 4, "i32");
    popup.title.valueArray = cArrayToJS(mymod, titleValue, splitLength);
  });
}
// Title Increment 이벤트
// _01 -> +1 씩 추가 (문자열의 마지막 _01 인식)
function increment() {
  Module().then((mymod) => {
    const increment = mymod.cwrap("increment", "number", ["number"]);
    popup.title.valueArray[popup.title.valueArray.length - 1] = increment(
      Number(popup.title.valueArray[popup.title.valueArray.length - 1])
    )
      .toString()
      .padStart(2, "0");
  });
  popup.title.value = popup.title.valueArray.join("_");
  Title.input.value = popup.title.value;
}
// Titl Decrement 이벤트
// _01 -> -1씩 추가 (문자열의 마지막 _01 인식)
function decrement() {
  Module().then((mymod) => {
    const decrement = mymod.cwrap("decrement", "number", ["number"]);
    popup.title.valueArray[popup.title.valueArray.length - 1] = decrement(
      Number(popup.title.valueArray[popup.title.valueArray.length - 1])
    )
      .toString()
      .padStart(2, "0");
    popup.title.value = popup.title.valueArray.join("_");
    Title.input.value = popup.title.value;
  });
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
function getInjectData({ target }) {}
// 풀이 추가 이벤트
function apendEditor() {}

// 이벤트 연결
Title.input.addEventListener("change", getTitleValue);
Title.increment.addEventListener("click", increment);
Title.decrement.addEventListener("click", decrement);

function cArrayToJS(mymod, value, splitLength) {
  // mymod = Module, pValue ->struct.pValue
  let arr = [];
  let lenSplit = mymod.lengthBytesUTF8(mymod.UTF8ToString(value)) + 1;
  for (let i = 0; i < splitLength; i++) {
    if (i == 0) {
      arr.push(mymod.UTF8ToString(value));
    } else {
      arr.push(mymod.UTF8ToString(value + lenSplit));
      lenSplit +=
        mymod.lengthBytesUTF8(mymod.UTF8ToString(value + lenSplit)) + 1;
    }
  }
  return arr;
}
