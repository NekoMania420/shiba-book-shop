const MainLayout = (props, { slots }) => (
  <div
    class={['grid', 'grid-cols-3', 'h-full']}
    style={{ gridTemplateRows: 'auto 1fr' }}
  >
    {slots.navbar && (
      <header class={['h-12', 'col-span-3']}>{slots.navbar()}</header>
    )}
    <main class={['col-span-2', 'overflow-auto']}>
      {slots.default && slots.default()}
    </main>
    <aside class={['overflow-auto']}>{slots.aside && slots.aside()}</aside>
  </div>
)

export default MainLayout
