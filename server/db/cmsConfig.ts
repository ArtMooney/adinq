export const cmsTables = [
  {
    id: "mediaproduktioner",
    name: "Mediaproduktioner",
    viewMode: "list",
    backupRef: null,
  },
  {
    id: "medarbetare",
    name: "Medarbetare",
    viewMode: "list",
    backupRef: null,
  },
  {
    id: "prisexempel",
    name: "Prisexempel",
    viewMode: "list",
    backupRef: null,
  },
  {
    id: "kundutlatanden",
    name: "Kundutlåtanden",
    viewMode: "list",
    backupRef: null,
  },
  {
    id: "politisk_reklam",
    name: "Politisk Reklam",
    viewMode: "list",
    backupRef: null,
  },
  {
    id: "static_content",
    name: "Static Content",
    viewMode: "list",
    backupRef: null,
  },
];

export const fieldsConfig = {
  mediaproduktioner: {
    id: { type: "integer", label: "", required: true, hidden: true },
    title: { type: "text", label: "Titel", required: true, hidden: false },
    qCardLink: {
      type: "text",
      label: "Q-Card Link",
      required: false,
      hidden: false,
    },
    screenshot: {
      type: "fileImg",
      label: "Screenshot",
      required: false,
      hidden: false,
    },
    filmType: {
      type: "select",
      label: "Filmtype",
      select_options: [{ value: "butiksfilm" }, { value: "storbildsfilm" }],
      required: false,
      hidden: false,
    },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },

  medarbetare: {
    id: { type: "integer", label: "", required: true, hidden: true },
    name: { type: "text", label: "Name", required: true, hidden: false },
    title: { type: "text", label: "Title", required: false, hidden: false },
    phone: { type: "text", label: "Phone", required: false, hidden: false },
    email: { type: "text", label: "E-mail", required: false, hidden: false },
    photo: { type: "fileImg", label: "Photo", required: false, hidden: false },
    department: {
      type: "select",
      label: "Department",
      select_options: [
        { value: "management" },
        { value: "sales" },
        { value: "production" },
      ],
      required: false,
      hidden: false,
    },
    adjustx: {
      type: "real",
      label: "Adjustment X",
      required: false,
      hidden: false,
    },
    adjusty: {
      type: "real",
      label: "Adjustment Y",
      required: false,
      hidden: false,
    },
    zoom: { type: "real", label: "Zoom", required: false, hidden: false },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },

  kundutlatanden: {
    id: { type: "integer", label: "", required: true, hidden: true },
    title: { type: "text", label: "Title", required: true, hidden: false },
    text: { type: "textarea", label: "Text", required: false, hidden: false },
    att: { type: "text", label: "Att", required: false, hidden: false },
    logo: { type: "fileImg", label: "Logo", required: false, hidden: false },
    link: { type: "text", label: "Link", required: false, hidden: false },
    screenshot: {
      type: "fileImg",
      label: "Screenshot",
      required: false,
      hidden: false,
    },
    qCardLink: {
      type: "text",
      label: "Q-Card Link",
      required: false,
      hidden: false,
    },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },

  prisexempel: {
    id: { type: "integer", label: "", required: true, hidden: true },
    title: { type: "text", label: "Title", required: true, hidden: false },
    monthly: {
      type: "text",
      label: "Monthly Fee",
      required: false,
      hidden: false,
    },
    total: { type: "text", label: "Total", required: false, hidden: false },
    details: {
      type: "textarea",
      label: "Details",
      required: false,
      hidden: false,
    },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },

  politisk_reklam: {
    id: { type: "integer", label: "", required: true, hidden: true },
    title: { type: "text", label: "Rad 1", required: true, hidden: false },
    rad2: { type: "text", label: "Rad 2", required: false, hidden: false },
    rad3: { type: "text", label: "Rad 3", required: false, hidden: false },
    rad4: { type: "text", label: "Rad 4", required: false, hidden: false },
    rad5: { type: "text", label: "Rad 5", required: false, hidden: false },
    rad6: { type: "text", label: "Rad 6", required: false, hidden: false },
    rad7: { type: "text", label: "Rad 7", required: false, hidden: false },
    rad8: { type: "text", label: "Rad 8", required: false, hidden: false },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },

  static_content: {
    id: { type: "integer", label: "", required: true, hidden: true },
    title: { type: "text", label: "Title", required: true, hidden: false },
    content: {
      type: "json",
      label: "Content",
      required: false,
      hidden: false,
    },
    sortOrder: { type: "integer", label: "", required: true, hidden: true },
    createdAt: { type: "date", label: "", required: true, hidden: true },
    updatedAt: { type: "date", label: "", required: true, hidden: true },
  },
};

export const graphConfig = {};

const getSeoSchema = () => ({
  title: "text",
  description: "textarea",
  ogTitle: "text",
  ogDescription: "textarea",
  ogImage: "fileImg",
  twitterTitle: "text",
  twitterDescription: "textarea",
  twitterImage: "fileImg",
});

export const staticContentTypes = {
  "page - Index": {
    header: {
      title: "text",
      subtitle: "text",
    },
    videoBlock: {
      title: "text",
      videoLinkSwe: "text",
      videoLinkEng: "text",
      poster: "fileImg",
    },
  },
  "page - MediaProduktion": {
    header: {
      title: "text",
      subtitle: "text",
    },
    videoBlock: {
      text: "textarea",
      videoLink: "text",
    },
    marketingChannels: {
      title: "text",
      text_movies: "textarea",
      text_bigscreens: "textarea",
    },
    iconBlob: {
      block1: "textarea",
      block2: "textarea",
      block3: "textarea",
      block4: "textarea",
    },
  },
  "page - Dagens AdinQ": {
    header: {
      title: "text",
    },
    colleagues: {
      management: "text",
      sales: "text",
      production: "text",
    },
  },
  "page - Kundutlatanden": {
    header: {
      title: "text",
    },
  },
  "page - Varfor oss": {
    header: {
      title: "text",
    },
    quote: {
      text: "textarea",
    },
    iconBlob: {
      text: "textarea",
    },
  },
  "page - Priser": {
    header: {
      title: "text",
    },
    prices: {
      title: "text",
      text: "textarea",
      more: "text",
    },
  },
  "page - Kontakta oss": {
    header: {
      title: "text",
    },
    contactForm: {
      title: "text",
      text: "textarea",
    },
  },
  "page - Avregistrera": {
    form: {
      title: "text",
      input: "text",
    },
  },
  "page - Butiks-TV": {
    header: {
      title: "text",
      subtitle: "text",
    },
    textBlocks: {
      block1: {
        title: "text",
        text: "textarea",
      },
      block2: {
        title: "text",
        text: "textarea",
      },
      block3: {
        title: "text",
        text: "textarea",
      },
    },
  },
  "page - Storbildsskarmar": {
    header: {
      title: "text",
    },
    textBlock: {
      text: "textarea",
      image: "fileImg",
    },
  },
  "page - Mediebyraer": {
    header: {
      title: "text",
      subtitle: "text",
    },
    textBlock: {
      title: "text",
      text: "textarea",
    },
  },
  "page - Kommersialisera": {
    header: {
      title: "text",
      subtitle: "text",
    },
    textBlocks: {
      block1: {
        title: "text",
        text: "textarea",
      },
      block2: {
        title: "text",
        text: "textarea",
      },
      block3: {
        title: "text",
        text: "textarea",
      },
    },
  },
  "page - Marknadsplatskarta": {
    header: {
      title: "text",
      subtitle: "text",
    },
  },
  "page - PolitiskReklam": {
    header: {
      title: "text",
      text: "textarea",
    },
  },
  "component - Navbar": {
    buttons: {
      index: "text",
      mediaProduktion: "text",
      kollegor: "text",
      kundutlatanden: "text",
      varforOss: "text",
      priser: "text",
      kontaktaOss: "text",
    },
  },
  "component - Footer": {
    index: "text",
    mediaProduktion: "text",
    kollegor: "text",
    kundutlatanden: "text",
    varforOss: "text",
    priser: "text",
    kontaktaOss: "text",
  },
  "component - CompanyInfo": {
    company: "text",
    address: "text",
    address2: "text",
    phone: "text",
    email: "text",
  },
  "component - MarketingChannels": {
    title: "text",
    butiksTv: "textarea",
    storbildsskarmar: "textarea",
    mediebyraer: "textarea",
    kommersialisera: "textarea",
    marknadsplatskarta: "textarea",
  },
  "component - PolitiskBlob": {
    rad1: "text",
    rad2: "text",
    rad3: "text",
    rad4: "text",
    rad5: "text",
    rad6: "text",
    rad7: "text",
    rad8: "text",
  },
  "SEO page - Index": getSeoSchema(),
  "SEO page - MediaProduktion": getSeoSchema(),
  "SEO page - Dagens AdinQ": getSeoSchema(),
  "SEO page - Kundutlatanden": getSeoSchema(),
  "SEO page - Varfor oss": getSeoSchema(),
  "SEO page - Priser": getSeoSchema(),
  "SEO page - Kontakta oss": getSeoSchema(),
  "SEO page - Butiks-TV": getSeoSchema(),
  "SEO page - Storbildsskarmar": getSeoSchema(),
  "SEO page - Mediebyraer": getSeoSchema(),
  "SEO page - Kommersialisera": getSeoSchema(),
  "SEO page - Marknadsplatskarta": getSeoSchema(),
};
