export default function Home() {
  const person = { name: "jd", age: 15 };
  return (
    <main className="flex">
      <h1>{person.toString()}</h1>
    </main>
  );
}
