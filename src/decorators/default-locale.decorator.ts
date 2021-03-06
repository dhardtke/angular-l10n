import { Subscription } from 'rxjs';

import { LocaleService } from '../services/locale.service';
import { InjectorRef } from '../models/injector-ref';
import { PropertyDecorator } from '../models/types';

/**
 * Property decorator for components to provide the parameter
 * to l10nDate, l10nDecimal, l10nPercent & l10nCurrency pipes.
 */
export function DefaultLocale(): PropertyDecorator {

    function DecoratorFactory(target: any, propertyKey?: string | symbol): void {
        let subscription: Subscription;

        const targetNgOnInit: Function = target.ngOnInit;
        function ngOnInit(this: any): void {
            const locale: LocaleService = InjectorRef.get(LocaleService);

            if (typeof propertyKey !== "undefined") {
                this[propertyKey] = locale.getDefaultLocale();
                // When the default locale changes, subscribes to the event & updates defaultLocale property.
                subscription = locale.defaultLocaleChanged.subscribe(
                    (defaultLocale: string) => {
                        this[propertyKey] = defaultLocale;
                        // OnPush Change Detection strategy.
                        const cdr: string | undefined = Object.keys(this).find((key: string) => this[key] && this[key]['markForCheck'] !== undefined);
                        if (cdr) { this[cdr].markForCheck(); }
                    });
            }

            if (targetNgOnInit) {
                targetNgOnInit.apply(this);
            }
        }
        target.ngOnInit = ngOnInit;

        const targetNgOnDestroy: Function = target.ngOnDestroy;
        function ngOnDestroy(this: any): void {
            if (typeof subscription !== "undefined") {
                subscription.unsubscribe();
            }

            if (targetNgOnDestroy) {
                targetNgOnDestroy.apply(this);
            }
        }
        target.ngOnDestroy = ngOnDestroy;

        if (typeof propertyKey !== "undefined") {
            Object.defineProperty(target, propertyKey, {
                writable: true,
                value: undefined
            });
        }
    }

    return DecoratorFactory;

}
