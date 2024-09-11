import { Component, Input } from '@angular/core';
import { PersonService } from '../../services/person.service';

interface IdealWeight {
  user: string,
  ideal_weight: number
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() date_birth: string = '';
  @Input() cpf: string = '';
  @Input() sex: string = '';
  @Input() height: number = 0;
  @Input() weight: number = 0;
  @Input() onDelete: () => void = () => {};

  idealWeight = 0;

  constructor(private service: PersonService) { }

  edit() {
    location.href = `/editar/${this.id}`
  }

  deletePerson(id: number) {
    this.service.deletePerson(id).subscribe({
      next: () => {
        alert("Pessoa removida com sucesso!");
        location.reload();
      },
      error: (err) => {
        alert("Erro ao remover pessoa!");
      }
    });
  }

  getIdealWeight(id: number) {
    this.service.getIdealWeight(id).subscribe({
      next: (data: IdealWeight) => {
        this.idealWeight = data.ideal_weight;
        this.name = data.user;

        alert(`O peso ideal para ${this.name} é: ${this.idealWeight.toFixed(2)}`);
      },
      error: () => {
        alert("Erro inesperado. Tente novamente.");
      }
    });
  }
}
