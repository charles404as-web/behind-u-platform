'use client';

import { Phone, Mail, MessageCircle, ExternalLink, MapPin, Tag } from 'lucide-react';
import type { Advertisement } from '@/lib/supabase';

interface AdCardProps {
  ad: Advertisement;
}

export default function AdCard({ ad }: AdCardProps) {
  const contactIcons: Record<string, any> = {
    phone: Phone,
    email: Mail,
    whatsapp: MessageCircle,
    website: ExternalLink,
  };

  const handleContact = (type: string, value: string) => {
    switch (type) {
      case 'phone':
        window.location.href = `tel:${value}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/852${value}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${value}`;
        break;
      case 'website':
        window.open(value.startsWith('http') ? value : `https://${value}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div className="card group hover:scale-[1.02] cursor-pointer">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-2">
              {ad.title}
            </h3>
            
            <div className="flex items-center gap-4 text-sm text-muted mb-3">
              {ad.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{ad.location}</span>
                </div>
              )}
              {ad.category && (
                <div className="flex items-center gap-1">
                  <Tag className="w-4 h-4" />
                  <span>{ad.category}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {ad.description && (
          <p className="text-muted leading-relaxed line-clamp-3">
            {ad.description}
          </p>
        )}

        {ad.tags && ad.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {ad.tags.slice(0, 5).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 bg-border/50 text-muted rounded-full border border-border hover:border-primary/50 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {ad.contact_info && Object.keys(ad.contact_info).length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            {Object.entries(ad.contact_info).map(([key, value]) => {
              const Icon = contactIcons[key] || ExternalLink;
              return (
                <button
                  key={key}
                  onClick={() => handleContact(key, value as string)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/30 hover:bg-primary hover:text-black transition-all duration-300 text-sm font-medium"
                >
                  <Icon className="w-4 h-4" />
                  <span className="capitalize">
                    {key === 'whatsapp' ? 'WhatsApp' : key}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="text-xs text-muted/70 pt-2">
          發佈於 {new Date(ad.created_at).toLocaleDateString('zh-HK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    </div>
  );
}
