const SummaryFinalList = (props, { slots }) =>
  slots.default && <div class={['divide-y']}>{slots.default()}</div>

export default SummaryFinalList
