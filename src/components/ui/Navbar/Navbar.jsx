const Navbar = (props, { slots }) => (
  <div
    class={[
      'h-full',
      'bg-gray-900',
      'text-white',
      'flex',
      'items-center',
      'shadow',
    ]}
  >
    {slots.user && (
      <div class={['ml-auto', 'h-full', 'flex', 'items-center']}>
        {slots.user()}
      </div>
    )}
  </div>
)

export default Navbar
