export type WeekdayKey = "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";

export type DayHours = {
  key: WeekdayKey;
  label: string;
  shortLabel: string;
  hours: string;
  isClosed?: boolean;
};

export type AmenityItem = {
  icon: string;
  label: string;
};

export type AmenityGroup = {
  title: string;
  items: AmenityItem[];
};

export type MiniSiteData = {
  statusLabel: string;
  statusDescription: string;
  isOpen: boolean;
  hoursByDay: DayHours[];
  amenities: AmenityGroup[];
  gallery: { src: string; alt: string }[];
  address: string;
  phone: string;
  phoneDisplay: string;
  telegramUrl: string;
  mapImage: string;
  mapLink: string;
};

export const MINI_SITE_DATA: MiniSiteData = {
  statusLabel: "باز است",
  statusDescription: "پذیرای شما هستیم",
  isOpen: true,
  hoursByDay: [
    { key: "sat", label: "شنبه", shortLabel: "ش", hours: "۸:۰۰ صبح تا ۱۱:۴۵ شب" },
    { key: "sun", label: "یکشنبه", shortLabel: "ی", hours: "۸:۰۰ صبح تا ۱۱:۴۵ شب" },
    { key: "mon", label: "دوشنبه", shortLabel: "د", hours: "۸:۰۰ صبح تا ۱۱:۴۵ شب" },
    { key: "tue", label: "سه‌شنبه", shortLabel: "س", hours: "۸:۰۰ صبح تا ۱۱:۴۵ شب" },
    { key: "wed", label: "چهارشنبه", shortLabel: "چ", hours: "۸:۰۰ صبح تا ۱۱:۴۵ شب" },
    { key: "thu", label: "پنجشنبه", shortLabel: "پ", hours: "۹:۰۰ صبح تا ۱۲:۰۰ شب" },
    { key: "fri", label: "جمعه", shortLabel: "ج", hours: "۱۰:۰۰ صبح تا ۱۱:۰۰ شب" },
  ],
  amenities: [
    {
      title: "نوشیدنی و غذا",
      items: [
        { icon: "🍳", label: "وعده‌های سرو: صبحانه، ناهار، شام" },
        { icon: "☕", label: "قهوه تخصصی" },
        { icon: "🥗", label: "گزینه‌های سالم و گیاهی" },
      ],
    },
    {
      title: "آسایش و رفاهی",
      items: [
        { icon: "🎵", label: "موسیقی پخش‌زنده: ملایم و آرام" },
        { icon: "📶", label: "اینترنت وای‌فای رایگان" },
        { icon: "🅿️", label: "پارکینگ مهمان" },
      ],
    },
  ],
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80&auto=format&fit=crop",
      alt: "نمای داخلی رستوران",
    },
    {
      src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80&auto=format&fit=crop",
      alt: "فضای نشستن رستوران",
    },
    {
      src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&q=80&auto=format&fit=crop",
      alt: "کانتر کافه",
    },
    {
      src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80&auto=format&fit=crop",
      alt: "محیط بیرونی رستوران",
    },
  ],
  address: "تهران، خیابان نمونه، کوچه اول، پلاک ۱۲",
  phone: "+982100000000",
  phoneDisplay: "۰۲۱-۰۰۰۰۰۰۰۰",
  telegramUrl: "https://t.me/example_restaurant",
  mapImage:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80&auto=format&fit=crop",
  mapLink: "https://maps.google.com/?q=Tehran",
};

export function getTodayKey(): WeekdayKey {
  const day = new Date().getDay();
  const map: WeekdayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return map[day] ?? "sat";
}
