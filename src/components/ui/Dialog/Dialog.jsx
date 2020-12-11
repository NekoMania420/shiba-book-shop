import { Teleport } from 'vue'

const Dialog = (props, { slots }) =>
  props.visible && (
    <Teleport to="body">
      <div
        class={[
          'fixed',
          'inset-0',
          'bg-black',
          'bg-opacity-75',
          'flex',
          'overflow-auto',
        ]}
      >
        <div
          class={['m-auto', 'bg-white', 'shadow-md']}
          style={{ width: props.width || '30rem' }}
        >
          <div class={['p-4']}>{slots.default && slots.default()}</div>
          {slots.action && (
            <div class={['grid', 'grid-flow-col', 'auto-cols-fr']}>
              {slots.action().map((vnode) => (
                <div>{vnode}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Teleport>
  )

export default Dialog
