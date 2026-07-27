import type { Locale } from "./config";

export type Channel = "phone" | "whatsapp" | "telegram" | "viber";

export const gallery = [
  {
    src: "/images/excavator-transport-yellow-optimized.jpg",
    altUk: "Жовтий мініекскаватор Wacker Neuson на евакуаторі у Львівській області",
    altEn: "Yellow Wacker Neuson mini excavator on transport in Lviv oblast",
  },
  {
    src: "/images/site-grading-lviv-optimized.jpg",
    altUk: "Планування ділянки мініекскаватором біля новобудови",
    altEn: "Site grading with a mini excavator near new houses",
  },
  {
    src: "/images/trench-digging-mini-excavator-optimized.jpg",
    altUk: "Копання траншеї мініекскаватором для комунікацій",
    altEn: "Mini excavator digging a utility trench",
  },
  {
    src: "/images/orange-mini-excavator-transport-optimized.jpg",
    altUk: "Другий мініекскаватор на платформі для доставки на об'єкт",
    altEn: "Second mini excavator on a platform ready for job-site delivery",
  },
  {
    src: "/images/wacker-neuson-mini-excavator-optimized.jpg",
    altUk: "Мініекскаватор Wacker Neuson 38Z3 перед виїздом на роботу",
    altEn: "Wacker Neuson 38Z3 mini excavator before dispatch",
  },
  {
    src: "/images/wacker-neuson-38z3-product-optimized.jpg",
    altUk: "Мініекскаватор Wacker Neuson 38Z3",
    altEn: "Wacker Neuson 38Z3 mini excavator",
  },
];

export const content = {
  uk: {
    seo: {
      title: "Оренда мініекскаватора у Львові та області",
      description:
        "Оренда мініекскаватора з оператором у Львові та Львівській області. Земляні роботи, траншеї, фундаменти, дренаж, благоустрій, підбір спецтехніки під запит.",
      keywords:
        "оренда мініекскаватора Львів, оренда спецтехніки Львів, міні екскаватор Львівська область, земляні роботи Львів, копання траншей, оренда екскаватора з оператором, дренаж Львів, фундаментні роботи, планування ділянки, благоустрій території, спецтехніка Львівська область",
    },
    nav: ["Техніка", "Роботи", "Галерея", "FAQ", "Контакти"],
    hero: {
      kicker: "Оренда спецтехніки з оператором у Львові та області",
      title: "Оренда мініекскаватора у Львові та Львівській області.",
      body:
        "Копаємо траншеї, котловани, фундаменти, дренаж, плануємо ділянки та виконуємо інші земляні роботи. Працюємо з оператором, виїзд по Львову та Львівській області.",
      primary: "Подзвонити нам",
      secondary: "Написати в месенджер",
      stats: ["Техніка під вашу задачу", "Львів і область", "Роботи під ключ"],
    },
    equipment: {
      title: "Техніка зараз і під замовлення",
      lead:
        "Починаємо з мініекскаваторів для робіт у місцях, де велика техніка не проходить. Якщо потрібна інша машина, навісне обладнання або бригада, допоможемо домовитись з перевіреними спеціалістами ринку.",
      items: [
        {
          name: "Wacker Neuson 38Z3",
          text: "Мініекскаватор вагою 3600 кг для траншей, фундаментів, дренажу, планування та робіт біля будинків. Доступні ковші: 30, 40, 50, 75 і 120 см.",
        },
        {
          name: "Kubota U35-3A3",
          text: "Компактний мініекскаватор для приватних і будівельних об'єктів. Ковші: 30, 45, 70 і 120 см. Додатково є ямобур до 4 м зі шнеками 20, 30 і 40 см.",
        },
        {
          name: "Більше техніки згодом",
          text: "Якщо потрібна інша спецтехніка, навісне обладнання, оператори або профільні майстри, допоможемо підібрати рішення під конкретну задачу.",
        },
      ],
    },
    services: {
      title: "Роботи, які можна закрити",
      lead:
        "Команда бере як прості виїзди на кілька годин, так і складніші задачі з підбором техніки, оператора та спеціалістів.",
      items: [
        "Копання траншей під воду, каналізацію, електрику та інженерні мережі",
        "Розробка котлованів, фундаментів, приямків і технічних заглиблень",
        "Дренаж, водовідведення, підготовка під септики та колодязі",
        "Планування ділянок, благоустрій, зняття шару ґрунту й підсипка",
        "Роботи біля приватних будинків, таунхаусів, комерційних і будівельних об'єктів",
        "Пошук іншої спецтехніки, операторів і майстрів під нестандартну задачу",
      ],
    },
    galleryTitle: "Реальні роботи та техніка",
    contact: {
      title: "Потрібна техніка або спеціалісти?",
      body:
        "Напишіть або подзвоніть нам. Якщо задачі немає в списку, все одно варто звернутись: можна домовитись за іншу техніку, потрібних майстрів і повний обсяг робіт.",
      formTitle: "Коротка заявка",
      name: "Ваше ім'я",
      phone: "Телефон",
      message: "Що потрібно зробити?",
      submit: "Надіслати заявку",
    },
    faq: [
      ["Де працює Spectehnika Rent?", "Основний фокус - Львів і Львівська область. Виїзд і логістику по конкретному об'єкту уточнюємо під час дзвінка."],
      ["Чи можна орендувати мініекскаватор з оператором?", "Так. Сайт орієнтований саме на роботи з оператором, щоб задача була виконана швидко й акуратно."],
      ["Що робити, якщо потрібна інша спецтехніка?", "Подзвоніть або напишіть нам. Допоможемо знайти потрібну техніку, оператора або бригаду під конкретний запит."],
      ["Як формується ціна?", "Ціна залежить від типу робіт, локації, тривалості, доставки та потрібного обладнання. Найшвидше - описати задачу телефоном або в месенджері."],
    ],
  },
  en: {
    seo: {
      title: "Mini Excavator Rental in Lviv Region",
      description:
        "Mini excavator rental with operator in Lviv and Lviv oblast. Excavation, trenching, foundations, drainage, landscaping, site preparation and custom equipment requests.",
      keywords:
        "mini excavator rental Lviv, excavator rental Lviv region, special equipment rental Lviv oblast, excavation services Lviv, trench digging, drainage excavation, foundation excavation, landscaping machinery, construction equipment with operator",
    },
    nav: ["Equipment", "Services", "Gallery", "FAQ", "Contacts"],
    hero: {
      kicker: "Special equipment rental with operator in Lviv region",
      title: "Mini excavator rental in Lviv and Lviv oblast.",
      body:
        "We dig trenches, pits, foundations and drainage, prepare sites, grade land and handle other earthworks with an operator. Available in Lviv and Lviv oblast.",
      primary: "Call us",
      secondary: "Message us",
      stats: ["Equipment for your task", "Lviv and region", "Turnkey earthworks"],
    },
    equipment: {
      title: "Current fleet and equipment by request",
      lead:
        "We start with mini excavators for places where large machinery cannot work comfortably. If another machine, attachment or crew is needed, we can arrange trusted specialists on the market.",
      items: [
        {
          name: "Wacker Neuson 38Z3",
          text: "A 3,600 kg mini excavator for trenches, foundations, drainage, grading and work around houses. Available buckets: 30, 40, 50, 75 and 120 cm.",
        },
        {
          name: "Kubota U35-3A3",
          text: "A compact mini excavator for private and construction sites. Buckets: 30, 45, 70 and 120 cm. Auger available up to 4 m with 20, 30 and 40 cm bits.",
        },
        {
          name: "More machines coming",
          text: "If another machine, attachment, operator or specialist crew is needed, we can help arrange the right setup for the task.",
        },
      ],
    },
    services: {
      title: "Work types we can cover",
      lead:
        "The team handles both simple short jobs and more complex tasks that need equipment, an operator and specialist coordination.",
      items: [
        "Trenches for water, sewage, electricity and utility networks",
        "Foundation excavation, pits and technical groundwork",
        "Drainage, water management, septic and well preparation",
        "Site grading, landscaping, soil removal and backfilling",
        "Private houses, townhouses, commercial and construction sites",
        "Finding other special equipment, operators and crews for custom jobs",
      ],
    },
    galleryTitle: "Real equipment and work",
    contact: {
      title: "Need equipment or specialists?",
      body:
        "Call or message us. If your task is not listed, it is still worth asking: other machinery, skilled operators and the full scope of work can often be arranged.",
      formTitle: "Quick request",
      name: "Your name",
      phone: "Phone",
      message: "What do you need done?",
      submit: "Send request",
    },
    faq: [
      ["Where does Spectehnika Rent work?", "The main focus is Lviv and Lviv oblast. Dispatch and logistics are confirmed for each job by phone."],
      ["Can I rent a mini excavator with an operator?", "Yes. The service is focused on machinery with an operator so the job is done quickly and accurately."],
      ["What if I need another type of equipment?", "Call or message us. We can help find the right machine, operator or crew for a specific request."],
      ["How is pricing calculated?", "Pricing depends on work type, location, duration, delivery and required equipment. The fastest way is to describe the job by phone or messenger."],
    ],
  },
} satisfies Record<Locale, {
  seo: { title: string; description: string; keywords: string };
  nav: string[];
  hero: { kicker: string; title: string; body: string; primary: string; secondary: string; stats: string[] };
  equipment: { title: string; lead: string; items: { name: string; text: string }[] };
  services: { title: string; lead: string; items: string[] };
  galleryTitle: string;
  contact: { title: string; body: string; formTitle: string; name: string; phone: string; message: string; submit: string };
  faq: [string, string][];
}>;
