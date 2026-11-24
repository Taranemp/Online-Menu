import { DEFAULT_CATEGORIES } from "./categories";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  categorySlug: string;
  image?: string;
};

type CategorySeed = {
  names: string[];
  descriptions: string[];
  prices: string[];
  images: string[];
};

const CATEGORY_SEEDS: Record<string, CategorySeed> = {
  salads: {
    names: ["سالاد سزار", "سالاد یونانی", "سالاد فصل", "سالاد کینوا"],
    descriptions: [
      "کاهو تازه، سس سزار مخصوص، نان کروتان و پنیر پارمزان",
      "خیار، گوجه، زیتون، پنیر فتا و روغن زیتون فرابکر",
      "سبزیجات تازه فصل با سس لیمو و سبزیجات معطر",
      "کینوا، آووکادو، گوجه گیلاسی و سس بالزامیک",
    ],
    prices: ["۱۴۵٬۰۰۰ تومان", "۱۳۵٬۰۰۰ تومان", "۱۱۰٬۰۰۰ تومان", "۱۶۵٬۰۰۰ تومان"],
    images: [
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1200&q=80&auto=format&fit=crop",
    ],
  },
  appetizers: {
    names: ["سوپ قارچ", "نان سیر", "سیب‌زمینی ویژه", "بروسکتا"],
    descriptions: [
      "سوپ خامه‌ای قارچ با سبزیجات معطر و نان تست",
      "نان باگت تازه با کره سیر، پنیر موزارلا و سبزیجات",
      "سیب‌زمینی تنوری با سس پنیر چدار و ادویه مخصوص",
      "نان تست شده با گوجه، ریحان تازه و روغن زیتون",
    ],
    prices: ["۹۵٬۰۰۰ تومان", "۸۵٬۰۰۰ تومان", "۱۲۵٬۰۰۰ تومان", "۱۱۵٬۰۰۰ تومان"],
    images: [
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=1200&q=80&auto=format&fit=crop",
    ],
  },
  maincourse: {
    names: ["چلو کباب کوبیده", "استیک مرغ", "زرشک‌پلو با مرغ", "ماهی قزل‌آلا"],
    descriptions: [
      "دو سیخ کوبیده گوشت گوساله با برنج ایرانی و گوجه کبابی",
      "سینه مرغ گریل شده با سبزیجات بخارپز و سس قارچ",
      "برنج زعفرانی با زرشک، مرغ زعفرانی و خلال پسته",
      "فیله قزل‌آلای گریل با سبزیجات و سس لیمو",
    ],
    prices: ["۲۸۵٬۰۰۰ تومان", "۲۴۵٬۰۰۰ تومان", "۲۱۰٬۰۰۰ تومان", "۳۲۰٬۰۰۰ تومان"],
    images: [
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80&auto=format&fit=crop",
    ],
  },
  pizza: {
    names: ["پیتزا مارگاریتا", "پیتزا پپرونی", "پیتزا مخلوط", "پیتزا سبزیجات"],
    descriptions: [
      "سس گوجه تازه، پنیر موزارلا و برگ ریحان",
      "پپرونی تند، پنیر موزارلا و سس مخصوص ایتالیایی",
      "ژامبون، قارچ، فلفل دلمه و پنیر موزارلا",
      "کدو، بادمجان، فلفل رنگی و پنیر موزارلا",
    ],
    prices: ["۱۸۵٬۰۰۰ تومان", "۲۱۰٬۰۰۰ تومان", "۲۳۵٬۰۰۰ تومان", "۱۹۵٬۰۰۰ تومان"],
    images: [
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80&auto=format&fit=crop",
    ],
  },
  burger: {
    names: ["چیزبرگر کلاسیک", "برگر مخصوص", "برگر مرغ", "دوبل برگر"],
    descriptions: [
      "گوشت گوساله، پنیر چدار، کاهو، گوجه و سس مخصوص",
      "گوشت گوساله، قارچ، پنیر، پیاز کاراملی و سس باربیکیو",
      "فیله مرغ سوخاری، کلم، خیارشور و سس تارتار",
      "دو لایه گوشت گوساله، پنیر دوبل و سس ویژه",
    ],
    prices: ["۱۹۵٬۰۰۰ تومان", "۲۳۵٬۰۰۰ تومان", "۱۸۵٬۰۰۰ تومان", "۲۷۵٬۰۰۰ تومان"],
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1200&q=80&auto=format&fit=crop",
    ],
  },
  pasta: {
    names: ["پاستا آلفردو", "پاستا بلونز", "پنه آرابیاتا", "لازانیا"],
    descriptions: [
      "پنه با سس خامه، قارچ و فیله مرغ گریل",
      "اسپاگتی با سس گوشت و گوجه و پنیر پارمزان",
      "پنه با سس تند گوجه، سیر و ریحان تازه",
      "لایه‌های پاستا با سس گوشت، بشامل و پنیر",
    ],
    prices: ["۱۹۵٬۰۰۰ تومان", "۲۱۵٬۰۰۰ تومان", "۱۸۵٬۰۰۰ تومان", "۲۳۵٬۰۰۰ تومان"],
    images: [
      "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=1200&q=80&auto=format&fit=crop",
    ],
  },
  drinks: {
    names: ["موهیتو", "لیموناد تازه", "آیس لاته", "شیک شکلات"],
    descriptions: [
      "نعنا تازه، لیمو، سودا و یخ خرد شده",
      "لیمو تازه، عسل طبیعی و آب گازدار",
      "اسپرسو دوبل، شیر سرد و یخ",
      "بستنی شکلاتی، شیر و سس شکلات",
    ],
    prices: ["۹۵٬۰۰۰ تومان", "۸۵٬۰۰۰ تومان", "۱۱۰٬۰۰۰ تومان", "۱۳۵٬۰۰۰ تومان"],
    images: [
      "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=1200&q=80&auto=format&fit=crop",
    ],
  },
};

function buildCategoryItems(slug: string, label: string): MenuItem[] {
  const seed = CATEGORY_SEEDS[slug];
  if (!seed) {
    return Array.from({ length: 4 }, (_, index) => ({
      id: `${slug}-${index + 1}`,
      categorySlug: slug,
      name: `${label} ${index + 1}`,
      description: `توضیح کوتاه برای ${label}`,
      price: "۱۵۰٬۰۰۰ تومان",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80&auto=format&fit=crop",
    }));
  }

  return seed.names.map((name, index) => ({
    id: `${slug}-${index + 1}`,
    categorySlug: slug,
    name,
    description: seed.descriptions[index] ?? seed.descriptions[0],
    price: seed.prices[index] ?? seed.prices[0],
    image: seed.images[index] ?? seed.images[0],
  }));
}

export const CATEGORY_MENU_ITEMS: Record<string, MenuItem[]> = Object.fromEntries(
  DEFAULT_CATEGORIES.map((category) => [category.slug, buildCategoryItems(category.slug, category.label)])
);

export function getMenuItemsForCategory(slug: string, storedItems?: MenuItem[]): MenuItem[] {
  const stored = (storedItems ?? []).filter((item) => item.categorySlug === slug);
  const fallback = CATEGORY_MENU_ITEMS[slug] ?? buildCategoryItems(slug, slug);
  const merged = [...stored];

  for (const item of fallback) {
    if (merged.length >= 4) break;
    if (!merged.some((existing) => existing.id === item.id || existing.name === item.name)) {
      merged.push(item);
    }
  }

  return merged.slice(0, Math.max(4, merged.length));
}

export const MOCK_MENU_ITEMS: MenuItem[] = DEFAULT_CATEGORIES.flatMap(
  (category) => CATEGORY_MENU_ITEMS[category.slug] ?? []
);