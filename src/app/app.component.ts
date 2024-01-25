import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.getData();
  }
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  IsSaveEnable: boolean = false;
  IsAdd: boolean = false;
  position: number = 0;
  name: string = '';
  weight: string = '';
  symbol: string = '';

  getData() {
    this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data.map((items) => {
      items.canEdit = false;
    });
  }

  addData() {
    this.IsAdd = true;
    this.IsSaveEnable = true;
    this.position =
      this.dataSource.data[this.dataSource.data.length - 1].position + 1;
    console.log(this.dataSource.data.length);

    let model: PeriodicElement = {
      position: this.position,
      name: this.name,
      weight: this.weight,
      symbol: this.symbol,
    };
    this.dataSource.data.push(model);
    console.log(this.dataSource.data);

    this.dataSource.data = this.dataSource.data;
    this.dataSource.data.map((items) => {
      if (items.position == this.position) {
        items.canEdit = true;
        items.canSave = this.IsSaveEnable;
      }
    });
  }

  editData(ele: any) {
    this.IsSaveEnable = true;
    this.dataSource.data.map((items) => {
      if (items.position == ele.position) {
        items.canEdit = true;
        items.canSave = this.IsSaveEnable;
      }
    });
    this.position = ele.position;
    this.name = ele.name;
    this.weight = ele.weight;
    this.symbol = ele.symbol;
  }

  deleteData(ele: any) {
    console.log(ele);

    const index = this.dataSource.data.findIndex(
      (items) => items.position == ele.position
    );
    console.log(index);

    this.dataSource.data.splice(index, 1);
    this.dataSource.data = this.dataSource.data;
    console.log(this.dataSource.data);
  }

  onCancel(ele: any) {
    this.IsSaveEnable = false;
    this.dataSource.data.map((items) => {
      if (items.position == ele.position) {
        items.canEdit = false;
        items.canSave = this.IsSaveEnable;
      }
    });
    if (this.IsAdd) {
      const index = this.dataSource.data.findIndex(
        (items) => items.position == ele.position
      );
      console.log(index);

      this.dataSource.data.splice(index, 1);
      this.dataSource.data = this.dataSource.data;
      console.log(this.dataSource.data);
    }
    this.clearData();
  }

  clearData() {
    this.IsAdd = false;
    this.IsSaveEnable = false;
    this.position = 0;
    this.name = '';
    this.symbol = '';
    this.weight = '';
    this.dataSource.data.map((items) => {
      items.canEdit = false;
      items.canSave = this.IsSaveEnable;
    });
  }

  onSave(ele: any) {
    this.IsSaveEnable = false;
    this.dataSource.data.map((items) => {
      if (items.position == ele.position) {
        items.canEdit = false;
        items.name = this.name;
        items.weight = this.weight;
        items.symbol = this.symbol;
      }
    });
    this.clearData();
  }
}
