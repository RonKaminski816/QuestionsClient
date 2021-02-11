import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IQuestionModel } from 'src/app/core/models/question.model';
import { QuestionsService } from '../Services/questions.service';
import { QuestionsStateService } from 'src/app/core/state-managments/questions-state/questions-state.service';
import { SnackbarService } from 'src/app/core/popup-messages/snackbar/snackbar.service';
import { OverlayViewService } from 'src/app/shared/services/overlay-view/overlay-view.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
// import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit, OnChanges {

  questionToDeleteID: string;

  @Input() qTableData: IQuestionModel[];

  @Output() onQuestionActions: EventEmitter<IQuestionModel> = new EventEmitter();

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
    private snackbars: SnackbarService,
    private overlayViewService: OverlayViewService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.qTableData;
  }

  ngOnInit(): void {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter) || data.id.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

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
  }

  deleteQuestion(questionId: string) {
    if (questionId) {
      this.questionsService.deleteQuestion(questionId).subscribe(
        data => {
          this.questionToDeleteID = undefined;
          this.dataSource.data = this.dataSource.data.filter(ques => ques.id !== questionId);
          this.snackbars.openSimpleTextSnackBar(data.message);
          this.questionsState.deleteQuestion(questionId);
        },
        error => this.snackbars.openSimpleTextSnackBar(`${error.message}, please refresh the page and try again if necessary`)
      );
    }

  }

  openDeleteModal(selectedQuestionId: string) {
    this.overlayViewService.overlayIsOpen();
    this.questionToDeleteID = selectedQuestionId;
  }

  closeDeleteModal(event: any) {
    if (event.target.id === "id01" || event.target.id === "cancelDelModal") {
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
