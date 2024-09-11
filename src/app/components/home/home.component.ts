import { Component, signal } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CardComponent } from "../card/card.component";
import { PersonService } from '../../services/person.service';

interface Person {
  id: number
  name: string
  date_birth: string
  cpf: string
  sex: string
  height: number
  weight: number
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  list = signal<Person[]>([]);

  formatDate(data: string) {
    const date = new Date(data);

    const day = parseInt(String(date.getDate()))+1 > 10 ? parseInt(String(date.getDate()))+1 : `0${date.getDate()}`;
    const month = parseInt(String(date.getMonth())) > 10 ? date.getMonth()+1 : `0${date.getMonth()+1}`;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  formatSex(data: string) {
    return data === 'M' ? 'Masculino' : 'Feminino';
  }

  constructor(private service: PersonService) {
    this.service.getPersons().subscribe(
      {
        next: (data) => {
          this.list.set(data)
        }
      }
    )
  }

  filterPersons($event: Event) {
    const target = $event.target as HTMLInputElement | null;

    if (target) {
      const searchValue = target.value.toLocaleLowerCase();

      this.list.update(list => {
        const filteredList = list.filter(obj =>
          obj.name.toLocaleLowerCase().includes(searchValue)
        );
        return filteredList;
      });

      if (searchValue === '') {
        this.service.getPersons().subscribe(
          {
            next: (data) => {
              this.list.set(data)
            }
          }
        )
      }
    }
  }
}
