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
  setIsOpenParent,
  className,
  ...props
}: IMenuItem) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenChildren, setIsOpenChildren] = useState<boolean>(false);
  const [isActiveItem, setIsActiveItem] = useState<boolean>(false);
  const [isActiveChildren, setIsActiveChildren] = useState<boolean>(false);
  const { asPath } = useRouter();
  const isChildren = !!children?.length;

  useEffect(() => {
    const itIsMy = asPath === patch;
    if (itIsMy !== isActiveItem) {
      setIsActiveItem(itIsMy);
      setIsActiveParent && setIsActiveParent(itIsMy);
    }
  });

  useEffect(() => {
    const itIsMy = asPath === patch;
    if (!isOpen && itIsMy) {
      isChildren && setIsOpen(true);
      setIsOpenParent && setIsOpenParent(true);
    }
  }, [asPath]);

  const myChildrenIsOpen = (isActive: boolean) => {
    setIsOpenChildren(isActive);
    setIsOpenParent && setIsOpenParent(isActive);
  };

  const myChildrenIsActive = (isActive: boolean) => {
    setIsActiveChildren(isActive);
    setIsActiveParent && setIsActiveParent(isActive);
  };

  const setOpen = (): void => {
    const isO = isOpen || isOpenChildren;
    setIsOpen(!isO);
    setIsOpenChildren(!isO);
  };

  return (
    <div key={id} className={cx(Styles.menuItemWrapper, className)} {...props}>
      <div
        className={cx(Styles.menuItem, {
          [Styles.menuOpenItem]: isOpen || isOpenChildren,
          [Styles.menuActiveItem]: isActiveItem || isActiveChildren,
        })}
      >
        <Link href={patch}>
          <a className={Styles.title}>
            {name} {children?.length ? `- (${children.length})` : ""}
          </a>
        </Link>
        {isChildren ? (
          <Arrow className={Styles.icon} onClick={setOpen} />
        ) : null}
      </div>
      {isChildren ? (
        <MenuList
          isOpen={isOpen || isOpenChildren}
          children={children}
          setIsActiveParent={myChildrenIsActive}
          setIsOpenParent={myChildrenIsOpen}
        />
      ) : null}
    </div>
  );
};

export const MenuList: React.FC<IMenuChildrenList> = ({
  children,
  isOpen,
  setIsActiveParent,
  setIsOpenParent,
  className,
  ...props
}: IMenuChildrenList) => {
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
            setIsOpenParent={setIsOpenParent}
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
