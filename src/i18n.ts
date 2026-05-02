import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  am: {
    translation: {
      nav: {
        personal: "Անհատ",
        business: "Բիզնես",
        instant_payments: "Ակնթարդային վճարումներ",
        about: "Մեր մասին",
        news: "Նորություններ",
        blog: "Բլոգ",
        career: "Կարիերա"
      },
      menu: {
        loans: "Վարկեր",
        cards: "Քարտեր",
        deposits: "Ավանդներ",
        accounts: "Հաշիվներ",
        transfers: "Փոխանցումներ",
        securities: "Արժեթղթեր",
        salary: "EvocaSALARY",
        touch: "EvocaTOUCH",
        leasing: "Լիզինգ",
        trade_finance: "Առևտրի ֆինանսավորում",
        digital: "Դիջիթալ",
        other: "Այլ",
        life: "Evoca լայֆ",
        work: "Աշխատանք և պրակտիկա",
        about_evoca: "Evoca-ի մասին",
        rates: "Սակագներ",
        announcements: "Հայտարարություններ",
        business_label: "Բիզնես",
        advantages: "Առավելությունները",
        types: "Տեսակները",
        loading: "Բեռնվում է...",
        "LOANS": "Վարկեր",
        "CARDS": "Քարտեր",
        "DEPOSITS": "Ավանդներ",
        "ACCOUNTS": "Հաշիվներ",
        "TRANSFERS": "Փոխանցումներ",
        "SECURITIES": "Արժեթղթեր",
        "SALARY": "EvocaSALARY",
        "TOUCH": "EvocaTOUCH"
      },
      // HeroSection-ի համար անհրաժեշտ տվյալները
      biznes_avand: {
        badge: "Բիզնես ավանդ",
        title: "Պարզ, արագ, ժամանակակից",
        desc: "Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:",
        button: "Դառնալ հաճախորդ"
      },
      other_services: {
        badge: "Լրացուցիչ",
        tab1_title: "Հեռահար բանկային ծառայություններ",
        tab1_desc: "Կառավարեք Ձեր հաշիվները աշխարհի ցանկացած կետից՝ շուրջօրյա ռեժիմով: Evoca-ի հեռահար համակարգերը հնարավորություն են տալիս կատարել գործարքներ առանց բանկ այցելելու:",
        tab2_title: "Պահատուփերի վարձակալություն",
        tab2_desc: "Բանկն առաջարկում է անհատական պահատուփերի վարձակալություն Ձեր արժեքավոր իրերի, փաստաթղթերի և դրամական միջոցների անվտանգ պահպանման համար:",
        tab3_title: "Այլ ծառայություններ",
        tab3_subtitle: "Չեկային գրքույկներ և տեղեկանքներ",
        tab3_desc: "Մենք տրամադրում ենք բոլոր անհրաժեշտ փաստաթղթերը, տեղեկանքները և քաղվածքները հաշիվների վերաբերյալ՝ հնարավորինս սեղմ ժամկետներում։",
        table: {
          size: "Չափսեր",
          term: "Ժամկետ",
          rate: "Սակագին",
          small: "Փոքր",
          medium: "Միջին",
          month: "1 ամիս",
          price_small: "10,000 ֏",
          price_medium: "15,000 ֏"
        },
        extra: {
          references: "Տեղեկանքների տրամադրում",
          references_desc: "Հաշվի մնացորդի, շրջանառության և այլ տվյալների վերաբերյալ:",
          safekeeping: "Պատասխանատու պահպանություն",
          safekeeping_desc: "Արժեթղթերի և այլ փաստաթղթերի պահպանում բանկում:"
        },
        banner: {
          title: "Օնլայն բանկինգ",
          desc: "Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:",
          btn: "Դառնալ հաճախորդ",
          success: "Շնորհակալություն հետաքրքրվածության համար:"
        }
      },
      deposits_page: {
        title: "Ավանդներ",
        details_title: "Ավանդի Մանրամասներ",
        more: "Մանրամասն",
        start_from: "Սկսած",
        min_amount: "Նվազագույն գումար",
        annual_rate: "Տարեկան տոկոսադրույք",
        term: "Ժամկետ",
        term_value: "30-ից 1095 օր",
        payment_type: "Տոկոսների վճարում",
        payment_value: "Ամսական կամ ժամկետի վերջում",
        invest_btn: "Ներդրնել Ավանդ",
        back: "Վերադառնալ",
        no_deposits: "Ավանդներ չեն գտնվել",
        not_found: "Ավանդը չի գտնվել"
      },
      loans_page: {
        title: "Անհատ վարկեր",
        loading: "Բեռնվում է...",
        no_loans: "Այս կատեգորիայում վարկեր չկան",
        see_all: "Տեսնել բոլորը",
        more: "Մանրամասն",
        until: "Մինչև",
        term: "ժամկետ",
        limit: "Սահմանաչափ",
        details: "Վարկի մասին",
        terms: "Պայմաններ",
        why_choose: "Ինչու՞ ընտրել այս վարկը",
        apply: "Դիմել հիմա",
        callback: "Հետադարձ զանգ",
        back: "Վերադառնալ",
        home: "Գլխավոր",
        loan_not_found: "Վարկը չի գտնվել",
        go_back: "Հետ վերադառնալ",
        filters: {
          all: "Բոլորը",
          business: "Բիզնես վարկեր",
          consumer: "Սպառողական",
          mortgage: "Հիփոթեք",
          car: "Ավտովարկ"
        }
      },
      securities_page: {
        title: "Արժեթղթեր",
        loading: "Բեռնվում է...",
        pdf_label: "PDF",
        necessary_info: "ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ",
        tabs: [
          "Ներդրումային ծառայություններ",
          "Պարտատոմսեր",
          "ՀԿԾ ծառայություններ",
          "Ռեպո/Հակադարձ Ռեպո",
          "EvocaINVEST"
        ],
        investment_title: "Ներդրումային ծառայություններ",
        investment_desc: "Evocabank-ն առաջարկում է ներդրումային ծառայությունների լայն ընտրանի:",
        info_title: "ԱՆՀՐԱԺԵՇՏ ՏԵՂԵԿԱՏՎՈՒԹՅՈՒՆ",
        docs: ["Ներդրումային ծառայությունների սակագներ", "Հաճախորդների դասակարգման քաղաքականություն"],
        bonds_title: "Պարտատոմսեր",
        table: {
          tranche: "Տրանշ",
          currency: "Արժույթ",
          rate: "Տոկոսադրույք"
        },
        cda_title: "ՀԿԾ ծառայություններ",
        cda_desc: "Բանկն իրականացնում է Հայաստանի Կենտրոնական Դեպոզիտարիայի օպերատորի գործառույթներ՝ ապահովելով ռեեստրի վարում և պահառություն:",
        cda_rates: "ՍԱԿԱԳՆԵՐ ԵՎ ՊԱՅՄԱՆՆԵՐ",
        cda_content: "Ծառայությունները մատուցվում են համաձայն Կենտրոնական Դեպոզիտարիայի կողմից սահմանված կանոնների:",
        repo_title: "Ռեպո/Հակադարձ Ռեպո",
        repo_desc: "Իրականացրեք կարճաժամկետ դրամական միջոցների ներգրավում կամ տեղաբաշխում՝ որպես գրավ օգտագործելով պետական և կորպորատիվ պարտատոմսեր:",
        repo_type1: "Ռեպո",
        repo_type1_desc: "Միջոցների ներգրավում արժեթղթերի գրավադրմամբ:",
        repo_type2: "Հակադարձ Ռեպո",
        repo_type2_desc: "Միջոցների տեղաբաշխում արժեթղթերի ձեռքբերմամբ:",
        invest_desc: "Հարթակ, որը հնարավորություն է տալիս հասանելիություն ունենալ աշխարհի ավելի քան 20 ֆոնդային բորսաներին անմիջապես Ձեր սմարթֆոնից:",
        join_now: "Միանալ հիմա"
      },
      payments: {
        main_title: "Գլխավոր",
        input_label: "Մուտքագրեք տվյալները",
        placeholder: "Հաշվեհամար կամ հեռախոս",
        pay_btn: "Վճարել",
        processing: "Մշակվում է...",
        enter_data_alert: "Մուտքագրեք տվյալները",
        success_alert: "Վճարումն ընդունված է",
        error_alert: "Խնդիր առաջացավ վճարման ժամանակ"
      },
      common: {
        login: "Մուտք",
        support: "Շուրջօրյա աջակցություն",
        "LOGIN": "Մուտք"
      }
    }
  },
  en: {
    translation: {
      nav: {
        personal: "Personal",
        business: "Business",
        instant_payments: "Instant Payments",
        about: "About Us",
        news: "News",
        blog: "Blog",
        career: "Career"
      },
      menu: {
        loans: "Loans",
        cards: "Cards",
        deposits: "Deposits",
        accounts: "Accounts",
        transfers: "Transfers",
        securities: "Securities",
        salary: "EvocaSALARY",
        touch: "EvocaTOUCH",
        leasing: "Leasing",
        trade_finance: "Trade Finance",
        digital: "Digital",
        other: "Other",
        life: "Evoca Life",
        work: "Jobs & Internship",
        about_evoca: "About Evoca",
        rates: "Rates",
        announcements: "Announcements",
        business_label: "Business",
        advantages: "Advantages",
        types: "Types",
        loading: "Loading...",
        "LOANS": "Loans",
        "CARDS": "Cards",
        "DEPOSITS": "Deposits",
        "ACCOUNTS": "Accounts",
        "TRANSFERS": "Transfers",
        "SECURITIES": "Securities",
        "SALARY": "EvocaSALARY",
        "TOUCH": "EvocaTOUCH"
      },
      // HeroSection-ի համար անհրաժեշտ տվյալները (EN)
      biznes_avand: {
        badge: "Business Deposit",
        title: "Simple, Fast, Modern",
        desc: "Evocabank is a bank providing fast, simple, and innovative services.",
        button: "Become a client"
      },
      other_services: {
        badge: "Extra",
        tab1_title: "Remote Banking Services",
        tab1_desc: "Manage your accounts from anywhere in the world, 24/7. Evoca's remote systems allow you to perform transactions without visiting the bank.",
        tab2_title: "Safe Box Rental",
        tab2_desc: "The Bank offers individual safe box rentals for the secure storage of your valuables, documents, and funds.",
        tab3_title: "Other Services",
        tab3_subtitle: "Checkbooks and References",
        tab3_desc: "We provide all necessary documents, references, and account statements in the shortest possible time.",
        table: {
          size: "Dimensions",
          term: "Term",
          rate: "Tariff",
          small: "Small",
          medium: "Medium",
          month: "1 Month",
          price_small: "10,000 ֏",
          price_medium: "15,000 ֏"
        },
        extra: {
          references: "Provision of References",
          references_desc: "Regarding account balance, turnover, and other data.",
          safekeeping: "Responsible Safekeeping",
          safekeeping_desc: "Storage of securities and other documents in the bank."
        },
        banner: {
          title: "Online Banking",
          desc: "Evocabank is a bank providing fast, simple, and innovative services.",
          btn: "Become a client",
          success: "Thank you for your interest!"
        }
      },
      deposits_page: {
        title: "Deposits",
        details_title: "Deposit Details",
        more: "Details",
        start_from: "From",
        min_amount: "Minimum Amount",
        annual_rate: "Annual Rate",
        term: "Term",
        term_value: "30 to 1095 days",
        payment_type: "Interest Payment",
        payment_value: "Monthly or at the end of the term",
        invest_btn: "Invest Now",
        back: "Back",
        no_deposits: "No deposits found",
        not_found: "Deposit not found"
      },
      loans_page: {
        title: "Individual Loans",
        loading: "Loading...",
        no_loans: "No loans in this category",
        see_all: "See all",
        more: "Details",
        until: "Up to",
        term: "term",
        limit: "Limit",
        details: "About Loan",
        terms: "Terms",
        why_choose: "Why choose this loan?",
        apply: "Apply now",
        callback: "Callback",
        back: "Back",
        home: "Home",
        loan_not_found: "Loan not found",
        go_back: "Go back",
        filters: {
          all: "All",
          business: "Business Loans",
          consumer: "Consumer",
          mortgage: "Mortgage",
          car: "Car Loan"
        }
      },
      securities_page: {
        title: "Securities",
        loading: "Loading...",
        pdf_label: "PDF",
        necessary_info: "NECESSARY INFORMATION",
        tabs: [
          "Investment Services",
          "Bonds",
          "CDA Services",
          "Repo/Reverse Repo",
          "EvocaINVEST"
        ],
        investment_title: "Investment Services",
        investment_desc: "Evocabank offers a wide range of investment services.",
        info_title: "NECESSARY INFORMATION",
        docs: ["Investment services tariffs", "Client classification policy"],
        bonds_title: "Bonds",
        table: {
          tranche: "Tranche",
          currency: "Currency",
          rate: "Rate"
        },
        cda_title: "CDA Services",
        cda_desc: "The Bank acts as an operator of the Central Depository of Armenia, providing registry keeping and custody services.",
        cda_rates: "TARIFFS AND TERMS",
        cda_content: "Services are provided in accordance with the rules established by the Central Depository.",
        repo_title: "Repo/Reverse Repo",
        repo_desc: "Attract or allocate short-term funds using government and corporate bonds as collateral.",
        repo_type1: "Repo",
        repo_type1_desc: "Attraction of funds by pledging securities.",
        repo_type2: "Reverse Repo",
        repo_type2_desc: "Allocation of funds by acquiring securities.",
        invest_desc: "A platform that provides access to more than 20 stock exchanges worldwide directly from your smartphone.",
        join_now: "Join Now"
      },
      payments: {
        main_title: "Home",
        input_label: "Enter details",
        placeholder: "Account or phone",
        pay_btn: "Pay",
        processing: "Processing...",
        enter_data_alert: "Please enter data",
        success_alert: "Payment accepted",
        error_alert: "An error occurred during payment"
      },
      common: {
        login: "Login",
        support: "24/7 Support",
        "LOGIN": "Login"
      }
    }
  },
  ru: {
    translation: {
      nav: {
        personal: "Физическим лицам",
        business: "Бизнес",
        instant_payments: "Мгновенные платежи",
        about: "О нас",
        news: "Новости",
        blog: "Блог",
        career: "Карьера"
      },
      menu: {
        loans: "Кредиты",
        cards: "Карты",
        deposits: "Вклады",
        accounts: "Счета",
        transfers: "Переводы",
        securities: "Ценные бумаги",
        salary: "EvocaSALARY",
        touch: "EvocaTOUCH",
        leasing: "Лизинг",
        trade_finance: "Торговое финансирование",
        digital: "Диджитал",
        other: "Другое",
        life: "Evoca Life",
        work: "Работа и практика",
        about_evoca: "Об Evoca",
        rates: "Тарифы",
        announcements: "Объявления",
        business_label: "Бизнес",
        advantages: "Преимущества",
        types: "Типы",
        loading: "Загрузка...",
        "LOANS": "Кредиты",
        "CARDS": "Карты",
        "DEPOSITS": "Вклады",
        "ACCOUNTS": "Счета",
        "TRANSFERS": "Переводы",
        "SECURITIES": "Ценные бумаги",
        "SALARY": "EvocaSALARY",
        "TOUCH": "EvocaTOUCH"
      },
      // HeroSection-ի համար անհրաժեշտ տվյալները (RU)
      biznes_avand: {
        badge: "Бизнес депозит",
        title: "Просто, Быстро, Современнo",
        desc: "Evocabank - это банк, предоставляющий быстрые, простые и инновационные услуги.",
        button: "Стать клиентом"
      },
      other_services: {
        badge: "Дополнительно",
        tab1_title: "Дистанционные банковские услуги",
        tab1_desc: "Управляйте своими счетами из любой точки мира, 24/7. Дистанционные системы Evoca позволяют совершать транзакции без посещения банка.",
        tab2_title: "Аренда сейфов",
        tab2_desc: "Банк предлагает аренду индивидуальных сейфов для надежного хранения ваших ценностей, документов и денежных средств.",
        tab3_title: "Другие услуги",
        tab3_subtitle: "Чековые книжки и справки",
        tab3_desc: "Мы предоставляем все необходимые документы, справки и выписки по счетам в кратчайшие сроки.",
        table: {
          size: "Размеры",
          term: "Срок",
          rate: "Тариф",
          small: "Малый",
          medium: "Средний",
          month: "1 месяц",
          price_small: "10,000 ֏",
          price_medium: "15,000 ֏"
        },
        extra: {
          references: "Предоставление справок",
          references_desc: "Об остатке на счете, обороте и других данных.",
          safekeeping: "Ответственное хранение",
          safekeeping_desc: "Хранение ценных бумаг и других документов в банке."
        },
        banner: {
          title: "Онлайн банкинг",
          desc: "Evocabank - это банк, предоставляющий быстрые, простые и инновационные услуги.",
          btn: "Стать клиентом",
          success: "Благодарим за проявленный интерес!"
        }
      },
      deposits_page: {
        title: "Вклады",
        details_title: "Детали вклада",
        more: "Подробнее",
        start_from: "От",
        min_amount: "Минимальная сумма",
        annual_rate: "Годовая ставка",
        term: "Срок",
        term_value: "от 30 до 1095 дней",
        payment_type: "Выплата процентов",
        payment_value: "Ежемесячно или в конце срока",
        invest_btn: "Вложить",
        back: "Назад",
        no_deposits: "Вклады не найдены",
        not_found: "Вклад не найден"
      },
      loans_page: {
        title: "Кредиты индивидуумам",
        loading: "Загрузка...",
        no_loans: "В этой категории нет кредитов",
        see_all: "Посмотреть все",
        more: "Подробнее",
        until: "До",
        term: "срок",
        limit: "Лимит",
        details: "О кредите",
        terms: "Условия",
        why_choose: "Почему выбрать этот кредит?",
        apply: "Подать заявку",
        callback: "Обратный звонок",
        back: "Назад",
        home: "Главная",
        loan_not_found: "Кредит не найден",
        go_back: "Вернуться назад",
        filters: {
          all: "Все",
          business: "Бизнес кредиты",
          consumer: "Потребительские",
          mortgage: "Ипотека",
          car: "Автокредит"
        }
      },
      securities_page: {
        title: "Ценные бумаги",
        loading: "Загрузка...",
        pdf_label: "PDF",
        necessary_info: "НЕОБХОДИМАЯ ИНФОРМАЦИЯ",
        tabs: [
          "Инвестиционные услуги",
          "Облигации",
          "Услуги ЦДА",
          "Репо/Обратное Репо",
          "EvocaINVEST"
        ],
        investment_title: "Инвестиционные услуги",
        investment_desc: "Evocabank предлагает широкий спектр инвестиционных услуг.",
        info_title: "НЕОБХОДИМАЯ ИНФОРМАЦИЯ",
        docs: ["Тарифы инвестиционных услуг", "Политика классификации клиентов"],
        bonds_title: "Облигации",
        table: {
          tranche: "Транш",
          currency: "Валюта",
          rate: "Ставка"
        },
        cda_title: "Услуги ЦДА",
        cda_desc: "Банк выполняет функции оператора Центрального Депозитария Армении, обеспечивая ведение реестра и кастодиальные услуги.",
        cda_rates: "ТАРИФЫ И УСЛОВИЯ",
        cda_content: "Услуги предоставляются в соответствии с правилами, установленными Центральным Депозитарием.",
        repo_title: "Репо/Обратное Репо",
        repo_desc: "Привлекайте или размещайте краткосрочные средства, используя государственные и корпоративные облигации в качестве залога.",
        repo_type1: "Репо",
        repo_type1_desc: "Привлечение средств под залог ценных бумаг.",
        repo_type2: "Обратное Репо",
        repo_type2_desc: "Размещение средств путем приобретения ценных бумаг.",
        invest_desc: "Платформа, обеспечивающая доступ к более чем 20 фондовым биржам мира прямо со своего смартфона.",
        join_now: "Присоединиться"
      },
      payments: {
        main_title: "Главная",
        input_label: "Введите данные",
        placeholder: "Номер счета или телефон",
        pay_btn: "Оплатить",
        processing: "Обработка...",
        enter_data_alert: "Введите данные",
        success_alert: "Платеж приняտ",
        error_alert: "Произошла ошибка при оплате"
      },
      common: {
        login: "Вход",
        support: "Круглосуточная поддержка",
        "LOGIN": "Вход"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "am",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;