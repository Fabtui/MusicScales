import React, {useState, useEffect} from 'react'
import {GroupDropDown} from './GroupDropDown'
import {INTERVALS} from './data'
import './stylesheets/all_scales.css'

function useFetch (url, groupsNames) {
  const [state, setState] = useState({
    items: [],
    groups: [],
    loading: true
  })

  useEffect(function () {
    (async function () {
      const response = await fetch(url)
      const responseData = await response.json()
      if (response.ok) {
        const data = responseData.presets
        const filteredData = []
        data.map(d => {
          if (groupsNames.selectedGroups.includes(d.Group)) {
            const valuesArray = d.Value.split(';');
            const newValuesArray = valuesArray.map(v => v = v -1)
            const IntervalsArray = newValuesArray.map(v => v = INTERVALS[v])
            d.Value = IntervalsArray.join(' - ');
            filteredData.push(d)
          }
        });
        const groups = [];
        data.map(d => {
          if (groups.includes(d.Group)) {
            return
          } else {
            groups.push(d.Group)
          }
        });
        setState({
          items: filteredData,
          groups: groups,
          loading: false
        })
        const scaleCheckbox = document.querySelector('.navbar')
        const scrollPoint = scaleCheckbox.offsetTop + scaleCheckbox.offsetHeight
        window.scrollTo(0, scrollPoint)
      } else {
        alert(JSON.stringify(responseData))
        setState(state => ({...state, loading: false}))
      }
    })()
  }, [url, groupsNames])

  return [state.loading, state.items, state.groups]
}

function ScaleTable () {

  const [selectedGroups, setselectedGroups] = useState({
    selectedGroups: ['Common', "Asia", "Blues", "Chords", "Europe", "India", "Intervals", "Jazz", "Modal", "Other"]
  })

  const [loading, items, groups] = useFetch('https://gist.githubusercontent.com/guitarpickfm/2caf3f4ecc6efd7f07df958b1a245b8e/raw/83d84c61ba6119e7df9257c0bc41d96f03d968f0/Scales.json', selectedGroups)

  if (loading) {
    return <div>
      <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    </div>
  }

  function handleChange (selectedGroups) {
    setselectedGroups({
      selectedGroups: [...selectedGroups],
    })
  }

  return <div className='all-scales-table'>
    <GroupDropDown groups={groups} onChange={handleChange}/>
  <div className='up-arrow-container'>
    <UpArrow/>
  </div>
  <table className='table'>
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Intervals</th>
        <th scope="col">Group</th>
      </tr>
    </thead>
    <tbody>
      {items.map(function(item, index) { return <tr key={index}>
        <td>{item.Name}</td>
        <td>{item.Value}</td>
        <td>{item.Group}</td>
      </tr>})}
    </tbody>
  </table>
  </div>
}

function UpArrow () {
  function scrollToTop () {
    window.scrollTo(0, 0)
  }

  window.addEventListener('scroll', (e) => {
    const arrow = document.querySelector('.fa-arrow-circle-up')
    if ( window.pageYOffset > 200 ) {
      arrow.style.opacity= '1'
      arrow.style.pointerEvents= ''
    } else {
      arrow.style.opacity= '0'
      arrow.style.pointerEvents= 'none';
    }
  })

  return <i onClick={scrollToTop} className="fas fa-arrow-circle-up"></i>
}

export function AllScales () {
  // const [scaleVisible, toggleScale] = useToggle(false)

  // function useToggle (init = false) {
  //   const [value, setValue] = useState(init)

  //   const toggleScale = function () {
  //     setValue(value => !value)
  //   }

  //   return [value, toggleScale]
  // }

  // const styles = scaleVisible ? {opacity: '1'} : {opacity: '0'}

  return <div className='container'>
          <div className='all-scales-table'>
            {/* <label className="scaleCheckbox">
            <input htmlFor="scaleCheckbox" type="checkbox" onChange={toggleScale} checked={scaleVisible}></input>
            All Scales</label> */}
            {/* <div className='all-scales' style={styles}>
              {scaleVisible && <ScaleTable/>}
            </div> */}
            <div className='all-scales'>
              <ScaleTable/>
            </div>
          </div>
          </div>
}
