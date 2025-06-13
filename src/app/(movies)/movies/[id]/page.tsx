type Params = {
  id: number;
};

type SearchParams = {
  page: number;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  return (
    <h1>
      Movie {id} | page {page}
    </h1>
  );
}
