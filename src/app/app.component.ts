import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Currency {
  CurrencyCode: string;
  Kod: string;
  BanknoteSelling: number;
  CrossOrder: number;
  ForexSelling: number;
  BanknoteBuying: number;
  Unit: number;
  Isim: string;
  ForexBuying: number;
  CrossRateOther: string;
  CurrencyName: string;
  CrossRateUSD: string;
}

interface ApiResponse {
  Tarih_Date: {
    Currency: Currency[];
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  maxDate: Date; // maxDate değişkeni
  data:any;
  showData:boolean;
  userInput: string = "";

  constructor(private datePipe:DatePipe, private http: HttpClient,private dataService: DataService,private snackBar: MatSnackBar) {
    this.maxDate = new Date(); // En son güncel tarihi al
    this.showData = false;

  }

  submit(): void {
    console.log("Submit butonuna basıldı.");
    const formattedDate = this.datePipe.transform(this.userInput, 'yyyyMMdd');



    if(formattedDate)
    {

      this.dataService.getExchangeRates(formattedDate).subscribe(
        data => {
          this.showData = true;

          console.log(data); // Alınan verileri konsola yazdırabilirsiniz
          this.data =data
        },
        error => {
          console.error('Hata:', error);
          this.showSnackBar('You have selected a weekend or a public holiday. There is no current data. Please select a new date.', 'Close');
        })
    }
    else
    {
      this.showSnackBar('Please Enter a Date.', 'Close');

    }




  }
  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });}
}
