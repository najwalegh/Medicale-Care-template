export default function HeaderForm({ title, description }) {
  return (
    <div className="font-sans">
      <h1 className="text-4xl text-black md:text-4xl font-bold mb-1 md:mb-2">
        {title}
      </h1>
      <p className="text-gray-500 mb-2 md:mb-4">{description}</p>
    </div>
  );
}
