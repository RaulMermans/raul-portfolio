export default function Loading() {
  return (
    <div className="loading-state" style={{ minHeight: '100vh', padding: 'var(--space-8)' }}>
      <div className="skeleton" style={{ width: '200px', height: '32px', marginBottom: 'var(--space-4)' }}></div>
      <div className="skeleton" style={{ width: '100%', maxWidth: '600px', height: '20px', marginBottom: 'var(--space-8)' }}></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)', width: '100%' }}>
        <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: 'var(--radius-lg)' }}></div>
        <div className="skeleton" style={{ aspectRatio: '16/9', borderRadius: 'var(--radius-lg)' }}></div>
      </div>
    </div>
  )
}
