import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';


@Injectable()
export class AppSettingsService {
  
  // Translation
  private static FALLBACK_LANGUAGE   = 'de';
  private static CURRENT_LANGUAGE    = '';
  private static AVAILABLE_LANGUAGES = ['de', 'en'];
  
  // Routes
  private static DEFAULT_ROUTE:string = '/workspaces';
  private static LOGIN_ROUTE:string   = '/login';
  
  // LOCAL STORAGE VARIABLE NAME
  private static LS_VAR_NAME_LANG     = 'currentLanguage';
  

  constructor(private _translate: TranslateService) {
  
    // Detect current language
    AppSettingsService.CURRENT_LANGUAGE = this.detectCurrentLanguage();
  
  }
  
  /**
   * Detects currently used language:
   * First, checks local storage for language reference.
   * If nothing was found, tries to detect browser language.
   * Finally, if nothing works it uses the fallback language. 
   */
  private detectCurrentLanguage():string {
    let currentLang = this.fallbackLanguage;
    
    // Check local storage
    let localLang = localStorage.getItem(this.lsVarLang);
    if(localLang != undefined && localLang != '') {
      currentLang = localLang;
    
    } else {
      // Check browser language
      let browserLang = navigator.language.split('-');
      if(browserLang[0] != undefined && browserLang[0] != '') {
        currentLang = browserLang[0];
      }
    }
    
    return currentLang;
  }
  
  //
  // SETTERS
  //
  public set currentLanguage(lang: string) {
    // Set service variable
    AppSettingsService.CURRENT_LANGUAGE = lang;
    
    // Also set it in local storage
    localStorage.setItem(this.lsVarLang, lang);
    
    // Change the page language
    this._translate.use(lang);
  }
  
  //
  // GETTERS
  // 
  
  public get fallbackLanguage():string {
    return AppSettingsService.FALLBACK_LANGUAGE;
  }
  
  public get currentLanguage():string {
    return AppSettingsService.CURRENT_LANGUAGE;
  }
  
  public get availableLanguages():string[] {
    return AppSettingsService.AVAILABLE_LANGUAGES;
  }
  
  public get defaultRoute():string {
    return AppSettingsService.DEFAULT_ROUTE;
  }

  public get loginRoute():string {
    return AppSettingsService.LOGIN_ROUTE;
  }

  public get lsVarLang():string {
    return AppSettingsService.LS_VAR_NAME_LANG;
  }
  /*
  export class SharedService {
    globalVar:string;
    globalVarUpdate:Observable<string>;
    globalVarObserver:Observer;

    constructor() {
      this.globalVarUpdate = Observable.create((observer:Observer) => {
        this.globalVarObserver = observer;
      });
    }

    updateGlobalVar(newValue:string) {
      this.globalVar = newValue;
      this.globalVarObserver.next(this.globalVar);
    }
  }
  */

}
