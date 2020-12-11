const NavbarUser = (props) => (
  <div
    class={['grid', 'gap-1', 'items-center', 'px-2']}
    style={{ gridTemplateColumns: 'auto auto' }}
  >
    {props.image && (
      <img
        src={props.image}
        class={['w-8', 'h-8', 'block', 'object-cover', 'rounded-full']}
      />
    )}
    <div>{props.name}</div>
  </div>
)

export default NavbarUser
