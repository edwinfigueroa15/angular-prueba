import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilsService } from '@app/shared/utils/utils.service';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    private _utilsService = inject(UtilsService);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const currentUser = localStorage.getItem('currentUser') || null;
		if (currentUser) {
			const user = JSON.parse(this._utilsService.decrypt(currentUser));
			if(user.email) {
                this._utilsService.routerLink('/pages', { replaceUrl: true });
                return false;
            }
			return true;
		} else {
			return true;
		}
    }

}
