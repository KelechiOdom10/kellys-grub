import slugify from "slugify";

const options: Parameters<typeof slugify>[1] = {
  lower: true,
  locale: "en",
};

export const customSlugify = (name: string) => {
  return slugify(name, options);
};
