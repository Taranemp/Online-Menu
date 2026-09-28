export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  categorySlug: string;
  image?: string;
};

// Mock menu items — replace with real data fetching when available.
// Persian (fa) text with Persian (Eastern Arabic) numerals.
export const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    categorySlug: "sushi",
    name: "سوشی ساساکا",
    description: "برشت سوشی با ماهی سالمون و برنج کوتاه‌دانه‌ای",
    price: "۱۸۰,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m2",
    categorySlug: "sushi",
    name: "ماکی سوشی",
    description: "۶ عدد ماکی سوشی با نخود فرنگی",
    price: "۱۴۵,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m3",
    categorySlug: "ramen",
    name: "رامن زعفرانی",
    description: "سوپ رامن بویی با بروثر، قارچ و زعفران",
    price: "۱۷۵,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m4",
    categorySlug: "ramen",
    name: "رامن مرغی",
    description: "رامن با سینه مرغ گریل‌شده و ذرت",
    price: "۱۳۵,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m5",
    categorySlug: "donburi",
    name: "دونبوری کنجدی",
    description: "برنج زعفرانی با ماهی سویسه و سس کنجدی",
    price: "۱۹۰,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m6",
    categorySlug: "donburi",
    name: "دونبوری گوشتی",
    description: "برنج با گوشت چرخ‌کرده و سبزیجات آب‌پز",
    price: "۱۵۰,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m7",
    categorySlug: "salads",
    name: "سالاد سزوره",
    description: "سبزیجات تازه، سیر، گردو و سس سزوره",
    price: "۱۱۰,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m8",
    categorySlug: "appetizers",
    name: "یاکی تند",
    description: "یاکی ژاپنی با سس تند و پنیر کوزه‌ای",
    price: "۱۲۵,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m9",
    categorySlug: "drinks",
    name: "نوشابه سواریش",
    description: "نوشابه گازدار طریقه سواریش",
    price: "۴۵,۰۰۰ تومان",
    image: "/file.svg",
  },
];