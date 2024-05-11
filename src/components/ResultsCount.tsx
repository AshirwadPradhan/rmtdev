export default function ResultsCount({ count }: { count: number | undefined}) {
  return <p className="count">{count} results</p>;
}
