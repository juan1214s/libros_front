import { environment } from "../../Environments/environments";
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BookDto, CreateBookDto, UpdateBookDto } from '../../Dtos/BookDto/bookDto';
import { catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private readonly _endPoint = environment.booksUrl;
  private readonly _http = inject(HttpClient);
  public token = 'token';
  public books = signal<BookDto[]>([]);

  private GetToken(): string | null {
    return localStorage.getItem(this.token);
  }

  public getBooks(): Observable<BookDto[] | null> {
    return this._http.get<BookDto[]>(this._endPoint)
      .pipe(
        tap((books: BookDto[]) => {
          console.log('Libros obtenidos:', books);
        }),
        catchError((error) => {
          console.error('Error al obtener los libros:', error);
          return of(null); 
        })
      );
  }

  public GetBookById(id: number): Observable<BookDto | null> {
    return this._http.get<BookDto>(`${this._endPoint}/${id}`)
      .pipe(
        tap((book: BookDto) => {
          this.books.set([book]);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error al obtener el libro:', error.message);
          return of(null);
        })
      );
  }

  public CreateBook(book: CreateBookDto): Observable<string> {

    const token = this.GetToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.post<BookDto>(this._endPoint, book, { headers })
      .pipe(
        tap((newBook: BookDto) => {
          this.books.update(books => [...books, newBook]);
        }),
        map(() => 'Libro creado con éxito'),
        catchError((error: HttpErrorResponse) => {
          console.error('Error al crear el libro:', error.message);
          return of('Error al crear el libro'); 
        })
      );
  }
  
  public UpdateBook(id: number, updatedBook: UpdateBookDto): Observable<boolean | null> {
    const token = this.GetToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.put<boolean>(`${this._endPoint}/${id}`, updatedBook, { headers })
      .pipe(
        tap(() => true),
        catchError((error: HttpErrorResponse) => {
          console.error('Error al actualizar el libro:', error.message);
          return of(null); 
        })
      );
  }
  
  public deleteBook(id: number): Observable<any>{
    const token = this.GetToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._http.delete<number>(`${this._endPoint}/${id}`, {headers})
    .pipe(
      catchError(error => {
        console.log(`Ocurrio un error al eliminar el libro.: ${error.message}`)
        throw of(error);
      })
    )
  }
}
