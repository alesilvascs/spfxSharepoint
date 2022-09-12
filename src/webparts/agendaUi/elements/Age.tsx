import * as React from 'react';
import {useEffect} from "react";
import {SPHttpClient, SPHttpClientResponse} from "@microsoft/sp-http";
import Button from "@material-ui/core/Button";


export default () => {

   useEffect(() => {
      async function getAllItems() {
         this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Carros')/items`,
             SPHttpClient.configurations.v1,
             {
                headers: {
                   'Accept': 'application/json;odata=nometadata',
                   'odata-version': ''
                }
             })
             .then((response: SPHttpClientResponse) => {
                if (response.ok) {
                   response.json().then((responseJSON: { value: { ID: any; Title: any; ano: any; }[]; }) => {
                      console.log(" ok __ " +responseJSON);
                   });
                } else {
                   response.json().then((responseJSON: any) => {
                      console.log(responseJSON);
                      alert(`Something went wrong! Check the error in the browser console.`);
                   });
                }
             }).catch((error: any) => {
            console.log(error);
         });
      }
   },[])


   return (
       <div>
          {/*<Button variant="contained" color="primary" onClick={getAllItems}>*/}
          {/*   Agenda Cabanas*/}
          {/*</Button>*/}
       </div>

   )
}


