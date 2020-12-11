import { Aspect } from '../ui'

const SummaryItem = (props, { emit }) => (
  <div
    class={['grid', 'bg-white', 'items-center', 'gap-2']}
    style={{ gridTemplateColumns: 'auto auto auto 1fr auto' }}
  >
    <input
      type="number"
      value={props.amount}
      min="0"
      class={[
        'block',
        'w-12',
        'text-lg',
        'border-b',
        'border-black',
        'rounded-none',
      ]}
      onChange={(e) => {
        const value = +Math.ceil(e.target.value)

        if (value <= 0) {
          emit('remove')
          return
        }

        emit('update:amount', +value)
      }}
    />
    <div>&times;</div>
    <div>
      <Aspect aspect="3:4" class={['w-12']}>
        {() => (
          <img
            src={props.image}
            alt="Thumbnail"
            class={['block', 'w-full', 'h-full', 'object-cover']}
          />
        )}
      </Aspect>
    </div>
    <div class={['py-2']}>
      <div>{props.name}</div>
      <div class={['font-bold', 'text-right']}>
        {(props.value * props.amount).toLocaleString('th-TH', {
          style: 'currency',
          currency: 'THB',
        })}
      </div>
    </div>
    <button
      type="button"
      class={['px-4', 'bg-red-500', 'text-white', 'h-full', 'text-2xl']}
      onClick={(e) => {
        emit('remove')

        e.preventDefault()
      }}
    >
      &times;
    </button>
  </div>
)

export default SummaryItem
