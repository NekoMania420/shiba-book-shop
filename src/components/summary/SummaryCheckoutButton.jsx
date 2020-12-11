const SummaryCheckoutButton = (props) => (
  <button
    type="button"
    disabled={props.disabled}
    class={[
      'block',
      'w-full',
      'p-4',
      'text-2xl',
      props.disabled ? 'bg-gray-200' : 'bg-green-500',
      'text-white',
    ]}
  >
    Checkout
  </button>
)

export default SummaryCheckoutButton
