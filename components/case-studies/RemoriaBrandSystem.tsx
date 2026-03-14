'use client'

interface BrandSystemItem {
  title: string
  description: string
}

interface RemoriaBrandSystemProps {
  items: BrandSystemItem[]
  label?: string
}

export default function RemoriaBrandSystem({ items, label = 'The Brand System' }: RemoriaBrandSystemProps) {
  // Remoria color palette - luxury fragrance brand colors
  const colorPalette = [
    { name: 'Stone', value: '#D4C5B9', hex: '#D4C5B9' },
    { name: 'Patina', value: '#9A8B7F', hex: '#9A8B7F' },
    { name: 'Gold', value: '#C6A877', hex: '#C6A877' },
    { name: 'Ink', value: '#2A241F', hex: '#2A241F' },
    { name: 'Warm', value: '#EDE6DD', hex: '#EDE6DD' },
  ]

  return (
    <div className="remoria-brand-system">
      <h4 className="remoria-brand-system__title">{label}</h4>
      
      {/* Color Palette Section */}
      <div className="remoria-brand-system__palette">
        <div className="remoria-brand-system__palette-label">Color Palette</div>
        <div className="remoria-brand-system__palette-swatches">
          {colorPalette.map((color, index) => (
            <div key={index} className="remoria-brand-system__swatch">
              <div 
                className="remoria-brand-system__swatch-color"
                style={{ backgroundColor: color.hex }}
              />
              <div className="remoria-brand-system__swatch-info">
                <span className="remoria-brand-system__swatch-name">{color.name}</span>
                <span className="remoria-brand-system__swatch-hex">{color.hex}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Items with Visual Treatment */}
      <div className="remoria-brand-system__items">
        {items.map((item, index) => (
          <div key={index} className="remoria-brand-system__item">
            <div className="remoria-brand-system__item-number">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div className="remoria-brand-system__item-content">
              <h5 className="remoria-brand-system__item-title">{item.title}</h5>
              <p className="remoria-brand-system__item-desc">{item.description}</p>
            </div>
            <div 
              className="remoria-brand-system__item-accent"
              style={{ 
                backgroundColor: index === 0 ? '#D4C5B9' : index === 1 ? '#C6A877' : '#9A8B7F' 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

