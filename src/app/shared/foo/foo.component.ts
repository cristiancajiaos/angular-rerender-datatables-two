import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.scss']
})
export class FooComponent implements OnInit {
  /* Tabs */
  active = 1;

  /* Datatable */
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger: Subject<unknown> = new Subject();

  pagingMethods = [
    'numbers', 'simple', 'simple_numbers', 'full', 'full_numbers', 'first_last_numbers'
  ];

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      ajax: "assets/data/data.json",
      columns: [
        {
          title: "ID",
          data: "id",
        },
        {
          title: "First Name",
          data: "firstName",
        },
        {
          title: "Last name",
          data: "lastName",
        },
      ],
      paging: true,
      searching: true,
      info: true,
      lengthChange: true,
      lengthMenu: [5, 10, 15],
      pagingType: "simple_numbers",
      language: {
        aria: {
          paginate: {
            first: "Primero",
            last: "Ultimo",
            next: "Siguiente",
            previous: "Previo",
          },
          sortAscending: "Activar para ordenar la tabla en orden ascendente",
          sortDescending: "Activar para ordenar la tabla en orden descendente",
        },
        paginate: {
          first: 'Primero',
          last: 'Último',
          next: 'Siguiente',
          previous: 'Anterior'
        },
        emptyTable: '',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ resultados',
        infoEmpty: 'No se muestra ningún elemento',
        infoFiltered: '(filtrado de _MAX_ resultados)',
        lengthMenu: 'Mostrar _MENU_ resultados',
        loadingRecords: 'Cargando registros...',
        processing: 'Proesando...',
        search: 'Buscar:',
        searchPlaceholder: 'Filtrar',
        zeroRecords: 'No hay registros'
      },
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
