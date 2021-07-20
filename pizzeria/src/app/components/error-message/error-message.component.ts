import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

interface ErrorMessage{
  message: string
}
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  // Simple Info Component so that I do not have create One on every single page that needs one
  constructor(
    // private dialogRef: MatDialogRef<ErrorMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public text: ErrorMessage
  ) { }

  ngOnInit(): void {
  }

}
