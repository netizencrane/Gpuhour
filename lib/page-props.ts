export type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export type StaticPageProps = {
  searchParams: SearchParams;
};

export type DynamicPageProps<T extends string> = {
  params: Promise<Record<T, string>>;
  searchParams: SearchParams;
};
