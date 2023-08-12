import IsVisible from 'react-is-visible'

export const Animate = ({ direction, Component }) => {
  return (
    <IsVisible once>
      {(isVisible) => (
        <Component animate={isVisible} direction={direction} />
      )}
    </IsVisible>
  )
}