export default function HeaderForm({ title, description }) {
  return (
    <div className="">
      <h1 className="text-4xl text-primary md:text-4xl font-bold mb-1 md:mb-2">
        {title}
      </h1>
      <p className="text-secondary mb-2 md:mb-4">{description}</p>
    </div>
  );
}
