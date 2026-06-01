import Button from '@/shared/ui/button/button.tsx';
import ImageLoader from '@/shared/ui/image-loader/image-loader.tsx';
import { CreditCard, RefreshCcw, Shield, Truck } from 'react-feather';
import CategoriesWidget from '@/widgets/categories/categories.widget.tsx';

export default function Home() {
  return (
    <div className={''}>
      <div
        className={
          'h-120 flex items-center justify-between mt-10 mb-15 xl:px-0 px-5'
        }
      >
        <div className={'flex flex-col gap-6 items-center lg:items-start'}>
          <h1 className={'text-5xl font-bold text-center lg:text-left'}>
            Технології <br className={'lg:block hidden'} />{' '}
            <span className={'text-accent'}>майбутнього</span> <br /> вже
            сьогодні
          </h1>

          <p className={'text-gray-400 max-w-3/4 text-center lg:text-left'}>
            Смарт-годинники, навушники та аксесуари найкращих брендів. Доставка
            по всій Україні за 1-2 дні.
          </p>

          <Button>Переглянути</Button>
        </div>

        <div className={'p-8 bg-accent/20 rounded-2xl lg:block hidden'}>
          <ImageLoader
            loading={'eager'}
            className={''}
            height={460}
            width={460}
            src={'/uploads/products/6a1df27a06c429592d53d215/image.png'}
          />
        </div>
      </div>

      <div
        className={
          'bg-accent h-15 w-full left-0 absolute flex items-center justify-center'
        }
      >
        <div
          className={
            'max-w-[--layout-area] flex items-center gap-4 justify-start'
          }
        >
          <div className={'gap-3 text-xs text-white lg:flex hidden'}>
            <Truck size={14} />
            <span>Безкоштовна доставка від 1000 грн</span>
          </div>

          <div className={' gap-3 text-xs text-white md:flex hidden'}>
            <Shield size={14} />
            <span>Офіційна гарантія 12 місяців</span>
          </div>

          <div className={'flex gap-3 text-xs text-white'}>
            <RefreshCcw size={14} />
            <span>Повернення протягом 14 днів</span>
          </div>

          <div className={'gap-3 text-xs text-white xl:flex hidden'}>
            <CreditCard size={14} />
            <span>Оплата при отриманні</span>
          </div>
        </div>
      </div>

      <div className={'mt-40 w-full'}>
        <CategoriesWidget />
      </div>
    </div>
  );
}
