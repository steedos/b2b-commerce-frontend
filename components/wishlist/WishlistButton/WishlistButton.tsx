import React, { FC, useState } from 'react'
import cn from 'classnames'
import { Heart } from '@components/icons'
import { useUI } from '@components/ui/context'

type Props = {
  active?: boolean
  onClick: () => void
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const WishlistButton: FC<Props> = ({
  className,
  onClick,
  active = false,
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  // const { openModal, setModalView } = useUI()
  // const addItem = useAddItem()
  // const removeItem = useRemoveItem()
  // const { data } = useWishlist()
  // const { data: customer } = useCustomer()
  // const itemInWishlist = data?.items?.find(
  //   (item) =>
  //     item.product_id === productId &&
  //     item.variant_id === variant?.node.entityId
  // )

  const handleWishlistChange = async (e: any) => {
    // A login is required before adding an item to the wishlist
    // if (!customer) {
    //   setModalView('LOGIN_VIEW')
    //   return openModal()
    // }
    e.preventDefault()
    if (loading) return
    setLoading(true)

    try {
      onClick()
      setLoading(false)
      // if (itemInWishlist) {
      //   await removeItem({ id: itemInWishlist.id! })
      // } else {
      //   await addItem({
      //     productId,
      //     variantId: variant?.node.entityId!,
      //   })
      // }
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <button
      aria-label="Add to wishlist"
      className={cn({ 'opacity-50': loading }, className)}
      onClick={handleWishlistChange}
      {...props}
    >
      <Heart fill={active ? 'var(--pink)' : 'none'} />
    </button>
  )
}

export default WishlistButton
