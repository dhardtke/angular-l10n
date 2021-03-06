/* tslint:disable */
import { TestBed, ComponentFixture, fakeAsync, async, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
    TranslateDirective,
    L10nConfig,
    L10nLoader,
    TranslationModule,
    LocaleService,
    StorageStrategy
} from '../../src/angular-l10n';

import { TranslateComponent } from '../utils';

describe('TranslateDirective', () => {
    describe('Methods', () => {

        let comp: TranslateComponent;
        let fixture: ComponentFixture<TranslateComponent>;
        let des: DebugElement[];
        let els: HTMLElement[] = [];

        let l10nLoader: L10nLoader;
        let locale: LocaleService;

        const translationEN: any = {
            "Title": "Angular localization",
            "Subtitle": "It's a small world",
            "User notifications": "{{ user }}, you have {{ NoMessages }} new messages",
            "Insert": "Insert",
            "Select": "Select",
            "Strong title": "<strong>Angular localization</strong>",
            "Strong subtitle": "<strong>It's a small world</strong>"
        };
        const translationIT: any = {
            "Title": "Localizzazione in Angular",
            "Subtitle": "Il mondo è piccolo",
            "User notifications": "{{ user }}, tu hai {{ NoMessages }} nuovi messaggi",
            "Insert": "Inserisci",
            "Select": "Seleziona",
            "Strong title": "<strong>Localizzazione in Angular</strong>",
            "Strong subtitle": "<strong>Il mondo è piccolo</strong>"
        };

        const l10nConfig: L10nConfig = {
            locale: {
                languages: [
                    { code: 'en', dir: 'ltr' },
                    { code: 'it', dir: 'ltr' }
                ],
                language: 'en',
                storage: StorageStrategy.Disabled
            },
            translation: {
                translationData: [
                    { languageCode: 'en', data: translationEN },
                    { languageCode: 'it', data: translationIT }
                ]
            }
        };

        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                declarations: [TranslateComponent],
                imports: [
                    HttpClientTestingModule,
                    TranslationModule.forRoot(l10nConfig)
                ]
            }).createComponent(TranslateComponent);

            comp = fixture.componentInstance;
        });

        beforeEach((done) => {
            l10nLoader = TestBed.get(L10nLoader);
            locale = TestBed.get(LocaleService);

            l10nLoader.load().then(() => done());
        });

        beforeEach(() => {
            locale.setCurrentLanguage('en');

            fixture.detectChanges();
            des = fixture.debugElement.queryAll(By.directive(TranslateDirective));
            for (let i: number = 0; i < des.length; i++) {
                els.push(des[i].nativeElement);
            }
        });

        it('should render translated text & trim spaces', (() => {
            expect(els[0].textContent).toContain("Angular localization");
        }));

        it('should render translated text using parameters', (() => {
            expect(els[1].textContent).toContain("robisim74, you have 2 new messages");
        }));

        it('should search the key', (() => {
            expect(els[2].textContent).toContain("It's a small world");
            expect(els[3].textContent).toContain("Angular localization");
            expect(els[4].textContent).toContain("It's a small world");
            expect(els[5].textContent).toContain("Angular localization");
            expect(els[6].textContent).toContain("Angular localization");
        }));

        it('should use value attribute', (() => {
            expect(els[7].getAttribute('value')).toContain("Insert");
        }));

        it('should not use value attribute', (() => {
            expect(els[8].textContent).toContain("Select");
        }));

        it('should use innerHTML attribute', (() => {
            expect(els[9].textContent).toContain("Angular localization");
            expect(els[9].childNodes[0].nodeName.toLowerCase()).toBe("strong");
        }));

        it('should render translated attributes', (() => {
            expect(els[10].getAttribute('title')).toContain("Angular localization");
            expect(els[11].getAttribute('title')).toContain("robisim74, you have 2 new messages");
            expect(els[12].getAttribute('title')).toContain("Angular localization");
            expect(els[13].textContent).toContain("robisim74, you have 2 new messages");
        }));

    });

    describe('Changing language', () => {

        let comp: TranslateComponent;
        let fixture: ComponentFixture<TranslateComponent>;
        let des: DebugElement[];
        let els: HTMLElement[] = [];

        let l10nLoader: L10nLoader;
        let locale: LocaleService;

        const translationEN: any = {
            "Title": "Angular localization",
            "Subtitle": "It's a small world",
            "User notifications": "{{ user }}, you have {{ NoMessages }} new messages",
            "Insert": "Insert",
            "Select": "Select",
            "Strong title": "<strong>Angular localization</strong>",
            "Strong subtitle": "<strong>It's a small world</strong>"
        };
        const translationIT: any = {
            "Title": "Localizzazione in Angular",
            "Subtitle": "Il mondo è piccolo",
            "User notifications": "{{ user }}, tu hai {{ NoMessages }} nuovi messaggi",
            "Insert": "Inserisci",
            "Select": "Seleziona",
            "Strong title": "<strong>Localizzazione in Angular</strong>",
            "Strong subtitle": "<strong>Il mondo è piccolo</strong>"
        };

        const l10nConfig: L10nConfig = {
            locale: {
                languages: [
                    { code: 'en', dir: 'ltr' },
                    { code: 'it', dir: 'ltr' }
                ],
                language: 'en',
                storage: StorageStrategy.Disabled
            },
            translation: {
                translationData: [
                    { languageCode: 'en', data: translationEN },
                    { languageCode: 'it', data: translationIT }
                ]
            }
        };

        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                declarations: [TranslateComponent],
                imports: [
                    HttpClientTestingModule,
                    TranslationModule.forRoot(l10nConfig)
                ]
            }).createComponent(TranslateComponent);

            comp = fixture.componentInstance;
        });

        beforeEach((done) => {
            l10nLoader = TestBed.get(L10nLoader);
            locale = TestBed.get(LocaleService);

            l10nLoader.load().then(() => done());
        });

        beforeEach(() => {
            locale.setCurrentLanguage('en');

            fixture.detectChanges();
            des = fixture.debugElement.queryAll(By.directive(TranslateDirective));
            for (let i: number = 0; i < des.length; i++) {
                els.push(des[i].nativeElement);
            }
        });

        it('should render translated texts when language changes', fakeAsync(() => {
            locale.setCurrentLanguage('it');

            tick();
            fixture.detectChanges();
            els = [];
            for (let i: number = 0; i < des.length; i++) {
                els.push(des[i].nativeElement);
            }

            expect(els[0].textContent).toContain("Localizzazione in Angular");
            expect(els[1].textContent).toContain("robisim74, tu hai 2 nuovi messaggi");
            expect(els[2].textContent).toContain("Il mondo è piccolo");
            expect(els[3].textContent).toContain("Localizzazione in Angular");
            expect(els[4].textContent).toContain("Il mondo è piccolo");
            expect(els[5].textContent).toContain("Localizzazione in Angular");
            expect(els[6].textContent).toContain("Localizzazione in Angular");
            expect(els[7].getAttribute('value')).toContain("Inserisci");
            expect(els[8].textContent).toContain("Seleziona");
            expect(els[9].textContent).toContain("Localizzazione in Angular");
            expect(els[9].childNodes[0].nodeName.toLowerCase()).toBe("strong");
            expect(els[10].getAttribute('title')).toContain("Localizzazione in Angular");
            expect(els[11].getAttribute('title')).toContain("robisim74, tu hai 2 nuovi messaggi");
            expect(els[12].getAttribute('title')).toContain("Localizzazione in Angular");
            expect(els[13].textContent).toContain("robisim74, tu hai 2 nuovi messaggi");
        }));

    });

    describe('Changing dynamically', () => {

        let comp: TranslateComponent;
        let fixture: ComponentFixture<TranslateComponent>;
        let des: DebugElement[];
        let els: HTMLElement[] = [];

        let l10nLoader: L10nLoader;
        let locale: LocaleService;

        const translationEN: any = {
            "Title": "Angular localization",
            "Subtitle": "It's a small world",
            "User notifications": "{{ user }}, you have {{ NoMessages }} new messages",
            "Insert": "Insert",
            "Select": "Select",
            "Strong title": "<strong>Angular localization</strong>",
            "Strong subtitle": "<strong>It's a small world</strong>"
        };
        const translationIT: any = {
            "Title": "Localizzazione in Angular",
            "Subtitle": "Il mondo è piccolo",
            "User notifications": "{{ user }}, tu hai {{ NoMessages }} nuovi messaggi",
            "Insert": "Inserisci",
            "Select": "Seleziona",
            "Strong title": "<strong>Localizzazione in Angular</strong>",
            "Strong subtitle": "<strong>Il mondo è piccolo</strong>"
        };

        const l10nConfig: L10nConfig = {
            locale: {
                languages: [
                    { code: 'en', dir: 'ltr' },
                    { code: 'it', dir: 'ltr' }
                ],
                language: 'en',
                storage: StorageStrategy.Disabled
            },
            translation: {
                translationData: [
                    { languageCode: 'en', data: translationEN },
                    { languageCode: 'it', data: translationIT }
                ]
            }
        };

        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                declarations: [TranslateComponent],
                imports: [
                    HttpClientTestingModule,
                    TranslationModule.forRoot(l10nConfig)
                ]
            }).createComponent(TranslateComponent);

            comp = fixture.componentInstance;
        });

        beforeEach((done) => {
            l10nLoader = TestBed.get(L10nLoader);
            locale = TestBed.get(LocaleService);

            l10nLoader.load().then(() => done());
        });

        beforeEach(() => {
            locale.setCurrentLanguage('en');

            fixture.detectChanges();
            des = fixture.debugElement.queryAll(By.directive(TranslateDirective));
            for (let i: number = 0; i < des.length; i++) {
                els.push(des[i].nativeElement);
            }
        });

        it('should change keys & params dynamically', async(() => {
            comp.change();

            fixture.detectChanges();
            els = [];
            for (let i: number = 0; i < des.length; i++) {
                els.push(des[i].nativeElement);
            }
            fixture.whenStable().then(() => {
                // By using process.nextTick() we guarantee that it runs after MutationObserver event is fired.
                process.nextTick(() => {
                    expect(els[0].textContent).toContain("It's a small world");
                    expect(els[1].textContent).toContain("robisim74, you have 3 new messages");
                    expect(els[7].getAttribute('value')).toContain("Select");
                    expect(els[9].textContent).toContain("It's a small world");
                    expect(els[9].childNodes[0].nodeName.toLowerCase()).toBe('strong');
                    expect(els[11].getAttribute('title')).toContain("robisim74, you have 3 new messages");
                    expect(els[13].textContent).toContain("robisim74, you have 3 new messages");
                });
            });
        }));

    });

});
