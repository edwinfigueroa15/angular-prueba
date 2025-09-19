import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilsService } from '@app/shared/utils/utils.service';
import { UserStoreService } from '@app/core/services/user-store.service';

@Injectable({
	providedIn: 'root'
})
export class PermissionsGuard implements CanActivate {
	private _utilsService = inject(UtilsService)
	private _userStoreService = inject(UserStoreService);

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const permissions = this._userStoreService.user()?.role!.permissions;
		if(permissions?.includes(state.url)) return true;
        
        this._utilsService.routerLink('/pages/home', { replaceUrl: true })
		return false;
	}
}