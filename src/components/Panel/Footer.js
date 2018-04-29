import React from 'react';

export default function Footer({ children }) {
  const prefixCls = 'panel'
  const classes = `${prefixCls}-footer`

  return (
    <header className={classes}>
      {children}
    </header>
  )
}
