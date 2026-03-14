export default function Loading() {
  return (
    <div className="loading-state" style={{ minHeight: '100vh', padding: 'var(--space-8)' }}>
      <div className="skeleton" style={{ width: '140px', height: '32px', marginBottom: 'var(--space-4)' }}></div>
      <div className="skeleton" style={{ width: '100%', maxWidth: '450px', height: '20px', marginBottom: 'var(--space-8)' }}></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)', width: '100%' }}>
        <div className="skeleton" style={{ aspectRatio: '1/1', borderRadius: 'var(--radius-md)' }}></div>
        <div className="skeleton" style={{ aspectRatio: '1/1', borderRadius: 'var(--radius-md)' }}></div>
        <div className="skeleton" style={{ aspectRatio: '1/1', borderRadius: 'var(--radius-md)' }}></div>
        <div className="skeleton" style={{ aspectRatio: '1/1', borderRadius: 'var(--radius-md)' }}></div>
      </div>
    </div>
  )
}
