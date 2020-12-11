const ProductList = (props, { slots }) =>
  slots.default && (
    <div
      class={[
        'grid',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        '2xl:grid-cols-4',
        'gap-2',
        'p-2',
      ]}
    >
      {slots.default()}
    </div>
  )

export default ProductList
