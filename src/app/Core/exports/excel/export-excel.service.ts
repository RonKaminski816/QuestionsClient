import { Injectable } from '@angular/core';
import { Anchor, Cell, IAnchor, Image, Row, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor() { }

  // createPDF() {

  //   const title = 'Car Sell Report';
  //   const title2 = 'Ron Sell Report';
  //   const header = ["Year", "Month", "Make", "Model", "Quantity", "Pct"]
  //   const data = [
  //     [2007, 1, "Volkswagen ", "Volkswagen Volkswagen Volkswaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaagen Volkswagen Volkswagen Volkswagen Passat", 1267, 10],
  //     [2007, 1, "asdasdsadaasdsadsa asdsadsa sdsadsaasd ", " Rav4", 819, 6.5],

  //   ];

  //   const fillColor = (cell: Cell, params) => {
  //     cell.fill = {
  //       type: 'pattern',
  //       pattern: 'solid',
  //       ...params
  //     }
  //   }

  //   const alignCell = (cell: Cell, params) => {
  //     cell.alignment = {
  //       ...params
  //     }
  //   }

  //   const wrapText = (cell: Cell, params) => {
  //     cell.alignment = {
  //       ...cell.alignment,
  //       ...params
  //     }
  //   }

  //   const cellBorder = (cell: Cell, params) => {
  //     cell.border = {
  //       ...params,
  //     }
  //   }

  //   const fontCell = (cell: Cell, params) => {
  //     cell.font = {
  //       ...params
  //     }
  //   }

  //   let workbook = new Workbook();
  //   let worksheet1 = workbook.addWorksheet('Car Data');
  //   let worksheet2 = workbook.addWorksheet('Ron Data');//v

  //   let titleRow = this.addRow(worksheet1, [title]);
  //   let titleRow2 = this.addRow(worksheet2, [title2]);
  //   const titleRowCallback = [
  //     { func: fontCell, params: { bold: true, underline: 'double' } }
  //   ];
  //   this.styleRow(titleRow, titleRowCallback);

  //   this.mergeCells(worksheet1, 'B1:D1');
  //   this.mergeCells(worksheet2, 'B1:F4');


  //   // worksheet2.mergeCells(4, 11, 12, 13);

  //   // Blank Row
  //   worksheet1.addRow([]);
  //   this.mergeCells(worksheet2, 'B7:F8')

  //   const headerRowCallback = [
  //     { func: fillColor, params: { fgColor: { argb: 'FFFFFF00' }, bgColor: { argb: 'FF0000FF' } } }
  //   ];

  //   //Add Header Row
  //   let headerRow = this.addRow(worksheet1, header)
  //   // Cell Style : Fill and Border
  //   this.styleRow(headerRow, headerRowCallback);

  //   // Add Data and Conditional Formatting
  //   this.addData(worksheet1, data);

  //   this.makeColumFitText(worksheet1);

  //   // examples on how to use each function
  //   const callbackArr = [
  //     { func: fillColor, params: { fgColor: { argb: 'FF99FF99' } } },
  //     { func: alignCell, params: { horizontal: 'center', vertical: 'middle' } },
  //     { func: wrapText, params: { wrapText: true } },
  //     {
  //       func: cellBorder, params: {
  //         top: { style: 'thin', color: { argb: 'A9A9A9' } }, left: { style: 'mediumDashDotDot' },
  //         bottom: { style: 'dotted' }, right: { style: 'thick' }
  //       }
  //     },
  //     { func: fontCell, params: { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true } }
  //   ];

  //   this.styleRange(worksheet1, "B3", "Z10", callbackArr);

  //   this.saveAsXLSX(workbook, 'test');

  // }

  // // when you need yo head multi lines at once one after the other
  // addData(ws: Worksheet, data: any[][]) {
  //   data.forEach(x => {
  //     let r = this.addRow(ws, x);
  //   });
  // }

  // // when you need to add a singal row (i.e headr)
  // addRow(ws: Worksheet, data: any[]) {
  //   return ws.addRow(data);
  // }

  // saveAsXLSX(wb: Workbook, fileName: string) {
  //   wb.xlsx.writeBuffer().then((data) => {
  //     let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     fs.saveAs(blob, `${fileName}.xlsx`);
  //   });
  // }

  // async addImage(wb: Workbook, ws: Worksheet, base64: string, placement: string) {
  //   let logo = wb.addImage({
  //     base64: base64,
  //     extension: 'png',
  //   });

  //   // const logo2 = wb.addImage({
  //   //   buffer: fs.readFile('/assets/images/BBLogo.svg'),
  //   //   extension: 'png',
  //   // });

  //   // const pngBase64 = this.ConvertAnyImageSrcToPNGBase64(base64);

  //   // let logo3 = wb.addImage({
  //   //   base64: pngBase64,
  //   //   extension: 'png',
  //   // });

  //   ws.addImage(logo, placement);
  //   // ws.addImage(logo, {
  //   //   tl: { col: col, row: row },
  //   //   ext: { width: width, height: height },
  //   //   editAs: 'oneCell'
  //   // });

  //   // await this.getImageDimensions(base64).then(x => {
  //   //   ws.addImage(logo, {
  //   //     tl: { col: 0, row: 0 },
  //   //     ext: { width: x.w, height: x.h },
  //   //   });
  //   // });

  //   // let image = new Image();
  //   // image.src = base64
  //   // image.onload = function () {
  //   //   const width = image.width
  //   //   const height = image.height
  //   //   ws.addImage(logo, {
  //   //     tl: { col: 0, row: 0 },
  //   //     ext: { width: width, height: height },
  //   //   });
  //   // };
  // }


  // async getImageDimensions(file): Promise<any> {
  //   return await new Promise(function (resolved, rejected) {
  //     var i = new Image()
  //     i.onload = function () {
  //       resolved({ w: i.width, h: i.height })
  //     };
  //     i.src = file
  //   })
  // }

  // // placement will be in the format like so 'A1:B3'
  // mergeCells(ws: Worksheet, placement: string) {
  //   ws.mergeCells(placement)
  // }

  // // fill one cell in color
  // fillCellWithColor(argb: string, cell: Cell) {
  //   cell.fill = {
  //     type: 'pattern',
  //     pattern: 'solid',
  //     fgColor: { argb: argb }
  //   }
  // }

  // alignCell(cell: Cell, vertical: 'top' | 'middle' | 'bottom' | 'distributed' | 'justify',
  //   horizontal: 'left' | 'center' | 'right' | 'fill' | 'justify' | 'centerContinuous' | 'distributed') {
  //   cell.alignment = { vertical: vertical, horizontal: horizontal, wrapText: true }
  // }

  // alignAllCells(ws: Worksheet, vertical: 'top' | 'middle' | 'bottom' | 'distributed' | 'justify',
  //   horizontal: 'left' | 'center' | 'right' | 'fill' | 'justify' | 'centerContinuous' | 'distributed') {
  //   for (let i = 0; i < ws.columns.length; i++) {
  //     const column = ws.columns[i];
  //     column.style = { alignment: { vertical: vertical, horizontal: horizontal } }
  //   }
  // }

  // wrapTextInACell(cell: Cell) {
  //   cell.alignment = { wrapText: true }
  // }

  // wrapTextInAllCells(ws: Worksheet) {
  //   for (let i = 0; i < ws.columns.length; i++) {
  //     const column = ws.columns[i];
  //     column.style = { alignment: { wrapText: true } }
  //   }
  // }

  // // make colum with as big as the longest text in a cell
  // makeColumFitText(ws: Worksheet) {
  //   const defaultWidth = 13;
  //   const maxWidth = 80;
  //   let width = defaultWidth;

  //   ws.columns.forEach(column => {
  //     const col = column;
  //     col.values.forEach(columnValue => {
  //       const colVal = columnValue;
  //       if (typeof (colVal) != 'undefined' && colVal !== null) {
  //         const colLength = colVal.toString().length;
  //         if (colLength > width) {
  //           width = colLength;
  //           if (width > maxWidth) {
  //             width = maxWidth
  //           }
  //         }
  //       }
  //     });
  //     // set width
  //     column.width = width;
  //     // reset width back to default for the next column
  //     width = defaultWidth;
  //   });
  // }

  // // works only for columns from A to Z
  // // callback is a function that will receive cell and do whatever you what to be applied on the range
  // styleRange(ws: Worksheet, fromCell: string, toCell: string, callback: any[]) {

  //   const firstRowNumber = fromCell.replace(/^\D+/g, '');
  //   const lastRowNumber = toCell.replace(/^\D+/g, '');

  //   const firstColumnNumberIndex = fromCell.indexOf(firstRowNumber);
  //   const lastColumnNumberIndex = toCell.indexOf(lastRowNumber);

  //   const firstColumnChar = fromCell.substring(0, firstColumnNumberIndex);
  //   const lastColumnChar = toCell.substring(0, lastColumnNumberIndex)

  //   // gets the column char by the range
  //   const arr = this.range(firstColumnChar, lastColumnChar);

  //   // final cell keys array (i.e A1,A2,B1,B2....)
  //   const cellKeys = this.createCellArr(arr, Number.parseInt(firstRowNumber), Number.parseInt(lastRowNumber));

  //   cellKeys.map(key => {
  //     callback.forEach((x) => {
  //       x.func(ws.getCell(key), x.params);
  //     })
  //   });
  // }

  // // when you have the row ref ad you want to style it
  // // pass callback array with the format of {func,params}
  // styleRow(row: Row, callback: any[]) {
  //   row.eachCell((cell, number) => {
  //     this.styleCell(cell, callback);
  //   });
  // }

  // // style a singal cell by callback array
  // // pass callback array with the format of {func,params}
  // styleCell(cell: Cell, callback: any[]) {
  //   callback.forEach(x => {
  //     x.func(cell, x.params);
  //   });
  // }

  // // creates arr of cells by getting the column array (i.e ["A","B","C"...]) and the first row and the last row
  // createCellArr(columnArr: string[], firstRow: number, lastRow: number): string[] {
  //   let tempArr: string[] = [];
  //   for (let i = 0; i < columnArr.length; i++) {
  //     const element = columnArr[i];
  //     for (let j = firstRow; j <= lastRow; j++) {
  //       tempArr.push(element + j);
  //     }
  //   }
  //   return tempArr;
  // }

  // // returns char arr range from 2 chars from the ABC
  // // got it from https://stackoverflow.com/a/12377023
  // range(start, stop) {
  //   let result = [];
  //   for (let idx = start.charCodeAt(0), end = stop.charCodeAt(0); idx <= end; ++idx) {
  //     result.push(String.fromCharCode(idx));
  //   }
  //   return result;
  // };
}
