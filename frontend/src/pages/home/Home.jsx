import Hero from "@/components/Hero";
import Footer from "@/components/Footer";


export default function Home() {
 
  return (
    <>
      <main className="">
        <Hero />
        <div>
          <h1 className="text-3xl text-slate-800 font-extrabold font-montserrat">
            Explore By Tags
          </h1>
          <div className="max-w-2xl  mt-2 text-slate-600">
            All course series are categorized into various //tags. This should
            provide you with an alternate way to decide what to learn next,
            whether it be a particular framework, language, or tool.
          </div>
        </div>
     
      </main>
    </>
  );
}
