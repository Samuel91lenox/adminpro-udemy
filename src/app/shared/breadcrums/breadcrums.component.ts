import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  pagina:string = '';

  constructor(private router: Router,public _title:Title,public _meta:Meta) {
   
    this.getDataRoute().subscribe(data => {
        // console.log(data);
        this.pagina=data.titulo;
        this._title.setTitle(this.pagina);

        let metaTag:MetaDefinition={
          name: 'description',
          content: this.pagina
        };
        this._meta.updateTag(metaTag);
    });
   }

     getDataRoute(){
      return this.router.events
      .filter(event=>event instanceof ActivationEnd)
      .filter((event:ActivationEnd)=>event.snapshot.firstChild===null)
      .map((event:ActivationEnd) => event.snapshot.data);
     }




  ngOnInit() {
  }

}
