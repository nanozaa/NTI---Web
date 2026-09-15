import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TeamMember {
  id: number;
  name: string;
  age: number;
  department: string;
  available: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly departments = ['All Departments', 'Development', 'Marketing', 'Design'];
  readonly teamMembers: TeamMember[] = [
    { id: 1, name: 'Esraa Hassan', age: 24, department: 'Development', available: true },
    { id: 2, name: 'Ahmed Khalil', age: 28, department: 'Marketing', available: false },
    { id: 3, name: 'Mariam Adel', age: 31, department: 'Design', available: true },
    { id: 4, name: 'Omar Nabil', age: 26, department: 'Development', available: true }
  ];

  selectedDepartment = 'All Departments';
  viewMode: 'card' | 'list' = 'card';
  formData = {
    name: '',
    age: null as number | null,
    department: 'Development',
    available: true
  };
  formSubmitted = false;

  get filteredMembers(): TeamMember[] {
    if (this.selectedDepartment === 'All Departments') {
      return this.teamMembers;
    }

    return this.teamMembers.filter((member) => member.department === this.selectedDepartment);
  }

  get availableCount(): number {
    return this.teamMembers.filter((member) => member.available).length;
  }

  addMember(): void {
    this.formSubmitted = true;
    const name = this.formData.name.trim();
    const age = Number(this.formData.age);

    if (!name || !Number.isInteger(age) || age < 18 || age > 100 || !this.formData.department) {
      return;
    }

    this.teamMembers.push({
      id: Date.now(),
      name,
      age,
      department: this.formData.department,
      available: this.formData.available
    });
    this.resetForm();
  }

  toggleAvailability(member: TeamMember): void {
    member.available = !member.available;
  }

  resetForm(): void {
    this.formData = {
      name: '',
      age: null,
      department: 'Development',
      available: true
    };
    this.formSubmitted = false;
  }
}
