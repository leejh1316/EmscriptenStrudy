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
        constValue: [],
        dataValue: [],
      },
      editor1Value: "",
      editor2Value: "",
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
var popup = singlePopup.getInstance();
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
// 풀이Wrap
const answerDiv = document.querySelector("#answerDiv");
// 에디터
const editor1 = document.querySelector("#editor1");
const editor2 = document.querySelector("#editor2");
//풀이 라디오 버튼
const answerSelector1 = document.querySelector("#editorSelect1");
const answerSelector2 = document.querySelector("#editorSelect2");
//풀이추가 버튼
// const addEditor = document.querySelector(".plus");
// Header Dom Change 이벤트
function currentWindowDomChange({ popData, injectData }) {
  console.dir(popData);
  console.dir(injectData);
  const allElement = document.querySelectorAll(".form-group"); // 모든 엘리먼트
  const titleElement = allElement[0].querySelector(".input-sm"); //제목
  const subTitleElement = allElement[1].querySelector(".input-sm"); // 단원유형
  const showElement = allElement[2].querySelector(".input-sm"); //보기유형
  const editorElement = allElement[4].querySelector(".editor"); //문항&풀이
  const answerElement = allElement[5].querySelector(".input-sm"); //정답
  titleElement.value = popData.title.value;
  subTitleElement.value = popData.subTitle;
  showElement.value = popData.questionsValue;
  editorElement.value = injectData.text;
  answerElement.value = injectData.answer;
}
function DOMchange() {
  chrome.tabs.query(
    { active: true, url: "https://www.dabisu.com/*" },
    (tab) => {
      console.log(tab);
      chrome.scripting.executeScript({
        target: { tabId: tab[0].id },
        func: currentWindowDomChange,
        args: [
          {
            popData: popup,
            injectData: injection(),
          },
        ],
      });
      increment();
      injectData.value = "";
      popup.injectData.value = injectData.value;
      popup.injectData.constValue = [];
      popup.injectData.dataValue = [];
    }
  );
}
// Header data change 이벤트
function change() {
  injectFun(DOMchange);
}
// Header data save 이벤트
function save() {
  chrome.storage.local.set({
    popDatas: popup,
  });
}
// Header data Load 이벤트
function load() {
  chrome.storage.local.get(["popDatas"], ({ popDatas }) => {
    popup = popDatas;
    Title.input.value = popup.title.value;
    subTitle.value = popup.subTitle;
    selectOption.value = popup.questionsValue;
    editor1.value = popup.editor1Value;
    editor2.value = popup.editor2Value;
  });
}
// Header data Remove 이벤트
function remove() {
  chrome.storage.local.clear();
}
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
    mymod._free(structTitle);
  });
  console.log(popup.title);
}
// Title Increment 이벤트
// _01 -> +1 씩 추가 (문자열의 마지막 _01 인식)
function increment() {
  Module()
    .then((mymod) => {
      const increment = mymod.cwrap("increment", "number", ["number"]);
      popup.title.valueArray[popup.title.valueArray.length - 1] = increment(
        Number(popup.title.valueArray[popup.title.valueArray.length - 1])
      )
        .toString()
        .padStart(2, "0");
    })
    .then(() => {
      popup.title.value = popup.title.valueArray.join("_");
      Title.input.value = popup.title.value;
    });
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
  popup.subTitle = target.value;
}
// 문제유형 값 가져오기
function getSelectValue({ target }) {
  popup.questionsValue = target.value;
}

// editor에 injectData 주입
function injection() {
  // 1번 풀이 활성화
  if (answerSelector1.checked) {
    const editText = injectTool(popup.editor1Value);
    console.log(editText);
    return {
      text: editText,
      answer: popup.injectData.dataValue.join(","),
    };
  }
  // 2번 풀이 활성화
  else if (answerSelector2.checked) {
    const editText = injectTool(popup.editor2Value);
    console.log(editText);
    return {
      text: editText,
      answer: popup.injectData.dataValue.join(","),
    };
  }
}

function injectTool(editText) {
  for (const constVal of popup.injectData.constValue) {
    editText = editText.replace("{c}", `${constVal}`);
  }
  for (const dataVal of popup.injectData.dataValue) {
    editText = editText.replace("{d}", `${dataVal}`);
  }
  return editText;
}

function injectEnterEvent(e) {
  if (e.code == "Enter") {
    injectFun(DOMchange);
  }
}

function getEditor1Value({ target }) {
  popup.editor1Value = target.value;
}
function getEditor2Value({ target }) {
  popup.editor2Value = target.value;
}
// 풀이 추가 이벤트
// function editorAdd() {
//   // 에딧터를 감싸는 div
//   const editorCon = document.createElement("div");
//   editorCon.classList.add("answerContainer");
//   const textArea = document.createElement("textarea");
//   textArea.classList.add("textArea");
//   textArea.placeholder = "풀이 입력";
//   const inputRadio = document.createElement("input");
//   inputRadio.classList.add("answerEditorSelector");
//   inputRadio.type = "radio";
//   inputRadio.name = "answerSelector";
//   const removeBtn = document.createElement("input");
//   removeBtn.classList.add("editorRemoveBtn");
//   removeBtn.type = "button";
//   removeBtn.value = "삭제";
//   removeBtn.addEventListener("click", editorRemove);
//   inputRadio.value = `${answerDiv.childElementCount}`;
//   editorCon.appendChild(textArea);
//   editorCon.appendChild(inputRadio);
//   editorCon.appendChild(removeBtn);
//   answerDiv.appendChild(editorCon);
// }
// function editorRemove({ target }) {
//   target.offsetParent.remove();
// }

Header.change.addEventListener("click", change);
Header.save.addEventListener("click", save);
Header.load.addEventListener("click", load);
Header.remove.addEventListener("click", remove);
Title.input.addEventListener("change", getTitleValue);
Title.increment.addEventListener("click", increment);
Title.decrement.addEventListener("click", decrement);
subTitle.addEventListener("change", getSubTitle);
injectData.addEventListener("keydown", injectEnterEvent);
selectOption.addEventListener("change", getSelectValue);
editor1.addEventListener("change", getEditor1Value);
editor2.addEventListener("change", getEditor2Value);

// addEditor.addEventListener("click", editorAdd);
function cArrayToJS(mymod, value, splitLength) {
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

// injectFun
function injectFun(callback) {
  popup.injectData.value = injectData.value;
  console.log(popup.injectData.value == "");
  if (popup.injectData.value == "") {
    callback();
  } else {
    Module()
      .then((mymod) => {
        const injectSplit = mymod.cwrap("injectStringSplit", "number", [
          "string",
          "string",
          "string",
        ]);
        const structInject = injectSplit(popup.injectData.value, "_", ",");
        const constValue = mymod.getValue(structInject, "i32");
        const dataValue = mymod.getValue(structInject + 4, "i32");
        const constLength = mymod.getValue(structInject + 8, "i32");
        const dataLength = mymod.getValue(structInject + 12, "i32");
        popup.injectData.constValue = cArrayToJS(
          mymod,
          constValue,
          constLength
        );
        popup.injectData.dataValue = cArrayToJS(mymod, dataValue, dataLength);
        mymod._free(structInject);
      })
      .then(() => {
        callback();
      });
  }
}
