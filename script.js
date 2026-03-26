// 全域儲存答案
let answers = {};

// 顏色循環：紅、橙、黃、綠、青、藍、紫
const colors = ["#FFC0C0","#FFD580","#FFFF80","#B0FF80","#80FFD0","#80C0FF","#D580FF"];
let colorIndex = 0;

// 創建按鈕區段
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
      answers[opt.q] = opt.label; // 儲存答案
      div.style.display = "none";
      if(opt.next){
        document.getElementById(opt.next).style.display = "block";
      } else {
        document.getElementById("submitBtn").style.display = "block";
      }
    };
    div.appendChild(btn);
  });

  container.appendChild(div);
}

// 創建簡答題區段
function createInput(sectionId, question, next){
  let container = document.getElementById("surveyContainer");
  let div = document.createElement("div");
  div.id = sectionId;
  div.className = "section";
  div.style.display = "none";

  let h3 = document.createElement("h3");
  h3.innerText = question;
  div.appendChild(h3);

  let input = document.createElement("textarea");
  input.required = true;
  input.rows = 3;
  div.appendChild(input);

  let btn = document.createElement("button");
  btn.innerText = "下一題";
  btn.style.backgroundColor = colors[colorIndex % colors.length];
  colorIndex++;
  btn.onclick = ()=>{
    if(!input.value){
      alert("此題為必填！");
      return;
    }
    answers[sectionId] = input.value;
    div.style.display = "none";
    if(next){
      document.getElementById(next).style.display = "block";
    } else {
      document.getElementById("submitBtn").style.display = "block";
    }
  };
  div.appendChild(btn);

  container.appendChild(div);
}

// ----------------------------
// 建立 14 區段問卷（按你的架構）
// ----------------------------

// 第一區段
createButtons("section1","Q1-1", [
  {q:"Q1-1", label:"A1", next:"section1_2"},
  {q:"Q1-1", label:"A2", next:"section1_2"},
  {q:"Q1-1", label:"A3", next:"section1_2"},
  {q:"Q1-1", label:"A4", next:"section1_2"}
]);

createButtons("section1_2","Q1-2", [
  {q:"Q1-2", label:"B1", next:"section1_3"},
  {q:"Q1-2", label:"B2", next:"section1_3"},
  {q:"Q1-2", label:"B3", next:"section1_3"},
  {q:"Q1-2", label:"B4", next:"section1_3"},
  {q:"Q1-2", label:"B5", next:"section1_3"},
  {q:"Q1-2", label:"B6", next:"section1_3"},
  {q:"Q1-2", label:"B7", next:"section1_3"},
  {q:"Q1-2", label:"B8", next:"section1_3"},
  {q:"Q1-2", label:"B9", next:"section1_3"}
]);

createButtons("section1_3","Q1-3", [
  {q:"Q1-3", label:"C1", next:"section2"},
  {q:"Q1-3", label:"C2", next:"section3"},
  {q:"Q1-3", label:"C3", next:"section4"}
]);

// 第二區段
createButtons("section2","Q2-1", [
  {q:"Q2-1", label:"D1", next:"section5"},
  {q:"Q2-1", label:"D2", next:"section5"},
  {q:"Q2-1", label:"D3", next:"section5"},
  {q:"Q2-1", label:"D4", next:"section5"},
  {q:"Q2-1", label:"D5", next:"section5"}
]);

// 第三區段
createButtons("section3","Q3-1", [
  {q:"Q3-1", label:"E1", next:"section4"},
  {q:"Q3-1", label:"E2", next:"section4"},
  {q:"Q3-1", label:"E3", next:"section4"},
  {q:"Q3-1", label:"E4", next:"section4"},
  {q:"Q3-1", label:"E5", next:"section4"}
]);

// 第四區段
createButtons("section4","Q4-1", [
  {q:"Q4-1", label:"F1", next:"section5"},
  {q:"Q4-1", label:"F2", next:"section6"}
]);

// 第五區段
createButtons("section5","Q5-1", [
  {q:"Q5-1", label:"G1", next:"section9"},
  {q:"Q5-1", label:"G2", next:"section9"},
  {q:"Q5-1", label:"G3", next:"section9"},
  {q:"Q5-1", label:"G4", next:"section9"},
  {q:"Q5-1", label:"G5", next:"section9"}
]);

// 第六區段
createButtons("section6","Q6-1", [
  {q:"Q6-1", label:"H1", next:"section7"},
  {q:"Q6-1", label:"H2", next:"section10"}
]);

// 第七區段
createButtons("section7","Q9-1", [
  {q:"Q9-1", label:"I1", next:"section11"},
  {q:"Q9-1", label:"I2", next:"section11"},
  {q:"Q9-1", label:"I3", next:"section11"},
  {q:"Q9-1", label:"I4", next:"section11"},
  {q:"Q9-1", label:"I5", next:"section11"}
]);

// 第八區段
createButtons("section8","Q10-1", [
  {q:"Q10-1", label:"J1", next:"section11"},
  {q:"Q10-1", label:"J2", next:"section11"},
  {q:"Q10-1", label:"J3", next:"section11"},
  {q:"Q10-1", label:"J4", next:"section11"},
  {q:"Q10-1", label:"J5", next:"section11"}
]);

// 第九區段
createButtons("section9","Q11-1", [
  {q:"Q11-1", label:"K1", next:"section12"},
  {q:"Q11-1", label:"K2", next:"section12"},
  {q:"Q11-1", label:"K3", next:"section12"}
]);

// 第十區段
createButtons("section10","Q12-1", [
  {q:"Q12-1", label:"L1", next:"section12_2"},
  {q:"Q12-1", label:"L2", next:"section11_2"}
]);

// 第十一區段（簡答題）
createInput("section11_2","Q13-1", "section11_3");
createInput("section11_3","Q14-1", "section11_4");
createInput("section11_4","Q15-1", "section11_5");
createInput("section11_5","Q16-1", "section13");

// 第十二區段（簡答題）
createInput("section12_2","Q17-1", "section12_3");
createInput("section12_3","Q18-1", "section12_4");
createInput("section12_4","Q19-1", "section13");

// 第十三區段（推薦結果顯示前段）
createButtons("section13","推薦結果", [
  {q:"recommend", label:"查看", next:null}
]);

// ----------------------------
// 送出到 Apps Script
// ----------------------------
function submitAll(){
  fetch("你的AppsScript網址", {
    method:"POST",
    body: JSON.stringify(answers)
  })
  .then(res=>res.json())
  .then(data=>{
    let html = "<h3>推薦結果</h3>";
    data.forEach(item=>{
      html += `<div>
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
        <a href="${item.link}" target="_blank">查看</a>
      </div>`;
    });

    // 加一個「下一步」按鈕
    html += `<button id="nextAfterRecommend" style="margin-top:12px; padding:10px 20px;">下一步</button>`;
    document.getElementById("result").innerHTML = html;
    document.getElementById("result").style.display = "block";
    document.getElementById("submitBtn").style.display = "none";

    // 綁定按鈕事件
    document.getElementById("nextAfterRecommend").onclick = ()=>{
      document.getElementById("result").style.display = "none";
      // 這裡可以決定下一步要去哪
      // 例如結束問卷就不做事，或開啟下一區段：
      // document.getElementById("section12_2").style.display = "block";
      alert("你可以設定下一區段或結束問卷！");
    };
  });
}
