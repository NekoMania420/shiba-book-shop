import { Aspect } from '../ui'

const ProductItem = (props) => (
  <Aspect
    aspect="3:4"
    class={[
      'overflow-hidden',
      'shadow',
      'border-4',
      'cursor-pointer',
      'select-none',
      props.checked ? 'border-green-500' : 'border-transparent',
    ]}
  >
    {() => (
      <>
        <img
          src={props.image}
          alt="Product"
          class={['w-full', 'h-full', 'object-cover']}
        />
        <div
          class={[
            'absolute',
            'bottom-0',
            'inset-x-0',
            'grid',
            'items-end',
            'bg-black',
            'bg-opacity-75',
            'text-white',
          ]}
          style={{
            gridTemplateColumns: '1fr auto',
            backdropFilter: 'blur(4px)',
            fontSize: 'min(0.875rem, 3vw)',
            padding: 'min(0.25rem, 3vw)',
            gap: 'min(0.25rem, 3vw)',
          }}
        >
          <div>{props.name}</div>
          <div class={['font-bold']}>
            {props.value.toLocaleString('th-TH', {
              style: 'currency',
              currency: 'THB',
            })}
          </div>
        </div>
        {props.checked && (
          <div
            class={[
              'absolute',
              'top-0',
              'right-0',
              'bg-green-500',
              'text-white',
              'font-bold',
              'shadow',
            ]}
            style={{ fontSize: 'min(1rem, 3vw)', padding: 'min(0.25rem, 3vw)' }}
          >
            &times;{props.amount.toLocaleString('th-TH')}
          </div>
        )}
      </>
    )}
  </Aspect>
)

export default ProductItem
