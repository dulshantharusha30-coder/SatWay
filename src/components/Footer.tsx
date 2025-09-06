export default function Footer() {
  return (
    <footer className="bg-dark text-white p-8 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} SatWay. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
