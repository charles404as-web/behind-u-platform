interface AdCardProps {
  ad: {
    id: number
    title: string
    shop: string
    district: string
    whatsapp: string
    image: string
  }
}

export default function AdCard({ ad }: AdCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
      <img 
        src={ad.image} 
        alt={ad.title} 
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
      <p className="text-gray-600 mb-1">商戶: {ad.shop}</p>
      <p className="text-gray-600 mb-1">地區: {ad.district}</p>
      <p className="text-gray-600 mb-4">電話: {ad.whatsapp}</p>
      <div className="flex gap-2">
        <a 
          href={`tel:${ad.whatsapp}`} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          致電
        </a>
        <a 
          href={`https://wa.me/${ad.whatsapp}`} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}