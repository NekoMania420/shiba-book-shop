const Aspect = (props, { slots }) => {
  if (!/^[0-9\.]+:[0-9\.]+$/.test(props.aspect)) return

  const [x, y] = props.aspect.split(':').map(Number)

  const percentage = (y / x) * 100

  return (
    <div class={['relative']} style={{ paddingTop: percentage + '%' }}>
      <div class={['absolute', 'inset-0']}>
        {slots.default && slots.default()}
      </div>
    </div>
  )
}

export default Aspect
