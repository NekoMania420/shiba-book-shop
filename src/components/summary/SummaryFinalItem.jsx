const SummaryFinalItem = (props, { slots }) => (
  <div
    class={['grid', 'bg-white', 'p-2', 'items-center']}
    style={{ gridTemplateColumns: '1fr auto' }}
  >
    <div>{props.label}</div>
    <div>{slots.default && slots.default()}</div>
  </div>
)

export default SummaryFinalItem
