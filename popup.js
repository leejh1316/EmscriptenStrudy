//공용 변수 설정
const singletonObject = (function () {
  var instance;
  function init() {
    return {
      testValue: [],
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
var singleton = singletonObject.getInstance();
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
const injectData = document.querySelector(".inputInjectionData");
//풀이 라디오 버튼
const answerSelector = document.querySelectorAll(".amswerSelector");
//풀이추가 버튼
const addEditor = document.querySelector(".plus");
// Title Increment 이벤트
// _01 -> +1 씩 추가 (문자열의 마지막 _01 인식)
function increment() {}
// Titl Decrement 이벤트
// _01 -> -1씩 추가 (문자열의 마지막 _01 인식)
function decrement() {}

async function fn(callback) {
  let text = "My_Name_Is_Son";
  let deli = "_";
  let encoder = new TextEncoder();
  let deliView = new Uint8Array(encoder.encode(deli));
  let view = new Uint8Array(encoder.encode(text));
  for (let i = 0; i < view.length; i++) {
    // bool = await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(_strSplit(view[i], deliView));
    //   }, 7);
    // });
    singleton.testValue.push(
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(_strSplit(view[i], deliView));
        }, 10);
      })
    );
  }
  callback();
}
// fn(call);
