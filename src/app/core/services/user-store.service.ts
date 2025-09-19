import { inject, Injectable, signal } from '@angular/core';
import { User } from '@app/core/interfaces/db.mocks.interface';
import { MocksDbService } from '@app/core/services/mocks-db.service';
import { UtilsService } from '@app/shared/utils/utils.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private _mocksDbService = inject(MocksDbService);
    private _utilsService = inject(UtilsService);

    private _user = signal<User | null>(null);
    user = this._user.asReadonly();

    setUser(user: User) {
        const { password, ...userData } = user;
        const populateUser = {
            ...userData,
            role: this._mocksDbService.roles.find(role => role.id === userData.roleId)!
        }

        localStorage.setItem('currentUser', this._utilsService.encrypt(JSON.stringify(populateUser)));
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
