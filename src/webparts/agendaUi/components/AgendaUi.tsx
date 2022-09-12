import * as React from 'react';
import styles from './AgendaUi.module.scss';
import { IAgendaUiProps } from './IAgendaUiProps';
import { escape } from '@microsoft/sp-lodash-subset';
import VerticalLinearStepper from '../elements/VerticalStepper';
import Modal from "../elements/FullScreenDialog";
import {Calendar} from "office-ui-fabric-react";

import FullScreenDialog from "../elements/FullScreenDialog";

import {
    SPHttpClient,
    SPHttpClientResponse
} from '@microsoft/sp-http';


export default class AgendaUi extends React.Component<IAgendaUiProps, {}> {
    public render(): React.ReactElement<IAgendaUiProps> {
        const {
            // description,
            // isDarkTheme,
            // environmentMessage,
            // hasTeamsContext,
            userDisplayName
        } = this.props;
        return (
            <section className={`${styles.agendaUi} `}>
                <div className={styles.welcome}>
                    {/*<h2>Olá, {escape(userDisplayName)}!</h2>*/}
                    <div>

                        <FullScreenDialog userDisplayName={this.props.userDisplayName}/>

                    </div>
                </div>
            </section>
        );
    }
}
// Get all items
// private getAllItems = (): void => {
//     //this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Carros')/items`,
//     this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Carros')/items`,
//         SPHttpClient.configurations.v1,
//         {
//             headers: {
//                 'Accept': 'application/json;odata=nometadata',
//                 'odata-version': ''
//             }
//         })
//         .then((response: SPHttpClientResponse) => {
//             if (response.ok) {
//                 void response.json().then((responseJSON: { value: { ID: any; Title: any; ano: any; marca: any; }[]; }) => {
//                     let html = `<table>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Modelo</th>
//                                 <th>Marca</th>
//                                 <th>Ano</th>
//                             </tr>`;
//                     responseJSON.value.map((item: { ID: any; Title: any; ano: any; marca: any}, index: any) => {
//                         html += `<tr>
//                           <td>${item.ID}</td>
//                           <td>${item.Title}</td>
//                           <td>${item.marca}</td>
//                           <td>${item.ano}</td>
//                           <td><button onclick= "this.editar(${item.ID})" >Editar ${item.ID}</button> </td>
//                         </tr>`;
//                     });
//                     html += `</table>`;
//                     document.getElementById("allItems").innerHTML = html;
//                     console.log(responseJSON);
//                 });
//             } else {
//                 void response.json().then((responseJSON: any) => {
//                     console.log(responseJSON);
//                     alert(`Something went wrong! Check the error in the browser console.`);
//                 });
//             }
//         }).catch((error: any) => {
//         console.log(error);
//     });
// }