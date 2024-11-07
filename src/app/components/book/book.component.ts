import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookServiceService } from '../../Services/book/book-service.service';
import { CreateBookDto, UpdateBookDto } from '../../Dtos/BookDto/bookDto';
import { catchError } from 'rxjs';
import { CardBookComponent } from './card-book/card-book.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CardBookComponent, ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export default class BookComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _booksService = inject(BookServiceService);

  books = this._booksService.books;
  public idBook = 0;

  public showModal = false;

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    const modalContent = document.querySelector('.modal-content'); 
    if (modalContent) {
      modalContent.classList.add('fade-out'); 
      setTimeout(() => {
        this.showModal = false;
        location.reload()
      }, 500);
    }
  }
  
  formGroup: FormGroup = this._formBuilder.group({
    title: '',
    author: '',
    publication_year: '',
    status: '',
    user_id: ''
  });
  

  public sendData() {
    const title: string = this.formGroup.get('title')?.value;
    const author: string = this.formGroup.get('author')?.value;
    const publication_year: number = this.formGroup.get('publication_year')?.value;
    const status: string = this.formGroup.get('status')?.value;
    const user_id: number = this.formGroup.get('user_id')?.value;
  
    console.log(title, author, publication_year, status, user_id);  // Verifica los valores capturados
  
    if (!title || !author || !publication_year || !status || !user_id) {
      swal('!Error', 'Todos los campos son necesarios', 'error');
      return;
    }
    
    const bookData: CreateBookDto = {
      title,
      author,
      publication_year,
      status,
      user_id
    };
  
    this._booksService.CreateBook(bookData)
      .pipe(
        catchError((error) => {
          swal('!ERROR', 'Libro no creado', 'error');
          console.error('Error al crear el libro en el componente:', error);
          this.closeModal();
          return [];
        })
      )
      .subscribe((response) => {
        swal('!Exito', 'Se ha creado el libro', 'success');
        this.formGroup.reset();
      });
  }
  

  public DeleteBook(id: number): void{
    this.idBook = id;
    this._booksService.deleteBook(this.idBook)
    .pipe(
      catchError((error) => {
        swal('!ERROR', 'El libro no se ha podido eliminar', 'error');
        console.error(`Error en el servidor ${error.message}`);
        return [];
      })
    )
    .subscribe((response) => {
      swal('!Exito', 'Se ha borrado correctamente el libro', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  public updateBook(id: number): void {
    const title: string = this.formGroup.get('title')?.value;
    const author: string = this.formGroup.get('author')?.value;
    const publication_year: number = this.formGroup.get('yeard')?.value;
    const status: string = this.formGroup.get('status')?.value;
    const user_id: number = this.formGroup.get('user_id')?.value;
  
    if (!title || !author || !publication_year || !status || !user_id) {
      swal('!Error', 'Todos los campos son necesarios', 'error');
      return;
    }
  
    const bookData: UpdateBookDto = {
      title,
      author,
      publication_year,
      status,
      user_id
    };
  
    this._booksService.UpdateBook(id, bookData)
      .pipe(
        catchError((error) => {
          swal('!ERROR', 'Libro no actualizado', 'error');
          console.error('Error al actualizar el libro:', error);
          return [];
        })
      )
      .subscribe((response) => {
        swal('!Exito', 'Libro actualizado correctamente', 'success');
        this.formGroup.reset();
        this.closeModal();
      });
  }
    

}
