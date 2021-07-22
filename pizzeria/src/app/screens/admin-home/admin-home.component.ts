import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';


// Get the Pizza Service Right Here
import { PizzaService, Pizza } from 'src/app/services/pizza.service';

// The Error Component
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  providers: [PizzaService],
})
export class AdminHomeComponent implements OnInit, AfterViewInit {
  isloading = false;

  search_keyword = '';
  // For the Table
  displayedColumns: string[] = ['name', "price"];

  dataSource = new MatTableDataSource<Pizza>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private pservice: PizzaService,
    private dialog: MatDialog,
    private router: Router,
    ) { }
    
  ngOnInit(): void {
    this.isloading = true;
    // Fetch the Pizzas Right Here
    this.pservice.getPizzas()
    .then(pizza_array=>{
      this.isloading = false;
      this.dataSource.data = pizza_array
    })
    .catch(err=>{
      this.isloading = false;
      this.dialog.open(ErrorMessageComponent, {data: {message:err.message?err.message:'Failed to fetch Pizzas'}})
    })
  }
    
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
    
  searchPizzas(){
    const keyword = this.search_keyword.trim().toLowerCase();
    this.dataSource.filter = keyword
  }
  
  rowClicked(pizza: Pizza){
    // console.log("the Pizza: ", pizza);
    this.router.navigate(['add-pizza'], {state:{pizza}});
  }
}
