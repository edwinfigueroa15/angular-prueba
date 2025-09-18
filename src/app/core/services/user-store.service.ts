import { Injectable, signal } from '@angular/core';
import { User } from '@app/core/interfaces/db.mocks.interface';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private _user = signal<User | null>(null);
    user = this._user.asReadonly();

    setUser(user: User) {
        this._user.set(user);
    }

    clearUser() {
        this._user.set(null);
    }

    updateUser(partial: Partial<User>) {
        const current = this._user();
        if (current) this._user.set({ ...current, ...partial });
    }
}
