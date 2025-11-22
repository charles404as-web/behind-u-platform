interface AdCardProps {
  id: number
  title: string
  shop: string
  district: string
  whatsapp: string
  image: string
}

export default function AdCard({ title, shop, district, whatsapp, image }: AdCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-700">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      
      <div className="space-y-2 mb-4">
        <p className="text-gray-400">
          <span className="text-white">商戶:</span> {shop}
        </p>
        <p className="text-gray-400">
          <span className="text-white">地區:</span> {district}
        </p>
        <p className="text-gray-400">
          <span className="text-white">電話:</span> {whatsapp}
        </p>
      </div>
      
      <div className="flex space-x-2">
        <a
          href={`tel:${whatsapp}`}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-lg font-bold transition-colors"
        >
          致電
        </a>
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded-lg font-bold transition-colors"
        >
          WhatsApp
        </a>
      </div>
    </div>
  )
}