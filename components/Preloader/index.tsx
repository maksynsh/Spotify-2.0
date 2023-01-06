export const Preloader = () => {
  return (
    <div className='h-14 flex items-end gap-1'>
      {[...Array(5)].map((_, i) => (
        <div key={i} className='stick' style={{ animationDelay: (i + 1) * 200 + 'ms' }} />
      ))}
    </div>
  )
}
