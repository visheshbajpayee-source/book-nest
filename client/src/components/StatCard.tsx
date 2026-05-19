type Props = {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
};

export default function StatCard({ title, value, description, className = "" }: Props) {
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white p-6 shadow-sm ${className}`}>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
      {description ? (
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}
