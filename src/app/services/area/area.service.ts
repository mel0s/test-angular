import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { IDish } from 'src/app/interfaces/dish';
@Injectable({
    providedIn: 'root'
})
export class AreaService {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = "https://www.themealdb.com/api/json/"
    }

    getAreas(): Observable<IDish[]> {

        var subject = new Subject<IDish[]>();

        this.http.get(`${this.baseUrl}v1/1/list.php?a=list`).subscribe(
            {
                next: (data: any) => {
                    subject.next(data.meals as IDish[]);
                },
                error: (e) => console.error(e),
                complete: () => console.info('complete')
            }
        );

        return subject.asObservable();



    }

}
