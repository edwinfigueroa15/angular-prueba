import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilsService } from '@app/shared/utils/utils.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	private _utilsService = inject(UtilsService);

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
		const currentUser = localStorage.getItem('currentUser') || null;
		if (currentUser) {
			const user = JSON.parse(this._utilsService.decrypt(currentUser));
			if(user.email) return true;
			this._utilsService.routerLink('/auth', { replaceUrl: true })
			return false;
		} else {
			this._utilsService.routerLink('/auth', { replaceUrl: true })
			return false;
		}
	}
}