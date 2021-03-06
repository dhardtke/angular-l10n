/* tslint:disable */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {
    L10nDecimalPipe,
    L10nPercentPipe,
    L10nCurrencyPipe,
    L10nConfig,
    L10nLoader,
    LocalizationModule,
    LocaleService,
    StorageStrategy
} from '../../src/angular-l10n';

describe('L10n number pipes', () => {

    let l10nLoader: L10nLoader;
    let locale: LocaleService;

    const l10nConfig: L10nConfig = {
        locale: {
            defaultLocale: { languageCode: 'en', countryCode: 'US' },
            currency: 'USD',
            storage: StorageStrategy.Disabled
        }
    };

    beforeEach((done) => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                LocalizationModule.forRoot(l10nConfig)
            ]
        });

        l10nLoader = TestBed.get(L10nLoader);
        locale = TestBed.get(LocaleService);

        l10nLoader.load().then(() => done());
    });

    describe('L10nDecimalPipe', () => {

        const pipe: L10nDecimalPipe = new L10nDecimalPipe();

        it('should localize a decimal number', () => {
            expect(pipe.transform(1234.5, locale.getDefaultLocale(), '1.2-2')).toEqual('1,234.50');

            locale.setDefaultLocale('it', 'IT');
            expect(pipe.transform(1234.5, locale.getDefaultLocale(), '1.2-2')).toEqual('1.234,50');
        });

    });

    describe('L10nPercentPipe', () => {

        const pipe: L10nPercentPipe = new L10nPercentPipe();

        it('should localize a percent number', () => {
            expect(pipe.transform(1.23, locale.getDefaultLocale(), '1.0-0')).toEqual('123%');

            locale.setDefaultLocale('it', 'IT');
            expect(pipe.transform(1.23, locale.getDefaultLocale(), '1.0-0')).toEqual('123%');
        });

    });

    describe('L10nCurrencyPipe', () => {

        const pipe: L10nCurrencyPipe = new L10nCurrencyPipe();

        it('should localize a currency', () => {
            expect(pipe.transform(
                1234.5,
                locale.getDefaultLocale(),
                locale.getCurrentCurrency(),
                'symbol',
                '1.2-2')
            ).toEqual('$1,234.50');

            locale.setDefaultLocale('it', 'IT');
            locale.setCurrentCurrency('EUR');

            let value: string | null = pipe.transform(
                1234.5,
                locale.getDefaultLocale(),
                locale.getCurrentCurrency(),
                'symbol',
                '1.2-2'
            );
            if (!!value) {
                value = value.replace(/\u00A0/, " "); // Intl returns Unicode Character 'NO-BREAK SPACE' (U+00A0).
            }
            expect(value).toEqual('1.234,50 €');
        });

    });

});
