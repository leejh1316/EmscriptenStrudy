//공용 변수 설정
const popupDataObject = (function () {
  var instance;
  function init() {
    return {
      testValue: [],
      title: "",
      subTitle: "",
      injectData: {
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
var popupDatas = popupDataObject.getInstance();
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
const injectConstData = document.querySelector("#constData");
const injectAnswerData = document.querySelector("#answerData");
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
function TitleChange({ target }) {
  const valueView = new Uint8Array(new TextEncoder().encode(target.value));
  for (let index in valueView) {
    if (!_strSplit(valueView[index], "_".charCodeAt())) {
    }
  }
}
// Title Increment 이벤트
// _01 -> +1 씩 추가 (문자열의 마지막 _01 인식)
function increment() {}
// Titl Decrement 이벤트
// _01 -> -1씩 추가 (문자열의 마지막 _01 인식)
function decrement() {}
// 풀이 추가 이벤트
function apendEditor() {}

// 이벤트 연결
Title.input.addEventListener("change", TitleChange);
