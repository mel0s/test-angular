import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Subject, Observable } from 'rxjs';

@Component({
    selector: 'base-page',
    templateUrl: './base-page.component.html',
    styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit, OnDestroy {
    constructor(
        public httpSv: HttpService
    ) { }

    ngOnInit() {
    }

    ngOnDestroy() { }

    getData(url: string, dataName: string): Observable<any[]> {

        var subject = new Subject<any[]>();

        this.httpSv.getData(url).subscribe(
            {
                next: (data) => {
                    subject.next(data);
                },
                error: (e) => console.error(e),
                complete: () => console.info('complete')
            }
        );

        return subject.asObservable();


    }

}
