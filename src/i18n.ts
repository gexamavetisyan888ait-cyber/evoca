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
      biznes_avand: {
        badge: "Բիզնես ավանդ",
        title: "Պարզ, արագ, ժամանակակից",
        desc: "Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:",
        button: "Դառնալ հաճախորդ"
      },
      hashivner: {
        breadcrumb_parent: "Անհատ",
        title: "Հաշիվներ",
        become_client: "Դառնալ հաճախորդ",
        online_banking: "Օնլայն բանկինգ",
        online_desc: "Evocabank-ը արագ, պարզ և նորարար ծառայություններ մատուցող բանկ է:",
        loading: "Բեռնվում է..."
      },
      news: {
        title: "Monthly Recap",
        blog_label: "Բլոգ",
        see_all: "Տեսնել բոլորը",
        archive: "Արխիվ",
        back: "Վերադառնալ",
        read_more: "Կարդալ ավելին",
        reading_time: "8 րոպե ընթերցում",
        share: "Կիսվել",
        featured: "Հատուկ",
        categories: {
          all: "Բոլորը",
          business: "Բիզնես",
          lifestyle: "Կենսակերպ",
          investments: "Ներդրումներ"
        }
      },
      exchange: {
        loading: "Բեռնվում է...",
        disclaimer: "20,000 ԱՄՆ դոլարից ավել կամ դրան հարժեք այլ արտարժույթի փոխարկման դեպքում գործարքը հաստատվում է Բանկի հայեցողությամբ և Բանկի կողմից որոշված փոխարժեքով:",
        tabs: {
          cash: "Կանխիկ",
          cashless: "Անկանխիկ",
          gold: "Ոսկու փոխարժեք"
        },
        table: {
          currency: "Արժույթ",
          buy: "Առք",
          sell: "Վաճառք"
        },
        calc: {
          have: "Ունեմ",
          get: "Կստանամ",
          info: "* Հաշվարկը կատարվում է {{code}} վաճառքի փոխարժեքով ({{rate}})"
        },
        gold: {
          purity: "Հարգ",
          price: "Արժեքը (1 գրամ)"
        },
        address: {
          title: "Մեր հասցեները",
          desc: "Բանկի հասցեները, աշխատաժամերը և բանկոմատները:",
          btn: "ԴԻՏԵԼ ՔԱՐՏԵԶԸ"
        }
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
        min_amount: "Նվազագույյն գումար",
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
        "LOGIN": "Մուտք",
        soon: "ՇՈՒՏՈՎ"
      },
      about_page: {
        menu: {
          info: "Բանկի մասին",
          structure: "Կառուցվածք",
          shareholders: "Բաժնետերեր",
          management: "Ղեկավարություն",
          partners: "Գործընկերներ",
          reviews: "Կարծիքներ",
          csr: "ՍՊՊ",
        },
        info: {
          title: "ՄԵՆՔ ՄԱՏՈՒՑՈՒՄ ԵՆՔ ԹՎԱՅԻՆ ՖԻՆԱՆՍԱԿԱՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ",
          desc: "Evocabank-ը առաջին և միակ Mobile-first բանկն է Հայաստանում, որն իր գործունեությունը սկսել է 1990 թվականին։"
        }
      },
      footer: {
        chat: "Chat",
        address: "ք. Երևան, 0010, Հանրապետության 44/2",
        central_bank_note: "Evocabank-ը վերահսկվում է Հայաստանի Հանրապետության Կենտրոնական բանկի կողմից",
        all_rights_reserved: "ԲՈԼՈՐ ԻՐԱՎՈՒՆՔՆԵՐԸ ՊԱՇՏՊԱՆՎԱԾ ԵՆ",
        about_bank: {
          title: "Բանկի մասին",
          about_us: "Մեր մասին",
          management: "Ղեկավարություն",
          shareholders: "Բաժնետերեր",
          jobs: "Թափուր աշխատատեղեր",
          legal_acts: "Իրավական ակտեր",
          tariffs: "Սակագներ",
          property: "Օտարվող գույք",
        },
        useful_links: {
          title: "Օգտակար հղումներ",
          customer_rights: "Հաճախորդի իրավունքները",
          complaint_standards: "Հաճախորդի դժգոհությունների չափանիշներ",
          regulation: "Կարգավորում",
          privacy_policy: "Գաղտնիության քաղաքականություն",
          fin_mediator: "Ֆին. հաշտարար",
        },
        other_links: {
          title: "Այլ հղումներ",
          online: "EvocaONLINE",
          safes: "Պահատուփեր",
          faq: "Հաճախ տրվող հարցեր",
          announcements: "Հայտարարություններ",
          library: "Library",
        },
        contact: {
          branches: "Բանկի հասցեները և աշխատաժամերը",
        }
      },
      partners_section: {
        hero_title: "Թվային <br />Ապագան Այստեղ է",
        hero_desc: "Evocabank-ը շարունակում է զարմացնել իր նորարար լուծումներով: Միացեք մեր տեխնոլոգիական աշխարհին:",
        partners_title: "Մեր Գործընկերները",
        partners_desc: "Դարձե՛ք Evocabank-ի Գործընկեր և եկե՛ք միասին գնանք դեպի գունեղ նոր իրականություն:",
        all_partners: "Բոլոր գործընկերները",
        loading: "Բեռնվում է..."
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
      biznes_avand: {
        badge: "Business Deposit",
        title: "Simple, Fast, Modern",
        desc: "Evocabank is a bank providing fast, simple, and innovative services.",
        button: "Become a client"
      },
      hashivner: {
        breadcrumb_parent: "Personal",
        title: "Accounts",
        become_client: "Become a client",
        online_banking: "Online Banking",
        online_desc: "Evocabank is a fast, simple and innovative service provider.",
        loading: "Loading..."
      },
      news: {
        title: "Monthly Recap",
        blog_label: "Blog",
        see_all: "See all",
        archive: "Archive",
        back: "Back",
        read_more: "Read More",
        reading_time: "8 min read",
        share: "Share",
        featured: "Featured",
        categories: {
          all: "All",
          business: "Business",
          lifestyle: "Lifestyle",
          investments: "Investments"
        }
      },
      exchange: {
        loading: "Loading...",
        disclaimer: "For exchange of more than 20,000 USD or equivalent, the transaction is subject to the Bank's approval and at the rate determined by the Bank.",
        tabs: {
          cash: "Cash",
          cashless: "Cashless",
          gold: "Gold Rate"
        },
        table: {
          currency: "Currency",
          buy: "Buy",
          sell: "Sell"
        },
        calc: {
          have: "I Have",
          get: "I Get",
          info: "* Calculation is based on {{code}} selling rate ({{rate}})"
        },
        gold: {
          purity: "Purity",
          price: "Price (1 gram)"
        },
        address: {
          title: "Our Addresses",
          desc: "Bank branches, working hours and ATMs.",
          btn: "VIEW ON MAP"
        }
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
        "LOGIN": "Login",
        soon: "COMING SOON"
      },
      about_page: {
        menu: {
          info: "About Bank",
          structure: "Structure",
          shareholders: "Shareholders",
          management: "Management",
          partners: "Partners",
          reviews: "Reviews",
          csr: "CSR",
        },
        info: {
          title: "WE PROVIDE DIGITAL FINANCIAL SERVICES",
          desc: "Evocabank is the first and only Mobile-first bank in Armenia, established in 1990."
        }
      },
      footer: {
        chat: "Chat",
        address: "44/2 Hanrapetutyan str., Yerevan 0010, RA",
        central_bank_note: "Evocabank is supervised by the Central Bank of Armenia",
        all_rights_reserved: "ALL RIGHTS RESERVED",
        about_bank: {
          title: "About Bank",
          about_us: "About Us",
          management: "Management",
          shareholders: "Shareholders",
          jobs: "Jobs",
          legal_acts: "Legal Acts",
          tariffs: "Tariffs",
          property: "Sale of Property",
        },
        useful_links: {
          title: "Useful Links",
          customer_rights: "Customer Rights",
          complaint_standards: "Customer Complaint Standards",
          regulation: "Regulation",
          privacy_policy: "Privacy Policy",
          fin_mediator: "Financial Mediator",
        },
        other_links: {
          title: "Other Links",
          online: "EvocaONLINE",
          safes: "Safe Deposit Boxes",
          faq: "FAQ",
          announcements: "Announcements",
          library: "Library",
        },
        contact: {
          branches: "Bank's addresses and working hours",
        }
      },
      partners_section: {
        hero_title: "Digital <br /> Future is Here",
        hero_desc: "Evocabank continues to surprise with its innovative solutions. Join our technological world.",
        partners_title: "Our Partners",
        partners_desc: "Become an Evocabank Partner and let's go together towards a colorful new reality.",
        all_partners: "All Partners",
        loading: "Loading..."
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
      biznes_avand: {
        badge: "Бизнес депозит",
        title: "Просто, Быстро, Современнo",
        desc: "Evocabank - это банк, предоставляющий быстрые, простые и инновационные услуги.",
        button: "Стать клиентом"
      },
      hashivner: {
        breadcrumb_parent: "Физическим лицам",
        title: "Счета",
        become_client: "Стать клиентом",
        online_banking: "Онлайн банкинг",
        online_desc: "Evocabank - банк, предоставляющий быстрые, простые и инновационные услуги.",
        loading: "Загрузка..."
      },
      news: {
        title: "Ежемесячный отчет",
        blog_label: "Блог",
        see_all: "Смотреть все",
        archive: "Архив",
        back: "Назад",
        read_more: "Читать далее",
        reading_time: "8 мин чтения",
        share: "Поделиться",
        featured: "Специальное",
        categories: {
          all: "Все",
          business: "Бизнес",
          lifestyle: "Лайфстайл",
          investments: "Инвестиции"
        }
      },
      exchange: {
        loading: "Загрузка...",
        disclaimer: "При обмене суммы свыше 20 000 долларов США или эквивалента сделка осуществляется на усмотрение Банка по курсу, установленному Банком.",
        tabs: {
          cash: "Наличные",
          cashless: "Безналичные",
          gold: "Курс золота"
        },
        table: {
          currency: "Валюта",
          buy: "Покупка",
          sell: "Продажа"
        },
        calc: {
          have: "У меня есть",
          get: "Я получу",
          info: "* Расчет производится по курсу продажи {{code}} ({{rate}})"
        },
        gold: {
          purity: "Проба",
          price: "Цена (1 грамм)"
        },
        address: {
          title: "Наши адреса",
          desc: "Адреса отделений банка, часы работы и банкоматы.",
          btn: "ПОСМОТРЕТЬ НА КАРТЕ"
        }
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
        success_alert: "Платеж принят",
        error_alert: "Произошла ошибка при оплате"
      },
      common: {
        login: "Вход",
        support: "Круглосуточная поддержка",
        "LOGIN": "Вход",
        soon: "СКОРО"
      },
      about_page: {
        menu: {
          info: "О Банке",
          structure: "Структура",
          shareholders: "Акционеры",
          management: "Руководство",
          partners: "Партнеры",
          reviews: "Отзывы",
          csr: "КСО",
        },
        info: {
          title: "МЫ ПРЕДОСТАВЛЯЕМ ЦИФРОВЫЕ ФИНАНСОВЫЕ УСЛУГИ",
          desc: "Evocabank - первый и единственный Mobile-first банк в Армении, основанный в 1990 году."
        }
      },
      footer: {
        chat: "Чат",
        address: "г. Ереван, 0010, ул. Республики 44/2",
        central_bank_note: "Эвокабанк контролируется Центральным банком Республики Армения",
        all_rights_reserved: "ВСЕ ПРАВА ЗАЩИЩЕНЫ",
        about_bank: {
          title: "О Банке",
          about_us: "О нас",
          management: "Руководство",
          shareholders: "Акционеры",
          jobs: "Вакансии",
          legal_acts: "Юридические акты",
          tariffs: "Тарифы",
          property: "Продажа имущества",
        },
        useful_links: {
          title: "Полезные ссылки",
          customer_rights: "Права клиента",
          complaint_standards: "Стандарты жалоб клиентов",
          regulation: "Регулирование",
          privacy_policy: "Политика конфиденциальности",
          fin_mediator: "Фин. посредник",
        },
        other_links: {
          title: "Другие ссылки",
          online: "EvocaONLINE",
          safes: "Сейфы",
          faq: "Часто задаваемые вопросы",
          announcements: "Объявления",
          library: "Библиотека",
        },
        contact: {
          branches: "Адреса и часы работы Банка",
        }
      },
      partners_section: {
        hero_title: "Цифровое <br /> Будущее Здесь",
        hero_desc: "Evocabank продолжает удивлять своими инновационными решениями. Присоединяйтесь к нашему технологическому миру.",
        partners_title: "Наши Партнеры",
        partners_desc: "Станьте партнером Evocabank и давайте вместе двигаться к красочной новой реальности.",
        all_partners: "Все партнеры",
        loading: "Загрузка..."
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