import supabase from "@/utils/supabase";

export default async function Home() {
  const { data: countries } = await supabase.from("countries").select("*");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello</h1>
      {countries?.map((country) => (
        <p>{country.name}</p>
      ))}
    </main>
  );
}
