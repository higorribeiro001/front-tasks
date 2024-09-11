import { Component, input, OnInit, signal } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { InputComponent } from "../input/input.component";
import { PersonService } from '../../services/person.service';
import { ActivatedRoute } from '@angular/router';

interface Inputs {
  label: string
  type: string
  value: string
  error: string
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  title = signal('Cadastro');
  nameButton = signal('Cadastrar');

  name = signal<string>('');
  date_birth = signal<string>('');
  cpf = signal<string>('');
  sex = signal<string>('F');
  height = signal<number>(0);
  weight = signal<number>(0);
  inputs = signal<Inputs[]>([
    {
      label: 'Nome',
      type: 'text',
      value: this.name(),
      error: ''
    },
    {
      label: 'Data de Nascimento',
      type: 'date',
      value: this.date_birth(),
      error: ''
    },
    {
      label: 'CPF',
      type: 'text',
      value: this.cpf(),
      error: ''
    },
    {
      label: 'Sexo',
      type: 'select',
      value: this.sex(),
      error: ''
    },
    {
      label: 'Altura (m)',
      type: 'number',
      value: String(this.height()),
      error: ''
    },
    {
      label: 'Peso (Kg)',
      type: 'number',
      value: String(this.weight()),
      error: ''
    }
  ])

  constructor(private service: PersonService, private route: ActivatedRoute) { }

  id = 0;

  updateInputs() {
    this.inputs.update(inputs => {
      const updatedInputs = [...inputs];
      updatedInputs[0].value = this.name();
      updatedInputs[1].value = this.date_birth();
      updatedInputs[2].value = this.cpf();
      updatedInputs[3].value = this.sex();
      updatedInputs[4].value = String(this.height());
      updatedInputs[5].value = String(this.weight());

      return updatedInputs;
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id !== 0) {
      this.title.set('Edição');
      this.nameButton.set('Editar');

      this.service.getPerson(this.id).subscribe({
        next: (data) => {
          let { name, date_birth, cpf, sex, height, weight } = data
          this.name.set(name);
          this.date_birth.set(date_birth);
          this.cpf.set(cpf);
          this.sex.set(sex);
          this.height.set(height);
          this.weight.set(weight);

          return this.updateInputs();
        },
        error: (err) => {
          alert("ocorreu um erro inesperado.");
          location.href = '/';
        }
      });
    }
  }

  updateTextValue(value: string, label: string) {
    switch (label) {
      case 'Nome':
        this.name.set(value);
        break;
      case 'CPF':
        this.cpf.set(value);
        break;
      case 'Sexo':
        this.sex.set(value);
        break;
      default:
        break;
    }

    return this.updateInputs();
  }

  updateDateValue(value: string, label: string) {
    if (label === 'Data de Nascimento') {
      this.date_birth.set(value);
      return this.updateInputs();
    }
  }

  updateNumberValue(value: string, label: string) {
    const parsedValue = parseFloat(value);

    if (label === 'Altura (m)') {
      this.height.set(parsedValue);
      return this.updateInputs();
    } else if (label === 'Peso (Kg)') {
      this.weight.set(parsedValue);
      return this.updateInputs();
    }
  }

  submitRegister(event: Event) {
    event.preventDefault()

    if (this.name() === '') {
      this.inputs.update(inputs => {
        const updatedInputs = [...inputs];
        updatedInputs[0].error = 'Nome não pode ser vazio';

        return updatedInputs;
      })

      return;
    } else {
      this.inputs.update(inputs => {
        const updatedInputs = [...inputs];
        updatedInputs[0].error = '';

        return updatedInputs;
      })
    }

    if (this.date_birth() === '') {
      this.inputs.update(inputs => {
        const updatedInputs = [...inputs];
        updatedInputs[1].error = 'Data de Nascimento não pode ser vazio';

        return updatedInputs;
      })
      return;
    } else {
      this.inputs.update(inputs => {
        const updatedInputs = [...inputs];
        updatedInputs[1].error = '';

        return updatedInputs;
      })
    }

    if (this.cpf() === '') {
      this.inputs.update(inputs => {
        const updatedInputs = [...inputs];
        updatedInputs[2].error = 'CPF não pode ser vazio';

        return updatedInputs;
      })
      return;
    } else {
      this.inputs.update(inputs => {
        const updatedInputs = [...inputs];
        updatedInputs[2].error = '';

        return updatedInputs;
      })
    }

    if (this.height() === 0) {
      this.inputs.update(inputs => {
        const updatedInputs = [...inputs];
        updatedInputs[4].error = 'Altura não pode ser vazio';

        return updatedInputs;
      })
      return;
    } else {
      this.inputs.update(inputs => {
        const updatedInputs = [...inputs];
        updatedInputs[4].error = '';

        return updatedInputs;
      })
    }

    if (this.weight() === 0) {
      this.inputs.update(inputs => {
        const updatedInputs = [...inputs];
        updatedInputs[5].error = 'Peso não pode ser vazio';

        return updatedInputs;
      })
      return;
    } else {
      this.inputs.update(inputs => {
        const updatedInputs = [...inputs];
        updatedInputs[5].error = '';

        return updatedInputs;
      })
    }

    if (this.title() === 'Cadastro') {
      this.service.createPerson(this.name(), this.date_birth(), this.cpf(), this.sex(), this.height(), this.weight()).subscribe({
        next: () => {
          alert("Pessoa criada com sucesso!");
          location.href = '/';
        },
        error: (err) => {
          alert("Erro ao criar pessoa! Verifique os dados e tente novamente.");
        }
      });
    } else {
      this.service.updatePerson(this.id, this.name(), this.date_birth(), this.cpf(), this.sex(), this.height(), this.weight()).subscribe({
        next: () => {
          alert("Pessoa editar com sucesso!");
          location.href = '/';
        },
        error: (err) => {
          alert("Erro ao editar pessoa! Verifique os dados e tente novamente.");
        }
      });
    }
  }
}


