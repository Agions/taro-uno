export const affixStyles = {
  affix: {
    position: 'fixed' as const,
    zIndex: 10,
  },
  affixTop: {
    top: 0,
  },
  affixBottom: {
    bottom: 0,
  },
  affixRelative: {
    position: 'relative' as const,
  },
};

export const getAffixStyle = (
  affixed: boolean,
  position?: 'top' | 'bottom',
  offset?: number,
  customStyle?: React.CSSProperties,
) => {
  const style: React.CSSProperties = { ...affixStyles.affix };

  if (affixed && position === 'top') {
    Object.assign(style, affixStyles.affixTop);
  }
  if (affixed && position === 'bottom') {
    Object.assign(style, affixStyles.affixBottom);
  }
  if (offset !== undefined && position) {
    style[position] = offset;
  } else if (offset !== undefined) {
    style.top = offset;
  }

  return { ...style, ...customStyle };
};

export const getRelativeStyle = (customStyle?: React.CSSProperties) => {
  return { ...affixStyles.affixRelative, ...customStyle };
};
