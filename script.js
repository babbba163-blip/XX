// 全域儲存答案
let answers = {};

// 顏色
const colors = ["#FFC0C0","#FFD580","#B0FF80","#80FFD0","#80C0FF","#D580FF"];
let colorIndex = 0;

// ----------------------------
// 基本選擇題區段
// ----------------------------
function createButtons(sectionId, question, options){
  let container = document.getElementById("surveyContainer");

  let div = document.createElement("div");
  div.id = sectionId;
  div.className = "section";
  div.style.display = (sectionId==="section1") ? "block" : "none";

  let h3 = document.createElement("h3");
  h3.innerText = question;
  div.appendChild(h3);

  let color = colors[colorIndex % colors.length];
  colorIndex++;

  options.forEach(opt=>{
    let btn = document.createElement("button");
    btn.innerText = opt.label;
    btn.style.backgroundColor = color;

    btn.onclick = ()=>{
      answers[opt.q] = opt.label;

      div.style.display = "none";

      // ⭐ 如果有 action，就執行
  if(opt.action){
    opt.action();
    return;
  }

      if(opt.next){
        let nextDiv = document.getElementById(opt.next);
        if(nextDiv) nextDiv.style.display = "block";
      } else {
        document.getElementById("submitBtn").style.display = "block";
      }
    };

    div.appendChild(btn);
  });

  container.appendChild(div);
}

// ----------------------------
// 整合區段（選擇 + 填空 + 完成按鈕）
// ----------------------------
function createSectionWithComplete(sectionId, questions, nextSectionId) {

  const container = document.getElementById("surveyContainer");

  const div = document.createElement("div");
  div.id = sectionId;
  div.className = "section";
  div.style.display = "none";

  container.appendChild(div);

  let questionStates = [];

  questions.forEach(q => {

    let h3 = document.createElement("h3");
    h3.innerText = q.text;
    div.appendChild(h3);

    // 選擇題
    if(q.type === "choice") {

      let answered = false;

      q.options.forEach(opt => {

        let btn = document.createElement("button");
        btn.innerText = opt.label;
        btn.style.backgroundColor = colors[colorIndex % colors.length];

        btn.onclick = () => {
          answers[q.id] = opt.label;
          answered = true;

          // 清除其他選取
          q.options.forEach(o => o.btn && (o.btn.style.border = ""));
          btn.style.border = "3px solid black";
          opt.btn = btn;

          checkComplete();
        };

        div.appendChild(btn);
      });

      questionStates.push(() => answered);
    }

    // 填空題
    if(q.type === "input") {

      let input = document.createElement("textarea");
      input.rows = 3;

      input.oninput = () => {
        answers[q.id] = input.value;
        checkComplete();
      };

      div.appendChild(input);

      questionStates.push(() => input.value.trim() !== "");
    }
  });

  // 完成按鈕
  let finishBtn = document.createElement("button");
  finishBtn.innerText = "完成";
  finishBtn.style.marginTop = "12px";
  finishBtn.style.padding = "10px 20px";
  finishBtn.style.backgroundColor = "#aaa";
  finishBtn.disabled = true;

  div.appendChild(finishBtn);

  function checkComplete() {
    let allDone = questionStates.every(fn => fn());
    finishBtn.disabled = !allDone;
    finishBtn.style.backgroundColor = allDone ? "#88ccff" : "#aaa";
  }

  finishBtn.onclick = () => {
    div.style.display = "none";

    let nextDiv = document.getElementById(nextSectionId);
    if(nextDiv) nextDiv.style.display = "block";
  };
}

function submitAll(){

  console.log("送出資料", answers);

  fetch("https://script.google.com/macros/s/AKfycbwic8nhb3udn2njA307BkVdelUJOdQQi-gEkTXj8kdLo5yLM_5MIKLHJo21s8caYHa0/exec", {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(answers)
  })
  .then(res=>res.text())
  .then(data=>{
    console.log("後端回傳", data);
    alert("已送出");
  })
  .catch(err=>{
    console.error("錯誤", err);
    alert("送出失敗");
  });
}

// ----------------------------
// 問卷流程
// ----------------------------


window.onload = function(){
// 1
createButtons("section1","請問您的年齡", [
  {q:"Q1-1", label:"18-29歲", next:"section1_2"},
  {q:"Q1-1", label:"30-44歲", next:"section1_2"},
  {q:"Q1-1", label:"45-64歲", next:"section1_2"},
  {q:"Q1-1", label:"65歲以上", next:"section1_2"}
]);

createButtons("section1_2","生活圈", [
  {q:"Q1-2", label:"虎尾鎮", next:"section1_3"},
  {q:"Q1-2", label:"土庫鎮", next:"section1_3"},
  {q:"Q1-2", label:"其他", next:"section1_3"}
]);

createButtons("section1_3","工作經驗", [
  {q:"Q1-3", label:"勞力型", next:"section2"},
  {q:"Q1-3", label:"靜態型", next:"section3"},
  {q:"Q1-3", label:"無經驗", next:"section4"}
]);

// 2
createButtons("section2","勞力型職業", [
  {q:"Q2-1", label:"粗工", next:"section5"},
  {q:"Q2-1", label:"貨運", next:"section5"}
]);

// 3
createButtons("section3","靜態型職業", [
  {q:"Q3-1", label:"行政", next:"section4"},
  {q:"Q3-1", label:"門市", next:"section4"}
]);

// 4
createButtons("section4","未來方向", [
  {q:"Q4-1", label:"類似工作", next:"section5"},
  {q:"Q4-1", label:"新工作", next:"section6"}
]);

// 5
createButtons("section5","上班時段", [
  {q:"Q5-1", label:"日班", next:"section9"},
  {q:"Q5-1", label:"夜班", next:"section9"}
]);

// 6
createButtons("section6","職類", [
  {q:"Q6-1", label:"勞力型", next:"section7"},
  {q:"Q6-1", label:"靜態型", next:"section8"}
]);

// 7
createButtons("section7","勞力型選擇", [
  {q:"Q9-1", label:"粗工", next:"section11"},
  {q:"Q9-1", label:"貨運", next:"section11"}
]);

// 8
createButtons("section8","靜態型選擇", [
  {q:"Q10-1", label:"行政", next:"section11"},
  {q:"Q10-1", label:"門市", next:"section11"}
]);

// 9
createButtons("section9","通勤距離", [
  {q:"Q11-1", label:"近", next:"section12"},
  {q:"Q11-1", label:"遠", next:"section12"}
]);

// 10（關鍵修正）
createButtons("section10","服務方式", [
  {q:"Q12-1", label:"現場", next:"section12"},
  {q:"Q12-1", label:"預約", next:"section11"}
]);

// 11
createSectionWithComplete("section11", [
  {id:"Q13-1", text:"偏好方式", type:"choice", options:[
    {label:"選項1"}, {label:"選項2"}
  ]},
  {id:"Q14-1", text:"想法", type:"input"},
  {id:"Q15-1", text:"補充", type:"input"},
  {id:"Q16-1", text:"其他", type:"input"}
], "section12");

// 12
createSectionWithComplete("section12", [
  {id:"Q17-1", text:"偏好方式", type:"choice", options:[
    {label:"選項1"}, {label:"選項2"}
  ]},
  {id:"Q18-1", text:"想法", type:"input"},
  {id:"Q19-1", text:"補充", type:"input"}
], "section13");

createButtons("section13","完成", [
  {
    q:"done",
    label:"送出",
    next:null,
    action: submitAll
  }
]);
};
