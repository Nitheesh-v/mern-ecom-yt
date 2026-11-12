import React, { Fragment } from 'react'
import { filterProducts } from '../config'

export const FilteredProd = () => {
  return (
   <>
   <div>
    <h3>Filtered products</h3>
   </div>


<div>
  {Object.keys(filterProducts[0]).map((keyitem) => (
    <div key={keyitem}>
      <h3 className="font-bold">{keyitem}</h3>

      <div className="flex flex-col gap-2">
        {filterProducts[0][keyitem].map((option) => (
          <h2 key={option.id}>{option.label}</h2>
        ))}
      </div>
    </div>
  ))}
</div>



   {/* <div>
    {
        Object.keys(filterProducts).map(keyitem=>
            <Fragment>
                <h3>{keyitem}</h3>
            </Fragment>
        )
    }
   </div>

   <div>
    {filterProducts[keyitem].map(option=>
        <h2>{option.label}</h2>
    )}
   </div> */}
   </>
  )
}
