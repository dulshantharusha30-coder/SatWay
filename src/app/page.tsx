import Link from 'next/link';
export default function HomePage() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-5xl font-extrabold mb-4">Welcome to <span className="text-primary">Sat</span>Way</h1>
      <p className="text-xl mb-8">Discover quality products, delivered to your door.</p>
      <Link href="/shop" className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full text-lg">
        Explore Our Shop
      </Link>
    </div>
  );
}
