import { SearchBar } from "@/components/SearchBar"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[url('/background_homepage.svg')] bg-cover bg-center pb-24">
      {/* Page content goes here */}

      <div className="fixed bottom-10 left-1/2 w-full max-w-md -translate-x-1/2 px-4">
        <SearchBar />
      </div>
    </div>
  )
}
