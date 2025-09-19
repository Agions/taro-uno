import * as i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import type { 
  I18nInstance, 
  I18nConfig, 
  SupportedLanguage, 
  LanguageConfig 
} from '../types/i18n.types';
import { defaultI18nConfig } from '../constants/i18n.config';

/**
 * 国际化核心类
 */
export class I18nCore implements I18nInstance {
  private _i18n: any;
  private _currentLanguage: SupportedLanguage;
  private _supportedLanguages: SupportedLanguage[];
  private _languageConfigs: Record<SupportedLanguage, LanguageConfig>;
  private _config: I18nConfig;
  private _initialized: boolean = false;

  // Public properties required by I18nInstance
  public get language(): string {
    return this._currentLanguage;
  }

  public get isInitialized(): boolean {
    return this._initialized;
  }

  constructor(config?: Partial<I18nConfig>) {
    this._config = { ...defaultI18nConfig, ...config };
    this._supportedLanguages = this._config.supportedLanguages ?? [];
    this._languageConfigs = this._config.languageConfigs ?? {} as Record<SupportedLanguage, LanguageConfig>;
    this._currentLanguage = this._config.defaultLanguage || ('zh-CN' as SupportedLanguage);
    
    // 初始化 i18next 实例
    this._i18n = i18next.createInstance();
    
    // 绑定方法
    this.t = this.t.bind(this);
    this.tPlural = this.tPlural.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.formatCurrency = this.formatCurrency.bind(this);
    this.formatRelativeTime = this.formatRelativeTime.bind(this);
    this.formatList = this.formatList.bind(this);
  }

  /**
   * 初始化国际化系统
   */
  async init(config?: Partial<I18nConfig>): Promise<void> {
    if (this._initialized) {
      return;
    }

    // 合并配置
    if (config) {
      this._config = { ...this._config, ...config };
      this._supportedLanguages = this._config.supportedLanguages ?? [];
      this._languageConfigs = this._config.languageConfigs ?? {} as Record<SupportedLanguage, LanguageConfig>;
    }

    // 配置 i18next
    const i18nextConfig: i18next.InitOptions = {
      lng: this._currentLanguage,
      fallbackLng: this._config.fallbackLanguage,
      supportedLngs: this._supportedLanguages,
      debug: this._config.debug,
      interpolation: {
        escapeValue: false,
        format: this.formatInterpolation.bind(this)
      },
      pluralSeparator: '_',
      contextSeparator: '_',
      initImmediate: false,
      resources: this._config.resourcesLoadStrategy === 'eager' ? this.getStaticResources() : undefined
    };

    // 配置命名空间
    if (this._config.namespaces && this._config.namespaceList) {
      i18nextConfig.ns = this._config.namespaceList;
      i18nextConfig.defaultNS = this._config.namespaceList[0];
    }

    // 初始化插件
    this._i18n.use(initReactI18next);

    // 配置语言检测
    if (this._config.plugins?.languageDetector) {
      this._i18n.use(LanguageDetector);
    }

    // 配置资源加载
    if (this._config.plugins?.resourcesBackend) {
      this._i18n.use(resourcesToBackend(this.loadResource.bind(this)));
    }

    // 初始化 i18next
    await this._i18n.init(i18nextConfig);

    // 设置当前语言
    this._currentLanguage = (this._i18n as any).language as SupportedLanguage;

    // 标记为已初始化
    this._initialized = true;

    // 监听语言变化
    if (typeof (this._i18n as any).on === 'function') {
      (this._i18n as any).on('languageChanged', (lng: string) => {
        this._currentLanguage = lng as SupportedLanguage;
        this.updateDocumentAttributes();
      });
    }
  }

  /**
   * 获取静态资源
   */
  private getStaticResources(): i18next.Resource {
    const resources: i18next.Resource = {};
    
    for (const language of this._supportedLanguages) {
      resources[language] = {};
      
      if (this._config.namespaces && this._config.namespaceList) {
        for (const namespace of this._config.namespaceList) {
          resources[language][namespace] = this.getDefaultTranslations(language, namespace);
        }
      } else {
        resources[language] = this.getDefaultTranslations(language, 'translation');
      }
    }
    
    return resources;
  }

  /**
   * 获取默认翻译
   */
  private getDefaultTranslations(language: SupportedLanguage, _namespace: string): any {
    // 这里应该从实际的语言包文件加载
    // 现在返回一些基本的默认翻译
    return {
      common: {
        loading: this.getTranslationKey(language, 'common.loading'),
        error: this.getTranslationKey(language, 'common.error'),
        success: this.getTranslationKey(language, 'common.success'),
        warning: this.getTranslationKey(language, 'common.warning'),
        info: this.getTranslationKey(language, 'common.info'),
        confirm: this.getTranslationKey(language, 'common.confirm'),
        cancel: this.getTranslationKey(language, 'common.cancel'),
        ok: this.getTranslationKey(language, 'common.ok'),
        close: this.getTranslationKey(language, 'common.close'),
        back: this.getTranslationKey(language, 'common.back'),
        next: this.getTranslationKey(language, 'common.next'),
        previous: this.getTranslationKey(language, 'common.previous'),
        search: this.getTranslationKey(language, 'common.search'),
        filter: this.getTranslationKey(language, 'common.filter'),
        sort: this.getTranslationKey(language, 'common.sort'),
        clear: this.getTranslationKey(language, 'common.clear'),
        reset: this.getTranslationKey(language, 'common.reset'),
        save: this.getTranslationKey(language, 'common.save'),
        delete: this.getTranslationKey(language, 'common.delete'),
        edit: this.getTranslationKey(language, 'common.edit'),
        view: this.getTranslationKey(language, 'common.view'),
        copy: this.getTranslationKey(language, 'common.copy'),
        paste: this.getTranslationKey(language, 'common.paste'),
        cut: this.getTranslationKey(language, 'common.cut'),
        undo: this.getTranslationKey(language, 'common.undo'),
        redo: this.getTranslationKey(language, 'common.redo'),
        refresh: this.getTranslationKey(language, 'common.refresh'),
        reload: this.getTranslationKey(language, 'common.reload'),
        more: this.getTranslationKey(language, 'common.more'),
        less: this.getTranslationKey(language, 'common.less'),
        expand: this.getTranslationKey(language, 'common.expand'),
        collapse: this.getTranslationKey(language, 'common.collapse'),
        select: this.getTranslationKey(language, 'common.select'),
        deselect: this.getTranslationKey(language, 'common.deselect'),
        selectAll: this.getTranslationKey(language, 'common.selectAll'),
        deselectAll: this.getTranslationKey(language, 'common.deselectAll'),
        apply: this.getTranslationKey(language, 'common.apply'),
        submit: this.getTranslationKey(language, 'common.submit'),
        retry: this.getTranslationKey(language, 'common.retry'),
        skip: this.getTranslationKey(language, 'common.skip'),
        continue: this.getTranslationKey(language, 'common.continue'),
        finish: this.getTranslationKey(language, 'common.finish'),
        start: this.getTranslationKey(language, 'common.start'),
        stop: this.getTranslationKey(language, 'common.stop'),
        pause: this.getTranslationKey(language, 'common.pause'),
        resume: this.getTranslationKey(language, 'common.resume'),
        help: this.getTranslationKey(language, 'common.help'),
        about: this.getTranslationKey(language, 'common.about'),
        settings: this.getTranslationKey(language, 'common.settings'),
        preferences: this.getTranslationKey(language, 'common.preferences'),
        profile: this.getTranslationKey(language, 'common.profile'),
        logout: this.getTranslationKey(language, 'common.logout'),
        login: this.getTranslationKey(language, 'common.login'),
        register: this.getTranslationKey(language, 'common.register'),
        forgot: this.getTranslationKey(language, 'common.forgot'),
        remember: this.getTranslationKey(language, 'common.remember'),
        required: this.getTranslationKey(language, 'common.required'),
        optional: this.getTranslationKey(language, 'common.optional'),
        disabled: this.getTranslationKey(language, 'common.disabled'),
        enabled: this.getTranslationKey(language, 'common.enabled'),
        active: this.getTranslationKey(language, 'common.active'),
        inactive: this.getTranslationKey(language, 'common.inactive'),
        online: this.getTranslationKey(language, 'common.online'),
        offline: this.getTranslationKey(language, 'common.offline'),
        connected: this.getTranslationKey(language, 'common.connected'),
        disconnected: this.getTranslationKey(language, 'common.disconnected'),
        busy: this.getTranslationKey(language, 'common.busy'),
        idle: this.getTranslationKey(language, 'common.idle'),
        ready: this.getTranslationKey(language, 'common.ready'),
        pending: this.getTranslationKey(language, 'common.pending'),
        processing: this.getTranslationKey(language, 'common.processing'),
        completed: this.getTranslationKey(language, 'common.completed'),
        failed: this.getTranslationKey(language, 'common.failed'),
        cancelled: this.getTranslationKey(language, 'common.cancelled'),
        expired: this.getTranslationKey(language, 'common.expired'),
        invalid: this.getTranslationKey(language, 'common.invalid'),
        valid: this.getTranslationKey(language, 'common.valid'),
        empty: this.getTranslationKey(language, 'common.empty'),
        full: this.getTranslationKey(language, 'common.full'),
        open: this.getTranslationKey(language, 'common.open'),
        closed: this.getTranslationKey(language, 'common.closed'),
        locked: this.getTranslationKey(language, 'common.locked'),
        unlocked: this.getTranslationKey(language, 'common.unlocked'),
        visible: this.getTranslationKey(language, 'common.visible'),
        hidden: this.getTranslationKey(language, 'common.hidden'),
        public: this.getTranslationKey(language, 'common.public'),
        private: this.getTranslationKey(language, 'common.private'),
        shared: this.getTranslationKey(language, 'common.shared'),
        personal: this.getTranslationKey(language, 'common.personal'),
        global: this.getTranslationKey(language, 'common.global'),
        local: this.getTranslationKey(language, 'common.local'),
        remote: this.getTranslationKey(language, 'common.remote'),
        sync: this.getTranslationKey(language, 'common.sync'),
        async: this.getTranslationKey(language, 'common.async')
      }
    };
  }

  /**
   * 获取翻译键值
   */
  private getTranslationKey(language: SupportedLanguage, key: string): string {
    const translations: Record<string, Record<SupportedLanguage, string>> = {
      'common.loading': {
        'zh-CN': '加载中...',
        'en-US': 'Loading...',
        'ja-JP': '読み込み中...',
        'ko-KR': '로딩 중...',
        'fr-FR': 'Chargement...',
        'de-DE': 'Laden...',
        'es-ES': 'Cargando...',
        'pt-BR': 'Carregando...'
      },
      'common.error': {
        'zh-CN': '错误',
        'en-US': 'Error',
        'ja-JP': 'エラー',
        'ko-KR': '오류',
        'fr-FR': 'Erreur',
        'de-DE': 'Fehler',
        'es-ES': 'Error',
        'pt-BR': 'Erro'
      },
      'common.success': {
        'zh-CN': '成功',
        'en-US': 'Success',
        'ja-JP': '成功',
        'ko-KR': '성공',
        'fr-FR': 'Succès',
        'de-DE': 'Erfolg',
        'es-ES': 'Éxito',
        'pt-BR': 'Sucesso'
      },
      'common.warning': {
        'zh-CN': '警告',
        'en-US': 'Warning',
        'ja-JP': '警告',
        'ko-KR': '경고',
        'fr-FR': 'Avertissement',
        'de-DE': 'Warnung',
        'es-ES': 'Advertencia',
        'pt-BR': 'Aviso'
      },
      'common.info': {
        'zh-CN': '信息',
        'en-US': 'Information',
        'ja-JP': '情報',
        'ko-KR': '정보',
        'fr-FR': 'Information',
        'de-DE': 'Information',
        'es-ES': 'Información',
        'pt-BR': 'Informação'
      },
      'common.confirm': {
        'zh-CN': '确认',
        'en-US': 'Confirm',
        'ja-JP': '確認',
        'ko-KR': '확인',
        'fr-FR': 'Confirmer',
        'de-DE': 'Bestätigen',
        'es-ES': 'Confirmar',
        'pt-BR': 'Confirmar'
      },
      'common.cancel': {
        'zh-CN': '取消',
        'en-US': 'Cancel',
        'ja-JP': 'キャンセル',
        'ko-KR': '취소',
        'fr-FR': 'Annuler',
        'de-DE': 'Abbrechen',
        'es-ES': 'Cancelar',
        'pt-BR': 'Cancelar'
      },
      'common.ok': {
        'zh-CN': '确定',
        'en-US': 'OK',
        'ja-JP': 'OK',
        'ko-KR': '확인',
        'fr-FR': 'OK',
        'de-DE': 'OK',
        'es-ES': 'OK',
        'pt-BR': 'OK'
      },
      'common.close': {
        'zh-CN': '关闭',
        'en-US': 'Close',
        'ja-JP': '閉じる',
        'ko-KR': '닫기',
        'fr-FR': 'Fermer',
        'de-DE': 'Schließen',
        'es-ES': 'Cerrar',
        'pt-BR': 'Fechar'
      },
      'common.back': {
        'zh-CN': '返回',
        'en-US': 'Back',
        'ja-JP': '戻る',
        'ko-KR': '뒤로',
        'fr-FR': 'Retour',
        'de-DE': 'Zurück',
        'es-ES': 'Atrás',
        'pt-BR': 'Voltar'
      },
      'common.next': {
        'zh-CN': '下一步',
        'en-US': 'Next',
        'ja-JP': '次へ',
        'ko-KR': '다음',
        'fr-FR': 'Suivant',
        'de-DE': 'Weiter',
        'es-ES': 'Siguiente',
        'pt-BR': 'Próximo'
      },
      'common.previous': {
        'zh-CN': '上一步',
        'en-US': 'Previous',
        'ja-JP': '前へ',
        'ko-KR': '이전',
        'fr-FR': 'Précédent',
        'de-DE': 'Zurück',
        'es-ES': 'Anterior',
        'pt-BR': 'Anterior'
      },
      'common.search': {
        'zh-CN': '搜索',
        'en-US': 'Search',
        'ja-JP': '検索',
        'ko-KR': '검색',
        'fr-FR': 'Rechercher',
        'de-DE': 'Suchen',
        'es-ES': 'Buscar',
        'pt-BR': 'Pesquisar'
      },
      'common.filter': {
        'zh-CN': '筛选',
        'en-US': 'Filter',
        'ja-JP': 'フィルター',
        'ko-KR': '필터',
        'fr-FR': 'Filtrer',
        'de-DE': 'Filter',
        'es-ES': 'Filtrar',
        'pt-BR': 'Filtrar'
      },
      'common.sort': {
        'zh-CN': '排序',
        'en-US': 'Sort',
        'ja-JP': '並び替え',
        'ko-KR': '정렬',
        'fr-FR': 'Trier',
        'de-DE': 'Sortieren',
        'es-ES': 'Ordenar',
        'pt-BR': 'Ordenar'
      },
      'common.clear': {
        'zh-CN': '清除',
        'en-US': 'Clear',
        'ja-JP': 'クリア',
        'ko-KR': '지우기',
        'fr-FR': 'Effacer',
        'de-DE': 'Löschen',
        'es-ES': 'Limpiar',
        'pt-BR': 'Limpar'
      },
      'common.reset': {
        'zh-CN': '重置',
        'en-US': 'Reset',
        'ja-JP': 'リセット',
        'ko-KR': '재설정',
        'fr-FR': 'Réinitialiser',
        'de-DE': 'Zurücksetzen',
        'es-ES': 'Restablecer',
        'pt-BR': 'Redefinir'
      },
      'common.save': {
        'zh-CN': '保存',
        'en-US': 'Save',
        'ja-JP': '保存',
        'ko-KR': '저장',
        'fr-FR': 'Enregistrer',
        'de-DE': 'Speichern',
        'es-ES': 'Guardar',
        'pt-BR': 'Salvar'
      },
      'common.delete': {
        'zh-CN': '删除',
        'en-US': 'Delete',
        'ja-JP': '削除',
        'ko-KR': '삭제',
        'fr-FR': 'Supprimer',
        'de-DE': 'Löschen',
        'es-ES': 'Eliminar',
        'pt-BR': 'Excluir'
      },
      'common.edit': {
        'zh-CN': '编辑',
        'en-US': 'Edit',
        'ja-JP': '編集',
        'ko-KR': '편집',
        'fr-FR': 'Modifier',
        'de-DE': 'Bearbeiten',
        'es-ES': 'Editar',
        'pt-BR': 'Editar'
      },
      'common.view': {
        'zh-CN': '查看',
        'en-US': 'View',
        'ja-JP': '表示',
        'ko-KR': '보기',
        'fr-FR': 'Voir',
        'de-DE': 'Anzeigen',
        'es-ES': 'Ver',
        'pt-BR': 'Visualizar'
      },
      'common.copy': {
        'zh-CN': '复制',
        'en-US': 'Copy',
        'ja-JP': 'コピー',
        'ko-KR': '복사',
        'fr-FR': 'Copier',
        'de-DE': 'Kopieren',
        'es-ES': 'Copiar',
        'pt-BR': 'Copiar'
      },
      'common.paste': {
        'zh-CN': '粘贴',
        'en-US': 'Paste',
        'ja-JP': '貼り付け',
        'ko-KR': '붙여넣기',
        'fr-FR': 'Coller',
        'de-DE': 'Einfügen',
        'es-ES': 'Pegar',
        'pt-BR': 'Colar'
      },
      'common.cut': {
        'zh-CN': '剪切',
        'en-US': 'Cut',
        'ja-JP': '切り取り',
        'ko-KR': '잘라내기',
        'fr-FR': 'Couper',
        'de-DE': 'Ausschneiden',
        'es-ES': 'Cortar',
        'pt-BR': 'Recortar'
      },
      'common.undo': {
        'zh-CN': '撤销',
        'en-US': 'Undo',
        'ja-JP': '元に戻す',
        'ko-KR': '실행 취소',
        'fr-FR': 'Annuler',
        'de-DE': 'Rückgängig',
        'es-ES': 'Deshacer',
        'pt-BR': 'Desfazer'
      },
      'common.redo': {
        'zh-CN': '重做',
        'en-US': 'Redo',
        'ja-JP': 'やり直し',
        'ko-KR': '다시 실행',
        'fr-FR': 'Refaire',
        'de-DE': 'Wiederholen',
        'es-ES': 'Rehacer',
        'pt-BR': 'Refazer'
      },
      'common.refresh': {
        'zh-CN': '刷新',
        'en-US': 'Refresh',
        'ja-JP': '更新',
        'ko-KR': '새로고침',
        'fr-FR': 'Actualiser',
        'de-DE': 'Aktualisieren',
        'es-ES': 'Actualizar',
        'pt-BR': 'Atualizar'
      },
      'common.reload': {
        'zh-CN': '重新加载',
        'en-US': 'Reload',
        'ja-JP': '再読み込み',
        'ko-KR': '다시 로드',
        'fr-FR': 'Recharger',
        'de-DE': 'Neu laden',
        'es-ES': 'Recargar',
        'pt-BR': 'Recarregar'
      },
      'common.more': {
        'zh-CN': '更多',
        'en-US': 'More',
        'ja-JP': 'もっと見る',
        'ko-KR': '더보기',
        'fr-FR': 'Plus',
        'de-DE': 'Mehr',
        'es-ES': 'Más',
        'pt-BR': 'Mais'
      },
      'common.less': {
        'zh-CN': '更少',
        'en-US': 'Less',
        'ja-JP': '少なく',
        'ko-KR': '더 적게',
        'fr-FR': 'Moins',
        'de-DE': 'Weniger',
        'es-ES': 'Menos',
        'pt-BR': 'Menos'
      },
      'common.expand': {
        'zh-CN': '展开',
        'en-US': 'Expand',
        'ja-JP': '展開',
        'ko-KR': '확장',
        'fr-FR': 'Développer',
        'de-DE': 'Erweitern',
        'es-ES': 'Expandir',
        'pt-BR': 'Expandir'
      },
      'common.collapse': {
        'zh-CN': '收起',
        'en-US': 'Collapse',
        'ja-JP': '折りたたむ',
        'ko-KR': '접기',
        'fr-FR': 'Réduire',
        'de-DE': 'Einklappen',
        'es-ES': 'Contraer',
        'pt-BR': 'Recolher'
      },
      'common.select': {
        'zh-CN': '选择',
        'en-US': 'Select',
        'ja-JP': '選択',
        'ko-KR': '선택',
        'fr-FR': 'Sélectionner',
        'de-DE': 'Auswählen',
        'es-ES': 'Seleccionar',
        'pt-BR': 'Selecionar'
      },
      'common.deselect': {
        'zh-CN': '取消选择',
        'en-US': 'Deselect',
        'ja-JP': '選択解除',
        'ko-KR': '선택 해제',
        'fr-FR': 'Désélectionner',
        'de-DE': 'Abwählen',
        'es-ES': 'Deseleccionar',
        'pt-BR': 'Desmarcar'
      },
      'common.selectAll': {
        'zh-CN': '全选',
        'en-US': 'Select All',
        'ja-JP': 'すべて選択',
        'ko-KR': '전체 선택',
        'fr-FR': 'Tout sélectionner',
        'de-DE': 'Alle auswählen',
        'es-ES': 'Seleccionar todo',
        'pt-BR': 'Selecionar tudo'
      },
      'common.deselectAll': {
        'zh-CN': '取消全选',
        'en-US': 'Deselect All',
        'ja-JP': 'すべて選択解除',
        'ko-KR': '전체 선택 해제',
        'fr-FR': 'Tout désélectionner',
        'de-DE': 'Alle abwählen',
        'es-ES': 'Deseleccionar todo',
        'pt-BR': 'Desmarcar tudo'
      },
      'common.apply': {
        'zh-CN': '应用',
        'en-US': 'Apply',
        'ja-JP': '適用',
        'ko-KR': '적용',
        'fr-FR': 'Appliquer',
        'de-DE': 'Anwenden',
        'es-ES': 'Aplicar',
        'pt-BR': 'Aplicar'
      },
      'common.submit': {
        'zh-CN': '提交',
        'en-US': 'Submit',
        'ja-JP': '送信',
        'ko-KR': '제출',
        'fr-FR': 'Soumettre',
        'de-DE': 'Senden',
        'es-ES': 'Enviar',
        'pt-BR': 'Enviar'
      },
      'common.retry': {
        'zh-CN': '重试',
        'en-US': 'Retry',
        'ja-JP': '再試行',
        'ko-KR': '재시도',
        'fr-FR': 'Réessayer',
        'de-DE': 'Wiederholen',
        'es-ES': 'Reintentar',
        'pt-BR': 'Tentar novamente'
      },
      'common.skip': {
        'zh-CN': '跳过',
        'en-US': 'Skip',
        'ja-JP': 'スキップ',
        'ko-KR': '건너뛰기',
        'fr-FR': 'Passer',
        'de-DE': 'Überspringen',
        'es-ES': 'Omitir',
        'pt-BR': 'Pular'
      },
      'common.continue': {
        'zh-CN': '继续',
        'en-US': 'Continue',
        'ja-JP': '続行',
        'ko-KR': '계속',
        'fr-FR': 'Continuer',
        'de-DE': 'Fortfahren',
        'es-ES': 'Continuar',
        'pt-BR': 'Continuar'
      },
      'common.finish': {
        'zh-CN': '完成',
        'en-US': 'Finish',
        'ja-JP': '完了',
        'ko-KR': '완료',
        'fr-FR': 'Terminer',
        'de-DE': 'Beenden',
        'es-ES': 'Finalizar',
        'pt-BR': 'Finalizar'
      },
      'common.start': {
        'zh-CN': '开始',
        'en-US': 'Start',
        'ja-JP': '開始',
        'ko-KR': '시작',
        'fr-FR': 'Commencer',
        'de-DE': 'Starten',
        'es-ES': 'Iniciar',
        'pt-BR': 'Iniciar'
      },
      'common.stop': {
        'zh-CN': '停止',
        'en-US': 'Stop',
        'ja-JP': '停止',
        'ko-KR': '중지',
        'fr-FR': 'Arrêter',
        'de-DE': 'Stoppen',
        'es-ES': 'Detener',
        'pt-BR': 'Parar'
      },
      'common.pause': {
        'zh-CN': '暂停',
        'en-US': 'Pause',
        'ja-JP': '一時停止',
        'ko-KR': '일시정지',
        'fr-FR': 'Pause',
        'de-DE': 'Pausieren',
        'es-ES': 'Pausar',
        'pt-BR': 'Pausar'
      },
      'common.resume': {
        'zh-CN': '继续',
        'en-US': 'Resume',
        'ja-JP': '再開',
        'ko-KR': '계속',
        'fr-FR': 'Reprendre',
        'de-DE': 'Fortsetzen',
        'es-ES': 'Reanudar',
        'pt-BR': 'Retomar'
      },
      'common.help': {
        'zh-CN': '帮助',
        'en-US': 'Help',
        'ja-JP': 'ヘルプ',
        'ko-KR': '도움말',
        'fr-FR': 'Aide',
        'de-DE': 'Hilfe',
        'es-ES': 'Ayuda',
        'pt-BR': 'Ajuda'
      },
      'common.about': {
        'zh-CN': '关于',
        'en-US': 'About',
        'ja-JP': 'について',
        'ko-KR': '정보',
        'fr-FR': 'À propos',
        'de-DE': 'Über',
        'es-ES': 'Acerca de',
        'pt-BR': 'Sobre'
      },
      'common.settings': {
        'zh-CN': '设置',
        'en-US': 'Settings',
        'ja-JP': '設定',
        'ko-KR': '설정',
        'fr-FR': 'Paramètres',
        'de-DE': 'Einstellungen',
        'es-ES': 'Configuración',
        'pt-BR': 'Configurações'
      },
      'common.preferences': {
        'zh-CN': '偏好设置',
        'en-US': 'Preferences',
        'ja-JP': '環境設定',
        'ko-KR': '환경 설정',
        'fr-FR': 'Préférences',
        'de-DE': 'Einstellungen',
        'es-ES': 'Preferencias',
        'pt-BR': 'Preferências'
      },
      'common.profile': {
        'zh-CN': '个人资料',
        'en-US': 'Profile',
        'ja-JP': 'プロフィール',
        'ko-KR': '프로필',
        'fr-FR': 'Profil',
        'de-DE': 'Profil',
        'es-ES': 'Perfil',
        'pt-BR': 'Perfil'
      },
      'common.logout': {
        'zh-CN': '登出',
        'en-US': 'Logout',
        'ja-JP': 'ログアウト',
        'ko-KR': '로그아웃',
        'fr-FR': 'Déconnexion',
        'de-DE': 'Abmelden',
        'es-ES': 'Cerrar sesión',
        'pt-BR': 'Sair'
      },
      'common.login': {
        'zh-CN': '登录',
        'en-US': 'Login',
        'ja-JP': 'ログイン',
        'ko-KR': '로그인',
        'fr-FR': 'Connexion',
        'de-DE': 'Anmelden',
        'es-ES': 'Iniciar sesión',
        'pt-BR': 'Entrar'
      },
      'common.register': {
        'zh-CN': '注册',
        'en-US': 'Register',
        'ja-JP': '登録',
        'ko-KR': '회원가입',
        'fr-FR': 'S\'inscrire',
        'de-DE': 'Registrieren',
        'es-ES': 'Registrarse',
        'pt-BR': 'Registrar'
      },
      'common.forgot': {
        'zh-CN': '忘记',
        'en-US': 'Forgot',
        'ja-JP': '忘れた',
        'ko-KR': '잊어버린',
        'fr-FR': 'Oublié',
        'de-DE': 'Vergessen',
        'es-ES': 'Olvidé',
        'pt-BR': 'Esqueci'
      },
      'common.remember': {
        'zh-CN': '记住',
        'en-US': 'Remember',
        'ja-JP': '覚える',
        'ko-KR': '기억하기',
        'fr-FR': 'Se souvenir',
        'de-DE': 'Erinnern',
        'es-ES': 'Recordar',
        'pt-BR': 'Lembrar'
      },
      'common.required': {
        'zh-CN': '必填',
        'en-US': 'Required',
        'ja-JP': '必須',
        'ko-KR': '필수',
        'fr-FR': 'Requis',
        'de-DE': 'Erforderlich',
        'es-ES': 'Obligatorio',
        'pt-BR': 'Obrigatório'
      },
      'common.optional': {
        'zh-CN': '可选',
        'en-US': 'Optional',
        'ja-JP': 'オプション',
        'ko-KR': '선택 사항',
        'fr-FR': 'Optionnel',
        'de-DE': 'Optional',
        'es-ES': 'Opcional',
        'pt-BR': 'Opcional'
      },
      'common.disabled': {
        'zh-CN': '已禁用',
        'en-US': 'Disabled',
        'ja-JP': '無効',
        'ko-KR': '비활성화',
        'fr-FR': 'Désactivé',
        'de-DE': 'Deaktiviert',
        'es-ES': 'Deshabilitado',
        'pt-BR': 'Desativado'
      },
      'common.enabled': {
        'zh-CN': '已启用',
        'en-US': 'Enabled',
        'ja-JP': '有効',
        'ko-KR': '활성화',
        'fr-FR': 'Activé',
        'de-DE': 'Aktiviert',
        'es-ES': 'Habilitado',
        'pt-BR': 'Ativado'
      },
      'common.active': {
        'zh-CN': '活跃',
        'en-US': 'Active',
        'ja-JP': 'アクティブ',
        'ko-KR': '활성',
        'fr-FR': 'Actif',
        'de-DE': 'Aktiv',
        'es-ES': 'Activo',
        'pt-BR': 'Ativo'
      },
      'common.inactive': {
        'zh-CN': '不活跃',
        'en-US': 'Inactive',
        'ja-JP': '非アクティブ',
        'ko-KR': '비활성',
        'fr-FR': 'Inactif',
        'de-DE': 'Inaktiv',
        'es-ES': 'Inactivo',
        'pt-BR': 'Inativo'
      },
      'common.online': {
        'zh-CN': '在线',
        'en-US': 'Online',
        'ja-JP': 'オンライン',
        'ko-KR': '온라인',
        'fr-FR': 'En ligne',
        'de-DE': 'Online',
        'es-ES': 'En línea',
        'pt-BR': 'Online'
      },
      'common.offline': {
        'zh-CN': '离线',
        'en-US': 'Offline',
        'ja-JP': 'オフライン',
        'ko-KR': '오프라인',
        'fr-FR': 'Hors ligne',
        'de-DE': 'Offline',
        'es-ES': 'Sin conexión',
        'pt-BR': 'Offline'
      },
      'common.connected': {
        'zh-CN': '已连接',
        'en-US': 'Connected',
        'ja-JP': '接続済み',
        'ko-KR': '연결됨',
        'fr-FR': 'Connecté',
        'de-DE': 'Verbunden',
        'es-ES': 'Conectado',
        'pt-BR': 'Conectado'
      },
      'common.disconnected': {
        'zh-CN': '已断开',
        'en-US': 'Disconnected',
        'ja-JP': '切断済み',
        'ko-KR': '연결 끊김',
        'fr-FR': 'Déconnecté',
        'de-DE': 'Getrennt',
        'es-ES': 'Desconectado',
        'pt-BR': 'Desconectado'
      },
      'common.busy': {
        'zh-CN': '忙碌',
        'en-US': 'Busy',
        'ja-JP': 'ビジー',
        'ko-KR': '바쁨',
        'fr-FR': 'Occupé',
        'de-DE': 'Beschäftigt',
        'es-ES': 'Ocupado',
        'pt-BR': 'Ocupado'
      },
      'common.idle': {
        'zh-CN': '空闲',
        'en-US': 'Idle',
        'ja-JP': 'アイドル',
        'ko-KR': '유휴',
        'fr-FR': 'Inactif',
        'de-DE': 'Leerlauf',
        'es-ES': 'Inactivo',
        'pt-BR': 'Inativo'
      },
      'common.ready': {
        'zh-CN': '就绪',
        'en-US': 'Ready',
        'ja-JP': '準備完了',
        'ko-KR': '준비됨',
        'fr-FR': 'Prêt',
        'de-DE': 'Bereit',
        'es-ES': 'Listo',
        'pt-BR': 'Pronto'
      },
      'common.pending': {
        'zh-CN': '待处理',
        'en-US': 'Pending',
        'ja-JP': '保留中',
        'ko-KR': '보류 중',
        'fr-FR': 'En attente',
        'de-DE': 'Ausstehend',
        'es-ES': 'Pendiente',
        'pt-BR': 'Pendente'
      },
      'common.processing': {
        'zh-CN': '处理中',
        'en-US': 'Processing',
        'ja-JP': '処理中',
        'ko-KR': '처리 중',
        'fr-FR': 'Traitement en cours',
        'de-DE': 'Verarbeitung',
        'es-ES': 'Procesando',
        'pt-BR': 'Processando'
      },
      'common.completed': {
        'zh-CN': '已完成',
        'en-US': 'Completed',
        'ja-JP': '完了',
        'ko-KR': '완료됨',
        'fr-FR': 'Terminé',
        'de-DE': 'Abgeschlossen',
        'es-ES': 'Completado',
        'pt-BR': 'Concluído'
      },
      'common.failed': {
        'zh-CN': '失败',
        'en-US': 'Failed',
        'ja-JP': '失敗',
        'ko-KR': '실패',
        'fr-FR': 'Échec',
        'de-DE': 'Fehlgeschlagen',
        'es-ES': 'Error',
        'pt-BR': 'Falhou'
      },
      'common.cancelled': {
        'zh-CN': '已取消',
        'en-US': 'Cancelled',
        'ja-JP': 'キャンセル済み',
        'ko-KR': '취소됨',
        'fr-FR': 'Annulé',
        'de-DE': 'Abgebrochen',
        'es-ES': 'Cancelado',
        'pt-BR': 'Cancelado'
      },
      'common.expired': {
        'zh-CN': '已过期',
        'en-US': 'Expired',
        'ja-JP': '期限切れ',
        'ko-KR': '만료됨',
        'fr-FR': 'Expiré',
        'de-DE': 'Abgelaufen',
        'es-ES': 'Expirado',
        'pt-BR': 'Expirado'
      },
      'common.invalid': {
        'zh-CN': '无效',
        'en-US': 'Invalid',
        'ja-JP': '無効',
        'ko-KR': '유효하지 않음',
        'fr-FR': 'Invalide',
        'de-DE': 'Ungültig',
        'es-ES': 'Inválido',
        'pt-BR': 'Inválido'
      },
      'common.valid': {
        'zh-CN': '有效',
        'en-US': 'Valid',
        'ja-JP': '有効',
        'ko-KR': '유효함',
        'fr-FR': 'Valide',
        'de-DE': 'Gültig',
        'es-ES': 'Válido',
        'pt-BR': 'Válido'
      },
      'common.empty': {
        'zh-CN': '空',
        'en-US': 'Empty',
        'ja-JP': '空',
        'ko-KR': '비어있음',
        'fr-FR': 'Vide',
        'de-DE': 'Leer',
        'es-ES': 'Vacío',
        'pt-BR': 'Vazio'
      },
      'common.full': {
        'zh-CN': '满',
        'en-US': 'Full',
        'ja-JP': '満',
        'ko-KR': '가득 참',
        'fr-FR': 'Plein',
        'de-DE': 'Voll',
        'es-ES': 'Lleno',
        'pt-BR': 'Cheio'
      },
      'common.open': {
        'zh-CN': '打开',
        'en-US': 'Open',
        'ja-JP': '開く',
        'ko-KR': '열기',
        'fr-FR': 'Ouvrir',
        'de-DE': 'Öffnen',
        'es-ES': 'Abrir',
        'pt-BR': 'Abrir'
      },
      'common.closed': {
        'zh-CN': '关闭',
        'en-US': 'Closed',
        'ja-JP': '閉じる',
        'ko-KR': '닫힘',
        'fr-FR': 'Fermé',
        'de-DE': 'Geschlossen',
        'es-ES': 'Cerrado',
        'pt-BR': 'Fechado'
      },
      'common.locked': {
        'zh-CN': '已锁定',
        'en-US': 'Locked',
        'ja-JP': 'ロック済み',
        'ko-KR': '잠김',
        'fr-FR': 'Verrouillé',
        'de-DE': 'Gesperrt',
        'es-ES': 'Bloqueado',
        'pt-BR': 'Bloqueado'
      },
      'common.unlocked': {
        'zh-CN': '已解锁',
        'en-US': 'Unlocked',
        'ja-JP': 'ロック解除済み',
        'ko-KR': '잠금 해제됨',
        'fr-FR': 'Déverrouillé',
        'de-DE': 'Entsperrt',
        'es-ES': 'Desbloqueado',
        'pt-BR': 'Desbloqueado'
      },
      'common.visible': {
        'zh-CN': '可见',
        'en-US': 'Visible',
        'ja-JP': '可視',
        'ko-KR': '보임',
        'fr-FR': 'Visible',
        'de-DE': 'Sichtbar',
        'es-ES': 'Visible',
        'pt-BR': 'Visível'
      },
      'common.hidden': {
        'zh-CN': '隐藏',
        'en-US': 'Hidden',
        'ja-JP': '非表示',
        'ko-KR': '숨김',
        'fr-FR': 'Masqué',
        'de-DE': 'Versteckt',
        'es-ES': 'Oculto',
        'pt-BR': 'Oculto'
      },
      'common.public': {
        'zh-CN': '公开',
        'en-US': 'Public',
        'ja-JP': '公開',
        'ko-KR': '공개',
        'fr-FR': 'Public',
        'de-DE': 'Öffentlich',
        'es-ES': 'Público',
        'pt-BR': 'Público'
      },
      'common.private': {
        'zh-CN': '私密',
        'en-US': 'Private',
        'ja-JP': '非公開',
        'ko-KR': '비공개',
        'fr-FR': 'Privé',
        'de-DE': 'Privat',
        'es-ES': 'Privado',
        'pt-BR': 'Privado'
      },
      'common.shared': {
        'zh-CN': '共享',
        'en-US': 'Shared',
        'ja-JP': '共有',
        'ko-KR': '공유',
        'fr-FR': 'Partagé',
        'de-DE': 'Geteilt',
        'es-ES': 'Compartido',
        'pt-BR': 'Compartilhado'
      },
      'common.personal': {
        'zh-CN': '个人',
        'en-US': 'Personal',
        'ja-JP': '個人',
        'ko-KR': '개인',
        'fr-FR': 'Personnel',
        'de-DE': 'Persönlich',
        'es-ES': 'Personal',
        'pt-BR': 'Pessoal'
      },
      'common.global': {
        'zh-CN': '全局',
        'en-US': 'Global',
        'ja-JP': 'グローバル',
        'ko-KR': '전역',
        'fr-FR': 'Global',
        'de-DE': 'Global',
        'es-ES': 'Global',
        'pt-BR': 'Global'
      },
      'common.local': {
        'zh-CN': '本地',
        'en-US': 'Local',
        'ja-JP': 'ローカル',
        'ko-KR': '로컬',
        'fr-FR': 'Local',
        'de-DE': 'Lokal',
        'es-ES': 'Local',
        'pt-BR': 'Local'
      },
      'common.remote': {
        'zh-CN': '远程',
        'en-US': 'Remote',
        'ja-JP': 'リモート',
        'ko-KR': '원격',
        'fr-FR': 'Distant',
        'de-DE': 'Remote',
        'es-ES': 'Remoto',
        'pt-BR': 'Remoto'
      },
      'common.sync': {
        'zh-CN': '同步',
        'en-US': 'Sync',
        'ja-JP': '同期',
        'ko-KR': '동기화',
        'fr-FR': 'Synchro',
        'de-DE': 'Sync',
        'es-ES': 'Sincronizar',
        'pt-BR': 'Sincronizar'
      },
      'common.async': {
        'zh-CN': '异步',
        'en-US': 'Async',
        'ja-JP': '非同期',
        'ko-KR': '비동기',
        'fr-FR': 'Asynchrone',
        'de-DE': 'Asynchron',
        'es-ES': 'Asíncrono',
        'pt-BR': 'Assíncrono'
      }
    };

    return translations[key]?.[language] || key;
  }

  /**
   * 格式化插值
   */
  private formatInterpolation(value: any, format?: string, lng?: string): string {
    if (format) {
      switch (format) {
        case 'uppercase':
          return String(value).toUpperCase();
        case 'lowercase':
          return String(value).toLowerCase();
        case 'capitalize':
          return String(value).charAt(0).toUpperCase() + String(value).slice(1);
        case 'currency':
          return this.formatCurrency(Number(value), this._languageConfigs[lng as SupportedLanguage]?.currency || 'USD');
        case 'number':
          return this.formatNumber(Number(value));
        case 'date':
          return this.formatDate(new Date(value));
        case 'time':
          return this.formatTime(new Date(value));
        default:
          return String(value);
      }
    }
    return String(value);
  }

  /**
   * 加载资源
   */
  private async loadResource(language: string, namespace: string): Promise<any> {
    try {
      // 这里应该从实际的资源文件加载
      // 现在返回默认的翻译
      return this.getDefaultTranslations(language as SupportedLanguage, namespace);
    } catch (error) {
      console.error(`Failed to load resource for ${language}/${namespace}:`, error);
      return {};
    }
  }

  /**
   * 更新文档属性
   */
  private updateDocumentAttributes(): void {
    if (typeof document !== 'undefined') {
      const config = this._languageConfigs[this._currentLanguage];
      if (config) {
        document.documentElement.lang = this._currentLanguage;
        document.documentElement.dir = config.rtl ? 'rtl' : 'ltr';
        
        // 更新字体
        const style = document.createElement('style');
        style.textContent = `
          html {
            font-family: ${config.fontFamily};
          }
        `;
        document.head.appendChild(style);
      }
    }
  }

  // I18nInstance 接口实现
  get i18n(): any {
    return this._i18n;
  }

  get currentLanguage(): SupportedLanguage {
    return this._currentLanguage;
  }

  get supportedLanguages(): SupportedLanguage[] {
    return this._supportedLanguages;
  }

  get languageConfigs(): Record<SupportedLanguage, LanguageConfig> {
    return this._languageConfigs;
  }

  async changeLanguage(language: string): Promise<void> {
    if (!this._supportedLanguages.includes(language as SupportedLanguage)) {
      throw new Error(`Unsupported language: ${language}`);
    }

    await this._i18n.changeLanguage(language);
    this._currentLanguage = language as SupportedLanguage;
  }

  getCurrentLanguage(): SupportedLanguage {
    return this._currentLanguage;
  }

  getLanguageConfig(language: SupportedLanguage): LanguageConfig {
    return this._languageConfigs[language];
  }

  addLanguage(language: SupportedLanguage, config: LanguageConfig): void {
    this._supportedLanguages.push(language);
    this._languageConfigs[language] = config;
  }

  removeLanguage(language: SupportedLanguage): void {
    const index = this._supportedLanguages.indexOf(language);
    if (index > -1) {
      this._supportedLanguages.splice(index, 1);
      delete this._languageConfigs[language];
    }
  }

  t(key: string, options?: any): string {
    return String(this._i18n.t(key, options));
  }

  tPlural(key: string, count: number, options?: any): string {
    return String(this._i18n.t(key, { count, ...options }));
  }

  formatDate(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    return new Intl.DateTimeFormat(this._currentLanguage, { ...defaultOptions, ...options }).format(dateObj);
  }

  formatTime(date: Date | string | number, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;

    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    return new Intl.DateTimeFormat(this._currentLanguage, { ...defaultOptions, ...options }).format(dateObj);
  }

  formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
    const config = this._languageConfigs[this._currentLanguage];
    const defaultOptions = config.numberFormat;
    
    return new Intl.NumberFormat(this._currentLanguage, { ...defaultOptions, ...options }).format(num);
  }

  formatCurrency(amount: number, currency?: string, options?: Intl.NumberFormatOptions): string {
    const config = this._languageConfigs[this._currentLanguage];
    const currencyCode = currency || config.currency;
    
    const defaultOptions: Intl.NumberFormatOptions = {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    return new Intl.NumberFormat(this._currentLanguage, { ...defaultOptions, ...options }).format(amount);
  }

  formatRelativeTime(value: number, unit: Intl.RelativeTimeFormatUnit, options?: Intl.RelativeTimeFormatOptions): string {
    const formatter = new Intl.RelativeTimeFormat(this._currentLanguage, {
      numeric: 'auto',
      ...options
    });
    return formatter.format(value, unit);
  }

  formatList(list: string[], options?: any): string {
    if (typeof Intl !== 'undefined' && 'ListFormat' in Intl) {
      const formatter = new (Intl as any).ListFormat(this._currentLanguage, {
        style: 'long',
        type: 'conjunction',
        ...options
      });
      return formatter.format(list);
    }
    // Fallback to simple join
    return list.join(', ');
  }

  detectLanguage(): SupportedLanguage {
    // 简单的语言检测逻辑
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language || (navigator as any).userLanguage;
      const supportedLang = this._supportedLanguages.find(lang => 
        browserLang.startsWith(lang.split('-')[0])
      );
      return supportedLang || this._config.defaultLanguage || ('zh-CN' as SupportedLanguage);
    }
    return this._config.defaultLanguage || ('zh-CN' as SupportedLanguage);
  }

  setLanguage(language: SupportedLanguage): void {
    this._currentLanguage = language;
    this._i18n.changeLanguage(language);
  }

  resetLanguage(): void {
    this._currentLanguage = this._config.defaultLanguage || ('zh-CN' as SupportedLanguage);
    this._i18n.changeLanguage(this._config.defaultLanguage || 'zh-CN');
  }

  getDirection(): 'ltr' | 'rtl' {
    return this._languageConfigs[this._currentLanguage].rtl ? 'rtl' : 'ltr';
  }

  isRTL(): boolean {
    return this._languageConfigs[this._currentLanguage].rtl;
  }

  getFontFamily(): string {
    return this._languageConfigs[this._currentLanguage].fontFamily;
  }

  getResource(language: SupportedLanguage, namespace: string, key: string): any {
    if (typeof (this._i18n as any).getResource === 'function') {
      return (this._i18n as any).getResource(language, namespace, key);
    }
    return this._i18n.t(`${namespace}:${key}`, { lng: language });
  }

  addResource(language: SupportedLanguage, namespace: string, key: string, value: any): void {
    if (typeof (this._i18n as any).addResource === 'function') {
      (this._i18n as any).addResource(language, namespace, key, value);
    } else {
      console.warn('addResource method not available in i18next instance');
    }
  }

  removeResource(language: SupportedLanguage, namespace: string, key: string): void {
    if (typeof (this._i18n as any).removeResource === 'function') {
      (this._i18n as any).removeResource(language, namespace, key);
    } else {
      console.warn('removeResource method not available in i18next instance');
    }
  }

  async loadResources(_language: SupportedLanguage, namespaces: string[]): Promise<void> {
    await this._i18n.loadNamespaces(namespaces);
  }

  unloadResources(language: SupportedLanguage, namespaces: string[]): void {
    namespaces.forEach(namespace => {
      if (typeof (this._i18n as any).removeResourceBundle === 'function') {
        (this._i18n as any).removeResourceBundle(language, namespace);
      }
    });
  }

  clearCache(): void {
    if (this._config.cacheStrategy && this._config.cacheStrategy !== 'memory') {
      // 清理缓存逻辑
      const cacheKey = `${this._config.cacheStrategy}_i18n_${this._currentLanguage}`;
      if (typeof window !== 'undefined') {
        window[this._config.cacheStrategy].removeItem(cacheKey);
      }
    }
  }

  destroy(): void {
    if (typeof (this._i18n as any).off === 'function') {
      (this._i18n as any).off('languageChanged');
    }
    this._initialized = false;
  }
}

/**
 * 创建国际化实例
 */
export function createI18nInstance(config?: Partial<I18nConfig>): I18nCore {
  return new I18nCore(config);
}

/**
 * 默认国际化实例
 */
export const i18nInstance = createI18nInstance();

/**
 * 导出默认实例
 */
export default i18nInstance;