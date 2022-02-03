//Core
import React from "react";
import Image from "next/image";
import Link from "next/link";
// Other
import { IDivMainProps } from "interfaces/HTML.elements/div.main.props";
import logo from "./Logo-1.jpg";
//Styles
import cx from "classnames";
import Styles from "./Logo.module.scss";

export const Logo: React.FC<IDivMainProps> = ({
  className,
  ...props
}: IDivMainProps): JSX.Element => {
  return (
    <div {...props} className={cx(Styles.main, className)}>
      <nav>
        <Link href="/">
          <a>
            <Image src={logo} alt="I drink whisky" />
          </a>
        </Link>
      </nav>
    </div>
  );
};
