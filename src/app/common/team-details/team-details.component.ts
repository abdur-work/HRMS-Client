import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserContextService } from '../../services/user-context.service';
import { TeamDetailsService } from './team-details.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})

export class TeamDetailsComponent {
  showCandidateApplicationslist: any = [];
  config_pgShowJob = {
    id: "pg_showJob",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  };
  // @Input() rating: number = 0;
  maxRating: number = 5;
  Performancestar: any[];
  Punctualitystar:any=[]
  Performancerating: number = 0;
  Punctualityrating: number = 0;
  teamMembers: any[] = [];
  modalObject: any = {};
  averageRating: number | null = null;

  constructor(private currentRoute: Router, private route: ActivatedRoute, private toastrService: ToastrService, private teamDetailsService: TeamDetailsService,
    private spinnerService: NgxSpinnerService, private userContextService: UserContextService  ) {
    this.Performancestar = Array(this.maxRating).fill(0).map((x, i) => i + 1);
    this.Punctualitystar = Array(this.maxRating).fill(0).map((x, i) => i + 1);
    this.route.queryParams.subscribe(params => {
      if (params && params["teamMembers"]) {
        const decodedData = atob(params["teamMembers"]);
        this.teamMembers = JSON.parse(decodedData);
      }
    });
  }

  gobackToEmployees() {
    this.currentRoute.navigate(['/dashboard'])
  }

  openModal(obj: any) {
    this.modalObject = obj;
  }

  calculateAverageRating() {
    if (this.Performancerating >= 1 && this.Performancerating <= 5 &&
      this.Punctualityrating >= 1 && this.Punctualityrating <= 5) {
      const averageRating = (this.Performancerating + this.Punctualityrating) / 2;
      const ratingData = {
        EmployeeID: this.modalObject.employeeId,
        CompanyId: this.userContextService.user$._value.companyID,
        PerformanceRating: this.Performancerating,
        PunctualityRating: this.Punctualityrating,
        AverageRating: averageRating,
        RatingDate: new Date(),
        IsNewRated: true,
        RateByCriteria: this.modalObject.payType
      };
      this.spinnerService.show();
      this.teamDetailsService.CalculateAverageRating(ratingData).subscribe(data => {
        if (data.status) {
          this.toastrService.success('Average Rating: ' + averageRating);
          // Reset the ratings for the next calculation
          this.Performancerating = 0;
          this.Punctualityrating = 0;
        }
        this.spinnerService.hide();
      });
    }
    else {
      this.toastrService.error('Please enter valid ratings between 1 and 5.');
    }
  }
}
