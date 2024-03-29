"use client";

import style from "./templateProductDetail.module.scss";
import Image from "next/image";
import IconHeartSvg from "../iconHeartSvg/iconHeartSvg";

export default function TemplateProductDetail() {
  const handleIconHeart = () => {};
  return (
    <div className={`${style.detail}`}>
      <div className={`${style.detailContainer}`}>
        <div className={`${style.detailPageNavigation}`}>Home</div>
        <div className={`${style.detailBuy}`}>
          <div className={`${style.detailBuyLeft}`}>
            <div className={`${style.detailBuyLeftImage}`}>
              <Image
                src="/images/product2.png"
                className={`${style.picture}`}
                alt="Product 1"
                fill
                sizes="(max-width: 400px) 100vw"
                priority={true}
              />
            </div>
            <div className={`${style.detailBuyLeftReview}`}>
              <div className={`${style.detailBuyLeftReviewItem}`}>
                <Image
                  src="/images/product3.png"
                  className={`${style.picture}`}
                  alt="Product 1"
                  fill
                  sizes="(max-width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.detailBuyLeftReviewItem}`}>
                <Image
                  src="/images/product3.png"
                  className={`${style.picture}`}
                  alt="Product 1"
                  fill
                  sizes="(max-width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.detailBuyLeftReviewItem}`}>
                <Image
                  src="/images/product1.png"
                  className={`${style.picture}`}
                  alt="Product 1"
                  fill
                  sizes="(max-width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.detailBuyLeftReviewItem}`}>
                <Image
                  src="/images/product4.png"
                  className={`${style.picture}`}
                  alt="Product 1"
                  fill
                  sizes="(max-width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.detailBuyLeftReviewItem}`}>
                <Image
                  src="/images/product1.png"
                  className={`${style.picture}`}
                  alt="Product 1"
                  fill
                  sizes="(max-width: 200px) 100vw"
                  priority={true}
                />
              </div>
              <div className={`${style.detailBuyLeftReviewItem}`}>
                <Image
                  src="/images/product3.png"
                  className={`${style.picture}`}
                  alt="Product 1"
                  fill
                  sizes="(max-width: 200px) 100vw"
                  priority={true}
                />
              </div>
            </div>
          </div>
          <div className={`${style.detailBuyRight}`}>
            <div className={`${style.detailBuyRightTitle}`}>
              <h1>YK Disney</h1>
              <div>
                <div className={`${style.detailBuyRightTitleHeart}`}>
                  <div>
                    <IconHeartSvg
                      onClick={handleIconHeart}
                      className={style.iconHeart}
                    />
                  </div>
                </div>
                <div className={`${style.detailBuyRightTitleStock}`}>
                  <h5>In Stock : 8</h5>
                </div>
              </div>
            </div>
            <div className={`${style.detailBuyRightType}`}>
              <h4>Girl Pink Dress</h4>
            </div>
            <div className={`${style.detailBuyRightPrice}`}>
              <h4>$80.00</h4>
            </div>
            <div className={`${style.detailBuyRightDescription}`}>
              <p>
                Lustrous yet understated. The new evening wear collection
                exclusively offered at the reopened Giorgio Armani boutique in
                Los Angeles. Lustrous yet understated. The new evening wear
                collection exclusively offered at the reopened Giorgio Armani
                boutique in Los Angeles. Lustrous yet understated. The new
                evening wear collection exclusively offered at the reopened
                Giorgio Armani boutique in Los Angeles. xclusively offered at
                the reopened Giorgio Armani boutique in Los Angeles.
              </p>
            </div>
            <div className={`${style.detailBuyRightColor}`}>
              <h3>Color</h3>
              <div className={`${style.detailBuyRightColorList}`}>
                <div className={`${style.detailBuyRightColorItem}`}></div>
                <div className={`${style.detailBuyRightColorItem}`}></div>
              </div>
            </div>
            <div className={`${style.detailBuyRightSize}`}>
              <h3>Size</h3>
              <div className={`${style.detailBuyRightSizeList}`}>
                <div className={`${style.detailBuyRightSizeItem}`}>S</div>
                <div className={`${style.detailBuyRightSizeItem}`}>M</div>
                <div className={`${style.detailBuyRightSizeItem}`}>L</div>
                <div className={`${style.detailBuyRightSizeItem}`}>XL</div>
                <div className={`${style.detailBuyRightSizeItem}`}>XXl</div>
              </div>
            </div>
            <div className={`${style.detailBuyRightAddToCard}`}>
              <div className={`${style.detailBuyRightAddToCardNumber}`}>
                <div>
                  <Image
                    src="/icons/subtract.svg"
                    className={style.logo}
                    alt="Icon"
                    fill
                    sizes="100vw"
                    priority={true}
                  />
                  <input type="number" />
                  <Image
                    src="/icons/plus.svg"
                    className={style.logo}
                    alt="Icon"
                    fill
                    sizes="100vw"
                    priority={true}
                  />
                </div>
              </div>
              <div className={`${style.detailBuyRightAddToCardBtn}`}>
                <button>Add to Card</button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.detailDescription}`}>
          <div className={`${style.detailDescriptionNavigation}`}></div>
          <div className={`${style.detailDescriptionContent}`}></div>
        </div>
      </div>
    </div>
  );
}
