import { Component, EventEmitter, Inject, Injector, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditPostJobService } from '../edit-post-job/edit-post-job.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Output() closed = new EventEmitter();
  selectedEmployeeId: number=0;
  employeeRatingRqst: any = {};
  employees = [
    { id: 1, name: 'John Doe', position: 'Manager' },
    { id: 2, name: 'Jane Smith', position: 'Developer' },
    { id: 3, name: 'Tom Johnson', position: 'Designer' },
    { id: 4, name: 'Emily Brown', position: 'HR' },
    // Add more employees as needed
  ];
  constructor(private spinnerService: NgxSpinnerService, private editCompanyProfileService: EditPostJobService,
    private toastrService: ToastrService, @Inject('data') public data: any, private injector: Injector){
this.employeeRatingRqst.employee=0
  }

  closeEditPostJob() {
    this.closed.emit(false);
  }

  onRate(rating: number) {
    this.employeeRatingRqst.selectedRating = rating;
  }
  employeeRatingSave(){
    console.log("ratingsave",this.employeeRatingRqst)
  }
  
}
