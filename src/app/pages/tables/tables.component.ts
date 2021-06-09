import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { title } from "process";
import { KQKD } from "src/app/models/KQKD";
import { BusinessService } from "src/app/services/business.service";

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html",
  styleUrls: ["tables.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TablesComponent implements OnInit {
  constructor(private readonly businessService: BusinessService, private readonly router: Router) { }
  mack: string = '';
  html: string;
  title: string;
  isCanslim: boolean = false;
  is4m: boolean = false;
  total: number;
  ngOnInit() {
    this.businessService.currentMessage.subscribe((res) => {
      this.mack = res
    })
    this.getKQKD()
  }

  getKQKD() {
    if (this.mack == null || this.mack == '') {
      this.router.navigate(['dashboard'])
    } else {
      this.businessService.getKQKD(this.mack).subscribe((res) => {
        this.html = res;
        this.title = ' Kết quả kinh doanh'
        this.isCanslim = false
        this.is4m = false
      })
    }

  }

  getCDKT() {
    if (this.mack == null || this.mack == '') {
      this.router.navigate(['dashboard'])
    } else {
      this.businessService.getCDKT(this.mack).subscribe((res) => {
        this.html = res;
        this.title = ' Cân đối kế toán'
        this.isCanslim = false
        this.is4m = false
      })
    }

  }

  getLCTT() {
    if (this.mack == null || this.mack == '') {
      this.router.navigate(['dashboard'])
    } else {
      this.businessService.getLCTT(this.mack).subscribe((res) => {
        this.html = res
        this.title = ' LCTT'
        this.isCanslim = false
        this.is4m = false
      })
    }

  }

  get4m() {
    if (this.mack == null || this.mack == '') {
      this.router.navigate(['dashboard'])
    } else {
      this.businessService.get4M(this.mack).subscribe((res) => {
        this.html = res.html,
          this.title = ' Đánh giá doanh nghiệp theo phương pháp 4M'
        this.isCanslim = false
        this.total = res.total
        this.is4m = true
      })
    }

  }

  getCanslim() {
    if (this.mack == null || this.mack == '') {
      this.router.navigate(['dashboard'])
    } else {
      this.businessService.getCanslim(this.mack).subscribe((res) => {
        this.html = res.html;
        this.total = res.total
        this.isCanslim = true
        this.title = " Đánh giá doanh nghiệp theo phương pháp Canslim"
        this.is4m = false
      })
    }

  }

}
