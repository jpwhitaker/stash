import Image from "next/image";

export default async function Search({params}) {
  const { slug } = await params;
  
  return (
    <div className="bg-page-bg min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="w-full h-[20vh] bg-search-bg flex items-center justify-center text-search-text">
        Search: {slug}
      </div>
      
      <div className="p-8 sm:p-20">
        Search results for "{slug}"
      </div>
    </div>
  );
}
