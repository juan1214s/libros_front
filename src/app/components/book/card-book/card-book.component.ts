import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { BookDto } from '../../../Dtos/BookDto/bookDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-book.component.html',
  styleUrl: './card-book.component.css'
})
export class CardBookComponent {
    book = input.required<BookDto>();

    @Output() sendIdBook = new EventEmitter<number>();

    stateButton = signal<boolean>(false);

    public DeleteBookSignal(id: number){
      this.sendIdBook.emit(id);
    
    }

}
