import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IQuestionModel } from 'src/app/shared/models/iquestion.model';
import { QuestionsService } from 'src/app/core/http/questions/questions.service';
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';

import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';
import { OverlayViewService } from 'src/app/shared/services/overlay-view/overlay-view.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
// import { MatDialog } from '@angular/material/dialog';

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'
// import { ExportExcelService } from 'src/app/core/exports/excel/export-excel.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, OnChanges {

  // private jspdf: jsPDF;

  questionToDeleteID: string;

  @Input() qTableData: IQuestionModel[];

  @Output() onQuestionActions: EventEmitter<IQuestionModel> = new EventEmitter();

  @Output() onDeleteQuestion: EventEmitter<string> = new EventEmitter();

  dataSource = new MatTableDataSource<IQuestionModel>();
  columnsToDisplay: string[] = ['id', 'name', 'creationDate', 'edit-btns'];

  selectedColumn: string;
  sortingColumns = [{ key: "name", title: 'Name' }, { key: "creationDate", title: 'Creation Date' }];

  /**While using @viewChild we are basically declaring a reference
  * to a son element that is inside the current component,
  *can not give it a string and then it will look for the selector or object a
  *nyway Angular will look for the first match and I will win.

  *In this case we want to search for viewChild of type MatSort
  *when the event "getAllQuestions().Subscribe" invokes so we
  *actually have access to the variable and we initialize the
  *sort property of the dataSource of our table.
  */
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // public dialog: MatDialog,
  constructor(
    private questionsService: QuestionsService,
    private questionsState: QuestionsStateService,
    /**The store Type is a description of the different parts we have in the store.
     * here the type should be a JS object where we have a 'questionsState' key (it has
     * to be the name I chose as a key of the JS object inside the forRoot() in app.module).
     * And the type of the data stored in that questionsState area is now not the reducer function
     * but what does the reducer finction yields(מניב). It yields a state of the type of the JS object of the state.*/
    // private store: Store<fromApp.IAppState>,
    //   private jspdf: jsPDF,
    private overlayViewService: OverlayViewService,
    // private exportToExcel: ExportExcelService,
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = [...this.qTableData];
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.id.toLowerCase().includes(filter);
    };

    // this.jspdf.
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  exportPDF() {
    // pdf = new jsPDF();
    // pdf.text("Hello world!", 10, 10);
    // pdf.save();

    const pdf = new jsPDF({
      unit: "px",
    });

    autoTable(pdf, {
      margin: { top: 30 },
      rowPageBreak: 'avoid',
      head: [['id', 'name', 'creationDate', 'description']],
      headStyles: { fontStyle: "bold" },
      //body:
      html: '#questionsTable',
      columnStyles: { 3: { cellWidth: 50 }, 0: { fontStyle: "bold", cellWidth: 15, textColor: "black" } }
    },
    )

    let numOfPages = pdf.getNumberOfPages();

    for (let i = 0; i <= numOfPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(16);
      pdf.text(`Questions - page ${i} of ${numOfPages}`, 45, 15)
    }
    pdf.save("Questions.pdf");
  }

  openQuestionActions(question?: IQuestionModel) {
    this.onQuestionActions.emit(question);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortTableByKey(key: string) {
    this.dataSource.sort = this.sort;
    const sortState: Sort = { active: key, direction: 'asc' }; //Set the sort properties object
    this.dataSource.sort.active = sortState.active;//Set the single column that is active to sorting at the datasource
    this.dataSource.sort.direction = sortState.direction;//Set the direction of sorting in the datasource
    this.dataSource.sort.sortChange.emit(sortState);//Datasource Invoke the sorting operation

    // const tempList = [...this.dataSource.data];
    // if (key === 'creationDate')
    //   tempList.map(q => q.creationDate = new Date(q.creationDate));
    // const sortedList = tempList.sort(qa => qa[key]);
    // this.dataSource.data = [...sortedList];
  }

  deleteQuestion(questionId: string) {
    if (questionId) {
      // this.questionsService.deleteQuestion(questionId).subscribe(
      //   data => {
      //     this.dataSource.data = this.dataSource.data.filter(ques => ques.id !== questionId);
      //     this.snackbars.openSimpleTextSnackBar(data.message);
      //     this.questionToDeleteID = undefined;
      //     this.onDeleteQuestion.emit(questionId);
      //   },
      //   error => this.snackbars.openSimpleTextSnackBar(`${error.message}, please refresh the page and try again if necessary`)
      // );
      this.onDeleteQuestion.emit(questionId);
    }
  }


  ExportExcel(){

  }

  openDeleteModal(selectedQuestionId: string) {
    this.overlayViewService.overlayIsOpen();
    this.questionToDeleteID = selectedQuestionId;
  }

  /**Since the modal container <div> has the (click)="closeDeleteModal($event)" the function will
        work on every clicked element inside this modal container <div>.The function check what is the
        id of the clicked target to know if to close the modal or not,so I don't have to call
        the (click)="closeDeleteModal($event)" again inside a children element, but inside the function
        (in the .ts) just check the element by it's id if it can close the modal or not. */
  closeDeleteModal(event: any) {
    if (event.target.id === "id01" || event.target.id === "cancelDelModal" || event.target.id === "confirmDelModal") {
      this.overlayViewService.overlayIsClose()
      this.questionToDeleteID = undefined;
    }
  }
}

// @Component({
//   selector: 'dialog-elements-dialog',
//   template: `<h1 mat-dialog-title>Delete</h1>
//   <div mat-dialog-content>Are you sure you to delete question {{data.qId}}?</div>
//   <div mat-dialog-actions content="end">
//   <button class="btn-dialog can" (click)="confirmDelete()" mat-dialog-close>Cancel</button>

//   <button class="btn-dialog del" (click)="confirmDelete(true)" mat-dialog-close cdkFocusInitial>Yes</button>
// </div>`,
//   styleUrls: ['./questions-list.component.css']
// })
// export class DialogElementsDialog {
//   constructor(
//     public dialogRef: MatDialogRef<DialogElementsDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: { qId: string }) { }

//   confirmDelete(confirmDelete?: boolean) {
//     this.dialogRef.close(confirmDelete);
//   }
// }
