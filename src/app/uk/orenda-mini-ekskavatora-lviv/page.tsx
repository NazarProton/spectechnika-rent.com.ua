import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, PhoneCall, Ruler, Wrench } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { ContactButtons } from "@/components/contact-buttons";
import { GallerySlider } from "@/components/gallery-slider";
import { LeadForm } from "@/components/lead-form";
import { contactHref, siteConfig } from "@/lib/config";
import { gallery, type Channel } from "@/lib/content";

const canonicalPath = "/uk/orenda-mini-ekskavatora-lviv";
const canonicalUrl = `${siteConfig.url}${canonicalPath}`;

const buttons = ([
  { channel: "phone", label: "Подзвонити", href: contactHref("phone"), primary: true },
  { channel: "whatsapp", label: "WhatsApp", href: contactHref("whatsapp") },
  { channel: "telegram", label: "Telegram", href: contactHref("telegram") },
  { channel: "viber", label: "Viber", href: contactHref("viber") },
] satisfies { channel: Channel; label: string; href: string; primary?: boolean }[]);

const services = [
  "копання траншей під воду, каналізацію, електрику, газ та інші комунікації",
  "котловани, фундаменти, приямки, септики, колодязі та технічні заглиблення",
  "дренаж ділянки, водовідведення, підготовка під труби й інженерні мережі",
  "планування ділянки, зняття шару грунту, підсипка, благоустрій території",
  "роботи біля приватних будинків, котеджів, таунхаусів і новобудов",
  "підбір іншої спецтехніки, оператора або бригади під нестандартний об'єкт",
];

const faq = [
  [
    "Скільки коштує оренда мініекскаватора у Львові?",
    "Ціна залежить від типу робіт, локації, тривалості, доставки техніки та потрібного навісного обладнання. Найшвидше - подзвонити або написати, описати задачу й отримати розрахунок під конкретний об'єкт.",
  ],
  [
    "Чи можна замовити міні екскаватор з оператором?",
    "Так. Послуга орієнтована саме на мініекскаватор з оператором, щоб робота була виконана акуратно, швидко й без зайвих ризиків для ділянки.",
  ],
  [
    "Де працюєте?",
    "Основний напрям - Львів та Львівська область. Виїзд у конкретний населений пункт узгоджується телефоном залежно від обсягу робіт і логістики.",
  ],
  [
    "Які ковші є для мініекскаваторів?",
    "Для Wacker Neuson 38Z3 доступні ковші 30, 40, 50, 75 і 120 см. Для Kubota U35-3A3 - 30, 45, 70 і 120 см. Також для Kubota є ямобур до 4 м зі шнеками 20, 30 і 40 см.",
  ],
  [
    "Що робити, якщо потрібна інша спецтехніка?",
    "Звертайтесь все одно. Ігор допоможе зорієнтуватися, яку техніку або спеціалістів краще залучити під вашу задачу.",
  ],
];

export const metadata: Metadata = {
  title: "Оренда мініекскаватора Львів | Міні екскаватор з оператором",
  description:
    "Оренда мініекскаватора у Львові та Львівській області. Міні екскаватор з оператором для траншей, фундаментів, дренажу, планування ділянок і земляних робіт.",
  keywords: [
    "оренда міні екскаватора львів",
    "оренда мініекскаватора львів",
    "оренда міні-екскаватора львів",
    "послуги міні екскаватора львів",
    "міні екскаватор з оператором львів",
    "земляні роботи львів",
    "копання траншей львів",
    "оренда екскаватора львівська область",
    "Wacker Neuson 38Z3 Львів",
    "Kubota U35 Львів",
  ],
  alternates: {
    canonical: canonicalUrl,
    languages: {
      uk: canonicalUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: canonicalUrl,
    siteName: siteConfig.name,
    title: "Оренда мініекскаватора у Львові та області",
    description:
      "Міні екскаватор з оператором: траншеї, фундаменти, дренаж, планування ділянок. Львів і Львівська область.",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Оренда мініекскаватора у Львові та Львівській області",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Оренда мініекскаватора Львів",
    description: "Міні екскаватор з оператором для земляних робіт у Львові та області.",
    images: ["/brand/og-image.png"],
  },
};

function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: "Спецтехніка Рент",
    alternateName: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/brand/og-image.png`,
    logo: `${siteConfig.url}/brand/logo-full-white.png`,
    telephone: siteConfig.contact.phone,
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Львів" },
      { "@type": "AdministrativeArea", name: "Львівська область" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      name: "Ігор",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      availableLanguage: ["uk", "en"],
    },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    name: "Оренда мініекскаватора у Львові",
    serviceType: "Оренда мініекскаватора з оператором",
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: ["Львів", "Львівська область"],
    url: canonicalUrl,
    description:
      "Мініекскаватор з оператором для траншей, фундаментів, дренажу, планування ділянок, комунікацій і земляних робіт у Львові та Львівській області.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Послуги мініекскаватора",
      itemListElement: services.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Головна",
        item: `${siteConfig.url}/uk`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Оренда мініекскаватора Львів",
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      {[localBusiness, service, faqPage, breadcrumbs].map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
    </>
  );
}

export default function MiniExcavatorRentalLvivPage() {
  const slides = gallery.map((item) => ({
    src: item.src,
    alt: item.altUk,
  }));

  return (
    <>
      <JsonLd />
      <header className="sticky top-0 z-40 h-16 bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/uk" aria-label="На головну">
            <BrandLogo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-700 lg:flex">
            <a href="#price" className="hover:text-black">Ціна</a>
            <a href="#services" className="hover:text-black">Роботи</a>
            <a href="#equipment" className="hover:text-black">Техніка</a>
            <a href="#faq" className="hover:text-black">FAQ</a>
            <a href="#contacts" className="hover:text-black">Контакти</a>
          </nav>
          <a href={contactHref("phone")} className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-yellow-400 px-3 text-sm font-black text-black hover:bg-yellow-300 sm:px-4">
            <PhoneCall className="size-4" />
            <span className="hidden sm:inline">{siteConfig.contact.phoneDisplay}</span>
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-zinc-950 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/excavator-transport-yellow-optimized.jpg"
              alt="Оренда мініекскаватора у Львові"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-65"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.97),rgba(9,9,11,0.78),rgba(9,9,11,0.32))]" />
          </div>
          <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl content-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex rounded-md bg-yellow-400 px-3 py-1 text-sm font-black text-black">Львів та Львівська область</p>
              <h1 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">
                Оренда мініекскаватора у Львові та області
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-100">
                Міні екскаватор з оператором для траншей, фундаментів, дренажу, комунікацій, планування ділянки та інших земляних робіт. Працюємо по Львову й Львівській області.
              </p>
              <div className="mt-8">
                <ContactButtons buttons={buttons} locale="uk" />
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {["Wacker Neuson 38Z3", "Kubota U35-3A3", "Ковші та ямобур"].map((item) => (
                  <div key={item} className="border-l-4 border-yellow-400 bg-white/10 px-4 py-3 text-sm font-bold backdrop-blur">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="self-end rounded-md border border-white/15 bg-black/40 p-5 backdrop-blur">
              <div className="flex items-start gap-3">
                <PhoneCall className="mt-1 size-6 text-yellow-300" />
                <div>
                  <p className="font-black">Швидкий прорахунок</p>
                  <p className="mt-2 text-zinc-200">Опишіть задачу, адресу, обсяг робіт і потрібну дату. Ігор зорієнтує по техніці та вартості.</p>
                  <p className="mt-4 text-2xl font-black">{siteConfig.contact.phoneDisplay}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="price" className="bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase text-yellow-700">Ціна оренди</p>
              <h2 className="mt-3 text-3xl font-black text-zinc-950 sm:text-4xl">Скільки коштує міні екскаватор у Львові</h2>
              <p className="mt-4 text-lg leading-8 text-zinc-600">
                Вартість залежить від об&apos;єкта, обсягу робіт, доставки, тривалості, ковша або ямобура. Щоб не називати випадкову цифру, краще швидко уточнити задачу телефоном.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Локація", "Львів, передмістя або населений пункт в області впливають на логістику."],
                ["Тип робіт", "Траншея, фундамент, дренаж, планування або ямобур мають різний час виконання."],
                ["Навісне обладнання", "Ковші 30-120 см, для Kubota також ямобур до 4 м."],
                ["Тривалість", "Кілька годин, зміна або більший обсяг рахуються окремо."],
              ].map(([title, text]) => (
                <article key={title} className="rounded-md border border-zinc-200 bg-zinc-50 p-5">
                  <h3 className="font-black text-zinc-950">{title}</h3>
                  <p className="mt-2 leading-7 text-zinc-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-zinc-100 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase text-yellow-700">Послуги міні-екскаватора</p>
              <h2 className="mt-3 text-3xl font-black text-zinc-950 sm:text-4xl">Земляні роботи, траншеї, фундаменти, дренаж</h2>
              <p className="mt-4 text-lg leading-8 text-zinc-600">
                На сторінці використані всі нормальні варіанти запиту: мініекскаватор, міні екскаватор, міні-екскаватор, послуги міні екскаватора у Львові. Але текст написаний для людей, не як набір ключових слів.
              </p>
            </div>
            <div className="grid gap-3">
              {services.map((service) => (
                <div key={service} className="flex gap-3 rounded-md border border-zinc-200 bg-white p-4">
                  <ArrowRight className="mt-1 size-5 shrink-0 text-yellow-600" />
                  <p className="font-semibold leading-7 text-zinc-800">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="equipment" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase text-yellow-700">Техніка</p>
              <h2 className="mt-3 text-3xl font-black text-zinc-950 sm:text-4xl">Мініекскаватори Wacker Neuson та Kubota</h2>
              <p className="mt-4 text-lg leading-8 text-zinc-600">
                Для робіт у дворах, біля будинків, на вузьких ділянках і будівельних майданчиках доступні компактні машини з оператором.
              </p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[
                {
                  icon: CheckCircle2,
                  title: "Wacker Neuson 38Z3",
                  text: "Вага 3600 кг. Ковші 30, 40, 50, 75 і 120 см. Підходить для траншей, фундаментів, дренажу й планування.",
                },
                {
                  icon: Ruler,
                  title: "Kubota U35-3A3",
                  text: "Ковші 30, 45, 70 і 120 см. Компактна машина для приватних та будівельних об'єктів у Львові й області.",
                },
                {
                  icon: Wrench,
                  title: "Ямобур до 4 м",
                  text: "Для Kubota доступний ямобур зі шнеками 20, 30 і 40 см. Підходить для отворів під палі, стовпи та інші задачі.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-md border border-zinc-200 bg-zinc-50 p-6">
                  <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-yellow-400 text-black">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-xl font-black text-zinc-950">{title}</h3>
                  <p className="mt-3 leading-7 text-zinc-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-yellow-400 px-3 py-1 text-sm font-black text-black">
                <MapPin className="size-4" />
                Львівська область
              </div>
              <h2 className="text-3xl font-black sm:text-4xl">Виїзд по Львову та області</h2>
              <p className="mt-5 text-lg leading-8 text-zinc-200">
                Основний фокус - Львів, передмістя та Львівська область. Якщо об&apos;єкт за містом, логістику й подачу техніки узгоджуємо окремо.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Львів", "Винники", "Брюховичі", "Сокільники", "Зимна Вода", "Пустомити", "Дубляни", "Львівська область"].map((place) => (
                <div key={place} className="rounded-md border border-white/15 bg-white/10 px-4 py-3 font-bold backdrop-blur">
                  {place}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-black text-zinc-950 sm:text-4xl">Фото техніки та робіт</h2>
            <GallerySlider slides={slides} />
          </div>
        </section>

        <section id="contacts" className="bg-zinc-100 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase text-yellow-700">Контакти</p>
              <h2 className="mt-3 text-3xl font-black text-zinc-950 sm:text-4xl">Замовити мініекскаватор у Львові</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
                Подзвоніть або напишіть нам. Якщо потрібна не тільки оренда міні екскаватора, а й інша спецтехніка або спеціалісти, Ігор допоможе підібрати рішення під задачу.
              </p>
              <div className="mt-8">
                <ContactButtons buttons={buttons} locale="uk" />
              </div>
            </div>
            <div className="rounded-md bg-white p-6 text-zinc-950 shadow-sm">
              <h3 className="mb-4 text-xl font-black">Коротка заявка</h3>
              <LeadForm
                locale="uk"
                labels={{
                  name: "Ваше ім'я",
                  phone: "Телефон",
                  message: "Що потрібно зробити?",
                  submit: "Надіслати заявку",
                  success: "Заявку отримано. Ми зв'яжемось з вами.",
                  error: "Щось пішло не так. Подзвоніть нам напряму.",
                }}
              />
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-black uppercase text-yellow-700">FAQ</p>
              <h2 className="mt-3 text-3xl font-black text-zinc-950 sm:text-4xl">Питання про оренду мініекскаватора</h2>
            </div>
            <div className="divide-y divide-zinc-200 border-y border-zinc-200">
              {faq.map(([question, answer]) => (
                <details key={question} className="group py-5">
                  <summary className="cursor-pointer list-none text-lg font-black text-zinc-950">{question}</summary>
                  <p className="mt-3 leading-7 text-zinc-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 text-sm text-zinc-600 sm:px-6 lg:px-8">
          <ContactButtons buttons={buttons} locale="uk" compact grid />
          <p className="text-center">© {new Date().getFullYear()} Spectehnika Rent. Львівська область.</p>
        </div>
      </footer>
    </>
  );
}
