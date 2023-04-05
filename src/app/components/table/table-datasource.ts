import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TableItem {
  name: string;
  email:string;
  celular:number;
  data_de_nascimento:string;
  cidade:string;
  estado:string;
  curso:string;
  instituicao:string;
  situacao:string;
  ano_de_formacao:string
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableItem[] = [
  { name: 'Rafael Gomes Maia Fernandes',
    email:'rafael.maia@isemear.org.br',
    celular:31989072005,
    data_de_nascimento:"25/02/2000",
    cidade:'viçosa',
    estado:"MG",
    curso:"Física",
    instituicao:"Universidade Federal de Viçosa, UFV",
    situacao:'Cursando',
    ano_de_formacao:"2024"},

    { name: 'joão da silva ',
    email:'joão.silva@isemear.org.br',
    celular:31989072001,
    data_de_nascimento:"22/05/2001",
    cidade:'itabira',
    estado:"SP",
    curso:"Musíca",
    instituicao:"Universidade Federal de Ouro Preto, UFV",
    situacao:'Cursando',
    ano_de_formacao:"2026"},

    { name: 'Eduarda Silveira Damasceno e Silva',
    email:'eduarda@isemear.org.br',
    celular:31989072069,
    data_de_nascimento:"24/04/2000",
    cidade:'joão pessoa',
    estado:"CE",
    curso:"História",
    instituicao:"Universidade Federal do Rio de Janeiro, UFV",
    situacao:'Concluído',
    ano_de_formacao:"2022"},

    { name: 'Rafaela Gomes Maia Fernandes',
    email:'rafaela@isemear.org.br',
    celular:31989072652,
    data_de_nascimento:"20/04/2000",
    cidade:'itabira',
    estado:"MG",
    curso:"biologia",
    instituicao:"Universidade Federal de Minas Gerais, UFMG",
    situacao:'concluido',
    ano_de_formacao:"2020"},

    { name: 'ana carolina britto',
    email:'brittocarol@isemear.org.br',
    celular:31989065125,
    data_de_nascimento:"07/004/2000",
    cidade:'salvador',
    estado:"BA",
    curso:"medicina",
    instituicao:"Universidade Federal da Bahia",
    situacao:'Cursando',
    ano_de_formacao:"2023"},

    { name: 'Maia Fernandes',
    email:'maia@isemear.org.br',
    celular:31845672005,
    data_de_nascimento:"02/02/1999",
    cidade:'ipoema',
    estado:"MG",
    curso:"agronomia",
    instituicao:"Universidade Federal de pernambuco",
    situacao:'Cursando',
    ano_de_formacao:"2026"},

    { name: ' Gomes Maia',
    email:'gomes.maia@isemear.org.br',
    celular:31993111700,
    data_de_nascimento:"25/05/2001",
    cidade:'Sao joao del rei',
    estado:"MG",
    curso:"serviço social",
    instituicao:"Universidade Federal de São joão Del Rei, UFSJ",
    situacao:'Concluido',
    ano_de_formacao:"2022"},

    { name: 'Fernanda Silveira',
    email:'fernanda01@isemear.org.br',
    celular:31993114562,
    data_de_nascimento:"18/10/1998",
    cidade:'florianópolis',
    estado:"SC",
    curso:"odontologia",
    instituicao:"Universidade Federal de Santa catarina, UFSC",
    situacao:'Cursando',
    ano_de_formacao:"2025"},

];

/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableDataSource extends DataSource<TableItem> {
  data: TableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableItem[]): TableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableItem[]): TableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'celular': return compare(a.celular, b.celular, isAsc);
        case 'data_de_nascimento': return compare(a.data_de_nascimento, b.data_de_nascimento, isAsc);
        case 'estado': return compare(a.estado, b.estado, isAsc);
        case 'curso': return compare(a.curso, b.curso, isAsc);
        case 'instituicao': return compare(a.instituicao, b.instituicao, isAsc);
        case 'situacao': return compare(a.situacao, b.situacao, isAsc);
        case 'ano_de_formacao': return compare(a.ano_de_formacao, b.ano_de_formacao, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
