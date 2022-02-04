//Core
import React from "react";
import Image from "next/image";
//Interfaces
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
// Temp
import p1 from "./temp/332221-big.jpg";
import p2 from "./temp/200382-big.jpg";
import p3 from "./temp/187296-big.jpg";
import p4 from "./temp/187295-big.jpg";
import p5 from "./temp/187294-big.jpg";
//Styles
import cx from "classnames";
import Styles from "./CardInfo.module.scss";

export const CardInfo = ({
  className,
  ...props
}: IDivMainProps): JSX.Element => {
  return (
    <div className={cx(className, Styles.cardInfo)} {...props}>
      <div className={Styles.title}>
        <div className={Styles.name}>Lagavulin</div>
        <div className={Styles.rating}>98</div>
      </div>
      <div className={Styles.fields}>
        <div className={Styles.field}>
          <div className={Styles.name}>Whiskybase ID</div>
          <div className={Styles.value}>WB112975</div>
        </div>
        <div className={Styles.field}>
          <div className={Styles.name}>Category</div>
          <div className={Styles.value}>Single Malt</div>
        </div>
        <div className={Styles.field}>
          <div className={Styles.name}>Distillery</div>
          <div className={Styles.value}>Lagavulin</div>
        </div>
        <div className={Styles.field}>
          <div className={Styles.name}>Bottler</div>
          <div className={Styles.value}>Distillery Bottling</div>
        </div>
      </div>
      <div className={Styles.pictures}>
        <div className={Styles.pictureContainer}>
          <Image
            src={p1}
            sizes={"200px"}
            objectFit={"scale-down"}
            objectPosition={"center"}
            placeholder={"blur"}
            blurDataURL={"/whiskyBottle.svg"}
          />
        </div>
        <div className={Styles.preview}>
          <div className={Styles.pictureContainer}>
            <Image
              src={p1}
              sizes={"50px"}
              objectFit={"scale-down"}
              objectPosition={"center"}
              placeholder={"blur"}
              blurDataURL={"/whiskyBottle.svg"}
            />
          </div>
          <div className={Styles.pictureContainer}>
            <Image
              src={p2}
              sizes={"50px"}
              objectFit={"scale-down"}
              objectPosition={"center"}
              placeholder={"blur"}
              blurDataURL={"/whiskyBottle.svg"}
            />
          </div>
          <div className={Styles.pictureContainer}>
            <Image
              src={p3}
              sizes={"50px"}
              objectFit={"scale-down"}
              objectPosition={"center"}
              placeholder={"blur"}
              blurDataURL={"/whiskyBottle.svg"}
            />
          </div>
          <div className={Styles.pictureContainer}>
            <Image
              src={p4}
              sizes={"50px"}
              objectFit={"scale-down"}
              objectPosition={"center"}
              placeholder={"blur"}
              blurDataURL={"/whiskyBottle.svg"}
            />
          </div>
          <div className={Styles.pictureContainer}>
            <Image
              src={p5}
              sizes={"50px"}
              objectFit={"scale-down"}
              objectPosition={"center"}
              placeholder={"blur"}
              blurDataURL={"/whiskyBottle.svg"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
