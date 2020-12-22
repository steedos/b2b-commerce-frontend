import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import type { FC } from 'react'
import s from './ProductCard.module.css'
import WishlistButton from '@components/wishlist/WishlistButton'

interface Props {
  className?: string
  variant?: 'slim' | 'simple'
  product: Product
  handleWishlistChange: () => void
  imageOpts: NextImage
}

const ProductCard: FC<Props> = ({
  className,
  variant,
  product: p,
  handleWishlistChange,
  imageOpts = {},
}) => {
  // Selecting the first image
  const image = p.images[0]

  const rootClassName = cn(
    s.root,
    { [s.simple]: variant === 'simple' },
    className
  )

  const finalImageOpts = { ...imageOpts }

  return (
    <Link href={`/product${p.slug}`}>
      <a className={rootClassName}>
        {variant === 'slim' ? (
          <div className="relative overflow-hidden box-border">
            <div className="absolute inset-0 flex items-center justify-end mr-8 z-20">
              <span className="bg-black text-white inline-block p-3 font-bold text-xl break-words">
                {p.name}
              </span>
            </div>
            <Image
              quality="85"
              width={image.width}
              sizes={image.sizes}
              height={image.height}
              layout={image.layout}
              loading={image.loading}
              priority={image.priority}
              src={image.src}
              alt={image.alt || 'Product Image'}
            />
          </div>
        ) : (
          <>
            <div className={s.squareBg} />
            <div className="flex flex-row justify-between box-border w-full z-20 absolute">
              <div className="absolute top-0 left-0 pr-16 max-w-full">
                <h3 className={s.productTitle}>
                  <span>{p.name}</span>
                </h3>
                <span className={s.productPrice}>{p.price}</span>
              </div>
              <WishlistButton
                className={s.wishlistButton}
                onClick={handleWishlistChange}
              />
            </div>
            <div className={s.imageContainer}>
              <Image
                quality="85"
                className={s.productImage}
                width={image.width}
                sizes={image.sizes}
                height={image.height}
                layout={image.layout}
                loading={image.loading}
                priority={image.priority}
                src={image.src}
                alt={image.alt || 'Product Image'}
              />
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
