export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  categorySlug: string;
  image?: string;
};

// Mock menu items matched precisely with DEFAULT_CATEGORIES slugs.
export const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    categorySlug: "salads",
    name: "سالاد سزوره",
    description: "سبزیجات تازه، سیر، گردو و سس سزوره",
    price: "۱۱۰,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m2",
    categorySlug: "appetizers",
    name: "یاکی تند",
    description: "یاکی ژاپنی با سس تند و پنیر کوزه‌ای",
    price: "۱۲۵,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m3",
    categorySlug: "maincourse",
    name: "چلو کباب مخصوص",
    description: "برنج ایرانی، یک سیخ کباب برگ و یک سیخ کوبیده",
    price: "۲۸۰,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m4",
    categorySlug: "pizza",
    name: "پیتزا پپرونی",
    description: "ژامبون پپرونی تند، پنیر موزارلا، سس مخصوص",
    price: "۱۹۵,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m5",
    categorySlug: "burger",
    name: "چیزبرگر ذغالی",
    description: "گوشت گوساله ۱۸۰ گرمی، پنیر چدار، کاهو و گوجه",
    price: "۱۷۵,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m6",
    categorySlug: "pasta",
    name: "پاستا آلفردو با مرغ",
    description: "پاستا پنه، فیله مرغ، سس قارچ و خامه",
    price: "۱۶۰,۰۰۰ تومان",
    image: "/file.svg",
  },
  {
    id: "m7",
    categorySlug: "drinks",
    name: "نوشابه سواریش",
    description: "نوشابه گازدار طریقه سواریش",
    price: "۴۵,۰۰۰ تومان",
    image: "/file.svg",
  },
];