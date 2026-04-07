export const metadata = { title: "Our Story - Wealthyfied Watch" };

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-4 max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-serif text-[#D4AF37] mb-8">Crafting Legacy</h1>
      <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-10"></div>
      
      <div className="space-y-8 text-lg text-gray-300 font-light leading-relaxed">
        <p>
          Founded on the principle that true luxury is defined by unparalleled craftsmanship and uncompromising quality, 
          Wealthyfied Watch stands as a beacon for the modern elite. We do not just sell timepieces; we curate legacies.
        </p>
        <p>
          Every watch and piece of jewelry in our collection is meticulously inspected to ensure it meets our rigorous standards. 
          From the delicate sweep of a mechanical second hand to the robust weight of an 18k solid gold chain, every detail is engineered for perfection.
        </p>
        <p>
          Our mission is simple: To provide men of distinction with the accessories necessary to conquer their ambitions while exuding undeniable style and power. Welcome to the circle.
        </p>
      </div>
    </div>
  );
}
