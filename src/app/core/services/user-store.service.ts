import { Injectable, signal } from '@angular/core';
import { User } from '@app/core/interfaces/db.mocks.interface';
import { ROLES } from '../mocks/roles.mock';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private _user = signal<User | null>(null);
    user = this._user.asReadonly();

    setUser(user: User) {
        const { password, ...userData } = user;
        const populateUser = {
            ...userData,
            role: ROLES.find(role => role.id === userData.roleId)!
        }
        this._user.set(populateUser);
    }

    clearUser() {
        this._user.set(null);
    }

    updateUser(partial: Partial<User>) {
        const current = this._user();
        const { password, ...partialData } = partial;
        if (current) this._user.set({ ...current, ...partialData });
    }
}
