//Core
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
//Interfaces
import { IDivMainProps } from "../../interfaces/HTML.elements/div.main.props";
import { IMenuChildrenList, IMenuItem, makeMenuCountries } from "./";
//Other
import { Loading } from "../";
import { useMenu } from "../../hooks/QraphQL/menu";
import Arrow from "./arrow.svg";
//Styles
import cx from "classnames";
import Styles from "./Menu.module.scss";

export const MenuItem: React.FC<IMenuItem> = ({
  id,
  name,
  patch,
  children,
  setIsActiveParent,
  className,
  ...props
}: IMenuItem) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isActiveItem, setIsActiveItem] = useState<boolean>(false);
  const [isActiveChildren, setIsActiveChildren] = useState<boolean>(false);
  const { asPath } = useRouter();

  useEffect(() => {
    const itIsMy = asPath === patch;
    if (itIsMy !== isActiveItem) {
      setIsActiveItem(itIsMy);
      setIsActiveParent && setIsActiveParent(itIsMy);
    }
  });

  const isChildren = !!children?.length;

  const myChildrenIsActive = (isActive: boolean) => {
    setIsActiveChildren(isActive);
    setIsActiveParent && setIsActiveParent(isActive);
  };

  return (
    <div key={id} className={cx(Styles.menuItemWrapper, className)} {...props}>
      <div
        className={cx(Styles.menuItem, {
          [Styles.menuOpenItem]: isOpen,
          [Styles.menuActiveItem]: isActiveItem || isActiveChildren,
        })}
      >
        <div className={Styles.title}>
          <Link href={patch}>
            <a>
              {name} {children?.length ? `- (${children.length})` : ""}
            </a>
          </Link>
        </div>
        {isChildren ? (
          <Arrow className={Styles.icon} onClick={() => setIsOpen(!isOpen)} />
        ) : null}
      </div>
      {isChildren ? (
        <MenuList
          isOpen={isOpen}
          children={children}
          setIsActiveParent={myChildrenIsActive}
        />
      ) : null}
    </div>
  );
};

export const MenuList: React.FC<IMenuChildrenList> = ({
  children,
  isOpen,
  setIsActiveParent,
  className,
  ...props
}: IMenuChildrenList) => {
  console.log(+new Date(), "-(MenuList)->", children?.length, children);
  return (
    <div
      className={cx(Styles.childrenList, className, {
        [Styles.hideList]: !isOpen,
      })}
      {...props}
    >
      {children?.map((item: IMenuItem) => {
        return (
          <MenuItem
            key={item.id}
            {...item}
            setIsActiveParent={setIsActiveParent}
          />
        );
      })}
    </div>
  );
};

const MenuDataWrapper: React.FC<IDivMainProps> = ({
  className,
  ...props
}): JSX.Element => {
  const [menuChildren, setMenuChildren] = useState<IMenuItem[]>([]);
  const { loading, data } = useMenu();

  useEffect(() => {
    if (!loading) {
      setMenuChildren(makeMenuCountries(data?.pagesListTree?.countries || []));
    }
  }, [loading, data]);

  return (
    <div {...props} className={cx(Styles.dataWrapper, className)}>
      <Loading isLoading={loading} />
      <MenuList isOpen={true} children={menuChildren} />
    </div>
  );
};

export const MainMenu: React.FC<IDivMainProps> = ({
  className,
  ...props
}): JSX.Element => {
  return (
    <div {...props} className={cx(Styles.mainMenu, className)}>
      <MenuDataWrapper />
    </div>
  );
};
