import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Languages, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { BrandLogo } from "./brand-logo";
import { ContactButtons } from "./contact-buttons";
import { GallerySlider } from "./gallery-slider";
import { LeadForm } from "./lead-form";
import { MobileMenu } from "./mobile-menu";
import { contactHref, localizedUrl, siteConfig, type Locale } from "@/lib/config";
import { content, gallery, type Channel } from "@/lib/content";

function contactButtons(locale: Locale) {
  const labels: Record<Locale, Record<Channel, string>> = {
    uk: {
      phone: "Подзвонити",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      viber: "Viber",
    },
    en: {
      phone: "Call",
      whatsapp: "WhatsApp",
      telegram: "Telegram",
      viber: "Viber",
    },
  };

  return (["phone", "whatsapp", "telegram", "viber"] as Channel[]).map((channel) => ({
    channel,
    label: labels[locale][channel],
    href: contactHref(channel),
    disabled: channel === "telegram" && !siteConfig.contact.telegramUrl,
    primary: channel === "phone",
  }));
}

function JsonLd({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const base = localizedUrl(locale);
  const contactPerson = locale === "uk" ? "Ігор" : siteConfig.contact.person;
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/brand/og-image.png`,
    telephone: siteConfig.contact.phone,
    areaServed: ["Lviv", "Lviv oblast"],
    priceRange: "$$",
    description: copy.seo.description,
    contactPoint: {
      "@type": "ContactPoint",
      name: contactPerson,
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      availableLanguage: ["uk", "en"],
    },
  };
  const services = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: locale === "uk" ? "Оренда мініекскаватора та спецтехніки" : "Mini excavator and special equipment rental",
    provider: { "@id": `${siteConfig.url}/#business` },
    areaServed: ["Lviv", "Lviv oblast"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: copy.services.title,
      itemListElement: copy.services.items.map((item) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item } })),
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map(([question, answer]) => ({
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
        name: siteConfig.name,
        item: base,
      },
    ],
  };

  return (
    <>
      {[localBusiness, services, faq, breadcrumbs].map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export function SitePage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const otherLocale = locale === "uk" ? "en" : "uk";
  const currentLocaleLabel = locale === "uk" ? "УК" : "EN";
  const contactPerson = locale === "uk" ? "Ігор" : siteConfig.contact.person;
  const anchors = ["equipment", "services", "gallery", "faq", "contacts"];
  const buttons = contactButtons(locale);
  const slides = gallery.map((item) => ({
    src: item.src,
    alt: locale === "uk" ? item.altUk : item.altEn,
  }));

  return (
    <>
      <JsonLd locale={locale} />
      <header className="sticky top-0 z-40 h-16 bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}#top`} className="flex items-center gap-3" aria-label="Spectehnika Rent">
            <BrandLogo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-700 lg:flex">
            {copy.nav.map((item, index) => (
              <a key={item} href={`#${anchors[index]}`} className="hover:text-black">
                {item}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href={`/${otherLocale}`}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-sm font-bold text-zinc-900 hover:bg-zinc-50"
            >
              <Languages className="size-4" />
              {currentLocaleLabel}
            </Link>
            <a
              href={contactHref("phone")}
              className="hidden h-10 items-center rounded-md bg-yellow-400 px-4 text-sm font-black text-black hover:bg-yellow-300 sm:inline-flex"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
          <MobileMenu
            nav={copy.nav}
            anchors={anchors}
            buttons={buttons}
            otherLocale={otherLocale}
            currentLocaleLabel={currentLocaleLabel}
          />
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="relative scroll-mt-16 overflow-hidden bg-zinc-950 text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/excavator-transport-yellow-optimized.jpg"
              alt={slides[0].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-70"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.96),rgba(9,9,11,0.72),rgba(9,9,11,0.18))]" />
          </div>
          <div className="relative mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl content-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex rounded-md bg-yellow-400 px-3 py-1 text-sm font-black text-black">{copy.hero.kicker}</p>
              <h1 className="text-4xl font-black leading-tight tracking-normal sm:text-5xl lg:text-6xl">{copy.hero.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-100">{copy.hero.body}</p>
              <div className="mt-8">
                <ContactButtons buttons={buttons} locale={locale} />
              </div>
              {locale === "uk" && (
                <Link
                  href="/uk/orenda-mini-ekskavatora-lviv"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black text-yellow-300 underline decoration-yellow-300/60 underline-offset-4 hover:text-yellow-200"
                >
                  Окрема сторінка: оренда мініекскаватора у Львові
                  <ArrowRight className="size-4" />
                </Link>
              )}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {copy.hero.stats.map((stat) => (
                  <div key={stat} className="border-l-4 border-yellow-400 bg-white/10 px-4 py-3 text-sm font-bold backdrop-blur">
                    {stat}
                  </div>
                ))}
              </div>
            </div>
            <div className="self-end border border-white/15 bg-black/35 p-5 backdrop-blur">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-1 size-6 text-yellow-300" />
                <div>
                  <p className="font-black">{locale === "uk" ? "Контактна особа" : "Contact person"}</p>
                  <p className="mt-1 text-2xl font-black">{contactPerson}</p>
                  <p className="mt-2 text-zinc-200">{siteConfig.contact.phoneDisplay}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="equipment" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase text-yellow-600">{locale === "uk" ? "Техніка" : "Equipment"}</p>
              <h2 className="mt-3 text-3xl font-black text-zinc-950 sm:text-4xl">{copy.equipment.title}</h2>
              <p className="mt-4 text-lg leading-8 text-zinc-600">{copy.equipment.lead}</p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {copy.equipment.items.map((item, index) => (
                <article key={item.name} className="rounded-md border border-zinc-200 bg-zinc-50 p-6">
                  <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-yellow-400 text-black">
                    {index === 2 ? <Wrench className="size-5" /> : <CheckCircle2 className="size-5" />}
                  </div>
                  <h3 className="text-xl font-black text-zinc-950">{item.name}</h3>
                  <p className="mt-3 leading-7 text-zinc-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="bg-zinc-100 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase text-yellow-700">{locale === "uk" ? "Послуги" : "Services"}</p>
              <h2 className="mt-3 text-3xl font-black text-zinc-950 sm:text-4xl">{copy.services.title}</h2>
              <p className="mt-4 text-lg leading-8 text-zinc-600">{copy.services.lead}</p>
            </div>
            <div className="grid gap-3">
              {copy.services.items.map((item) => (
                <div key={item} className="flex gap-3 rounded-md border border-zinc-200 bg-white p-4">
                  <ArrowRight className="mt-1 size-5 shrink-0 text-yellow-600" />
                  <p className="font-semibold leading-7 text-zinc-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-black text-zinc-950 sm:text-4xl">{copy.galleryTitle}</h2>
            <GallerySlider slides={slides} />
          </div>
        </section>

        <section id="contacts" className="bg-zinc-950 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:px-8">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-yellow-400 px-3 py-1 text-sm font-black text-black">
                <MapPin className="size-4" />
                {locale === "uk" ? "Львів / Львівська область" : "Lviv / Lviv oblast"}
              </div>
              <h2 className="text-3xl font-black sm:text-4xl">{copy.contact.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-200">{copy.contact.body}</p>
              <div className="mt-8">
                <ContactButtons buttons={buttons} locale={locale} />
              </div>
            </div>
            <div className="rounded-md bg-white p-6 text-zinc-950">
              <h3 className="mb-4 text-xl font-black">{copy.contact.formTitle}</h3>
              <LeadForm
                locale={locale}
                labels={{
                  name: copy.contact.name,
                  phone: copy.contact.phone,
                  message: copy.contact.message,
                  submit: copy.contact.submit,
                  success: locale === "uk" ? "Заявку збережено. Ми зв'яжемось з вами." : "Request saved. We will contact you.",
                  error: locale === "uk" ? "Щось пішло не так. Подзвоніть нам напряму." : "Something went wrong. Please call us directly.",
                }}
              />
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-zinc-950 sm:text-4xl">FAQ</h2>
            <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
              {copy.faq.map(([question, answer]) => (
                <details key={question} className="group py-5">
                  <summary className="cursor-pointer list-none text-lg font-black text-zinc-950">
                    {question}
                  </summary>
                  <p className="mt-3 leading-7 text-zinc-600">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 text-sm text-zinc-600 sm:px-6 lg:px-8">
          <ContactButtons
            buttons={buttons.filter((button) => button.channel !== "telegram" || !button.disabled)}
            locale={locale}
            compact
            grid
          />
          <p className="text-center">© {new Date().getFullYear()} Spectehnika Rent. Lviv region.</p>
        </div>
      </footer>
    </>
  );
}
