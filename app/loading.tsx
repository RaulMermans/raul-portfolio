export default function Loading() {
  return (
    <div className="loading-state" style={{ minHeight: '100vh' }}>
      <div className="loading-spinner">
        <div className="spinner" aria-hidden="true"></div>
      </div>
      <p className="loading-state__message">Loading...</p>
    </div>
  )
}
