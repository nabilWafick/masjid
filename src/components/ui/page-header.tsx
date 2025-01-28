interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className=" container bg-muted mt-16 py-20">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
