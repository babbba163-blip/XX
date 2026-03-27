function doPost(e) {
  try {

    if (!e.postData || !e.postData.contents) {
      throw new Error("沒有收到 POST 資料");
    }

    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(Object.keys(data));
    }

    const row = Object.keys(data).map(k => data[k]);
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({status:"ok"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err){

    return ContentService
      .createTextOutput(JSON.stringify({
        error: err.message,
        raw: e
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
