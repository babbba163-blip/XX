// 全域儲存答案
let answers = {};

// 顏色循環：紅、橙、黃、綠、青、藍、紫
const colors = ["#FFC0C0","#FFD580","#B0FF80","#80FFD0","#80C0FF","#D580FF"];
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

function createSection11() {
  let container = document.getElementById("surveyContainer");
  
  // 區段容器
  let div = document.createElement("div");
  div.id = "section11";
  div.className = "section";
  div.style.display = "none"; // 預設隱藏
  container.appendChild(div);
  
  // 題目
  let h3 = document.createElement("h3");
  h3.innerText = "Q13-1 請選擇您偏好的方式";
  div.appendChild(h3);

  // 選項按鈕 (這裡不用直接跳下一題，全部選完後用完成按鈕送出)
  const options = [
    {q:"Q13-1", label:"選項1"},
    {q:"Q13-1", label:"選項2"}
  ];
  
  options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt.label;
    btn.style.backgroundColor = colors[colorIndex % colors.length];
    colorIndex++;
    
    btn.onclick = () => {
      answers[opt.q] = opt.label; // 儲存選擇
      // 標記選取樣式
      options.forEach(b => {
        if (b !== opt) {
          b.selectedBtn && (b.selectedBtn.style.border = "");
        }
      });
      btn.style.border = "3px solid black";
      opt.selectedBtn = btn; 
    };
    
    div.appendChild(btn);
  });

  // 完成按鈕
  let finishBtn = document.createElement("button");
  finishBtn.innerText = "完成";
  finishBtn.style.marginTop = "12px";
  finishBtn.style.padding = "8px 20px";
  finishBtn.style.backgroundColor = "#aaa";
  
  finishBtn.onclick = () => {
    // 檢查是否有選
    if (!answers["Q13-1"]) {
      alert("此題為必填，請先選擇一個選項！");
      return;
    }
    // 隱藏當前區段
    div.style.display = "none";
    // 顯示下一個區段（簡答題）
    document.getElementById("section11_2").style.display = "block";
  };
  
  div.appendChild(finishBtn);

  function createSection12() {
  let container = document.getElementById("surveyContainer");

  let div = document.createElement("div");
  div.id = "section12";
  div.className = "section";
  div.style.display = "none";
  container.appendChild(div);

  let h3 = document.createElement("h3");
  h3.innerText = "Q17-1 請選擇您偏好的方式";
  div.appendChild(h3);

  const options = [
    {q:"Q17-1", label:"選項1"},
    {q:"Q17-1", label:"選項2"}
  ];

  options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt.label;
    btn.style.backgroundColor = colors[colorIndex % colors.length];
    colorIndex++;

    btn.onclick = () => {
      answers[opt.q] = opt.label;
      options.forEach(b => {
        if (b !== opt) {
          b.selectedBtn && (b.selectedBtn.style.border = "");
        }
      });
      btn.style.border = "3px solid black";
      opt.selectedBtn = btn; 
    };

    div.appendChild(btn);
  });

  let finishBtn = document.createElement("button");
  finishBtn.innerText = "完成";
  finishBtn.style.marginTop = "12px";
  finishBtn.style.padding = "8px 20px";
  finishBtn.style.backgroundColor = "#aaa";

  finishBtn.onclick = () => {
    if (!answers["Q17-1"]) {
      alert("此題為必填，請先選擇一個選項！");
      return;
    }
    div.style.display = "none";
    document.getElementById("section12_2").style.display = "block"; // 下一簡答區段
  };

  div.appendChild(finishBtn);
}
  
// ----------------------------
// 建立 14 區段問卷（按你的架構）
// ----------------------------


// 第一區段
createButtons("section1","首先，讓我們更認識您！請問您的年齡", [
  {q:"Q1-1", label:"18-29歲", next:"section1_2"},
  {q:"Q1-1", label:"30-44歲", next:"section1_2"},
  {q:"Q1-1", label:"45-64歲", next:"section1_2"},
  {q:"Q1-1", label:"65歲以上", next:"section1_2"}
]);

createButtons("section1_2","接下來，讓我知道您的生活圈", [
  {q:"Q1-2", label:"虎尾鎮", next:"section1_3"},
  {q:"Q1-2", label:"土庫鎮", next:"section1_3"},
  {q:"Q1-2", label:"元長鄉", next:"section1_3"},
  {q:"Q1-2", label:"麥寮鄉", next:"section1_3"},
  {q:"Q1-2", label:"台西鄉", next:"section1_3"},
  {q:"Q1-2", label:"褒忠鄉", next:"section1_3"},
  {q:"Q1-2", label:"四湖鄉", next:"section1_3"},
  {q:"Q1-2", label:"口湖鄉", next:"section1_3"},
  {q:"Q1-2", label:"其他", next:"section1_3"}
]);

createButtons("section1_3","您過去有相關的經驗嗎？", [
  {q:"Q1-3", label:"勞力型", next:"section2"},
  {q:"Q1-3", label:"靜態型", next:"section3"},
  {q:"Q1-3", label:"潛力型 (沒有工作經驗 / 都不太熟悉)", next:"section4"}
]);

// 第二區段
createButtons("section2","承上，您熟悉的是『勞力型』，請問是什麼職業呢?", [
  {q:"Q2-1", label:"粗工", next:"section5"},
  {q:"Q2-1", label:"貨運(送貨)", next:"section5"},
  {q:"Q2-1", label:"園藝修剪", next:"section5"},
  {q:"Q2-1", label:"賣場人員", next:"section5"},
  {q:"Q2-1", label:"不在選項裡", next:"section5"}
]);

// 第三區段
createButtons("section3","承上，您熟悉的是『靜態型』，請問是什麼職業呢?", [
  {q:"Q3-1", label:"行政人員", next:"section4"},
  {q:"Q3-1", label:"會計 / 文書", next:"section4"},
  {q:"Q3-1", label:"門市 / 櫃台", next:"section4"},
  {q:"Q3-1", label:"其他專業技術型", next:"section4"},
  {q:"Q3-1", label:"其他", next:"section4"}
]);

// 第四區段
createButtons("section4","接下來您比較想做什麼？", [
  {q:"Q4-1", label:"做「類似之前的工作」", next:"section5"},
  {q:"Q4-1", label:"想試試「新的工作」", next:"section6"}
]);

// 第五區段
createButtons("section5","可上班時段（可複選）", [
  {q:"Q5-1", label:"日班（08:00–17:00）", next:"section9"},
  {q:"Q5-1", label:"早班（07:00–15:00）", next:"section9"},
  {q:"Q5-1", label:"午晚班（15:00–23:00）", next:"section9"},
  {q:"Q5-1", label:"夜班（23:00–07:00）", next:"section9"},
  {q:"Q5-1", label:"都可以 (或可接受輪班)", next:"section9"}
]);

// 第六區段
createButtons("section6","期望的職類", [
  {q:"Q6-1", label:"勞力型", next:"section7"},
  {q:"Q6-1", label:"靜態型", next:"section10"}
]);

// 第七區段
createButtons("section7","承上，您期望的是『勞力型』，請問是什麼職業呢?", [
  {q:"Q9-1", label:"粗工", next:"section11"},
  {q:"Q9-1", label:"貨運(送貨)", next:"section11"},
  {q:"Q9-1", label:"園藝修剪", next:"section11"},
  {q:"Q9-1", label:"賣場人員", next:"section11"},
  {q:"Q9-1", label:"不在選項裡", next:"section11"}
]);

// 第八區段
createButtons("section8","承上，您期望的是『靜態型』，請問是什麼職業呢?", [
  {q:"Q10-1", label:"行政人員", next:"section11"},
  {q:"Q10-1", label:"會計 / 文書", next:"section11"},
  {q:"Q10-1", label:"門市 / 櫃台", next:"section11"},
  {q:"Q10-1", label:"其他專業技術型", next:"section11"},
  {q:"Q10-1", label:"其他", next:"section11"}
]);

// 第九區段
createButtons("section9","期望的通勤距離", [
  {q:"Q11-1", label:"住家附近", next:"section12"},
  {q:"Q11-1", label:"同鄉鎮", next:"section12"},
  {q:"Q11-1", label:"可跨鄉鎮", next:"section12"}
]);

// 第十區段
createButtons("section10","您希望怎麼接受服務呢?", [
  {q:"Q12-1", label:"直接前往就業中心", next:"section12_2"},
  {q:"Q12-1", label:"預約聯絡", next:"section11_2"}
]);

// ----------------------------
// 第11區段（整合選擇題+簡答題）
// ----------------------------
createSectionWithComplete("section11", [
  {id:"Q13-1", text:"Q13-1 請選擇您偏好的方式", type:"choice", options:[
    {label:"選項1"}, {label:"選項2"}
  ]},
  {id:"Q14-1", text:"Q14-1 請填寫您的想法", type:"input"},
  {id:"Q15-1", text:"Q15-1 補充說明", type:"input"},
  {id:"Q16-1", text:"Q16-1 其他意見", type:"input"}
], "section12");

// ----------------------------
// 第12區段（整合選擇題+簡答題）
// ----------------------------
createSectionWithComplete("section12", [
  {id:"Q17-1", text:"Q17-1 請選擇您偏好的方式", type:"choice", options:[
    {label:"選項1"}, {label:"選項2"}
  ]},
  {id:"Q18-1", text:"Q18-1 請填寫您的想法", type:"input"},
  {id:"Q19-1", text:"Q19-1 補充說明", type:"input"}
], "section13");

// 第十三區段（推薦結果顯示前段）
createButtons("section13","推薦結果", [
  {q:"recommend", label:"查看", next:null}
]);

// ----------------------------
// 送出到 Apps Script
// ----------------------------
function submitAll(){
  fetch("https://script.google.com/macros/s/AKfycbwic8nhb3udn2njA307BkVdelUJOdQQi-gEkTXj8kdLo5yLM_5MIKLHJo21s8caYHa0/exec", {
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
    html += <button id="nextAfterRecommend" style="margin-top:12px; padding:10px 20px;">下一步</button>;
    document.getElementById("result").innerHTML = html;
    document.getElementById("result").style.display = "block";
    document.getElementById("submitBtn").style.display = "none";

    document.getElementById("nextAfterRecommend").onclick = ()=>{
      document.getElementById("result").style.display = "none";
      alert("問卷完成，謝謝您的填寫！");
    };
  });
}
