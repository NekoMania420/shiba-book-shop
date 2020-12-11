const SummaryContainer = (props, { slots }) => (
  <div
    class={['grid', 'h-full', 'bg-gray-800']}
    style={{ gridTemplateRows: '1fr auto' }}
  >
    <div class={['overflow-auto']}>{slots.default && slots.default()}</div>
    <div>{slots.footer && slots.footer()}</div>
  </div>
)

export default SummaryContainer
