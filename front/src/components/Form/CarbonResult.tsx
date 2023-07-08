import React from "react";

const CarbonResults = ({data}: any) => {
console.log(data);

  return (
    <>
      {(data && data.length > 0) && 
        <datalist id="test-results"> 
          {data.map((data: any) => {         
            return (
              <option key={data["_id"]} value={`${data["Nom_base_français"]} ${data["Nom_attribut_français"] ? data["Nom_attribut_français"] : ""}`}>{data["Total_poste_non_décomposé"]} {data["Unité_français"]}</option>
            )
          })}
        </datalist>
      }
    </>
  )
}

export default CarbonResults