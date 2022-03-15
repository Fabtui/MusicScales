import React, { useState } from 'react'
import { createPortal } from 'react-dom'

export function Tabs ({children}) {
  const childrenArray = React.Children.toArray(children)
  // console.log(childrenArray);
  const [current, setCurrent] = useState(childrenArray[0].key)

  const newChildren = childrenArray.map(child => {
    return React.cloneElement(child, {selected: child.key === current})
  })

  return <>
    {childrenArray.map(child => {
      const style = current === child.key ? {borderBottom: '2px solid black'} : {borderBottom: ''}
      return (<li key={child.key} className="nav-item">
      <a style={style} className="nav-link active" aria-current="page" href="#" onClick={() => {setCurrent(child.key)}} href="#">{child.props.title}</a>
      </li>)
    })}
  <section>
    {newChildren}
  </section>
  </>
}

export function Tab ({children, selected}) {
  return createPortal(<div hidden={!selected}>
    {children }
  </div>, document.body)
}
