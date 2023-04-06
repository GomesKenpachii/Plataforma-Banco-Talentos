import { DataSource } from '@angular/cdk/collections';
import {Component} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ViewChild } from '@angular/core'
import {MatSort, Sort} from '@angular/material/sort';
import * as _ from 'lodash';
import {LiveAnnouncer} from '@angular/cdk/a11y';



export interface dados {
    name: string,
    email:string,
    celular:number,
    data_de_nascimento:string,
    cidade:string,
    estado:string,
    curso:string,
    instituicao:string,
    situacao:string,
    ano_de_formacao:string
}
const dados: dados[] = [
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



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})


export class TableComponent {
  displayedColumns: string[] = ['name', 'email', 'celular', 'data_de_nascimento', 'cidade', 'estado', 'curso', 'instituicao', 'situacao', 'ano_de_formacao'];
  dataSource = new MatTableDataSource(dados);
  filterdata: any = []
  cidades: any = []
  estados:any = []
  instituicoes:any = []
  cursos:any = []

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit() {
    this.filterdata = dados
    this.cidades = dados.map((item:any)=> item['cidade'])
    this.estados = dados.map((item:any)=> item['estado'])
    this.instituicoes = dados.map((item:any)=> item['instituicao'])
    this.cursos = dados.map((item:any)=> item['curso'])
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
    announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  
  curso($event: any) {
    const filtercurso = _.filter(this.filterdata,(item) =>{
    return item.curso.toLowerCase() == $event.value.toLowerCase()
    
  })
      this.dataSource = new MatTableDataSource(filtercurso)
  }

  faculdade($event: any) {
    const filterfaculdade = _.filter(this.filterdata,(item) =>{
    return item.instituicao.toLowerCase() == $event.value.toLowerCase()
    
  })
      this.dataSource = new MatTableDataSource(filterfaculdade)
  }

  cidade($event: any) {
    const filtercidade = _.filter(this.filterdata,(item) =>{
    return item.cidade.toLowerCase() == $event.value.toLowerCase()
    
  })
      this.dataSource = new MatTableDataSource(filtercidade)
  }

  estado($event: any) {
    const filterestado = _.filter(this.filterdata,(item) =>{
    return item.estado.toLowerCase() == $event.value.toLowerCase()
    
  })
      this.dataSource = new MatTableDataSource(filterestado)
  }

  limpar($event:any){
    this.dataSource = new MatTableDataSource(this.filterdata)
    console.log("Limpou")
  }
}