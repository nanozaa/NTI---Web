import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly auth = inject(AuthService);
  readonly user = this.auth.currentUser;
  readonly saving = signal(false);
  readonly saved = signal(false);
  readonly error = signal('');
  readonly preview = signal<string | null>(null);
  selectedImage: File | null = null;
  profile: User = this.copyUser(this.user());

  chooseImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.selectedImage = file;
    this.saved.set(false);
    const reader = new FileReader();
    reader.onload = () => this.preview.set(String(reader.result));
    reader.readAsDataURL(file);
  }

  imageUrl(): string {
    if (this.preview()) return this.preview() as string;
    if (!this.profile.imageUrl || this.profile.imageUrl === 'default-user.webp') return '/images/dish-fallback.svg';
    return this.profile.imageUrl.startsWith('http') ? this.profile.imageUrl : `/uploads/users/${this.profile.imageUrl}`;
  }

  save(): void {
    this.saving.set(true);
    this.saved.set(false);
    this.error.set('');
    const form = new FormData();
    form.append('firstName', this.profile.firstName);
    form.append('lastName', this.profile.lastName);
    form.append('phone', this.profile.phone || '');
    form.append('street', this.profile.address?.street || '');
    form.append('city', this.profile.address?.city || '');
    form.append('postalCode', this.profile.address?.postalCode || '');
    if (this.selectedImage) form.append('image', this.selectedImage);

    this.auth.updateProfile(form).subscribe({
      next: (response) => {
        this.profile = this.copyUser(response.data.user);
        this.selectedImage = null;
        this.preview.set(null);
        this.saved.set(true);
        this.saving.set(false);
      },
      error: (error: Error) => {
        this.error.set(error.message);
        this.saving.set(false);
      },
    });
  }

  private copyUser(user: User | null): User {
    return {
      _id: user?._id || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      role: user?.role || 'student',
      imageUrl: user?.imageUrl,
      phone: user?.phone,
      address: { ...user?.address },
    };
  }
}
